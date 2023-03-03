#!/usr/bin/env node
"use strict";

//@ts-ignore
let pkg = require("../package.json");
//@ts-ignore
let sdkPkg = require("dashhd/package.json");

/** @typedef {import("dashhd").HDWallet} HDWallet */
let DashHd = require("dashhd");
//let DashHd = require("../../dashhd.js");

let Cli = require("./_cli.js");

let PURPOSE = `44`;
let COIN_TYPE = `5`;
let DASH_HD_ENTRIES = `m/${PURPOSE}'/${COIN_TYPE}'/0'/0/0`.split("/");

let ADDR_INDEX = 6; // 1-based
let ADDR_LENGTH = 34;
let SEED_LENGTH = 128;
let WIF_LENGTH = 52;
let XKEY_INDEX = 5; // 1-based
let XKEY_LENGTH = 111;
let ZOOMONIC = "zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong";
let ZECRET = "TREZOR";
let ZEED =
  "ac27495480225222079d7be181583751e86f571027b0497b5b5d11218e0a8a13332572917f0f8e5a589620c6f15b11c61dee327651a14c34e18231052e48c069";
// ac27495480225222079d7be181583751
// e86f571027b0497b5b5d11218e0a8a13
// 332572917f0f8e5a589620c6f15b11c6
// 1dee327651a14c34e18231052e48c069

let jsonOut = "";
let unsafe = "";
let unmask = "";

function printVersion() {
  console.info(`${pkg.name} v${pkg.version} SDK v${sdkPkg.version}`);
}

function printHelp() {
  printVersion();
  console.error();
  console.error(
    "Generate XPrvs, XPubs, WIFs, and Addresses from an HD Path or range ",
  );
  console.error();
  console.error("USAGE:");
  console.error(
    "    dashhd <./seed-or-key-or-zoomonic> [HD Path or Partial] [End of Range]",
  );
  console.error();
  console.error("EXAMPLES:");
  console.error(`    An HDPath can be fully qualified, or a DASH suffix:`);
  console.error(`        - a fully qualified path      ex: "m/44'/5'/0'/0/0"`);
  console.error(`        - a full DASH suffix          ex:         "/0'/0/0"`);
  console.error(`        - a partial DASH suffix       ex:            "/0/0"`);
  console.error(`        - primary account Dash Index  ex:               "0"`);
  console.error(`        - an XPrv Path (DASH suffix)  ex:          "0'/0"  `);
  console.error(`        - a DASH Account (Use=0)      ex:          "0'"  `);
  console.error();
  console.error(`    SEED to single WIF + Address:`);
  console.error(`        dashhd ./seed.hex "m/44'/5'/0'/0/0"`);
  console.error(`        dashhd ./seed.hex         "/0'/0/0"`);
  console.error(`        dashhd ./seed.hex               "0"`);
  console.error();
  console.error(`    SEED to single XPRV + XPUB:`);
  console.error(`        dashhd ./seed.hex "m/44'/5'/0'/0"`);
  console.error(`        dashhd ./seed.hex          "0'/0"`);
  console.error(`        dashhd ./seed.hex          "0'"`);
  console.error();
  console.error(`    SEED to XPRV + XPUB or WIF + Address RANGE:`);
  console.error(`        dashhd ./seed.hex          "0'/0"   "2'/0"`);
  console.error(`        dashhd ./seed.hex          "0'"     "2'"`);
  console.error(`        dashhd ./seed.hex               "0"      "4"`);
  console.error();
  console.error(`    XPRV to WIF + Address (single or range):`);
  console.error(`        dashhd ./account.xprv           "0"`);
  console.error(`        dashhd ./account.xprv           "0"      "4"`);
  console.error();
  console.error(`    XPUB to ADDRESS (single or range):`);
  console.error(`        dashhd ./account.xpub           "0"`);
  console.error(`        dashhd ./account.xpub           "0"      "4"`);
  console.error();
  console.error("SUBCOMMANDS:");
  console.error();
  console.error(`    help`);
  console.error(`    version`);
  console.error();
  console.error("TEST VALUES:");
  console.error();
  console.error(`    dashhd z[oomonic] <hdpath> [end]`);
  console.error(`    dashhd zoomonic "m/44'/5'/0'/0/0"`);
  console.error(`    dashhd z                 "0'"`);
  console.error(`    dashhd z                      "0"`);
  console.error();
  console.error(`    Zoomonic Recovery Phrase: ${ZOOMONIC}`);
  console.error(`    Zoomonic Secret:          ${ZECRET}`);
  console.error("    Zoomonic Seed:           ", ZEED.slice(0, 32));
  console.error("                             ", ZEED.slice(32, 64));
  console.error("                             ", ZEED.slice(64, 96));
  console.error("                             ", ZEED.slice(96));
  console.error();
  console.error(`    Zoomonic Primary Account, Receive, Index-0`);
  console.error();
  console.error(`        HD Path:     m/44'/5'/0'/0/0`);
  console.error(
    `        XPrv (0):    xprvA2L7qar7dyJNhxnE47gK5J6cc1oEHQuAk8WrZLnLeHTtnkeyP4w6E`,
  );
  console.error(
    `                         o6Tt65trtdkTRtx8opazGnLbpWrkhzNaL6ZsgG3sQmc2yS8AxoMjfZ`,
  );
  console.error(
    `        XPub (0):    xpub6FKUF6P1ULrfvSrhA9DKSS3MA3digsd27MSTMjBxCczsfYz7vcFLn`,
  );
  console.error(
    `                         bQwjP9CsAfEJsnD4UwtbU43iZaibv4vnzQNZmQAVcufN4r3pva8kTz`,
  );
  console.error(
    `        WIF (0):     XCGKuZcKDjNhx8DaNKK4xwMMNzspaoToT6CafJAbBfQTi57buhLK`,
  );
  console.error(`        Address (0): XrZJJfEKRNobcuwWKTD3bDu8ou7XSWPbc9`);
  console.error();
  console.error(`    Zoomonic Secondary Account, Change, Index-1`);
  console.error();
  console.error(`        HD Path:     m/44'/5'/1'/1/1`);
  console.error(
    `        XPrv (1):    xprvA2ACWaqwADRtbkLsM6oQHzeWtqZVviBmKMKNRBFcwKGGRBgWHNeoZ`,
  );
  console.error(
    `                         SKzduFMFkqvNsV5LaqRT9XRibzgSAweAAsfMF35PWy6beK3aL1BwTU`,
  );
  console.error(
    `        XPub (1):    xpub6F9Yv6NpzazBpERLT8LQf8bFSsPzLAucgaEyDZfEVeoFHz1epuy47`,
  );
  console.error(
    `                         EeUVCRTNVToM1zgFZMxiGs2AFc9cNqZE2UVwJod2zPkG7W4ZGRuwJJ`,
  );
  console.error(
    `        WIF (1):     XF9murLtNpJaZXbwMxqJ6BhigEtu9NxfBCJDBokCJcqFkYkz3itz`,
  );
  console.error(`        Address (1): XueHW2ELMxoXzXcaHMxmwVWhcADE1W5s8c`);
  console.error();
}

