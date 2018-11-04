// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"Stemmer2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var p4 = ['وكال', 'وبال', 'فبال']; // length three prefixes

var p3old = ["\u0643\u0627\u0644", "\u0628\u0627\u0644", "\u0648\u0644\u0644", "\u0648\u0627\u0644"];
var p3 = ['وال', 'فال', 'كال', 'بال', 'ولل', 'فلل']; // length two prefixes

var p2old = ["\u0627\u0644", "\u0644\u0644"];
var p2 = ['ال', 'لل', 'لي', 'لت', 'لن', 'لا', 'فل', 'فس', 'في', 'فت', 'فن', 'فا', 'سي', 'ست', 'سن', 'سا', 'ول', 'وس', 'وي', 'وت', 'ون', 'وا']; // length one prefixes

var p1old = ["\u0644", "\u0628", "\u0641", "\u0633", "\u0648", "\u064A", "\u062A", "\u0646", "\u0627", 'ت'];
var p1 = ['ل', 'ب', 'ف', 'س', 'و', 'ي', 'ت', 'ن', 'ا']; // length three suffixes

var s3 = ["\u062A\u0645\u0644", "\u0647\u0645\u0644", "\u062A\u0627\u0646", "\u062A\u064A\u0646", "\u0643\u0645\u0644"]; // length two suffixes

var s2 = ["\u0648\u0646", "\u0627\u062A", "\u0627\u0646", "\u064A\u0646", "\u062A\u0646", "\u0643\u0645", "\u0647\u0646", "\u0646\u0627", "\u064A\u0627", "\u0647\u0627", "\u062A\u0645", "\u0643\u0646", "\u0646\u064A", "\u0648\u0627", "\u0645\u0627", "\u0647\u0645"]; // length one suffixes

var s1 = ["\u0629", "\u0647", "\u064A", "\u0643", "\u062A", "\u0627", "\u0646"];
var pr4 = {
  0: ["\u0645"],
  1: ["\u0627"],
  2: ["\u0627", "\u0648", "\u064A"],
  3: ["\u0629"]
};
var re_short_vowels = /[\u064B-\u0652]/g;
var re_hamza = /[\u0621\u0623\u0624\u0625\u0626]/g;
var re_initial_hamza = /^[\u0622\u0623\u0625]/;
var stop_words = ["\u064A\u0643\u0648\u0646", "\u0648\u0644\u064A\u0633", "\u0648\u0643\u0627\u0646", "\u0643\u0630\u0644\u0643", "\u0627\u0644\u062A\u064A", "\u0648\u0628\u064A\u0646", "\u0639\u0644\u064A\u0647\u0627", "\u0645\u0633\u0627\u0621", "\u0627\u0644\u0630\u064A", "\u0648\u0643\u0627\u0646\u062A", "\u0648\u0644\u0643\u0646", "\u0648\u0627\u0644\u062A\u064A", "\u062A\u0643\u0648\u0646", "\u0627\u0644\u064A\u0648\u0645", "\u0627\u0644\u0644\u0630\u064A\u0646", "\u0639\u0644\u064A\u0647", "\u0643\u0627\u0646\u062A", "\u0644\u0630\u0644\u0643", "\u0623\u0645\u0627\u0645", "\u0647\u0646\u0627\u0643", "\u0645\u0646\u0647\u0627", "\u0645\u0627\u0632\u0627\u0644", "\u0644\u0627\u0632\u0627\u0644", "\u0644\u0627\u064A\u0632\u0627\u0644", "\u0645\u0627\u064A\u0632\u0627\u0644", "\u0627\u0635\u0628\u062D", "\u0623\u0635\u0628\u062D", "\u0623\u0645\u0633\u0649", "\u0627\u0645\u0633\u0649", "\u0623\u0636\u062D\u0649", "\u0627\u0636\u062D\u0649", "\u0645\u0627\u0628\u0631\u062D", "\u0645\u0627\u0641\u062A\u0626", "\u0645\u0627\u0627\u0646\u0641\u0643", "\u0644\u0627\u0633\u064A\u0645\u0627", "\u0648\u0644\u0627\u064A\u0632\u0627\u0644", "\u0627\u0644\u062D\u0627\u0644\u064A", "\u0627\u0644\u064A\u0647\u0627", "\u0627\u0644\u0630\u064A\u0646", "\u0641\u0627\u0646\u0647", "\u0648\u0627\u0644\u0630\u064A", "\u0648\u0647\u0630\u0627", "\u0644\u0647\u0630\u0627", "\u0641\u0643\u0627\u0646", "\u0633\u062A\u0643\u0648\u0646", "\u0627\u0644\u064A\u0647", "\u064A\u0645\u0643\u0646", "\u0628\u0647\u0630\u0627", "\u0627\u0644\u0630\u0649"];
var pat7 = [/\u0627\u0633\u062a(.)(.)\u0627(.)/]; // Groups of length six patterns and length three roots

