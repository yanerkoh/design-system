"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }






var _chunkTEEPPNNEjs = require('./chunk-TEEPPNNE.js');

// node_modules/@react-native/normalize-color/index.js
var require_normalize_color = _chunkTEEPPNNEjs.__commonJS.call(void 0, {
  "node_modules/@react-native/normalize-color/index.js"(exports, module) {
    "use strict";
    function normalizeColor3(color) {
      if (typeof color === "number") {
        if (color >>> 0 === color && color >= 0 && color <= 4294967295) {
          return color;
        }
        return null;
      }
      if (typeof color !== "string") {
        return null;
      }
      const matchers = getMatchers();
      let match;
      if (match = matchers.hex6.exec(color)) {
        return parseInt(match[1] + "ff", 16) >>> 0;
      }
      const colorFromKeyword = normalizeKeyword(color);
      if (colorFromKeyword != null) {
        return colorFromKeyword;
      }
      if (match = matchers.rgb.exec(color)) {
        return (parse255(match[1]) << 24 | // r
        parse255(match[2]) << 16 | // g
        parse255(match[3]) << 8 | // b
        255) >>> // a
        0;
      }
      if (match = matchers.rgba.exec(color)) {
        if (match[6] !== void 0) {
          return (parse255(match[6]) << 24 | // r
          parse255(match[7]) << 16 | // g
          parse255(match[8]) << 8 | // b
          parse1(match[9])) >>> // a
          0;
        }
        return (parse255(match[2]) << 24 | // r
        parse255(match[3]) << 16 | // g
        parse255(match[4]) << 8 | // b
        parse1(match[5])) >>> // a
        0;
      }
      if (match = matchers.hex3.exec(color)) {
        return parseInt(
          match[1] + match[1] + // r
          match[2] + match[2] + // g
          match[3] + match[3] + // b
          "ff",
          // a
          16
        ) >>> 0;
      }
      if (match = matchers.hex8.exec(color)) {
        return parseInt(match[1], 16) >>> 0;
      }
      if (match = matchers.hex4.exec(color)) {
        return parseInt(
          match[1] + match[1] + // r
          match[2] + match[2] + // g
          match[3] + match[3] + // b
          match[4] + match[4],
          // a
          16
        ) >>> 0;
      }
      if (match = matchers.hsl.exec(color)) {
        return (hslToRgb(
          parse360(match[1]),
          // h
          parsePercentage(match[2]),
          // s
          parsePercentage(match[3])
          // l
        ) | 255) >>> // a
        0;
      }
      if (match = matchers.hsla.exec(color)) {
        if (match[6] !== void 0) {
          return (hslToRgb(
            parse360(match[6]),
            // h
            parsePercentage(match[7]),
            // s
            parsePercentage(match[8])
            // l
          ) | parse1(match[9])) >>> // a
          0;
        }
        return (hslToRgb(
          parse360(match[2]),
          // h
          parsePercentage(match[3]),
          // s
          parsePercentage(match[4])
          // l
        ) | parse1(match[5])) >>> // a
        0;
      }
      if (match = matchers.hwb.exec(color)) {
        return (hwbToRgb(
          parse360(match[1]),
          // h
          parsePercentage(match[2]),
          // w
          parsePercentage(match[3])
          // b
        ) | 255) >>> // a
        0;
      }
      return null;
    }
    function hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    }
    function hslToRgb(h, s, l) {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      const r = hue2rgb(p, q, h + 1 / 3);
      const g = hue2rgb(p, q, h);
      const b = hue2rgb(p, q, h - 1 / 3);
      return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
    }
    function hwbToRgb(h, w, b) {
      if (w + b >= 1) {
        const gray = Math.round(w * 255 / (w + b));
        return gray << 24 | gray << 16 | gray << 8;
      }
      const red = hue2rgb(0, 1, h + 1 / 3) * (1 - w - b) + w;
      const green = hue2rgb(0, 1, h) * (1 - w - b) + w;
      const blue = hue2rgb(0, 1, h - 1 / 3) * (1 - w - b) + w;
      return Math.round(red * 255) << 24 | Math.round(green * 255) << 16 | Math.round(blue * 255) << 8;
    }
    var NUMBER = "[-+]?\\d*\\.?\\d+";
    var PERCENTAGE = NUMBER + "%";
    function call(...args) {
      return "\\(\\s*(" + args.join(")\\s*,?\\s*(") + ")\\s*\\)";
    }
    function callWithSlashSeparator(...args) {
      return "\\(\\s*(" + args.slice(0, args.length - 1).join(")\\s*,?\\s*(") + ")\\s*/\\s*(" + args[args.length - 1] + ")\\s*\\)";
    }
    function commaSeparatedCall(...args) {
      return "\\(\\s*(" + args.join(")\\s*,\\s*(") + ")\\s*\\)";
    }
    var cachedMatchers;
    function getMatchers() {
      if (cachedMatchers === void 0) {
        cachedMatchers = {
          rgb: new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER)),
          rgba: new RegExp(
            "rgba(" + commaSeparatedCall(NUMBER, NUMBER, NUMBER, NUMBER) + "|" + callWithSlashSeparator(NUMBER, NUMBER, NUMBER, NUMBER) + ")"
          ),
          hsl: new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE)),
          hsla: new RegExp(
            "hsla(" + commaSeparatedCall(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + "|" + callWithSlashSeparator(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + ")"
          ),
          hwb: new RegExp("hwb" + call(NUMBER, PERCENTAGE, PERCENTAGE)),
          hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex6: /^#([0-9a-fA-F]{6})$/,
          hex8: /^#([0-9a-fA-F]{8})$/
        };
      }
      return cachedMatchers;
    }
    function parse255(str) {
      const int = parseInt(str, 10);
      if (int < 0) {
        return 0;
      }
      if (int > 255) {
        return 255;
      }
      return int;
    }
    function parse360(str) {
      const int = parseFloat(str);
      return (int % 360 + 360) % 360 / 360;
    }
    function parse1(str) {
      const num = parseFloat(str);
      if (num < 0) {
        return 0;
      }
      if (num > 1) {
        return 255;
      }
      return Math.round(num * 255);
    }
    function parsePercentage(str) {
      const int = parseFloat(str);
      if (int < 0) {
        return 0;
      }
      if (int > 100) {
        return 1;
      }
      return int / 100;
    }
    function normalizeKeyword(name) {
      switch (name) {
        case "transparent":
          return 0;
        case "aliceblue":
          return 4042850303;
        case "antiquewhite":
          return 4209760255;
        case "aqua":
          return 16777215;
        case "aquamarine":
          return 2147472639;
        case "azure":
          return 4043309055;
        case "beige":
          return 4126530815;
        case "bisque":
          return 4293182719;
        case "black":
          return 255;
        case "blanchedalmond":
          return 4293643775;
        case "blue":
          return 65535;
        case "blueviolet":
          return 2318131967;
        case "brown":
          return 2771004159;
        case "burlywood":
          return 3736635391;
        case "burntsienna":
          return 3934150143;
        case "cadetblue":
          return 1604231423;
        case "chartreuse":
          return 2147418367;
        case "chocolate":
          return 3530104575;
        case "coral":
          return 4286533887;
        case "cornflowerblue":
          return 1687547391;
        case "cornsilk":
          return 4294499583;
        case "crimson":
          return 3692313855;
        case "cyan":
          return 16777215;
        case "darkblue":
          return 35839;
        case "darkcyan":
          return 9145343;
        case "darkgoldenrod":
          return 3095792639;
        case "darkgray":
          return 2846468607;
        case "darkgreen":
          return 6553855;
        case "darkgrey":
          return 2846468607;
        case "darkkhaki":
          return 3182914559;
        case "darkmagenta":
          return 2332068863;
        case "darkolivegreen":
          return 1433087999;
        case "darkorange":
          return 4287365375;
        case "darkorchid":
          return 2570243327;
        case "darkred":
          return 2332033279;
        case "darksalmon":
          return 3918953215;
        case "darkseagreen":
          return 2411499519;
        case "darkslateblue":
          return 1211993087;
        case "darkslategray":
          return 793726975;
        case "darkslategrey":
          return 793726975;
        case "darkturquoise":
          return 13554175;
        case "darkviolet":
          return 2483082239;
        case "deeppink":
          return 4279538687;
        case "deepskyblue":
          return 12582911;
        case "dimgray":
          return 1768516095;
        case "dimgrey":
          return 1768516095;
        case "dodgerblue":
          return 512819199;
        case "firebrick":
          return 2988581631;
        case "floralwhite":
          return 4294635775;
        case "forestgreen":
          return 579543807;
        case "fuchsia":
          return 4278255615;
        case "gainsboro":
          return 3705462015;
        case "ghostwhite":
          return 4177068031;
        case "gold":
          return 4292280575;
        case "goldenrod":
          return 3668254975;
        case "gray":
          return 2155905279;
        case "green":
          return 8388863;
        case "greenyellow":
          return 2919182335;
        case "grey":
          return 2155905279;
        case "honeydew":
          return 4043305215;
        case "hotpink":
          return 4285117695;
        case "indianred":
          return 3445382399;
        case "indigo":
          return 1258324735;
        case "ivory":
          return 4294963455;
        case "khaki":
          return 4041641215;
        case "lavender":
          return 3873897215;
        case "lavenderblush":
          return 4293981695;
        case "lawngreen":
          return 2096890111;
        case "lemonchiffon":
          return 4294626815;
        case "lightblue":
          return 2916673279;
        case "lightcoral":
          return 4034953471;
        case "lightcyan":
          return 3774873599;
        case "lightgoldenrodyellow":
          return 4210742015;
        case "lightgray":
          return 3553874943;
        case "lightgreen":
          return 2431553791;
        case "lightgrey":
          return 3553874943;
        case "lightpink":
          return 4290167295;
        case "lightsalmon":
          return 4288707327;
        case "lightseagreen":
          return 548580095;
        case "lightskyblue":
          return 2278488831;
        case "lightslategray":
          return 2005441023;
        case "lightslategrey":
          return 2005441023;
        case "lightsteelblue":
          return 2965692159;
        case "lightyellow":
          return 4294959359;
        case "lime":
          return 16711935;
        case "limegreen":
          return 852308735;
        case "linen":
          return 4210091775;
        case "magenta":
          return 4278255615;
        case "maroon":
          return 2147483903;
        case "mediumaquamarine":
          return 1724754687;
        case "mediumblue":
          return 52735;
        case "mediumorchid":
          return 3126187007;
        case "mediumpurple":
          return 2473647103;
        case "mediumseagreen":
          return 1018393087;
        case "mediumslateblue":
          return 2070474495;
        case "mediumspringgreen":
          return 16423679;
        case "mediumturquoise":
          return 1221709055;
        case "mediumvioletred":
          return 3340076543;
        case "midnightblue":
          return 421097727;
        case "mintcream":
          return 4127193855;
        case "mistyrose":
          return 4293190143;
        case "moccasin":
          return 4293178879;
        case "navajowhite":
          return 4292783615;
        case "navy":
          return 33023;
        case "oldlace":
          return 4260751103;
        case "olive":
          return 2155872511;
        case "olivedrab":
          return 1804477439;
        case "orange":
          return 4289003775;
        case "orangered":
          return 4282712319;
        case "orchid":
          return 3664828159;
        case "palegoldenrod":
          return 4008225535;
        case "palegreen":
          return 2566625535;
        case "paleturquoise":
          return 2951671551;
        case "palevioletred":
          return 3681588223;
        case "papayawhip":
          return 4293907967;
        case "peachpuff":
          return 4292524543;
        case "peru":
          return 3448061951;
        case "pink":
          return 4290825215;
        case "plum":
          return 3718307327;
        case "powderblue":
          return 2967529215;
        case "purple":
          return 2147516671;
        case "rebeccapurple":
          return 1714657791;
        case "red":
          return 4278190335;
        case "rosybrown":
          return 3163525119;
        case "royalblue":
          return 1097458175;
        case "saddlebrown":
          return 2336560127;
        case "salmon":
          return 4202722047;
        case "sandybrown":
          return 4104413439;
        case "seagreen":
          return 780883967;
        case "seashell":
          return 4294307583;
        case "sienna":
          return 2689740287;
        case "silver":
          return 3233857791;
        case "skyblue":
          return 2278484991;
        case "slateblue":
          return 1784335871;
        case "slategray":
          return 1887473919;
        case "slategrey":
          return 1887473919;
        case "snow":
          return 4294638335;
        case "springgreen":
          return 16744447;
        case "steelblue":
          return 1182971135;
        case "tan":
          return 3535047935;
        case "teal":
          return 8421631;
        case "thistle":
          return 3636451583;
        case "tomato":
          return 4284696575;
        case "turquoise":
          return 1088475391;
        case "violet":
          return 4001558271;
        case "wheat":
          return 4125012991;
        case "white":
          return 4294967295;
        case "whitesmoke":
          return 4126537215;
        case "yellow":
          return 4294902015;
        case "yellowgreen":
          return 2597139199;
      }
      return null;
    }
    module.exports = normalizeColor3;
  }
});