async function main() {
  let args = process.argv.slice(2);

  jsonOut = Cli.removeFlag(args, ["--json"]) ?? "";
  unsafe = Cli.removeFlag(args, ["--unsafe"]) ?? "";
  unmask = Cli.removeFlag(args, ["--unmask"]) ?? "";

  let isHelp = !args.length || Cli.removeFlag(args, ["help", "--help"]);
  if (isHelp) {
    printHelp();
    let isClean = !!args.length;
    if (isClean) {
      process.exit(0);
    }
    process.exit(1);
    return;
  }

  let isVersion = Cli.removeFlag(args, ["version", "-V", "--version"]);
  if (isVersion) {
    printVersion();
    process.exit(0);
    return;
  }

  let [keyPath, start, end] = args;

  let keyInfo = await Cli.fromPathOrString(keyPath);
  let key = keyInfo.value;
  if (keyInfo.isString) {
    if (!unsafe) {
      throwIfPrivate(key);
    }
  }

  let zaliases = ["zoomonic", "z"];
  let isZoomonic = zaliases.includes(key);
  if (isZoomonic) {
    key = ZEED;
  }

  let isSeed = key.length === SEED_LENGTH;
  if (isSeed) {
    let buf = Buffer.from(key, "hex");
    let bytes = new Uint8Array(buf);
    await genFromSeed(bytes, start, end);
    return;
  }

  let isXKey = key.length === XKEY_LENGTH;
  if (isXKey) {
    await genFromXKey(key, start, end);
    return;
  }

  let isAddrOrWif = key.length === ADDR_LENGTH || key.length === WIF_LENGTH;
  if (isAddrOrWif) {
    throw newError(
      "E_ADDRESS",
      "This looks like an address, which is the final form. Use DashKeys to inspect or verify it: <https://github.com/DashHive/DashKeys.js>.",
    );
  }

  throw newError(
    "E_BAD_LENGTH",
    `Expected a key with a length of 128 (Seed Hex), 111 (XPrv or XPub), 52 (WIF), or 34 (Address), but got ${key.length}.`,
  );
}

/**
 * @param {Uint8Array} seedBytes
 * @param {String} start
 * @param {String} [end]
 */
