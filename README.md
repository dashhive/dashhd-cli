# [dashhd-cli][dashhd-cli]

Commandline utility to traverse HD Keys from HD Wallet Seed and Extended (xprv,
xpub) Key Paths. \
(compatible with the [Hierarchical Deterministic Keys (BIP-44)][bip-44] and [BIP-32][bip-32]
specs)

[dashhd-cli]: https://github.com/dashhive/dashhd-cli
[dashphrase-cli]: https://github.com/dashhive/dashphrase-cli
[dashphrase-js]: https://github.com/dashhive/dashphrase.js
[bip-44]: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
[bip-32]: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki

> A fully-functional, production-ready reference implementation of Dash HD -
> suitable for learning DASH specs and protocols, and porting to other
> languages.

## Overview: Seeds => XKeys => Keys

```sh
dashhd <./seed-or-key> [start-hdpath-or-index] [end]
```

### Seed => Extended Key

```sh
dashhd ./seed.hex   "m/44'/5'/0'/0"
```

```text
# XPrv
xprvA2L7qar7dyJNhxnE47gK5J6cc1oEHQuAk8WrZLnLeHTtnkeyP4w6Eo6Tt65trtdkTRtx8opazGnLbpWrkhzNaL6ZsgG3sQmc2yS8AxoMjfZ

# XPub
xpub6FKUF6P1ULrfvSrhA9DKSS3MA3digsd27MSTMjBxCczsfYz7vcFLnbQwjP9CsAfEJsnD4UwtbU43iZaibv4vnzQNZmQAVcufN4r3pva8kTz
```

### Extended Key to Address Key

```sh
dashhd ./0-0-0.xprv 0
```

```text
# WIF
XCGKuZcKDjNhx8DaNKK4xwMMNzspaoToT6CafJAbBfQTi57buhLK

# Address
XrZJJfEKRNobcuwWKTD3bDu8ou7XSWPbc9
```

# Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [How HD Paths Work](#how-hd-paths-work)
  - [Seed to XPrv / XPub](#wallet-seed-to-extended-keys)
  - [Seed to WIF / Addr](#wallet-seed-to-address-keys)
  - [XPrv to WIF / Addr](#extended-keys-to-address-keys)
  - [XPub to Addr](#extended-keys-to-address-keys)
  - [Working with Ranges](#working-with-ranges)
- [Test Fixtures](#fixtures)
  - Recovery Phrases
  - Seeds
  - XPrvs, XPubs
  - WIFs, Addrs
- [Glossary of Terms](#glossary)
- [License](#license) (MIT)

# Install

```sh
npm install --location=global dashhd-cli@1
dashhd ./seed.hex "0'/0"
```

Or, use without installing:

```sh
npx -p dashhd-cli dashhd ./seed.hex "0'/0"
```

# Usage

**Note**: Convert _Recovery Phrases_ to _Seeds_ with
[`dashphrase`][dashphrase-js].

Also, **all example values** below are derived from the _Zoomonic Seed_:

`./seed.hex`:

```text
ac27495480225222079d7be181583751e86f571027b0497b5b5d11218e0a8a13332572917f0f8e5a589620c6f15b11c61dee327651a14c34e18231052e48c069
```

## How HD Paths Work

You can use either the full HD Path (required for coins other than DASH), or
abbreviate, starting with the _HD Account_:

```text
m/44'/5'/0'/0    - absolute Extended Key path
         0'/0    - relavite Extended Key path (DASH only)

m/44'/5'/0'/0/0  - absolute Address Key path
         0'/0/0  - relative Address Key path (DASH only)
```

From [Dash HD: HD Path](https://github.com/dashhive/DashHD.js#hd-path):

> The path that defines an HD Key - typically of the BIP-44 variety:
>
> - a _Root_ (master), ex: `m` (depth 0, the Wallet Key, straight from the seed)
> - an _Coin Key_, ex: `m/44'/5'` (depth 2)
> - an _Account_, ex: `m/44'/5'/0'` (depth 3)
> - an _X Key_ (_XPrv_ or _XPub_), ex: `m/44'/5'/0'/0` (depth 4, a.k.a. _Use_)
> - an _Address Key_, ex: `m/44'/5'/0'/0/0` (depth 5, the end)
> - `'` is used for "hardened" (parent) key segments, \
>   but not for "public" (shareable) child key segments
>
> In general:
>
> ```js
> m/<purpose>'/<coin-type>'/<account>'/<use>/<index>
> ```
>
> For DASH:
>
> ```js
> m/44'/5'/<account>'/<use>/<index>
> ```
>
> (because we always use BIP-44 and our coin type is 5)

See also:

- [Dash HD: Glossary](https://github.com/dashhive/DashHD.js#glossary)
- [Dash HD: Key Types](https://github.com/dashhive/DashHD.js#key-types)
- [Dash Tools: Glossary](https://github.com/dashhive/dash-tools#glossary)

## Wallet Seed to Extended Keys

1. Convert your _Recovery Phrase_ to a _Seed_ with
   [DashPhrase][dashphrase-cli]
2. Derive Extended Keys for Account at index 2:
   ```sh
   # dashhd ./seed.hex       "/<account>'/<use>"
   dashhd ./seed.hex         "/2'/0"
   ```
   (the _Use_ index will be `0` for most common use cases)
3. The output will have an _XPrv_ and _XPub_, like this:
   ```sh
   # starts with "xprv" (111 characters)
   xprvA1t6Pgks9siC1M6QTqstaDpK7GqJfiDZq4tpD6eKVyVf4iAb3LViw6jk1mp2XUawhpoYCCwrQphPpS9V36VhDLxP6QK5FGx5wR6iF8xMYHc
   # starts with "xpub" (111 characters)
   xpub6EsSoCHkzFGVDqAsZsQtwMm3fJfo5AwRCHpR1V3w4K2dwWVjasoyUu4Ds2XtjE9QY83pdNBtduc17UKQV46iQmAJFQ7NywC4ggdEi1Ki76a
   ```

More examples:

```sh
# Absolute HD Path
dashhd ./seed.hex "m/44'/5'/2'/0"

# Absolute HD Path with Relative Range
dashhd ./seed.hex "m/44'/5'/0'/0" "5'/0"

# Same as above, but with relative HD Path
dashhd ./seed.hex          "0'/0" "5'/0"
```

## Wallet Seed to Address Keys

1. Convert your _Recovery Phrase_ to a _Seed_ with
   [DashPhrase][dashphrase-cli]
2. Derive Address Keys for Address 3 of Account 2 (0-indexed):
   ```sh
   # dashhd ./seed.hex       "/<account>'/<use>/<index>"
   dashhd ./seed.hex         "/2'/0/3"
   ```
   (the _Use_ index will be `0` for most common use cases)
3. The output will have a _WIF_ (longer) and _Address_, like this:
   ```sh
   # WIF (51 characters)
   HjSuSQ7F2dVqmzB4BLzEaLNrptzzVUBCXjo76us7AWQY954CWe3
   # Address (34 characters)
   XyvDv4Jz3cfXrbTvecymTe2MmXryokCEHi
   ```

More examples:

```sh
# Absolute HD Path
dashhd ./seed.hex "m/44'/5'/2'/0/3"

# Absolute HD Path with Relative Address Ranges
dashhd ./seed.hex "m/44'/5'/2'/0/3" "2'/0/5"

# Absolute HD Path with Relative Account + Address Ranges
dashhd ./seed.hex "m/44'/5'/0'/0/0" "2'/0/3"

# Same as above, but with relative HD Path
dashhd ./seed.hex          "2'/0/3" "2'/0/5"
dashhd ./seed.hex          "0'/0/0" "2'/0/3"
```

## Extended Keys to Address Keys

Extended Keys come in a pair:

- the person **receiving payment** generates the pair \
  (they keep the _XPrv_ to themselves)
- the person **paying** accepts the _XPub_ from the other \
  (each payment will go incrementally to the next unused address)

### Pay a Contact

If _Alice_ wants to pay _Bob_, and the next unused is at index 3:

```sh
# dashhd ./payee.xpub <index>
dashhd   ./bob.xpub   3
```

```text
# Address
XyvDv4Jz3cfXrbTvecymTe2MmXryokCEHi
```

### Check & Spend a Payment

_Bob_ must use the _WIF_ (first, longer) to spend a a payment. \
Before doing so he can check teh account with the _Address_ (shorter).

```sh
# dashhd ./payer.xprv <index>
dashhd   ./alice.xprv 3
```

```sh
# WIF
HjSuSQ7F2dVqmzB4BLzEaLNrptzzVUBCXjo76us7AWQY954CWe3
# Address
XyvDv4Jz3cfXrbTvecymTe2MmXryokCEHi
```

## Working with Ranges

You can specify a range to generate multiple Extended Keys or Address Keys at
once.

### Extended Key Ranges

```sh
# Absolute HD Path
dashhd ./seed.hex "m/44'/5'/0'/0" "m/44'/5'/2'/0"

# Absolute HD Path with Relative Range
dashhd ./seed.hex "m/44'/5'/0'/0"          "2'/0"

# Same as above, but with relative HD Path
dashhd ./seed.hex          "0'/0"          "2'/0"
```

The output will include the HD Path for easy identification:

```text
m/44'/5'/2'/0:
xprvA1t6Pgks9siC1M6QTqstaDpK7GqJfiDZq4tpD6eKVyVf4iAb3LViw6jk1mp2XUawhpoYCCwrQphPpS9V36VhDLxP6QK5FGx5wR6iF8xMYHc
xpub6EsSoCHkzFGVDqAsZsQtwMm3fJfo5AwRCHpR1V3w4K2dwWVjasoyUu4Ds2XtjE9QY83pdNBtduc17UKQV46iQmAJFQ7NywC4ggdEi1Ki76a
```

### Address Key Ranges

```sh
# Absolute HD Path
dashhd ./seed.hex "m/44'/5'/2'/0/0" "m/44'/5'/2'/0/5"

# Absolute HD Path with Relative Address Ranges
dashhd ./seed.hex "m/44'/5'/2'/0/2"          "2'/0/5"

# Absolute HD Path with Relative Account + Address Ranges
dashhd ./seed.hex          "0'/0/0"          "2'/0/2"

# Same as above, but with relative HD Path
dashhd ./seed.hex          "2'/0/2"          "2'/0/5"
dashhd ./seed.hex          "0'/0/0"          "2'/0/2"
```

The output will include the HD Path for easy identification:

```text
m/44'/5'/2'/0/3:
XHjSuSQ7F2dVqmzB4BLzEaLNrptzzVUBCXjo76us7AWQY954CWe3
XyvDv4Jz3cfXrbTvecymTe2MmXryokCEHi
```

# Fixtures

These are for testing and debugging HD Key libraries and HD wallets.

Libraries should support Recovery Phrase "secret"s - also known as _salt_ or
(misnomer) _password_.

However, in practice, most wallets don't ask the user and simply put an empty
string as the secret.

Also, in practice, the XPrv and XPub _Use_ is always designated as Receiving
(External), not Change (internal).

For completeness, we offer fixtures for all of those features below.

## Catmonic (empty secret)

Recovery Phrase:

```text
cat swing flag economy stadium alone churn speed unique patch report train
```

Secret (Salt):

` ` (empty string)

XPrvs, XPubs, WIFs, and Addresses:

See [./examples/](./examples/) and [./FIXTURES.md](./FIXTURES.md).

## Zoomonic (with secret salt)

Recovery Phrase:

```text
zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong
```

Secret (Salt):

```text
TREZOR
```

XPrvs, XPubs, WIFs, and Addresses:

```text
m/44'/5'/0'/0   XPrv & XPub

                xprvA2L7qar7dyJNhxnE47gK5J6cc1oEHQuAk8WrZLnLeHTtnkeyP4w6Eo
                    6Tt65trtdkTRtx8opazGnLbpWrkhzNaL6ZsgG3sQmc2yS8AxoMjfZ
                xpub6FKUF6P1ULrfvSrhA9DKSS3MA3digsd27MSTMjBxCczsfYz7vcFLnb
                    QwjP9CsAfEJsnD4UwtbU43iZaibv4vnzQNZmQAVcufN4r3pva8kTz

m/44'/5'/0'/0/0 WIF & Address

                XCGKuZcKDjNhx8DaNKK4xwMMNzspaoToT6CafJAbBfQTi57buhLK
                XrZJJfEKRNobcuwWKTD3bDu8ou7XSWPbc9
```

```text
m/44'/5'/1'/1   XPrv & XPub

                xprvA2ACWaqwADRtbkLsM6oQHzeWtqZVviBmKMKNRBFcwKGGRBgWHNeoZS
                    KzduFMFkqvNsV5LaqRT9XRibzgSAweAAsfMF35PWy6beK3aL1BwTU
                xpub6F9Yv6NpzazBpERLT8LQf8bFSsPzLAucgaEyDZfEVeoFHz1epuy47E
                    eUVCRTNVToM1zgFZMxiGs2AFc9cNqZE2UVwJod2zPkG7W4ZGRuwJJ

m/44'/5'/1'/1/1 WIF & Address
                XF9murLtNpJaZXbwMxqJ6BhigEtu9NxfBCJDBokCJcqFkYkz3itz
                XueHW2ELMxoXzXcaHMxmwVWhcADE1W5s8c
```

```text
m/44'/5'/2'/0   XPrv & XPub

                xprvA1t6Pgks9siC1M6QTqstaDpK7GqJfiDZq4tpD6eKVyVf4iAb3LViw6
                    jk1mp2XUawhpoYCCwrQphPpS9V36VhDLxP6QK5FGx5wR6iF8xMYHc
                xpub6EsSoCHkzFGVDqAsZsQtwMm3fJfo5AwRCHpR1V3w4K2dwWVjasoyUu
                    4Ds2XtjE9QY83pdNBtduc17UKQV46iQmAJFQ7NywC4ggdEi1Ki76a

m/44'/5'/2'/0/3 WIF & Address

                XHjSuSQ7F2dVqmzB4BLzEaLNrptzzVUBCXjo76us7AWQY954CWe3
                XyvDv4Jz3cfXrbTvecymTe2MmXryokCEHi

m/44'/5'/2'/0/5 WIF & Address

                XCcWUUGUkCeYLteuYmocSy9UbSwbCZD2nNCxXW5DKSN3YKHEE6xx
                XgBR52CgtFEdvrbN7YdwUVP5HCxDMyWKqk

```

## More Fixtures

See also:

- [FIXTURES.md](./FIXTURES.md)

# Glossary

If you're new to all this, check out these glossaries:

- [Dash HD: Glossary](https://github.com/dashhive/DashHD.js#glossary)
- [Dash Tools: Glossary](https://github.com/dashhive/dash-tools#glossary)

# LICENSE

MIT License

Copyright 2023 Dash Incubator \
Copyright 2023 AJ ONeal