// node_modules/react-dom/cjs/react-dom.production.js
var require_react_dom_production = _chunkTEEPPNNEjs.__commonJS.call(void 0, {
  "node_modules/react-dom/cjs/react-dom.production.js"(exports) {
    "use strict";
    var React15 = _chunkTEEPPNNEjs.__require.call(void 0, "react");
    function formatProdErrorMessage(code) {
      var url = "https://react.dev/errors/" + code;
      if (1 < arguments.length) {
        url += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2; i < arguments.length; i++)
          url += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function noop() {
    }
    var Internals = {
      d: {
        f: noop,
        r: function() {
          throw Error(formatProdErrorMessage(522));
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    };
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    function createPortal$1(children, containerInfo, implementation) {
      var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: null == key ? null : "" + key,
        children,
        containerInfo,
        implementation
      };
    }
    var ReactSharedInternals = React15.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function getCrossOriginStringAs(as, input) {
      if ("font" === as)
        return "";
      if ("string" === typeof input)
        return "use-credentials" === input ? input : "";
    }
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    exports.createPortal = function(children, container) {
      var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
        throw Error(formatProdErrorMessage(299));
      return createPortal$1(children, container, null, key);
    };
    exports.flushSync = function(fn) {
      var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
      try {
        if (ReactSharedInternals.T = null, Internals.p = 2, fn)
          return fn();
      } finally {
        ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
      }
    };
    exports.preconnect = function(href, options) {
      "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
    };
    exports.prefetchDNS = function(href) {
      "string" === typeof href && Internals.d.D(href);
    };
    exports.preinit = function(href, options) {
      if ("string" === typeof href && options && "string" === typeof options.as) {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
        "style" === as ? Internals.d.S(
          href,
          "string" === typeof options.precedence ? options.precedence : void 0,
          {
            crossOrigin,
            integrity,
            fetchPriority
          }
        ) : "script" === as && Internals.d.X(href, {
          crossOrigin,
          integrity,
          fetchPriority,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
      }
    };
    exports.preinitModule = function(href, options) {
      if ("string" === typeof href)
        if ("object" === typeof options && null !== options) {
          if (null == options.as || "script" === options.as) {
            var crossOrigin = getCrossOriginStringAs(
              options.as,
              options.crossOrigin
            );
            Internals.d.M(href, {
              crossOrigin,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0
            });
          }
        } else
          null == options && Internals.d.M(href);
    };
    exports.preload = function(href, options) {
      if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
        Internals.d.L(href, as, {
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          type: "string" === typeof options.type ? options.type : void 0,
          fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
          referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
          imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
          imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
          media: "string" === typeof options.media ? options.media : void 0
        });
      }
    };
    exports.preloadModule = function(href, options) {
      if ("string" === typeof href)
        if (options) {
          var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
          Internals.d.m(href, {
            as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0
          });
        } else
          Internals.d.m(href);
    };
    exports.requestFormReset = function(form) {
      Internals.d.r(form);
    };
    exports.unstable_batchedUpdates = function(fn, a) {
      return fn(a);
    };
    exports.useFormState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useFormState(action, initialState, permalink);
    };
    exports.useFormStatus = function() {
      return ReactSharedInternals.H.useHostTransitionStatus();
    };
    exports.version = "19.2.0";
  }
});

// node_modules/react-dom/cjs/react-dom.development.js
var require_react_dom_development = _chunkTEEPPNNEjs.__commonJS.call(void 0, {
  "node_modules/react-dom/cjs/react-dom.development.js"(exports) {
    "use strict";
    "production" !== process.env.NODE_ENV && function() {
      function noop() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function createPortal$1(children, containerInfo, implementation) {
        var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        try {
          testStringCoercion(key);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        JSCompiler_inline_result && (console.error(
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          "function" === typeof Symbol && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"
        ), testStringCoercion(key));
        return {
          $$typeof: REACT_PORTAL_TYPE,
          key: null == key ? null : "" + key,
          children,
          containerInfo,
          implementation
        };
      }
      function getCrossOriginStringAs(as, input) {
        if ("font" === as)
          return "";
        if ("string" === typeof input)
          return "use-credentials" === input ? input : "";
      }
      function getValueDescriptorExpectingObjectForWarning(thing) {
        return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : 'something with type "' + typeof thing + '"';
      }
      function getValueDescriptorExpectingEnumForWarning(thing) {
        return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "string" === typeof thing ? JSON.stringify(thing) : "number" === typeof thing ? "`" + thing + "`" : 'something with type "' + typeof thing + '"';
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React15 = _chunkTEEPPNNEjs.__require.call(void 0, "react"), Internals = {
        d: {
          f: noop,
          r: function() {
            throw Error(
              "Invalid form element. requestFormReset must be passed a form that was rendered by React."
            );
          },
          D: noop,
          C: noop,
          L: noop,
          m: noop,
          X: noop,
          S: noop,
          M: noop
        },
        p: 0,
        findDOMNode: null
      }, REACT_PORTAL_TYPE = Symbol.for("react.portal"), ReactSharedInternals = React15.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      "function" === typeof Map && null != Map.prototype && "function" === typeof Map.prototype.forEach && "function" === typeof Set && null != Set.prototype && "function" === typeof Set.prototype.clear && "function" === typeof Set.prototype.forEach || console.error(
        "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
      );
      exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
      exports.createPortal = function(children, container) {
        var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
          throw Error("Target container is not a DOM element.");
        return createPortal$1(children, container, null, key);
      };
      exports.flushSync = function(fn) {
        var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
        try {
          if (ReactSharedInternals.T = null, Internals.p = 2, fn)
            return fn();
        } finally {
          ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f() && console.error(
            "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
          );
        }
      };
      exports.preconnect = function(href, options) {
        "string" === typeof href && href ? null != options && "object" !== typeof options ? console.error(
          "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
          getValueDescriptorExpectingEnumForWarning(options)
        ) : null != options && "string" !== typeof options.crossOrigin && console.error(
          "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
          getValueDescriptorExpectingObjectForWarning(options.crossOrigin)
        ) : console.error(
          "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          getValueDescriptorExpectingObjectForWarning(href)
        );
        "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
      };
      exports.prefetchDNS = function(href) {
        if ("string" !== typeof href || !href)
          console.error(
            "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
            getValueDescriptorExpectingObjectForWarning(href)
          );
        else if (1 < arguments.length) {
          var options = arguments[1];
          "object" === typeof options && options.hasOwnProperty("crossOrigin") ? console.error(
            "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
            getValueDescriptorExpectingEnumForWarning(options)
          ) : console.error(
            "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
            getValueDescriptorExpectingEnumForWarning(options)
          );
        }
        "string" === typeof href && Internals.d.D(href);
      };
      exports.preinit = function(href, options) {
        "string" === typeof href && href ? null == options || "object" !== typeof options ? console.error(
          "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
          getValueDescriptorExpectingEnumForWarning(options)
        ) : "style" !== options.as && "script" !== options.as && console.error(
          'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
          getValueDescriptorExpectingEnumForWarning(options.as)
        ) : console.error(
          "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          getValueDescriptorExpectingObjectForWarning(href)
        );
        if ("string" === typeof href && options && "string" === typeof options.as) {
          var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
          "style" === as ? Internals.d.S(
            href,
            "string" === typeof options.precedence ? options.precedence : void 0,
            {
              crossOrigin,
              integrity,
              fetchPriority
            }
          ) : "script" === as && Internals.d.X(href, {
            crossOrigin,
            integrity,
            fetchPriority,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0
          });
        }
      };
      exports.preinitModule = function(href, options) {
        var encountered = "";
        "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
        void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "script" !== options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
        if (encountered)
          console.error(
            "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
            encountered
          );
        else
          switch (encountered = options && "string" === typeof options.as ? options.as : "script", encountered) {
            case "script":
              break;
            default:
              encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error(
                'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
                encountered,
                href
              );
          }
        if ("string" === typeof href)
          if ("object" === typeof options && null !== options) {
            if (null == options.as || "script" === options.as)
              encountered = getCrossOriginStringAs(
                options.as,
                options.crossOrigin
              ), Internals.d.M(href, {
                crossOrigin: encountered,
                integrity: "string" === typeof options.integrity ? options.integrity : void 0,
                nonce: "string" === typeof options.nonce ? options.nonce : void 0
              });
          } else
            null == options && Internals.d.M(href);
      };
      exports.preload = function(href, options) {
        var encountered = "";
        "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
        null == options || "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : "string" === typeof options.as && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
        encountered && console.error(
          'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
          encountered
        );
        if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
          encountered = options.as;
          var crossOrigin = getCrossOriginStringAs(
            encountered,
            options.crossOrigin
          );
          Internals.d.L(href, encountered, {
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0,
            type: "string" === typeof options.type ? options.type : void 0,
            fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
            referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
            imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
            imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
            media: "string" === typeof options.media ? options.media : void 0
          });
        }
      };
      exports.preloadModule = function(href, options) {
        var encountered = "";
        "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
        void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "string" !== typeof options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
        encountered && console.error(
          'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
          encountered
        );
        "string" === typeof href && (options ? (encountered = getCrossOriginStringAs(
          options.as,
          options.crossOrigin
        ), Internals.d.m(href, {
          as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
          crossOrigin: encountered,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0
        })) : Internals.d.m(href));
      };
      exports.requestFormReset = function(form) {
        Internals.d.r(form);
      };
      exports.unstable_batchedUpdates = function(fn, a) {
        return fn(a);
      };
      exports.useFormState = function(action, initialState, permalink) {
        return resolveDispatcher().useFormState(action, initialState, permalink);
      };
      exports.useFormStatus = function() {
        return resolveDispatcher().useHostTransitionStatus();
      };
      exports.version = "19.2.0";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }
});

// node_modules/react-dom/index.js
var require_react_dom = _chunkTEEPPNNEjs.__commonJS.call(void 0, {
  "node_modules/react-dom/index.js"(exports, module) {
    "use strict";
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (process.env.NODE_ENV !== "production") {
        throw new Error("^_^");
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (process.env.NODE_ENV === "production") {
      checkDCE();
      module.exports = require_react_dom_production();
    } else {
      module.exports = require_react_dom_development();
    }
  }
});

// node_modules/@tamagui/timer/dist/esm/index.js
var esm_exports = {};
_chunkTEEPPNNEjs.__export.call(void 0, esm_exports, {
  timer: () => timer
});
function timer() {
  let runs = 0;
  const typesOfRuns = /* @__PURE__ */ new Set(), timings = {};
  function print() {
    const typeRuns = runs / typesOfRuns.size;
    let totalTime = 0;
    const out = [
      `Ran ${typeRuns} per-type, ${runs} total`,
      ...[...typesOfRuns].map((name) => {
        if (name.endsWith("(ignore)"))
          return;
        const avg = `avg ${`${timings[name] / typeRuns}`.slice(0, 9).padEnd(9)}ms`, total = timings[name];
        return totalTime += total, `${name.slice(0, 30).padStart(31)} | ${avg} | total ${total}ms`;
      }),
      `                                    total ${totalTime}ms`
    ].join(`
`);
    return console.info(out), out;
  }
  return {
    start(opts) {
      const quiet = _nullishCoalesce(_optionalChain([opts, 'optionalAccess', _2 => _2.quiet]), () => ( true));
      function time3(strings, ...vars) {
        const elapsed = performance.now() - start, tag = templateToString(strings, ...vars);
        if (typesOfRuns.add(tag), runs++, _nullishCoalesce(timings[tag], () => ( (timings[tag] = 0))), timings[tag] += elapsed, !quiet) {
          let result = "";
          strings.forEach((str, i) => {
            result += `${str}${i === strings.length - 1 ? "" : vars[i]}`;
          }), console.info(`${`${elapsed}ms`.slice(0, 6).padStart(7)} |`, result);
        }
        start = performance.now();
      }
      let start = performance.now();
      return time3.print = print, time3;
    },
    profile() {
      return {
        timings,
        runs
      };
    },
    print
  };
}
function templateToString(strings, ...vars) {
  return strings.reduce(
    (result, str, i) => result + str + (vars[i] !== void 0 ? vars[i] : ""),
    ""
  );
}
var init_esm = _chunkTEEPPNNEjs.__esm.call(void 0, {
  "node_modules/@tamagui/timer/dist/esm/index.js"() {
  }
});

// src/components/Button.tsx
var _core = require('@tamagui/core');

// node_modules/@tamagui/font-size/dist/esm/getFontSize.js

var getFontSize = (inSize, opts) => {
  const res = getFontSizeVariable(inSize, opts);
  return _core.isVariable.call(void 0, res) ? +res.val : res ? +res : 16;
};
var getFontSizeVariable = (inSize, opts) => {
  const token = getFontSizeToken(inSize, opts);
  if (!token)
    return inSize;
  const conf4 = _core.getConfig.call(void 0, );
  return _optionalChain([conf4, 'access', _3 => _3.fontsParsed, 'access', _4 => _4[_optionalChain([opts, 'optionalAccess', _5 => _5.font]) || conf4.defaultFontToken], 'optionalAccess', _6 => _6.size, 'access', _7 => _7[token]]);
};
var getFontSizeToken = (inSize, opts) => {
  if (typeof inSize == "number")
    return null;
  const relativeSize = _optionalChain([opts, 'optionalAccess', _8 => _8.relativeSize]) || 0, conf4 = _core.getConfig.call(void 0, ), fontSize = _optionalChain([conf4, 'access', _9 => _9.fontsParsed, 'access', _10 => _10[_optionalChain([opts, 'optionalAccess', _11 => _11.font]) || conf4.defaultFontToken], 'optionalAccess', _12 => _12.size]) || // fallback to size tokens
  conf4.tokensParsed.size, size = _nullishCoalesce((inSize === "$true" && !("$true" in fontSize) ? "$4" : inSize), () => ( ("$true" in fontSize ? "$true" : "$4"))), sizeTokens = Object.keys(fontSize);
  let foundIndex = sizeTokens.indexOf(size);
  foundIndex === -1 && size.endsWith(".5") && (foundIndex = sizeTokens.indexOf(size.replace(".5", ""))), process.env.NODE_ENV === "development" && foundIndex === -1 && console.warn("No font size found", size, opts, "in size tokens", sizeTokens);
  const tokenIndex = Math.min(
    Math.max(0, foundIndex + relativeSize),
    sizeTokens.length - 1
  );
  return _nullishCoalesce(sizeTokens[tokenIndex], () => ( size));
};

// node_modules/@tamagui/web/dist/esm/contexts/ComponentContext.js
var _react = require('react'); var React4 = _interopRequireWildcard(_react); var React6 = _interopRequireWildcard(_react); var React11 = _interopRequireWildcard(_react);

// node_modules/@tamagui/web/dist/esm/helpers/createStyledContext.js


// node_modules/@tamagui/web/dist/esm/helpers/pseudoDescriptors.js
var pseudoDescriptorsBase = {
  // order of keys here important! in priority order
  hoverStyle: {
    name: "hover",
    priority: 2
  },
  pressStyle: {
    name: "active",
    stateKey: "press",
    priority: 3
  },
  focusVisibleStyle: {
    name: "focus-visible",
    priority: 4,
    stateKey: "focusVisible"
  },
  focusStyle: {
    name: "focus",
    priority: 4
  },
  focusWithinStyle: {
    name: "focus-within",
    priority: 4,
    stateKey: "focusWithin"
  },
  disabledStyle: {
    name: "disabled",
    priority: 5,
    stateKey: "disabled"
  }
};
var pseudoPriorities = {
  hover: pseudoDescriptorsBase.hoverStyle.priority,
  press: pseudoDescriptorsBase.pressStyle.priority,
  focus: pseudoDescriptorsBase.focusStyle.priority,
  focusVisible: pseudoDescriptorsBase.focusVisibleStyle.priority,
  focusWithin: pseudoDescriptorsBase.focusWithinStyle.priority,
  disabled: pseudoDescriptorsBase.disabledStyle.priority
};
var pseudoDescriptors = {
  ...pseudoDescriptorsBase,
  enterStyle: {
    name: "enter",
    selector: ".t_unmounted",
    priority: 4
  },
  exitStyle: {
    name: "exit",
    priority: 5
  }
};
var defaultMediaImportance = Object.keys(pseudoDescriptors).length;

// node_modules/@tamagui/web/dist/esm/helpers/mergeProps.js
var mergeProps = (defaultProps, props) => {
  const out = {};
  for (const key in defaultProps)
    key in props || (out[key] = defaultProps[key]);
  for (const key in props)
    mergeProp(out, defaultProps, props, key);
  return out;
};
var mergeComponentProps = (defaultProps, contextProps, props) => {
  let overriddenContext = null;
  if (!defaultProps && !contextProps)
    return [props, overriddenContext];
  if (defaultProps && !contextProps)
    return [mergeProps(defaultProps, props), overriddenContext];
  const out = {};
  for (const key in defaultProps)
    key in props || (out[key] = defaultProps[key]);
  for (const key in contextProps) {
    if (key in props)
      continue;
    const contextValue = contextProps[key];
    contextValue !== void 0 && (out[key] = contextValue);
  }
  for (const key in props)
    mergeProp(out, defaultProps, props, key), contextProps && key in contextProps && (overriddenContext || (overriddenContext = {}), overriddenContext[key] = props[key]);
  return [out, overriddenContext];
};
function mergeProp(out, defaultProps, props, key) {
  let val = props[key];
  if (defaultProps && key in defaultProps && (key in pseudoDescriptors || key[0] === "$") && val && typeof val == "object") {
    const defaultVal = defaultProps[key];
    defaultVal && typeof defaultVal == "object" && (val = mergeProps(defaultVal, val));
  }
  out[key] = val;
}

// node_modules/@tamagui/web/dist/esm/helpers/objectIdentityKey.js
function objectIdentityKey(obj) {
  let k = "";
  for (const key in obj) {
    k += key;
    const arg = obj[key];
    let type = typeof arg;
    if (!arg || type !== "object" && type !== "function")
      k += type + arg;
    else if (cache.has(arg))
      k += cache.get(arg);
    else {
      let v = Math.random();
      cache.set(arg, v), k += v;
    }
  }
  return k;
}
var cache = /* @__PURE__ */ new WeakMap();

// node_modules/@tamagui/web/dist/esm/helpers/createStyledContext.js
var _jsxruntime = require('react/jsx-runtime');
var createReactContext = React4.default[Math.random(), "createContext"];
function createStyledContext(defaultValues, namespace = "") {
  const OGContext = createReactContext(defaultValues), OGProvider = OGContext.Provider, Context = OGContext, scopedContexts = /* @__PURE__ */ new Map(), LastScopeInNamespace = createReactContext(namespace);
  function getOrCreateScopedContext(scope) {
    let ScopedContext = scopedContexts.get(scope);
    return ScopedContext || (ScopedContext = createReactContext(defaultValues), scopedContexts.set(scope, ScopedContext)), ScopedContext;
  }
  const getNamespacedScope = (scope) => namespace ? `${namespace}--${scope}` : scope, Provider = ({
    children,
    scope: scopeIn,
    // performance: avoid creating objects
    __disableMergeDefaultValues,
    ...values
  }) => {
    const scope = getNamespacedScope(scopeIn), next = React4.default.useMemo(() => __disableMergeDefaultValues ? values : mergeProps(defaultValues, values), [objectIdentityKey(values)]);
    let ScopedProvider = OGProvider;
    return scope && (ScopedProvider = getOrCreateScopedContext(scope).Provider), /* @__PURE__ */ _jsxruntime.jsx.call(void 0, LastScopeInNamespace.Provider, { value: scope, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ScopedProvider, { value: next, children }) });
  }, useStyledContext = (scopeIn = "") => {
    const lastScopeInNamespace = _react.useContext.call(void 0, LastScopeInNamespace), scope = namespace ? scopeIn ? getNamespacedScope(scopeIn) : lastScopeInNamespace : scopeIn, context = scope ? getOrCreateScopedContext(scope) : OGContext;
    return React4.default.useContext(context);
  };
  return Context.Provider = Provider, Context.props = defaultValues, Context.context = OGContext, Context.useStyledContext = useStyledContext, Context;
}

// node_modules/@tamagui/web/dist/esm/contexts/ComponentContext.js
var ComponentContext = createStyledContext({
  disableSSR: void 0,
  inText: false,
  language: null,
  animationDriver: null,
  setParentFocusState: null
});

// node_modules/@tamagui/web/dist/esm/contexts/GroupContext.js

var GroupContext = _react.createContext.call(void 0, null);

// node_modules/@tamagui/is-equal-shallow/dist/esm/index.js

function useCreateShallowSetState(setter, debug) {
  return _react.useCallback.call(void 0, 
    (stateOrGetState) => {
      setter((prev) => {
        const next = typeof stateOrGetState == "function" ? stateOrGetState(prev) : stateOrGetState, update = mergeIfNotShallowEqual(prev, next);
        if (process.env.NODE_ENV === "development" && debug && update !== prev && (console.groupCollapsed("setStateShallow CHANGE", "=>", update), console.info("previously", prev), console.trace(), console.groupEnd(), debug === "break"))
          debugger;
        return update;
      });
    },
    [setter, debug]
  );
}
function mergeIfNotShallowEqual(prev, next) {
  return !prev || !next || isEqualShallow(prev, next) ? prev || next : { ...prev, ...next };
}
function isEqualShallow(prev, next) {
  for (const key in next)
    if (prev[key] !== next[key])
      return false;
  return true;
}

// node_modules/@tamagui/web/dist/esm/hooks/useTheme.js


// node_modules/@tamagui/constants/dist/esm/constants.js

var IS_REACT_19 = typeof React4.default.use < "u";
var isWeb = true;
var isWindowDefined = typeof window < "u";
var isServer = isWeb && !isWindowDefined;
var isClient = isWeb && isWindowDefined;
var useIsomorphicLayoutEffect = isServer ? _react.useEffect : _react.useLayoutEffect;
var isChrome = typeof navigator < "u" && /Chrome/.test(navigator.userAgent || "");
var isWebTouchable = isClient && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
var isAndroid = false;
var isIos = process.env.TEST_NATIVE_PLATFORM === "ios";
var currentPlatform = "web";

// node_modules/@tamagui/web/dist/esm/constants/constants.js
var stackDefaultStyles = {};
var webViewFlexCompatStyles = {
  display: "flex",
  alignItems: "stretch",
  flexDirection: "column",
  flexBasis: "auto",
  boxSizing: "border-box",
  position: process.env.TAMAGUI_POSITION_STATIC === "1" ? "static" : "relative",
  minHeight: 0,
  minWidth: 0,
  flexShrink: 0
};
Object.assign(stackDefaultStyles, webViewFlexCompatStyles);
var MISSING_THEME_MESSAGE = process.env.NODE_ENV === "development" ? `Can't find Tamagui configuration.
    
99% of the time this is due to having mis-matched versions of Tamagui dependencies.
Ensure that every "tamagui" and "@tamagui/*" dependency is pinned to exactly the same version.

We have a CLI tool to help check this: 

  npx @tamagui/cli check
` : "Missing theme.";

// node_modules/@tamagui/web/dist/esm/loadDuplicatedConfig.js
var hasLogged = false;
function loadDuplicatedConfig() {
  return process.env.NODE_ENV !== "production" && globalThis.__tamaguiConfig ? (hasLogged = true, hasLogged || console.warn(
    `Warning: You have duplicate Tamagui dependencies which can cause major, confusing issues.
    In dev/test, we're working around this by loading a previously loaded config.
    In production, this will error.`
  ), globalThis.__tamaguiConfig) : null;
}

// node_modules/@tamagui/web/dist/esm/config.js
var conf;
var haventCalledErrorMessage = process.env.NODE_ENV === "development" ? `
Haven't called createTamagui yet. ${MISSING_THEME_MESSAGE}
` : "\u274C Error 001";
var getSetting = (key) => {
  if (process.env.NODE_ENV === "development" && !conf)
    throw new Error(haventCalledErrorMessage);
  return _nullishCoalesce(conf.settings[key], () => ( // @ts-expect-error
  conf[key]));
};
var getConfig2 = () => {
  const dup = loadDuplicatedConfig();
  if (dup)
    return dup;
  if (!conf)
    throw new Error(
      process.env.NODE_ENV !== "production" ? "Missing tamagui config, you either have a duplicate config, or haven't set it up. Be sure createTamagui is called before rendering. Also, make sure all of your tamagui dependencies are on the same version (`tamagui`, `@tamagui/package-name`, etc.) not just in your package.json, but in your lockfile." : "Err0"
    );
  return conf;
};
var getConfigMaybe = () => conf;
var tokensMerged;
var getTokens = ({
  prefixed
} = {}) => {
  if (process.env.NODE_ENV === "development" && !conf)
    throw new Error(haventCalledErrorMessage);
  const { tokens, tokensParsed } = conf;
  return prefixed === false ? tokens : prefixed === true ? tokensParsed : tokensMerged;
};
var configListeners = /* @__PURE__ */ new Set();
var onConfiguredOnce = (cb) => {
  conf ? cb(conf) : configListeners.add(cb);
};
var devConfig;

// node_modules/@tamagui/simple-hash/dist/esm/index.js
var cache2 = /* @__PURE__ */ new Map();
var cacheSize = 0;
var simpleHash = (strIn, hashMin = 10) => {
  if (cache2.has(strIn))
    return cache2.get(strIn);
  let str = strIn;
  str[0] === "v" && str.startsWith("var(") && (str = str.slice(6, str.length - 1));
  let hash = 0, valids = "", added = 0;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    if (hashMin !== "strict" && added <= hashMin) {
      const char = str.charCodeAt(i);
      if (char === 46) {
        valids += "--";
        continue;
      }
      if (isValidCSSCharCode(char)) {
        added++, valids += str[i];
        continue;
      }
    }
    hash = hashChar(hash, str[i]);
  }
  const res = valids + (hash ? Math.abs(hash) : "");
  return cacheSize > 1e4 && (cache2.clear(), cacheSize = 0), cache2.set(strIn, res), cacheSize++, res;
};
var hashChar = (hash, c) => Math.imul(31, hash) + c.charCodeAt(0) | 0;
function isValidCSSCharCode(code) {
  return (
    // A-Z
    code >= 65 && code <= 90 || // a-z
    code >= 97 && code <= 122 || // _
    code === 95 || // -
    code === 45 || // 0-9
    code >= 48 && code <= 57
  );
}

// node_modules/@tamagui/helpers/dist/esm/composeEventHandlers.js
function composeEventHandlers(og, next, { checkDefaultPrevented = true } = {}) {
  return !og || !next ? next || og || void 0 : (event) => {
    if (_optionalChain([og, 'optionalCall', _13 => _13(event)]), !event || !(checkDefaultPrevented && typeof event == "object" && "defaultPrevented" in event) || // @ts-ignore
    "defaultPrevented" in event && !event.defaultPrevented)
      return _optionalChain([next, 'optionalCall', _14 => _14(event)]);
  };
}

// node_modules/@tamagui/helpers/dist/esm/types.js
var StyleObjectProperty = 0;
var StyleObjectIdentifier = 2;
var StyleObjectPseudo = 3;
var StyleObjectRules = 4;

// node_modules/@tamagui/helpers/dist/esm/validStyleProps.js
var textColors = {
  color: true,
  textDecorationColor: true,
  textShadowColor: true
};
var tokenCategories = {
  radius: {
    borderRadius: true,
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomLeftRadius: true,
    borderBottomRightRadius: true,
    // logical
    borderStartStartRadius: true,
    borderStartEndRadius: true,
    borderEndStartRadius: true,
    borderEndEndRadius: true
  },
  size: {
    width: true,
    height: true,
    minWidth: true,
    minHeight: true,
    maxWidth: true,
    maxHeight: true,
    blockSize: true,
    minBlockSize: true,
    maxBlockSize: true,
    inlineSize: true,
    minInlineSize: true,
    maxInlineSize: true
  },
  zIndex: {
    zIndex: true
  },
  color: {
    backgroundColor: true,
    borderColor: true,
    borderBlockStartColor: true,
    borderBlockEndColor: true,
    borderBlockColor: true,
    borderBottomColor: true,
    borderInlineColor: true,
    borderInlineStartColor: true,
    borderInlineEndColor: true,
    borderTopColor: true,
    borderLeftColor: true,
    borderRightColor: true,
    borderEndColor: true,
    borderStartColor: true,
    shadowColor: true,
    ...textColors,
    outlineColor: true,
    caretColor: true
  }
};
var stylePropsUnitless = {
  WebkitLineClamp: true,
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexOrder: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  fontWeight: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowGap: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnGap: true,
  gridColumnStart: true,
  gridTemplateColumns: true,
  gridTemplateAreas: true,
  lineClamp: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  scale: true,
  scaleX: true,
  scaleY: true,
  scaleZ: true,
  shadowOpacity: true
};
var stylePropsTransform = {
  x: true,
  y: true,
  scale: true,
  perspective: true,
  scaleX: true,
  scaleY: true,
  skewX: true,
  skewY: true,
  matrix: true,
  rotate: true,
  rotateY: true,
  rotateX: true,
  rotateZ: true
};
var stylePropsView = {
  backfaceVisibility: true,
  borderBottomEndRadius: true,
  borderBottomStartRadius: true,
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderBlockWidth: true,
  borderBlockEndWidth: true,
  borderBlockStartWidth: true,
  borderInlineWidth: true,
  borderInlineEndWidth: true,
  borderInlineStartWidth: true,
  borderStyle: true,
  borderBlockStyle: true,
  borderBlockEndStyle: true,
  borderBlockStartStyle: true,
  borderInlineStyle: true,
  borderInlineEndStyle: true,
  borderInlineStartStyle: true,
  borderTopEndRadius: true,
  borderTopStartRadius: true,
  borderTopWidth: true,
  borderWidth: true,
  transform: true,
  transformOrigin: true,
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  borderEndWidth: true,
  borderStartWidth: true,
  bottom: true,
  display: true,
  end: true,
  flexBasis: true,
  flexDirection: true,
  flexWrap: true,
  gap: true,
  columnGap: true,
  rowGap: true,
  justifyContent: true,
  left: true,
  margin: true,
  marginBlock: true,
  marginBlockEnd: true,
  marginBlockStart: true,
  marginInline: true,
  marginInlineStart: true,
  marginInlineEnd: true,
  marginBottom: true,
  marginEnd: true,
  marginHorizontal: true,
  marginLeft: true,
  marginRight: true,
  marginStart: true,
  marginTop: true,
  marginVertical: true,
  overflow: true,
  padding: true,
  paddingBottom: true,
  paddingInline: true,
  paddingBlock: true,
  paddingBlockStart: true,
  paddingInlineEnd: true,
  paddingInlineStart: true,
  paddingEnd: true,
  paddingHorizontal: true,
  paddingLeft: true,
  paddingRight: true,
  paddingStart: true,
  paddingTop: true,
  paddingVertical: true,
  position: true,
  right: true,
  start: true,
  top: true,
  inset: true,
  insetBlock: true,
  insetBlockEnd: true,
  insetBlockStart: true,
  insetInline: true,
  insetInlineEnd: true,
  insetInlineStart: true,
  direction: true,
  shadowOffset: true,
  shadowRadius: true,
  ...tokenCategories.color,
  ...tokenCategories.radius,
  ...tokenCategories.size,
  ...tokenCategories.radius,
  ...stylePropsTransform,
  ...stylePropsUnitless,
  boxShadow: true,
  filter: true,
  // RN doesn't support specific border styles per-edge
  transition: true,
  textWrap: true,
  backdropFilter: true,
  WebkitBackdropFilter: true,
  background: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  backgroundClip: true,
  backgroundColor: true,
  backgroundImage: true,
  backgroundOrigin: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundSize: true,
  borderBottomStyle: true,
  borderImage: true,
  borderLeftStyle: true,
  borderRightStyle: true,
  borderTopStyle: true,
  boxSizing: true,
  caretColor: true,
  clipPath: true,
  contain: true,
  containerType: true,
  content: true,
  cursor: true,
  float: true,
  mask: true,
  maskBorder: true,
  maskBorderMode: true,
  maskBorderOutset: true,
  maskBorderRepeat: true,
  maskBorderSlice: true,
  maskBorderSource: true,
  maskBorderWidth: true,
  maskClip: true,
  maskComposite: true,
  maskImage: true,
  maskMode: true,
  maskOrigin: true,
  maskPosition: true,
  maskRepeat: true,
  maskSize: true,
  maskType: true,
  mixBlendMode: true,
  objectFit: true,
  objectPosition: true,
  outlineOffset: true,
  outlineStyle: true,
  outlineWidth: true,
  overflowBlock: true,
  overflowInline: true,
  overflowX: true,
  overflowY: true,
  pointerEvents: true,
  scrollbarWidth: true,
  textEmphasis: true,
  touchAction: true,
  transformStyle: true,
  userSelect: true,
  willChange: true,
  ...isAndroid ? { elevationAndroid: true } : {}
};
var stylePropsFont = {
  fontFamily: true,
  fontSize: true,
  fontStyle: true,
  fontWeight: true,
  fontVariant: true,
  letterSpacing: true,
  lineHeight: true,
  textTransform: true
};
var stylePropsTextOnly = {
  ...stylePropsFont,
  textAlign: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  ...textColors,
  textShadowOffset: true,
  textShadowRadius: true,
  userSelect: true,
  selectable: true,
  verticalAlign: true,
  whiteSpace: true,
  wordWrap: true,
  textOverflow: true,
  textDecorationDistance: true,
  cursor: true,
  WebkitLineClamp: true,
  WebkitBoxOrient: true
};
var stylePropsText = {
  ...stylePropsView,
  ...stylePropsTextOnly
};
var stylePropsAll = stylePropsText;
var validPseudoKeys = {
  enterStyle: true,
  exitStyle: true,
  hoverStyle: true,
  pressStyle: true,
  focusStyle: true,
  disabledStyle: true,
  focusWithinStyle: true,
  focusVisibleStyle: true
};
var validStyles = stylePropsView;

// node_modules/@tamagui/helpers/dist/esm/withStaticProperties.js

var Decorated = Symbol();
var withStaticProperties = (component, staticProps) => {
  const next = (() => {
    if (component[Decorated]) {
      const _ = React4.default.forwardRef(
        (props, ref) => React4.default.createElement(component, { ...props, ref })
      );
      for (const key in component) {
        const v = component[key];
        _[key] = v && typeof v == "object" ? { ...v } : v;
      }
    }
    return component;
  })();
  return Object.assign(next, staticProps), next[Decorated] = true, next;
};

// node_modules/@tamagui/web/dist/esm/createVariable.js
function variableToString(vrble, getValue = false) {
  return isVariable2(vrble) ? !getValue && isWeb && vrble.variable ? vrble.variable : `${vrble.val}` : `${vrble || ""}`;
}
function isVariable2(v) {
  return v && typeof v == "object" && "isVar" in v;
}
function getVariable(nameOrVariable, group = "size") {
  if (_optionalChain([nameOrVariable, 'optionalAccess', _15 => _15.dynamic]))
    return nameOrVariable;
  if (setDidGetVariableValue(true), isVariable2(nameOrVariable))
    return variableToString(nameOrVariable);
  const tokens = getConfig2().tokensParsed;
  return variableToString(_nullishCoalesce(_optionalChain([tokens, 'access', _16 => _16[group], 'optionalAccess', _17 => _17[nameOrVariable]]), () => ( nameOrVariable)));
}
var accessed = false;
var setDidGetVariableValue = (val) => accessed = val;
var didGetVariableValue = () => accessed;
function getVariableValue(v, group) {
  if (isVariable2(v))
    return setDidGetVariableValue(true), v.val;
  if (group) {
    const token = _optionalChain([getConfig2, 'call', _18 => _18(), 'access', _19 => _19.tokensParsed, 'access', _20 => _20[group], 'optionalAccess', _21 => _21[v]]);
    if (token)
      return setDidGetVariableValue(true), token.val;
  }
  return v;
}

// node_modules/@tamagui/web/dist/esm/helpers/getDynamicVal.js
function getOppositeScheme(scheme) {
  return scheme === "dark" ? "light" : "dark";
}
function getDynamicVal({
  scheme,
  val,
  oppositeVal
}) {
  const oppositeScheme = getOppositeScheme(scheme);
  return {
    dynamic: {
      [scheme]: val,
      [oppositeScheme]: oppositeVal
    }
  };
}
function extractValueFromDynamic(val, scheme) {
  return _optionalChain([val, 'optionalAccess', _22 => _22.dynamic]) ? val.dynamic[scheme] : val;
}

// node_modules/@tamagui/web/dist/esm/hooks/getThemeProxied.js
var cache3 = /* @__PURE__ */ new Map();
var curKeys;
var curProps;
var curState;
var emptyObject = {};
function getThemeProxied(_props, _state, _keys) {
  if (!_optionalChain([_state, 'optionalAccess', _23 => _23.theme]))
    return emptyObject;
  if (curKeys = _keys, curProps = _props, curState = _state, cache3.has(curState.theme))
    return cache3.get(curState.theme);
  const config = getConfig2();
  function track(key) {
    curKeys && (curKeys.current || (curKeys.current = /* @__PURE__ */ new Set()), curKeys.current.add(key), process.env.NODE_ENV === "development" && curProps.debug && console.info(` \u{1F3A8} useTheme() tracking new key: ${key}`, curKeys));
  }
  const proxied = Object.fromEntries(
    Object.entries(_state.theme).flatMap(([key, value]) => {
      const proxied2 = {
        ...value,
        get val() {
          return globalThis.tamaguiAvoidTracking || track(key), value.val;
        },
        get(platform) {
          if (!curState)
            return;
          const outVal = getVariable(value), { name, scheme, inverses } = curState;
          return outVal;
        }
      };
      return [
        [key, proxied2],
        [`$${key}`, proxied2]
      ];
    })
  );
  return cache3.set(_state.theme, proxied), proxied;
}

// node_modules/@tamagui/web/dist/esm/hooks/useThemeState.js







var ThemeStateContext = _react.createContext.call(void 0, "");
var allListeners = /* @__PURE__ */ new Map();
var listenersByParent = {};
var HasRenderedOnce = /* @__PURE__ */ new WeakMap();
var HadTheme = /* @__PURE__ */ new WeakMap();
var PendingUpdate = /* @__PURE__ */ new Map();
var states = /* @__PURE__ */ new Map();
var localStates = /* @__PURE__ */ new Map();
var shouldForce = false;
var getThemeState = (id) => states.get(id);
var themes = null;
var rootThemeState = null;
var useThemeState = (props, isRoot = false, keys) => {
  const { disable } = props, parentId = _react.useContext.call(void 0, ThemeStateContext);
  if (!parentId && !isRoot)
    throw new Error(MISSING_THEME_MESSAGE);
  if (disable)
    return states.get(parentId) || {
      id: "",
      name: "light",
      theme: getConfig2().themes.light,
      inverses: 0
    };
  const id = _react.useId.call(void 0, ), subscribe3 = _react.useCallback.call(void 0, 
    (cb) => (listenersByParent[parentId] || (listenersByParent[parentId] = /* @__PURE__ */ new Set()), listenersByParent[parentId].add(id), allListeners.set(id, () => {
      PendingUpdate.set(id, shouldForce ? "force" : true), cb();
    }), () => {
      allListeners.delete(id), listenersByParent[parentId].delete(id), localStates.delete(id), states.delete(id), PendingUpdate.delete(id);
    }),
    [id, parentId]
  ), propsKey = getPropsKey(props), getSnapshot = () => {
    let local = localStates.get(id);
    const needsUpdate = props.passThrough ? false : isRoot || props.name === "light" || props.name === "dark" || props.name === null ? true : HasRenderedOnce.get(keys) ? _optionalChain([keys, 'optionalAccess', _24 => _24.current, 'optionalAccess', _25 => _25.size]) ? true : _optionalChain([props, 'access', _26 => _26.needsUpdate, 'optionalCall', _27 => _27()]) : true, [rerender, next] = getNextState(
      local,
      props,
      propsKey,
      isRoot,
      id,
      parentId,
      needsUpdate,
      PendingUpdate.get(id)
    );
    return PendingUpdate.delete(id), (!local || rerender) && (local = { ...next }, localStates.set(id, local)), process.env.NODE_ENV === "development" && props.debug === "verbose" && (console.groupCollapsed(` ${id} getSnapshot ${rerender}`, local.name, ">", next.name), console.info({ props, propsKey, isRoot, parentId, local, next, needsUpdate }), console.groupEnd()), Object.assign(local, next), local.id = id, states.set(id, next), local;
  };
  process.env.NODE_ENV === "development" && globalThis.time && globalThis.time`theme-prep-uses`;
  const state = _react.useSyncExternalStore.call(void 0, subscribe3, getSnapshot, getSnapshot);
  return useIsomorphicLayoutEffect(() => {
    if (!HasRenderedOnce.get(keys)) {
      HasRenderedOnce.set(keys, true);
      return;
    }
    if (!propsKey) {
      HadTheme.get(keys) && scheduleUpdate(id), HadTheme.set(keys, false);
      return;
    }
    process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(` \xB7 useTheme(${id}) scheduleUpdate`, propsKey, _optionalChain([states, 'access', _28 => _28.get, 'call', _29 => _29(id), 'optionalAccess', _30 => _30.name])), scheduleUpdate(id), HadTheme.set(keys, true);
  }, [keys, propsKey]), state;
};
var getNextState = (lastState, props, propsKey, isRoot = false, id, parentId, needsUpdate, pendingUpdate) => {
  const { debug } = props, parentState = states.get(parentId);
  if (props.passThrough)
    return [false, lastState || parentState || { name: "" }];
  themes || (themes = getConfig2().themes);
  const name = !propsKey && (!lastState || !_optionalChain([lastState, 'optionalAccess', _31 => _31.isNew])) ? null : getNewThemeName(
    _optionalChain([parentState, 'optionalAccess', _32 => _32.name]),
    props,
    pendingUpdate === "force" ? true : !!needsUpdate
  ), isSameAsParent = parentState && (!name || name === parentState.name), shouldRerender = !!(needsUpdate && (pendingUpdate || _optionalChain([lastState, 'optionalAccess', _33 => _33.name]) !== _optionalChain([parentState, 'optionalAccess', _34 => _34.name])));
  if (process.env.NODE_ENV === "development" && debug === "verbose") {
    const message = ` \xB7 useTheme(${id}) getNextState => ${name} needsUpdate ${needsUpdate} shouldRerender ${shouldRerender}`;
    console.groupCollapsed(message), console.trace({ name, lastState, parentState, props, propsKey, id, isSameAsParent }), console.groupEnd();
  }
  if (isSameAsParent)
    return [shouldRerender, { ...parentState, isNew: false }];
  if (!name) {
    const next = _nullishCoalesce(lastState, () => ( parentState));
    if (!next)
      throw new Error(MISSING_THEME_MESSAGE);
    return shouldRerender ? [true, { ...parentState || lastState }] : [false, next];
  }
  const scheme = getScheme(name), parentInverses = _nullishCoalesce(_optionalChain([parentState, 'optionalAccess', _35 => _35.inverses]), () => ( 0)), isInverse = parentState && scheme !== parentState.scheme, inverses = parentInverses + (isInverse ? 1 : 0), nextState = {
    id,
    name,
    theme: themes[name],
    scheme,
    parentId,
    parentName: _optionalChain([parentState, 'optionalAccess', _36 => _36.name]),
    inverses,
    isInverse,
    isNew: true
  };
  if (isRoot && (rootThemeState = nextState), pendingUpdate !== "force" && lastState && lastState.name === name)
    return [false, nextState];
  const shouldAvoidRerender = pendingUpdate !== "force" && lastState && !needsUpdate && nextState.name === lastState.name;
  return process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(
    ` \xB7 useTheme(${id}) \u23ED\uFE0F ${name} shouldAvoidRerender: ${shouldAvoidRerender}`
  ), console.info({ lastState, needsUpdate, nextState, pendingUpdate }), console.groupEnd()), shouldAvoidRerender ? [false, nextState] : [true, nextState];
};
function scheduleUpdate(id) {
  const queue = [id], visited = /* @__PURE__ */ new Set();
  for (; queue.length; ) {
    const parent = queue.shift(), children = listenersByParent[parent];
    if (children)
      for (const childId of children)
        visited.has(childId) || (visited.add(childId), queue.push(childId));
  }
  visited.forEach((childId) => {
    _optionalChain([allListeners, 'access', _37 => _37.get, 'call', _38 => _38(childId), 'optionalCall', _39 => _39()]);
  });
}
var validSchemes = {
  light: "light",
  dark: "dark"
};
function getScheme(name) {
  return validSchemes[name.split("_")[0]];
}
function getNewThemeName(parentName = "", { name, reset, componentName, inverse, debug }, forceUpdate = false) {
  if (name && reset)
    throw new Error(
      process.env.NODE_ENV === "production" ? "\u274C004" : "Cannot reset and set a new name at the same time."
    );
  const { themes: themes2 } = getConfig2();
  if (reset) {
    if (parentName === "light" || parentName === "dark")
      return parentName === "light" ? "dark" : "light";
    const lastPartIndex = parentName.lastIndexOf("_"), name2 = lastPartIndex <= 0 ? parentName : parentName.slice(lastPartIndex), scheme = parentName.slice(0, lastPartIndex);
    return themes2[name2] ? name2 : scheme;
  }
  const parentParts = parentName.split("_"), lastName = parentParts[parentParts.length - 1];
  lastName && lastName[0].toLowerCase() !== lastName[0] && parentParts.pop();
  const subNames = [
    name && componentName ? `${name}_${componentName}` : void 0,
    name,
    componentName
  ].filter(Boolean);
  let found = null;
  if (name) {
    const nameHasScheme = getScheme(name);
    if (nameHasScheme) {
      for (const subName of subNames)
        if (subName in themes2) {
          found = subName;
          break;
        }
    }
    if (!found && !nameHasScheme) {
      const parentScheme = getScheme(parentName);
      if (parentScheme) {
        const parentBase = parentParts.join("_"), withScheme = [
          componentName ? `${parentBase}_${name}_${componentName}` : void 0,
          `${parentBase}_${name}`,
          componentName ? `${parentScheme}_${name}_${componentName}` : void 0,
          `${parentScheme}_${name}`
        ].filter(Boolean);
        for (const potential of withScheme)
          if (potential in themes2) {
            found = potential;
            break;
          }
      }
    }
  }
  if (!found)
    if (!name && componentName) {
      const potential = `${parentParts.join("_")}_${componentName}`;
      potential in themes2 && (found = potential);
    } else {
      const max = parentParts.length;
      for (let i = 0; i <= max; i++) {
        const base = (i === 0 ? parentParts : parentParts.slice(0, -i)).join("_");
        for (const subName of subNames) {
          const potential = base ? `${base}_${subName}` : subName;
          if (potential in themes2) {
            found = potential;
            break;
          }
        }
        if (found)
          break;
      }
    }
  if (inverse) {
    found || (found = parentName);
    const scheme = found.split("_")[0];
    found = found.replace(new RegExp(`^${scheme}`), scheme === "light" ? "dark" : "light");
  }
  return !forceUpdate && found === parentName && // if its a scheme only sub-theme, we always consider it "new" because it likely inverses
  // and we want to avoid reparenting
  !validSchemes[found] ? null : found;
}
var getPropsKey = ({
  name,
  reset,
  inverse,
  forceClassName,
  componentName
}) => `${name || ""}${inverse || ""}${reset || ""}${forceClassName || ""}${componentName || ""}`;
var hasThemeUpdatingProps = (props) => "inverse" in props || "name" in props || "reset" in props || "forceClassName" in props;

// node_modules/@tamagui/web/dist/esm/hooks/useTheme.js
var useTheme = (props = {}) => {
  const [theme] = useThemeWithState(props);
  return theme;
};
var useThemeWithState = (props, isRoot = false) => {
  const keys = _react.useRef.call(void 0, null), themeState = useThemeState(props, isRoot, keys);
  return process.env.NODE_ENV === "development" && !props.passThrough && !_optionalChain([themeState, 'optionalAccess', _40 => _40.theme]) && process.env.TAMAGUI_DISABLE_NO_THEME_WARNING !== "1" && console.error(
    `[tamagui] No theme found, this could be due to an invalid theme name (given theme props ${JSON.stringify(
      props
    )}).

If this is intended and you are using Tamagui without any themes, you can disable this warning by setting the environment variable TAMAGUI_DISABLE_NO_THEME_WARNING=1`
  ), [props.passThrough ? {} : getThemeProxied(props, themeState, keys), themeState];
};

// node_modules/@tamagui/compose-refs/dist/esm/compose-refs.js

function setRef(ref, value) {
  typeof ref == "function" ? ref(value) : ref && (ref.current = value);
}
function composeRefs(...refs) {
  return (node2) => refs.forEach((ref) => setRef(ref, node2));
}

// node_modules/@tamagui/web/dist/esm/createComponent.js


// node_modules/@tamagui/web/dist/esm/constants/isDevTools.js
var isDevTools = (() => {
  if (process.env.NODE_ENV === "development")
    try {
      return new Function("try {return this===window;}catch(e){ return false;}")();
    } catch (e2) {
    }
  return false;
})();

// node_modules/@tamagui/web/dist/esm/defaultComponentState.js
var defaultComponentState = {
  hover: false,
  press: false,
  pressIn: false,
  focus: false,
  focusVisible: false,
  focusWithin: false,
  unmounted: true,
  disabled: false
};
var defaultComponentStateMounted = {
  ...defaultComponentState,
  unmounted: false
};
var defaultComponentStateShouldEnter = {
  ...defaultComponentState,
  unmounted: "should-enter"
};

// node_modules/@tamagui/web/dist/esm/helpers/getSplitStyles.js


// node_modules/@tamagui/web/dist/esm/constants/accessibilityDirectMap.js
var accessibilityDirectMap = {};
{
  const items = {
    Hidden: true,
    ActiveDescendant: true,
    Atomic: true,
    AutoComplete: true,
    Busy: true,
    Checked: true,
    ColumnCount: "colcount",
    ColumnIndex: "colindex",
    ColumnSpan: "colspan",
    Current: true,
    Details: true,
    ErrorMessage: true,
    Expanded: true,
    HasPopup: true,
    Invalid: true,
    Label: true,
    Level: true,
    Modal: true,
    Multiline: true,
    MultiSelectable: true,
    Orientation: true,
    Owns: true,
    Placeholder: true,
    PosInSet: true,
    Pressed: true,
    RoleDescription: true,
    RowCount: true,
    RowIndex: true,
    RowSpan: true,
    Selected: true,
    SetSize: true,
    Sort: true,
    ValueMax: true,
    ValueMin: true,
    ValueNow: true,
    ValueText: true
  };
  for (const key in items) {
    let val = items[key];
    val === true && (val = key.toLowerCase()), accessibilityDirectMap[`accessibility${key}`] = `aria-${val}`;
  }
}

// node_modules/@tamagui/web/dist/esm/hooks/useMedia.js

var mediaState = (
  // development only safeguard
  process.env.NODE_ENV === "development" ? new Proxy(
    {},
    {
      get(target, key) {
        if (typeof key == "string" && key[0] === "$" && // dont error on $$typeof
        key[1] !== "$")
          throw new Error(`Access mediaState should not use "$": ${key}`);
        return Reflect.get(target, key);
      }
    }
  ) : {}
);
var mediaQueryConfig = {};
var getMedia = () => mediaState;
var mediaKeys = /* @__PURE__ */ new Set();
var mediaKeyRegex = /\$(platform|theme|group)-/;
var isMediaKey = (key) => key[0] !== "$" ? false : !!(mediaKeys.has(key) || mediaKeyRegex.test(key));
var getMediaKey = (key) => {
  if (key[0] !== "$")
    return false;
  if (mediaKeys.has(key))
    return true;
  const match = key.match(mediaKeyRegex);
  return match ? match[1] : false;
};
var initState;
var mediaKeysOrdered;
var getMediaKeyImportance = (key) => {
  if (process.env.NODE_ENV === "development" && key[0] === "$")
    throw new Error("use short key");
  return getConfig2().settings.mediaPropOrder ? defaultMediaImportance : mediaKeysOrdered.indexOf(key) + 100;
};
var listeners = /* @__PURE__ */ new Set();
var States = /* @__PURE__ */ new WeakMap();
function setMediaShouldUpdate(ref, enabled, keys) {
  const cur = States.get(ref);
  (!cur || cur.enabled !== enabled || keys) && States.set(ref, {
    ...cur,
    enabled,
    keys
  });
}
function subscribe(subscriber) {
  return listeners.add(subscriber), () => {
    listeners.delete(subscriber);
  };
}
function useMedia(componentContext, debug) {
  const componentState = componentContext ? States.get(componentContext) : null, internalRef = _react.useRef.call(void 0, null);
  internalRef.current || (internalRef.current = {
    keys: /* @__PURE__ */ new Set(),
    lastState: mediaState
  }), internalRef.current.pendingState && (internalRef.current.lastState = internalRef.current.pendingState, internalRef.current.pendingState = void 0);
  const { keys } = internalRef.current;
  keys.size && keys.clear();
  const state = _react.useSyncExternalStore.call(void 0, 
    subscribe,
    () => {
      const curKeys2 = _optionalChain([componentState, 'optionalAccess', _41 => _41.keys]) || keys, { lastState, pendingState } = internalRef.current;
      if (!curKeys2.size)
        return lastState;
      for (const key of curKeys2)
        if (mediaState[key] !== (pendingState || lastState)[key])
          return process.env.NODE_ENV === "development" && debug && console.warn("useMedia() \u270D\uFE0F", key, lastState[key], "=>", mediaState[key]), _optionalChain([componentContext, 'optionalAccess', _42 => _42.mediaEmit]) ? (componentContext.mediaEmit(mediaState), internalRef.current.pendingState = mediaState, lastState) : (internalRef.current.lastState = mediaState, mediaState);
      return lastState;
    },
    getServerSnapshot
  );
  return new Proxy(state, {
    get(_, key) {
      return !disableMediaTouch && typeof key == "string" && keys.add(key), Reflect.get(state, key);
    }
  });
}
var getServerSnapshot = () => initState;
var disableMediaTouch = false;
function _disableMediaTouch(val) {
  disableMediaTouch = val;
}
function getMediaState(mediaGroups, layout) {
  disableMediaTouch = true;
  let res;
  try {
    res = Object.fromEntries(
      [...mediaGroups].map((mediaKey) => [mediaKey, mediaKeyMatch(mediaKey, layout)])
    );
  } finally {
    disableMediaTouch = false;
  }
  return res;
}
var getMediaImportanceIfMoreImportant = (mediaKey, key, styleState, isSizeMedia) => {
  const importance = isSizeMedia && !getSetting("mediaPropOrder") ? getMediaKeyImportance(mediaKey) : defaultMediaImportance, usedKeys = styleState.usedKeys;
  return !usedKeys[key] || importance > usedKeys[key] ? importance : null;
};
function camelToHyphen(str) {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).toLowerCase();
}
var cache4 = /* @__PURE__ */ new WeakMap();
var cachedMediaKeyToQuery = {};
function mediaObjectToString(query, key) {
  if (typeof query == "string")
    return query;
  if (cache4.has(query))
    return cache4.get(query);
  const res = Object.entries(query).map(([feature, value]) => (feature = camelToHyphen(feature), typeof value == "string" ? `(${feature}: ${value})` : (typeof value == "number" && /[height|width]$/.test(feature) && (value = `${value}px`), `(${feature}: ${value})`))).join(" and ");
  return key && (cachedMediaKeyToQuery[key] = res), cache4.set(query, res), res;
}
function mediaKeyMatch(key, dimensions) {
  const mediaQueries = mediaQueryConfig[key];
  return Object.keys(mediaQueries).every((query) => {
    const expectedVal = +mediaQueries[query], isMax = query.startsWith("max"), isWidth = query.endsWith("Width"), givenVal = dimensions[isWidth ? "width" : "height"];
    return isMax ? givenVal < expectedVal : givenVal > expectedVal;
  });
}

// node_modules/@tamagui/web/dist/esm/helpers/getGroupPropParts.js
function getGroupPropParts(groupProp) {
  const mediaQueries = getMedia(), [_, name, part3, part4] = groupProp.split("-");
  let pseudo;
  const media = part3 in mediaQueries ? part3 : void 0;
  return media ? pseudo = part4 : pseudo = part3, { name, pseudo, media };
}

// node_modules/@tamagui/web/dist/esm/helpers/createMediaStyle.js
var MEDIA_SEP = "_";
var prefixes = null;
var selectors = null;
var groupPseudoToPseudoCSSMap = {
  press: "active",
  focusVisible: "focus-visible",
  focusWithin: "focus-within"
};
var specificities = new Array(5).fill(0).map((_, i) => new Array(i).fill(":root").join(""));
function getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme = false, precedenceImportancePrefix = "") {
  const selectorStart = styleInner.lastIndexOf(":root") + 5, selectorEnd = styleInner.lastIndexOf("{"), selector = styleInner.slice(selectorStart, selectorEnd), precedenceSpace = getSetting("themeClassNameOnRoot") && isTheme ? "" : " ", pseudoSelectorName = groupParts.pseudo ? groupPseudoToPseudoCSSMap[groupParts.pseudo] || groupParts.pseudo : void 0, pseudoSelector = pseudoSelectorName ? `:${pseudoSelectorName}` : "", presedencePrefix = `:root${precedenceImportancePrefix}${precedenceSpace}`, mediaSelector = `.t_${isGroup ? "group_" : ""}${name}${pseudoSelector}`;
  return [
    selector,
    `${presedencePrefix}${mediaSelector} ${selector.replaceAll(":root", "")}`
  ];
}
var createMediaStyle = (styleObject, mediaKeyIn, mediaQueries, type, negate, priority) => {
  const [propertyIn, , identifier, pseudoIn, rules] = styleObject;
  let property = propertyIn;
  const enableMediaPropOrder = getSetting("mediaPropOrder"), isTheme = type === "theme", isPlatform = type === "platform", isGroup = type === "group", isNonWindowMedia = isTheme || isPlatform || isGroup, negKey = negate ? "0" : "", ogPrefix = identifier.slice(0, identifier.indexOf("-") + 1), id = `${ogPrefix}${MEDIA_SEP}${mediaKeyIn.replace("-", "")}${negKey}${MEDIA_SEP}`;
  let styleRule = "", groupPriority = "", groupMediaKey, containerName, nextIdentifier = identifier.replace(ogPrefix, id), styleInner = rules.map((rule) => rule.replace(identifier, nextIdentifier)).join(";"), isHover = false;
  if (isNonWindowMedia) {
    let specificity = (priority || 0) + (isGroup || isPlatform ? 1 : 0);
    if (isTheme || isGroup) {
      const groupParts = getGroupPropParts(isTheme ? "theme-" + mediaKeyIn : mediaKeyIn), { name, media, pseudo } = groupParts;
      groupMediaKey = media, isGroup && (containerName = name), (pseudo === "press" || pseudoIn === "active") && (specificity += 2), pseudo === "hover" && (isHover = true);
      const [selector, nextSelector] = getThemeOrGroupSelector(
        name,
        styleInner,
        isGroup,
        groupParts,
        isTheme,
        specificities[specificity]
      );
      styleRule = styleInner.replace(selector, nextSelector);
    } else
      styleRule = `${specificities[specificity]}${styleInner}`;
  }
  if (!isNonWindowMedia || groupMediaKey) {
    if (!selectors) {
      const mediaKeys2 = Object.keys(mediaQueries);
      selectors = Object.fromEntries(
        mediaKeys2.map((key) => [key, mediaObjectToString(mediaQueries[key])])
      ), enableMediaPropOrder || (prefixes = Object.fromEntries(
        mediaKeys2.map((k, index) => [k, new Array(index + 1).fill(":root").join("")])
      ));
    }
    const mediaKey = groupMediaKey || mediaKeyIn, mediaSelector = selectors[mediaKey], mediaQuery = `${negate ? "not all and " : ""}${mediaSelector}`, precedenceImportancePrefix = groupMediaKey ? groupPriority : enableMediaPropOrder && priority ? (
      // this new array should be cached
      specificities[priority]
    ) : (
      // @ts-ignore
      prefixes[mediaKey]
    ), prefix = groupMediaKey ? `@container ${containerName}` : "@media";
    groupMediaKey && (styleInner = styleRule), styleInner.includes(prefix) ? styleRule = styleInner.replace("{", ` and ${mediaQuery} {`).replace("and screen and", "and") : styleRule = `${prefix} ${mediaQuery}{${precedenceImportancePrefix}${styleInner}}`, groupMediaKey && (styleRule = `@supports (contain: ${getSetting("webContainerType") || "inline-size"}) {${styleRule}}`);
  }
  return isHover && (styleRule = `@media (hover:hover){${styleRule}}`), [property, void 0, nextIdentifier, void 0, [styleRule]];
};

