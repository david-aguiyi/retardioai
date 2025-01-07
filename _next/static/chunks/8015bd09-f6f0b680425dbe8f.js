"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [94],
  {
    2643: (e, t, i) => {
      i.d(t, { Kt: () => $, ZX: () => _ });
      var r = i(8287),
        s = i(5878),
        n = i(9404),
        a = i.n(n),
        o = i(3466),
        u = i.n(o),
        c = i(2467),
        l = i(2755),
        d = i(601),
        h = i(184),
        g = i(2150);
      i(22), i(6655);
      var p = i(3741),
        y = i(6128);
      s.ev.utils.randomPrivateKey;
      let m = () => {
          let e = s.ev.utils.randomPrivateKey(),
            t = b(e),
            i = new Uint8Array(64);
          return i.set(e), i.set(t, 32), { publicKey: t, secretKey: i };
        },
        b = s.ev.getPublicKey;
      function f(e) {
        try {
          return s.ev.ExtendedPoint.fromHex(e), !0;
        } catch {
          return !1;
        }
      }
      let k = (e, t) => s.ev.sign(e, t.slice(0, 32)),
        w = s.ev.verify,
        I = (e) =>
          r.Buffer.isBuffer(e)
            ? e
            : e instanceof Uint8Array
            ? r.Buffer.from(e.buffer, e.byteOffset, e.byteLength)
            : r.Buffer.from(e);
      class S {
        constructor(e) {
          Object.assign(this, e);
        }
        encode() {
          return r.Buffer.from((0, l.serialize)(W, this));
        }
        static decode(e) {
          return (0, l.deserialize)(W, this, e);
        }
        static decodeUnchecked(e) {
          return (0, l.deserializeUnchecked)(W, this, e);
        }
      }
      let W = new Map(),
        v = 1;
      class A extends S {
        constructor(e) {
          if ((super({}), (this._bn = void 0), void 0 !== e._bn))
            this._bn = e._bn;
          else {
            if ("string" == typeof e) {
              let t = u().decode(e);
              if (32 != t.length) throw Error("Invalid public key input");
              this._bn = new (a())(t);
            } else this._bn = new (a())(e);
            if (this._bn.byteLength() > 32)
              throw Error("Invalid public key input");
          }
        }
        static unique() {
          let e = new A(v);
          return (v += 1), new A(e.toBuffer());
        }
        equals(e) {
          return this._bn.eq(e._bn);
        }
        toBase58() {
          return u().encode(this.toBytes());
        }
        toJSON() {
          return this.toBase58();
        }
        toBytes() {
          let e = this.toBuffer();
          return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
        }
        toBuffer() {
          let e = this._bn.toArrayLike(r.Buffer);
          if (32 === e.length) return e;
          let t = r.Buffer.alloc(32);
          return e.copy(t, 32 - e.length), t;
        }
        get [Symbol.toStringTag]() {
          return `PublicKey(${this.toString()})`;
        }
        toString() {
          return this.toBase58();
        }
        static async createWithSeed(e, t, i) {
          let s = r.Buffer.concat([
            e.toBuffer(),
            r.Buffer.from(t),
            i.toBuffer(),
          ]);
          return new A((0, c.sc)(s));
        }
        static createProgramAddressSync(e, t) {
          let i = r.Buffer.alloc(0);
          e.forEach(function (e) {
            if (e.length > 32) throw TypeError("Max seed length exceeded");
            i = r.Buffer.concat([i, I(e)]);
          }),
            (i = r.Buffer.concat([
              i,
              t.toBuffer(),
              r.Buffer.from("ProgramDerivedAddress"),
            ]));
          let s = (0, c.sc)(i);
          if (f(s))
            throw Error("Invalid seeds, address must fall off the curve");
          return new A(s);
        }
        static async createProgramAddress(e, t) {
          return this.createProgramAddressSync(e, t);
        }
        static findProgramAddressSync(e, t) {
          let i,
            s = 255;
          for (; 0 != s; ) {
            try {
              let n = e.concat(r.Buffer.from([s]));
              i = this.createProgramAddressSync(n, t);
            } catch (e) {
              if (e instanceof TypeError) throw e;
              s--;
              continue;
            }
            return [i, s];
          }
          throw Error("Unable to find a viable program address nonce");
        }
        static async findProgramAddress(e, t) {
          return this.findProgramAddressSync(e, t);
        }
        static isOnCurve(e) {
          return f(new A(e).toBytes());
        }
      }
      (A.default = new A("11111111111111111111111111111111")),
        W.set(A, { kind: "struct", fields: [["_bn", "u256"]] }),
        new A("BPFLoader1111111111111111111111111111111111");
      class x extends Error {
        constructor(e) {
          super(`Signature ${e} has expired: block height exceeded.`),
            (this.signature = void 0),
            (this.signature = e);
        }
      }
      Object.defineProperty(x.prototype, "name", {
        value: "TransactionExpiredBlockheightExceededError",
      });
      class B extends Error {
        constructor(e, t) {
          super(
            `Transaction was not confirmed in ${t.toFixed(
              2
            )} seconds. It is unknown if it succeeded or failed. Check signature ${e} using the Solana Explorer or CLI tools.`
          ),
            (this.signature = void 0),
            (this.signature = e);
        }
      }
      Object.defineProperty(B.prototype, "name", {
        value: "TransactionExpiredTimeoutError",
      });
      class P extends Error {
        constructor(e) {
          super(`Signature ${e} has expired: the nonce is no longer valid.`),
            (this.signature = void 0),
            (this.signature = e);
        }
      }
      Object.defineProperty(P.prototype, "name", {
        value: "TransactionExpiredNonceInvalidError",
      });
      class Y {
        constructor(e, t) {
          (this.staticAccountKeys = void 0),
            (this.accountKeysFromLookups = void 0),
            (this.staticAccountKeys = e),
            (this.accountKeysFromLookups = t);
        }
        keySegments() {
          let e = [this.staticAccountKeys];
          return (
            this.accountKeysFromLookups &&
              (e.push(this.accountKeysFromLookups.writable),
              e.push(this.accountKeysFromLookups.readonly)),
            e
          );
        }
        get(e) {
          for (let t of this.keySegments()) {
            if (e < t.length) return t[e];
            e -= t.length;
          }
        }
        get length() {
          return this.keySegments().flat().length;
        }
        compileInstructions(e) {
          if (this.length > 256)
            throw Error(
              "Account index overflow encountered during compilation"
            );
          let t = new Map();
          this.keySegments()
            .flat()
            .forEach((e, i) => {
              t.set(e.toBase58(), i);
            });
          let i = (e) => {
            let i = t.get(e.toBase58());
            if (void 0 === i)
              throw Error(
                "Encountered an unknown instruction account key during compilation"
              );
            return i;
          };
          return e.map((e) => ({
            programIdIndex: i(e.programId),
            accountKeyIndexes: e.keys.map((e) => i(e.pubkey)),
            data: e.data,
          }));
        }
      }
      let N = (e = "publicKey") => d.av(32, e),
        K = (e = "signature") => d.av(64, e),
        z = (e = "string") => {
          let t = d.w3(
              [
                d.DH("length"),
                d.DH("lengthPadding"),
                d.av(d.cY(d.DH(), -8), "chars"),
              ],
              e
            ),
            i = t.decode.bind(t),
            s = t.encode.bind(t);
          return (
            (t.decode = (e, t) => i(e, t).chars.toString()),
            (t.encode = (e, t, i) =>
              s({ chars: r.Buffer.from(e, "utf8") }, t, i)),
            (t.alloc = (e) =>
              d.DH().span + d.DH().span + r.Buffer.from(e, "utf8").length),
            t
          );
        };
      function O(e) {
        let t = 0,
          i = 0;
        for (;;) {
          let r = e.shift();
          if (((t |= (127 & r) << (7 * i)), (i += 1), (128 & r) == 0)) break;
        }
        return t;
      }
      function T(e, t) {
        let i = t;
        for (;;) {
          let t = 127 & i;
          if (0 == (i >>= 7)) {
            e.push(t);
            break;
          }
          (t |= 128), e.push(t);
        }
      }
      function L(e, t) {
        if (!e) throw Error(t || "Assertion failed");
      }
      class E {
        constructor(e, t) {
          (this.payer = void 0),
            (this.keyMetaMap = void 0),
            (this.payer = e),
            (this.keyMetaMap = t);
        }
        static compile(e, t) {
          let i = new Map(),
            r = (e) => {
              let t = e.toBase58(),
                r = i.get(t);
              return (
                void 0 === r &&
                  ((r = { isSigner: !1, isWritable: !1, isInvoked: !1 }),
                  i.set(t, r)),
                r
              );
            },
            s = r(t);
          for (let t of ((s.isSigner = !0), (s.isWritable = !0), e))
            for (let e of ((r(t.programId).isInvoked = !0), t.keys)) {
              let t = r(e.pubkey);
              (t.isSigner ||= e.isSigner), (t.isWritable ||= e.isWritable);
            }
          return new E(t, i);
        }
        getMessageComponents() {
          let e = [...this.keyMetaMap.entries()];
          L(e.length <= 256, "Max static account keys length exceeded");
          let t = e.filter(([, e]) => e.isSigner && e.isWritable),
            i = e.filter(([, e]) => e.isSigner && !e.isWritable),
            r = e.filter(([, e]) => !e.isSigner && e.isWritable),
            s = e.filter(([, e]) => !e.isSigner && !e.isWritable),
            n = {
              numRequiredSignatures: t.length + i.length,
              numReadonlySignedAccounts: i.length,
              numReadonlyUnsignedAccounts: s.length,
            };
          {
            L(t.length > 0, "Expected at least one writable signer key");
            let [e] = t[0];
            L(
              e === this.payer.toBase58(),
              "Expected first writable signer key to be the fee payer"
            );
          }
          return [
            n,
            [
              ...t.map(([e]) => new A(e)),
              ...i.map(([e]) => new A(e)),
              ...r.map(([e]) => new A(e)),
              ...s.map(([e]) => new A(e)),
            ],
          ];
        }
        extractTableLookup(e) {
          let [t, i] = this.drainKeysFoundInLookupTable(
              e.state.addresses,
              (e) => !e.isSigner && !e.isInvoked && e.isWritable
            ),
            [r, s] = this.drainKeysFoundInLookupTable(
              e.state.addresses,
              (e) => !e.isSigner && !e.isInvoked && !e.isWritable
            );
          if (0 !== t.length || 0 !== r.length)
            return [
              { accountKey: e.key, writableIndexes: t, readonlyIndexes: r },
              { writable: i, readonly: s },
            ];
        }
        drainKeysFoundInLookupTable(e, t) {
          let i = [],
            r = [];
          for (let [s, n] of this.keyMetaMap.entries())
            if (t(n)) {
              let t = new A(s),
                n = e.findIndex((e) => e.equals(t));
              n >= 0 &&
                (L(n < 256, "Max lookup table index exceeded"),
                i.push(n),
                r.push(t),
                this.keyMetaMap.delete(s));
            }
          return [i, r];
        }
      }
      let j = "Reached end of buffer unexpectedly";
      function q(e) {
        if (0 === e.length) throw Error(j);
        return e.shift();
      }
      function H(e, ...t) {
        let [i] = t;
        if (2 === t.length ? i + (t[1] ?? 0) > e.length : i >= e.length)
          throw Error(j);
        return e.splice(...t);
      }
      class D {
        constructor(e) {
          (this.header = void 0),
            (this.accountKeys = void 0),
            (this.recentBlockhash = void 0),
            (this.instructions = void 0),
            (this.indexToProgramIds = new Map()),
            (this.header = e.header),
            (this.accountKeys = e.accountKeys.map((e) => new A(e))),
            (this.recentBlockhash = e.recentBlockhash),
            (this.instructions = e.instructions),
            this.instructions.forEach((e) =>
              this.indexToProgramIds.set(
                e.programIdIndex,
                this.accountKeys[e.programIdIndex]
              )
            );
        }
        get version() {
          return "legacy";
        }
        get staticAccountKeys() {
          return this.accountKeys;
        }
        get compiledInstructions() {
          return this.instructions.map((e) => ({
            programIdIndex: e.programIdIndex,
            accountKeyIndexes: e.accounts,
            data: u().decode(e.data),
          }));
        }
        get addressTableLookups() {
          return [];
        }
        getAccountKeys() {
          return new Y(this.staticAccountKeys);
        }
        static compile(e) {
          let [t, i] = E.compile(
              e.instructions,
              e.payerKey
            ).getMessageComponents(),
            r = new Y(i)
              .compileInstructions(e.instructions)
              .map((e) => ({
                programIdIndex: e.programIdIndex,
                accounts: e.accountKeyIndexes,
                data: u().encode(e.data),
              }));
          return new D({
            header: t,
            accountKeys: i,
            recentBlockhash: e.recentBlockhash,
            instructions: r,
          });
        }
        isAccountSigner(e) {
          return e < this.header.numRequiredSignatures;
        }
        isAccountWritable(e) {
          let t = this.header.numRequiredSignatures;
          if (!(e >= this.header.numRequiredSignatures))
            return e < t - this.header.numReadonlySignedAccounts;
          {
            let i =
              this.accountKeys.length -
              t -
              this.header.numReadonlyUnsignedAccounts;
            return e - t < i;
          }
        }
        isProgramId(e) {
          return this.indexToProgramIds.has(e);
        }
        programIds() {
          return [...this.indexToProgramIds.values()];
        }
        nonProgramIds() {
          return this.accountKeys.filter((e, t) => !this.isProgramId(t));
        }
        serialize() {
          let e = this.accountKeys.length,
            t = [];
          T(t, e);
          let i = this.instructions.map((e) => {
              let { accounts: t, programIdIndex: i } = e,
                s = Array.from(u().decode(e.data)),
                n = [];
              T(n, t.length);
              let a = [];
              return (
                T(a, s.length),
                {
                  programIdIndex: i,
                  keyIndicesCount: r.Buffer.from(n),
                  keyIndices: t,
                  dataLength: r.Buffer.from(a),
                  data: s,
                }
              );
            }),
            s = [];
          T(s, i.length);
          let n = r.Buffer.alloc(1232);
          r.Buffer.from(s).copy(n);
          let a = s.length;
          i.forEach((e) => {
            let t = d
              .w3([
                d.u8("programIdIndex"),
                d.av(e.keyIndicesCount.length, "keyIndicesCount"),
                d.O6(d.u8("keyIndex"), e.keyIndices.length, "keyIndices"),
                d.av(e.dataLength.length, "dataLength"),
                d.O6(d.u8("userdatum"), e.data.length, "data"),
              ])
              .encode(e, n, a);
            a += t;
          }),
            (n = n.slice(0, a));
          let o = d.w3([
              d.av(1, "numRequiredSignatures"),
              d.av(1, "numReadonlySignedAccounts"),
              d.av(1, "numReadonlyUnsignedAccounts"),
              d.av(t.length, "keyCount"),
              d.O6(N("key"), e, "keys"),
              N("recentBlockhash"),
            ]),
            c = {
              numRequiredSignatures: r.Buffer.from([
                this.header.numRequiredSignatures,
              ]),
              numReadonlySignedAccounts: r.Buffer.from([
                this.header.numReadonlySignedAccounts,
              ]),
              numReadonlyUnsignedAccounts: r.Buffer.from([
                this.header.numReadonlyUnsignedAccounts,
              ]),
              keyCount: r.Buffer.from(t),
              keys: this.accountKeys.map((e) => I(e.toBytes())),
              recentBlockhash: u().decode(this.recentBlockhash),
            },
            l = r.Buffer.alloc(2048),
            h = o.encode(c, l);
          return n.copy(l, h), l.slice(0, h + n.length);
        }
        static from(e) {
          let t = [...e],
            i = q(t);
          if (i !== (127 & i))
            throw Error(
              "Versioned messages must be deserialized with VersionedMessage.deserialize()"
            );
          let s = q(t),
            n = q(t),
            a = O(t),
            o = [];
          for (let e = 0; e < a; e++) {
            let e = H(t, 0, 32);
            o.push(new A(r.Buffer.from(e)));
          }
          let c = H(t, 0, 32),
            l = O(t),
            d = [];
          for (let e = 0; e < l; e++) {
            let e = q(t),
              i = O(t),
              s = H(t, 0, i),
              n = O(t),
              a = H(t, 0, n),
              o = u().encode(r.Buffer.from(a));
            d.push({ programIdIndex: e, accounts: s, data: o });
          }
          return new D({
            header: {
              numRequiredSignatures: i,
              numReadonlySignedAccounts: s,
              numReadonlyUnsignedAccounts: n,
            },
            recentBlockhash: u().encode(r.Buffer.from(c)),
            accountKeys: o,
            instructions: d,
          });
        }
      }
      class C {
        constructor(e) {
          (this.header = void 0),
            (this.staticAccountKeys = void 0),
            (this.recentBlockhash = void 0),
            (this.compiledInstructions = void 0),
            (this.addressTableLookups = void 0),
            (this.header = e.header),
            (this.staticAccountKeys = e.staticAccountKeys),
            (this.recentBlockhash = e.recentBlockhash),
            (this.compiledInstructions = e.compiledInstructions),
            (this.addressTableLookups = e.addressTableLookups);
        }
        get version() {
          return 0;
        }
        get numAccountKeysFromLookups() {
          let e = 0;
          for (let t of this.addressTableLookups)
            e += t.readonlyIndexes.length + t.writableIndexes.length;
          return e;
        }
        getAccountKeys(e) {
          let t;
          if (e && "accountKeysFromLookups" in e && e.accountKeysFromLookups) {
            if (
              this.numAccountKeysFromLookups !=
              e.accountKeysFromLookups.writable.length +
                e.accountKeysFromLookups.readonly.length
            )
              throw Error(
                "Failed to get account keys because of a mismatch in the number of account keys from lookups"
              );
            t = e.accountKeysFromLookups;
          } else if (
            e &&
            "addressLookupTableAccounts" in e &&
            e.addressLookupTableAccounts
          )
            t = this.resolveAddressTableLookups(e.addressLookupTableAccounts);
          else if (this.addressTableLookups.length > 0)
            throw Error(
              "Failed to get account keys because address table lookups were not resolved"
            );
          return new Y(this.staticAccountKeys, t);
        }
        isAccountSigner(e) {
          return e < this.header.numRequiredSignatures;
        }
        isAccountWritable(e) {
          let t = this.header.numRequiredSignatures,
            i = this.staticAccountKeys.length;
          if (e >= i)
            return (
              e - i <
              this.addressTableLookups.reduce(
                (e, t) => e + t.writableIndexes.length,
                0
              )
            );
          if (!(e >= this.header.numRequiredSignatures))
            return e < t - this.header.numReadonlySignedAccounts;
          {
            let r = i - t - this.header.numReadonlyUnsignedAccounts;
            return e - t < r;
          }
        }
        resolveAddressTableLookups(e) {
          let t = { writable: [], readonly: [] };
          for (let i of this.addressTableLookups) {
            let r = e.find((e) => e.key.equals(i.accountKey));
            if (!r)
              throw Error(
                `Failed to find address lookup table account for table key ${i.accountKey.toBase58()}`
              );
            for (let e of i.writableIndexes)
              if (e < r.state.addresses.length)
                t.writable.push(r.state.addresses[e]);
              else
                throw Error(
                  `Failed to find address for index ${e} in address lookup table ${i.accountKey.toBase58()}`
                );
            for (let e of i.readonlyIndexes)
              if (e < r.state.addresses.length)
                t.readonly.push(r.state.addresses[e]);
              else
                throw Error(
                  `Failed to find address for index ${e} in address lookup table ${i.accountKey.toBase58()}`
                );
          }
          return t;
        }
        static compile(e) {
          let t = E.compile(e.instructions, e.payerKey),
            i = [],
            r = { writable: [], readonly: [] };
          for (let s of e.addressLookupTableAccounts || []) {
            let e = t.extractTableLookup(s);
            if (void 0 !== e) {
              let [t, { writable: s, readonly: n }] = e;
              i.push(t), r.writable.push(...s), r.readonly.push(...n);
            }
          }
          let [s, n] = t.getMessageComponents(),
            a = new Y(n, r).compileInstructions(e.instructions);
          return new C({
            header: s,
            staticAccountKeys: n,
            recentBlockhash: e.recentBlockhash,
            compiledInstructions: a,
            addressTableLookups: i,
          });
        }
        serialize() {
          let e = [];
          T(e, this.staticAccountKeys.length);
          let t = this.serializeInstructions(),
            i = [];
          T(i, this.compiledInstructions.length);
          let r = this.serializeAddressTableLookups(),
            s = [];
          T(s, this.addressTableLookups.length);
          let n = d.w3([
              d.u8("prefix"),
              d.w3(
                [
                  d.u8("numRequiredSignatures"),
                  d.u8("numReadonlySignedAccounts"),
                  d.u8("numReadonlyUnsignedAccounts"),
                ],
                "header"
              ),
              d.av(e.length, "staticAccountKeysLength"),
              d.O6(N(), this.staticAccountKeys.length, "staticAccountKeys"),
              N("recentBlockhash"),
              d.av(i.length, "instructionsLength"),
              d.av(t.length, "serializedInstructions"),
              d.av(s.length, "addressTableLookupsLength"),
              d.av(r.length, "serializedAddressTableLookups"),
            ]),
            a = new Uint8Array(1232),
            o = n.encode(
              {
                prefix: 128,
                header: this.header,
                staticAccountKeysLength: new Uint8Array(e),
                staticAccountKeys: this.staticAccountKeys.map((e) =>
                  e.toBytes()
                ),
                recentBlockhash: u().decode(this.recentBlockhash),
                instructionsLength: new Uint8Array(i),
                serializedInstructions: t,
                addressTableLookupsLength: new Uint8Array(s),
                serializedAddressTableLookups: r,
              },
              a
            );
          return a.slice(0, o);
        }
        serializeInstructions() {
          let e = 0,
            t = new Uint8Array(1232);
          for (let i of this.compiledInstructions) {
            let r = [];
            T(r, i.accountKeyIndexes.length);
            let s = [];
            T(s, i.data.length);
            let n = d.w3([
              d.u8("programIdIndex"),
              d.av(r.length, "encodedAccountKeyIndexesLength"),
              d.O6(d.u8(), i.accountKeyIndexes.length, "accountKeyIndexes"),
              d.av(s.length, "encodedDataLength"),
              d.av(i.data.length, "data"),
            ]);
            e += n.encode(
              {
                programIdIndex: i.programIdIndex,
                encodedAccountKeyIndexesLength: new Uint8Array(r),
                accountKeyIndexes: i.accountKeyIndexes,
                encodedDataLength: new Uint8Array(s),
                data: i.data,
              },
              t,
              e
            );
          }
          return t.slice(0, e);
        }
        serializeAddressTableLookups() {
          let e = 0,
            t = new Uint8Array(1232);
          for (let i of this.addressTableLookups) {
            let r = [];
            T(r, i.writableIndexes.length);
            let s = [];
            T(s, i.readonlyIndexes.length);
            let n = d.w3([
              N("accountKey"),
              d.av(r.length, "encodedWritableIndexesLength"),
              d.O6(d.u8(), i.writableIndexes.length, "writableIndexes"),
              d.av(s.length, "encodedReadonlyIndexesLength"),
              d.O6(d.u8(), i.readonlyIndexes.length, "readonlyIndexes"),
            ]);
            e += n.encode(
              {
                accountKey: i.accountKey.toBytes(),
                encodedWritableIndexesLength: new Uint8Array(r),
                writableIndexes: i.writableIndexes,
                encodedReadonlyIndexesLength: new Uint8Array(s),
                readonlyIndexes: i.readonlyIndexes,
              },
              t,
              e
            );
          }
          return t.slice(0, e);
        }
        static deserialize(e) {
          let t = [...e],
            i = q(t),
            r = 127 & i;
          L(i !== r, "Expected versioned message but received legacy message"),
            L(
              0 === r,
              `Expected versioned message with version 0 but found version ${r}`
            );
          let s = {
              numRequiredSignatures: q(t),
              numReadonlySignedAccounts: q(t),
              numReadonlyUnsignedAccounts: q(t),
            },
            n = [],
            a = O(t);
          for (let e = 0; e < a; e++) n.push(new A(H(t, 0, 32)));
          let o = u().encode(H(t, 0, 32)),
            c = O(t),
            l = [];
          for (let e = 0; e < c; e++) {
            let e = q(t),
              i = O(t),
              r = H(t, 0, i),
              s = O(t),
              n = new Uint8Array(H(t, 0, s));
            l.push({ programIdIndex: e, accountKeyIndexes: r, data: n });
          }
          let d = O(t),
            h = [];
          for (let e = 0; e < d; e++) {
            let e = new A(H(t, 0, 32)),
              i = O(t),
              r = H(t, 0, i),
              s = O(t),
              n = H(t, 0, s);
            h.push({ accountKey: e, writableIndexes: r, readonlyIndexes: n });
          }
          return new C({
            header: s,
            staticAccountKeys: n,
            recentBlockhash: o,
            compiledInstructions: l,
            addressTableLookups: h,
          });
        }
      }
      let M = {
          deserializeMessageVersion(e) {
            let t = e[0],
              i = 127 & t;
            return i === t ? "legacy" : i;
          },
          deserialize: (e) => {
            let t = M.deserializeMessageVersion(e);
            if ("legacy" === t) return D.from(e);
            if (0 === t) return C.deserialize(e);
            throw Error(
              `Transaction message version ${t} deserialization is not supported`
            );
          },
        },
        R = r.Buffer.alloc(64).fill(0);
      class U {
        constructor(e) {
          (this.keys = void 0),
            (this.programId = void 0),
            (this.data = r.Buffer.alloc(0)),
            (this.programId = e.programId),
            (this.keys = e.keys),
            e.data && (this.data = e.data);
        }
        toJSON() {
          return {
            keys: this.keys.map(
              ({ pubkey: e, isSigner: t, isWritable: i }) => ({
                pubkey: e.toJSON(),
                isSigner: t,
                isWritable: i,
              })
            ),
            programId: this.programId.toJSON(),
            data: [...this.data],
          };
        }
      }
      class _ {
        get signature() {
          return this.signatures.length > 0
            ? this.signatures[0].signature
            : null;
        }
        constructor(e) {
          if (
            ((this.signatures = []),
            (this.feePayer = void 0),
            (this.instructions = []),
            (this.recentBlockhash = void 0),
            (this.lastValidBlockHeight = void 0),
            (this.nonceInfo = void 0),
            (this.minNonceContextSlot = void 0),
            (this._message = void 0),
            (this._json = void 0),
            !e)
          )
            return;
          if (
            (e.feePayer && (this.feePayer = e.feePayer),
            e.signatures && (this.signatures = e.signatures),
            Object.prototype.hasOwnProperty.call(e, "nonceInfo"))
          ) {
            let { minContextSlot: t, nonceInfo: i } = e;
            (this.minNonceContextSlot = t), (this.nonceInfo = i);
          } else if (
            Object.prototype.hasOwnProperty.call(e, "lastValidBlockHeight")
          ) {
            let { blockhash: t, lastValidBlockHeight: i } = e;
            (this.recentBlockhash = t), (this.lastValidBlockHeight = i);
          } else {
            let { recentBlockhash: t, nonceInfo: i } = e;
            i && (this.nonceInfo = i), (this.recentBlockhash = t);
          }
        }
        toJSON() {
          return {
            recentBlockhash: this.recentBlockhash || null,
            feePayer: this.feePayer ? this.feePayer.toJSON() : null,
            nonceInfo: this.nonceInfo
              ? {
                  nonce: this.nonceInfo.nonce,
                  nonceInstruction: this.nonceInfo.nonceInstruction.toJSON(),
                }
              : null,
            instructions: this.instructions.map((e) => e.toJSON()),
            signers: this.signatures.map(({ publicKey: e }) => e.toJSON()),
          };
        }
        add(...e) {
          if (0 === e.length) throw Error("No instructions");
          return (
            e.forEach((e) => {
              "instructions" in e
                ? (this.instructions = this.instructions.concat(e.instructions))
                : "data" in e && "programId" in e && "keys" in e
                ? this.instructions.push(e)
                : this.instructions.push(new U(e));
            }),
            this
          );
        }
        compileMessage() {
          let e, t, i;
          if (
            this._message &&
            JSON.stringify(this.toJSON()) === JSON.stringify(this._json)
          )
            return this._message;
          if (
            (this.nonceInfo
              ? ((e = this.nonceInfo.nonce),
                (t =
                  this.instructions[0] != this.nonceInfo.nonceInstruction
                    ? [this.nonceInfo.nonceInstruction, ...this.instructions]
                    : this.instructions))
              : ((e = this.recentBlockhash), (t = this.instructions)),
            !e)
          )
            throw Error("Transaction recentBlockhash required");
          if (
            (t.length < 1 && console.warn("No instructions provided"),
            this.feePayer)
          )
            i = this.feePayer;
          else if (this.signatures.length > 0 && this.signatures[0].publicKey)
            i = this.signatures[0].publicKey;
          else throw Error("Transaction fee payer required");
          for (let e = 0; e < t.length; e++)
            if (void 0 === t[e].programId)
              throw Error(
                `Transaction instruction index ${e} has undefined program id`
              );
          let r = [],
            s = [];
          t.forEach((e) => {
            e.keys.forEach((e) => {
              s.push({ ...e });
            });
            let t = e.programId.toString();
            r.includes(t) || r.push(t);
          }),
            r.forEach((e) => {
              s.push({ pubkey: new A(e), isSigner: !1, isWritable: !1 });
            });
          let n = [];
          s.forEach((e) => {
            let t = e.pubkey.toString(),
              i = n.findIndex((e) => e.pubkey.toString() === t);
            i > -1
              ? ((n[i].isWritable = n[i].isWritable || e.isWritable),
                (n[i].isSigner = n[i].isSigner || e.isSigner))
              : n.push(e);
          }),
            n.sort(function (e, t) {
              return e.isSigner !== t.isSigner
                ? e.isSigner
                  ? -1
                  : 1
                : e.isWritable !== t.isWritable
                ? e.isWritable
                  ? -1
                  : 1
                : e.pubkey
                    .toBase58()
                    .localeCompare(t.pubkey.toBase58(), "en", {
                      localeMatcher: "best fit",
                      usage: "sort",
                      sensitivity: "variant",
                      ignorePunctuation: !1,
                      numeric: !1,
                      caseFirst: "lower",
                    });
            });
          let a = n.findIndex((e) => e.pubkey.equals(i));
          if (a > -1) {
            let [e] = n.splice(a, 1);
            (e.isSigner = !0), (e.isWritable = !0), n.unshift(e);
          } else n.unshift({ pubkey: i, isSigner: !0, isWritable: !0 });
          for (let e of this.signatures) {
            let t = n.findIndex((t) => t.pubkey.equals(e.publicKey));
            if (t > -1)
              n[t].isSigner ||
                ((n[t].isSigner = !0),
                console.warn(
                  "Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."
                ));
            else throw Error(`unknown signer: ${e.publicKey.toString()}`);
          }
          let o = 0,
            c = 0,
            l = 0,
            d = [],
            h = [];
          n.forEach(({ pubkey: e, isSigner: t, isWritable: i }) => {
            t
              ? (d.push(e.toString()), (o += 1), i || (c += 1))
              : (h.push(e.toString()), i || (l += 1));
          });
          let g = d.concat(h),
            p = t.map((e) => {
              let { data: t, programId: i } = e;
              return {
                programIdIndex: g.indexOf(i.toString()),
                accounts: e.keys.map((e) => g.indexOf(e.pubkey.toString())),
                data: u().encode(t),
              };
            });
          return (
            p.forEach((e) => {
              L(e.programIdIndex >= 0), e.accounts.forEach((e) => L(e >= 0));
            }),
            new D({
              header: {
                numRequiredSignatures: o,
                numReadonlySignedAccounts: c,
                numReadonlyUnsignedAccounts: l,
              },
              accountKeys: g,
              recentBlockhash: e,
              instructions: p,
            })
          );
        }
        _compile() {
          let e = this.compileMessage(),
            t = e.accountKeys.slice(0, e.header.numRequiredSignatures);
          return (
            (this.signatures.length === t.length &&
              this.signatures.every((e, i) => t[i].equals(e.publicKey))) ||
              (this.signatures = t.map((e) => ({
                signature: null,
                publicKey: e,
              }))),
            e
          );
        }
        serializeMessage() {
          return this._compile().serialize();
        }
        async getEstimatedFee(e) {
          return (await e.getFeeForMessage(this.compileMessage())).value;
        }
        setSigners(...e) {
          if (0 === e.length) throw Error("No signers");
          let t = new Set();
          this.signatures = e
            .filter((e) => {
              let i = e.toString();
              return !t.has(i) && (t.add(i), !0);
            })
            .map((e) => ({ signature: null, publicKey: e }));
        }
        sign(...e) {
          if (0 === e.length) throw Error("No signers");
          let t = new Set(),
            i = [];
          for (let r of e) {
            let e = r.publicKey.toString();
            t.has(e) || (t.add(e), i.push(r));
          }
          this.signatures = i.map((e) => ({
            signature: null,
            publicKey: e.publicKey,
          }));
          let r = this._compile();
          this._partialSign(r, ...i);
        }
        partialSign(...e) {
          if (0 === e.length) throw Error("No signers");
          let t = new Set(),
            i = [];
          for (let r of e) {
            let e = r.publicKey.toString();
            t.has(e) || (t.add(e), i.push(r));
          }
          let r = this._compile();
          this._partialSign(r, ...i);
        }
        _partialSign(e, ...t) {
          let i = e.serialize();
          t.forEach((e) => {
            let t = k(i, e.secretKey);
            this._addSignature(e.publicKey, I(t));
          });
        }
        addSignature(e, t) {
          this._compile(), this._addSignature(e, t);
        }
        _addSignature(e, t) {
          L(64 === t.length);
          let i = this.signatures.findIndex((t) => e.equals(t.publicKey));
          if (i < 0) throw Error(`unknown signer: ${e.toString()}`);
          this.signatures[i].signature = r.Buffer.from(t);
        }
        verifySignatures(e = !0) {
          return !this._getMessageSignednessErrors(this.serializeMessage(), e);
        }
        _getMessageSignednessErrors(e, t) {
          let i = {};
          for (let { signature: r, publicKey: s } of this.signatures)
            null === r
              ? t && (i.missing ||= []).push(s)
              : w(r, e, s.toBytes()) || (i.invalid ||= []).push(s);
          return i.invalid || i.missing ? i : void 0;
        }
        serialize(e) {
          let { requireAllSignatures: t, verifySignatures: i } = Object.assign(
              { requireAllSignatures: !0, verifySignatures: !0 },
              e
            ),
            r = this.serializeMessage();
          if (i) {
            let e = this._getMessageSignednessErrors(r, t);
            if (e) {
              let t = "Signature verification failed.";
              throw (
                (e.invalid &&
                  (t += `
Invalid signature for public key${
                    1 === e.invalid.length ? "" : "(s)"
                  } [\`${e.invalid.map((e) => e.toBase58()).join("`, `")}\`].`),
                e.missing &&
                  (t += `
Missing signature for public key${
                    1 === e.missing.length ? "" : "(s)"
                  } [\`${e.missing.map((e) => e.toBase58()).join("`, `")}\`].`),
                Error(t))
              );
            }
          }
          return this._serialize(r);
        }
        _serialize(e) {
          let { signatures: t } = this,
            i = [];
          T(i, t.length);
          let s = i.length + 64 * t.length + e.length,
            n = r.Buffer.alloc(s);
          return (
            L(t.length < 256),
            r.Buffer.from(i).copy(n, 0),
            t.forEach(({ signature: e }, t) => {
              null !== e &&
                (L(64 === e.length, "signature has invalid length"),
                r.Buffer.from(e).copy(n, i.length + 64 * t));
            }),
            e.copy(n, i.length + 64 * t.length),
            L(n.length <= 1232, `Transaction too large: ${n.length} > 1232`),
            n
          );
        }
        get keys() {
          return (
            L(1 === this.instructions.length),
            this.instructions[0].keys.map((e) => e.pubkey)
          );
        }
        get programId() {
          return (
            L(1 === this.instructions.length), this.instructions[0].programId
          );
        }
        get data() {
          return L(1 === this.instructions.length), this.instructions[0].data;
        }
        static from(e) {
          let t = [...e],
            i = O(t),
            s = [];
          for (let e = 0; e < i; e++) {
            let e = H(t, 0, 64);
            s.push(u().encode(r.Buffer.from(e)));
          }
          return _.populate(D.from(t), s);
        }
        static populate(e, t = []) {
          let i = new _();
          return (
            (i.recentBlockhash = e.recentBlockhash),
            e.header.numRequiredSignatures > 0 &&
              (i.feePayer = e.accountKeys[0]),
            t.forEach((t, r) => {
              let s = {
                signature: t == u().encode(R) ? null : u().decode(t),
                publicKey: e.accountKeys[r],
              };
              i.signatures.push(s);
            }),
            e.instructions.forEach((t) => {
              let r = t.accounts.map((t) => {
                let r = e.accountKeys[t];
                return {
                  pubkey: r,
                  isSigner:
                    i.signatures.some(
                      (e) => e.publicKey.toString() === r.toString()
                    ) || e.isAccountSigner(t),
                  isWritable: e.isAccountWritable(t),
                };
              });
              i.instructions.push(
                new U({
                  keys: r,
                  programId: e.accountKeys[t.programIdIndex],
                  data: u().decode(t.data),
                })
              );
            }),
            (i._message = e),
            (i._json = i.toJSON()),
            i
          );
        }
      }
      class $ {
        get version() {
          return this.message.version;
        }
        constructor(e, t) {
          if (
            ((this.signatures = void 0), (this.message = void 0), void 0 !== t)
          )
            L(
              t.length === e.header.numRequiredSignatures,
              "Expected signatures length to be equal to the number of required signatures"
            ),
              (this.signatures = t);
          else {
            let t = [];
            for (let i = 0; i < e.header.numRequiredSignatures; i++)
              t.push(new Uint8Array(64));
            this.signatures = t;
          }
          this.message = e;
        }
        serialize() {
          let e = this.message.serialize(),
            t = [];
          T(t, this.signatures.length);
          let i = d.w3([
              d.av(t.length, "encodedSignaturesLength"),
              d.O6(K(), this.signatures.length, "signatures"),
              d.av(e.length, "serializedMessage"),
            ]),
            r = new Uint8Array(2048),
            s = i.encode(
              {
                encodedSignaturesLength: new Uint8Array(t),
                signatures: this.signatures,
                serializedMessage: e,
              },
              r
            );
          return r.slice(0, s);
        }
        static deserialize(e) {
          let t = [...e],
            i = [],
            r = O(t);
          for (let e = 0; e < r; e++) i.push(new Uint8Array(H(t, 0, 64)));
          return new $(M.deserialize(new Uint8Array(t)), i);
        }
        sign(e) {
          let t = this.message.serialize(),
            i = this.message.staticAccountKeys.slice(
              0,
              this.message.header.numRequiredSignatures
            );
          for (let r of e) {
            let e = i.findIndex((e) => e.equals(r.publicKey));
            L(
              e >= 0,
              `Cannot sign with non signer key ${r.publicKey.toBase58()}`
            ),
              (this.signatures[e] = k(t, r.secretKey));
          }
        }
        addSignature(e, t) {
          L(64 === t.byteLength, "Signature must be 64 bytes long");
          let i = this.message.staticAccountKeys
            .slice(0, this.message.header.numRequiredSignatures)
            .findIndex((t) => t.equals(e));
          L(
            i >= 0,
            `Can not add signature; \`${e.toBase58()}\` is not required to sign this transaction`
          ),
            (this.signatures[i] = t);
        }
      }
      let V = new A("SysvarC1ock11111111111111111111111111111111");
      new A("SysvarEpochSchedu1e111111111111111111111111"),
        new A("Sysvar1nstructions1111111111111111111111111");
      let F = new A("SysvarRecentB1ockHashes11111111111111111111"),
        J = new A("SysvarRent111111111111111111111111111111111");
      new A("SysvarRewards111111111111111111111111111111"),
        new A("SysvarS1otHashes111111111111111111111111111"),
        new A("SysvarS1otHistory11111111111111111111111111");
      let X = new A("SysvarStakeHistory1111111111111111111111111");
      class Z extends Error {
        constructor({
          action: e,
          signature: t,
          transactionMessage: i,
          logs: r,
        }) {
          let s;
          let n = r
              ? `Logs: 
${JSON.stringify(r.slice(-10), null, 2)}. `
              : "",
            a =
              "\nCatch the `SendTransactionError` and call `getLogs()` on it for full details.";
          switch (e) {
            case "send":
              s =
                `Transaction ${t} resulted in an error. 
${i}. ` +
                n +
                a;
              break;
            case "simulate":
              s =
                `Simulation failed. 
Message: ${i}. 
` +
                n +
                a;
              break;
            default:
              s = `Unknown action '${e}'`;
          }
          super(s),
            (this.signature = void 0),
            (this.transactionMessage = void 0),
            (this.transactionLogs = void 0),
            (this.signature = t),
            (this.transactionMessage = i),
            (this.transactionLogs = r || void 0);
        }
        get transactionError() {
          return {
            message: this.transactionMessage,
            logs: Array.isArray(this.transactionLogs)
              ? this.transactionLogs
              : void 0,
          };
        }
        get logs() {
          let e = this.transactionLogs;
          if (null == e || "object" != typeof e || !("then" in e)) return e;
        }
        async getLogs(e) {
          return (
            Array.isArray(this.transactionLogs) ||
              (this.transactionLogs = new Promise((t, i) => {
                e.getTransaction(this.signature)
                  .then((e) => {
                    if (e && e.meta && e.meta.logMessages) {
                      let i = e.meta.logMessages;
                      (this.transactionLogs = i), t(i);
                    } else i(Error("Log messages not found"));
                  })
                  .catch(i);
              })),
            await this.transactionLogs
          );
        }
      }
      async function G(e, t, i, r) {
        let s;
        let n = r && {
            skipPreflight: r.skipPreflight,
            preflightCommitment: r.preflightCommitment || r.commitment,
            maxRetries: r.maxRetries,
            minContextSlot: r.minContextSlot,
          },
          a = await e.sendTransaction(t, i, n);
        if (null != t.recentBlockhash && null != t.lastValidBlockHeight)
          s = (
            await e.confirmTransaction(
              {
                abortSignal: r?.abortSignal,
                signature: a,
                blockhash: t.recentBlockhash,
                lastValidBlockHeight: t.lastValidBlockHeight,
              },
              r && r.commitment
            )
          ).value;
        else if (null != t.minNonceContextSlot && null != t.nonceInfo) {
          let { nonceInstruction: i } = t.nonceInfo,
            n = i.keys[0].pubkey;
          s = (
            await e.confirmTransaction(
              {
                abortSignal: r?.abortSignal,
                minContextSlot: t.minNonceContextSlot,
                nonceAccountPubkey: n,
                nonceValue: t.nonceInfo.nonce,
                signature: a,
              },
              r && r.commitment
            )
          ).value;
        } else
          r?.abortSignal != null &&
            console.warn(
              "sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable."
            ),
            (s = (await e.confirmTransaction(a, r && r.commitment)).value);
        if (s.err) {
          if (null != a)
            throw new Z({
              action: "send",
              signature: a,
              transactionMessage: `Status: (${JSON.stringify(s)})`,
            });
          throw Error(`Transaction ${a} failed (${JSON.stringify(s)})`);
        }
        return a;
      }
      function Q(e, t) {
        let i =
            e.layout.span >= 0
              ? e.layout.span
              : (function e(t, i) {
                  let r = (t) => {
                      if (t.span >= 0) return t.span;
                      if ("function" == typeof t.alloc)
                        return t.alloc(i[t.property]);
                      if ("count" in t && "elementLayout" in t) {
                        let e = i[t.property];
                        if (Array.isArray(e))
                          return e.length * r(t.elementLayout);
                      } else if ("fields" in t)
                        return e({ layout: t }, i[t.property]);
                      return 0;
                    },
                    s = 0;
                  return (
                    t.layout.fields.forEach((e) => {
                      s += r(e);
                    }),
                    s
                  );
                })(e, t),
          s = r.Buffer.alloc(i),
          n = Object.assign({ instruction: e.index }, t);
        return e.layout.encode(n, s), s;
      }
      let ee = d.I0("lamportsPerSignature"),
        et = d.w3([
          d.DH("version"),
          d.DH("state"),
          N("authorizedPubkey"),
          N("nonce"),
          d.w3([ee], "feeCalculator"),
        ]).span,
        ei = (e) => ({ decode: e.decode.bind(e), encode: e.encode.bind(e) }),
        er = (e) => {
          let t = (0, d.av)(8, e),
            { encode: i, decode: s } = ei(t);
          return (
            (t.decode = (e, t) => {
              let i = s(e, t);
              return (0, h.k5)(r.Buffer.from(i));
            }),
            (t.encode = (e, t, r) => i((0, h.Bq)(e, 8), t, r)),
            t
          );
        },
        es = Object.freeze({
          Create: {
            index: 0,
            layout: d.w3([
              d.DH("instruction"),
              d.Wg("lamports"),
              d.Wg("space"),
              N("programId"),
            ]),
          },
          Assign: {
            index: 1,
            layout: d.w3([d.DH("instruction"), N("programId")]),
          },
          Transfer: {
            index: 2,
            layout: d.w3([d.DH("instruction"), er("lamports")]),
          },
          CreateWithSeed: {
            index: 3,
            layout: d.w3([
              d.DH("instruction"),
              N("base"),
              z("seed"),
              d.Wg("lamports"),
              d.Wg("space"),
              N("programId"),
            ]),
          },
          AdvanceNonceAccount: {
            index: 4,
            layout: d.w3([d.DH("instruction")]),
          },
          WithdrawNonceAccount: {
            index: 5,
            layout: d.w3([d.DH("instruction"), d.Wg("lamports")]),
          },
          InitializeNonceAccount: {
            index: 6,
            layout: d.w3([d.DH("instruction"), N("authorized")]),
          },
          AuthorizeNonceAccount: {
            index: 7,
            layout: d.w3([d.DH("instruction"), N("authorized")]),
          },
          Allocate: {
            index: 8,
            layout: d.w3([d.DH("instruction"), d.Wg("space")]),
          },
          AllocateWithSeed: {
            index: 9,
            layout: d.w3([
              d.DH("instruction"),
              N("base"),
              z("seed"),
              d.Wg("space"),
              N("programId"),
            ]),
          },
          AssignWithSeed: {
            index: 10,
            layout: d.w3([
              d.DH("instruction"),
              N("base"),
              z("seed"),
              N("programId"),
            ]),
          },
          TransferWithSeed: {
            index: 11,
            layout: d.w3([
              d.DH("instruction"),
              er("lamports"),
              z("seed"),
              N("programId"),
            ]),
          },
          UpgradeNonceAccount: {
            index: 12,
            layout: d.w3([d.DH("instruction")]),
          },
        });
      class en {
        constructor() {}
        static createAccount(e) {
          let t = Q(es.Create, {
            lamports: e.lamports,
            space: e.space,
            programId: I(e.programId.toBuffer()),
          });
          return new U({
            keys: [
              { pubkey: e.fromPubkey, isSigner: !0, isWritable: !0 },
              { pubkey: e.newAccountPubkey, isSigner: !0, isWritable: !0 },
            ],
            programId: this.programId,
            data: t,
          });
        }
        static transfer(e) {
          let t, i;
          return (
            "basePubkey" in e
              ? ((t = Q(es.TransferWithSeed, {
                  lamports: BigInt(e.lamports),
                  seed: e.seed,
                  programId: I(e.programId.toBuffer()),
                })),
                (i = [
                  { pubkey: e.fromPubkey, isSigner: !1, isWritable: !0 },
                  { pubkey: e.basePubkey, isSigner: !0, isWritable: !1 },
                  { pubkey: e.toPubkey, isSigner: !1, isWritable: !0 },
                ]))
              : ((t = Q(es.Transfer, { lamports: BigInt(e.lamports) })),
                (i = [
                  { pubkey: e.fromPubkey, isSigner: !0, isWritable: !0 },
                  { pubkey: e.toPubkey, isSigner: !1, isWritable: !0 },
                ])),
            new U({ keys: i, programId: this.programId, data: t })
          );
        }
        static assign(e) {
          let t, i;
          return (
            "basePubkey" in e
              ? ((t = Q(es.AssignWithSeed, {
                  base: I(e.basePubkey.toBuffer()),
                  seed: e.seed,
                  programId: I(e.programId.toBuffer()),
                })),
                (i = [
                  { pubkey: e.accountPubkey, isSigner: !1, isWritable: !0 },
                  { pubkey: e.basePubkey, isSigner: !0, isWritable: !1 },
                ]))
              : ((t = Q(es.Assign, { programId: I(e.programId.toBuffer()) })),
                (i = [
                  { pubkey: e.accountPubkey, isSigner: !0, isWritable: !0 },
                ])),
            new U({ keys: i, programId: this.programId, data: t })
          );
        }
        static createAccountWithSeed(e) {
          let t = Q(es.CreateWithSeed, {
              base: I(e.basePubkey.toBuffer()),
              seed: e.seed,
              lamports: e.lamports,
              space: e.space,
              programId: I(e.programId.toBuffer()),
            }),
            i = [
              { pubkey: e.fromPubkey, isSigner: !0, isWritable: !0 },
              { pubkey: e.newAccountPubkey, isSigner: !1, isWritable: !0 },
            ];
          return (
            e.basePubkey.equals(e.fromPubkey) ||
              i.push({ pubkey: e.basePubkey, isSigner: !0, isWritable: !1 }),
            new U({ keys: i, programId: this.programId, data: t })
          );
        }
        static createNonceAccount(e) {
          let t = new _();
          "basePubkey" in e && "seed" in e
            ? t.add(
                en.createAccountWithSeed({
                  fromPubkey: e.fromPubkey,
                  newAccountPubkey: e.noncePubkey,
                  basePubkey: e.basePubkey,
                  seed: e.seed,
                  lamports: e.lamports,
                  space: et,
                  programId: this.programId,
                })
              )
            : t.add(
                en.createAccount({
                  fromPubkey: e.fromPubkey,
                  newAccountPubkey: e.noncePubkey,
                  lamports: e.lamports,
                  space: et,
                  programId: this.programId,
                })
              );
          let i = {
            noncePubkey: e.noncePubkey,
            authorizedPubkey: e.authorizedPubkey,
          };
          return t.add(this.nonceInitialize(i)), t;
        }
        static nonceInitialize(e) {
          let t = Q(es.InitializeNonceAccount, {
            authorized: I(e.authorizedPubkey.toBuffer()),
          });
          return new U({
            keys: [
              { pubkey: e.noncePubkey, isSigner: !1, isWritable: !0 },
              { pubkey: F, isSigner: !1, isWritable: !1 },
              { pubkey: J, isSigner: !1, isWritable: !1 },
            ],
            programId: this.programId,
            data: t,
          });
        }
        static nonceAdvance(e) {
          let t = Q(es.AdvanceNonceAccount);
          return new U({
            keys: [
              { pubkey: e.noncePubkey, isSigner: !1, isWritable: !0 },
              { pubkey: F, isSigner: !1, isWritable: !1 },
              { pubkey: e.authorizedPubkey, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: t,
          });
        }
        static nonceWithdraw(e) {
          let t = Q(es.WithdrawNonceAccount, { lamports: e.lamports });
          return new U({
            keys: [
              { pubkey: e.noncePubkey, isSigner: !1, isWritable: !0 },
              { pubkey: e.toPubkey, isSigner: !1, isWritable: !0 },
              { pubkey: F, isSigner: !1, isWritable: !1 },
              { pubkey: J, isSigner: !1, isWritable: !1 },
              { pubkey: e.authorizedPubkey, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: t,
          });
        }
        static nonceAuthorize(e) {
          let t = Q(es.AuthorizeNonceAccount, {
            authorized: I(e.newAuthorizedPubkey.toBuffer()),
          });
          return new U({
            keys: [
              { pubkey: e.noncePubkey, isSigner: !1, isWritable: !0 },
              { pubkey: e.authorizedPubkey, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: t,
          });
        }
        static allocate(e) {
          let t, i;
          return (
            "basePubkey" in e
              ? ((t = Q(es.AllocateWithSeed, {
                  base: I(e.basePubkey.toBuffer()),
                  seed: e.seed,
                  space: e.space,
                  programId: I(e.programId.toBuffer()),
                })),
                (i = [
                  { pubkey: e.accountPubkey, isSigner: !1, isWritable: !0 },
                  { pubkey: e.basePubkey, isSigner: !0, isWritable: !1 },
                ]))
              : ((t = Q(es.Allocate, { space: e.space })),
                (i = [
                  { pubkey: e.accountPubkey, isSigner: !0, isWritable: !0 },
                ])),
            new U({ keys: i, programId: this.programId, data: t })
          );
        }
      }
      en.programId = new A("11111111111111111111111111111111");
      class ea {
        constructor() {}
        static getMinNumSignatures(e) {
          return 2 * (Math.ceil(e / ea.chunkSize) + 1 + 1);
        }
        static async load(e, t, i, s, n) {
          {
            let r = await e.getMinimumBalanceForRentExemption(n.length),
              a = await e.getAccountInfo(i.publicKey, "confirmed"),
              o = null;
            if (null !== a) {
              if (a.executable)
                return (
                  console.error(
                    "Program load failed, account is already executable"
                  ),
                  !1
                );
              a.data.length !== n.length &&
                (o = o || new _()).add(
                  en.allocate({ accountPubkey: i.publicKey, space: n.length })
                ),
                a.owner.equals(s) ||
                  (o = o || new _()).add(
                    en.assign({ accountPubkey: i.publicKey, programId: s })
                  ),
                a.lamports < r &&
                  (o = o || new _()).add(
                    en.transfer({
                      fromPubkey: t.publicKey,
                      toPubkey: i.publicKey,
                      lamports: r - a.lamports,
                    })
                  );
            } else
              o = new _().add(
                en.createAccount({
                  fromPubkey: t.publicKey,
                  newAccountPubkey: i.publicKey,
                  lamports: r > 0 ? r : 1,
                  space: n.length,
                  programId: s,
                })
              );
            null !== o && (await G(e, o, [t, i], { commitment: "confirmed" }));
          }
          let a = d.w3([
              d.DH("instruction"),
              d.DH("offset"),
              d.DH("bytesLength"),
              d.DH("bytesLengthPadding"),
              d.O6(d.u8("byte"), d.cY(d.DH(), -8), "bytes"),
            ]),
            o = ea.chunkSize,
            u = 0,
            c = n,
            l = [];
          for (; c.length > 0; ) {
            let n = c.slice(0, o),
              d = r.Buffer.alloc(o + 16);
            a.encode(
              {
                instruction: 0,
                offset: u,
                bytes: n,
                bytesLength: 0,
                bytesLengthPadding: 0,
              },
              d
            );
            let h = new _().add({
              keys: [{ pubkey: i.publicKey, isSigner: !0, isWritable: !0 }],
              programId: s,
              data: d,
            });
            l.push(G(e, h, [t, i], { commitment: "confirmed" })),
              e._rpcEndpoint.includes("solana.com") &&
                (await new Promise((e) => setTimeout(e, 250))),
              (u += o),
              (c = c.slice(o));
          }
          await Promise.all(l);
          {
            let n = d.w3([d.DH("instruction")]),
              a = r.Buffer.alloc(n.span);
            n.encode({ instruction: 1 }, a);
            let o = new _().add({
                keys: [
                  { pubkey: i.publicKey, isSigner: !0, isWritable: !0 },
                  { pubkey: J, isSigner: !1, isWritable: !1 },
                ],
                programId: s,
                data: a,
              }),
              u = "processed",
              c = await e.sendTransaction(o, [t, i], {
                preflightCommitment: u,
              }),
              { context: l, value: h } = await e.confirmTransaction(
                {
                  signature: c,
                  lastValidBlockHeight: o.lastValidBlockHeight,
                  blockhash: o.recentBlockhash,
                },
                u
              );
            if (h.err)
              throw Error(`Transaction ${c} failed (${JSON.stringify(h)})`);
            for (;;) {
              try {
                if ((await e.getSlot({ commitment: u })) > l.slot) break;
              } catch {}
              await new Promise((e) => setTimeout(e, Math.round(200)));
            }
          }
          return !0;
        }
      }
      (ea.chunkSize = 932),
        new A("BPFLoader2111111111111111111111111111111111"),
        globalThis.fetch,
        d.w3([
          d.DH("typeIndex"),
          er("deactivationSlot"),
          d.I0("lastExtendedSlot"),
          d.u8("lastExtendedStartIndex"),
          d.u8(),
          d.O6(N(), d.cY(d.u8(), -1), "authority"),
        ]);
      let eo = (0, g.au)((0, g.KJ)(A), (0, g.Yj)(), (e) => new A(e)),
        eu = (0, g.PV)([(0, g.Yj)(), (0, g.eu)("base64")]),
        ec = (0, g.au)((0, g.KJ)(r.Buffer), eu, (e) =>
          r.Buffer.from(e[0], "base64")
        );
      function el(e) {
        return (0, g.KC)([
          (0, g.NW)({ jsonrpc: (0, g.eu)("2.0"), id: (0, g.Yj)(), result: e }),
          (0, g.NW)({
            jsonrpc: (0, g.eu)("2.0"),
            id: (0, g.Yj)(),
            error: (0, g.NW)({
              code: (0, g.L5)(),
              message: (0, g.Yj)(),
              data: (0, g.lq)((0, g.bz)()),
            }),
          }),
        ]);
      }
      let ed = el((0, g.L5)());
      function eh(e) {
        return (0, g.au)(el(e), ed, (t) =>
          "error" in t ? t : { ...t, result: (0, g.vt)(t.result, e) }
        );
      }
      function eg(e) {
        return eh(
          (0, g.NW)({ context: (0, g.NW)({ slot: (0, g.ai)() }), value: e })
        );
      }
      function ep(e) {
        return (0, g.NW)({
          context: (0, g.NW)({ slot: (0, g.ai)() }),
          value: e,
        });
      }
      let ey = (0, g.NW)({
        foundation: (0, g.ai)(),
        foundationTerm: (0, g.ai)(),
        initial: (0, g.ai)(),
        taper: (0, g.ai)(),
        terminal: (0, g.ai)(),
      });
      eh(
        (0, g.YO)(
          (0, g.me)(
            (0, g.NW)({
              epoch: (0, g.ai)(),
              effectiveSlot: (0, g.ai)(),
              amount: (0, g.ai)(),
              postBalance: (0, g.ai)(),
              commission: (0, g.lq)((0, g.me)((0, g.ai)())),
            })
          )
        )
      );
      let em = (0, g.YO)(
          (0, g.NW)({ slot: (0, g.ai)(), prioritizationFee: (0, g.ai)() })
        ),
        eb = (0, g.NW)({
          total: (0, g.ai)(),
          validator: (0, g.ai)(),
          foundation: (0, g.ai)(),
          epoch: (0, g.ai)(),
        }),
        ef = (0, g.NW)({
          epoch: (0, g.ai)(),
          slotIndex: (0, g.ai)(),
          slotsInEpoch: (0, g.ai)(),
          absoluteSlot: (0, g.ai)(),
          blockHeight: (0, g.lq)((0, g.ai)()),
          transactionCount: (0, g.lq)((0, g.ai)()),
        }),
        ek = (0, g.NW)({
          slotsPerEpoch: (0, g.ai)(),
          leaderScheduleSlotOffset: (0, g.ai)(),
          warmup: (0, g.zM)(),
          firstNormalEpoch: (0, g.ai)(),
          firstNormalSlot: (0, g.ai)(),
        }),
        ew = (0, g.g1)((0, g.Yj)(), (0, g.YO)((0, g.ai)())),
        eI = (0, g.me)((0, g.KC)([(0, g.NW)({}), (0, g.Yj)()])),
        eS = (0, g.NW)({ err: eI }),
        eW = (0, g.eu)("receivedSignature");
      (0, g.NW)({
        "solana-core": (0, g.Yj)(),
        "feature-set": (0, g.lq)((0, g.ai)()),
      });
      let ev = (0, g.NW)({
          program: (0, g.Yj)(),
          programId: eo,
          parsed: (0, g.L5)(),
        }),
        eA = (0, g.NW)({
          programId: eo,
          accounts: (0, g.YO)(eo),
          data: (0, g.Yj)(),
        });
      eg(
        (0, g.NW)({
          err: (0, g.me)((0, g.KC)([(0, g.NW)({}), (0, g.Yj)()])),
          logs: (0, g.me)((0, g.YO)((0, g.Yj)())),
          accounts: (0, g.lq)(
            (0, g.me)(
              (0, g.YO)(
                (0, g.me)(
                  (0, g.NW)({
                    executable: (0, g.zM)(),
                    owner: (0, g.Yj)(),
                    lamports: (0, g.ai)(),
                    data: (0, g.YO)((0, g.Yj)()),
                    rentEpoch: (0, g.lq)((0, g.ai)()),
                  })
                )
              )
            )
          ),
          unitsConsumed: (0, g.lq)((0, g.ai)()),
          returnData: (0, g.lq)(
            (0, g.me)(
              (0, g.NW)({
                programId: (0, g.Yj)(),
                data: (0, g.PV)([(0, g.Yj)(), (0, g.eu)("base64")]),
              })
            )
          ),
          innerInstructions: (0, g.lq)(
            (0, g.me)(
              (0, g.YO)(
                (0, g.NW)({
                  index: (0, g.ai)(),
                  instructions: (0, g.YO)((0, g.KC)([ev, eA])),
                })
              )
            )
          ),
        })
      ),
        eg(
          (0, g.NW)({
            byIdentity: (0, g.g1)((0, g.Yj)(), (0, g.YO)((0, g.ai)())),
            range: (0, g.NW)({ firstSlot: (0, g.ai)(), lastSlot: (0, g.ai)() }),
          })
        ),
        eh(ey),
        eh(eb),
        eh(em),
        eh(ef),
        eh(ek),
        eh(ew),
        eh((0, g.ai)()),
        eg(
          (0, g.NW)({
            total: (0, g.ai)(),
            circulating: (0, g.ai)(),
            nonCirculating: (0, g.ai)(),
            nonCirculatingAccounts: (0, g.YO)(eo),
          })
        );
      let ex = (0, g.NW)({
        amount: (0, g.Yj)(),
        uiAmount: (0, g.me)((0, g.ai)()),
        decimals: (0, g.ai)(),
        uiAmountString: (0, g.lq)((0, g.Yj)()),
      });
      eg(
        (0, g.YO)(
          (0, g.NW)({
            address: eo,
            amount: (0, g.Yj)(),
            uiAmount: (0, g.me)((0, g.ai)()),
            decimals: (0, g.ai)(),
            uiAmountString: (0, g.lq)((0, g.Yj)()),
          })
        )
      ),
        eg(
          (0, g.YO)(
            (0, g.NW)({
              pubkey: eo,
              account: (0, g.NW)({
                executable: (0, g.zM)(),
                owner: eo,
                lamports: (0, g.ai)(),
                data: ec,
                rentEpoch: (0, g.ai)(),
              }),
            })
          )
        );
      let eB = (0, g.NW)({
        program: (0, g.Yj)(),
        parsed: (0, g.L5)(),
        space: (0, g.ai)(),
      });
      eg(
        (0, g.YO)(
          (0, g.NW)({
            pubkey: eo,
            account: (0, g.NW)({
              executable: (0, g.zM)(),
              owner: eo,
              lamports: (0, g.ai)(),
              data: eB,
              rentEpoch: (0, g.ai)(),
            }),
          })
        )
      ),
        eg((0, g.YO)((0, g.NW)({ lamports: (0, g.ai)(), address: eo })));
      let eP = (0, g.NW)({
        executable: (0, g.zM)(),
        owner: eo,
        lamports: (0, g.ai)(),
        data: ec,
        rentEpoch: (0, g.ai)(),
      });
      (0, g.NW)({ pubkey: eo, account: eP });
      let eY = (0, g.au)(
          (0, g.KC)([(0, g.KJ)(r.Buffer), eB]),
          (0, g.KC)([eu, eB]),
          (e) => (Array.isArray(e) ? (0, g.vt)(e, ec) : e)
        ),
        eN = (0, g.NW)({
          executable: (0, g.zM)(),
          owner: eo,
          lamports: (0, g.ai)(),
          data: eY,
          rentEpoch: (0, g.ai)(),
        });
      (0, g.NW)({ pubkey: eo, account: eN }),
        (0, g.NW)({
          state: (0, g.KC)([
            (0, g.eu)("active"),
            (0, g.eu)("inactive"),
            (0, g.eu)("activating"),
            (0, g.eu)("deactivating"),
          ]),
          active: (0, g.ai)(),
          inactive: (0, g.ai)(),
        }),
        eh(
          (0, g.YO)(
            (0, g.NW)({
              signature: (0, g.Yj)(),
              slot: (0, g.ai)(),
              err: eI,
              memo: (0, g.me)((0, g.Yj)()),
              blockTime: (0, g.lq)((0, g.me)((0, g.ai)())),
            })
          )
        ),
        eh(
          (0, g.YO)(
            (0, g.NW)({
              signature: (0, g.Yj)(),
              slot: (0, g.ai)(),
              err: eI,
              memo: (0, g.me)((0, g.Yj)()),
              blockTime: (0, g.lq)((0, g.me)((0, g.ai)())),
            })
          )
        ),
        (0, g.NW)({ subscription: (0, g.ai)(), result: ep(eP) });
      let eK = (0, g.NW)({ pubkey: eo, account: eP });
      (0, g.NW)({ subscription: (0, g.ai)(), result: ep(eK) });
      let ez = (0, g.NW)({
        parent: (0, g.ai)(),
        slot: (0, g.ai)(),
        root: (0, g.ai)(),
      });
      (0, g.NW)({ subscription: (0, g.ai)(), result: ez });
      let eO = (0, g.KC)([
        (0, g.NW)({
          type: (0, g.KC)([
            (0, g.eu)("firstShredReceived"),
            (0, g.eu)("completed"),
            (0, g.eu)("optimisticConfirmation"),
            (0, g.eu)("root"),
          ]),
          slot: (0, g.ai)(),
          timestamp: (0, g.ai)(),
        }),
        (0, g.NW)({
          type: (0, g.eu)("createdBank"),
          parent: (0, g.ai)(),
          slot: (0, g.ai)(),
          timestamp: (0, g.ai)(),
        }),
        (0, g.NW)({
          type: (0, g.eu)("frozen"),
          slot: (0, g.ai)(),
          timestamp: (0, g.ai)(),
          stats: (0, g.NW)({
            numTransactionEntries: (0, g.ai)(),
            numSuccessfulTransactions: (0, g.ai)(),
            numFailedTransactions: (0, g.ai)(),
            maxTransactionsPerEntry: (0, g.ai)(),
          }),
        }),
        (0, g.NW)({
          type: (0, g.eu)("dead"),
          slot: (0, g.ai)(),
          timestamp: (0, g.ai)(),
          err: (0, g.Yj)(),
        }),
      ]);
      (0, g.NW)({ subscription: (0, g.ai)(), result: eO }),
        (0, g.NW)({
          subscription: (0, g.ai)(),
          result: ep((0, g.KC)([eS, eW])),
        }),
        (0, g.NW)({ subscription: (0, g.ai)(), result: (0, g.ai)() }),
        (0, g.NW)({
          pubkey: (0, g.Yj)(),
          gossip: (0, g.me)((0, g.Yj)()),
          tpu: (0, g.me)((0, g.Yj)()),
          rpc: (0, g.me)((0, g.Yj)()),
          version: (0, g.me)((0, g.Yj)()),
        });
      let eT = (0, g.NW)({
        votePubkey: (0, g.Yj)(),
        nodePubkey: (0, g.Yj)(),
        activatedStake: (0, g.ai)(),
        epochVoteAccount: (0, g.zM)(),
        epochCredits: (0, g.YO)(
          (0, g.PV)([(0, g.ai)(), (0, g.ai)(), (0, g.ai)()])
        ),
        commission: (0, g.ai)(),
        lastVote: (0, g.ai)(),
        rootSlot: (0, g.me)((0, g.ai)()),
      });
      eh((0, g.NW)({ current: (0, g.YO)(eT), delinquent: (0, g.YO)(eT) }));
      let eL = (0, g.KC)([
          (0, g.eu)("processed"),
          (0, g.eu)("confirmed"),
          (0, g.eu)("finalized"),
        ]),
        eE = (0, g.NW)({
          slot: (0, g.ai)(),
          confirmations: (0, g.me)((0, g.ai)()),
          err: eI,
          confirmationStatus: (0, g.lq)(eL),
        });
      eg((0, g.YO)((0, g.me)(eE))), eh((0, g.ai)());
      let ej = (0, g.NW)({
          accountKey: eo,
          writableIndexes: (0, g.YO)((0, g.ai)()),
          readonlyIndexes: (0, g.YO)((0, g.ai)()),
        }),
        eq = (0, g.NW)({
          signatures: (0, g.YO)((0, g.Yj)()),
          message: (0, g.NW)({
            accountKeys: (0, g.YO)((0, g.Yj)()),
            header: (0, g.NW)({
              numRequiredSignatures: (0, g.ai)(),
              numReadonlySignedAccounts: (0, g.ai)(),
              numReadonlyUnsignedAccounts: (0, g.ai)(),
            }),
            instructions: (0, g.YO)(
              (0, g.NW)({
                accounts: (0, g.YO)((0, g.ai)()),
                data: (0, g.Yj)(),
                programIdIndex: (0, g.ai)(),
              })
            ),
            recentBlockhash: (0, g.Yj)(),
            addressTableLookups: (0, g.lq)((0, g.YO)(ej)),
          }),
        }),
        eH = (0, g.NW)({
          pubkey: eo,
          signer: (0, g.zM)(),
          writable: (0, g.zM)(),
          source: (0, g.lq)(
            (0, g.KC)([(0, g.eu)("transaction"), (0, g.eu)("lookupTable")])
          ),
        }),
        eD = (0, g.NW)({
          accountKeys: (0, g.YO)(eH),
          signatures: (0, g.YO)((0, g.Yj)()),
        }),
        eC = (0, g.NW)({
          parsed: (0, g.L5)(),
          program: (0, g.Yj)(),
          programId: eo,
        }),
        eM = (0, g.NW)({
          accounts: (0, g.YO)(eo),
          data: (0, g.Yj)(),
          programId: eo,
        }),
        eR = (0, g.KC)([eM, eC]),
        eU = (0, g.KC)([
          (0, g.NW)({
            parsed: (0, g.L5)(),
            program: (0, g.Yj)(),
            programId: (0, g.Yj)(),
          }),
          (0, g.NW)({
            accounts: (0, g.YO)((0, g.Yj)()),
            data: (0, g.Yj)(),
            programId: (0, g.Yj)(),
          }),
        ]),
        e_ = (0, g.au)(eR, eU, (e) =>
          "accounts" in e ? (0, g.vt)(e, eM) : (0, g.vt)(e, eC)
        ),
        e$ = (0, g.NW)({
          signatures: (0, g.YO)((0, g.Yj)()),
          message: (0, g.NW)({
            accountKeys: (0, g.YO)(eH),
            instructions: (0, g.YO)(e_),
            recentBlockhash: (0, g.Yj)(),
            addressTableLookups: (0, g.lq)((0, g.me)((0, g.YO)(ej))),
          }),
        }),
        eV = (0, g.NW)({
          accountIndex: (0, g.ai)(),
          mint: (0, g.Yj)(),
          owner: (0, g.lq)((0, g.Yj)()),
          programId: (0, g.lq)((0, g.Yj)()),
          uiTokenAmount: ex,
        }),
        eF = (0, g.NW)({ writable: (0, g.YO)(eo), readonly: (0, g.YO)(eo) }),
        eJ = (0, g.NW)({
          err: eI,
          fee: (0, g.ai)(),
          innerInstructions: (0, g.lq)(
            (0, g.me)(
              (0, g.YO)(
                (0, g.NW)({
                  index: (0, g.ai)(),
                  instructions: (0, g.YO)(
                    (0, g.NW)({
                      accounts: (0, g.YO)((0, g.ai)()),
                      data: (0, g.Yj)(),
                      programIdIndex: (0, g.ai)(),
                    })
                  ),
                })
              )
            )
          ),
          preBalances: (0, g.YO)((0, g.ai)()),
          postBalances: (0, g.YO)((0, g.ai)()),
          logMessages: (0, g.lq)((0, g.me)((0, g.YO)((0, g.Yj)()))),
          preTokenBalances: (0, g.lq)((0, g.me)((0, g.YO)(eV))),
          postTokenBalances: (0, g.lq)((0, g.me)((0, g.YO)(eV))),
          loadedAddresses: (0, g.lq)(eF),
          computeUnitsConsumed: (0, g.lq)((0, g.ai)()),
        }),
        eX = (0, g.NW)({
          err: eI,
          fee: (0, g.ai)(),
          innerInstructions: (0, g.lq)(
            (0, g.me)(
              (0, g.YO)(
                (0, g.NW)({ index: (0, g.ai)(), instructions: (0, g.YO)(e_) })
              )
            )
          ),
          preBalances: (0, g.YO)((0, g.ai)()),
          postBalances: (0, g.YO)((0, g.ai)()),
          logMessages: (0, g.lq)((0, g.me)((0, g.YO)((0, g.Yj)()))),
          preTokenBalances: (0, g.lq)((0, g.me)((0, g.YO)(eV))),
          postTokenBalances: (0, g.lq)((0, g.me)((0, g.YO)(eV))),
          loadedAddresses: (0, g.lq)(eF),
          computeUnitsConsumed: (0, g.lq)((0, g.ai)()),
        }),
        eZ = (0, g.KC)([(0, g.eu)(0), (0, g.eu)("legacy")]),
        eG = (0, g.NW)({
          pubkey: (0, g.Yj)(),
          lamports: (0, g.ai)(),
          postBalance: (0, g.me)((0, g.ai)()),
          rewardType: (0, g.me)((0, g.Yj)()),
          commission: (0, g.lq)((0, g.me)((0, g.ai)())),
        });
      eh(
        (0, g.me)(
          (0, g.NW)({
            blockhash: (0, g.Yj)(),
            previousBlockhash: (0, g.Yj)(),
            parentSlot: (0, g.ai)(),
            transactions: (0, g.YO)(
              (0, g.NW)({
                transaction: eq,
                meta: (0, g.me)(eJ),
                version: (0, g.lq)(eZ),
              })
            ),
            rewards: (0, g.lq)((0, g.YO)(eG)),
            blockTime: (0, g.me)((0, g.ai)()),
            blockHeight: (0, g.me)((0, g.ai)()),
          })
        )
      ),
        eh(
          (0, g.me)(
            (0, g.NW)({
              blockhash: (0, g.Yj)(),
              previousBlockhash: (0, g.Yj)(),
              parentSlot: (0, g.ai)(),
              rewards: (0, g.lq)((0, g.YO)(eG)),
              blockTime: (0, g.me)((0, g.ai)()),
              blockHeight: (0, g.me)((0, g.ai)()),
            })
          )
        ),
        eh(
          (0, g.me)(
            (0, g.NW)({
              blockhash: (0, g.Yj)(),
              previousBlockhash: (0, g.Yj)(),
              parentSlot: (0, g.ai)(),
              transactions: (0, g.YO)(
                (0, g.NW)({
                  transaction: eD,
                  meta: (0, g.me)(eJ),
                  version: (0, g.lq)(eZ),
                })
              ),
              rewards: (0, g.lq)((0, g.YO)(eG)),
              blockTime: (0, g.me)((0, g.ai)()),
              blockHeight: (0, g.me)((0, g.ai)()),
            })
          )
        ),
        eh(
          (0, g.me)(
            (0, g.NW)({
              blockhash: (0, g.Yj)(),
              previousBlockhash: (0, g.Yj)(),
              parentSlot: (0, g.ai)(),
              transactions: (0, g.YO)(
                (0, g.NW)({
                  transaction: e$,
                  meta: (0, g.me)(eX),
                  version: (0, g.lq)(eZ),
                })
              ),
              rewards: (0, g.lq)((0, g.YO)(eG)),
              blockTime: (0, g.me)((0, g.ai)()),
              blockHeight: (0, g.me)((0, g.ai)()),
            })
          )
        ),
        eh(
          (0, g.me)(
            (0, g.NW)({
              blockhash: (0, g.Yj)(),
              previousBlockhash: (0, g.Yj)(),
              parentSlot: (0, g.ai)(),
              transactions: (0, g.YO)(
                (0, g.NW)({
                  transaction: eD,
                  meta: (0, g.me)(eX),
                  version: (0, g.lq)(eZ),
                })
              ),
              rewards: (0, g.lq)((0, g.YO)(eG)),
              blockTime: (0, g.me)((0, g.ai)()),
              blockHeight: (0, g.me)((0, g.ai)()),
            })
          )
        ),
        eh(
          (0, g.me)(
            (0, g.NW)({
              blockhash: (0, g.Yj)(),
              previousBlockhash: (0, g.Yj)(),
              parentSlot: (0, g.ai)(),
              rewards: (0, g.lq)((0, g.YO)(eG)),
              blockTime: (0, g.me)((0, g.ai)()),
              blockHeight: (0, g.me)((0, g.ai)()),
            })
          )
        ),
        eh(
          (0, g.me)(
            (0, g.NW)({
              blockhash: (0, g.Yj)(),
              previousBlockhash: (0, g.Yj)(),
              parentSlot: (0, g.ai)(),
              transactions: (0, g.YO)(
                (0, g.NW)({ transaction: eq, meta: (0, g.me)(eJ) })
              ),
              rewards: (0, g.lq)((0, g.YO)(eG)),
              blockTime: (0, g.me)((0, g.ai)()),
            })
          )
        ),
        eh(
          (0, g.me)(
            (0, g.NW)({
              blockhash: (0, g.Yj)(),
              previousBlockhash: (0, g.Yj)(),
              parentSlot: (0, g.ai)(),
              signatures: (0, g.YO)((0, g.Yj)()),
              blockTime: (0, g.me)((0, g.ai)()),
            })
          )
        ),
        eh(
          (0, g.me)(
            (0, g.NW)({
              slot: (0, g.ai)(),
              meta: (0, g.me)(eJ),
              blockTime: (0, g.lq)((0, g.me)((0, g.ai)())),
              transaction: eq,
              version: (0, g.lq)(eZ),
            })
          )
        ),
        eh(
          (0, g.me)(
            (0, g.NW)({
              slot: (0, g.ai)(),
              transaction: e$,
              meta: (0, g.me)(eX),
              blockTime: (0, g.lq)((0, g.me)((0, g.ai)())),
              version: (0, g.lq)(eZ),
            })
          )
        ),
        eg(
          (0, g.NW)({
            blockhash: (0, g.Yj)(),
            lastValidBlockHeight: (0, g.ai)(),
          })
        ),
        eg((0, g.zM)());
      let eQ = (0, g.NW)({
        slot: (0, g.ai)(),
        numTransactions: (0, g.ai)(),
        numSlots: (0, g.ai)(),
        samplePeriodSecs: (0, g.ai)(),
      });
      eh((0, g.YO)(eQ)),
        eg(
          (0, g.me)(
            (0, g.NW)({
              feeCalculator: (0, g.NW)({ lamportsPerSignature: (0, g.ai)() }),
            })
          )
        ),
        eh((0, g.Yj)()),
        eh((0, g.Yj)());
      let e0 = (0, g.NW)({
        err: eI,
        logs: (0, g.YO)((0, g.Yj)()),
        signature: (0, g.Yj)(),
      });
      (0, g.NW)({ result: ep(e0), subscription: (0, g.ai)() });
      class e1 {
        constructor(e) {
          (this._keypair = void 0), (this._keypair = e ?? m());
        }
        static generate() {
          return new e1(m());
        }
        static fromSecretKey(e, t) {
          if (64 !== e.byteLength) throw Error("bad secret key size");
          let i = e.slice(32, 64);
          if (!t || !t.skipValidation) {
            let t = b(e.slice(0, 32));
            for (let e = 0; e < 32; e++)
              if (i[e] !== t[e]) throw Error("provided secretKey is invalid");
          }
          return new e1({ publicKey: i, secretKey: e });
        }
        static fromSeed(e) {
          let t = b(e),
            i = new Uint8Array(64);
          return i.set(e), i.set(t, 32), new e1({ publicKey: t, secretKey: i });
        }
        get publicKey() {
          return new A(this._keypair.publicKey);
        }
        get secretKey() {
          return new Uint8Array(this._keypair.secretKey);
        }
      }
      let e3 = Object.freeze({
        CreateLookupTable: {
          index: 0,
          layout: d.w3([
            d.DH("instruction"),
            er("recentSlot"),
            d.u8("bumpSeed"),
          ]),
        },
        FreezeLookupTable: { index: 1, layout: d.w3([d.DH("instruction")]) },
        ExtendLookupTable: {
          index: 2,
          layout: d.w3([
            d.DH("instruction"),
            er(),
            d.O6(N(), d.cY(d.DH(), -8), "addresses"),
          ]),
        },
        DeactivateLookupTable: {
          index: 3,
          layout: d.w3([d.DH("instruction")]),
        },
        CloseLookupTable: { index: 4, layout: d.w3([d.DH("instruction")]) },
      });
      class e8 {
        constructor() {}
        static createLookupTable(e) {
          let [t, i] = A.findProgramAddressSync(
              [e.authority.toBuffer(), (0, h.Bq)(BigInt(e.recentSlot), 8)],
              this.programId
            ),
            r = Q(e3.CreateLookupTable, {
              recentSlot: BigInt(e.recentSlot),
              bumpSeed: i,
            }),
            s = [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: e.authority, isSigner: !0, isWritable: !1 },
              { pubkey: e.payer, isSigner: !0, isWritable: !0 },
              { pubkey: en.programId, isSigner: !1, isWritable: !1 },
            ];
          return [new U({ programId: this.programId, keys: s, data: r }), t];
        }
        static freezeLookupTable(e) {
          let t = Q(e3.FreezeLookupTable),
            i = [
              { pubkey: e.lookupTable, isSigner: !1, isWritable: !0 },
              { pubkey: e.authority, isSigner: !0, isWritable: !1 },
            ];
          return new U({ programId: this.programId, keys: i, data: t });
        }
        static extendLookupTable(e) {
          let t = Q(e3.ExtendLookupTable, {
              addresses: e.addresses.map((e) => e.toBytes()),
            }),
            i = [
              { pubkey: e.lookupTable, isSigner: !1, isWritable: !0 },
              { pubkey: e.authority, isSigner: !0, isWritable: !1 },
            ];
          return (
            e.payer &&
              i.push(
                { pubkey: e.payer, isSigner: !0, isWritable: !0 },
                { pubkey: en.programId, isSigner: !1, isWritable: !1 }
              ),
            new U({ programId: this.programId, keys: i, data: t })
          );
        }
        static deactivateLookupTable(e) {
          let t = Q(e3.DeactivateLookupTable),
            i = [
              { pubkey: e.lookupTable, isSigner: !1, isWritable: !0 },
              { pubkey: e.authority, isSigner: !0, isWritable: !1 },
            ];
          return new U({ programId: this.programId, keys: i, data: t });
        }
        static closeLookupTable(e) {
          let t = Q(e3.CloseLookupTable),
            i = [
              { pubkey: e.lookupTable, isSigner: !1, isWritable: !0 },
              { pubkey: e.authority, isSigner: !0, isWritable: !1 },
              { pubkey: e.recipient, isSigner: !1, isWritable: !0 },
            ];
          return new U({ programId: this.programId, keys: i, data: t });
        }
      }
      e8.programId = new A("AddressLookupTab1e1111111111111111111111111");
      let e2 = Object.freeze({
        RequestUnits: {
          index: 0,
          layout: d.w3([
            d.u8("instruction"),
            d.DH("units"),
            d.DH("additionalFee"),
          ]),
        },
        RequestHeapFrame: {
          index: 1,
          layout: d.w3([d.u8("instruction"), d.DH("bytes")]),
        },
        SetComputeUnitLimit: {
          index: 2,
          layout: d.w3([d.u8("instruction"), d.DH("units")]),
        },
        SetComputeUnitPrice: {
          index: 3,
          layout: d.w3([d.u8("instruction"), er("microLamports")]),
        },
      });
      class e6 {
        constructor() {}
        static requestUnits(e) {
          let t = Q(e2.RequestUnits, e);
          return new U({ keys: [], programId: this.programId, data: t });
        }
        static requestHeapFrame(e) {
          let t = Q(e2.RequestHeapFrame, e);
          return new U({ keys: [], programId: this.programId, data: t });
        }
        static setComputeUnitLimit(e) {
          let t = Q(e2.SetComputeUnitLimit, e);
          return new U({ keys: [], programId: this.programId, data: t });
        }
        static setComputeUnitPrice(e) {
          let t = Q(e2.SetComputeUnitPrice, {
            microLamports: BigInt(e.microLamports),
          });
          return new U({ keys: [], programId: this.programId, data: t });
        }
      }
      e6.programId = new A("ComputeBudget111111111111111111111111111111");
      let e5 = d.w3([
        d.u8("numSignatures"),
        d.u8("padding"),
        d.NX("signatureOffset"),
        d.NX("signatureInstructionIndex"),
        d.NX("publicKeyOffset"),
        d.NX("publicKeyInstructionIndex"),
        d.NX("messageDataOffset"),
        d.NX("messageDataSize"),
        d.NX("messageInstructionIndex"),
      ]);
      class e4 {
        constructor() {}
        static createInstructionWithPublicKey(e) {
          let {
            publicKey: t,
            message: i,
            signature: s,
            instructionIndex: n,
          } = e;
          L(
            32 === t.length,
            `Public Key must be 32 bytes but received ${t.length} bytes`
          ),
            L(
              64 === s.length,
              `Signature must be 64 bytes but received ${s.length} bytes`
            );
          let a = e5.span,
            o = a + t.length,
            u = o + s.length,
            c = r.Buffer.alloc(u + i.length),
            l = null == n ? 65535 : n;
          return (
            e5.encode(
              {
                numSignatures: 1,
                padding: 0,
                signatureOffset: o,
                signatureInstructionIndex: l,
                publicKeyOffset: a,
                publicKeyInstructionIndex: l,
                messageDataOffset: u,
                messageDataSize: i.length,
                messageInstructionIndex: l,
              },
              c
            ),
            c.fill(t, a),
            c.fill(s, o),
            c.fill(i, u),
            new U({ keys: [], programId: e4.programId, data: c })
          );
        }
        static createInstructionWithPrivateKey(e) {
          let { privateKey: t, message: i, instructionIndex: r } = e;
          L(
            64 === t.length,
            `Private key must be 64 bytes but received ${t.length} bytes`
          );
          try {
            let e = e1.fromSecretKey(t),
              s = e.publicKey.toBytes(),
              n = k(i, e.secretKey);
            return this.createInstructionWithPublicKey({
              publicKey: s,
              message: i,
              signature: n,
              instructionIndex: r,
            });
          } catch (e) {
            throw Error(`Error creating instruction; ${e}`);
          }
        }
      }
      e4.programId = new A("Ed25519SigVerify111111111111111111111111111");
      let e7 = (e, t) => {
        let i = y.bI.sign(e, t);
        return [i.toCompactRawBytes(), i.recovery];
      };
      y.bI.utils.isValidPrivateKey;
      let e9 = y.bI.getPublicKey,
        te = d.w3([
          d.u8("numSignatures"),
          d.NX("signatureOffset"),
          d.u8("signatureInstructionIndex"),
          d.NX("ethAddressOffset"),
          d.u8("ethAddressInstructionIndex"),
          d.NX("messageDataOffset"),
          d.NX("messageDataSize"),
          d.u8("messageInstructionIndex"),
          d.av(20, "ethAddress"),
          d.av(64, "signature"),
          d.u8("recoveryId"),
        ]);
      class tt {
        constructor() {}
        static publicKeyToEthAddress(e) {
          L(
            64 === e.length,
            `Public key must be 64 bytes but received ${e.length} bytes`
          );
          try {
            return r.Buffer.from((0, p.lY)(I(e))).slice(-20);
          } catch (e) {
            throw Error(`Error constructing Ethereum address: ${e}`);
          }
        }
        static createInstructionWithPublicKey(e) {
          let {
            publicKey: t,
            message: i,
            signature: r,
            recoveryId: s,
            instructionIndex: n,
          } = e;
          return tt.createInstructionWithEthAddress({
            ethAddress: tt.publicKeyToEthAddress(t),
            message: i,
            signature: r,
            recoveryId: s,
            instructionIndex: n,
          });
        }
        static createInstructionWithEthAddress(e) {
          let t;
          let {
            ethAddress: i,
            message: s,
            signature: n,
            recoveryId: a,
            instructionIndex: o = 0,
          } = e;
          L(
            20 ===
              (t =
                "string" == typeof i
                  ? i.startsWith("0x")
                    ? r.Buffer.from(i.substr(2), "hex")
                    : r.Buffer.from(i, "hex")
                  : i).length,
            `Address must be 20 bytes but received ${t.length} bytes`
          );
          let u = 12 + t.length,
            c = u + n.length + 1,
            l = r.Buffer.alloc(te.span + s.length);
          return (
            te.encode(
              {
                numSignatures: 1,
                signatureOffset: u,
                signatureInstructionIndex: o,
                ethAddressOffset: 12,
                ethAddressInstructionIndex: o,
                messageDataOffset: c,
                messageDataSize: s.length,
                messageInstructionIndex: o,
                signature: I(n),
                ethAddress: I(t),
                recoveryId: a,
              },
              l
            ),
            l.fill(I(s), te.span),
            new U({ keys: [], programId: tt.programId, data: l })
          );
        }
        static createInstructionWithPrivateKey(e) {
          let { privateKey: t, message: i, instructionIndex: s } = e;
          L(
            32 === t.length,
            `Private key must be 32 bytes but received ${t.length} bytes`
          );
          try {
            let e = I(t),
              n = e9(e, !1).slice(1),
              a = r.Buffer.from((0, p.lY)(I(i))),
              [o, u] = e7(a, e);
            return this.createInstructionWithPublicKey({
              publicKey: n,
              message: i,
              signature: o,
              recoveryId: u,
              instructionIndex: s,
            });
          } catch (e) {
            throw Error(`Error creating instruction; ${e}`);
          }
        }
      }
      tt.programId = new A("KeccakSecp256k11111111111111111111111111111");
      let ti = new A("StakeConfig11111111111111111111111111111111");
      class tr {
        constructor(e, t, i) {
          (this.unixTimestamp = void 0),
            (this.epoch = void 0),
            (this.custodian = void 0),
            (this.unixTimestamp = e),
            (this.epoch = t),
            (this.custodian = i);
        }
      }
      tr.default = new tr(0, 0, A.default);
      let ts = Object.freeze({
        Initialize: {
          index: 0,
          layout: d.w3([
            d.DH("instruction"),
            ((e = "authorized") => d.w3([N("staker"), N("withdrawer")], e))(),
            ((e = "lockup") =>
              d.w3(
                [d.Wg("unixTimestamp"), d.Wg("epoch"), N("custodian")],
                e
              ))(),
          ]),
        },
        Authorize: {
          index: 1,
          layout: d.w3([
            d.DH("instruction"),
            N("newAuthorized"),
            d.DH("stakeAuthorizationType"),
          ]),
        },
        Delegate: { index: 2, layout: d.w3([d.DH("instruction")]) },
        Split: {
          index: 3,
          layout: d.w3([d.DH("instruction"), d.Wg("lamports")]),
        },
        Withdraw: {
          index: 4,
          layout: d.w3([d.DH("instruction"), d.Wg("lamports")]),
        },
        Deactivate: { index: 5, layout: d.w3([d.DH("instruction")]) },
        Merge: { index: 7, layout: d.w3([d.DH("instruction")]) },
        AuthorizeWithSeed: {
          index: 8,
          layout: d.w3([
            d.DH("instruction"),
            N("newAuthorized"),
            d.DH("stakeAuthorizationType"),
            z("authoritySeed"),
            N("authorityOwner"),
          ]),
        },
      });
      Object.freeze({ Staker: { index: 0 }, Withdrawer: { index: 1 } });
      class tn {
        constructor() {}
        static initialize(e) {
          let { stakePubkey: t, authorized: i, lockup: r } = e,
            s = r || tr.default,
            n = Q(ts.Initialize, {
              authorized: {
                staker: I(i.staker.toBuffer()),
                withdrawer: I(i.withdrawer.toBuffer()),
              },
              lockup: {
                unixTimestamp: s.unixTimestamp,
                epoch: s.epoch,
                custodian: I(s.custodian.toBuffer()),
              },
            });
          return new U({
            keys: [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: J, isSigner: !1, isWritable: !1 },
            ],
            programId: this.programId,
            data: n,
          });
        }
        static createAccountWithSeed(e) {
          let t = new _();
          t.add(
            en.createAccountWithSeed({
              fromPubkey: e.fromPubkey,
              newAccountPubkey: e.stakePubkey,
              basePubkey: e.basePubkey,
              seed: e.seed,
              lamports: e.lamports,
              space: this.space,
              programId: this.programId,
            })
          );
          let { stakePubkey: i, authorized: r, lockup: s } = e;
          return t.add(
            this.initialize({ stakePubkey: i, authorized: r, lockup: s })
          );
        }
        static createAccount(e) {
          let t = new _();
          t.add(
            en.createAccount({
              fromPubkey: e.fromPubkey,
              newAccountPubkey: e.stakePubkey,
              lamports: e.lamports,
              space: this.space,
              programId: this.programId,
            })
          );
          let { stakePubkey: i, authorized: r, lockup: s } = e;
          return t.add(
            this.initialize({ stakePubkey: i, authorized: r, lockup: s })
          );
        }
        static delegate(e) {
          let { stakePubkey: t, authorizedPubkey: i, votePubkey: r } = e,
            s = Q(ts.Delegate);
          return new _().add({
            keys: [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: r, isSigner: !1, isWritable: !1 },
              { pubkey: V, isSigner: !1, isWritable: !1 },
              { pubkey: X, isSigner: !1, isWritable: !1 },
              { pubkey: ti, isSigner: !1, isWritable: !1 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: s,
          });
        }
        static authorize(e) {
          let {
              stakePubkey: t,
              authorizedPubkey: i,
              newAuthorizedPubkey: r,
              stakeAuthorizationType: s,
              custodianPubkey: n,
            } = e,
            a = Q(ts.Authorize, {
              newAuthorized: I(r.toBuffer()),
              stakeAuthorizationType: s.index,
            }),
            o = [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: V, isSigner: !1, isWritable: !0 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
            ];
          return (
            n && o.push({ pubkey: n, isSigner: !0, isWritable: !1 }),
            new _().add({ keys: o, programId: this.programId, data: a })
          );
        }
        static authorizeWithSeed(e) {
          let {
              stakePubkey: t,
              authorityBase: i,
              authoritySeed: r,
              authorityOwner: s,
              newAuthorizedPubkey: n,
              stakeAuthorizationType: a,
              custodianPubkey: o,
            } = e,
            u = Q(ts.AuthorizeWithSeed, {
              newAuthorized: I(n.toBuffer()),
              stakeAuthorizationType: a.index,
              authoritySeed: r,
              authorityOwner: I(s.toBuffer()),
            }),
            c = [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
              { pubkey: V, isSigner: !1, isWritable: !1 },
            ];
          return (
            o && c.push({ pubkey: o, isSigner: !0, isWritable: !1 }),
            new _().add({ keys: c, programId: this.programId, data: u })
          );
        }
        static splitInstruction(e) {
          let {
              stakePubkey: t,
              authorizedPubkey: i,
              splitStakePubkey: r,
              lamports: s,
            } = e,
            n = Q(ts.Split, { lamports: s });
          return new U({
            keys: [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: r, isSigner: !1, isWritable: !0 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: n,
          });
        }
        static split(e, t) {
          let i = new _();
          return (
            i.add(
              en.createAccount({
                fromPubkey: e.authorizedPubkey,
                newAccountPubkey: e.splitStakePubkey,
                lamports: t,
                space: this.space,
                programId: this.programId,
              })
            ),
            i.add(this.splitInstruction(e))
          );
        }
        static splitWithSeed(e, t) {
          let {
              stakePubkey: i,
              authorizedPubkey: r,
              splitStakePubkey: s,
              basePubkey: n,
              seed: a,
              lamports: o,
            } = e,
            u = new _();
          return (
            u.add(
              en.allocate({
                accountPubkey: s,
                basePubkey: n,
                seed: a,
                space: this.space,
                programId: this.programId,
              })
            ),
            t &&
              t > 0 &&
              u.add(
                en.transfer({
                  fromPubkey: e.authorizedPubkey,
                  toPubkey: s,
                  lamports: t,
                })
              ),
            u.add(
              this.splitInstruction({
                stakePubkey: i,
                authorizedPubkey: r,
                splitStakePubkey: s,
                lamports: o,
              })
            )
          );
        }
        static merge(e) {
          let { stakePubkey: t, sourceStakePubKey: i, authorizedPubkey: r } = e,
            s = Q(ts.Merge);
          return new _().add({
            keys: [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: i, isSigner: !1, isWritable: !0 },
              { pubkey: V, isSigner: !1, isWritable: !1 },
              { pubkey: X, isSigner: !1, isWritable: !1 },
              { pubkey: r, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: s,
          });
        }
        static withdraw(e) {
          let {
              stakePubkey: t,
              authorizedPubkey: i,
              toPubkey: r,
              lamports: s,
              custodianPubkey: n,
            } = e,
            a = Q(ts.Withdraw, { lamports: s }),
            o = [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: r, isSigner: !1, isWritable: !0 },
              { pubkey: V, isSigner: !1, isWritable: !1 },
              { pubkey: X, isSigner: !1, isWritable: !1 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
            ];
          return (
            n && o.push({ pubkey: n, isSigner: !0, isWritable: !1 }),
            new _().add({ keys: o, programId: this.programId, data: a })
          );
        }
        static deactivate(e) {
          let { stakePubkey: t, authorizedPubkey: i } = e,
            r = Q(ts.Deactivate);
          return new _().add({
            keys: [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: V, isSigner: !1, isWritable: !1 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: r,
          });
        }
      }
      (tn.programId = new A("Stake11111111111111111111111111111111111111")),
        (tn.space = 200);
      let ta = Object.freeze({
        InitializeAccount: {
          index: 0,
          layout: d.w3([
            d.DH("instruction"),
            ((e = "voteInit") =>
              d.w3(
                [
                  N("nodePubkey"),
                  N("authorizedVoter"),
                  N("authorizedWithdrawer"),
                  d.u8("commission"),
                ],
                e
              ))(),
          ]),
        },
        Authorize: {
          index: 1,
          layout: d.w3([
            d.DH("instruction"),
            N("newAuthorized"),
            d.DH("voteAuthorizationType"),
          ]),
        },
        Withdraw: {
          index: 3,
          layout: d.w3([d.DH("instruction"), d.Wg("lamports")]),
        },
        UpdateValidatorIdentity: {
          index: 4,
          layout: d.w3([d.DH("instruction")]),
        },
        AuthorizeWithSeed: {
          index: 10,
          layout: d.w3([
            d.DH("instruction"),
            ((e = "voteAuthorizeWithSeedArgs") =>
              d.w3(
                [
                  d.DH("voteAuthorizationType"),
                  N("currentAuthorityDerivedKeyOwnerPubkey"),
                  z("currentAuthorityDerivedKeySeed"),
                  N("newAuthorized"),
                ],
                e
              ))(),
          ]),
        },
      });
      Object.freeze({ Voter: { index: 0 }, Withdrawer: { index: 1 } });
      class to {
        constructor() {}
        static initializeAccount(e) {
          let { votePubkey: t, nodePubkey: i, voteInit: r } = e,
            s = Q(ta.InitializeAccount, {
              voteInit: {
                nodePubkey: I(r.nodePubkey.toBuffer()),
                authorizedVoter: I(r.authorizedVoter.toBuffer()),
                authorizedWithdrawer: I(r.authorizedWithdrawer.toBuffer()),
                commission: r.commission,
              },
            });
          return new U({
            keys: [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: J, isSigner: !1, isWritable: !1 },
              { pubkey: V, isSigner: !1, isWritable: !1 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: s,
          });
        }
        static createAccount(e) {
          let t = new _();
          return (
            t.add(
              en.createAccount({
                fromPubkey: e.fromPubkey,
                newAccountPubkey: e.votePubkey,
                lamports: e.lamports,
                space: this.space,
                programId: this.programId,
              })
            ),
            t.add(
              this.initializeAccount({
                votePubkey: e.votePubkey,
                nodePubkey: e.voteInit.nodePubkey,
                voteInit: e.voteInit,
              })
            )
          );
        }
        static authorize(e) {
          let {
              votePubkey: t,
              authorizedPubkey: i,
              newAuthorizedPubkey: r,
              voteAuthorizationType: s,
            } = e,
            n = Q(ta.Authorize, {
              newAuthorized: I(r.toBuffer()),
              voteAuthorizationType: s.index,
            });
          return new _().add({
            keys: [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: V, isSigner: !1, isWritable: !1 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: n,
          });
        }
        static authorizeWithSeed(e) {
          let {
              currentAuthorityDerivedKeyBasePubkey: t,
              currentAuthorityDerivedKeyOwnerPubkey: i,
              currentAuthorityDerivedKeySeed: r,
              newAuthorizedPubkey: s,
              voteAuthorizationType: n,
              votePubkey: a,
            } = e,
            o = Q(ta.AuthorizeWithSeed, {
              voteAuthorizeWithSeedArgs: {
                currentAuthorityDerivedKeyOwnerPubkey: I(i.toBuffer()),
                currentAuthorityDerivedKeySeed: r,
                newAuthorized: I(s.toBuffer()),
                voteAuthorizationType: n.index,
              },
            });
          return new _().add({
            keys: [
              { pubkey: a, isSigner: !1, isWritable: !0 },
              { pubkey: V, isSigner: !1, isWritable: !1 },
              { pubkey: t, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: o,
          });
        }
        static withdraw(e) {
          let {
              votePubkey: t,
              authorizedWithdrawerPubkey: i,
              lamports: r,
              toPubkey: s,
            } = e,
            n = Q(ta.Withdraw, { lamports: r });
          return new _().add({
            keys: [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: s, isSigner: !1, isWritable: !0 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: n,
          });
        }
        static safeWithdraw(e, t, i) {
          if (e.lamports > t - i)
            throw Error(
              "Withdraw will leave vote account with insufficient funds."
            );
          return to.withdraw(e);
        }
        static updateValidatorIdentity(e) {
          let {
              votePubkey: t,
              authorizedWithdrawerPubkey: i,
              nodePubkey: r,
            } = e,
            s = Q(ta.UpdateValidatorIdentity);
          return new _().add({
            keys: [
              { pubkey: t, isSigner: !1, isWritable: !0 },
              { pubkey: r, isSigner: !0, isWritable: !1 },
              { pubkey: i, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: s,
          });
        }
      }
      (to.programId = new A("Vote111111111111111111111111111111111111111")),
        (to.space = 3762),
        new A("Va1idator1nfo111111111111111111111111111111"),
        (0, g.NW)({
          name: (0, g.Yj)(),
          website: (0, g.lq)((0, g.Yj)()),
          details: (0, g.lq)((0, g.Yj)()),
          iconUrl: (0, g.lq)((0, g.Yj)()),
          keybaseUsername: (0, g.lq)((0, g.Yj)()),
        }),
        new A("Vote111111111111111111111111111111111111111"),
        d.w3([
          N("nodePubkey"),
          N("authorizedWithdrawer"),
          d.u8("commission"),
          d.I0(),
          d.O6(
            d.w3([d.I0("slot"), d.DH("confirmationCount")]),
            d.cY(d.DH(), -8),
            "votes"
          ),
          d.u8("rootSlotValid"),
          d.I0("rootSlot"),
          d.I0(),
          d.O6(
            d.w3([d.I0("epoch"), N("authorizedVoter")]),
            d.cY(d.DH(), -8),
            "authorizedVoters"
          ),
          d.w3(
            [
              d.O6(
                d.w3([
                  N("authorizedPubkey"),
                  d.I0("epochOfLastAuthorizedSwitch"),
                  d.I0("targetEpoch"),
                ]),
                32,
                "buf"
              ),
              d.I0("idx"),
              d.u8("isEmpty"),
            ],
            "priorVoters"
          ),
          d.I0(),
          d.O6(
            d.w3([d.I0("epoch"), d.I0("credits"), d.I0("prevCredits")]),
            d.cY(d.DH(), -8),
            "epochCredits"
          ),
          d.w3([d.I0("slot"), d.I0("timestamp")], "lastTimestamp"),
        ]);
    },
  },
]);