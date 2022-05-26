import {
  S as y,
  i as B,
  s as F,
  e as m,
  t as p,
  c as v,
  a as T,
  h as g,
  d as h,
  b,
  g as w,
  G as c,
  j as q,
  k as H,
  m as G,
  H as O,
  T as Q,
  E as V,
} from './index-85439ac7.js';
function j(s) {
  let e,
    n = s[2][s[0].advancedTechnique] + '',
    l;
  return {
    c() {
      (e = m('span')), (l = p(n)), this.h();
    },
    l(t) {
      e = v(t, 'SPAN', { class: !0 });
      var o = T(e);
      (l = g(o, n)), o.forEach(h), this.h();
    },
    h() {
      b(e, 'class', 'inline-block ml-2 text-gray-400');
    },
    m(t, o) {
      w(t, e, o), c(e, l);
    },
    p(t, o) {
      o & 1 && n !== (n = t[2][t[0].advancedTechnique] + '') && q(l, n);
    },
    d(t) {
      t && h(e);
    },
  };
}
function R(s) {
  let e,
    n,
    l = s[0].exercise.name + '',
    t,
    o,
    i,
    f,
    d = s[0].series + '',
    E,
    N,
    _ = s[0].repetitions + '',
    k,
    A,
    I,
    P,
    a = s[0].advancedTechnique && j(s);
  return {
    c() {
      (e = m('section')),
        (n = m('h3')),
        (t = p(l)),
        (o = H()),
        (i = m('p')),
        (f = m('span')),
        (E = p(d)),
        (N = p('x')),
        (k = p(_)),
        (A = H()),
        a && a.c(),
        this.h();
    },
    l(u) {
      e = v(u, 'SECTION', { class: !0 });
      var r = T(e);
      n = v(r, 'H3', { class: !0 });
      var D = T(n);
      (t = g(D, l)), D.forEach(h), (o = G(r)), (i = v(r, 'P', { class: !0 }));
      var S = T(i);
      f = v(S, 'SPAN', {});
      var C = T(f);
      (E = g(C, d)),
        (N = g(C, 'x')),
        (k = g(C, _)),
        C.forEach(h),
        (A = G(S)),
        a && a.l(S),
        S.forEach(h),
        r.forEach(h),
        this.h();
    },
    h() {
      b(n, 'class', 'font-semibold font-heading'),
        b(i, 'class', 'mt-2 font-sans'),
        b(e, 'class', 'w-full mb-4 cursor-pointer');
    },
    m(u, r) {
      w(u, e, r),
        c(e, n),
        c(n, t),
        c(e, o),
        c(e, i),
        c(i, f),
        c(f, E),
        c(f, N),
        c(f, k),
        c(i, A),
        a && a.m(i, null),
        I ||
          ((P = O(e, 'click', function () {
            Q(s[1]) && s[1].apply(this, arguments);
          })),
          (I = !0));
    },
    p(u, [r]) {
      (s = u),
        r & 1 && l !== (l = s[0].exercise.name + '') && q(t, l),
        r & 1 && d !== (d = s[0].series + '') && q(E, d),
        r & 1 && _ !== (_ = s[0].repetitions + '') && q(k, _),
        s[0].advancedTechnique
          ? a
            ? a.p(s, r)
            : ((a = j(s)), a.c(), a.m(i, null))
          : a && (a.d(1), (a = null));
    },
    i: V,
    o: V,
    d(u) {
      u && h(e), a && a.d(), (I = !1), P();
    },
  };
}
function U(s, e, n) {
  let { training: l } = e,
    { onClick: t } = e;
  const o = {
    bi_set: 'BI-SET',
    fst_7: 'FST-7',
    gvt: 'GVT',
    rest_and_pause: "Rest 'n' Pause 3x",
    'drop-set': 'Drop-Set 3x',
  };
  return (
    (s.$$set = (i) => {
      'training' in i && n(0, (l = i.training)),
        'onClick' in i && n(1, (t = i.onClick));
    }),
    [l, t, o]
  );
}
class J extends y {
  constructor(e) {
    super(), B(this, e, U, R, F, { training: 0, onClick: 1 });
  }
}
export { J as T };