// node_modules/@tamagui/web/dist/esm/helpers/defaultOffset.js
var defaultOffset = { height: 0, width: 0 };

// node_modules/@tamagui/normalize-css-color/dist/esm/index.js
var normalizeColor = _chunkTEEPPNNEjs.__toESM.call(void 0, require_normalize_color(), 1);
var norm = normalizeColor.default || normalizeColor;
var normalizeCSSColor = norm;
function rgba(colorInt) {
  const r = Math.round((colorInt & 4278190080) >>> 24), g = Math.round((colorInt & 16711680) >>> 16), b = Math.round((colorInt & 65280) >>> 8), a = ((colorInt & 255) >>> 0) / 255;
  return {
    r,
    g,
    b,
    a
  };
}

// node_modules/@tamagui/web/dist/esm/helpers/normalizeColor.js
var normalizeColor2 = (color, opacity) => {
  if (color) {
    if (color[0] === "$")
      return color;
    if (color.startsWith("var(")) {
      if (typeof opacity == "number" && opacity < 1)
        return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
    } else {
      const rgba3 = getRgba(color);
      if (rgba3) {
        const colors = `${rgba3.r},${rgba3.g},${rgba3.b}`;
        return opacity === 1 ? `rgb(${colors})` : `rgba(${colors},${_nullishCoalesce(_nullishCoalesce(opacity, () => ( rgba3.a)), () => ( 1))})`;
      }
    }
    return color;
  }
};
var getRgba = (color) => {
  const colorNum = normalizeCSSColor(color);
  if (colorNum != null)
    return rgba(colorNum);
};

// node_modules/@tamagui/web/dist/esm/helpers/normalizeShadow.js
function normalizeShadow({
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius
}) {
  const { height, width } = shadowOffset || defaultOffset;
  return {
    shadowOffset: {
      width: width || 0,
      height: height || 0
    },
    shadowRadius: shadowRadius || 0,
    shadowColor: normalizeColor2(shadowColor, 1),
    shadowOpacity: _nullishCoalesce(shadowOpacity, () => ( (shadowColor ? _optionalChain([getRgba, 'call', _43 => _43(shadowColor), 'optionalAccess', _44 => _44.a]) : 1)))
  };
}

// node_modules/@tamagui/web/dist/esm/helpers/expandStyles.js
function fixStyles(style) {
  var _a;
  (style.shadowRadius != null || style.shadowColor || style.shadowOpacity != null || style.shadowOffset) && Object.assign(style, normalizeShadow(style));
  for (const key in borderDefaults)
    key in style && (style[_a = borderDefaults[key]] || (style[_a] = "solid"));
}
var nativeStyle = isWeb ? null : "borderStyle";
var borderDefaults = {
  borderWidth: "borderStyle",
  borderBottomWidth: nativeStyle || "borderBottomStyle",
  borderTopWidth: nativeStyle || "borderTopStyle",
  borderLeftWidth: nativeStyle || "borderLeftStyle",
  borderRightWidth: nativeStyle || "borderRightStyle"
  // TODO: need to add borderBlock and borderInline here, but they are alot and might impact performance
};

// node_modules/@tamagui/web/dist/esm/helpers/normalizeValueWithProperty.js
var stylePropsAllPlusTransforms = {
  ...stylePropsAll,
  translateX: true,
  translateY: true
};
function normalizeValueWithProperty(value, property = "") {
  if (!isWeb || stylePropsUnitless[property] || property && !stylePropsAllPlusTransforms[property] || typeof value == "boolean")
    return value;
  let res = value;
  return value && typeof value == "object" ? value : (typeof value == "number" ? res = `${value}px` : property && (res = `${res}`), res);
}

// node_modules/@tamagui/web/dist/esm/helpers/transformsToString.js
function transformsToString(transforms) {
  return transforms.map(
    // { scale: 2 } => 'scale(2)'
    // { translateX: 20 } => 'translateX(20px)'
    // { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
    // { perspective: 1000 } => perspective(1000px)
    (transform) => {
      const type = Object.keys(transform)[0], value = transform[type];
      return type === "matrix" || type === "matrix3d" ? `${type}(${value.join(",")})` : `${type}(${normalizeValueWithProperty(value, type)})`;
    }
  ).join(" ");
}

// node_modules/@tamagui/web/dist/esm/helpers/getCSSStylesAtomic.js
function getCSSStylesAtomic(style) {
  styleToCSS(style);
  const out = [];
  for (const key in style) {
    if (key === "$$css")
      continue;
    const val = style[key];
    if (key in pseudoDescriptors)
      val && out.push(...getStyleAtomic(val, pseudoDescriptors[key]));
    else if (isMediaKey(key))
      for (const subKey in val) {
        const so = getStyleObject(val, subKey);
        so && (so[0] = key, out.push(so));
      }
    else {
      const so = getStyleObject(style, key);
      so && out.push(so);
    }
  }
  return out;
}
var getStyleAtomic = (style, pseudo) => {
  styleToCSS(style);
  const out = [];
  for (const key in style) {
    const so = getStyleObject(style, key, pseudo);
    so && out.push(so);
  }
  return out;
};
var conf2 = null;
var getStyleObject = (style, key, pseudo) => {
  let val = style[key];
  if (val == null)
    return;
  key === "transform" && Array.isArray(style.transform) && (val = transformsToString(val));
  const value = normalizeValueWithProperty(val, key), hash = simpleHash(typeof value == "string" ? value : `${value}`), pseudoPrefix = pseudo ? `0${pseudo.name}-` : "";
  conf2 || (conf2 = getConfigMaybe());
  const identifier = `_${_optionalChain([conf2, 'optionalAccess', _45 => _45.inverseShorthands, 'access', _46 => _46[key]]) || key}-${pseudoPrefix}${hash}`, rules = createAtomicRules(identifier, key, value, pseudo);
  return [
    // array for performance
    key,
    value,
    identifier,
    _optionalChain([pseudo, 'optionalAccess', _47 => _47.name]),
    rules
  ];
};
function styleToCSS(style) {
  const { shadowOffset, shadowRadius, shadowColor, shadowOpacity } = style;
  if (shadowRadius != null || shadowColor || shadowOffset != null || shadowOpacity != null) {
    const offset = shadowOffset || defaultOffset, width = normalizeValueWithProperty(offset.width), height = normalizeValueWithProperty(offset.height), radius = normalizeValueWithProperty(shadowRadius), color = normalizeColor2(shadowColor, shadowOpacity);
    if (color) {
      const shadow = `${width} ${height} ${radius} ${color}`;
      style.boxShadow = style.boxShadow ? `${style.boxShadow}, ${shadow}` : shadow;
    }
    delete style.shadowOffset, delete style.shadowRadius, delete style.shadowColor, delete style.shadowOpacity;
  }
  const { textShadowColor, textShadowOffset, textShadowRadius } = style;
  if (textShadowColor || textShadowOffset || textShadowRadius) {
    const { height, width } = textShadowOffset || defaultOffset, radius = textShadowRadius || 0, color = normalizeValueWithProperty(textShadowColor, "textShadowColor");
    if (color && (height !== 0 || width !== 0 || radius !== 0)) {
      const blurRadius = normalizeValueWithProperty(radius), offsetX = normalizeValueWithProperty(width), offsetY = normalizeValueWithProperty(height);
      style.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
    }
    delete style.textShadowColor, delete style.textShadowOffset, delete style.textShadowRadius;
  }
}
function createDeclarationBlock(style, important = false) {
  let next = "";
  for (const [key, value] of style)
    next += `${hyphenateStyleName(key)}:${value}${important ? " !important" : ""};`;
  return `{${next}}`;
}
var hcache = {};
var toHyphenLower = (match) => `-${match.toLowerCase()}`;
var hyphenateStyleName = (key) => {
  if (key in hcache)
    return hcache[key];
  const val = key.replace(/[A-Z]/g, toHyphenLower);
  return hcache[key] = val, val;
};
var selectorPriority = (() => {
  const res = {};
  for (const key in pseudoDescriptors) {
    const pseudo = pseudoDescriptors[key];
    res[pseudo.name] = `${[...Array(pseudo.priority)].map(() => ":root").join("")} `;
  }
  return res;
})();
function createAtomicRules(identifier, property, value, pseudo) {
  const pseudoIdPostfix = pseudo ? pseudo.name === "disabled" ? "[aria-disabled]" : `:${pseudo.name}` : "", pseudoSelector = _optionalChain([pseudo, 'optionalAccess', _48 => _48.selector]);
  let selector = pseudo ? pseudoSelector ? `${pseudoSelector} .${identifier}` : `${selectorPriority[pseudo.name]} .${identifier}${pseudoIdPostfix}` : `:root .${identifier}`;
  pseudoSelector === pseudoDescriptors.enterStyle.selector && (selector = `${selector}, .${identifier}${pseudoSelector}`);
  const important = !!pseudo;
  let rules = [];
  switch (property) {
    case "placeholderTextColor": {
      const block = createDeclarationBlock(
        [
          ["color", value],
          ["opacity", 1]
        ],
        important
      );
      rules.push(`${selector}::placeholder${block}`);
      break;
    }
    case "backgroundClip":
    case "userSelect": {
      const webkitProperty = `Webkit${`${property[0].toUpperCase()}${property.slice(1)}`}`, block = createDeclarationBlock(
        [
          [property, value],
          [webkitProperty, value]
        ],
        important
      );
      rules.push(`${selector}${block}`);
      break;
    }
    case "pointerEvents": {
      let finalValue = value;
      value === "auto" || value === "box-only" ? (finalValue = "auto", value === "box-only" && rules.push(`${selector}>*${boxOnly}`)) : (value === "none" || value === "box-none") && (finalValue = "none", value === "box-none" && rules.push(`${selector}>*${boxNone}`));
      const block = createDeclarationBlock([["pointerEvents", finalValue]], true);
      rules.push(`${selector}${block}`);
      break;
    }
    default: {
      const block = createDeclarationBlock([[property, value]], important);
      rules.push(`${selector}${block}`);
      break;
    }
  }
  return _optionalChain([pseudo, 'optionalAccess', _49 => _49.name]) === "hover" && (rules = rules.map((r) => `@media (hover) {${r}}`)), rules;
}
var boxNone = createDeclarationBlock([["pointerEvents", "auto"]], true);
var boxOnly = createDeclarationBlock([["pointerEvents", "none"]], true);

// node_modules/@tamagui/web/dist/esm/helpers/insertStyleRule.js
var totalSelectorsInserted = /* @__PURE__ */ new Map();
var allSelectors = {};
var allRules = {};
function trackInsertedStyle(id) {
  const next = (totalSelectorsInserted.get(id) || 0) + 1;
  return totalSelectorsInserted.set(id, next), next;
}
var bailAfterEnv = process.env.TAMAGUI_BAIL_AFTER_SCANNING_X_CSS_RULES;
var bailAfter = bailAfterEnv ? +bailAfterEnv : 400;
var sheet = null;
var trackAllRules = true;
function updateRules(identifier, rules) {
  return trackAllRules && (allRules[identifier] = rules.join(" ")), true;
}
var nonce = "";
function insertStyleRules(rulesToInsert) {
  if (isClient) {
    if (!sheet && document.head) {
      const styleTag = document.createElement("style");
      styleTag.id = "_tamagui-styles", nonce && (styleTag.nonce = nonce), sheet = document.head.appendChild(styleTag).sheet;
    }
    if (sheet)
      for (const key in rulesToInsert) {
        const styleObject = rulesToInsert[key], identifier = styleObject[StyleObjectIdentifier];
        if (!shouldInsertStyleRules(identifier))
          continue;
        const rules = styleObject[StyleObjectRules];
        allSelectors[identifier] = rules.join(`
`), trackInsertedStyle(identifier), updateRules(identifier, rules);
        try {
          for (const rule of rules)
            sheet.insertRule(rule, sheet.cssRules.length), identifier === "_dsp-_groupframe-maxMd_none" && console.warn("INSERT", rule);
        } catch (e3) {
          process.env.NODE_ENV === "production" && console.error("Error inserting style rule", rules);
        }
      }
  }
}
var maxToInsert = process.env.TAMAGUI_INSERT_SELECTOR_TRIES ? +process.env.TAMAGUI_INSERT_SELECTOR_TRIES : 1;
function shouldInsertStyleRules(identifier) {
  if (process.env.IS_STATIC === "is_static")
    return true;
  const total = totalSelectorsInserted.get(identifier) || 0;
  return process.env.NODE_ENV === "development" && total > +(process.env.TAMAGUI_STYLE_INSERTION_WARNING_LIMIT || 10) && console.warn(
    'Warning: inserting many CSS rules, you may be animating something and generating many CSS insertions, which can degrade performance. Instead, try using the "disableClassName" property on elements that change styles often. To disable this warning set TAMAGUI_STYLE_INSERTION_WARNING_LIMIT from 50000 to something higher'
  ), total < maxToInsert;
}

// node_modules/@tamagui/web/dist/esm/helpers/isActivePlatform.js
function isActivePlatform(key) {
  if (!key.startsWith("$platform"))
    return true;
  const platform = key.slice(10);
  return (
    // web, ios, android
    platform === currentPlatform || // web, native
    platform === "web"
  );
}

// node_modules/@tamagui/web/dist/esm/helpers/isActiveTheme.js
function isActiveTheme(key, activeThemeName) {
  if (key.startsWith("$theme-"))
    return key.slice(7).startsWith(activeThemeName);
}

// node_modules/@tamagui/web/dist/esm/helpers/log.js
function log(...args) {
  if (process.env.NODE_ENV !== "production") {
    _disableMediaTouch(true);
    try {
      return console.info(...args);
    } catch (err) {
      console.error(err);
    } finally {
      _disableMediaTouch(false);
    }
  }
}

// node_modules/@tamagui/web/dist/esm/constants/webToNativeProps.js
var webToNativeDynamicExpansion = {};
var webToNativeExpansion = {};

