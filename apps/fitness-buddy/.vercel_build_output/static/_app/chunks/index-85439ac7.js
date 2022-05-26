function S() {}
function I(t, n) {
  for (const e in n) t[e] = n[e];
  return t;
}
function T(t) {
  return t();
}
function q() {
  return Object.create(null);
}
function p(t) {
  t.forEach(T);
}
function U(t) {
  return typeof t == 'function';
}
function lt(t, n) {
  return t != t
    ? n == n
    : t !== n || (t && typeof t == 'object') || typeof t == 'function';
}
let x;
function st(t, n) {
  return x || (x = document.createElement('a')), (x.href = n), t === x.href;
}
function W(t) {
  return Object.keys(t).length === 0;
}
function G(t, ...n) {
  if (t == null) return S;
  const e = t.subscribe(...n);
  return e.unsubscribe ? () => e.unsubscribe() : e;
}
function ft(t, n, e) {
  t.$$.on_destroy.push(G(n, e));
}
function at(t, n, e, i) {
  if (t) {
    const c = L(t, n, e, i);
    return t[0](c);
  }
}
function L(t, n, e, i) {
  return t[1] && i ? I(e.ctx.slice(), t[1](i(n))) : e.ctx;
}
function _t(t, n, e, i) {
  if (t[2] && i) {
    const c = t[2](i(e));
    if (n.dirty === void 0) return c;
    if (typeof c == 'object') {
      const s = [],
        o = Math.max(n.dirty.length, c.length);
      for (let u = 0; u < o; u += 1) s[u] = n.dirty[u] | c[u];
      return s;
    }
    return n.dirty | c;
  }
  return n.dirty;
}
function dt(t, n, e, i, c, s) {
  if (c) {
    const o = L(n, e, i, s);
    t.p(o, c);
  }
}
function ht(t) {
  if (t.ctx.length > 32) {
    const n = [],
      e = t.ctx.length / 32;
    for (let i = 0; i < e; i++) n[i] = -1;
    return n;
  }
  return -1;
}
function mt(t) {
  const n = {};
  for (const e in t) e[0] !== '$' && (n[e] = t[e]);
  return n;
}
function pt(t, n) {
  const e = {};
  n = new Set(n);
  for (const i in t) !n.has(i) && i[0] !== '$' && (e[i] = t[i]);
  return e;
}
let v = !1;
function J() {
  v = !0;
}
function K() {
  v = !1;
}
function Q(t, n, e, i) {
  for (; t < n; ) {
    const c = t + ((n - t) >> 1);
    e(c) <= i ? (t = c + 1) : (n = c);
  }
  return t;
}
function R(t) {
  if (t.hydrate_init) return;
  t.hydrate_init = !0;
  let n = t.childNodes;
  if (t.nodeName === 'HEAD') {
    const r = [];
    for (let l = 0; l < n.length; l++) {
      const a = n[l];
      a.claim_order !== void 0 && r.push(a);
    }
    n = r;
  }
  const e = new Int32Array(n.length + 1),
    i = new Int32Array(n.length);
  e[0] = -1;
  let c = 0;
  for (let r = 0; r < n.length; r++) {
    const l = n[r].claim_order,
      a =
        (c > 0 && n[e[c]].claim_order <= l
          ? c + 1
          : Q(1, c, (g) => n[e[g]].claim_order, l)) - 1;
    i[r] = e[a] + 1;
    const f = a + 1;
    (e[f] = r), (c = Math.max(f, c));
  }
  const s = [],
    o = [];
  let u = n.length - 1;
  for (let r = e[c] + 1; r != 0; r = i[r - 1]) {
    for (s.push(n[r - 1]); u >= r; u--) o.push(n[u]);
    u--;
  }
  for (; u >= 0; u--) o.push(n[u]);
  s.reverse(), o.sort((r, l) => r.claim_order - l.claim_order);
  for (let r = 0, l = 0; r < o.length; r++) {
    for (; l < s.length && o[r].claim_order >= s[l].claim_order; ) l++;
    const a = l < s.length ? s[l] : null;
    t.insertBefore(o[r], a);
  }
}
function V(t, n) {
  if (v) {
    for (
      R(t),
        (t.actual_end_child === void 0 ||
          (t.actual_end_child !== null &&
            t.actual_end_child.parentElement !== t)) &&
          (t.actual_end_child = t.firstChild);
      t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

    )
      t.actual_end_child = t.actual_end_child.nextSibling;
    n !== t.actual_end_child
      ? (n.claim_order !== void 0 || n.parentNode !== t) &&
        t.insertBefore(n, t.actual_end_child)
      : (t.actual_end_child = n.nextSibling);
  } else (n.parentNode !== t || n.nextSibling !== null) && t.appendChild(n);
}
function yt(t, n, e) {
  v && !e
    ? V(t, n)
    : (n.parentNode !== t || n.nextSibling != e) &&
      t.insertBefore(n, e || null);
}
function X(t) {
  t.parentNode.removeChild(t);
}
function gt(t, n) {
  for (let e = 0; e < t.length; e += 1) t[e] && t[e].d(n);
}
function Y(t) {
  return document.createElement(t);
}
function Z(t) {
  return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function j(t) {
  return document.createTextNode(t);
}
function xt() {
  return j(' ');
}
function bt() {
  return j('');
}
function $t(t, n, e, i) {
  return t.addEventListener(n, e, i), () => t.removeEventListener(n, e, i);
}
function P(t, n, e) {
  e == null
    ? t.removeAttribute(n)
    : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function wt(t, n) {
  const e = Object.getOwnPropertyDescriptors(t.__proto__);
  for (const i in n)
    n[i] == null
      ? t.removeAttribute(i)
      : i === 'style'
      ? (t.style.cssText = n[i])
      : i === '__value'
      ? (t.value = t[i] = n[i])
      : e[i] && e[i].set
      ? (t[i] = n[i])
      : P(t, i, n[i]);
}
function vt(t, n) {
  for (const e in n) P(t, e, n[e]);
}
function Et(t) {
  return t === '' ? null : +t;
}
function tt(t) {
  return Array.from(t.childNodes);
}
function nt(t) {
  t.claim_info === void 0 &&
    (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function B(t, n, e, i, c = !1) {
  nt(t);
  const s = (() => {
    for (let o = t.claim_info.last_index; o < t.length; o++) {
      const u = t[o];
      if (n(u)) {
        const r = e(u);
        return (
          r === void 0 ? t.splice(o, 1) : (t[o] = r),
          c || (t.claim_info.last_index = o),
          u
        );
      }
    }
    for (let o = t.claim_info.last_index - 1; o >= 0; o--) {
      const u = t[o];
      if (n(u)) {
        const r = e(u);
        return (
          r === void 0 ? t.splice(o, 1) : (t[o] = r),
          c
            ? r === void 0 && t.claim_info.last_index--
            : (t.claim_info.last_index = o),
          u
        );
      }
    }
    return i();
  })();
  return (
    (s.claim_order = t.claim_info.total_claimed),
    (t.claim_info.total_claimed += 1),
    s
  );
}
function D(t, n, e, i) {
  return B(
    t,
    (c) => c.nodeName === n,
    (c) => {
      const s = [];
      for (let o = 0; o < c.attributes.length; o++) {
        const u = c.attributes[o];
        e[u.name] || s.push(u.name);
      }
      s.forEach((o) => c.removeAttribute(o));
    },
    () => i(n),
  );
}
function kt(t, n, e) {
  return D(t, n, e, Y);
}
function At(t, n, e) {
  return D(t, n, e, Z);
}
function et(t, n) {
  return B(
    t,
    (e) => e.nodeType === 3,
    (e) => {
      const i = '' + n;
      if (e.data.startsWith(i)) {
        if (e.data.length !== i.length) return e.splitText(i.length);
      } else e.data = i;
    },
    () => j(n),
    !0,
  );
}
function St(t) {
  return et(t, ' ');
}
function jt(t, n) {
  (n = '' + n), t.wholeText !== n && (t.data = n);
}
function Nt(t, n) {
  t.value = n == null ? '' : n;
}
function Ct(t, n, e, i) {
  e === null
    ? t.style.removeProperty(n)
    : t.style.setProperty(n, e, i ? 'important' : '');
}
function qt(t, n, e) {
  t.classList[e ? 'add' : 'remove'](n);
}
function Mt(t, n = document.body) {
  return Array.from(n.querySelectorAll(t));
}
let m;
function h(t) {
  m = t;
}
function y() {
  if (!m) throw new Error('Function called outside component initialization');
  return m;
}
function Ot(t) {
  y().$$.before_update.push(t);
}
function Tt(t) {
  y().$$.on_mount.push(t);
}
function Lt(t) {
  y().$$.after_update.push(t);
}
function Pt(t) {
  y().$$.on_destroy.push(t);
}
function Bt(t, n) {
  return y().$$.context.set(t, n), n;
}
const d = [],
  M = [],
  $ = [],
  O = [],
  z = Promise.resolve();
let k = !1;
function F() {
  k || ((k = !0), z.then(H));
}
function Dt() {
  return F(), z;
}
function A(t) {
  $.push(t);
}
const E = new Set();
let b = 0;
function H() {
  const t = m;
  do {
    for (; b < d.length; ) {
      const n = d[b];
      b++, h(n), it(n.$$);
    }
    for (h(null), d.length = 0, b = 0; M.length; ) M.pop()();
    for (let n = 0; n < $.length; n += 1) {
      const e = $[n];
      E.has(e) || (E.add(e), e());
    }
    $.length = 0;
  } while (d.length);
  for (; O.length; ) O.pop()();
  (k = !1), E.clear(), h(t);
}
function it(t) {
  if (t.fragment !== null) {
    t.update(), p(t.before_update);
    const n = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, n),
      t.after_update.forEach(A);
  }
}
const w = new Set();
let _;
function zt() {
  _ = { r: 0, c: [], p: _ };
}
function Ft() {
  _.r || p(_.c), (_ = _.p);
}
function rt(t, n) {
  t && t.i && (w.delete(t), t.i(n));
}
function Ht(t, n, e, i) {
  if (t && t.o) {
    if (w.has(t)) return;
    w.add(t),
      _.c.push(() => {
        w.delete(t), i && (e && t.d(1), i());
      }),
      t.o(n);
  }
}
function It(t, n) {
  const e = {},
    i = {},
    c = { $$scope: 1 };
  let s = t.length;
  for (; s--; ) {
    const o = t[s],
      u = n[s];
    if (u) {
      for (const r in o) r in u || (i[r] = 1);
      for (const r in u) c[r] || ((e[r] = u[r]), (c[r] = 1));
      t[s] = u;
    } else for (const r in o) c[r] = 1;
  }
  for (const o in i) o in e || (e[o] = void 0);
  return e;
}
function Ut(t) {
  return typeof t == 'object' && t !== null ? t : {};
}
function Wt(t) {
  t && t.c();
}
function Gt(t, n) {
  t && t.l(n);
}
function ct(t, n, e, i) {
  const { fragment: c, on_mount: s, on_destroy: o, after_update: u } = t.$$;
  c && c.m(n, e),
    i ||
      A(() => {
        const r = s.map(T).filter(U);
        o ? o.push(...r) : p(r), (t.$$.on_mount = []);
      }),
    u.forEach(A);
}
function ot(t, n) {
  const e = t.$$;
  e.fragment !== null &&
    (p(e.on_destroy),
    e.fragment && e.fragment.d(n),
    (e.on_destroy = e.fragment = null),
    (e.ctx = []));
}
function ut(t, n) {
  t.$$.dirty[0] === -1 && (d.push(t), F(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function Jt(t, n, e, i, c, s, o, u = [-1]) {
  const r = m;
  h(t);
  const l = (t.$$ = {
    fragment: null,
    ctx: null,
    props: s,
    update: S,
    not_equal: c,
    bound: q(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(n.context || (r ? r.$$.context : [])),
    callbacks: q(),
    dirty: u,
    skip_bound: !1,
    root: n.target || r.$$.root,
  });
  o && o(l.root);
  let a = !1;
  if (
    ((l.ctx = e
      ? e(t, n.props || {}, (f, g, ...N) => {
          const C = N.length ? N[0] : g;
          return (
            l.ctx &&
              c(l.ctx[f], (l.ctx[f] = C)) &&
              (!l.skip_bound && l.bound[f] && l.bound[f](C), a && ut(t, f)),
            g
          );
        })
      : []),
    l.update(),
    (a = !0),
    p(l.before_update),
    (l.fragment = i ? i(l.ctx) : !1),
    n.target)
  ) {
    if (n.hydrate) {
      J();
      const f = tt(n.target);
      l.fragment && l.fragment.l(f), f.forEach(X);
    } else l.fragment && l.fragment.c();
    n.intro && rt(t.$$.fragment),
      ct(t, n.target, n.anchor, n.customElement),
      K(),
      H();
  }
  h(r);
}
class Kt {
  $destroy() {
    ot(this, 1), (this.$destroy = S);
  }
  $on(n, e) {
    const i = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
    return (
      i.push(e),
      () => {
        const c = i.indexOf(e);
        c !== -1 && i.splice(c, 1);
      }
    );
  }
  $set(n) {
    this.$$set &&
      !W(n) &&
      ((this.$$.skip_bound = !0), this.$$set(n), (this.$$.skip_bound = !1));
  }
}
export {
  Ot as $,
  Ut as A,
  ot as B,
  I as C,
  Dt as D,
  S as E,
  st as F,
  V as G,
  $t as H,
  ft as I,
  M as J,
  Z as K,
  At as L,
  at as M,
  Mt as N,
  dt as O,
  ht as P,
  _t as Q,
  qt as R,
  Kt as S,
  U as T,
  gt as U,
  wt as V,
  pt as W,
  mt as X,
  vt as Y,
  Pt as Z,
  p as _,
  tt as a,
  Nt as a0,
  Et as a1,
  P as b,
  kt as c,
  X as d,
  Y as e,
  Ct as f,
  yt as g,
  et as h,
  Jt as i,
  jt as j,
  xt as k,
  bt as l,
  St as m,
  zt as n,
  Ht as o,
  Ft as p,
  rt as q,
  Bt as r,
  lt as s,
  j as t,
  Lt as u,
  Tt as v,
  Wt as w,
  Gt as x,
  ct as y,
  It as z,
};
