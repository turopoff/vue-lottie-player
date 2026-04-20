import { defineComponent as b, ref as v, computed as L, onMounted as A, onBeforeUnmount as _, watch as m, nextTick as T, openBlock as x, createElementBlock as B, normalizeStyle as C } from "vue";
const $ = {
  ready: (e) => !!e,
  error: (e) => e instanceof Error
}, V = [
  "config_ready",
  "data_ready",
  "DOMLoaded",
  "loaded_images"
];
function u(e) {
  return new Error(`[vue-lottie-player] ${e}`);
}
function O(e, { onReady: o, onError: r }) {
  let i = !1;
  const n = [], f = () => {
    i || (i = !0, o(e));
  }, s = (l, c) => {
    typeof e.addEventListener == "function" && (e.addEventListener(l, c), n.push(() => {
      typeof e.removeEventListener == "function" && e.removeEventListener(l, c);
    }));
  };
  return V.forEach((l) => {
    s(l, f);
  }), s("data_failed", () => {
    r(u("Failed to load the Lottie animation."));
  }), () => {
    n.forEach((l) => l());
  };
}
const w = [String, Number], M = [Boolean, Number], z = Object, N = Object, E = /* @__PURE__ */ new Set();
function R() {
  var o;
  const e = globalThis.process;
  return typeof e < "u" && ((o = e.env) == null ? void 0 : o.NODE_ENV) !== "production";
}
function P(e) {
  !R() || E.has(e) || (E.add(e), console.warn(`[vue-lottie-player] \`${e}\` is deprecated. Use \`source\` instead.`));
}
function j(e) {
  if (e.kind === "url") {
    if (typeof e.value != "string" || e.value.length === 0)
      throw u("`source.value` must be a non-empty string when `source.kind` is `url`.");
    return;
  }
  if (e.kind === "data") {
    if (e.value == null)
      throw u("`source.value` must be provided when `source.kind` is `data`.");
    return;
  }
  throw u("`source.kind` must be either `url` or `data`.");
}
function U() {
  return `lottie-${Math.random().toString(36).slice(2)}`;
}
function S(e) {
  return typeof e == "number" ? `${e}px` : e;
}
function F(e) {
  const o = e.source !== null, r = !!e.src, i = e.animationData !== null;
  if (o && (r || i))
    throw u("`source` cannot be used together with `src` or `animationData`.");
  if (o)
    return j(e.source), e.source;
  if (r && i)
    throw u("`src` and `animationData` cannot be used together.");
  if (r)
    return P("src"), {
      kind: "url",
      value: e.src
    };
  if (i)
    return P("animationData"), {
      kind: "data",
      value: e.animationData
    };
  throw u("Provide `source`, or use the deprecated `src` / `animationData` bridge props.");
}
const W = {
  name: {
    type: String,
    default: U
  },
  width: {
    type: w,
    default: "200px"
  },
  height: {
    type: w,
    default: "200px"
  },
  background: {
    type: String,
    default: "transparent"
  },
  loop: {
    type: M,
    default: !1
  },
  autoplay: {
    type: Boolean,
    default: !0
  },
  renderer: {
    type: String,
    default: "svg"
  },
  source: {
    type: N,
    default: null
  },
  src: {
    type: String,
    default: null
  },
  animationData: {
    type: z,
    default: null
  }
};
let p = null;
function q() {
  return p || (p = import("lottie-web")), p.then((e) => e.default || e);
}
async function G({
  container: e,
  props: o
}) {
  if (!e)
    throw u("Animation container is not available.");
  const r = F(o);
  return (await q()).loadAnimation({
    container: e,
    name: o.name,
    renderer: o.renderer,
    loop: o.loop,
    autoplay: o.autoplay,
    path: r.kind === "url" ? r.value : void 0,
    animationData: r.kind === "data" ? r.value : void 0
  });
}
const H = b({
  name: "VueLottiePlayer",
  props: W,
  emits: $,
  setup(e, { emit: o, expose: r }) {
    const i = v(null), n = v(null), f = L(() => ({
      width: S(e.width),
      height: S(e.height),
      background: e.background
    })), s = v(!1);
    let l = null, c = 0;
    const h = (t) => {
      o("error", t instanceof Error ? t : new Error(String(t)));
    }, k = () => {
      typeof l == "function" && (l(), l = null);
    }, y = () => {
      k(), n.value && (n.value.destroy(), n.value = null);
    }, g = async () => {
      const t = ++c;
      y();
      try {
        const a = await G({
          container: i.value,
          props: e
        });
        if (!s.value || t !== c) {
          a.destroy();
          return;
        }
        n.value = a, l = O(a, {
          onReady: (d) => {
            o("ready", d);
          },
          onError: h
        });
      } catch (a) {
        y(), h(a);
      }
    };
    return r({
      play: () => {
        var t;
        (t = n.value) == null || t.play();
      },
      pause: () => {
        var t;
        (t = n.value) == null || t.pause();
      },
      stop: () => {
        var t;
        (t = n.value) == null || t.stop();
      },
      setSpeed: (t) => {
        var a;
        (a = n.value) == null || a.setSpeed(t);
      },
      setDirection: (t) => {
        var a;
        (a = n.value) == null || a.setDirection(t);
      },
      goToAndPlay: (t, a) => {
        var d;
        (d = n.value) == null || d.goToAndPlay(t, a);
      },
      goToAndStop: (t, a) => {
        var d;
        (d = n.value) == null || d.goToAndStop(t, a);
      },
      destroy: () => {
        c += 1, y();
      },
      getAnimation: () => n.value
    }), A(() => {
      s.value = !0, g();
    }), _(() => {
      s.value = !1, c += 1, y();
    }), m(
      () => e.loop,
      (t) => {
        n.value && (n.value.loop = t);
      }
    ), m(
      () => [e.width, e.height],
      async () => {
        var t, a;
        await T(), (a = (t = n.value) == null ? void 0 : t.resize) == null || a.call(t);
      }
    ), m(
      () => [e.source, e.src, e.animationData, e.renderer],
      () => {
        s.value && g();
      },
      {
        deep: !0
      }
    ), {
      animContainer: i,
      style: f
    };
  }
}), I = (e, o) => {
  const r = e.__vccOpts || e;
  for (const [i, n] of o)
    r[i] = n;
  return r;
};
function J(e, o, r, i, n, f) {
  return x(), B("div", {
    class: "vue-lottie-player",
    style: C(e.style),
    ref: "animContainer"
  }, null, 4);
}
const D = /* @__PURE__ */ I(H, [["render", J]]), ie = {
  install(e) {
    e.component("VueLottiePlayer", D);
  }
}, le = D;
export {
  le as VueLottiePlayer,
  ie as VueLottiePlayerPlugin
};