// node_modules/@tamagui/web/dist/esm/helpers/expandStyle.js
var neg1Flex = [
  ["flexGrow", 0],
  ["flexShrink", 1],
  ["flexBasis", "auto"]
];
function expandStyle(key, value) {
  if (key === "flex")
    return value === -1 ? neg1Flex : [
      ["flexGrow", value],
      ["flexShrink", 1],
      ["flexBasis", getSetting("styleCompat") === "react-native" ? 0 : "auto"]
    ];
  switch (key) {
    case "textAlignVertical":
      return [["verticalAlign", value === "center" ? "middle" : value]];
    case "writingDirection":
      return [["direction", value]];
    case "backdropFilter":
      return [
        ["backdropFilter", value],
        ["WebkitBackdropFilter", value]
      ];
  }
  if (key in EXPANSIONS)
    return EXPANSIONS[key].map((key2) => [key2, value]);
  if (key in webToNativeExpansion)
    return webToNativeExpansion[key].map((key2) => [key2, value]);
  if (key in webToNativeDynamicExpansion)
    return webToNativeDynamicExpansion[key](value);
}
var all = ["Top", "Right", "Bottom", "Left"];
var horiz = ["Right", "Left"];
var vert = ["Top", "Bottom"];
var xy = ["X", "Y"];
var EXPANSIONS = {
  borderColor: ["TopColor", "RightColor", "BottomColor", "LeftColor"],
  borderRadius: [
    "TopLeftRadius",
    "TopRightRadius",
    "BottomRightRadius",
    "BottomLeftRadius"
  ],
  borderWidth: ["TopWidth", "RightWidth", "BottomWidth", "LeftWidth"],
  margin: all,
  marginHorizontal: horiz,
  marginVertical: vert,
  overscrollBehavior: xy,
  padding: all,
  paddingHorizontal: horiz,
  paddingVertical: vert,
  ...isWeb && {
    // react-native only supports borderStyle
    borderStyle: ["TopStyle", "RightStyle", "BottomStyle", "LeftStyle"],
    // react-native doesn't support X / Y
    overflow: xy
  }
};
for (const parent in EXPANSIONS) {
  const prefix = parent.slice(0, _nullishCoalesce(_optionalChain([/[A-Z]/, 'access', _50 => _50.exec, 'call', _51 => _51(parent), 'optionalAccess', _52 => _52.index]), () => ( parent.length)));
  EXPANSIONS[parent] = EXPANSIONS[parent].map((k) => `${prefix}${k}`);
}

// node_modules/@tamagui/web/dist/esm/helpers/getVariantExtras.js
var cache5 = /* @__PURE__ */ new WeakMap();
var getVariantExtras = (styleState) => {
  if (cache5.has(styleState))
    return cache5.get(styleState);
  const { props, conf: conf4, context, theme } = styleState;
  let fonts = conf4.fontsParsed;
  _optionalChain([context, 'optionalAccess', _53 => _53.language]) && (fonts = getFontsForLanguage(conf4.fontsParsed, context.language));
  const next = {
    fonts,
    tokens: conf4.tokensParsed,
    theme,
    get fontFamily() {
      return getVariableValue(styleState.fontFamily || styleState.props.fontFamily) || props.fontFamily || getVariableValue(styleState.conf.defaultFont);
    },
    get font() {
      return fonts[this.fontFamily] || (!props.fontFamily || props.fontFamily[0] === "$" ? fonts[styleState.conf.defaultFont] : void 0);
    },
    props
  };
  return cache5.set(styleState, next), next;
};
var fontLanguageCache = /* @__PURE__ */ new WeakMap();
function getFontsForLanguage(fonts, language) {
  if (fontLanguageCache.has(language))
    return fontLanguageCache.get(language);
  const next = {
    ...fonts,
    ...Object.fromEntries(
      Object.entries(language).map(([name, lang]) => {
        if (lang === "default")
          return [];
        const langKey = `$${name}_${lang}`;
        return [`$${name}`, fonts[langKey]];
      })
    )
  };
  return fontLanguageCache.set(language, next), next;
}

// node_modules/@tamagui/web/dist/esm/helpers/isObj.js
var isObj = (x) => x && !Array.isArray(x) && typeof x == "object";

// node_modules/@tamagui/web/dist/esm/helpers/normalizeStyle.js
function normalizeStyle(style, disableNormalize = false) {
  const res = {};
  for (let key in style) {
    const prop = style[key];
    if (prop == null)
      continue;
    if (key in pseudoDescriptors || // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && isObj(prop)) {
      res[key] = normalizeStyle(prop, disableNormalize);
      continue;
    }
    const value = disableNormalize ? prop : normalizeValueWithProperty(prop, key), out = expandStyle(key, value);
    out ? Object.assign(res, Object.fromEntries(out)) : res[key] = value;
  }
  return fixStyles(res), res;
}

// node_modules/@tamagui/web/dist/esm/helpers/skipProps.js
var skipProps = {
  untilMeasured: 1,
  animation: 1,
  space: 1,
  animateOnly: 1,
  disableClassName: 1,
  debug: 1,
  componentName: 1,
  disableOptimization: 1,
  tag: 1,
  style: 1,
  // handled after loop so pseudos set usedKeys and override it if necessary
  group: 1,
  themeInverse: 1,
  animatePresence: 1
};
process.env.NODE_ENV === "test" && (skipProps["data-test-renders"] = 1);
process.env.NODE_ENV !== "production" && Object.assign(skipProps, {
  ellipsizeMode: 1,
  accessibilityElementsHidden: 1,
  accessibilityIgnoresInvertColors: 1,
  accessibilityLanguage: 1,
  adjustsFontSizeToFit: 1,
  allowFontScaling: 1,
  dataDetectorType: 1,
  dynamicTypeRamp: 1,
  elevationAndroid: 1,
  hapticFeedback: 1,
  hapticStyle: 1,
  hitSlop: 1,
  onAccessibilityAction: 1,
  importantForAccessibility: 1,
  lineBreakStrategyIOS: 1,
  maxFontSizeMultiplier: 1,
  minimumFontScale: 1,
  needsOffscreenAlphaCompositing: 1,
  nextFocusDown: 1,
  nextFocusForward: 1,
  nextFocusLeft: 1,
  nextFocusRight: 1,
  nextFocusUp: 1,
  onMagicTap: 1,
  selectionColor: 1,
  shouldRasterizeIOS: 1,
  suppressHighlighting: 1,
  textBreakStrategy: 1
});

// node_modules/@tamagui/web/dist/esm/helpers/propMapper.js
var propMapper = (key, value, styleState, disabled, map) => {
  if (disabled)
    return map(key, value);
  if (lastFontFamilyToken = null, key === "elevationAndroid")
    return;
  const { conf: conf4, styleProps, staticConfig } = styleState;
  if (value === "unset") {
    const unsetVal = _optionalChain([conf4, 'access', _54 => _54.unset, 'optionalAccess', _55 => _55[key]]);
    if (unsetVal != null)
      value = unsetVal;
    else
      return;
  }
  const { variants: variants2 } = staticConfig;
  if (!styleProps.noExpand && variants2 && key in variants2) {
    const variantValue = resolveVariants(key, value, styleProps, styleState, "");
    if (variantValue) {
      variantValue.forEach(([key2, value2]) => map(key2, value2));
      return;
    }
  }
  if (styleProps.disableExpandShorthands || key in conf4.shorthands && (key = conf4.shorthands[key]), value != null && (value[0] === "$" ? value = getTokenForKey(key, value, styleProps, styleState) : isVariable2(value) && (value = resolveVariableValue(key, value, styleProps.resolveValues))), value != null) {
    key === "fontFamily" && lastFontFamilyToken && (styleState.fontFamily = lastFontFamilyToken);
    const expanded = styleProps.noExpand ? null : expandStyle(key, value);
    if (expanded) {
      const max = expanded.length;
      for (let i = 0; i < max; i++) {
        const [nkey, nvalue] = expanded[i];
        map(nkey, nvalue);
      }
    } else
      map(key, value);
  }
};
var resolveVariants = (key, value, styleProps, styleState, parentVariantKey) => {
  const { staticConfig, conf: conf4, debug } = styleState, { variants: variants2 } = staticConfig;
  if (!variants2)
    return;
  let variantValue = getVariantDefinition(variants2[key], value, conf4);
  if (process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(`\u2666\uFE0F\u2666\uFE0F\u2666\uFE0F resolve variant ${key}`), console.info({
    key,
    value,
    variantValue,
    variants: variants2
  }), console.groupEnd()), !variantValue) {
    if (process.env.TAMAGUI_WARN_ON_MISSING_VARIANT === "1" && typeof value != "boolean") {
      const name = staticConfig.componentName || "[UnnamedComponent]";
      console.warn(
        `No variant found: ${name} has variant "${key}", but no matching value "${value}"`
      );
    }
    return;
  }
  if (typeof variantValue == "function") {
    const fn = variantValue, extras = getVariantExtras(styleState);
    variantValue = fn(value, extras), process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed("   expanded functional variant", key), console.info({ fn, variantValue, extras }), console.groupEnd());
  }
  let fontFamilyResult;
  if (isObj(variantValue)) {
    const fontFamilyUpdate = variantValue.fontFamily || variantValue[conf4.inverseShorthands.fontFamily];
    fontFamilyUpdate && (fontFamilyResult = getFontFamilyFromNameOrVariable(fontFamilyUpdate, conf4), styleState.fontFamily = fontFamilyResult, process.env.NODE_ENV === "development" && debug === "verbose" && console.info("   updating font family", fontFamilyResult)), variantValue = resolveTokensAndVariants(
      key,
      variantValue,
      styleProps,
      styleState,
      parentVariantKey
    );
  }
  if (variantValue) {
    const expanded = normalizeStyle(variantValue, !!styleProps.noNormalize);
    process.env.NODE_ENV === "development" && debug === "verbose" && console.info("   expanding styles from ", variantValue, "to", expanded);
    const next = Object.entries(expanded);
    return fontFamilyResult && fontFamilyResult[0] === "$" && (lastFontFamilyToken = getVariableValue(fontFamilyResult)), next;
  }
};
function getFontFamilyFromNameOrVariable(input, conf4) {
  if (isVariable2(input)) {
    const val = variableToFontNameCache.get(input);
    if (val)
      return val;
    for (const key in conf4.fontsParsed) {
      const familyVariable = conf4.fontsParsed[key].family;
      if (isVariable2(familyVariable) && (variableToFontNameCache.set(familyVariable, key), familyVariable === input))
        return key;
    }
  } else if (typeof input == "string" && input[0] === "$")
    return input;
}
var variableToFontNameCache = /* @__PURE__ */ new WeakMap();
var resolveTokensAndVariants = (key, value, styleProps, styleState, parentVariantKey) => {
  const { conf: conf4, staticConfig, debug, theme } = styleState, { variants: variants2 } = staticConfig, res = {};
  process.env.NODE_ENV === "development" && debug === "verbose" && console.info("   - resolveTokensAndVariants", key, value);
  for (const _key in value) {
    const subKey = conf4.shorthands[_key] || _key, val = value[_key];
    if (!(!styleProps.noSkip && subKey in skipProps)) {
      if (styleProps.noExpand)
        res[subKey] = val;
      else if (variants2 && subKey in variants2) {
        if (staticConfig) {
          const contextProps = _optionalChain([staticConfig, 'access', _56 => _56.context, 'optionalAccess', _57 => _57.props]) || _optionalChain([staticConfig, 'access', _58 => _58.parentStaticConfig, 'optionalAccess', _59 => _59.context, 'optionalAccess', _60 => _60.props]);
          contextProps && subKey in contextProps && (styleState.resolvedContextVariants || (styleState.resolvedContextVariants = {}), styleState.resolvedContextVariants[subKey] = val);
        }
        if (parentVariantKey && parentVariantKey === key)
          res[subKey] = // SYNC WITH *1
          val[0] === "$" ? getTokenForKey(subKey, val, styleProps, styleState) : val;
        else {
          const variantOut = resolveVariants(subKey, val, styleProps, styleState, key);
          if (variantOut)
            for (const [key2, val2] of variantOut)
              val2 != null && (key2 in pseudoDescriptors ? (_nullishCoalesce(res[key2], () => ( (res[key2] = {}))), Object.assign(res[key2], val2)) : res[key2] = val2);
        }
        continue;
      }
      if (isVariable2(val)) {
        res[subKey] = resolveVariableValue(subKey, val, styleProps.resolveValues), process.env.NODE_ENV === "development" && debug === "verbose" && console.info("variable", subKey, res[subKey]);
        continue;
      }
      if (typeof val == "string") {
        const fVal = (
          // SYNC WITH *1
          val[0] === "$" ? getTokenForKey(subKey, val, styleProps, styleState) : val
        );
        res[subKey] = fVal;
        continue;
      }
      if (isObj(val)) {
        const subObject = resolveTokensAndVariants(subKey, val, styleProps, styleState, key);
        process.env.NODE_ENV === "development" && debug === "verbose" && console.info("object", subKey, subObject), _nullishCoalesce(res[subKey], () => ( (res[subKey] = {}))), Object.assign(res[subKey], subObject);
      } else
        res[subKey] = val;
      process.env.NODE_ENV === "development" && debug && _optionalChain([res, 'access', _61 => _61[subKey], 'optionalAccess', _62 => _62[0]]) === "$" && console.warn(
        `\u26A0\uFE0F Missing token in theme ${theme.name}:`,
        subKey,
        res[subKey],
        theme
      );
    }
  }
  return res;
};
var tokenCats = ["size", "color", "radius", "space", "zIndex"].map((name) => ({
  name,
  spreadName: `...${name}`
}));
function getVariantDefinition(variant, value, conf4) {
  if (!variant)
    return;
  if (typeof variant == "function")
    return variant;
  const exact = variant[value];
  if (exact)
    return exact;
  if (value != null) {
    const { tokensParsed } = conf4;
    for (const { name, spreadName } of tokenCats)
      if (spreadName in variant && name in tokensParsed && value in tokensParsed[name])
        return variant[spreadName];
    const fontSizeVariant = variant["...fontSize"];
    if (fontSizeVariant && conf4.fontSizeTokens.has(value))
      return fontSizeVariant;
  }
  return variant[`:${typeof value}`] || variant["..."];
}
var fontShorthand = {
  fontSize: "size",
  fontWeight: "weight"
};
var lastFontFamilyToken = null;
var didLogMissingToken = false;
var getTokenForKey = (key, value, styleProps, styleState) => {
  let resolveAs = styleProps.resolveValues || "none";
  if (resolveAs === "none")
    return value;
  const { theme, conf: conf4 = getConfig2(), context, fontFamily, staticConfig } = styleState, themeValue = theme ? theme[value] || theme[value.slice(1)] : void 0, tokensParsed = conf4.tokensParsed;
  let valOrVar, hasSet = false;
  const customTokenAccept = _optionalChain([staticConfig, 'optionalAccess', _63 => _63.accept, 'optionalAccess', _64 => _64[key]]);
  if (customTokenAccept) {
    const val = _nullishCoalesce(themeValue, () => ( tokensParsed[customTokenAccept][value]));
    val != null && (resolveAs = "value", valOrVar = val, hasSet = true);
  }
  if (themeValue) {
    if (resolveAs === "except-theme")
      return value;
    valOrVar = themeValue, process.env.NODE_ENV === "development" && styleState.debug === "verbose" && (globalThis.tamaguiAvoidTracking = true, console.info(
      ` - resolving ${key} to theme value ${value} resolveAs ${resolveAs}`,
      valOrVar
    ), globalThis.tamaguiAvoidTracking = false), hasSet = true;
  } else {
    if (value in conf4.specificTokens)
      hasSet = true, valOrVar = conf4.specificTokens[value];
    else {
      switch (key) {
        case "fontFamily": {
          valOrVar = _optionalChain([(_optionalChain([context, 'optionalAccess', _65 => _65.language]) ? getFontsForLanguage(conf4.fontsParsed, context.language) : conf4.fontsParsed), 'access', _66 => _66[value], 'optionalAccess', _67 => _67.family]) || value, lastFontFamilyToken = value, hasSet = true;
          break;
        }
        case "fontSize":
        case "lineHeight":
        case "letterSpacing":
        case "fontWeight": {
          const fam = fontFamily || conf4.defaultFontToken;
          if (fam) {
            const fontsParsed = _optionalChain([context, 'optionalAccess', _68 => _68.language]) ? getFontsForLanguage(conf4.fontsParsed, context.language) : conf4.fontsParsed;
            valOrVar = _optionalChain([(fontsParsed[fam] || fontsParsed[conf4.defaultFontToken]), 'optionalAccess', _69 => _69[fontShorthand[key] || key], 'optionalAccess', _70 => _70[value]]) || value, hasSet = true;
          }
          break;
        }
      }
      for (const cat in tokenCategories)
        if (key in tokenCategories[cat]) {
          const res = _optionalChain([tokensParsed, 'access', _71 => _71[cat], 'optionalAccess', _72 => _72[value]]);
          res != null ? (valOrVar = res, hasSet = true) : process.env.NODE_ENV === "development" && process.env.TAMAGUI_DISABLE_MISSING_TOKEN_LOG !== "1" && (didLogMissingToken || (didLogMissingToken = true, console.groupCollapsed(
            `[tamagui] Warning: missing token ${key} in category ${cat} - ${value} (open for details)`
          ), console.info(
            `Note: this could just be due to you not setting all the theme tokens Tamagui expects, which is harmless, but
                    it also often can be because you have a duplicated Tamagui in your bundle, which can cause tricky bugs.`
          ), console.info(
            `To see if you have duplicated dependencies, in Chrome DevTools hit CMD+P and type TamaguiProvider.
                    If you see both a .cjs and a .mjs entry, it's duplicated.`
          ), console.info(
            "You can debug that issue by opening the .mjs and .cjs files and setting a breakpoint at the top of each."
          ), console.info(
            "We only log this warning one time as it's sometimes harmless, to disable this log entirely set process.env.TAMAGUI_DISABLE_MISSING_TOKEN_LOG=1."
          ), console.groupEnd()));
        }
    }
    if (!hasSet) {
      const spaceVar = tokensParsed.space[value];
      spaceVar != null && (valOrVar = spaceVar, hasSet = true);
    }
  }
  if (hasSet) {
    const out = resolveVariableValue(key, valOrVar, resolveAs);
    return process.env.NODE_ENV === "development" && styleState.debug === "verbose" && (globalThis.tamaguiAvoidTracking = true, console.info("resolved", resolveAs, valOrVar, out), globalThis.tamaguiAvoidTracking = false), out;
  }
  process.env.NODE_ENV === "development" && styleState.debug === "verbose" && console.warn(`Warning: no token found for ${key}, omitting`);
};
function resolveVariableValue(key, valOrVar, resolveValues) {
  if (resolveValues === "none")
    return valOrVar;
  if (isVariable2(valOrVar)) {
    if (resolveValues === "value")
      return valOrVar.val;
    const get = _optionalChain([valOrVar, 'optionalAccess', _73 => _73.get]);
    return typeof get == "function" ? get(resolveValues === "web" ? "web" : void 0) : valOrVar.variable;
  }
  return valOrVar;
}

// node_modules/@tamagui/web/dist/esm/helpers/sortString.js
var sortString = (a, b) => a < b ? -1 : a > b ? 1 : 0;