var pat6 = [/\u0627\u0633\u062a(.)(.)(.)/, // استفعل
/\u0645\u0633\u062a(.)(.)(.)/, // مستفعل
/\u0645(.)\u0627(.)(.)\u0629/, // مفاعلة
/\u0627(.)\u062a(.)\u0627(.)/, // افتعال
/\u0627(.)\u0639\u0648(.)(.)/, // افعوعل
/\u062a(.)\u0627(.)\u064a(.)/, // تفاعيل
/\u0645(.)\u0627(.)\u064a(.)/, // مفاعيل
/\u0627(.)(.)(\u064a)\u0627\u0621/, // افعياء
/(.)(.)(.)\u064a\u0627\u0621/, // فعلياء
/(.)\u0648\u0627(.)\u064a(.)/, // فواعيل
/\u0645\u062a(.)\u0627(.)(.)/]; // Groups of length six patterns and length four roots

var pat64 = [/\u0627(.)(.)(.)\u0627(.)/, // افعلال
/\u0645\u062a(.)(.)(.)(.)/, // متفعلل
/(.)(.)(.)(.)\u0627\u0621/]; // Groups of length five patterns and length three roots

var pat5 = [/\u0627(.)\u062a(.)(.)/, // افتعل
/\u0627(.)\u0627(.)(.)/, // افاعل
/\u0645(.)(.)\u0648(.)/, // مفعول
/\u0645(.)(.)\u0627(.)/, // مفعال
/\u0645(.)(.)\u064a(.)/, // مفعيل
/\u0645(.)(.)(.)\u0629/, // مفعلة
/\u062a(.)(.)(.)\u0629/, // تفعلة
/\u0627(.)(.)(.)\u0629/, // أفعلة
/\u0645(.)\u062a(.)(.)/, // مفتعل
/\u064a(.)\u062a(.)(.)/, // يفتعل
/\u062a(.)\u062a(.)(.)/, // تفتعل
/\u0645(.)\u0627(.)(.)/, // مفاعل
/\u062a(.)\u0627(.)(.)/, // تفاعل
/(.)(.)\u0648(.)\u0629/, // فعولة
/(.)(.)\u0627(.)\u0629/, // فعالة
/\u0627\u0646(.)(.)(.)/, // انفعل
/\u0645\u0646(.)(.)(.)/, // منفعل
/\u0627(.)(.)\u0627(.)/, // افعال
/(.)(.)(.)\u0627\u0646/, // فعلان
/\u062a(.)(.)\u064a(.)/, // تفعيل
/(.)\u0627(.)\u0648(.)/, // فاعول
/(.)\u0648\u0627(.)(.)/, // فواعل
/(.)(.)\u0627\u0626(.)/, // فعائل
/(.)\u0627(.)(.)\u0629/, // فاعلة
/(.)(.)\u0627(.)\u064a/, // فعالي
/(.)(.)(.)\u0627\u0621/, // فعلاء
/\u062a\u0645(.)(.)(.)/]; // Groups of length five patterns and length four roots

