import { effectScope as ae, ref as x, computed as P, onMounted as B, onBeforeUnmount as k, defineComponent as ie, createElementBlock as X, createCommentVNode as ue, unref as ne, openBlock as b, normalizeStyle as re, Fragment as ce, renderList as ve, createBlock as de, resolveDynamicComponent as ge, watch as Z, shallowRef as U, markRaw as fe } from "vue";
let le = !1, Y;
const z = () => (le || (Y = ae(!0).run(() => ({
  /** Whether any drag operation is currently active */
  isDragging: P(
    () => Y.draggingElements.value.length > 0
  ),
  /** Active container where dragging occurs */
  activeContainer: {
    /** Component instance of active container */
    component: x(null),
    /** DOM reference of active container */
    ref: x(null)
  },
  /** All registered draggable elements */
  elements: x([]),
  /** Elements currently being dragged */
  draggingElements: x([]),
  /** Elements currently selected (for multi-drag) */
  selectedElements: x([]),
  /** All registered drop zones */
  zones: x([]),
  /** Current hover states */
  hovered: {
    /** Currently hovered drop zone */
    zone: x(null),
    /** Currently hovered draggable element */
    element: x(null)
  },
  /** Pointer position tracking */
  pointerPosition: {
    /** Current pointer coordinates */
    current: x(null),
    /** Initial coordinates when drag started */
    start: x(null),
    /** Offset from start position */
    offset: {
      /** Offset as percentage of container */
      percent: x(null),
      /** Offset in pixels */
      pixel: x(null)
    }
  }
})), le = !0), Y), he = () => {
  const t = x(null), { draggingElements: e, pointerPosition: l, isDragging: u, activeContainer: c } = z();
  return B(() => {
    c.ref = t;
  }), k(() => {
    c.ref.value = null;
  }), {
    elementRef: t,
    draggingElements: e,
    pointerPosition: l,
    isDragging: u
  };
}, me = ["innerHTML"], pe = /* @__PURE__ */ ie({
  __name: "DefaultOverlay",
  setup(t) {
    const { elementRef: e, pointerPosition: l, isDragging: u, draggingElements: c } = he(), r = P(() => {
      var n, s, d, h;
      return {
        transform: `translate3d(${(((n = l.current.value) == null ? void 0 : n.x) ?? 0) - (((s = l.offset.pixel.value) == null ? void 0 : s.x) ?? 0)}px, ${(((d = l.current.value) == null ? void 0 : d.y) ?? 0) - (((h = l.offset.pixel.value) == null ? void 0 : h.y) ?? 0)}px, 0)`,
        zIndex: 1e3,
        position: "fixed",
        top: 0,
        left: 0,
        transition: "0.3s cubic-bezier(0.165, 0.84, 0.44, 1)"
      };
    });
    return (n, s) => ne(u) ? (b(), X("div", {
      key: 0,
      ref_key: "elementRef",
      ref: e,
      style: re(r.value)
    }, [
      (b(!0), X(ce, null, ve(ne(c), (d, h) => {
        var o, g;
        return b(), X("div", {
          key: h,
          innerHTML: d.initialHTML,
          style: re({
            width: `${(o = d.initialRect) == null ? void 0 : o.width}px`,
            height: `${(g = d.initialRect) == null ? void 0 : g.height}px`
          })
        }, null, 12, me);
      }), 128))
    ], 4)) : ue("", !0);
  }
}), Ce = /* @__PURE__ */ ie({
  __name: "DragOverlay",
  setup(t) {
    const { activeContainer: e } = z(), l = P(
      () => e.component.value ?? pe
    );
    return (u, c) => (b(), de(ge(l.value)));
  }
}), ze = (t, e, l = {}) => {
  const { threshold: u = 50, speed: c = 10, disabled: r = !1 } = l, n = x(!1);
  let s = null, d = null;
  const o = 1e3 / 144;
  let g = null, f = 0, w = 0;
  const i = (m) => {
    if (!t.value || !e.value || r) {
      n.value = !1;
      return;
    }
    d || (d = m);
    const p = m - d;
    if (p < o) {
      s = requestAnimationFrame(i);
      return;
    }
    const S = p / o, E = c * S;
    d = m;
    const L = t.value.scrollTop, O = t.value.scrollLeft;
    (!g || f !== L || w !== O) && (g = t.value.getBoundingClientRect(), f = L, w = O);
    let I = !1;
    e.value.y - g.top < u && (t.value.scrollTop = f - E, I = !0), g.bottom - e.value.y < u && (t.value.scrollTop = f + E, I = !0), e.value.x - g.left < u && (t.value.scrollLeft = w - E, I = !0), g.right - e.value.x < u && (t.value.scrollLeft = w + E, I = !0), n.value = I, I && (s = requestAnimationFrame(i));
  }, y = () => {
    s && (cancelAnimationFrame(s), s = null), g = null, f = 0, w = 0, d = null, n.value = !1;
  };
  return Z(e, (m) => {
    m ? (s && cancelAnimationFrame(s), d = null, i(performance.now())) : y();
  }), Z(
    () => r,
    (m) => {
      m && y();
    }
  ), {
    isScrolling: n
  };
}, oe = (t, e) => t.x < e.x + e.width && t.x + t.width > e.x && t.y < e.y + e.height && t.y + t.height > e.y, T = (t) => {
  if (!t)
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0
    };
  const e = t.getBoundingClientRect();
  return {
    bottom: e.bottom,
    left: e.left,
    right: e.right,
    top: e.top,
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height
  };
}, $ = (t) => ({
  x: t.x + t.width / 2,
  y: t.y + t.height / 2
}), ye = (t, e) => {
  const l = T(t);
  return {
    pixel: {
      x: e.x - l.x,
      y: e.y - l.y
    },
    percent: {
      x: (e.x - l.x) / l.width * 100,
      y: (e.y - l.y) / l.height * 100
    }
  };
}, we = (t) => {
  const l = Math.atan2(t.y, t.x) * (180 / Math.PI);
  return l >= -45 && l <= 45 ? "right" : l > 45 && l < 135 ? "down" : l >= 135 || l <= -135 ? "left" : "up";
}, se = (t, e) => {
  const l = e.x - t.x, u = e.y - t.y;
  return Math.sqrt(l * l + u * u);
}, Oe = (t, e = {}) => {
  const { reset: l = !0, windowResize: u = !0, windowScroll: c = !0 } = e, r = U({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  }), n = {
    resize: null,
    mutation: null
  }, s = () => {
    if (!t.value) {
      l && (r.value = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      });
      return;
    }
    r.value = T(t.value);
  }, d = () => {
    var f, w;
    (f = n.resize) == null || f.disconnect(), (w = n.mutation) == null || w.disconnect(), n.resize = null, n.mutation = null;
  }, h = () => {
    t.value && (d(), n.resize = new ResizeObserver(s), n.resize.observe(t.value), n.mutation = new MutationObserver(s), n.mutation.observe(t.value, {
      attributes: !0,
      attributeFilter: ["style", "class"],
      characterData: !1,
      childList: !1,
      subtree: !1
    }), s());
  }, o = () => {
    c && window.addEventListener("scroll", s, {
      capture: !0,
      passive: !0
    }), u && window.addEventListener("resize", s, { passive: !0 });
  }, g = () => {
    c && window.removeEventListener("scroll", s), u && window.removeEventListener("resize", s);
  };
  return Z(
    () => t.value,
    (f, w) => {
      w !== f && (!f && l && (r.value = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      }), h());
    },
    { immediate: !0 }
  ), o(), k(() => {
    d(), g();
  }), r;
}, Ee = "data-dnd-draggable", xe = (t) => {
  const {
    elements: e,
    draggingElements: l,
    hovered: u,
    selectedElements: c,
    isDragging: r
  } = z(), n = x(null), s = P(
    () => {
      var f;
      return ((f = u.element.value) == null ? void 0 : f.node) === n.value;
    }
  ), d = P(
    () => l.value.some((f) => f.node === n.value)
  ), h = P(() => {
    if (!n.value || !r.value) return !1;
    const f = e.value.find(
      (w) => w.node === n.value
    );
    return f != null && f.groups.length ? !l.value.some((w) => w.groups.length ? !w.groups.some(
      (i) => f.groups.includes(i)
    ) : !1) : !0;
  });
  return {
    elementRef: n,
    registerElement: () => {
      if (!n.value) throw new Error("ElementRef is not set");
      e.value.push({
        node: n.value,
        groups: (t == null ? void 0 : t.groups) ?? [],
        layer: (t == null ? void 0 : t.layer) ?? null,
        defaultLayer: (t == null ? void 0 : t.layer) ?? null,
        events: (t == null ? void 0 : t.events) ?? {},
        data: (t == null ? void 0 : t.data) ?? void 0
      }), n.value.setAttribute(Ee, "true");
    },
    unregisterElement: () => {
      const f = e.value.findIndex(
        (i) => i.node === n.value
      );
      f !== -1 && e.value.splice(f, 1);
      const w = c.value.findIndex(
        (i) => i.node === n.value
      );
      w !== -1 && c.value.splice(w, 1);
    },
    isDragging: d,
    isOvered: s,
    isAllowed: h
  };
}, Pe = () => {
  let t = "", e = "", l = "";
  const u = () => {
    const n = document.body;
    t = n.style.userSelect, e = n.style.touchAction, l = n.style.overscrollBehavior, n.style.userSelect = "none", n.style.touchAction = "none", n.style.overscrollBehavior = "none", window.addEventListener("contextmenu", r), window.addEventListener("selectstart", r), window.addEventListener("touchstart", r), window.addEventListener("touchmove", r);
  }, c = () => {
    const n = document.body;
    n.style.userSelect = t, n.style.touchAction = e, n.style.overscrollBehavior = l, window.removeEventListener("contextmenu", r), window.removeEventListener("selectstart", r), window.removeEventListener("touchstart", r), window.removeEventListener("touchmove", r);
  }, r = (n) => n.preventDefault();
  return {
    disableInteractions: u,
    enableInteractions: c
  };
}, C = (t, e) => t ? e.contains(t) : !1, Se = (t) => {
  const e = z();
  return {
    onPointerStart: (r) => {
      e.pointerPosition.start.value = { x: r.clientX, y: r.clientY }, e.pointerPosition.current.value = {
        x: r.clientX,
        y: r.clientY
      };
      const { pixel: n, percent: s } = ye(t.value, {
        x: r.clientX,
        y: r.clientY
      });
      e.pointerPosition.offset.pixel.value = n, e.pointerPosition.offset.percent.value = s;
    },
    onPointerMove: (r) => {
      e.pointerPosition.current.value = {
        x: r.clientX,
        y: r.clientY
      };
    },
    onPointerEnd: () => {
      e.pointerPosition.current.value = null, e.pointerPosition.start.value = null, e.pointerPosition.offset.pixel.value = null, e.pointerPosition.offset.percent.value = null;
    }
  };
}, De = (t) => {
  const e = z(), { onPointerStart: l, onPointerMove: u, onPointerEnd: c } = Se(t);
  let r = null;
  const n = (i) => {
    var p, S;
    const y = e.selectedElements.value.some(
      (E) => E.node === i
    );
    if (e.selectedElements.value.length && y)
      return e.selectedElements.value.map((E) => {
        var L, O;
        return {
          ...E,
          initialHTML: ((L = E.node) == null ? void 0 : L.outerHTML) ?? "",
          initialRect: (O = E.node) == null ? void 0 : O.getBoundingClientRect()
        };
      });
    e.selectedElements.value = [];
    const m = e.elements.value.find(
      (E) => E.node === i
    );
    return m ? [
      {
        ...m,
        initialHTML: ((p = m.node) == null ? void 0 : p.outerHTML) ?? "",
        initialRect: (S = m.node) == null ? void 0 : S.getBoundingClientRect()
      }
    ] : [];
  }, s = (i, y) => {
    const m = Math.max(
      0,
      Math.min(i.x + i.width, y.x + y.width) - Math.max(i.x, y.x)
    ), p = Math.max(
      0,
      Math.min(i.y + i.height, y.y + y.height) - Math.max(i.y, y.y)
    ), S = m * p, E = i.width * i.height, L = y.width * y.height;
    return (S / E * 100 + S / L * 100) / 2;
  }, d = () => {
    var N, G, V, j, J, K, Q, W, ee, te;
    const i = T(e.activeContainer.ref.value), y = $(i), m = ((N = e.pointerPosition.current.value) == null ? void 0 : N.x) ?? 0, p = ((G = e.pointerPosition.current.value) == null ? void 0 : G.y) ?? 0, E = !(i && m >= i.x && m <= i.x + i.width && p >= i.y && p <= i.y + i.height), L = e.draggingElements.value.map((a) => a.node), O = e.elements.value.filter((a) => {
      if (!a.node || L.some(
        (D) => D && C(a.node, D)
      ) || a.groups.length && !!e.draggingElements.value.some(
        (M) => M.groups.length ? !M.groups.some(
          (R) => a.groups.includes(R)
        ) : !1
      ))
        return !1;
      const v = T(a.node);
      return v && i && oe(v, i);
    }).map((a) => {
      const v = T(a.node), D = $(v), M = m >= v.x && m <= v.x + v.width && p >= v.y && p <= v.y + v.height, R = s(v, i), q = se(y, D), A = e.elements.value.filter(
        (_) => _ !== a && _.node && a.node && C(
          a.node,
          _.node
        )
      ).length;
      return {
        element: a,
        isPointerInElement: M,
        overlapPercent: R,
        depth: A,
        centerDistance: q
      };
    }).sort((a, v) => {
      if (!E) {
        if (a.isPointerInElement && v.isPointerInElement)
          return v.depth - a.depth;
        if (a.isPointerInElement !== v.isPointerInElement)
          return a.isPointerInElement ? -1 : 1;
      }
      return Math.abs(a.overlapPercent - v.overlapPercent) <= 1 ? a.centerDistance - v.centerDistance : v.overlapPercent - a.overlapPercent;
    }), I = e.zones.value.filter((a) => {
      if (!a.node || L.some(
        (D) => D && C(a.node, D)
      ) || a.groups.length && !!e.draggingElements.value.some((M) => M.groups.length ? !M.groups.some((R) => a.groups.includes(R)) : !1))
        return !1;
      const v = T(a.node);
      return v && i && oe(v, i);
    }).map((a) => {
      const v = T(a.node), D = $(v), M = m >= v.x && m <= v.x + v.width && p >= v.y && p <= v.y + v.height, R = s(v, i), q = se(y, D), A = e.zones.value.filter(
        (_) => _ !== a && _.node && a.node && C(a.node, _.node)
      ).length;
      return {
        zone: a,
        isPointerInElement: M,
        overlapPercent: R,
        depth: A,
        centerDistance: q
      };
    }).sort((a, v) => {
      if (!E) {
        if (a.isPointerInElement && v.isPointerInElement)
          return v.depth - a.depth;
        if (a.isPointerInElement !== v.isPointerInElement)
          return a.isPointerInElement ? -1 : 1;
      }
      return Math.abs(a.overlapPercent - v.overlapPercent) <= 1 ? a.centerDistance - v.centerDistance : v.overlapPercent - a.overlapPercent;
    }), F = e.hovered.element.value, H = e.hovered.zone.value;
    e.hovered.element.value = ((V = O[0]) == null ? void 0 : V.element) ?? null, e.hovered.zone.value = ((j = I[0]) == null ? void 0 : j.zone) ?? null, e.hovered.element.value !== F && ((J = F == null ? void 0 : F.events) != null && J.onLeave && F.events.onLeave(e), (Q = (K = e.hovered.element.value) == null ? void 0 : K.events) != null && Q.onHover && e.hovered.element.value.events.onHover(e)), e.hovered.zone.value !== H && ((W = H == null ? void 0 : H.events) != null && W.onLeave && H.events.onLeave(e), (te = (ee = e.hovered.zone.value) == null ? void 0 : ee.events) != null && te.onHover && e.hovered.zone.value.events.onHover(e)), r = requestAnimationFrame(d);
  }, h = () => {
    d();
  }, o = () => {
    r !== null && (cancelAnimationFrame(r), r = null);
  };
  return {
    activate: (i) => {
      e.draggingElements.value = n(t.value), l(i), h();
    },
    track: (i) => {
      u(i);
    },
    deactivate: () => {
      var i, y;
      c(), e.hovered.zone.value ? (y = (i = e.hovered.zone.value.events).onDrop) == null || y.call(i, e) : e.draggingElements.value.forEach(
        (m) => {
          var p, S;
          return (S = (p = m.events).onEnd) == null ? void 0 : S.call(p, e);
        }
      ), e.draggingElements.value = [], e.selectedElements.value = [], e.hovered.zone.value = null, e.hovered.element.value = null, o();
    }
  };
}, Re = (t) => {
  const {
    elementRef: e,
    registerElement: l,
    unregisterElement: u,
    isDragging: c,
    isOvered: r,
    isAllowed: n
  } = xe(t), { disableInteractions: s, enableInteractions: d } = Pe(), h = z(), { activate: o, track: g, deactivate: f } = De(e), w = (p) => {
    t != null && t.container && (h.activeContainer.component.value = fe(t.container)), s(), o(p), document.addEventListener("pointermove", i), document.addEventListener("pointerup", m), document.addEventListener("wheel", y);
  }, i = (p) => {
    g(p);
  }, y = (p) => {
    g(p);
  }, m = () => {
    h.activeContainer.component.value = null, d(), f(), document.removeEventListener("pointermove", i), document.removeEventListener("pointerup", m), document.removeEventListener("wheel", y);
  };
  return B(l), k(u), {
    pointerPosition: h.pointerPosition,
    elementRef: e,
    isDragging: c,
    isOvered: r,
    isAllowed: n,
    handleDragStart: w
  };
}, Le = (t) => {
  const { zones: e, hovered: l, draggingElements: u, isDragging: c } = z(), r = x(null), n = P(() => {
    var o;
    return ((o = l.zone.value) == null ? void 0 : o.node) === r.value;
  }), s = P(() => {
    if (!r.value || !c.value) return !1;
    const o = e.value.find(
      (g) => g.node === r.value
    );
    return o != null && o.groups.length ? !u.value.some((g) => g.groups.length ? !g.groups.some(
      (f) => o.groups.includes(f)
    ) : !1) : !0;
  });
  return { elementRef: r, registerZone: () => {
    if (!r.value) throw new Error("elementRef is not set");
    e.value.push({
      node: r.value,
      groups: (t == null ? void 0 : t.groups) ?? [],
      events: (t == null ? void 0 : t.events) ?? {},
      data: (t == null ? void 0 : t.data) ?? void 0
    }), r.value.setAttribute("data-dnd-droppable", "true");
  }, unregisterZone: () => {
    if (!r.value) throw new Error("elementRef is not set");
    const o = e.value.findIndex(
      (g) => g.node === r.value
    );
    o !== -1 && e.value.splice(o, 1);
  }, isOvered: n, isAllowed: s };
}, _e = (t) => {
  const { elementRef: e, registerZone: l, unregisterZone: u, isOvered: c, isAllowed: r } = Le(t);
  return B(l), k(u), { elementRef: e, isOvered: c, isAllowed: r };
};
function Me(t, e, l = {}) {
  const { immediate: u = !0 } = l;
  let c = null;
  const r = () => {
    c && (c.disconnect(), c = null);
  }, n = () => {
    if (t.value && (r(), c = new ResizeObserver(([s]) => {
      s && e(s);
    }), c.observe(t.value), u)) {
      const s = t.value.getBoundingClientRect();
      e({
        contentRect: s,
        target: t.value,
        borderBoxSize: [],
        contentBoxSize: [],
        devicePixelContentBoxSize: []
      });
    }
  };
  return Z(
    () => t.value,
    (s) => {
      s ? n() : r();
    },
    { immediate: !0 }
  ), k(r), r;
}
function Te(t, e = { width: 0, height: 0 }) {
  const l = U(e.width), u = U(e.height);
  return Me(
    t,
    (c) => {
      l.value = c.contentRect.width, u.value = c.contentRect.height;
    },
    { immediate: !0 }
  ), {
    width: l,
    height: u
  };
}
const Fe = (t, e) => {
  const l = P(() => {
    var n, s, d, h;
    return {
      x: (((n = e.value) == null ? void 0 : n.x) ?? 0) - (((s = t.value) == null ? void 0 : s.x) ?? 0),
      y: (((d = e.value) == null ? void 0 : d.y) ?? 0) - (((h = t.value) == null ? void 0 : h.y) ?? 0)
    };
  }), u = P(() => we(l.value)), c = P(() => {
    var d, h, o, g;
    const n = (((d = e.value) == null ? void 0 : d.x) ?? 0) - (((h = t.value) == null ? void 0 : h.x) ?? 0), s = (((o = e.value) == null ? void 0 : o.y) ?? 0) - (((g = t.value) == null ? void 0 : g.y) ?? 0);
    return Math.sqrt(n * n + s * s);
  }), r = P(() => {
    var d, h, o, g;
    const n = (((d = e.value) == null ? void 0 : d.x) ?? 0) - (((h = t.value) == null ? void 0 : h.x) ?? 0), s = (((o = e.value) == null ? void 0 : o.y) ?? 0) - (((g = t.value) == null ? void 0 : g.y) ?? 0);
    return Math.atan2(s, n) * (180 / Math.PI);
  });
  return {
    delta: l,
    direction: u,
    distance: c,
    angle: r
  };
}, He = (t) => {
  const { selectedElements: e, elements: l } = z(), u = P(
    () => l.value.find((o) => o.node === t.value)
  ), c = P(
    () => e.value.some((o) => o.node === t.value)
  ), r = P(() => t.value ? e.value.some(
    (o) => o.node && C(
      o.node,
      t.value
    )
  ) : !1), n = P(() => t.value ? e.value.some(
    (o) => o.node && C(
      t.value,
      o.node
    )
  ) : !1), s = () => {
    u.value && (e.value = e.value.filter(
      (o) => o.node !== t.value
    ));
  }, d = () => {
    u.value && (r.value && (e.value = e.value.filter(
      (o) => o.node && !C(
        o.node,
        t.value
      )
    )), n.value && (e.value = e.value.filter(
      (o) => o.node && !C(
        t.value,
        o.node
      )
    )), e.value.push(u.value));
  };
  return {
    handleUnselect: s,
    handleSelect: d,
    handleToggleSelect: () => {
      u.value && (e.value.some((o) => o.node === t.value) ? s() : d());
    },
    isSelected: c,
    isParentOfSelected: r
  };
};
export {
  Ce as DragOverlay,
  ze as useAutoScroll,
  Oe as useBounding,
  z as useDnDStore,
  Re as useDrag,
  _e as useDrop,
  Te as useElementSize,
  Fe as useGeometry,
  He as useSelectionManager
};
