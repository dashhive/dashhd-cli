# Fixtures

For the sake of brevity, the [README.md](./README.md) shows just the first and
last WIFs (Private Keys) and Pay Addresses (PubKey Hashes) in the range of
`m/44'/5'/0'/0/0` to `m/44'/5'/2'/1/2`.

This is the _full_ range for two different seeds (with and without secret salt):

- Recovery Phrase (mnemonic)
- seeds (with and without secret salt)
- accounts XPrvs & XPubs
- internal & external addresses

## Zoomonic Fixtures (with Secret)

Recovery Phrase:

```txt
zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong
```

Secret:

```txt
TREZOR
```

Seed:

```txt
ac27495480225222079d7be181583751e86f571027b0497b5b5d11218e0a8a13332572917f0f8e5a589620c6f15b11c61dee327651a14c34e18231052e48c069
```

HD Paths, WIFs, and Addrs:

In the range from `m/44'/5'/0'/0/0` to `m/44'/5'/2'/1/2`:

(DASH BIP-44 Wallet, Accounts 0-2, both uses, Keys 0-2)

```txt
m/44'/5'/0'
            0/   use: receiving (external)
                xprvA2L7qar7dyJNhxnE47gK5J6cc1oEHQuAk8WrZLnLeHTtnkeyP4w6Eo
                    6Tt65trtdkTRtx8opazGnLbpWrkhzNaL6ZsgG3sQmc2yS8AxoMjfZ
                xpub6FKUF6P1ULrfvSrhA9DKSS3MA3digsd27MSTMjBxCczsfYz7vcFLnb
                    QwjP9CsAfEJsnD4UwtbU43iZaibv4vnzQNZmQAVcufN4r3pva8kTz
              0: XCGKuZcKDjNhx8DaNKK4xwMMNzspaoToT6CafJAbBfQTi57buhLK
                 XrZJJfEKRNobcuwWKTD3bDu8ou7XSWPbc9
              1: XETzu7aRynTKnj1E5g8VVetuwFfLB8MLtV5W5HZYkiTroXeVVzEV
                 Xi1KPmjEEoKcg946H9bamEHjBXsdZ56Waf
              2: XGyWBsyRMxo9hFtWSsHnspQz8TPPzew4ENz72z7oxiHqtNv2PLkZ
                 XjUv27YWGuorb1iecPanCaZZdtrWNqCPcK

            1/   use: change (internal)
                xprvA2L7qar7dyJNmoqwbVr1Jnk8P7LVNKMC2BSj7XvjpCxJvNZt9azQ6R
                    Vv9nZBnRb6MDtjnVKgbQp8RvCXRGJGApVfMkzobph5AmmMcpwFMtM
                xpub6FKUF6P1ULrfzHvQhXP1fvgrw9Aymn53PQNKuvLMNYVHoAu2h8JeeD
                    pQ13JgiTJKqbAnoWrLDoc8JmV3aPx1MXCPKScQjaKSxmYjHHQAVwh
              0: XEHjtUcjTfGJrEUExybtWKkvbgXJWbcwAgKDpUKtUTKweH8VTkYj
                 Xds2wYyvkUphi8jXLi2HQXrMx5HsbytFGo
              1: XHWk88eAuGoZZ3qnTnVRSoBC6LvFSTQJNrhm1euUVcTEtZX17S9r
                 XxDp8WSJH9Xs1QQ4Ra3V8YMQznoMeDEEzX
              2: XKZFaLeh7igqPEbBrYt2PQqTjPSGEJCR9npvapkKWmKjmfQUTU8T
                 XppXpij3JhqSmVWfoWTCNXw24xNpfGYbyW


m/44'/5'/1'/
            0/   use: receiving (external)
                xprvA2ACWaqwADRta7UnLzT7q9qJm6SRZb1UXRiicdvuaKX5QscoEiYo3L
                    hKTqkCpggzaU5VFMXkhNgLmdA5fR2TxjCYn9h4M9MsPoiNNBVCmqr
                xpub6F9Yv6NpzazBnbZFT1z8CHn3K8Guy3jKteeKR2LX8f44HfwwnFs3b9
                    1oK7BoWzuz6BmuaqaAY86RiN2ocQVLDvfiGxSAX6Nq9optnCS2BAZ
              0: XCNfrxC5ZbyXzTqPqmVADEV9xZVNkQKDoVcpDFtFDqmBDfQKioak
                 XsU43WahHW2ZShvyTLiyByvjrBACpGVhvj
              1: XHEQFN1wbEYD3RG475FEN5b4ZqeFu1rQb4QdtVCwctK8fLYQFHYo
                 XixiWUcMkATPiJuLkFuWEWQ9R8gYR1YcnN
              2: XGikb1ZiM2aKne2VmSTiuBXM3PtMNCJn6c7f2c1EJXixTrQpsaTa
                 XwhKUrsa2Qfqr1oc4D5Zkg2tdTmW49kD45

            1/   use: change (internal)
                xprvA2ACWaqwADRtbkLsM6oQHzeWtqZVviBmKMKNRBFcwKGGRBgWHNeoZS
                    KzduFMFkqvNsV5LaqRT9XRibzgSAweAAsfMF35PWy6beK3aL1BwTU
                xpub6F9Yv6NpzazBpERLT8LQf8bFSsPzLAucgaEyDZfEVeoFHz1epuy47E
                    eUVCRTNVToM1zgFZMxiGs2AFc9cNqZE2UVwJod2zPkG7W4ZGRuwJJ
              0: XBv6etCNB3xCD6mGeD4JA5jsMU1kBJ66vtVD8LBR2wir1s9vJLo6
                 XoeJBAYVhfRXwsD77ZNKF2AuEUJetLPa49
              1: XF9murLtNpJaZXbwMxqJ6BhigEtu9NxfBCJDBokCJcqFkYkz3itz
                 XueHW2ELMxoXzXcaHMxmwVWhcADE1W5s8c
              2: XKqF56e2UkPSUYceNFyEc2M5FU4McAHuYNPd7cjyorDTBjTkYz7S
                 XwBPUCLe9obfXotCjMRD2in1LYFDQTnucs


m/44'/5'/2'/
            0/   use: receiving (external)
                xprvA1t6Pgks9siC1M6QTqstaDpK7GqJfiDZq4tpD6eKVyVf4iAb3LViw6
                    jk1mp2XUawhpoYCCwrQphPpS9V36VhDLxP6QK5FGx5wR6iF8xMYHc
                xpub6EsSoCHkzFGVDqAsZsQtwMm3fJfo5AwRCHpR1V3w4K2dwWVjasoyUu
                    4Ds2XtjE9QY83pdNBtduc17UKQV46iQmAJFQ7NywC4ggdEi1Ki76a
              0: XE4L3eJ9u2oW6entrpe8dTcQDkmu7ZCUNYoi98EDiP5Gzf1LBx5z
                 XxooqRC7TNDYA1DnHDkSe2Qy7wQbqgcYPB
              1: XEYBvYim8kWH3cwAu1Fuh6rq9LquxGKZ8mnB63oBpSP4XNbBWnSe
                 XekaaCLKsR77dHGUwrNzX66BQWHV9iS413
              2: XKhpnmDR9eDT3U52bKrTy7p3csuNVozV21bEdEebEfStaHWa4kYV
                 XgxHWM4Eo9REUDTbA8T7HLHB37kwmrRWpC
              3: XHjSuSQ7F2dVqmzB4BLzEaLNrptzzVUBCXjo76us7AWQY954CWe3
                 XyvDv4Jz3cfXrbTvecymTe2MmXryokCEHi
              4: XC5DKvspJZ3ZhRaoMMVWAjQERm92smBf4268Swe3YejQgUWeyfJM
                 XyzuYMA9NzCugAFdYzEv8nS4LZPd8Wr5vB
              5: XCcWUUGUkCeYLteuYmocSy9UbSwbCZD2nNCxXW5DKSN3YKHEE6xx
                 XgBR52CgtFEdvrbN7YdwUVP5HCxDMyWKqk

            1/   use: change (internal)
                xprvA1t6Pgks9siC3e7MxAcqx8LNoQ66PDZ8AEZKen8e6DG3ZS1XHPwKN5
                    KV3Svo1Wec4BzddboWo5MXBsfdXPBXHJuJ77fvGZGQvw1psBav2JE
                xpub6EsSoCHkzFGVG8Bq4C9rKGH7MRvangGyXTUvTAYFeYo2SELfpwFZus
                    dxth1Z1eG6EY7iyMzQ1mmmu7Bf22hA1PzGFHibPo2EFPtdfjukrDZ
              0: XHCArmQqks7j3UqGhBZJpEHMjV2hngmrtEr1WFmpZ4mNGnXr4n8h
                 XszxPBoxy3jHAaR2jGLEBiwydNqK79g6rp
              1: XEo3yb5JfvJsWCDZ9y7CY7vniMT34ikD1hgPeGEwr7iJNDHsZ3bg
                 Xgp6tGcqC3kSQZmmaEUsapZBJvX7niDx3Q
              2: XF7qdspju1JVXxisNHrQ3KXRfaDJ9qoXAwqSaUdrTm4fYqiebKdF
                 XnpqWiRSLAggJd32Q9tjYV7qPD1QRpe9pJ
```