var pat54 = [/\u0645(.)(.)(.)(.)/, // مفعلل
/\u062a(.)(.)(.)(.)/, // تفعلل
/\u0627(.)(.)(.)(.)/, // افعلل
/(.)(.)(.)(.)\u0629/, // فعللة
/(.)(.)\u0627(.)(.)/, // فعالل
/(.)(.)(.)\u0648(.)/]; // groups of length four patterns

var pat4 = [/\u0645(.)(.)(.)/, // مفعل
/(.)\u0627(.)(.)/, // فاعل
/(.)(.)\u0648(.)/, // فعول
/(.)(.)\u064a(.)/, // فعيل
/(.)(.)\u0627(.)/, // فعال
/(.)(.)(.)\u0629/, // فعلة
/\u0627(.)(.)(.)/, // افعل
/\u062a(.)(.)(.)/, // تفعل
/(.)\u0648(.)(.)/, // فوعل
/(.)\u064a(.)(.)/, // فيعل
/(.)(.)(.)\u0646/];
var pat3 = [/(.)(.)(.)/ // فعل
];

var Stemmer2 =
/*#__PURE__*/
function () {
  function Stemmer2() {
    _classCallCheck(this, Stemmer2);
  }

  _createClass(Stemmer2, [{
    key: "stem",
    value: function stem(token) {
      var _this = this;

      token = this.preNormalize(token);
      var candidates = this.getCandidates([pat7, pat6, pat64, pat5, pat54, pat4, pat3], token); // if (candidates.length == 0) {
      //     candidates = this.getCandidates([pat3], token);
      // }

      candidates = candidates.filter(function (_ref) {
        var root = _ref.root,
            prefix = _ref.prefix,
            suffix = _ref.suffix;
        return _this.isPotentialPrefix(prefix) && _this.isPotentialSuffix(suffix);
      });
      candidates = candidates.map(function (c) {
        c.root = _this.postNormalize(c.root);
        return c;
      });
      candidates.sort(function (a, b) {
        var lenDiff = a.root.length - b.root.length;
        if (lenDiff) return lenDiff;
        var aFreq = candidates.reduce(function (freq, _ref2) {
          var root = _ref2.root;
          return root == a.root ? freq + 1 : freq;
        }, 0);
        var bFreq = candidates.reduce(function (freq, _ref3) {
          var root = _ref3.root;
          return root == b.root ? freq + 1 : freq;
        }, 0);
        return bFreq - aFreq;
      });
      return candidates;
    }
  }, {
    key: "getMatchingPatterns",
    value: function getMatchingPatterns(token) {
      return [pat7, pat6, pat64, pat5, pat54, pat4, pat3].reduce(function (res, patList) {
        var currentRes = [];
        patList.forEach(function (pat) {
          var match;

          if (match = pat.exec(token)) {
            currentRes = currentRes.concat(pat.source);
          }
        });
        return res.concat(currentRes);
      }, []);
    }
  }, {
    key: "getCandidates",
    value: function getCandidates(patternGroups, token) {
      var _this2 = this;

      return patternGroups.reduce(function (res, patList) {
        var currentRes = [];
        patList.forEach(function (pat) {
          currentRes = currentRes.concat(_this2.extract(pat, token));
        });
        return res.concat(currentRes);
      }, []);
    }
  }, {
    key: "extract",
    value: function extract(pattern, token) {
      var results = [];
      var _token = token;

      while (_token.length >= 3) {
        var match = void 0;

        if (match = pattern.exec(_token)) {
          var _token$split = token.split(match[0]),
              _token$split2 = _slicedToArray(_token$split, 2),
              prefix = _token$split2[0],
              suffix = _token$split2[1];

          var root = match.slice(1).join('');
          results.push({
            root: root,
            prefix: prefix,
            suffix: suffix,
            patLen: match[0].length
          });
          _token = token.substr(prefix.length + 1);
        } else {
          break;
        }
      }

      return results;
    }
  }, {
    key: "isPotentialPrefix",
    value: function isPotentialPrefix(prefix) {
      switch (prefix.length) {
        case 4:
          return p4.includes(prefix);

        case 3:
          return p3.includes(prefix);

        case 2:
          return p2.includes(prefix);

        case 1:
          return p1.includes(prefix);

        case 0:
          return true;
      }

      return false;
    }
  }, {
    key: "isPotentialSuffix",
    value: function isPotentialSuffix(suffix) {
      s3.forEach(function (s) {
        suffix = suffix.replace(s, '');
      });
      s2.forEach(function (s) {
        suffix = suffix.replace(s, '');
      });
      s1.forEach(function (s) {
        suffix = suffix.replace(s, '');
      });
      if (suffix.length == 0) return true;
      return false;
    }
  }, {
    key: "preNormalize",
    value: function preNormalize(token) {
      token = token.replace(re_short_vowels, '');
      token = token.replace(re_hamza, 'ا');
      token = token.replace(/ى/, 'ي');
      return token;
    }
  }, {
    key: "postNormalize",
    value: function postNormalize(token) {
      console.log(token.split(''));

      if (token.length == 3) {
        var c1 = token[0].replace(/[وي]/, 'ا');
        var c2 = token[1].replace(/[او]/, 'ي');
        var c3 = token[2].replace(/[اوه]/, 'ي');
        token = c1 + c2 + c3;
      }

      if (token.length == 2) {
        token = token + 'ي';
      }

      return token;
    }
  }]);

  return Stemmer2;
}();

