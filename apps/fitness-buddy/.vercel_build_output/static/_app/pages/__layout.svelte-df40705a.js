import {
  S as L,
  i as E,
  s as x,
  e as p,
  c as m,
  a as _,
  d as u,
  F as O,
  b as o,
  g as v,
  G as d,
  H as U,
  E as $,
  I as D,
  J as V,
  K as j,
  L as I,
  w as S,
  t as F,
  x as N,
  h as H,
  y as T,
  q as C,
  o as b,
  B as q,
  M as G,
  k as A,
  N as J,
  m as M,
  O as P,
  P as Q,
  Q as Z,
} from '../chunks/index-85439ac7.js';
import { a as z, b as W } from '../chunks/audio-03895b51.js';
import '../chunks/index-d5338481.js';
var X = '/_app/assets/beep-96dd90a8.wav';
function Y(l) {
  let e, t, r, a, i;
  return {
    c() {
      (e = p('audio')), (t = p('source')), this.h();
    },
    l(n) {
      e = m(n, 'AUDIO', {});
      var c = _(e);
      (t = m(c, 'SOURCE', { src: !0, type: !0 })), c.forEach(u), this.h();
    },
    h() {
      O(t.src, (r = X)) || o(t, 'src', r), o(t, 'type', 'audio/wav');
    },
    m(n, c) {
      v(n, e, c),
        d(e, t),
        l[2](e),
        a || ((i = U(e, 'ended', z.finish)), (a = !0));
    },
    p: $,
    i: $,
    o: $,
    d(n) {
      n && u(e), l[2](null), (a = !1), i();
    },
  };
}
function ee(l, e, t) {
  let r;
  D(l, W, (n) => t(1, (r = n)));
  let a;
  function i(n) {
    V[n ? 'unshift' : 'push'](() => {
      (a = n), t(0, a);
    });
  }
  return (
    (l.$$.update = () => {
      l.$$.dirty & 3 && r === 'beeping' && a.play();
    }),
    [a, r, i]
  );
}
class te extends L {
  constructor(e) {
    super(), E(this, e, ee, Y, x, {});
  }
}
function se(l) {
  let e, t, r, a;
  return {
    c() {
      (e = j('svg')),
        (t = j('path')),
        (r = j('path')),
        (a = j('path')),
        this.h();
    },
    l(i) {
      e = I(i, 'svg', {
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
        xmlns: !0,
      });
      var n = _(e);
      (t = I(n, 'path', {
        d: !0,
        stroke: !0,
        'stroke-width': !0,
        'stroke-linecap': !0,
        'stroke-linejoin': !0,
      })),
        _(t).forEach(u),
        (r = I(n, 'path', {
          d: !0,
          stroke: !0,
          'stroke-width': !0,
          'stroke-linecap': !0,
          'stroke-linejoin': !0,
        })),
        _(r).forEach(u),
        (a = I(n, 'path', {
          d: !0,
          stroke: !0,
          'stroke-width': !0,
          'stroke-linecap': !0,
          'stroke-linejoin': !0,
        })),
        _(a).forEach(u),
        n.forEach(u),
        this.h();
    },
    h() {
      o(
        t,
        'd',
        'M9.52515 16.5251L19.0251 5.02513L27 5L26.9749 12.9749L15.4749 22.4749',
      ),
        o(t, 'stroke', 'black'),
        o(t, 'stroke-width', '2'),
        o(t, 'stroke-linecap', 'round'),
        o(t, 'stroke-linejoin', 'round'),
        o(r, 'd', 'M12.5 19.5L20 12'),
        o(r, 'stroke', 'black'),
        o(r, 'stroke-width', '2'),
        o(r, 'stroke-linecap', 'round'),
        o(r, 'stroke-linejoin', 'round'),
        o(
          a,
          'd',
          'M10.2678 24.6821L6.52511 28.4247C6.43226 28.5176 6.32202 28.5912 6.20069 28.6415C6.07937 28.6917 5.94933 28.7176 5.81801 28.7176C5.68669 28.7176 5.55665 28.6917 5.43532 28.6415C5.314 28.5912 5.20376 28.5176 5.1109 28.4247L3.57536 26.8892C3.48251 26.7963 3.40885 26.6861 3.35859 26.5648C3.30834 26.4434 3.28247 26.3134 3.28247 26.1821C3.28247 26.0507 3.30834 25.9207 3.35859 25.7994C3.40885 25.6781 3.48251 25.5678 3.57536 25.475L7.31801 21.7323C7.41086 21.6395 7.48452 21.5292 7.53478 21.4079C7.58503 21.2866 7.6109 21.1565 7.6109 21.0252C7.6109 20.8939 7.58503 20.7639 7.53478 20.6425C7.48452 20.5212 7.41086 20.411 7.31801 20.3181L4.7071 17.7072C4.51956 17.5197 4.4142 17.2653 4.4142 17.0001C4.4142 16.7349 4.51956 16.4805 4.7071 16.293L6.29288 14.7072C6.48042 14.5197 6.73477 14.4143 6.99999 14.4143C7.26521 14.4143 7.51956 14.5197 7.7071 14.7072L17.2929 24.293C17.4804 24.4805 17.5858 24.7349 17.5858 25.0001C17.5858 25.2653 17.4804 25.5197 17.2929 25.7072L15.7071 27.293C15.5196 27.4805 15.2652 27.5859 15 27.5859C14.7348 27.5859 14.4804 27.4805 14.2929 27.293L11.682 24.6821C11.4944 24.4945 11.2401 24.3892 10.9749 24.3892C10.7096 24.3892 10.4553 24.4945 10.2678 24.6821V24.6821Z',
        ),
        o(a, 'stroke', 'black'),
        o(a, 'stroke-width', '2'),
        o(a, 'stroke-linecap', 'round'),
        o(a, 'stroke-linejoin', 'round'),
        o(e, 'width', l[0]),
        o(e, 'height', l[0]),
        o(e, 'viewBox', '0 0 32 32'),
        o(e, 'fill', 'none'),
        o(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(i, n) {
      v(i, e, n), d(e, t), d(e, r), d(e, a);
    },
    p(i, [n]) {
      n & 1 && o(e, 'width', i[0]), n & 1 && o(e, 'height', i[0]);
    },
    i: $,
    o: $,
    d(i) {
      i && u(e);
    },
  };
}
function re(l, e, t) {
  let { width: r = 32 } = e;
  return (
    (l.$$set = (a) => {
      'width' in a && t(0, (r = a.width));
    }),
    [r]
  );
}
class ae extends L {
  constructor(e) {
    super(), E(this, e, re, se, x, { width: 0 });
  }
}
function ne(l) {
  let e, t, r, a, i;
  return (
    (r = new ae({ props: { width: 24 } })),
    {
      c() {
        (e = p('nav')),
          (t = p('a')),
          S(r.$$.fragment),
          (a = F(`
    Training`)),
          this.h();
      },
      l(n) {
        e = m(n, 'NAV', { class: !0 });
        var c = _(e);
        t = m(c, 'A', { 'sveltekit:prefetch': !0, href: !0, class: !0 });
        var k = _(t);
        N(r.$$.fragment, k),
          (a = H(
            k,
            `
    Training`,
          )),
          k.forEach(u),
          c.forEach(u),
          this.h();
      },
      h() {
        o(t, 'sveltekit:prefetch', ''),
          o(t, 'href', '/'),
          o(t, 'class', 'link svelte-injj2a'),
          o(e, 'class', 'navbar svelte-injj2a');
      },
      m(n, c) {
        v(n, e, c), d(e, t), T(r, t, null), d(t, a), (i = !0);
      },
      p: $,
      i(n) {
        i || (C(r.$$.fragment, n), (i = !0));
      },
      o(n) {
        b(r.$$.fragment, n), (i = !1);
      },
      d(n) {
        n && u(e), q(r);
      },
    }
  );
}
class oe extends L {
  constructor(e) {
    super(), E(this, e, null, ne, x, {});
  }
}
function ie(l) {
  let e, t, r;
  return {
    c() {
      (e = p('header')), (t = p('h2')), (r = F('My Fitness Buddy')), this.h();
    },
    l(a) {
      e = m(a, 'HEADER', { class: !0 });
      var i = _(e);
      t = m(i, 'H2', { class: !0 });
      var n = _(t);
      (r = H(n, 'My Fitness Buddy')), n.forEach(u), i.forEach(u), this.h();
    },
    h() {
      o(t, 'class', 'title svelte-1mwmt9p'),
        o(e, 'class', 'header svelte-1mwmt9p');
    },
    m(a, i) {
      v(a, e, i), d(e, t), d(t, r);
    },
    p: $,
    i: $,
    o: $,
    d(a) {
      a && u(e);
    },
  };
}
class le extends L {
  constructor(e) {
    super(), E(this, e, null, ie, x, {});
  }
}
function ue(l) {
  let e, t, r, a, i, n, c, k, g, B, w, y;
  i = new le({});
  const K = l[1].default,
    h = G(K, l, l[0], null);
  return (
    (g = new oe({})),
    (w = new te({})),
    {
      c() {
        (e = p('link')),
          (t = p('link')),
          (r = p('link')),
          (a = A()),
          S(i.$$.fragment),
          (n = A()),
          (c = p('main')),
          h && h.c(),
          (k = A()),
          S(g.$$.fragment),
          (B = A()),
          S(w.$$.fragment),
          this.h();
      },
      l(s) {
        const f = J('[data-svelte="svelte-xvfycw"]', document.head);
        (e = m(f, 'LINK', { rel: !0, href: !0 })),
          (t = m(f, 'LINK', { rel: !0, href: !0, crossorigin: !0 })),
          (r = m(f, 'LINK', { href: !0, rel: !0 })),
          f.forEach(u),
          (a = M(s)),
          N(i.$$.fragment, s),
          (n = M(s)),
          (c = m(s, 'MAIN', { class: !0 }));
        var R = _(c);
        h && h.l(R),
          R.forEach(u),
          (k = M(s)),
          N(g.$$.fragment, s),
          (B = M(s)),
          N(w.$$.fragment, s),
          this.h();
      },
      h() {
        o(e, 'rel', 'preconnect'),
          o(e, 'href', 'https://fonts.googleapis.com'),
          o(t, 'rel', 'preconnect'),
          o(t, 'href', 'https://fonts.gstatic.com'),
          o(t, 'crossorigin', 'true'),
          o(
            r,
            'href',
            'https://fonts.googleapis.com/css2?family=Roboto&family=Shadows+Into+Light+Two&Rubik:wght@500;600;700&display=swap',
          ),
          o(r, 'rel', 'stylesheet'),
          o(
            c,
            'class',
            'container relative flex flex-col flex-1 h-full p-4 mx-auto overflow-scroll svelte-1wa4s6j',
          );
      },
      m(s, f) {
        d(document.head, e),
          d(document.head, t),
          d(document.head, r),
          v(s, a, f),
          T(i, s, f),
          v(s, n, f),
          v(s, c, f),
          h && h.m(c, null),
          v(s, k, f),
          T(g, s, f),
          v(s, B, f),
          T(w, s, f),
          (y = !0);
      },
      p(s, [f]) {
        h &&
          h.p &&
          (!y || f & 1) &&
          P(h, K, s, s[0], y ? Z(K, s[0], f, null) : Q(s[0]), null);
      },
      i(s) {
        y ||
          (C(i.$$.fragment, s),
          C(h, s),
          C(g.$$.fragment, s),
          C(w.$$.fragment, s),
          (y = !0));
      },
      o(s) {
        b(i.$$.fragment, s),
          b(h, s),
          b(g.$$.fragment, s),
          b(w.$$.fragment, s),
          (y = !1);
      },
      d(s) {
        u(e),
          u(t),
          u(r),
          s && u(a),
          q(i, s),
          s && u(n),
          s && u(c),
          h && h.d(s),
          s && u(k),
          q(g, s),
          s && u(B),
          q(w, s);
      },
    }
  );
}
function ce(l, e, t) {
  let { $$slots: r = {}, $$scope: a } = e;
  return (
    (l.$$set = (i) => {
      '$$scope' in i && t(0, (a = i.$$scope));
    }),
    [a, r]
  );
}
class pe extends L {
  constructor(e) {
    super(), E(this, e, ce, ue, x, {});
  }
}
export { pe as default };