// node_modules/@tamagui/web/dist/esm/helpers/getSplitStyles.js
var conf3;
var PROP_SPLIT = "-";
function normalizeGroupKey(key, groupContext) {
  const parts = key.split("-"), plen = parts.length;
  if (
    // check if its actually a simple group selector to avoid breaking selectors
    plen === 2 || plen === 3 && pseudoPriorities[parts[parts.length - 1]]
  ) {
    const name = parts[1];
    if (groupContext && !groupContext[name])
      return key.replace("$group-", "$group-true-");
  }
  return key;
}
function isValidStyleKey(key, validStyles2, accept) {
  return key in validStyles2 ? true : accept && key in accept;
}
var getSplitStyles = (props, staticConfig, theme, themeName, componentState, styleProps, parentSplitStyles, componentContext, groupContext, elementType, startedUnhydrated, debug) => {
  conf3 = conf3 || getConfig2();
  const animationDriver = _optionalChain([componentContext, 'optionalAccess', _74 => _74.animationDriver]) || conf3.animations;
  if (props.passThrough)
    return null;
  isWeb && styleProps.isAnimated && animationDriver.isReactNative && !styleProps.noNormalize && (styleProps.noNormalize = "values");
  const { shorthands } = conf3, {
    isHOC,
    isText,
    isInput,
    variants: variants2,
    isReactNative,
    inlineProps,
    inlineWhenUnflattened,
    parentStaticConfig,
    acceptsClassName
  } = staticConfig, viewProps = {}, mediaState2 = styleProps.mediaState || mediaState, shouldDoClasses = acceptsClassName && isWeb && !styleProps.noClass, rulesToInsert = {}, classNames = {};
  let pseudos = null, space = props.space, hasMedia = false, dynamicThemeAccess, pseudoGroups, mediaGroups, className = props.className || "", mediaStylesSeen = 0;
  const validStyles2 = staticConfig.validStyles || (staticConfig.isText || staticConfig.isInput ? stylePropsText : validStyles);
  process.env.NODE_ENV === "development" && debug === "profile" && time`split-styles-setup`;
  const styleState = {
    classNames,
    conf: conf3,
    props,
    styleProps,
    componentState,
    staticConfig,
    style: null,
    theme,
    usedKeys: {},
    viewProps,
    context: componentContext,
    debug
  };
  if (process.env.IS_STATIC === "is_static") {
    const { fallbackProps } = styleProps;
    fallbackProps && (styleState.props = new Proxy(props, {
      get(_, key, val) {
        return Reflect.has(props, key) ? Reflect.get(props, key) : Reflect.get(fallbackProps, key);
      }
    }));
  }
  process.env.NODE_ENV === "development" && debug === "profile" && time`style-state`, process.env.NODE_ENV === "development" && debug === "verbose" && isClient && isDevTools && (console.groupCollapsed("\u{1F539} getSplitStyles \u{1F447}"), log({
    props,
    staticConfig,
    shouldDoClasses,
    styleProps,
    rulesToInsert,
    componentState,
    styleState,
    theme: { ...theme }
  }));
  const { asChild } = props, { accept } = staticConfig, { noSkip, disableExpandShorthands, noExpand, styledContext } = styleProps, { webContainerType } = conf3.settings, parentVariants = _optionalChain([parentStaticConfig, 'optionalAccess', _75 => _75.variants]);
  for (const keyOg in props) {
    let keyInit = keyOg, valInit = props[keyInit];
    if (keyInit === "children") {
      viewProps[keyInit] = valInit;
      continue;
    }
    if (process.env.NODE_ENV === "development" && debug === "profile" && time`before-prop-${keyInit}`, process.env.NODE_ENV === "test" && keyInit === "jestAnimatedStyle")
      continue;
    if (accept) {
      const accepted = accept[keyInit];
      if ((accepted === "style" || accepted === "textStyle") && valInit && typeof valInit == "object") {
        viewProps[keyInit] = getSubStyle(styleState, keyInit, valInit, styleProps.noClass);
        continue;
      }
    }
    if (process.env.NODE_ENV, disableExpandShorthands || keyInit in shorthands && (keyInit = shorthands[keyInit]), keyInit === "className" || asChild && webViewFlexCompatStyles[keyInit] === valInit)
      continue;
    if (keyInit in skipProps && !noSkip && !isHOC) {
      if (keyInit === "group") {
        const identifier = `t_group_${valInit}`, containerCSS = [
          "continer",
          void 0,
          identifier,
          void 0,
          [
            `.${identifier} { container-name: ${valInit}; container-type: ${webContainerType || "inline-size"}; }`
          ]
        ];
        addStyleToInsertRules(rulesToInsert, containerCSS);
      }
      continue;
    }
    let isValidStyleKeyInit = isValidStyleKey(keyInit, validStyles2, accept);
    if (staticConfig.isReactNative && keyInit.startsWith("data-")) {
      keyInit = keyInit.replace("data-", ""), viewProps.dataSet || (viewProps.dataSet = {}), viewProps.dataSet[keyInit] = valInit;
      continue;
    }
    if (keyInit === "dataSet") {
      for (const keyInit2 in valInit)
        viewProps[`data-${hyphenate(keyInit2)}`] = valInit[keyInit2];
      continue;
    }
    if (!noExpand) {
      if (keyInit === "disabled" && valInit === true && (viewProps["aria-disabled"] = true, (elementType === "button" || elementType === "form" || elementType === "input" || elementType === "select" || elementType === "textarea") && (viewProps.disabled = true), !_optionalChain([variants2, 'optionalAccess', _76 => _76.disabled])))
        continue;
      if (keyInit === "testID") {
        viewProps[isReactNative ? keyInit : "data-testid"] = valInit;
        continue;
      }
      if (keyInit === "id" || keyInit === "nativeID") {
        viewProps.id = valInit;
        continue;
      }
      let didUseKeyInit = false;
      if (isReactNative) {
        if (keyInit in accessibilityDirectMap || keyInit.startsWith("accessibility")) {
          viewProps[keyInit] = valInit;
          continue;
        }
      } else {
        if (didUseKeyInit = true, keyInit in accessibilityDirectMap) {
          viewProps[accessibilityDirectMap[keyInit]] = valInit;
          continue;
        }
        switch (keyInit) {
          case "accessibilityRole": {
            valInit === "none" ? viewProps.role = "presentation" : viewProps.role = accessibilityRoleToWebRole[valInit] || valInit;
            continue;
          }
          case "accessibilityLabelledBy":
          case "accessibilityFlowTo":
          case "accessibilityControls":
          case "accessibilityDescribedBy": {
            viewProps[`aria-${keyInit.replace("accessibility", "").toLowerCase()}`] = processIDRefList(valInit);
            continue;
          }
          case "accessibilityKeyShortcuts": {
            Array.isArray(valInit) && (viewProps["aria-keyshortcuts"] = valInit.join(" "));
            continue;
          }
          case "accessibilityLiveRegion": {
            viewProps["aria-live"] = valInit === "none" ? "off" : valInit;
            continue;
          }
          case "accessibilityReadOnly": {
            viewProps["aria-readonly"] = valInit, (elementType === "input" || elementType === "select" || elementType === "textarea") && (viewProps.readOnly = true);
            continue;
          }
          case "accessibilityRequired": {
            viewProps["aria-required"] = valInit, (elementType === "input" || elementType === "select" || elementType === "textarea") && (viewProps.required = valInit);
            continue;
          }
          default:
            didUseKeyInit = false;
        }
      }
      if (didUseKeyInit)
        continue;
    }
    let isVariant = !isValidStyleKeyInit && variants2 && keyInit in variants2;
    const isStyleLikeKey = isValidStyleKeyInit || isVariant;
    let isPseudo = keyInit in validPseudoKeys, isMedia = !isStyleLikeKey && !isPseudo ? getMediaKey(keyInit) : false, isMediaOrPseudo = !!(isMedia || isPseudo);
    isMediaOrPseudo && isMedia === "group" && (keyInit = normalizeGroupKey(keyInit, groupContext));
    const isStyleProp = isValidStyleKeyInit || isMediaOrPseudo || isVariant && !noExpand;
    if (isStyleProp && (asChild === "except-style" || asChild === "except-style-web"))
      continue;
    const shouldPassProp = !isStyleProp && isHOC || // is in parent variants
    isHOC && parentVariants && keyInit in parentVariants || _optionalChain([inlineProps, 'optionalAccess', _77 => _77.has, 'call', _78 => _78(keyInit)]), parentVariant = _optionalChain([parentVariants, 'optionalAccess', _79 => _79[keyInit]]), isHOCShouldPassThrough = !!(isHOC && (isValidStyleKeyInit || isMediaOrPseudo || parentVariant || keyInit in skipProps)), shouldPassThrough = shouldPassProp || isHOCShouldPassThrough;
    if (process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(
      `  \u{1F511} ${keyOg}${keyInit !== keyOg ? ` (shorthand for ${keyInit})` : ""} ${shouldPassThrough ? "(pass)" : ""}`
    ), log({ isVariant, valInit, shouldPassProp }), isClient && log({
      variants: variants2,
      variant: _optionalChain([variants2, 'optionalAccess', _80 => _80[keyInit]]),
      isVariant,
      isHOCShouldPassThrough,
      usedKeys: { ...styleState.usedKeys },
      parentStaticConfig
    })), shouldPassThrough && (passDownProp(viewProps, keyInit, valInit, isMediaOrPseudo), process.env.NODE_ENV === "development" && debug === "verbose" && console.groupEnd(), !isVariant))
      continue;
    if (!noSkip && keyInit in skipProps) {
      process.env.NODE_ENV === "development" && debug === "verbose" && console.groupEnd();
      continue;
    }
    (isText || isInput) && valInit && (keyInit === "fontFamily" || keyInit === shorthands.fontFamily) && valInit in conf3.fontsParsed && (styleState.fontFamily = valInit);
    const disablePropMap = isMediaOrPseudo || !isStyleLikeKey;
    if (propMapper(keyInit, valInit, styleState, disablePropMap, (key, val) => {
      const isStyledContextProp = styledContext && key in styledContext;
      if (!isHOC && disablePropMap && !isStyledContextProp && !isMediaOrPseudo) {
        viewProps[key] = val;
        return;
      }
      if (process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed("  \u{1F4A0} expanded", keyInit, "=>", key), log(val), console.groupEnd()), val == null)
        return;
      if (!isHOC && isValidStyleKey(key, validStyles2, accept)) {
        mergeStyle(styleState, key, val, 1);
        return;
      }
      if (isPseudo = key in validPseudoKeys, isMedia = isPseudo ? false : getMediaKey(key), isMediaOrPseudo = !!(isMedia || isPseudo), isVariant = variants2 && key in variants2, isMedia === "group" && (key = normalizeGroupKey(key, groupContext)), (_optionalChain([inlineProps, 'optionalAccess', _81 => _81.has, 'call', _82 => _82(key)]) || process.env.IS_STATIC === "is_static" && _optionalChain([inlineWhenUnflattened, 'optionalAccess', _83 => _83.has, 'call', _84 => _84(key)])) && (viewProps[key] = _nullishCoalesce(props[key], () => ( val))), styleProps.noExpand && isPseudo || isHOC && (isMediaOrPseudo || _optionalChain([parentStaticConfig, 'optionalAccess', _85 => _85.variants, 'optionalAccess', _86 => _86[keyInit]]))) {
        passDownProp(viewProps, key, val, isMediaOrPseudo), process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(` - passing down prop ${key}`), log({ val, after: { ...viewProps[key] } }), console.groupEnd());
        return;
      }
      if (isPseudo) {
        if (!val)
          return;
        const pseudoStyleObject = getSubStyle(
          styleState,
          key,
          val,
          styleProps.noClass && process.env.IS_STATIC !== "is_static"
        );
        if ((!shouldDoClasses || process.env.IS_STATIC === "is_static") && (pseudos || (pseudos = {}), pseudos[key] || (pseudos[key] = {}), process.env.IS_STATIC === "is_static")) {
          Object.assign(pseudos[key], pseudoStyleObject);
          return;
        }
        const descriptor = pseudoDescriptors[key], isEnter = key === "enterStyle", isExit = key === "exitStyle";
        if (!descriptor)
          return;
        if (shouldDoClasses && !isExit) {
          const pseudoStyles = getStyleAtomic(pseudoStyleObject, descriptor);
          process.env.NODE_ENV === "development" && debug === "verbose" && console.info("pseudo:", key, pseudoStyleObject, pseudoStyles);
          for (const psuedoStyle of pseudoStyles) {
            const fullKey = `${psuedoStyle[StyleObjectProperty]}${PROP_SPLIT}${descriptor.name}`;
            addStyleToInsertRules(rulesToInsert, psuedoStyle), classNames[fullKey] = psuedoStyle[StyleObjectIdentifier];
          }
        }
        if (!shouldDoClasses || isExit || isEnter) {
          const descriptorKey = descriptor.stateKey || descriptor.name;
          let isDisabled2 = componentState[descriptorKey] === false;
          isExit && (isDisabled2 = !styleProps.isExiting), isEnter && componentState.unmounted === false && (isDisabled2 = true), process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed("pseudo", key, { isDisabled: isDisabled2 }), log({ pseudoStyleObject, isDisabled: isDisabled2, descriptor, componentState }), console.groupEnd());
          const importance = descriptor.priority;
          for (const pkey in pseudoStyleObject) {
            const val2 = pseudoStyleObject[pkey];
            if (isDisabled2)
              applyDefaultStyle(pkey, styleState);
            else {
              const curImportance = styleState.usedKeys[pkey] || 0, shouldMerge = importance >= curImportance;
              shouldMerge && (process.env.IS_STATIC === "is_static" && (pseudos || (pseudos = {}), pseudos[key] || (pseudos[key] = {}), pseudos[key][pkey] = val2), mergeStyle(styleState, pkey, val2, importance)), process.env.NODE_ENV === "development" && debug === "verbose" && log("    subKey", pkey, shouldMerge, {
                importance,
                curImportance,
                pkey,
                val: val2
              });
            }
          }
          if (!isDisabled2)
            for (const key2 in val) {
              const k = shorthands[key2] || key2;
              styleState.usedKeys[k] = Math.max(importance, styleState.usedKeys[k] || 0);
            }
        }
        return;
      }
      if (isMedia) {
        if (!val)
          return;
        const hasSpace = val.space, mediaKeyShort = key.slice(isMedia == "theme" ? 7 : 1);
        if (hasMedia || (hasMedia = true), (hasSpace || !shouldDoClasses || styleProps.willBeAnimated) && ((!hasMedia || typeof hasMedia == "boolean") && (hasMedia = /* @__PURE__ */ new Set()), hasMedia.add(mediaKeyShort)), isMedia === "platform" && !isActivePlatform(key))
          return;
        process.env.NODE_ENV === "development" && debug === "verbose" && log(`  \u{1F4FA} ${key}`, {
          key,
          val,
          props,
          shouldDoClasses,
          acceptsClassName,
          componentState,
          mediaState: mediaState2
        });
        const priority = mediaStylesSeen;
        if (mediaStylesSeen += 1, shouldDoClasses) {
          const mediaStyle = getSubStyle(styleState, key, val, false);
          if (hasSpace && (delete mediaStyle.space, mediaState2[mediaKeyShort])) {
            const importance = getMediaImportanceIfMoreImportant(
              mediaKeyShort,
              "space",
              styleState,
              true
            );
            importance && (space = val.space, styleState.usedKeys.space = importance, process.env.NODE_ENV === "development" && debug === "verbose" && log(
              `Found more important space for current media ${mediaKeyShort}: ${val} (importance: ${importance})`
            ));
          }
          const mediaStyles = getCSSStylesAtomic(mediaStyle);
          for (const style of mediaStyles) {
            const property = style[StyleObjectProperty], isSubStyle = property[0] === "$";
            if (isSubStyle && !isActivePlatform(property))
              continue;
            const out = createMediaStyle(
              style,
              mediaKeyShort,
              mediaQueryConfig,
              isMedia,
              false,
              priority
            );
            process.env.NODE_ENV === "development" && debug === "verbose" && log("\u{1F4FA} media style:", out);
            const subKey = isSubStyle ? style[2] : "", fullKey = `${style[StyleObjectProperty]}${subKey}${PROP_SPLIT}${mediaKeyShort}${style[StyleObjectPseudo] || ""}`;
            addStyleToInsertRules(rulesToInsert, out), classNames[fullKey] = out[StyleObjectIdentifier];
          }
        } else {
          let mergeMediaStyle = function(key2, val2) {
            styleState.style || (styleState.style = {}), mergeMediaByImportance(
              styleState,
              mediaKeyShort,
              key2,
              val2,
              mediaState2[mediaKeyShort],
              importanceBump,
              debug
            ) && key2 === "fontFamily" && (styleState.fontFamily = mediaStyle.fontFamily);
          };
          const isThemeMedia = isMedia === "theme", isGroupMedia = isMedia === "group";
          if (!isThemeMedia && !(isMedia === "platform") && !isGroupMedia) {
            if (!mediaState2[mediaKeyShort]) {
              process.env.NODE_ENV === "development" && debug === "verbose" && log(`  \u{1F4FA} \u274C DISABLED ${mediaKeyShort}`);
              return;
            }
            process.env.NODE_ENV === "development" && debug === "verbose" && log(`  \u{1F4FA} \u2705 ENABLED ${mediaKeyShort}`);
          }
          const mediaStyle = getSubStyle(styleState, key, val, true);
          let importanceBump = 0;
          if (isThemeMedia) {
            if (dynamicThemeAccess = true, isIos && getSetting("fastSchemeChange")) {
              styleState.style || (styleState.style = {});
              const scheme = mediaKeyShort, oppositeScheme = getOppositeScheme(mediaKeyShort);
              for (const subKey in mediaStyle) {
                let val2 = extractValueFromDynamic(mediaStyle[subKey], scheme);
                const oppositeVal = extractValueFromDynamic(
                  styleState.style[subKey],
                  oppositeScheme
                );
                mediaStyle[subKey] = getDynamicVal({
                  scheme,
                  val: val2,
                  oppositeVal
                }), mergeStyle(styleState, subKey, mediaStyle[subKey], priority);
              }
            } else if (!(themeName === mediaKeyShort || themeName.startsWith(mediaKeyShort)))
              return;
          } else if (isGroupMedia) {
            const groupInfo = getGroupPropParts(mediaKeyShort), groupName = groupInfo.name, groupState = _optionalChain([groupContext, 'optionalAccess', _87 => _87[groupName], 'optionalAccess', _88 => _88.state]), groupPseudoKey = groupInfo.pseudo, groupMediaKey = groupInfo.media;
            if (!groupState) {
              process.env.NODE_ENV === "development" && debug && log(`No parent with group prop, skipping styles: ${groupName}`), pseudoGroups || (pseudoGroups = /* @__PURE__ */ new Set());
              return;
            }
            const componentGroupState = _optionalChain([componentState, 'access', _89 => _89.group, 'optionalAccess', _90 => _90[groupName]]);
            if (groupMediaKey) {
              mediaGroups || (mediaGroups = /* @__PURE__ */ new Set()), mediaGroups.add(groupMediaKey);
              const mediaState22 = _optionalChain([componentGroupState, 'optionalAccess', _91 => _91.media]);
              let isActive = _optionalChain([mediaState22, 'optionalAccess', _92 => _92[groupMediaKey]]);
              if (!mediaState22 && groupState.layout && (isActive = mediaKeyMatch(groupMediaKey, groupState.layout)), process.env.NODE_ENV === "development" && debug === "verbose" && log(` \u{1F3D8}\uFE0F GROUP media ${groupMediaKey} active? ${isActive}`, {
                ...mediaState22,
                usedKeys: { ...styleState.usedKeys }
              }), !isActive) {
                for (const pkey in mediaStyle)
                  applyDefaultStyle(pkey, styleState);
                return;
              }
              importanceBump = 2;
            }
            if (groupPseudoKey) {
              pseudoGroups || (pseudoGroups = /* @__PURE__ */ new Set()), pseudoGroups.add(groupName);
              const componentGroupPseudoState = _optionalChain([(componentGroupState || // fallback to context initially
              _optionalChain([groupContext, 'optionalAccess', _93 => _93[groupName], 'access', _94 => _94.state])), 'optionalAccess', _95 => _95.pseudo]), isActive = _optionalChain([componentGroupPseudoState, 'optionalAccess', _96 => _96[groupPseudoKey]]), priority2 = pseudoPriorities[groupPseudoKey];
              if (process.env.NODE_ENV === "development" && debug === "verbose" && log(
                ` \u{1F3D8}\uFE0F GROUP pseudo ${groupMediaKey} active? ${isActive}, priority ${priority2}`,
                {
                  componentGroupPseudoState: { ...componentGroupPseudoState },
                  usedKeys: { ...styleState.usedKeys }
                }
              ), !isActive) {
                for (const pkey in mediaStyle)
                  applyDefaultStyle(pkey, styleState);
                return;
              }
              importanceBump = priority2;
            }
          }
          for (const subKey in mediaStyle) {
            if (subKey === "space") {
              space = valInit.space;
              continue;
            }
            if (subKey[0] === "$") {
              if (!isActivePlatform(subKey) || !isActiveTheme(subKey, themeName))
                continue;
              for (const subSubKey in mediaStyle[subKey])
                mergeMediaStyle(subSubKey, mediaStyle[subKey][subSubKey]);
            } else
              mergeMediaStyle(subKey, mediaStyle[subKey]);
          }
        }
        return;
      }
      if (!isVariant) {
        if (isStyledContextProp)
          return;
        viewProps[key] = val;
      }
    }), process.env.NODE_ENV === "development" && debug === "verbose") {
      try {
        log(" \u2714\uFE0F expand complete", keyInit), log("style", { ...styleState.style }), log("viewProps", { ...viewProps }), log("transforms", { ...styleState.flatTransforms });
      } catch (e4) {
      }
      console.groupEnd();
    }
  }
  if (process.env.NODE_ENV === "development" && debug === "profile" && time`split-styles-propsend`, !(styleProps.noNormalize === false) && (styleState.style && (fixStyles(styleState.style), !styleProps.noExpand && !styleProps.noMergeStyle && isWeb && (!isReactNative || !animationDriver.supportsCSS) && styleToCSS(styleState.style)), styleState.flatTransforms && (styleState.style || (styleState.style = {}), mergeFlatTransforms(styleState.style, styleState.flatTransforms)), parentSplitStyles)) {
    if (shouldDoClasses)
      for (const key in parentSplitStyles.classNames) {
        const val = parentSplitStyles.classNames[key];
        styleState.style && key in styleState.style || key in classNames || (classNames[key] = val);
      }
    if (!shouldDoClasses)
      for (const key in parentSplitStyles.style)
        key in classNames || styleState.style && key in styleState.style || (styleState.style || (styleState.style = {}), styleState.style[key] = parentSplitStyles.style[key]);
  }
  if (!styleProps.noNormalize && !staticConfig.isReactNative && !staticConfig.isHOC && (!styleProps.isAnimated || animationDriver.supportsCSS) && Array.isArray(_optionalChain([styleState, 'access', _97 => _97.style, 'optionalAccess', _98 => _98.transform])) && (styleState.style.transform = transformsToString(styleState.style.transform)), !styleProps.noMergeStyle && styleState.style && shouldDoClasses) {
    let retainedStyles, shouldRetain = false;
    if (!styleState.style.$$css) {
      const atomic = getCSSStylesAtomic(styleState.style);
      for (const atomicStyle of atomic) {
        const [key, value, identifier] = atomicStyle, isAnimatedAndAnimateOnly = styleProps.isAnimated && styleProps.noClass && _optionalChain([props, 'access', _99 => _99.animateOnly, 'optionalAccess', _100 => _100.includes, 'call', _101 => _101(key)]), nonAnimatedAnimateOnly = !isAnimatedAndAnimateOnly && !styleProps.isAnimated && _optionalChain([props, 'access', _102 => _102.animateOnly, 'optionalAccess', _103 => _103.includes, 'call', _104 => _104(key)]);
        isAnimatedAndAnimateOnly ? (retainedStyles || (retainedStyles = {}), retainedStyles[key] = styleState.style[key]) : nonAnimatedAnimateOnly ? (retainedStyles || (retainedStyles = {}), retainedStyles[key] = value, shouldRetain = true) : (addStyleToInsertRules(rulesToInsert, atomicStyle), classNames[key] = identifier);
      }
      process.env.NODE_ENV === "development" && props.debug === "verbose" && (console.groupCollapsed("\u{1F539} getSplitStyles final style object"), console.info(styleState.style), console.info("retainedStyles", retainedStyles), console.groupEnd()), (shouldRetain || process.env.IS_STATIC !== "is_static") && (styleState.style = retainedStyles || {});
    }
  }
  if (isReactNative)
    viewProps.tabIndex === 0 && (_nullishCoalesce(viewProps.accessible, () => ( (viewProps.accessible = true))));
  else if (viewProps.tabIndex == null) {
    const isFocusable = _nullishCoalesce(viewProps.focusable, () => ( viewProps.accessible));
    viewProps.focusable && delete viewProps.focusable;
    const role = viewProps.role;
    isFocusable === false && (viewProps.tabIndex = "-1"), // These native elements are focusable by default
    elementType === "a" || elementType === "button" || elementType === "input" || elementType === "select" || elementType === "textarea" ? (isFocusable === false || props.accessibilityDisabled === true) && (viewProps.tabIndex = "-1") : (
      // These roles are made focusable by default
      (role === "button" || role === "checkbox" || role === "link" || role === "radio" || // @ts-expect-error (consistent with RNW)
      role === "textbox" || role === "switch") && isFocusable !== false && (viewProps.tabIndex = "0")
    ), isFocusable && (viewProps.tabIndex = "0", delete viewProps.focusable);
  }
  const styleProp = props.style;
  if (!styleProps.noMergeStyle && styleProp)
    if (isHOC)
      viewProps.style = normalizeStyle2(styleProp);
    else {
      const isArray = Array.isArray(styleProp), len = isArray ? styleProp.length : 1;
      for (let i = 0; i < len; i++) {
        const style = isArray ? styleProp[i] : styleProp;
        style && (style.$$css ? Object.assign(styleState.classNames, style) : (styleState.style || (styleState.style = {}), Object.assign(styleState.style, normalizeStyle2(style))));
      }
    }
  process.env.NODE_ENV === "development" && debug === "profile" && time`split-styles-pre-result`;
  const result = {
    space,
    hasMedia,
    fontFamily: styleState.fontFamily,
    viewProps,
    style: styleState.style,
    pseudos,
    classNames,
    rulesToInsert,
    dynamicThemeAccess,
    pseudoGroups,
    mediaGroups,
    resolvedContextVariants: styleState.resolvedContextVariants
  }, asChildExceptStyleLike = asChild === "except-style" || asChild === "except-style-web";
  if (!styleProps.noMergeStyle && !asChildExceptStyleLike) {
    const style = styleState.style;
    {
      let fontFamily = isText || isInput ? styleState.fontFamily || _optionalChain([staticConfig, 'access', _105 => _105.defaultProps, 'optionalAccess', _106 => _106.fontFamily]) : null;
      fontFamily && fontFamily[0] === "$" && (fontFamily = fontFamily.slice(1));
      const fontFamilyClassName = fontFamily ? `font_${fontFamily}` : "", groupClassName = props.group ? `t_group_${props.group}` : "", componentNameFinal = props.componentName || staticConfig.componentName, componentClassName = props.asChild || !componentNameFinal ? "" : `is_${componentNameFinal}`;
      let classList = [];
      componentClassName && classList.push(componentClassName), fontFamilyClassName && classList.push(fontFamilyClassName), classNames && classList.push(Object.values(classNames).join(" ")), groupClassName && classList.push(groupClassName), props.className && classList.push(props.className);
      const finalClassName = classList.join(" ");
      if (styleProps.isAnimated && isReactNative)
        style && (viewProps.style = style), _optionalChain([animationDriver, 'optionalAccess', _107 => _107.supportsCSS]) && (viewProps.className = finalClassName);
      else if (isReactNative) {
        let cnStyles;
        for (const name of finalClassName.split(" "))
          cnStyles || (cnStyles = { $$css: true }), cnStyles[name] = name;
        viewProps.style = cnStyles ? [...Array.isArray(style) ? style : [style], cnStyles] : [style];
      } else
        finalClassName && (viewProps.className = finalClassName), style && (viewProps.style = style);
    }
  }
  if (process.env.NODE_ENV === "development" && debug === "verbose" && isClient && isDevTools) {
    console.groupEnd(), console.groupCollapsed("\u{1F539} getSplitStyles ===>");
    try {
      const logs = {
        ...result,
        className,
        componentState,
        viewProps,
        rulesToInsert,
        parentSplitStyles
      };
      for (const key in logs)
        log(key, logs[key]);
    } catch (e5) {
    }
    console.groupEnd();
  }
  return process.env.NODE_ENV === "development" && debug === "profile" && time`split-styles-done`, result;
};
function mergeFlatTransforms(target, flatTransforms) {
  Object.entries(flatTransforms).sort(([a], [b]) => sortString(a, b)).forEach(([key, val]) => {
    mergeTransform(target, key, val, true);
  });
}
function mergeStyle(styleState, key, val, importance, disableNormalize = false) {
  const { viewProps, styleProps, staticConfig, usedKeys } = styleState;
  if (!((usedKeys[key] || 0) > importance))
    if (key in stylePropsTransform)
      styleState.flatTransforms || (styleState.flatTransforms = {}), usedKeys[key] = importance, styleState.flatTransforms[key] = val;
    else {
      const out = isWeb && !disableNormalize && !styleProps.noNormalize ? normalizeValueWithProperty(val, key) : val;
      staticConfig.accept && key in staticConfig.accept ? viewProps[key] = out : (styleState.style || (styleState.style = {}), usedKeys[key] = importance, styleState.style[key] = // if you dont do this you'll be passing props.transform arrays directly here and then mutating them
      // if theres any flatTransforms later, causing issues (mutating props is bad, in strict mode styles get borked)
      key === "transform" && Array.isArray(out) ? [...out] : out);
    }
}
var getSubStyle = (styleState, subKey, styleIn, avoidMergeTransform) => {
  const { staticConfig, conf: conf22, styleProps } = styleState, styleOut = {};
  for (let key in styleIn) {
    const val = styleIn[key];
    key = conf22.shorthands[key] || key, !(!staticConfig.isHOC && key in skipProps && !styleProps.noSkip) && propMapper(key, val, styleState, false, (skey, sval) => {
      skey in validPseudoKeys && (sval = getSubStyle(styleState, skey, sval, avoidMergeTransform)), !avoidMergeTransform && skey in stylePropsTransform ? mergeTransform(styleOut, skey, sval) : styleOut[skey] = styleProps.noNormalize ? sval : normalizeValueWithProperty(sval, key);
    });
  }
  if (!avoidMergeTransform) {
    if (Array.isArray(styleOut.transform)) {
      const parentTransform = _optionalChain([styleState, 'access', _108 => _108.style, 'optionalAccess', _109 => _109.transform]);
      parentTransform && (styleOut.transform = [...parentTransform, ...styleOut.transform]);
    }
    styleState.flatTransforms && mergeFlatTransforms(styleOut, styleState.flatTransforms);
  }
  return styleProps.noNormalize || fixStyles(styleOut), styleOut;
};
var useInsertEffectCompat = isWeb ? React4.default.useInsertionEffect || useIsomorphicLayoutEffect : () => {
};
var useSplitStyles = (a, b, c, d, e, f, g, h, i, j, k, l) => {
  const res = getSplitStyles(a, b, c, d, e, f, g, h, i, j, k, l);
  return useInsertEffectCompat(() => {
    res && insertStyleRules(res.rulesToInsert);
  }, [_optionalChain([res, 'optionalAccess', _110 => _110.rulesToInsert])]), res;
};
function addStyleToInsertRules(rulesToInsert, styleObject) {
  {
    const identifier = styleObject[StyleObjectIdentifier];
    shouldInsertStyleRules(identifier) && (updateRules(identifier, styleObject[StyleObjectRules]), rulesToInsert[identifier] = styleObject);
  }
}
function processIDRefList(idRefList) {
  return Array.isArray(idRefList) ? idRefList.join(" ") : idRefList;
}
var defaultColor = process.env.TAMAGUI_DEFAULT_COLOR || "rgba(0,0,0,0)";
var animatableDefaults = {
  ...Object.fromEntries(
    Object.entries(tokenCategories.color).map(([k, v]) => [k, defaultColor])
  ),
  opacity: 1,
  scale: 1,
  rotate: "0deg",
  rotateY: "0deg",
  rotateX: "0deg",
  x: 0,
  y: 0,
  borderRadius: 0
};
var lowercaseHyphenate = (match) => `-${match.toLowerCase()}`;
var hyphenate = (str) => str.replace(/[A-Z]/g, lowercaseHyphenate);
var mergeTransform = (obj, key, val, backwards = false) => {
  typeof obj.transform != "string" && (obj.transform || (obj.transform = []), obj.transform[backwards ? "unshift" : "push"]({
    [mapTransformKeys[key] || key]: val
  }));
};
var mapTransformKeys = {
  x: "translateX",
  y: "translateY"
};
var accessibilityRoleToWebRole = {
  adjustable: "slider",
  header: "heading",
  image: "img",
  link: "link",
  none: "presentation",
  summary: "region"
};
function passDownProp(viewProps, key, val, shouldMergeObject = false) {
  if (shouldMergeObject) {
    const next = {
      ...viewProps[key],
      ...val
    };
    delete viewProps[key], viewProps[key] = next;
  } else
    viewProps[key] = val;
}
function mergeMediaByImportance(styleState, mediaKey, key, value, isSizeMedia, importanceBump, debugProp) {
  const usedKeys = styleState.usedKeys;
  let importance = getMediaImportanceIfMoreImportant(
    mediaKey,
    key,
    styleState,
    isSizeMedia
  );
  if (importanceBump && (importance = (importance || 0) + importanceBump), process.env.NODE_ENV === "development" && debugProp === "verbose" && log(
    `mergeMediaByImportance ${key} importance usedKey ${usedKeys[key]} next ${importance}`
  ), importance === null)
    return false;
  if (key in pseudoDescriptors) {
    const descriptor = pseudoDescriptors[key], descriptorKey = descriptor.stateKey || descriptor.name;
    if (styleState.componentState[descriptorKey] === false)
      return false;
    for (const subKey in value)
      mergeStyle(styleState, subKey, value[subKey], importance);
  } else
    mergeStyle(styleState, key, value, importance);
  return true;
}
function normalizeStyle2(style) {
  const out = {};
  for (const key in style) {
    const val = style[key];
    key in stylePropsTransform ? mergeTransform(out, key, val) : out[key] = normalizeValueWithProperty(val, key);
  }
  return isWeb && Array.isArray(out.transform) && (out.transform = transformsToString(out.transform)), fixStyles(out), out;
}
function applyDefaultStyle(pkey, styleState) {
  const defaultValues = animatableDefaults[pkey];
  defaultValues != null && !(pkey in styleState.usedKeys) && (!styleState.style || !(pkey in styleState.style)) && mergeStyle(styleState, pkey, defaultValues, 1);
}

// node_modules/@tamagui/web/dist/esm/setupHooks.js
var hooks = {};

// node_modules/@tamagui/web/dist/esm/helpers/setElementProps.js
var setElementProps = (node2) => {
  _optionalChain([hooks, 'access', _111 => _111.setElementProps, 'optionalCall', _112 => _112(node2)]);
};

// node_modules/@tamagui/web/dist/esm/helpers/subscribeToContextGroup.js
var subscribeToContextGroup = (props) => {
  const { pseudoGroups, mediaGroups, groupContext } = props;
  if (pseudoGroups || mediaGroups) {
    process.env.NODE_ENV === "development" && !groupContext && console.debug("No context group found");
    const disposables = /* @__PURE__ */ new Set();
    if (pseudoGroups)
      for (const name of [...pseudoGroups])
        disposables.add(createGroupListener(name, props));
    if (mediaGroups)
      for (const name of [...mediaGroups])
        disposables.add(createGroupListener(name, props));
    return () => {
      disposables.forEach((d) => d());
    };
  }
};
var createGroupListener = (name, {
  setStateShallow,
  pseudoGroups,
  mediaGroups,
  groupContext
}) => {
  const parent = _optionalChain([groupContext, 'optionalAccess', _113 => _113[name]]);
  if (!parent)
    return () => {
    };
  const dispose = parent.subscribe(({ layout, pseudo }) => {
    setStateShallow((prev) => {
      let didChange = false;
      const group = _optionalChain([prev, 'access', _114 => _114.group, 'optionalAccess', _115 => _115[name]]) || {
        pseudo: {},
        media: {}
      };
      if (pseudo && _optionalChain([pseudoGroups, 'optionalAccess', _116 => _116.has, 'call', _117 => _117(name)]))
        group.pseudo || (group.pseudo = {}), mergeIfNotShallowEqual(group.pseudo, pseudo) !== group.pseudo && (Object.assign(group.pseudo, pseudo), didChange = true);
      else if (layout && mediaGroups) {
        group.media || (group.media = {});
        const mediaState2 = getMediaState(mediaGroups, layout), next = mergeIfNotShallowEqual(group.media, mediaState2);
        next !== group.media && (Object.assign(group.media, next), didChange = true);
      }
      return didChange ? {
        group: {
          ...prev.group,
          [name]: group
        }
      } : prev;
    });
  });
  return () => {
    dispose(), setStateShallow({
      group: {}
    });
  };
};

// node_modules/@tamagui/web/dist/esm/helpers/themeable.js


// node_modules/@tamagui/web/dist/esm/views/Theme.js


// node_modules/@tamagui/use-did-finish-ssr/dist/esm/index.js


// node_modules/@tamagui/use-did-finish-ssr/dist/esm/ClientOnly.js


var ClientOnlyContext = _react.createContext.call(void 0, false);

// node_modules/@tamagui/use-did-finish-ssr/dist/esm/index.js
var useIsClientOnly = () => React6.useContext(ClientOnlyContext);
function useDidFinishSSR() {
  return React6.useContext(ClientOnlyContext) ? true : React6.useSyncExternalStore(
    subscribe2,
    () => true,
    () => false
  );
}
var subscribe2 = () => () => {
};

// node_modules/@tamagui/web/dist/esm/views/ThemeDebug.js
var import_react_dom = _chunkTEEPPNNEjs.__toESM.call(void 0, require_react_dom(), 1);


var node;
function ThemeDebug({
  themeState,
  themeProps,
  children
}) {
  if (process.env.NODE_ENV === "development") {
    const isHydrated = useDidFinishSSR();
    if (process.env.NODE_ENV === "development" && typeof document < "u" && (node || (node = document.createElement("div"), node.style.height = "200px", node.style.overflowY = "scroll", node.style.position = "fixed", node.style.zIndex = 1e7, node.style.bottom = "30px", node.style.left = "30px", node.style.right = "30px", node.style.display = "flex", node.style.border = "1px solid #888", node.style.flexDirection = "row", node.style.background = "var(--background)")), _react.useEffect.call(void 0, () => {
      document.body.appendChild(node);
    }, []), themeProps["disable-child-theme"] || !isHydrated)
      return children;
    const parentState = themeState.parentId ? getThemeState(themeState.parentId) : null;
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
      (0, import_react_dom.createPortal)(
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "code",
          {
            style: {
              whiteSpace: "pre",
              maxWidth: 250,
              overflow: "auto",
              padding: 5
            },
            children: [
              "<Theme ",
              themeState.id,
              " />\xA0",
              JSON.stringify(
                {
                  name: themeState.name,
                  color1: themeState.theme.color1.val,
                  parentId: themeState.parentId,
                  inverses: themeState.inverses,
                  isNew: themeState.isNew,
                  themeProps: {
                    name: themeProps.name,
                    componentName: themeProps.componentName,
                    reset: themeProps.reset,
                    inverse: themeProps.inverse
                  },
                  parentState: {
                    name: _optionalChain([parentState, 'optionalAccess', _118 => _118.name]),
                    isNew: _optionalChain([parentState, 'optionalAccess', _119 => _119.isNew])
                  }
                },
                null,
                2
              )
            ]
          }
        ),
        node
      ),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { style: { color: "red" }, children: themeState.id }),
      children
    ] });
  }
  return children;
}
ThemeDebug.displayName = "ThemeDebug";