exports.default = Stemmer2;
},{}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Stemmer2", {
  enumerable: true,
  get: function () {
    return _Stemmer.default;
  }
});
exports.default = void 0;

var _Stemmer = _interopRequireDefault(require("./Stemmer2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// length three prefixes
var p3 = ["\u0643\u0627\u0644", "\u0628\u0627\u0644", "\u0648\u0644\u0644", "\u0648\u0627\u0644"]; // length two prefixes

var p2 = ["\u0627\u0644", "\u0644\u0644"]; // length one prefixes

var p1 = ["\u0644", "\u0628", "\u0641", "\u0633", "\u0648", "\u064A", "\u062A", "\u0646", "\u0627"]; // length three suffixes

var s3 = ["\u062A\u0645\u0644", "\u0647\u0645\u0644", "\u062A\u0627\u0646", "\u062A\u064A\u0646", "\u0643\u0645\u0644", "\u0648\u0646\u0627"]; // length two suffixes

var s2 = ["\u0648\u0646", "\u0627\u062A", "\u0627\u0646", "\u064A\u0646", "\u062A\u0646", "\u0643\u0645", "\u0647\u0646", "\u0646\u0627", "\u064A\u0627", "\u0647\u0627", "\u062A\u0645", "\u0643\u0646", "\u0646\u064A", "\u0648\u0627", "\u0645\u0627", "\u0647\u0645"]; // length one suffixes

var s1 = ["\u0629", "\u0647", "\u064A", "\u0643", "\u062A", "\u0627", "\u0646"]; // groups of length four patterns

var pr4 = {
  0: ["\u0645"],
  1: ["\u0627"],
  2: ["\u0627", "\u0648", "\u064A"],
  3: ["\u0629"]
}; // Groups of length five patterns and length three roots

var pr53 = {
  0: ["\u0627", "\u062A"],
  1: ["\u0627", "\u064A", "\u0648"],
  2: ["\u0627", "\u062A", "\u0645"],
  3: ["\u0645", "\u064A", "\u062A"],
  4: ["\u0645", "\u062A"],
  5: ["\u0627", "\u0648"],
  6: ["\u0627", "\u0645"]
};
var re_short_vowels = /[\u064B-\u0652]/;
var re_hamza = /[\u0621\u0624\u0626]/;
var re_initial_hamza = /^[\u0622\u0623\u0625]/;
var stop_words = ["\u064A\u0643\u0648\u0646", "\u0648\u0644\u064A\u0633", "\u0648\u0643\u0627\u0646", "\u0643\u0630\u0644\u0643", "\u0627\u0644\u062A\u064A", "\u0648\u0628\u064A\u0646", "\u0639\u0644\u064A\u0647\u0627", "\u0645\u0633\u0627\u0621", "\u0627\u0644\u0630\u064A", "\u0648\u0643\u0627\u0646\u062A", "\u0648\u0644\u0643\u0646", "\u0648\u0627\u0644\u062A\u064A", "\u062A\u0643\u0648\u0646", "\u0627\u0644\u064A\u0648\u0645", "\u0627\u0644\u0644\u0630\u064A\u0646", "\u0639\u0644\u064A\u0647", "\u0643\u0627\u0646\u062A", "\u0644\u0630\u0644\u0643", "\u0623\u0645\u0627\u0645", "\u0647\u0646\u0627\u0643", "\u0645\u0646\u0647\u0627", "\u0645\u0627\u0632\u0627\u0644", "\u0644\u0627\u0632\u0627\u0644", "\u0644\u0627\u064A\u0632\u0627\u0644", "\u0645\u0627\u064A\u0632\u0627\u0644", "\u0627\u0635\u0628\u062D", "\u0623\u0635\u0628\u062D", "\u0623\u0645\u0633\u0649", "\u0627\u0645\u0633\u0649", "\u0623\u0636\u062D\u0649", "\u0627\u0636\u062D\u0649", "\u0645\u0627\u0628\u0631\u062D", "\u0645\u0627\u0641\u062A\u0626", "\u0645\u0627\u0627\u0646\u0641\u0643", "\u0644\u0627\u0633\u064A\u0645\u0627", "\u0648\u0644\u0627\u064A\u0632\u0627\u0644", "\u0627\u0644\u062D\u0627\u0644\u064A", "\u0627\u0644\u064A\u0647\u0627", "\u0627\u0644\u0630\u064A\u0646", "\u0641\u0627\u0646\u0647", "\u0648\u0627\u0644\u0630\u064A", "\u0648\u0647\u0630\u0627", "\u0644\u0647\u0630\u0627", "\u0641\u0643\u0627\u0646", "\u0633\u062A\u0643\u0648\u0646", "\u0627\u0644\u064A\u0647", "\u064A\u0645\u0643\u0646", "\u0628\u0647\u0630\u0627", "\u0627\u0644\u0630\u0649"];

var ArabicStemmer =
/*#__PURE__*/
function () {
  function ArabicStemmer() {
    _classCallCheck(this, ArabicStemmer);
  }

  _createClass(ArabicStemmer, [{
    key: "stem",
    value: function stem(token) {
      /*"""
      Stemming a word token using the ISRI stemmer.
      """*/
      token = this.norm(token, 1); // remove diacritics which representing Arabic short vowels

      if (stop_words.includes(token)) {
        return token; // exclude stop words from being processed
      }

      token = this.pre32(token); // remove length three and length two prefixes in this order

      token = this.suf32(token); // remove length three and length two suffixes in this order

      token = this.waw(token); // remove connective ‘و’ if it precedes a word beginning with ‘و’

      token = this.norm(token, 2); // normalize initial hamza to bare alif
      // if 4 <= word length <= 7, then stem; otherwise, no stemming

      if (token.length == 4) // length 4 word
        token = this.pro_w4(token);else if (token.length == 5) {
        // length 5 word
        token = this.pro_w53(token);
        token = this.end_w5(token);
      } else if (token.length == 6) {
        // length 6 word
        token = this.pro_w6(token);
        token = this.end_w6(token);
      } else if (token.length == 7) {
        // length 7 word
        token = this.suf1(token);
        if (token.length == 7) token = this.pre1(token);

        if (token.length == 6) {
          token = this.pro_w6(token);
          token = this.end_w6(token);
        }
      }
      return token;
    }
  }, {
    key: "norm",
    value: function norm(word) {
      var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

      /*"""
      normalization:
      num=1  normalize diacritics
      num=2  normalize initial hamza
      num=3  both 1&2
      """*/
      if (num == 1) word = word.replace(re_short_vowels, '');else if (num == 2) word = word.replace(re_initial_hamza, "\u0627");else if (num == 3) {
        word = word.replace(re_short_vowels, '');
        word = word.replace(re_initial_hamza, "\u0627");
      }
      return word;
    }
  }, {
    key: "pre32",
    value: function pre32(word) {
      /*"""remove length three and length two prefixes in this order"""*/
      if (word.length >= 6) {
        for (var _i = 0; _i < p3.length; _i++) {
          var pre3 = p3[_i];
          if (word.startsWith(pre3)) return word.substr(3);
        }
      }

      if (word.length >= 5) {
        for (var _i2 = 0; _i2 < p2.length; _i2++) {
          var pre2 = p2[_i2];
          if (word.startsWith(pre2)) return word.substr(2);
        }
      }

      return word;
    }
  }, {
    key: "suf32",
    value: function suf32(word) {
      /*"""remove length three and length two suffixes in this order"""*/
      if (word.length >= 6) {
        for (var _i3 = 0; _i3 < s3.length; _i3++) {
          var suf3 = s3[_i3];
          if (word.endsWith(suf3)) return word.substr(0, word.length - 3);
        }
      }

      if (word.length >= 5) {
        for (var _i4 = 0; _i4 < s2.length; _i4++) {
          var suf2 = s2[_i4];
          if (word.endsWith(suf2)) return word.substr(0, word.length - 2);
        }
      }

      return word;
    }
  }, {
    key: "waw",
    value: function waw(word) {
      /*"""remove connective ‘و’ if it precedes a word beginning with ‘و’ """*/
      if (word.length >= 4 && word.substr(0, 2) == "\u0648\u0648") word = word.substr(1);
      return word;
    }
  }, {
    key: "pro_w4",
    value: function pro_w4(word) {
      /* """process length four patterns and extract length three roots""" */
      if (pr4[0].includes(word[0])) {
        // مفعل
        word = word.substr(1);
      } else if (pr4[1].includes(word[1])) {
        // فاعل
        word = word.substr(0, 1) + word.substr(2);
      } else if (pr4[2].includes(word[2])) {
        // فعال - فعول - فعيل 
        word = word.substr(0, 2) + word[3];
      } else if (pr4[3].includes(word[3])) {
        // فعلة
        word = word.substr(0, word.length - 1);
      } else {
        word = this.suf1(word); // do - normalize short sufix

        if (word.length == 4) word = this.pre1(word); // do - normalize short prefix
      }

      return word;
    }
  }, {
    key: "pro_w53",
    value: function pro_w53(word) {
      /* """process length five patterns and extract length three roots""" */
      if (pr53[0].includes(word[2]) && word[0] == "\u0627") // افتعل - افاعل
        word = word[1] + word.substr(3);else if (pr53[1].includes(word[3]) && word[0] == "\u0645") // مفعول - مفعال - مفعيل
        word = word.substr(1, 2) + word[4];else if (pr53[2].includes(word[0]) && word[4] == "\u0629") // مفعلة - تفعلة - افعلة
        word = word.substr(1, 3);else if (pr53[3].includes(word[0]) && word[2] == "\u062A") // مفتعل - يفتعل - تفتعل
        word = word[1] + word.substr(3);else if (pr53[4].includes(word[0]) && word[2] == "\u0627") // مفاعل - تفاعل
        word = word[1] + word.substr(3);else if (pr53[5].includes(word[2]) && word[4] == "\u0629") // فعولة - فعالة
        word = word.substr(0, 2) + word[3];else if (pr53[6].includes(word[0]) && word[1] == "\u0646") // انفعل - منفعل
        word = word.substr(2);else if (word[3] == "\u0627" && word[0] == "\u0627") // افعال
        word = word.substr(1, 2) + word[4];else if (word[4] == "\u0646" && word[3] == "\u0627") // فعلان
        word = word.substr(0, 3);else if (word[3] == "\u064A" && word[0] == "\u062A") // تفعيل
        word = word.substr(1, 2) + word[4];else if (word[3] == "\u0648" && word[1] == "\u0627") // فاعول
        word = word[0] + word[2] + word[4];else if (word[2] == "\u0627" && word[1] == "\u0648") // فواعل
        word = word[0] + word.substr(3);else if (word[3] == "\u0626" && word[2] == "\u0627") // فعائل
        word = word.substr(0, 2) + word[4];else if (word[4] == "\u0629" && word[1] == "\u0627") // فاعلة
        word = word[0] + word.substr(2, 2);else if (word[4] == "\u064A" && word[2] == "\u0627") // فعالي
        word = word.substr(0, 2) + word[3];else {
        word = this.suf1(word); // do - normalize short sufix

        if (word.length == 5) word = this.pre1(word); // do - normalize short prefix
      }
      return word;
    }
  }, {
    key: "pro_w54",
    value: function pro_w54(word) {
      /* """process length five patterns and extract length four roots""" */
      if (pr53[2].includes(word[0])) // تفعلل - افعلل - مفعلل
        word = word.substr(1);else if (word[4] == "\u0629") // فعللة
        word = word.substr(0, 4);else if (word[2] == "\u0627") // فعالل
        word = word.substr(0, 2) + word.substr(3);
      return word;
    }
  }, {
    key: "end_w5",
    value: function end_w5(word) {
      /* """ending step (word of length five)""" */
      if (word.length == 4) word = this.pro_w4(word);else if (word.length == 5) word = this.pro_w54(word);
      return word;
    }
  }, {
    key: "pro_w6",
    value: function pro_w6(word) {
      /* """process length six patterns and extract length three roots""" */
      if (word.startsWith("\u0627\u0633\u062A") || word.startsWith("\u0645\u0633\u062A")) // مستفعل - استفعل
        word = word.substr(3);else if (word[0] == "\u0645" && word[3] == "\u0627" && word[5] == "\u0629") // مفعالة
        word = word.substr(1, 2) + word[4];else if (word[0] == "\u0627" && word[2] == "\u062A" && word[4] == "\u0627") // افتعال
        word = word[1] + word[3] + word[5];else if (word[0] == "\u0627" && word[3] == "\u0648" && word[2] == word[4]) // افعوعل
        word = word[1] + word.substr(4);else if (word[0] == "\u062A" && word[2] == "\u0627" && word[4] == "\u064A") // تفاعيل   new pattern
        word = word[1] + word[3] + word[5];else {
        word = this.suf1(word); // do - normalize short sufix

        if (word.length == 6) word = this.pre1(word); // do - normalize short prefix
      }
      return word;
    }
  }, {
    key: "pro_w64",
    value: function pro_w64(word) {
      /* """process length six patterns and extract length four roots""" */
      if (word[0] == "\u0627" && word[4] == "\u0627") {
        // افعلال
        word = word.substr(1, 3) + word[5];
      } else if (word.startsWith("\u0645\u062A")) // متفعلل
        word = word.substr(2);

      return word;
    }
  }, {
    key: "end_w6",
    value: function end_w6(word) {
      /* """ending step (word of length six)""" */
      if (word.length == 5) {
        word = this.pro_w53(word);
        word = this.end_w5(word);
      } else if (word.length == 6) word = this.pro_w64(word);

      return word;
    }
  }, {
    key: "suf1",
    value: function suf1(word) {
      /* """normalize short sufix""" */
      for (var _i5 = 0; _i5 < s1.length; _i5++) {
        var sf1 = s1[_i5];
        if (word.endsWith(sf1)) return word.substr(0, word.length - 1);
      }

      return word;
    }
  }, {
    key: "pre1",
    value: function pre1(word) {
      /* """normalize short prefix""" */
      for (var _i6 = 0; _i6 < p1.length; _i6++) {
        var sp1 = p1[_i6];
        if (word.startsWith(sp1)) return word.substr(1);
      }

      return word;
    }
  }]);

  return ArabicStemmer;
}();

exports.default = ArabicStemmer;
;
},{"./Stemmer2":"Stemmer2.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40823" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.map