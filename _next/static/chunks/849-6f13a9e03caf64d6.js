(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [849],
  {
    601: (t, e, r) => {
      "use strict";
      (e.I0 = e.DH = e.NX = e.u8 = e.cY = void 0),
        (e.av = e.O6 = e.w3 = e.Wg = void 0);
      let i = r(8287);
      function n(t) {
        if (!(t instanceof Uint8Array))
          throw TypeError("b must be a Uint8Array");
      }
      function o(t) {
        return n(t), i.Buffer.from(t.buffer, t.byteOffset, t.length);
      }
      class s {
        constructor(t, e) {
          if (!Number.isInteger(t)) throw TypeError("span must be an integer");
          (this.span = t), (this.property = e);
        }
        makeDestinationObject() {
          return {};
        }
        getSpan(t, e) {
          if (0 > this.span) throw RangeError("indeterminate span");
          return this.span;
        }
        replicate(t) {
          let e = Object.create(this.constructor.prototype);
          return Object.assign(e, this), (e.property = t), e;
        }
        fromArray(t) {}
      }
      function a(t, e) {
        return e.property ? t + "[" + e.property + "]" : t;
      }
      class f extends s {
        isCount() {
          throw Error("ExternalLayout is abstract");
        }
      }
      class h extends f {
        constructor(t, e = 0, r) {
          if (!(t instanceof s)) throw TypeError("layout must be a Layout");
          if (!Number.isInteger(e))
            throw TypeError("offset must be integer or undefined");
          super(t.span, r || t.property), (this.layout = t), (this.offset = e);
        }
        isCount() {
          return this.layout instanceof u || this.layout instanceof l;
        }
        decode(t, e = 0) {
          return this.layout.decode(t, e + this.offset);
        }
        encode(t, e, r = 0) {
          return this.layout.encode(t, e, r + this.offset);
        }
      }
      class u extends s {
        constructor(t, e) {
          if ((super(t, e), 6 < this.span))
            throw RangeError("span must not exceed 6 bytes");
        }
        decode(t, e = 0) {
          return o(t).readUIntLE(e, this.span);
        }
        encode(t, e, r = 0) {
          return o(e).writeUIntLE(t, r, this.span), this.span;
        }
      }
      class l extends s {
        constructor(t, e) {
          if ((super(t, e), 6 < this.span))
            throw RangeError("span must not exceed 6 bytes");
        }
        decode(t, e = 0) {
          return o(t).readUIntBE(e, this.span);
        }
        encode(t, e, r = 0) {
          return o(e).writeUIntBE(t, r, this.span), this.span;
        }
      }
      function c(t) {
        let e = Math.floor(t / 0x100000000);
        return { hi32: e, lo32: t - 0x100000000 * e };
      }
      function d(t, e) {
        return 0x100000000 * t + e;
      }
      class p extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          let r = o(t),
            i = r.readUInt32LE(e);
          return d(r.readUInt32LE(e + 4), i);
        }
        encode(t, e, r = 0) {
          let i = c(t),
            n = o(e);
          return n.writeUInt32LE(i.lo32, r), n.writeUInt32LE(i.hi32, r + 4), 8;
        }
      }
      class m extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          let r = o(t),
            i = r.readUInt32LE(e);
          return d(r.readInt32LE(e + 4), i);
        }
        encode(t, e, r = 0) {
          let i = c(t),
            n = o(e);
          return n.writeUInt32LE(i.lo32, r), n.writeInt32LE(i.hi32, r + 4), 8;
        }
      }
      class y extends s {
        constructor(t, e, r) {
          if (!(t instanceof s))
            throw TypeError("elementLayout must be a Layout");
          if (
            !(
              (e instanceof f && e.isCount()) ||
              (Number.isInteger(e) && 0 <= e)
            )
          )
            throw TypeError(
              "count must be non-negative integer or an unsigned integer ExternalLayout"
            );
          let i = -1;
          e instanceof f || !(0 < t.span) || (i = e * t.span),
            super(i, r),
            (this.elementLayout = t),
            (this.count = e);
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let r = 0,
            i = this.count;
          if (
            (i instanceof f && (i = i.decode(t, e)),
            0 < this.elementLayout.span)
          )
            r = i * this.elementLayout.span;
          else {
            let n = 0;
            for (; n < i; ) (r += this.elementLayout.getSpan(t, e + r)), ++n;
          }
          return r;
        }
        decode(t, e = 0) {
          let r = [],
            i = 0,
            n = this.count;
          for (n instanceof f && (n = n.decode(t, e)); i < n; )
            r.push(this.elementLayout.decode(t, e)),
              (e += this.elementLayout.getSpan(t, e)),
              (i += 1);
          return r;
        }
        encode(t, e, r = 0) {
          let i = this.elementLayout,
            n = t.reduce((t, n) => t + i.encode(n, e, r + t), 0);
          return (
            this.count instanceof f && this.count.encode(t.length, e, r), n
          );
        }
      }
      class g extends s {
        constructor(t, e, r) {
          if (
            !(Array.isArray(t) && t.reduce((t, e) => t && e instanceof s, !0))
          )
            throw TypeError("fields must be array of Layout instances");
          for (let i of ("boolean" == typeof e &&
            void 0 === r &&
            ((r = e), (e = void 0)),
          t))
            if (0 > i.span && void 0 === i.property)
              throw Error(
                "fields cannot contain unnamed variable-length layout"
              );
          let i = -1;
          try {
            i = t.reduce((t, e) => t + e.getSpan(), 0);
          } catch (t) {}
          super(i, e), (this.fields = t), (this.decodePrefixes = !!r);
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let r = 0;
          try {
            r = this.fields.reduce((r, i) => {
              let n = i.getSpan(t, e);
              return (e += n), r + n;
            }, 0);
          } catch (t) {
            throw RangeError("indeterminate span");
          }
          return r;
        }
        decode(t, e = 0) {
          n(t);
          let r = this.makeDestinationObject();
          for (let i of this.fields)
            if (
              (void 0 !== i.property && (r[i.property] = i.decode(t, e)),
              (e += i.getSpan(t, e)),
              this.decodePrefixes && t.length === e)
            )
              break;
          return r;
        }
        encode(t, e, r = 0) {
          let i = r,
            n = 0,
            o = 0;
          for (let i of this.fields) {
            let s = i.span;
            if (((o = 0 < s ? s : 0), void 0 !== i.property)) {
              let n = t[i.property];
              void 0 !== n &&
                ((o = i.encode(n, e, r)), 0 > s && (s = i.getSpan(e, r)));
            }
            (n = r), (r += s);
          }
          return n + o - i;
        }
        fromArray(t) {
          let e = this.makeDestinationObject();
          for (let r of this.fields)
            void 0 !== r.property &&
              0 < t.length &&
              (e[r.property] = t.shift());
          return e;
        }
        layoutFor(t) {
          if ("string" != typeof t) throw TypeError("property must be string");
          for (let e of this.fields) if (e.property === t) return e;
        }
        offsetOf(t) {
          if ("string" != typeof t) throw TypeError("property must be string");
          let e = 0;
          for (let r of this.fields) {
            if (r.property === t) return e;
            0 > r.span ? (e = -1) : 0 <= e && (e += r.span);
          }
        }
      }
      class w {
        constructor(t) {
          this.property = t;
        }
        decode(t, e) {
          throw Error("UnionDiscriminator is abstract");
        }
        encode(t, e, r) {
          throw Error("UnionDiscriminator is abstract");
        }
      }
      class v extends w {
        constructor(t, e) {
          if (!(t instanceof f && t.isCount()))
            throw TypeError(
              "layout must be an unsigned integer ExternalLayout"
            );
          super(e || t.property || "variant"), (this.layout = t);
        }
        decode(t, e) {
          return this.layout.decode(t, e);
        }
        encode(t, e, r) {
          return this.layout.encode(t, e, r);
        }
      }
      class b extends s {
        constructor(t, e, r) {
          let i;
          if (t instanceof u || t instanceof l) i = new v(new h(t));
          else if (t instanceof f && t.isCount()) i = new v(t);
          else if (t instanceof w) i = t;
          else
            throw TypeError(
              "discr must be a UnionDiscriminator or an unsigned integer layout"
            );
          if ((void 0 === e && (e = null), !(null === e || e instanceof s)))
            throw TypeError("defaultLayout must be null or a Layout");
          if (null !== e) {
            if (0 > e.span)
              throw Error("defaultLayout must have constant span");
            void 0 === e.property && (e = e.replicate("content"));
          }
          let n = -1;
          e &&
            0 <= (n = e.span) &&
            (t instanceof u || t instanceof l) &&
            (n += i.layout.span),
            super(n, r),
            (this.discriminator = i),
            (this.usesPrefixDiscriminator = t instanceof u || t instanceof l),
            (this.defaultLayout = e),
            (this.registry = {});
          let o = this.defaultGetSourceVariant.bind(this);
          (this.getSourceVariant = function (t) {
            return o(t);
          }),
            (this.configGetSourceVariant = function (t) {
              o = t.bind(this);
            });
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let r = this.getVariant(t, e);
          if (!r)
            throw Error("unable to determine span for unrecognized variant");
          return r.getSpan(t, e);
        }
        defaultGetSourceVariant(t) {
          if (
            Object.prototype.hasOwnProperty.call(t, this.discriminator.property)
          ) {
            if (
              this.defaultLayout &&
              this.defaultLayout.property &&
              Object.prototype.hasOwnProperty.call(
                t,
                this.defaultLayout.property
              )
            )
              return;
            let e = this.registry[t[this.discriminator.property]];
            if (
              e &&
              (!e.layout ||
                (e.property &&
                  Object.prototype.hasOwnProperty.call(t, e.property)))
            )
              return e;
          } else
            for (let e in this.registry) {
              let r = this.registry[e];
              if (
                r.property &&
                Object.prototype.hasOwnProperty.call(t, r.property)
              )
                return r;
            }
          throw Error("unable to infer src variant");
        }
        decode(t, e = 0) {
          let r;
          let i = this.discriminator,
            n = i.decode(t, e),
            o = this.registry[n];
          if (void 0 === o) {
            let o = this.defaultLayout,
              s = 0;
            this.usesPrefixDiscriminator && (s = i.layout.span),
              ((r = this.makeDestinationObject())[i.property] = n),
              (r[o.property] = o.decode(t, e + s));
          } else r = o.decode(t, e);
          return r;
        }
        encode(t, e, r = 0) {
          let i = this.getSourceVariant(t);
          if (void 0 === i) {
            let i = this.discriminator,
              n = this.defaultLayout,
              o = 0;
            return (
              this.usesPrefixDiscriminator && (o = i.layout.span),
              i.encode(t[i.property], e, r),
              o + n.encode(t[n.property], e, r + o)
            );
          }
          return i.encode(t, e, r);
        }
        addVariant(t, e, r) {
          let i = new E(this, t, e, r);
          return (this.registry[t] = i), i;
        }
        getVariant(t, e = 0) {
          let r;
          return (
            t instanceof Uint8Array
              ? (r = this.discriminator.decode(t, e))
              : (r = t),
            this.registry[r]
          );
        }
      }
      class E extends s {
        constructor(t, e, r, i) {
          if (!(t instanceof b)) throw TypeError("union must be a Union");
          if (!Number.isInteger(e) || 0 > e)
            throw TypeError("variant must be a (non-negative) integer");
          if (
            ("string" == typeof r && void 0 === i && ((i = r), (r = null)), r)
          ) {
            if (!(r instanceof s)) throw TypeError("layout must be a Layout");
            if (
              null !== t.defaultLayout &&
              0 <= r.span &&
              r.span > t.defaultLayout.span
            )
              throw Error("variant span exceeds span of containing union");
            if ("string" != typeof i)
              throw TypeError("variant must have a String property");
          }
          let n = t.span;
          0 > t.span &&
            0 <= (n = r ? r.span : 0) &&
            t.usesPrefixDiscriminator &&
            (n += t.discriminator.layout.span),
            super(n, i),
            (this.union = t),
            (this.variant = e),
            (this.layout = r || null);
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let r = 0;
          this.union.usesPrefixDiscriminator &&
            (r = this.union.discriminator.layout.span);
          let i = 0;
          return this.layout && (i = this.layout.getSpan(t, e + r)), r + i;
        }
        decode(t, e = 0) {
          let r = this.makeDestinationObject();
          if (this !== this.union.getVariant(t, e))
            throw Error("variant mismatch");
          let i = 0;
          return (
            this.union.usesPrefixDiscriminator &&
              (i = this.union.discriminator.layout.span),
            this.layout
              ? (r[this.property] = this.layout.decode(t, e + i))
              : this.property
              ? (r[this.property] = !0)
              : this.union.usesPrefixDiscriminator &&
                (r[this.union.discriminator.property] = this.variant),
            r
          );
        }
        encode(t, e, r = 0) {
          let i = 0;
          if (
            (this.union.usesPrefixDiscriminator &&
              (i = this.union.discriminator.layout.span),
            this.layout &&
              !Object.prototype.hasOwnProperty.call(t, this.property))
          )
            throw TypeError("variant lacks property " + this.property);
          this.union.discriminator.encode(this.variant, e, r);
          let n = i;
          if (
            this.layout &&
            (this.layout.encode(t[this.property], e, r + i),
            (n += this.layout.getSpan(e, r + i)),
            0 <= this.union.span && n > this.union.span)
          )
            throw Error("encoded variant overruns containing union");
          return n;
        }
        fromArray(t) {
          if (this.layout) return this.layout.fromArray(t);
        }
      }
      function x(t) {
        return 0 > t && (t += 0x100000000), t;
      }
      class A extends s {
        constructor(t, e, r) {
          if (!(t instanceof u || t instanceof l))
            throw TypeError("word must be a UInt or UIntBE layout");
          if (
            ("string" == typeof e && void 0 === r && ((r = e), (e = !1)),
            4 < t.span)
          )
            throw RangeError("word cannot exceed 32 bits");
          super(t.span, r),
            (this.word = t),
            (this.msb = !!e),
            (this.fields = []);
          let i = 0;
          (this._packedSetValue = function (t) {
            return (i = x(t)), this;
          }),
            (this._packedGetValue = function () {
              return i;
            });
        }
        decode(t, e = 0) {
          let r = this.makeDestinationObject(),
            i = this.word.decode(t, e);
          for (let e of (this._packedSetValue(i), this.fields))
            void 0 !== e.property && (r[e.property] = e.decode(t));
          return r;
        }
        encode(t, e, r = 0) {
          let i = this.word.decode(e, r);
          for (let e of (this._packedSetValue(i), this.fields))
            if (void 0 !== e.property) {
              let r = t[e.property];
              void 0 !== r && e.encode(r);
            }
          return this.word.encode(this._packedGetValue(), e, r);
        }
        addField(t, e) {
          let r = new _(this, t, e);
          return this.fields.push(r), r;
        }
        addBoolean(t) {
          let e = new M(this, t);
          return this.fields.push(e), e;
        }
        fieldFor(t) {
          if ("string" != typeof t) throw TypeError("property must be string");
          for (let e of this.fields) if (e.property === t) return e;
        }
      }
      class _ {
        constructor(t, e, r) {
          if (!(t instanceof A))
            throw TypeError("container must be a BitStructure");
          if (!Number.isInteger(e) || 0 >= e)
            throw TypeError("bits must be positive integer");
          let i = 8 * t.span,
            n = t.fields.reduce((t, e) => t + e.bits, 0);
          if (e + n > i)
            throw Error(
              "bits too long for span remainder (" +
                (i - n) +
                " of " +
                i +
                " remain)"
            );
          (this.container = t),
            (this.bits = e),
            (this.valueMask = (1 << e) - 1),
            32 === e && (this.valueMask = 0xffffffff),
            (this.start = n),
            this.container.msb && (this.start = i - n - e),
            (this.wordMask = x(this.valueMask << this.start)),
            (this.property = r);
        }
        decode(t, e) {
          return (
            x(this.container._packedGetValue() & this.wordMask) >>> this.start
          );
        }
        encode(t) {
          if (
            "number" != typeof t ||
            !Number.isInteger(t) ||
            t !== x(t & this.valueMask)
          )
            throw TypeError(
              a("BitField.encode", this) +
                " value must be integer not exceeding " +
                this.valueMask
            );
          let e = this.container._packedGetValue(),
            r = x(t << this.start);
          this.container._packedSetValue(x(e & ~this.wordMask) | r);
        }
      }
      class M extends _ {
        constructor(t, e) {
          super(t, 1, e);
        }
        decode(t, e) {
          return !!super.decode(t, e);
        }
        encode(t) {
          "boolean" == typeof t && (t = +t), super.encode(t);
        }
      }
      class O extends s {
        constructor(t, e) {
          if (
            !(
              (t instanceof f && t.isCount()) ||
              (Number.isInteger(t) && 0 <= t)
            )
          )
            throw TypeError(
              "length must be positive integer or an unsigned integer ExternalLayout"
            );
          let r = -1;
          t instanceof f || (r = t), super(r, e), (this.length = t);
        }
        getSpan(t, e) {
          let r = this.span;
          return 0 > r && (r = this.length.decode(t, e)), r;
        }
        decode(t, e = 0) {
          let r = this.span;
          return 0 > r && (r = this.length.decode(t, e)), o(t).slice(e, e + r);
        }
        encode(t, e, r) {
          let i = this.length;
          if (
            (this.length instanceof f && (i = t.length),
            !(t instanceof Uint8Array && i === t.length))
          )
            throw TypeError(
              a("Blob.encode", this) +
                " requires (length " +
                i +
                ") Uint8Array as src"
            );
          if (r + i > e.length)
            throw RangeError("encoding overruns Uint8Array");
          let n = o(t);
          return (
            o(e).write(n.toString("hex"), r, i, "hex"),
            this.length instanceof f && this.length.encode(i, e, r),
            i
          );
        }
      }
      (e.cY = (t, e, r) => new h(t, e, r)),
        (e.u8 = (t) => new u(1, t)),
        (e.NX = (t) => new u(2, t)),
        (e.DH = (t) => new u(4, t)),
        (e.I0 = (t) => new p(t)),
        (e.Wg = (t) => new m(t)),
        (e.w3 = (t, e, r) => new g(t, e, r)),
        (e.O6 = (t, e, r) => new y(t, e, r)),
        (e.av = (t, e) => new O(t, e));
    },
    5621: (t, e, r) => {
      "use strict";
      var i = r(2861).Buffer;
      t.exports = function (t) {
        if (t.length >= 255) throw TypeError("Alphabet too long");
        for (var e = new Uint8Array(256), r = 0; r < e.length; r++) e[r] = 255;
        for (var n = 0; n < t.length; n++) {
          var o = t.charAt(n),
            s = o.charCodeAt(0);
          if (255 !== e[s]) throw TypeError(o + " is ambiguous");
          e[s] = n;
        }
        var a = t.length,
          f = t.charAt(0),
          h = Math.log(a) / Math.log(256),
          u = Math.log(256) / Math.log(a);
        function l(t) {
          if ("string" != typeof t) throw TypeError("Expected String");
          if (0 === t.length) return i.alloc(0);
          for (var r = 0, n = 0, o = 0; t[r] === f; ) n++, r++;
          for (
            var s = ((t.length - r) * h + 1) >>> 0, u = new Uint8Array(s);
            r < t.length;

          ) {
            var l = e[t.charCodeAt(r)];
            if (255 === l) return;
            for (var c = 0, d = s - 1; (0 !== l || c < o) && -1 !== d; d--, c++)
              (l += (a * u[d]) >>> 0),
                (u[d] = l % 256 >>> 0),
                (l = (l / 256) >>> 0);
            if (0 !== l) throw Error("Non-zero carry");
            (o = c), r++;
          }
          for (var p = s - o; p !== s && 0 === u[p]; ) p++;
          var m = i.allocUnsafe(n + (s - p));
          m.fill(0, 0, n);
          for (var y = n; p !== s; ) m[y++] = u[p++];
          return m;
        }
        return {
          encode: function (e) {
            if (
              ((Array.isArray(e) || e instanceof Uint8Array) && (e = i.from(e)),
              !i.isBuffer(e))
            )
              throw TypeError("Expected Buffer");
            if (0 === e.length) return "";
            for (var r = 0, n = 0, o = 0, s = e.length; o !== s && 0 === e[o]; )
              o++, r++;
            for (
              var h = ((s - o) * u + 1) >>> 0, l = new Uint8Array(h);
              o !== s;

            ) {
              for (
                var c = e[o], d = 0, p = h - 1;
                (0 !== c || d < n) && -1 !== p;
                p--, d++
              )
                (c += (256 * l[p]) >>> 0),
                  (l[p] = c % a >>> 0),
                  (c = (c / a) >>> 0);
              if (0 !== c) throw Error("Non-zero carry");
              (n = d), o++;
            }
            for (var m = h - n; m !== h && 0 === l[m]; ) m++;
            for (var y = f.repeat(r); m < h; ++m) y += t.charAt(l[m]);
            return y;
          },
          decodeUnsafe: l,
          decode: function (t) {
            var e = l(t);
            if (e) return e;
            throw Error("Non-base" + a + " character");
          },
        };
      };
    },
    3466: (t, e, r) => {
      var i = r(5621);
      t.exports = i(
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      );
    },
    7526: (t, e) => {
      "use strict";
      (e.byteLength = function (t) {
        var e = f(t),
          r = e[0],
          i = e[1];
        return ((r + i) * 3) / 4 - i;
      }),
        (e.toByteArray = function (t) {
          var e,
            r,
            o = f(t),
            s = o[0],
            a = o[1],
            h = new n(((s + a) * 3) / 4 - a),
            u = 0,
            l = a > 0 ? s - 4 : s;
          for (r = 0; r < l; r += 4)
            (e =
              (i[t.charCodeAt(r)] << 18) |
              (i[t.charCodeAt(r + 1)] << 12) |
              (i[t.charCodeAt(r + 2)] << 6) |
              i[t.charCodeAt(r + 3)]),
              (h[u++] = (e >> 16) & 255),
              (h[u++] = (e >> 8) & 255),
              (h[u++] = 255 & e);
          return (
            2 === a &&
              ((e = (i[t.charCodeAt(r)] << 2) | (i[t.charCodeAt(r + 1)] >> 4)),
              (h[u++] = 255 & e)),
            1 === a &&
              ((e =
                (i[t.charCodeAt(r)] << 10) |
                (i[t.charCodeAt(r + 1)] << 4) |
                (i[t.charCodeAt(r + 2)] >> 2)),
              (h[u++] = (e >> 8) & 255),
              (h[u++] = 255 & e)),
            h
          );
        }),
        (e.fromByteArray = function (t) {
          for (
            var e, i = t.length, n = i % 3, o = [], s = 0, a = i - n;
            s < a;
            s += 16383
          )
            o.push(
              (function (t, e, i) {
                for (var n, o = [], s = e; s < i; s += 3)
                  o.push(
                    r[
                      ((n =
                        ((t[s] << 16) & 0xff0000) +
                        ((t[s + 1] << 8) & 65280) +
                        (255 & t[s + 2])) >>
                        18) &
                        63
                    ] +
                      r[(n >> 12) & 63] +
                      r[(n >> 6) & 63] +
                      r[63 & n]
                  );
                return o.join("");
              })(t, s, s + 16383 > a ? a : s + 16383)
            );
          return (
            1 === n
              ? o.push(r[(e = t[i - 1]) >> 2] + r[(e << 4) & 63] + "==")
              : 2 === n &&
                o.push(
                  r[(e = (t[i - 2] << 8) + t[i - 1]) >> 10] +
                    r[(e >> 4) & 63] +
                    r[(e << 2) & 63] +
                    "="
                ),
            o.join("")
          );
        });
      for (
        var r = [],
          i = [],
          n = "undefined" != typeof Uint8Array ? Uint8Array : Array,
          o =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          s = 0,
          a = o.length;
        s < a;
        ++s
      )
        (r[s] = o[s]), (i[o.charCodeAt(s)] = s);
      function f(t) {
        var e = t.length;
        if (e % 4 > 0)
          throw Error("Invalid string. Length must be a multiple of 4");
        var r = t.indexOf("=");
        -1 === r && (r = e);
        var i = r === e ? 0 : 4 - (r % 4);
        return [r, i];
      }
      (i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63);
    },
    184: (t, e, r) => {
      "use strict";
      var i = r(8287).Buffer;
      (e.k5 = function (t) {
        {
          let e = i.from(t);
          e.reverse();
          let r = e.toString("hex");
          return 0 === r.length ? BigInt(0) : BigInt(`0x${r}`);
        }
      }),
        (e.Bq = function (t, e) {
          {
            let r = t.toString(16),
              n = i.from(r.padStart(2 * e, "0").slice(0, 2 * e), "hex");
            return n.reverse(), n;
          }
        });
    },
    9404: function (t, e, r) {
      !(function (t, e) {
        "use strict";
        function i(t, e) {
          if (!t) throw Error(e || "Assertion failed");
        }
        function n(t, e) {
          t.super_ = e;
          var r = function () {};
          (r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t);
        }
        function o(t, e, r) {
          if (o.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" === e || "be" === e) && ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || "be"));
        }
        "object" == typeof t ? (t.exports = o) : (e.BN = o),
          (o.BN = o),
          (o.wordSize = 26);
        try {
          l =
            "undefined" != typeof window && void 0 !== window.Buffer
              ? window.Buffer
              : r(7790).Buffer;
        } catch (t) {}
        function s(t, e) {
          var r = t.charCodeAt(e);
          return r >= 48 && r <= 57
            ? r - 48
            : r >= 65 && r <= 70
            ? r - 55
            : r >= 97 && r <= 102
            ? r - 87
            : void i(!1, "Invalid character in " + t);
        }
        function a(t, e, r) {
          var i = s(t, r);
          return r - 1 >= e && (i |= s(t, r - 1) << 4), i;
        }
        function f(t, e, r, n) {
          for (var o = 0, s = 0, a = Math.min(t.length, r), f = e; f < a; f++) {
            var h = t.charCodeAt(f) - 48;
            (o *= n),
              (s = h >= 49 ? h - 49 + 10 : h >= 17 ? h - 17 + 10 : h),
              i(h >= 0 && s < n, "Invalid character"),
              (o += s);
          }
          return o;
        }
        function h(t, e) {
          (t.words = e.words),
            (t.length = e.length),
            (t.negative = e.negative),
            (t.red = e.red);
        }
        if (
          ((o.isBN = function (t) {
            return (
              t instanceof o ||
              (null !== t &&
                "object" == typeof t &&
                t.constructor.wordSize === o.wordSize &&
                Array.isArray(t.words))
            );
          }),
          (o.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e;
          }),
          (o.min = function (t, e) {
            return 0 > t.cmp(e) ? t : e;
          }),
          (o.prototype._init = function (t, e, r) {
            if ("number" == typeof t) return this._initNumber(t, e, r);
            if ("object" == typeof t) return this._initArray(t, e, r);
            "hex" === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36);
            var n = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
              (n++, (this.negative = 1)),
              n < t.length &&
                (16 === e
                  ? this._parseHex(t, n, r)
                  : (this._parseBase(t, e, n),
                    "le" === r && this._initArray(this.toArray(), e, r)));
          }),
          (o.prototype._initNumber = function (t, e, r) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 0x4000000
                ? ((this.words = [0x3ffffff & t]), (this.length = 1))
                : t < 0x10000000000000
                ? ((this.words = [0x3ffffff & t, (t / 0x4000000) & 0x3ffffff]),
                  (this.length = 2))
                : (i(t < 0x20000000000000),
                  (this.words = [
                    0x3ffffff & t,
                    (t / 0x4000000) & 0x3ffffff,
                    1,
                  ]),
                  (this.length = 3)),
              "le" === r && this._initArray(this.toArray(), e, r);
          }),
          (o.prototype._initArray = function (t, e, r) {
            if ((i("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = Array(this.length));
            for (var n, o, s = 0; s < this.length; s++) this.words[s] = 0;
            var a = 0;
            if ("be" === r)
              for (s = t.length - 1, n = 0; s >= 0; s -= 3)
                (o = t[s] | (t[s - 1] << 8) | (t[s - 2] << 16)),
                  (this.words[n] |= (o << a) & 0x3ffffff),
                  (this.words[n + 1] = (o >>> (26 - a)) & 0x3ffffff),
                  (a += 24) >= 26 && ((a -= 26), n++);
            else if ("le" === r)
              for (s = 0, n = 0; s < t.length; s += 3)
                (o = t[s] | (t[s + 1] << 8) | (t[s + 2] << 16)),
                  (this.words[n] |= (o << a) & 0x3ffffff),
                  (this.words[n + 1] = (o >>> (26 - a)) & 0x3ffffff),
                  (a += 24) >= 26 && ((a -= 26), n++);
            return this._strip();
          }),
          (o.prototype._parseHex = function (t, e, r) {
            (this.length = Math.ceil((t.length - e) / 6)),
              (this.words = Array(this.length));
            for (var i, n = 0; n < this.length; n++) this.words[n] = 0;
            var o = 0,
              s = 0;
            if ("be" === r)
              for (n = t.length - 1; n >= e; n -= 2)
                (i = a(t, e, n) << o),
                  (this.words[s] |= 0x3ffffff & i),
                  o >= 18
                    ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26))
                    : (o += 8);
            else
              for (
                n = (t.length - e) % 2 == 0 ? e + 1 : e;
                n < t.length;
                n += 2
              )
                (i = a(t, e, n) << o),
                  (this.words[s] |= 0x3ffffff & i),
                  o >= 18
                    ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26))
                    : (o += 8);
            this._strip();
          }),
          (o.prototype._parseBase = function (t, e, r) {
            (this.words = [0]), (this.length = 1);
            for (var i = 0, n = 1; n <= 0x3ffffff; n *= e) i++;
            i--, (n = (n / e) | 0);
            for (
              var o = t.length - r,
                s = o % i,
                a = Math.min(o, o - s) + r,
                h = 0,
                u = r;
              u < a;
              u += i
            )
              (h = f(t, u, u + i, e)),
                this.imuln(n),
                this.words[0] + h < 0x4000000
                  ? (this.words[0] += h)
                  : this._iaddn(h);
            if (0 !== s) {
              var l = 1;
              for (h = f(t, u, t.length, e), u = 0; u < s; u++) l *= e;
              this.imuln(l),
                this.words[0] + h < 0x4000000
                  ? (this.words[0] += h)
                  : this._iaddn(h);
            }
            this._strip();
          }),
          (o.prototype.copy = function (t) {
            t.words = Array(this.length);
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (o.prototype._move = function (t) {
            h(t, this);
          }),
          (o.prototype.clone = function () {
            var t = new o(null);
            return this.copy(t), t;
          }),
          (o.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (o.prototype._strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (o.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          "undefined" != typeof Symbol && "function" == typeof Symbol.for)
        )
          try {
            o.prototype[Symbol.for("nodejs.util.inspect.custom")] = u;
          } catch (t) {
            o.prototype.inspect = u;
          }
        else o.prototype.inspect = u;
        function u() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
        }
        var l,
          c = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          d = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          p = [
            0, 0, 0x2000000, 0x290d741, 0x1000000, 0x2e90edd, 0x39aa400,
            0x267bf47, 0x1000000, 0x290d741, 1e7, 0x12959c3, 0x222c000,
            0x3bd7765, 7529536, 0xadcea1, 0x1000000, 0x1704f61, 0x206fc40,
            0x2cddcf9, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625,
            0xb54ba0, 0xdaf26b, 0x1069c00, 0x138f9ad, 243e5, 0x1b4d89f,
            0x2000000, 0x25528a1, 0x2b54a20, 0x3216b93, 0x39aa400,
          ];
        function m(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var i = (t.length + e.length) | 0;
          (r.length = i), (i = (i - 1) | 0);
          var n = 0 | t.words[0],
            o = 0 | e.words[0],
            s = n * o,
            a = 0x3ffffff & s,
            f = (s / 0x4000000) | 0;
          r.words[0] = a;
          for (var h = 1; h < i; h++) {
            for (
              var u = f >>> 26,
                l = 0x3ffffff & f,
                c = Math.min(h, e.length - 1),
                d = Math.max(0, h - t.length + 1);
              d <= c;
              d++
            ) {
              var p = (h - d) | 0;
              (u +=
                ((s = (n = 0 | t.words[p]) * (o = 0 | e.words[d]) + l) /
                  0x4000000) |
                0),
                (l = 0x3ffffff & s);
            }
            (r.words[h] = 0 | l), (f = 0 | u);
          }
          return 0 !== f ? (r.words[h] = 0 | f) : r.length--, r._strip();
        }
        (o.prototype.toString = function (t, e) {
          if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
            r = "";
            for (var r, n = 0, o = 0, s = 0; s < this.length; s++) {
              var a = this.words[s],
                f = (((a << n) | o) & 0xffffff).toString(16);
              (o = (a >>> (24 - n)) & 0xffffff),
                (n += 2) >= 26 && ((n -= 26), s--),
                (r =
                  0 !== o || s !== this.length - 1
                    ? c[6 - f.length] + f + r
                    : f + r);
            }
            for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var h = d[t],
              u = p[t];
            r = "";
            var l = this.clone();
            for (l.negative = 0; !l.isZero(); ) {
              var m = l.modrn(u).toString(t);
              r = (l = l.idivn(u)).isZero() ? m + r : c[h - m.length] + m + r;
            }
            for (this.isZero() && (r = "0" + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          i(!1, "Base should be between 2 and 36");
        }),
          (o.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 0x4000000 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 0x10000000000000 + 0x4000000 * this.words[1])
                : this.length > 2 &&
                  i(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (o.prototype.toJSON = function () {
            return this.toString(16, 2);
          }),
          l &&
            (o.prototype.toBuffer = function (t, e) {
              return this.toArrayLike(l, t, e);
            }),
          (o.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e);
          }),
          (o.prototype.toArrayLike = function (t, e, r) {
            this._strip();
            var n = this.byteLength(),
              o = r || Math.max(1, n);
            i(n <= o, "byte array longer than desired length"),
              i(o > 0, "Requested array length <= 0");
            var s = t.allocUnsafe ? t.allocUnsafe(o) : new t(o);
            return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, n), s;
          }),
          (o.prototype._toArrayLikeLE = function (t, e) {
            for (var r = 0, i = 0, n = 0, o = 0; n < this.length; n++) {
              var s = (this.words[n] << o) | i;
              (t[r++] = 255 & s),
                r < t.length && (t[r++] = (s >> 8) & 255),
                r < t.length && (t[r++] = (s >> 16) & 255),
                6 === o
                  ? (r < t.length && (t[r++] = (s >> 24) & 255),
                    (i = 0),
                    (o = 0))
                  : ((i = s >>> 24), (o += 2));
            }
            if (r < t.length) for (t[r++] = i; r < t.length; ) t[r++] = 0;
          }),
          (o.prototype._toArrayLikeBE = function (t, e) {
            for (
              var r = t.length - 1, i = 0, n = 0, o = 0;
              n < this.length;
              n++
            ) {
              var s = (this.words[n] << o) | i;
              (t[r--] = 255 & s),
                r >= 0 && (t[r--] = (s >> 8) & 255),
                r >= 0 && (t[r--] = (s >> 16) & 255),
                6 === o
                  ? (r >= 0 && (t[r--] = (s >> 24) & 255), (i = 0), (o = 0))
                  : ((i = s >>> 24), (o += 2));
            }
            if (r >= 0) for (t[r--] = i; r >= 0; ) t[r--] = 0;
          }),
          Math.clz32
            ? (o.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (o.prototype._countBits = function (t) {
                var e = t,
                  r = 0;
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                );
              }),
          (o.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var e = t,
              r = 0;
            return (
              (8191 & e) == 0 && ((r += 13), (e >>>= 13)),
              (127 & e) == 0 && ((r += 7), (e >>>= 7)),
              (15 & e) == 0 && ((r += 4), (e >>>= 4)),
              (3 & e) == 0 && ((r += 2), (e >>>= 2)),
              (1 & e) == 0 && r++,
              r
            );
          }),
          (o.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              e = this._countBits(t);
            return (this.length - 1) * 26 + e;
          }),
          (o.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e]);
              if (((t += r), 26 !== r)) break;
            }
            return t;
          }),
          (o.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (o.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (o.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (o.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (o.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (o.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (o.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
            return this._strip();
          }),
          (o.prototype.ior = function (t) {
            return i((this.negative | t.negative) == 0), this.iuor(t);
          }),
          (o.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (o.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (o.prototype.iuand = function (t) {
            var e;
            e = this.length > t.length ? t : this;
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r];
            return (this.length = e.length), this._strip();
          }),
          (o.prototype.iand = function (t) {
            return i((this.negative | t.negative) == 0), this.iuand(t);
          }),
          (o.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (o.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (o.prototype.iuxor = function (t) {
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this));
            for (var e, r, i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i];
            if (this !== e)
              for (; i < e.length; i++) this.words[i] = e.words[i];
            return (this.length = e.length), this._strip();
          }),
          (o.prototype.ixor = function (t) {
            return i((this.negative | t.negative) == 0), this.iuxor(t);
          }),
          (o.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (o.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (o.prototype.inotn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = 0 | Math.ceil(t / 26),
              r = t % 26;
            this._expand(e), r > 0 && e--;
            for (var n = 0; n < e; n++)
              this.words[n] = 0x3ffffff & ~this.words[n];
            return (
              r > 0 &&
                (this.words[n] = ~this.words[n] & (0x3ffffff >> (26 - r))),
              this._strip()
            );
          }),
          (o.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (o.prototype.setn = function (t, e) {
            i("number" == typeof t && t >= 0);
            var r = (t / 26) | 0,
              n = t % 26;
            return (
              this._expand(r + 1),
              e
                ? (this.words[r] = this.words[r] | (1 << n))
                : (this.words[r] = this.words[r] & ~(1 << n)),
              this._strip()
            );
          }),
          (o.prototype.iadd = function (t) {
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              );
            this.length > t.length
              ? ((r = this), (i = t))
              : ((r = t), (i = this));
            for (var e, r, i, n = 0, o = 0; o < i.length; o++)
              (e = (0 | r.words[o]) + (0 | i.words[o]) + n),
                (this.words[o] = 0x3ffffff & e),
                (n = e >>> 26);
            for (; 0 !== n && o < r.length; o++)
              (e = (0 | r.words[o]) + n),
                (this.words[o] = 0x3ffffff & e),
                (n = e >>> 26);
            if (((this.length = r.length), 0 !== n))
              (this.words[this.length] = n), this.length++;
            else if (r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o];
            return this;
          }),
          (o.prototype.add = function (t) {
            var e;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (o.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var e,
                r,
                i = this.iadd(t);
              return (t.negative = 1), i._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var n = this.cmp(t);
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            n > 0 ? ((e = this), (r = t)) : ((e = t), (r = this));
            for (var o = 0, s = 0; s < r.length; s++)
              (o = (i = (0 | e.words[s]) - (0 | r.words[s]) + o) >> 26),
                (this.words[s] = 0x3ffffff & i);
            for (; 0 !== o && s < e.length; s++)
              (o = (i = (0 | e.words[s]) + o) >> 26),
                (this.words[s] = 0x3ffffff & i);
            if (0 === o && s < e.length && e !== this)
              for (; s < e.length; s++) this.words[s] = e.words[s];
            return (
              (this.length = Math.max(this.length, s)),
              e !== this && (this.negative = 1),
              this._strip()
            );
          }),
          (o.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var y = function (t, e, r) {
          var i,
            n,
            o,
            s = t.words,
            a = e.words,
            f = r.words,
            h = 0,
            u = 0 | s[0],
            l = 8191 & u,
            c = u >>> 13,
            d = 0 | s[1],
            p = 8191 & d,
            m = d >>> 13,
            y = 0 | s[2],
            g = 8191 & y,
            w = y >>> 13,
            v = 0 | s[3],
            b = 8191 & v,
            E = v >>> 13,
            x = 0 | s[4],
            A = 8191 & x,
            _ = x >>> 13,
            M = 0 | s[5],
            O = 8191 & M,
            B = M >>> 13,
            I = 0 | s[6],
            T = 8191 & I,
            N = I >>> 13,
            R = 0 | s[7],
            S = 8191 & R,
            L = R >>> 13,
            U = 0 | s[8],
            P = 8191 & U,
            C = U >>> 13,
            k = 0 | s[9],
            D = 8191 & k,
            z = k >>> 13,
            H = 0 | a[0],
            V = 8191 & H,
            q = H >>> 13,
            j = 0 | a[1],
            F = 8191 & j,
            W = j >>> 13,
            $ = 0 | a[2],
            G = 8191 & $,
            Z = $ >>> 13,
            K = 0 | a[3],
            Y = 8191 & K,
            X = K >>> 13,
            J = 0 | a[4],
            Q = 8191 & J,
            tt = J >>> 13,
            te = 0 | a[5],
            tr = 8191 & te,
            ti = te >>> 13,
            tn = 0 | a[6],
            to = 8191 & tn,
            ts = tn >>> 13,
            ta = 0 | a[7],
            tf = 8191 & ta,
            th = ta >>> 13,
            tu = 0 | a[8],
            tl = 8191 & tu,
            tc = tu >>> 13,
            td = 0 | a[9],
            tp = 8191 & td,
            tm = td >>> 13;
          (r.negative = t.negative ^ e.negative), (r.length = 19);
          var ty =
            (((h + (i = Math.imul(l, V))) | 0) +
              ((8191 & (n = ((n = Math.imul(l, q)) + Math.imul(c, V)) | 0)) <<
                13)) |
            0;
          (h = ((((o = Math.imul(c, q)) + (n >>> 13)) | 0) + (ty >>> 26)) | 0),
            (ty &= 0x3ffffff),
            (i = Math.imul(p, V)),
            (n = ((n = Math.imul(p, q)) + Math.imul(m, V)) | 0),
            (o = Math.imul(m, q));
          var tg =
            (((h + (i = (i + Math.imul(l, F)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(l, W)) | 0) + Math.imul(c, F)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, W)) | 0) + (n >>> 13)) | 0) +
              (tg >>> 26)) |
            0),
            (tg &= 0x3ffffff),
            (i = Math.imul(g, V)),
            (n = ((n = Math.imul(g, q)) + Math.imul(w, V)) | 0),
            (o = Math.imul(w, q)),
            (i = (i + Math.imul(p, F)) | 0),
            (n = ((n = (n + Math.imul(p, W)) | 0) + Math.imul(m, F)) | 0),
            (o = (o + Math.imul(m, W)) | 0);
          var tw =
            (((h + (i = (i + Math.imul(l, G)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(l, Z)) | 0) + Math.imul(c, G)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, Z)) | 0) + (n >>> 13)) | 0) +
              (tw >>> 26)) |
            0),
            (tw &= 0x3ffffff),
            (i = Math.imul(b, V)),
            (n = ((n = Math.imul(b, q)) + Math.imul(E, V)) | 0),
            (o = Math.imul(E, q)),
            (i = (i + Math.imul(g, F)) | 0),
            (n = ((n = (n + Math.imul(g, W)) | 0) + Math.imul(w, F)) | 0),
            (o = (o + Math.imul(w, W)) | 0),
            (i = (i + Math.imul(p, G)) | 0),
            (n = ((n = (n + Math.imul(p, Z)) | 0) + Math.imul(m, G)) | 0),
            (o = (o + Math.imul(m, Z)) | 0);
          var tv =
            (((h + (i = (i + Math.imul(l, Y)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(l, X)) | 0) + Math.imul(c, Y)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, X)) | 0) + (n >>> 13)) | 0) +
              (tv >>> 26)) |
            0),
            (tv &= 0x3ffffff),
            (i = Math.imul(A, V)),
            (n = ((n = Math.imul(A, q)) + Math.imul(_, V)) | 0),
            (o = Math.imul(_, q)),
            (i = (i + Math.imul(b, F)) | 0),
            (n = ((n = (n + Math.imul(b, W)) | 0) + Math.imul(E, F)) | 0),
            (o = (o + Math.imul(E, W)) | 0),
            (i = (i + Math.imul(g, G)) | 0),
            (n = ((n = (n + Math.imul(g, Z)) | 0) + Math.imul(w, G)) | 0),
            (o = (o + Math.imul(w, Z)) | 0),
            (i = (i + Math.imul(p, Y)) | 0),
            (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, Y)) | 0),
            (o = (o + Math.imul(m, X)) | 0);
          var tb =
            (((h + (i = (i + Math.imul(l, Q)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(l, tt)) | 0) + Math.imul(c, Q)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, tt)) | 0) + (n >>> 13)) | 0) +
              (tb >>> 26)) |
            0),
            (tb &= 0x3ffffff),
            (i = Math.imul(O, V)),
            (n = ((n = Math.imul(O, q)) + Math.imul(B, V)) | 0),
            (o = Math.imul(B, q)),
            (i = (i + Math.imul(A, F)) | 0),
            (n = ((n = (n + Math.imul(A, W)) | 0) + Math.imul(_, F)) | 0),
            (o = (o + Math.imul(_, W)) | 0),
            (i = (i + Math.imul(b, G)) | 0),
            (n = ((n = (n + Math.imul(b, Z)) | 0) + Math.imul(E, G)) | 0),
            (o = (o + Math.imul(E, Z)) | 0),
            (i = (i + Math.imul(g, Y)) | 0),
            (n = ((n = (n + Math.imul(g, X)) | 0) + Math.imul(w, Y)) | 0),
            (o = (o + Math.imul(w, X)) | 0),
            (i = (i + Math.imul(p, Q)) | 0),
            (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
            (o = (o + Math.imul(m, tt)) | 0);
          var tE =
            (((h + (i = (i + Math.imul(l, tr)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(l, ti)) | 0) + Math.imul(c, tr)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, ti)) | 0) + (n >>> 13)) | 0) +
              (tE >>> 26)) |
            0),
            (tE &= 0x3ffffff),
            (i = Math.imul(T, V)),
            (n = ((n = Math.imul(T, q)) + Math.imul(N, V)) | 0),
            (o = Math.imul(N, q)),
            (i = (i + Math.imul(O, F)) | 0),
            (n = ((n = (n + Math.imul(O, W)) | 0) + Math.imul(B, F)) | 0),
            (o = (o + Math.imul(B, W)) | 0),
            (i = (i + Math.imul(A, G)) | 0),
            (n = ((n = (n + Math.imul(A, Z)) | 0) + Math.imul(_, G)) | 0),
            (o = (o + Math.imul(_, Z)) | 0),
            (i = (i + Math.imul(b, Y)) | 0),
            (n = ((n = (n + Math.imul(b, X)) | 0) + Math.imul(E, Y)) | 0),
            (o = (o + Math.imul(E, X)) | 0),
            (i = (i + Math.imul(g, Q)) | 0),
            (n = ((n = (n + Math.imul(g, tt)) | 0) + Math.imul(w, Q)) | 0),
            (o = (o + Math.imul(w, tt)) | 0),
            (i = (i + Math.imul(p, tr)) | 0),
            (n = ((n = (n + Math.imul(p, ti)) | 0) + Math.imul(m, tr)) | 0),
            (o = (o + Math.imul(m, ti)) | 0);
          var tx =
            (((h + (i = (i + Math.imul(l, to)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(l, ts)) | 0) + Math.imul(c, to)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, ts)) | 0) + (n >>> 13)) | 0) +
              (tx >>> 26)) |
            0),
            (tx &= 0x3ffffff),
            (i = Math.imul(S, V)),
            (n = ((n = Math.imul(S, q)) + Math.imul(L, V)) | 0),
            (o = Math.imul(L, q)),
            (i = (i + Math.imul(T, F)) | 0),
            (n = ((n = (n + Math.imul(T, W)) | 0) + Math.imul(N, F)) | 0),
            (o = (o + Math.imul(N, W)) | 0),
            (i = (i + Math.imul(O, G)) | 0),
            (n = ((n = (n + Math.imul(O, Z)) | 0) + Math.imul(B, G)) | 0),
            (o = (o + Math.imul(B, Z)) | 0),
            (i = (i + Math.imul(A, Y)) | 0),
            (n = ((n = (n + Math.imul(A, X)) | 0) + Math.imul(_, Y)) | 0),
            (o = (o + Math.imul(_, X)) | 0),
            (i = (i + Math.imul(b, Q)) | 0),
            (n = ((n = (n + Math.imul(b, tt)) | 0) + Math.imul(E, Q)) | 0),
            (o = (o + Math.imul(E, tt)) | 0),
            (i = (i + Math.imul(g, tr)) | 0),
            (n = ((n = (n + Math.imul(g, ti)) | 0) + Math.imul(w, tr)) | 0),
            (o = (o + Math.imul(w, ti)) | 0),
            (i = (i + Math.imul(p, to)) | 0),
            (n = ((n = (n + Math.imul(p, ts)) | 0) + Math.imul(m, to)) | 0),
            (o = (o + Math.imul(m, ts)) | 0);
          var tA =
            (((h + (i = (i + Math.imul(l, tf)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(l, th)) | 0) + Math.imul(c, tf)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, th)) | 0) + (n >>> 13)) | 0) +
              (tA >>> 26)) |
            0),
            (tA &= 0x3ffffff),
            (i = Math.imul(P, V)),
            (n = ((n = Math.imul(P, q)) + Math.imul(C, V)) | 0),
            (o = Math.imul(C, q)),
            (i = (i + Math.imul(S, F)) | 0),
            (n = ((n = (n + Math.imul(S, W)) | 0) + Math.imul(L, F)) | 0),
            (o = (o + Math.imul(L, W)) | 0),
            (i = (i + Math.imul(T, G)) | 0),
            (n = ((n = (n + Math.imul(T, Z)) | 0) + Math.imul(N, G)) | 0),
            (o = (o + Math.imul(N, Z)) | 0),
            (i = (i + Math.imul(O, Y)) | 0),
            (n = ((n = (n + Math.imul(O, X)) | 0) + Math.imul(B, Y)) | 0),
            (o = (o + Math.imul(B, X)) | 0),
            (i = (i + Math.imul(A, Q)) | 0),
            (n = ((n = (n + Math.imul(A, tt)) | 0) + Math.imul(_, Q)) | 0),
            (o = (o + Math.imul(_, tt)) | 0),
            (i = (i + Math.imul(b, tr)) | 0),
            (n = ((n = (n + Math.imul(b, ti)) | 0) + Math.imul(E, tr)) | 0),
            (o = (o + Math.imul(E, ti)) | 0),
            (i = (i + Math.imul(g, to)) | 0),
            (n = ((n = (n + Math.imul(g, ts)) | 0) + Math.imul(w, to)) | 0),
            (o = (o + Math.imul(w, ts)) | 0),
            (i = (i + Math.imul(p, tf)) | 0),
            (n = ((n = (n + Math.imul(p, th)) | 0) + Math.imul(m, tf)) | 0),
            (o = (o + Math.imul(m, th)) | 0);
          var t_ =
            (((h + (i = (i + Math.imul(l, tl)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(l, tc)) | 0) + Math.imul(c, tl)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, tc)) | 0) + (n >>> 13)) | 0) +
              (t_ >>> 26)) |
            0),
            (t_ &= 0x3ffffff),
            (i = Math.imul(D, V)),
            (n = ((n = Math.imul(D, q)) + Math.imul(z, V)) | 0),
            (o = Math.imul(z, q)),
            (i = (i + Math.imul(P, F)) | 0),
            (n = ((n = (n + Math.imul(P, W)) | 0) + Math.imul(C, F)) | 0),
            (o = (o + Math.imul(C, W)) | 0),
            (i = (i + Math.imul(S, G)) | 0),
            (n = ((n = (n + Math.imul(S, Z)) | 0) + Math.imul(L, G)) | 0),
            (o = (o + Math.imul(L, Z)) | 0),
            (i = (i + Math.imul(T, Y)) | 0),
            (n = ((n = (n + Math.imul(T, X)) | 0) + Math.imul(N, Y)) | 0),
            (o = (o + Math.imul(N, X)) | 0),
            (i = (i + Math.imul(O, Q)) | 0),
            (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(B, Q)) | 0),
            (o = (o + Math.imul(B, tt)) | 0),
            (i = (i + Math.imul(A, tr)) | 0),
            (n = ((n = (n + Math.imul(A, ti)) | 0) + Math.imul(_, tr)) | 0),
            (o = (o + Math.imul(_, ti)) | 0),
            (i = (i + Math.imul(b, to)) | 0),
            (n = ((n = (n + Math.imul(b, ts)) | 0) + Math.imul(E, to)) | 0),
            (o = (o + Math.imul(E, ts)) | 0),
            (i = (i + Math.imul(g, tf)) | 0),
            (n = ((n = (n + Math.imul(g, th)) | 0) + Math.imul(w, tf)) | 0),
            (o = (o + Math.imul(w, th)) | 0),
            (i = (i + Math.imul(p, tl)) | 0),
            (n = ((n = (n + Math.imul(p, tc)) | 0) + Math.imul(m, tl)) | 0),
            (o = (o + Math.imul(m, tc)) | 0);
          var tM =
            (((h + (i = (i + Math.imul(l, tp)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(l, tm)) | 0) + Math.imul(c, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, tm)) | 0) + (n >>> 13)) | 0) +
              (tM >>> 26)) |
            0),
            (tM &= 0x3ffffff),
            (i = Math.imul(D, F)),
            (n = ((n = Math.imul(D, W)) + Math.imul(z, F)) | 0),
            (o = Math.imul(z, W)),
            (i = (i + Math.imul(P, G)) | 0),
            (n = ((n = (n + Math.imul(P, Z)) | 0) + Math.imul(C, G)) | 0),
            (o = (o + Math.imul(C, Z)) | 0),
            (i = (i + Math.imul(S, Y)) | 0),
            (n = ((n = (n + Math.imul(S, X)) | 0) + Math.imul(L, Y)) | 0),
            (o = (o + Math.imul(L, X)) | 0),
            (i = (i + Math.imul(T, Q)) | 0),
            (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(N, Q)) | 0),
            (o = (o + Math.imul(N, tt)) | 0),
            (i = (i + Math.imul(O, tr)) | 0),
            (n = ((n = (n + Math.imul(O, ti)) | 0) + Math.imul(B, tr)) | 0),
            (o = (o + Math.imul(B, ti)) | 0),
            (i = (i + Math.imul(A, to)) | 0),
            (n = ((n = (n + Math.imul(A, ts)) | 0) + Math.imul(_, to)) | 0),
            (o = (o + Math.imul(_, ts)) | 0),
            (i = (i + Math.imul(b, tf)) | 0),
            (n = ((n = (n + Math.imul(b, th)) | 0) + Math.imul(E, tf)) | 0),
            (o = (o + Math.imul(E, th)) | 0),
            (i = (i + Math.imul(g, tl)) | 0),
            (n = ((n = (n + Math.imul(g, tc)) | 0) + Math.imul(w, tl)) | 0),
            (o = (o + Math.imul(w, tc)) | 0);
          var tO =
            (((h + (i = (i + Math.imul(p, tp)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(p, tm)) | 0) + Math.imul(m, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(m, tm)) | 0) + (n >>> 13)) | 0) +
              (tO >>> 26)) |
            0),
            (tO &= 0x3ffffff),
            (i = Math.imul(D, G)),
            (n = ((n = Math.imul(D, Z)) + Math.imul(z, G)) | 0),
            (o = Math.imul(z, Z)),
            (i = (i + Math.imul(P, Y)) | 0),
            (n = ((n = (n + Math.imul(P, X)) | 0) + Math.imul(C, Y)) | 0),
            (o = (o + Math.imul(C, X)) | 0),
            (i = (i + Math.imul(S, Q)) | 0),
            (n = ((n = (n + Math.imul(S, tt)) | 0) + Math.imul(L, Q)) | 0),
            (o = (o + Math.imul(L, tt)) | 0),
            (i = (i + Math.imul(T, tr)) | 0),
            (n = ((n = (n + Math.imul(T, ti)) | 0) + Math.imul(N, tr)) | 0),
            (o = (o + Math.imul(N, ti)) | 0),
            (i = (i + Math.imul(O, to)) | 0),
            (n = ((n = (n + Math.imul(O, ts)) | 0) + Math.imul(B, to)) | 0),
            (o = (o + Math.imul(B, ts)) | 0),
            (i = (i + Math.imul(A, tf)) | 0),
            (n = ((n = (n + Math.imul(A, th)) | 0) + Math.imul(_, tf)) | 0),
            (o = (o + Math.imul(_, th)) | 0),
            (i = (i + Math.imul(b, tl)) | 0),
            (n = ((n = (n + Math.imul(b, tc)) | 0) + Math.imul(E, tl)) | 0),
            (o = (o + Math.imul(E, tc)) | 0);
          var tB =
            (((h + (i = (i + Math.imul(g, tp)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(g, tm)) | 0) + Math.imul(w, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(w, tm)) | 0) + (n >>> 13)) | 0) +
              (tB >>> 26)) |
            0),
            (tB &= 0x3ffffff),
            (i = Math.imul(D, Y)),
            (n = ((n = Math.imul(D, X)) + Math.imul(z, Y)) | 0),
            (o = Math.imul(z, X)),
            (i = (i + Math.imul(P, Q)) | 0),
            (n = ((n = (n + Math.imul(P, tt)) | 0) + Math.imul(C, Q)) | 0),
            (o = (o + Math.imul(C, tt)) | 0),
            (i = (i + Math.imul(S, tr)) | 0),
            (n = ((n = (n + Math.imul(S, ti)) | 0) + Math.imul(L, tr)) | 0),
            (o = (o + Math.imul(L, ti)) | 0),
            (i = (i + Math.imul(T, to)) | 0),
            (n = ((n = (n + Math.imul(T, ts)) | 0) + Math.imul(N, to)) | 0),
            (o = (o + Math.imul(N, ts)) | 0),
            (i = (i + Math.imul(O, tf)) | 0),
            (n = ((n = (n + Math.imul(O, th)) | 0) + Math.imul(B, tf)) | 0),
            (o = (o + Math.imul(B, th)) | 0),
            (i = (i + Math.imul(A, tl)) | 0),
            (n = ((n = (n + Math.imul(A, tc)) | 0) + Math.imul(_, tl)) | 0),
            (o = (o + Math.imul(_, tc)) | 0);
          var tI =
            (((h + (i = (i + Math.imul(b, tp)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(b, tm)) | 0) + Math.imul(E, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(E, tm)) | 0) + (n >>> 13)) | 0) +
              (tI >>> 26)) |
            0),
            (tI &= 0x3ffffff),
            (i = Math.imul(D, Q)),
            (n = ((n = Math.imul(D, tt)) + Math.imul(z, Q)) | 0),
            (o = Math.imul(z, tt)),
            (i = (i + Math.imul(P, tr)) | 0),
            (n = ((n = (n + Math.imul(P, ti)) | 0) + Math.imul(C, tr)) | 0),
            (o = (o + Math.imul(C, ti)) | 0),
            (i = (i + Math.imul(S, to)) | 0),
            (n = ((n = (n + Math.imul(S, ts)) | 0) + Math.imul(L, to)) | 0),
            (o = (o + Math.imul(L, ts)) | 0),
            (i = (i + Math.imul(T, tf)) | 0),
            (n = ((n = (n + Math.imul(T, th)) | 0) + Math.imul(N, tf)) | 0),
            (o = (o + Math.imul(N, th)) | 0),
            (i = (i + Math.imul(O, tl)) | 0),
            (n = ((n = (n + Math.imul(O, tc)) | 0) + Math.imul(B, tl)) | 0),
            (o = (o + Math.imul(B, tc)) | 0);
          var tT =
            (((h + (i = (i + Math.imul(A, tp)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(A, tm)) | 0) + Math.imul(_, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(_, tm)) | 0) + (n >>> 13)) | 0) +
              (tT >>> 26)) |
            0),
            (tT &= 0x3ffffff),
            (i = Math.imul(D, tr)),
            (n = ((n = Math.imul(D, ti)) + Math.imul(z, tr)) | 0),
            (o = Math.imul(z, ti)),
            (i = (i + Math.imul(P, to)) | 0),
            (n = ((n = (n + Math.imul(P, ts)) | 0) + Math.imul(C, to)) | 0),
            (o = (o + Math.imul(C, ts)) | 0),
            (i = (i + Math.imul(S, tf)) | 0),
            (n = ((n = (n + Math.imul(S, th)) | 0) + Math.imul(L, tf)) | 0),
            (o = (o + Math.imul(L, th)) | 0),
            (i = (i + Math.imul(T, tl)) | 0),
            (n = ((n = (n + Math.imul(T, tc)) | 0) + Math.imul(N, tl)) | 0),
            (o = (o + Math.imul(N, tc)) | 0);
          var tN =
            (((h + (i = (i + Math.imul(O, tp)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(O, tm)) | 0) + Math.imul(B, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(B, tm)) | 0) + (n >>> 13)) | 0) +
              (tN >>> 26)) |
            0),
            (tN &= 0x3ffffff),
            (i = Math.imul(D, to)),
            (n = ((n = Math.imul(D, ts)) + Math.imul(z, to)) | 0),
            (o = Math.imul(z, ts)),
            (i = (i + Math.imul(P, tf)) | 0),
            (n = ((n = (n + Math.imul(P, th)) | 0) + Math.imul(C, tf)) | 0),
            (o = (o + Math.imul(C, th)) | 0),
            (i = (i + Math.imul(S, tl)) | 0),
            (n = ((n = (n + Math.imul(S, tc)) | 0) + Math.imul(L, tl)) | 0),
            (o = (o + Math.imul(L, tc)) | 0);
          var tR =
            (((h + (i = (i + Math.imul(T, tp)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(T, tm)) | 0) + Math.imul(N, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(N, tm)) | 0) + (n >>> 13)) | 0) +
              (tR >>> 26)) |
            0),
            (tR &= 0x3ffffff),
            (i = Math.imul(D, tf)),
            (n = ((n = Math.imul(D, th)) + Math.imul(z, tf)) | 0),
            (o = Math.imul(z, th)),
            (i = (i + Math.imul(P, tl)) | 0),
            (n = ((n = (n + Math.imul(P, tc)) | 0) + Math.imul(C, tl)) | 0),
            (o = (o + Math.imul(C, tc)) | 0);
          var tS =
            (((h + (i = (i + Math.imul(S, tp)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(S, tm)) | 0) + Math.imul(L, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(L, tm)) | 0) + (n >>> 13)) | 0) +
              (tS >>> 26)) |
            0),
            (tS &= 0x3ffffff),
            (i = Math.imul(D, tl)),
            (n = ((n = Math.imul(D, tc)) + Math.imul(z, tl)) | 0),
            (o = Math.imul(z, tc));
          var tL =
            (((h + (i = (i + Math.imul(P, tp)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(P, tm)) | 0) + Math.imul(C, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(C, tm)) | 0) + (n >>> 13)) | 0) +
              (tL >>> 26)) |
            0),
            (tL &= 0x3ffffff);
          var tU =
            (((h + (i = Math.imul(D, tp))) | 0) +
              ((8191 & (n = ((n = Math.imul(D, tm)) + Math.imul(z, tp)) | 0)) <<
                13)) |
            0;
          return (
            (h =
              ((((o = Math.imul(z, tm)) + (n >>> 13)) | 0) + (tU >>> 26)) | 0),
            (tU &= 0x3ffffff),
            (f[0] = ty),
            (f[1] = tg),
            (f[2] = tw),
            (f[3] = tv),
            (f[4] = tb),
            (f[5] = tE),
            (f[6] = tx),
            (f[7] = tA),
            (f[8] = t_),
            (f[9] = tM),
            (f[10] = tO),
            (f[11] = tB),
            (f[12] = tI),
            (f[13] = tT),
            (f[14] = tN),
            (f[15] = tR),
            (f[16] = tS),
            (f[17] = tL),
            (f[18] = tU),
            0 !== h && ((f[19] = h), r.length++),
            r
          );
        };
        function g(t, e, r) {
          (r.negative = e.negative ^ t.negative),
            (r.length = t.length + e.length);
          for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
            var s = n;
            n = 0;
            for (
              var a = 0x3ffffff & i,
                f = Math.min(o, e.length - 1),
                h = Math.max(0, o - t.length + 1);
              h <= f;
              h++
            ) {
              var u = o - h,
                l = (0 | t.words[u]) * (0 | e.words[h]),
                c = 0x3ffffff & l;
              (s = (s + ((l / 0x4000000) | 0)) | 0),
                (a = 0x3ffffff & (c = (c + a) | 0)),
                (n += (s = (s + (c >>> 26)) | 0) >>> 26),
                (s &= 0x3ffffff);
            }
            (r.words[o] = a), (i = s), (s = n);
          }
          return 0 !== i ? (r.words[o] = i) : r.length--, r._strip();
        }
        function w(t, e) {
          (this.x = t), (this.y = e);
        }
        Math.imul || (y = m),
          (o.prototype.mulTo = function (t, e) {
            var r,
              i = this.length + t.length;
            return 10 === this.length && 10 === t.length
              ? y(this, t, e)
              : i < 63
              ? m(this, t, e)
              : g(this, t, e);
          }),
          (w.prototype.makeRBT = function (t) {
            for (
              var e = Array(t), r = o.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              e[i] = this.revBin(i, r, t);
            return e;
          }),
          (w.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t;
            for (var i = 0, n = 0; n < e; n++)
              (i |= (1 & t) << (e - n - 1)), (t >>= 1);
            return i;
          }),
          (w.prototype.permute = function (t, e, r, i, n, o) {
            for (var s = 0; s < o; s++) (i[s] = e[t[s]]), (n[s] = r[t[s]]);
          }),
          (w.prototype.transform = function (t, e, r, i, n, o) {
            this.permute(o, t, e, r, i, n);
            for (var s = 1; s < n; s <<= 1)
              for (
                var a = s << 1,
                  f = Math.cos((2 * Math.PI) / a),
                  h = Math.sin((2 * Math.PI) / a),
                  u = 0;
                u < n;
                u += a
              )
                for (var l = f, c = h, d = 0; d < s; d++) {
                  var p = r[u + d],
                    m = i[u + d],
                    y = r[u + d + s],
                    g = i[u + d + s],
                    w = l * y - c * g;
                  (g = l * g + c * y),
                    (y = w),
                    (r[u + d] = p + y),
                    (i[u + d] = m + g),
                    (r[u + d + s] = p - y),
                    (i[u + d + s] = m - g),
                    d !== a &&
                      ((w = f * l - h * c), (c = f * c + h * l), (l = w));
                }
          }),
          (w.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              i = 1 & r,
              n = 0;
            for (r = (r / 2) | 0; r; r >>>= 1) n++;
            return 1 << (n + 1 + i);
          }),
          (w.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                var n = t[i];
                (t[i] = t[r - i - 1]),
                  (t[r - i - 1] = n),
                  (n = e[i]),
                  (e[i] = -e[r - i - 1]),
                  (e[r - i - 1] = -n);
              }
          }),
          (w.prototype.normalize13b = function (t, e) {
            for (var r = 0, i = 0; i < e / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / e) +
                Math.round(t[2 * i] / e) +
                r;
              (t[i] = 0x3ffffff & n),
                (r = n < 0x4000000 ? 0 : (n / 0x4000000) | 0);
            }
            return t;
          }),
          (w.prototype.convert13b = function (t, e, r, n) {
            for (var o = 0, s = 0; s < e; s++)
              (o += 0 | t[s]),
                (r[2 * s] = 8191 & o),
                (o >>>= 13),
                (r[2 * s + 1] = 8191 & o),
                (o >>>= 13);
            for (s = 2 * e; s < n; ++s) r[s] = 0;
            i(0 === o), i((-8192 & o) == 0);
          }),
          (w.prototype.stub = function (t) {
            for (var e = Array(t), r = 0; r < t; r++) e[r] = 0;
            return e;
          }),
          (w.prototype.mulp = function (t, e, r) {
            var i = 2 * this.guessLen13b(t.length, e.length),
              n = this.makeRBT(i),
              o = this.stub(i),
              s = Array(i),
              a = Array(i),
              f = Array(i),
              h = Array(i),
              u = Array(i),
              l = Array(i),
              c = r.words;
            (c.length = i),
              this.convert13b(t.words, t.length, s, i),
              this.convert13b(e.words, e.length, h, i),
              this.transform(s, o, a, f, i, n),
              this.transform(h, o, u, l, i, n);
            for (var d = 0; d < i; d++) {
              var p = a[d] * u[d] - f[d] * l[d];
              (f[d] = a[d] * l[d] + f[d] * u[d]), (a[d] = p);
            }
            return (
              this.conjugate(a, f, i),
              this.transform(a, f, c, o, i, n),
              this.conjugate(c, o, i),
              this.normalize13b(c, i),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r._strip()
            );
          }),
          (o.prototype.mul = function (t) {
            var e = new o(null);
            return (e.words = Array(this.length + t.length)), this.mulTo(t, e);
          }),
          (o.prototype.mulf = function (t) {
            var e = new o(null);
            return (e.words = Array(this.length + t.length)), g(this, t, e);
          }),
          (o.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (o.prototype.imuln = function (t) {
            var e = t < 0;
            e && (t = -t), i("number" == typeof t), i(t < 0x4000000);
            for (var r = 0, n = 0; n < this.length; n++) {
              var o = (0 | this.words[n]) * t,
                s = (0x3ffffff & o) + (0x3ffffff & r);
              (r >>= 26),
                (r += ((o / 0x4000000) | 0) + (s >>> 26)),
                (this.words[n] = 0x3ffffff & s);
            }
            return (
              0 !== r && ((this.words[n] = r), this.length++),
              e ? this.ineg() : this
            );
          }),
          (o.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (o.prototype.sqr = function () {
            return this.mul(this);
          }),
          (o.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (o.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = Array(t.bitLength()), r = 0; r < e.length; r++) {
                var i = (r / 26) | 0,
                  n = r % 26;
                e[r] = (t.words[i] >>> n) & 1;
              }
              return e;
            })(t);
            if (0 === e.length) return new o(1);
            for (
              var r = this, i = 0;
              i < e.length && 0 === e[i];
              i++, r = r.sqr()
            );
            if (++i < e.length)
              for (var n = r.sqr(); i < e.length; i++, n = n.sqr())
                0 !== e[i] && (r = r.mul(n));
            return r;
          }),
          (o.prototype.iushln = function (t) {
            i("number" == typeof t && t >= 0);
            var e,
              r = t % 26,
              n = (t - r) / 26,
              o = (0x3ffffff >>> (26 - r)) << (26 - r);
            if (0 !== r) {
              var s = 0;
              for (e = 0; e < this.length; e++) {
                var a = this.words[e] & o,
                  f = ((0 | this.words[e]) - a) << r;
                (this.words[e] = f | s), (s = a >>> (26 - r));
              }
              s && ((this.words[e] = s), this.length++);
            }
            if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + n] = this.words[e];
              for (e = 0; e < n; e++) this.words[e] = 0;
              this.length += n;
            }
            return this._strip();
          }),
          (o.prototype.ishln = function (t) {
            return i(0 === this.negative), this.iushln(t);
          }),
          (o.prototype.iushrn = function (t, e, r) {
            i("number" == typeof t && t >= 0),
              (n = e ? (e - (e % 26)) / 26 : 0);
            var n,
              o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              a = 0x3ffffff ^ ((0x3ffffff >>> o) << o);
            if (((n -= s), (n = Math.max(0, n)), r)) {
              for (var f = 0; f < s; f++) r.words[f] = this.words[f];
              r.length = s;
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, f = 0; f < this.length; f++)
                this.words[f] = this.words[f + s];
            else (this.words[0] = 0), (this.length = 1);
            var h = 0;
            for (f = this.length - 1; f >= 0 && (0 !== h || f >= n); f--) {
              var u = 0 | this.words[f];
              (this.words[f] = (h << (26 - o)) | (u >>> o)), (h = u & a);
            }
            return (
              r && 0 !== h && (r.words[r.length++] = h),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this._strip()
            );
          }),
          (o.prototype.ishrn = function (t, e, r) {
            return i(0 === this.negative), this.iushrn(t, e, r);
          }),
          (o.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (o.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (o.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (o.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (o.prototype.testn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            return !(this.length <= r) && !!(this.words[r] & (1 << e));
          }),
          (o.prototype.imaskn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            return (i(
              0 === this.negative,
              "imaskn works only with positive numbers"
            ),
            this.length <= r)
              ? this
              : (0 !== e && r++,
                (this.length = Math.min(r, this.length)),
                0 !== e &&
                  (this.words[this.length - 1] &=
                    0x3ffffff ^ ((0x3ffffff >>> e) << e)),
                this._strip());
          }),
          (o.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (o.prototype.iaddn = function (t) {
            return (i("number" == typeof t), i(t < 0x4000000), t < 0)
              ? this.isubn(-t)
              : 0 !== this.negative
              ? (1 === this.length && (0 | this.words[0]) <= t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0))
                  : ((this.negative = 0), this.isubn(t), (this.negative = 1)),
                this)
              : this._iaddn(t);
          }),
          (o.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var e = 0; e < this.length && this.words[e] >= 0x4000000; e++)
              (this.words[e] -= 0x4000000),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++;
            return (this.length = Math.max(this.length, e + 1)), this;
          }),
          (o.prototype.isubn = function (t) {
            if ((i("number" == typeof t), i(t < 0x4000000), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 0x4000000), (this.words[e + 1] -= 1);
            return this._strip();
          }),
          (o.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (o.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (o.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (o.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (o.prototype._ishlnsubmul = function (t, e, r) {
            var n,
              o,
              s = t.length + r;
            this._expand(s);
            var a = 0;
            for (n = 0; n < t.length; n++) {
              o = (0 | this.words[n + r]) + a;
              var f = (0 | t.words[n]) * e;
              (o -= 0x3ffffff & f),
                (a = (o >> 26) - ((f / 0x4000000) | 0)),
                (this.words[n + r] = 0x3ffffff & o);
            }
            for (; n < this.length - r; n++)
              (a = (o = (0 | this.words[n + r]) + a) >> 26),
                (this.words[n + r] = 0x3ffffff & o);
            if (0 === a) return this._strip();
            for (i(-1 === a), a = 0, n = 0; n < this.length; n++)
              (a = (o = -(0 | this.words[n]) + a) >> 26),
                (this.words[n] = 0x3ffffff & o);
            return (this.negative = 1), this._strip();
          }),
          (o.prototype._wordDiv = function (t, e) {
            var r,
              i = this.length - t.length,
              n = this.clone(),
              s = t,
              a = 0 | s.words[s.length - 1];
            0 != (i = 26 - this._countBits(a)) &&
              ((s = s.ushln(i)), n.iushln(i), (a = 0 | s.words[s.length - 1]));
            var f = n.length - s.length;
            if ("mod" !== e) {
              ((r = new o(null)).length = f + 1), (r.words = Array(r.length));
              for (var h = 0; h < r.length; h++) r.words[h] = 0;
            }
            var u = n.clone()._ishlnsubmul(s, 1, f);
            0 === u.negative && ((n = u), r && (r.words[f] = 1));
            for (var l = f - 1; l >= 0; l--) {
              var c =
                (0 | n.words[s.length + l]) * 0x4000000 +
                (0 | n.words[s.length + l - 1]);
              for (
                c = Math.min((c / a) | 0, 0x3ffffff), n._ishlnsubmul(s, c, l);
                0 !== n.negative;

              )
                c--,
                  (n.negative = 0),
                  n._ishlnsubmul(s, 1, l),
                  n.isZero() || (n.negative ^= 1);
              r && (r.words[l] = c);
            }
            return (
              r && r._strip(),
              n._strip(),
              "div" !== e && 0 !== i && n.iushrn(i),
              { div: r || null, mod: n }
            );
          }),
          (o.prototype.divmod = function (t, e, r) {
            var n, s, a;
            return (i(!t.isZero()), this.isZero())
              ? { div: new o(0), mod: new o(0) }
              : 0 !== this.negative && 0 === t.negative
              ? ((a = this.neg().divmod(t, e)),
                "mod" !== e && (n = a.div.neg()),
                "div" !== e &&
                  ((s = a.mod.neg()), r && 0 !== s.negative && s.iadd(t)),
                { div: n, mod: s })
              : 0 === this.negative && 0 !== t.negative
              ? ((a = this.divmod(t.neg(), e)),
                "mod" !== e && (n = a.div.neg()),
                { div: n, mod: a.mod })
              : (this.negative & t.negative) != 0
              ? ((a = this.neg().divmod(t.neg(), e)),
                "div" !== e &&
                  ((s = a.mod.neg()), r && 0 !== s.negative && s.isub(t)),
                { div: a.div, mod: s })
              : t.length > this.length || 0 > this.cmp(t)
              ? { div: new o(0), mod: this }
              : 1 === t.length
              ? "div" === e
                ? { div: this.divn(t.words[0]), mod: null }
                : "mod" === e
                ? { div: null, mod: new o(this.modrn(t.words[0])) }
                : {
                    div: this.divn(t.words[0]),
                    mod: new o(this.modrn(t.words[0])),
                  }
              : this._wordDiv(t, e);
          }),
          (o.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (o.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (o.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (o.prototype.divRound = function (t) {
            var e = this.divmod(t);
            if (e.mod.isZero()) return e.div;
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              o = r.cmp(i);
            return o < 0 || (1 === n && 0 === o)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1);
          }),
          (o.prototype.modrn = function (t) {
            var e = t < 0;
            e && (t = -t), i(t <= 0x3ffffff);
            for (var r = 0x4000000 % t, n = 0, o = this.length - 1; o >= 0; o--)
              n = (r * n + (0 | this.words[o])) % t;
            return e ? -n : n;
          }),
          (o.prototype.modn = function (t) {
            return this.modrn(t);
          }),
          (o.prototype.idivn = function (t) {
            var e = t < 0;
            e && (t = -t), i(t <= 0x3ffffff);
            for (var r = 0, n = this.length - 1; n >= 0; n--) {
              var o = (0 | this.words[n]) + 0x4000000 * r;
              (this.words[n] = (o / t) | 0), (r = o % t);
            }
            return this._strip(), e ? this.ineg() : this;
          }),
          (o.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (o.prototype.egcd = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var n = new o(1), s = new o(0), a = new o(0), f = new o(1), h = 0;
              e.isEven() && r.isEven();

            )
              e.iushrn(1), r.iushrn(1), ++h;
            for (var u = r.clone(), l = e.clone(); !e.isZero(); ) {
              for (
                var c = 0, d = 1;
                (e.words[0] & d) == 0 && c < 26;
                ++c, d <<= 1
              );
              if (c > 0)
                for (e.iushrn(c); c-- > 0; )
                  (n.isOdd() || s.isOdd()) && (n.iadd(u), s.isub(l)),
                    n.iushrn(1),
                    s.iushrn(1);
              for (
                var p = 0, m = 1;
                (r.words[0] & m) == 0 && p < 26;
                ++p, m <<= 1
              );
              if (p > 0)
                for (r.iushrn(p); p-- > 0; )
                  (a.isOdd() || f.isOdd()) && (a.iadd(u), f.isub(l)),
                    a.iushrn(1),
                    f.iushrn(1);
              e.cmp(r) >= 0
                ? (e.isub(r), n.isub(a), s.isub(f))
                : (r.isub(e), a.isub(n), f.isub(s));
            }
            return { a: a, b: f, gcd: r.iushln(h) };
          }),
          (o.prototype._invmp = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e,
              r = this,
              n = t.clone();
            r = 0 !== r.negative ? r.umod(t) : r.clone();
            for (
              var s = new o(1), a = new o(0), f = n.clone();
              r.cmpn(1) > 0 && n.cmpn(1) > 0;

            ) {
              for (
                var h = 0, u = 1;
                (r.words[0] & u) == 0 && h < 26;
                ++h, u <<= 1
              );
              if (h > 0)
                for (r.iushrn(h); h-- > 0; )
                  s.isOdd() && s.iadd(f), s.iushrn(1);
              for (
                var l = 0, c = 1;
                (n.words[0] & c) == 0 && l < 26;
                ++l, c <<= 1
              );
              if (l > 0)
                for (n.iushrn(l); l-- > 0; )
                  a.isOdd() && a.iadd(f), a.iushrn(1);
              r.cmp(n) >= 0 ? (r.isub(n), s.isub(a)) : (n.isub(r), a.isub(s));
            }
            return 0 > (e = 0 === r.cmpn(1) ? s : a).cmpn(0) && e.iadd(t), e;
          }),
          (o.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var e = this.clone(),
              r = t.clone();
            (e.negative = 0), (r.negative = 0);
            for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1), r.iushrn(1);
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1);
              for (; r.isEven(); ) r.iushrn(1);
              var n = e.cmp(r);
              if (n < 0) {
                var o = e;
                (e = r), (r = o);
              } else if (0 === n || 0 === r.cmpn(1)) break;
              e.isub(r);
            }
            return r.iushln(i);
          }),
          (o.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (o.prototype.isEven = function () {
            return (1 & this.words[0]) == 0;
          }),
          (o.prototype.isOdd = function () {
            return (1 & this.words[0]) == 1;
          }),
          (o.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (o.prototype.bincn = function (t) {
            i("number" == typeof t);
            var e = t % 26,
              r = (t - e) / 26,
              n = 1 << e;
            if (this.length <= r)
              return this._expand(r + 1), (this.words[r] |= n), this;
            for (var o = n, s = r; 0 !== o && s < this.length; s++) {
              var a = 0 | this.words[s];
              (a += o), (o = a >>> 26), (a &= 0x3ffffff), (this.words[s] = a);
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this;
          }),
          (o.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (o.prototype.cmpn = function (t) {
            var e,
              r = t < 0;
            if (0 !== this.negative && !r) return -1;
            if (0 === this.negative && r) return 1;
            if ((this._strip(), this.length > 1)) e = 1;
            else {
              r && (t = -t), i(t <= 0x3ffffff, "Number is too big");
              var n = 0 | this.words[0];
              e = n === t ? 0 : n < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var e = this.ucmp(t);
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r],
                n = 0 | t.words[r];
              if (i !== n) {
                i < n ? (e = -1) : i > n && (e = 1);
                break;
              }
            }
            return e;
          }),
          (o.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (o.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (o.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (o.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (o.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (o.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (o.prototype.lten = function (t) {
            return 0 >= this.cmpn(t);
          }),
          (o.prototype.lte = function (t) {
            return 0 >= this.cmp(t);
          }),
          (o.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (o.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (o.red = function (t) {
            return new M(t);
          }),
          (o.prototype.toRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              i(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (o.prototype.fromRed = function () {
            return (
              i(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (o.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (o.prototype.forceRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (o.prototype.redAdd = function (t) {
            return (
              i(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (o.prototype.redIAdd = function (t) {
            return (
              i(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (o.prototype.redSub = function (t) {
            return (
              i(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (o.prototype.redISub = function (t) {
            return (
              i(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (o.prototype.redShl = function (t) {
            return (
              i(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (o.prototype.redMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (o.prototype.redIMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (o.prototype.redSqr = function () {
            return (
              i(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (o.prototype.redISqr = function () {
            return (
              i(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (o.prototype.redSqrt = function () {
            return (
              i(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (o.prototype.redInvm = function () {
            return (
              i(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (o.prototype.redNeg = function () {
            return (
              i(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (o.prototype.redPow = function (t) {
            return (
              i(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var v = { k256: null, p224: null, p192: null, p25519: null };
        function b(t, e) {
          (this.name = t),
            (this.p = new o(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new o(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function E() {
          b.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function x() {
          b.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function A() {
          b.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function _() {
          b.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function M(t) {
          if ("string" == typeof t) {
            var e = o._prime(t);
            (this.m = e.p), (this.prime = e);
          } else
            i(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function O(t) {
          M.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new o(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (b.prototype._tmp = function () {
          var t = new o(null);
          return (t.words = Array(Math.ceil(this.n / 13))), t;
        }),
          (b.prototype.ireduce = function (t) {
            var e,
              r = t;
            do
              this.split(r, this.tmp),
                (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
            while (e > this.n);
            var i = e < this.n ? -1 : r.ucmp(this.p);
            return (
              0 === i
                ? ((r.words[0] = 0), (r.length = 1))
                : i > 0
                ? r.isub(this.p)
                : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
              r
            );
          }),
          (b.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e);
          }),
          (b.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          n(E, b),
          (E.prototype.split = function (t, e) {
            for (var r = Math.min(t.length, 9), i = 0; i < r; i++)
              e.words[i] = t.words[i];
            if (((e.length = r), t.length <= 9)) {
              (t.words[0] = 0), (t.length = 1);
              return;
            }
            var n = t.words[9];
            for (i = 10, e.words[e.length++] = 4194303 & n; i < t.length; i++) {
              var o = 0 | t.words[i];
              (t.words[i - 10] = ((4194303 & o) << 4) | (n >>> 22)), (n = o);
            }
            (n >>>= 22),
              (t.words[i - 10] = n),
              0 === n && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (E.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r];
              (e += 977 * i),
                (t.words[r] = 0x3ffffff & e),
                (e = 64 * i + ((e / 0x4000000) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          n(x, b),
          n(A, b),
          n(_, b),
          (_.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = (0 | t.words[r]) * 19 + e,
                n = 0x3ffffff & i;
              (i >>>= 26), (t.words[r] = n), (e = i);
            }
            return 0 !== e && (t.words[t.length++] = e), t;
          }),
          (o._prime = function (t) {
            var e;
            if (v[t]) return v[t];
            if ("k256" === t) e = new E();
            else if ("p224" === t) e = new x();
            else if ("p192" === t) e = new A();
            else if ("p25519" === t) e = new _();
            else throw Error("Unknown prime " + t);
            return (v[t] = e), e;
          }),
          (M.prototype._verify1 = function (t) {
            i(0 === t.negative, "red works only with positives"),
              i(t.red, "red works only with red numbers");
          }),
          (M.prototype._verify2 = function (t, e) {
            i((t.negative | e.negative) == 0, "red works only with positives"),
              i(t.red && t.red === e.red, "red works only with red numbers");
          }),
          (M.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : (h(t, t.umod(this.m)._forceRed(this)), t);
          }),
          (M.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (M.prototype.add = function (t, e) {
            this._verify2(t, e);
            var r = t.add(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
          }),
          (M.prototype.iadd = function (t, e) {
            this._verify2(t, e);
            var r = t.iadd(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r;
          }),
          (M.prototype.sub = function (t, e) {
            this._verify2(t, e);
            var r = t.sub(e);
            return 0 > r.cmpn(0) && r.iadd(this.m), r._forceRed(this);
          }),
          (M.prototype.isub = function (t, e) {
            this._verify2(t, e);
            var r = t.isub(e);
            return 0 > r.cmpn(0) && r.iadd(this.m), r;
          }),
          (M.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e));
          }),
          (M.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e));
          }),
          (M.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e));
          }),
          (M.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (M.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (M.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var e = this.m.andln(3);
            if ((i(e % 2 == 1), 3 === e)) {
              var r = this.m.add(new o(1)).iushrn(2);
              return this.pow(t, r);
            }
            for (
              var n = this.m.subn(1), s = 0;
              !n.isZero() && 0 === n.andln(1);

            )
              s++, n.iushrn(1);
            i(!n.isZero());
            var a = new o(1).toRed(this),
              f = a.redNeg(),
              h = this.m.subn(1).iushrn(1),
              u = this.m.bitLength();
            for (
              u = new o(2 * u * u).toRed(this);
              0 !== this.pow(u, h).cmp(f);

            )
              u.redIAdd(f);
            for (
              var l = this.pow(u, n),
                c = this.pow(t, n.addn(1).iushrn(1)),
                d = this.pow(t, n),
                p = s;
              0 !== d.cmp(a);

            ) {
              for (var m = d, y = 0; 0 !== m.cmp(a); y++) m = m.redSqr();
              i(y < p);
              var g = this.pow(l, new o(1).iushln(p - y - 1));
              (c = c.redMul(g)), (l = g.redSqr()), (d = d.redMul(l)), (p = y);
            }
            return c;
          }),
          (M.prototype.invm = function (t) {
            var e = t._invmp(this.m);
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e);
          }),
          (M.prototype.pow = function (t, e) {
            if (e.isZero()) return new o(1).toRed(this);
            if (0 === e.cmpn(1)) return t.clone();
            var r = Array(16);
            (r[0] = new o(1).toRed(this)), (r[1] = t);
            for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t);
            var n = r[0],
              s = 0,
              a = 0,
              f = e.bitLength() % 26;
            for (0 === f && (f = 26), i = e.length - 1; i >= 0; i--) {
              for (var h = e.words[i], u = f - 1; u >= 0; u--) {
                var l = (h >> u) & 1;
                if ((n !== r[0] && (n = this.sqr(n)), 0 === l && 0 === s)) {
                  a = 0;
                  continue;
                }
                (s <<= 1),
                  (s |= l),
                  (4 == ++a || (0 === i && 0 === u)) &&
                    ((n = this.mul(n, r[s])), (a = 0), (s = 0));
              }
              f = 26;
            }
            return n;
          }),
          (M.prototype.convertTo = function (t) {
            var e = t.umod(this.m);
            return e === t ? e.clone() : e;
          }),
          (M.prototype.convertFrom = function (t) {
            var e = t.clone();
            return (e.red = null), e;
          }),
          (o.mont = function (t) {
            return new O(t);
          }),
          n(O, M),
          (O.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (O.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv));
            return (e.red = null), e;
          }),
          (O.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var r = t.imul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              o = n;
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : 0 > n.cmpn(0) && (o = n.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (O.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
            var r = t.mul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              s = n;
            return (
              n.cmp(this.m) >= 0
                ? (s = n.isub(this.m))
                : 0 > n.cmpn(0) && (s = n.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (O.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })((t = r.nmd(t)), this);
    },
    2755: function (t, e, r) {
      "use strict";
      var i = r(8287).Buffer,
        n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (t, e, r, i) {
                void 0 === i && (i = r),
                  Object.defineProperty(t, i, {
                    enumerable: !0,
                    get: function () {
                      return e[r];
                    },
                  });
              }
            : function (t, e, r, i) {
                void 0 === i && (i = r), (t[i] = e[r]);
              }),
        o =
          (this && this.__setModuleDefault) ||
          (Object.create
            ? function (t, e) {
                Object.defineProperty(t, "default", {
                  enumerable: !0,
                  value: e,
                });
              }
            : function (t, e) {
                t.default = e;
              }),
        s =
          (this && this.__decorate) ||
          function (t, e, r, i) {
            var n,
              o = arguments.length,
              s =
                o < 3
                  ? e
                  : null === i
                  ? (i = Object.getOwnPropertyDescriptor(e, r))
                  : i;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              s = Reflect.decorate(t, e, r, i);
            else
              for (var a = t.length - 1; a >= 0; a--)
                (n = t[a]) &&
                  (s = (o < 3 ? n(s) : o > 3 ? n(e, r, s) : n(e, r)) || s);
            return o > 3 && s && Object.defineProperty(e, r, s), s;
          },
        a =
          (this && this.__importStar) ||
          function (t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var r in t)
                "default" !== r &&
                  Object.hasOwnProperty.call(t, r) &&
                  n(e, t, r);
            return o(e, t), e;
          },
        f =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.deserializeUnchecked =
          e.deserialize =
          e.serialize =
          e.BinaryReader =
          e.BinaryWriter =
          e.BorshError =
          e.baseDecode =
          e.baseEncode =
            void 0);
      let h = f(r(9404)),
        u = f(r(4989)),
        l = a(r(4281)),
        c = new (
          "function" != typeof TextDecoder ? l.TextDecoder : TextDecoder
        )("utf-8", { fatal: !0 });
      (e.baseEncode = function (t) {
        return (
          "string" == typeof t && (t = i.from(t, "utf8")),
          u.default.encode(i.from(t))
        );
      }),
        (e.baseDecode = function (t) {
          return i.from(u.default.decode(t));
        });
      class d extends Error {
        constructor(t) {
          super(t), (this.fieldPath = []), (this.originalMessage = t);
        }
        addToFieldPath(t) {
          this.fieldPath.splice(0, 0, t),
            (this.message =
              this.originalMessage + ": " + this.fieldPath.join("."));
        }
      }
      e.BorshError = d;
      class p {
        constructor() {
          (this.buf = i.alloc(1024)), (this.length = 0);
        }
        maybeResize() {
          this.buf.length < 16 + this.length &&
            (this.buf = i.concat([this.buf, i.alloc(1024)]));
        }
        writeU8(t) {
          this.maybeResize(),
            this.buf.writeUInt8(t, this.length),
            (this.length += 1);
        }
        writeU16(t) {
          this.maybeResize(),
            this.buf.writeUInt16LE(t, this.length),
            (this.length += 2);
        }
        writeU32(t) {
          this.maybeResize(),
            this.buf.writeUInt32LE(t, this.length),
            (this.length += 4);
        }
        writeU64(t) {
          this.maybeResize(),
            this.writeBuffer(i.from(new h.default(t).toArray("le", 8)));
        }
        writeU128(t) {
          this.maybeResize(),
            this.writeBuffer(i.from(new h.default(t).toArray("le", 16)));
        }
        writeU256(t) {
          this.maybeResize(),
            this.writeBuffer(i.from(new h.default(t).toArray("le", 32)));
        }
        writeU512(t) {
          this.maybeResize(),
            this.writeBuffer(i.from(new h.default(t).toArray("le", 64)));
        }
        writeBuffer(t) {
          (this.buf = i.concat([
            i.from(this.buf.subarray(0, this.length)),
            t,
            i.alloc(1024),
          ])),
            (this.length += t.length);
        }
        writeString(t) {
          this.maybeResize();
          let e = i.from(t, "utf8");
          this.writeU32(e.length), this.writeBuffer(e);
        }
        writeFixedArray(t) {
          this.writeBuffer(i.from(t));
        }
        writeArray(t, e) {
          for (let r of (this.maybeResize(), this.writeU32(t.length), t))
            this.maybeResize(), e(r);
        }
        toArray() {
          return this.buf.subarray(0, this.length);
        }
      }
      function m(t, e, r) {
        let i = r.value;
        r.value = function (...t) {
          try {
            return i.apply(this, t);
          } catch (t) {
            if (
              t instanceof RangeError &&
              ["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(
                t.code
              ) >= 0
            )
              throw new d("Reached the end of buffer when deserializing");
            throw t;
          }
        };
      }
      e.BinaryWriter = p;
      class y {
        constructor(t) {
          (this.buf = t), (this.offset = 0);
        }
        readU8() {
          let t = this.buf.readUInt8(this.offset);
          return (this.offset += 1), t;
        }
        readU16() {
          let t = this.buf.readUInt16LE(this.offset);
          return (this.offset += 2), t;
        }
        readU32() {
          let t = this.buf.readUInt32LE(this.offset);
          return (this.offset += 4), t;
        }
        readU64() {
          let t = this.readBuffer(8);
          return new h.default(t, "le");
        }
        readU128() {
          let t = this.readBuffer(16);
          return new h.default(t, "le");
        }
        readU256() {
          let t = this.readBuffer(32);
          return new h.default(t, "le");
        }
        readU512() {
          let t = this.readBuffer(64);
          return new h.default(t, "le");
        }
        readBuffer(t) {
          if (this.offset + t > this.buf.length)
            throw new d(`Expected buffer length ${t} isn't within bounds`);
          let e = this.buf.slice(this.offset, this.offset + t);
          return (this.offset += t), e;
        }
        readString() {
          let t = this.readU32(),
            e = this.readBuffer(t);
          try {
            return c.decode(e);
          } catch (t) {
            throw new d(`Error decoding UTF-8 string: ${t}`);
          }
        }
        readFixedArray(t) {
          return new Uint8Array(this.readBuffer(t));
        }
        readArray(t) {
          let e = this.readU32(),
            r = [];
          for (let i = 0; i < e; ++i) r.push(t());
          return r;
        }
      }
      function g(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
      }
      function w(t, e, r, i, n) {
        try {
          if ("string" == typeof i) n[`write${g(i)}`](r);
          else if (i instanceof Array) {
            if ("number" == typeof i[0]) {
              if (r.length !== i[0])
                throw new d(
                  `Expecting byte array of length ${i[0]}, but got ${r.length} bytes`
                );
              n.writeFixedArray(r);
            } else if (2 === i.length && "number" == typeof i[1]) {
              if (r.length !== i[1])
                throw new d(
                  `Expecting byte array of length ${i[1]}, but got ${r.length} bytes`
                );
              for (let e = 0; e < i[1]; e++) w(t, null, r[e], i[0], n);
            } else
              n.writeArray(r, (r) => {
                w(t, e, r, i[0], n);
              });
          } else if (void 0 !== i.kind)
            switch (i.kind) {
              case "option":
                null == r
                  ? n.writeU8(0)
                  : (n.writeU8(1), w(t, e, r, i.type, n));
                break;
              case "map":
                n.writeU32(r.size),
                  r.forEach((r, o) => {
                    w(t, e, o, i.key, n), w(t, e, r, i.value, n);
                  });
                break;
              default:
                throw new d(`FieldType ${i} unrecognized`);
            }
          else v(t, r, n);
        } catch (t) {
          throw (t instanceof d && t.addToFieldPath(e), t);
        }
      }
      function v(t, e, r) {
        if ("function" == typeof e.borshSerialize) {
          e.borshSerialize(r);
          return;
        }
        let i = t.get(e.constructor);
        if (!i) throw new d(`Class ${e.constructor.name} is missing in schema`);
        if ("struct" === i.kind)
          i.fields.map(([i, n]) => {
            w(t, i, e[i], n, r);
          });
        else if ("enum" === i.kind) {
          let n = e[i.field];
          for (let o = 0; o < i.values.length; ++o) {
            let [s, a] = i.values[o];
            if (s === n) {
              r.writeU8(o), w(t, s, e[s], a, r);
              break;
            }
          }
        } else
          throw new d(
            `Unexpected schema kind: ${i.kind} for ${e.constructor.name}`
          );
      }
      function b(t, e, r, i) {
        try {
          if ("string" == typeof r) return i[`read${g(r)}`]();
          if (r instanceof Array) {
            if ("number" == typeof r[0]) return i.readFixedArray(r[0]);
            if ("number" != typeof r[1])
              return i.readArray(() => b(t, e, r[0], i));
            {
              let e = [];
              for (let n = 0; n < r[1]; n++) e.push(b(t, null, r[0], i));
              return e;
            }
          }
          if ("option" === r.kind) {
            if (i.readU8()) return b(t, e, r.type, i);
            return;
          }
          if ("map" === r.kind) {
            let n = new Map(),
              o = i.readU32();
            for (let s = 0; s < o; s++) {
              let o = b(t, e, r.key, i),
                s = b(t, e, r.value, i);
              n.set(o, s);
            }
            return n;
          }
          return E(t, r, i);
        } catch (t) {
          throw (t instanceof d && t.addToFieldPath(e), t);
        }
      }
      function E(t, e, r) {
        if ("function" == typeof e.borshDeserialize)
          return e.borshDeserialize(r);
        let i = t.get(e);
        if (!i) throw new d(`Class ${e.name} is missing in schema`);
        if ("struct" === i.kind) {
          let i = {};
          for (let [n, o] of t.get(e).fields) i[n] = b(t, n, o, r);
          return new e(i);
        }
        if ("enum" === i.kind) {
          let n = r.readU8();
          if (n >= i.values.length)
            throw new d(`Enum index: ${n} is out of range`);
          let [o, s] = i.values[n],
            a = b(t, o, s, r);
          return new e({ [o]: a });
        }
        throw new d(
          `Unexpected schema kind: ${i.kind} for ${e.constructor.name}`
        );
      }
      s([m], y.prototype, "readU8", null),
        s([m], y.prototype, "readU16", null),
        s([m], y.prototype, "readU32", null),
        s([m], y.prototype, "readU64", null),
        s([m], y.prototype, "readU128", null),
        s([m], y.prototype, "readU256", null),
        s([m], y.prototype, "readU512", null),
        s([m], y.prototype, "readString", null),
        s([m], y.prototype, "readFixedArray", null),
        s([m], y.prototype, "readArray", null),
        (e.BinaryReader = y),
        (e.serialize = function (t, e, r = p) {
          let i = new r();
          return v(t, e, i), i.toArray();
        }),
        (e.deserialize = function (t, e, r, i = y) {
          let n = new i(r),
            o = E(t, e, n);
          if (n.offset < r.length)
            throw new d(
              `Unexpected ${r.length - n.offset} bytes after deserialized data`
            );
          return o;
        }),
        (e.deserializeUnchecked = function (t, e, r, i = y) {
          return E(t, e, new i(r));
        });
    },
    1462: (t, e, r) => {
      "use strict";
      var i = r(2861).Buffer;
      t.exports = function (t) {
        if (t.length >= 255) throw TypeError("Alphabet too long");
        for (var e = new Uint8Array(256), r = 0; r < e.length; r++) e[r] = 255;
        for (var n = 0; n < t.length; n++) {
          var o = t.charAt(n),
            s = o.charCodeAt(0);
          if (255 !== e[s]) throw TypeError(o + " is ambiguous");
          e[s] = n;
        }
        var a = t.length,
          f = t.charAt(0),
          h = Math.log(a) / Math.log(256),
          u = Math.log(256) / Math.log(a);
        function l(t) {
          if ("string" != typeof t) throw TypeError("Expected String");
          if (0 === t.length) return i.alloc(0);
          for (var r = 0, n = 0, o = 0; t[r] === f; ) n++, r++;
          for (
            var s = ((t.length - r) * h + 1) >>> 0, u = new Uint8Array(s);
            r < t.length;

          ) {
            var l = e[t.charCodeAt(r)];
            if (255 === l) return;
            for (var c = 0, d = s - 1; (0 !== l || c < o) && -1 !== d; d--, c++)
              (l += (a * u[d]) >>> 0),
                (u[d] = l % 256 >>> 0),
                (l = (l / 256) >>> 0);
            if (0 !== l) throw Error("Non-zero carry");
            (o = c), r++;
          }
          for (var p = s - o; p !== s && 0 === u[p]; ) p++;
          var m = i.allocUnsafe(n + (s - p));
          m.fill(0, 0, n);
          for (var y = n; p !== s; ) m[y++] = u[p++];
          return m;
        }
        return {
          encode: function (e) {
            if (
              ((Array.isArray(e) || e instanceof Uint8Array) && (e = i.from(e)),
              !i.isBuffer(e))
            )
              throw TypeError("Expected Buffer");
            if (0 === e.length) return "";
            for (var r = 0, n = 0, o = 0, s = e.length; o !== s && 0 === e[o]; )
              o++, r++;
            for (
              var h = ((s - o) * u + 1) >>> 0, l = new Uint8Array(h);
              o !== s;

            ) {
              for (
                var c = e[o], d = 0, p = h - 1;
                (0 !== c || d < n) && -1 !== p;
                p--, d++
              )
                (c += (256 * l[p]) >>> 0),
                  (l[p] = c % a >>> 0),
                  (c = (c / a) >>> 0);
              if (0 !== c) throw Error("Non-zero carry");
              (n = d), o++;
            }
            for (var m = h - n; m !== h && 0 === l[m]; ) m++;
            for (var y = f.repeat(r); m < h; ++m) y += t.charAt(l[m]);
            return y;
          },
          decodeUnsafe: l,
          decode: function (t) {
            var e = l(t);
            if (e) return e;
            throw Error("Non-base" + a + " character");
          },
        };
      };
    },
    4989: (t, e, r) => {
      var i = r(1462);
      t.exports = i(
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      );
    },
    8287: (t, e, r) => {
      "use strict";
      let i = r(7526),
        n = r(251),
        o =
          "function" == typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : null;
      function s(t) {
        if (t > 0x7fffffff)
          throw RangeError(
            'The value "' + t + '" is invalid for option "size"'
          );
        let e = new Uint8Array(t);
        return Object.setPrototypeOf(e, a.prototype), e;
      }
      function a(t, e, r) {
        if ("number" == typeof t) {
          if ("string" == typeof e)
            throw TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return u(t);
        }
        return f(t, e, r);
      }
      function f(t, e, r) {
        if ("string" == typeof t)
          return (function (t, e) {
            if (
              (("string" != typeof e || "" === e) && (e = "utf8"),
              !a.isEncoding(e))
            )
              throw TypeError("Unknown encoding: " + e);
            let r = 0 | p(t, e),
              i = s(r),
              n = i.write(t, e);
            return n !== r && (i = i.slice(0, n)), i;
          })(t, e);
        if (ArrayBuffer.isView(t))
          return (function (t) {
            if (k(t, Uint8Array)) {
              let e = new Uint8Array(t);
              return c(e.buffer, e.byteOffset, e.byteLength);
            }
            return l(t);
          })(t);
        if (null == t)
          throw TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof t
          );
        if (
          k(t, ArrayBuffer) ||
          (t && k(t.buffer, ArrayBuffer)) ||
          ("undefined" != typeof SharedArrayBuffer &&
            (k(t, SharedArrayBuffer) || (t && k(t.buffer, SharedArrayBuffer))))
        )
          return c(t, e, r);
        if ("number" == typeof t)
          throw TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        let i = t.valueOf && t.valueOf();
        if (null != i && i !== t) return a.from(i, e, r);
        let n = (function (t) {
          var e;
          if (a.isBuffer(t)) {
            let e = 0 | d(t.length),
              r = s(e);
            return 0 === r.length || t.copy(r, 0, 0, e), r;
          }
          return void 0 !== t.length
            ? "number" != typeof t.length || (e = t.length) != e
              ? s(0)
              : l(t)
            : "Buffer" === t.type && Array.isArray(t.data)
            ? l(t.data)
            : void 0;
        })(t);
        if (n) return n;
        if (
          "undefined" != typeof Symbol &&
          null != Symbol.toPrimitive &&
          "function" == typeof t[Symbol.toPrimitive]
        )
          return a.from(t[Symbol.toPrimitive]("string"), e, r);
        throw TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof t
        );
      }
      function h(t) {
        if ("number" != typeof t)
          throw TypeError('"size" argument must be of type number');
        if (t < 0)
          throw RangeError(
            'The value "' + t + '" is invalid for option "size"'
          );
      }
      function u(t) {
        return h(t), s(t < 0 ? 0 : 0 | d(t));
      }
      function l(t) {
        let e = t.length < 0 ? 0 : 0 | d(t.length),
          r = s(e);
        for (let i = 0; i < e; i += 1) r[i] = 255 & t[i];
        return r;
      }
      function c(t, e, r) {
        let i;
        if (e < 0 || t.byteLength < e)
          throw RangeError('"offset" is outside of buffer bounds');
        if (t.byteLength < e + (r || 0))
          throw RangeError('"length" is outside of buffer bounds');
        return (
          Object.setPrototypeOf(
            (i =
              void 0 === e && void 0 === r
                ? new Uint8Array(t)
                : void 0 === r
                ? new Uint8Array(t, e)
                : new Uint8Array(t, e, r)),
            a.prototype
          ),
          i
        );
      }
      function d(t) {
        if (t >= 0x7fffffff)
          throw RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes"
          );
        return 0 | t;
      }
      function p(t, e) {
        if (a.isBuffer(t)) return t.length;
        if (ArrayBuffer.isView(t) || k(t, ArrayBuffer)) return t.byteLength;
        if ("string" != typeof t)
          throw TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
              typeof t
          );
        let r = t.length,
          i = arguments.length > 2 && !0 === arguments[2];
        if (!i && 0 === r) return 0;
        let n = !1;
        for (;;)
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
              return U(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return P(t).length;
            default:
              if (n) return i ? -1 : U(t).length;
              (e = ("" + e).toLowerCase()), (n = !0);
          }
      }
      function m(t, e, r) {
        let n = !1;
        if (
          ((void 0 === e || e < 0) && (e = 0),
          e > this.length ||
            ((void 0 === r || r > this.length) && (r = this.length),
            r <= 0 || (r >>>= 0) <= (e >>>= 0)))
        )
          return "";
        for (t || (t = "utf8"); ; )
          switch (t) {
            case "hex":
              return (function (t, e, r) {
                let i = t.length;
                (!e || e < 0) && (e = 0), (!r || r < 0 || r > i) && (r = i);
                let n = "";
                for (let i = e; i < r; ++i) n += D[t[i]];
                return n;
              })(this, e, r);
            case "utf8":
            case "utf-8":
              return v(this, e, r);
            case "ascii":
              return (function (t, e, r) {
                let i = "";
                r = Math.min(t.length, r);
                for (let n = e; n < r; ++n)
                  i += String.fromCharCode(127 & t[n]);
                return i;
              })(this, e, r);
            case "latin1":
            case "binary":
              return (function (t, e, r) {
                let i = "";
                r = Math.min(t.length, r);
                for (let n = e; n < r; ++n) i += String.fromCharCode(t[n]);
                return i;
              })(this, e, r);
            case "base64":
              var o, s;
              return (
                (o = e),
                (s = r),
                0 === o && s === this.length
                  ? i.fromByteArray(this)
                  : i.fromByteArray(this.slice(o, s))
              );
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return (function (t, e, r) {
                let i = t.slice(e, r),
                  n = "";
                for (let t = 0; t < i.length - 1; t += 2)
                  n += String.fromCharCode(i[t] + 256 * i[t + 1]);
                return n;
              })(this, e, r);
            default:
              if (n) throw TypeError("Unknown encoding: " + t);
              (t = (t + "").toLowerCase()), (n = !0);
          }
      }
      function y(t, e, r) {
        let i = t[e];
        (t[e] = t[r]), (t[r] = i);
      }
      function g(t, e, r, i, n) {
        var o;
        if (0 === t.length) return -1;
        if (
          ("string" == typeof r
            ? ((i = r), (r = 0))
            : r > 0x7fffffff
            ? (r = 0x7fffffff)
            : r < -0x80000000 && (r = -0x80000000),
          (o = r = +r) != o && (r = n ? 0 : t.length - 1),
          r < 0 && (r = t.length + r),
          r >= t.length)
        ) {
          if (n) return -1;
          r = t.length - 1;
        } else if (r < 0) {
          if (!n) return -1;
          r = 0;
        }
        if (("string" == typeof e && (e = a.from(e, i)), a.isBuffer(e)))
          return 0 === e.length ? -1 : w(t, e, r, i, n);
        if ("number" == typeof e)
          return ((e &= 255), "function" == typeof Uint8Array.prototype.indexOf)
            ? n
              ? Uint8Array.prototype.indexOf.call(t, e, r)
              : Uint8Array.prototype.lastIndexOf.call(t, e, r)
            : w(t, [e], r, i, n);
        throw TypeError("val must be string, number or Buffer");
      }
      function w(t, e, r, i, n) {
        let o,
          s = 1,
          a = t.length,
          f = e.length;
        if (
          void 0 !== i &&
          ("ucs2" === (i = String(i).toLowerCase()) ||
            "ucs-2" === i ||
            "utf16le" === i ||
            "utf-16le" === i)
        ) {
          if (t.length < 2 || e.length < 2) return -1;
          (s = 2), (a /= 2), (f /= 2), (r /= 2);
        }
        function h(t, e) {
          return 1 === s ? t[e] : t.readUInt16BE(e * s);
        }
        if (n) {
          let i = -1;
          for (o = r; o < a; o++)
            if (h(t, o) === h(e, -1 === i ? 0 : o - i)) {
              if ((-1 === i && (i = o), o - i + 1 === f)) return i * s;
            } else -1 !== i && (o -= o - i), (i = -1);
        } else
          for (r + f > a && (r = a - f), o = r; o >= 0; o--) {
            let r = !0;
            for (let i = 0; i < f; i++)
              if (h(t, o + i) !== h(e, i)) {
                r = !1;
                break;
              }
            if (r) return o;
          }
        return -1;
      }
      function v(t, e, r) {
        r = Math.min(t.length, r);
        let i = [],
          n = e;
        for (; n < r; ) {
          let e = t[n],
            o = null,
            s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
          if (n + s <= r) {
            let r, i, a, f;
            switch (s) {
              case 1:
                e < 128 && (o = e);
                break;
              case 2:
                (192 & (r = t[n + 1])) == 128 &&
                  (f = ((31 & e) << 6) | (63 & r)) > 127 &&
                  (o = f);
                break;
              case 3:
                (r = t[n + 1]),
                  (i = t[n + 2]),
                  (192 & r) == 128 &&
                    (192 & i) == 128 &&
                    (f = ((15 & e) << 12) | ((63 & r) << 6) | (63 & i)) >
                      2047 &&
                    (f < 55296 || f > 57343) &&
                    (o = f);
                break;
              case 4:
                (r = t[n + 1]),
                  (i = t[n + 2]),
                  (a = t[n + 3]),
                  (192 & r) == 128 &&
                    (192 & i) == 128 &&
                    (192 & a) == 128 &&
                    (f =
                      ((15 & e) << 18) |
                      ((63 & r) << 12) |
                      ((63 & i) << 6) |
                      (63 & a)) > 65535 &&
                    f < 1114112 &&
                    (o = f);
            }
          }
          null === o
            ? ((o = 65533), (s = 1))
            : o > 65535 &&
              ((o -= 65536),
              i.push(((o >>> 10) & 1023) | 55296),
              (o = 56320 | (1023 & o))),
            i.push(o),
            (n += s);
        }
        return (function (t) {
          let e = t.length;
          if (e <= 4096) return String.fromCharCode.apply(String, t);
          let r = "",
            i = 0;
          for (; i < e; )
            r += String.fromCharCode.apply(String, t.slice(i, (i += 4096)));
          return r;
        })(i);
      }
      function b(t, e, r) {
        if (t % 1 != 0 || t < 0) throw RangeError("offset is not uint");
        if (t + e > r)
          throw RangeError("Trying to access beyond buffer length");
      }
      function E(t, e, r, i, n, o) {
        if (!a.isBuffer(t))
          throw TypeError('"buffer" argument must be a Buffer instance');
        if (e > n || e < o)
          throw RangeError('"value" argument is out of bounds');
        if (r + i > t.length) throw RangeError("Index out of range");
      }
      function x(t, e, r, i, n) {
        N(e, i, n, t, r, 7);
        let o = Number(e & BigInt(0xffffffff));
        (t[r++] = o),
          (o >>= 8),
          (t[r++] = o),
          (o >>= 8),
          (t[r++] = o),
          (o >>= 8),
          (t[r++] = o);
        let s = Number((e >> BigInt(32)) & BigInt(0xffffffff));
        return (
          (t[r++] = s),
          (s >>= 8),
          (t[r++] = s),
          (s >>= 8),
          (t[r++] = s),
          (s >>= 8),
          (t[r++] = s),
          r
        );
      }
      function A(t, e, r, i, n) {
        N(e, i, n, t, r, 7);
        let o = Number(e & BigInt(0xffffffff));
        (t[r + 7] = o),
          (o >>= 8),
          (t[r + 6] = o),
          (o >>= 8),
          (t[r + 5] = o),
          (o >>= 8),
          (t[r + 4] = o);
        let s = Number((e >> BigInt(32)) & BigInt(0xffffffff));
        return (
          (t[r + 3] = s),
          (s >>= 8),
          (t[r + 2] = s),
          (s >>= 8),
          (t[r + 1] = s),
          (s >>= 8),
          (t[r] = s),
          r + 8
        );
      }
      function _(t, e, r, i, n, o) {
        if (r + i > t.length || r < 0) throw RangeError("Index out of range");
      }
      function M(t, e, r, i, o) {
        return (
          (e = +e),
          (r >>>= 0),
          o || _(t, e, r, 4, 34028234663852886e22, -34028234663852886e22),
          n.write(t, e, r, i, 23, 4),
          r + 4
        );
      }
      function O(t, e, r, i, o) {
        return (
          (e = +e),
          (r >>>= 0),
          o || _(t, e, r, 8, 17976931348623157e292, -17976931348623157e292),
          n.write(t, e, r, i, 52, 8),
          r + 8
        );
      }
      (e.Buffer = a),
        (e.SlowBuffer = function (t) {
          return +t != t && (t = 0), a.alloc(+t);
        }),
        (e.INSPECT_MAX_BYTES = 50),
        (e.kMaxLength = 0x7fffffff),
        (a.TYPED_ARRAY_SUPPORT = (function () {
          try {
            let t = new Uint8Array(1),
              e = {
                foo: function () {
                  return 42;
                },
              };
            return (
              Object.setPrototypeOf(e, Uint8Array.prototype),
              Object.setPrototypeOf(t, e),
              42 === t.foo()
            );
          } catch (t) {
            return !1;
          }
        })()),
        a.TYPED_ARRAY_SUPPORT ||
          "undefined" == typeof console ||
          "function" != typeof console.error ||
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          ),
        Object.defineProperty(a.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (a.isBuffer(this)) return this.buffer;
          },
        }),
        Object.defineProperty(a.prototype, "offset", {
          enumerable: !0,
          get: function () {
            if (a.isBuffer(this)) return this.byteOffset;
          },
        }),
        (a.poolSize = 8192),
        (a.from = function (t, e, r) {
          return f(t, e, r);
        }),
        Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
        Object.setPrototypeOf(a, Uint8Array),
        (a.alloc = function (t, e, r) {
          return (h(t), t <= 0)
            ? s(t)
            : void 0 !== e
            ? "string" == typeof r
              ? s(t).fill(e, r)
              : s(t).fill(e)
            : s(t);
        }),
        (a.allocUnsafe = function (t) {
          return u(t);
        }),
        (a.allocUnsafeSlow = function (t) {
          return u(t);
        }),
        (a.isBuffer = function (t) {
          return null != t && !0 === t._isBuffer && t !== a.prototype;
        }),
        (a.compare = function (t, e) {
          if (
            (k(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
            k(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
            !a.isBuffer(t) || !a.isBuffer(e))
          )
            throw TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          if (t === e) return 0;
          let r = t.length,
            i = e.length;
          for (let n = 0, o = Math.min(r, i); n < o; ++n)
            if (t[n] !== e[n]) {
              (r = t[n]), (i = e[n]);
              break;
            }
          return r < i ? -1 : i < r ? 1 : 0;
        }),
        (a.isEncoding = function (t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (a.concat = function (t, e) {
          let r;
          if (!Array.isArray(t))
            throw TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return a.alloc(0);
          if (void 0 === e)
            for (r = 0, e = 0; r < t.length; ++r) e += t[r].length;
          let i = a.allocUnsafe(e),
            n = 0;
          for (r = 0; r < t.length; ++r) {
            let e = t[r];
            if (k(e, Uint8Array))
              n + e.length > i.length
                ? (a.isBuffer(e) || (e = a.from(e)), e.copy(i, n))
                : Uint8Array.prototype.set.call(i, e, n);
            else if (a.isBuffer(e)) e.copy(i, n);
            else throw TypeError('"list" argument must be an Array of Buffers');
            n += e.length;
          }
          return i;
        }),
        (a.byteLength = p),
        (a.prototype._isBuffer = !0),
        (a.prototype.swap16 = function () {
          let t = this.length;
          if (t % 2 != 0)
            throw RangeError("Buffer size must be a multiple of 16-bits");
          for (let e = 0; e < t; e += 2) y(this, e, e + 1);
          return this;
        }),
        (a.prototype.swap32 = function () {
          let t = this.length;
          if (t % 4 != 0)
            throw RangeError("Buffer size must be a multiple of 32-bits");
          for (let e = 0; e < t; e += 4)
            y(this, e, e + 3), y(this, e + 1, e + 2);
          return this;
        }),
        (a.prototype.swap64 = function () {
          let t = this.length;
          if (t % 8 != 0)
            throw RangeError("Buffer size must be a multiple of 64-bits");
          for (let e = 0; e < t; e += 8)
            y(this, e, e + 7),
              y(this, e + 1, e + 6),
              y(this, e + 2, e + 5),
              y(this, e + 3, e + 4);
          return this;
        }),
        (a.prototype.toString = function () {
          let t = this.length;
          return 0 === t
            ? ""
            : 0 == arguments.length
            ? v(this, 0, t)
            : m.apply(this, arguments);
        }),
        (a.prototype.toLocaleString = a.prototype.toString),
        (a.prototype.equals = function (t) {
          if (!a.isBuffer(t)) throw TypeError("Argument must be a Buffer");
          return this === t || 0 === a.compare(this, t);
        }),
        (a.prototype.inspect = function () {
          let t = "",
            r = e.INSPECT_MAX_BYTES;
          return (
            (t = this.toString("hex", 0, r)
              .replace(/(.{2})/g, "$1 ")
              .trim()),
            this.length > r && (t += " ... "),
            "<Buffer " + t + ">"
          );
        }),
        o && (a.prototype[o] = a.prototype.inspect),
        (a.prototype.compare = function (t, e, r, i, n) {
          if (
            (k(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
            !a.isBuffer(t))
          )
            throw TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                typeof t
            );
          if (
            (void 0 === e && (e = 0),
            void 0 === r && (r = t ? t.length : 0),
            void 0 === i && (i = 0),
            void 0 === n && (n = this.length),
            e < 0 || r > t.length || i < 0 || n > this.length)
          )
            throw RangeError("out of range index");
          if (i >= n && e >= r) return 0;
          if (i >= n) return -1;
          if (e >= r) return 1;
          if (((e >>>= 0), (r >>>= 0), (i >>>= 0), (n >>>= 0), this === t))
            return 0;
          let o = n - i,
            s = r - e,
            f = Math.min(o, s),
            h = this.slice(i, n),
            u = t.slice(e, r);
          for (let t = 0; t < f; ++t)
            if (h[t] !== u[t]) {
              (o = h[t]), (s = u[t]);
              break;
            }
          return o < s ? -1 : s < o ? 1 : 0;
        }),
        (a.prototype.includes = function (t, e, r) {
          return -1 !== this.indexOf(t, e, r);
        }),
        (a.prototype.indexOf = function (t, e, r) {
          return g(this, t, e, r, !0);
        }),
        (a.prototype.lastIndexOf = function (t, e, r) {
          return g(this, t, e, r, !1);
        }),
        (a.prototype.write = function (t, e, r, i) {
          var n, o, s, a, f, h, u, l;
          if (void 0 === e) (i = "utf8"), (r = this.length), (e = 0);
          else if (void 0 === r && "string" == typeof e)
            (i = e), (r = this.length), (e = 0);
          else if (isFinite(e))
            (e >>>= 0),
              isFinite(r)
                ? ((r >>>= 0), void 0 === i && (i = "utf8"))
                : ((i = r), (r = void 0));
          else
            throw Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            );
          let c = this.length - e;
          if (
            ((void 0 === r || r > c) && (r = c),
            (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
          )
            throw RangeError("Attempt to write outside buffer bounds");
          i || (i = "utf8");
          let d = !1;
          for (;;)
            switch (i) {
              case "hex":
                return (function (t, e, r, i) {
                  let n;
                  r = Number(r) || 0;
                  let o = t.length - r;
                  i ? (i = Number(i)) > o && (i = o) : (i = o);
                  let s = e.length;
                  for (i > s / 2 && (i = s / 2), n = 0; n < i; ++n) {
                    let i = parseInt(e.substr(2 * n, 2), 16);
                    if (i != i) break;
                    t[r + n] = i;
                  }
                  return n;
                })(this, t, e, r);
              case "utf8":
              case "utf-8":
                return (n = e), (o = r), C(U(t, this.length - n), this, n, o);
              case "ascii":
              case "latin1":
              case "binary":
                return (
                  (s = e),
                  (a = r),
                  C(
                    (function (t) {
                      let e = [];
                      for (let r = 0; r < t.length; ++r)
                        e.push(255 & t.charCodeAt(r));
                      return e;
                    })(t),
                    this,
                    s,
                    a
                  )
                );
              case "base64":
                return (f = e), (h = r), C(P(t), this, f, h);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return (
                  (u = e),
                  (l = r),
                  C(
                    (function (t, e) {
                      let r, i;
                      let n = [];
                      for (let o = 0; o < t.length && !((e -= 2) < 0); ++o)
                        (i = (r = t.charCodeAt(o)) >> 8),
                          n.push(r % 256),
                          n.push(i);
                      return n;
                    })(t, this.length - u),
                    this,
                    u,
                    l
                  )
                );
              default:
                if (d) throw TypeError("Unknown encoding: " + i);
                (i = ("" + i).toLowerCase()), (d = !0);
            }
        }),
        (a.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        }),
        (a.prototype.slice = function (t, e) {
          let r = this.length;
          (t = ~~t),
            (e = void 0 === e ? r : ~~e),
            t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            e < t && (e = t);
          let i = this.subarray(t, e);
          return Object.setPrototypeOf(i, a.prototype), i;
        }),
        (a.prototype.readUintLE = a.prototype.readUIntLE =
          function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || b(t, e, this.length);
            let i = this[t],
              n = 1,
              o = 0;
            for (; ++o < e && (n *= 256); ) i += this[t + o] * n;
            return i;
          }),
        (a.prototype.readUintBE = a.prototype.readUIntBE =
          function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || b(t, e, this.length);
            let i = this[t + --e],
              n = 1;
            for (; e > 0 && (n *= 256); ) i += this[t + --e] * n;
            return i;
          }),
        (a.prototype.readUint8 = a.prototype.readUInt8 =
          function (t, e) {
            return (t >>>= 0), e || b(t, 1, this.length), this[t];
          }),
        (a.prototype.readUint16LE = a.prototype.readUInt16LE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || b(t, 2, this.length),
              this[t] | (this[t + 1] << 8)
            );
          }),
        (a.prototype.readUint16BE = a.prototype.readUInt16BE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || b(t, 2, this.length),
              (this[t] << 8) | this[t + 1]
            );
          }),
        (a.prototype.readUint32LE = a.prototype.readUInt32LE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || b(t, 4, this.length),
              (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                0x1000000 * this[t + 3]
            );
          }),
        (a.prototype.readUint32BE = a.prototype.readUInt32BE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || b(t, 4, this.length),
              0x1000000 * this[t] +
                ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            );
          }),
        (a.prototype.readBigUInt64LE = z(function (t) {
          R((t >>>= 0), "offset");
          let e = this[t],
            r = this[t + 7];
          (void 0 === e || void 0 === r) && S(t, this.length - 8);
          let i =
              e + 256 * this[++t] + 65536 * this[++t] + 0x1000000 * this[++t],
            n = this[++t] + 256 * this[++t] + 65536 * this[++t] + 0x1000000 * r;
          return BigInt(i) + (BigInt(n) << BigInt(32));
        })),
        (a.prototype.readBigUInt64BE = z(function (t) {
          R((t >>>= 0), "offset");
          let e = this[t],
            r = this[t + 7];
          (void 0 === e || void 0 === r) && S(t, this.length - 8);
          let i =
              0x1000000 * e + 65536 * this[++t] + 256 * this[++t] + this[++t],
            n = 0x1000000 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r;
          return (BigInt(i) << BigInt(32)) + BigInt(n);
        })),
        (a.prototype.readIntLE = function (t, e, r) {
          (t >>>= 0), (e >>>= 0), r || b(t, e, this.length);
          let i = this[t],
            n = 1,
            o = 0;
          for (; ++o < e && (n *= 256); ) i += this[t + o] * n;
          return i >= (n *= 128) && (i -= Math.pow(2, 8 * e)), i;
        }),
        (a.prototype.readIntBE = function (t, e, r) {
          (t >>>= 0), (e >>>= 0), r || b(t, e, this.length);
          let i = e,
            n = 1,
            o = this[t + --i];
          for (; i > 0 && (n *= 256); ) o += this[t + --i] * n;
          return o >= (n *= 128) && (o -= Math.pow(2, 8 * e)), o;
        }),
        (a.prototype.readInt8 = function (t, e) {
          return ((t >>>= 0), e || b(t, 1, this.length), 128 & this[t])
            ? -((255 - this[t] + 1) * 1)
            : this[t];
        }),
        (a.prototype.readInt16LE = function (t, e) {
          (t >>>= 0), e || b(t, 2, this.length);
          let r = this[t] | (this[t + 1] << 8);
          return 32768 & r ? 0xffff0000 | r : r;
        }),
        (a.prototype.readInt16BE = function (t, e) {
          (t >>>= 0), e || b(t, 2, this.length);
          let r = this[t + 1] | (this[t] << 8);
          return 32768 & r ? 0xffff0000 | r : r;
        }),
        (a.prototype.readInt32LE = function (t, e) {
          return (
            (t >>>= 0),
            e || b(t, 4, this.length),
            this[t] |
              (this[t + 1] << 8) |
              (this[t + 2] << 16) |
              (this[t + 3] << 24)
          );
        }),
        (a.prototype.readInt32BE = function (t, e) {
          return (
            (t >>>= 0),
            e || b(t, 4, this.length),
            (this[t] << 24) |
              (this[t + 1] << 16) |
              (this[t + 2] << 8) |
              this[t + 3]
          );
        }),
        (a.prototype.readBigInt64LE = z(function (t) {
          R((t >>>= 0), "offset");
          let e = this[t],
            r = this[t + 7];
          return (
            (void 0 === e || void 0 === r) && S(t, this.length - 8),
            (BigInt(
              this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24)
            ) <<
              BigInt(32)) +
              BigInt(
                e + 256 * this[++t] + 65536 * this[++t] + 0x1000000 * this[++t]
              )
          );
        })),
        (a.prototype.readBigInt64BE = z(function (t) {
          R((t >>>= 0), "offset");
          let e = this[t],
            r = this[t + 7];
          return (
            (void 0 === e || void 0 === r) && S(t, this.length - 8),
            (BigInt(
              (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t]
            ) <<
              BigInt(32)) +
              BigInt(
                0x1000000 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r
              )
          );
        })),
        (a.prototype.readFloatLE = function (t, e) {
          return (
            (t >>>= 0), e || b(t, 4, this.length), n.read(this, t, !0, 23, 4)
          );
        }),
        (a.prototype.readFloatBE = function (t, e) {
          return (
            (t >>>= 0), e || b(t, 4, this.length), n.read(this, t, !1, 23, 4)
          );
        }),
        (a.prototype.readDoubleLE = function (t, e) {
          return (
            (t >>>= 0), e || b(t, 8, this.length), n.read(this, t, !0, 52, 8)
          );
        }),
        (a.prototype.readDoubleBE = function (t, e) {
          return (
            (t >>>= 0), e || b(t, 8, this.length), n.read(this, t, !1, 52, 8)
          );
        }),
        (a.prototype.writeUintLE = a.prototype.writeUIntLE =
          function (t, e, r, i) {
            if (((t = +t), (e >>>= 0), (r >>>= 0), !i)) {
              let i = Math.pow(2, 8 * r) - 1;
              E(this, t, e, r, i, 0);
            }
            let n = 1,
              o = 0;
            for (this[e] = 255 & t; ++o < r && (n *= 256); )
              this[e + o] = (t / n) & 255;
            return e + r;
          }),
        (a.prototype.writeUintBE = a.prototype.writeUIntBE =
          function (t, e, r, i) {
            if (((t = +t), (e >>>= 0), (r >>>= 0), !i)) {
              let i = Math.pow(2, 8 * r) - 1;
              E(this, t, e, r, i, 0);
            }
            let n = r - 1,
              o = 1;
            for (this[e + n] = 255 & t; --n >= 0 && (o *= 256); )
              this[e + n] = (t / o) & 255;
            return e + r;
          }),
        (a.prototype.writeUint8 = a.prototype.writeUInt8 =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 1, 255, 0),
              (this[e] = 255 & t),
              e + 1
            );
          }),
        (a.prototype.writeUint16LE = a.prototype.writeUInt16LE =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 2, 65535, 0),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              e + 2
            );
          }),
        (a.prototype.writeUint16BE = a.prototype.writeUInt16BE =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 2, 65535, 0),
              (this[e] = t >>> 8),
              (this[e + 1] = 255 & t),
              e + 2
            );
          }),
        (a.prototype.writeUint32LE = a.prototype.writeUInt32LE =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 4, 0xffffffff, 0),
              (this[e + 3] = t >>> 24),
              (this[e + 2] = t >>> 16),
              (this[e + 1] = t >>> 8),
              (this[e] = 255 & t),
              e + 4
            );
          }),
        (a.prototype.writeUint32BE = a.prototype.writeUInt32BE =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 4, 0xffffffff, 0),
              (this[e] = t >>> 24),
              (this[e + 1] = t >>> 16),
              (this[e + 2] = t >>> 8),
              (this[e + 3] = 255 & t),
              e + 4
            );
          }),
        (a.prototype.writeBigUInt64LE = z(function (t, e = 0) {
          return x(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
        })),
        (a.prototype.writeBigUInt64BE = z(function (t, e = 0) {
          return A(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
        })),
        (a.prototype.writeIntLE = function (t, e, r, i) {
          if (((t = +t), (e >>>= 0), !i)) {
            let i = Math.pow(2, 8 * r - 1);
            E(this, t, e, r, i - 1, -i);
          }
          let n = 0,
            o = 1,
            s = 0;
          for (this[e] = 255 & t; ++n < r && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[e + n - 1] && (s = 1),
              (this[e + n] = (((t / o) >> 0) - s) & 255);
          return e + r;
        }),
        (a.prototype.writeIntBE = function (t, e, r, i) {
          if (((t = +t), (e >>>= 0), !i)) {
            let i = Math.pow(2, 8 * r - 1);
            E(this, t, e, r, i - 1, -i);
          }
          let n = r - 1,
            o = 1,
            s = 0;
          for (this[e + n] = 255 & t; --n >= 0 && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[e + n + 1] && (s = 1),
              (this[e + n] = (((t / o) >> 0) - s) & 255);
          return e + r;
        }),
        (a.prototype.writeInt8 = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 1, 127, -128),
            t < 0 && (t = 255 + t + 1),
            (this[e] = 255 & t),
            e + 1
          );
        }),
        (a.prototype.writeInt16LE = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 2, 32767, -32768),
            (this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            e + 2
          );
        }),
        (a.prototype.writeInt16BE = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 2, 32767, -32768),
            (this[e] = t >>> 8),
            (this[e + 1] = 255 & t),
            e + 2
          );
        }),
        (a.prototype.writeInt32LE = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 4, 0x7fffffff, -0x80000000),
            (this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            (this[e + 2] = t >>> 16),
            (this[e + 3] = t >>> 24),
            e + 4
          );
        }),
        (a.prototype.writeInt32BE = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 4, 0x7fffffff, -0x80000000),
            t < 0 && (t = 0xffffffff + t + 1),
            (this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t),
            e + 4
          );
        }),
        (a.prototype.writeBigInt64LE = z(function (t, e = 0) {
          return x(
            this,
            t,
            e,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          );
        })),
        (a.prototype.writeBigInt64BE = z(function (t, e = 0) {
          return A(
            this,
            t,
            e,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          );
        })),
        (a.prototype.writeFloatLE = function (t, e, r) {
          return M(this, t, e, !0, r);
        }),
        (a.prototype.writeFloatBE = function (t, e, r) {
          return M(this, t, e, !1, r);
        }),
        (a.prototype.writeDoubleLE = function (t, e, r) {
          return O(this, t, e, !0, r);
        }),
        (a.prototype.writeDoubleBE = function (t, e, r) {
          return O(this, t, e, !1, r);
        }),
        (a.prototype.copy = function (t, e, r, i) {
          if (!a.isBuffer(t)) throw TypeError("argument should be a Buffer");
          if (
            (r || (r = 0),
            i || 0 === i || (i = this.length),
            e >= t.length && (e = t.length),
            e || (e = 0),
            i > 0 && i < r && (i = r),
            i === r || 0 === t.length || 0 === this.length)
          )
            return 0;
          if (e < 0) throw RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length) throw RangeError("Index out of range");
          if (i < 0) throw RangeError("sourceEnd out of bounds");
          i > this.length && (i = this.length),
            t.length - e < i - r && (i = t.length - e + r);
          let n = i - r;
          return (
            this === t && "function" == typeof Uint8Array.prototype.copyWithin
              ? this.copyWithin(e, r, i)
              : Uint8Array.prototype.set.call(t, this.subarray(r, i), e),
            n
          );
        }),
        (a.prototype.fill = function (t, e, r, i) {
          let n;
          if ("string" == typeof t) {
            if (
              ("string" == typeof e
                ? ((i = e), (e = 0), (r = this.length))
                : "string" == typeof r && ((i = r), (r = this.length)),
              void 0 !== i && "string" != typeof i)
            )
              throw TypeError("encoding must be a string");
            if ("string" == typeof i && !a.isEncoding(i))
              throw TypeError("Unknown encoding: " + i);
            if (1 === t.length) {
              let e = t.charCodeAt(0);
              (("utf8" === i && e < 128) || "latin1" === i) && (t = e);
            }
          } else
            "number" == typeof t
              ? (t &= 255)
              : "boolean" == typeof t && (t = Number(t));
          if (e < 0 || this.length < e || this.length < r)
            throw RangeError("Out of range index");
          if (r <= e) return this;
          if (
            ((e >>>= 0),
            (r = void 0 === r ? this.length : r >>> 0),
            t || (t = 0),
            "number" == typeof t)
          )
            for (n = e; n < r; ++n) this[n] = t;
          else {
            let o = a.isBuffer(t) ? t : a.from(t, i),
              s = o.length;
            if (0 === s)
              throw TypeError(
                'The value "' + t + '" is invalid for argument "value"'
              );
            for (n = 0; n < r - e; ++n) this[n + e] = o[n % s];
          }
          return this;
        });
      let B = {};
      function I(t, e, r) {
        B[t] = class extends r {
          constructor() {
            super(),
              Object.defineProperty(this, "message", {
                value: e.apply(this, arguments),
                writable: !0,
                configurable: !0,
              }),
              (this.name = `${this.name} [${t}]`),
              this.stack,
              delete this.name;
          }
          get code() {
            return t;
          }
          set code(t) {
            Object.defineProperty(this, "code", {
              configurable: !0,
              enumerable: !0,
              value: t,
              writable: !0,
            });
          }
          toString() {
            return `${this.name} [${t}]: ${this.message}`;
          }
        };
      }
      function T(t) {
        let e = "",
          r = t.length,
          i = "-" === t[0] ? 1 : 0;
        for (; r >= i + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
        return `${t.slice(0, r)}${e}`;
      }
      function N(t, e, r, i, n, o) {
        if (t > r || t < e) {
          let i;
          let n = "bigint" == typeof e ? "n" : "";
          throw (
            ((i =
              o > 3
                ? 0 === e || e === BigInt(0)
                  ? `>= 0${n} and < 2${n} ** ${(o + 1) * 8}${n}`
                  : `>= -(2${n} ** ${(o + 1) * 8 - 1}${n}) and < 2 ** ${
                      (o + 1) * 8 - 1
                    }${n}`
                : `>= ${e}${n} and <= ${r}${n}`),
            new B.ERR_OUT_OF_RANGE("value", i, t))
          );
        }
        R(n, "offset"),
          (void 0 === i[n] || void 0 === i[n + o]) && S(n, i.length - (o + 1));
      }
      function R(t, e) {
        if ("number" != typeof t)
          throw new B.ERR_INVALID_ARG_TYPE(e, "number", t);
      }
      function S(t, e, r) {
        if (Math.floor(t) !== t)
          throw (
            (R(t, r), new B.ERR_OUT_OF_RANGE(r || "offset", "an integer", t))
          );
        if (e < 0) throw new B.ERR_BUFFER_OUT_OF_BOUNDS();
        throw new B.ERR_OUT_OF_RANGE(
          r || "offset",
          `>= ${r ? 1 : 0} and <= ${e}`,
          t
        );
      }
      I(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function (t) {
          return t
            ? `${t} is outside of buffer bounds`
            : "Attempt to access memory outside buffer bounds";
        },
        RangeError
      ),
        I(
          "ERR_INVALID_ARG_TYPE",
          function (t, e) {
            return `The "${t}" argument must be of type number. Received type ${typeof e}`;
          },
          TypeError
        ),
        I(
          "ERR_OUT_OF_RANGE",
          function (t, e, r) {
            let i = `The value of "${t}" is out of range.`,
              n = r;
            return (
              Number.isInteger(r) && Math.abs(r) > 0x100000000
                ? (n = T(String(r)))
                : "bigint" == typeof r &&
                  ((n = String(r)),
                  (r > BigInt(2) ** BigInt(32) ||
                    r < -(BigInt(2) ** BigInt(32))) &&
                    (n = T(n)),
                  (n += "n")),
              (i += ` It must be ${e}. Received ${n}`)
            );
          },
          RangeError
        );
      let L = /[^+/0-9A-Za-z-_]/g;
      function U(t, e) {
        let r;
        e = e || 1 / 0;
        let i = t.length,
          n = null,
          o = [];
        for (let s = 0; s < i; ++s) {
          if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
            if (!n) {
              if (r > 56319 || s + 1 === i) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              n = r;
              continue;
            }
            if (r < 56320) {
              (e -= 3) > -1 && o.push(239, 191, 189), (n = r);
              continue;
            }
            r = (((n - 55296) << 10) | (r - 56320)) + 65536;
          } else n && (e -= 3) > -1 && o.push(239, 191, 189);
          if (((n = null), r < 128)) {
            if ((e -= 1) < 0) break;
            o.push(r);
          } else if (r < 2048) {
            if ((e -= 2) < 0) break;
            o.push((r >> 6) | 192, (63 & r) | 128);
          } else if (r < 65536) {
            if ((e -= 3) < 0) break;
            o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
          } else if (r < 1114112) {
            if ((e -= 4) < 0) break;
            o.push(
              (r >> 18) | 240,
              ((r >> 12) & 63) | 128,
              ((r >> 6) & 63) | 128,
              (63 & r) | 128
            );
          } else throw Error("Invalid code point");
        }
        return o;
      }
      function P(t) {
        return i.toByteArray(
          (function (t) {
            if ((t = (t = t.split("=")[0]).trim().replace(L, "")).length < 2)
              return "";
            for (; t.length % 4 != 0; ) t += "=";
            return t;
          })(t)
        );
      }
      function C(t, e, r, i) {
        let n;
        for (n = 0; n < i && !(n + r >= e.length) && !(n >= t.length); ++n)
          e[n + r] = t[n];
        return n;
      }
      function k(t, e) {
        return (
          t instanceof e ||
          (null != t &&
            null != t.constructor &&
            null != t.constructor.name &&
            t.constructor.name === e.name)
        );
      }
      let D = (function () {
        let t = "0123456789abcdef",
          e = Array(256);
        for (let r = 0; r < 16; ++r) {
          let i = 16 * r;
          for (let n = 0; n < 16; ++n) e[i + n] = t[r] + t[n];
        }
        return e;
      })();
      function z(t) {
        return "undefined" == typeof BigInt ? H : t;
      }
      function H() {
        throw Error("BigInt not supported");
      }
    },
    228: (t) => {
      "use strict";
      var e = Object.prototype.hasOwnProperty,
        r = "~";
      function i() {}
      function n(t, e, r) {
        (this.fn = t), (this.context = e), (this.once = r || !1);
      }
      function o(t, e, i, o, s) {
        if ("function" != typeof i)
          throw TypeError("The listener must be a function");
        var a = new n(i, o || t, s),
          f = r ? r + e : e;
        return (
          t._events[f]
            ? t._events[f].fn
              ? (t._events[f] = [t._events[f], a])
              : t._events[f].push(a)
            : ((t._events[f] = a), t._eventsCount++),
          t
        );
      }
      function s(t, e) {
        0 == --t._eventsCount ? (t._events = new i()) : delete t._events[e];
      }
      function a() {
        (this._events = new i()), (this._eventsCount = 0);
      }
      Object.create &&
        ((i.prototype = Object.create(null)), new i().__proto__ || (r = !1)),
        (a.prototype.eventNames = function () {
          var t,
            i,
            n = [];
          if (0 === this._eventsCount) return n;
          for (i in (t = this._events))
            e.call(t, i) && n.push(r ? i.slice(1) : i);
          return Object.getOwnPropertySymbols
            ? n.concat(Object.getOwnPropertySymbols(t))
            : n;
        }),
        (a.prototype.listeners = function (t) {
          var e = r ? r + t : t,
            i = this._events[e];
          if (!i) return [];
          if (i.fn) return [i.fn];
          for (var n = 0, o = i.length, s = Array(o); n < o; n++)
            s[n] = i[n].fn;
          return s;
        }),
        (a.prototype.listenerCount = function (t) {
          var e = r ? r + t : t,
            i = this._events[e];
          return i ? (i.fn ? 1 : i.length) : 0;
        }),
        (a.prototype.emit = function (t, e, i, n, o, s) {
          var a = r ? r + t : t;
          if (!this._events[a]) return !1;
          var f,
            h,
            u = this._events[a],
            l = arguments.length;
          if (u.fn) {
            switch ((u.once && this.removeListener(t, u.fn, void 0, !0), l)) {
              case 1:
                return u.fn.call(u.context), !0;
              case 2:
                return u.fn.call(u.context, e), !0;
              case 3:
                return u.fn.call(u.context, e, i), !0;
              case 4:
                return u.fn.call(u.context, e, i, n), !0;
              case 5:
                return u.fn.call(u.context, e, i, n, o), !0;
              case 6:
                return u.fn.call(u.context, e, i, n, o, s), !0;
            }
            for (h = 1, f = Array(l - 1); h < l; h++) f[h - 1] = arguments[h];
            u.fn.apply(u.context, f);
          } else {
            var c,
              d = u.length;
            for (h = 0; h < d; h++)
              switch (
                (u[h].once && this.removeListener(t, u[h].fn, void 0, !0), l)
              ) {
                case 1:
                  u[h].fn.call(u[h].context);
                  break;
                case 2:
                  u[h].fn.call(u[h].context, e);
                  break;
                case 3:
                  u[h].fn.call(u[h].context, e, i);
                  break;
                case 4:
                  u[h].fn.call(u[h].context, e, i, n);
                  break;
                default:
                  if (!f)
                    for (c = 1, f = Array(l - 1); c < l; c++)
                      f[c - 1] = arguments[c];
                  u[h].fn.apply(u[h].context, f);
              }
          }
          return !0;
        }),
        (a.prototype.on = function (t, e, r) {
          return o(this, t, e, r, !1);
        }),
        (a.prototype.once = function (t, e, r) {
          return o(this, t, e, r, !0);
        }),
        (a.prototype.removeListener = function (t, e, i, n) {
          var o = r ? r + t : t;
          if (!this._events[o]) return this;
          if (!e) return s(this, o), this;
          var a = this._events[o];
          if (a.fn)
            a.fn !== e ||
              (n && !a.once) ||
              (i && a.context !== i) ||
              s(this, o);
          else {
            for (var f = 0, h = [], u = a.length; f < u; f++)
              (a[f].fn !== e ||
                (n && !a[f].once) ||
                (i && a[f].context !== i)) &&
                h.push(a[f]);
            h.length
              ? (this._events[o] = 1 === h.length ? h[0] : h)
              : s(this, o);
          }
          return this;
        }),
        (a.prototype.removeAllListeners = function (t) {
          var e;
          return (
            t
              ? ((e = r ? r + t : t), this._events[e] && s(this, e))
              : ((this._events = new i()), (this._eventsCount = 0)),
            this
          );
        }),
        (a.prototype.off = a.prototype.removeListener),
        (a.prototype.addListener = a.prototype.on),
        (a.prefixed = r),
        (a.EventEmitter = a),
        (t.exports = a);
    },
    251: (t, e) => {
      (e.read = function (t, e, r, i, n) {
        var o,
          s,
          a = 8 * n - i - 1,
          f = (1 << a) - 1,
          h = f >> 1,
          u = -7,
          l = r ? n - 1 : 0,
          c = r ? -1 : 1,
          d = t[e + l];
        for (
          l += c, o = d & ((1 << -u) - 1), d >>= -u, u += a;
          u > 0;
          o = 256 * o + t[e + l], l += c, u -= 8
        );
        for (
          s = o & ((1 << -u) - 1), o >>= -u, u += i;
          u > 0;
          s = 256 * s + t[e + l], l += c, u -= 8
        );
        if (0 === o) o = 1 - h;
        else {
          if (o === f) return s ? NaN : (1 / 0) * (d ? -1 : 1);
          (s += Math.pow(2, i)), (o -= h);
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - i);
      }),
        (e.write = function (t, e, r, i, n, o) {
          var s,
            a,
            f,
            h = 8 * o - n - 1,
            u = (1 << h) - 1,
            l = u >> 1,
            c = 23 === n ? 5960464477539062e-23 : 0,
            d = i ? 0 : o - 1,
            p = i ? 1 : -1,
            m = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
          for (
            isNaN((e = Math.abs(e))) || e === 1 / 0
              ? ((a = isNaN(e) ? 1 : 0), (s = u))
              : ((s = Math.floor(Math.log(e) / Math.LN2)),
                e * (f = Math.pow(2, -s)) < 1 && (s--, (f *= 2)),
                s + l >= 1 ? (e += c / f) : (e += c * Math.pow(2, 1 - l)),
                e * f >= 2 && (s++, (f /= 2)),
                s + l >= u
                  ? ((a = 0), (s = u))
                  : s + l >= 1
                  ? ((a = (e * f - 1) * Math.pow(2, n)), (s += l))
                  : ((a = e * Math.pow(2, l - 1) * Math.pow(2, n)), (s = 0)));
            n >= 8;
            t[r + d] = 255 & a, d += p, a /= 256, n -= 8
          );
          for (
            s = (s << n) | a, h += n;
            h > 0;
            t[r + d] = 255 & s, d += p, s /= 256, h -= 8
          );
          t[r + d - p] |= 128 * m;
        });
    },
    22: (t, e, r) => {
      "use strict";
      let i = r(9860).v4,
        n = r(3289),
        o = function (t, e) {
          if (!(this instanceof o)) return new o(t, e);
          e || (e = {}),
            (this.options = {
              reviver: void 0 !== e.reviver ? e.reviver : null,
              replacer: void 0 !== e.replacer ? e.replacer : null,
              generator:
                void 0 !== e.generator
                  ? e.generator
                  : function () {
                      return i();
                    },
              version: void 0 !== e.version ? e.version : 2,
              notificationIdNull:
                "boolean" == typeof e.notificationIdNull &&
                e.notificationIdNull,
            }),
            (this.callServer = t);
        };
      (t.exports = o),
        (o.prototype.request = function (t, e, r, i) {
          let o;
          let s = this,
            a = null,
            f = Array.isArray(t) && "function" == typeof e;
          if (1 === this.options.version && f)
            throw TypeError("JSON-RPC 1.0 does not support batching");
          let h = !f && t && "object" == typeof t && "function" == typeof e;
          if (f || h) (i = e), (a = t);
          else {
            "function" == typeof r && ((i = r), (r = void 0));
            let o = "function" == typeof i;
            try {
              a = n(t, e, r, {
                generator: this.options.generator,
                version: this.options.version,
                notificationIdNull: this.options.notificationIdNull,
              });
            } catch (t) {
              if (o) return i(t);
              throw t;
            }
            if (!o) return a;
          }
          try {
            o = JSON.stringify(a, this.options.replacer);
          } catch (t) {
            return i(t);
          }
          return (
            this.callServer(o, function (t, e) {
              s._parseResponse(t, e, i);
            }),
            a
          );
        }),
        (o.prototype._parseResponse = function (t, e, r) {
          let i;
          if (t) {
            r(t);
            return;
          }
          if (!e) return r();
          try {
            i = JSON.parse(e, this.options.reviver);
          } catch (t) {
            return r(t);
          }
          if (3 === r.length) {
            if (!Array.isArray(i)) return r(null, i.error, i.result);
            {
              let t = function (t) {
                return void 0 !== t.error;
              };
              return r(
                null,
                i.filter(t),
                i.filter(function (e) {
                  return !t(e);
                })
              );
            }
          }
          r(null, i);
        });
    },
    3289: (t, e, r) => {
      "use strict";
      let i = r(9860).v4;
      t.exports = function (t, e, r, n) {
        if ("string" != typeof t) throw TypeError(t + " must be a string");
        let o = "number" == typeof (n = n || {}).version ? n.version : 2;
        if (1 !== o && 2 !== o) throw TypeError(o + " must be 1 or 2");
        let s = { method: t };
        if ((2 === o && (s.jsonrpc = "2.0"), e)) {
          if ("object" != typeof e && !Array.isArray(e))
            throw TypeError(e + " must be an object, array or omitted");
          s.params = e;
        }
        if (void 0 === r) {
          let t =
            "function" == typeof n.generator
              ? n.generator
              : function () {
                  return i();
                };
          s.id = t(s, n);
        } else
          2 === o && null === r
            ? n.notificationIdNull && (s.id = null)
            : (s.id = r);
        return s;
      };
    },
    6825: (t, e, r) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "AmpStateContext", {
          enumerable: !0,
          get: function () {
            return i;
          },
        });
      let i = r(7677)._(r(6540)).default.createContext({});
    },
    8721: (t, e) => {
      "use strict";
      function r(t) {
        let {
          ampFirst: e = !1,
          hybrid: r = !1,
          hasQuery: i = !1,
        } = void 0 === t ? {} : t;
        return e || (r && i);
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "isInAmpMode", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
    },
    6085: (t, e, r) => {
      "use strict";
      var i = r(5606);
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (function (t, e) {
          for (var r in e)
            Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
        })(e, {
          default: function () {
            return y;
          },
          defaultHead: function () {
            return c;
          },
        });
      let n = r(7677),
        o = r(544),
        s = r(4848),
        a = o._(r(6540)),
        f = n._(r(5076)),
        h = r(6825),
        u = r(1215),
        l = r(8721);
      function c(t) {
        void 0 === t && (t = !1);
        let e = [(0, s.jsx)("meta", { charSet: "utf-8" }, "charset")];
        return (
          t ||
            e.push(
              (0, s.jsx)(
                "meta",
                { name: "viewport", content: "width=device-width" },
                "viewport"
              )
            ),
          e
        );
      }
      function d(t, e) {
        return "string" == typeof e || "number" == typeof e
          ? t
          : e.type === a.default.Fragment
          ? t.concat(
              a.default.Children.toArray(e.props.children).reduce(
                (t, e) =>
                  "string" == typeof e || "number" == typeof e
                    ? t
                    : t.concat(e),
                []
              )
            )
          : t.concat(e);
      }
      r(7679);
      let p = ["name", "httpEquiv", "charSet", "itemProp"];
      function m(t, e) {
        let { inAmpMode: r } = e;
        return t
          .reduce(d, [])
          .reverse()
          .concat(c(r).reverse())
          .filter(
            (function () {
              let t = new Set(),
                e = new Set(),
                r = new Set(),
                i = {};
              return (n) => {
                let o = !0,
                  s = !1;
                if (
                  n.key &&
                  "number" != typeof n.key &&
                  n.key.indexOf("$") > 0
                ) {
                  s = !0;
                  let e = n.key.slice(n.key.indexOf("$") + 1);
                  t.has(e) ? (o = !1) : t.add(e);
                }
                switch (n.type) {
                  case "title":
                  case "base":
                    e.has(n.type) ? (o = !1) : e.add(n.type);
                    break;
                  case "meta":
                    for (let t = 0, e = p.length; t < e; t++) {
                      let e = p[t];
                      if (n.props.hasOwnProperty(e)) {
                        if ("charSet" === e) r.has(e) ? (o = !1) : r.add(e);
                        else {
                          let t = n.props[e],
                            r = i[e] || new Set();
                          ("name" !== e || !s) && r.has(t)
                            ? (o = !1)
                            : (r.add(t), (i[e] = r));
                        }
                      }
                    }
                }
                return o;
              };
            })()
          )
          .reverse()
          .map((t, e) => {
            let n = t.key || e;
            if (
              i.env.__NEXT_OPTIMIZE_FONTS &&
              !r &&
              "link" === t.type &&
              t.props.href &&
              [
                "https://fonts.googleapis.com/css",
                "https://use.typekit.net/",
              ].some((e) => t.props.href.startsWith(e))
            ) {
              let e = { ...(t.props || {}) };
              return (
                (e["data-href"] = e.href),
                (e.href = void 0),
                (e["data-optimized-fonts"] = !0),
                a.default.cloneElement(t, e)
              );
            }
            return a.default.cloneElement(t, { key: n });
          });
      }
      let y = function (t) {
        let { children: e } = t,
          r = (0, a.useContext)(h.AmpStateContext),
          i = (0, a.useContext)(u.HeadManagerContext);
        return (0, s.jsx)(f.default, {
          reduceComponentsToState: m,
          headManager: i,
          inAmpMode: (0, l.isInAmpMode)(r),
          children: e,
        });
      };
      ("function" == typeof e.default ||
        ("object" == typeof e.default && null !== e.default)) &&
        void 0 === e.default.__esModule &&
        (Object.defineProperty(e.default, "__esModule", { value: !0 }),
        Object.assign(e.default, e),
        (t.exports = e.default));
    },
    5076: (t, e, r) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "default", {
          enumerable: !0,
          get: function () {
            return s;
          },
        });
      let i = r(6540),
        n = i.useLayoutEffect,
        o = i.useEffect;
      function s(t) {
        let { headManager: e, reduceComponentsToState: r } = t;
        function s() {
          if (e && e.mountedInstances) {
            let n = i.Children.toArray(
              Array.from(e.mountedInstances).filter(Boolean)
            );
            e.updateHead(r(n, t));
          }
        }
        return (
          n(() => {
            var r;
            return (
              null == e ||
                null == (r = e.mountedInstances) ||
                r.add(t.children),
              () => {
                var r;
                null == e ||
                  null == (r = e.mountedInstances) ||
                  r.delete(t.children);
              }
            );
          }),
          n(
            () => (
              e && (e._pendingUpdate = s),
              () => {
                e && (e._pendingUpdate = s);
              }
            )
          ),
          o(
            () => (
              e &&
                e._pendingUpdate &&
                (e._pendingUpdate(), (e._pendingUpdate = null)),
              () => {
                e &&
                  e._pendingUpdate &&
                  (e._pendingUpdate(), (e._pendingUpdate = null));
              }
            )
          ),
          null
        );
      }
    },
    7679: (t, e) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "warnOnce", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      let r = (t) => {};
    },
    3368: (t, e, r) => {
      t.exports = r(6085);
    },
    8133: (t, e, r) => {
      t.exports = r(7610);
    },
    5606: (t) => {
      var e,
        r,
        i,
        n = (t.exports = {});
      function o() {
        throw Error("setTimeout has not been defined");
      }
      function s() {
        throw Error("clearTimeout has not been defined");
      }
      function a(t) {
        if (e === setTimeout) return setTimeout(t, 0);
        if ((e === o || !e) && setTimeout)
          return (e = setTimeout), setTimeout(t, 0);
        try {
          return e(t, 0);
        } catch (r) {
          try {
            return e.call(null, t, 0);
          } catch (r) {
            return e.call(this, t, 0);
          }
        }
      }
      !(function () {
        try {
          e = "function" == typeof setTimeout ? setTimeout : o;
        } catch (t) {
          e = o;
        }
        try {
          r = "function" == typeof clearTimeout ? clearTimeout : s;
        } catch (t) {
          r = s;
        }
      })();
      var f = [],
        h = !1,
        u = -1;
      function l() {
        h &&
          i &&
          ((h = !1), i.length ? (f = i.concat(f)) : (u = -1), f.length && c());
      }
      function c() {
        if (!h) {
          var t = a(l);
          h = !0;
          for (var e = f.length; e; ) {
            for (i = f, f = []; ++u < e; ) i && i[u].run();
            (u = -1), (e = f.length);
          }
          (i = null),
            (h = !1),
            (function (t) {
              if (r === clearTimeout) return clearTimeout(t);
              if ((r === s || !r) && clearTimeout)
                return (r = clearTimeout), clearTimeout(t);
              try {
                r(t);
              } catch (e) {
                try {
                  return r.call(null, t);
                } catch (e) {
                  return r.call(this, t);
                }
              }
            })(t);
        }
      }
      function d(t, e) {
        (this.fun = t), (this.array = e);
      }
      function p() {}
      (n.nextTick = function (t) {
        var e = Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        f.push(new d(t, e)), 1 !== f.length || h || a(c);
      }),
        (d.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (n.title = "browser"),
        (n.browser = !0),
        (n.env = {}),
        (n.argv = []),
        (n.version = ""),
        (n.versions = {}),
        (n.on = p),
        (n.addListener = p),
        (n.once = p),
        (n.off = p),
        (n.removeListener = p),
        (n.removeAllListeners = p),
        (n.emit = p),
        (n.prependListener = p),
        (n.prependOnceListener = p),
        (n.listeners = function (t) {
          return [];
        }),
        (n.binding = function (t) {
          throw Error("process.binding is not supported");
        }),
        (n.cwd = function () {
          return "/";
        }),
        (n.chdir = function (t) {
          throw Error("process.chdir is not supported");
        }),
        (n.umask = function () {
          return 0;
        });
    },
    2861: (t, e, r) => {
      var i = r(8287),
        n = i.Buffer;
      function o(t, e) {
        for (var r in t) e[r] = t[r];
      }
      function s(t, e, r) {
        return n(t, e, r);
      }
      n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow
        ? (t.exports = i)
        : (o(i, e), (e.Buffer = s)),
        (s.prototype = Object.create(n.prototype)),
        o(n, s),
        (s.from = function (t, e, r) {
          if ("number" == typeof t)
            throw TypeError("Argument must not be a number");
          return n(t, e, r);
        }),
        (s.alloc = function (t, e, r) {
          if ("number" != typeof t)
            throw TypeError("Argument must be a number");
          var i = n(t);
          return (
            void 0 !== e
              ? "string" == typeof r
                ? i.fill(e, r)
                : i.fill(e)
              : i.fill(0),
            i
          );
        }),
        (s.allocUnsafe = function (t) {
          if ("number" != typeof t)
            throw TypeError("Argument must be a number");
          return n(t);
        }),
        (s.allocUnsafeSlow = function (t) {
          if ("number" != typeof t)
            throw TypeError("Argument must be a number");
          return i.SlowBuffer(t);
        });
    },
    4281: (t, e) => {
      "use strict";
      function r(t, e, r) {
        return e <= t && t <= r;
      }
      function i(t) {
        if (void 0 === t) return {};
        if (t === Object(t)) return t;
        throw TypeError("Could not convert argument to dictionary");
      }
      function n(t) {
        this.tokens = [].slice.call(t);
      }
      function o(t, e) {
        if (t) throw TypeError("Decoder error");
        return e || 65533;
      }
      n.prototype = {
        endOfStream: function () {
          return !this.tokens.length;
        },
        read: function () {
          return this.tokens.length ? this.tokens.shift() : -1;
        },
        prepend: function (t) {
          if (Array.isArray(t)) for (; t.length; ) this.tokens.unshift(t.pop());
          else this.tokens.unshift(t);
        },
        push: function (t) {
          if (Array.isArray(t)) for (; t.length; ) this.tokens.push(t.shift());
          else this.tokens.push(t);
        },
      };
      var s = "utf-8";
      function a(t, e) {
        if (!(this instanceof a)) return new a(t, e);
        if ((t = void 0 !== t ? String(t).toLowerCase() : s) !== s)
          throw Error("Encoding not supported. Only utf-8 is supported");
        (e = i(e)),
          (this._streaming = !1),
          (this._BOMseen = !1),
          (this._decoder = null),
          (this._fatal = !!e.fatal),
          (this._ignoreBOM = !!e.ignoreBOM),
          Object.defineProperty(this, "encoding", { value: "utf-8" }),
          Object.defineProperty(this, "fatal", { value: this._fatal }),
          Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
      }
      function f(t, e) {
        if (!(this instanceof f)) return new f(t, e);
        if ((t = void 0 !== t ? String(t).toLowerCase() : s) !== s)
          throw Error("Encoding not supported. Only utf-8 is supported");
        (e = i(e)),
          (this._streaming = !1),
          (this._encoder = null),
          (this._options = { fatal: !!e.fatal }),
          Object.defineProperty(this, "encoding", { value: "utf-8" });
      }
      function h(t) {
        var e = t.fatal,
          i = 0,
          n = 0,
          s = 0,
          a = 128,
          f = 191;
        this.handler = function (t, h) {
          if (-1 === h && 0 !== s) return (s = 0), o(e);
          if (-1 === h) return -1;
          if (0 === s) {
            if (r(h, 0, 127)) return h;
            if (r(h, 194, 223)) (s = 1), (i = h - 192);
            else if (r(h, 224, 239))
              224 === h && (a = 160),
                237 === h && (f = 159),
                (s = 2),
                (i = h - 224);
            else {
              if (!r(h, 240, 244)) return o(e);
              240 === h && (a = 144),
                244 === h && (f = 143),
                (s = 3),
                (i = h - 240);
            }
            return (i <<= 6 * s), null;
          }
          if (!r(h, a, f))
            return (i = s = n = 0), (a = 128), (f = 191), t.prepend(h), o(e);
          if (
            ((a = 128),
            (f = 191),
            (n += 1),
            (i += (h - 128) << (6 * (s - n))),
            n !== s)
          )
            return null;
          var u = i;
          return (i = s = n = 0), u;
        };
      }
      function u(t) {
        t.fatal,
          (this.handler = function (t, e) {
            if (-1 === e) return -1;
            if (r(e, 0, 127)) return e;
            r(e, 128, 2047)
              ? ((i = 1), (n = 192))
              : r(e, 2048, 65535)
              ? ((i = 2), (n = 224))
              : r(e, 65536, 1114111) && ((i = 3), (n = 240));
            for (var i, n, o = [(e >> (6 * i)) + n]; i > 0; ) {
              var s = e >> (6 * (i - 1));
              o.push(128 | (63 & s)), (i -= 1);
            }
            return o;
          });
      }
      (a.prototype = {
        decode: function (t, e) {
          (r =
            "object" == typeof t && t instanceof ArrayBuffer
              ? new Uint8Array(t)
              : "object" == typeof t &&
                "buffer" in t &&
                t.buffer instanceof ArrayBuffer
              ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
              : new Uint8Array(0)),
            (e = i(e)),
            this._streaming ||
              ((this._decoder = new h({ fatal: this._fatal })),
              (this._BOMseen = !1)),
            (this._streaming = !!e.stream);
          for (
            var r, o, s = new n(r), a = [];
            !s.endOfStream() && -1 !== (o = this._decoder.handler(s, s.read()));

          )
            null !== o && (Array.isArray(o) ? a.push.apply(a, o) : a.push(o));
          if (!this._streaming) {
            do {
              if (-1 === (o = this._decoder.handler(s, s.read()))) break;
              if (null === o) continue;
              Array.isArray(o) ? a.push.apply(a, o) : a.push(o);
            } while (!s.endOfStream());
            this._decoder = null;
          }
          return (
            !a.length ||
              -1 === ["utf-8"].indexOf(this.encoding) ||
              this._ignoreBOM ||
              this._BOMseen ||
              (65279 === a[0]
                ? ((this._BOMseen = !0), a.shift())
                : (this._BOMseen = !0)),
            (function (t) {
              for (var e = "", r = 0; r < t.length; ++r) {
                var i = t[r];
                i <= 65535
                  ? (e += String.fromCharCode(i))
                  : ((i -= 65536),
                    (e += String.fromCharCode(
                      (i >> 10) + 55296,
                      (1023 & i) + 56320
                    )));
              }
              return e;
            })(a)
          );
        },
      }),
        (f.prototype = {
          encode: function (t, e) {
            (t = t ? String(t) : ""),
              (e = i(e)),
              this._streaming || (this._encoder = new u(this._options)),
              (this._streaming = !!e.stream);
            for (
              var r,
                o = [],
                s = new n(
                  (function (t) {
                    for (
                      var e = String(t), r = e.length, i = 0, n = [];
                      i < r;

                    ) {
                      var o = e.charCodeAt(i);
                      if (o < 55296 || o > 57343) n.push(o);
                      else if (56320 <= o && o <= 57343) n.push(65533);
                      else if (55296 <= o && o <= 56319) {
                        if (i === r - 1) n.push(65533);
                        else {
                          var s = t.charCodeAt(i + 1);
                          if (56320 <= s && s <= 57343) {
                            var a = 1023 & o,
                              f = 1023 & s;
                            n.push(65536 + (a << 10) + f), (i += 1);
                          } else n.push(65533);
                        }
                      }
                      i += 1;
                    }
                    return n;
                  })(t)
                );
              !s.endOfStream() &&
              -1 !== (r = this._encoder.handler(s, s.read()));

            )
              Array.isArray(r) ? o.push.apply(o, r) : o.push(r);
            if (!this._streaming) {
              for (; -1 !== (r = this._encoder.handler(s, s.read())); )
                Array.isArray(r) ? o.push.apply(o, r) : o.push(r);
              this._encoder = null;
            }
            return new Uint8Array(o);
          },
        }),
        (e.TextEncoder = f),
        (e.TextDecoder = a);
    },
    9860: (t, e, r) => {
      "use strict";
      r.d(e, { v4: () => h });
      var i,
        n = new Uint8Array(16);
      let o =
        /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      for (var s = [], a = 0; a < 256; ++a)
        s.push((a + 256).toString(16).substr(1));
      let f = function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            r = (
              s[t[e + 0]] +
              s[t[e + 1]] +
              s[t[e + 2]] +
              s[t[e + 3]] +
              "-" +
              s[t[e + 4]] +
              s[t[e + 5]] +
              "-" +
              s[t[e + 6]] +
              s[t[e + 7]] +
              "-" +
              s[t[e + 8]] +
              s[t[e + 9]] +
              "-" +
              s[t[e + 10]] +
              s[t[e + 11]] +
              s[t[e + 12]] +
              s[t[e + 13]] +
              s[t[e + 14]] +
              s[t[e + 15]]
            ).toLowerCase();
          if (!("string" == typeof r && o.test(r)))
            throw TypeError("Stringified UUID is invalid");
          return r;
        },
        h = function (t, e, r) {
          var o =
            (t = t || {}).random ||
            (
              t.rng ||
              function () {
                if (
                  !i &&
                  !(i =
                    ("undefined" != typeof crypto &&
                      crypto.getRandomValues &&
                      crypto.getRandomValues.bind(crypto)) ||
                    ("undefined" != typeof msCrypto &&
                      "function" == typeof msCrypto.getRandomValues &&
                      msCrypto.getRandomValues.bind(msCrypto)))
                )
                  throw Error(
                    "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
                  );
                return i(n);
              }
            )();
          if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), e)) {
            r = r || 0;
            for (var s = 0; s < 16; ++s) e[r + s] = o[s];
            return e;
          }
          return f(o);
        };
    },
    615: (t, e, r) => {
      "use strict";
      r.d(e, { Xf: () => p, hT: () => d, hp: () => m });
      var i = r(8030),
        n = r(8293);
      let o = BigInt(0),
        s = BigInt(1);
      function a(t, e) {
        let r = e.negate();
        return t ? r : e;
      }
      function f(t, e) {
        if (!Number.isSafeInteger(t) || t <= 0 || t > e)
          throw Error(
            "invalid window size, expected [1.." + e + "], got W=" + t
          );
      }
      function h(t, e) {
        return (
          f(t, e), { windows: Math.ceil(e / t) + 1, windowSize: 2 ** (t - 1) }
        );
      }
      let u = new WeakMap(),
        l = new WeakMap();
      function c(t) {
        return l.get(t) || 1;
      }
      function d(t, e) {
        return {
          constTimeNegate: a,
          hasPrecomputes: (t) => 1 !== c(t),
          unsafeLadder(e, r, i = t.ZERO) {
            let n = e;
            for (; r > o; )
              r & s && (i = i.add(n)), (n = n.double()), (r >>= s);
            return i;
          },
          precomputeWindow(t, r) {
            let { windows: i, windowSize: n } = h(r, e),
              o = [],
              s = t,
              a = s;
            for (let t = 0; t < i; t++) {
              (a = s), o.push(a);
              for (let t = 1; t < n; t++) (a = a.add(s)), o.push(a);
              s = a.double();
            }
            return o;
          },
          wNAF(r, i, n) {
            let { windows: o, windowSize: f } = h(r, e),
              u = t.ZERO,
              l = t.BASE,
              c = BigInt(2 ** r - 1),
              d = 2 ** r,
              p = BigInt(r);
            for (let t = 0; t < o; t++) {
              let e = t * f,
                r = Number(n & c);
              (n >>= p), r > f && ((r -= d), (n += s));
              let o = e + Math.abs(r) - 1,
                h = t % 2 != 0,
                m = r < 0;
              0 === r ? (l = l.add(a(h, i[e]))) : (u = u.add(a(m, i[o])));
            }
            return { p: u, f: l };
          },
          wNAFUnsafe(r, i, n, a = t.ZERO) {
            let { windows: f, windowSize: u } = h(r, e),
              l = BigInt(2 ** r - 1),
              c = 2 ** r,
              d = BigInt(r);
            for (let t = 0; t < f; t++) {
              let e = t * u;
              if (n === o) break;
              let r = Number(n & l);
              if (((n >>= d), r > u && ((r -= c), (n += s)), 0 === r)) continue;
              let f = i[e + Math.abs(r) - 1];
              r < 0 && (f = f.negate()), (a = a.add(f));
            }
            return a;
          },
          getPrecomputes(t, e, r) {
            let i = u.get(e);
            return (
              i ||
                ((i = this.precomputeWindow(e, t)), 1 !== t && u.set(e, r(i))),
              i
            );
          },
          wNAFCached(t, e, r) {
            let i = c(t);
            return this.wNAF(i, this.getPrecomputes(i, t, r), e);
          },
          wNAFCachedUnsafe(t, e, r, i) {
            let n = c(t);
            return 1 === n
              ? this.unsafeLadder(t, e, i)
              : this.wNAFUnsafe(n, this.getPrecomputes(n, t, r), e, i);
          },
          setWindowSize(t, r) {
            f(r, e), l.set(t, r), u.delete(t);
          },
        };
      }
      function p(t, e, r, i) {
        if (
          ((function (t, e) {
            if (!Array.isArray(t)) throw Error("array expected");
            t.forEach((t, r) => {
              if (!(t instanceof e)) throw Error("invalid point at index " + r);
            });
          })(r, t),
          (function (t, e) {
            if (!Array.isArray(t)) throw Error("array of scalars expected");
            t.forEach((t, r) => {
              if (!e.isValid(t)) throw Error("invalid scalar at index " + r);
            });
          })(i, e),
          r.length !== i.length)
        )
          throw Error("arrays of points and scalars must have equal length");
        let o = t.ZERO,
          s = (0, n.dJ)(BigInt(r.length)),
          a = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1,
          f = (1 << a) - 1,
          h = Array(f + 1).fill(o),
          u = Math.floor((e.BITS - 1) / a) * a,
          l = o;
        for (let t = u; t >= 0; t -= a) {
          h.fill(o);
          for (let e = 0; e < i.length; e++) {
            let n = Number((i[e] >> BigInt(t)) & BigInt(f));
            h[n] = h[n].add(r[e]);
          }
          let e = o;
          for (let t = h.length - 1, r = o; t > 0; t--)
            (r = r.add(h[t])), (e = e.add(r));
          if (((l = l.add(e)), 0 !== t))
            for (let t = 0; t < a; t++) l = l.double();
        }
        return l;
      }
      function m(t) {
        return (
          (0, i.jr)(t.Fp),
          (0, n.Q5)(
            t,
            { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
            { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }
          ),
          Object.freeze({
            ...(0, i.LH)(t.n, t.nBitLength),
            ...t,
            p: t.Fp.ORDER,
          })
        );
      }
    },
    8030: (t, e, r) => {
      "use strict";
      r.d(e, {
        B8: () => d,
        D0: () => w,
        LH: () => g,
        Tp: () => b,
        dQ: () => p,
        jr: () => y,
        qy: () => E,
        zH: () => c,
        zi: () => l,
      });
      var i = r(8293);
      let n = BigInt(0),
        o = BigInt(1),
        s = BigInt(2),
        a = BigInt(3),
        f = BigInt(4),
        h = BigInt(5),
        u = BigInt(8);
      function l(t, e) {
        let r = t % e;
        return r >= n ? r : e + r;
      }
      function c(t, e, r) {
        let i = t;
        for (; e-- > n; ) (i *= i), (i %= r);
        return i;
      }
      function d(t, e) {
        if (t === n) throw Error("invert: expected non-zero number");
        if (e <= n) throw Error("invert: expected positive modulus, got " + e);
        let r = l(t, e),
          i = e,
          s = n,
          a = o,
          f = o,
          h = n;
        for (; r !== n; ) {
          let t = i / r,
            e = i % r,
            n = s - f * t,
            o = a - h * t;
          (i = r), (r = e), (s = f), (a = h), (f = n), (h = o);
        }
        if (i !== o) throw Error("invert: does not exist");
        return l(s, e);
      }
      let p = (t, e) => (l(t, e) & o) === o,
        m = [
          "create",
          "isValid",
          "is0",
          "neg",
          "inv",
          "sqrt",
          "sqr",
          "eql",
          "add",
          "sub",
          "mul",
          "pow",
          "div",
          "addN",
          "subN",
          "mulN",
          "sqrN",
        ];
      function y(t) {
        let e = m.reduce((t, e) => ((t[e] = "function"), t), {
          ORDER: "bigint",
          MASK: "bigint",
          BYTES: "isSafeInteger",
          BITS: "isSafeInteger",
        });
        return (0, i.Q5)(t, e);
      }
      function g(t, e) {
        let r = void 0 !== e ? e : t.toString(2).length,
          i = Math.ceil(r / 8);
        return { nBitLength: r, nByteLength: i };
      }
      function w(t, e, r = !1, c = {}) {
        let p;
        if (t <= n) throw Error("invalid field: expected ORDER > 0, got " + t);
        let { nBitLength: m, nByteLength: y } = g(t, e);
        if (y > 2048)
          throw Error("invalid field: expected ORDER of <= 2048 bytes");
        let v = Object.freeze({
          ORDER: t,
          BITS: m,
          BYTES: y,
          MASK: (0, i.OG)(m),
          ZERO: n,
          ONE: o,
          create: (e) => l(e, t),
          isValid: (e) => {
            if ("bigint" != typeof e)
              throw Error(
                "invalid field element: expected bigint, got " + typeof e
              );
            return n <= e && e < t;
          },
          is0: (t) => t === n,
          isOdd: (t) => (t & o) === o,
          neg: (e) => l(-e, t),
          eql: (t, e) => t === e,
          sqr: (e) => l(e * e, t),
          add: (e, r) => l(e + r, t),
          sub: (e, r) => l(e - r, t),
          mul: (e, r) => l(e * r, t),
          pow: (t, e) =>
            (function (t, e, r) {
              if (r < n) throw Error("invalid exponent, negatives unsupported");
              if (r === n) return t.ONE;
              if (r === o) return e;
              let i = t.ONE,
                s = e;
              for (; r > n; )
                r & o && (i = t.mul(i, s)), (s = t.sqr(s)), (r >>= o);
              return i;
            })(v, t, e),
          div: (e, r) => l(e * d(r, t), t),
          sqrN: (t) => t * t,
          addN: (t, e) => t + e,
          subN: (t, e) => t - e,
          mulN: (t, e) => t * e,
          inv: (e) => d(e, t),
          sqrt:
            c.sqrt ||
            ((e) => (
              p ||
                (p = (function (t) {
                  if (t % f === a) {
                    let e = (t + o) / f;
                    return function (t, r) {
                      let i = t.pow(r, e);
                      if (!t.eql(t.sqr(i), r))
                        throw Error("Cannot find square root");
                      return i;
                    };
                  }
                  if (t % u === h) {
                    let e = (t - h) / u;
                    return function (t, r) {
                      let i = t.mul(r, s),
                        n = t.pow(i, e),
                        o = t.mul(r, n),
                        a = t.mul(t.mul(o, s), n),
                        f = t.mul(o, t.sub(a, t.ONE));
                      if (!t.eql(t.sqr(f), r))
                        throw Error("Cannot find square root");
                      return f;
                    };
                  }
                  return (function (t) {
                    let e, r, i;
                    let a = (t - o) / s;
                    for (e = t - o, r = 0; e % s === n; e /= s, r++);
                    for (
                      i = s;
                      i < t &&
                      (function (t, e, r) {
                        if (e < n)
                          throw Error(
                            "invalid exponent, negatives unsupported"
                          );
                        if (r <= n) throw Error("invalid modulus");
                        if (r === o) return n;
                        let i = o;
                        for (; e > n; )
                          e & o && (i = (i * t) % r),
                            (t = (t * t) % r),
                            (e >>= o);
                        return i;
                      })(i, a, t) !==
                        t - o;
                      i++
                    )
                      if (i > 1e3)
                        throw Error(
                          "Cannot find square root: likely non-prime P"
                        );
                    if (1 === r) {
                      let e = (t + o) / f;
                      return function (t, r) {
                        let i = t.pow(r, e);
                        if (!t.eql(t.sqr(i), r))
                          throw Error("Cannot find square root");
                        return i;
                      };
                    }
                    let h = (e + o) / s;
                    return function (t, n) {
                      if (t.pow(n, a) === t.neg(t.ONE))
                        throw Error("Cannot find square root");
                      let s = r,
                        f = t.pow(t.mul(t.ONE, i), e),
                        u = t.pow(n, h),
                        l = t.pow(n, e);
                      for (; !t.eql(l, t.ONE); ) {
                        if (t.eql(l, t.ZERO)) return t.ZERO;
                        let e = 1;
                        for (let r = t.sqr(l); e < s && !t.eql(r, t.ONE); e++)
                          r = t.sqr(r);
                        let r = t.pow(f, o << BigInt(s - e - 1));
                        (f = t.sqr(r)),
                          (u = t.mul(u, r)),
                          (l = t.mul(l, f)),
                          (s = e);
                      }
                      return u;
                    };
                  })(t);
                })(t)),
              p(v, e)
            )),
          invertBatch: (t) =>
            (function (t, e) {
              let r = Array(e.length),
                i = e.reduce(
                  (e, i, n) => (t.is0(i) ? e : ((r[n] = e), t.mul(e, i))),
                  t.ONE
                ),
                n = t.inv(i);
              return (
                e.reduceRight(
                  (e, i, n) =>
                    t.is0(i) ? e : ((r[n] = t.mul(e, r[n])), t.mul(e, i)),
                  n
                ),
                r
              );
            })(v, t),
          cmov: (t, e, r) => (r ? e : t),
          toBytes: (t) => (r ? (0, i.z)(t, y) : (0, i.lq)(t, y)),
          fromBytes: (t) => {
            if (t.length !== y)
              throw Error(
                "Field.fromBytes: expected " + y + " bytes, got " + t.length
              );
            return r ? (0, i.lX)(t) : (0, i.Ph)(t);
          },
        });
        return Object.freeze(v);
      }
      function v(t) {
        if ("bigint" != typeof t) throw Error("field order must be bigint");
        return Math.ceil(t.toString(2).length / 8);
      }
      function b(t) {
        let e = v(t);
        return e + Math.ceil(e / 2);
      }
      function E(t, e, r = !1) {
        let n = t.length,
          s = v(e),
          a = b(e);
        if (n < 16 || n < a || n > 1024)
          throw Error("expected " + a + "-1024 bytes of input, got " + n);
        let f = l(r ? (0, i.Ph)(t) : (0, i.lX)(t), e - o) + o;
        return r ? (0, i.z)(f, s) : (0, i.lq)(f, s);
      }
    },
    8293: (t, e, r) => {
      "use strict";
      r.d(e, {
        DO: () => a,
        Id: () => E,
        My: () => u,
        OG: () => O,
        Ph: () => y,
        Q5: () => R,
        aK: () => _,
        aT: () => m,
        aY: () => s,
        dJ: () => M,
        e8: () => f,
        fg: () => T,
        lX: () => g,
        lq: () => w,
        qj: () => b,
        r4: () => A,
        x: () => S,
        z: () => v,
        zW: () => l,
      });
      let i = BigInt(0),
        n = BigInt(1),
        o = BigInt(2);
      function s(t) {
        return (
          t instanceof Uint8Array ||
          (ArrayBuffer.isView(t) && "Uint8Array" === t.constructor.name)
        );
      }
      function a(t) {
        if (!s(t)) throw Error("Uint8Array expected");
      }
      function f(t, e) {
        if ("boolean" != typeof e)
          throw Error(t + " boolean expected, got " + e);
      }
      let h = Array.from({ length: 256 }, (t, e) =>
        e.toString(16).padStart(2, "0")
      );
      function u(t) {
        a(t);
        let e = "";
        for (let r = 0; r < t.length; r++) e += h[t[r]];
        return e;
      }
      function l(t) {
        let e = t.toString(16);
        return 1 & e.length ? "0" + e : e;
      }
      function c(t) {
        if ("string" != typeof t)
          throw Error("hex string expected, got " + typeof t);
        return "" === t ? i : BigInt("0x" + t);
      }
      let d = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function p(t) {
        return t >= d._0 && t <= d._9
          ? t - d._0
          : t >= d.A && t <= d.F
          ? t - (d.A - 10)
          : t >= d.a && t <= d.f
          ? t - (d.a - 10)
          : void 0;
      }
      function m(t) {
        if ("string" != typeof t)
          throw Error("hex string expected, got " + typeof t);
        let e = t.length,
          r = e / 2;
        if (e % 2)
          throw Error("hex string expected, got unpadded hex of length " + e);
        let i = new Uint8Array(r);
        for (let e = 0, n = 0; e < r; e++, n += 2) {
          let r = p(t.charCodeAt(n)),
            o = p(t.charCodeAt(n + 1));
          if (void 0 === r || void 0 === o)
            throw Error(
              'hex string expected, got non-hex character "' +
                (t[n] + t[n + 1]) +
                '" at index ' +
                n
            );
          i[e] = 16 * r + o;
        }
        return i;
      }
      function y(t) {
        return c(u(t));
      }
      function g(t) {
        return a(t), c(u(Uint8Array.from(t).reverse()));
      }
      function w(t, e) {
        return m(t.toString(16).padStart(2 * e, "0"));
      }
      function v(t, e) {
        return w(t, e).reverse();
      }
      function b(t, e, r) {
        let i;
        if ("string" == typeof e)
          try {
            i = m(e);
          } catch (e) {
            throw Error(t + " must be hex string or Uint8Array, cause: " + e);
          }
        else if (s(e)) i = Uint8Array.from(e);
        else throw Error(t + " must be hex string or Uint8Array");
        let n = i.length;
        if ("number" == typeof r && n !== r)
          throw Error(t + " of length " + r + " expected, got " + n);
        return i;
      }
      function E(...t) {
        let e = 0;
        for (let r = 0; r < t.length; r++) {
          let i = t[r];
          a(i), (e += i.length);
        }
        let r = new Uint8Array(e);
        for (let e = 0, i = 0; e < t.length; e++) {
          let n = t[e];
          r.set(n, i), (i += n.length);
        }
        return r;
      }
      let x = (t) => "bigint" == typeof t && i <= t;
      function A(t, e, r) {
        return x(t) && x(e) && x(r) && e <= t && t < r;
      }
      function _(t, e, r, i) {
        if (!A(e, r, i))
          throw Error(
            "expected valid " + t + ": " + r + " <= n < " + i + ", got " + e
          );
      }
      function M(t) {
        let e;
        for (e = 0; t > i; t >>= n, e += 1);
        return e;
      }
      let O = (t) => (o << BigInt(t - 1)) - n,
        B = (t) => new Uint8Array(t),
        I = (t) => Uint8Array.from(t);
      function T(t, e, r) {
        if ("number" != typeof t || t < 2)
          throw Error("hashLen must be a number");
        if ("number" != typeof e || e < 2)
          throw Error("qByteLen must be a number");
        if ("function" != typeof r) throw Error("hmacFn must be a function");
        let i = B(t),
          n = B(t),
          o = 0,
          s = () => {
            i.fill(1), n.fill(0), (o = 0);
          },
          a = (...t) => r(n, i, ...t),
          f = (t = B()) => {
            (n = a(I([0]), t)),
              (i = a()),
              0 !== t.length && ((n = a(I([1]), t)), (i = a()));
          },
          h = () => {
            if (o++ >= 1e3) throw Error("drbg: tried 1000 values");
            let t = 0,
              r = [];
            for (; t < e; ) {
              let e = (i = a()).slice();
              r.push(e), (t += i.length);
            }
            return E(...r);
          };
        return (t, e) => {
          let r;
          for (s(), f(t); !(r = e(h())); ) f();
          return s(), r;
        };
      }
      let N = {
        bigint: (t) => "bigint" == typeof t,
        function: (t) => "function" == typeof t,
        boolean: (t) => "boolean" == typeof t,
        string: (t) => "string" == typeof t,
        stringOrUint8Array: (t) => "string" == typeof t || s(t),
        isSafeInteger: (t) => Number.isSafeInteger(t),
        array: (t) => Array.isArray(t),
        field: (t, e) => e.Fp.isValid(t),
        hash: (t) =>
          "function" == typeof t && Number.isSafeInteger(t.outputLen),
      };
      function R(t, e, r = {}) {
        let i = (e, r, i) => {
          let n = N[r];
          if ("function" != typeof n) throw Error("invalid validator function");
          let o = t[e];
          if ((!i || void 0 !== o) && !n(o, t))
            throw Error(
              "param " + String(e) + " is invalid. Expected " + r + ", got " + o
            );
        };
        for (let [t, r] of Object.entries(e)) i(t, r, !1);
        for (let [t, e] of Object.entries(r)) i(t, e, !0);
        return t;
      }
      function S(t) {
        let e = new WeakMap();
        return (r, ...i) => {
          let n = e.get(r);
          if (void 0 !== n) return n;
          let o = t(r, ...i);
          return e.set(r, o), o;
        };
      }
    },
    5878: (t, e, r) => {
      "use strict";
      r.d(e, { ev: () => R });
      var i = r(690);
      let n = BigInt(0x100000000 - 1),
        o = BigInt(32),
        s = {
          split: function (t, e = !1) {
            let r = new Uint32Array(t.length),
              i = new Uint32Array(t.length);
            for (let s = 0; s < t.length; s++) {
              let { h: a, l: f } = (function (t, e = !1) {
                return e
                  ? { h: Number(t & n), l: Number((t >> o) & n) }
                  : { h: 0 | Number((t >> o) & n), l: 0 | Number(t & n) };
              })(t[s], e);
              [r[s], i[s]] = [a, f];
            }
            return [r, i];
          },
          shrSH: (t, e, r) => t >>> r,
          shrSL: (t, e, r) => (t << (32 - r)) | (e >>> r),
          rotrSH: (t, e, r) => (t >>> r) | (e << (32 - r)),
          rotrSL: (t, e, r) => (t << (32 - r)) | (e >>> r),
          rotrBH: (t, e, r) => (t << (64 - r)) | (e >>> (r - 32)),
          rotrBL: (t, e, r) => (t >>> (r - 32)) | (e << (64 - r)),
          add: function (t, e, r, i) {
            let n = (e >>> 0) + (i >>> 0);
            return { h: (t + r + ((n / 0x100000000) | 0)) | 0, l: 0 | n };
          },
          add3L: (t, e, r) => (t >>> 0) + (e >>> 0) + (r >>> 0),
          add3H: (t, e, r, i) => (e + r + i + ((t / 0x100000000) | 0)) | 0,
          add4L: (t, e, r, i) => (t >>> 0) + (e >>> 0) + (r >>> 0) + (i >>> 0),
          add4H: (t, e, r, i, n) =>
            (e + r + i + n + ((t / 0x100000000) | 0)) | 0,
          add5H: (t, e, r, i, n, o) =>
            (e + r + i + n + o + ((t / 0x100000000) | 0)) | 0,
          add5L: (t, e, r, i, n) =>
            (t >>> 0) + (e >>> 0) + (r >>> 0) + (i >>> 0) + (n >>> 0),
        };
      var a = r(1510);
      let [f, h] = s.split(
          [
            "0x428a2f98d728ae22",
            "0x7137449123ef65cd",
            "0xb5c0fbcfec4d3b2f",
            "0xe9b5dba58189dbbc",
            "0x3956c25bf348b538",
            "0x59f111f1b605d019",
            "0x923f82a4af194f9b",
            "0xab1c5ed5da6d8118",
            "0xd807aa98a3030242",
            "0x12835b0145706fbe",
            "0x243185be4ee4b28c",
            "0x550c7dc3d5ffb4e2",
            "0x72be5d74f27b896f",
            "0x80deb1fe3b1696b1",
            "0x9bdc06a725c71235",
            "0xc19bf174cf692694",
            "0xe49b69c19ef14ad2",
            "0xefbe4786384f25e3",
            "0x0fc19dc68b8cd5b5",
            "0x240ca1cc77ac9c65",
            "0x2de92c6f592b0275",
            "0x4a7484aa6ea6e483",
            "0x5cb0a9dcbd41fbd4",
            "0x76f988da831153b5",
            "0x983e5152ee66dfab",
            "0xa831c66d2db43210",
            "0xb00327c898fb213f",
            "0xbf597fc7beef0ee4",
            "0xc6e00bf33da88fc2",
            "0xd5a79147930aa725",
            "0x06ca6351e003826f",
            "0x142929670a0e6e70",
            "0x27b70a8546d22ffc",
            "0x2e1b21385c26c926",
            "0x4d2c6dfc5ac42aed",
            "0x53380d139d95b3df",
            "0x650a73548baf63de",
            "0x766a0abb3c77b2a8",
            "0x81c2c92e47edaee6",
            "0x92722c851482353b",
            "0xa2bfe8a14cf10364",
            "0xa81a664bbc423001",
            "0xc24b8b70d0f89791",
            "0xc76c51a30654be30",
            "0xd192e819d6ef5218",
            "0xd69906245565a910",
            "0xf40e35855771202a",
            "0x106aa07032bbd1b8",
            "0x19a4c116b8d2d0c8",
            "0x1e376c085141ab53",
            "0x2748774cdf8eeb99",
            "0x34b0bcb5e19b48a8",
            "0x391c0cb3c5c95a63",
            "0x4ed8aa4ae3418acb",
            "0x5b9cca4f7763e373",
            "0x682e6ff3d6b2b8a3",
            "0x748f82ee5defb2fc",
            "0x78a5636f43172f60",
            "0x84c87814a1f0ab72",
            "0x8cc702081a6439ec",
            "0x90befffa23631e28",
            "0xa4506cebde82bde9",
            "0xbef9a3f7b2c67915",
            "0xc67178f2e372532b",
            "0xca273eceea26619c",
            "0xd186b8c721c0c207",
            "0xeada7dd6cde0eb1e",
            "0xf57d4f7fee6ed178",
            "0x06f067aa72176fba",
            "0x0a637dc5a2c898a6",
            "0x113f9804bef90dae",
            "0x1b710b35131c471b",
            "0x28db77f523047d84",
            "0x32caab7b40c72493",
            "0x3c9ebe0a15c9bebc",
            "0x431d67c49c100d4c",
            "0x4cc5d4becb3e42b6",
            "0x597f299cfc657e2a",
            "0x5fcb6fab3ad6faec",
            "0x6c44198c4a475817",
          ].map((t) => BigInt(t))
        ),
        u = new Uint32Array(80),
        l = new Uint32Array(80);
      class c extends i.ol {
        constructor() {
          super(128, 64, 16, !1),
            (this.Ah = 0x6a09e667),
            (this.Al = -0xc4336f8),
            (this.Bh = -0x4498517b),
            (this.Bl = -0x7b3558c5),
            (this.Ch = 0x3c6ef372),
            (this.Cl = -0x16b07d5),
            (this.Dh = -0x5ab00ac6),
            (this.Dl = 0x5f1d36f1),
            (this.Eh = 0x510e527f),
            (this.El = -0x52197d2f),
            (this.Fh = -0x64fa9774),
            (this.Fl = 0x2b3e6c1f),
            (this.Gh = 0x1f83d9ab),
            (this.Gl = -0x4be4295),
            (this.Hh = 0x5be0cd19),
            (this.Hl = 0x137e2179);
        }
        get() {
          let {
            Ah: t,
            Al: e,
            Bh: r,
            Bl: i,
            Ch: n,
            Cl: o,
            Dh: s,
            Dl: a,
            Eh: f,
            El: h,
            Fh: u,
            Fl: l,
            Gh: c,
            Gl: d,
            Hh: p,
            Hl: m,
          } = this;
          return [t, e, r, i, n, o, s, a, f, h, u, l, c, d, p, m];
        }
        set(t, e, r, i, n, o, s, a, f, h, u, l, c, d, p, m) {
          (this.Ah = 0 | t),
            (this.Al = 0 | e),
            (this.Bh = 0 | r),
            (this.Bl = 0 | i),
            (this.Ch = 0 | n),
            (this.Cl = 0 | o),
            (this.Dh = 0 | s),
            (this.Dl = 0 | a),
            (this.Eh = 0 | f),
            (this.El = 0 | h),
            (this.Fh = 0 | u),
            (this.Fl = 0 | l),
            (this.Gh = 0 | c),
            (this.Gl = 0 | d),
            (this.Hh = 0 | p),
            (this.Hl = 0 | m);
        }
        process(t, e) {
          for (let r = 0; r < 16; r++, e += 4)
            (u[r] = t.getUint32(e)), (l[r] = t.getUint32((e += 4)));
          for (let t = 16; t < 80; t++) {
            let e = 0 | u[t - 15],
              r = 0 | l[t - 15],
              i = s.rotrSH(e, r, 1) ^ s.rotrSH(e, r, 8) ^ s.shrSH(e, r, 7),
              n = s.rotrSL(e, r, 1) ^ s.rotrSL(e, r, 8) ^ s.shrSL(e, r, 7),
              o = 0 | u[t - 2],
              a = 0 | l[t - 2],
              f = s.rotrSH(o, a, 19) ^ s.rotrBH(o, a, 61) ^ s.shrSH(o, a, 6),
              h = s.rotrSL(o, a, 19) ^ s.rotrBL(o, a, 61) ^ s.shrSL(o, a, 6),
              c = s.add4L(n, h, l[t - 7], l[t - 16]),
              d = s.add4H(c, i, f, u[t - 7], u[t - 16]);
            (u[t] = 0 | d), (l[t] = 0 | c);
          }
          let {
            Ah: r,
            Al: i,
            Bh: n,
            Bl: o,
            Ch: a,
            Cl: c,
            Dh: d,
            Dl: p,
            Eh: m,
            El: y,
            Fh: g,
            Fl: w,
            Gh: v,
            Gl: b,
            Hh: E,
            Hl: x,
          } = this;
          for (let t = 0; t < 80; t++) {
            let e =
                s.rotrSH(m, y, 14) ^ s.rotrSH(m, y, 18) ^ s.rotrBH(m, y, 41),
              A = s.rotrSL(m, y, 14) ^ s.rotrSL(m, y, 18) ^ s.rotrBL(m, y, 41),
              _ = (m & g) ^ (~m & v),
              M = (y & w) ^ (~y & b),
              O = s.add5L(x, A, M, h[t], l[t]),
              B = s.add5H(O, E, e, _, f[t], u[t]),
              I = 0 | O,
              T = s.rotrSH(r, i, 28) ^ s.rotrBH(r, i, 34) ^ s.rotrBH(r, i, 39),
              N = s.rotrSL(r, i, 28) ^ s.rotrBL(r, i, 34) ^ s.rotrBL(r, i, 39),
              R = (r & n) ^ (r & a) ^ (n & a),
              S = (i & o) ^ (i & c) ^ (o & c);
            (E = 0 | v),
              (x = 0 | b),
              (v = 0 | g),
              (b = 0 | w),
              (g = 0 | m),
              (w = 0 | y),
              ({ h: m, l: y } = s.add(0 | d, 0 | p, 0 | B, 0 | I)),
              (d = 0 | a),
              (p = 0 | c),
              (a = 0 | n),
              (c = 0 | o),
              (n = 0 | r),
              (o = 0 | i);
            let L = s.add3L(I, N, S);
            (r = s.add3H(L, B, T, R)), (i = 0 | L);
          }
          ({ h: r, l: i } = s.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | i)),
            ({ h: n, l: o } = s.add(0 | this.Bh, 0 | this.Bl, 0 | n, 0 | o)),
            ({ h: a, l: c } = s.add(0 | this.Ch, 0 | this.Cl, 0 | a, 0 | c)),
            ({ h: d, l: p } = s.add(0 | this.Dh, 0 | this.Dl, 0 | d, 0 | p)),
            ({ h: m, l: y } = s.add(0 | this.Eh, 0 | this.El, 0 | m, 0 | y)),
            ({ h: g, l: w } = s.add(0 | this.Fh, 0 | this.Fl, 0 | g, 0 | w)),
            ({ h: v, l: b } = s.add(0 | this.Gh, 0 | this.Gl, 0 | v, 0 | b)),
            ({ h: E, l: x } = s.add(0 | this.Hh, 0 | this.Hl, 0 | E, 0 | x)),
            this.set(r, i, n, o, a, c, d, p, m, y, g, w, v, b, E, x);
        }
        roundClean() {
          u.fill(0), l.fill(0);
        }
        destroy() {
          this.buffer.fill(0),
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      }
      let d = (0, a.ld)(() => new c());
      var p = r(615),
        m = r(8030),
        y = r(8293);
      let g = BigInt(0),
        w = BigInt(1),
        v = BigInt(2),
        b = BigInt(8),
        E = { zip215: !0 },
        x = BigInt(
          "57896044618658097711785492504343953926634992332820282019728792003956564819949"
        ),
        A = BigInt(
          "19681161376707505956807079304988542015446066515923890162744021073123829784752"
        ),
        _ = BigInt(0),
        M = BigInt(1),
        O = BigInt(2);
      BigInt(3);
      let B = BigInt(5),
        I = BigInt(8);
      function T(t, e) {
        let r = (0, m.zi)(e * e * e, x),
          i = (function (t) {
            let e = BigInt(10),
              r = BigInt(20),
              i = BigInt(40),
              n = BigInt(80),
              o = (((t * t) % x) * t) % x,
              s = ((0, m.zH)(o, O, x) * o) % x,
              a = ((0, m.zH)(s, M, x) * t) % x,
              f = ((0, m.zH)(a, B, x) * a) % x,
              h = ((0, m.zH)(f, e, x) * f) % x,
              u = ((0, m.zH)(h, r, x) * h) % x,
              l = ((0, m.zH)(u, i, x) * u) % x,
              c = ((0, m.zH)(l, n, x) * l) % x,
              d = ((0, m.zH)(c, n, x) * l) % x,
              p = ((0, m.zH)(d, e, x) * f) % x;
            return { pow_p_5_8: ((0, m.zH)(p, O, x) * t) % x, b2: o };
          })(t * (0, m.zi)(r * r * e, x)).pow_p_5_8,
          n = (0, m.zi)(t * r * i, x),
          o = (0, m.zi)(e * n * n, x),
          s = n,
          a = (0, m.zi)(n * A, x),
          f = o === t,
          h = o === (0, m.zi)(-t, x),
          u = o === (0, m.zi)(-t * A, x);
        return (
          f && (n = s),
          (h || u) && (n = a),
          (0, m.dQ)(n, x) && (n = (0, m.zi)(-n, x)),
          { isValid: f || h, value: n }
        );
      }
      let N = (0, m.D0)(x, void 0, !0),
        R = (function (t) {
          let e = (function (t) {
              let e = (0, p.hp)(t);
              return (
                y.Q5(
                  t,
                  {
                    hash: "function",
                    a: "bigint",
                    d: "bigint",
                    randomBytes: "function",
                  },
                  {
                    adjustScalarBytes: "function",
                    domain: "function",
                    uvRatio: "function",
                    mapToCurve: "function",
                  }
                ),
                Object.freeze({ ...e })
              );
            })(t),
            {
              Fp: r,
              n: i,
              prehash: n,
              hash: o,
              randomBytes: s,
              nByteLength: a,
              h: f,
            } = e,
            h = v << (BigInt(8 * a) - w),
            u = r.create,
            l = (0, m.D0)(e.n, e.nBitLength),
            c =
              e.uvRatio ||
              ((t, e) => {
                try {
                  return { isValid: !0, value: r.sqrt(t * r.inv(e)) };
                } catch (t) {
                  return { isValid: !1, value: g };
                }
              }),
            d = e.adjustScalarBytes || ((t) => t),
            x =
              e.domain ||
              ((t, e, r) => {
                if (((0, y.e8)("phflag", r), e.length || r))
                  throw Error("Contexts/pre-hash are not supported");
                return t;
              });
          function A(t, e) {
            y.aK("coordinate " + t, e, g, h);
          }
          function _(t) {
            if (!(t instanceof B)) throw Error("ExtendedPoint expected");
          }
          let M = (0, y.x)((t, e) => {
              let { ex: i, ey: n, ez: o } = t,
                s = t.is0();
              null == e && (e = s ? b : r.inv(o));
              let a = u(i * e),
                f = u(n * e),
                h = u(o * e);
              if (s) return { x: g, y: w };
              if (h !== w) throw Error("invZ was invalid");
              return { x: a, y: f };
            }),
            O = (0, y.x)((t) => {
              let { a: r, d: i } = e;
              if (t.is0()) throw Error("bad point: ZERO");
              let { ex: n, ey: o, ez: s, et: a } = t,
                f = u(n * n),
                h = u(o * o),
                l = u(s * s),
                c = u(l * l),
                d = u(f * r);
              if (u(l * u(d + h)) !== u(c + u(i * u(f * h))))
                throw Error("bad point: equation left != right (1)");
              if (u(n * o) !== u(s * a))
                throw Error("bad point: equation left != right (2)");
              return !0;
            });
          class B {
            constructor(t, e, r, i) {
              (this.ex = t),
                (this.ey = e),
                (this.ez = r),
                (this.et = i),
                A("x", t),
                A("y", e),
                A("z", r),
                A("t", i),
                Object.freeze(this);
            }
            get x() {
              return this.toAffine().x;
            }
            get y() {
              return this.toAffine().y;
            }
            static fromAffine(t) {
              if (t instanceof B) throw Error("extended point not allowed");
              let { x: e, y: r } = t || {};
              return A("x", e), A("y", r), new B(e, r, w, u(e * r));
            }
            static normalizeZ(t) {
              let e = r.invertBatch(t.map((t) => t.ez));
              return t.map((t, r) => t.toAffine(e[r])).map(B.fromAffine);
            }
            static msm(t, e) {
              return (0, p.Xf)(B, l, t, e);
            }
            _setWindowSize(t) {
              N.setWindowSize(this, t);
            }
            assertValidity() {
              O(this);
            }
            equals(t) {
              _(t);
              let { ex: e, ey: r, ez: i } = this,
                { ex: n, ey: o, ez: s } = t,
                a = u(e * s),
                f = u(n * i),
                h = u(r * s),
                l = u(o * i);
              return a === f && h === l;
            }
            is0() {
              return this.equals(B.ZERO);
            }
            negate() {
              return new B(u(-this.ex), this.ey, this.ez, u(-this.et));
            }
            double() {
              let { a: t } = e,
                { ex: r, ey: i, ez: n } = this,
                o = u(r * r),
                s = u(i * i),
                a = u(v * u(n * n)),
                f = u(t * o),
                h = r + i,
                l = u(u(h * h) - o - s),
                c = f + s,
                d = c - a,
                p = f - s,
                m = u(l * d),
                y = u(c * p),
                g = u(l * p);
              return new B(m, y, u(d * c), g);
            }
            add(t) {
              _(t);
              let { a: r, d: i } = e,
                { ex: n, ey: o, ez: s, et: a } = this,
                { ex: f, ey: h, ez: l, et: c } = t;
              if (r === BigInt(-1)) {
                let t = u((o - n) * (h + f)),
                  e = u((o + n) * (h - f)),
                  r = u(e - t);
                if (r === g) return this.double();
                let i = u(s * v * c),
                  d = u(a * v * l),
                  p = d + i,
                  m = e + t,
                  y = d - i,
                  w = u(p * r),
                  b = u(m * y),
                  E = u(p * y);
                return new B(w, b, u(r * m), E);
              }
              let d = u(n * f),
                p = u(o * h),
                m = u(a * i * c),
                y = u(s * l),
                w = u((n + o) * (f + h) - d - p),
                b = y - m,
                E = y + m,
                x = u(p - r * d),
                A = u(w * b),
                M = u(E * x),
                O = u(w * x);
              return new B(A, M, u(b * E), O);
            }
            subtract(t) {
              return this.add(t.negate());
            }
            wNAF(t) {
              return N.wNAFCached(this, t, B.normalizeZ);
            }
            multiply(t) {
              y.aK("scalar", t, w, i);
              let { p: e, f: r } = this.wNAF(t);
              return B.normalizeZ([e, r])[0];
            }
            multiplyUnsafe(t, e = B.ZERO) {
              return (y.aK("scalar", t, g, i), t === g)
                ? T
                : this.is0() || t === w
                ? this
                : N.wNAFCachedUnsafe(this, t, B.normalizeZ, e);
            }
            isSmallOrder() {
              return this.multiplyUnsafe(f).is0();
            }
            isTorsionFree() {
              return N.unsafeLadder(this, i).is0();
            }
            toAffine(t) {
              return M(this, t);
            }
            clearCofactor() {
              let { h: t } = e;
              return t === w ? this : this.multiplyUnsafe(t);
            }
            static fromHex(t, i = !1) {
              let { d: n, a: o } = e,
                s = r.BYTES;
              (t = (0, y.qj)("pointHex", t, s)), (0, y.e8)("zip215", i);
              let a = t.slice(),
                f = t[s - 1];
              a[s - 1] = -129 & f;
              let l = y.lX(a),
                d = i ? h : r.ORDER;
              y.aK("pointHex.y", l, g, d);
              let p = u(l * l),
                { isValid: m, value: v } = c(u(p - w), u(n * p - o));
              if (!m) throw Error("Point.fromHex: invalid y coordinate");
              let b = (v & w) === w,
                E = (128 & f) != 0;
              if (!i && v === g && E)
                throw Error("Point.fromHex: x=0 and x_0=1");
              return E !== b && (v = u(-v)), B.fromAffine({ x: v, y: l });
            }
            static fromPrivateKey(t) {
              return S(t).point;
            }
            toRawBytes() {
              let { x: t, y: e } = this.toAffine(),
                i = y.z(e, r.BYTES);
              return (i[i.length - 1] |= t & w ? 128 : 0), i;
            }
            toHex() {
              return y.My(this.toRawBytes());
            }
          }
          (B.BASE = new B(e.Gx, e.Gy, w, u(e.Gx * e.Gy))),
            (B.ZERO = new B(g, w, w, g));
          let { BASE: I, ZERO: T } = B,
            N = (0, p.hT)(B, 8 * a);
          function R(t) {
            var e;
            return (e = y.lX(t)), (0, m.zi)(e, i);
          }
          function S(t) {
            let e = r.BYTES;
            t = (0, y.qj)("private key", t, e);
            let i = (0, y.qj)("hashed private key", o(t), 2 * e),
              n = d(i.slice(0, e)),
              s = i.slice(e, 2 * e),
              a = R(n),
              f = I.multiply(a),
              h = f.toRawBytes();
            return { head: n, prefix: s, scalar: a, point: f, pointBytes: h };
          }
          function L(t = new Uint8Array(), ...e) {
            return R(o(x(y.Id(...e), (0, y.qj)("context", t), !!n)));
          }
          return (
            I._setWindowSize(8),
            {
              CURVE: e,
              getPublicKey: function (t) {
                return S(t).pointBytes;
              },
              sign: function (t, e, o = {}) {
                var s;
                (t = (0, y.qj)("message", t)), n && (t = n(t));
                let { prefix: a, scalar: f, pointBytes: h } = S(e),
                  u = L(o.context, a, t),
                  l = I.multiply(u).toRawBytes(),
                  c = ((s = u + L(o.context, l, h, t) * f), (0, m.zi)(s, i));
                y.aK("signature.s", c, g, i);
                let d = y.Id(l, y.z(c, r.BYTES));
                return (0, y.qj)("result", d, 2 * r.BYTES);
              },
              verify: function (t, e, i, o = E) {
                let s, a, f;
                let { context: h, zip215: u } = o,
                  l = r.BYTES;
                (t = (0, y.qj)("signature", t, 2 * l)),
                  (e = (0, y.qj)("message", e)),
                  (i = (0, y.qj)("publicKey", i, l)),
                  void 0 !== u && (0, y.e8)("zip215", u),
                  n && (e = n(e));
                let c = y.lX(t.slice(l, 2 * l));
                try {
                  (s = B.fromHex(i, u)),
                    (a = B.fromHex(t.slice(0, l), u)),
                    (f = I.multiplyUnsafe(c));
                } catch (t) {
                  return !1;
                }
                if (!u && s.isSmallOrder()) return !1;
                let d = L(h, a.toRawBytes(), s.toRawBytes(), e);
                return a
                  .add(s.multiplyUnsafe(d))
                  .subtract(f)
                  .clearCofactor()
                  .equals(B.ZERO);
              },
              ExtendedPoint: B,
              utils: {
                getExtendedPublicKey: S,
                randomPrivateKey: () => s(r.BYTES),
                precompute: (t = 8, e = B.BASE) => (
                  e._setWindowSize(t), e.multiply(BigInt(3)), e
                ),
              },
            }
          );
        })({
          a: BigInt(-1),
          d: BigInt(
            "37095705934669439343138083508754565189542113879843219016388785533085940283555"
          ),
          Fp: N,
          n: BigInt(
            "7237005577332262213973186563042994240857116359379907606001950938285454250989"
          ),
          h: I,
          Gx: BigInt(
            "15112221349535400772501151409588531511454012693041857206046113283949847762202"
          ),
          Gy: BigInt(
            "46316835694926478169428394003475163141307993866256225615783033603165251855960"
          ),
          hash: d,
          randomBytes: a.po,
          adjustScalarBytes: function (t) {
            return (t[0] &= 248), (t[31] &= 127), (t[31] |= 64), t;
          },
          uvRatio: T,
        });
      function S(t) {
        if (!(t instanceof C)) throw Error("RistrettoPoint expected");
      }
      let L = (t) => T(M, t),
        U = (t) => R.CURVE.Fp.create(null & bytesToNumberLE(t));
      function P(t) {
        let { d: e } = R.CURVE,
          r = R.CURVE.Fp.ORDER,
          i = R.CURVE.Fp.create,
          n = i(null * t * t),
          o = i((n + M) * null),
          s = BigInt(-1),
          a = i((s - e * n) * i(n + e)),
          { isValid: f, value: h } = T(o, a),
          u = i(h * t);
        isNegativeLE(u, r) || (u = i(-u)), f || (h = u), f || (s = n);
        let l = i(s * (n - M) * null - a),
          c = h * h,
          d = i((h + h) * a),
          p = i(null * l),
          m = i(M - c),
          y = i(M + c);
        return new R.ExtendedPoint(i(d * y), i(m * p), i(p * y), i(d * m));
      }
      class C {
        constructor(t) {
          this.ep = t;
        }
        static fromAffine(t) {
          return new C(R.ExtendedPoint.fromAffine(t));
        }
        static hashToCurve(t) {
          let e = P(U((t = ensureBytes("ristrettoHash", t, 64)).slice(0, 32))),
            r = P(U(t.slice(32, 64)));
          return new C(e.add(r));
        }
        static fromHex(t) {
          t = ensureBytes("ristrettoHex", t, 32);
          let { a: e, d: r } = R.CURVE,
            i = R.CURVE.Fp.ORDER,
            n = R.CURVE.Fp.create,
            o =
              "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint",
            s = U(t);
          if (!equalBytes(numberToBytesLE(s, 32), t) || isNegativeLE(s, i))
            throw Error(o);
          let a = n(s * s),
            f = n(M + e * a),
            h = n(M - e * a),
            u = n(f * f),
            l = n(h * h),
            c = n(e * r * u - l),
            { isValid: d, value: p } = L(n(c * l)),
            m = n(p * h),
            y = n(p * m * c),
            g = n((s + s) * m);
          isNegativeLE(g, i) && (g = n(-g));
          let w = n(f * y),
            v = n(g * w);
          if (!d || isNegativeLE(v, i) || w === _) throw Error(o);
          return new C(new R.ExtendedPoint(g, w, M, v));
        }
        toRawBytes() {
          let t,
            { ex: e, ey: r, ez: i, et: n } = this.ep,
            o = R.CURVE.Fp.ORDER,
            s = R.CURVE.Fp.create,
            a = s(s(i + r) * s(i - r)),
            f = s(e * r),
            h = s(f * f),
            { value: u } = L(s(a * h)),
            l = s(u * a),
            c = s(u * f),
            d = s(l * c * n);
          if (isNegativeLE(n * d, o)) {
            let i = s(null * r),
              n = s(null * e);
            (e = i), (r = n), (t = s(null * l));
          } else t = c;
          isNegativeLE(e * d, o) && (r = s(-r));
          let p = s((i - r) * t);
          return isNegativeLE(p, o) && (p = s(-p)), numberToBytesLE(p, 32);
        }
        toHex() {
          return bytesToHex(this.toRawBytes());
        }
        toString() {
          return this.toHex();
        }
        equals(t) {
          S(t);
          let { ex: e, ey: r } = this.ep,
            { ex: i, ey: n } = t.ep,
            o = R.CURVE.Fp.create,
            s = o(e * n) === o(r * i),
            a = o(r * n) === o(e * i);
          return s || a;
        }
        add(t) {
          return S(t), new C(this.ep.add(t.ep));
        }
        subtract(t) {
          return S(t), new C(this.ep.subtract(t.ep));
        }
        multiply(t) {
          return new C(this.ep.multiply(t));
        }
        multiplyUnsafe(t) {
          return new C(this.ep.multiplyUnsafe(t));
        }
        double() {
          return new C(this.ep.double());
        }
        negate() {
          return new C(this.ep.negate());
        }
      }
    },
    6128: (t, e, r) => {
      "use strict";
      r.d(e, { bI: () => T });
      var i = r(690),
        n = r(1510);
      let o = new Uint32Array([
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
          0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
          0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
          0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc, 0x2de92c6f,
          0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d,
          0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x6ca6351, 0x14292967,
          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354,
          0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
          0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585,
          0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
          0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee,
          0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb,
          0xbef9a3f7, 0xc67178f2,
        ]),
        s = new Uint32Array([
          0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f,
          0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
        ]),
        a = new Uint32Array(64);
      class f extends i.ol {
        constructor() {
          super(64, 32, 8, !1),
            (this.A = 0 | s[0]),
            (this.B = 0 | s[1]),
            (this.C = 0 | s[2]),
            (this.D = 0 | s[3]),
            (this.E = 0 | s[4]),
            (this.F = 0 | s[5]),
            (this.G = 0 | s[6]),
            (this.H = 0 | s[7]);
        }
        get() {
          let { A: t, B: e, C: r, D: i, E: n, F: o, G: s, H: a } = this;
          return [t, e, r, i, n, o, s, a];
        }
        set(t, e, r, i, n, o, s, a) {
          (this.A = 0 | t),
            (this.B = 0 | e),
            (this.C = 0 | r),
            (this.D = 0 | i),
            (this.E = 0 | n),
            (this.F = 0 | o),
            (this.G = 0 | s),
            (this.H = 0 | a);
        }
        process(t, e) {
          for (let r = 0; r < 16; r++, e += 4) a[r] = t.getUint32(e, !1);
          for (let t = 16; t < 64; t++) {
            let e = a[t - 15],
              r = a[t - 2],
              i = (0, n.Ow)(e, 7) ^ (0, n.Ow)(e, 18) ^ (e >>> 3),
              o = (0, n.Ow)(r, 17) ^ (0, n.Ow)(r, 19) ^ (r >>> 10);
            a[t] = (o + a[t - 7] + i + a[t - 16]) | 0;
          }
          let { A: r, B: s, C: f, D: h, E: u, F: l, G: c, H: d } = this;
          for (let t = 0; t < 64; t++) {
            let e =
                (d +
                  ((0, n.Ow)(u, 6) ^ (0, n.Ow)(u, 11) ^ (0, n.Ow)(u, 25)) +
                  (0, i.r9)(u, l, c) +
                  o[t] +
                  a[t]) |
                0,
              p =
                (((0, n.Ow)(r, 2) ^ (0, n.Ow)(r, 13) ^ (0, n.Ow)(r, 22)) +
                  (0, i.TQ)(r, s, f)) |
                0;
            (d = c),
              (c = l),
              (l = u),
              (u = (h + e) | 0),
              (h = f),
              (f = s),
              (s = r),
              (r = (e + p) | 0);
          }
          (r = (r + this.A) | 0),
            (s = (s + this.B) | 0),
            (f = (f + this.C) | 0),
            (h = (h + this.D) | 0),
            (u = (u + this.E) | 0),
            (l = (l + this.F) | 0),
            (c = (c + this.G) | 0),
            (d = (d + this.H) | 0),
            this.set(r, s, f, h, u, l, c, d);
        }
        roundClean() {
          a.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
        }
      }
      let h = (0, n.ld)(() => new f());
      var u = r(5493);
      class l extends n.Vw {
        constructor(t, e) {
          super(), (this.finished = !1), (this.destroyed = !1), (0, u.sd)(t);
          let r = (0, n.ZJ)(e);
          if (
            ((this.iHash = t.create()), "function" != typeof this.iHash.update)
          )
            throw Error("Expected instance of class which extends utils.Hash");
          (this.blockLen = this.iHash.blockLen),
            (this.outputLen = this.iHash.outputLen);
          let i = this.blockLen,
            o = new Uint8Array(i);
          o.set(r.length > i ? t.create().update(r).digest() : r);
          for (let t = 0; t < o.length; t++) o[t] ^= 54;
          this.iHash.update(o), (this.oHash = t.create());
          for (let t = 0; t < o.length; t++) o[t] ^= 106;
          this.oHash.update(o), o.fill(0);
        }
        update(t) {
          return (0, u.CC)(this), this.iHash.update(t), this;
        }
        digestInto(t) {
          (0, u.CC)(this),
            (0, u.DO)(t, this.outputLen),
            (this.finished = !0),
            this.iHash.digestInto(t),
            this.oHash.update(t),
            this.oHash.digestInto(t),
            this.destroy();
        }
        digest() {
          let t = new Uint8Array(this.oHash.outputLen);
          return this.digestInto(t), t;
        }
        _cloneInto(t) {
          t || (t = Object.create(Object.getPrototypeOf(this), {}));
          let {
            oHash: e,
            iHash: r,
            finished: i,
            destroyed: n,
            blockLen: o,
            outputLen: s,
          } = this;
          return (
            (t.finished = i),
            (t.destroyed = n),
            (t.blockLen = o),
            (t.outputLen = s),
            (t.oHash = e._cloneInto(t.oHash)),
            (t.iHash = r._cloneInto(t.iHash)),
            t
          );
        }
        destroy() {
          (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
        }
      }
      let c = (t, e, r) => new l(t, e).update(r).digest();
      c.create = (t, e) => new l(t, e);
      var d = r(615),
        p = r(8030),
        m = r(8293);
      function y(t) {
        void 0 !== t.lowS && (0, m.e8)("lowS", t.lowS),
          void 0 !== t.prehash && (0, m.e8)("prehash", t.prehash);
      }
      let { Ph: g, aT: w } = m,
        v = {
          Err: class extends Error {
            constructor(t = "") {
              super(t);
            }
          },
          _tlv: {
            encode: (t, e) => {
              let { Err: r } = v;
              if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
              if (1 & e.length) throw new r("tlv.encode: unpadded data");
              let i = e.length / 2,
                n = m.zW(i);
              if ((n.length / 2) & 128)
                throw new r("tlv.encode: long form length too big");
              let o = i > 127 ? m.zW((n.length / 2) | 128) : "";
              return m.zW(t) + o + n + e;
            },
            decode(t, e) {
              let { Err: r } = v,
                i = 0;
              if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
              if (e.length < 2 || e[i++] !== t)
                throw new r("tlv.decode: wrong tlv");
              let n = e[i++],
                o = 0;
              if (128 & n) {
                let t = 127 & n;
                if (!t)
                  throw new r(
                    "tlv.decode(long): indefinite length not supported"
                  );
                if (t > 4)
                  throw new r("tlv.decode(long): byte length is too big");
                let s = e.subarray(i, i + t);
                if (s.length !== t)
                  throw new r("tlv.decode: length bytes not complete");
                if (0 === s[0])
                  throw new r("tlv.decode(long): zero leftmost byte");
                for (let t of s) o = (o << 8) | t;
                if (((i += t), o < 128))
                  throw new r("tlv.decode(long): not minimal encoding");
              } else o = n;
              let s = e.subarray(i, i + o);
              if (s.length !== o) throw new r("tlv.decode: wrong value length");
              return { v: s, l: e.subarray(i + o) };
            },
          },
          _int: {
            encode(t) {
              let { Err: e } = v;
              if (t < b)
                throw new e("integer: negative integers are not allowed");
              let r = m.zW(t);
              if (
                (8 & Number.parseInt(r[0], 16) && (r = "00" + r), 1 & r.length)
              )
                throw new e("unexpected DER parsing assertion: unpadded hex");
              return r;
            },
            decode(t) {
              let { Err: e } = v;
              if (128 & t[0])
                throw new e("invalid signature integer: negative");
              if (0 === t[0] && !(128 & t[1]))
                throw new e(
                  "invalid signature integer: unnecessary leading zero"
                );
              return g(t);
            },
          },
          toSig(t) {
            let { Err: e, _int: r, _tlv: i } = v,
              n = "string" == typeof t ? w(t) : t;
            m.DO(n);
            let { v: o, l: s } = i.decode(48, n);
            if (s.length)
              throw new e("invalid signature: left bytes after parsing");
            let { v: a, l: f } = i.decode(2, o),
              { v: h, l: u } = i.decode(2, f);
            if (u.length)
              throw new e("invalid signature: left bytes after parsing");
            return { r: r.decode(a), s: r.decode(h) };
          },
          hexFromSig(t) {
            let { _tlv: e, _int: r } = v,
              i = e.encode(2, r.encode(t.r)),
              n = e.encode(2, r.encode(t.s));
            return e.encode(48, i + n);
          },
        },
        b = BigInt(0),
        E = BigInt(1),
        x = (BigInt(2), BigInt(3)),
        A =
          (BigInt(4),
          BigInt(
            "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
          )),
        _ = BigInt(
          "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        ),
        M = BigInt(1),
        O = BigInt(2),
        B = (t, e) => (t + e / O) / e,
        I = (0, p.D0)(A, void 0, void 0, {
          sqrt: function (t) {
            let e = BigInt(3),
              r = BigInt(6),
              i = BigInt(11),
              n = BigInt(22),
              o = BigInt(23),
              s = BigInt(44),
              a = BigInt(88),
              f = (t * t * t) % A,
              h = (f * f * t) % A,
              u = ((0, p.zH)(h, e, A) * h) % A,
              l = ((0, p.zH)(u, e, A) * h) % A,
              c = ((0, p.zH)(l, O, A) * f) % A,
              d = ((0, p.zH)(c, i, A) * c) % A,
              m = ((0, p.zH)(d, n, A) * d) % A,
              y = ((0, p.zH)(m, s, A) * m) % A,
              g = ((0, p.zH)(y, a, A) * y) % A,
              w = ((0, p.zH)(g, s, A) * m) % A,
              v = ((0, p.zH)(w, e, A) * h) % A,
              b = ((0, p.zH)(v, o, A) * d) % A,
              E = ((0, p.zH)(b, r, A) * f) % A,
              x = (0, p.zH)(E, O, A);
            if (!I.eql(I.sqr(x), t)) throw Error("Cannot find square root");
            return x;
          },
        }),
        T = (function (t, e) {
          let r = (e) =>
            (function (t) {
              let e = (function (t) {
                  let e = (0, d.hp)(t);
                  return (
                    m.Q5(
                      e,
                      {
                        hash: "hash",
                        hmac: "function",
                        randomBytes: "function",
                      },
                      {
                        bits2int: "function",
                        bits2int_modN: "function",
                        lowS: "boolean",
                      }
                    ),
                    Object.freeze({ lowS: !0, ...e })
                  );
                })(t),
                { Fp: r, n: i } = e,
                n = r.BYTES + 1,
                o = 2 * r.BYTES + 1;
              function s(t) {
                return p.zi(t, i);
              }
              function a(t) {
                return p.B8(t, i);
              }
              let {
                  ProjectivePoint: f,
                  normPrivateKeyToScalar: h,
                  weierstrassEquation: u,
                  isWithinCurveOrder: l,
                } = (function (t) {
                  let e = (function (t) {
                      let e = (0, d.hp)(t);
                      m.Q5(
                        e,
                        { a: "field", b: "field" },
                        {
                          allowedPrivateKeyLengths: "array",
                          wrapPrivateKey: "boolean",
                          isTorsionFree: "function",
                          clearCofactor: "function",
                          allowInfinityPoint: "boolean",
                          fromBytes: "function",
                          toBytes: "function",
                        }
                      );
                      let { endo: r, Fp: i, a: n } = e;
                      if (r) {
                        if (!i.eql(n, i.ZERO))
                          throw Error(
                            "invalid endomorphism, can only be defined for Koblitz curves that have a=0"
                          );
                        if (
                          "object" != typeof r ||
                          "bigint" != typeof r.beta ||
                          "function" != typeof r.splitScalar
                        )
                          throw Error(
                            "invalid endomorphism, expected beta: bigint and splitScalar: function"
                          );
                      }
                      return Object.freeze({ ...e });
                    })(t),
                    { Fp: r } = e,
                    i = p.D0(e.n, e.nBitLength),
                    n =
                      e.toBytes ||
                      ((t, e, i) => {
                        let n = e.toAffine();
                        return m.Id(
                          Uint8Array.from([4]),
                          r.toBytes(n.x),
                          r.toBytes(n.y)
                        );
                      }),
                    o =
                      e.fromBytes ||
                      ((t) => {
                        let e = t.subarray(1);
                        return {
                          x: r.fromBytes(e.subarray(0, r.BYTES)),
                          y: r.fromBytes(e.subarray(r.BYTES, 2 * r.BYTES)),
                        };
                      });
                  function s(t) {
                    let { a: i, b: n } = e,
                      o = r.sqr(t),
                      s = r.mul(o, t);
                    return r.add(r.add(s, r.mul(t, i)), n);
                  }
                  if (!r.eql(r.sqr(e.Gy), s(e.Gx)))
                    throw Error("bad generator point: equation left != right");
                  function a(t) {
                    let r;
                    let {
                      allowedPrivateKeyLengths: i,
                      nByteLength: n,
                      wrapPrivateKey: o,
                      n: s,
                    } = e;
                    if (i && "bigint" != typeof t) {
                      if (
                        (m.aY(t) && (t = m.My(t)),
                        "string" != typeof t || !i.includes(t.length))
                      )
                        throw Error("invalid private key");
                      t = t.padStart(2 * n, "0");
                    }
                    try {
                      r =
                        "bigint" == typeof t
                          ? t
                          : m.Ph((0, m.qj)("private key", t, n));
                    } catch (e) {
                      throw Error(
                        "invalid private key, expected hex or " +
                          n +
                          " bytes, got " +
                          typeof t
                      );
                    }
                    return (
                      o && (r = p.zi(r, s)), m.aK("private key", r, E, s), r
                    );
                  }
                  function f(t) {
                    if (!(t instanceof l))
                      throw Error("ProjectivePoint expected");
                  }
                  let h = (0, m.x)((t, e) => {
                      let { px: i, py: n, pz: o } = t;
                      if (r.eql(o, r.ONE)) return { x: i, y: n };
                      let s = t.is0();
                      null == e && (e = s ? r.ONE : r.inv(o));
                      let a = r.mul(i, e),
                        f = r.mul(n, e),
                        h = r.mul(o, e);
                      if (s) return { x: r.ZERO, y: r.ZERO };
                      if (!r.eql(h, r.ONE)) throw Error("invZ was invalid");
                      return { x: a, y: f };
                    }),
                    u = (0, m.x)((t) => {
                      if (t.is0()) {
                        if (e.allowInfinityPoint && !r.is0(t.py)) return;
                        throw Error("bad point: ZERO");
                      }
                      let { x: i, y: n } = t.toAffine();
                      if (!r.isValid(i) || !r.isValid(n))
                        throw Error("bad point: x or y not FE");
                      let o = r.sqr(n),
                        a = s(i);
                      if (!r.eql(o, a))
                        throw Error("bad point: equation left != right");
                      if (!t.isTorsionFree())
                        throw Error("bad point: not in prime-order subgroup");
                      return !0;
                    });
                  class l {
                    constructor(t, e, i) {
                      if (
                        ((this.px = t),
                        (this.py = e),
                        (this.pz = i),
                        null == t || !r.isValid(t))
                      )
                        throw Error("x required");
                      if (null == e || !r.isValid(e)) throw Error("y required");
                      if (null == i || !r.isValid(i)) throw Error("z required");
                      Object.freeze(this);
                    }
                    static fromAffine(t) {
                      let { x: e, y: i } = t || {};
                      if (!t || !r.isValid(e) || !r.isValid(i))
                        throw Error("invalid affine point");
                      if (t instanceof l)
                        throw Error("projective point not allowed");
                      let n = (t) => r.eql(t, r.ZERO);
                      return n(e) && n(i) ? l.ZERO : new l(e, i, r.ONE);
                    }
                    get x() {
                      return this.toAffine().x;
                    }
                    get y() {
                      return this.toAffine().y;
                    }
                    static normalizeZ(t) {
                      let e = r.invertBatch(t.map((t) => t.pz));
                      return t
                        .map((t, r) => t.toAffine(e[r]))
                        .map(l.fromAffine);
                    }
                    static fromHex(t) {
                      let e = l.fromAffine(o((0, m.qj)("pointHex", t)));
                      return e.assertValidity(), e;
                    }
                    static fromPrivateKey(t) {
                      return l.BASE.multiply(a(t));
                    }
                    static msm(t, e) {
                      return (0, d.Xf)(l, i, t, e);
                    }
                    _setWindowSize(t) {
                      y.setWindowSize(this, t);
                    }
                    assertValidity() {
                      u(this);
                    }
                    hasEvenY() {
                      let { y: t } = this.toAffine();
                      if (r.isOdd) return !r.isOdd(t);
                      throw Error("Field doesn't support isOdd");
                    }
                    equals(t) {
                      f(t);
                      let { px: e, py: i, pz: n } = this,
                        { px: o, py: s, pz: a } = t,
                        h = r.eql(r.mul(e, a), r.mul(o, n)),
                        u = r.eql(r.mul(i, a), r.mul(s, n));
                      return h && u;
                    }
                    negate() {
                      return new l(this.px, r.neg(this.py), this.pz);
                    }
                    double() {
                      let { a: t, b: i } = e,
                        n = r.mul(i, x),
                        { px: o, py: s, pz: a } = this,
                        f = r.ZERO,
                        h = r.ZERO,
                        u = r.ZERO,
                        c = r.mul(o, o),
                        d = r.mul(s, s),
                        p = r.mul(a, a),
                        m = r.mul(o, s);
                      return (
                        (m = r.add(m, m)),
                        (u = r.mul(o, a)),
                        (u = r.add(u, u)),
                        (f = r.mul(t, u)),
                        (h = r.mul(n, p)),
                        (h = r.add(f, h)),
                        (f = r.sub(d, h)),
                        (h = r.add(d, h)),
                        (h = r.mul(f, h)),
                        (f = r.mul(m, f)),
                        (u = r.mul(n, u)),
                        (p = r.mul(t, p)),
                        (m = r.sub(c, p)),
                        (m = r.mul(t, m)),
                        (m = r.add(m, u)),
                        (u = r.add(c, c)),
                        (c = r.add(u, c)),
                        (c = r.add(c, p)),
                        (c = r.mul(c, m)),
                        (h = r.add(h, c)),
                        (p = r.mul(s, a)),
                        (p = r.add(p, p)),
                        (c = r.mul(p, m)),
                        (f = r.sub(f, c)),
                        (u = r.mul(p, d)),
                        (u = r.add(u, u)),
                        new l(f, h, (u = r.add(u, u)))
                      );
                    }
                    add(t) {
                      f(t);
                      let { px: i, py: n, pz: o } = this,
                        { px: s, py: a, pz: h } = t,
                        u = r.ZERO,
                        c = r.ZERO,
                        d = r.ZERO,
                        p = e.a,
                        m = r.mul(e.b, x),
                        y = r.mul(i, s),
                        g = r.mul(n, a),
                        w = r.mul(o, h),
                        v = r.add(i, n),
                        b = r.add(s, a);
                      (v = r.mul(v, b)),
                        (b = r.add(y, g)),
                        (v = r.sub(v, b)),
                        (b = r.add(i, o));
                      let E = r.add(s, h);
                      return (
                        (b = r.mul(b, E)),
                        (E = r.add(y, w)),
                        (b = r.sub(b, E)),
                        (E = r.add(n, o)),
                        (u = r.add(a, h)),
                        (E = r.mul(E, u)),
                        (u = r.add(g, w)),
                        (E = r.sub(E, u)),
                        (d = r.mul(p, b)),
                        (u = r.mul(m, w)),
                        (d = r.add(u, d)),
                        (u = r.sub(g, d)),
                        (d = r.add(g, d)),
                        (c = r.mul(u, d)),
                        (g = r.add(y, y)),
                        (g = r.add(g, y)),
                        (w = r.mul(p, w)),
                        (b = r.mul(m, b)),
                        (g = r.add(g, w)),
                        (w = r.sub(y, w)),
                        (w = r.mul(p, w)),
                        (b = r.add(b, w)),
                        (y = r.mul(g, b)),
                        (c = r.add(c, y)),
                        (y = r.mul(E, b)),
                        (u = r.mul(v, u)),
                        (u = r.sub(u, y)),
                        (y = r.mul(v, g)),
                        (d = r.mul(E, d)),
                        new l(u, c, (d = r.add(d, y)))
                      );
                    }
                    subtract(t) {
                      return this.add(t.negate());
                    }
                    is0() {
                      return this.equals(l.ZERO);
                    }
                    wNAF(t) {
                      return y.wNAFCached(this, t, l.normalizeZ);
                    }
                    multiplyUnsafe(t) {
                      let { endo: i, n: n } = e;
                      m.aK("scalar", t, b, n);
                      let o = l.ZERO;
                      if (t === b) return o;
                      if (this.is0() || t === E) return this;
                      if (!i || y.hasPrecomputes(this))
                        return y.wNAFCachedUnsafe(this, t, l.normalizeZ);
                      let {
                          k1neg: s,
                          k1: a,
                          k2neg: f,
                          k2: h,
                        } = i.splitScalar(t),
                        u = o,
                        c = o,
                        d = this;
                      for (; a > b || h > b; )
                        a & E && (u = u.add(d)),
                          h & E && (c = c.add(d)),
                          (d = d.double()),
                          (a >>= E),
                          (h >>= E);
                      return (
                        s && (u = u.negate()),
                        f && (c = c.negate()),
                        (c = new l(r.mul(c.px, i.beta), c.py, c.pz)),
                        u.add(c)
                      );
                    }
                    multiply(t) {
                      let i, n;
                      let { endo: o, n: s } = e;
                      if ((m.aK("scalar", t, E, s), o)) {
                        let {
                            k1neg: e,
                            k1: s,
                            k2neg: a,
                            k2: f,
                          } = o.splitScalar(t),
                          { p: h, f: u } = this.wNAF(s),
                          { p: c, f: d } = this.wNAF(f);
                        (h = y.constTimeNegate(e, h)),
                          (c = y.constTimeNegate(a, c)),
                          (c = new l(r.mul(c.px, o.beta), c.py, c.pz)),
                          (i = h.add(c)),
                          (n = u.add(d));
                      } else {
                        let { p: e, f: r } = this.wNAF(t);
                        (i = e), (n = r);
                      }
                      return l.normalizeZ([i, n])[0];
                    }
                    multiplyAndAddUnsafe(t, e, r) {
                      let i = l.BASE,
                        n = (t, e) =>
                          e !== b && e !== E && t.equals(i)
                            ? t.multiply(e)
                            : t.multiplyUnsafe(e),
                        o = n(this, e).add(n(t, r));
                      return o.is0() ? void 0 : o;
                    }
                    toAffine(t) {
                      return h(this, t);
                    }
                    isTorsionFree() {
                      let { h: t, isTorsionFree: r } = e;
                      if (t === E) return !0;
                      if (r) return r(l, this);
                      throw Error(
                        "isTorsionFree() has not been declared for the elliptic curve"
                      );
                    }
                    clearCofactor() {
                      let { h: t, clearCofactor: r } = e;
                      return t === E
                        ? this
                        : r
                        ? r(l, this)
                        : this.multiplyUnsafe(e.h);
                    }
                    toRawBytes(t = !0) {
                      return (
                        (0, m.e8)("isCompressed", t),
                        this.assertValidity(),
                        n(l, this, t)
                      );
                    }
                    toHex(t = !0) {
                      return (
                        (0, m.e8)("isCompressed", t), m.My(this.toRawBytes(t))
                      );
                    }
                  }
                  (l.BASE = new l(e.Gx, e.Gy, r.ONE)),
                    (l.ZERO = new l(r.ZERO, r.ONE, r.ZERO));
                  let c = e.nBitLength,
                    y = (0, d.hT)(l, e.endo ? Math.ceil(c / 2) : c);
                  return {
                    CURVE: e,
                    ProjectivePoint: l,
                    normPrivateKeyToScalar: a,
                    weierstrassEquation: s,
                    isWithinCurveOrder: function (t) {
                      return m.r4(t, E, e.n);
                    },
                  };
                })({
                  ...e,
                  toBytes(t, e, i) {
                    let n = e.toAffine(),
                      o = r.toBytes(n.x),
                      s = m.Id;
                    return ((0, m.e8)("isCompressed", i), i)
                      ? s(Uint8Array.from([e.hasEvenY() ? 2 : 3]), o)
                      : s(Uint8Array.from([4]), o, r.toBytes(n.y));
                  },
                  fromBytes(t) {
                    let e = t.length,
                      i = t[0],
                      s = t.subarray(1);
                    if (e === n && (2 === i || 3 === i)) {
                      let t;
                      let e = m.Ph(s);
                      if (!m.r4(e, E, r.ORDER))
                        throw Error("Point is not on curve");
                      let n = u(e);
                      try {
                        t = r.sqrt(n);
                      } catch (t) {
                        throw Error(
                          "Point is not on curve" +
                            (t instanceof Error ? ": " + t.message : "")
                        );
                      }
                      return (
                        ((1 & i) == 1) != ((t & E) === E) && (t = r.neg(t)),
                        { x: e, y: t }
                      );
                    }
                    if (e === o && 4 === i)
                      return {
                        x: r.fromBytes(s.subarray(0, r.BYTES)),
                        y: r.fromBytes(s.subarray(r.BYTES, 2 * r.BYTES)),
                      };
                    throw Error(
                      "invalid Point, expected length of " +
                        n +
                        ", or uncompressed " +
                        o +
                        ", got " +
                        e
                    );
                  },
                }),
                c = (t) => m.My(m.lq(t, e.nByteLength)),
                g = (t, e, r) => m.Ph(t.slice(e, r));
              class w {
                constructor(t, e, r) {
                  (this.r = t),
                    (this.s = e),
                    (this.recovery = r),
                    this.assertValidity();
                }
                static fromCompact(t) {
                  let r = e.nByteLength;
                  return new w(
                    g((t = (0, m.qj)("compactSignature", t, 2 * r)), 0, r),
                    g(t, r, 2 * r)
                  );
                }
                static fromDER(t) {
                  let { r: e, s: r } = v.toSig((0, m.qj)("DER", t));
                  return new w(e, r);
                }
                assertValidity() {
                  m.aK("r", this.r, E, i), m.aK("s", this.s, E, i);
                }
                addRecoveryBit(t) {
                  return new w(this.r, this.s, t);
                }
                recoverPublicKey(t) {
                  let { r: i, s: n, recovery: o } = this,
                    h = M((0, m.qj)("msgHash", t));
                  if (null == o || ![0, 1, 2, 3].includes(o))
                    throw Error("recovery id invalid");
                  let u = 2 === o || 3 === o ? i + e.n : i;
                  if (u >= r.ORDER) throw Error("recovery id 2 or 3 invalid");
                  let l = (1 & o) == 0 ? "02" : "03",
                    d = f.fromHex(l + c(u)),
                    p = a(u),
                    y = s(-h * p),
                    g = s(n * p),
                    w = f.BASE.multiplyAndAddUnsafe(d, y, g);
                  if (!w) throw Error("point at infinify");
                  return w.assertValidity(), w;
                }
                hasHighS() {
                  return this.s > i >> E;
                }
                normalizeS() {
                  return this.hasHighS()
                    ? new w(this.r, s(-this.s), this.recovery)
                    : this;
                }
                toDERRawBytes() {
                  return m.aT(this.toDERHex());
                }
                toDERHex() {
                  return v.hexFromSig({ r: this.r, s: this.s });
                }
                toCompactRawBytes() {
                  return m.aT(this.toCompactHex());
                }
                toCompactHex() {
                  return c(this.r) + c(this.s);
                }
              }
              function A(t) {
                let e = m.aY(t),
                  r = "string" == typeof t,
                  i = (e || r) && t.length;
                return e
                  ? i === n || i === o
                  : r
                  ? i === 2 * n || i === 2 * o
                  : t instanceof f;
              }
              let _ =
                  e.bits2int ||
                  function (t) {
                    if (t.length > 8192) throw Error("input is too large");
                    let r = m.Ph(t),
                      i = 8 * t.length - e.nBitLength;
                    return i > 0 ? r >> BigInt(i) : r;
                  },
                M =
                  e.bits2int_modN ||
                  function (t) {
                    return s(_(t));
                  },
                O = m.OG(e.nBitLength);
              function B(t) {
                return (
                  m.aK("num < 2^" + e.nBitLength, t, b, O),
                  m.lq(t, e.nByteLength)
                );
              }
              let I = { lowS: e.lowS, prehash: !1 },
                T = { lowS: e.lowS, prehash: !1 };
              return (
                f.BASE._setWindowSize(8),
                {
                  CURVE: e,
                  getPublicKey: function (t, e = !0) {
                    return f.fromPrivateKey(t).toRawBytes(e);
                  },
                  getSharedSecret: function (t, e, r = !0) {
                    if (A(t)) throw Error("first arg must be private key");
                    if (!A(e)) throw Error("second arg must be public key");
                    return f.fromHex(e).multiply(h(t)).toRawBytes(r);
                  },
                  sign: function (t, n, o = I) {
                    let { seed: u, k2sig: c } = (function (t, n, o = I) {
                      if (["recovered", "canonical"].some((t) => t in o))
                        throw Error("sign() legacy options not supported");
                      let { hash: u, randomBytes: c } = e,
                        { lowS: d, prehash: p, extraEntropy: g } = o;
                      null == d && (d = !0),
                        (t = (0, m.qj)("msgHash", t)),
                        y(o),
                        p && (t = (0, m.qj)("prehashed msgHash", u(t)));
                      let v = M(t),
                        x = h(n),
                        A = [B(x), B(v)];
                      if (null != g && !1 !== g) {
                        let t = !0 === g ? c(r.BYTES) : g;
                        A.push((0, m.qj)("extraEntropy", t));
                      }
                      return {
                        seed: m.Id(...A),
                        k2sig: function (t) {
                          let e = _(t);
                          if (!l(e)) return;
                          let r = a(e),
                            n = f.BASE.multiply(e).toAffine(),
                            o = s(n.x);
                          if (o === b) return;
                          let h = s(r * s(v + o * x));
                          if (h === b) return;
                          let u = (n.x === o ? 0 : 2) | Number(n.y & E),
                            c = h;
                          if (d && h > i >> E)
                            (c = h > i >> E ? s(-h) : h), (u ^= 1);
                          return new w(o, c, u);
                        },
                      };
                    })(t, n, o);
                    return m.fg(e.hash.outputLen, e.nByteLength, e.hmac)(u, c);
                  },
                  verify: function (t, r, i, n = T) {
                    let o, h;
                    (r = (0, m.qj)("msgHash", r)),
                      (i = (0, m.qj)("publicKey", i));
                    let { lowS: u, prehash: l, format: c } = n;
                    if ((y(n), "strict" in n))
                      throw Error("options.strict was renamed to lowS");
                    if (void 0 !== c && "compact" !== c && "der" !== c)
                      throw Error("format must be compact or der");
                    let d = "string" == typeof t || m.aY(t),
                      p =
                        !d &&
                        !c &&
                        "object" == typeof t &&
                        null !== t &&
                        "bigint" == typeof t.r &&
                        "bigint" == typeof t.s;
                    if (!d && !p)
                      throw Error(
                        "invalid signature, expected Uint8Array, hex string or Signature instance"
                      );
                    try {
                      if ((p && (h = new w(t.r, t.s)), d)) {
                        try {
                          "compact" !== c && (h = w.fromDER(t));
                        } catch (t) {
                          if (!(t instanceof v.Err)) throw t;
                        }
                        h || "der" === c || (h = w.fromCompact(t));
                      }
                      o = f.fromHex(i);
                    } catch (t) {
                      return !1;
                    }
                    if (!h || (u && h.hasHighS())) return !1;
                    l && (r = e.hash(r));
                    let { r: g, s: b } = h,
                      E = M(r),
                      x = a(b),
                      A = s(E * x),
                      _ = s(g * x),
                      O = f.BASE.multiplyAndAddUnsafe(o, A, _)?.toAffine();
                    return !!O && s(O.x) === g;
                  },
                  ProjectivePoint: f,
                  Signature: w,
                  utils: {
                    isValidPrivateKey(t) {
                      try {
                        return h(t), !0;
                      } catch (t) {
                        return !1;
                      }
                    },
                    normPrivateKeyToScalar: h,
                    randomPrivateKey: () => {
                      let t = p.Tp(e.n);
                      return p.qy(e.randomBytes(t), e.n);
                    },
                    precompute: (t = 8, e = f.BASE) => (
                      e._setWindowSize(t), e.multiply(BigInt(3)), e
                    ),
                  },
                }
              );
            })({
              ...t,
              hash: e,
              hmac: (t, ...r) => c(e, t, (0, n.Id)(...r)),
              randomBytes: n.po,
            });
          return Object.freeze({ ...r(e), create: r });
        })(
          {
            a: BigInt(0),
            b: BigInt(7),
            Fp: I,
            n: _,
            Gx: BigInt(
              "55066263022277343669578718895168534326250603453777594175500187360389116729240"
            ),
            Gy: BigInt(
              "32670510020758816978083085130507043184471273380659243275938904335757337482424"
            ),
            h: BigInt(1),
            lowS: !0,
            endo: {
              beta: BigInt(
                "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"
              ),
              splitScalar: (t) => {
                let e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
                  r = -M * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
                  i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
                  n = BigInt("0x100000000000000000000000000000000"),
                  o = B(e * t, _),
                  s = B(-r * t, _),
                  a = (0, p.zi)(t - o * e - s * i, _),
                  f = (0, p.zi)(-o * r - s * e, _),
                  h = a > n,
                  u = f > n;
                if ((h && (a = _ - a), u && (f = _ - f), a > n || f > n))
                  throw Error("splitScalar: Endomorphism failed, k=" + t);
                return { k1neg: h, k1: a, k2neg: u, k2: f };
              },
            },
          },
          h
        );
      BigInt(0), T.ProjectivePoint;
    },
    5493: (t, e, r) => {
      "use strict";
      function i(t) {
        if (!Number.isSafeInteger(t) || t < 0)
          throw Error("positive integer expected, got " + t);
      }
      function n(t, ...e) {
        if (
          !(
            t instanceof Uint8Array ||
            (ArrayBuffer.isView(t) && "Uint8Array" === t.constructor.name)
          )
        )
          throw Error("Uint8Array expected");
        if (e.length > 0 && !e.includes(t.length))
          throw Error(
            "Uint8Array expected of length " + e + ", got length=" + t.length
          );
      }
      function o(t) {
        if ("function" != typeof t || "function" != typeof t.create)
          throw Error("Hash should be wrapped by utils.wrapConstructor");
        i(t.outputLen), i(t.blockLen);
      }
      function s(t, e = !0) {
        if (t.destroyed) throw Error("Hash instance has been destroyed");
        if (e && t.finished)
          throw Error("Hash#digest() has already been called");
      }
      function a(t, e) {
        n(t);
        let r = e.outputLen;
        if (t.length < r)
          throw Error(
            "digestInto() expects output buffer of length at least " + r
          );
      }
      r.d(e, { CC: () => s, DO: () => n, Ht: () => a, sd: () => o });
    },
    690: (t, e, r) => {
      "use strict";
      r.d(e, { TQ: () => s, ol: () => a, r9: () => o });
      var i = r(5493),
        n = r(1510);
      let o = (t, e, r) => (t & e) ^ (~t & r),
        s = (t, e, r) => (t & e) ^ (t & r) ^ (e & r);
      class a extends n.Vw {
        constructor(t, e, r, i) {
          super(),
            (this.blockLen = t),
            (this.outputLen = e),
            (this.padOffset = r),
            (this.isLE = i),
            (this.finished = !1),
            (this.length = 0),
            (this.pos = 0),
            (this.destroyed = !1),
            (this.buffer = new Uint8Array(t)),
            (this.view = (0, n.O8)(this.buffer));
        }
        update(t) {
          (0, i.CC)(this);
          let { view: e, buffer: r, blockLen: o } = this,
            s = (t = (0, n.ZJ)(t)).length;
          for (let i = 0; i < s; ) {
            let a = Math.min(o - this.pos, s - i);
            if (a === o) {
              let e = (0, n.O8)(t);
              for (; o <= s - i; i += o) this.process(e, i);
              continue;
            }
            r.set(t.subarray(i, i + a), this.pos),
              (this.pos += a),
              (i += a),
              this.pos === o && (this.process(e, 0), (this.pos = 0));
          }
          return (this.length += t.length), this.roundClean(), this;
        }
        digestInto(t) {
          (0, i.CC)(this), (0, i.Ht)(t, this), (this.finished = !0);
          let { buffer: e, view: r, blockLen: o, isLE: s } = this,
            { pos: a } = this;
          (e[a++] = 128),
            this.buffer.subarray(a).fill(0),
            this.padOffset > o - a && (this.process(r, 0), (a = 0));
          for (let t = a; t < o; t++) e[t] = 0;
          !(function (t, e, r, i) {
            if ("function" == typeof t.setBigUint64)
              return t.setBigUint64(e, r, i);
            let n = BigInt(32),
              o = BigInt(0xffffffff),
              s = Number((r >> n) & o),
              a = Number(r & o),
              f = i ? 4 : 0,
              h = i ? 0 : 4;
            t.setUint32(e + f, s, i), t.setUint32(e + h, a, i);
          })(r, o - 8, BigInt(8 * this.length), s),
            this.process(r, 0);
          let f = (0, n.O8)(t),
            h = this.outputLen;
          if (h % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
          let u = h / 4,
            l = this.get();
          if (u > l.length) throw Error("_sha2: outputLen bigger than state");
          for (let t = 0; t < u; t++) f.setUint32(4 * t, l[t], s);
        }
        digest() {
          let { buffer: t, outputLen: e } = this;
          this.digestInto(t);
          let r = t.slice(0, e);
          return this.destroy(), r;
        }
        _cloneInto(t) {
          t || (t = new this.constructor()), t.set(...this.get());
          let {
            blockLen: e,
            buffer: r,
            length: i,
            finished: n,
            destroyed: o,
            pos: s,
          } = this;
          return (
            (t.length = i),
            (t.pos = s),
            (t.finished = n),
            (t.destroyed = o),
            i % e && t.buffer.set(r),
            t
          );
        }
      }
    },
    1510: (t, e, r) => {
      "use strict";
      r.d(e, {
        Vw: () => h,
        Id: () => f,
        O8: () => o,
        po: () => l,
        Ow: () => s,
        ZJ: () => a,
        ld: () => u,
      });
      let i =
        "object" == typeof globalThis && "crypto" in globalThis
          ? globalThis.crypto
          : void 0;
      var n = r(5493);
      let o = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
        s = (t, e) => (t << (32 - e)) | (t >>> e);
      function a(t) {
        return (
          "string" == typeof t &&
            (t = (function (t) {
              if ("string" != typeof t)
                throw Error("utf8ToBytes expected string, got " + typeof t);
              return new Uint8Array(new TextEncoder().encode(t));
            })(t)),
          (0, n.DO)(t),
          t
        );
      }
      function f(...t) {
        let e = 0;
        for (let r = 0; r < t.length; r++) {
          let i = t[r];
          (0, n.DO)(i), (e += i.length);
        }
        let r = new Uint8Array(e);
        for (let e = 0, i = 0; e < t.length; e++) {
          let n = t[e];
          r.set(n, i), (i += n.length);
        }
        return r;
      }
      class h {
        clone() {
          return this._cloneInto();
        }
      }
      function u(t) {
        let e = (e) => t().update(a(e)).digest(),
          r = t();
        return (
          (e.outputLen = r.outputLen),
          (e.blockLen = r.blockLen),
          (e.create = () => t()),
          e
        );
      }
      function l(t = 32) {
        if (i && "function" == typeof i.getRandomValues)
          return i.getRandomValues(new Uint8Array(t));
        if (i && "function" == typeof i.randomBytes) return i.randomBytes(t);
        throw Error("crypto.getRandomValues must be defined");
      }
    },
    9190: (t, e, r) => {
      "use strict";
      function i(t) {
        if (!Number.isSafeInteger(t) || t < 0)
          throw Error("positive integer expected, got " + t);
      }
      function n(t, ...e) {
        if (
          !(
            t instanceof Uint8Array ||
            (ArrayBuffer.isView(t) && "Uint8Array" === t.constructor.name)
          )
        )
          throw Error("Uint8Array expected");
        if (e.length > 0 && !e.includes(t.length))
          throw Error(
            "Uint8Array expected of length " + e + ", got length=" + t.length
          );
      }
      function o(t, e = !0) {
        if (t.destroyed) throw Error("Hash instance has been destroyed");
        if (e && t.finished)
          throw Error("Hash#digest() has already been called");
      }
      function s(t, e) {
        n(t);
        let r = e.outputLen;
        if (t.length < r)
          throw Error(
            "digestInto() expects output buffer of length at least " + r
          );
      }
      r.d(e, { CC: () => o, DO: () => n, Fe: () => i, Ht: () => s });
    },
    2467: (t, e, r) => {
      "use strict";
      r.d(e, { sc: () => c });
      var i = r(9190),
        n = r(4976);
      let o = (t, e, r) => (t & e) ^ (~t & r),
        s = (t, e, r) => (t & e) ^ (t & r) ^ (e & r);
      class a extends n.Vw {
        constructor(t, e, r, i) {
          super(),
            (this.blockLen = t),
            (this.outputLen = e),
            (this.padOffset = r),
            (this.isLE = i),
            (this.finished = !1),
            (this.length = 0),
            (this.pos = 0),
            (this.destroyed = !1),
            (this.buffer = new Uint8Array(t)),
            (this.view = (0, n.O8)(this.buffer));
        }
        update(t) {
          (0, i.CC)(this);
          let { view: e, buffer: r, blockLen: o } = this,
            s = (t = (0, n.ZJ)(t)).length;
          for (let i = 0; i < s; ) {
            let a = Math.min(o - this.pos, s - i);
            if (a === o) {
              let e = (0, n.O8)(t);
              for (; o <= s - i; i += o) this.process(e, i);
              continue;
            }
            r.set(t.subarray(i, i + a), this.pos),
              (this.pos += a),
              (i += a),
              this.pos === o && (this.process(e, 0), (this.pos = 0));
          }
          return (this.length += t.length), this.roundClean(), this;
        }
        digestInto(t) {
          (0, i.CC)(this), (0, i.Ht)(t, this), (this.finished = !0);
          let { buffer: e, view: r, blockLen: o, isLE: s } = this,
            { pos: a } = this;
          (e[a++] = 128),
            this.buffer.subarray(a).fill(0),
            this.padOffset > o - a && (this.process(r, 0), (a = 0));
          for (let t = a; t < o; t++) e[t] = 0;
          !(function (t, e, r, i) {
            if ("function" == typeof t.setBigUint64)
              return t.setBigUint64(e, r, i);
            let n = BigInt(32),
              o = BigInt(0xffffffff),
              s = Number((r >> n) & o),
              a = Number(r & o),
              f = i ? 4 : 0,
              h = i ? 0 : 4;
            t.setUint32(e + f, s, i), t.setUint32(e + h, a, i);
          })(r, o - 8, BigInt(8 * this.length), s),
            this.process(r, 0);
          let f = (0, n.O8)(t),
            h = this.outputLen;
          if (h % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
          let u = h / 4,
            l = this.get();
          if (u > l.length) throw Error("_sha2: outputLen bigger than state");
          for (let t = 0; t < u; t++) f.setUint32(4 * t, l[t], s);
        }
        digest() {
          let { buffer: t, outputLen: e } = this;
          this.digestInto(t);
          let r = t.slice(0, e);
          return this.destroy(), r;
        }
        _cloneInto(t) {
          t || (t = new this.constructor()), t.set(...this.get());
          let {
            blockLen: e,
            buffer: r,
            length: i,
            finished: n,
            destroyed: o,
            pos: s,
          } = this;
          return (
            (t.length = i),
            (t.pos = s),
            (t.finished = n),
            (t.destroyed = o),
            i % e && t.buffer.set(r),
            t
          );
        }
      }
      let f = new Uint32Array([
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
          0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
          0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
          0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc, 0x2de92c6f,
          0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d,
          0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x6ca6351, 0x14292967,
          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354,
          0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
          0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585,
          0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
          0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee,
          0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb,
          0xbef9a3f7, 0xc67178f2,
        ]),
        h = new Uint32Array([
          0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f,
          0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
        ]),
        u = new Uint32Array(64);
      class l extends a {
        constructor() {
          super(64, 32, 8, !1),
            (this.A = 0 | h[0]),
            (this.B = 0 | h[1]),
            (this.C = 0 | h[2]),
            (this.D = 0 | h[3]),
            (this.E = 0 | h[4]),
            (this.F = 0 | h[5]),
            (this.G = 0 | h[6]),
            (this.H = 0 | h[7]);
        }
        get() {
          let { A: t, B: e, C: r, D: i, E: n, F: o, G: s, H: a } = this;
          return [t, e, r, i, n, o, s, a];
        }
        set(t, e, r, i, n, o, s, a) {
          (this.A = 0 | t),
            (this.B = 0 | e),
            (this.C = 0 | r),
            (this.D = 0 | i),
            (this.E = 0 | n),
            (this.F = 0 | o),
            (this.G = 0 | s),
            (this.H = 0 | a);
        }
        process(t, e) {
          for (let r = 0; r < 16; r++, e += 4) u[r] = t.getUint32(e, !1);
          for (let t = 16; t < 64; t++) {
            let e = u[t - 15],
              r = u[t - 2],
              i = (0, n.Ow)(e, 7) ^ (0, n.Ow)(e, 18) ^ (e >>> 3),
              o = (0, n.Ow)(r, 17) ^ (0, n.Ow)(r, 19) ^ (r >>> 10);
            u[t] = (o + u[t - 7] + i + u[t - 16]) | 0;
          }
          let { A: r, B: i, C: a, D: h, E: l, F: c, G: d, H: p } = this;
          for (let t = 0; t < 64; t++) {
            let e =
                (p +
                  ((0, n.Ow)(l, 6) ^ (0, n.Ow)(l, 11) ^ (0, n.Ow)(l, 25)) +
                  o(l, c, d) +
                  f[t] +
                  u[t]) |
                0,
              m =
                (((0, n.Ow)(r, 2) ^ (0, n.Ow)(r, 13) ^ (0, n.Ow)(r, 22)) +
                  s(r, i, a)) |
                0;
            (p = d),
              (d = c),
              (c = l),
              (l = (h + e) | 0),
              (h = a),
              (a = i),
              (i = r),
              (r = (e + m) | 0);
          }
          (r = (r + this.A) | 0),
            (i = (i + this.B) | 0),
            (a = (a + this.C) | 0),
            (h = (h + this.D) | 0),
            (l = (l + this.E) | 0),
            (c = (c + this.F) | 0),
            (d = (d + this.G) | 0),
            (p = (p + this.H) | 0),
            this.set(r, i, a, h, l, c, d, p);
        }
        roundClean() {
          u.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
        }
      }
      let c = (0, n.ld)(() => new l());
    },
    3741: (t, e, r) => {
      "use strict";
      r.d(e, { lY: () => M });
      var i = r(9190);
      let n = BigInt(0x100000000 - 1),
        o = BigInt(32),
        s = (t, e, r) => (t << r) | (e >>> (32 - r)),
        a = (t, e, r) => (e << r) | (t >>> (32 - r)),
        f = (t, e, r) => (e << (r - 32)) | (t >>> (64 - r)),
        h = (t, e, r) => (t << (r - 32)) | (e >>> (64 - r));
      var u = r(4976);
      let l = [],
        c = [],
        d = [],
        p = BigInt(0),
        m = BigInt(1),
        y = BigInt(2),
        g = BigInt(7),
        w = BigInt(256),
        v = BigInt(113);
      for (let t = 0, e = m, r = 1, i = 0; t < 24; t++) {
        ([r, i] = [i, (2 * r + 3 * i) % 5]),
          l.push(2 * (5 * i + r)),
          c.push((((t + 1) * (t + 2)) / 2) % 64);
        let n = p;
        for (let t = 0; t < 7; t++)
          (e = ((e << m) ^ ((e >> g) * v)) % w) & y &&
            (n ^= m << ((m << BigInt(t)) - m));
        d.push(n);
      }
      let [b, E] = (function (t, e = !1) {
          let r = new Uint32Array(t.length),
            i = new Uint32Array(t.length);
          for (let s = 0; s < t.length; s++) {
            let { h: a, l: f } = (function (t, e = !1) {
              return e
                ? { h: Number(t & n), l: Number((t >> o) & n) }
                : { h: 0 | Number((t >> o) & n), l: 0 | Number(t & n) };
            })(t[s], e);
            [r[s], i[s]] = [a, f];
          }
          return [r, i];
        })(d, !0),
        x = (t, e, r) => (r > 32 ? f(t, e, r) : s(t, e, r)),
        A = (t, e, r) => (r > 32 ? h(t, e, r) : a(t, e, r));
      class _ extends u.Vw {
        constructor(t, e, r, n = !1, o = 24) {
          if (
            (super(),
            (this.blockLen = t),
            (this.suffix = e),
            (this.outputLen = r),
            (this.enableXOF = n),
            (this.rounds = o),
            (this.pos = 0),
            (this.posOut = 0),
            (this.finished = !1),
            (this.destroyed = !1),
            (0, i.Fe)(r),
            0 >= this.blockLen || this.blockLen >= 200)
          )
            throw Error("Sha3 supports only keccak-f1600 function");
          (this.state = new Uint8Array(200)),
            (this.state32 = (0, u.DH)(this.state));
        }
        keccak() {
          u.qv || (0, u.Fc)(this.state32),
            (function (t, e = 24) {
              let r = new Uint32Array(10);
              for (let i = 24 - e; i < 24; i++) {
                for (let e = 0; e < 10; e++)
                  r[e] = t[e] ^ t[e + 10] ^ t[e + 20] ^ t[e + 30] ^ t[e + 40];
                for (let e = 0; e < 10; e += 2) {
                  let i = (e + 8) % 10,
                    n = (e + 2) % 10,
                    o = r[n],
                    s = r[n + 1],
                    a = x(o, s, 1) ^ r[i],
                    f = A(o, s, 1) ^ r[i + 1];
                  for (let r = 0; r < 50; r += 10)
                    (t[e + r] ^= a), (t[e + r + 1] ^= f);
                }
                let e = t[2],
                  n = t[3];
                for (let r = 0; r < 24; r++) {
                  let i = c[r],
                    o = x(e, n, i),
                    s = A(e, n, i),
                    a = l[r];
                  (e = t[a]), (n = t[a + 1]), (t[a] = o), (t[a + 1] = s);
                }
                for (let e = 0; e < 50; e += 10) {
                  for (let i = 0; i < 10; i++) r[i] = t[e + i];
                  for (let i = 0; i < 10; i++)
                    t[e + i] ^= ~r[(i + 2) % 10] & r[(i + 4) % 10];
                }
                (t[0] ^= b[i]), (t[1] ^= E[i]);
              }
              r.fill(0);
            })(this.state32, this.rounds),
            u.qv || (0, u.Fc)(this.state32),
            (this.posOut = 0),
            (this.pos = 0);
        }
        update(t) {
          (0, i.CC)(this);
          let { blockLen: e, state: r } = this,
            n = (t = (0, u.ZJ)(t)).length;
          for (let i = 0; i < n; ) {
            let o = Math.min(e - this.pos, n - i);
            for (let e = 0; e < o; e++) r[this.pos++] ^= t[i++];
            this.pos === e && this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished) return;
          this.finished = !0;
          let { state: t, suffix: e, pos: r, blockLen: i } = this;
          (t[r] ^= e),
            (128 & e) != 0 && r === i - 1 && this.keccak(),
            (t[i - 1] ^= 128),
            this.keccak();
        }
        writeInto(t) {
          (0, i.CC)(this, !1), (0, i.DO)(t), this.finish();
          let e = this.state,
            { blockLen: r } = this;
          for (let i = 0, n = t.length; i < n; ) {
            this.posOut >= r && this.keccak();
            let o = Math.min(r - this.posOut, n - i);
            t.set(e.subarray(this.posOut, this.posOut + o), i),
              (this.posOut += o),
              (i += o);
          }
          return t;
        }
        xofInto(t) {
          if (!this.enableXOF)
            throw Error("XOF is not possible for this instance");
          return this.writeInto(t);
        }
        xof(t) {
          return (0, i.Fe)(t), this.xofInto(new Uint8Array(t));
        }
        digestInto(t) {
          if (((0, i.Ht)(t, this), this.finished))
            throw Error("digest() was already called");
          return this.writeInto(t), this.destroy(), t;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          (this.destroyed = !0), this.state.fill(0);
        }
        _cloneInto(t) {
          let {
            blockLen: e,
            suffix: r,
            outputLen: i,
            rounds: n,
            enableXOF: o,
          } = this;
          return (
            t || (t = new _(e, r, i, o, n)),
            t.state32.set(this.state32),
            (t.pos = this.pos),
            (t.posOut = this.posOut),
            (t.finished = this.finished),
            (t.rounds = n),
            (t.suffix = r),
            (t.outputLen = i),
            (t.enableXOF = o),
            (t.destroyed = this.destroyed),
            t
          );
        }
      }
      let M = (0, u.ld)(() => new _(136, 1, 32));
    },
    4976: (t, e, r) => {
      "use strict";
      r.d(e, {
        DH: () => n,
        Fc: () => h,
        O8: () => o,
        Ow: () => s,
        Vw: () => l,
        ZJ: () => u,
        ld: () => c,
        qv: () => a,
      });
      var i = r(9190);
      let n = (t) =>
          new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)),
        o = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
        s = (t, e) => (t << (32 - e)) | (t >>> e),
        a = 68 === new Uint8Array(new Uint32Array([0x11223344]).buffer)[0],
        f = (t) =>
          ((t << 24) & 0xff000000) |
          ((t << 8) & 0xff0000) |
          ((t >>> 8) & 65280) |
          ((t >>> 24) & 255);
      function h(t) {
        for (let e = 0; e < t.length; e++) t[e] = f(t[e]);
      }
      function u(t) {
        return (
          "string" == typeof t &&
            (t = (function (t) {
              if ("string" != typeof t)
                throw Error("utf8ToBytes expected string, got " + typeof t);
              return new Uint8Array(new TextEncoder().encode(t));
            })(t)),
          (0, i.DO)(t),
          t
        );
      }
      class l {
        clone() {
          return this._cloneInto();
        }
      }
      function c(t) {
        let e = (e) => t().update(u(e)).digest(),
          r = t();
        return (
          (e.outputLen = r.outputLen),
          (e.blockLen = r.blockLen),
          (e.create = () => t()),
          e
        );
      }
    },
    7959: (t, e, r) => {
      "use strict";
      r.d(e, { SZ: () => $ });
      var i = r(2643),
        n = r(6450),
        o = Object.defineProperty,
        s = (t, e, r) =>
          e in t
            ? o(t, e, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: r,
              })
            : (t[e] = r),
        a = (t, e, r) => s(t, "symbol" != typeof e ? e + "" : e, r);
      class f {
        constructor() {
          a(this, "subscriptions", {});
        }
        on(t) {
          let { event: e, handler: r } = t;
          this.subscriptions[e] || (this.subscriptions[e] = []),
            this.subscriptions[e].push(r);
        }
        off(t) {
          let { event: e, handler: r } = t;
          this.subscriptions[e] &&
            (this.subscriptions[e] = this.subscriptions[e].filter(
              (t) => t !== r
            ));
        }
        emit(t, e) {
          this.subscriptions[t] && this.subscriptions[t].forEach((t) => t(e));
        }
      }
      let h = "okxWidget";
      function u(t, e, r) {
        let i = { key: h, method: e, ...("object" == typeof r ? r : {}) };
        null == t || t.postMessage(i, "*");
      }
      function l(t, e, r) {
        let i = (t) => {
          var i;
          "object" == typeof (i = t.data) &&
            null !== i &&
            "key" in i &&
            "method" in i &&
            "string" == typeof i.key &&
            "string" == typeof i.method &&
            t.data.key === h &&
            t.data.method === e &&
            r(t.data);
        };
        return t.addEventListener("message", i), i;
      }
      function c(t, e, r) {
        t.removeEventListener("message", r);
      }
      function d(t, e) {
        t.removeEventListener("message", e);
      }
      var p = ((t) => (
          (t.ACTIVATE = "ACTIVATE"),
          (t.UPDATE_HEIGHT = "UPDATE_HEIGHT"),
          (t.SET_FULL_HEIGHT = "SET_FULL_HEIGHT"),
          (t.EMIT_OKX_EVENT = "EMIT_OKX_EVENT"),
          (t.PROVIDER_RPC_REQUEST = "PROVIDER_RPC_REQUEST"),
          (t.INTERCEPT_WINDOW_OPEN = "INTERCEPT_WINDOW_OPEN"),
          (t.LOAD_READY = "LOAD_READY"),
          t
        ))(p || {}),
        m = ((t) => (
          (t.UPDATE_PARAMS = "UPDATE_PARAMS"),
          (t.UPDATE_APP_DATA = "UPDATE_APP_DATA"),
          (t.PROVIDER_RPC_RESPONSE = "PROVIDER_RPC_RESPONSE"),
          (t.PROVIDER_ON_EVENT = "PROVIDER_ON_EVENT"),
          (t.PROVIDER_ON_EVENT_CONNECT = "PROVIDER_ON_EVENT_CONNECT"),
          (t.PROVIDER_ONEVENT_WALLET_SATUS = "PROVIDER_ONEVENT_WALLET_SATUS"),
          (t.PROVIDER_ONEVENT_WALLET_SOLANA_SATUS =
            "PROVIDER_ONEVENT_WALLET_SOLANA_SATUS"),
          (t.UPDATE_PROVIDER = "UPDATE_PROVIDER"),
          t
        ))(m || {}),
        y = ((t) => (
          (t.PROVIDER_ON_EVENT_CONNECT = "PROVIDER_ON_EVENT_CONNECT"),
          (t.PROVIDER_ON_EVENT = "PROVIDER_ON_EVENT"),
          (t.PROVIDER_ONEVENT_WALLET_SATUS = "PROVIDER_ONEVENT_WALLET_SATUS"),
          (t.NO_WALLET_CONNECT = "NO_WALLET_CONNECT"),
          t
        ))(y || {}),
        g = ((t) => (
          (t.SWAP = "swap"), (t.BRIDGE = "bridge"), (t.AUTO = "auto"), t
        ))(g || {}),
        w = ((t) => ((t.LIGHT = "light"), (t.DARK = "dark"), t))(w || {}),
        v = ((t) => (
          (t.EVM = "EVM"),
          (t.SOLANA = "SOLANA"),
          (t.WALLET_CONNECT = "WALLET_CONNECT"),
          t
        ))(v || {});
      class b {
        constructor(t, e = []) {
          a(this, "eventEmitter", new f()),
            a(this, "listeners", []),
            a(this, "widgetListener"),
            (this.contentWindow = t),
            this.updateListeners(e),
            (this.widgetListener = l(
              this.contentWindow,
              p.EMIT_OKX_EVENT,
              (t) => {
                let e = t.payload || (null == t ? void 0 : t.params);
                console.log("eventEmitter:", {
                  okxEvent: t,
                  event: t.event,
                  payload: e,
                }),
                  this.eventEmitter.emit(t.event, e);
              }
            ));
        }
        stopListeningIframe() {
          d(this.contentWindow, this.widgetListener);
        }
        updateListeners(t) {
          for (let t of this.listeners) this.eventEmitter.off(t);
          for (let e of ((this.listeners = t || []), this.listeners))
            this.eventEmitter.on(e);
        }
      }
      let E = (function (t) {
          return t &&
            t.__esModule &&
            Object.prototype.hasOwnProperty.call(t, "default")
            ? t.default
            : t;
        })(
          (function (t) {
            if (t.length >= 255) throw TypeError("Alphabet too long");
            for (var e = new Uint8Array(256), r = 0; r < e.length; r++)
              e[r] = 255;
            for (var i = 0; i < t.length; i++) {
              var n = t.charAt(i),
                o = n.charCodeAt(0);
              if (255 !== e[o]) throw TypeError(n + " is ambiguous");
              e[o] = i;
            }
            var s = t.length,
              a = t.charAt(0),
              f = Math.log(s) / Math.log(256),
              h = Math.log(256) / Math.log(s);
            function u(t) {
              if ("string" != typeof t) throw TypeError("Expected String");
              if (0 === t.length) return new Uint8Array();
              for (var r = 0, i = 0, n = 0; t[r] === a; ) i++, r++;
              for (
                var o = ((t.length - r) * f + 1) >>> 0, h = new Uint8Array(o);
                t[r];

              ) {
                var u = e[t.charCodeAt(r)];
                if (255 === u) return;
                for (
                  var l = 0, c = o - 1;
                  (0 !== u || l < n) && -1 !== c;
                  c--, l++
                )
                  (u += (s * h[c]) >>> 0),
                    (h[c] = u % 256 >>> 0),
                    (u = (u / 256) >>> 0);
                if (0 !== u) throw Error("Non-zero carry");
                (n = l), r++;
              }
              for (var d = o - n; d !== o && 0 === h[d]; ) d++;
              for (var p = new Uint8Array(i + (o - d)), m = i; d !== o; )
                p[m++] = h[d++];
              return p;
            }
            return {
              encode: function (e) {
                if (
                  (e instanceof Uint8Array ||
                    (ArrayBuffer.isView(e)
                      ? (e = new Uint8Array(
                          e.buffer,
                          e.byteOffset,
                          e.byteLength
                        ))
                      : Array.isArray(e) && (e = Uint8Array.from(e))),
                  !(e instanceof Uint8Array))
                )
                  throw TypeError("Expected Uint8Array");
                if (0 === e.length) return "";
                for (
                  var r = 0, i = 0, n = 0, o = e.length;
                  n !== o && 0 === e[n];

                )
                  n++, r++;
                for (
                  var f = ((o - n) * h + 1) >>> 0, u = new Uint8Array(f);
                  n !== o;

                ) {
                  for (
                    var l = e[n], c = 0, d = f - 1;
                    (0 !== l || c < i) && -1 !== d;
                    d--, c++
                  )
                    (l += (256 * u[d]) >>> 0),
                      (u[d] = l % s >>> 0),
                      (l = (l / s) >>> 0);
                  if (0 !== l) throw Error("Non-zero carry");
                  (i = c), n++;
                }
                for (var p = f - i; p !== f && 0 === u[p]; ) p++;
                for (var m = a.repeat(r); p < f; ++p) m += t.charAt(u[p]);
                return m;
              },
              decodeUnsafe: u,
              decode: function (t) {
                var e = u(t);
                if (e) return e;
                throw Error("Non-base" + s + " character");
              },
            };
          })("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
        ),
        x = {
          INVALID_FEE_CONFIG: "FeeConfig MUST be an object",
          INVALID_FEE_PERCENT: "FeePercent MUST be a number > 0 and <= 3",
          INVALID_TOKEN_PAIR: "Invalid tokenPair",
          INVALID_PROVIDER_TYPE: "Invalid providerType",
          INVALID_WIDGET_VERSION: "WIDGET_VERSION IS REQUIRED",
        },
        A = (t) => null !== t && "object" == typeof t && !Array.isArray(t),
        _ = (t) =>
          !Number.isNaN(Number(t)) &&
          null != t &&
          "" !== t &&
          !Array.isArray(t),
        M = (t) => _(t) && Number(t) > 0 && 3 >= Number(t),
        O = (t) =>
          A(t)
            ? Object.values(t).some((t) => {
                let e = null == t ? void 0 : t.feePercent;
                return A(null == t ? void 0 : t.referrerAddress)
                  ? !!A(null == t ? void 0 : t.referrerAddress) &&
                      !!Object.values(
                        null == t ? void 0 : t.referrerAddress
                      ).some((t) =>
                        _(t.feePercent)
                          ? !M(null == t ? void 0 : t.feePercent)
                          : !M(e)
                      )
                  : !M(e);
              })
              ? x.INVALID_FEE_PERCENT
              : null
            : x.INVALID_FEE_CONFIG,
        B = (t) =>
          ("string" == typeof t || "number" == typeof t) && Number(t) >= 0,
        I = (t) => {
          let e =
            B(null == t ? void 0 : t.fromChain) &&
            B(null == t ? void 0 : t.toChain);
          return (
            Number(null == t ? void 0 : t.fromChain) ===
              Number(null == t ? void 0 : t.toChain) && e
          );
        },
        T = (t) =>
          B(null == t ? void 0 : t.fromChain) &&
          B(null == t ? void 0 : t.toChain),
        N = ({
          widgetVersion: t,
          feeConfig: e = {},
          tokenPair: r,
          providerType: i,
        }) => {
          let n = L[i];
          if (!t) throw Error(x.INVALID_WIDGET_VERSION);
          if (i && !n) throw Error(x.INVALID_PROVIDER_TYPE);
          if (r && !T(r)) throw Error(x.INVALID_TOKEN_PAIR);
          let o = O(e);
          if (o) throw Error(o);
          return !0;
        };
      var R = { WIDGET_VERSION: "1" };
      let S = { SWAP: "web3/dex-widget", BRIDGE: "web3/dex-widget/bridge" },
        L = {
          [v.EVM]: "metamask",
          [v.SOLANA]: "phantom",
          [v.WALLET_CONNECT]: "walletconnect",
        },
        U = (t) => {
          let {
              baseUrl: e,
              feeConfig: r,
              tokenPair: i,
              providerType: n,
              tradeType: o,
              theme: s,
              lang: a,
              chainIds: f,
            } = t,
            h = R.WIDGET_VERSION;
          N({ widgetVersion: h, feeConfig: r, tokenPair: i, providerType: n });
          let { supportTradeType: u, route: l } = (function (t, e) {
              let r = [],
                i = "";
              return (
                t === g.SWAP
                  ? ((r = [g.SWAP]), (i = S.SWAP))
                  : t === g.BRIDGE
                  ? ((r = [g.BRIDGE]), (i = S.BRIDGE))
                  : ((r = [g.SWAP, g.BRIDGE]),
                    (i = !e || I(e) ? S.SWAP : S.BRIDGE)),
                { supportTradeType: r, route: i }
              );
            })(o, i),
            c = i
              ? {
                  inputChain: i.fromChain,
                  outputChain: i.toChain,
                  inputCurrency: i.fromToken,
                  outputCurrency: i.toToken,
                }
              : {},
            d = {
              tradeType: u,
              theme: s,
              lang: a,
              walletType: L[n],
              widgetVersion: h,
              chainIds: f,
            },
            p = { ...d, ...c },
            m = new URLSearchParams();
          for (let t in p)
            if (p.hasOwnProperty(t)) {
              let e = p[t];
              "" !== e && null != e && m.append(t, e);
            }
          let y = m.toString();
          return {
            url: `${
              "string" == typeof e ? e : "https://www.okx.com"
            }/${l}?${y}`,
            data: { ...d, tokenPair: c, feeConfig: r, providerType: n },
          };
        },
        P = (t, e) => {
          let r = null;
          return (
            e === v.EVM &&
              null != t &&
              t.chainId &&
              (r = parseInt(t.chainId, 16)),
            e === v.WALLET_CONNECT && null != t && t.chainId && (r = t.chainId),
            e === v.SOLANA && (r = 501),
            r
          );
        },
        C = (t, e) => {
          var r;
          return (e === v.EVM || e === v.WALLET_CONNECT) &&
            null != t &&
            t.chainId
            ? e === v.EVM
              ? t.selectedAddress
              : t.accounts[0]
            : e === v.SOLANA
            ? null == (r = null == t ? void 0 : t.publicKey)
              ? void 0
              : r.toBase58()
            : null;
        },
        k = class t {
          constructor() {
            a(this, "messageQueue"), (this.messageQueue = new Map());
          }
          static getInstance() {
            return t.instance || (t.instance = new t()), t.instance;
          }
          getMessageQueue() {
            return this.messageQueue;
          }
          handlePostMessage(t, e, r, i) {
            if (
              (console.log(
                "handlePostMessage:",
                this.messageQueue.has(t),
                t,
                e,
                r
              ),
              this.messageQueue.has(t))
            ) {
              console.log(`Message with id ${t} has already been sent.`);
              return;
            }
            i.postMessage(e, "*"),
              this.messageQueue.size > 100 && this.messageQueue.clear(),
              this.messageQueue.set(t, !0);
          }
          reset() {
            this.messageQueue.clear();
          }
        };
      a(k, "instance");
      let D = [
          "connect",
          "disconnect",
          "close",
          "chainChanged",
          "accountsChanged",
        ],
        z = ["connect", "disconnect", "accountChanged"];
      class H {
        constructor(t, e) {
          a(this, "ethereumProvider", null),
            a(this, "requestWaitingForConnection", {}),
            a(this, "listener"),
            a(this, "connectListener"),
            a(this, "isAllowAtomicForward", !1),
            a(this, "providerType"),
            a(this, "processConnectEvent", async (t) => {
              console.log("processConnectEvent connect", t);
              let {
                id: e,
                mode: r,
                params: i,
                path: n,
                type: o,
              } = t || {
                params: null,
                mode: null,
                id: null,
                path: null,
                type: null,
              };
              try {
                if (!this.ethereumProvider || "iframe" === r)
                  throw Error("No Provider");
                let { method: t, params: s } = i[0] || { method: null };
                if (
                  (console.log("_requestArgs:", s),
                  "solana" === o && window && this.ethereumProvider)
                ) {
                  let r = this.ethereumProvider;
                  if (!(r && null != r && r.connect))
                    throw Error("Not solana provider");
                  "connect" === t &&
                    (null == r ||
                      r
                        .connect()
                        .then((t) => {
                          let r = t.publicKey;
                          this.forwardProviderEventToIframeConnect({
                            id: e,
                            mode: "iframe",
                            data: r.toBase58(),
                            path: n,
                            type: o,
                            success: !0,
                          });
                        })
                        .catch((t) => {
                          console.error(
                            "\x1b[41m\x1b[37mError:\x1b[0m\x1b[0m",
                            t
                          ),
                            this.forwardProviderEventToIframeConnect({
                              id: e,
                              mode: "iframe",
                              error: JSON.stringify(t),
                              path: n,
                              type: o,
                              success: !1,
                            });
                        }));
                }
              } catch (t) {
                console.log("connect error:", t),
                  this.forwardProviderEventToIframeConnect({
                    id: e,
                    mode: "iframe",
                    error: JSON.stringify(t),
                    path: n,
                    type: o,
                    success: !1,
                  });
              }
            }),
            a(this, "prcessProviderEventFromWindow", async (t) => {
              var e, r, o, s, a, f, h;
              console.log("prcessProviderEventFromWindow", t);
              let {
                id: u,
                mode: l,
                params: c,
                path: d,
                type: p,
              } = t || {
                params: null,
                mode: null,
                id: null,
                path: null,
                type: null,
              };
              try {
                if (!this.ethereumProvider || "iframe" === l)
                  throw Error("No Provider");
                let { method: t, params: m } = c[0] || { method: null };
                if (
                  (["wallet_switchEthereumChain"].includes(t) &&
                    (this.isAllowAtomicForward = !0),
                  console.log(
                    `\x1b[44m\x1b[37mPath: ${d}\x1b[0m\x1b[0m\x1b[42m\x1b[30mType: ${p} \x1b[0m\x1b[0m \x1b[43m\x1b[30mMethod: ${t} \x1b[0m\x1b[0m`
                  ),
                  k.getInstance().getMessageQueue().has(u))
                )
                  return;
                if (
                  (k.getInstance().getMessageQueue().set(u, !0),
                  "solana" === p && window && this.ethereumProvider)
                ) {
                  let n = this.ethereumProvider,
                    f = null == n ? void 0 : n.publicKey;
                  if (!(n && null != n && n.connect)) return;
                  if (!f) {
                    let t = await (null == n ? void 0 : n.connect());
                    console.log("pbk:", t.publicKey.toBase58());
                  }
                  if ("connect" === t)
                    null == n ||
                      n
                        .connect()
                        .then((t) => {
                          let e = t.publicKey;
                          this.forwardProviderEventToIframe({
                            id: u,
                            mode: "iframe",
                            data: e.toBase58(),
                            path: d,
                            type: p,
                            success: !0,
                          });
                        })
                        .catch((t) => {
                          console.error(
                            "\x1b[41m\x1b[37mError:\x1b[0m\x1b[0m",
                            t
                          ),
                            this.forwardProviderEventToIframe({
                              id: u,
                              mode: "iframe",
                              error: JSON.stringify(t),
                              path: d,
                              type: p,
                              success: !1,
                            });
                        });
                  else {
                    console.log("\x1b[46m\x1b[30mRequest Params:\x1b[0m", m);
                    let f = Array.isArray(m) ? m : [m];
                    if ((null == f ? void 0 : f.length) <= 0)
                      throw Error("No args");
                    let h = f[0],
                      l = null == (e = f[0]) ? void 0 : e.onlyIfTrusted,
                      c = null == (r = f[0]) ? void 0 : r.okxArgs,
                      y = null == (o = f[0]) ? void 0 : o.transaction,
                      g = null == (s = f[0]) ? void 0 : s.type;
                    if (l) {
                      this.forwardProviderEventToIframe({
                        id: u,
                        mode: "iframe",
                        data: { onlyIfTrusted: !0 },
                        path: d,
                        type: p,
                        success: !0,
                      });
                      return;
                    }
                    if ("string" == typeof h)
                      try {
                        let t = i.ZX.from(E.decode(h));
                        console.log("deserializeTransaction:", t), (f[0] = t);
                      } catch {
                        let t = i.Kt.deserialize(E.decode(h));
                        console.log("new version deserializeTransaction:", t),
                          (f[0] = t);
                      }
                    if (c && g && y) {
                      let t = i.Kt.deserialize(E.decode(y)),
                        e = null == (a = f[0]) ? void 0 : a.options;
                      (f[0] = t), (f[1] = e), (f[2] = c);
                    }
                    console.log("solana transaction solanaTransactionArgs:", f),
                      n[t](...f)
                        .then((t) => {
                          console.log("solana request:", t),
                            this.forwardProviderEventToIframe({
                              id: u,
                              mode: "iframe",
                              data: t,
                              path: d,
                              type: p,
                              success: !0,
                            });
                        })
                        .catch((t) => {
                          console.error(
                            "\x1b[41m\x1b[37mError:\x1b[0m\x1b[0m",
                            t
                          ),
                            this.forwardProviderEventToIframe({
                              id: u,
                              mode: "iframe",
                              error: JSON.stringify(t),
                              path: d,
                              type: p,
                              success: !1,
                            }),
                            console.log("sent error msg");
                        });
                  }
                  return;
                }
                let y = { method: t, id: Number(u), params: m };
                if (
                  (console.log("\x1b[46m\x1b[30mRequest Params:\x1b[0m", y),
                  this.ethereumProvider.selectedAddress ||
                    (null ==
                    (h =
                      null == (f = this.ethereumProvider) ? void 0 : f.accounts)
                      ? void 0
                      : h[0]) ||
                    (await this.ethereumProvider.request({
                      method: "eth_requestAccounts",
                      id: Date.now(),
                      params: [],
                    })),
                  "eth_sendTransaction" === t)
                ) {
                  try {
                    new n(this.ethereumProvider).eth.sendTransaction(
                      y.params[0],
                      (t, e) => {
                        this.forwardProviderEventToIframe({
                          id: u,
                          mode: "iframe",
                          data: e,
                          error: t && JSON.stringify(t),
                          path: d,
                          type: p,
                          success: !!t,
                        });
                      }
                    );
                  } catch (t) {
                    this.forwardProviderEventToIframe({
                      id: u,
                      mode: "iframe",
                      error: t && JSON.stringify(t),
                      path: d,
                      type: p,
                      success: !1,
                    });
                  }
                  return;
                }
                let g = this.ethereumProvider.request(y);
                console.log(
                  "ethereumProvider.request:",
                  g,
                  y,
                  this.ethereumProvider
                ),
                  g
                    .then((t) => {
                      console.log("ethereumProvider.request then:", t),
                        this.forwardProviderEventToIframe({
                          id: u,
                          mode: "iframe",
                          data: t,
                          path: d,
                          type: p,
                          success: !0,
                        });
                    })
                    .catch((t) => {
                      console.error("Request Error:", t),
                        this.forwardProviderEventToIframe({
                          id: u,
                          mode: "iframe",
                          error: JSON.stringify(t),
                          path: d,
                          type: p,
                          success: !1,
                        });
                    });
              } catch (t) {
                console.error("\x1b[45m\x1b[37mError:\x1b[0m\x1b[0m", t),
                  this.forwardProviderEventToIframe({
                    id: u,
                    mode: "iframe",
                    error: JSON.stringify(t),
                    path: d,
                    type: p,
                    success: !1,
                  });
              }
            }),
            (this.iframeWindow = t),
            (this.providerType = e);
        }
        disconnect() {
          (this.ethereumProvider = null),
            c(window, y.PROVIDER_ON_EVENT, this.listener),
            c(window, y.PROVIDER_ON_EVENT_CONNECT, this.connectListener);
        }
        onConnect(t) {
          this.ethereumProvider
            ? this.disconnect()
            : (console.log("onConnect====>"),
              (this.listener = l(
                window,
                y.PROVIDER_ON_EVENT,
                this.prcessProviderEventFromWindow
              )),
              (this.connectListener = l(
                window,
                y.PROVIDER_ON_EVENT_CONNECT,
                this.processConnectEvent
              ))),
            (this.ethereumProvider = t),
            this.listenerProviderEvent(t);
        }
        listenerProviderEvent(t) {
          var e;
          if (
            (null == (e = null == t ? void 0 : t.removeAllListeners) ||
              e.call(t),
            this.providerType === v.SOLANA)
          ) {
            z.forEach((e) => {
              t.on(e, (t) => this.onSolanaProviderEvent(e, t));
            });
            return;
          }
          this.providerType === v.EVM &&
            D.forEach((e) => {
              t.on(e, (t) => this.onProviderEvent(e, t));
            });
        }
        onSolanaProviderEvent(t, e) {
          if (
            (console.log(
              "on solana Provider Event:",
              t,
              e,
              this.isAllowAtomicForward
            ),
            this.isAllowAtomicForward)
          )
            return;
          let r = null == e ? void 0 : e.toBase58();
          console.log("onSolanaProviderEvent====>"),
            u(this.iframeWindow, m.PROVIDER_ONEVENT_WALLET_SOLANA_SATUS, {
              event: t,
              params: { address: r, chainId: 501, walletType: L.SOLANA },
            });
        }
        onProviderEvent(t, e) {
          console.log("on Provider Event:", t, e, this.isAllowAtomicForward),
            this.isAllowAtomicForward ||
              u(this.iframeWindow, m.PROVIDER_ONEVENT_WALLET_SATUS, {
                event: t,
                params: e,
              });
        }
        forwardRpcResponseToIframe(t) {
          u(this.iframeWindow, m.PROVIDER_RPC_RESPONSE, t);
        }
        forwardProviderEventToIframe(t) {
          u(this.iframeWindow, m.PROVIDER_ON_EVENT, t);
        }
        forwardProviderEventToIframeConnect(t) {
          u(this.iframeWindow, m.PROVIDER_ON_EVENT_CONNECT, t);
        }
      }
      let V = "487.5px",
        q = (function () {
          let t = Date.now().toString();
          return function () {
            return {
              id: t,
              defaultClassName: `default-widget-iframe-${t}`,
              specifiedClassName: `specified-widget-iframe-${t}`,
            };
          };
        })();
      function j(t, { defaultClassName: e, specifiedClassName: r, width: i }) {
        (t.innerHTML = ""),
          (t.innerHTML = `
        .${e} {
            width: 450px;
            min-height: ${V};
            border: none;
        }
        @media (max-width: 767px) {
            .${e} {
                width: 100%;
            }
        }
        .${r} {
            width: ${i}px;
            min-height: ${V};
            border: none;
        }
    `);
      }
      function F(t) {
        let { id: e, defaultClassName: r, specifiedClassName: i } = q(),
          n = document.getElementById(e);
        if (n)
          return (
            j(n, { defaultClassName: r, specifiedClassName: i, width: t }), n
          );
        let o = document.createElement("style");
        return (
          j(o, { defaultClassName: r, specifiedClassName: i, width: t }),
          (o.id = e),
          document.head.appendChild(o),
          o
        );
      }
      function W(t, e) {
        let r = Number(e),
          { defaultClassName: i, specifiedClassName: n } = q();
        void 0 === e
          ? (F(450), (t.className = i))
          : (F(r < 375 ? 375 : r), (t.className = n));
      }
      function $(t, e) {
        console.log("createOkxSwapWidget====>", t, e);
        let { params: r, provider: i, listeners: n } = e,
          o = i,
          { data: s, url: a } = U(r),
          f = (function (t, e) {
            let { width: r } = t,
              i = document.createElement("iframe");
            return (
              (i.src = e),
              W(i, r),
              (i.scrolling = "no"),
              (i.style.border = "none"),
              i
            );
          })(r, a);
        (t.innerHTML = ""), t.appendChild(f);
        let { contentWindow: h } = f;
        if (!h)
          throw (
            (console.error("Iframe does not contain a window", f),
            Error("Iframe does not contain a window!"))
          );
        let u = [];
        u.push(
          ...(function (t, e = V) {
            return [
              l(window, p.UPDATE_HEIGHT, (r) => {
                t.style.height = r.height ? `${r.height}px` : e;
              }),
              l(window, p.SET_FULL_HEIGHT, ({ isUpToSmall: r }) => {
                t.style.height = r ? e : `${document.body.offsetHeight}px`;
              }),
            ];
          })(f, r.height),
          (function (t, e) {
            let r = l(window, p.LOAD_READY, () => {
              Y(t, e), d(window, r);
            });
            return r;
          })(h, s)
        );
        let c = new b(window, n),
          m = G(h, null, o, r.providerType);
        return (
          f.addEventListener("load", () => {
            if (
              (console.log("updateProvider====>load", o, r),
              Y(h, s),
              o && s.providerType)
            ) {
              let t = Z(o, s.providerType);
              console.log("updateProvider load", t, o), K(h, t, o);
            }
          }),
          {
            updateParams: (t) => {
              let { width: e, lang: i, theme: n } = t;
              W(f, e), Y(h, (s = U({ ...r, lang: i, theme: n }).data));
            },
            updateListeners: (t) => c.updateListeners(t),
            updateProvider: async (t, e) => {
              var r;
              console.log("updateProvider =====>", t, e),
                null == m || m.disconnect(),
                null == (r = null == o ? void 0 : o.removeAllListeners) ||
                  r.call(o);
              let i = Z((o = t), e);
              (s = { ...s, ...i }),
                console.log("updateProvider ===> Params", {
                  updateProviderParams: i,
                  currentParams: s,
                }),
                (m = G(h, m, t, e)),
                K(h, i, o);
            },
            destroy: () => {
              null == m || m.disconnect(),
                c.stopListeningIframe(),
                u.forEach((t) => window.removeEventListener("message", t));
              try {
                t.removeChild(f);
              } catch (t) {
                console.error(
                  "Error removing iframe, maybe iframe is removed",
                  t
                );
              }
              (function () {
                let { id: t } = q(),
                  e = document.getElementById(t);
                e && e.parentNode.removeChild(e);
              })();
            },
          }
        );
      }
      function G(t, e, r, i) {
        if (!r) return;
        if (!Object.values(v).includes(i))
          throw Error("providerType is required");
        console.log("updateProvider iframeRpcProviderBridge===>", e),
          e && e.disconnect();
        let n = new H(t, i);
        return r && n.onConnect(r), n;
      }
      function Z(t, e) {
        return {
          providerType: e,
          walletType: L[e],
          chainId: P(t, e),
          address: C(t, e),
        };
      }
      function K(t, e, r) {
        console.log("updateProviderEmitEvent", e, t),
          u(t, m.UPDATE_PROVIDER, { appParams: e, hasProvider: !!r });
      }
      function Y(t, e) {
        u(t, m.UPDATE_PARAMS, { appParams: e });
      }
      var X = ((t) => (
          (t.SWAP_ETH_FLOW_SENT_TX = "SWAP_ETH_FLOW_SENT_TX"),
          (t.ORDER_CREATED = "ORDER_CREATED"),
          (t.SWAP_SIGNING_ERROR = "SWAP_SIGNING_ERROR"),
          (t.ORDER_FULFILLED = "ORDER_FULFILLED"),
          (t.ORDER_CANCELLED = "ORDER_CANCELLED"),
          (t.ORDER_EXPIRED = "ORDER_EXPIRED"),
          (t.ORDER_PRESIGNED = "ORDER_PRESIGNED"),
          (t.ONCHAIN_TRANSACTION_MINED = "ONCHAIN_TRANSACTION_MINED"),
          (t.ONCHAIN_TRANSACTION_FAILED = "ONCHAIN_TRANSACTION_FAILED"),
          t
        ))(X || {}),
        J = ((t) => (
          (t.ON_TOAST_MESSAGE = "ON_TOAST_MESSAGE"),
          (t.ON_POSTED_ORDER = "ON_POSTED_ORDER"),
          (t.ON_FULFILLED_ORDER = "ON_FULFILLED_ORDER"),
          (t.ON_CANCELLED_ORDER = "ON_CANCELLED_ORDER"),
          (t.ON_EXPIRED_ORDER = "ON_EXPIRED_ORDER"),
          (t.ON_PRESIGNED_ORDER = "ON_PRESIGNED_ORDER"),
          (t.ON_ONCHAIN_TRANSACTION = "ON_ONCHAIN_TRANSACTION"),
          (t.ON_CHANGE_TRADE_PARAMS = "ON_CHANGE_TRADE_PARAMS"),
          (t.NO_WALLET_CONNECT = "NO_WALLET_CONNECT"),
          (t.ON_CONNECT_WALLET = "ON_CONNECT_WALLET"),
          (t.ON_TOKEN_CHANGE = "ON_TOKEN_CHANGE"),
          t
        ))(J || {}),
        Q = ((t) => ((t.BUY = "buy"), (t.SELL = "sell"), t))(Q || {}),
        tt = ((t) => (
          (t[(t.MAINNET = 1)] = "MAINNET"),
          (t[(t.GNOSIS_CHAIN = 100)] = "GNOSIS_CHAIN"),
          (t[(t.ARBITRUM_ONE = 42161)] = "ARBITRUM_ONE"),
          (t[(t.SEPOLIA = 0xaa36a7)] = "SEPOLIA"),
          t
        ))(tt || {});
    },
    6655: (t, e, r) => {
      "use strict";
      r.d(e, { vE: () => f, kb: () => s });
      var i = r(8287),
        n = r(228),
        o = class extends n {
          socket;
          constructor(t, e, r) {
            super(),
              (this.socket = new window.WebSocket(t, r)),
              (this.socket.onopen = () => this.emit("open")),
              (this.socket.onmessage = (t) => this.emit("message", t.data)),
              (this.socket.onerror = (t) => this.emit("error", t)),
              (this.socket.onclose = (t) => {
                this.emit("close", t.code, t.reason);
              });
          }
          send(t, e, r) {
            let i = r || e;
            try {
              this.socket.send(t), i();
            } catch (t) {
              i(t);
            }
          }
          close(t, e) {
            this.socket.close(t, e);
          }
          addEventListener(t, e, r) {
            this.socket.addEventListener(t, e, r);
          }
        };
      function s(t, e) {
        return new o(t, e);
      }
      var a = class {
          encode(t) {
            return JSON.stringify(t);
          }
          decode(t) {
            return JSON.parse(t);
          }
        },
        f = class extends n {
          address;
          rpc_id;
          queue;
          options;
          autoconnect;
          ready;
          reconnect;
          reconnect_timer_id;
          reconnect_interval;
          max_reconnects;
          rest_options;
          current_reconnects;
          generate_request_id;
          socket;
          webSocketFactory;
          dataPack;
          constructor(
            t,
            e = "ws://localhost:8080",
            {
              autoconnect: r = !0,
              reconnect: i = !0,
              reconnect_interval: n = 1e3,
              max_reconnects: o = 5,
              ...s
            } = {},
            f,
            h
          ) {
            super(),
              (this.webSocketFactory = t),
              (this.queue = {}),
              (this.rpc_id = 0),
              (this.address = e),
              (this.autoconnect = r),
              (this.ready = !1),
              (this.reconnect = i),
              (this.reconnect_timer_id = void 0),
              (this.reconnect_interval = n),
              (this.max_reconnects = o),
              (this.rest_options = s),
              (this.current_reconnects = 0),
              (this.generate_request_id = f || (() => ++this.rpc_id)),
              h ? (this.dataPack = h) : (this.dataPack = new a()),
              this.autoconnect &&
                this._connect(this.address, {
                  autoconnect: this.autoconnect,
                  reconnect: this.reconnect,
                  reconnect_interval: this.reconnect_interval,
                  max_reconnects: this.max_reconnects,
                  ...this.rest_options,
                });
          }
          connect() {
            this.socket ||
              this._connect(this.address, {
                autoconnect: this.autoconnect,
                reconnect: this.reconnect,
                reconnect_interval: this.reconnect_interval,
                max_reconnects: this.max_reconnects,
                ...this.rest_options,
              });
          }
          call(t, e, r, i) {
            return (
              i || "object" != typeof r || ((i = r), (r = null)),
              new Promise((n, o) => {
                if (!this.ready) return o(Error("socket not ready"));
                let s = this.generate_request_id(t, e);
                this.socket.send(
                  this.dataPack.encode({
                    jsonrpc: "2.0",
                    method: t,
                    params: e || void 0,
                    id: s,
                  }),
                  i,
                  (t) => {
                    if (t) return o(t);
                    (this.queue[s] = { promise: [n, o] }),
                      r &&
                        (this.queue[s].timeout = setTimeout(() => {
                          delete this.queue[s], o(Error("reply timeout"));
                        }, r));
                  }
                );
              })
            );
          }
          async login(t) {
            let e = await this.call("rpc.login", t);
            if (!e) throw Error("authentication failed");
            return e;
          }
          async listMethods() {
            return await this.call("__listMethods");
          }
          notify(t, e) {
            return new Promise((r, i) => {
              if (!this.ready) return i(Error("socket not ready"));
              this.socket.send(
                this.dataPack.encode({ jsonrpc: "2.0", method: t, params: e }),
                (t) => {
                  if (t) return i(t);
                  r();
                }
              );
            });
          }
          async subscribe(t) {
            "string" == typeof t && (t = [t]);
            let e = await this.call("rpc.on", t);
            if ("string" == typeof t && "ok" !== e[t])
              throw Error(
                "Failed subscribing to an event '" + t + "' with: " + e[t]
              );
            return e;
          }
          async unsubscribe(t) {
            "string" == typeof t && (t = [t]);
            let e = await this.call("rpc.off", t);
            if ("string" == typeof t && "ok" !== e[t])
              throw Error("Failed unsubscribing from an event with: " + e);
            return e;
          }
          close(t, e) {
            this.socket.close(t || 1e3, e);
          }
          setAutoReconnect(t) {
            this.reconnect = t;
          }
          setReconnectInterval(t) {
            this.reconnect_interval = t;
          }
          setMaxReconnects(t) {
            this.max_reconnects = t;
          }
          _connect(t, e) {
            clearTimeout(this.reconnect_timer_id),
              (this.socket = this.webSocketFactory(t, e)),
              this.socket.addEventListener("open", () => {
                (this.ready = !0),
                  this.emit("open"),
                  (this.current_reconnects = 0);
              }),
              this.socket.addEventListener("message", ({ data: t }) => {
                t instanceof ArrayBuffer && (t = i.Buffer.from(t).toString());
                try {
                  t = this.dataPack.decode(t);
                } catch (t) {
                  return;
                }
                if (t.notification && this.listeners(t.notification).length) {
                  if (!Object.keys(t.params).length)
                    return this.emit(t.notification);
                  let e = [t.notification];
                  if (t.params.constructor === Object) e.push(t.params);
                  else
                    for (let r = 0; r < t.params.length; r++)
                      e.push(t.params[r]);
                  return Promise.resolve().then(() => {
                    this.emit.apply(this, e);
                  });
                }
                if (!this.queue[t.id])
                  return t.method
                    ? Promise.resolve().then(() => {
                        this.emit(t.method, t?.params);
                      })
                    : void 0;
                "error" in t == "result" in t &&
                  this.queue[t.id].promise[1](
                    Error(
                      'Server response malformed. Response must include either "result" or "error", but not both.'
                    )
                  ),
                  this.queue[t.id].timeout &&
                    clearTimeout(this.queue[t.id].timeout),
                  t.error
                    ? this.queue[t.id].promise[1](t.error)
                    : this.queue[t.id].promise[0](t.result),
                  delete this.queue[t.id];
              }),
              this.socket.addEventListener("error", (t) =>
                this.emit("error", t)
              ),
              this.socket.addEventListener(
                "close",
                ({ code: r, reason: i }) => {
                  this.ready && setTimeout(() => this.emit("close", r, i), 0),
                    (this.ready = !1),
                    (this.socket = void 0),
                    1e3 !== r &&
                      (this.current_reconnects++,
                      this.reconnect &&
                        (this.max_reconnects > this.current_reconnects ||
                          0 === this.max_reconnects) &&
                        (this.reconnect_timer_id = setTimeout(
                          () => this._connect(t, e),
                          this.reconnect_interval
                        )));
                }
              );
          }
        };
    },
    2150: (t, e, r) => {
      "use strict";
      r.d(e, {
        KC: () => M,
        KJ: () => y,
        L5: () => O,
        NW: () => _,
        PV: () => A,
        YO: () => p,
        Yj: () => x,
        ai: () => v,
        au: () => B,
        bz: () => d,
        eu: () => g,
        g1: () => E,
        lq: () => b,
        me: () => w,
        vt: () => u,
        zM: () => m,
      });
      class i extends TypeError {
        constructor(t, e) {
          let r;
          let { message: i, explanation: n, ...o } = t,
            { path: s } = t,
            a = 0 === s.length ? i : `At path: ${s.join(".")} -- ${i}`;
          super(n ?? a),
            null != n && (this.cause = a),
            Object.assign(this, o),
            (this.name = this.constructor.name),
            (this.failures = () => r ?? (r = [t, ...e()]));
        }
      }
      function n(t) {
        return "object" == typeof t && null != t;
      }
      function o(t) {
        return n(t) && !Array.isArray(t);
      }
      function s(t) {
        return "symbol" == typeof t
          ? t.toString()
          : "string" == typeof t
          ? JSON.stringify(t)
          : `${t}`;
      }
      function* a(t, e, r, i) {
        var o;
        for (let a of ((n((o = t)) &&
          "function" == typeof o[Symbol.iterator]) ||
          (t = [t]),
        t)) {
          let t = (function (t, e, r, i) {
            if (!0 === t) return;
            !1 === t ? (t = {}) : "string" == typeof t && (t = { message: t });
            let { path: n, branch: o } = e,
              { type: a } = r,
              {
                refinement: f,
                message: h = `Expected a value of type \`${a}\`${
                  f ? ` with refinement \`${f}\`` : ""
                }, but received: \`${s(i)}\``,
              } = t;
            return {
              value: i,
              type: a,
              refinement: f,
              key: n[n.length - 1],
              path: n,
              branch: o,
              ...t,
              message: h,
            };
          })(a, e, r, i);
          t && (yield t);
        }
      }
      function* f(t, e, r = {}) {
        let { path: i = [], branch: o = [t], coerce: s = !1, mask: a = !1 } = r,
          h = { path: i, branch: o, mask: a };
        s && (t = e.coercer(t, h));
        let u = "valid";
        for (let i of e.validator(t, h))
          (i.explanation = r.message), (u = "not_valid"), yield [i, void 0];
        for (let [l, c, d] of e.entries(t, h))
          for (let e of f(c, d, {
            path: void 0 === l ? i : [...i, l],
            branch: void 0 === l ? o : [...o, c],
            coerce: s,
            mask: a,
            message: r.message,
          }))
            e[0]
              ? ((u = null != e[0].refinement ? "not_refined" : "not_valid"),
                yield [e[0], void 0])
              : s &&
                ((c = e[1]),
                void 0 === l
                  ? (t = c)
                  : t instanceof Map
                  ? t.set(l, c)
                  : t instanceof Set
                  ? t.add(c)
                  : n(t) && (void 0 !== c || l in t) && (t[l] = c));
        if ("not_valid" !== u)
          for (let i of e.refiner(t, h))
            (i.explanation = r.message), (u = "not_refined"), yield [i, void 0];
        "valid" === u && (yield [void 0, t]);
      }
      class h {
        constructor(t) {
          let {
            type: e,
            schema: r,
            validator: i,
            refiner: n,
            coercer: o = (t) => t,
            entries: s = function* () {},
          } = t;
          (this.type = e),
            (this.schema = r),
            (this.entries = s),
            (this.coercer = o),
            i
              ? (this.validator = (t, e) => a(i(t, e), e, this, t))
              : (this.validator = () => []),
            n
              ? (this.refiner = (t, e) => a(n(t, e), e, this, t))
              : (this.refiner = () => []);
        }
        assert(t, e) {
          return (function (t, e, r) {
            let i = l(t, e, { message: r });
            if (i[0]) throw i[0];
          })(t, this, e);
        }
        create(t, e) {
          return u(t, this, e);
        }
        is(t) {
          return !l(t, this)[0];
        }
        mask(t, e) {
          return (function (t, e, r) {
            let i = l(t, e, { coerce: !0, mask: !0, message: r });
            if (!i[0]) return i[1];
            throw i[0];
          })(t, this, e);
        }
        validate(t, e = {}) {
          return l(t, this, e);
        }
      }
      function u(t, e, r) {
        let i = l(t, e, { coerce: !0, message: r });
        if (!i[0]) return i[1];
        throw i[0];
      }
      function l(t, e, r = {}) {
        let n = f(t, e, r),
          o = (function (t) {
            let { done: e, value: r } = t.next();
            return e ? void 0 : r;
          })(n);
        return o[0]
          ? [
              new i(o[0], function* () {
                for (let t of n) t[0] && (yield t[0]);
              }),
              void 0,
            ]
          : [void 0, o[1]];
      }
      function c(t, e) {
        return new h({ type: t, schema: null, validator: e });
      }
      function d() {
        return c("any", () => !0);
      }
      function p(t) {
        return new h({
          type: "array",
          schema: t,
          *entries(e) {
            if (t && Array.isArray(e))
              for (let [r, i] of e.entries()) yield [r, i, t];
          },
          coercer: (t) => (Array.isArray(t) ? t.slice() : t),
          validator: (t) =>
            Array.isArray(t) ||
            `Expected an array value, but received: ${s(t)}`,
        });
      }
      function m() {
        return c("boolean", (t) => "boolean" == typeof t);
      }
      function y(t) {
        return c(
          "instance",
          (e) =>
            e instanceof t ||
            `Expected a \`${t.name}\` instance, but received: ${s(e)}`
        );
      }
      function g(t) {
        let e = s(t),
          r = typeof t;
        return new h({
          type: "literal",
          schema:
            "string" === r || "number" === r || "boolean" === r ? t : null,
          validator: (r) =>
            r === t || `Expected the literal \`${e}\`, but received: ${s(r)}`,
        });
      }
      function w(t) {
        return new h({
          ...t,
          validator: (e, r) => null === e || t.validator(e, r),
          refiner: (e, r) => null === e || t.refiner(e, r),
        });
      }
      function v() {
        return c(
          "number",
          (t) =>
            ("number" == typeof t && !isNaN(t)) ||
            `Expected a number, but received: ${s(t)}`
        );
      }
      function b(t) {
        return new h({
          ...t,
          validator: (e, r) => void 0 === e || t.validator(e, r),
          refiner: (e, r) => void 0 === e || t.refiner(e, r),
        });
      }
      function E(t, e) {
        return new h({
          type: "record",
          schema: null,
          *entries(r) {
            if (n(r))
              for (let i in r) {
                let n = r[i];
                yield [i, i, t], yield [i, n, e];
              }
          },
          validator: (t) => o(t) || `Expected an object, but received: ${s(t)}`,
          coercer: (t) => (o(t) ? { ...t } : t),
        });
      }
      function x() {
        return c(
          "string",
          (t) =>
            "string" == typeof t || `Expected a string, but received: ${s(t)}`
        );
      }
      function A(t) {
        let e = c("never", () => !1);
        return new h({
          type: "tuple",
          schema: null,
          *entries(r) {
            if (Array.isArray(r)) {
              let i = Math.max(t.length, r.length);
              for (let n = 0; n < i; n++) yield [n, r[n], t[n] || e];
            }
          },
          validator: (t) =>
            Array.isArray(t) || `Expected an array, but received: ${s(t)}`,
          coercer: (t) => (Array.isArray(t) ? t.slice() : t),
        });
      }
      function _(t) {
        let e = Object.keys(t);
        return new h({
          type: "type",
          schema: t,
          *entries(r) {
            if (n(r)) for (let i of e) yield [i, r[i], t[i]];
          },
          validator: (t) => o(t) || `Expected an object, but received: ${s(t)}`,
          coercer: (t) => (o(t) ? { ...t } : t),
        });
      }
      function M(t) {
        let e = t.map((t) => t.type).join(" | ");
        return new h({
          type: "union",
          schema: null,
          coercer(e, r) {
            for (let i of t) {
              let [t, n] = i.validate(e, { coerce: !0, mask: r.mask });
              if (!t) return n;
            }
            return e;
          },
          validator(r, i) {
            let n = [];
            for (let e of t) {
              let [...t] = f(r, e, i),
                [o] = t;
              if (!o[0]) return [];
              for (let [e] of t) e && n.push(e);
            }
            return [
              `Expected the value to satisfy a union of \`${e}\`, but received: ${s(
                r
              )}`,
              ...n,
            ];
          },
        });
      }
      function O() {
        return c("unknown", () => !0);
      }
      function B(t, e, r) {
        return new h({
          ...t,
          coercer: (i, n) =>
            l(i, e)[0] ? t.coercer(i, n) : t.coercer(r(i, n), n),
        });
      }
    },
  },
]);