// node_modules/@tamagui/web/dist/esm/views/Theme.js

var Theme = _react.forwardRef.call(void 0, function(props, ref) {
  if (props.disable)
    return props.children;
  const { passThrough } = props, isRoot = !!props._isRoot, [_, themeState] = useThemeWithState(props, isRoot);
  let finalChildren = props["disable-child-theme"] ? _react.Children.map(
    props.children,
    (child) => passThrough ? child : _react.cloneElement.call(void 0, child, { "data-disable-theme": true })
  ) : props.children;
  if (ref)
    try {
      React4.default.Children.only(finalChildren), finalChildren = _react.cloneElement.call(void 0, finalChildren, { ref });
    } catch (e6) {
    }
  const stateRef = _react.useRef.call(void 0, {
    hasEverThemed: false
  });
  return getThemedChildren(
    themeState,
    finalChildren,
    props,
    isRoot,
    stateRef,
    passThrough
  );
});
Theme.avoidForwardRef = true;
function getThemedChildren(themeState, children, props, isRoot = false, stateRef, passThrough = false) {
  const { shallow, forceClassName } = props, state = stateRef.current;
  let shouldRenderChildrenWithTheme = state.hasEverThemed || themeState.isNew || isRoot || hasThemeUpdatingProps(props);
  if (process.env.NODE_ENV === "development" && props.debug === "visualize" && (children = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ThemeDebug, { themeState, themeProps: props, children })), !shouldRenderChildrenWithTheme)
    return children;
  children = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ThemeStateContext.Provider, { value: themeState.id, children });
  const { isInverse, name } = themeState, requiresExtraWrapper = isInverse || forceClassName;
  if (state.hasEverThemed || (state.hasEverThemed = true), (requiresExtraWrapper || // if the theme is exactly dark or light, its likely to change between dark/light
  // and that would require wrapping which would re-parent, so to avoid re-parenting do this
  themeState.name === "dark" || themeState.name === "light") && (state.hasEverThemed = "wrapped"), shallow && themeState.parentId) {
    const parentState = getThemeState(
      themeState.isNew ? themeState.id : themeState.parentId
    );
    if (!parentState)
      throw new Error("\u203C\uFE0F010");
    children = _react.Children.toArray(children).map((child) => _react.isValidElement.call(void 0, child) ? passThrough ? child : _react.cloneElement.call(void 0, 
      child,
      void 0,
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Theme, { name: parentState.name, children: child.props.children })
    ) : child);
  }
  if (process.env.NODE_ENV === "development" && !passThrough && props.debug && console.warn(" getThemedChildren", {
    requiresExtraWrapper,
    forceClassName,
    themeState,
    state,
    themeSpanProps: getThemeClassNameAndColor(themeState, props, isRoot)
  }), forceClassName === false)
    return children;
  if (isWeb) {
    const baseStyle = props.contain ? inertContainedStyle : inertStyle, { className = "", color } = passThrough ? {} : getThemeClassNameAndColor(themeState, props, isRoot);
    if (children = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "span",
      {
        className: `${className} is_Theme`,
        style: passThrough ? baseStyle : { color, ...baseStyle },
        children
      }
    ), state.hasEverThemed === "wrapped") {
      const className2 = !passThrough && requiresExtraWrapper ? `${isInverse ? name.startsWith("light") ? "t_light is_inversed" : name.startsWith("dark") ? "t_dark is_inversed" : "" : ""} ` : "";
      children = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { style: baseStyle, className: className2, children });
    }
    return children;
  }
  return children;
}
var inertStyle = {
  display: "contents"
};
var inertContainedStyle = {
  display: "contents",
  contain: "strict"
};
var empty = { className: "", color: void 0 };
function getThemeClassNameAndColor(themeState, props, isRoot = false) {
  if (!themeState.isNew && !props.forceClassName)
    return empty;
  const themeColor = _optionalChain([themeState, 'optionalAccess', _120 => _120.theme]) && themeState.isNew ? variableToString(themeState.theme.color) : "", maxInverses = getSetting("maxDarkLightNesting") || 3, themeClassName = themeState.inverses >= maxInverses ? themeState.name : themeState.name.replace(schemePrefix, ""), themeNameParts = themeClassName.split("_");
  let themeClasses = `t_${themeClassName}`;
  if (themeNameParts.length > 1) {
    const hierarchyClasses = [];
    for (let i = 1; i <= themeNameParts.length; i++)
      hierarchyClasses.push(`t_${themeNameParts.slice(0, i).join("_")}`);
    themeClasses = hierarchyClasses.join(" ");
  }
  const className = `${isRoot ? "" : "t_sub_theme"} ${themeClasses}`;
  return { color: themeColor, className };
}
var schemePrefix = /^(dark|light)_/;

// node_modules/@tamagui/web/dist/esm/helpers/themeable.js

function themeable(Component, staticConfig, optimize = false) {
  const withTheme = React4.default.forwardRef(function(props, ref) {
    const { themeInverse, theme, componentName, themeReset, ...rest } = props;
    let overriddenContextProps;
    const context = _optionalChain([staticConfig, 'optionalAccess', _121 => _121.context]);
    if (context)
      for (const key in context.props) {
        const val = props[key];
        val !== void 0 && (overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = val);
      }
    const element = (
      // @ts-expect-error its ok
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Component, { ref, ...rest, "data-disable-theme": true })
    );
    let filteredProps = null;
    const compName = componentName || _optionalChain([staticConfig, 'optionalAccess', _122 => _122.componentName]);
    if (compName && (filteredProps || (filteredProps = {}), filteredProps.componentName = compName), "debug" in props && (filteredProps || (filteredProps = {}), filteredProps.debug = props.debug), "theme" in props && (filteredProps || (filteredProps = {}), filteredProps.name = props.theme), "themeInverse" in props && (filteredProps || (filteredProps = {}), filteredProps.inverse = props.themeInverse), "themeReset" in props && (filteredProps || (filteredProps = {}), filteredProps.reset = themeReset), optimize && !filteredProps)
      return element;
    let contents = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Theme, { "disable-child-theme": true, ...filteredProps, children: element });
    if (context) {
      const Provider = context.Provider, contextValue = React4.default.useContext(context);
      contents = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Provider, { ...contextValue, ...overriddenContextProps, children: contents });
    }
    return contents;
  });
  return withTheme.displayName = `Themed(${_optionalChain([Component, 'optionalAccess', _123 => _123.displayName]) || _optionalChain([Component, 'optionalAccess', _124 => _124.name]) || "Anonymous"})`, withTheme;
}

// node_modules/@tamagui/web/dist/esm/helpers/wrapStyleTags.js

function getStyleTags(styles) {
  if (IS_REACT_19 && styles.length)
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: styles.map((styleObject) => {
      const identifier = styleObject[StyleObjectIdentifier];
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "style",
        {
          href: `t_${identifier}`,
          precedence: "default",
          suppressHydrationWarning: true,
          children: styleObject[StyleObjectRules].join(`
`)
        },
        identifier
      );
    }) });
}

// node_modules/@tamagui/web/dist/esm/hooks/useComponentState.js

var useComponentState = (props, animationDriver, staticConfig, config) => {
  const isHydrated = useDidFinishSSR(), needsHydration = !useIsClientOnly(), useAnimations = _optionalChain([animationDriver, 'optionalAccess', _125 => _125.isStub]) ? void 0 : _optionalChain([animationDriver, 'optionalAccess', _126 => _126.useAnimations]), { isHOC } = staticConfig, stateRef = _react.useRef.call(void 0, 
    // performance: avoid creating object every render
    void 0
  );
  stateRef.current || (stateRef.current = {
    startedUnhydrated: needsHydration && !isHydrated
  });
  const hasAnimationProp = !!(!isHOC && "animation" in props || props.style && hasAnimatedStyleValue(props.style)), supportsCSS = _optionalChain([animationDriver, 'optionalAccess', _127 => _127.supportsCSS]), curStateRef = stateRef.current;
  !needsHydration && hasAnimationProp && (curStateRef.hasAnimated = true);
  const willBeAnimatedClient = !!(!!(hasAnimationProp && !isHOC && useAnimations) || curStateRef.hasAnimated), willBeAnimated = !isServer && willBeAnimatedClient;
  willBeAnimated && !curStateRef.hasAnimated && (curStateRef.hasAnimated = true);
  const { disableClassName } = props, presence = !isHOC && willBeAnimated && props.animatePresence !== false && _optionalChain([animationDriver, 'optionalAccess', _128 => _128.usePresence, 'optionalCall', _129 => _129()]) || null, presenceState = _optionalChain([presence, 'optionalAccess', _130 => _130[2]]), isExiting = _optionalChain([presenceState, 'optionalAccess', _131 => _131.isPresent]) === false, isEntering = _optionalChain([presenceState, 'optionalAccess', _132 => _132.isPresent]) === true && presenceState.initial !== false, hasEnterStyle = !!props.enterStyle, hasAnimationThatNeedsHydrate = hasAnimationProp && !isHydrated && (_optionalChain([animationDriver, 'optionalAccess', _133 => _133.isReactNative]) || !supportsCSS), initialState = !isHOC && (hasEnterStyle || isEntering || hasAnimationThatNeedsHydrate || // disableClassName doesnt work server side, only client, so needs hydrate
  // this is just for a better ux, supports css variables for light/dark, media queries, etc
  disableClassName) ? (
    // on the very first render we switch all spring animation drivers to css rendering
    // this is because we need to use css variables, which they don't support to do proper SSR
    // without flickers of the wrong colors.
    // but once we do that initial hydration and we are in client side rendering mode,
    // we can avoid the extra re-render on mount
    hasEnterStyle || isEntering ? defaultComponentStateShouldEnter : defaultComponentState
  ) : defaultComponentStateMounted, disabled = isDisabled(props);
  disabled != null && (initialState.disabled = disabled);
  const states2 = _react.useState.call(void 0, initialState), state = props.forceStyle ? { ...states2[0], [props.forceStyle]: true } : states2[0], setState = states2[1];
  let isAnimated = willBeAnimated;
  isWeb && hasAnimationThatNeedsHydrate && !staticConfig.isHOC && !isHydrated && (isAnimated = false, curStateRef.willHydrate = true), disabled !== state.disabled && (disabled && Object.assign(state, defaultComponentStateMounted), state.disabled = disabled, setState((_) => ({ ...state })));
  const groupName = props.group, setStateShallow = useCreateShallowSetState(setState, props.debug);
  if (presenceState && isAnimated && isHydrated && staticConfig.variants) {
    process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(`has presenceState ${JSON.stringify(presenceState)}`);
    const { enterVariant, exitVariant, enterExitVariant, custom } = presenceState;
    isObj(custom) && Object.assign(props, custom);
    const exv = _nullishCoalesce(exitVariant, () => ( enterExitVariant)), env = _nullishCoalesce(enterVariant, () => ( enterExitVariant));
    state.unmounted && env && staticConfig.variants[env] ? (process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(`Animating presence ENTER "${env}"`), props[env] = true) : isExiting && exv && (process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(`Animating presence EXIT "${exv}"`), props[exv] = exitVariant !== enterExitVariant);
  }
  let noClass = !isWeb || !!props.forceStyle;
  if (!isHydrated)
    noClass = false;
  else if (isWeb && isHydrated) {
    const isAnimatedAndHydrated = isAnimated && isHydrated, isClassNameDisabled = !staticConfig.acceptsClassName && (config.disableSSR || !state.unmounted), isDisabledManually = disableClassName && !state.unmounted;
    (isAnimatedAndHydrated && !_optionalChain([animationDriver, 'optionalAccess', _134 => _134.classNameAnimation]) || isDisabledManually || isClassNameDisabled) && (noClass = true, process.env.NODE_ENV === "development" && props.debug === "verbose" && log("avoiding className", {
      isAnimatedAndHydrated,
      isDisabledManually,
      isClassNameDisabled
    }));
  }
  return {
    startedUnhydrated: curStateRef.startedUnhydrated,
    curStateRef,
    disabled,
    groupName,
    hasAnimationProp,
    hasEnterStyle,
    isAnimated,
    isExiting,
    isHydrated,
    presence,
    presenceState,
    setState,
    setStateShallow,
    noClass,
    state,
    stateRef,
    supportsCSS,
    willBeAnimated,
    willBeAnimatedClient
  };
};
function hasAnimatedStyleValue(style) {
  return Object.keys(style).some((k) => {
    const val = style[k];
    return val && typeof val == "object" && "_animation" in val;
  });
}
var isDisabled = (props) => props.disabled || props.passThrough || _optionalChain([props, 'access', _135 => _135.accessibilityState, 'optionalAccess', _136 => _136.disabled]) || props["aria-disabled"] || props.accessibilityDisabled || false;

// node_modules/@tamagui/web/dist/esm/views/Slot.js


var is19 = _react.version.startsWith("19.");
var Slot = _react.memo.call(void 0, 
  _react.forwardRef.call(void 0, function(props, forwardedRef) {
    const { children, ...slotProps } = props;
    if (_react.isValidElement.call(void 0, children)) {
      const mergedProps = mergeSlotProps(children, slotProps);
      return _react.cloneElement.call(void 0, 
        children,
        children.type.avoidForwardRef ? mergedProps : {
          ...mergedProps,
          ref: composeRefs(
            forwardedRef,
            is19 ? children.props.ref : children.ref
          )
        }
      );
    }
    return _react.Children.count(children) > 1 ? _react.Children.only(null) : null;
  })
);
var Slottable = ({ children }) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children });
Slottable.displayName = "Slottable";
var pressMap = isWeb ? {
  onPress: "onClick",
  onPressOut: "onMouseUp",
  onPressIn: "onMouseDown"
} : {};
function mergeSlotProps(child, slotProps) {
  const childProps = child.props, overrideProps = { ...childProps }, isHTMLChild = typeof child.type == "string";
  if (isHTMLChild)
    for (const key in pressMap)
      key in slotProps && (slotProps[pressMap[key]] = slotProps[key], delete slotProps[key]);
  for (let propName in childProps) {
    const slotPropValue = slotProps[propName], childPropValue = childProps[propName];
    isHTMLChild && propName in pressMap && (propName = pressMap[propName], delete overrideProps[propName]), handleRegex.test(propName) ? overrideProps[propName] = composeEventHandlers(childPropValue, slotPropValue) : propName === "style" ? overrideProps[propName] = { ...slotPropValue, ...childPropValue } : propName === "className" && (overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" "));
  }
  return { ...slotProps, ...overrideProps };
}
var handleRegex = /^on[A-Z]/;

// node_modules/@tamagui/web/dist/esm/createComponent.js