async function genFromSeed(seedBytes, start, end) {
  /* jshint maxcomplexity: 25 */
  let rootEntries = DASH_HD_ENTRIES;

  let fromEntries = (start || "").split("/").filter(Boolean);
  let toEntries = (end || "").split("/").filter(Boolean);
  let len = ADDR_INDEX;

  let isFromMaster = "m" === fromEntries[0]?.slice(0);
  if (isFromMaster) {
    let defaults = DASH_HD_ENTRIES.slice(fromEntries.length);

    rootEntries = fromEntries.concat(defaults);
    fromEntries = fromEntries.slice(3);
  }

  // Disambiguate between
  // /0'/0/0
  // /0'/0
  // /0'
  //      /0
  let isFromAccount =
    `'` === fromEntries[0]?.slice(-1) && 3 !== fromEntries.length;
  let isToAccount = `'` === toEntries[0]?.slice(-1) && 3 !== fromEntries.length;

  let isStandard = fromEntries.length <= 6;
  if (!isStandard) {
    // m/44'/5'/0'/0/0 - good
    // m/44'/5'/0'/0/0/0 - bad
    let hdpath = fromEntries.join("/");
    throw newError(
      "E_NOT_BIP44",
      `expected a BIP-44 HD Paths in the form of m/44'/<coin>'/<account>'/<use>/<index>, but got '${hdpath}'. If you'd like generic BIP-32 support, upvote this issue: <https://github.com/dashhive/dashhd-cli/issues/14> and comment with your use case.`,
    );
  }

  let typesMatch = isToAccount === isFromAccount;
  if (!typesMatch) {
    if (toEntries.length) {
      throw newError(
        "E_INDEX_TYPE",
        "start and end ranges must be of the same type - both to XPrv/XPub or both to WIF/Address",
      );
    }
  }

  if (isFromAccount) {
    let hasIndex = fromEntries.length === 3;
    if (!hasIndex) {
      len = XKEY_INDEX;
      let hasUse = fromEntries.length === 2;
      if (!hasUse) {
        fromEntries.push("0");
      }
    }
  }

  if (isToAccount) {
    let hasIndex = toEntries.length === 3;
    let _len = ADDR_INDEX;
    if (!hasIndex) {
      _len = XKEY_INDEX;
      let hasUse = toEntries.length === 2;
      if (!hasUse) {
        toEntries.push("0");
      }
    }
    if (_len !== len) {
      throw newError(
        "E_INDEX_TYPE",
        "start and end ranges must be of the same type - both to XPrv/XPub or both to WIF/Address",
      );
    }
  }

  let possibleChild = toEntries.length <= fromEntries.length;
  if (!possibleChild) {
    throw new Error(`'${start}' is not a parent of '${end}'`);
  }

  let offset = len - ADDR_INDEX; // 0 or 1
  let startEntries = rootEntries
    .slice(0, offset + rootEntries.length + -fromEntries.length)
    .concat(fromEntries);

  let hasMany = "string" === typeof end;

  /** @type {Array<String>} */
  let endEntries = [];
  if (hasMany) {
    endEntries = startEntries
      .slice(0, startEntries.length + -toEntries.length)
      .concat(toEntries);
  }

  let walletKey = await DashHd.fromSeed(seedBytes);
  let [m, purpose, coin, account, use, index] = startEntries;

  if ("string" === typeof index) {
    if (!endEntries.length) {
      let hdpath = `${m}/${purpose}/${coin}/${account}/${use}/${index}`;
      let addressKey = await DashHd.derivePath(walletKey, hdpath);
      let wif = await DashHd.toWif(addressKey.privateKey);
      let address = await DashHd.toAddr(addressKey.publicKey);

      console.info(wif);
      console.error(address);
      return;
    }

    await walkHdKeys(
      walletKey,
      "m",
      0,
      startEntries.slice(1),
      endEntries.slice(1),
    );
    return;
  }

  if (!endEntries.length) {
    let hdpath = `${m}/${purpose}/${coin}/${account}/${use}`;
    let xKey = await DashHd.derivePath(walletKey, hdpath);
    let xprv = await DashHd.toXPrv(xKey);
    let xpub = await DashHd.toXPub(xKey);
    console.info(xprv);
    console.error(xpub);
    return;
  }

  await walkHdKeys(
    walletKey,
    "m",
    0,
    startEntries.slice(1),
    endEntries.slice(1),
  );
}

// First 15 addresses of account 0
// m/44'/5'/0'/0/0 => m/44'/5'/0'/0/14
// m/44'/5'/0'/0 [0] => [14]
//
// First addresses of first 10 accounts
// m/44'/5'/0'/0/0 => m/44'/5'/10'/0/0
// m/44'/5'/2'/0 [0] => [0]
/**
 * @param {HDWallet} walletKey
 * @param {String} hdpath
 * @param {Number} depth
 * @param {Array<String>} fromEntries
 * @param {Array<String>} toEntries
 */
