/* eslint-disable */
// Minimal ES5-friendly polyfills for older WebKit (e.g. Kindle browser).
// Keep this file ES5-only (no let/const/arrow/functions with defaults).

(function () {
  // Object.entries
  if (!Object.entries) {
    Object.entries = function (obj) {
      if (obj == null) return [];
      var ownProps = Object.keys(obj);
      var i = ownProps.length;
      var resArray = new Array(i);
      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }
      return resArray;
    };
  }

  // Object.values
  if (!Object.values) {
    Object.values = function (obj) {
      if (obj == null) return [];
      var ownProps = Object.keys(obj);
      var i = ownProps.length;
      var resArray = new Array(i);
      while (i--) {
        resArray[i] = obj[ownProps[i]];
      }
      return resArray;
    };
  }

  // Array.prototype.includes
  if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement, fromIndex) {
      var o = Object(this);
      var len = parseInt(o.length, 10) || 0;
      if (len === 0) return false;
      var n = parseInt(fromIndex, 10) || 0;
      var k = n >= 0 ? n : Math.max(len + n, 0);
      while (k < len) {
        var currentElement = o[k];
        // SameValueZero comparison
        if (
          searchElement === currentElement ||
          (searchElement !== searchElement && currentElement !== currentElement)
        ) {
          return true;
        }
        k++;
      }
      return false;
    };
  }

  // Array.prototype.find
  if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
      if (this == null) throw new TypeError("Array.prototype.find called on null or undefined");
      if (typeof predicate !== "function") throw new TypeError("predicate must be a function");
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments.length > 1 ? arguments[1] : undefined;
      for (var i = 0; i < length; i++) {
        var value = list[i];
        if (predicate.call(thisArg, value, i, list)) return value;
      }
      return undefined;
    };
  }

  // String.prototype.includes
  if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
      if (Object.prototype.toString.call(search) === "[object RegExp]") {
        throw new TypeError("First argument to String.prototype.includes must not be a RegExp");
      }

      var str = String(this);
      var searchStr = String(search);
      var pos = typeof start === "number" ? start : 0;
      if (pos < 0) pos = 0;
      if (pos + searchStr.length > str.length) return false;
      return str.indexOf(searchStr, pos) !== -1;
    };
  }

  // String.prototype.startsWith
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
      if (Object.prototype.toString.call(searchString) === "[object RegExp]") {
        throw new TypeError(
          "First argument to String.prototype.startsWith must not be a RegExp"
        );
      }

      var str = String(this);
      var searchStr = String(searchString);
      var pos = position > 0 ? position : 0;
      return str.substr(pos, searchStr.length) === searchStr;
    };
  }

  // URLSearchParams (minimal)
  // Supports: constructor(string), get, set, append, toString
  // Always define the polyfill constructor locally so URLPolyfill can use it
  // (native URLSearchParams doesn't provide a hook to keep URL.search in sync).
  var URLSearchParamsPolyfill = null;
  if (typeof window !== "undefined") {
    URLSearchParamsPolyfill = function (init, onChange) {
      this._pairs = [];
      this._onChange = typeof onChange === "function" ? onChange : null;

      if (!init) return;
      var str = String(init);
      if (str.charAt(0) === "?") str = str.slice(1);
      if (!str) return;

      var parts = str.split("&");
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (!part) continue;
        var eq = part.indexOf("=");
        var rawKey = eq === -1 ? part : part.slice(0, eq);
        var rawValue = eq === -1 ? "" : part.slice(eq + 1);
        var key = safeDecode(rawKey.replace(/\+/g, " "));
        var value = safeDecode(rawValue.replace(/\+/g, " "));
        this._pairs.push([key, value]);
      }
    };

    function safeDecode(s) {
      try {
        return decodeURIComponent(s);
      } catch (e) {
        return s;
      }
    }

    function safeEncode(s) {
      try {
        return encodeURIComponent(s);
      } catch (e) {
        return s;
      }
    }

    URLSearchParamsPolyfill.prototype._notify = function () {
      if (this._onChange) this._onChange(this.toString());
    };

    URLSearchParamsPolyfill.prototype.get = function (name) {
      var key = String(name);
      for (var i = 0; i < this._pairs.length; i++) {
        if (this._pairs[i][0] === key) return this._pairs[i][1];
      }
      return null;
    };

    URLSearchParamsPolyfill.prototype.has = function (name) {
      var key = String(name);
      for (var i = 0; i < this._pairs.length; i++) {
        if (this._pairs[i][0] === key) return true;
      }
      return false;
    };

    URLSearchParamsPolyfill.prototype.set = function (name, value) {
      var key = String(name);
      var val = String(value);
      var next = [];
      for (var i = 0; i < this._pairs.length; i++) {
        if (this._pairs[i][0] !== key) next.push(this._pairs[i]);
      }
      next.push([key, val]);
      this._pairs = next;
      this._notify();
    };

    URLSearchParamsPolyfill.prototype.append = function (name, value) {
      this._pairs.push([String(name), String(value)]);
      this._notify();
    };

    URLSearchParamsPolyfill.prototype.toString = function () {
      var out = [];
      for (var i = 0; i < this._pairs.length; i++) {
        out.push(safeEncode(this._pairs[i][0]) + "=" + safeEncode(this._pairs[i][1]));
      }
      return out.join("&");
    };

    if (!window.URLSearchParams) {
      window.URLSearchParams = URLSearchParamsPolyfill;
    }
  }

  // URL (minimal)
  // Supports: new URL(absoluteUrl), href/protocol/hostname/host/pathname/search/hash, searchParams, toString
  // If a native URL exists but lacks `searchParams`, replace it with this polyfill.
  if (typeof window !== "undefined") {
    var needsURLPolyfill = !window.URL;
    try {
      if (window.URL) {
        var test = new window.URL("https://example.com/?a=1");
        if (!test || !test.searchParams || typeof test.searchParams.get !== "function") {
          needsURLPolyfill = true;
        }
      }
    } catch (e) {
      needsURLPolyfill = true;
    }

    if (needsURLPolyfill) {
      function URLPolyfill(url, base) {
        if (typeof document === "undefined") throw new TypeError("URL is not supported");
        var a = document.createElement("a");

        var input = String(url);
        if (base && input.charAt(0) === "/") {
          var b = document.createElement("a");
          b.href = String(base);
          a.href = b.protocol + "//" + b.host + input;
        } else {
          a.href = input;
        }

        this.href = a.href;
        this.protocol = a.protocol || "";
        this.host = a.host || "";
        this.hostname = a.hostname || "";
        this.port = a.port || "";
        this.pathname = a.pathname || "";
        if (this.pathname && this.pathname.charAt(0) !== "/") this.pathname = "/" + this.pathname;
        this.search = a.search || "";
        this.hash = a.hash || "";
        this.origin = this.protocol && this.host ? this.protocol + "//" + this.host : "";

        var self = this;
        this.searchParams = new URLSearchParamsPolyfill(this.search, function (qs) {
          self.search = qs ? "?" + qs : "";
          self.href = self.origin + self.pathname + self.search + self.hash;
        });
      }

      URLPolyfill.prototype.toString = function () {
        return this.href;
      };

      window.URL = URLPolyfill;
    }
  }
})();