## Catmonic with Empty Secret

Recovery Phrase:

```txt
cat swing flag economy stadium alone churn speed unique patch report train
```

Secret:

` ` (empty)

Seed:

```txt
7ea73b3a398f8a71f7dde589d972b0358d3fa8b9e91317ecc544e42752b1bb251a1926b1f4c69eec0a80c0396aa0f7df29f7d73411d3106eba539f3d584fcdf8
```

HD Paths, WIFs, and Addrs:

(DASH BIP-44 Wallet, Accounts 0-2, both uses, Keys 0-2)

```txt
m/44'/5'/0'/     Dash bip44 wallet, account 0
            0/   use: receiving (external)
                xprvA2B7h8cUMBenzBewd9PYVMXxrJYieRBatSDvVuMWGVDxsarFpu7qZj
                    JkWiPeUp874AfHwdWvzHwkAruja2sFr3GHryf3htPjD4b68vVCbmv
                xpub6FAU6e9NBZD6CfjQjAvYrVUhQLPD3suSFf9XJHm7ppkwkPBQNSS67X
                    dEN1Z24aMPoPBS8s6UbGyNmuTMZNRTmCK9fmctwgh22oa3RfXoA53
              0: XJbiyiSnBTaWEXgNXenXLsPTBCw8fPeP1iQf8hrusKdvj74uiYEZ
                 XyqBhjoHFToC9nCk15t6eZ5L3TiARZW5Wm
              1: XDU7XFJ6hKiwjRd5ciAByyhJ2SaHAZoAT4PZ93dJSrKhyh9dF2AE
                 XnYnarMaHq3kAXYEqEtXWnu7EeE9u4LRT2
              2: XJcDDfJCFrYv8WkAPAfn18tkUZAjbTMs7RbskquGb8nZnA4TZiwc
                 XvUDdENbiG1bmVMtwudU6LuYqUq2suyL71

            1/   use: change (internal)
                xprvA2B7h8cUMBeo3DQcfmtDC5LYfGnkw337poESbzvzZjAvFpweRxEzyf
                    4qB11v4LrhbzbskWJ1bD9Ka4ckLSZ88fJ4xWj2Cw3yXHLgfw7Zubz
                xpub6FAU6e9NBZD6FhV5moRDZDHHDJdFLVkyC2A3QPLc84hu8dGnyVZFXT
                    PK2GNwvK2vZRkHbeNrywhvjRQVpudYmzMBZWw5nDydsH765wUp9DS
              0: XHLwx7UXHDCK6HLrYaj3F4HKMpHmWvt7oGCABnsf6uUaiPacmoUT
                 XfUXHXRxUyESx9YuUCZHQFdaDWsqg5xybq
              1: XHbTJo8GQeomSEz26DtLhkQATqkiW6zhZnafc5AzeiXwzyQvmhwS
                 Xfv3jn39pzXkXn4efZdAyKiucsU6zQKQho
              2: XBpmu2Sig5Y2YtoXVzbTCKvhvMogKrEiGRJcmBBd8RizcTvJTygY
                 XghgpstP3Mnok5f5cDiQW2yzAMzYcfquq4


m/44'/5'/1'/     Dash bip44 wallet, account 1
            0/   use: receiving (external)
                xprvA176nNh1o3LKNV2jarbdBuJq5ckFamD1ruPhRnuSiFRn8TxVozsDHC
                    GhYuKTMmBQE2YS18TD9YayzMyq9ZqozEzZW36oj6f3ruPqieVLaG8
                xpub6E6TBtDudQtcay7Cgt8dZ3FZdeajzDvsE8KJEBK4Gaxm1GHeMYBTpz
                    bBQCdVZFyk9GgG747URT2n9eyGYbSfpzHZzt6fhG6oCyNnhbkXmE4
              0: XBpiqskLSouP5JtFRXAwMx5n2sJmsAqChEWKykBBXiPj2CpXd2pX
                 XcLGkA6pEahA8ZamsBLuwiQb1t4p4YHVZC
              1: XDdHZXGP3zd15BV71McsEQphFccWJibez5zbZLM7yV3c82KHjV6X
                 XagrePYNYEbyRt8YWAFqgo7Yo5nrVvdCZH
              2: XK9Gqg2FVP7cCE3Aof2oKfFzi3Lp5gnrwGBAAX6N1dqhuq3EQBUG
                 XuPwJJW8iu2ncvBJR1a3SepTkzCrC44jiZ

            1/   use: change (internal)
                xprvA176nNh1o3LKSkbLVhCodw62UxfWUbAzWCkxHuCyd5irfAKsCY9B1V
                    uzFN9hCBQToVUrNiXsH4CpCx4jdYbNSEuqppAazFVo52zJyCjXu8d
                xpub6E6TBtDudQtcfEfobijp152m2zVzt3tqsRgZ6HcbBRFqXxf1k5TRZJ
                    EU6f6RefZoJVDMMY4L1UYAF5zdDJVmCkXseUBrXUHaj83CzqJXmBd
              0: XEuXd1GBA8Ur18tdfMg8D76acbedPzqryh6969vr4h8kmrtqXme6
                 XocGaGb3nd5Zg9tXaEceoGjHGDiSS9AZQ5
              1: XCpEXZpqc9YDask4ZPYHqk3ZwSzGmj2cZRGfex4g3KxaUtcEyETJ
                 XxQzPhZvD9SESguddUBZDqiA72143WbDzC
              2: XK6sSL192neDSXSFKCmtM7X6RAymiKJZGPHhXMmm2a29SA9BtSi9
                 XdpaP9r6RrfLMtGnEtFm3evXvSAFB2MYVg


m/44'/5'/2'/     Dash bip44 wallet, account 2
            0/   use: receiving (external)
                xprvA27ZgFXovqak1VWv8c9Br1QBk4cbDEN8gDinmRtHzwvUQEtsu1BBnR
                    JxpZAqaWAWwNGiDNYKCW5VGnZo6EyR6puo8ng6m91eU28GpPcsc2F
                xpub6F6v5m4hmD93DybPEdgCD9LvJ6T5ch5z3SePZpHuZHTTH3E2SYVSLD
                    dSfr26sfgXYaAgMf2WkZwrQaKATzpQUjnEfiMXGz34o5NRiGjPF8c
              0: XEfCdFiyNLj76CjEDn7CyT4Kaz4PU4vgeU1C9CZMjdSZeNHcNxEb
                 XkjgvsFH84RZmzmo3nDY8fErQJsRJRSZEN
              1: XDFr27efUXzyqMVtBSztfr1TpyajRg86Vbz6tDxC1J9ewbv2caV8
                 XgDXa5sfkmsdLQuQbmFzyNgow2fGDbJEb1
              2: XHXJSVG3C3icj1z6FdVAJVYxZkdw7vBmZTHDcAeDjzvRcY4nM3q4
                 Xmq6iNJZP6QdfSvtbkXtwG71Cyq6r5UbWf
              3: XD87TSjvnV6jjUTzKm8Qd4FWFS4YsuVikxpps66vFnvFicVDzmnM
                 XoxLtBf6ZkZR6whKMW3GAYdfvxQogLP6qP
              4: XG1oupVmmBBnvvHfnaeUCS2jUPFyv4cbGYa3cKPjtbAPsv8nhskP
                 XvD1Tigx5fhhX1v5JkeAohtDhyfvwDyMUP
              5: XCihSR22eCQCwjSwSJCTmctvhK6TbjTZRaKKXL8pm4xKRavubHpK
                 Xy9LtU4BgtXAeTi4e6QzHSAJULbe2sCa6r

            1/   use: change (internal)
                xprvA27ZgFXovqak2NWDMQUkAZ72FpNWCKB18ZDfwQujbST2RnPHxV3zhD
                    kh1ycSu1qgNkPAozZJq6uhPRRMGKoPu4VAsKzJnBUBjzW7DuEFMTu
                xpub6F6v5m4hmD93EragTS1kXh3korCzbmtrVn9GjoKM9mz1JaiSW2NFF2
                    5AsGGWkeWRhUBU8thhpQE6p2aFGY68HNZ5KcTJ46ygJyDhPukfrSx
              0: XJpTtaThyiEZm4uRwWA51PRT6iLA2XFsKLsAQNSbncyTToFdkHvC
                 XcZfL8sTULeffaXj17awb413jVtZeoeSzQ
              1: XJHx2HGMnS9M87V6oVFg8Ttbd7uXJGhgqH2RdSayQDizJj9U7jb2
                 Xv6MUh3Fk7FTtrNikY7TayBbdJ6pBkLkE9
              2: XJkDPXV9YqJNXYaBfJVZmoLvbzAovS5ShJ6cTpcWtXi45UCvBrsb
                 XdTGvNpFHVHgoWPTjgvmYiMcoqvSDS3yDS
```