async function walkHdKeys(walletKey, hdpath, depth, fromEntries, toEntries) {
  if (!fromEntries.length) {
    console.error(`\n${hdpath}:`);
    if (5 === depth) {
      let addressKey = await DashHd.derivePath(walletKey, hdpath);

      let wif = await DashHd.toWif(addressKey.privateKey);
      console.info(`${wif}`);

      let addr = await DashHd.toAddr(addressKey.publicKey, {});
      console.info(`${addr}`);
      return;
    }

    if (4 === depth) {
      let xKey = await DashHd.derivePath(walletKey, hdpath);
      let xprv = await DashHd.toXPrv(xKey);
      console.info(`${xprv}`);

      let xpub = await DashHd.toXPub(xKey);
      console.info(`${xpub}`);
      return;
    }

    throw newError(
      "E_DEPTH",
      `expected to output XKey (depth=4) or AddressKey (depth=5), but got depth=${depth}`,
    );
  }

  // go from 'from' to 'to'
  let from = parseInt(fromEntries[0], 10);
  let to = parseInt(toEntries[0], 10);
  if (from > to) {
    throw new Error(`can't count backwords from '${from}' to '${to}'`);
  }

  let harden = "";
  if ("'" === fromEntries[0].slice(-1)) {
    harden = "'";
  }

  for (let i = from; i <= to; i += 1) {
    await walkHdKeys(
      walletKey,
      `${hdpath}/${i}${harden}`,
      depth + 1,
      fromEntries.slice(1),
      toEntries.slice(1),
    );
  }
}

/**
 * @param {String} xkey
 * @param {String} start
 * @param {String} [end]
 */
async function genFromXKey(xkey, start, end) {
  let startIndex = Number(start);
  let endIndex;
  if ("string" === typeof end) {
    endIndex = Number(end);
  }

  let xKey = await DashHd.fromXKey(xkey);

  let hasMany = "string" === typeof end;
  if (!hasMany) {
    let addressKey = await xKey.deriveAddress(startIndex);
    if (addressKey.privateKey) {
      let wif = await DashHd.toWif(addressKey.privateKey);
      console.info(wif);
    }

    let address = await DashHd.toAddr(addressKey.publicKey);
    console.error(address);
    return;
  }

  if (!endIndex) {
    throw newError(
      "E_BAD_INPUT",
      `expected number for end of range but got '${end}'`,
    );
  }

  for (let i = startIndex; i <= endIndex; i += 1) {
    let addressKey = await xKey.deriveAddress(i);
    console.error(`\nm/44'/c'/a'/${xKey.index}/${i}:`);

    if (addressKey.privateKey) {
      let wif = await DashHd.toWif(addressKey.privateKey);
      console.info(wif);
    }

    let address = await DashHd.toAddr(addressKey.publicKey);
    console.error(address);
  }
}

/**
 * A `detail`ed, `code`d error message. Throw it yourself.
 * @param {String} code - all uppercase with underscores, for machines (ex: E_BAD_INPUT)
 * @param {String} message - all lowercase, no punctuation, for devs (ex: "failed to parse '${x}'")
 * @param {any} [details] - extra details for machine or devs
 */
function newError(code, message, details) {
  let err = new Error(message);
  //@ts-ignore
  err.code = code;
  //@ts-ignore
  err.details = details;
  return err;
}

function newExposedKeyError() {
  let histfile = "your Shell history";
  if (process.env.HISTFILE) {
    histfile = process.env.HISTFILE;
  }
  return newError(
    "E_EXPOSED_KEY",
    `You've exposed your private key, which may have been written to ${histfile}.`,
  );
}

/**
 * @param {String} key
 */
function throwIfPrivate(key) {
  let exposedXprv = key.startsWith("xprv");
  if (exposedXprv) {
    throw newExposedKeyError();
  }

  let exposedSeed = SEED_LENGTH === key.length;
  if (exposedSeed) {
    throw newExposedKeyError();
  }

  let exposedWif = WIF_LENGTH === key.length;
  if (exposedWif) {
    throw newExposedKeyError();
  }
}

main()
  .then(async function () {
    process.exit(0);
  })
  .catch(function (err) {
    if ("E_BAD_INPUT" === err.code) {
      console.error("Error:");
      console.error();
      console.error(err.message);
      console.error();

      process.exit(1);
      return;
    }

    if ("E_EXPOSED_KEY" === err.code) {
      console.error("Security Error:");
      console.error();
      console.error(err.message);
      console.error(`Use --unsafe to run anyway.`);
      console.error();

      process.exit(1);
      return;
    }

    console.error("Fail:");
    console.error(err.stack || err);

    process.exit(1);
  });