var time2;
var debugKeyListeners;
var startVisualizer;
var componentSetStates = /* @__PURE__ */ new Set();
var avoidReRenderKeys = /* @__PURE__ */ new Set([
  "hover",
  "press",
  "pressIn",
  "group",
  "focus",
  "focusWithin",
  "media",
  "group"
]);
if (typeof window < "u") {
  const cancelTouches = () => {
    componentSetStates.forEach(
      (setState) => setState((prev) => prev.press || prev.pressIn ? {
        ...prev,
        press: false,
        pressIn: false
      } : prev)
    ), componentSetStates.clear();
  };
  addEventListener("mouseup", cancelTouches), addEventListener("touchend", cancelTouches), addEventListener("touchcancel", cancelTouches), process.env.NODE_ENV === "development" && (startVisualizer = () => {
    const devVisualizerConfig = _optionalChain([devConfig, 'optionalAccess', _137 => _137.visualizer]);
    if (devVisualizerConfig && !globalThis.__tamaguiDevVisualizer) {
      let show = function(val) {
        clearTimeout(tm), isShowing = val, _optionalChain([debugKeyListeners, 'optionalAccess', _138 => _138.forEach, 'call', _139 => _139((l) => l(val))]), !val && resizeListener && (window.removeEventListener("resize", resizeListener), resizeListener = null);
      }, cancelShow = function() {
        clearTimeout(tm), resizeListener && (window.removeEventListener("resize", resizeListener), resizeListener = null);
      };
      globalThis.__tamaguiDevVisualizer = true, debugKeyListeners = /* @__PURE__ */ new Set();
      let tm, isShowing = false, resizeListener = null;
      const options = {
        key: "Alt",
        delay: 800,
        ...typeof devVisualizerConfig == "object" ? devVisualizerConfig : {}
      };
      window.addEventListener("blur", () => {
        show(false);
      }), window.addEventListener("keydown", ({ key, metaKey, defaultPrevented }) => {
        clearTimeout(tm), !defaultPrevented && (metaKey || key === options.key && (resizeListener || (resizeListener = () => cancelShow(), window.addEventListener("resize", resizeListener)), tm = setTimeout(() => {
          show(true);
        }, options.delay)));
      }), window.addEventListener("keyup", ({ defaultPrevented }) => {
        defaultPrevented || (cancelShow(), isShowing && show(false));
      });
    }
  });
}
var BaseText;
var BaseView;
var lastInteractionWasKeyboard = { value: false };
isWeb && typeof document < "u" && (document.addEventListener("keydown", () => {
  lastInteractionWasKeyboard.value || (lastInteractionWasKeyboard.value = true);
}), document.addEventListener("mousedown", () => {
  lastInteractionWasKeyboard.value && (lastInteractionWasKeyboard.value = false);
}), document.addEventListener("mousemove", () => {
  lastInteractionWasKeyboard.value && (lastInteractionWasKeyboard.value = false);
}));
function createComponent(staticConfig) {
  const { componentName } = staticConfig;
  let config = null, defaultProps = staticConfig.defaultProps;
  onConfiguredOnce((conf4) => {
    if (config = conf4, componentName) {
      const defaultForComponent = _optionalChain([conf4, 'access', _140 => _140.defaultProps, 'optionalAccess', _141 => _141[componentName]]);
      defaultForComponent && (defaultProps = { ...defaultForComponent, ...defaultProps });
    }
  });
  const { Component, isText, isZStack, isHOC } = staticConfig;
  process.env.NODE_ENV === "development" && _optionalChain([staticConfig, 'access', _142 => _142.defaultProps, 'optionalAccess', _143 => _143.debug]) && process.env.IS_STATIC !== "is_static" && log(`\u{1F41B} [${componentName || "Component"}]`, {
    staticConfig,
    defaultProps,
    defaultPropsKeyOrder: defaultProps ? Object.keys(defaultProps) : []
  });
  const component = React4.default.forwardRef((propsIn, forwardedRef) => {
    var _a;
    const internalID = process.env.NODE_ENV === "development" ? React4.default.useId() : "";
    process.env.NODE_ENV === "development" && startVisualizer && (startVisualizer(), startVisualizer = void 0), process.env.NODE_ENV === "test" && propsIn["data-test-renders"] && (_nullishCoalesce((_a = propsIn["data-test-renders"]).current, () => ( (_a.current = 0))), propsIn["data-test-renders"].current += 1);
    const { context, isReactNative } = staticConfig, debugProp = propsIn.debug, styledContextValue = context ? React4.default.useContext(context) : void 0;
    let overriddenContextProps = null;
    !process.env.TAMAGUI_IS_CORE_NODE && process.env.NODE_ENV === "development" && debugProp === "profile" && !time2 && (time2 = (init_esm(), _chunkTEEPPNNEjs.__toCommonJS.call(void 0, esm_exports)).timer().start(), globalThis.time = time2), process.env.NODE_ENV === "development" && time2 && time2`non-tamagui time (ignore)`;
    let props = propsIn;
    if (styledContextValue || defaultProps) {
      const [nextProps, overrides] = mergeComponentProps(
        defaultProps,
        styledContextValue,
        propsIn
      );
      nextProps && (props = nextProps), overriddenContextProps = overrides;
    }
    const componentName2 = props.componentName || staticConfig.componentName;
    process.env.NODE_ENV === "development" && isClient && React4.default.useEffect(() => {
      let node2, overlay = null;
      const remove = () => {
        if (overlay)
          try {
            _optionalChain([overlay, 'access', _144 => _144.parentNode, 'optionalAccess', _145 => _145.removeChild, 'call', _146 => _146(overlay)]), overlay = null;
          } catch (e7) {
          }
      }, debugVisualizerHandler = (show = false) => {
        if (node2 = stateRef.current.host, !!node2)
          if (show) {
            overlay || (overlay = document.createElement("span"), overlay.style.inset = "0px", overlay.style.zIndex = "1000000", overlay.style.position = "absolute", overlay.style.borderColor = "red", overlay.style.borderWidth = "1px", overlay.style.borderStyle = "dotted");
            const dataAt = node2.getAttribute("data-at") || "", dataIn = node2.getAttribute("data-in") || "", tooltip = document.createElement("span");
            tooltip.style.position = "absolute", tooltip.style.top = "0px", tooltip.style.left = "0px", tooltip.style.padding = "3px", tooltip.style.background = "rgba(0,0,0,0.75)", tooltip.style.color = "rgba(255,255,255,1)", tooltip.style.fontSize = "12px", tooltip.style.lineHeight = "12px", tooltip.style.fontFamily = "monospace", tooltip.innerText = `${componentName2 || ""} ${dataAt} ${dataIn}`.trim(), overlay.appendChild(tooltip), node2.appendChild(overlay);
          } else
            remove();
      };
      return debugKeyListeners || (debugKeyListeners = /* @__PURE__ */ new Set()), debugKeyListeners.add(debugVisualizerHandler), () => {
        remove(), _optionalChain([debugKeyListeners, 'optionalAccess', _147 => _147.delete, 'call', _148 => _148(debugVisualizerHandler)]);
      };
    }, [componentName2]);
    const componentContext = React4.default.useContext(ComponentContext), groupContextParent = React4.default.useContext(GroupContext), animationDriver = componentContext.animationDriver, useAnimations = _optionalChain([animationDriver, 'optionalAccess', _149 => _149.useAnimations]), componentState = useComponentState(
      props,
      _optionalChain([animationDriver, 'optionalAccess', _150 => _150.isStub]) ? null : animationDriver,
      staticConfig,
      config
    ), {
      disabled,
      groupName,
      hasAnimationProp,
      hasEnterStyle,
      isAnimated,
      isExiting,
      isHydrated,
      presence,
      presenceState,
      setState,
      noClass,
      state,
      stateRef,
      supportsCSS,
      willBeAnimated,
      willBeAnimatedClient,
      startedUnhydrated
    } = componentState;
    hasAnimationProp && _optionalChain([animationDriver, 'optionalAccess', _151 => _151.avoidReRenders]) && useIsomorphicLayoutEffect(() => {
      const pendingState = stateRef.current.nextState;
      pendingState && (stateRef.current.nextState = void 0, componentState.setStateShallow(pendingState));
    });
    const allGroupContexts = _react.useMemo.call(void 0, () => {
      if (!groupName || props.passThrough)
        return groupContextParent;
      const listeners2 = /* @__PURE__ */ new Set();
      return _optionalChain([stateRef, 'access', _152 => _152.current, 'access', _153 => _153.group, 'optionalAccess', _154 => _154.listeners, 'optionalAccess', _155 => _155.clear, 'call', _156 => _156()]), stateRef.current.group = {
        listeners: listeners2,
        emit(state2) {
          listeners2.forEach((l) => l(state2));
        },
        subscribe(cb) {
          return listeners2.add(cb), listeners2.size === 1 && setStateShallow({ hasDynGroupChildren: true }), () => {
            listeners2.delete(cb), listeners2.size === 0 && setStateShallow({ hasDynGroupChildren: false });
          };
        }
      }, {
        ...groupContextParent,
        [groupName]: {
          state: {
            pseudo: defaultComponentStateMounted
          },
          subscribe: (listener) => {
            const dispose = _optionalChain([stateRef, 'access', _157 => _157.current, 'access', _158 => _158.group, 'optionalAccess', _159 => _159.subscribe, 'call', _160 => _160(listener)]);
            return () => {
              _optionalChain([dispose, 'optionalCall', _161 => _161()]);
            };
          }
        }
      };
    }, [stateRef, groupName, groupContextParent]);
    let setStateShallow = componentState.setStateShallow;
    process.env.NODE_ENV === "development" && time2 && time2`use-state`;
    const hasTextAncestor = !!(isWeb && isText && componentContext.inText), isTaggable = !Component || typeof Component == "string", tagProp = props.tag, element = isWeb && isTaggable && tagProp || Component, BaseTextComponent = BaseText || element || "span", BaseViewComponent = BaseView || element || (hasTextAncestor ? "span" : "div");
    let elementType = isText ? BaseTextComponent : BaseViewComponent;
    animationDriver && isAnimated && // this should really be behind another prop as it's not really related to
    // "needsWebStyles" basically with motion we just animate a plain div, but
    // we still have animated.View/Text for Sheet which wants to control
    // things declaratively
    !animationDriver.needsWebStyles && (elementType = animationDriver[isText ? "Text" : "View"] || elementType);
    const disableTheme = props["data-disable-theme"] || isHOC;
    process.env.NODE_ENV === "development" && time2 && time2`theme-props`, props.themeShallow && (stateRef.current.themeShallow = true);
    const themeStateProps = {
      componentName: componentName2,
      disable: disableTheme,
      shallow: stateRef.current.themeShallow,
      debug: debugProp
    };
    if ("themeInverse" in props && (themeStateProps.inverse = props.themeInverse), "theme" in props && (themeStateProps.name = props.theme), typeof stateRef.current.isListeningToTheme == "boolean" && (themeStateProps.needsUpdate = () => !!stateRef.current.isListeningToTheme), process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile") {
      const name = `${componentName2 || _optionalChain([Component, 'optionalAccess', _162 => _162.displayName]) || _optionalChain([Component, 'optionalAccess', _163 => _163.name]) || "[Unnamed Component]"}`, type = (hasEnterStyle ? "(hasEnter)" : " ") + (isAnimated ? "(animated)" : " ") + (isReactNative ? "(rnw)" : " ") + (noClass ? "(noClass)" : " ") + (state.press || state.pressIn ? "(PRESSED)" : " ") + (state.hover ? "(HOVERED)" : " ") + (state.focus ? "(FOCUSED)" : " ") + (state.focusWithin ? "(WITHIN FOCUSED)" : " ") + (_optionalChain([presenceState, 'optionalAccess', _164 => _164.isPresent]) === false ? "(EXIT)" : ""), dataIs = propsIn["data-is"] || "", banner = `<${name} /> ${internalID} ${dataIs ? ` ${dataIs}` : ""} ${type.trim()} (hydrated: ${isHydrated}) (unmounted: ${state.unmounted})`, ch = propsIn.children;
      let childLog = typeof ch == "string" ? ch.length > 4 ? ch.slice(0, 4) + "..." : ch : "";
      childLog.length && (childLog = `(children: ${childLog})`), isWeb ? (console.info(`%c ${banner}`, "background: green; color: white;"), isServer ? log({ noClass, isAnimated, isWeb, supportsCSS }) : (console.groupEnd(), console.groupCollapsed(`${childLog} [inspect props, state, context \u{1F447}]`), log("props in:", propsIn), log("final props:", props, Object.keys(props)), log({ state, staticConfig, elementType, themeStateProps }), log({
        context,
        overriddenContextProps,
        componentContext
      }), log({ presence, isAnimated, isHOC, hasAnimationProp, useAnimations }), console.groupEnd())) : (console.info(
        `

------------------------------
${banner}
------------------------------
`
      ), log("children:", props.children), log({ overriddenContextProps, styledContextValue }), log({ noClass, isAnimated, isWeb, supportsCSS }));
    }
    process.env.NODE_ENV === "development" && time2 && time2`pre-theme-media`;
    const [theme, themeState] = useThemeWithState(themeStateProps);
    process.env.NODE_ENV === "development" && time2 && time2`theme`, elementType = Component || elementType;
    const isStringElement = typeof elementType == "string", mediaState2 = useMedia(componentContext, debugProp);
    setDidGetVariableValue(false), process.env.NODE_ENV === "development" && time2 && time2`media`;
    const resolveValues = (
      // if HOC + mounted + has animation prop, resolve as value so it passes non-variable to child
      isAnimated && !supportsCSS || isHOC && state.unmounted == false && hasAnimationProp ? "value" : "auto"
    ), styleProps = {
      mediaState: mediaState2,
      noClass,
      resolveValues,
      isExiting,
      isAnimated,
      willBeAnimated,
      styledContext: styledContextValue
    }, themeName = _optionalChain([themeState, 'optionalAccess', _165 => _165.name]) || "";
    process.env.NODE_ENV === "development" && time2 && time2`split-styles-prepare`;
    const splitStyles = useSplitStyles(
      props,
      staticConfig,
      theme,
      themeName,
      state,
      styleProps,
      null,
      componentContext,
      allGroupContexts,
      elementType,
      startedUnhydrated,
      debugProp
    ), isPassthrough = !splitStyles;
    let contextForOverride = staticConfig.context;
    if (_optionalChain([splitStyles, 'optionalAccess', _166 => _166.resolvedContextVariants])) {
      const contextForVariants = staticConfig.context || _optionalChain([staticConfig, 'access', _167 => _167.parentStaticConfig, 'optionalAccess', _168 => _168.context]);
      if (contextForVariants) {
        for (const key in splitStyles.resolvedContextVariants)
          overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = splitStyles.resolvedContextVariants[key];
        staticConfig.context || (contextForOverride = contextForVariants);
      }
    }
    const groupContext = groupName && _optionalChain([allGroupContexts, 'optionalAccess', _169 => _169[groupName]]) || null;
    if (!isPassthrough && groupContext && // avoids onLayout if we don't need it
    props.containerType !== "normal") {
      const groupState = _optionalChain([groupContext, 'optionalAccess', _170 => _170.state]);
      groupState && groupState.layout === void 0 && (_optionalChain([splitStyles, 'access', _171 => _171.style, 'optionalAccess', _172 => _172.width]) || _optionalChain([splitStyles, 'access', _173 => _173.style, 'optionalAccess', _174 => _174.height])) && (groupState.layout = {
        width: fromPx(splitStyles.style.width),
        height: fromPx(splitStyles.style.height)
      });
    }
    if (!isPassthrough && (hasAnimationProp || groupName) && _optionalChain([animationDriver, 'optionalAccess', _175 => _175.avoidReRenders])) {
      let updateGroupListeners = function() {
        const updatedState = stateRef.current.nextState;
        if (groupContext) {
          const {
            group,
            hasDynGroupChildren,
            unmounted,
            animation,
            ...childrenGroupState
          } = updatedState;
          notifyGroupSubscribers(
            groupContext,
            stateRef.current.group || null,
            childrenGroupState
          );
        }
      };
      const ogSetStateShallow = setStateShallow;
      stateRef.current.updateStyleListener = () => {
        const updatedState = stateRef.current.nextState || state, mediaState22 = stateRef.current.nextMedia, nextStyles = getSplitStyles(
          props,
          staticConfig,
          theme,
          themeName,
          updatedState,
          mediaState22 ? { ...styleProps, mediaState: mediaState22 } : styleProps,
          null,
          componentContext,
          allGroupContexts,
          elementType,
          startedUnhydrated,
          debugProp
        ), useStyleListener = stateRef.current.useStyleListener;
        _optionalChain([useStyleListener, 'optionalCall', _176 => _176(_optionalChain([nextStyles, 'optionalAccess', _177 => _177.style]) || {})]);
      }, componentContext.mediaEmit || (componentContext.mediaEmit = (next) => {
        stateRef.current.nextMedia = next, _optionalChain([stateRef, 'access', _178 => _178.current, 'access', _179 => _179.updateStyleListener, 'optionalCall', _180 => _180()]);
      }), stateRef.current.setStateShallow = (nextOrGetNext) => {
        const prev = stateRef.current.nextState || state, next = typeof nextOrGetNext == "function" ? nextOrGetNext(prev) : nextOrGetNext;
        if (next === prev || isEqualShallow(prev, next))
          return;
        const canAvoidReRender = Object.keys(next).every(
          (key) => avoidReRenderKeys.has(key)
        ), updatedState = {
          ...prev,
          ...next
        };
        stateRef.current.nextState = updatedState, canAvoidReRender ? (process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile" && (console.groupCollapsed("[\u26A1\uFE0F] avoid setState", componentName2, next, {
          updatedState,
          props
        }), console.info(stateRef.current.host), console.groupEnd()), updateGroupListeners(), _optionalChain([stateRef, 'access', _181 => _181.current, 'access', _182 => _182.updateStyleListener, 'optionalCall', _183 => _183()])) : (process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile" && console.info("[\u{1F40C}] re-render", { canAvoidReRender, next }), ogSetStateShallow(next));
      }, setStateShallow = (state2) => {
        _optionalChain([stateRef, 'access', _184 => _184.current, 'access', _185 => _185.setStateShallow, 'optionalCall', _186 => _186(state2)]);
      };
    }
    process.env.NODE_ENV === "development" && time2 && time2`split-styles`, splitStyles && (props.group && props.untilMeasured === "hide" && !stateRef.current.hasMeasured && (splitStyles.style || (splitStyles.style = {}), splitStyles.style.opacity = 0), splitStyles.dynamicThemeAccess != null && (stateRef.current.isListeningToTheme = splitStyles.dynamicThemeAccess));
    const hasRuntimeMediaKeys = _optionalChain([splitStyles, 'optionalAccess', _187 => _187.hasMedia]) && splitStyles.hasMedia !== true, shouldListenForMedia = didGetVariableValue() || hasRuntimeMediaKeys || noClass && _optionalChain([splitStyles, 'optionalAccess', _188 => _188.hasMedia]) === true, mediaListeningKeys = hasRuntimeMediaKeys ? splitStyles.hasMedia : null;
    process.env.NODE_ENV === "development" && debugProp === "verbose" && console.info("useMedia() createComponent", shouldListenForMedia, mediaListeningKeys), setMediaShouldUpdate(componentContext, shouldListenForMedia, mediaListeningKeys);
    const {
      viewProps: viewPropsIn,
      pseudos,
      style: splitStylesStyle,
      classNames,
      space,
      pseudoGroups,
      mediaGroups
    } = splitStyles || {}, propsWithAnimation = props, {
      asChild,
      children,
      themeShallow,
      spaceDirection: _spaceDirection,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onMouseUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      separator,
      // ignore from here on out
      passThrough,
      forceStyle: _forceStyle,
      // @ts-ignore  for next/link compat etc
      onClick,
      theme: _themeProp,
      ...nonTamaguiProps
    } = viewPropsIn || {};
    let viewProps = nonTamaguiProps;
    !isTaggable && props.forceStyle && (viewProps.forceStyle = props.forceStyle), isHOC && (typeof _themeProp < "u" && (viewProps.theme = _themeProp), typeof passThrough < "u" && (viewProps.passThrough = passThrough)), tagProp && elementType.acceptTagProp && (viewProps.tag = tagProp);
    let animationStyles;
    const shouldUseAnimation = (
      // if it supports css vars we run it on server too to get matching initial style
      (supportsCSS ? willBeAnimatedClient : willBeAnimated) && useAnimations && !isHOC
    );
    let animatedRef;
    if (shouldUseAnimation) {
      const useStyleEmitter = _optionalChain([animationDriver, 'optionalAccess', _189 => _189.avoidReRenders]) ? (listener) => {
        stateRef.current.useStyleListener = listener;
      } : void 0, animations = useAnimations({
        props: propsWithAnimation,
        // if hydrating, send empty style
        style: splitStylesStyle || {},
        // @ts-ignore
        styleState: splitStyles,
        useStyleEmitter,
        presence,
        componentState: state,
        styleProps,
        theme,
        pseudos: pseudos || null,
        staticConfig,
        stateRef
      });
      animations && (animations.ref && (animatedRef = animations.ref), isHydrated && animations && (animationStyles = animations.style, viewProps.style = animationStyles, animations.className && (viewProps.className = `${state.unmounted === "should-enter" ? "t_unmounted " : ""}${viewProps.className || ""} ${animations.className}`))), process.env.NODE_ENV === "development" && time2 && time2`animations`;
    }
    process.env.NODE_ENV === "development" && props.untilMeasured && !props.group && console.warn(
      `You set the untilMeasured prop without setting group. This doesn't work, be sure to set untilMeasured on the parent that sets group, not the children that use the $group- prop.

If you meant to do this, you can disable this warning - either change untilMeasured and group at the same time, or do group={conditional ? 'name' : undefined}`
    ), process.env.NODE_ENV === "development" && time2 && time2`destructure`, !isPassthrough && groupContext && // avoids onLayout if we don't need it
    props.containerType !== "normal" && (nonTamaguiProps.onLayout = composeEventHandlers(
      nonTamaguiProps.onLayout,
      (e) => {
        const layout = e.nativeEvent.layout;
        groupContext.state.layout = layout, _optionalChain([stateRef, 'access', _190 => _190.current, 'access', _191 => _191.group, 'optionalAccess', _192 => _192.emit, 'call', _193 => _193({
          layout
        })]), !stateRef.current.hasMeasured && props.untilMeasured === "hide" && setState((prev) => ({ ...prev })), stateRef.current.hasMeasured = true;
      }
    )), viewProps = _optionalChain([hooks, 'access', _194 => _194.usePropsTransform, 'optionalCall', _195 => _195(
      elementType,
      nonTamaguiProps,
      stateRef,
      stateRef.current.willHydrate
    )]) || nonTamaguiProps, stateRef.current.composedRef || (stateRef.current.composedRef = composeRefs(
      (x) => stateRef.current.host = x,
      forwardedRef,
      setElementProps,
      animatedRef
    )), viewProps.ref = stateRef.current.composedRef, process.env.NODE_ENV === "development" && !isReactNative && !isText && isWeb && !isHOC && React4.default.Children.toArray(props.children).forEach((item) => {
      typeof item == "string" && item !== `
` && console.error(
        `Unexpected text node: ${item}. A text node cannot be a child of a <${staticConfig.componentName || propsIn.tag || "View"}>.`,
        props
      );
    }), process.env.NODE_ENV === "development" && time2 && time2`events-hooks`;
    const unPress = () => {
      setStateShallow({ press: false, pressIn: false });
    };
    process.env.NODE_ENV === "development" && isWeb && useIsomorphicLayoutEffect(() => {
      if (debugProp === "verbose") {
        let cssStyleDeclarationToObject = function(style) {
          const styleObject = {};
          for (let i = 0; i < style.length; i++) {
            let prop = style[i];
            styleObject[prop] = style.getPropertyValue(prop);
          }
          return styleObject;
        };
        const computed = stateRef.current.host ? cssStyleDeclarationToObject(
          getComputedStyle(stateRef.current.host)
        ) : {};
        console.groupCollapsed(`Rendered > (opacity: ${computed.opacity})`), console.warn(stateRef.current.host), console.warn(computed), console.groupEnd();
      }
    }), useIsomorphicLayoutEffect(() => {
      if (state.unmounted === true && hasEnterStyle) {
        setStateShallow({ unmounted: "should-enter" });
        return;
      }
      let tm;
      if (state.unmounted) {
        if (_optionalChain([animationDriver, 'optionalAccess', _196 => _196.supportsCSS]) || isAndroid)
          return tm = setTimeout(() => {
            setStateShallow({ unmounted: false });
          }), () => clearTimeout(tm);
        setStateShallow({ unmounted: false });
        return;
      }
      return () => {
        componentSetStates.delete(setState);
      };
    }, [state.unmounted, disabled]), useIsomorphicLayoutEffect(() => {
      if (!disabled && !(!pseudoGroups && !mediaGroups) && allGroupContexts)
        return subscribeToContextGroup({
          groupContext: allGroupContexts,
          setStateShallow,
          mediaGroups,
          pseudoGroups
        });
    }, [
      allGroupContexts,
      disabled,
      pseudoGroups ? objectIdentityKey(pseudoGroups) : 0,
      mediaGroups ? objectIdentityKey(mediaGroups) : 0
    ]);
    const groupEmitter = stateRef.current.group;
    useIsomorphicLayoutEffect(() => {
      !groupContext || !groupEmitter || notifyGroupSubscribers(groupContext, groupEmitter, state);
    }, [groupContext, groupEmitter, state]);
    const runtimePressStyle = !disabled && noClass && _optionalChain([pseudos, 'optionalAccess', _197 => _197.pressStyle]), runtimeFocusStyle = !disabled && noClass && _optionalChain([pseudos, 'optionalAccess', _198 => _198.focusStyle]), runtimeFocusVisibleStyle = !disabled && noClass && _optionalChain([pseudos, 'optionalAccess', _199 => _199.focusVisibleStyle]), attachFocus = !!(runtimePressStyle || runtimeFocusStyle || runtimeFocusVisibleStyle || onFocus || onBlur || componentContext.setParentFocusState), hasDynamicGroupChildren = !!(groupName && state.hasDynGroupChildren), attachPress = !!(hasDynamicGroupChildren || runtimePressStyle || onPress || onPressOut || onPressIn || onMouseDown || onMouseUp || onLongPress || onClick || _optionalChain([pseudos, 'optionalAccess', _200 => _200.focusVisibleStyle])), runtimeHoverStyle = !disabled && noClass && _optionalChain([pseudos, 'optionalAccess', _201 => _201.hoverStyle]), needsHoverState = !!(hasDynamicGroupChildren || runtimeHoverStyle), attachHover = isWeb && !!(hasDynamicGroupChildren || needsHoverState || onMouseEnter || onMouseLeave), shouldAttach = !disabled && !props.asChild && !!(attachFocus || attachPress || attachHover || runtimePressStyle || runtimeHoverStyle || runtimeFocusStyle), needsPressState = !!(hasDynamicGroupChildren || runtimePressStyle);
    process.env.NODE_ENV === "development" && time2 && time2`events-setup`, process.env.NODE_ENV === "development" && debugProp === "verbose" && log("\u{1FAA9} events()", {
      runtimeFocusStyle,
      runtimePressStyle,
      runtimeHoverStyle,
      runtimeFocusVisibleStyle,
      attachPress,
      attachFocus,
      attachHover,
      shouldAttach,
      needsHoverState,
      pseudos
    });
    const events = shouldAttach ? {
      onPressOut: attachPress ? (e) => {
        unPress(), _optionalChain([onPressOut, 'optionalCall', _202 => _202(e)]), _optionalChain([onMouseUp, 'optionalCall', _203 => _203(e)]);
      } : void 0,
      ...(attachHover || attachPress) && {
        onMouseEnter: (e) => {
          const next = {};
          needsHoverState && (next.hover = true), needsPressState && state.pressIn && (next.press = true), setStateShallow(next), _optionalChain([onHoverIn, 'optionalCall', _204 => _204(e)]), _optionalChain([onMouseEnter, 'optionalCall', _205 => _205(e)]);
        },
        onMouseLeave: (e) => {
          const next = {};
          needsHoverState && (next.hover = false), needsPressState && (next.press = false, next.pressIn = false), setStateShallow(next), _optionalChain([onHoverOut, 'optionalCall', _206 => _206(e)]), _optionalChain([onMouseLeave, 'optionalCall', _207 => _207(e)]);
        }
      },
      onPressIn: attachPress ? (e) => {
        needsPressState && setStateShallow({
          press: true,
          pressIn: true
        }), _optionalChain([onPressIn, 'optionalCall', _208 => _208(e)]), _optionalChain([onMouseDown, 'optionalCall', _209 => _209(e)]), isWeb && componentSetStates.add(setState);
      } : void 0,
      onPress: attachPress ? (e) => {
        unPress(), isWeb && _optionalChain([onClick, 'optionalCall', _210 => _210(e)]), _optionalChain([onPress, 'optionalCall', _211 => _211(e)]), _optionalChain([onLongPress, 'optionalCall', _212 => _212(e)]);
      } : void 0,
      ...attachFocus && {
        onFocus: (e) => {
          const next = {};
          componentContext.setParentFocusState && (next.focusWithin = true), _optionalChain([pseudos, 'optionalAccess', _213 => _213.focusVisibleStyle]) && lastInteractionWasKeyboard.value ? next.focusVisible = true : next.focus = true, setStateShallow(next), _optionalChain([onFocus, 'optionalCall', _214 => _214(e)]);
        },
        onBlur: (e) => {
          componentContext.setParentFocusState && componentContext.setParentFocusState({ focusWithin: false }), setStateShallow({
            focus: false,
            focusVisible: false,
            focusWithin: false
          }), _optionalChain([onBlur, 'optionalCall', _215 => _215(e)]);
        }
      }
    } : null;
    events && !isReactNative && Object.assign(viewProps, getWebEvents(events)), process.env.NODE_ENV === "development" && time2 && time2`events`, process.env.NODE_ENV === "development" && debugProp === "verbose" && log("events", { events, attachHover, attachPress }), _optionalChain([hooks, 'access', _216 => _216.useEvents, 'optionalCall', _217 => _217(viewProps, events, splitStyles, setStateShallow, staticConfig)]);
    const direction = props.spaceDirection || "both";
    process.env.NODE_ENV === "development" && time2 && time2`hooks`;
    let content = !children || asChild || !splitStyles ? children : spacedChildren({
      separator,
      children,
      space,
      direction,
      isZStack,
      debug: debugProp
    });
    if (asChild) {
      elementType = Slot;
      {
        const passEvents = getWebEvents(
          {
            onPress,
            onLongPress,
            onPressIn,
            onPressOut,
            onMouseUp,
            onMouseDown,
            onMouseEnter,
            onMouseLeave
          },
          asChild === "web" || asChild === "except-style-web"
        );
        Object.assign(viewProps, passEvents);
      }
    }
    process.env.NODE_ENV === "development" && time2 && time2`spaced-as-child`, isPassthrough && (content = propsIn.children, elementType = BaseViewComponent, viewProps = {
      style: {
        display: "contents"
      }
    });
    let useChildrenResult;
    hooks.useChildren && (useChildrenResult = hooks.useChildren(elementType, content, viewProps)), process.env.NODE_ENV === "development" && time2 && time2`use-children`, useChildrenResult ? content = useChildrenResult : content = React4.default.createElement(elementType, viewProps, content);
    const ResetPresence = _optionalChain([config, 'optionalAccess', _218 => _218.animations, 'optionalAccess', _219 => _219.ResetPresence]), needsReset = !!// not when passing down to child
    (!asChild && // not when passThrough
    splitStyles && // not when HOC
    !isHOC && ResetPresence && willBeAnimated && (hasEnterStyle || presenceState)), hasEverReset = stateRef.current.hasEverResetPresence;
    if (needsReset && !hasEverReset && (stateRef.current.hasEverResetPresence = true), (needsReset || hasEverReset) && ResetPresence && (content = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ResetPresence, { disabled: !needsReset, children: content })), process.env.NODE_ENV === "development" && time2 && time2`create-element`, "focusWithinStyle" in propsIn && (content = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      ComponentContext.Provider,
      {
        ...componentContext,
        setParentFocusState: setStateShallow,
        children: content
      }
    )), "group" in props && (content = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, GroupContext.Provider, { value: allGroupContexts, children: content })), process.env.NODE_ENV === "development" && time2 && time2`group-context`, content = disableTheme || !splitStyles ? content : getThemedChildren(themeState, content, themeStateProps, false, stateRef), process.env.NODE_ENV === "development" && time2 && time2`themed-children`, isReactNative && !asChild && (content = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "span",
      {
        className: "_dsp_contents",
        ...!isPassthrough && isHydrated && events && getWebEvents(events),
        children: content
      }
    )), overriddenContextProps && contextForOverride) {
      const Provider = contextForOverride.Provider;
      for (const key in styledContextValue)
        key in overriddenContextProps || (overriddenContextProps[key] = styledContextValue[key]);
      debugProp && console.info("overriddenContextProps", overriddenContextProps), content = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Provider, { __disableMergeDefaultValues: true, ...overriddenContextProps, children: content });
    }
    if (process.env.NODE_ENV === "development" && time2 && time2`context-override`, startedUnhydrated && splitStyles && (content = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
      content,
      isHydrated ? null : getStyleTags(Object.values(splitStyles.rulesToInsert))
    ] })), process.env.NODE_ENV === "development" && time2 && time2`style-tags`, process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile") {
      const title = `render <${typeof elementType == "string" ? elementType : "Component"} /> (${internalID}) with props`;
      if (isWeb) {
        console.groupCollapsed(title);
        try {
          log("viewProps", viewProps), log("children", content), typeof window < "u" && log({
            propsIn,
            props,
            attachPress,
            animationStyles,
            classNames,
            content,
            defaultProps,
            elementType,
            events,
            isAnimated,
            hasRuntimeMediaKeys,
            isStringElement,
            mediaListeningKeys,
            pseudos,
            shouldAttach,
            noClass,
            shouldListenForMedia,
            splitStyles,
            splitStylesStyle,
            state,
            stateRef,
            staticConfig,
            styleProps,
            themeState,
            viewProps,
            willBeAnimated,
            startedUnhydrated
          });
        } catch (e8) {
        } finally {
          console.groupEnd();
        }
      } else {
        log(title), log("state: ", state), isDevTools && log("viewProps", viewProps), log("final styles:");
        for (const key in splitStylesStyle)
          log(key, splitStylesStyle[key]);
      }
      if (debugProp === "break")
        debugger;
    }
    return process.env.NODE_ENV === "development" && time2 && (time2`rest`, globalThis.willPrint || (globalThis.willPrint = true, setTimeout(() => {
      delete globalThis.willPrint, time2.print(), time2 = null;
    }, 50))), content;
  });
  function notifyGroupSubscribers(groupContext, groupEmitter, pseudo) {
    if (!groupContext || !groupEmitter)
      return;
    const nextState = { ...groupContext.state, pseudo };
    groupEmitter.emit(nextState), groupContext.state = nextState;
  }
  staticConfig.componentName && (component.displayName = staticConfig.componentName);
  let res = component;
  (process.env.TAMAGUI_FORCE_MEMO || staticConfig.memo) && (res = React4.default.memo(res)), res.staticConfig = staticConfig;
  function extendStyledConfig(extended) {
    return {
      ...staticConfig,
      ...extended,
      neverFlatten: true,
      isHOC: true,
      isStyledHOC: false
    };
  }
  function extractable(Component2, extended) {
    return Component2.staticConfig = extendStyledConfig(extended), Component2.styleable = styleable, Component2;
  }
  function styleable(Component2, options) {
    let out = IS_REACT_19 && typeof Component2 == "function" && Component2.length === 1 || _optionalChain([Component2, 'access', _220 => _220.render, 'optionalAccess', _221 => _221.length]) === 2 ? Component2 : React4.default.forwardRef(Component2);
    const extendedConfig = extendStyledConfig(_optionalChain([options, 'optionalAccess', _222 => _222.staticConfig]));
    return out = _optionalChain([options, 'optionalAccess', _223 => _223.disableTheme]) ? out : themeable(out, extendedConfig, true), (extendedConfig.memo || process.env.TAMAGUI_MEMOIZE_STYLEABLE) && (out = React4.default.memo(out)), out.staticConfig = extendedConfig, out.styleable = styleable, out;
  }
  return res.extractable = extractable, res.styleable = styleable, res;
}
function getWebEvents(events, webStyle = true) {
  return {
    onMouseEnter: events.onMouseEnter,
    onMouseLeave: events.onMouseLeave,
    [webStyle ? "onClick" : "onPress"]: events.onPress,
    onMouseDown: events.onPressIn,
    onMouseUp: events.onPressOut,
    onTouchStart: events.onPressIn,
    onTouchEnd: events.onPressOut,
    onFocus: events.onFocus,
    onBlur: events.onBlur
  };
}
function Unspaced(props) {
  return props.children;
}
Unspaced.isUnspaced = true;
var getSpacerSize = (size, { tokens }) => {
  size = size === false ? 0 : size === true ? "$true" : size;
  const sizePx = _nullishCoalesce(tokens.space[size], () => ( size));
  return {
    width: sizePx,
    height: sizePx,
    minWidth: sizePx,
    minHeight: sizePx
  };
};
var Spacer = createComponent({
  acceptsClassName: true,
  memo: true,
  componentName: "Spacer",
  validStyles,
  defaultProps: {
    ...stackDefaultStyles,
    // avoid nesting issues
    tag: "span",
    size: true,
    pointerEvents: "none"
  },
  variants: {
    size: {
      "...": getSpacerSize
    },
    flex: {
      true: {
        flexGrow: 1
      }
    },
    direction: {
      horizontal: {
        height: 0,
        minHeight: 0
      },
      vertical: {
        width: 0,
        minWidth: 0
      },
      both: {}
    }
  }
});
function spacedChildren(props) {
  const { isZStack, children, space, direction, spaceFlex, separator, ensureKeys } = props, hasSpace = !!(space || spaceFlex), hasSeparator = separator != null, areChildrenArray = Array.isArray(children);
  if (!ensureKeys && !(hasSpace || hasSeparator || isZStack))
    return children;
  const childrenList = areChildrenArray ? children : React4.default.Children.toArray(children);
  if (childrenList.length <= 1 && !isZStack && !_optionalChain([childrenList, 'access', _224 => _224[0], 'optionalAccess', _225 => _225.type, 'optionalAccess', _226 => _226.shouldForwardSpace]))
    return children;
  const final = [];
  for (let [index, child] of childrenList.entries()) {
    const isEmpty = child == null || Array.isArray(child) && child.length === 0;
    if (!isEmpty && React4.default.isValidElement(child) && _optionalChain([child, 'access', _227 => _227.type, 'optionalAccess', _228 => _228.shouldForwardSpace]) && (child = React4.default.cloneElement(child, {
      // @ts-expect-error we explicitly know with shouldForwardSpace
      space,
      spaceFlex,
      separator,
      key: child.key
    })), isEmpty || !child || child.key && !isZStack ? final.push(child) : final.push(
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, React4.default.Fragment, { children: isZStack ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, AbsoluteFill, { children: child }) : child }, `${index}0t`)
    ), isUnspaced(child) && index === 0 || isZStack)
      continue;
    const next = childrenList[index + 1];
    next && !isEmpty && !isUnspaced(next) && (separator ? (hasSpace && final.push(
      createSpacer({
        key: `_${index}_00t`,
        direction,
        space,
        spaceFlex
      })
    ), final.push(/* @__PURE__ */ _jsxruntime.jsx.call(void 0, React4.default.Fragment, { children: separator }, `${index}03t`)), hasSpace && final.push(
      createSpacer({
        key: `_${index}01t`,
        direction,
        space,
        spaceFlex
      })
    )) : final.push(
      createSpacer({
        key: `_${index}02t`,
        direction,
        space,
        spaceFlex
      })
    ));
  }
  return process.env.NODE_ENV === "development" && props.debug && log("  Spaced children", final, props), final;
}
function createSpacer({ key, direction, space, spaceFlex }) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    Spacer,
    {
      size: space,
      direction,
      ...typeof spaceFlex < "u" && {
        flex: spaceFlex === true ? 1 : spaceFlex === false ? 0 : spaceFlex
      }
    },
    key
  );
}
function isUnspaced(child) {
  const t = _optionalChain([child, 'optionalAccess', _229 => _229.type]);
  return _optionalChain([t, 'optionalAccess', _230 => _230.isVisuallyHidden]) || _optionalChain([t, 'optionalAccess', _231 => _231.isUnspaced]);
}
var AbsoluteFill = createComponent({
  defaultProps: {
    ...stackDefaultStyles,
    flexDirection: "column",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: "box-none"
  }
});
var fromPx = (val) => typeof val == "number" ? val : typeof val == "string" ? +val.replace("px", "") : 0;

// node_modules/@tamagui/web/dist/esm/setupReactNative.js
var ReactNativeStaticConfigs = /* @__PURE__ */ new WeakMap();
function getReactNativeConfig(Component) {
  if (Component)
    return Component.getSize && Component.prefetch ? RNConfigs.Image : Component.displayName === "Text" && Component.render ? RNConfigs.Text : Component.render && (Component.displayName === "ScrollView" || Component.displayName === "View") ? RNConfigs.default : _optionalChain([Component, 'access', _232 => _232.State, 'optionalAccess', _233 => _233.blurTextInput]) ? RNConfigs.TextInput : ReactNativeStaticConfigs.get(Component);
}
var RNConfigs = {
  Image: {
    isReactNative: true,
    inlineProps: /* @__PURE__ */ new Set(["src", "width", "height"])
  },
  Text: {
    isReactNative: true,
    isText: true
  },
  TextInput: {
    isReactNative: true,
    isInput: true,
    isText: true
  },
  default: {
    isReactNative: true
  }
};

// node_modules/@tamagui/web/dist/esm/helpers/mergeVariants.js
var mergeVariants = (parentVariants, ourVariants, level = 0) => {
  const variants2 = {};
  for (const key in ourVariants) {
    const parentVariant = _optionalChain([parentVariants, 'optionalAccess', _234 => _234[key]]), ourVariant = ourVariants[key];
    !parentVariant || typeof ourVariant == "function" ? variants2[key] = ourVariant : parentVariant && !ourVariant ? variants2[key] = parentVariant[key] : level === 0 ? variants2[key] = mergeVariants(
      parentVariant,
      ourVariant,
      level + 1
    ) : variants2[key] = {
      ...parentVariant,
      ...ourVariant
    };
  }
  return {
    ...parentVariants,
    ...variants2
  };
};

