var an = Object.defineProperty,
  sn = Object.defineProperties;
var on = Object.getOwnPropertyDescriptors;
var cr = Object.getOwnPropertySymbols;
var ln = Object.prototype.hasOwnProperty,
  un = Object.prototype.propertyIsEnumerable;
var fr = (e, t, r) =>
    t in e
      ? an(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  Ht = (e, t) => {
    for (var r in t || (t = {})) ln.call(t, r) && fr(e, r, t[r]);
    if (cr) for (var r of cr(t)) un.call(t, r) && fr(e, r, t[r]);
    return e;
  },
  le = (e, t) => sn(e, on(t));
import {
  S as mt,
  i as bt,
  s as wt,
  C as pt,
  e as C,
  t as Z,
  c as j,
  a as A,
  h as tt,
  d as y,
  V as hr,
  R as Re,
  g as B,
  G as b,
  j as Lt,
  z as Se,
  E as ot,
  W as dr,
  X as jt,
  k as F,
  m as M,
  b as _,
  K as It,
  L as Nt,
  Y as zt,
  Z as Ar,
  w as ct,
  x as ft,
  y as ht,
  H as Tt,
  n as ge,
  o as K,
  p as me,
  q as J,
  B as dt,
  _ as Cr,
  I as Ae,
  $ as cn,
  F as jr,
  l as Ce,
  a0 as Dt,
  a1 as Zt,
  U as tr,
  N as fn,
} from '../../chunks/index-85439ac7.js';
import { T as Dr } from '../../chunks/TrainingInfo-ff5fbf6e.js';
import { w as hn, r as dn } from '../../chunks/index-d5338481.js';
import { a as Pr } from '../../chunks/audio-03895b51.js';
function vn(e) {
  let t,
    r,
    n,
    i = [e[1], { class: (n = `title ${e[1].class}`) }],
    a = {};
  for (let s = 0; s < i.length; s += 1) a = pt(a, i[s]);
  return {
    c() {
      (t = C('h2')), (r = Z(e[0])), this.h();
    },
    l(s) {
      t = j(s, 'H2', { class: !0 });
      var o = A(t);
      (r = tt(o, e[0])), o.forEach(y), this.h();
    },
    h() {
      hr(t, a), Re(t, 'svelte-10oo0e8', !0);
    },
    m(s, o) {
      B(s, t, o), b(t, r);
    },
    p(s, [o]) {
      o & 1 && Lt(r, s[0]),
        hr(
          t,
          (a = Se(i, [
            o & 2 && s[1],
            o & 2 && n !== (n = `title ${s[1].class}`) && { class: n },
          ])),
        ),
        Re(t, 'svelte-10oo0e8', !0);
    },
    i: ot,
    o: ot,
    d(s) {
      s && y(t);
    },
  };
}
function pn(e, t, r) {
  const n = ['title'];
  let i = dr(t, n),
    { title: a } = t;
  return (
    (e.$$set = (s) => {
      (t = pt(pt({}, t), jt(s))),
        r(1, (i = dr(t, n))),
        'title' in s && r(0, (a = s.title));
    }),
    [a, i]
  );
}
class Fe extends mt {
  constructor(t) {
    super(), bt(this, t, pn, vn, wt, { title: 0 });
  }
}
function yn(e) {
  let t, r, n, i, a, s, o, u;
  return {
    c() {
      (t = C('div')),
        (r = C('header')),
        (n = C('h2')),
        (i = Z('Qualquer c\xE1rdio')),
        (a = F()),
        (s = C('p')),
        (o = Z(e[0])),
        (u = Z(' min')),
        this.h();
    },
    l(l) {
      t = j(l, 'DIV', { class: !0 });
      var f = A(t);
      r = j(f, 'HEADER', { class: !0 });
      var h = A(r);
      n = j(h, 'H2', { class: !0 });
      var c = A(n);
      (i = tt(c, 'Qualquer c\xE1rdio')),
        c.forEach(y),
        h.forEach(y),
        (a = M(f)),
        (s = j(f, 'P', { class: !0 }));
      var d = A(s);
      (o = tt(d, e[0])),
        (u = tt(d, ' min')),
        d.forEach(y),
        f.forEach(y),
        this.h();
    },
    h() {
      _(n, 'class', 'text-base font-semibold'),
        _(r, 'class', 'flex'),
        _(s, 'class', 'text-sm'),
        _(t, 'class', 'pb-2 space-y-2');
    },
    m(l, f) {
      B(l, t, f), b(t, r), b(r, n), b(n, i), b(t, a), b(t, s), b(s, o), b(s, u);
    },
    p(l, [f]) {
      f & 1 && Lt(o, l[0]);
    },
    i: ot,
    o: ot,
    d(l) {
      l && y(t);
    },
  };
}
function gn(e, t, r) {
  let { cardioTime: n } = t;
  return (
    (e.$$set = (i) => {
      'cardioTime' in i && r(0, (n = i.cardioTime));
    }),
    [n]
  );
}
class mn extends mt {
  constructor(t) {
    super(), bt(this, t, gn, yn, wt, { cardioTime: 0 });
  }
}
const Ut = hn({
    state: 'closed',
    currentTraining: null,
    trainingList: new Map(),
    currentTabActive: 'clock',
  }),
  Lr = {
    addTraining: (e) => {
      Ut.update((t) => (t.trainingList.set(e._key, e), t));
    },
    open(e) {
      Ut.update((t) => {
        const r = t.trainingList.get(e);
        return le(Ht({}, t), { state: 'open', currentTraining: r });
      });
    },
    close() {
      Ut.update((e) => le(Ht({}, e), { state: 'closed' }));
    },
    setCurrentTab(e) {
      Ut.update((t) => le(Ht({}, t), { currentTabActive: e }));
    },
  };
function bn(e) {
  let t,
    r,
    n = [
      { xmlns: 'http://www.w3.org/2000/svg' },
      { width: e[0] },
      { height: e[1] },
      { viewBox: '0 0 20 20' },
      { fill: 'currentColor' },
      e[2],
    ],
    i = {};
  for (let a = 0; a < n.length; a += 1) i = pt(i, n[a]);
  return {
    c() {
      (t = It('svg')), (r = It('path')), this.h();
    },
    l(a) {
      t = Nt(a, 'svg', {
        xmlns: !0,
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
      });
      var s = A(t);
      (r = Nt(s, 'path', { 'fill-rule': !0, d: !0, 'clip-rule': !0 })),
        A(r).forEach(y),
        s.forEach(y),
        this.h();
    },
    h() {
      _(r, 'fill-rule', 'evenodd'),
        _(
          r,
          'd',
          'M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z',
        ),
        _(r, 'clip-rule', 'evenodd'),
        zt(t, i);
    },
    m(a, s) {
      B(a, t, s), b(t, r);
    },
    p(a, [s]) {
      zt(
        t,
        (i = Se(n, [
          { xmlns: 'http://www.w3.org/2000/svg' },
          s & 1 && { width: a[0] },
          s & 2 && { height: a[1] },
          { viewBox: '0 0 20 20' },
          { fill: 'currentColor' },
          s & 4 && a[2],
        ])),
      );
    },
    i: ot,
    o: ot,
    d(a) {
      a && y(t);
    },
  };
}
function wn(e, t, r) {
  let { size: n = '20px' } = t,
    { width: i = n } = t,
    { height: a = n } = t;
  return (
    (e.$$set = (s) => {
      r(2, (t = pt(pt({}, t), jt(s)))),
        'size' in s && r(3, (n = s.size)),
        'width' in s && r(0, (i = s.width)),
        'height' in s && r(1, (a = s.height));
    }),
    (t = jt(t)),
    [i, a, t, n]
  );
}
class Sn extends mt {
  constructor(t) {
    super(), bt(this, t, wn, bn, wt, { size: 3, width: 0, height: 1 });
  }
}
function _n(e) {
  let t,
    r,
    n = [
      { xmlns: 'http://www.w3.org/2000/svg' },
      { width: e[0] },
      { height: e[1] },
      { viewBox: '0 0 20 20' },
      { fill: 'currentColor' },
      e[2],
    ],
    i = {};
  for (let a = 0; a < n.length; a += 1) i = pt(i, n[a]);
  return {
    c() {
      (t = It('svg')), (r = It('path')), this.h();
    },
    l(a) {
      t = Nt(a, 'svg', {
        xmlns: !0,
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
      });
      var s = A(t);
      (r = Nt(s, 'path', { 'fill-rule': !0, d: !0, 'clip-rule': !0 })),
        A(r).forEach(y),
        s.forEach(y),
        this.h();
    },
    h() {
      _(r, 'fill-rule', 'evenodd'),
        _(
          r,
          'd',
          'M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z',
        ),
        _(r, 'clip-rule', 'evenodd'),
        zt(t, i);
    },
    m(a, s) {
      B(a, t, s), b(t, r);
    },
    p(a, [s]) {
      zt(
        t,
        (i = Se(n, [
          { xmlns: 'http://www.w3.org/2000/svg' },
          s & 1 && { width: a[0] },
          s & 2 && { height: a[1] },
          { viewBox: '0 0 20 20' },
          { fill: 'currentColor' },
          s & 4 && a[2],
        ])),
      );
    },
    i: ot,
    o: ot,
    d(a) {
      a && y(t);
    },
  };
}
function En(e, t, r) {
  let { size: n = '20px' } = t,
    { width: i = n } = t,
    { height: a = n } = t;
  return (
    (e.$$set = (s) => {
      r(2, (t = pt(pt({}, t), jt(s)))),
        'size' in s && r(3, (n = s.size)),
        'width' in s && r(0, (i = s.width)),
        'height' in s && r(1, (a = s.height));
    }),
    (t = jt(t)),
    [i, a, t, n]
  );
}
class xn extends mt {
  constructor(t) {
    super(), bt(this, t, En, _n, wt, { size: 3, width: 0, height: 1 });
  }
}
function vr(e) {
  const t = Math.floor(e / 60),
    r = t < 10 ? `0${t}` : t,
    n = e % 60,
    i = n < 10 ? `0${n}` : n;
  return `${r}:${i}`;
}
function Tn(e) {
  let t,
    r,
    n = [
      { xmlns: 'http://www.w3.org/2000/svg' },
      { width: e[0] },
      { height: e[1] },
      { viewBox: '0 0 20 20' },
      { fill: 'currentColor' },
      e[2],
    ],
    i = {};
  for (let a = 0; a < n.length; a += 1) i = pt(i, n[a]);
  return {
    c() {
      (t = It('svg')), (r = It('path')), this.h();
    },
    l(a) {
      t = Nt(a, 'svg', {
        xmlns: !0,
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
      });
      var s = A(t);
      (r = Nt(s, 'path', { d: !0 })), A(r).forEach(y), s.forEach(y), this.h();
    },
    h() {
      _(
        r,
        'd',
        'M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z',
      ),
        zt(t, i);
    },
    m(a, s) {
      B(a, t, s), b(t, r);
    },
    p(a, [s]) {
      zt(
        t,
        (i = Se(n, [
          { xmlns: 'http://www.w3.org/2000/svg' },
          s & 1 && { width: a[0] },
          s & 2 && { height: a[1] },
          { viewBox: '0 0 20 20' },
          { fill: 'currentColor' },
          s & 4 && a[2],
        ])),
      );
    },
    i: ot,
    o: ot,
    d(a) {
      a && y(t);
    },
  };
}
function kn(e, t, r) {
  let { size: n = '20px' } = t,
    { width: i = n } = t,
    { height: a = n } = t;
  return (
    (e.$$set = (s) => {
      r(2, (t = pt(pt({}, t), jt(s)))),
        'size' in s && r(3, (n = s.size)),
        'width' in s && r(0, (i = s.width)),
        'height' in s && r(1, (a = s.height));
    }),
    (t = jt(t)),
    [i, a, t, n]
  );
}
class On extends mt {
  constructor(t) {
    super(), bt(this, t, kn, Tn, wt, { size: 3, width: 0, height: 1 });
  }
}
function In(e) {
  let t,
    r,
    n = [
      { xmlns: 'http://www.w3.org/2000/svg' },
      { width: e[0] },
      { height: e[1] },
      { viewBox: '0 0 20 20' },
      { fill: 'currentColor' },
      e[2],
    ],
    i = {};
  for (let a = 0; a < n.length; a += 1) i = pt(i, n[a]);
  return {
    c() {
      (t = It('svg')), (r = It('path')), this.h();
    },
    l(a) {
      t = Nt(a, 'svg', {
        xmlns: !0,
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
      });
      var s = A(t);
      (r = Nt(s, 'path', { d: !0 })), A(r).forEach(y), s.forEach(y), this.h();
    },
    h() {
      _(
        r,
        'd',
        'M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z',
      ),
        zt(t, i);
    },
    m(a, s) {
      B(a, t, s), b(t, r);
    },
    p(a, [s]) {
      zt(
        t,
        (i = Se(n, [
          { xmlns: 'http://www.w3.org/2000/svg' },
          s & 1 && { width: a[0] },
          s & 2 && { height: a[1] },
          { viewBox: '0 0 20 20' },
          { fill: 'currentColor' },
          s & 4 && a[2],
        ])),
      );
    },
    i: ot,
    o: ot,
    d(a) {
      a && y(t);
    },
  };
}
function Nn(e, t, r) {
  let { size: n = '20px' } = t,
    { width: i = n } = t,
    { height: a = n } = t;
  return (
    (e.$$set = (s) => {
      r(2, (t = pt(pt({}, t), jt(s)))),
        'size' in s && r(3, (n = s.size)),
        'width' in s && r(0, (i = s.width)),
        'height' in s && r(1, (a = s.height));
    }),
    (t = jt(t)),
    [i, a, t, n]
  );
}
class Rn extends mt {
  constructor(t) {
    super(), bt(this, t, Nn, In, wt, { size: 3, width: 0, height: 1 });
  }
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var T =
  function () {
    return (
      (T =
        Object.assign ||
        function (t) {
          for (var r, n = 1, i = arguments.length; n < i; n++) {
            r = arguments[n];
            for (var a in r)
              Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
          }
          return t;
        }),
      T.apply(this, arguments)
    );
  };
function er(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) &&
      t.indexOf(n) < 0 &&
      (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
      t.indexOf(n[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
        (r[n[i]] = e[n[i]]);
  return r;
}
function U(e) {
  var t = typeof Symbol == 'function' && Symbol.iterator,
    r = t && e[t],
    n = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == 'number')
    return {
      next: function () {
        return (
          e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
  );
}
function G(e, t) {
  var r = typeof Symbol == 'function' && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e),
    i,
    a = [],
    s;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; ) a.push(i.value);
  } catch (o) {
    s = { error: o };
  } finally {
    try {
      i && !i.done && (r = n.return) && r.call(n);
    } finally {
      if (s) throw s.error;
    }
  }
  return a;
}
function it(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, i = t.length, a; n < i; n++)
      (a || !(n in t)) &&
        (a || (a = Array.prototype.slice.call(t, 0, n)), (a[n] = t[n]));
  return e.concat(a || Array.prototype.slice.call(t));
}
var X;
(function (e) {
  (e.Start = 'xstate.start'),
    (e.Stop = 'xstate.stop'),
    (e.Raise = 'xstate.raise'),
    (e.Send = 'xstate.send'),
    (e.Cancel = 'xstate.cancel'),
    (e.NullEvent = ''),
    (e.Assign = 'xstate.assign'),
    (e.After = 'xstate.after'),
    (e.DoneState = 'done.state'),
    (e.DoneInvoke = 'done.invoke'),
    (e.Log = 'xstate.log'),
    (e.Init = 'xstate.init'),
    (e.Invoke = 'xstate.invoke'),
    (e.ErrorExecution = 'error.execution'),
    (e.ErrorCommunication = 'error.communication'),
    (e.ErrorPlatform = 'error.platform'),
    (e.ErrorCustom = 'xstate.error'),
    (e.Update = 'xstate.update'),
    (e.Pure = 'xstate.pure'),
    (e.Choose = 'xstate.choose');
})(X || (X = {}));
var be;
(function (e) {
  (e.Parent = '#_parent'), (e.Internal = '#_internal');
})(be || (be = {}));
var We = X.Start,
  rr = X.Stop,
  Me = X.Raise,
  $e = X.Send,
  zr = X.Cancel,
  An = X.NullEvent,
  He = X.Assign;
X.After;
X.DoneState;
var Br = X.Log,
  Cn = X.Init,
  Ge = X.Invoke;
X.ErrorExecution;
var pr = X.ErrorPlatform,
  jn = X.ErrorCustom,
  Fr = X.Update,
  Dn = X.Choose,
  Pn = X.Pure,
  Mr = '.',
  yr = {},
  Je = 'xstate.guard',
  Ln = '',
  ue = !0,
  _e;
function nr(e, t, r) {
  r === void 0 && (r = Mr);
  var n = ve(e, r),
    i = ve(t, r);
  return H(i)
    ? H(n)
      ? i === n
      : !1
    : H(n)
    ? n in i
    : Object.keys(n).every(function (a) {
        return a in i ? nr(n[a], i[a]) : !1;
      });
}
function $r(e) {
  try {
    return H(e) || typeof e == 'number' ? ''.concat(e) : e.type;
  } catch {
    throw new Error(
      'Events must be strings or objects with a string event.type property.',
    );
  }
}
function qe(e, t) {
  try {
    return ee(e) ? e : e.toString().split(t);
  } catch {
    throw new Error("'".concat(e, "' is not a valid state path."));
  }
}
function zn(e) {
  return (
    typeof e == 'object' &&
    'value' in e &&
    'context' in e &&
    'event' in e &&
    '_event' in e
  );
}
function ve(e, t) {
  if (zn(e)) return e.value;
  if (ee(e)) return je(e);
  if (typeof e != 'string') return e;
  var r = qe(e, t);
  return je(r);
}
function je(e) {
  if (e.length === 1) return e[0];
  for (var t = {}, r = t, n = 0; n < e.length - 1; n++)
    n === e.length - 2 ? (r[e[n]] = e[n + 1]) : ((r[e[n]] = {}), (r = r[e[n]]));
  return t;
}
function fe(e, t) {
  for (var r = {}, n = Object.keys(e), i = 0; i < n.length; i++) {
    var a = n[i];
    r[a] = t(e[a], a, e, i);
  }
  return r;
}
function gr(e, t, r) {
  var n,
    i,
    a = {};
  try {
    for (var s = U(Object.keys(e)), o = s.next(); !o.done; o = s.next()) {
      var u = o.value,
        l = e[u];
      !r(l) || (a[u] = t(l, u, e));
    }
  } catch (f) {
    n = { error: f };
  } finally {
    try {
      o && !o.done && (i = s.return) && i.call(s);
    } finally {
      if (n) throw n.error;
    }
  }
  return a;
}
var Bn = function (e) {
  return function (t) {
    var r,
      n,
      i = t;
    try {
      for (var a = U(e), s = a.next(); !s.done; s = a.next()) {
        var o = s.value;
        i = i[o];
      }
    } catch (u) {
      r = { error: u };
    } finally {
      try {
        s && !s.done && (n = a.return) && n.call(a);
      } finally {
        if (r) throw r.error;
      }
    }
    return i;
  };
};
function Fn(e, t) {
  return function (r) {
    var n,
      i,
      a = r;
    try {
      for (var s = U(e), o = s.next(); !o.done; o = s.next()) {
        var u = o.value;
        a = a[t][u];
      }
    } catch (l) {
      n = { error: l };
    } finally {
      try {
        o && !o.done && (i = s.return) && i.call(s);
      } finally {
        if (n) throw n.error;
      }
    }
    return a;
  };
}
function Oe(e) {
  if (!e) return [[]];
  if (H(e)) return [[e]];
  var t = et(
    Object.keys(e).map(function (r) {
      var n = e[r];
      return typeof n != 'string' && (!n || !Object.keys(n).length)
        ? [[r]]
        : Oe(e[r]).map(function (i) {
            return [r].concat(i);
          });
    }),
  );
  return t;
}
function et(e) {
  var t;
  return (t = []).concat.apply(t, it([], G(e), !1));
}
function Ur(e) {
  return ee(e) ? e : [e];
}
function xt(e) {
  return e === void 0 ? [] : Ur(e);
}
function De(e, t, r) {
  var n, i;
  if (Y(e)) return e(t, r.data);
  var a = {};
  try {
    for (var s = U(Object.keys(e)), o = s.next(); !o.done; o = s.next()) {
      var u = o.value,
        l = e[u];
      Y(l) ? (a[u] = l(t, r.data)) : (a[u] = l);
    }
  } catch (f) {
    n = { error: f };
  } finally {
    try {
      o && !o.done && (i = s.return) && i.call(s);
    } finally {
      if (n) throw n.error;
    }
  }
  return a;
}
function Mn(e) {
  return /^(done|error)\./.test(e);
}
function mr(e) {
  return !!(
    e instanceof Promise ||
    (e !== null && (Y(e) || typeof e == 'object') && Y(e.then))
  );
}
function $n(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    'transition' in e &&
    typeof e.transition == 'function'
  );
}
function Vr(e, t) {
  var r,
    n,
    i = G([[], []], 2),
    a = i[0],
    s = i[1];
  try {
    for (var o = U(e), u = o.next(); !u.done; u = o.next()) {
      var l = u.value;
      t(l) ? a.push(l) : s.push(l);
    }
  } catch (f) {
    r = { error: f };
  } finally {
    try {
      u && !u.done && (n = o.return) && n.call(o);
    } finally {
      if (r) throw r.error;
    }
  }
  return [a, s];
}
function Wr(e, t) {
  return fe(e.states, function (r, n) {
    if (!!r) {
      var i = (H(t) ? void 0 : t[n]) || (r ? r.current : void 0);
      if (!!i) return { current: i, states: Wr(r, i) };
    }
  });
}
function Un(e, t) {
  return { current: t, states: Wr(e, t) };
}
function br(e, t, r, n) {
  var i =
    e &&
    r.reduce(function (a, s) {
      var o,
        u,
        l = s.assignment,
        f = { state: n, action: s, _event: t },
        h = {};
      if (Y(l)) h = l(a, t.data, f);
      else
        try {
          for (var c = U(Object.keys(l)), d = c.next(); !d.done; d = c.next()) {
            var v = d.value,
              g = l[v];
            h[v] = Y(g) ? g(a, t.data, f) : g;
          }
        } catch (w) {
          o = { error: w };
        } finally {
          try {
            d && !d.done && (u = c.return) && u.call(c);
          } finally {
            if (o) throw o.error;
          }
        }
      return Object.assign({}, a, h);
    }, e);
  return i;
}
var pe = function () {};
function ee(e) {
  return Array.isArray(e);
}
function Y(e) {
  return typeof e == 'function';
}
function H(e) {
  return typeof e == 'string';
}
function Hr(e, t) {
  if (!!e)
    return H(e)
      ? { type: Je, name: e, predicate: t ? t[e] : void 0 }
      : Y(e)
      ? { type: Je, name: e.name, predicate: e }
      : e;
}
function Vn(e) {
  try {
    return 'subscribe' in e && Y(e.subscribe);
  } catch {
    return !1;
  }
}
var Pt = (function () {
  return (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
})();
(_e = {}),
  (_e[Pt] = function () {
    return this;
  }),
  (_e[Symbol.observable] = function () {
    return this;
  });
function Vt(e) {
  return !!e && '__xstatenode' in e;
}
function Wn(e) {
  return !!e && typeof e.send == 'function';
}
function ir(e, t) {
  return H(e) || typeof e == 'number' ? T({ type: e }, t) : e;
}
function ut(e, t) {
  if (!H(e) && '$$type' in e && e.$$type === 'scxml') return e;
  var r = ir(e);
  return T({ name: r.type, data: r, $$type: 'scxml', type: 'external' }, t);
}
function Gt(e, t) {
  var r = Ur(t).map(function (n) {
    return typeof n == 'undefined' || typeof n == 'string' || Vt(n)
      ? { target: n, event: e }
      : T(T({}, n), { event: e });
  });
  return r;
}
function Hn(e) {
  if (!(e === void 0 || e === Ln)) return xt(e);
}
function Gr(e, t, r, n, i) {
  var a = e.options.guards,
    s = { state: i, cond: t, _event: n };
  if (t.type === Je)
    return ((a == null ? void 0 : a[t.name]) || t.predicate)(r, n.data, s);
  var o = a == null ? void 0 : a[t.type];
  if (!o)
    throw new Error(
      "Guard '"
        .concat(t.type, "' is not implemented on machine '")
        .concat(e.id, "'."),
    );
  return o(r, n.data, s);
}
function Jr(e) {
  return typeof e == 'string' ? { type: e } : e;
}
function Ye(e, t, r) {
  if (typeof e == 'object') return e;
  var n = function () {};
  return { next: e, error: t || n, complete: r || n };
}
function Ee(e, t) {
  return ''.concat(e, ':invocation[').concat(t, ']');
}
var Pe = ut({ type: Cn });
function Xe(e, t) {
  return (t && t[e]) || void 0;
}
function we(e, t) {
  var r;
  if (H(e) || typeof e == 'number') {
    var n = Xe(e, t);
    Y(n)
      ? (r = { type: e, exec: n })
      : n
      ? (r = n)
      : (r = { type: e, exec: void 0 });
  } else if (Y(e)) r = { type: e.name || e.toString(), exec: e };
  else {
    var n = Xe(e.type, t);
    if (Y(n)) r = T(T({}, e), { exec: n });
    else if (n) {
      var i = n.type || e.type;
      r = T(T(T({}, n), e), { type: i });
    } else r = e;
  }
  return r;
}
var Le = function (e, t) {
  if (!e) return [];
  var r = ee(e) ? e : [e];
  return r.map(function (n) {
    return we(n, t);
  });
};
function ar(e) {
  var t = we(e);
  return T(T({ id: H(e) ? e : t.id }, t), { type: t.type });
}
function Gn(e) {
  return H(e) ? { type: Me, event: e } : qr(e, { to: be.Internal });
}
function Jn(e) {
  return { type: Me, _event: ut(e.event) };
}
function qr(e, t) {
  return {
    to: t ? t.to : void 0,
    type: $e,
    event: Y(e) ? e : ir(e),
    delay: t ? t.delay : void 0,
    id: t && t.id !== void 0 ? t.id : Y(e) ? e.name : $r(e),
  };
}
function qn(e, t, r, n) {
  var i = { _event: r },
    a = ut(Y(e.event) ? e.event(t, r.data, i) : e.event),
    s;
  if (H(e.delay)) {
    var o = n && n[e.delay];
    s = Y(o) ? o(t, r.data, i) : o;
  } else s = Y(e.delay) ? e.delay(t, r.data, i) : e.delay;
  var u = Y(e.to) ? e.to(t, r.data, i) : e.to;
  return T(T({}, e), { to: u, _event: a, event: a.data, delay: s });
}
var Yn = function (e, t, r) {
    return T(T({}, e), {
      value: H(e.expr) ? e.expr : e.expr(t, r.data, { _event: r }),
    });
  },
  Xn = function (e) {
    return { type: zr, sendId: e };
  };
function Kn(e) {
  var t = ar(e);
  return { type: X.Start, activity: t, exec: void 0 };
}
function Qn(e) {
  var t = Y(e) ? e : ar(e);
  return { type: X.Stop, activity: t, exec: void 0 };
}
function Zn(e, t, r) {
  var n = Y(e.activity) ? e.activity(t, r.data) : e.activity,
    i = typeof n == 'string' ? { id: n } : n,
    a = { type: X.Stop, activity: i };
  return a;
}
var ti = function (e) {
  return { type: He, assignment: e };
};
function ei(e, t) {
  var r = t ? '#'.concat(t) : '';
  return ''.concat(X.After, '(').concat(e, ')').concat(r);
}
function xe(e, t) {
  var r = ''.concat(X.DoneState, '.').concat(e),
    n = { type: r, data: t };
  return (
    (n.toString = function () {
      return r;
    }),
    n
  );
}
function Ie(e, t) {
  var r = ''.concat(X.DoneInvoke, '.').concat(e),
    n = { type: r, data: t };
  return (
    (n.toString = function () {
      return r;
    }),
    n
  );
}
function he(e, t) {
  var r = ''.concat(X.ErrorPlatform, '.').concat(e),
    n = { type: r, data: t };
  return (
    (n.toString = function () {
      return r;
    }),
    n
  );
}
function Ke(e, t, r, n, i, a) {
  a === void 0 && (a = !1);
  var s = G(
      a
        ? [[], i]
        : Vr(i, function (c) {
            return c.type === He;
          }),
      2,
    ),
    o = s[0],
    u = s[1],
    l = o.length ? br(r, n, o, t) : r,
    f = a ? [r] : void 0,
    h = et(
      u
        .map(function (c) {
          var d;
          switch (c.type) {
            case Me:
              return Jn(c);
            case $e:
              var v = qn(c, l, n, e.options.delays);
              return v;
            case Br:
              return Yn(c, l, n);
            case Dn: {
              var g = c,
                w =
                  (d = g.conds.find(function (I) {
                    var D = Hr(I.cond, e.options.guards);
                    return !D || Gr(e, D, l, n, t);
                  })) === null || d === void 0
                    ? void 0
                    : d.actions;
              if (!w) return [];
              var N = G(Ke(e, t, l, n, Le(xt(w), e.options.actions), a), 2),
                S = N[0],
                O = N[1];
              return (l = O), f == null || f.push(l), S;
            }
            case Pn: {
              var w = c.get(l, n.data);
              if (!w) return [];
              var k = G(Ke(e, t, l, n, Le(xt(w), e.options.actions), a), 2),
                z = k[0],
                R = k[1];
              return (l = R), f == null || f.push(l), z;
            }
            case rr:
              return Zn(c, l, n);
            case He: {
              (l = br(l, n, [c], t)), f == null || f.push(l);
              break;
            }
            default:
              var E = we(c, e.options.actions),
                m = E.exec;
              if (m && f) {
                var p = f.length - 1;
                E = T(T({}, E), {
                  exec: function (I) {
                    for (var D = [], P = 1; P < arguments.length; P++)
                      D[P - 1] = arguments[P];
                    m.apply(void 0, it([f[p]], G(D), !1));
                  },
                });
              }
              return E;
          }
        })
        .filter(function (c) {
          return !!c;
        }),
    );
  return [h, l];
}
var de = function (e, t) {
  var r = t(e);
  return r;
};
function Yr(e) {
  var t;
  return (
    (t = {
      id: e,
      send: function () {},
      subscribe: function () {
        return { unsubscribe: function () {} };
      },
      getSnapshot: function () {},
      toJSON: function () {
        return { id: e };
      },
    }),
    (t[Pt] = function () {
      return this;
    }),
    t
  );
}
function ri(e, t, r, n) {
  var i,
    a = Jr(e.src),
    s =
      (i = t == null ? void 0 : t.options.services) === null || i === void 0
        ? void 0
        : i[a.type],
    o = e.data ? De(e.data, r, n) : void 0,
    u = s ? ni(s, e.id, o) : Yr(e.id);
  return (u.meta = e), u;
}
function ni(e, t, r) {
  var n = Yr(t);
  if (((n.deferred = !0), Vt(e))) {
    var i = (n.state = de(void 0, function () {
      return (r ? e.withContext(r) : e).initialState;
    }));
    n.getSnapshot = function () {
      return i;
    };
  }
  return n;
}
function ii(e) {
  try {
    return typeof e.send == 'function';
  } catch {
    return !1;
  }
}
function ai(e) {
  return ii(e) && 'id' in e;
}
function si(e) {
  var t;
  return T(
    ((t = {
      subscribe: function () {
        return { unsubscribe: function () {} };
      },
      id: 'anonymous',
      getSnapshot: function () {},
    }),
    (t[Pt] = function () {
      return this;
    }),
    t),
    e,
  );
}
var ze = function (e) {
  return e.type === 'atomic' || e.type === 'final';
};
function te(e) {
  return Object.keys(e.states)
    .map(function (t) {
      return e.states[t];
    })
    .filter(function (t) {
      return t.type !== 'history';
    });
}
function Xr(e) {
  var t = [e];
  return ze(e) ? t : t.concat(et(te(e).map(Xr)));
}
function Xt(e, t) {
  var r,
    n,
    i,
    a,
    s,
    o,
    u,
    l,
    f = new Set(e),
    h = Qe(f),
    c = new Set(t);
  try {
    for (var d = U(c), v = d.next(); !v.done; v = d.next())
      for (var g = v.value, w = g.parent; w && !c.has(w); )
        c.add(w), (w = w.parent);
  } catch (p) {
    r = { error: p };
  } finally {
    try {
      v && !v.done && (n = d.return) && n.call(d);
    } finally {
      if (r) throw r.error;
    }
  }
  var N = Qe(c);
  try {
    for (var S = U(c), O = S.next(); !O.done; O = S.next()) {
      var g = O.value;
      if (g.type === 'compound' && (!N.get(g) || !N.get(g).length))
        h.get(g)
          ? h.get(g).forEach(function (I) {
              return c.add(I);
            })
          : g.initialStateNodes.forEach(function (I) {
              return c.add(I);
            });
      else if (g.type === 'parallel')
        try {
          for (
            var k = ((s = void 0), U(te(g))), z = k.next();
            !z.done;
            z = k.next()
          ) {
            var R = z.value;
            c.has(R) ||
              (c.add(R),
              h.get(R)
                ? h.get(R).forEach(function (I) {
                    return c.add(I);
                  })
                : R.initialStateNodes.forEach(function (I) {
                    return c.add(I);
                  }));
          }
        } catch (I) {
          s = { error: I };
        } finally {
          try {
            z && !z.done && (o = k.return) && o.call(k);
          } finally {
            if (s) throw s.error;
          }
        }
    }
  } catch (p) {
    i = { error: p };
  } finally {
    try {
      O && !O.done && (a = S.return) && a.call(S);
    } finally {
      if (i) throw i.error;
    }
  }
  try {
    for (var E = U(c), m = E.next(); !m.done; m = E.next())
      for (var g = m.value, w = g.parent; w && !c.has(w); )
        c.add(w), (w = w.parent);
  } catch (p) {
    u = { error: p };
  } finally {
    try {
      m && !m.done && (l = E.return) && l.call(E);
    } finally {
      if (u) throw u.error;
    }
  }
  return c;
}
function Kr(e, t) {
  var r = t.get(e);
  if (!r) return {};
  if (e.type === 'compound') {
    var n = r[0];
    if (n) {
      if (ze(n)) return n.key;
    } else return {};
  }
  var i = {};
  return (
    r.forEach(function (a) {
      i[a.key] = Kr(a, t);
    }),
    i
  );
}
function Qe(e) {
  var t,
    r,
    n = new Map();
  try {
    for (var i = U(e), a = i.next(); !a.done; a = i.next()) {
      var s = a.value;
      n.has(s) || n.set(s, []),
        s.parent &&
          (n.has(s.parent) || n.set(s.parent, []), n.get(s.parent).push(s));
    }
  } catch (o) {
    t = { error: o };
  } finally {
    try {
      a && !a.done && (r = i.return) && r.call(i);
    } finally {
      if (t) throw t.error;
    }
  }
  return n;
}
function oi(e, t) {
  var r = Xt([e], t);
  return Kr(e, Qe(r));
}
function Ne(e, t) {
  return Array.isArray(e)
    ? e.some(function (r) {
        return r === t;
      })
    : e instanceof Set
    ? e.has(t)
    : !1;
}
function li(e) {
  return it(
    [],
    G(
      new Set(
        et(
          it(
            [],
            G(
              e.map(function (t) {
                return t.ownEvents;
              }),
            ),
            !1,
          ),
        ),
      ),
    ),
    !1,
  );
}
function ye(e, t) {
  return t.type === 'compound'
    ? te(t).some(function (r) {
        return r.type === 'final' && Ne(e, r);
      })
    : t.type === 'parallel'
    ? te(t).every(function (r) {
        return ye(e, r);
      })
    : !1;
}
function ui(e) {
  return (
    e === void 0 && (e = []),
    e.reduce(function (t, r) {
      return r.meta !== void 0 && (t[r.id] = r.meta), t;
    }, {})
  );
}
function wr(e) {
  return new Set(
    et(
      e.map(function (t) {
        return t.tags;
      }),
    ),
  );
}
function Qr(e, t) {
  if (e === t) return !0;
  if (e === void 0 || t === void 0) return !1;
  if (H(e) || H(t)) return e === t;
  var r = Object.keys(e),
    n = Object.keys(t);
  return (
    r.length === n.length &&
    r.every(function (i) {
      return Qr(e[i], t[i]);
    })
  );
}
function ci(e) {
  return typeof e != 'object' || e === null
    ? !1
    : 'value' in e && '_event' in e;
}
function fi(e, t) {
  var r = e.exec,
    n = T(T({}, e), {
      exec:
        r !== void 0
          ? function () {
              return r(t.context, t.event, {
                action: e,
                state: t,
                _event: t._event,
              });
            }
          : void 0,
    });
  return n;
}
var Ot = (function () {
    function e(t) {
      var r = this,
        n;
      (this.actions = []),
        (this.activities = yr),
        (this.meta = {}),
        (this.events = []),
        (this.value = t.value),
        (this.context = t.context),
        (this._event = t._event),
        (this._sessionid = t._sessionid),
        (this.event = this._event.data),
        (this.historyValue = t.historyValue),
        (this.history = t.history),
        (this.actions = t.actions || []),
        (this.activities = t.activities || yr),
        (this.meta = ui(t.configuration)),
        (this.events = t.events || []),
        (this.matches = this.matches.bind(this)),
        (this.toStrings = this.toStrings.bind(this)),
        (this.configuration = t.configuration),
        (this.transitions = t.transitions),
        (this.children = t.children),
        (this.done = !!t.done),
        (this.tags =
          (n = Array.isArray(t.tags) ? new Set(t.tags) : t.tags) !== null &&
          n !== void 0
            ? n
            : new Set()),
        (this.machine = t.machine),
        Object.defineProperty(this, 'nextEvents', {
          get: function () {
            return li(r.configuration);
          },
        });
    }
    return (
      (e.from = function (t, r) {
        if (t instanceof e)
          return t.context !== r
            ? new e({
                value: t.value,
                context: r,
                _event: t._event,
                _sessionid: null,
                historyValue: t.historyValue,
                history: t.history,
                actions: [],
                activities: t.activities,
                meta: {},
                events: [],
                configuration: [],
                transitions: [],
                children: {},
              })
            : t;
        var n = Pe;
        return new e({
          value: t,
          context: r,
          _event: n,
          _sessionid: null,
          historyValue: void 0,
          history: void 0,
          actions: [],
          activities: void 0,
          meta: void 0,
          events: [],
          configuration: [],
          transitions: [],
          children: {},
        });
      }),
      (e.create = function (t) {
        return new e(t);
      }),
      (e.inert = function (t, r) {
        if (t instanceof e) {
          if (!t.actions.length) return t;
          var n = Pe;
          return new e({
            value: t.value,
            context: r,
            _event: n,
            _sessionid: null,
            historyValue: t.historyValue,
            history: t.history,
            activities: t.activities,
            configuration: t.configuration,
            transitions: [],
            children: {},
          });
        }
        return e.from(t, r);
      }),
      (e.prototype.toStrings = function (t, r) {
        var n = this;
        if ((t === void 0 && (t = this.value), r === void 0 && (r = '.'), H(t)))
          return [t];
        var i = Object.keys(t);
        return i.concat.apply(
          i,
          it(
            [],
            G(
              i.map(function (a) {
                return n.toStrings(t[a], r).map(function (s) {
                  return a + r + s;
                });
              }),
            ),
            !1,
          ),
        );
      }),
      (e.prototype.toJSON = function () {
        var t = this;
        t.configuration, t.transitions;
        var r = t.tags;
        t.machine;
        var n = er(t, ['configuration', 'transitions', 'tags', 'machine']);
        return T(T({}, n), { tags: Array.from(r) });
      }),
      (e.prototype.matches = function (t) {
        return nr(t, this.value);
      }),
      (e.prototype.hasTag = function (t) {
        return this.tags.has(t);
      }),
      (e.prototype.can = function (t) {
        var r;
        pe(!!this.machine);
        var n =
          (r = this.machine) === null || r === void 0
            ? void 0
            : r.getTransitionData(this, t);
        return (
          !!(n != null && n.transitions.length) &&
          n.transitions.some(function (i) {
            return i.target !== void 0 || i.actions.length;
          })
        );
      }),
      e
    );
  })(),
  hi = { deferEvents: !1 },
  Sr = (function () {
    function e(t) {
      (this.processingEvent = !1),
        (this.queue = []),
        (this.initialized = !1),
        (this.options = T(T({}, hi), t));
    }
    return (
      (e.prototype.initialize = function (t) {
        if (((this.initialized = !0), t)) {
          if (!this.options.deferEvents) {
            this.schedule(t);
            return;
          }
          this.process(t);
        }
        this.flushEvents();
      }),
      (e.prototype.schedule = function (t) {
        if (!this.initialized || this.processingEvent) {
          this.queue.push(t);
          return;
        }
        if (this.queue.length !== 0)
          throw new Error(
            'Event queue should be empty when it is not processing events',
          );
        this.process(t), this.flushEvents();
      }),
      (e.prototype.clear = function () {
        this.queue = [];
      }),
      (e.prototype.flushEvents = function () {
        for (var t = this.queue.shift(); t; )
          this.process(t), (t = this.queue.shift());
      }),
      (e.prototype.process = function (t) {
        this.processingEvent = !0;
        try {
          t();
        } catch (r) {
          throw (this.clear(), r);
        } finally {
          this.processingEvent = !1;
        }
      }),
      e
    );
  })(),
  Ve = new Map(),
  di = 0,
  Te = {
    bookId: function () {
      return 'x:'.concat(di++);
    },
    register: function (e, t) {
      return Ve.set(e, t), e;
    },
    get: function (e) {
      return Ve.get(e);
    },
    free: function (e) {
      Ve.delete(e);
    },
  };
function sr() {
  if (typeof globalThis != 'undefined') return globalThis;
  if (typeof self != 'undefined') return self;
  if (typeof window != 'undefined') return window;
  if (typeof global != 'undefined') return global;
}
function vi() {
  var e = sr();
  if (e && '__xstate__' in e) return e.__xstate__;
}
function pi(e) {
  if (!!sr()) {
    var t = vi();
    t && t.register(e);
  }
}
function yi(e, t) {
  t === void 0 && (t = {});
  var r = e.initialState,
    n = new Set(),
    i = [],
    a = !1,
    s = function () {
      if (!a) {
        for (a = !0; i.length > 0; ) {
          var l = i.shift();
          (r = e.transition(r, l, u)),
            n.forEach(function (f) {
              return f.next(r);
            });
        }
        a = !1;
      }
    },
    o = si({
      id: t.id,
      send: function (l) {
        i.push(l), s();
      },
      getSnapshot: function () {
        return r;
      },
      subscribe: function (l, f, h) {
        var c = Ye(l, f, h);
        return (
          n.add(c),
          c.next(r),
          {
            unsubscribe: function () {
              n.delete(c);
            },
          }
        );
      },
    }),
    u = { parent: t.parent, self: o, id: t.id || 'anonymous', observers: n };
  return (r = e.start ? e.start(u) : r), o;
}
var gi = { sync: !1, autoForward: !1 },
  vt;
(function (e) {
  (e[(e.NotStarted = 0)] = 'NotStarted'),
    (e[(e.Running = 1)] = 'Running'),
    (e[(e.Stopped = 2)] = 'Stopped');
})(vt || (vt = {}));
var mi = (function () {
  function e(t, r) {
    var n = this;
    r === void 0 && (r = e.defaultOptions),
      (this.machine = t),
      (this.delayedEventsMap = {}),
      (this.listeners = new Set()),
      (this.contextListeners = new Set()),
      (this.stopListeners = new Set()),
      (this.doneListeners = new Set()),
      (this.eventListeners = new Set()),
      (this.sendListeners = new Set()),
      (this.initialized = !1),
      (this.status = vt.NotStarted),
      (this.children = new Map()),
      (this.forwardTo = new Set()),
      (this.init = this.start),
      (this.send = function (f, h) {
        if (ee(f)) return n.batch(f), n.state;
        var c = ut(ir(f, h));
        if (n.status === vt.Stopped) return n.state;
        if (n.status !== vt.Running && !n.options.deferEvents)
          throw new Error(
            'Event "'
              .concat(c.name, '" was sent to uninitialized service "')
              .concat(
                n.machine.id,
                `". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.
Event: `,
              )
              .concat(JSON.stringify(c.data)),
          );
        return (
          n.scheduler.schedule(function () {
            n.forward(c);
            var d = n.nextState(c);
            n.update(d, c);
          }),
          n._state
        );
      }),
      (this.sendTo = function (f, h) {
        var c = n.parent && (h === be.Parent || n.parent.id === h),
          d = c
            ? n.parent
            : H(h)
            ? n.children.get(h) || Te.get(h)
            : Wn(h)
            ? h
            : void 0;
        if (!d) {
          if (!c)
            throw new Error(
              "Unable to send event to child '"
                .concat(h, "' from service '")
                .concat(n.id, "'."),
            );
          return;
        }
        'machine' in d
          ? d.send(
              T(T({}, f), {
                name: f.name === jn ? ''.concat(he(n.id)) : f.name,
                origin: n.sessionId,
              }),
            )
          : d.send(f.data);
      });
    var i = T(T({}, e.defaultOptions), r),
      a = i.clock,
      s = i.logger,
      o = i.parent,
      u = i.id,
      l = u !== void 0 ? u : t.id;
    (this.id = l),
      (this.logger = s),
      (this.clock = a),
      (this.parent = o),
      (this.options = i),
      (this.scheduler = new Sr({ deferEvents: this.options.deferEvents })),
      (this.sessionId = Te.bookId());
  }
  return (
    Object.defineProperty(e.prototype, 'initialState', {
      get: function () {
        var t = this;
        return this._initialState
          ? this._initialState
          : de(this, function () {
              return (
                (t._initialState = t.machine.initialState), t._initialState
              );
            });
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, 'state', {
      get: function () {
        return this._state;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype.execute = function (t, r) {
      var n, i;
      try {
        for (var a = U(t.actions), s = a.next(); !s.done; s = a.next()) {
          var o = s.value;
          this.exec(o, t, r);
        }
      } catch (u) {
        n = { error: u };
      } finally {
        try {
          s && !s.done && (i = a.return) && i.call(a);
        } finally {
          if (n) throw n.error;
        }
      }
    }),
    (e.prototype.update = function (t, r) {
      var n,
        i,
        a,
        s,
        o,
        u,
        l,
        f,
        h = this;
      if (
        ((t._sessionid = this.sessionId),
        (this._state = t),
        this.options.execute && this.execute(this.state),
        this.children.forEach(function (p) {
          h.state.children[p.id] = p;
        }),
        this.devTools && this.devTools.send(r.data, t),
        t.event)
      )
        try {
          for (
            var c = U(this.eventListeners), d = c.next();
            !d.done;
            d = c.next()
          ) {
            var v = d.value;
            v(t.event);
          }
        } catch (p) {
          n = { error: p };
        } finally {
          try {
            d && !d.done && (i = c.return) && i.call(c);
          } finally {
            if (n) throw n.error;
          }
        }
      try {
        for (var g = U(this.listeners), w = g.next(); !w.done; w = g.next()) {
          var v = w.value;
          v(t, t.event);
        }
      } catch (p) {
        a = { error: p };
      } finally {
        try {
          w && !w.done && (s = g.return) && s.call(g);
        } finally {
          if (a) throw a.error;
        }
      }
      try {
        for (
          var N = U(this.contextListeners), S = N.next();
          !S.done;
          S = N.next()
        ) {
          var O = S.value;
          O(
            this.state.context,
            this.state.history ? this.state.history.context : void 0,
          );
        }
      } catch (p) {
        o = { error: p };
      } finally {
        try {
          S && !S.done && (u = N.return) && u.call(N);
        } finally {
          if (o) throw o.error;
        }
      }
      var k = ye(t.configuration || [], this.machine);
      if (this.state.configuration && k) {
        var z = t.configuration.find(function (p) {
            return p.type === 'final' && p.parent === h.machine;
          }),
          R = z && z.doneData ? De(z.doneData, t.context, r) : void 0;
        try {
          for (
            var E = U(this.doneListeners), m = E.next();
            !m.done;
            m = E.next()
          ) {
            var v = m.value;
            v(Ie(this.id, R));
          }
        } catch (p) {
          l = { error: p };
        } finally {
          try {
            m && !m.done && (f = E.return) && f.call(E);
          } finally {
            if (l) throw l.error;
          }
        }
        this.stop();
      }
    }),
    (e.prototype.onTransition = function (t) {
      return (
        this.listeners.add(t),
        this.status === vt.Running && t(this.state, this.state.event),
        this
      );
    }),
    (e.prototype.subscribe = function (t, r, n) {
      var i = this;
      if (!t) return { unsubscribe: function () {} };
      var a,
        s = n;
      return (
        typeof t == 'function'
          ? (a = t)
          : ((a = t.next.bind(t)), (s = t.complete.bind(t))),
        this.listeners.add(a),
        this.status !== vt.NotStarted && a(this.state),
        s && (this.status === vt.Stopped ? s() : this.onDone(s)),
        {
          unsubscribe: function () {
            a && i.listeners.delete(a), s && i.doneListeners.delete(s);
          },
        }
      );
    }),
    (e.prototype.onEvent = function (t) {
      return this.eventListeners.add(t), this;
    }),
    (e.prototype.onSend = function (t) {
      return this.sendListeners.add(t), this;
    }),
    (e.prototype.onChange = function (t) {
      return this.contextListeners.add(t), this;
    }),
    (e.prototype.onStop = function (t) {
      return this.stopListeners.add(t), this;
    }),
    (e.prototype.onDone = function (t) {
      return this.doneListeners.add(t), this;
    }),
    (e.prototype.off = function (t) {
      return (
        this.listeners.delete(t),
        this.eventListeners.delete(t),
        this.sendListeners.delete(t),
        this.stopListeners.delete(t),
        this.doneListeners.delete(t),
        this.contextListeners.delete(t),
        this
      );
    }),
    (e.prototype.start = function (t) {
      var r = this;
      if (this.status === vt.Running) return this;
      this.machine._init(),
        Te.register(this.sessionId, this),
        (this.initialized = !0),
        (this.status = vt.Running);
      var n =
        t === void 0
          ? this.initialState
          : de(this, function () {
              return ci(t)
                ? r.machine.resolveState(t)
                : r.machine.resolveState(Ot.from(t, r.machine.context));
            });
      return (
        this.options.devTools && this.attachDev(),
        this.scheduler.initialize(function () {
          r.update(n, Pe);
        }),
        this
      );
    }),
    (e.prototype.stop = function () {
      var t,
        r,
        n,
        i,
        a,
        s,
        o,
        u,
        l,
        f,
        h = this;
      try {
        for (var c = U(this.listeners), d = c.next(); !d.done; d = c.next()) {
          var v = d.value;
          this.listeners.delete(v);
        }
      } catch (m) {
        t = { error: m };
      } finally {
        try {
          d && !d.done && (r = c.return) && r.call(c);
        } finally {
          if (t) throw t.error;
        }
      }
      try {
        for (
          var g = U(this.stopListeners), w = g.next();
          !w.done;
          w = g.next()
        ) {
          var v = w.value;
          v(), this.stopListeners.delete(v);
        }
      } catch (m) {
        n = { error: m };
      } finally {
        try {
          w && !w.done && (i = g.return) && i.call(g);
        } finally {
          if (n) throw n.error;
        }
      }
      try {
        for (
          var N = U(this.contextListeners), S = N.next();
          !S.done;
          S = N.next()
        ) {
          var v = S.value;
          this.contextListeners.delete(v);
        }
      } catch (m) {
        a = { error: m };
      } finally {
        try {
          S && !S.done && (s = N.return) && s.call(N);
        } finally {
          if (a) throw a.error;
        }
      }
      try {
        for (
          var O = U(this.doneListeners), k = O.next();
          !k.done;
          k = O.next()
        ) {
          var v = k.value;
          this.doneListeners.delete(v);
        }
      } catch (m) {
        o = { error: m };
      } finally {
        try {
          k && !k.done && (u = O.return) && u.call(O);
        } finally {
          if (o) throw o.error;
        }
      }
      if (!this.initialized) return this;
      it([], G(this.state.configuration), !1)
        .sort(function (m, p) {
          return p.order - m.order;
        })
        .forEach(function (m) {
          var p, I;
          try {
            for (
              var D = U(m.definition.exit), P = D.next();
              !P.done;
              P = D.next()
            ) {
              var L = P.value;
              h.exec(L, h.state);
            }
          } catch (q) {
            p = { error: q };
          } finally {
            try {
              P && !P.done && (I = D.return) && I.call(D);
            } finally {
              if (p) throw p.error;
            }
          }
        }),
        this.children.forEach(function (m) {
          Y(m.stop) && m.stop();
        }),
        this.children.clear();
      try {
        for (
          var z = U(Object.keys(this.delayedEventsMap)), R = z.next();
          !R.done;
          R = z.next()
        ) {
          var E = R.value;
          this.clock.clearTimeout(this.delayedEventsMap[E]);
        }
      } catch (m) {
        l = { error: m };
      } finally {
        try {
          R && !R.done && (f = z.return) && f.call(z);
        } finally {
          if (l) throw l.error;
        }
      }
      return (
        this.scheduler.clear(),
        (this.scheduler = new Sr({ deferEvents: this.options.deferEvents })),
        (this.initialized = !1),
        (this.status = vt.Stopped),
        (this._initialState = void 0),
        Te.free(this.sessionId),
        this
      );
    }),
    (e.prototype.batch = function (t) {
      var r = this;
      if (!(this.status === vt.NotStarted && this.options.deferEvents)) {
        if (this.status !== vt.Running)
          throw new Error(
            ''
              .concat(
                t.length,
                ' event(s) were sent to uninitialized service "',
              )
              .concat(
                this.machine.id,
                '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.',
              ),
          );
      }
      this.scheduler.schedule(function () {
        var n,
          i,
          a = r.state,
          s = !1,
          o = [],
          u = function (c) {
            var d = ut(c);
            r.forward(d),
              (a = de(r, function () {
                return r.machine.transition(a, d);
              })),
              o.push.apply(
                o,
                it(
                  [],
                  G(
                    a.actions.map(function (v) {
                      return fi(v, a);
                    }),
                  ),
                  !1,
                ),
              ),
              (s = s || !!a.changed);
          };
        try {
          for (var l = U(t), f = l.next(); !f.done; f = l.next()) {
            var h = f.value;
            u(h);
          }
        } catch (c) {
          n = { error: c };
        } finally {
          try {
            f && !f.done && (i = l.return) && i.call(l);
          } finally {
            if (n) throw n.error;
          }
        }
        (a.changed = s), (a.actions = o), r.update(a, ut(t[t.length - 1]));
      });
    }),
    (e.prototype.sender = function (t) {
      return this.send.bind(this, t);
    }),
    (e.prototype.nextState = function (t) {
      var r = this,
        n = ut(t);
      if (
        n.name.indexOf(pr) === 0 &&
        !this.state.nextEvents.some(function (a) {
          return a.indexOf(pr) === 0;
        })
      )
        throw n.data.data;
      var i = de(this, function () {
        return r.machine.transition(r.state, n);
      });
      return i;
    }),
    (e.prototype.forward = function (t) {
      var r, n;
      try {
        for (var i = U(this.forwardTo), a = i.next(); !a.done; a = i.next()) {
          var s = a.value,
            o = this.children.get(s);
          if (!o)
            throw new Error(
              "Unable to forward event '"
                .concat(t, "' from interpreter '")
                .concat(this.id, "' to nonexistant child '")
                .concat(s, "'."),
            );
          o.send(t);
        }
      } catch (u) {
        r = { error: u };
      } finally {
        try {
          a && !a.done && (n = i.return) && n.call(i);
        } finally {
          if (r) throw r.error;
        }
      }
    }),
    (e.prototype.defer = function (t) {
      var r = this;
      this.delayedEventsMap[t.id] = this.clock.setTimeout(function () {
        t.to ? r.sendTo(t._event, t.to) : r.send(t._event);
      }, t.delay);
    }),
    (e.prototype.cancel = function (t) {
      this.clock.clearTimeout(this.delayedEventsMap[t]),
        delete this.delayedEventsMap[t];
    }),
    (e.prototype.exec = function (t, r, n) {
      n === void 0 && (n = this.machine.options.actions);
      var i = r.context,
        a = r._event,
        s = t.exec || Xe(t.type, n),
        o = Y(s) ? s : s ? s.exec : t.exec;
      if (o)
        try {
          return o(i, a.data, { action: t, state: this.state, _event: a });
        } catch (k) {
          throw (
            (this.parent && this.parent.send({ type: 'xstate.error', data: k }),
            k)
          );
        }
      switch (t.type) {
        case $e:
          var u = t;
          if (typeof u.delay == 'number') {
            this.defer(u);
            return;
          } else u.to ? this.sendTo(u._event, u.to) : this.send(u._event);
          break;
        case zr:
          this.cancel(t.sendId);
          break;
        case We: {
          if (this.status !== vt.Running) return;
          var l = t.activity;
          if (!this.state.activities[l.id || l.type]) break;
          if (l.type === X.Invoke) {
            var f = Jr(l.src),
              h = this.machine.options.services
                ? this.machine.options.services[f.type]
                : void 0,
              c = l.id,
              d = l.data,
              v = 'autoForward' in l ? l.autoForward : !!l.forward;
            if (!h) return;
            var g = d ? De(d, i, a) : void 0;
            if (typeof h == 'string') return;
            var w = Y(h) ? h(i, a.data, { data: g, src: f, meta: l.meta }) : h;
            if (!w) return;
            var N = void 0;
            Vt(w) && ((w = g ? w.withContext(g) : w), (N = { autoForward: v })),
              this.spawn(w, c, N);
          } else this.spawnActivity(l);
          break;
        }
        case rr: {
          this.stopChild(t.activity.id);
          break;
        }
        case Br:
          var S = t.label,
            O = t.value;
          S ? this.logger(S, O) : this.logger(O);
          break;
      }
    }),
    (e.prototype.removeChild = function (t) {
      var r;
      this.children.delete(t),
        this.forwardTo.delete(t),
        (r = this.state) === null || r === void 0 || delete r.children[t];
    }),
    (e.prototype.stopChild = function (t) {
      var r = this.children.get(t);
      !r || (this.removeChild(t), Y(r.stop) && r.stop());
    }),
    (e.prototype.spawn = function (t, r, n) {
      if (mr(t)) return this.spawnPromise(Promise.resolve(t), r);
      if (Y(t)) return this.spawnCallback(t, r);
      if (ai(t)) return this.spawnActor(t, r);
      if (Vn(t)) return this.spawnObservable(t, r);
      if (Vt(t)) return this.spawnMachine(t, T(T({}, n), { id: r }));
      if ($n(t)) return this.spawnBehavior(t, r);
      throw new Error(
        'Unable to spawn entity "'
          .concat(r, '" of type "')
          .concat(typeof t, '".'),
      );
    }),
    (e.prototype.spawnMachine = function (t, r) {
      var n = this;
      r === void 0 && (r = {});
      var i = new e(
          t,
          T(T({}, this.options), { parent: this, id: r.id || t.id }),
        ),
        a = T(T({}, gi), r);
      a.sync &&
        i.onTransition(function (o) {
          n.send(Fr, { state: o, id: i.id });
        });
      var s = i;
      return (
        this.children.set(i.id, s),
        a.autoForward && this.forwardTo.add(i.id),
        i
          .onDone(function (o) {
            n.removeChild(i.id), n.send(ut(o, { origin: i.id }));
          })
          .start(),
        s
      );
    }),
    (e.prototype.spawnBehavior = function (t, r) {
      var n = yi(t, { id: r, parent: this });
      return this.children.set(r, n), n;
    }),
    (e.prototype.spawnPromise = function (t, r) {
      var n,
        i = this,
        a = !1,
        s;
      t.then(
        function (u) {
          a || ((s = u), i.removeChild(r), i.send(ut(Ie(r, u), { origin: r })));
        },
        function (u) {
          if (!a) {
            i.removeChild(r);
            var l = he(r, u);
            try {
              i.send(ut(l, { origin: r }));
            } catch {
              i.devTools && i.devTools.send(l, i.state),
                i.machine.strict && i.stop();
            }
          }
        },
      );
      var o =
        ((n = {
          id: r,
          send: function () {},
          subscribe: function (u, l, f) {
            var h = Ye(u, l, f),
              c = !1;
            return (
              t.then(
                function (d) {
                  c || (h.next(d), !c && h.complete());
                },
                function (d) {
                  c || h.error(d);
                },
              ),
              {
                unsubscribe: function () {
                  return (c = !0);
                },
              }
            );
          },
          stop: function () {
            a = !0;
          },
          toJSON: function () {
            return { id: r };
          },
          getSnapshot: function () {
            return s;
          },
        }),
        (n[Pt] = function () {
          return this;
        }),
        n);
      return this.children.set(r, o), o;
    }),
    (e.prototype.spawnCallback = function (t, r) {
      var n,
        i = this,
        a = !1,
        s = new Set(),
        o = new Set(),
        u,
        l = function (c) {
          (u = c),
            o.forEach(function (d) {
              return d(c);
            }),
            !a && i.send(ut(c, { origin: r }));
        },
        f;
      try {
        f = t(l, function (c) {
          s.add(c);
        });
      } catch (c) {
        this.send(he(r, c));
      }
      if (mr(f)) return this.spawnPromise(f, r);
      var h =
        ((n = {
          id: r,
          send: function (c) {
            return s.forEach(function (d) {
              return d(c);
            });
          },
          subscribe: function (c) {
            var d = Ye(c);
            return (
              o.add(d.next),
              {
                unsubscribe: function () {
                  o.delete(d.next);
                },
              }
            );
          },
          stop: function () {
            (a = !0), Y(f) && f();
          },
          toJSON: function () {
            return { id: r };
          },
          getSnapshot: function () {
            return u;
          },
        }),
        (n[Pt] = function () {
          return this;
        }),
        n);
      return this.children.set(r, h), h;
    }),
    (e.prototype.spawnObservable = function (t, r) {
      var n,
        i = this,
        a,
        s = t.subscribe(
          function (u) {
            (a = u), i.send(ut(u, { origin: r }));
          },
          function (u) {
            i.removeChild(r), i.send(ut(he(r, u), { origin: r }));
          },
          function () {
            i.removeChild(r), i.send(ut(Ie(r), { origin: r }));
          },
        ),
        o =
          ((n = {
            id: r,
            send: function () {},
            subscribe: function (u, l, f) {
              return t.subscribe(u, l, f);
            },
            stop: function () {
              return s.unsubscribe();
            },
            getSnapshot: function () {
              return a;
            },
            toJSON: function () {
              return { id: r };
            },
          }),
          (n[Pt] = function () {
            return this;
          }),
          n);
      return this.children.set(r, o), o;
    }),
    (e.prototype.spawnActor = function (t, r) {
      return this.children.set(r, t), t;
    }),
    (e.prototype.spawnActivity = function (t) {
      var r =
        this.machine.options && this.machine.options.activities
          ? this.machine.options.activities[t.type]
          : void 0;
      if (!!r) {
        var n = r(this.state.context, t);
        this.spawnEffect(t.id, n);
      }
    }),
    (e.prototype.spawnEffect = function (t, r) {
      var n;
      this.children.set(
        t,
        ((n = {
          id: t,
          send: function () {},
          subscribe: function () {
            return { unsubscribe: function () {} };
          },
          stop: r || void 0,
          getSnapshot: function () {},
          toJSON: function () {
            return { id: t };
          },
        }),
        (n[Pt] = function () {
          return this;
        }),
        n),
      );
    }),
    (e.prototype.attachDev = function () {
      var t = sr();
      if (this.options.devTools && t) {
        if (t.__REDUX_DEVTOOLS_EXTENSION__) {
          var r =
            typeof this.options.devTools == 'object'
              ? this.options.devTools
              : void 0;
          (this.devTools = t.__REDUX_DEVTOOLS_EXTENSION__.connect(
            T(
              T(
                {
                  name: this.id,
                  autoPause: !0,
                  stateSanitizer: function (n) {
                    return {
                      value: n.value,
                      context: n.context,
                      actions: n.actions,
                    };
                  },
                },
                r,
              ),
              { features: T({ jump: !1, skip: !1 }, r ? r.features : void 0) },
            ),
            this.machine,
          )),
            this.devTools.init(this.state);
        }
        pi(this);
      }
    }),
    (e.prototype.toJSON = function () {
      return { id: this.id };
    }),
    (e.prototype[Pt] = function () {
      return this;
    }),
    (e.prototype.getSnapshot = function () {
      return this.status === vt.NotStarted ? this.initialState : this._state;
    }),
    (e.defaultOptions = {
      execute: !0,
      deferEvents: !0,
      clock: {
        setTimeout: function (t, r) {
          return setTimeout(t, r);
        },
        clearTimeout: function (t) {
          return clearTimeout(t);
        },
      },
      logger: console.log.bind(console),
      devTools: !1,
    }),
    (e.interpret = Zr),
    e
  );
})();
function Zr(e, t) {
  var r = new mi(e, t);
  return r;
}
function bi(e) {
  if (typeof e == 'string') {
    var t = { type: e };
    return (
      (t.toString = function () {
        return e;
      }),
      t
    );
  }
  return e;
}
function ke(e) {
  return T(T({ type: Ge }, e), {
    toJSON: function () {
      e.onDone, e.onError;
      var t = er(e, ['onDone', 'onError']);
      return T(T({}, t), { type: Ge, src: bi(e.src) });
    },
  });
}
var Kt = '',
  Ze = '#',
  ce = '*',
  Jt = {},
  qt = function (e) {
    return e[0] === Ze;
  },
  wi = function () {
    return {
      actions: {},
      guards: {},
      services: {},
      activities: {},
      delays: {},
    };
  },
  Si = function (e, t, r) {
    var n = r.slice(0, -1).some(function (a) {
        return !('cond' in a) && !('in' in a) && (H(a.target) || Vt(a.target));
      }),
      i = t === Kt ? 'the transient event' : "event '".concat(t, "'");
    pe(
      !n,
      'One or more transitions for '
        .concat(i, " on state '")
        .concat(e.id, "' are unreachable. ") +
        'Make sure that the default transition is the last one defined.',
    );
  },
  _i = (function () {
    function e(t, r, n, i) {
      var a = this;
      n === void 0 && (n = 'context' in t ? t.context : void 0);
      var s;
      (this.config = t),
        (this._context = n),
        (this.order = -1),
        (this.__xstatenode = !0),
        (this.__cache = {
          events: void 0,
          relativeValue: new Map(),
          initialStateValue: void 0,
          initialState: void 0,
          on: void 0,
          transitions: void 0,
          candidates: {},
          delayedTransitions: void 0,
        }),
        (this.idMap = {}),
        (this.tags = []),
        (this.options = Object.assign(wi(), r)),
        (this.parent = i == null ? void 0 : i.parent),
        (this.key =
          this.config.key ||
          (i == null ? void 0 : i.key) ||
          this.config.id ||
          '(machine)'),
        (this.machine = this.parent ? this.parent.machine : this),
        (this.path = this.parent ? this.parent.path.concat(this.key) : []),
        (this.delimiter =
          this.config.delimiter || (this.parent ? this.parent.delimiter : Mr)),
        (this.id =
          this.config.id ||
          it([this.machine.key], G(this.path), !1).join(this.delimiter)),
        (this.version = this.parent
          ? this.parent.version
          : this.config.version),
        (this.type =
          this.config.type ||
          (this.config.parallel
            ? 'parallel'
            : this.config.states && Object.keys(this.config.states).length
            ? 'compound'
            : this.config.history
            ? 'history'
            : 'atomic')),
        (this.schema = this.parent
          ? this.machine.schema
          : (s = this.config.schema) !== null && s !== void 0
          ? s
          : {}),
        (this.description = this.config.description),
        (this.initial = this.config.initial),
        (this.states = this.config.states
          ? fe(this.config.states, function (l, f) {
              var h,
                c = new e(l, {}, void 0, { parent: a, key: f });
              return (
                Object.assign(
                  a.idMap,
                  T(((h = {}), (h[c.id] = c), h), c.idMap),
                ),
                c
              );
            })
          : Jt);
      var o = 0;
      function u(l) {
        var f, h;
        l.order = o++;
        try {
          for (var c = U(te(l)), d = c.next(); !d.done; d = c.next()) {
            var v = d.value;
            u(v);
          }
        } catch (g) {
          f = { error: g };
        } finally {
          try {
            d && !d.done && (h = c.return) && h.call(c);
          } finally {
            if (f) throw f.error;
          }
        }
      }
      u(this),
        (this.history =
          this.config.history === !0 ? 'shallow' : this.config.history || !1),
        (this._transient =
          !!this.config.always ||
          (this.config.on
            ? Array.isArray(this.config.on)
              ? this.config.on.some(function (l) {
                  var f = l.event;
                  return f === Kt;
                })
              : Kt in this.config.on
            : !1)),
        (this.strict = !!this.config.strict),
        (this.onEntry = xt(this.config.entry || this.config.onEntry).map(
          function (l) {
            return we(l);
          },
        )),
        (this.onExit = xt(this.config.exit || this.config.onExit).map(function (
          l,
        ) {
          return we(l);
        })),
        (this.meta = this.config.meta),
        (this.doneData = this.type === 'final' ? this.config.data : void 0),
        (this.invoke = xt(this.config.invoke).map(function (l, f) {
          var h, c;
          if (Vt(l)) {
            var d = Ee(a.id, f);
            return (
              (a.machine.options.services = T(
                ((h = {}), (h[d] = l), h),
                a.machine.options.services,
              )),
              ke({ src: d, id: d })
            );
          } else if (H(l.src)) {
            var d = l.id || Ee(a.id, f);
            return ke(T(T({}, l), { id: d, src: l.src }));
          } else if (Vt(l.src) || Y(l.src)) {
            var d = l.id || Ee(a.id, f);
            return (
              (a.machine.options.services = T(
                ((c = {}), (c[d] = l.src), c),
                a.machine.options.services,
              )),
              ke(T(T({ id: d }, l), { src: d }))
            );
          } else {
            var v = l.src;
            return ke(T(T({ id: Ee(a.id, f) }, l), { src: v }));
          }
        })),
        (this.activities = xt(this.config.activities)
          .concat(this.invoke)
          .map(function (l) {
            return ar(l);
          })),
        (this.transition = this.transition.bind(this)),
        (this.tags = xt(this.config.tags));
    }
    return (
      (e.prototype._init = function () {
        this.__cache.transitions ||
          Xr(this).forEach(function (t) {
            return t.on;
          });
      }),
      (e.prototype.withConfig = function (t, r) {
        var n = this.options,
          i = n.actions,
          a = n.activities,
          s = n.guards,
          o = n.services,
          u = n.delays;
        return new e(
          this.config,
          {
            actions: T(T({}, i), t.actions),
            activities: T(T({}, a), t.activities),
            guards: T(T({}, s), t.guards),
            services: T(T({}, o), t.services),
            delays: T(T({}, u), t.delays),
          },
          r != null ? r : this.context,
        );
      }),
      (e.prototype.withContext = function (t) {
        return new e(this.config, this.options, t);
      }),
      Object.defineProperty(e.prototype, 'context', {
        get: function () {
          return Y(this._context) ? this._context() : this._context;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'definition', {
        get: function () {
          return {
            id: this.id,
            key: this.key,
            version: this.version,
            context: this.context,
            type: this.type,
            initial: this.initial,
            history: this.history,
            states: fe(this.states, function (t) {
              return t.definition;
            }),
            on: this.on,
            transitions: this.transitions,
            entry: this.onEntry,
            exit: this.onExit,
            activities: this.activities || [],
            meta: this.meta,
            order: this.order || -1,
            data: this.doneData,
            invoke: this.invoke,
            description: this.description,
            tags: this.tags,
          };
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.toJSON = function () {
        return this.definition;
      }),
      Object.defineProperty(e.prototype, 'on', {
        get: function () {
          if (this.__cache.on) return this.__cache.on;
          var t = this.transitions;
          return (this.__cache.on = t.reduce(function (r, n) {
            return (
              (r[n.eventType] = r[n.eventType] || []), r[n.eventType].push(n), r
            );
          }, {}));
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'after', {
        get: function () {
          return (
            this.__cache.delayedTransitions ||
            ((this.__cache.delayedTransitions = this.getDelayedTransitions()),
            this.__cache.delayedTransitions)
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'transitions', {
        get: function () {
          return (
            this.__cache.transitions ||
            ((this.__cache.transitions = this.formatTransitions()),
            this.__cache.transitions)
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.getCandidates = function (t) {
        if (this.__cache.candidates[t]) return this.__cache.candidates[t];
        var r = t === Kt,
          n = this.transitions.filter(function (i) {
            var a = i.eventType === t;
            return r ? a : a || i.eventType === ce;
          });
        return (this.__cache.candidates[t] = n), n;
      }),
      (e.prototype.getDelayedTransitions = function () {
        var t = this,
          r = this.config.after;
        if (!r) return [];
        var n = function (a, s) {
            var o = Y(a) ? ''.concat(t.id, ':delay[').concat(s, ']') : a,
              u = ei(o, t.id);
            return t.onEntry.push(qr(u, { delay: a })), t.onExit.push(Xn(u)), u;
          },
          i = ee(r)
            ? r.map(function (a, s) {
                var o = n(a.delay, s);
                return T(T({}, a), { event: o });
              })
            : et(
                Object.keys(r).map(function (a, s) {
                  var o = r[a],
                    u = H(o) ? { target: o } : o,
                    l = isNaN(+a) ? a : +a,
                    f = n(l, s);
                  return xt(u).map(function (h) {
                    return T(T({}, h), { event: f, delay: l });
                  });
                }),
              );
        return i.map(function (a) {
          var s = a.delay;
          return T(T({}, t.formatTransition(a)), { delay: s });
        });
      }),
      (e.prototype.getStateNodes = function (t) {
        var r,
          n = this;
        if (!t) return [];
        var i = t instanceof Ot ? t.value : ve(t, this.delimiter);
        if (H(i)) {
          var a = this.getStateNode(i).initial;
          return a !== void 0
            ? this.getStateNodes(((r = {}), (r[i] = a), r))
            : [this, this.states[i]];
        }
        var s = Object.keys(i),
          o = [this];
        return (
          o.push.apply(
            o,
            it(
              [],
              G(
                et(
                  s.map(function (u) {
                    return n.getStateNode(u).getStateNodes(i[u]);
                  }),
                ),
              ),
              !1,
            ),
          ),
          o
        );
      }),
      (e.prototype.handles = function (t) {
        var r = $r(t);
        return this.events.includes(r);
      }),
      (e.prototype.resolveState = function (t) {
        var r = t instanceof Ot ? t : Ot.create(t),
          n = Array.from(Xt([], this.getStateNodes(r.value)));
        return new Ot(
          T(T({}, r), {
            value: this.resolve(r.value),
            configuration: n,
            done: ye(n, this),
            tags: wr(n),
            machine: this.machine,
          }),
        );
      }),
      (e.prototype.transitionLeafNode = function (t, r, n) {
        var i = this.getStateNode(t),
          a = i.next(r, n);
        return !a || !a.transitions.length ? this.next(r, n) : a;
      }),
      (e.prototype.transitionCompoundNode = function (t, r, n) {
        var i = Object.keys(t),
          a = this.getStateNode(i[0]),
          s = a._transition(t[i[0]], r, n);
        return !s || !s.transitions.length ? this.next(r, n) : s;
      }),
      (e.prototype.transitionParallelNode = function (t, r, n) {
        var i,
          a,
          s = {};
        try {
          for (var o = U(Object.keys(t)), u = o.next(); !u.done; u = o.next()) {
            var l = u.value,
              f = t[l];
            if (!!f) {
              var h = this.getStateNode(l),
                c = h._transition(f, r, n);
              c && (s[l] = c);
            }
          }
        } catch (S) {
          i = { error: S };
        } finally {
          try {
            u && !u.done && (a = o.return) && a.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        var d = Object.keys(s).map(function (S) {
            return s[S];
          }),
          v = et(
            d.map(function (S) {
              return S.transitions;
            }),
          ),
          g = d.some(function (S) {
            return S.transitions.length > 0;
          });
        if (!g) return this.next(r, n);
        var w = et(
            d.map(function (S) {
              return S.entrySet;
            }),
          ),
          N = et(
            Object.keys(s).map(function (S) {
              return s[S].configuration;
            }),
          );
        return {
          transitions: v,
          entrySet: w,
          exitSet: et(
            d.map(function (S) {
              return S.exitSet;
            }),
          ),
          configuration: N,
          source: r,
          actions: et(
            Object.keys(s).map(function (S) {
              return s[S].actions;
            }),
          ),
        };
      }),
      (e.prototype._transition = function (t, r, n) {
        return H(t)
          ? this.transitionLeafNode(t, r, n)
          : Object.keys(t).length === 1
          ? this.transitionCompoundNode(t, r, n)
          : this.transitionParallelNode(t, r, n);
      }),
      (e.prototype.getTransitionData = function (t, r) {
        return this._transition(t.value, t, ut(r));
      }),
      (e.prototype.next = function (t, r) {
        var n,
          i,
          a = this,
          s = r.name,
          o = [],
          u = [],
          l;
        try {
          for (
            var f = U(this.getCandidates(s)), h = f.next();
            !h.done;
            h = f.next()
          ) {
            var c = h.value,
              d = c.cond,
              v = c.in,
              g = t.context,
              w = v
                ? H(v) && qt(v)
                  ? t.matches(ve(this.getStateNodeById(v).path, this.delimiter))
                  : nr(
                      ve(v, this.delimiter),
                      Bn(this.path.slice(0, -2))(t.value),
                    )
                : !0,
              N = !1;
            try {
              N = !d || Gr(this.machine, d, g, r, t);
            } catch (z) {
              throw new Error(
                "Unable to evaluate guard '"
                  .concat(d.name || d.type, "' in transition for event '")
                  .concat(s, "' in state node '")
                  .concat(
                    this.id,
                    `':
`,
                  )
                  .concat(z.message),
              );
            }
            if (N && w) {
              c.target !== void 0 && (u = c.target),
                o.push.apply(o, it([], G(c.actions), !1)),
                (l = c);
              break;
            }
          }
        } catch (z) {
          n = { error: z };
        } finally {
          try {
            h && !h.done && (i = f.return) && i.call(f);
          } finally {
            if (n) throw n.error;
          }
        }
        if (!!l) {
          if (!u.length)
            return {
              transitions: [l],
              entrySet: [],
              exitSet: [],
              configuration: t.value ? [this] : [],
              source: t,
              actions: o,
            };
          var S = et(
              u.map(function (z) {
                return a.getRelativeStateNodes(z, t.historyValue);
              }),
            ),
            O = !!l.internal,
            k = O
              ? []
              : et(
                  S.map(function (z) {
                    return a.nodesFromChild(z);
                  }),
                );
          return {
            transitions: [l],
            entrySet: k,
            exitSet: O ? [] : [this],
            configuration: S,
            source: t,
            actions: o,
          };
        }
      }),
      (e.prototype.nodesFromChild = function (t) {
        if (t.escapes(this)) return [];
        for (var r = [], n = t; n && n !== this; ) r.push(n), (n = n.parent);
        return r.push(this), r;
      }),
      (e.prototype.escapes = function (t) {
        if (this === t) return !1;
        for (var r = this.parent; r; ) {
          if (r === t) return !1;
          r = r.parent;
        }
        return !0;
      }),
      (e.prototype.getActions = function (t, r, n, i) {
        var a,
          s,
          o,
          u,
          l = Xt([], i ? this.getStateNodes(i.value) : [this]),
          f = t.configuration.length ? Xt(l, t.configuration) : l;
        try {
          for (var h = U(f), c = h.next(); !c.done; c = h.next()) {
            var d = c.value;
            Ne(l, d) || t.entrySet.push(d);
          }
        } catch (E) {
          a = { error: E };
        } finally {
          try {
            c && !c.done && (s = h.return) && s.call(h);
          } finally {
            if (a) throw a.error;
          }
        }
        try {
          for (var v = U(l), g = v.next(); !g.done; g = v.next()) {
            var d = g.value;
            (!Ne(f, d) || Ne(t.exitSet, d.parent)) && t.exitSet.push(d);
          }
        } catch (E) {
          o = { error: E };
        } finally {
          try {
            g && !g.done && (u = v.return) && u.call(v);
          } finally {
            if (o) throw o.error;
          }
        }
        var w = et(
          t.entrySet.map(function (E) {
            var m = [];
            if (E.type !== 'final') return m;
            var p = E.parent;
            if (!p.parent) return m;
            m.push(
              xe(E.id, E.doneData),
              xe(p.id, E.doneData ? De(E.doneData, r, n) : void 0),
            );
            var I = p.parent;
            return (
              I.type === 'parallel' &&
                te(I).every(function (D) {
                  return ye(t.configuration, D);
                }) &&
                m.push(xe(I.id)),
              m
            );
          }),
        );
        t.exitSet.sort(function (E, m) {
          return m.order - E.order;
        }),
          t.entrySet.sort(function (E, m) {
            return E.order - m.order;
          });
        var N = new Set(t.entrySet),
          S = new Set(t.exitSet),
          O = G(
            [
              et(
                Array.from(N).map(function (E) {
                  return it(
                    it(
                      [],
                      G(
                        E.activities.map(function (m) {
                          return Kn(m);
                        }),
                      ),
                      !1,
                    ),
                    G(E.onEntry),
                    !1,
                  );
                }),
              ).concat(w.map(Gn)),
              et(
                Array.from(S).map(function (E) {
                  return it(
                    it([], G(E.onExit), !1),
                    G(
                      E.activities.map(function (m) {
                        return Qn(m);
                      }),
                    ),
                    !1,
                  );
                }),
              ),
            ],
            2,
          ),
          k = O[0],
          z = O[1],
          R = Le(z.concat(t.actions).concat(k), this.machine.options.actions);
        return R;
      }),
      (e.prototype.transition = function (t, r, n) {
        t === void 0 && (t = this.initialState);
        var i = ut(r),
          a;
        if (t instanceof Ot)
          a = n === void 0 ? t : this.resolveState(Ot.from(t, n));
        else {
          var s = H(t)
              ? this.resolve(je(this.getResolvedPath(t)))
              : this.resolve(t),
            o = n != null ? n : this.machine.context;
          a = this.resolveState(Ot.from(s, o));
        }
        if (!ue && i.name === ce)
          throw new Error(
            "An event cannot have the wildcard type ('".concat(ce, "')"),
          );
        if (this.strict && !this.events.includes(i.name) && !Mn(i.name))
          throw new Error(
            "Machine '"
              .concat(this.id, "' does not accept event '")
              .concat(i.name, "'"),
          );
        var u = this._transition(a.value, a, i) || {
            transitions: [],
            configuration: [],
            entrySet: [],
            exitSet: [],
            source: a,
            actions: [],
          },
          l = Xt([], this.getStateNodes(a.value)),
          f = u.configuration.length ? Xt(l, u.configuration) : l;
        return (
          (u.configuration = it([], G(f), !1)),
          this.resolveTransition(u, a, a.context, i)
        );
      }),
      (e.prototype.resolveRaisedTransition = function (t, r, n) {
        var i,
          a = t.actions;
        return (
          (t = this.transition(t, r)),
          (t._event = n),
          (t.event = n.data),
          (i = t.actions).unshift.apply(i, it([], G(a), !1)),
          t
        );
      }),
      (e.prototype.resolveTransition = function (t, r, n, i) {
        var a,
          s,
          o = this;
        i === void 0 && (i = Pe);
        var u = t.configuration,
          l = !r || t.transitions.length > 0,
          f = l ? oi(this.machine, u) : void 0,
          h = r
            ? r.historyValue
              ? r.historyValue
              : t.source
              ? this.machine.historyValue(r.value)
              : void 0
            : void 0,
          c = this.getActions(t, n, i, r),
          d = r ? T({}, r.activities) : {};
        try {
          for (var v = U(c), g = v.next(); !g.done; g = v.next()) {
            var w = g.value;
            w.type === We
              ? (d[w.activity.id || w.activity.type] = w)
              : w.type === rr && (d[w.activity.id || w.activity.type] = !1);
          }
        } catch (Q) {
          a = { error: Q };
        } finally {
          try {
            g && !g.done && (s = v.return) && s.call(v);
          } finally {
            if (a) throw a.error;
          }
        }
        var N = G(
            Ke(this, r, n, i, c, this.machine.config.preserveActionOrder),
            2,
          ),
          S = N[0],
          O = N[1],
          k = G(
            Vr(S, function (Q) {
              return Q.type === Me || (Q.type === $e && Q.to === be.Internal);
            }),
            2,
          ),
          z = k[0],
          R = k[1],
          E = S.filter(function (Q) {
            var st;
            return (
              Q.type === We &&
              ((st = Q.activity) === null || st === void 0
                ? void 0
                : st.type) === Ge
            );
          }),
          m = E.reduce(
            function (Q, st) {
              return (Q[st.activity.id] = ri(st.activity, o.machine, O, i)), Q;
            },
            r ? T({}, r.children) : {},
          ),
          p = l ? t.configuration : r ? r.configuration : [],
          I = ye(p, this),
          D = new Ot({
            value: f || r.value,
            context: O,
            _event: i,
            _sessionid: r ? r._sessionid : null,
            historyValue: f
              ? h
                ? Un(h, f)
                : void 0
              : r
              ? r.historyValue
              : void 0,
            history: !f || t.source ? r : void 0,
            actions: f ? R : [],
            activities: f ? d : r ? r.activities : {},
            events: [],
            configuration: p,
            transitions: t.transitions,
            children: m,
            done: I,
            tags: wr(p),
            machine: this,
          }),
          P = n !== O;
        D.changed = i.name === Fr || P;
        var L = D.history;
        L && delete L.history;
        var q =
          !I &&
          (this._transient ||
            u.some(function (Q) {
              return Q._transient;
            }));
        if (!l && (!q || i.name === Kt)) return D;
        var rt = D;
        if (!I)
          for (
            q && (rt = this.resolveRaisedTransition(rt, { type: An }, i));
            z.length;

          ) {
            var kt = z.shift();
            rt = this.resolveRaisedTransition(rt, kt._event, i);
          }
        var at =
          rt.changed ||
          (L
            ? !!rt.actions.length ||
              P ||
              typeof L.value != typeof rt.value ||
              !Qr(rt.value, L.value)
            : void 0);
        return (rt.changed = at), (rt.history = L), rt;
      }),
      (e.prototype.getStateNode = function (t) {
        if (qt(t)) return this.machine.getStateNodeById(t);
        if (!this.states)
          throw new Error(
            "Unable to retrieve child state '"
              .concat(t, "' from '")
              .concat(this.id, "'; no child states exist."),
          );
        var r = this.states[t];
        if (!r)
          throw new Error(
            "Child state '"
              .concat(t, "' does not exist on '")
              .concat(this.id, "'"),
          );
        return r;
      }),
      (e.prototype.getStateNodeById = function (t) {
        var r = qt(t) ? t.slice(Ze.length) : t;
        if (r === this.id) return this;
        var n = this.machine.idMap[r];
        if (!n)
          throw new Error(
            "Child state node '#"
              .concat(r, "' does not exist on machine '")
              .concat(this.id, "'"),
          );
        return n;
      }),
      (e.prototype.getStateNodeByPath = function (t) {
        if (typeof t == 'string' && qt(t))
          try {
            return this.getStateNodeById(t.slice(1));
          } catch {}
        for (var r = qe(t, this.delimiter).slice(), n = this; r.length; ) {
          var i = r.shift();
          if (!i.length) break;
          n = n.getStateNode(i);
        }
        return n;
      }),
      (e.prototype.resolve = function (t) {
        var r,
          n = this;
        if (!t) return this.initialStateValue || Jt;
        switch (this.type) {
          case 'parallel':
            return fe(this.initialStateValue, function (a, s) {
              return a ? n.getStateNode(s).resolve(t[s] || a) : Jt;
            });
          case 'compound':
            if (H(t)) {
              var i = this.getStateNode(t);
              return i.type === 'parallel' || i.type === 'compound'
                ? ((r = {}), (r[t] = i.initialStateValue), r)
                : t;
            }
            return Object.keys(t).length
              ? fe(t, function (a, s) {
                  return a ? n.getStateNode(s).resolve(a) : Jt;
                })
              : this.initialStateValue || {};
          default:
            return t || Jt;
        }
      }),
      (e.prototype.getResolvedPath = function (t) {
        if (qt(t)) {
          var r = this.machine.idMap[t.slice(Ze.length)];
          if (!r) throw new Error("Unable to find state node '".concat(t, "'"));
          return r.path;
        }
        return qe(t, this.delimiter);
      }),
      Object.defineProperty(e.prototype, 'initialStateValue', {
        get: function () {
          var t;
          if (this.__cache.initialStateValue)
            return this.__cache.initialStateValue;
          var r;
          if (this.type === 'parallel')
            r = gr(
              this.states,
              function (n) {
                return n.initialStateValue || Jt;
              },
              function (n) {
                return n.type !== 'history';
              },
            );
          else if (this.initial !== void 0) {
            if (!this.states[this.initial])
              throw new Error(
                "Initial state '"
                  .concat(this.initial, "' not found on '")
                  .concat(this.key, "'"),
              );
            r = ze(this.states[this.initial])
              ? this.initial
              : ((t = {}),
                (t[this.initial] = this.states[this.initial].initialStateValue),
                t);
          } else r = {};
          return (
            (this.__cache.initialStateValue = r), this.__cache.initialStateValue
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.getInitialState = function (t, r) {
        this._init();
        var n = this.getStateNodes(t);
        return this.resolveTransition(
          {
            configuration: n,
            entrySet: n,
            exitSet: [],
            transitions: [],
            source: void 0,
            actions: [],
          },
          void 0,
          r != null ? r : this.machine.context,
          void 0,
        );
      }),
      Object.defineProperty(e.prototype, 'initialState', {
        get: function () {
          var t = this.initialStateValue;
          if (!t)
            throw new Error(
              "Cannot retrieve initial state from simple state '".concat(
                this.id,
                "'.",
              ),
            );
          return this.getInitialState(t);
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'target', {
        get: function () {
          var t;
          if (this.type === 'history') {
            var r = this.config;
            H(r.target)
              ? (t = qt(r.target)
                  ? je(
                      this.machine
                        .getStateNodeById(r.target)
                        .path.slice(this.path.length - 1),
                    )
                  : r.target)
              : (t = r.target);
          }
          return t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.getRelativeStateNodes = function (t, r, n) {
        return (
          n === void 0 && (n = !0),
          n
            ? t.type === 'history'
              ? t.resolveHistory(r)
              : t.initialStateNodes
            : [t]
        );
      }),
      Object.defineProperty(e.prototype, 'initialStateNodes', {
        get: function () {
          var t = this;
          if (ze(this)) return [this];
          if (this.type === 'compound' && !this.initial)
            return (
              ue ||
                pe(
                  !1,
                  "Compound state node '".concat(
                    this.id,
                    "' has no initial state.",
                  ),
                ),
              [this]
            );
          var r = Oe(this.initialStateValue);
          return et(
            r.map(function (n) {
              return t.getFromRelativePath(n);
            }),
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.getFromRelativePath = function (t) {
        if (!t.length) return [this];
        var r = G(t),
          n = r[0],
          i = r.slice(1);
        if (!this.states)
          throw new Error(
            "Cannot retrieve subPath '".concat(n, "' from node with no states"),
          );
        var a = this.getStateNode(n);
        if (a.type === 'history') return a.resolveHistory();
        if (!this.states[n])
          throw new Error(
            "Child state '"
              .concat(n, "' does not exist on '")
              .concat(this.id, "'"),
          );
        return this.states[n].getFromRelativePath(i);
      }),
      (e.prototype.historyValue = function (t) {
        if (!!Object.keys(this.states).length)
          return {
            current: t || this.initialStateValue,
            states: gr(
              this.states,
              function (r, n) {
                if (!t) return r.historyValue();
                var i = H(t) ? void 0 : t[n];
                return r.historyValue(i || r.initialStateValue);
              },
              function (r) {
                return !r.history;
              },
            ),
          };
      }),
      (e.prototype.resolveHistory = function (t) {
        var r = this;
        if (this.type !== 'history') return [this];
        var n = this.parent;
        if (!t) {
          var i = this.target;
          return i
            ? et(
                Oe(i).map(function (s) {
                  return n.getFromRelativePath(s);
                }),
              )
            : n.initialStateNodes;
        }
        var a = Fn(n.path, 'states')(t).current;
        return H(a)
          ? [n.getStateNode(a)]
          : et(
              Oe(a).map(function (s) {
                return r.history === 'deep'
                  ? n.getFromRelativePath(s)
                  : [n.states[s[0]]];
              }),
            );
      }),
      Object.defineProperty(e.prototype, 'stateIds', {
        get: function () {
          var t = this,
            r = et(
              Object.keys(this.states).map(function (n) {
                return t.states[n].stateIds;
              }),
            );
          return [this.id].concat(r);
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'events', {
        get: function () {
          var t, r, n, i;
          if (this.__cache.events) return this.__cache.events;
          var a = this.states,
            s = new Set(this.ownEvents);
          if (a)
            try {
              for (
                var o = U(Object.keys(a)), u = o.next();
                !u.done;
                u = o.next()
              ) {
                var l = u.value,
                  f = a[l];
                if (f.states)
                  try {
                    for (
                      var h = ((n = void 0), U(f.events)), c = h.next();
                      !c.done;
                      c = h.next()
                    ) {
                      var d = c.value;
                      s.add(''.concat(d));
                    }
                  } catch (v) {
                    n = { error: v };
                  } finally {
                    try {
                      c && !c.done && (i = h.return) && i.call(h);
                    } finally {
                      if (n) throw n.error;
                    }
                  }
              }
            } catch (v) {
              t = { error: v };
            } finally {
              try {
                u && !u.done && (r = o.return) && r.call(o);
              } finally {
                if (t) throw t.error;
              }
            }
          return (this.__cache.events = Array.from(s));
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'ownEvents', {
        get: function () {
          var t = new Set(
            this.transitions
              .filter(function (r) {
                return !(!r.target && !r.actions.length && r.internal);
              })
              .map(function (r) {
                return r.eventType;
              }),
          );
          return Array.from(t);
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.resolveTarget = function (t) {
        var r = this;
        if (t !== void 0)
          return t.map(function (n) {
            if (!H(n)) return n;
            var i = n[0] === r.delimiter;
            if (i && !r.parent) return r.getStateNodeByPath(n.slice(1));
            var a = i ? r.key + n : n;
            if (r.parent)
              try {
                var s = r.parent.getStateNodeByPath(a);
                return s;
              } catch (o) {
                throw new Error(
                  "Invalid transition definition for state node '"
                    .concat(
                      r.id,
                      `':
`,
                    )
                    .concat(o.message),
                );
              }
            else return r.getStateNodeByPath(a);
          });
      }),
      (e.prototype.formatTransition = function (t) {
        var r = this,
          n = Hn(t.target),
          i =
            'internal' in t
              ? t.internal
              : n
              ? n.some(function (u) {
                  return H(u) && u[0] === r.delimiter;
                })
              : !0,
          a = this.machine.options.guards,
          s = this.resolveTarget(n),
          o = T(T({}, t), {
            actions: Le(xt(t.actions)),
            cond: Hr(t.cond, a),
            target: s,
            source: this,
            internal: i,
            eventType: t.event,
            toJSON: function () {
              return T(T({}, o), {
                target: o.target
                  ? o.target.map(function (u) {
                      return '#'.concat(u.id);
                    })
                  : void 0,
                source: '#'.concat(r.id),
              });
            },
          });
        return o;
      }),
      (e.prototype.formatTransitions = function () {
        var t,
          r,
          n = this,
          i;
        if (!this.config.on) i = [];
        else if (Array.isArray(this.config.on)) i = this.config.on;
        else {
          var a = this.config.on,
            s = ce,
            o = a[s],
            u = o === void 0 ? [] : o,
            l = er(a, [typeof s == 'symbol' ? s : s + '']);
          i = et(
            Object.keys(l)
              .map(function (S) {
                !ue &&
                  S === Kt &&
                  pe(
                    !1,
                    "Empty string transition configs (e.g., `{ on: { '': ... }}`) for transient transitions are deprecated. Specify the transition in the `{ always: ... }` property instead. " +
                      'Please check the `on` configuration for "#'.concat(
                        n.id,
                        '".',
                      ),
                  );
                var O = Gt(S, l[S]);
                return ue || Si(n, S, O), O;
              })
              .concat(Gt(ce, u)),
          );
        }
        var f = this.config.always ? Gt('', this.config.always) : [],
          h = this.config.onDone
            ? Gt(String(xe(this.id)), this.config.onDone)
            : [];
        ue ||
          pe(
            !(this.config.onDone && !this.parent),
            'Root nodes cannot have an ".onDone" transition. Please check the config of "'.concat(
              this.id,
              '".',
            ),
          );
        var c = et(
            this.invoke.map(function (S) {
              var O = [];
              return (
                S.onDone &&
                  O.push.apply(
                    O,
                    it([], G(Gt(String(Ie(S.id)), S.onDone)), !1),
                  ),
                S.onError &&
                  O.push.apply(
                    O,
                    it([], G(Gt(String(he(S.id)), S.onError)), !1),
                  ),
                O
              );
            }),
          ),
          d = this.after,
          v = et(
            it(it(it(it([], G(h), !1), G(c), !1), G(i), !1), G(f), !1).map(
              function (S) {
                return xt(S).map(function (O) {
                  return n.formatTransition(O);
                });
              },
            ),
          );
        try {
          for (var g = U(d), w = g.next(); !w.done; w = g.next()) {
            var N = w.value;
            v.push(N);
          }
        } catch (S) {
          t = { error: S };
        } finally {
          try {
            w && !w.done && (r = g.return) && r.call(g);
          } finally {
            if (t) throw t.error;
          }
        }
        return v;
      }),
      e
    );
  })();
function Ei(e, t) {
  return new _i(e, t);
}
var Yt = ti,
  Be =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (Be =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++) {
              t = arguments[r];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        Be.apply(this, arguments)
      );
    },
  xi =
    (globalThis && globalThis.__rest) ||
    function (e, t) {
      var r = {};
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) &&
          t.indexOf(n) < 0 &&
          (r[n] = e[n]);
      if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
          t.indexOf(n[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
            (r[n[i]] = e[n[i]]);
      return r;
    },
  Ti =
    (globalThis && globalThis.__read) ||
    function (e, t) {
      var r = typeof Symbol == 'function' && e[Symbol.iterator];
      if (!r) return e;
      var n = r.call(e),
        i,
        a = [],
        s;
      try {
        for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
          a.push(i.value);
      } catch (o) {
        s = { error: o };
      } finally {
        try {
          i && !i.done && (r = n.return) && r.call(n);
        } finally {
          if (s) throw s.error;
        }
      }
      return a;
    };
function ki(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  var n = Ti(t, 1),
    i = n[0],
    a = i === void 0 ? {} : i,
    s = a.context,
    o = a.guards,
    u = a.actions,
    l = a.activities,
    f = a.services,
    h = a.delays,
    c = a.state,
    d = xi(a, [
      'context',
      'guards',
      'actions',
      'activities',
      'services',
      'delays',
      'state',
    ]),
    v = {
      context: s,
      guards: o,
      actions: u,
      activities: l,
      services: f,
      delays: h,
    },
    g = e.withConfig(v, function () {
      return Be(Be({}, e.context), s);
    }),
    w = Zr(g, d).start(c ? new Ot(c) : void 0);
  Ar(function () {
    return w.stop();
  });
  var N = dn(w.state, function (S) {
    return w.subscribe(function (O) {
      O.changed && S(O);
    }).unsubscribe;
  });
  return { state: N, send: w.send, service: w };
}
const Oi = Ei(
    {
      tsTypes: {},
      schema: { context: {}, events: {} },
      id: 'clock',
      context: {
        remainingSeries: 0,
        remainingRest: 0,
        totalSeries: 0,
        totalRest: 0,
        exerciseId: null,
      },
      initial: 'unset',
      states: {
        unset: {
          on: { SET_ACTIVITY: { target: 'idle', actions: ['setActivity'] } },
        },
        idle: {
          on: {
            RUN: { target: 'running', actions: ['startClock'] },
            TOGGLE: { target: 'running', actions: ['startClock'] },
            FAST_FORWARD: {
              target: 'idle',
              actions: ['fastForward'],
              cond: 'canFastForward',
            },
            REWIND: { target: 'idle', actions: ['rewind'], cond: 'canRewind' },
            RESET: { target: 'idle', actions: ['reset'] },
          },
        },
        running: {
          invoke: {
            src: () => (e) => {
              const t = setInterval(() => {
                e({ type: 'TICK' });
              }, 1e3);
              return () => {
                clearInterval(t);
              };
            },
          },
          exit: ['startNextSession'],
          always: [{ target: 'idle', cond: (e) => e.remainingRest < 0 }],
          on: {
            TOGGLE: { target: 'pause' },
            TICK: { actions: ['tick'] },
            FINISH: 'idle',
          },
        },
        pause: {
          on: {
            TOGGLE: 'running',
            RESET: { target: 'idle', actions: ['reset'] },
          },
        },
      },
    },
    {
      actions: {
        setActivity: Yt((e, { payload: t }) => {
          var n, i;
          return {
            exerciseId: t.exerciseId,
            totalRest: t.totalRest,
            totalSeries: t.totalSeries,
            remainingRest: (n = t.remainingRest) != null ? n : t.totalRest,
            remainingSeries: (i = t.remainingSeries) != null ? i : 1,
          };
        }),
        startClock(e) {
          return e;
        },
        tick: Yt({ remainingRest: (e) => e.remainingRest - 1 }),
        startNextSession: Yt((e, t) =>
          t.type === ''
            ? (Pr.beep(),
              {
                remainingSeries: e.remainingSeries + 1,
                remainingRest: e.totalRest,
              })
            : e,
        ),
        fastForward: Yt({ remainingSeries: (e) => e.remainingSeries + 1 }),
        rewind: Yt({ remainingSeries: (e) => e.remainingSeries - 1 }),
        reset: Yt({ remainingSeries: 1, remainingRest: (e) => e.totalRest }),
      },
      guards: { canFastForward: tn, canRewind: en },
    },
  ),
  Qt = ki(Oi);
Qt.service.start();
function tn(e) {
  return e.remainingSeries < e.totalSeries;
}
function en(e) {
  return e.remainingSeries > 1;
}
function rn(e) {
  var t;
  {
    const r = (t = nn()) != null ? t : {};
    r && (r[e.exerciseId] = e),
      localStorage.setItem('activityStore_clock_2', JSON.stringify(r));
  }
}
function nn() {
  {
    const e = localStorage.getItem('activityStore_clock_2');
    return e ? JSON.parse(e) : null;
  }
}
function Ii(e) {
  const t = Ht({}, e),
    r = setInterval(() => {
      t.remainingRest >= 0
        ? t.remainingRest--
        : (t.remainingSeries++,
          (t.remainingRest = t.totalRest),
          (t.state = 'idle'),
          clearInterval(r),
          Pr.beep()),
        rn(t);
    }, 1e3);
}
function Ni(e) {
  let t, r;
  return {
    c() {
      (t = It('svg')), (r = It('path')), this.h();
    },
    l(n) {
      t = Nt(n, 'svg', {
        xmlns: !0,
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
      });
      var i = A(t);
      (r = Nt(i, 'path', { 'fill-rule': !0, d: !0, 'clip-rule': !0 })),
        A(r).forEach(y),
        i.forEach(y),
        this.h();
    },
    h() {
      _(r, 'fill-rule', 'evenodd'),
        _(
          r,
          'd',
          'M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z',
        ),
        _(r, 'clip-rule', 'evenodd'),
        _(t, 'xmlns', 'http://www.w3.org/2000/svg'),
        _(t, 'width', e[0]),
        _(t, 'height', e[1]),
        _(t, 'viewBox', '0 0 20 20'),
        _(t, 'fill', 'currentColor');
    },
    m(n, i) {
      B(n, t, i), b(t, r);
    },
    p(n, [i]) {
      i & 1 && _(t, 'width', n[0]), i & 2 && _(t, 'height', n[1]);
    },
    i: ot,
    o: ot,
    d(n) {
      n && y(t);
    },
  };
}
function Ri(e, t, r) {
  let { size: n = '20px' } = t,
    { width: i = n } = t,
    { height: a = n } = t;
  return (
    (e.$$set = (s) => {
      'size' in s && r(2, (n = s.size)),
        'width' in s && r(0, (i = s.width)),
        'height' in s && r(1, (a = s.height));
    }),
    [i, a, n]
  );
}
class Ai extends mt {
  constructor(t) {
    super(), bt(this, t, Ri, Ni, wt, { size: 2, width: 0, height: 1 });
  }
}
function Ci(e) {
  let t, r;
  return (
    (t = new xn({ props: { size: '80' } })),
    {
      c() {
        ct(t.$$.fragment);
      },
      l(n) {
        ft(t.$$.fragment, n);
      },
      m(n, i) {
        ht(t, n, i), (r = !0);
      },
      i(n) {
        r || (J(t.$$.fragment, n), (r = !0));
      },
      o(n) {
        K(t.$$.fragment, n), (r = !1);
      },
      d(n) {
        dt(t, n);
      },
    }
  );
}
function ji(e) {
  let t, r;
  return (
    (t = new Sn({ props: { size: '80' } })),
    {
      c() {
        ct(t.$$.fragment);
      },
      l(n) {
        ft(t.$$.fragment, n);
      },
      m(n, i) {
        ht(t, n, i), (r = !0);
      },
      i(n) {
        r || (J(t.$$.fragment, n), (r = !0));
      },
      o(n) {
        K(t.$$.fragment, n), (r = !1);
      },
      d(n) {
        dt(t, n);
      },
    }
  );
}
function Di(e) {
  let t,
    r,
    n,
    i,
    a,
    s,
    o,
    u = e[1].remainingSeries + '',
    l,
    f,
    h = e[1].totalSeries + '',
    c,
    d,
    v,
    g,
    w,
    N,
    S,
    O = vr(e[2].context.remainingRest) + '',
    k,
    z,
    R,
    E,
    m,
    p,
    I,
    D,
    P,
    L,
    q,
    rt,
    kt,
    at,
    Q,
    st,
    Rt,
    yt,
    St,
    lt,
    Bt,
    Wt;
  m = new Rn({ props: { size: '60' } });
  const At = [ji, Ci],
    _t = [];
  function re(V, $) {
    return V[0] === 'pause' || V[0] === 'idle' ? 0 : 1;
  }
  return (
    (D = re(e)),
    (P = _t[D] = At[D](e)),
    (rt = new On({ props: { size: '60' } })),
    (St = new Ai({ props: { size: '32' } })),
    {
      c() {
        (t = C('div')),
          (r = C('div')),
          (n = C('section')),
          (i = C('h3')),
          (a = Z('Series')),
          (s = F()),
          (o = C('span')),
          (l = Z(u)),
          (f = Z('/')),
          (c = Z(h)),
          (d = F()),
          (v = C('section')),
          (g = C('h3')),
          (w = Z('Time left')),
          (N = F()),
          (S = C('span')),
          (k = Z(O)),
          (z = F()),
          (R = C('div')),
          (E = C('button')),
          ct(m.$$.fragment),
          (p = F()),
          (I = C('button')),
          P.c(),
          (L = F()),
          (q = C('button')),
          ct(rt.$$.fragment),
          (kt = F()),
          (at = C('section')),
          (Q = C('h3')),
          (st = Z('Reset Counter')),
          (Rt = F()),
          (yt = C('button')),
          ct(St.$$.fragment),
          this.h();
      },
      l(V) {
        t = j(V, 'DIV', { class: !0 });
        var $ = A(t);
        r = j($, 'DIV', { class: !0 });
        var x = A(r);
        n = j(x, 'SECTION', {});
        var W = A(n);
        i = j(W, 'H3', { class: !0 });
        var nt = A(i);
        (a = tt(nt, 'Series')),
          nt.forEach(y),
          (s = M(W)),
          (o = j(W, 'SPAN', { class: !0 }));
        var gt = A(o);
        (l = tt(gt, u)),
          (f = tt(gt, '/')),
          (c = tt(gt, h)),
          gt.forEach(y),
          W.forEach(y),
          (d = M(x)),
          (v = j(x, 'SECTION', {}));
        var Ft = A(v);
        g = j(Ft, 'H3', { class: !0 });
        var Mt = A(g);
        (w = tt(Mt, 'Time left')),
          Mt.forEach(y),
          (N = M(Ft)),
          (S = j(Ft, 'SPAN', { class: !0 }));
        var ne = A(S);
        (k = tt(ne, O)),
          ne.forEach(y),
          Ft.forEach(y),
          x.forEach(y),
          (z = M($)),
          (R = j($, 'DIV', { class: !0 }));
        var Et = A(R);
        E = j(Et, 'BUTTON', { class: !0 });
        var ie = A(E);
        ft(m.$$.fragment, ie),
          ie.forEach(y),
          (p = M(Et)),
          (I = j(Et, 'BUTTON', { class: !0 }));
        var ae = A(I);
        P.l(ae),
          ae.forEach(y),
          (L = M(Et)),
          (q = j(Et, 'BUTTON', { class: !0 }));
        var se = A(q);
        ft(rt.$$.fragment, se),
          se.forEach(y),
          Et.forEach(y),
          (kt = M($)),
          (at = j($, 'SECTION', { class: !0 }));
        var Ct = A(at);
        Q = j(Ct, 'H3', { class: !0 });
        var oe = A(Q);
        (st = tt(oe, 'Reset Counter')),
          oe.forEach(y),
          (Rt = M(Ct)),
          (yt = j(Ct, 'BUTTON', { class: !0 }));
        var $t = A(yt);
        ft(St.$$.fragment, $t),
          $t.forEach(y),
          Ct.forEach(y),
          $.forEach(y),
          this.h();
      },
      h() {
        _(i, 'class', 'svelte-5g55m'),
          _(o, 'class', 'svelte-5g55m'),
          _(g, 'class', 'svelte-5g55m'),
          _(S, 'class', 'svelte-5g55m'),
          _(r, 'class', 'info svelte-5g55m'),
          _(E, 'class', 'action svelte-5g55m'),
          (E.disabled = e[5]),
          _(I, 'class', 'action start svelte-5g55m'),
          _(q, 'class', 'action svelte-5g55m'),
          (q.disabled = e[4]),
          _(R, 'class', 'actions svelte-5g55m'),
          _(Q, 'class', 'sectionTitle svelte-5g55m'),
          _(yt, 'class', 'reset svelte-5g55m'),
          (yt.disabled = e[3]),
          _(at, 'class', 'resetWrapper svelte-5g55m'),
          _(t, 'class', 'clockWrapper svelte-5g55m');
      },
      m(V, $) {
        B(V, t, $),
          b(t, r),
          b(r, n),
          b(n, i),
          b(i, a),
          b(n, s),
          b(n, o),
          b(o, l),
          b(o, f),
          b(o, c),
          b(r, d),
          b(r, v),
          b(v, g),
          b(g, w),
          b(v, N),
          b(v, S),
          b(S, k),
          b(t, z),
          b(t, R),
          b(R, E),
          ht(m, E, null),
          b(R, p),
          b(R, I),
          _t[D].m(I, null),
          b(R, L),
          b(R, q),
          ht(rt, q, null),
          b(t, kt),
          b(t, at),
          b(at, Q),
          b(Q, st),
          b(at, Rt),
          b(at, yt),
          ht(St, yt, null),
          (lt = !0),
          Bt ||
            ((Wt = [
              Tt(E, 'click', e[8]),
              Tt(I, 'click', e[9]),
              Tt(q, 'click', e[10]),
              Tt(yt, 'click', e[11]),
            ]),
            (Bt = !0));
      },
      p(V, [$]) {
        (!lt || $ & 2) && u !== (u = V[1].remainingSeries + '') && Lt(l, u),
          (!lt || $ & 2) && h !== (h = V[1].totalSeries + '') && Lt(c, h),
          (!lt || $ & 4) &&
            O !== (O = vr(V[2].context.remainingRest) + '') &&
            Lt(k, O),
          (!lt || $ & 32) && (E.disabled = V[5]);
        let x = D;
        (D = re(V)),
          D !== x &&
            (ge(),
            K(_t[x], 1, 1, () => {
              _t[x] = null;
            }),
            me(),
            (P = _t[D]),
            P || ((P = _t[D] = At[D](V)), P.c()),
            J(P, 1),
            P.m(I, null)),
          (!lt || $ & 16) && (q.disabled = V[4]),
          (!lt || $ & 8) && (yt.disabled = V[3]);
      },
      i(V) {
        lt ||
          (J(m.$$.fragment, V),
          J(P),
          J(rt.$$.fragment, V),
          J(St.$$.fragment, V),
          (lt = !0));
      },
      o(V) {
        K(m.$$.fragment, V),
          K(P),
          K(rt.$$.fragment, V),
          K(St.$$.fragment, V),
          (lt = !1);
      },
      d(V) {
        V && y(t), dt(m), _t[D].d(), dt(rt), dt(St), (Bt = !1), Cr(Wt);
      },
    }
  );
}
function Pi(e, t, r) {
  let n, i, a, s, o, u, l;
  Ae(e, Ut, (w) => r(12, (u = w)));
  const { send: f, state: h } = Qt;
  Ae(e, h, (w) => r(2, (l = w))),
    cn(() => {
      Qt.service.start();
      const N = (nn() || {})[u.currentTraining._key];
      N
        ? (Qt.send({ type: 'SET_ACTIVITY', payload: N }),
          N.state === 'running' && Qt.send({ type: 'RUN' }))
        : Qt.send({
            type: 'SET_ACTIVITY',
            payload: {
              exerciseId: u.currentTraining._key,
              totalRest: u.currentTraining.restTime,
              totalSeries: u.currentTraining.series,
            },
          });
    }),
    Ar(() => {
      const w = le(Ht({}, n), { state: i });
      rn(w), i === 'running' && Ii(w);
    });
  const c = () => {
      f('REWIND');
    },
    d = () => {
      f('TOGGLE');
    },
    v = () => {
      f('FAST_FORWARD');
    },
    g = () => {
      confirm('Are you sure you want to clear the clock?') && f('RESET');
    };
  return (
    (e.$$.update = () => {
      e.$$.dirty & 4 && r(1, (n = l.context)),
        e.$$.dirty & 4 && r(0, (i = l.value)),
        e.$$.dirty & 3 && r(5, (a = i !== 'idle' || !en(n))),
        e.$$.dirty & 3 && r(4, (s = i !== 'idle' || !tn(n))),
        e.$$.dirty & 1 && r(3, (o = i === 'running' || i === 'unset'));
    }),
    [i, n, l, o, s, a, f, h, c, d, v, g]
  );
}
class Li extends mt {
  constructor(t) {
    super(), bt(this, t, Pi, Di, wt, {});
  }
}
function zi(e) {
  let t, r, n, i, a, s, o;
  return (
    (t = new Fe({ props: { title: 'Image' } })),
    {
      c() {
        ct(t.$$.fragment),
          (r = F()),
          (n = C('figure')),
          (i = C('img')),
          this.h();
      },
      l(u) {
        ft(t.$$.fragment, u), (r = M(u)), (n = j(u, 'FIGURE', { class: !0 }));
        var l = A(n);
        (i = j(l, 'IMG', { class: !0, src: !0, alt: !0 })),
          l.forEach(y),
          this.h();
      },
      h() {
        _(i, 'class', 'object-cover object-center w-full h-full'),
          jr(i.src, (a = e[0].image.url)) || _(i, 'src', a),
          _(i, 'alt', (s = e[0].name)),
          _(n, 'class', 'aspect-w-16 aspect-h-9');
      },
      m(u, l) {
        ht(t, u, l), B(u, r, l), B(u, n, l), b(n, i), (o = !0);
      },
      p: ot,
      i(u) {
        o || (J(t.$$.fragment, u), (o = !0));
      },
      o(u) {
        K(t.$$.fragment, u), (o = !1);
      },
      d(u) {
        dt(t, u), u && y(r), u && y(n);
      },
    }
  );
}
function Bi(e) {
  var c, d;
  let t, r, n, i, a, s, o, u, l, f;
  t = new Fe({ props: { title: 'Video' } });
  let h =
    ((d = (c = e[0]) == null ? void 0 : c.image) == null ? void 0 : d.url) &&
    zi(e);
  return {
    c() {
      ct(t.$$.fragment),
        (r = F()),
        (n = C('div')),
        (i = C('iframe')),
        (s = F()),
        (o = C('br')),
        (u = F()),
        h && h.c(),
        (l = Ce()),
        this.h();
    },
    l(v) {
      ft(t.$$.fragment, v), (r = M(v)), (n = j(v, 'DIV', { class: !0 }));
      var g = A(n);
      (i = j(g, 'IFRAME', { src: !0, title: !0, frameborder: !0, allow: !0 })),
        A(i).forEach(y),
        g.forEach(y),
        (s = M(v)),
        (o = j(v, 'BR', {})),
        (u = M(v)),
        h && h.l(v),
        (l = Ce()),
        this.h();
    },
    h() {
      jr(i.src, (a = e[1])) || _(i, 'src', a),
        _(i, 'title', 'YouTube video player'),
        _(i, 'frameborder', '0'),
        _(
          i,
          'allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        ),
        (i.allowFullscreen = !0),
        _(n, 'class', 'aspect-w-2 aspect-h-1');
    },
    m(v, g) {
      ht(t, v, g),
        B(v, r, g),
        B(v, n, g),
        b(n, i),
        B(v, s, g),
        B(v, o, g),
        B(v, u, g),
        h && h.m(v, g),
        B(v, l, g),
        (f = !0);
    },
    p(v, [g]) {
      var w, N;
      (N = (w = v[0]) == null ? void 0 : w.image) != null && N.url && h.p(v, g);
    },
    i(v) {
      f || (J(t.$$.fragment, v), J(h), (f = !0));
    },
    o(v) {
      K(t.$$.fragment, v), K(h), (f = !1);
    },
    d(v) {
      dt(t, v),
        v && y(r),
        v && y(n),
        v && y(s),
        v && y(o),
        v && y(u),
        h && h.d(v),
        v && y(l);
    },
  };
}
function Fi(e, t, r) {
  let n;
  Ae(e, Ut, (s) => r(2, (n = s)));
  let i = n.currentTraining.exercise;
  const a = i.youtubeVideoId
    ? `https://www.youtube.com/embed/${i.youtubeVideoId}`
    : void 0;
  return [i, a];
}
class Mi extends mt {
  constructor(t) {
    super(), bt(this, t, Fi, Bi, wt, {});
  }
}
function _r(e, t, r) {
  const n = e.slice();
  return (n[4] = t[r]), (n[11] = r), n;
}
function Er(e) {
  let t,
    r,
    n = e[11] + 1 + '',
    i,
    a,
    s,
    o = e[4] + '',
    u,
    l;
  return {
    c() {
      (t = C('tr')),
        (r = C('td')),
        (i = Z(n)),
        (a = F()),
        (s = C('td')),
        (u = Z(o)),
        (l = F()),
        this.h();
    },
    l(f) {
      t = j(f, 'TR', {});
      var h = A(t);
      r = j(h, 'TD', { class: !0 });
      var c = A(r);
      (i = tt(c, n)), c.forEach(y), (a = M(h)), (s = j(h, 'TD', { class: !0 }));
      var d = A(s);
      (u = tt(d, o)), d.forEach(y), (l = M(h)), h.forEach(y), this.h();
    },
    h() {
      _(r, 'class', 'svelte-v4y26p'), _(s, 'class', 'svelte-v4y26p');
    },
    m(f, h) {
      B(f, t, h), b(t, r), b(r, i), b(t, a), b(t, s), b(s, u), b(t, l);
    },
    p(f, h) {
      h & 16 && o !== (o = f[4] + '') && Lt(u, o);
    },
    d(f) {
      f && y(t);
    },
  };
}
function $i(e) {
  let t,
    r,
    n,
    i,
    a,
    s,
    o,
    u,
    l,
    f,
    h,
    c,
    d,
    v,
    g,
    w,
    N,
    S,
    O,
    k,
    z,
    R,
    E,
    m,
    p,
    I,
    D,
    P,
    L,
    q,
    rt,
    kt,
    at,
    Q,
    st,
    Rt,
    yt,
    St,
    lt,
    Bt,
    Wt,
    At,
    _t,
    re,
    V = e[4],
    $ = [];
  for (let x = 0; x < V.length; x += 1) $[x] = Er(_r(e, V, x));
  return {
    c() {
      (t = C('fieldset')),
        (r = C('label')),
        (n = Z('Initial Weight:')),
        (i = F()),
        (a = C('input')),
        (s = F()),
        (o = C('fieldset')),
        (u = C('label')),
        (l = Z('Percentage:')),
        (f = F()),
        (h = C('input')),
        (c = F()),
        (d = C('fieldset')),
        (v = C('label')),
        (g = Z('Round:')),
        (w = F()),
        (N = C('input')),
        (S = F()),
        (O = C('fieldset')),
        (k = C('label')),
        (z = Z('Times:')),
        (R = F()),
        (E = C('input')),
        (m = F()),
        (p = C('button')),
        (I = Z('Calculate')),
        (D = F()),
        (P = C('hr')),
        (L = F()),
        (q = C('h2')),
        (rt = Z('Result')),
        (kt = F()),
        (at = C('table')),
        (Q = C('thead')),
        (st = C('tr')),
        (Rt = C('th')),
        (yt = Z('Order')),
        (St = F()),
        (lt = C('th')),
        (Bt = Z('Weight(kg)')),
        (Wt = F()),
        (At = C('tbody'));
      for (let x = 0; x < $.length; x += 1) $[x].c();
      this.h();
    },
    l(x) {
      t = j(x, 'FIELDSET', { class: !0 });
      var W = A(t);
      r = j(W, 'LABEL', { for: !0, class: !0 });
      var nt = A(r);
      (n = tt(nt, 'Initial Weight:')),
        nt.forEach(y),
        (i = M(W)),
        (a = j(W, 'INPUT', { type: !0, id: !0, class: !0 })),
        W.forEach(y),
        (s = M(x)),
        (o = j(x, 'FIELDSET', { class: !0 }));
      var gt = A(o);
      u = j(gt, 'LABEL', { for: !0, class: !0 });
      var Ft = A(u);
      (l = tt(Ft, 'Percentage:')),
        Ft.forEach(y),
        (f = M(gt)),
        (h = j(gt, 'INPUT', { type: !0, id: !0, class: !0 })),
        gt.forEach(y),
        (c = M(x)),
        (d = j(x, 'FIELDSET', { class: !0 }));
      var Mt = A(d);
      v = j(Mt, 'LABEL', { for: !0, class: !0 });
      var ne = A(v);
      (g = tt(ne, 'Round:')),
        ne.forEach(y),
        (w = M(Mt)),
        (N = j(Mt, 'INPUT', { type: !0, id: !0, class: !0 })),
        Mt.forEach(y),
        (S = M(x)),
        (O = j(x, 'FIELDSET', { class: !0 }));
      var Et = A(O);
      k = j(Et, 'LABEL', { for: !0, class: !0 });
      var ie = A(k);
      (z = tt(ie, 'Times:')),
        ie.forEach(y),
        (R = M(Et)),
        (E = j(Et, 'INPUT', { type: !0, id: !0, class: !0 })),
        Et.forEach(y),
        (m = M(x)),
        (p = j(x, 'BUTTON', { class: !0 }));
      var ae = A(p);
      (I = tt(ae, 'Calculate')),
        ae.forEach(y),
        (D = M(x)),
        (P = j(x, 'HR', { class: !0 })),
        (L = M(x)),
        (q = j(x, 'H2', { class: !0 }));
      var se = A(q);
      (rt = tt(se, 'Result')),
        se.forEach(y),
        (kt = M(x)),
        (at = j(x, 'TABLE', { class: !0 }));
      var Ct = A(at);
      Q = j(Ct, 'THEAD', {});
      var oe = A(Q);
      st = j(oe, 'TR', {});
      var $t = A(st);
      Rt = j($t, 'TH', {});
      var or = A(Rt);
      (yt = tt(or, 'Order')),
        or.forEach(y),
        (St = M($t)),
        (lt = j($t, 'TH', {}));
      var lr = A(lt);
      (Bt = tt(lr, 'Weight(kg)')),
        lr.forEach(y),
        $t.forEach(y),
        oe.forEach(y),
        (Wt = M(Ct)),
        (At = j(Ct, 'TBODY', {}));
      var ur = A(At);
      for (let Ue = 0; Ue < $.length; Ue += 1) $[Ue].l(ur);
      ur.forEach(y), Ct.forEach(y), this.h();
    },
    h() {
      _(r, 'for', 'initialWeight'),
        _(r, 'class', 'svelte-v4y26p'),
        _(a, 'type', 'number'),
        _(a, 'id', 'initialWeight'),
        _(a, 'class', 'svelte-v4y26p'),
        _(t, 'class', 'svelte-v4y26p'),
        _(u, 'for', 'percentage'),
        _(u, 'class', 'svelte-v4y26p'),
        _(h, 'type', 'number'),
        _(h, 'id', 'percentage'),
        _(h, 'class', 'svelte-v4y26p'),
        _(o, 'class', 'svelte-v4y26p'),
        _(v, 'for', 'round'),
        _(v, 'class', 'svelte-v4y26p'),
        _(N, 'type', 'checkbox'),
        _(N, 'id', 'round'),
        _(N, 'class', 'svelte-v4y26p'),
        _(d, 'class', 'svelte-v4y26p'),
        _(k, 'for', 'initialWeight'),
        _(k, 'class', 'svelte-v4y26p'),
        _(E, 'type', 'number'),
        _(E, 'id', 'initialWeight'),
        _(E, 'class', 'svelte-v4y26p'),
        _(O, 'class', 'svelte-v4y26p'),
        _(
          p,
          'class',
          'px-4 py-2 mt-4 font-semibold text-blue-700 bg-blue-200 rounded-lg',
        ),
        _(P, 'class', 'my-4'),
        _(q, 'class', 'resultTitle svelte-v4y26p'),
        _(at, 'class', 'table-auto svelte-v4y26p');
    },
    m(x, W) {
      B(x, t, W),
        b(t, r),
        b(r, n),
        b(t, i),
        b(t, a),
        Dt(a, e[1]),
        B(x, s, W),
        B(x, o, W),
        b(o, u),
        b(u, l),
        b(o, f),
        b(o, h),
        Dt(h, e[2]),
        B(x, c, W),
        B(x, d, W),
        b(d, v),
        b(v, g),
        b(d, w),
        b(d, N),
        Dt(N, e[3]),
        B(x, S, W),
        B(x, O, W),
        b(O, k),
        b(k, z),
        b(O, R),
        b(O, E),
        Dt(E, e[0]),
        B(x, m, W),
        B(x, p, W),
        b(p, I),
        B(x, D, W),
        B(x, P, W),
        B(x, L, W),
        B(x, q, W),
        b(q, rt),
        B(x, kt, W),
        B(x, at, W),
        b(at, Q),
        b(Q, st),
        b(st, Rt),
        b(Rt, yt),
        b(st, St),
        b(st, lt),
        b(lt, Bt),
        b(at, Wt),
        b(at, At);
      for (let nt = 0; nt < $.length; nt += 1) $[nt].m(At, null);
      _t ||
        ((re = [
          Tt(a, 'input', e[6]),
          Tt(h, 'input', e[7]),
          Tt(N, 'change', e[8]),
          Tt(E, 'input', e[9]),
          Tt(p, 'click', e[5]),
        ]),
        (_t = !0));
    },
    p(x, [W]) {
      if (
        (W & 2 && Zt(a.value) !== x[1] && Dt(a, x[1]),
        W & 4 && Zt(h.value) !== x[2] && Dt(h, x[2]),
        W & 8 && Dt(N, x[3]),
        W & 1 && Zt(E.value) !== x[0] && Dt(E, x[0]),
        W & 16)
      ) {
        V = x[4];
        let nt;
        for (nt = 0; nt < V.length; nt += 1) {
          const gt = _r(x, V, nt);
          $[nt]
            ? $[nt].p(gt, W)
            : (($[nt] = Er(gt)), $[nt].c(), $[nt].m(At, null));
        }
        for (; nt < $.length; nt += 1) $[nt].d(1);
        $.length = V.length;
      }
    },
    i: ot,
    o: ot,
    d(x) {
      x && y(t),
        x && y(s),
        x && y(o),
        x && y(c),
        x && y(d),
        x && y(S),
        x && y(O),
        x && y(m),
        x && y(p),
        x && y(D),
        x && y(P),
        x && y(L),
        x && y(q),
        x && y(kt),
        x && y(at),
        tr($, x),
        (_t = !1),
        Cr(re);
    },
  };
}
function Ui(e, t, r) {
  let n = 3,
    i = [],
    a = 10,
    s = 0.8,
    o = !1;
  function u() {
    let d = a,
      v = [];
    for (let g = 0; g < n; g++)
      (d = parseFloat((d * s).toPrecision(3))),
        o && (d = Math.round(d)),
        v.push(d);
    r(4, (i = v));
  }
  function l() {
    (a = Zt(this.value)), r(1, a);
  }
  function f() {
    (s = Zt(this.value)), r(2, s);
  }
  function h() {
    (o = this.value), r(3, o);
  }
  function c() {
    (n = Zt(this.value)), r(0, n);
  }
  return [n, a, s, o, i, u, l, f, h, c];
}
class Vi extends mt {
  constructor(t) {
    super(), bt(this, t, Ui, $i, wt, {});
  }
}
function xr(e, t, r) {
  const n = e.slice();
  return (n[3] = t[r]), n;
}
function Tr(e) {
  let t, r, n, i, a, s, o, u, l, f, h, c, d, v, g, w, N, S;
  o = new Dr({ props: { training: e[1].currentTraining } });
  const O = [Gi, Hi, Wi],
    k = [];
  function z(m, p) {
    return m[1].currentTabActive === 'clock'
      ? 0
      : m[1].currentTabActive === 'content'
      ? 1
      : m[1].currentTabActive === 'drop-set-calculator'
      ? 2
      : -1;
  }
  ~(c = z(e)) && (d = k[c] = O[c](e));
  let R = e[0],
    E = [];
  for (let m = 0; m < R.length; m += 1) E[m] = kr(xr(e, R, m));
  return {
    c() {
      (t = C('div')),
        (r = F()),
        (n = C('div')),
        (i = C('button')),
        (a = Z('Close')),
        (s = F()),
        ct(o.$$.fragment),
        (u = F()),
        (l = C('hr')),
        (f = F()),
        (h = C('section')),
        d && d.c(),
        (v = F()),
        (g = C('nav'));
      for (let m = 0; m < E.length; m += 1) E[m].c();
      this.h();
    },
    l(m) {
      (t = j(m, 'DIV', { class: !0 })),
        A(t).forEach(y),
        (r = M(m)),
        (n = j(m, 'DIV', { class: !0 }));
      var p = A(n);
      i = j(p, 'BUTTON', { class: !0 });
      var I = A(i);
      (a = tt(I, 'Close')),
        I.forEach(y),
        (s = M(p)),
        ft(o.$$.fragment, p),
        (u = M(p)),
        (l = j(p, 'HR', { class: !0 })),
        (f = M(p)),
        (h = j(p, 'SECTION', { class: !0 }));
      var D = A(h);
      d && d.l(D), D.forEach(y), (v = M(p)), (g = j(p, 'NAV', { class: !0 }));
      var P = A(g);
      for (let L = 0; L < E.length; L += 1) E[L].l(P);
      P.forEach(y), p.forEach(y), this.h();
    },
    h() {
      _(t, 'class', 'overlay svelte-jck1c0'),
        _(i, 'class', 'closeButton svelte-jck1c0'),
        _(l, 'class', 'my-2'),
        _(h, 'class', 'tabContent svelte-jck1c0'),
        _(g, 'class', 'tabs svelte-jck1c0'),
        _(n, 'class', 'bg-white wrapper svelte-jck1c0');
    },
    m(m, p) {
      B(m, t, p),
        B(m, r, p),
        B(m, n, p),
        b(n, i),
        b(i, a),
        b(n, s),
        ht(o, n, null),
        b(n, u),
        b(n, l),
        b(n, f),
        b(n, h),
        ~c && k[c].m(h, null),
        b(n, v),
        b(n, g);
      for (let I = 0; I < E.length; I += 1) E[I].m(g, null);
      (w = !0), N || ((S = Tt(i, 'click', Lr.close)), (N = !0));
    },
    p(m, p) {
      const I = {};
      p & 2 && (I.training = m[1].currentTraining), o.$set(I);
      let D = c;
      if (
        ((c = z(m)),
        c !== D &&
          (d &&
            (ge(),
            K(k[D], 1, 1, () => {
              k[D] = null;
            }),
            me()),
          ~c
            ? ((d = k[c]),
              d || ((d = k[c] = O[c](m)), d.c()),
              J(d, 1),
              d.m(h, null))
            : (d = null)),
        p & 3)
      ) {
        R = m[0];
        let P;
        for (P = 0; P < R.length; P += 1) {
          const L = xr(m, R, P);
          E[P] ? E[P].p(L, p) : ((E[P] = kr(L)), E[P].c(), E[P].m(g, null));
        }
        for (; P < E.length; P += 1) E[P].d(1);
        E.length = R.length;
      }
    },
    i(m) {
      w || (J(o.$$.fragment, m), J(d), (w = !0));
    },
    o(m) {
      K(o.$$.fragment, m), K(d), (w = !1);
    },
    d(m) {
      m && y(t),
        m && y(r),
        m && y(n),
        dt(o),
        ~c && k[c].d(),
        tr(E, m),
        (N = !1),
        S();
    },
  };
}
function Wi(e) {
  let t, r;
  return (
    (t = new Vi({})),
    {
      c() {
        ct(t.$$.fragment);
      },
      l(n) {
        ft(t.$$.fragment, n);
      },
      m(n, i) {
        ht(t, n, i), (r = !0);
      },
      i(n) {
        r || (J(t.$$.fragment, n), (r = !0));
      },
      o(n) {
        K(t.$$.fragment, n), (r = !1);
      },
      d(n) {
        dt(t, n);
      },
    }
  );
}
function Hi(e) {
  let t, r;
  return (
    (t = new Mi({})),
    {
      c() {
        ct(t.$$.fragment);
      },
      l(n) {
        ft(t.$$.fragment, n);
      },
      m(n, i) {
        ht(t, n, i), (r = !0);
      },
      i(n) {
        r || (J(t.$$.fragment, n), (r = !0));
      },
      o(n) {
        K(t.$$.fragment, n), (r = !1);
      },
      d(n) {
        dt(t, n);
      },
    }
  );
}
function Gi(e) {
  let t, r;
  return (
    (t = new Li({})),
    {
      c() {
        ct(t.$$.fragment);
      },
      l(n) {
        ft(t.$$.fragment, n);
      },
      m(n, i) {
        ht(t, n, i), (r = !0);
      },
      i(n) {
        r || (J(t.$$.fragment, n), (r = !0));
      },
      o(n) {
        K(t.$$.fragment, n), (r = !1);
      },
      d(n) {
        dt(t, n);
      },
    }
  );
}
function kr(e) {
  let t,
    r = e[3].label + '',
    n,
    i,
    a,
    s;
  function o() {
    return e[2](e[3]);
  }
  return {
    c() {
      (t = C('button')), (n = Z(r)), (i = F()), this.h();
    },
    l(u) {
      t = j(u, 'BUTTON', { class: !0 });
      var l = A(t);
      (n = tt(l, r)), (i = M(l)), l.forEach(y), this.h();
    },
    h() {
      _(t, 'class', 'tab svelte-jck1c0'),
        Re(t, 'tabActive', e[1].currentTabActive === e[3].value);
    },
    m(u, l) {
      B(u, t, l), b(t, n), b(t, i), a || ((s = Tt(t, 'click', o)), (a = !0));
    },
    p(u, l) {
      (e = u),
        l & 3 && Re(t, 'tabActive', e[1].currentTabActive === e[3].value);
    },
    d(u) {
      u && y(t), (a = !1), s();
    },
  };
}
function Ji(e) {
  let t,
    r,
    n = e[1].state === 'open' && Tr(e);
  return {
    c() {
      n && n.c(), (t = Ce());
    },
    l(i) {
      n && n.l(i), (t = Ce());
    },
    m(i, a) {
      n && n.m(i, a), B(i, t, a), (r = !0);
    },
    p(i, [a]) {
      i[1].state === 'open'
        ? n
          ? (n.p(i, a), a & 2 && J(n, 1))
          : ((n = Tr(i)), n.c(), J(n, 1), n.m(t.parentNode, t))
        : n &&
          (ge(),
          K(n, 1, 1, () => {
            n = null;
          }),
          me());
    },
    i(i) {
      r || (J(n), (r = !0));
    },
    o(i) {
      K(n), (r = !1);
    },
    d(i) {
      n && n.d(i), i && y(t);
    },
  };
}
function qi(e, t, r) {
  let n;
  return (
    Ae(e, Ut, (s) => r(1, (n = s))),
    [
      [
        { label: 'Clock', value: 'clock' },
        { label: 'Content', value: 'content' },
        { label: 'Drop Set Calculator', value: 'drop-set-calculator' },
      ],
      n,
      (s) => Lr.setCurrentTab(s.value),
    ]
  );
}
class Yi extends mt {
  constructor(t) {
    super(), bt(this, t, qi, Ji, wt, { tabs: 0 });
  }
  get tabs() {
    return this.$$.ctx[0];
  }
}
function Or(e, t, r) {
  const n = e.slice();
  return (n[1] = t[r]), n;
}
function Ir(e) {
  let t,
    r = e[0].description + '',
    n;
  return {
    c() {
      (t = C('span')), (n = Z(r)), this.h();
    },
    l(i) {
      t = j(i, 'SPAN', { class: !0 });
      var a = A(t);
      (n = tt(a, r)), a.forEach(y), this.h();
    },
    h() {
      _(t, 'class', 'subtitle svelte-o5zz3q');
    },
    m(i, a) {
      B(i, t, a), b(t, n);
    },
    p(i, a) {
      a & 1 && r !== (r = i[0].description + '') && Lt(n, r);
    },
    d(i) {
      i && y(t);
    },
  };
}
function Nr(e) {
  let t, r;
  return (
    (t = new Dr({ props: { training: e[1] } })),
    {
      c() {
        ct(t.$$.fragment);
      },
      l(n) {
        ft(t.$$.fragment, n);
      },
      m(n, i) {
        ht(t, n, i), (r = !0);
      },
      p(n, i) {
        const a = {};
        i & 1 && (a.training = n[1]), t.$set(a);
      },
      i(n) {
        r || (J(t.$$.fragment, n), (r = !0));
      },
      o(n) {
        K(t.$$.fragment, n), (r = !1);
      },
      d(n) {
        dt(t, n);
      },
    }
  );
}
function Rr(e) {
  let t, r, n, i;
  return (
    (t = new Fe({ props: { title: 'Cardio' } })),
    (n = new mn({ props: { cardioTime: e[0].cardio.time } })),
    {
      c() {
        ct(t.$$.fragment), (r = F()), ct(n.$$.fragment);
      },
      l(a) {
        ft(t.$$.fragment, a), (r = M(a)), ft(n.$$.fragment, a);
      },
      m(a, s) {
        ht(t, a, s), B(a, r, s), ht(n, a, s), (i = !0);
      },
      p(a, s) {
        const o = {};
        s & 1 && (o.cardioTime = a[0].cardio.time), n.$set(o);
      },
      i(a) {
        i || (J(t.$$.fragment, a), J(n.$$.fragment, a), (i = !0));
      },
      o(a) {
        K(t.$$.fragment, a), K(n.$$.fragment, a), (i = !1);
      },
      d(a) {
        dt(t, a), a && y(r), dt(n, a);
      },
    }
  );
}
function Xi(e) {
  var E, m;
  let t,
    r,
    n,
    i,
    a = e[0].name + '',
    s,
    o,
    u,
    l,
    f,
    h,
    c,
    d,
    v,
    g,
    w,
    N;
  document.title = t = e[0].name;
  let S = e[0].description && Ir(e);
  c = new Fe({ props: { title: 'Workout' } });
  let O = e[0].training,
    k = [];
  for (let p = 0; p < O.length; p += 1) k[p] = Nr(Or(e, O, p));
  const z = (p) =>
    K(k[p], 1, 1, () => {
      k[p] = null;
    });
  let R =
    ((m = (E = e[0]) == null ? void 0 : E.cardio) == null ? void 0 : m.time) &&
    Rr(e);
  return (
    (w = new Yi({})),
    {
      c() {
        (r = F()),
          (n = C('div')),
          (i = C('h1')),
          (s = Z(a)),
          (o = F()),
          S && S.c(),
          (u = F()),
          (l = C('hr')),
          (f = F()),
          (h = C('div')),
          ct(c.$$.fragment),
          (d = F());
        for (let p = 0; p < k.length; p += 1) k[p].c();
        (v = F()), R && R.c(), (g = F()), ct(w.$$.fragment), this.h();
      },
      l(p) {
        fn('[data-svelte="svelte-lo0bla"]', document.head).forEach(y),
          (r = M(p)),
          (n = j(p, 'DIV', {}));
        var D = A(n);
        i = j(D, 'H1', { class: !0 });
        var P = A(i);
        (s = tt(P, a)),
          (o = M(P)),
          S && S.l(P),
          P.forEach(y),
          (u = M(D)),
          (l = j(D, 'HR', { class: !0 })),
          (f = M(D)),
          (h = j(D, 'DIV', { class: !0 }));
        var L = A(h);
        ft(c.$$.fragment, L), (d = M(L));
        for (let q = 0; q < k.length; q += 1) k[q].l(L);
        (v = M(L)),
          R && R.l(L),
          L.forEach(y),
          D.forEach(y),
          (g = M(p)),
          ft(w.$$.fragment, p),
          this.h();
      },
      h() {
        _(i, 'class', 'title svelte-o5zz3q'),
          _(l, 'class', 'my-6'),
          _(h, 'class', 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3');
      },
      m(p, I) {
        B(p, r, I),
          B(p, n, I),
          b(n, i),
          b(i, s),
          b(i, o),
          S && S.m(i, null),
          b(n, u),
          b(n, l),
          b(n, f),
          b(n, h),
          ht(c, h, null),
          b(h, d);
        for (let D = 0; D < k.length; D += 1) k[D].m(h, null);
        b(h, v), R && R.m(h, null), B(p, g, I), ht(w, p, I), (N = !0);
      },
      p(p, [I]) {
        var D, P;
        if (
          ((!N || I & 1) && t !== (t = p[0].name) && (document.title = t),
          (!N || I & 1) && a !== (a = p[0].name + '') && Lt(s, a),
          p[0].description
            ? S
              ? S.p(p, I)
              : ((S = Ir(p)), S.c(), S.m(i, null))
            : S && (S.d(1), (S = null)),
          I & 1)
        ) {
          O = p[0].training;
          let L;
          for (L = 0; L < O.length; L += 1) {
            const q = Or(p, O, L);
            k[L]
              ? (k[L].p(q, I), J(k[L], 1))
              : ((k[L] = Nr(q)), k[L].c(), J(k[L], 1), k[L].m(h, v));
          }
          for (ge(), L = O.length; L < k.length; L += 1) z(L);
          me();
        }
        (P = (D = p[0]) == null ? void 0 : D.cardio) != null && P.time
          ? R
            ? (R.p(p, I), I & 1 && J(R, 1))
            : ((R = Rr(p)), R.c(), J(R, 1), R.m(h, null))
          : R &&
            (ge(),
            K(R, 1, 1, () => {
              R = null;
            }),
            me());
      },
      i(p) {
        if (!N) {
          J(c.$$.fragment, p);
          for (let I = 0; I < O.length; I += 1) J(k[I]);
          J(R), J(w.$$.fragment, p), (N = !0);
        }
      },
      o(p) {
        K(c.$$.fragment, p), (k = k.filter(Boolean));
        for (let I = 0; I < k.length; I += 1) K(k[I]);
        K(R), K(w.$$.fragment, p), (N = !1);
      },
      d(p) {
        p && y(r),
          p && y(n),
          S && S.d(),
          dt(c),
          tr(k, p),
          R && R.d(),
          p && y(g),
          dt(w, p);
      },
    }
  );
}
function Ki(e, t, r) {
  let { trainingRoutine: n } = t;
  return (
    (e.$$set = (i) => {
      'trainingRoutine' in i && r(0, (n = i.trainingRoutine));
    }),
    [n]
  );
}
class na extends mt {
  constructor(t) {
    super(), bt(this, t, Ki, Xi, wt, { trainingRoutine: 0 });
  }
}
export { na as default };