// node_modules/@tamagui/web/dist/esm/styled.js
function styled(ComponentIn, options, config) {
  if (process.env.NODE_ENV !== "production" && !ComponentIn)
    throw new Error("No component given to styled()");
  const parentStaticConfig = ComponentIn.staticConfig, isPlainStyledComponent = !!parentStaticConfig && !(parentStaticConfig.isReactNative || parentStaticConfig.isHOC);
  let Component = _optionalChain([parentStaticConfig, 'optionalAccess', _235 => _235.isHOC]) && !_optionalChain([parentStaticConfig, 'optionalAccess', _236 => _236.isStyledHOC]) || isPlainStyledComponent ? ComponentIn : _optionalChain([parentStaticConfig, 'optionalAccess', _237 => _237.Component]) || ComponentIn;
  const reactNativeConfig = parentStaticConfig ? void 0 : getReactNativeConfig(Component), isReactNative = !!(reactNativeConfig || _optionalChain([config, 'optionalAccess', _238 => _238.isReactNative]) || _optionalChain([parentStaticConfig, 'optionalAccess', _239 => _239.isReactNative])), staticConfigProps = (() => {
    let {
      variants: variants2,
      name,
      defaultVariants,
      acceptsClassName: acceptsClassNameProp,
      context,
      ...defaultProps
    } = options || {}, parentDefaultVariants, parentDefaultProps;
    if (parentStaticConfig && !(parentStaticConfig.isHOC && !parentStaticConfig.isStyledHOC)) {
      const pdp = parentStaticConfig.defaultProps;
      for (const key in pdp) {
        const val = pdp[key];
        parentStaticConfig.defaultVariants && key in parentStaticConfig.defaultVariants && (!defaultVariants || !(key in defaultVariants)) && (parentDefaultVariants || (parentDefaultVariants = {}), parentDefaultVariants[key] = val), !(key in defaultProps) && (!defaultVariants || !(key in defaultVariants)) && (parentDefaultProps || (parentDefaultProps = {}), parentDefaultProps[key] = pdp[key]);
      }
      parentStaticConfig.variants && (variants2 = mergeVariants(parentStaticConfig.variants, variants2));
    }
    (parentDefaultProps || defaultVariants || parentDefaultVariants) && (defaultProps = {
      ...parentDefaultProps,
      ...parentDefaultVariants,
      ...defaultProps,
      ...defaultVariants
    }), _optionalChain([parentStaticConfig, 'optionalAccess', _240 => _240.isHOC]) && name && (defaultProps.componentName = name);
    const isText = !!(_optionalChain([config, 'optionalAccess', _241 => _241.isText]) || _optionalChain([parentStaticConfig, 'optionalAccess', _242 => _242.isText])), acceptsClassName = _nullishCoalesce(_nullishCoalesce(_optionalChain([config, 'optionalAccess', _243 => _243.acceptsClassName]), () => ( acceptsClassNameProp)), () => ( (isPlainStyledComponent || isReactNative || _optionalChain([parentStaticConfig, 'optionalAccess', _244 => _244.isHOC]) && _optionalChain([parentStaticConfig, 'optionalAccess', _245 => _245.acceptsClassName])))), conf4 = {
      ...parentStaticConfig,
      ...config,
      ...!isPlainStyledComponent && {
        Component
      },
      // @ts-expect-error
      variants: variants2,
      defaultProps,
      defaultVariants,
      componentName: name || _optionalChain([parentStaticConfig, 'optionalAccess', _246 => _246.componentName]),
      isReactNative,
      isText,
      acceptsClassName,
      context,
      ...reactNativeConfig,
      isStyledHOC: !!_optionalChain([parentStaticConfig, 'optionalAccess', _247 => _247.isHOC]),
      parentStaticConfig
    };
    return (defaultProps.children || !acceptsClassName || context) && (conf4.neverFlatten = true), conf4;
  })(), component = createComponent(staticConfigProps || {});
  for (const key in ComponentIn)
    key !== "propTypes" && (key in component || (component[key] = ComponentIn[key]));
  return component;
}

// node_modules/@tamagui/web/dist/esm/hooks/useProps.js


// node_modules/@tamagui/web/dist/esm/views/Stack.js
var Stack = createComponent({
  acceptsClassName: true,
  defaultProps: stackDefaultStyles,
  validStyles
});
Stack.displayName = "Stack";

// node_modules/@tamagui/web/dist/esm/hooks/useProps.js
function useProps(props, opts) {
  const [propsOut, styleOut] = usePropsAndStyle(props, {
    ...opts,
    noExpand: true,
    noNormalize: true,
    resolveValues: "none"
  });
  return {
    ...propsOut,
    ...styleOut
  };
}
function usePropsAndStyle(props, opts) {
  const staticConfig = _nullishCoalesce(_optionalChain([opts, 'optionalAccess', _248 => _248.forComponent, 'optionalAccess', _249 => _249.staticConfig]), () => ( Stack.staticConfig)), [theme, themeState] = useThemeWithState({
    componentName: staticConfig.componentName,
    name: "theme" in props ? props.theme : void 0,
    inverse: "themeInverse" in props ? props.themeInverse : void 0,
    needsUpdate() {
      return true;
    }
  }), componentContext = React4.default.useContext(ComponentContext), groupContext = React4.default.useContext(GroupContext), { state, disabled, setStateShallow } = useComponentState(
    props,
    componentContext.animationDriver,
    staticConfig,
    getConfig2()
  ), mediaStateNow = _optionalChain([opts, 'optionalAccess', _250 => _250.noMedia]) ? (
    // not safe to use mediaState but really marginal to hit this
    mediaState
  ) : useMedia(), splitStyles = useSplitStyles(
    props,
    staticConfig,
    theme,
    _optionalChain([themeState, 'optionalAccess', _251 => _251.name]) || "",
    state,
    {
      isAnimated: false,
      mediaState: mediaStateNow,
      noSkip: true,
      noMergeStyle: true,
      noClass: true,
      resolveValues: "auto",
      ...opts
    },
    null,
    componentContext,
    groupContext
  ), { mediaGroups, pseudoGroups } = splitStyles || {};
  return useIsomorphicLayoutEffect(() => {
    if (!disabled) {
      if (state.unmounted) {
        setStateShallow({ unmounted: false });
        return;
      }
      if (groupContext)
        return subscribeToContextGroup({
          groupContext,
          setStateShallow,
          mediaGroups,
          pseudoGroups
        });
    }
  }, [
    disabled,
    groupContext,
    pseudoGroups ? Object.keys([...pseudoGroups]).join("") : 0,
    mediaGroups ? Object.keys([...mediaGroups]).join("") : 0
  ]), [
    _optionalChain([splitStyles, 'optionalAccess', _252 => _252.viewProps]) || {},
    _optionalChain([splitStyles, 'optionalAccess', _253 => _253.style]) || {},
    theme,
    mediaState
  ];
}

// node_modules/@tamagui/web/dist/esm/views/Text.js
var ellipseStyle = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
var defaultWebStyle = {
  display: "inline",
  // display: inline breaks css transform styles
  boxSizing: "border-box",
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  margin: 0
};
var ellipsisStyle = ellipseStyle;
var Text = createComponent({
  acceptsClassName: true,
  isText: true,
  defaultProps: {
    fontFamily: "unset",
    ...defaultWebStyle
  },
  inlineWhenUnflattened: /* @__PURE__ */ new Set(["fontFamily"]),
  variants: {
    numberOfLines: {
      1: ellipseStyle,
      ":number": (numberOfLines) => numberOfLines >= 1 ? {
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
        overflow: "hidden"
      } : null
    },
    selectable: {
      true: {
        userSelect: "text",
        cursor: "text"
      },
      false: {
        userSelect: "none",
        cursor: "default"
      }
    },
    /**
     * @deprecated Use ellipsis instead
     */
    ellipse: {
      true: ellipsisStyle
    },
    ellipsis: {
      true: ellipsisStyle
    }
  },
  validStyles: {
    ...validStyles,
    ...stylePropsTextOnly
  }
});
Text.displayName = "Text";

// node_modules/@tamagui/use-event/dist/esm/useGet.js


// node_modules/@tamagui/get-token/dist/esm/index.js
var defaultOptions = {
  shift: 0,
  bounds: [0]
};
var getSpace = (space, options) => getTokenRelative("space", space, options);
var cacheVariables = {};
var cacheWholeVariables = {};
var cacheKeys = {};
var cacheWholeKeys = {};
var stepTokenUpOrDown = (type, current, options = defaultOptions) => {
  const tokens = getTokens({ prefixed: true })[type];
  if (!(type in cacheVariables)) {
    cacheKeys[type] = [], cacheVariables[type] = [], cacheWholeKeys[type] = [], cacheWholeVariables[type] = [];
    const sorted = Object.keys(tokens).map((k) => tokens[k]).sort((a, b) => a.val - b.val);
    for (const token of sorted)
      cacheKeys[type].push(token.key), cacheVariables[type].push(token);
    const sortedExcludingHalfSteps = sorted.filter((x) => !x.key.endsWith(".5"));
    for (const token of sortedExcludingHalfSteps)
      cacheWholeKeys[type].push(token.key), cacheWholeVariables[type].push(token);
  }
  const isString = typeof current == "string", tokensOrdered = (options.excludeHalfSteps ? isString ? cacheWholeKeys : cacheWholeVariables : isString ? cacheKeys : cacheVariables)[type], min = _nullishCoalesce(_optionalChain([options, 'access', _254 => _254.bounds, 'optionalAccess', _255 => _255[0]]), () => ( 0)), max = _nullishCoalesce(_optionalChain([options, 'access', _256 => _256.bounds, 'optionalAccess', _257 => _257[1]]), () => ( tokensOrdered.length - 1)), currentIndex = tokensOrdered.indexOf(current);
  let shift = options.shift || 0;
  shift && (current === "$true" || isVariable2(current) && current.name === "true") && (shift += shift > 0 ? 1 : -1);
  const index = Math.min(max, Math.max(min, currentIndex + shift)), found = tokensOrdered[index];
  return (typeof found == "string" ? tokens[found] : found) || tokens.$true;
};
var getTokenRelative = stepTokenUpOrDown;

// node_modules/@tamagui/get-button-sized/dist/esm/index.js
var getButtonSized = (val, { tokens, props }) => {
  if (!val || props.circular)
    return;
  if (typeof val == "number")
    return {
      paddingHorizontal: val * 0.25,
      height: val,
      borderRadius: props.circular ? 1e5 : val * 0.2
    };
  const xSize = getSpace(val), radiusToken = _nullishCoalesce(tokens.radius[val], () => ( tokens.radius.$true));
  return {
    paddingHorizontal: xSize,
    height: val,
    borderRadius: props.circular ? 1e5 : radiusToken
  };
};

// node_modules/@tamagui/helpers-tamagui/dist/esm/useCurrentColor.js
var useCurrentColor = (colorProp) => {
  const theme = useTheme();
  return colorProp ? getVariable(colorProp) : _optionalChain([theme, 'access', _258 => _258[colorProp], 'optionalAccess', _259 => _259.get, 'call', _260 => _260()]) || _optionalChain([theme, 'access', _261 => _261.color, 'optionalAccess', _262 => _262.get, 'call', _263 => _263()]);
};

// node_modules/@tamagui/helpers-tamagui/dist/esm/useGetThemedIcon.js

var useGetThemedIcon = (props) => {
  const color = useCurrentColor(props.color);
  return (el) => el && (React4.default.isValidElement(el) ? React4.default.cloneElement(el, {
    ...props,
    color,
    // @ts-expect-error
    ...el.props
  }) : React4.default.createElement(el, props));
};

// node_modules/@tamagui/stacks/dist/esm/Stacks.js


// node_modules/@tamagui/stacks/dist/esm/getElevation.js

var getElevation = (size, extras) => {
  if (!size)
    return;
  const { tokens } = extras, token = tokens.size[size], sizeNum = _core.isVariable.call(void 0, token) ? +token.val : size;
  return getSizedElevation(sizeNum, extras);
};
var getSizedElevation = (val, { theme, tokens }) => {
  let num = 0;
  if (val === true) {
    const val2 = _core.getVariableValue.call(void 0, tokens.size.true);
    typeof val2 == "number" ? num = val2 : num = 10;
  } else
    num = +val;
  if (num === 0)
    return;
  const [height, shadowRadius] = [Math.round(num / 4 + 1), Math.round(num / 2 + 2)];
  return {
    shadowColor: theme.shadowColor,
    shadowRadius,
    shadowOffset: { height, width: 0 },
    ..._core.isAndroid ? {
      elevationAndroid: 2 * height
    } : {}
  };
};

// node_modules/@tamagui/stacks/dist/esm/Stacks.js
var fullscreenStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
var getInset = (val) => val && typeof val == "object" ? val : {
  top: val,
  left: val,
  bottom: val,
  right: val
};
var variants = {
  fullscreen: {
    true: fullscreenStyle
  },
  elevation: {
    "...size": getElevation,
    ":number": getElevation
  },
  inset: getInset
};
var YStack = _core.styled.call(void 0, _core.View, {
  flexDirection: "column",
  variants
});
YStack.displayName = "YStack";
var XStack = _core.styled.call(void 0, _core.View, {
  flexDirection: "row",
  variants
});
XStack.displayName = "XStack";
var ZStack = _core.styled.call(void 0, 
  YStack,
  {
    position: "relative"
  },
  {
    neverFlatten: true,
    isZStack: true
  }
);
ZStack.displayName = "ZStack";

// node_modules/@tamagui/stacks/dist/esm/variants.js
var elevate = {
  true: (_, extras) => getElevation(extras.props.size, extras)
};
var bordered = (val, { props }) => ({
  // TODO size it with size in '...size'
  borderWidth: typeof val == "number" ? val : 1,
  borderColor: "$borderColor",
  ...props.hoverTheme && {
    hoverStyle: {
      borderColor: "$borderColorHover"
    }
  },
  ...props.pressTheme && {
    pressStyle: {
      borderColor: "$borderColorPress"
    }
  },
  ...props.focusTheme && {
    focusStyle: {
      borderColor: "$borderColorFocus"
    }
  }
});
var padded = {
  true: (_, extras) => {
    const { tokens, props } = extras;
    return {
      padding: tokens.space[props.size] || tokens.space.$true
    };
  }
};
var radiused = {
  true: (_, extras) => {
    const { tokens, props } = extras;
    return {
      borderRadius: tokens.radius[props.size] || tokens.radius.$true
    };
  }
};
var circularStyle = {
  borderRadius: 1e5,
  padding: 0
};
var circular = {
  true: (_, { props, tokens }) => {
    if (!("size" in props))
      return circularStyle;
    const size = typeof props.size == "number" ? props.size : tokens.size[props.size];
    return {
      ...circularStyle,
      width: size,
      height: size,
      maxWidth: size,
      maxHeight: size,
      minWidth: size,
      minHeight: size
    };
  }
};
var hoverTheme = {
  true: {
    hoverStyle: {
      backgroundColor: "$backgroundHover",
      borderColor: "$borderColorHover"
    }
  },
  false: {}
};
var pressTheme = {
  true: {
    cursor: "pointer",
    pressStyle: {
      backgroundColor: "$backgroundPress",
      borderColor: "$borderColorPress"
    }
  },
  false: {}
};
var focusTheme = {
  true: {
    focusStyle: {
      backgroundColor: "$backgroundFocus",
      borderColor: "$borderColorFocus"
    }
  },
  false: {}
};

// node_modules/@tamagui/stacks/dist/esm/ThemeableStack.js

var chromelessStyle = {
  backgroundColor: "transparent",
  borderColor: "transparent",
  shadowColor: "transparent",
  hoverStyle: {
    borderColor: "transparent"
  }
};
var themeableVariants = {
  backgrounded: {
    true: {
      backgroundColor: "$background"
    }
  },
  radiused,
  hoverTheme,
  pressTheme,
  focusTheme,
  circular,
  padded,
  elevate,
  bordered,
  transparent: {
    true: {
      backgroundColor: "transparent"
    }
  },
  chromeless: {
    true: chromelessStyle,
    all: {
      ...chromelessStyle,
      hoverStyle: chromelessStyle,
      pressStyle: chromelessStyle,
      focusStyle: chromelessStyle
    }
  }
};
var ThemeableStack = _core.styled.call(void 0, YStack, {
  variants: themeableVariants
});

// node_modules/@tamagui/stacks/dist/esm/NestingContext.js

var ButtonNestingContext = React4.default.createContext(false);

// node_modules/@tamagui/get-font-sized/dist/esm/index.js
var getFontSized = (sizeTokenIn = "$true", { font, fontFamily, props }) => {
  if (!font)
    return {
      fontSize: sizeTokenIn
    };
  const sizeToken = sizeTokenIn === "$true" ? getDefaultSizeToken(font) : sizeTokenIn, style = {}, fontSize = font.size[sizeToken], lineHeight = _optionalChain([font, 'access', _264 => _264.lineHeight, 'optionalAccess', _265 => _265[sizeToken]]), fontWeight = _optionalChain([font, 'access', _266 => _266.weight, 'optionalAccess', _267 => _267[sizeToken]]), letterSpacing = _optionalChain([font, 'access', _268 => _268.letterSpacing, 'optionalAccess', _269 => _269[sizeToken]]), textTransform = _optionalChain([font, 'access', _270 => _270.transform, 'optionalAccess', _271 => _271[sizeToken]]), fontStyle = _nullishCoalesce(props.fontStyle, () => ( _optionalChain([font, 'access', _272 => _272.style, 'optionalAccess', _273 => _273[sizeToken]]))), color = _nullishCoalesce(props.color, () => ( _optionalChain([font, 'access', _274 => _274.color, 'optionalAccess', _275 => _275[sizeToken]])));
  return fontStyle && (style.fontStyle = fontStyle), textTransform && (style.textTransform = textTransform), fontFamily && (style.fontFamily = fontFamily), fontWeight && (style.fontWeight = fontWeight), letterSpacing && (style.letterSpacing = letterSpacing), fontSize && (style.fontSize = fontSize), lineHeight && (style.lineHeight = lineHeight), color && (style.color = color), process.env.NODE_ENV === "development" && props.debug && props.debug === "verbose" && (console.groupCollapsed("  \u{1F539} getFontSized", sizeTokenIn, sizeToken), isClient && console.info({ style, props, font }), console.groupEnd()), style;
};
var SizableText = styled(Text, {
  name: "SizableText",
  fontFamily: "$body",
  variants: {
    size: {
      "...fontSize": getFontSized
    }
  },
  defaultVariants: {
    size: "$true"
  }
});
var cache6 = /* @__PURE__ */ new WeakMap();
function getDefaultSizeToken(font) {
  if (typeof font == "object" && cache6.has(font))
    return cache6.get(font);
  const sizeTokens = "$true" in font.size ? font.size : getTokens().size, sizeDefault = sizeTokens.$true, sizeDefaultSpecific = sizeDefault ? Object.keys(sizeTokens).find(
    (x) => x !== "$true" && sizeTokens[x].val === sizeDefault.val
  ) : null;
  return !sizeDefault || !sizeDefaultSpecific ? (process.env.NODE_ENV === "development" && console.warn(`No default size is set in your tokens for the "true" key, fonts will be inconsistent.

      Fix this by having consistent tokens across fonts and sizes and setting a true key for your size tokens, or
      set true keys for all your font tokens: "size", "lineHeight", "fontStyle", etc.`), Object.keys(font.size)[3]) : (cache6.set(font, sizeDefaultSpecific), sizeDefaultSpecific);
}

// node_modules/@tamagui/text/dist/esm/SizableText.js
var SizableText2 = styled(Text, {
  name: "SizableText",
  fontFamily: "$body",
  variants: {
    unstyled: {
      false: {
        size: "$true",
        color: "$color"
      }
    },
    size: getFontSized
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
});
SizableText2.staticConfig.variants.fontFamily = {
  "...": (_val, extras) => {
    const sizeProp = extras.props.size, fontSizeProp = extras.props.fontSize, size = sizeProp === "$true" && fontSizeProp ? fontSizeProp : extras.props.size || "$true";
    return getFontSized(size, extras);
  }
};

// node_modules/@tamagui/text/dist/esm/wrapChildrenInText.js


function wrapChildrenInText(TextComponent, propsIn, extraProps) {
  const {
    children,
    textProps,
    size,
    noTextWrap,
    color,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    textAlign,
    fontStyle,
    maxFontSizeMultiplier
  } = propsIn;
  if (noTextWrap || !children)
    return [children];
  const props = {
    ...extraProps
  };
  return color && (props.color = color), fontFamily && (props.fontFamily = fontFamily), fontSize && (props.fontSize = fontSize), fontWeight && (props.fontWeight = fontWeight), letterSpacing && (props.letterSpacing = letterSpacing), textAlign && (props.textAlign = textAlign), size && (props.size = size), fontStyle && (props.fontStyle = fontStyle), maxFontSizeMultiplier && (props.maxFontSizeMultiplier = maxFontSizeMultiplier), React4.default.Children.toArray(children).map((child, index) => typeof child == "string" ? (
    // so "data-disable-theme" is a hack to fix themeInverse, don't ask me why
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, TextComponent, { ...props, ...textProps, children: child }, index)
  ) : child);
}

// node_modules/@tamagui/button/dist/esm/Button.js


var ButtonContext = createStyledContext({
  // keeping these here means they work with styled() passing down color to text
  color: void 0,
  ellipse: void 0,
  fontFamily: void 0,
  fontSize: void 0,
  fontStyle: void 0,
  fontWeight: void 0,
  letterSpacing: void 0,
  maxFontSizeMultiplier: void 0,
  size: void 0,
  textAlign: void 0,
  variant: void 0
});
var BUTTON_NAME = "Button";
var ButtonFrame = styled(ThemeableStack, {
  name: BUTTON_NAME,
  tag: "button",
  context: ButtonContext,
  role: "button",
  focusable: true,
  variants: {
    unstyled: {
      false: {
        size: "$true",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexDirection: "row",
        cursor: "pointer",
        hoverTheme: true,
        pressTheme: true,
        backgrounded: true,
        borderWidth: 1,
        borderColor: "transparent",
        focusVisibleStyle: {
          outlineColor: "$outlineColor",
          outlineStyle: "solid",
          outlineWidth: 2
        }
      }
    },
    variant: {
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "$borderColor",
        hoverStyle: {
          backgroundColor: "transparent",
          borderColor: "$borderColorHover"
        },
        pressStyle: {
          backgroundColor: "transparent",
          borderColor: "$borderColorPress"
        },
        focusVisibleStyle: {
          backgroundColor: "transparent",
          borderColor: "$borderColorFocus"
        }
      }
    },
    size: {
      "...size": getButtonSized,
      ":number": getButtonSized
    },
    disabled: {
      true: {
        pointerEvents: "none"
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
});
var ButtonText = styled(SizableText2, {
  name: "Button",
  context: ButtonContext,
  variants: {
    unstyled: {
      false: {
        userSelect: "none",
        cursor: "pointer",
        // flexGrow 1 leads to inconsistent native style where text pushes to start of view
        flexGrow: 0,
        flexShrink: 1,
        ellipse: true,
        color: "$color"
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
});
var ButtonIcon = (props) => {
  const { children, scaleIcon = 1 } = props, { size, color } = _react.useContext.call(void 0, ButtonContext), iconSize = (typeof size == "number" ? size * 0.5 : getFontSize(size)) * scaleIcon;
  return useGetThemedIcon({ size: iconSize, color })(children);
};
var ButtonComponent = ButtonFrame.styleable(
  function(props, ref) {
    const { props: buttonProps } = useButton(props);
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ButtonFrame, { "data-disable-theme": true, ...buttonProps, ref });
  }
);
var Button2 = withStaticProperties(ButtonComponent, {
  Text: ButtonText,
  Icon: ButtonIcon
});
function useButton({ textProps, ...propsIn }, { Text: Text3 = Button2.Text } = { Text: Button2.Text }) {
  const isNested = _react.useContext.call(void 0, ButtonNestingContext), propsActive = useProps(propsIn, {
    noNormalize: true,
    noExpand: true
  }), {
    icon,
    iconAfter,
    space,
    spaceFlex,
    scaleIcon = 1,
    scaleSpace = 0.66,
    separator,
    noTextWrap,
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
    letterSpacing,
    tag,
    ellipse,
    maxFontSizeMultiplier,
    ...restProps
  } = propsActive, size = propsActive.size || (propsActive.unstyled ? void 0 : "$true"), color = propsActive.color, iconSize = (typeof size == "number" ? size * 0.5 : getFontSize(size, {
    font: _optionalChain([fontFamily, 'optionalAccess', _276 => _276[0]]) === "$" ? fontFamily : void 0
  })) * scaleIcon, getThemedIcon = useGetThemedIcon({
    size: iconSize,
    color
  }), [themedIcon, themedIconAfter] = [icon, iconAfter].map(getThemedIcon), spaceSize = _nullishCoalesce(space, () => ( getVariableValue(iconSize) * scaleSpace)), contents = noTextWrap ? [propsIn.children] : wrapChildrenInText(
    Text3,
    {
      children: propsIn.children,
      color,
      fontFamily,
      fontSize,
      textProps,
      fontWeight,
      fontStyle,
      letterSpacing,
      ellipse,
      maxFontSizeMultiplier
    },
    Text3 === ButtonText && propsActive.unstyled !== true ? {
      unstyled: process.env.TAMAGUI_HEADLESS === "1",
      size
    } : void 0
  ), inner = spacedChildren({
    // a bit arbitrary but scaling to font size is necessary so long as button does
    space: spaceSize === false ? 0 : spaceSize == true ? "$true" : spaceSize,
    spaceFlex,
    ensureKeys: true,
    separator,
    direction: propsActive.flexDirection === "column" || propsActive.flexDirection === "column-reverse" ? "vertical" : "horizontal",
    // for keys to stay the same we keep indices as similar a possible
    // so even if icons are undefined we still pass them
    children: [themedIcon, ...contents, themedIconAfter]
  }), props = {
    size,
    ...propsIn.disabled && {
      // in rnw - false still has keyboard tabIndex, undefined = not actually focusable
      focusable: void 0,
      // even with tabIndex unset, it will keep focusVisibleStyle on web so disable it here
      focusVisibleStyle: {
        borderColor: "$background"
      }
    },
    // fixes SSR issue + DOM nesting issue of not allowing button in button
    tag: _nullishCoalesce(tag, () => ( (isNested ? "span" : (
      // defaults to <a /> when accessibilityRole = link
      // see https://github.com/tamagui/tamagui/issues/505
      propsActive.accessibilityRole === "link" || propsActive.role === "link" ? "a" : "button"
    )))),
    ...restProps,
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ButtonNestingContext.Provider, { value: true, children: inner }),
    // forces it to be a runtime pressStyle so it passes through context text colors
    disableClassName: true
  };
  return {
    spaceSize,
    isNested,
    props
  };
}

// src/components/Button.tsx

var COLORS = {
  primary: "#ffc23e",
  primaryHover: "#ffc23e",
  primaryActive: "#ffc23e",
  primaryText: "#0c0d0d",
  primarySuccess: "#008700",
  primarySuccessHover: "#007200",
  primaryError: "#cc3123",
  primaryErrorHover: "#b02215",
  primaryWarning: "#c75000",
  primaryDisabled: "#d3d3d3",
  secondary: "#fff",
  secondaryBorder: "#c75000",
  secondaryText: "#c75000",
  secondaryDisabled: "#d3d3d3",
  shadow: "0 6px 10px rgba(0,0,0,.14),0 1px 18px rgba(0,0,0,.12)",
  disabledShadow: "none"
};
var ButtonDXPlus = _core.styled.call(void 0, Button2, {
  name: "ButtonDXPlus",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  outlineOffset: 0,
  userSelect: "none",
  transitionProperty: "box-shadow, transform",
  transitionDuration: ".175s",
  transitionTimingFunction: "ease",
  variants: {
    variant: {
      primary: {
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.primary
      },
      secondary: {
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: COLORS.secondaryBorder
      }
    },
    size: {
      s: { paddingVertical: 6, paddingHorizontal: 7 },
      m: { paddingVertical: 10, paddingHorizontal: 23 },
      l: { paddingVertical: 15, paddingHorizontal: 23 }
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        boxShadow: COLORS.disabledShadow,
        backgroundColor: COLORS.primaryDisabled,
        color: "#fff",
        borderColor: COLORS.primaryDisabled
      }
    },
    status: {
      default: {},
      success: {},
      error: {},
      warning: {}
    }
  },
  hoverStyle: {
    transform: "translateY(-0.0625rem)",
    boxShadow: COLORS.shadow
  },
  pressStyle: {
    transform: "none",
    boxShadow: "none"
  }
});
function Button({
  children,
  variant = "primary",
  size = "m",
  status = "default",
  disabled = false,
  ...props
}) {
  let bgColor = COLORS.primary;
  let textColor = COLORS.primaryText;
  let borderColor = COLORS.primary;
  if (variant === "primary") {
    if (status === "success") {
      bgColor = COLORS.primarySuccess;
      textColor = "#fff";
      borderColor = COLORS.primarySuccess;
    } else if (status === "error") {
      bgColor = COLORS.primaryError;
      textColor = "#fff";
      borderColor = COLORS.primaryError;
    } else if (status === "warning") {
      bgColor = COLORS.primaryWarning;
      textColor = "#fff";
      borderColor = COLORS.primaryWarning;
    }
  }
  if (variant === "secondary") {
    bgColor = COLORS.secondary;
    textColor = COLORS.secondaryText;
    borderColor = COLORS.secondaryBorder;
    if (status === "success")
      borderColor = COLORS.primarySuccess;
    if (status === "error")
      borderColor = COLORS.primaryError;
    if (status === "warning")
      borderColor = COLORS.primaryWarning;
  }
  if (disabled) {
    bgColor = COLORS.primaryDisabled;
    textColor = "#fff";
    borderColor = COLORS.primaryDisabled;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    ButtonDXPlus,
    {
      variant,
      size,
      disabled,
      style: { backgroundColor: bgColor, borderColor },
      ...props,
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _core.Text, { fontWeight: 600, color: textColor, alignSelf: "center", children })
    }
  );
}
var Button_default = Button;





exports.ButtonDXPlus = ButtonDXPlus; exports.Button = Button; exports.Button_default = Button_default;
/*! Bundled license information:

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.development.js:
  (**
   * @license React
   * react-dom.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
