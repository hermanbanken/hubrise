var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCommandProperties = exports.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issue = exports.issueCommand = void 0;
    var os2 = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os2.EOL);
    }
    exports.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issueCommand = void 0;
    var fs2 = __importStar(require("fs"));
    var os2 = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs2.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs2.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os2.EOL}`, {
        encoding: "utf8"
      });
    }
    exports.issueCommand = issueCommand;
  }
});

// node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getProxyUrl(reqUrl) {
      let usingSsl = reqUrl.protocol === "https:";
      let proxyUrl;
      if (checkBypass(reqUrl)) {
        return proxyUrl;
      }
      let proxyVar;
      if (usingSsl) {
        proxyVar = process.env["https_proxy"] || process.env["HTTPS_PROXY"];
      } else {
        proxyVar = process.env["http_proxy"] || process.env["HTTP_PROXY"];
      }
      if (proxyVar) {
        proxyUrl = new URL(proxyVar);
      }
      return proxyUrl;
    }
    exports.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      let noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      let upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (let upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports.httpOverHttp = httpOverHttp;
    exports.httpsOverHttp = httpsOverHttp;
    exports.httpOverHttps = httpOverHttps;
    exports.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self = this;
      self.options = options || {};
      self.proxyOptions = self.options.proxy || {};
      self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
      self.requests = [];
      self.sockets = [];
      self.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self = this;
      var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options);
        return;
      }
      self.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this;
      var placeholder = {};
      self.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug("making CONNECT request");
      var connectReq = self.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug("tunneling socket could not be established, statusCode=%d", res.statusCode);
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        debug("tunneling connection has established");
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self = this;
      TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports.debug = debug;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/index.js
var require_http_client = __commonJS({
  "node_modules/@actions/http-client/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var http = require("http");
    var https = require("https");
    var pm = require_proxy();
    var tunnel;
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports.Headers || (exports.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return new Promise(async (resolve, reject) => {
          let output = Buffer.alloc(0);
          this.message.on("data", (chunk) => {
            output = Buffer.concat([output, chunk]);
          });
          this.message.on("end", () => {
            resolve(output.toString());
          });
        });
      }
    };
    exports.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      let parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
      }
      get(requestUrl, additionalHeaders) {
        return this.request("GET", requestUrl, null, additionalHeaders || {});
      }
      del(requestUrl, additionalHeaders) {
        return this.request("DELETE", requestUrl, null, additionalHeaders || {});
      }
      post(requestUrl, data, additionalHeaders) {
        return this.request("POST", requestUrl, data, additionalHeaders || {});
      }
      patch(requestUrl, data, additionalHeaders) {
        return this.request("PATCH", requestUrl, data, additionalHeaders || {});
      }
      put(requestUrl, data, additionalHeaders) {
        return this.request("PUT", requestUrl, data, additionalHeaders || {});
      }
      head(requestUrl, additionalHeaders) {
        return this.request("HEAD", requestUrl, null, additionalHeaders || {});
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
      }
      async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
          throw new Error("Client has already been disposed.");
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
          response = await this.requestRaw(info, data);
          if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
            let authenticationHandler;
            for (let i = 0; i < this.handlers.length; i++) {
              if (this.handlers[i].canHandleAuthentication(response)) {
                authenticationHandler = this.handlers[i];
                break;
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info, data);
            } else {
              return response;
            }
          }
          let redirectsRemaining = this._maxRedirects;
          while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
            const redirectUrl = response.message.headers["location"];
            if (!redirectUrl) {
              break;
            }
            let parsedRedirectUrl = new URL(redirectUrl);
            if (parsedUrl.protocol == "https:" && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            }
            await response.readBody();
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (let header in headers) {
                if (header.toLowerCase() === "authorization") {
                  delete headers[header];
                }
              }
            }
            info = this._prepareRequest(verb, parsedRedirectUrl, headers);
            response = await this.requestRaw(info, data);
            redirectsRemaining--;
          }
          if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
            return response;
          }
          numTries += 1;
          if (numTries < maxTries) {
            await response.readBody();
            await this._performExponentialBackoff(numTries);
          }
        }
        return response;
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info, data) {
        return new Promise((resolve, reject) => {
          let callbackForResult = function(err, res) {
            if (err) {
              reject(err);
            }
            resolve(res);
          };
          this.requestRawWithCallback(info, data, callbackForResult);
        });
      }
      requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === "string") {
          info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        };
        let req = info.httpModule.request(info.options, (msg) => {
          let res = new HttpClientResponse(msg);
          handleResult(null, res);
        });
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error("Request timeout: " + info.options.path), null);
        });
        req.on("error", function(err) {
          handleResult(err, null);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          this.handlers.forEach((handler) => {
            handler.prepareRequest(info.options);
          });
        }
        return info;
      }
      _mergeHeaders(headers) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c2, k) => (c2[k.toLowerCase()] = obj[k], c2), {});
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c2, k) => (c2[k.toLowerCase()] = obj[k], c2), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (!!agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (!!this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
          if (!tunnel) {
            tunnel = require_tunnel2();
          }
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: {
              ...(proxyUrl.username || proxyUrl.password) && {
                proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
              },
              host: proxyUrl.hostname,
              port: proxyUrl.port
            }
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
      }
      static dateTimeDeserializer(key, value) {
        if (typeof value === "string") {
          let a = new Date(value);
          if (!isNaN(a.valueOf())) {
            return a;
          }
        }
        return value;
      }
      async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
          const statusCode = res.message.statusCode;
          const response = {
            statusCode,
            result: null,
            headers: {}
          };
          if (statusCode == HttpCodes.NotFound) {
            resolve(response);
          }
          let obj;
          let contents;
          try {
            contents = await res.readBody();
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
              } else {
                obj = JSON.parse(contents);
              }
              response.result = obj;
            }
            response.headers = res.message.headers;
          } catch (err) {
          }
          if (statusCode > 299) {
            let msg;
            if (obj && obj.message) {
              msg = obj.message;
            } else if (contents && contents.length > 0) {
              msg = contents;
            } else {
              msg = "Failed request: (" + statusCode + ")";
            }
            let err = new HttpClientError(msg, statusCode);
            err.result = response.result;
            reject(err);
          } else {
            resolve(response);
          }
        });
      }
    };
    exports.HttpClient = HttpClient;
  }
});

// node_modules/@actions/http-client/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/auth.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        options.headers["Authorization"] = "Basic " + Buffer.from(this.username + ":" + this.password).toString("base64");
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers["Authorization"] = "Bearer " + this.token;
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers["Authorization"] = "Basic " + Buffer.from("PAT:" + this.token).toString("base64");
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OidcClient = void 0;
    var http_client_1 = require_http_client();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os2 = __importStar(require("os"));
    var path2 = __importStar(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        const delimiter = "_GitHubActionsFileCommandDelimeter_";
        const commandValue = `${name}<<${delimiter}${os2.EOL}${convertedVal}${os2.EOL}${delimiter}`;
        file_command_1.issueCommand("ENV", commandValue);
      } else {
        command_1.issueCommand("set-env", { name }, convertedVal);
      }
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path2.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput2(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput2;
    function getMultilineInput(name, options) {
      const inputs = getInput2(name, options).split("\n").filter((x) => x !== "");
      return inputs;
    }
    exports.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput2(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports.getBooleanInput = getBooleanInput;
    function setOutput2(name, value) {
      process.stdout.write(os2.EOL);
      command_1.issueCommand("set-output", { name }, value);
    }
    exports.setOutput = setOutput2;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports.isDebug = isDebug;
    function debug(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports.debug = debug;
    function error(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.error = error;
    function warning(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.notice = notice;
    function info(message) {
      process.stdout.write(message + os2.EOL);
    }
    exports.info = info;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name, value) {
      command_1.issueCommand("save-state", { name }, value);
    }
    exports.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports.getIDToken = getIDToken;
  }
});

// node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "node_modules/fs.realpath/old.js"(exports) {
    var pathModule = require("path");
    var isWindows = process.platform === "win32";
    var fs2 = require("fs");
    var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        if (err) {
          backtrace.message = err.message;
          err = backtrace;
          missingCallback(err);
        }
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          else if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            if (process.traceDeprecation)
              console.trace(msg);
            else
              console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb === "function" ? cb : rethrow();
    }
    var normalize = pathModule.normalize;
    if (isWindows) {
      nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
    } else {
      nextPartRe = /(.*?)(?:[\/]+|$)/g;
    }
    var nextPartRe;
    if (isWindows) {
      splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    } else {
      splitRootRe = /^[\/]*/;
    }
    var splitRootRe;
    exports.realpathSync = function realpathSync(p, cache) {
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return cache[p];
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs2.lstatSync(base);
          knownHard[base] = true;
        }
      }
      while (pos < p.length) {
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          continue;
        }
        var resolvedLink;
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          resolvedLink = cache[base];
        } else {
          var stat = fs2.lstatSync(base);
          if (!stat.isSymbolicLink()) {
            knownHard[base] = true;
            if (cache)
              cache[base] = base;
            continue;
          }
          var linkTarget = null;
          if (!isWindows) {
            var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
            if (seenLinks.hasOwnProperty(id)) {
              linkTarget = seenLinks[id];
            }
          }
          if (linkTarget === null) {
            fs2.statSync(base);
            linkTarget = fs2.readlinkSync(base);
          }
          resolvedLink = pathModule.resolve(previous, linkTarget);
          if (cache)
            cache[base] = resolvedLink;
          if (!isWindows)
            seenLinks[id] = linkTarget;
        }
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
      if (cache)
        cache[original] = p;
      return p;
    };
    exports.realpath = function realpath(p, cache, cb) {
      if (typeof cb !== "function") {
        cb = maybeCallback(cache);
        cache = null;
      }
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return process.nextTick(cb.bind(null, null, cache[p]));
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs2.lstat(base, function(err) {
            if (err)
              return cb(err);
            knownHard[base] = true;
            LOOP();
          });
        } else {
          process.nextTick(LOOP);
        }
      }
      function LOOP() {
        if (pos >= p.length) {
          if (cache)
            cache[original] = p;
          return cb(null, p);
        }
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          return process.nextTick(LOOP);
        }
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          return gotResolvedLink(cache[base]);
        }
        return fs2.lstat(base, gotStat);
      }
      function gotStat(err, stat) {
        if (err)
          return cb(err);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache)
            cache[base] = base;
          return process.nextTick(LOOP);
        }
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            return gotTarget(null, seenLinks[id], base);
          }
        }
        fs2.stat(base, function(err2) {
          if (err2)
            return cb(err2);
          fs2.readlink(base, function(err3, target) {
            if (!isWindows)
              seenLinks[id] = target;
            gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base2) {
        if (err)
          return cb(err);
        var resolvedLink = pathModule.resolve(previous, target);
        if (cache)
          cache[base2] = resolvedLink;
        gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
    };
  }
});

// node_modules/fs.realpath/index.js
var require_fs = __commonJS({
  "node_modules/fs.realpath/index.js"(exports, module2) {
    module2.exports = realpath;
    realpath.realpath = realpath;
    realpath.sync = realpathSync;
    realpath.realpathSync = realpathSync;
    realpath.monkeypatch = monkeypatch;
    realpath.unmonkeypatch = unmonkeypatch;
    var fs2 = require("fs");
    var origRealpath = fs2.realpath;
    var origRealpathSync = fs2.realpathSync;
    var version = process.version;
    var ok = /^v[0-5]\./.test(version);
    var old = require_old();
    function newError(er) {
      return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
    }
    function realpath(p, cache, cb) {
      if (ok) {
        return origRealpath(p, cache, cb);
      }
      if (typeof cache === "function") {
        cb = cache;
        cache = null;
      }
      origRealpath(p, cache, function(er, result) {
        if (newError(er)) {
          old.realpath(p, cache, cb);
        } else {
          cb(er, result);
        }
      });
    }
    function realpathSync(p, cache) {
      if (ok) {
        return origRealpathSync(p, cache);
      }
      try {
        return origRealpathSync(p, cache);
      } catch (er) {
        if (newError(er)) {
          return old.realpathSync(p, cache);
        } else {
          throw er;
        }
      }
    }
    function monkeypatch() {
      fs2.realpath = realpath;
      fs2.realpathSync = realpathSync;
    }
    function unmonkeypatch() {
      fs2.realpath = origRealpath;
      fs2.realpathSync = origRealpathSync;
    }
  }
});

// node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "node_modules/concat-map/index.js"(exports, module2) {
    module2.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x))
          res.push.apply(res, x);
        else
          res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports, module2) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre))
        return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c2;
          if (isAlphaSequence) {
            c2 = String.fromCharCode(i);
            if (c2 === "\\")
              c2 = "";
          } else {
            c2 = String(i);
            if (pad) {
              var need = width - c2.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c2 = "-" + z + c2.slice(1);
                else
                  c2 = z + c2;
              }
            }
          }
          N.push(c2);
        }
      } else {
        N = concatMap(n, function(el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  }
});

// node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/minimatch/minimatch.js"(exports, module2) {
    module2.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path2 = function() {
      try {
        return require("path");
      } catch (e) {
      }
    }() || {
      sep: "/"
    };
    minimatch.sep = path2.sep;
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c2) {
        set[c2] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      b = b || {};
      var t = {};
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch;
      }
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      m.Minimatch.defaults = function defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      };
      m.filter = function filter2(pattern, options) {
        return orig.filter(pattern, ext(def, options));
      };
      m.defaults = function defaults(options) {
        return orig.defaults(ext(def, options));
      };
      m.makeRe = function makeRe2(pattern, options) {
        return orig.makeRe(pattern, ext(def, options));
      };
      m.braceExpand = function braceExpand2(pattern, options) {
        return orig.braceExpand(pattern, ext(def, options));
      };
      m.match = function(list, pattern, options) {
        return orig.match(list, pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      assertValidPattern(pattern);
      if (!options)
        options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      assertValidPattern(pattern);
      if (!options)
        options = {};
      pattern = pattern.trim();
      if (!options.allowWindowsEscape && path2.sep !== "/") {
        pattern = pattern.split(path2.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug)
        this.debug = function debug() {
          console.error.apply(console, arguments);
        };
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate)
        return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    }
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = function(pattern) {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    Minimatch.prototype.parse = parse;
    var SUBPARSE = {};
    function parse(pattern, isSub) {
      assertValidPattern(pattern);
      var options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR;
        else
          pattern = "*";
      }
      if (pattern === "")
        return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c2; i < len && (c2 = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c2);
        if (escaping && reSpecials[c2]) {
          re += "\\" + c2;
          escaping = false;
          continue;
        }
        switch (c2) {
          case "/": {
            return false;
          }
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c2);
            if (inClass) {
              this.debug("  in class");
              if (c2 === "!" && i === classStart + 1)
                c2 = "^";
              re += c2;
              continue;
            }
            self.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c2;
            if (options.noext)
              clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c2;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c2;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c2;
              escaping = false;
              continue;
            }
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
            hasMagic = true;
            inClass = false;
            re += c2;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c2] && !(c2 === "^" && inClass)) {
              re += "\\";
            }
            re += c2;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case "[":
        case ".":
        case "(":
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate)
        re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = function match(f, partial) {
      if (typeof partial === "undefined")
        partial = this.partial;
      this.debug("match", f, this.pattern);
      if (this.comment)
        return false;
      if (this.empty)
        return f === "";
      if (f === "/" && partial)
        return true;
      var options = this.options;
      if (path2.sep !== "/") {
        f = f.split(path2.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename)
          break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate)
            return true;
          return !this.negate;
        }
      }
      if (options.flipNegate)
        return false;
      return this.negate;
    };
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug("matchOne", { "this": this, file, pattern });
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false)
          return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl)
              return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function")
        throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "node_modules/path-is-absolute/index.js"(exports, module2) {
    "use strict";
    function posix(path2) {
      return path2.charAt(0) === "/";
    }
    function win32(path2) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path2);
      var device = result[1] || "";
      var isUnc = Boolean(device && device.charAt(1) !== ":");
      return Boolean(result[2] || isUnc);
    }
    module2.exports = process.platform === "win32" ? win32 : posix;
    module2.exports.posix = posix;
    module2.exports.win32 = win32;
  }
});

// node_modules/glob/common.js
var require_common = __commonJS({
  "node_modules/glob/common.js"(exports) {
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var fs2 = require("fs");
    var path2 = require("path");
    var minimatch = require_minimatch();
    var isAbsolute = require_path_is_absolute();
    var Minimatch = minimatch.Minimatch;
    function alphasort(a, b) {
      return a.localeCompare(b, "en");
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [];
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore];
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern, { dot: true });
      }
      return {
        matcher: new Minimatch(pattern, { dot: true }),
        gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && pattern.indexOf("/") === -1) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent;
      self.pattern = pattern;
      self.strict = options.strict !== false;
      self.realpath = !!options.realpath;
      self.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self.follow = !!options.follow;
      self.dot = !!options.dot;
      self.mark = !!options.mark;
      self.nodir = !!options.nodir;
      if (self.nodir)
        self.mark = true;
      self.sync = !!options.sync;
      self.nounique = !!options.nounique;
      self.nonull = !!options.nonull;
      self.nosort = !!options.nosort;
      self.nocase = !!options.nocase;
      self.stat = !!options.stat;
      self.noprocess = !!options.noprocess;
      self.absolute = !!options.absolute;
      self.fs = options.fs || fs2;
      self.maxLength = options.maxLength || Infinity;
      self.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self, options);
      self.changedCwd = false;
      var cwd = process.cwd();
      if (!ownProp(options, "cwd"))
        self.cwd = cwd;
      else {
        self.cwd = path2.resolve(options.cwd);
        self.changedCwd = self.cwd !== cwd;
      }
      self.root = options.root || path2.resolve(self.cwd, "/");
      self.root = path2.resolve(self.root);
      if (process.platform === "win32")
        self.root = self.root.replace(/\\/g, "/");
      self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
      if (process.platform === "win32")
        self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
      self.nomount = !!options.nomount;
      options.nonegate = true;
      options.nocomment = true;
      self.minimatch = new Minimatch(pattern, options);
      self.options = self.minimatch.options;
    }
    function finish(self) {
      var nou = self.nounique;
      var all = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all.push.apply(all, m);
          else
            m.forEach(function(m2) {
              all[m2] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self.nosort)
        all = all.sort(alphasort);
      if (self.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self._mark(all[i]);
        }
        if (self.nodir) {
          all = all.filter(function(e) {
            var notDir = !/\/$/.test(e);
            var c2 = self.cache[e] || self.cache[makeAbs(self, e)];
            if (notDir && c2)
              notDir = c2 !== "DIR" && !Array.isArray(c2);
            return notDir;
          });
        }
      }
      if (self.ignore.length)
        all = all.filter(function(m2) {
          return !isIgnored(self, m2);
        });
      self.found = all;
    }
    function mark(self, p) {
      var abs = makeAbs(self, p);
      var c2 = self.cache[abs];
      var m = p;
      if (c2) {
        var isDir = c2 === "DIR" || Array.isArray(c2);
        var slash = p.slice(-1) === "/";
        if (isDir && !slash)
          m += "/";
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self, m);
          self.statCache[mabs] = self.statCache[abs];
          self.cache[mabs] = self.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self, f) {
      var abs = f;
      if (f.charAt(0) === "/") {
        abs = path2.join(self.root, f);
      } else if (isAbsolute(f) || f === "") {
        abs = f;
      } else if (self.changedCwd) {
        abs = path2.resolve(self.cwd, f);
      } else {
        abs = path2.resolve(f);
      }
      if (process.platform === "win32")
        abs = abs.replace(/\\/g, "/");
      return abs;
    }
    function isIgnored(self, path3) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return item.matcher.match(path3) || !!(item.gmatcher && item.gmatcher.match(path3));
      });
    }
    function childrenIgnored(self, path3) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path3));
      });
    }
  }
});

// node_modules/glob/sync.js
var require_sync = __commonJS({
  "node_modules/glob/sync.js"(exports, module2) {
    module2.exports = globSync;
    globSync.GlobSync = GlobSync;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var Glob = require_glob().Glob;
    var util = require("util");
    var path2 = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert(this instanceof GlobSync);
      if (this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset) {
            try {
              p = self._makeAbs(p);
              var real = rp.realpathSync(p, self.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === "stat")
                set[self._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert(this instanceof GlobSync);
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path2.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (isIgnored(this, e))
        return;
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute) {
        e = abs;
      }
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c2 = this.cache[abs];
        if (c2 === "DIR" || Array.isArray(c2))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er.code === "ENOENT") {
          return null;
        }
      }
      var isSym = lstat && lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (!c2 || c2 === "FILE")
          return null;
        if (Array.isArray(c2))
          return c2;
      }
      try {
        return this._readdirEntries(abs, this.fs.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            throw error;
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path2.join(this.root, prefix);
        } else {
          prefix = path2.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (Array.isArray(c2))
          c2 = "DIR";
        if (!needDir || c2 === "DIR")
          return c2;
        if (needDir && c2 === "FILE")
          return false;
      }
      var exists;
      var stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = this.fs.lstatSync(abs);
        } catch (er) {
          if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
            this.statCache[abs] = false;
            return false;
          }
        }
        if (lstat && lstat.isSymbolicLink()) {
          try {
            stat = this.fs.statSync(abs);
          } catch (er) {
            stat = lstat;
          }
        } else {
          stat = lstat;
        }
      }
      this.statCache[abs] = stat;
      var c2 = true;
      if (stat)
        c2 = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c2;
      if (needDir && c2 === "FILE")
        return false;
      return c2;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/wrappy/wrappy.js"(exports, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/once/once.js"(exports, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called)
          return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "node_modules/inflight/inflight.js"(exports, module2) {
    var wrappy = require_wrappy();
    var reqs = /* @__PURE__ */ Object.create(null);
    var once = require_once();
    module2.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice(arguments);
        try {
          for (var i = 0; i < len; i++) {
            cbs[i].apply(null, args);
          }
        } finally {
          if (cbs.length > len) {
            cbs.splice(0, len);
            process.nextTick(function() {
              RES.apply(null, args);
            });
          } else {
            delete reqs[key];
          }
        }
      });
    }
    function slice(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++)
        array[i] = args[i];
      return array;
    }
  }
});

// node_modules/glob/glob.js
var require_glob = __commonJS({
  "node_modules/glob/glob.js"(exports, module2) {
    module2.exports = glob2;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var inherits = require_inherits();
    var EE = require("events").EventEmitter;
    var path2 = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var globSync = require_sync();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util = require("util");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require_once();
    function glob2(pattern, options, cb) {
      if (typeof options === "function")
        cb = options, options = {};
      if (!options)
        options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob2.sync = globSync;
    var GlobSync = glob2.GlobSync = globSync.GlobSync;
    glob2.glob = glob2;
    function extend(origin, add) {
      if (add === null || typeof add !== "object") {
        return origin;
      }
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    glob2.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (!pattern)
        return false;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== "string")
          return true;
      }
      return false;
    };
    glob2.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      if (typeof cb === "function") {
        cb = once(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self = this;
      this._processing = 0;
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n === 0)
        return done();
      var sync = true;
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      sync = false;
      function done() {
        --self._processing;
        if (self._processing <= 0) {
          if (sync) {
            process.nextTick(function() {
              self._finish();
            });
          } else {
            self._finish();
          }
        }
      }
    }
    Glob.prototype._finish = function() {
      assert(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      var self = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n === 0)
          self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self = this;
      var n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self._makeAbs(p);
        rp.realpath(p, self.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === "stat")
            set[p] = true;
          else
            self.emit("error", er);
          if (--n === 0) {
            self.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert(this instanceof Glob);
      assert(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path2.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = isAbsolute(e) ? e : this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute)
        e = abs;
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c2 = this.cache[abs];
        if (c2 === "DIR" || Array.isArray(c2))
          return;
      }
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit("stat", e, st);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        self.fs.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er && er.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self.symlinks[abs] = isSym;
        if (!isSym && lstat && !lstat.isDirectory()) {
          self.cache[abs] = "FILE";
          cb();
        } else
          self._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (!c2 || c2 === "FILE")
          return cb();
        if (Array.isArray(c2))
          return cb(null, c2);
      }
      var self = this;
      self.fs.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self, abs, cb) {
      return function(er, entries) {
        if (er)
          self._readdirError(abs, er, cb);
        else
          self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return;
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            this.emit("error", error);
            this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit("error", er);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er, exists) {
        self._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path2.join(this.root, prefix);
        } else {
          prefix = path2.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (Array.isArray(c2))
          c2 = "DIR";
        if (!needDir || c2 === "DIR")
          return cb(null, c2);
        if (needDir && c2 === "FILE")
          return cb();
      }
      var exists;
      var stat = this.statCache[abs];
      if (stat !== void 0) {
        if (stat === false)
          return cb(null, stat);
        else {
          var type = stat.isDirectory() ? "DIR" : "FILE";
          if (needDir && type === "FILE")
            return cb();
          else
            return cb(null, type, stat);
        }
      }
      var self = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        self.fs.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return self.fs.stat(abs, function(er2, stat2) {
            if (er2)
              self._stat2(f, abs, null, lstat, cb);
            else
              self._stat2(f, abs, er2, stat2, cb);
          });
        } else {
          self._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === "/";
      this.statCache[abs] = stat;
      if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
        return cb(null, false, stat);
      var c2 = true;
      if (stat)
        c2 = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c2;
      if (needDir && c2 === "FILE")
        return cb();
      return cb(null, c2, stat);
    };
  }
});

// node_modules/pend/index.js
var require_pend = __commonJS({
  "node_modules/pend/index.js"(exports, module2) {
    module2.exports = Pend;
    function Pend() {
      this.pending = 0;
      this.max = Infinity;
      this.listeners = [];
      this.waiting = [];
      this.error = null;
    }
    Pend.prototype.go = function(fn) {
      if (this.pending < this.max) {
        pendGo(this, fn);
      } else {
        this.waiting.push(fn);
      }
    };
    Pend.prototype.wait = function(cb) {
      if (this.pending === 0) {
        cb(this.error);
      } else {
        this.listeners.push(cb);
      }
    };
    Pend.prototype.hold = function() {
      return pendHold(this);
    };
    function pendHold(self) {
      self.pending += 1;
      var called = false;
      return onCb;
      function onCb(err) {
        if (called)
          throw new Error("callback called twice");
        called = true;
        self.error = self.error || err;
        self.pending -= 1;
        if (self.waiting.length > 0 && self.pending < self.max) {
          pendGo(self, self.waiting.shift());
        } else if (self.pending === 0) {
          var listeners = self.listeners;
          self.listeners = [];
          listeners.forEach(cbListener);
        }
      }
      function cbListener(listener) {
        listener(self.error);
      }
    }
    function pendGo(self, fn) {
      fn(pendHold(self));
    }
  }
});

// node_modules/fd-slicer/index.js
var require_fd_slicer = __commonJS({
  "node_modules/fd-slicer/index.js"(exports) {
    var fs2 = require("fs");
    var util = require("util");
    var stream = require("stream");
    var Readable = stream.Readable;
    var Writable = stream.Writable;
    var PassThrough = stream.PassThrough;
    var Pend = require_pend();
    var EventEmitter = require("events").EventEmitter;
    exports.createFromBuffer = createFromBuffer;
    exports.createFromFd = createFromFd;
    exports.BufferSlicer = BufferSlicer;
    exports.FdSlicer = FdSlicer;
    util.inherits(FdSlicer, EventEmitter);
    function FdSlicer(fd, options) {
      options = options || {};
      EventEmitter.call(this);
      this.fd = fd;
      this.pend = new Pend();
      this.pend.max = 1;
      this.refCount = 0;
      this.autoClose = !!options.autoClose;
    }
    FdSlicer.prototype.read = function(buffer, offset, length, position, callback) {
      var self = this;
      self.pend.go(function(cb) {
        fs2.read(self.fd, buffer, offset, length, position, function(err, bytesRead, buffer2) {
          cb();
          callback(err, bytesRead, buffer2);
        });
      });
    };
    FdSlicer.prototype.write = function(buffer, offset, length, position, callback) {
      var self = this;
      self.pend.go(function(cb) {
        fs2.write(self.fd, buffer, offset, length, position, function(err, written, buffer2) {
          cb();
          callback(err, written, buffer2);
        });
      });
    };
    FdSlicer.prototype.createReadStream = function(options) {
      return new ReadStream(this, options);
    };
    FdSlicer.prototype.createWriteStream = function(options) {
      return new WriteStream(this, options);
    };
    FdSlicer.prototype.ref = function() {
      this.refCount += 1;
    };
    FdSlicer.prototype.unref = function() {
      var self = this;
      self.refCount -= 1;
      if (self.refCount > 0)
        return;
      if (self.refCount < 0)
        throw new Error("invalid unref");
      if (self.autoClose) {
        fs2.close(self.fd, onCloseDone);
      }
      function onCloseDone(err) {
        if (err) {
          self.emit("error", err);
        } else {
          self.emit("close");
        }
      }
    };
    util.inherits(ReadStream, Readable);
    function ReadStream(context, options) {
      options = options || {};
      Readable.call(this, options);
      this.context = context;
      this.context.ref();
      this.start = options.start || 0;
      this.endOffset = options.end;
      this.pos = this.start;
      this.destroyed = false;
    }
    ReadStream.prototype._read = function(n) {
      var self = this;
      if (self.destroyed)
        return;
      var toRead = Math.min(self._readableState.highWaterMark, n);
      if (self.endOffset != null) {
        toRead = Math.min(toRead, self.endOffset - self.pos);
      }
      if (toRead <= 0) {
        self.destroyed = true;
        self.push(null);
        self.context.unref();
        return;
      }
      self.context.pend.go(function(cb) {
        if (self.destroyed)
          return cb();
        var buffer = new Buffer(toRead);
        fs2.read(self.context.fd, buffer, 0, toRead, self.pos, function(err, bytesRead) {
          if (err) {
            self.destroy(err);
          } else if (bytesRead === 0) {
            self.destroyed = true;
            self.push(null);
            self.context.unref();
          } else {
            self.pos += bytesRead;
            self.push(buffer.slice(0, bytesRead));
          }
          cb();
        });
      });
    };
    ReadStream.prototype.destroy = function(err) {
      if (this.destroyed)
        return;
      err = err || new Error("stream destroyed");
      this.destroyed = true;
      this.emit("error", err);
      this.context.unref();
    };
    util.inherits(WriteStream, Writable);
    function WriteStream(context, options) {
      options = options || {};
      Writable.call(this, options);
      this.context = context;
      this.context.ref();
      this.start = options.start || 0;
      this.endOffset = options.end == null ? Infinity : +options.end;
      this.bytesWritten = 0;
      this.pos = this.start;
      this.destroyed = false;
      this.on("finish", this.destroy.bind(this));
    }
    WriteStream.prototype._write = function(buffer, encoding, callback) {
      var self = this;
      if (self.destroyed)
        return;
      if (self.pos + buffer.length > self.endOffset) {
        var err = new Error("maximum file length exceeded");
        err.code = "ETOOBIG";
        self.destroy();
        callback(err);
        return;
      }
      self.context.pend.go(function(cb) {
        if (self.destroyed)
          return cb();
        fs2.write(self.context.fd, buffer, 0, buffer.length, self.pos, function(err2, bytes) {
          if (err2) {
            self.destroy();
            cb();
            callback(err2);
          } else {
            self.bytesWritten += bytes;
            self.pos += bytes;
            self.emit("progress");
            cb();
            callback();
          }
        });
      });
    };
    WriteStream.prototype.destroy = function() {
      if (this.destroyed)
        return;
      this.destroyed = true;
      this.context.unref();
    };
    util.inherits(BufferSlicer, EventEmitter);
    function BufferSlicer(buffer, options) {
      EventEmitter.call(this);
      options = options || {};
      this.refCount = 0;
      this.buffer = buffer;
      this.maxChunkSize = options.maxChunkSize || Number.MAX_SAFE_INTEGER;
    }
    BufferSlicer.prototype.read = function(buffer, offset, length, position, callback) {
      var end = position + length;
      var delta = end - this.buffer.length;
      var written = delta > 0 ? delta : length;
      this.buffer.copy(buffer, offset, position, end);
      setImmediate(function() {
        callback(null, written);
      });
    };
    BufferSlicer.prototype.write = function(buffer, offset, length, position, callback) {
      buffer.copy(this.buffer, position, offset, offset + length);
      setImmediate(function() {
        callback(null, length, buffer);
      });
    };
    BufferSlicer.prototype.createReadStream = function(options) {
      options = options || {};
      var readStream = new PassThrough(options);
      readStream.destroyed = false;
      readStream.start = options.start || 0;
      readStream.endOffset = options.end;
      readStream.pos = readStream.endOffset || this.buffer.length;
      var entireSlice = this.buffer.slice(readStream.start, readStream.pos);
      var offset = 0;
      while (true) {
        var nextOffset = offset + this.maxChunkSize;
        if (nextOffset >= entireSlice.length) {
          if (offset < entireSlice.length) {
            readStream.write(entireSlice.slice(offset, entireSlice.length));
          }
          break;
        }
        readStream.write(entireSlice.slice(offset, nextOffset));
        offset = nextOffset;
      }
      readStream.end();
      readStream.destroy = function() {
        readStream.destroyed = true;
      };
      return readStream;
    };
    BufferSlicer.prototype.createWriteStream = function(options) {
      var bufferSlicer = this;
      options = options || {};
      var writeStream = new Writable(options);
      writeStream.start = options.start || 0;
      writeStream.endOffset = options.end == null ? this.buffer.length : +options.end;
      writeStream.bytesWritten = 0;
      writeStream.pos = writeStream.start;
      writeStream.destroyed = false;
      writeStream._write = function(buffer, encoding, callback) {
        if (writeStream.destroyed)
          return;
        var end = writeStream.pos + buffer.length;
        if (end > writeStream.endOffset) {
          var err = new Error("maximum file length exceeded");
          err.code = "ETOOBIG";
          writeStream.destroyed = true;
          callback(err);
          return;
        }
        buffer.copy(bufferSlicer.buffer, writeStream.pos, 0, buffer.length);
        writeStream.bytesWritten += buffer.length;
        writeStream.pos = end;
        writeStream.emit("progress");
        callback();
      };
      writeStream.destroy = function() {
        writeStream.destroyed = true;
      };
      return writeStream;
    };
    BufferSlicer.prototype.ref = function() {
      this.refCount += 1;
    };
    BufferSlicer.prototype.unref = function() {
      this.refCount -= 1;
      if (this.refCount < 0) {
        throw new Error("invalid unref");
      }
    };
    function createFromBuffer(buffer, options) {
      return new BufferSlicer(buffer, options);
    }
    function createFromFd(fd, options) {
      return new FdSlicer(fd, options);
    }
  }
});

// node_modules/buffer-crc32/index.js
var require_buffer_crc32 = __commonJS({
  "node_modules/buffer-crc32/index.js"(exports, module2) {
    var Buffer2 = require("buffer").Buffer;
    var CRC_TABLE = [
      0,
      1996959894,
      3993919788,
      2567524794,
      124634137,
      1886057615,
      3915621685,
      2657392035,
      249268274,
      2044508324,
      3772115230,
      2547177864,
      162941995,
      2125561021,
      3887607047,
      2428444049,
      498536548,
      1789927666,
      4089016648,
      2227061214,
      450548861,
      1843258603,
      4107580753,
      2211677639,
      325883990,
      1684777152,
      4251122042,
      2321926636,
      335633487,
      1661365465,
      4195302755,
      2366115317,
      997073096,
      1281953886,
      3579855332,
      2724688242,
      1006888145,
      1258607687,
      3524101629,
      2768942443,
      901097722,
      1119000684,
      3686517206,
      2898065728,
      853044451,
      1172266101,
      3705015759,
      2882616665,
      651767980,
      1373503546,
      3369554304,
      3218104598,
      565507253,
      1454621731,
      3485111705,
      3099436303,
      671266974,
      1594198024,
      3322730930,
      2970347812,
      795835527,
      1483230225,
      3244367275,
      3060149565,
      1994146192,
      31158534,
      2563907772,
      4023717930,
      1907459465,
      112637215,
      2680153253,
      3904427059,
      2013776290,
      251722036,
      2517215374,
      3775830040,
      2137656763,
      141376813,
      2439277719,
      3865271297,
      1802195444,
      476864866,
      2238001368,
      4066508878,
      1812370925,
      453092731,
      2181625025,
      4111451223,
      1706088902,
      314042704,
      2344532202,
      4240017532,
      1658658271,
      366619977,
      2362670323,
      4224994405,
      1303535960,
      984961486,
      2747007092,
      3569037538,
      1256170817,
      1037604311,
      2765210733,
      3554079995,
      1131014506,
      879679996,
      2909243462,
      3663771856,
      1141124467,
      855842277,
      2852801631,
      3708648649,
      1342533948,
      654459306,
      3188396048,
      3373015174,
      1466479909,
      544179635,
      3110523913,
      3462522015,
      1591671054,
      702138776,
      2966460450,
      3352799412,
      1504918807,
      783551873,
      3082640443,
      3233442989,
      3988292384,
      2596254646,
      62317068,
      1957810842,
      3939845945,
      2647816111,
      81470997,
      1943803523,
      3814918930,
      2489596804,
      225274430,
      2053790376,
      3826175755,
      2466906013,
      167816743,
      2097651377,
      4027552580,
      2265490386,
      503444072,
      1762050814,
      4150417245,
      2154129355,
      426522225,
      1852507879,
      4275313526,
      2312317920,
      282753626,
      1742555852,
      4189708143,
      2394877945,
      397917763,
      1622183637,
      3604390888,
      2714866558,
      953729732,
      1340076626,
      3518719985,
      2797360999,
      1068828381,
      1219638859,
      3624741850,
      2936675148,
      906185462,
      1090812512,
      3747672003,
      2825379669,
      829329135,
      1181335161,
      3412177804,
      3160834842,
      628085408,
      1382605366,
      3423369109,
      3138078467,
      570562233,
      1426400815,
      3317316542,
      2998733608,
      733239954,
      1555261956,
      3268935591,
      3050360625,
      752459403,
      1541320221,
      2607071920,
      3965973030,
      1969922972,
      40735498,
      2617837225,
      3943577151,
      1913087877,
      83908371,
      2512341634,
      3803740692,
      2075208622,
      213261112,
      2463272603,
      3855990285,
      2094854071,
      198958881,
      2262029012,
      4057260610,
      1759359992,
      534414190,
      2176718541,
      4139329115,
      1873836001,
      414664567,
      2282248934,
      4279200368,
      1711684554,
      285281116,
      2405801727,
      4167216745,
      1634467795,
      376229701,
      2685067896,
      3608007406,
      1308918612,
      956543938,
      2808555105,
      3495958263,
      1231636301,
      1047427035,
      2932959818,
      3654703836,
      1088359270,
      936918e3,
      2847714899,
      3736837829,
      1202900863,
      817233897,
      3183342108,
      3401237130,
      1404277552,
      615818150,
      3134207493,
      3453421203,
      1423857449,
      601450431,
      3009837614,
      3294710456,
      1567103746,
      711928724,
      3020668471,
      3272380065,
      1510334235,
      755167117
    ];
    if (typeof Int32Array !== "undefined") {
      CRC_TABLE = new Int32Array(CRC_TABLE);
    }
    function ensureBuffer(input) {
      if (Buffer2.isBuffer(input)) {
        return input;
      }
      var hasNewBufferAPI = typeof Buffer2.alloc === "function" && typeof Buffer2.from === "function";
      if (typeof input === "number") {
        return hasNewBufferAPI ? Buffer2.alloc(input) : new Buffer2(input);
      } else if (typeof input === "string") {
        return hasNewBufferAPI ? Buffer2.from(input) : new Buffer2(input);
      } else {
        throw new Error("input must be buffer, number, or string, received " + typeof input);
      }
    }
    function bufferizeInt(num) {
      var tmp = ensureBuffer(4);
      tmp.writeInt32BE(num, 0);
      return tmp;
    }
    function _crc32(buf, previous) {
      buf = ensureBuffer(buf);
      if (Buffer2.isBuffer(previous)) {
        previous = previous.readUInt32BE(0);
      }
      var crc = ~~previous ^ -1;
      for (var n = 0; n < buf.length; n++) {
        crc = CRC_TABLE[(crc ^ buf[n]) & 255] ^ crc >>> 8;
      }
      return crc ^ -1;
    }
    function crc32() {
      return bufferizeInt(_crc32.apply(null, arguments));
    }
    crc32.signed = function() {
      return _crc32.apply(null, arguments);
    };
    crc32.unsigned = function() {
      return _crc32.apply(null, arguments) >>> 0;
    };
    module2.exports = crc32;
  }
});

// node_modules/yauzl/index.js
var require_yauzl = __commonJS({
  "node_modules/yauzl/index.js"(exports) {
    var fs2 = require("fs");
    var zlib = require("zlib");
    var fd_slicer = require_fd_slicer();
    var crc32 = require_buffer_crc32();
    var util = require("util");
    var EventEmitter = require("events").EventEmitter;
    var Transform = require("stream").Transform;
    var PassThrough = require("stream").PassThrough;
    var Writable = require("stream").Writable;
    exports.open = open;
    exports.fromFd = fromFd;
    exports.fromBuffer = fromBuffer;
    exports.fromRandomAccessReader = fromRandomAccessReader;
    exports.dosDateTimeToDate = dosDateTimeToDate;
    exports.validateFileName = validateFileName;
    exports.ZipFile = ZipFile;
    exports.Entry = Entry;
    exports.RandomAccessReader = RandomAccessReader;
    function open(path2, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      if (options == null)
        options = {};
      if (options.autoClose == null)
        options.autoClose = true;
      if (options.lazyEntries == null)
        options.lazyEntries = false;
      if (options.decodeStrings == null)
        options.decodeStrings = true;
      if (options.validateEntrySizes == null)
        options.validateEntrySizes = true;
      if (options.strictFileNames == null)
        options.strictFileNames = false;
      if (callback == null)
        callback = defaultCallback;
      fs2.open(path2, "r", function(err, fd) {
        if (err)
          return callback(err);
        fromFd(fd, options, function(err2, zipfile) {
          if (err2)
            fs2.close(fd, defaultCallback);
          callback(err2, zipfile);
        });
      });
    }
    function fromFd(fd, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      if (options == null)
        options = {};
      if (options.autoClose == null)
        options.autoClose = false;
      if (options.lazyEntries == null)
        options.lazyEntries = false;
      if (options.decodeStrings == null)
        options.decodeStrings = true;
      if (options.validateEntrySizes == null)
        options.validateEntrySizes = true;
      if (options.strictFileNames == null)
        options.strictFileNames = false;
      if (callback == null)
        callback = defaultCallback;
      fs2.fstat(fd, function(err, stats) {
        if (err)
          return callback(err);
        var reader = fd_slicer.createFromFd(fd, { autoClose: true });
        fromRandomAccessReader(reader, stats.size, options, callback);
      });
    }
    function fromBuffer(buffer, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      if (options == null)
        options = {};
      options.autoClose = false;
      if (options.lazyEntries == null)
        options.lazyEntries = false;
      if (options.decodeStrings == null)
        options.decodeStrings = true;
      if (options.validateEntrySizes == null)
        options.validateEntrySizes = true;
      if (options.strictFileNames == null)
        options.strictFileNames = false;
      var reader = fd_slicer.createFromBuffer(buffer, { maxChunkSize: 65536 });
      fromRandomAccessReader(reader, buffer.length, options, callback);
    }
    function fromRandomAccessReader(reader, totalSize, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      if (options == null)
        options = {};
      if (options.autoClose == null)
        options.autoClose = true;
      if (options.lazyEntries == null)
        options.lazyEntries = false;
      if (options.decodeStrings == null)
        options.decodeStrings = true;
      var decodeStrings = !!options.decodeStrings;
      if (options.validateEntrySizes == null)
        options.validateEntrySizes = true;
      if (options.strictFileNames == null)
        options.strictFileNames = false;
      if (callback == null)
        callback = defaultCallback;
      if (typeof totalSize !== "number")
        throw new Error("expected totalSize parameter to be a number");
      if (totalSize > Number.MAX_SAFE_INTEGER) {
        throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
      }
      reader.ref();
      var eocdrWithoutCommentSize = 22;
      var maxCommentSize = 65535;
      var bufferSize = Math.min(eocdrWithoutCommentSize + maxCommentSize, totalSize);
      var buffer = newBuffer(bufferSize);
      var bufferReadStart = totalSize - buffer.length;
      readAndAssertNoEof(reader, buffer, 0, bufferSize, bufferReadStart, function(err) {
        if (err)
          return callback(err);
        for (var i = bufferSize - eocdrWithoutCommentSize; i >= 0; i -= 1) {
          if (buffer.readUInt32LE(i) !== 101010256)
            continue;
          var eocdrBuffer = buffer.slice(i);
          var diskNumber = eocdrBuffer.readUInt16LE(4);
          if (diskNumber !== 0) {
            return callback(new Error("multi-disk zip files are not supported: found disk number: " + diskNumber));
          }
          var entryCount = eocdrBuffer.readUInt16LE(10);
          var centralDirectoryOffset = eocdrBuffer.readUInt32LE(16);
          var commentLength = eocdrBuffer.readUInt16LE(20);
          var expectedCommentLength = eocdrBuffer.length - eocdrWithoutCommentSize;
          if (commentLength !== expectedCommentLength) {
            return callback(new Error("invalid comment length. expected: " + expectedCommentLength + ". found: " + commentLength));
          }
          var comment = decodeStrings ? decodeBuffer(eocdrBuffer, 22, eocdrBuffer.length, false) : eocdrBuffer.slice(22);
          if (!(entryCount === 65535 || centralDirectoryOffset === 4294967295)) {
            return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
          }
          var zip64EocdlBuffer = newBuffer(20);
          var zip64EocdlOffset = bufferReadStart + i - zip64EocdlBuffer.length;
          readAndAssertNoEof(reader, zip64EocdlBuffer, 0, zip64EocdlBuffer.length, zip64EocdlOffset, function(err2) {
            if (err2)
              return callback(err2);
            if (zip64EocdlBuffer.readUInt32LE(0) !== 117853008) {
              return callback(new Error("invalid zip64 end of central directory locator signature"));
            }
            var zip64EocdrOffset = readUInt64LE(zip64EocdlBuffer, 8);
            var zip64EocdrBuffer = newBuffer(56);
            readAndAssertNoEof(reader, zip64EocdrBuffer, 0, zip64EocdrBuffer.length, zip64EocdrOffset, function(err3) {
              if (err3)
                return callback(err3);
              if (zip64EocdrBuffer.readUInt32LE(0) !== 101075792) {
                return callback(new Error("invalid zip64 end of central directory record signature"));
              }
              entryCount = readUInt64LE(zip64EocdrBuffer, 32);
              centralDirectoryOffset = readUInt64LE(zip64EocdrBuffer, 48);
              return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
            });
          });
          return;
        }
        callback(new Error("end of central directory record signature not found"));
      });
    }
    util.inherits(ZipFile, EventEmitter);
    function ZipFile(reader, centralDirectoryOffset, fileSize, entryCount, comment, autoClose, lazyEntries, decodeStrings, validateEntrySizes, strictFileNames) {
      var self = this;
      EventEmitter.call(self);
      self.reader = reader;
      self.reader.on("error", function(err) {
        emitError(self, err);
      });
      self.reader.once("close", function() {
        self.emit("close");
      });
      self.readEntryCursor = centralDirectoryOffset;
      self.fileSize = fileSize;
      self.entryCount = entryCount;
      self.comment = comment;
      self.entriesRead = 0;
      self.autoClose = !!autoClose;
      self.lazyEntries = !!lazyEntries;
      self.decodeStrings = !!decodeStrings;
      self.validateEntrySizes = !!validateEntrySizes;
      self.strictFileNames = !!strictFileNames;
      self.isOpen = true;
      self.emittedError = false;
      if (!self.lazyEntries)
        self._readEntry();
    }
    ZipFile.prototype.close = function() {
      if (!this.isOpen)
        return;
      this.isOpen = false;
      this.reader.unref();
    };
    function emitErrorAndAutoClose(self, err) {
      if (self.autoClose)
        self.close();
      emitError(self, err);
    }
    function emitError(self, err) {
      if (self.emittedError)
        return;
      self.emittedError = true;
      self.emit("error", err);
    }
    ZipFile.prototype.readEntry = function() {
      if (!this.lazyEntries)
        throw new Error("readEntry() called without lazyEntries:true");
      this._readEntry();
    };
    ZipFile.prototype._readEntry = function() {
      var self = this;
      if (self.entryCount === self.entriesRead) {
        setImmediate(function() {
          if (self.autoClose)
            self.close();
          if (self.emittedError)
            return;
          self.emit("end");
        });
        return;
      }
      if (self.emittedError)
        return;
      var buffer = newBuffer(46);
      readAndAssertNoEof(self.reader, buffer, 0, buffer.length, self.readEntryCursor, function(err) {
        if (err)
          return emitErrorAndAutoClose(self, err);
        if (self.emittedError)
          return;
        var entry = new Entry();
        var signature = buffer.readUInt32LE(0);
        if (signature !== 33639248)
          return emitErrorAndAutoClose(self, new Error("invalid central directory file header signature: 0x" + signature.toString(16)));
        entry.versionMadeBy = buffer.readUInt16LE(4);
        entry.versionNeededToExtract = buffer.readUInt16LE(6);
        entry.generalPurposeBitFlag = buffer.readUInt16LE(8);
        entry.compressionMethod = buffer.readUInt16LE(10);
        entry.lastModFileTime = buffer.readUInt16LE(12);
        entry.lastModFileDate = buffer.readUInt16LE(14);
        entry.crc32 = buffer.readUInt32LE(16);
        entry.compressedSize = buffer.readUInt32LE(20);
        entry.uncompressedSize = buffer.readUInt32LE(24);
        entry.fileNameLength = buffer.readUInt16LE(28);
        entry.extraFieldLength = buffer.readUInt16LE(30);
        entry.fileCommentLength = buffer.readUInt16LE(32);
        entry.internalFileAttributes = buffer.readUInt16LE(36);
        entry.externalFileAttributes = buffer.readUInt32LE(38);
        entry.relativeOffsetOfLocalHeader = buffer.readUInt32LE(42);
        if (entry.generalPurposeBitFlag & 64)
          return emitErrorAndAutoClose(self, new Error("strong encryption is not supported"));
        self.readEntryCursor += 46;
        buffer = newBuffer(entry.fileNameLength + entry.extraFieldLength + entry.fileCommentLength);
        readAndAssertNoEof(self.reader, buffer, 0, buffer.length, self.readEntryCursor, function(err2) {
          if (err2)
            return emitErrorAndAutoClose(self, err2);
          if (self.emittedError)
            return;
          var isUtf8 = (entry.generalPurposeBitFlag & 2048) !== 0;
          entry.fileName = self.decodeStrings ? decodeBuffer(buffer, 0, entry.fileNameLength, isUtf8) : buffer.slice(0, entry.fileNameLength);
          var fileCommentStart = entry.fileNameLength + entry.extraFieldLength;
          var extraFieldBuffer = buffer.slice(entry.fileNameLength, fileCommentStart);
          entry.extraFields = [];
          var i = 0;
          while (i < extraFieldBuffer.length - 3) {
            var headerId = extraFieldBuffer.readUInt16LE(i + 0);
            var dataSize = extraFieldBuffer.readUInt16LE(i + 2);
            var dataStart = i + 4;
            var dataEnd = dataStart + dataSize;
            if (dataEnd > extraFieldBuffer.length)
              return emitErrorAndAutoClose(self, new Error("extra field length exceeds extra field buffer size"));
            var dataBuffer = newBuffer(dataSize);
            extraFieldBuffer.copy(dataBuffer, 0, dataStart, dataEnd);
            entry.extraFields.push({
              id: headerId,
              data: dataBuffer
            });
            i = dataEnd;
          }
          entry.fileComment = self.decodeStrings ? decodeBuffer(buffer, fileCommentStart, fileCommentStart + entry.fileCommentLength, isUtf8) : buffer.slice(fileCommentStart, fileCommentStart + entry.fileCommentLength);
          entry.comment = entry.fileComment;
          self.readEntryCursor += buffer.length;
          self.entriesRead += 1;
          if (entry.uncompressedSize === 4294967295 || entry.compressedSize === 4294967295 || entry.relativeOffsetOfLocalHeader === 4294967295) {
            var zip64EiefBuffer = null;
            for (var i = 0; i < entry.extraFields.length; i++) {
              var extraField = entry.extraFields[i];
              if (extraField.id === 1) {
                zip64EiefBuffer = extraField.data;
                break;
              }
            }
            if (zip64EiefBuffer == null) {
              return emitErrorAndAutoClose(self, new Error("expected zip64 extended information extra field"));
            }
            var index = 0;
            if (entry.uncompressedSize === 4294967295) {
              if (index + 8 > zip64EiefBuffer.length) {
                return emitErrorAndAutoClose(self, new Error("zip64 extended information extra field does not include uncompressed size"));
              }
              entry.uncompressedSize = readUInt64LE(zip64EiefBuffer, index);
              index += 8;
            }
            if (entry.compressedSize === 4294967295) {
              if (index + 8 > zip64EiefBuffer.length) {
                return emitErrorAndAutoClose(self, new Error("zip64 extended information extra field does not include compressed size"));
              }
              entry.compressedSize = readUInt64LE(zip64EiefBuffer, index);
              index += 8;
            }
            if (entry.relativeOffsetOfLocalHeader === 4294967295) {
              if (index + 8 > zip64EiefBuffer.length) {
                return emitErrorAndAutoClose(self, new Error("zip64 extended information extra field does not include relative header offset"));
              }
              entry.relativeOffsetOfLocalHeader = readUInt64LE(zip64EiefBuffer, index);
              index += 8;
            }
          }
          if (self.decodeStrings) {
            for (var i = 0; i < entry.extraFields.length; i++) {
              var extraField = entry.extraFields[i];
              if (extraField.id === 28789) {
                if (extraField.data.length < 6) {
                  continue;
                }
                if (extraField.data.readUInt8(0) !== 1) {
                  continue;
                }
                var oldNameCrc32 = extraField.data.readUInt32LE(1);
                if (crc32.unsigned(buffer.slice(0, entry.fileNameLength)) !== oldNameCrc32) {
                  continue;
                }
                entry.fileName = decodeBuffer(extraField.data, 5, extraField.data.length, true);
                break;
              }
            }
          }
          if (self.validateEntrySizes && entry.compressionMethod === 0) {
            var expectedCompressedSize = entry.uncompressedSize;
            if (entry.isEncrypted()) {
              expectedCompressedSize += 12;
            }
            if (entry.compressedSize !== expectedCompressedSize) {
              var msg = "compressed/uncompressed size mismatch for stored file: " + entry.compressedSize + " != " + entry.uncompressedSize;
              return emitErrorAndAutoClose(self, new Error(msg));
            }
          }
          if (self.decodeStrings) {
            if (!self.strictFileNames) {
              entry.fileName = entry.fileName.replace(/\\/g, "/");
            }
            var errorMessage = validateFileName(entry.fileName, self.validateFileNameOptions);
            if (errorMessage != null)
              return emitErrorAndAutoClose(self, new Error(errorMessage));
          }
          self.emit("entry", entry);
          if (!self.lazyEntries)
            self._readEntry();
        });
      });
    };
    ZipFile.prototype.openReadStream = function(entry, options, callback) {
      var self = this;
      var relativeStart = 0;
      var relativeEnd = entry.compressedSize;
      if (callback == null) {
        callback = options;
        options = {};
      } else {
        if (options.decrypt != null) {
          if (!entry.isEncrypted()) {
            throw new Error("options.decrypt can only be specified for encrypted entries");
          }
          if (options.decrypt !== false)
            throw new Error("invalid options.decrypt value: " + options.decrypt);
          if (entry.isCompressed()) {
            if (options.decompress !== false)
              throw new Error("entry is encrypted and compressed, and options.decompress !== false");
          }
        }
        if (options.decompress != null) {
          if (!entry.isCompressed()) {
            throw new Error("options.decompress can only be specified for compressed entries");
          }
          if (!(options.decompress === false || options.decompress === true)) {
            throw new Error("invalid options.decompress value: " + options.decompress);
          }
        }
        if (options.start != null || options.end != null) {
          if (entry.isCompressed() && options.decompress !== false) {
            throw new Error("start/end range not allowed for compressed entry without options.decompress === false");
          }
          if (entry.isEncrypted() && options.decrypt !== false) {
            throw new Error("start/end range not allowed for encrypted entry without options.decrypt === false");
          }
        }
        if (options.start != null) {
          relativeStart = options.start;
          if (relativeStart < 0)
            throw new Error("options.start < 0");
          if (relativeStart > entry.compressedSize)
            throw new Error("options.start > entry.compressedSize");
        }
        if (options.end != null) {
          relativeEnd = options.end;
          if (relativeEnd < 0)
            throw new Error("options.end < 0");
          if (relativeEnd > entry.compressedSize)
            throw new Error("options.end > entry.compressedSize");
          if (relativeEnd < relativeStart)
            throw new Error("options.end < options.start");
        }
      }
      if (!self.isOpen)
        return callback(new Error("closed"));
      if (entry.isEncrypted()) {
        if (options.decrypt !== false)
          return callback(new Error("entry is encrypted, and options.decrypt !== false"));
      }
      self.reader.ref();
      var buffer = newBuffer(30);
      readAndAssertNoEof(self.reader, buffer, 0, buffer.length, entry.relativeOffsetOfLocalHeader, function(err) {
        try {
          if (err)
            return callback(err);
          var signature = buffer.readUInt32LE(0);
          if (signature !== 67324752) {
            return callback(new Error("invalid local file header signature: 0x" + signature.toString(16)));
          }
          var fileNameLength = buffer.readUInt16LE(26);
          var extraFieldLength = buffer.readUInt16LE(28);
          var localFileHeaderEnd = entry.relativeOffsetOfLocalHeader + buffer.length + fileNameLength + extraFieldLength;
          var decompress;
          if (entry.compressionMethod === 0) {
            decompress = false;
          } else if (entry.compressionMethod === 8) {
            decompress = options.decompress != null ? options.decompress : true;
          } else {
            return callback(new Error("unsupported compression method: " + entry.compressionMethod));
          }
          var fileDataStart = localFileHeaderEnd;
          var fileDataEnd = fileDataStart + entry.compressedSize;
          if (entry.compressedSize !== 0) {
            if (fileDataEnd > self.fileSize) {
              return callback(new Error("file data overflows file bounds: " + fileDataStart + " + " + entry.compressedSize + " > " + self.fileSize));
            }
          }
          var readStream = self.reader.createReadStream({
            start: fileDataStart + relativeStart,
            end: fileDataStart + relativeEnd
          });
          var endpointStream = readStream;
          if (decompress) {
            var destroyed = false;
            var inflateFilter = zlib.createInflateRaw();
            readStream.on("error", function(err2) {
              setImmediate(function() {
                if (!destroyed)
                  inflateFilter.emit("error", err2);
              });
            });
            readStream.pipe(inflateFilter);
            if (self.validateEntrySizes) {
              endpointStream = new AssertByteCountStream(entry.uncompressedSize);
              inflateFilter.on("error", function(err2) {
                setImmediate(function() {
                  if (!destroyed)
                    endpointStream.emit("error", err2);
                });
              });
              inflateFilter.pipe(endpointStream);
            } else {
              endpointStream = inflateFilter;
            }
            endpointStream.destroy = function() {
              destroyed = true;
              if (inflateFilter !== endpointStream)
                inflateFilter.unpipe(endpointStream);
              readStream.unpipe(inflateFilter);
              readStream.destroy();
            };
          }
          callback(null, endpointStream);
        } finally {
          self.reader.unref();
        }
      });
    };
    function Entry() {
    }
    Entry.prototype.getLastModDate = function() {
      return dosDateTimeToDate(this.lastModFileDate, this.lastModFileTime);
    };
    Entry.prototype.isEncrypted = function() {
      return (this.generalPurposeBitFlag & 1) !== 0;
    };
    Entry.prototype.isCompressed = function() {
      return this.compressionMethod === 8;
    };
    function dosDateTimeToDate(date, time) {
      var day = date & 31;
      var month = (date >> 5 & 15) - 1;
      var year = (date >> 9 & 127) + 1980;
      var millisecond = 0;
      var second = (time & 31) * 2;
      var minute = time >> 5 & 63;
      var hour = time >> 11 & 31;
      return new Date(year, month, day, hour, minute, second, millisecond);
    }
    function validateFileName(fileName) {
      if (fileName.indexOf("\\") !== -1) {
        return "invalid characters in fileName: " + fileName;
      }
      if (/^[a-zA-Z]:/.test(fileName) || /^\//.test(fileName)) {
        return "absolute path: " + fileName;
      }
      if (fileName.split("/").indexOf("..") !== -1) {
        return "invalid relative path: " + fileName;
      }
      return null;
    }
    function readAndAssertNoEof(reader, buffer, offset, length, position, callback) {
      if (length === 0) {
        return setImmediate(function() {
          callback(null, newBuffer(0));
        });
      }
      reader.read(buffer, offset, length, position, function(err, bytesRead) {
        if (err)
          return callback(err);
        if (bytesRead < length) {
          return callback(new Error("unexpected EOF"));
        }
        callback();
      });
    }
    util.inherits(AssertByteCountStream, Transform);
    function AssertByteCountStream(byteCount) {
      Transform.call(this);
      this.actualByteCount = 0;
      this.expectedByteCount = byteCount;
    }
    AssertByteCountStream.prototype._transform = function(chunk, encoding, cb) {
      this.actualByteCount += chunk.length;
      if (this.actualByteCount > this.expectedByteCount) {
        var msg = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
        return cb(new Error(msg));
      }
      cb(null, chunk);
    };
    AssertByteCountStream.prototype._flush = function(cb) {
      if (this.actualByteCount < this.expectedByteCount) {
        var msg = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
        return cb(new Error(msg));
      }
      cb();
    };
    util.inherits(RandomAccessReader, EventEmitter);
    function RandomAccessReader() {
      EventEmitter.call(this);
      this.refCount = 0;
    }
    RandomAccessReader.prototype.ref = function() {
      this.refCount += 1;
    };
    RandomAccessReader.prototype.unref = function() {
      var self = this;
      self.refCount -= 1;
      if (self.refCount > 0)
        return;
      if (self.refCount < 0)
        throw new Error("invalid unref");
      self.close(onCloseDone);
      function onCloseDone(err) {
        if (err)
          return self.emit("error", err);
        self.emit("close");
      }
    };
    RandomAccessReader.prototype.createReadStream = function(options) {
      var start = options.start;
      var end = options.end;
      if (start === end) {
        var emptyStream = new PassThrough();
        setImmediate(function() {
          emptyStream.end();
        });
        return emptyStream;
      }
      var stream = this._readStreamForRange(start, end);
      var destroyed = false;
      var refUnrefFilter = new RefUnrefFilter(this);
      stream.on("error", function(err) {
        setImmediate(function() {
          if (!destroyed)
            refUnrefFilter.emit("error", err);
        });
      });
      refUnrefFilter.destroy = function() {
        stream.unpipe(refUnrefFilter);
        refUnrefFilter.unref();
        stream.destroy();
      };
      var byteCounter = new AssertByteCountStream(end - start);
      refUnrefFilter.on("error", function(err) {
        setImmediate(function() {
          if (!destroyed)
            byteCounter.emit("error", err);
        });
      });
      byteCounter.destroy = function() {
        destroyed = true;
        refUnrefFilter.unpipe(byteCounter);
        refUnrefFilter.destroy();
      };
      return stream.pipe(refUnrefFilter).pipe(byteCounter);
    };
    RandomAccessReader.prototype._readStreamForRange = function(start, end) {
      throw new Error("not implemented");
    };
    RandomAccessReader.prototype.read = function(buffer, offset, length, position, callback) {
      var readStream = this.createReadStream({ start: position, end: position + length });
      var writeStream = new Writable();
      var written = 0;
      writeStream._write = function(chunk, encoding, cb) {
        chunk.copy(buffer, offset + written, 0, chunk.length);
        written += chunk.length;
        cb();
      };
      writeStream.on("finish", callback);
      readStream.on("error", function(error) {
        callback(error);
      });
      readStream.pipe(writeStream);
    };
    RandomAccessReader.prototype.close = function(callback) {
      setImmediate(callback);
    };
    util.inherits(RefUnrefFilter, PassThrough);
    function RefUnrefFilter(context) {
      PassThrough.call(this);
      this.context = context;
      this.context.ref();
      this.unreffedYet = false;
    }
    RefUnrefFilter.prototype._flush = function(cb) {
      this.unref();
      cb();
    };
    RefUnrefFilter.prototype.unref = function(cb) {
      if (this.unreffedYet)
        return;
      this.unreffedYet = true;
      this.context.unref();
    };
    var cp437 = "\0\u263A\u263B\u2665\u2666\u2663\u2660\u2022\u25D8\u25CB\u25D9\u2642\u2640\u266A\u266B\u263C\u25BA\u25C4\u2195\u203C\xB6\xA7\u25AC\u21A8\u2191\u2193\u2192\u2190\u221F\u2194\u25B2\u25BC !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2302\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0\xA0";
    function decodeBuffer(buffer, start, end, isUtf8) {
      if (isUtf8) {
        return buffer.toString("utf8", start, end);
      } else {
        var result = "";
        for (var i = start; i < end; i++) {
          result += cp437[buffer[i]];
        }
        return result;
      }
    }
    function readUInt64LE(buffer, offset) {
      var lower32 = buffer.readUInt32LE(offset);
      var upper32 = buffer.readUInt32LE(offset + 4);
      return upper32 * 4294967296 + lower32;
    }
    var newBuffer;
    if (typeof Buffer.allocUnsafe === "function") {
      newBuffer = function(len) {
        return Buffer.allocUnsafe(len);
      };
    } else {
      newBuffer = function(len) {
        return new Buffer(len);
      };
    }
    function defaultCallback(err) {
      if (err)
        throw err;
    }
  }
});

// node_modules/fs-extra/lib/util/assign.js
var require_assign = __commonJS({
  "node_modules/fs-extra/lib/util/assign.js"(exports, module2) {
    function assign() {
      var args = [].slice.call(arguments).filter(function(i) {
        return i;
      });
      var dest = args.shift();
      args.forEach(function(src) {
        Object.keys(src).forEach(function(key) {
          dest[key] = src[key];
        });
      });
      return dest;
    }
    module2.exports = assign;
  }
});

// node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "node_modules/graceful-fs/polyfills.js"(exports, module2) {
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module2.exports = patch;
    function patch(fs2) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs2);
      }
      if (!fs2.lutimes) {
        patchLutimes(fs2);
      }
      fs2.chown = chownFix(fs2.chown);
      fs2.fchown = chownFix(fs2.fchown);
      fs2.lchown = chownFix(fs2.lchown);
      fs2.chmod = chmodFix(fs2.chmod);
      fs2.fchmod = chmodFix(fs2.fchmod);
      fs2.lchmod = chmodFix(fs2.lchmod);
      fs2.chownSync = chownFixSync(fs2.chownSync);
      fs2.fchownSync = chownFixSync(fs2.fchownSync);
      fs2.lchownSync = chownFixSync(fs2.lchownSync);
      fs2.chmodSync = chmodFixSync(fs2.chmodSync);
      fs2.fchmodSync = chmodFixSync(fs2.fchmodSync);
      fs2.lchmodSync = chmodFixSync(fs2.lchmodSync);
      fs2.stat = statFix(fs2.stat);
      fs2.fstat = statFix(fs2.fstat);
      fs2.lstat = statFix(fs2.lstat);
      fs2.statSync = statFixSync(fs2.statSync);
      fs2.fstatSync = statFixSync(fs2.fstatSync);
      fs2.lstatSync = statFixSync(fs2.lstatSync);
      if (!fs2.lchmod) {
        fs2.lchmod = function(path2, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs2.lchmodSync = function() {
        };
      }
      if (!fs2.lchown) {
        fs2.lchown = function(path2, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs2.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs2.rename = function(fs$rename) {
          return function(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs2.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          };
        }(fs2.rename);
      }
      fs2.read = function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs2.read);
      fs2.readSync = function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs2, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs2.readSync);
      function patchLchmod(fs3) {
        fs3.lchmod = function(path2, mode, callback) {
          fs3.open(path2, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
            if (err) {
              if (callback)
                callback(err);
              return;
            }
            fs3.fchmod(fd, mode, function(err2) {
              fs3.close(fd, function(err22) {
                if (callback)
                  callback(err2 || err22);
              });
            });
          });
        };
        fs3.lchmodSync = function(path2, mode) {
          var fd = fs3.openSync(path2, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs3.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs3.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs3.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs3) {
        if (constants.hasOwnProperty("O_SYMLINK")) {
          fs3.lutimes = function(path2, at, mt, cb) {
            fs3.open(path2, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs3.futimes(fd, at, mt, function(er2) {
                fs3.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs3.lutimesSync = function(path2, at, mt) {
            var fd = fs3.openSync(path2, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs3.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs3.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs3.closeSync(fd);
              }
            }
            return ret;
          };
        } else {
          fs3.lutimes = function(_a, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs3.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target, mode, cb) {
          return orig.call(fs2, target, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, mode) {
          try {
            return orig.call(fs2, target, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs2, target, uid, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs2, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options ? orig.call(fs2, target, options, callback) : orig.call(fs2, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs2, target, options) : orig.call(fs2, target);
          if (stats) {
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "node_modules/graceful-fs/legacy-streams.js"(exports, module2) {
    var Stream = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs2) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path2, options) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path2, options);
        Stream.call(this);
        var self = this;
        this.path = path2;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if (typeof this.start !== "number") {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if (typeof this.end !== "number") {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }
        fs2.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self.emit("error", err);
            self.readable = false;
            return;
          }
          self.fd = fd;
          self.emit("open", fd);
          self._read();
        });
      }
      function WriteStream(path2, options) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path2, options);
        Stream.call(this);
        this.path = path2;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if (typeof this.start !== "number") {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs2.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "node_modules/graceful-fs/clone.js"(exports, module2) {
    "use strict";
    module2.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "node_modules/graceful-fs/graceful-fs.js"(exports, module2) {
    var fs2 = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs2[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs2, queue);
      fs2.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs2, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs2.close);
      fs2.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs2, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs2.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs2[gracefulQueue]);
          require("assert").equal(fs2[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs2[gracefulQueue]);
    }
    module2.exports = patch(clone(fs2));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs2.__patched) {
      module2.exports = patch(fs2);
      fs2.__patched = true;
    }
    function patch(fs3) {
      polyfills(fs3);
      fs3.gracefulify = patch;
      fs3.createReadStream = createReadStream2;
      fs3.createWriteStream = createWriteStream;
      var fs$readFile = fs3.readFile;
      fs3.readFile = readFile;
      function readFile(path2, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path2, options, cb);
        function go$readFile(path3, options2, cb2, startTime) {
          return fs$readFile(path3, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs3.writeFile;
      fs3.writeFile = writeFile2;
      function writeFile2(path2, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path2, data, options, cb);
        function go$writeFile(path3, data2, options2, cb2, startTime) {
          return fs$writeFile(path3, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs3.appendFile;
      if (fs$appendFile)
        fs3.appendFile = appendFile;
      function appendFile(path2, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path2, data, options, cb);
        function go$appendFile(path3, data2, options2, cb2, startTime) {
          return fs$appendFile(path3, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs3.copyFile;
      if (fs$copyFile)
        fs3.copyFile = copyFile2;
      function copyFile2(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs3.readdir;
      fs3.readdir = readdir;
      function readdir(path2, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readdir(path2, options, cb);
        function go$readdir(path3, options2, cb2, startTime) {
          return fs$readdir(path3, options2, function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readdir, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          });
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs3);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs3.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs3.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs3, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs3, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs3, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs3, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path2, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path2, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream2(path2, options) {
        return new fs3.ReadStream(path2, options);
      }
      function createWriteStream(path2, options) {
        return new fs3.WriteStream(path2, options);
      }
      var fs$open = fs3.open;
      fs3.open = open;
      function open(path2, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path2, flags, mode, cb);
        function go$open(path3, flags2, mode2, cb2, startTime) {
          return fs$open(path3, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path3, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs3;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs2[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs2[gracefulQueue].length; ++i) {
        if (fs2[gracefulQueue][i].length > 2) {
          fs2[gracefulQueue][i][3] = now;
          fs2[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs2[gracefulQueue].length === 0)
        return;
      var elem = fs2[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs2[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/fs-extra/lib/util/utimes.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var os2 = require("os");
    function hasMillisResSync() {
      var tmpfile = path2.join("millis-test-sync" + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path2.join(os2.tmpdir(), tmpfile);
      var d = new Date(1435410243862);
      fs2.writeFileSync(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141");
      var fd = fs2.openSync(tmpfile, "r+");
      fs2.futimesSync(fd, d, d);
      fs2.closeSync(fd);
      return fs2.statSync(tmpfile).mtime > 1435410243e3;
    }
    function hasMillisRes(callback) {
      var tmpfile = path2.join("millis-test" + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path2.join(os2.tmpdir(), tmpfile);
      var d = new Date(1435410243862);
      fs2.writeFile(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141", function(err) {
        if (err)
          return callback(err);
        fs2.open(tmpfile, "r+", function(err2, fd) {
          if (err2)
            return callback(err2);
          fs2.futimes(fd, d, d, function(err3) {
            if (err3)
              return callback(err3);
            fs2.close(fd, function(err4) {
              if (err4)
                return callback(err4);
              fs2.stat(tmpfile, function(err5, stats) {
                if (err5)
                  return callback(err5);
                callback(null, stats.mtime > 1435410243e3);
              });
            });
          });
        });
      });
    }
    function timeRemoveMillis(timestamp) {
      if (typeof timestamp === "number") {
        return Math.floor(timestamp / 1e3) * 1e3;
      } else if (timestamp instanceof Date) {
        return new Date(Math.floor(timestamp.getTime() / 1e3) * 1e3);
      } else {
        throw new Error("fs-extra: timeRemoveMillis() unknown parameter type");
      }
    }
    function utimesMillis(path3, atime, mtime, callback) {
      fs2.open(path3, "r+", function(err, fd) {
        if (err)
          return callback(err);
        fs2.futimes(fd, atime, mtime, function(err2) {
          if (err2)
            return callback(err2);
          fs2.close(fd, callback);
        });
      });
    }
    module2.exports = {
      hasMillisRes,
      hasMillisResSync,
      timeRemoveMillis,
      utimesMillis
    };
  }
});

// node_modules/fs-extra/lib/copy/ncp.js
var require_ncp = __commonJS({
  "node_modules/fs-extra/lib/copy/ncp.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var utimes = require_utimes();
    function ncp(source, dest, options, callback) {
      if (!callback) {
        callback = options;
        options = {};
      }
      var basePath = process.cwd();
      var currentPath = path2.resolve(basePath, source);
      var targetPath = path2.resolve(basePath, dest);
      var filter = options.filter;
      var transform = options.transform;
      var clobber = options.clobber !== false;
      var dereference = options.dereference;
      var preserveTimestamps = options.preserveTimestamps === true;
      var errs = null;
      var started = 0;
      var finished = 0;
      var running = 0;
      var limit = options.limit || 512;
      startCopy(currentPath);
      function startCopy(source2) {
        started++;
        if (filter) {
          if (filter instanceof RegExp) {
            if (!filter.test(source2)) {
              return doneOne(true);
            }
          } else if (typeof filter === "function") {
            if (!filter(source2)) {
              return doneOne(true);
            }
          }
        }
        return getStats(source2);
      }
      function getStats(source2) {
        var stat = dereference ? fs2.stat : fs2.lstat;
        if (running >= limit) {
          return setImmediate(function() {
            getStats(source2);
          });
        }
        running++;
        stat(source2, function(err, stats) {
          if (err)
            return onError(err);
          var item = {
            name: source2,
            mode: stats.mode,
            mtime: stats.mtime,
            atime: stats.atime,
            stats
          };
          if (stats.isDirectory()) {
            return onDir(item);
          } else if (stats.isFile()) {
            return onFile(item);
          } else if (stats.isSymbolicLink()) {
            return onLink(source2);
          }
        });
      }
      function onFile(file) {
        var target = file.name.replace(currentPath, targetPath);
        isWritable(target, function(writable) {
          if (writable) {
            copyFile2(file, target);
          } else {
            if (clobber) {
              rmFile(target, function() {
                copyFile2(file, target);
              });
            } else {
              doneOne();
            }
          }
        });
      }
      function copyFile2(file, target) {
        var readStream = fs2.createReadStream(file.name);
        var writeStream = fs2.createWriteStream(target, { mode: file.mode });
        readStream.on("error", onError);
        writeStream.on("error", onError);
        if (transform) {
          transform(readStream, writeStream, file);
        } else {
          writeStream.on("open", function() {
            readStream.pipe(writeStream);
          });
        }
        writeStream.once("finish", function() {
          fs2.chmod(target, file.mode, function(err) {
            if (err)
              return onError(err);
            if (preserveTimestamps) {
              utimes.utimesMillis(target, file.atime, file.mtime, function(err2) {
                if (err2)
                  return onError(err2);
                return doneOne();
              });
            } else {
              doneOne();
            }
          });
        });
      }
      function rmFile(file, done) {
        fs2.unlink(file, function(err) {
          if (err)
            return onError(err);
          return done();
        });
      }
      function onDir(dir) {
        var target = dir.name.replace(currentPath, targetPath);
        isWritable(target, function(writable) {
          if (writable) {
            return mkDir(dir, target);
          }
          copyDir(dir.name);
        });
      }
      function mkDir(dir, target) {
        fs2.mkdir(target, dir.mode, function(err) {
          if (err)
            return onError(err);
          fs2.chmod(target, dir.mode, function(err2) {
            if (err2)
              return onError(err2);
            copyDir(dir.name);
          });
        });
      }
      function copyDir(dir) {
        fs2.readdir(dir, function(err, items) {
          if (err)
            return onError(err);
          items.forEach(function(item) {
            startCopy(path2.join(dir, item));
          });
          return doneOne();
        });
      }
      function onLink(link2) {
        var target = link2.replace(currentPath, targetPath);
        fs2.readlink(link2, function(err, resolvedPath) {
          if (err)
            return onError(err);
          checkLink(resolvedPath, target);
        });
      }
      function checkLink(resolvedPath, target) {
        if (dereference) {
          resolvedPath = path2.resolve(basePath, resolvedPath);
        }
        isWritable(target, function(writable) {
          if (writable) {
            return makeLink(resolvedPath, target);
          }
          fs2.readlink(target, function(err, targetDest) {
            if (err)
              return onError(err);
            if (dereference) {
              targetDest = path2.resolve(basePath, targetDest);
            }
            if (targetDest === resolvedPath) {
              return doneOne();
            }
            return rmFile(target, function() {
              makeLink(resolvedPath, target);
            });
          });
        });
      }
      function makeLink(linkPath, target) {
        fs2.symlink(linkPath, target, function(err) {
          if (err)
            return onError(err);
          return doneOne();
        });
      }
      function isWritable(path3, done) {
        fs2.lstat(path3, function(err) {
          if (err) {
            if (err.code === "ENOENT")
              return done(true);
            return done(false);
          }
          return done(false);
        });
      }
      function onError(err) {
        if (options.stopOnError) {
          return callback(err);
        } else if (!errs && options.errs) {
          errs = fs2.createWriteStream(options.errs);
        } else if (!errs) {
          errs = [];
        }
        if (typeof errs.write === "undefined") {
          errs.push(err);
        } else {
          errs.write(err.stack + "\n\n");
        }
        return doneOne();
      }
      function doneOne(skipped) {
        if (!skipped)
          running--;
        finished++;
        if (started === finished && running === 0) {
          if (callback !== void 0) {
            return errs ? callback(errs) : callback(null);
          }
        }
      }
    }
    module2.exports = ncp;
  }
});

// node_modules/fs-extra/lib/mkdirs/mkdirs.js
var require_mkdirs = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/mkdirs.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var o777 = parseInt("0777", 8);
    function mkdirs(p, opts, callback, made) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      } else if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      var mode = opts.mode;
      var xfs = opts.fs || fs2;
      if (mode === void 0) {
        mode = o777 & ~process.umask();
      }
      if (!made)
        made = null;
      callback = callback || function() {
      };
      p = path2.resolve(p);
      xfs.mkdir(p, mode, function(er) {
        if (!er) {
          made = made || p;
          return callback(null, made);
        }
        switch (er.code) {
          case "ENOENT":
            if (path2.dirname(p) === p)
              return callback(er);
            mkdirs(path2.dirname(p), opts, function(er2, made2) {
              if (er2)
                callback(er2, made2);
              else
                mkdirs(p, opts, callback, made2);
            });
            break;
          default:
            xfs.stat(p, function(er2, stat) {
              if (er2 || !stat.isDirectory())
                callback(er, made);
              else
                callback(null, made);
            });
            break;
        }
      });
    }
    module2.exports = mkdirs;
  }
});

// node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js
var require_mkdirs_sync = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var o777 = parseInt("0777", 8);
    function mkdirsSync(p, opts, made) {
      if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      var mode = opts.mode;
      var xfs = opts.fs || fs2;
      if (mode === void 0) {
        mode = o777 & ~process.umask();
      }
      if (!made)
        made = null;
      p = path2.resolve(p);
      try {
        xfs.mkdirSync(p, mode);
        made = made || p;
      } catch (err0) {
        switch (err0.code) {
          case "ENOENT":
            made = mkdirsSync(path2.dirname(p), opts, made);
            mkdirsSync(p, opts, made);
            break;
          default:
            var stat;
            try {
              stat = xfs.statSync(p);
            } catch (err1) {
              throw err0;
            }
            if (!stat.isDirectory())
              throw err0;
            break;
        }
      }
      return made;
    }
    module2.exports = mkdirsSync;
  }
});

// node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs2 = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/index.js"(exports, module2) {
    module2.exports = {
      mkdirs: require_mkdirs(),
      mkdirsSync: require_mkdirs_sync(),
      mkdirp: require_mkdirs(),
      mkdirpSync: require_mkdirs_sync(),
      ensureDir: require_mkdirs(),
      ensureDirSync: require_mkdirs_sync()
    };
  }
});

// node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/fs-extra/lib/copy/copy.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var ncp = require_ncp();
    var mkdir = require_mkdirs2();
    function copy(src, dest, options, callback) {
      if (typeof options === "function" && !callback) {
        callback = options;
        options = {};
      } else if (typeof options === "function" || options instanceof RegExp) {
        options = { filter: options };
      }
      callback = callback || function() {
      };
      fs2.lstat(src, function(err, stats) {
        if (err)
          return callback(err);
        var dir = null;
        if (stats.isDirectory()) {
          var parts = dest.split(path2.sep);
          parts.pop();
          dir = parts.join(path2.sep);
        } else {
          dir = path2.dirname(dest);
        }
        fs2.exists(dir, function(dirExists) {
          if (dirExists)
            return ncp(src, dest, options, callback);
          mkdir.mkdirs(dir, function(err2) {
            if (err2)
              return callback(err2);
            ncp(src, dest, options, callback);
          });
        });
      });
    }
    module2.exports = copy;
  }
});

// node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/fs-extra/lib/copy/index.js"(exports, module2) {
    module2.exports = {
      copy: require_copy()
    };
  }
});

// node_modules/fs-extra/lib/copy-sync/copy-file-sync.js
var require_copy_file_sync = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/copy-file-sync.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var BUF_LENGTH = 64 * 1024;
    var _buff = new Buffer(BUF_LENGTH);
    function copyFileSync(srcFile, destFile, options) {
      var clobber = options.clobber;
      var preserveTimestamps = options.preserveTimestamps;
      if (fs2.existsSync(destFile) && !clobber) {
        throw Error("EEXIST");
      }
      var fdr = fs2.openSync(srcFile, "r");
      var stat = fs2.fstatSync(fdr);
      var fdw = fs2.openSync(destFile, "w", stat.mode);
      var bytesRead = 1;
      var pos = 0;
      while (bytesRead > 0) {
        bytesRead = fs2.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
        fs2.writeSync(fdw, _buff, 0, bytesRead);
        pos += bytesRead;
      }
      if (preserveTimestamps) {
        fs2.futimesSync(fdw, stat.atime, stat.mtime);
      }
      fs2.closeSync(fdr);
      fs2.closeSync(fdw);
    }
    module2.exports = copyFileSync;
  }
});

// node_modules/fs-extra/lib/copy-sync/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/copy-sync.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var copyFileSync = require_copy_file_sync();
    var mkdir = require_mkdirs2();
    function copySync(src, dest, options) {
      if (typeof options === "function" || options instanceof RegExp) {
        options = { filter: options };
      }
      options = options || {};
      options.recursive = !!options.recursive;
      options.clobber = "clobber" in options ? !!options.clobber : true;
      options.preserveTimestamps = "preserveTimestamps" in options ? !!options.preserveTimestamps : true;
      options.filter = options.filter || function() {
        return true;
      };
      var stats = options.recursive ? fs2.lstatSync(src) : fs2.statSync(src);
      var destFolder = path2.dirname(dest);
      var destFolderExists = fs2.existsSync(destFolder);
      var performCopy = false;
      if (stats.isFile()) {
        if (options.filter instanceof RegExp)
          performCopy = options.filter.test(src);
        else if (typeof options.filter === "function")
          performCopy = options.filter(src);
        if (performCopy) {
          if (!destFolderExists)
            mkdir.mkdirsSync(destFolder);
          copyFileSync(src, dest, { clobber: options.clobber, preserveTimestamps: options.preserveTimestamps });
        }
      } else if (stats.isDirectory()) {
        if (!fs2.existsSync(dest))
          mkdir.mkdirsSync(dest);
        var contents = fs2.readdirSync(src);
        contents.forEach(function(content) {
          var opts = options;
          opts.recursive = true;
          copySync(path2.join(src, content), path2.join(dest, content), opts);
        });
      } else if (options.recursive && stats.isSymbolicLink()) {
        var srcPath = fs2.readlinkSync(src);
        fs2.symlinkSync(srcPath, dest);
      }
    }
    module2.exports = copySync;
  }
});

// node_modules/fs-extra/lib/copy-sync/index.js
var require_copy_sync2 = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/index.js"(exports, module2) {
    module2.exports = {
      copySync: require_copy_sync()
    };
  }
});

// node_modules/rimraf/rimraf.js
var require_rimraf = __commonJS({
  "node_modules/rimraf/rimraf.js"(exports, module2) {
    module2.exports = rimraf;
    rimraf.sync = rimrafSync;
    var assert = require("assert");
    var path2 = require("path");
    var fs2 = require("fs");
    var glob2 = void 0;
    try {
      glob2 = require_glob();
    } catch (_err) {
    }
    var _0666 = parseInt("666", 8);
    var defaultGlobOpts = {
      nosort: true,
      silent: true
    };
    var timeout = 0;
    var isWindows = process.platform === "win32";
    function defaults(options) {
      var methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach(function(m) {
        options[m] = options[m] || fs2[m];
        m = m + "Sync";
        options[m] = options[m] || fs2[m];
      });
      options.maxBusyTries = options.maxBusyTries || 3;
      options.emfileWait = options.emfileWait || 1e3;
      if (options.glob === false) {
        options.disableGlob = true;
      }
      if (options.disableGlob !== true && glob2 === void 0) {
        throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
      }
      options.disableGlob = options.disableGlob || false;
      options.glob = options.glob || defaultGlobOpts;
    }
    function rimraf(p, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      assert(p, "rimraf: missing path");
      assert.equal(typeof p, "string", "rimraf: path should be a string");
      assert.equal(typeof cb, "function", "rimraf: callback function required");
      assert(options, "rimraf: invalid options argument provided");
      assert.equal(typeof options, "object", "rimraf: options should be object");
      defaults(options);
      var busyTries = 0;
      var errState = null;
      var n = 0;
      if (options.disableGlob || !glob2.hasMagic(p))
        return afterGlob(null, [p]);
      options.lstat(p, function(er, stat) {
        if (!er)
          return afterGlob(null, [p]);
        glob2(p, options.glob, afterGlob);
      });
      function next(er) {
        errState = errState || er;
        if (--n === 0)
          cb(errState);
      }
      function afterGlob(er, results) {
        if (er)
          return cb(er);
        n = results.length;
        if (n === 0)
          return cb();
        results.forEach(function(p2) {
          rimraf_(p2, options, function CB(er2) {
            if (er2) {
              if ((er2.code === "EBUSY" || er2.code === "ENOTEMPTY" || er2.code === "EPERM") && busyTries < options.maxBusyTries) {
                busyTries++;
                var time = busyTries * 100;
                return setTimeout(function() {
                  rimraf_(p2, options, CB);
                }, time);
              }
              if (er2.code === "EMFILE" && timeout < options.emfileWait) {
                return setTimeout(function() {
                  rimraf_(p2, options, CB);
                }, timeout++);
              }
              if (er2.code === "ENOENT")
                er2 = null;
            }
            timeout = 0;
            next(er2);
          });
        });
      }
    }
    function rimraf_(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.lstat(p, function(er, st) {
        if (er && er.code === "ENOENT")
          return cb(null);
        if (er && er.code === "EPERM" && isWindows)
          fixWinEPERM(p, options, er, cb);
        if (st && st.isDirectory())
          return rmdir(p, options, er, cb);
        options.unlink(p, function(er2) {
          if (er2) {
            if (er2.code === "ENOENT")
              return cb(null);
            if (er2.code === "EPERM")
              return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
            if (er2.code === "EISDIR")
              return rmdir(p, options, er2, cb);
          }
          return cb(er2);
        });
      });
    }
    function fixWinEPERM(p, options, er, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      if (er)
        assert(er instanceof Error);
      options.chmod(p, _0666, function(er2) {
        if (er2)
          cb(er2.code === "ENOENT" ? null : er);
        else
          options.stat(p, function(er3, stats) {
            if (er3)
              cb(er3.code === "ENOENT" ? null : er);
            else if (stats.isDirectory())
              rmdir(p, options, er, cb);
            else
              options.unlink(p, cb);
          });
      });
    }
    function fixWinEPERMSync(p, options, er) {
      assert(p);
      assert(options);
      if (er)
        assert(er instanceof Error);
      try {
        options.chmodSync(p, _0666);
      } catch (er2) {
        if (er2.code === "ENOENT")
          return;
        else
          throw er;
      }
      try {
        var stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT")
          return;
        else
          throw er;
      }
      if (stats.isDirectory())
        rmdirSync(p, options, er);
      else
        options.unlinkSync(p);
    }
    function rmdir(p, options, originalEr, cb) {
      assert(p);
      assert(options);
      if (originalEr)
        assert(originalEr instanceof Error);
      assert(typeof cb === "function");
      options.rmdir(p, function(er) {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
          rmkids(p, options, cb);
        else if (er && er.code === "ENOTDIR")
          cb(originalEr);
        else
          cb(er);
      });
    }
    function rmkids(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.readdir(p, function(er, files) {
        if (er)
          return cb(er);
        var n = files.length;
        if (n === 0)
          return options.rmdir(p, cb);
        var errState;
        files.forEach(function(f) {
          rimraf(path2.join(p, f), options, function(er2) {
            if (errState)
              return;
            if (er2)
              return cb(errState = er2);
            if (--n === 0)
              options.rmdir(p, cb);
          });
        });
      });
    }
    function rimrafSync(p, options) {
      options = options || {};
      defaults(options);
      assert(p, "rimraf: missing path");
      assert.equal(typeof p, "string", "rimraf: path should be a string");
      assert(options, "rimraf: missing options");
      assert.equal(typeof options, "object", "rimraf: options should be object");
      var results;
      if (options.disableGlob || !glob2.hasMagic(p)) {
        results = [p];
      } else {
        try {
          options.lstatSync(p);
          results = [p];
        } catch (er) {
          results = glob2.sync(p, options.glob);
        }
      }
      if (!results.length)
        return;
      for (var i = 0; i < results.length; i++) {
        var p = results[i];
        try {
          var st = options.lstatSync(p);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM" && isWindows)
            fixWinEPERMSync(p, options, er);
        }
        try {
          if (st && st.isDirectory())
            rmdirSync(p, options, null);
          else
            options.unlinkSync(p);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM")
            return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
          if (er.code !== "EISDIR")
            throw er;
          rmdirSync(p, options, er);
        }
      }
    }
    function rmdirSync(p, options, originalEr) {
      assert(p);
      assert(options);
      if (originalEr)
        assert(originalEr instanceof Error);
      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "ENOTDIR")
          throw originalEr;
        if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
          rmkidsSync(p, options);
      }
    }
    function rmkidsSync(p, options) {
      assert(p);
      assert(options);
      options.readdirSync(p).forEach(function(f) {
        rimrafSync(path2.join(p, f), options);
      });
      var retries = isWindows ? 100 : 1;
      var i = 0;
      do {
        var threw = true;
        try {
          var ret = options.rmdirSync(p, options);
          threw = false;
          return ret;
        } finally {
          if (++i < retries && threw)
            continue;
        }
      } while (true);
    }
  }
});

// node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/fs-extra/lib/remove/index.js"(exports, module2) {
    var rimraf = require_rimraf();
    function removeSync(dir) {
      return rimraf.sync(dir);
    }
    function remove(dir, callback) {
      return callback ? rimraf(dir, callback) : rimraf(dir, function() {
      });
    }
    module2.exports = {
      remove,
      removeSync
    };
  }
});

// node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "node_modules/jsonfile/index.js"(exports, module2) {
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_) {
      _fs = require("fs");
    }
    function readFile(file, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }
      if (typeof options === "string") {
        options = { encoding: options };
      }
      options = options || {};
      var fs2 = options.fs || _fs;
      var shouldThrow = true;
      if ("passParsingErrors" in options) {
        shouldThrow = options.passParsingErrors;
      } else if ("throws" in options) {
        shouldThrow = options.throws;
      }
      fs2.readFile(file, options, function(err, data) {
        if (err)
          return callback(err);
        data = stripBom(data);
        var obj;
        try {
          obj = JSON.parse(data, options ? options.reviver : null);
        } catch (err2) {
          if (shouldThrow) {
            err2.message = file + ": " + err2.message;
            return callback(err2);
          } else {
            return callback(null, null);
          }
        }
        callback(null, obj);
      });
    }
    function readFileSync(file, options) {
      options = options || {};
      if (typeof options === "string") {
        options = { encoding: options };
      }
      var fs2 = options.fs || _fs;
      var shouldThrow = true;
      if ("passParsingErrors" in options) {
        shouldThrow = options.passParsingErrors;
      } else if ("throws" in options) {
        shouldThrow = options.throws;
      }
      var content = fs2.readFileSync(file, options);
      content = stripBom(content);
      try {
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = file + ": " + err.message;
          throw err;
        } else {
          return null;
        }
      }
    }
    function writeFile2(file, obj, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }
      options = options || {};
      var fs2 = options.fs || _fs;
      var spaces = typeof options === "object" && options !== null ? "spaces" in options ? options.spaces : this.spaces : this.spaces;
      var str = "";
      try {
        str = JSON.stringify(obj, options ? options.replacer : null, spaces) + "\n";
      } catch (err) {
        if (callback)
          return callback(err, null);
      }
      fs2.writeFile(file, str, options, callback);
    }
    function writeFileSync(file, obj, options) {
      options = options || {};
      var fs2 = options.fs || _fs;
      var spaces = typeof options === "object" && options !== null ? "spaces" in options ? options.spaces : this.spaces : this.spaces;
      var str = JSON.stringify(obj, options.replacer, spaces) + "\n";
      return fs2.writeFileSync(file, str, options);
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content))
        content = content.toString("utf8");
      content = content.replace(/^\uFEFF/, "");
      return content;
    }
    var jsonfile = {
      spaces: null,
      readFile,
      readFileSync,
      writeFile: writeFile2,
      writeFileSync
    };
    module2.exports = jsonfile;
  }
});

// node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var jsonFile = require_jsonfile();
    var mkdir = require_mkdirs2();
    function outputJsonSync(file, data, options) {
      var dir = path2.dirname(file);
      if (!fs2.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      jsonFile.writeFileSync(file, data, options);
    }
    module2.exports = outputJsonSync;
  }
});

// node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/fs-extra/lib/json/output-json.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var jsonFile = require_jsonfile();
    var mkdir = require_mkdirs2();
    function outputJson(file, data, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      var dir = path2.dirname(file);
      fs2.exists(dir, function(itDoes) {
        if (itDoes)
          return jsonFile.writeFile(file, data, options, callback);
        mkdir.mkdirs(dir, function(err) {
          if (err)
            return callback(err);
          jsonFile.writeFile(file, data, options, callback);
        });
      });
    }
    module2.exports = outputJson;
  }
});

// node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/fs-extra/lib/json/index.js"(exports, module2) {
    var jsonFile = require_jsonfile();
    module2.exports = {
      outputJsonSync: require_output_json_sync(),
      outputJson: require_output_json(),
      outputJSONSync: require_output_json_sync(),
      outputJSON: require_output_json(),
      readJson: jsonFile.readFile,
      readJSON: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      readJSONSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJSON: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync,
      writeJSONSync: jsonFile.writeFileSync,
      spaces: 2
    };
  }
});

// node_modules/fs-extra/lib/move/index.js
var require_move = __commonJS({
  "node_modules/fs-extra/lib/move/index.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    var ncp = require_ncp();
    var path2 = require("path");
    var rimraf = require_rimraf();
    var mkdirp = require_mkdirs2().mkdirs;
    function mv(source, dest, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      var shouldMkdirp = "mkdirp" in options ? options.mkdirp : true;
      var clobber = "clobber" in options ? options.clobber : false;
      var limit = options.limit || 16;
      if (shouldMkdirp) {
        mkdirs();
      } else {
        doRename();
      }
      function mkdirs() {
        mkdirp(path2.dirname(dest), function(err) {
          if (err)
            return callback(err);
          doRename();
        });
      }
      function doRename() {
        if (clobber) {
          fs2.rename(source, dest, function(err) {
            if (!err)
              return callback();
            if (err.code === "ENOTEMPTY" || err.code === "EEXIST") {
              rimraf(dest, function(err2) {
                if (err2)
                  return callback(err2);
                options.clobber = false;
                mv(source, dest, options, callback);
              });
              return;
            }
            if (err.code === "EPERM") {
              setTimeout(function() {
                rimraf(dest, function(err2) {
                  if (err2)
                    return callback(err2);
                  options.clobber = false;
                  mv(source, dest, options, callback);
                });
              }, 200);
              return;
            }
            if (err.code !== "EXDEV")
              return callback(err);
            moveAcrossDevice(source, dest, clobber, limit, callback);
          });
        } else {
          fs2.link(source, dest, function(err) {
            if (err) {
              if (err.code === "EXDEV" || err.code === "EISDIR" || err.code === "EPERM") {
                moveAcrossDevice(source, dest, clobber, limit, callback);
                return;
              }
              callback(err);
              return;
            }
            fs2.unlink(source, callback);
          });
        }
      }
    }
    function moveAcrossDevice(source, dest, clobber, limit, callback) {
      fs2.stat(source, function(err, stat) {
        if (err) {
          callback(err);
          return;
        }
        if (stat.isDirectory()) {
          moveDirAcrossDevice(source, dest, clobber, limit, callback);
        } else {
          moveFileAcrossDevice(source, dest, clobber, limit, callback);
        }
      });
    }
    function moveFileAcrossDevice(source, dest, clobber, limit, callback) {
      var outFlags = clobber ? "w" : "wx";
      var ins = fs2.createReadStream(source);
      var outs = fs2.createWriteStream(dest, { flags: outFlags });
      ins.on("error", function(err) {
        ins.destroy();
        outs.destroy();
        outs.removeListener("close", onClose);
        fs2.unlink(dest, function() {
          if (err.code === "EISDIR" || err.code === "EPERM") {
            moveDirAcrossDevice(source, dest, clobber, limit, callback);
          } else {
            callback(err);
          }
        });
      });
      outs.on("error", function(err) {
        ins.destroy();
        outs.destroy();
        outs.removeListener("close", onClose);
        callback(err);
      });
      outs.once("close", onClose);
      ins.pipe(outs);
      function onClose() {
        fs2.unlink(source, callback);
      }
    }
    function moveDirAcrossDevice(source, dest, clobber, limit, callback) {
      var options = {
        stopOnErr: true,
        clobber: false,
        limit
      };
      function startNcp() {
        ncp(source, dest, options, function(errList) {
          if (errList)
            return callback(errList[0]);
          rimraf(source, callback);
        });
      }
      if (clobber) {
        rimraf(dest, function(err) {
          if (err)
            return callback(err);
          startNcp();
        });
      } else {
        startNcp();
      }
    }
    module2.exports = {
      move: mv
    };
  }
});

// node_modules/fs-extra/lib/streams/create-output-stream.js
var require_create_output_stream = __commonJS({
  "node_modules/fs-extra/lib/streams/create-output-stream.js"(exports, module2) {
    var path2 = require("path");
    var fs2 = require("fs");
    var mkdir = require_mkdirs2();
    var WriteStream = fs2.WriteStream;
    function createOutputStream(file, options) {
      var dirExists = false;
      var dir = path2.dirname(file);
      options = options || {};
      if (options.fd) {
        return fs2.createWriteStream(file, options);
      } else {
        options.fd = -1;
      }
      var ws = new WriteStream(file, options);
      var oldOpen = ws.open;
      ws.open = function() {
        ws.fd = null;
        if (dirExists)
          return oldOpen.call(ws);
        mkdir.mkdirs(dir, function(err) {
          if (err) {
            ws.destroy();
            ws.emit("error", err);
            return;
          }
          dirExists = true;
          oldOpen.call(ws);
        });
      };
      ws.open();
      return ws;
    }
    module2.exports = createOutputStream;
  }
});

// node_modules/fs-extra/lib/streams/index.js
var require_streams = __commonJS({
  "node_modules/fs-extra/lib/streams/index.js"(exports, module2) {
    module2.exports = {
      createOutputStream: require_create_output_stream()
    };
  }
});

// node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/fs-extra/lib/empty/index.js"(exports, module2) {
    var fs2 = require("fs");
    var path2 = require("path");
    var mkdir = require_mkdirs2();
    var remove = require_remove();
    function emptyDir(dir, callback) {
      fs2.readdir(dir, function(err, items) {
        if (err)
          return mkdir.mkdirs(dir, callback);
        items = items.map(function(item) {
          return path2.join(dir, item);
        });
        deleteItem();
        function deleteItem() {
          var item = items.pop();
          if (!item)
            return callback();
          remove.remove(item, function(err2) {
            if (err2)
              return callback(err2);
            deleteItem();
          });
        }
      });
    }
    function emptyDirSync(dir) {
      var items;
      try {
        items = fs2.readdirSync(dir);
      } catch (err) {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach(function(item) {
        item = path2.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/fs-extra/lib/ensure/file.js"(exports, module2) {
    var path2 = require("path");
    var fs2 = require_graceful_fs();
    var mkdir = require_mkdirs2();
    function createFile(file, callback) {
      function makeFile() {
        fs2.writeFile(file, "", function(err) {
          if (err)
            return callback(err);
          callback();
        });
      }
      fs2.exists(file, function(fileExists) {
        if (fileExists)
          return callback();
        var dir = path2.dirname(file);
        fs2.exists(dir, function(dirExists) {
          if (dirExists)
            return makeFile();
          mkdir.mkdirs(dir, function(err) {
            if (err)
              return callback(err);
            makeFile();
          });
        });
      });
    }
    function createFileSync(file) {
      if (fs2.existsSync(file))
        return;
      var dir = path2.dirname(file);
      if (!fs2.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      fs2.writeFileSync(file, "");
    }
    module2.exports = {
      createFile,
      createFileSync,
      ensureFile: createFile,
      ensureFileSync: createFileSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/fs-extra/lib/ensure/link.js"(exports, module2) {
    var path2 = require("path");
    var fs2 = require_graceful_fs();
    var mkdir = require_mkdirs2();
    function createLink(srcpath, dstpath, callback) {
      function makeLink(srcpath2, dstpath2) {
        fs2.link(srcpath2, dstpath2, function(err) {
          if (err)
            return callback(err);
          callback(null);
        });
      }
      fs2.exists(dstpath, function(destinationExists) {
        if (destinationExists)
          return callback(null);
        fs2.lstat(srcpath, function(err, stat) {
          if (err) {
            err.message = err.message.replace("lstat", "ensureLink");
            return callback(err);
          }
          var dir = path2.dirname(dstpath);
          fs2.exists(dir, function(dirExists) {
            if (dirExists)
              return makeLink(srcpath, dstpath);
            mkdir.mkdirs(dir, function(err2) {
              if (err2)
                return callback(err2);
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }
    function createLinkSync(srcpath, dstpath, callback) {
      var destinationExists = fs2.existsSync(dstpath);
      if (destinationExists)
        return void 0;
      try {
        fs2.lstatSync(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      var dir = path2.dirname(dstpath);
      var dirExists = fs2.existsSync(dir);
      if (dirExists)
        return fs2.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs2.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink,
      createLinkSync,
      ensureLink: createLink,
      ensureLinkSync: createLinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module2) {
    var path2 = require("path");
    path2.isAbsolute = path2.isAbsolute ? path2.isAbsolute : require_path_is_absolute();
    var fs2 = require_graceful_fs();
    function symlinkPaths(srcpath, dstpath, callback) {
      if (path2.isAbsolute(srcpath)) {
        return fs2.lstat(srcpath, function(err, stat) {
          if (err) {
            err.message = err.message.replace("lstat", "ensureSymlink");
            return callback(err);
          }
          return callback(null, {
            "toCwd": srcpath,
            "toDst": srcpath
          });
        });
      } else {
        var dstdir = path2.dirname(dstpath);
        var relativeToDst = path2.join(dstdir, srcpath);
        return fs2.exists(relativeToDst, function(exists) {
          if (exists) {
            return callback(null, {
              "toCwd": relativeToDst,
              "toDst": srcpath
            });
          } else {
            return fs2.lstat(srcpath, function(err, stat) {
              if (err) {
                err.message = err.message.replace("lstat", "ensureSymlink");
                return callback(err);
              }
              return callback(null, {
                "toCwd": srcpath,
                "toDst": path2.relative(dstdir, srcpath)
              });
            });
          }
        });
      }
    }
    function symlinkPathsSync(srcpath, dstpath) {
      var exists;
      if (path2.isAbsolute(srcpath)) {
        exists = fs2.existsSync(srcpath);
        if (!exists)
          throw new Error("absolute srcpath does not exist");
        return {
          "toCwd": srcpath,
          "toDst": srcpath
        };
      } else {
        var dstdir = path2.dirname(dstpath);
        var relativeToDst = path2.join(dstdir, srcpath);
        exists = fs2.existsSync(relativeToDst);
        if (exists) {
          return {
            "toCwd": relativeToDst,
            "toDst": srcpath
          };
        } else {
          exists = fs2.existsSync(srcpath);
          if (!exists)
            throw new Error("relative srcpath does not exist");
          return {
            "toCwd": srcpath,
            "toDst": path2.relative(dstdir, srcpath)
          };
        }
      }
    }
    module2.exports = {
      "symlinkPaths": symlinkPaths,
      "symlinkPathsSync": symlinkPathsSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module2) {
    var fs2 = require_graceful_fs();
    function symlinkType(srcpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      if (type)
        return callback(null, type);
      fs2.lstat(srcpath, function(err, stats) {
        if (err)
          return callback(null, "file");
        type = stats && stats.isDirectory() ? "dir" : "file";
        callback(null, type);
      });
    }
    function symlinkTypeSync(srcpath, type) {
      if (type)
        return type;
      try {
        var stats = fs2.lstatSync(srcpath);
      } catch (e) {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType,
      symlinkTypeSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink.js"(exports, module2) {
    var path2 = require("path");
    var fs2 = require_graceful_fs();
    var _mkdirs = require_mkdirs2();
    var mkdirs = _mkdirs.mkdirs;
    var mkdirsSync = _mkdirs.mkdirsSync;
    var _symlinkPaths = require_symlink_paths();
    var symlinkPaths = _symlinkPaths.symlinkPaths;
    var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
    var _symlinkType = require_symlink_type();
    var symlinkType = _symlinkType.symlinkType;
    var symlinkTypeSync = _symlinkType.symlinkTypeSync;
    function createSymlink(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      fs2.exists(dstpath, function(destinationExists) {
        if (destinationExists)
          return callback(null);
        symlinkPaths(srcpath, dstpath, function(err, relative) {
          if (err)
            return callback(err);
          srcpath = relative.toDst;
          symlinkType(relative.toCwd, type, function(err2, type2) {
            if (err2)
              return callback(err2);
            var dir = path2.dirname(dstpath);
            fs2.exists(dir, function(dirExists) {
              if (dirExists)
                return fs2.symlink(srcpath, dstpath, type2, callback);
              mkdirs(dir, function(err3) {
                if (err3)
                  return callback(err3);
                fs2.symlink(srcpath, dstpath, type2, callback);
              });
            });
          });
        });
      });
    }
    function createSymlinkSync(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      var destinationExists = fs2.existsSync(dstpath);
      if (destinationExists)
        return void 0;
      var relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      var dir = path2.dirname(dstpath);
      var exists = fs2.existsSync(dir);
      if (exists)
        return fs2.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs2.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink,
      createSymlinkSync,
      ensureSymlink: createSymlink,
      ensureSymlinkSync: createSymlinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/fs-extra/lib/ensure/index.js"(exports, module2) {
    var file = require_file();
    var link2 = require_link();
    var symlink = require_symlink();
    module2.exports = {
      createFile: file.createFile,
      createFileSync: file.createFileSync,
      ensureFile: file.createFile,
      ensureFileSync: file.createFileSync,
      createLink: link2.createLink,
      createLinkSync: link2.createLinkSync,
      ensureLink: link2.createLink,
      ensureLinkSync: link2.createLinkSync,
      createSymlink: symlink.createSymlink,
      createSymlinkSync: symlink.createSymlinkSync,
      ensureSymlink: symlink.createSymlink,
      ensureSymlinkSync: symlink.createSymlinkSync
    };
  }
});

// node_modules/fs-extra/lib/output/index.js
var require_output = __commonJS({
  "node_modules/fs-extra/lib/output/index.js"(exports, module2) {
    var path2 = require("path");
    var fs2 = require_graceful_fs();
    var mkdir = require_mkdirs2();
    function outputFile(file, data, encoding, callback) {
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = "utf8";
      }
      var dir = path2.dirname(file);
      fs2.exists(dir, function(itDoes) {
        if (itDoes)
          return fs2.writeFile(file, data, encoding, callback);
        mkdir.mkdirs(dir, function(err) {
          if (err)
            return callback(err);
          fs2.writeFile(file, data, encoding, callback);
        });
      });
    }
    function outputFileSync(file, data, encoding) {
      var dir = path2.dirname(file);
      if (fs2.existsSync(dir)) {
        return fs2.writeFileSync.apply(fs2, arguments);
      }
      mkdir.mkdirsSync(dir);
      fs2.writeFileSync.apply(fs2, arguments);
    }
    module2.exports = {
      outputFile,
      outputFileSync
    };
  }
});

// node_modules/fs-extra/lib/index.js
var require_lib = __commonJS({
  "node_modules/fs-extra/lib/index.js"(exports, module2) {
    var assign = require_assign();
    var fse = {};
    var gfs = require_graceful_fs();
    Object.keys(gfs).forEach(function(key) {
      fse[key] = gfs[key];
    });
    var fs2 = fse;
    assign(fs2, require_copy2());
    assign(fs2, require_copy_sync2());
    assign(fs2, require_mkdirs2());
    assign(fs2, require_remove());
    assign(fs2, require_json());
    assign(fs2, require_move());
    assign(fs2, require_streams());
    assign(fs2, require_empty());
    assign(fs2, require_ensure());
    assign(fs2, require_output());
    module2.exports = fs2;
    var jsonfile = {};
    Object.defineProperty(jsonfile, "spaces", {
      get: function() {
        return fs2.spaces;
      },
      set: function(val) {
        fs2.spaces = val;
      }
    });
    module2.exports.jsonfile = jsonfile;
  }
});

// node_modules/os-tmpdir/index.js
var require_os_tmpdir = __commonJS({
  "node_modules/os-tmpdir/index.js"(exports, module2) {
    "use strict";
    var isWindows = process.platform === "win32";
    var trailingSlashRe = isWindows ? /[^:]\\$/ : /.\/$/;
    module2.exports = function() {
      var path2;
      if (isWindows) {
        path2 = process.env.TEMP || process.env.TMP || (process.env.SystemRoot || process.env.windir) + "\\temp";
      } else {
        path2 = process.env.TMPDIR || process.env.TMP || process.env.TEMP || "/tmp";
      }
      if (trailingSlashRe.test(path2)) {
        path2 = path2.slice(0, -1);
      }
      return path2;
    };
  }
});

// node_modules/tmp/lib/tmp.js
var require_tmp = __commonJS({
  "node_modules/tmp/lib/tmp.js"(exports, module2) {
    var fs2 = require("fs");
    var path2 = require("path");
    var os2 = require("os");
    var crypto = require("crypto");
    var exists = fs2.exists || path2.exists;
    var existsSync = fs2.existsSync || path2.existsSync;
    var tmpDir = require_os_tmpdir();
    var _c = require("constants");
    var _TMP = tmpDir();
    var RANDOM_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var TEMPLATE_PATTERN = /XXXXXX/;
    var DEFAULT_TRIES = 3;
    var CREATE_FLAGS = _c.O_CREAT | _c.O_EXCL | _c.O_RDWR;
    var DIR_MODE = 448;
    var FILE_MODE = 384;
    var _removeObjects = [];
    var _gracefulCleanup = false;
    var _uncaughtException = false;
    function _randomChars(howMany) {
      var value = [], rnd = null;
      try {
        rnd = crypto.randomBytes(howMany);
      } catch (e) {
        rnd = crypto.pseudoRandomBytes(howMany);
      }
      for (var i = 0; i < howMany; i++) {
        value.push(RANDOM_CHARS[rnd[i] % RANDOM_CHARS.length]);
      }
      return value.join("");
    }
    function _isUndefined(obj) {
      return typeof obj === "undefined";
    }
    function _parseArguments(options, callback) {
      if (typeof options == "function") {
        var tmp = options;
        options = callback || {};
        callback = tmp;
      } else if (typeof options == "undefined") {
        options = {};
      }
      return [options, callback];
    }
    function _generateTmpName(opts) {
      if (opts.name) {
        return path2.join(opts.dir || _TMP, opts.name);
      }
      if (opts.template) {
        return opts.template.replace(TEMPLATE_PATTERN, _randomChars(6));
      }
      var name = [
        opts.prefix || "tmp-",
        process.pid,
        _randomChars(12),
        opts.postfix || ""
      ].join("");
      return path2.join(opts.dir || _TMP, name);
    }
    function _getTmpName(options, callback) {
      var args = _parseArguments(options, callback), opts = args[0], cb = args[1], tries = opts.tries || DEFAULT_TRIES;
      if (isNaN(tries) || tries < 0)
        return cb(new Error("Invalid tries"));
      if (opts.template && !opts.template.match(TEMPLATE_PATTERN))
        return cb(new Error("Invalid template provided"));
      (function _getUniqueName() {
        var name = _generateTmpName(opts);
        exists(name, function _pathExists(pathExists) {
          if (pathExists) {
            if (tries-- > 0)
              return _getUniqueName();
            return cb(new Error("Could not get a unique tmp filename, max tries reached " + name));
          }
          cb(null, name);
        });
      })();
    }
    function _getTmpNameSync(options) {
      var args = _parseArguments(options), opts = args[0], tries = opts.tries || DEFAULT_TRIES;
      if (isNaN(tries) || tries < 0)
        throw new Error("Invalid tries");
      if (opts.template && !opts.template.match(TEMPLATE_PATTERN))
        throw new Error("Invalid template provided");
      do {
        var name = _generateTmpName(opts);
        if (!existsSync(name)) {
          return name;
        }
      } while (tries-- > 0);
      throw new Error("Could not get a unique tmp filename, max tries reached");
    }
    function _createTmpFile(options, callback) {
      var args = _parseArguments(options, callback), opts = args[0], cb = args[1];
      opts.postfix = _isUndefined(opts.postfix) ? ".tmp" : opts.postfix;
      _getTmpName(opts, function _tmpNameCreated(err, name) {
        if (err)
          return cb(err);
        fs2.open(name, CREATE_FLAGS, opts.mode || FILE_MODE, function _fileCreated(err2, fd) {
          if (err2)
            return cb(err2);
          cb(null, name, fd, _prepareTmpFileRemoveCallback(name, fd, opts));
        });
      });
    }
    function _createTmpFileSync(options) {
      var args = _parseArguments(options), opts = args[0];
      opts.postfix = opts.postfix || ".tmp";
      var name = _getTmpNameSync(opts);
      var fd = fs2.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
      return {
        name,
        fd,
        removeCallback: _prepareTmpFileRemoveCallback(name, fd, opts)
      };
    }
    function _rmdirRecursiveSync(root) {
      var dirs = [root];
      do {
        var dir = dirs.pop(), deferred = false, files = fs2.readdirSync(dir);
        for (var i = 0, length = files.length; i < length; i++) {
          var file = path2.join(dir, files[i]), stat = fs2.lstatSync(file);
          if (stat.isDirectory()) {
            if (!deferred) {
              deferred = true;
              dirs.push(dir);
            }
            dirs.push(file);
          } else {
            fs2.unlinkSync(file);
          }
        }
        if (!deferred) {
          fs2.rmdirSync(dir);
        }
      } while (dirs.length !== 0);
    }
    function _createTmpDir(options, callback) {
      var args = _parseArguments(options, callback), opts = args[0], cb = args[1];
      _getTmpName(opts, function _tmpNameCreated(err, name) {
        if (err)
          return cb(err);
        fs2.mkdir(name, opts.mode || DIR_MODE, function _dirCreated(err2) {
          if (err2)
            return cb(err2);
          cb(null, name, _prepareTmpDirRemoveCallback(name, opts));
        });
      });
    }
    function _createTmpDirSync(options) {
      var args = _parseArguments(options), opts = args[0];
      var name = _getTmpNameSync(opts);
      fs2.mkdirSync(name, opts.mode || DIR_MODE);
      return {
        name,
        removeCallback: _prepareTmpDirRemoveCallback(name, opts)
      };
    }
    function _prepareTmpFileRemoveCallback(name, fd, opts) {
      var removeCallback = _prepareRemoveCallback(function _removeCallback(fdPath) {
        try {
          fs2.closeSync(fdPath[0]);
        } catch (e) {
          if (e.errno != -_c.EBADF && e.errno != -c.ENOENT) {
            throw e;
          }
        }
        fs2.unlinkSync(fdPath[1]);
      }, [fd, name]);
      if (!opts.keep) {
        _removeObjects.unshift(removeCallback);
      }
      return removeCallback;
    }
    function _prepareTmpDirRemoveCallback(name, opts) {
      var removeFunction = opts.unsafeCleanup ? _rmdirRecursiveSync : fs2.rmdirSync.bind(fs2);
      var removeCallback = _prepareRemoveCallback(removeFunction, name);
      if (!opts.keep) {
        _removeObjects.unshift(removeCallback);
      }
      return removeCallback;
    }
    function _prepareRemoveCallback(removeFunction, arg) {
      var called = false;
      return function _cleanupCallback() {
        if (called)
          return;
        var index = _removeObjects.indexOf(removeFunction);
        if (index >= 0) {
          _removeObjects.splice(index, 1);
        }
        called = true;
        removeFunction(arg);
      };
    }
    function _garbageCollector() {
      if (_uncaughtException && !_gracefulCleanup) {
        return;
      }
      for (var i = 0, length = _removeObjects.length; i < length; i++) {
        try {
          _removeObjects[i].call(null);
        } catch (e) {
        }
      }
    }
    function _setGracefulCleanup() {
      _gracefulCleanup = true;
    }
    var version = process.versions.node.split(".").map(function(value) {
      return parseInt(value, 10);
    });
    if (version[0] === 0 && (version[1] < 9 || version[1] === 9 && version[2] < 5)) {
      process.addListener("uncaughtException", function _uncaughtExceptionThrown(err) {
        _uncaughtException = true;
        _garbageCollector();
        throw err;
      });
    }
    process.addListener("exit", function _exit(code) {
      if (code)
        _uncaughtException = true;
      _garbageCollector();
    });
    module2.exports.tmpdir = _TMP;
    module2.exports.dir = _createTmpDir;
    module2.exports.dirSync = _createTmpDirSync;
    module2.exports.file = _createTmpFile;
    module2.exports.fileSync = _createTmpFileSync;
    module2.exports.tmpName = _getTmpName;
    module2.exports.tmpNameSync = _getTmpNameSync;
    module2.exports.setGracefulCleanup = _setGracefulCleanup;
  }
});

// node_modules/app-bundle-info/node_modules/glob/common.js
var require_common2 = __commonJS({
  "node_modules/app-bundle-info/node_modules/glob/common.js"(exports) {
    exports.alphasort = alphasort;
    exports.alphasorti = alphasorti;
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var path2 = require("path");
    var minimatch = require_minimatch();
    var isAbsolute = require_path_is_absolute();
    var Minimatch = minimatch.Minimatch;
    function alphasorti(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
    function alphasort(a, b) {
      return a.localeCompare(b);
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [];
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore];
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern);
      }
      return {
        matcher: new Minimatch(pattern),
        gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && pattern.indexOf("/") === -1) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent;
      self.pattern = pattern;
      self.strict = options.strict !== false;
      self.realpath = !!options.realpath;
      self.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self.follow = !!options.follow;
      self.dot = !!options.dot;
      self.mark = !!options.mark;
      self.nodir = !!options.nodir;
      if (self.nodir)
        self.mark = true;
      self.sync = !!options.sync;
      self.nounique = !!options.nounique;
      self.nonull = !!options.nonull;
      self.nosort = !!options.nosort;
      self.nocase = !!options.nocase;
      self.stat = !!options.stat;
      self.noprocess = !!options.noprocess;
      self.maxLength = options.maxLength || Infinity;
      self.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self, options);
      self.changedCwd = false;
      var cwd = process.cwd();
      if (!ownProp(options, "cwd"))
        self.cwd = cwd;
      else {
        self.cwd = options.cwd;
        self.changedCwd = path2.resolve(options.cwd) !== cwd;
      }
      self.root = options.root || path2.resolve(self.cwd, "/");
      self.root = path2.resolve(self.root);
      if (process.platform === "win32")
        self.root = self.root.replace(/\\/g, "/");
      self.nomount = !!options.nomount;
      options.nonegate = options.nonegate === false ? false : true;
      options.nocomment = options.nocomment === false ? false : true;
      deprecationWarning(options);
      self.minimatch = new Minimatch(pattern, options);
      self.options = self.minimatch.options;
    }
    exports.deprecationWarned;
    function deprecationWarning(options) {
      if (!options.nonegate || !options.nocomment) {
        if (process.noDeprecation !== true && !exports.deprecationWarned) {
          var msg = "glob WARNING: comments and negation will be disabled in v6";
          if (process.throwDeprecation)
            throw new Error(msg);
          else if (process.traceDeprecation)
            console.trace(msg);
          else
            console.error(msg);
          exports.deprecationWarned = true;
        }
      }
    }
    function finish(self) {
      var nou = self.nounique;
      var all = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all.push.apply(all, m);
          else
            m.forEach(function(m2) {
              all[m2] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self.nosort)
        all = all.sort(self.nocase ? alphasorti : alphasort);
      if (self.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self._mark(all[i]);
        }
        if (self.nodir) {
          all = all.filter(function(e) {
            return !/\/$/.test(e);
          });
        }
      }
      if (self.ignore.length)
        all = all.filter(function(m2) {
          return !isIgnored(self, m2);
        });
      self.found = all;
    }
    function mark(self, p) {
      var abs = makeAbs(self, p);
      var c2 = self.cache[abs];
      var m = p;
      if (c2) {
        var isDir = c2 === "DIR" || Array.isArray(c2);
        var slash = p.slice(-1) === "/";
        if (isDir && !slash)
          m += "/";
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self, m);
          self.statCache[mabs] = self.statCache[abs];
          self.cache[mabs] = self.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self, f) {
      var abs = f;
      if (f.charAt(0) === "/") {
        abs = path2.join(self.root, f);
      } else if (isAbsolute(f) || f === "") {
        abs = f;
      } else if (self.changedCwd) {
        abs = path2.resolve(self.cwd, f);
      } else {
        abs = path2.resolve(f);
      }
      return abs;
    }
    function isIgnored(self, path3) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return item.matcher.match(path3) || !!(item.gmatcher && item.gmatcher.match(path3));
      });
    }
    function childrenIgnored(self, path3) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path3));
      });
    }
  }
});

// node_modules/app-bundle-info/node_modules/glob/sync.js
var require_sync2 = __commonJS({
  "node_modules/app-bundle-info/node_modules/glob/sync.js"(exports, module2) {
    module2.exports = globSync;
    globSync.GlobSync = GlobSync;
    var fs2 = require("fs");
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var Glob = require_glob2().Glob;
    var util = require("util");
    var path2 = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var common = require_common2();
    var alphasort = common.alphasort;
    var alphasorti = common.alphasorti;
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert(this instanceof GlobSync);
      if (this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset) {
            try {
              p = self._makeAbs(p);
              var real = fs2.realpathSync(p, self.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === "stat")
                set[self._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert(this instanceof GlobSync);
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path2.join(this.root, e);
          }
          this.matches[index][e] = true;
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c2 = this.cache[this._makeAbs(e)];
        if (c2 === "DIR" || Array.isArray(c2))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat;
      try {
        lstat = fs2.lstatSync(abs);
      } catch (er) {
        return null;
      }
      var isSym = lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (!c2 || c2 === "FILE")
          return null;
        if (Array.isArray(c2))
          return c2;
      }
      try {
        return this._readdirEntries(abs, fs2.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          this.cache[this._makeAbs(f)] = "FILE";
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path2.join(this.root, prefix);
        } else {
          prefix = path2.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this.matches[index][prefix] = true;
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (Array.isArray(c2))
          c2 = "DIR";
        if (!needDir || c2 === "DIR")
          return c2;
        if (needDir && c2 === "FILE")
          return false;
      }
      var exists;
      var stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = fs2.lstatSync(abs);
        } catch (er) {
          return false;
        }
        if (lstat.isSymbolicLink()) {
          try {
            stat = fs2.statSync(abs);
          } catch (er) {
            stat = lstat;
          }
        } else {
          stat = lstat;
        }
      }
      this.statCache[abs] = stat;
      var c2 = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c2;
      if (needDir && c2 !== "DIR")
        return false;
      return c2;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// node_modules/app-bundle-info/node_modules/glob/glob.js
var require_glob2 = __commonJS({
  "node_modules/app-bundle-info/node_modules/glob/glob.js"(exports, module2) {
    module2.exports = glob2;
    var fs2 = require("fs");
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var inherits = require_inherits();
    var EE = require("events").EventEmitter;
    var path2 = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var globSync = require_sync2();
    var common = require_common2();
    var alphasort = common.alphasort;
    var alphasorti = common.alphasorti;
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util = require("util");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require_once();
    function glob2(pattern, options, cb) {
      if (typeof options === "function")
        cb = options, options = {};
      if (!options)
        options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob2.sync = globSync;
    var GlobSync = glob2.GlobSync = globSync.GlobSync;
    glob2.glob = glob2;
    glob2.hasMagic = function(pattern, options_) {
      var options = util._extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== "string")
          return true;
      }
      return false;
    };
    glob2.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      if (typeof cb === "function") {
        cb = once(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self = this;
      var n = this.minimatch.set.length;
      this._processing = 0;
      this.matches = new Array(n);
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n === 0)
        return done();
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      function done() {
        --self._processing;
        if (self._processing <= 0)
          self._finish();
      }
    }
    Glob.prototype._finish = function() {
      assert(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      var self = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n === 0)
          self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self = this;
      var n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self._makeAbs(p);
        fs2.realpath(p, self.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === "stat")
            set[p] = true;
          else
            self.emit("error", er);
          if (--n === 0) {
            self.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert(this instanceof Glob);
      assert(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path2.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (this.matches[index][e])
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = this._makeAbs(e);
      if (this.nodir) {
        var c2 = this.cache[abs];
        if (c2 === "DIR" || Array.isArray(c2))
          return;
      }
      if (this.mark)
        e = this._mark(e);
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit("stat", e, st);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        fs2.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er)
          return cb();
        var isSym = lstat.isSymbolicLink();
        self.symlinks[abs] = isSym;
        if (!isSym && !lstat.isDirectory()) {
          self.cache[abs] = "FILE";
          cb();
        } else
          self._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (!c2 || c2 === "FILE")
          return cb();
        if (Array.isArray(c2))
          return cb(null, c2);
      }
      var self = this;
      fs2.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self, abs, cb) {
      return function(er, entries) {
        if (er)
          self._readdirError(abs, er, cb);
        else
          self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return;
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          this.cache[this._makeAbs(f)] = "FILE";
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit("error", er);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er, exists) {
        self._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path2.join(this.root, prefix);
        } else {
          prefix = path2.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (Array.isArray(c2))
          c2 = "DIR";
        if (!needDir || c2 === "DIR")
          return cb(null, c2);
        if (needDir && c2 === "FILE")
          return cb();
      }
      var exists;
      var stat = this.statCache[abs];
      if (stat !== void 0) {
        if (stat === false)
          return cb(null, stat);
        else {
          var type = stat.isDirectory() ? "DIR" : "FILE";
          if (needDir && type === "FILE")
            return cb();
          else
            return cb(null, type, stat);
        }
      }
      var self = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        fs2.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return fs2.stat(abs, function(er2, stat2) {
            if (er2)
              self._stat2(f, abs, null, lstat, cb);
            else
              self._stat2(f, abs, er2, stat2, cb);
          });
        } else {
          self._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === "/";
      this.statCache[abs] = stat;
      if (abs.slice(-1) === "/" && !stat.isDirectory())
        return cb(null, false, stat);
      var c2 = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c2;
      if (needDir && c2 !== "DIR")
        return cb();
      return cb(null, c2, stat);
    };
  }
});

// node_modules/lock/index.js
var require_lock = __commonJS({
  "node_modules/lock/index.js"(exports, module2) {
    module2.exports = function() {
      var next = typeof setImmediate === "undefined" ? setTimeout : setImmediate;
      var locked = {};
      function _releaser(key, exec2) {
        return function(done) {
          return function() {
            _release(key, exec2);
            if (done)
              done.apply(null, arguments);
          };
        };
      }
      function _release(key, exec2) {
        var i = locked[key].indexOf(exec2);
        if (!~i)
          return;
        locked[key].splice(i, 1);
        if (isLocked(key))
          next(function() {
            locked[key][0](_releaser(key, locked[key][0]));
          });
        else
          delete locked[key];
      }
      function _lock(key, exec2) {
        if (isLocked(key))
          return locked[key].push(exec2), false;
        return locked[key] = [exec2], true;
      }
      function lock(key, exec2) {
        if (Array.isArray(key)) {
          let releaser2 = function(done) {
            return function() {
              var args = [].slice.call(arguments);
              for (var key2 in l)
                _release(key2, l[key2]);
              done.apply(this, args);
            };
          };
          var releaser = releaser2;
          var keys = key.length, locks = [];
          var l = {};
          key.forEach(function(key2) {
            var n = 0;
            function ready() {
              if (n++)
                return;
              if (!--keys)
                exec2(releaser2);
            }
            l[key2] = ready;
            if (_lock(key2, ready))
              ready();
          });
          return;
        }
        if (_lock(key, exec2))
          exec2(_releaser(key, exec2));
      }
      function isLocked(key) {
        return Array.isArray(locked[key]) ? !!locked[key].length : false;
      }
      lock.isLocked = isLocked;
      return lock;
    };
  }
});

// node_modules/fstream/lib/abstract.js
var require_abstract = __commonJS({
  "node_modules/fstream/lib/abstract.js"(exports, module2) {
    module2.exports = Abstract;
    var Stream = require("stream").Stream;
    var inherits = require_inherits();
    function Abstract() {
      Stream.call(this);
    }
    inherits(Abstract, Stream);
    Abstract.prototype.on = function(ev, fn) {
      if (ev === "ready" && this.ready) {
        process.nextTick(fn.bind(this));
      } else {
        Stream.prototype.on.call(this, ev, fn);
      }
      return this;
    };
    Abstract.prototype.abort = function() {
      this._aborted = true;
      this.emit("abort");
    };
    Abstract.prototype.destroy = function() {
    };
    Abstract.prototype.warn = function(msg, code) {
      var self = this;
      var er = decorate(msg, code, self);
      if (!self.listeners("warn")) {
        console.error("%s %s\npath = %s\nsyscall = %s\nfstream_type = %s\nfstream_path = %s\nfstream_unc_path = %s\nfstream_class = %s\nfstream_stack =\n%s\n", code || "UNKNOWN", er.stack, er.path, er.syscall, er.fstream_type, er.fstream_path, er.fstream_unc_path, er.fstream_class, er.fstream_stack.join("\n"));
      } else {
        self.emit("warn", er);
      }
    };
    Abstract.prototype.info = function(msg, code) {
      this.emit("info", msg, code);
    };
    Abstract.prototype.error = function(msg, code, th) {
      var er = decorate(msg, code, this);
      if (th)
        throw er;
      else
        this.emit("error", er);
    };
    function decorate(er, code, self) {
      if (!(er instanceof Error))
        er = new Error(er);
      er.code = er.code || code;
      er.path = er.path || self.path;
      er.fstream_type = er.fstream_type || self.type;
      er.fstream_path = er.fstream_path || self.path;
      if (self._path !== self.path) {
        er.fstream_unc_path = er.fstream_unc_path || self._path;
      }
      if (self.linkpath) {
        er.fstream_linkpath = er.fstream_linkpath || self.linkpath;
      }
      er.fstream_class = er.fstream_class || self.constructor.name;
      er.fstream_stack = er.fstream_stack || new Error().stack.split(/\n/).slice(3).map(function(s) {
        return s.replace(/^ {4}at /, "");
      });
      return er;
    }
  }
});

// node_modules/fstream/lib/get-type.js
var require_get_type = __commonJS({
  "node_modules/fstream/lib/get-type.js"(exports, module2) {
    module2.exports = getType;
    function getType(st) {
      var types = [
        "Directory",
        "File",
        "SymbolicLink",
        "Link",
        "BlockDevice",
        "CharacterDevice",
        "FIFO",
        "Socket"
      ];
      var type;
      if (st.type && types.indexOf(st.type) !== -1) {
        st[st.type] = true;
        return st.type;
      }
      for (var i = 0, l = types.length; i < l; i++) {
        type = types[i];
        var is = st[type] || st["is" + type];
        if (typeof is === "function")
          is = is.call(st);
        if (is) {
          st[type] = true;
          st.type = type;
          return type;
        }
      }
      return null;
    }
  }
});

// node_modules/fstream/lib/link-reader.js
var require_link_reader = __commonJS({
  "node_modules/fstream/lib/link-reader.js"(exports, module2) {
    module2.exports = LinkReader;
    var fs2 = require_graceful_fs();
    var inherits = require_inherits();
    var Reader = require_reader();
    inherits(LinkReader, Reader);
    function LinkReader(props) {
      var self = this;
      if (!(self instanceof LinkReader)) {
        throw new Error("LinkReader must be called as constructor.");
      }
      if (!(props.type === "Link" && props.Link || props.type === "SymbolicLink" && props.SymbolicLink)) {
        throw new Error("Non-link type " + props.type);
      }
      Reader.call(self, props);
    }
    LinkReader.prototype._stat = function(currentStat) {
      var self = this;
      fs2.readlink(self._path, function(er, linkpath) {
        if (er)
          return self.error(er);
        self.linkpath = self.props.linkpath = linkpath;
        self.emit("linkpath", linkpath);
        Reader.prototype._stat.call(self, currentStat);
      });
    };
    LinkReader.prototype._read = function() {
      var self = this;
      if (self._paused)
        return;
      if (!self._ended) {
        self.emit("end");
        self.emit("close");
        self._ended = true;
      }
    };
  }
});

// node_modules/fstream/lib/dir-reader.js
var require_dir_reader = __commonJS({
  "node_modules/fstream/lib/dir-reader.js"(exports, module2) {
    module2.exports = DirReader;
    var fs2 = require_graceful_fs();
    var inherits = require_inherits();
    var path2 = require("path");
    var Reader = require_reader();
    var assert = require("assert").ok;
    inherits(DirReader, Reader);
    function DirReader(props) {
      var self = this;
      if (!(self instanceof DirReader)) {
        throw new Error("DirReader must be called as constructor.");
      }
      if (props.type !== "Directory" || !props.Directory) {
        throw new Error("Non-directory type " + props.type);
      }
      self.entries = null;
      self._index = -1;
      self._paused = false;
      self._length = -1;
      if (props.sort) {
        this.sort = props.sort;
      }
      Reader.call(this, props);
    }
    DirReader.prototype._getEntries = function() {
      var self = this;
      if (self._gotEntries)
        return;
      self._gotEntries = true;
      fs2.readdir(self._path, function(er, entries) {
        if (er)
          return self.error(er);
        self.entries = entries;
        self.emit("entries", entries);
        if (self._paused)
          self.once("resume", processEntries);
        else
          processEntries();
        function processEntries() {
          self._length = self.entries.length;
          if (typeof self.sort === "function") {
            self.entries = self.entries.sort(self.sort.bind(self));
          }
          self._read();
        }
      });
    };
    DirReader.prototype._read = function() {
      var self = this;
      if (!self.entries)
        return self._getEntries();
      if (self._paused || self._currentEntry || self._aborted) {
        return;
      }
      self._index++;
      if (self._index >= self.entries.length) {
        if (!self._ended) {
          self._ended = true;
          self.emit("end");
          self.emit("close");
        }
        return;
      }
      var p = path2.resolve(self._path, self.entries[self._index]);
      assert(p !== self._path);
      assert(self.entries[self._index]);
      self._currentEntry = p;
      fs2[self.props.follow ? "stat" : "lstat"](p, function(er, stat) {
        if (er)
          return self.error(er);
        var who = self._proxy || self;
        stat.path = p;
        stat.basename = path2.basename(p);
        stat.dirname = path2.dirname(p);
        var childProps = self.getChildProps.call(who, stat);
        childProps.path = p;
        childProps.basename = path2.basename(p);
        childProps.dirname = path2.dirname(p);
        var entry = Reader(childProps, stat);
        self._currentEntry = entry;
        entry.on("pause", function(who2) {
          if (!self._paused && !entry._disowned) {
            self.pause(who2);
          }
        });
        entry.on("resume", function(who2) {
          if (self._paused && !entry._disowned) {
            self.resume(who2);
          }
        });
        entry.on("stat", function(props) {
          self.emit("_entryStat", entry, props);
          if (entry._aborted)
            return;
          if (entry._paused) {
            entry.once("resume", function() {
              self.emit("entryStat", entry, props);
            });
          } else
            self.emit("entryStat", entry, props);
        });
        entry.on("ready", function EMITCHILD() {
          if (self._paused) {
            entry.pause(self);
            return self.once("resume", EMITCHILD);
          }
          if (entry.type === "Socket") {
            self.emit("socket", entry);
          } else {
            self.emitEntry(entry);
          }
        });
        var ended = false;
        entry.on("close", onend);
        entry.on("disown", onend);
        function onend() {
          if (ended)
            return;
          ended = true;
          self.emit("childEnd", entry);
          self.emit("entryEnd", entry);
          self._currentEntry = null;
          if (!self._paused) {
            self._read();
          }
        }
        entry.on("error", function(er2) {
          if (entry._swallowErrors) {
            self.warn(er2);
            entry.emit("end");
            entry.emit("close");
          } else {
            self.emit("error", er2);
          }
        });
        [
          "child",
          "childEnd",
          "warn"
        ].forEach(function(ev) {
          entry.on(ev, self.emit.bind(self, ev));
        });
      });
    };
    DirReader.prototype.disown = function(entry) {
      entry.emit("beforeDisown");
      entry._disowned = true;
      entry.parent = entry.root = null;
      if (entry === this._currentEntry) {
        this._currentEntry = null;
      }
      entry.emit("disown");
    };
    DirReader.prototype.getChildProps = function() {
      return {
        depth: this.depth + 1,
        root: this.root || this,
        parent: this,
        follow: this.follow,
        filter: this.filter,
        sort: this.props.sort,
        hardlinks: this.props.hardlinks
      };
    };
    DirReader.prototype.pause = function(who) {
      var self = this;
      if (self._paused)
        return;
      who = who || self;
      self._paused = true;
      if (self._currentEntry && self._currentEntry.pause) {
        self._currentEntry.pause(who);
      }
      self.emit("pause", who);
    };
    DirReader.prototype.resume = function(who) {
      var self = this;
      if (!self._paused)
        return;
      who = who || self;
      self._paused = false;
      self.emit("resume", who);
      if (self._paused) {
        return;
      }
      if (self._currentEntry) {
        if (self._currentEntry.resume)
          self._currentEntry.resume(who);
      } else
        self._read();
    };
    DirReader.prototype.emitEntry = function(entry) {
      this.emit("entry", entry);
      this.emit("child", entry);
    };
  }
});

// node_modules/fstream/lib/file-reader.js
var require_file_reader = __commonJS({
  "node_modules/fstream/lib/file-reader.js"(exports, module2) {
    module2.exports = FileReader;
    var fs2 = require_graceful_fs();
    var inherits = require_inherits();
    var Reader = require_reader();
    var EOF = { EOF: true };
    var CLOSE = { CLOSE: true };
    inherits(FileReader, Reader);
    function FileReader(props) {
      var self = this;
      if (!(self instanceof FileReader)) {
        throw new Error("FileReader must be called as constructor.");
      }
      if (!(props.type === "Link" && props.Link || props.type === "File" && props.File)) {
        throw new Error("Non-file type " + props.type);
      }
      self._buffer = [];
      self._bytesEmitted = 0;
      Reader.call(self, props);
    }
    FileReader.prototype._getStream = function() {
      var self = this;
      var stream = self._stream = fs2.createReadStream(self._path, self.props);
      if (self.props.blksize) {
        stream.bufferSize = self.props.blksize;
      }
      stream.on("open", self.emit.bind(self, "open"));
      stream.on("data", function(c2) {
        self._bytesEmitted += c2.length;
        if (!c2.length) {
          return;
        } else if (self._paused || self._buffer.length) {
          self._buffer.push(c2);
          self._read();
        } else
          self.emit("data", c2);
      });
      stream.on("end", function() {
        if (self._paused || self._buffer.length) {
          self._buffer.push(EOF);
          self._read();
        } else {
          self.emit("end");
        }
        if (self._bytesEmitted !== self.props.size) {
          self.error("Didn't get expected byte count\nexpect: " + self.props.size + "\nactual: " + self._bytesEmitted);
        }
      });
      stream.on("close", function() {
        if (self._paused || self._buffer.length) {
          self._buffer.push(CLOSE);
          self._read();
        } else {
          self.emit("close");
        }
      });
      stream.on("error", function(e) {
        self.emit("error", e);
      });
      self._read();
    };
    FileReader.prototype._read = function() {
      var self = this;
      if (self._paused) {
        return;
      }
      if (!self._stream) {
        return self._getStream();
      }
      if (self._buffer.length) {
        var buf = self._buffer;
        for (var i = 0, l = buf.length; i < l; i++) {
          var c2 = buf[i];
          if (c2 === EOF) {
            self.emit("end");
          } else if (c2 === CLOSE) {
            self.emit("close");
          } else {
            self.emit("data", c2);
          }
          if (self._paused) {
            self._buffer = buf.slice(i);
            return;
          }
        }
        self._buffer.length = 0;
      }
    };
    FileReader.prototype.pause = function(who) {
      var self = this;
      if (self._paused)
        return;
      who = who || self;
      self._paused = true;
      if (self._stream)
        self._stream.pause();
      self.emit("pause", who);
    };
    FileReader.prototype.resume = function(who) {
      var self = this;
      if (!self._paused)
        return;
      who = who || self;
      self.emit("resume", who);
      self._paused = false;
      if (self._stream)
        self._stream.resume();
      self._read();
    };
  }
});

// node_modules/fstream/lib/socket-reader.js
var require_socket_reader = __commonJS({
  "node_modules/fstream/lib/socket-reader.js"(exports, module2) {
    module2.exports = SocketReader;
    var inherits = require_inherits();
    var Reader = require_reader();
    inherits(SocketReader, Reader);
    function SocketReader(props) {
      var self = this;
      if (!(self instanceof SocketReader)) {
        throw new Error("SocketReader must be called as constructor.");
      }
      if (!(props.type === "Socket" && props.Socket)) {
        throw new Error("Non-socket type " + props.type);
      }
      Reader.call(self, props);
    }
    SocketReader.prototype._read = function() {
      var self = this;
      if (self._paused)
        return;
      if (!self._ended) {
        self.emit("end");
        self.emit("close");
        self._ended = true;
      }
    };
  }
});

// node_modules/fstream/lib/proxy-reader.js
var require_proxy_reader = __commonJS({
  "node_modules/fstream/lib/proxy-reader.js"(exports, module2) {
    module2.exports = ProxyReader;
    var Reader = require_reader();
    var getType = require_get_type();
    var inherits = require_inherits();
    var fs2 = require_graceful_fs();
    inherits(ProxyReader, Reader);
    function ProxyReader(props) {
      var self = this;
      if (!(self instanceof ProxyReader)) {
        throw new Error("ProxyReader must be called as constructor.");
      }
      self.props = props;
      self._buffer = [];
      self.ready = false;
      Reader.call(self, props);
    }
    ProxyReader.prototype._stat = function() {
      var self = this;
      var props = self.props;
      var stat = props.follow ? "stat" : "lstat";
      fs2[stat](props.path, function(er, current) {
        var type;
        if (er || !current) {
          type = "File";
        } else {
          type = getType(current);
        }
        props[type] = true;
        props.type = self.type = type;
        self._old = current;
        self._addProxy(Reader(props, current));
      });
    };
    ProxyReader.prototype._addProxy = function(proxy) {
      var self = this;
      if (self._proxyTarget) {
        return self.error("proxy already set");
      }
      self._proxyTarget = proxy;
      proxy._proxy = self;
      [
        "error",
        "data",
        "end",
        "close",
        "linkpath",
        "entry",
        "entryEnd",
        "child",
        "childEnd",
        "warn",
        "stat"
      ].forEach(function(ev) {
        proxy.on(ev, self.emit.bind(self, ev));
      });
      self.emit("proxy", proxy);
      proxy.on("ready", function() {
        self.ready = true;
        self.emit("ready");
      });
      var calls = self._buffer;
      self._buffer.length = 0;
      calls.forEach(function(c2) {
        proxy[c2[0]].apply(proxy, c2[1]);
      });
    };
    ProxyReader.prototype.pause = function() {
      return this._proxyTarget ? this._proxyTarget.pause() : false;
    };
    ProxyReader.prototype.resume = function() {
      return this._proxyTarget ? this._proxyTarget.resume() : false;
    };
  }
});

// node_modules/fstream/lib/reader.js
var require_reader = __commonJS({
  "node_modules/fstream/lib/reader.js"(exports, module2) {
    module2.exports = Reader;
    var fs2 = require_graceful_fs();
    var Stream = require("stream").Stream;
    var inherits = require_inherits();
    var path2 = require("path");
    var getType = require_get_type();
    var hardLinks = Reader.hardLinks = {};
    var Abstract = require_abstract();
    inherits(Reader, Abstract);
    var LinkReader = require_link_reader();
    function Reader(props, currentStat) {
      var self = this;
      if (!(self instanceof Reader))
        return new Reader(props, currentStat);
      if (typeof props === "string") {
        props = { path: props };
      }
      var type;
      var ClassType;
      if (props.type && typeof props.type === "function") {
        type = props.type;
        ClassType = type;
      } else {
        type = getType(props);
        ClassType = Reader;
      }
      if (currentStat && !type) {
        type = getType(currentStat);
        props[type] = true;
        props.type = type;
      }
      switch (type) {
        case "Directory":
          ClassType = require_dir_reader();
          break;
        case "Link":
        case "File":
          ClassType = require_file_reader();
          break;
        case "SymbolicLink":
          ClassType = LinkReader;
          break;
        case "Socket":
          ClassType = require_socket_reader();
          break;
        case null:
          ClassType = require_proxy_reader();
          break;
      }
      if (!(self instanceof ClassType)) {
        return new ClassType(props);
      }
      Abstract.call(self);
      if (!props.path) {
        self.error("Must provide a path", null, true);
      }
      self.readable = true;
      self.writable = false;
      self.type = type;
      self.props = props;
      self.depth = props.depth = props.depth || 0;
      self.parent = props.parent || null;
      self.root = props.root || props.parent && props.parent.root || self;
      self._path = self.path = path2.resolve(props.path);
      if (process.platform === "win32") {
        self.path = self._path = self.path.replace(/\?/g, "_");
        if (self._path.length >= 260) {
          self._swallowErrors = true;
          self._path = "\\\\?\\" + self.path.replace(/\//g, "\\");
        }
      }
      self.basename = props.basename = path2.basename(self.path);
      self.dirname = props.dirname = path2.dirname(self.path);
      props.parent = props.root = null;
      self.size = props.size;
      self.filter = typeof props.filter === "function" ? props.filter : null;
      if (props.sort === "alpha")
        props.sort = alphasort;
      self._stat(currentStat);
    }
    function alphasort(a, b) {
      return a === b ? 0 : a.toLowerCase() > b.toLowerCase() ? 1 : a.toLowerCase() < b.toLowerCase() ? -1 : a > b ? 1 : -1;
    }
    Reader.prototype._stat = function(currentStat) {
      var self = this;
      var props = self.props;
      var stat = props.follow ? "stat" : "lstat";
      if (currentStat)
        process.nextTick(statCb.bind(null, null, currentStat));
      else
        fs2[stat](self._path, statCb);
      function statCb(er, props_) {
        if (er)
          return self.error(er);
        Object.keys(props_).forEach(function(k2) {
          props[k2] = props_[k2];
        });
        if (self.size !== void 0 && props.size !== self.size) {
          return self.error("incorrect size");
        }
        self.size = props.size;
        var type = getType(props);
        var handleHardlinks = props.hardlinks !== false;
        if (handleHardlinks && type !== "Directory" && props.nlink && props.nlink > 1) {
          var k = props.dev + ":" + props.ino;
          if (hardLinks[k] === self._path || !hardLinks[k]) {
            hardLinks[k] = self._path;
          } else {
            type = self.type = self.props.type = "Link";
            self.Link = self.props.Link = true;
            self.linkpath = self.props.linkpath = hardLinks[k];
            self._stat = self._read = LinkReader.prototype._read;
          }
        }
        if (self.type && self.type !== type) {
          self.error("Unexpected type: " + type);
        }
        if (self.filter) {
          var who = self._proxy || self;
          if (!self.filter.call(who, who, props)) {
            if (!self._disowned) {
              self.abort();
              self.emit("end");
              self.emit("close");
            }
            return;
          }
        }
        var events = ["_stat", "stat", "ready"];
        var e = 0;
        (function go() {
          if (self._aborted) {
            self.emit("end");
            self.emit("close");
            return;
          }
          if (self._paused && self.type !== "Directory") {
            self.once("resume", go);
            return;
          }
          var ev = events[e++];
          if (!ev) {
            return self._read();
          }
          self.emit(ev, props);
          go();
        })();
      }
    };
    Reader.prototype.pipe = function(dest) {
      var self = this;
      if (typeof dest.add === "function") {
        self.on("entry", function(entry) {
          var ret = dest.add(entry);
          if (ret === false) {
            self.pause();
          }
        });
      }
      return Stream.prototype.pipe.apply(this, arguments);
    };
    Reader.prototype.pause = function(who) {
      this._paused = true;
      who = who || this;
      this.emit("pause", who);
      if (this._stream)
        this._stream.pause(who);
    };
    Reader.prototype.resume = function(who) {
      this._paused = false;
      who = who || this;
      this.emit("resume", who);
      if (this._stream)
        this._stream.resume(who);
      this._read();
    };
    Reader.prototype._read = function() {
      this.error("Cannot read unknown type: " + this.type);
    };
  }
});

// node_modules/mkdirp/index.js
var require_mkdirp = __commonJS({
  "node_modules/mkdirp/index.js"(exports, module2) {
    var path2 = require("path");
    var fs2 = require("fs");
    var _0777 = parseInt("0777", 8);
    module2.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
    function mkdirP(p, opts, f, made) {
      if (typeof opts === "function") {
        f = opts;
        opts = {};
      } else if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      var mode = opts.mode;
      var xfs = opts.fs || fs2;
      if (mode === void 0) {
        mode = _0777;
      }
      if (!made)
        made = null;
      var cb = f || function() {
      };
      p = path2.resolve(p);
      xfs.mkdir(p, mode, function(er) {
        if (!er) {
          made = made || p;
          return cb(null, made);
        }
        switch (er.code) {
          case "ENOENT":
            if (path2.dirname(p) === p)
              return cb(er);
            mkdirP(path2.dirname(p), opts, function(er2, made2) {
              if (er2)
                cb(er2, made2);
              else
                mkdirP(p, opts, cb, made2);
            });
            break;
          default:
            xfs.stat(p, function(er2, stat) {
              if (er2 || !stat.isDirectory())
                cb(er, made);
              else
                cb(null, made);
            });
            break;
        }
      });
    }
    mkdirP.sync = function sync(p, opts, made) {
      if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      var mode = opts.mode;
      var xfs = opts.fs || fs2;
      if (mode === void 0) {
        mode = _0777;
      }
      if (!made)
        made = null;
      p = path2.resolve(p);
      try {
        xfs.mkdirSync(p, mode);
        made = made || p;
      } catch (err0) {
        switch (err0.code) {
          case "ENOENT":
            made = sync(path2.dirname(p), opts, made);
            sync(p, opts, made);
            break;
          default:
            var stat;
            try {
              stat = xfs.statSync(p);
            } catch (err1) {
              throw err0;
            }
            if (!stat.isDirectory())
              throw err0;
            break;
        }
      }
      return made;
    };
  }
});

// node_modules/fstream/lib/collect.js
var require_collect = __commonJS({
  "node_modules/fstream/lib/collect.js"(exports, module2) {
    module2.exports = collect;
    function collect(stream) {
      if (stream._collected)
        return;
      if (stream._paused)
        return stream.on("resume", collect.bind(null, stream));
      stream._collected = true;
      stream.pause();
      stream.on("data", save);
      stream.on("end", save);
      var buf = [];
      function save(b) {
        if (typeof b === "string")
          b = new Buffer(b);
        if (Buffer.isBuffer(b) && !b.length)
          return;
        buf.push(b);
      }
      stream.on("entry", saveEntry);
      var entryBuffer = [];
      function saveEntry(e) {
        collect(e);
        entryBuffer.push(e);
      }
      stream.on("proxy", proxyPause);
      function proxyPause(p) {
        p.pause();
      }
      stream.pipe = function(orig) {
        return function(dest) {
          var e = 0;
          (function unblockEntry() {
            var entry = entryBuffer[e++];
            if (!entry)
              return resume();
            entry.on("end", unblockEntry);
            if (dest)
              dest.add(entry);
            else
              stream.emit("entry", entry);
          })();
          function resume() {
            stream.removeListener("entry", saveEntry);
            stream.removeListener("data", save);
            stream.removeListener("end", save);
            stream.pipe = orig;
            if (dest)
              stream.pipe(dest);
            buf.forEach(function(b) {
              if (b)
                stream.emit("data", b);
              else
                stream.emit("end");
            });
            stream.resume();
          }
          return dest;
        };
      }(stream.pipe);
    }
  }
});

// node_modules/fstream/lib/dir-writer.js
var require_dir_writer = __commonJS({
  "node_modules/fstream/lib/dir-writer.js"(exports, module2) {
    module2.exports = DirWriter;
    var Writer = require_writer();
    var inherits = require_inherits();
    var mkdir = require_mkdirp();
    var path2 = require("path");
    var collect = require_collect();
    inherits(DirWriter, Writer);
    function DirWriter(props) {
      var self = this;
      if (!(self instanceof DirWriter)) {
        self.error("DirWriter must be called as constructor.", null, true);
      }
      if (props.type !== "Directory" || !props.Directory) {
        self.error("Non-directory type " + props.type + " " + JSON.stringify(props), null, true);
      }
      Writer.call(this, props);
    }
    DirWriter.prototype._create = function() {
      var self = this;
      mkdir(self._path, Writer.dirmode, function(er) {
        if (er)
          return self.error(er);
        self.ready = true;
        self.emit("ready");
        self._process();
      });
    };
    DirWriter.prototype.write = function() {
      return true;
    };
    DirWriter.prototype.end = function() {
      this._ended = true;
      this._process();
    };
    DirWriter.prototype.add = function(entry) {
      var self = this;
      collect(entry);
      if (!self.ready || self._currentEntry) {
        self._buffer.push(entry);
        return false;
      }
      if (self._ended) {
        return self.error("add after end");
      }
      self._buffer.push(entry);
      self._process();
      return this._buffer.length === 0;
    };
    DirWriter.prototype._process = function() {
      var self = this;
      if (self._processing)
        return;
      var entry = self._buffer.shift();
      if (!entry) {
        self.emit("drain");
        if (self._ended)
          self._finish();
        return;
      }
      self._processing = true;
      self.emit("entry", entry);
      var p = entry;
      var pp;
      do {
        pp = p._path || p.path;
        if (pp === self.root._path || pp === self._path || pp && pp.indexOf(self._path) === 0) {
          self._processing = false;
          if (entry._collected)
            entry.pipe();
          return self._process();
        }
        p = p.parent;
      } while (p);
      var props = {
        parent: self,
        root: self.root || self,
        type: entry.type,
        depth: self.depth + 1
      };
      pp = entry._path || entry.path || entry.props.path;
      if (entry.parent) {
        pp = pp.substr(entry.parent._path.length + 1);
      }
      props.path = path2.join(self.path, path2.join("/", pp));
      props.filter = self.filter;
      Object.keys(entry.props).forEach(function(k) {
        if (!props.hasOwnProperty(k)) {
          props[k] = entry.props[k];
        }
      });
      var child = self._currentChild = new Writer(props);
      child.on("ready", function() {
        entry.pipe(child);
        entry.resume();
      });
      child.on("error", function(er) {
        if (child._swallowErrors) {
          self.warn(er);
          child.emit("end");
          child.emit("close");
        } else {
          self.emit("error", er);
        }
      });
      child.on("close", onend);
      var ended = false;
      function onend() {
        if (ended)
          return;
        ended = true;
        self._currentChild = null;
        self._processing = false;
        self._process();
      }
    };
  }
});

// node_modules/fstream/lib/link-writer.js
var require_link_writer = __commonJS({
  "node_modules/fstream/lib/link-writer.js"(exports, module2) {
    module2.exports = LinkWriter;
    var fs2 = require_graceful_fs();
    var Writer = require_writer();
    var inherits = require_inherits();
    var path2 = require("path");
    var rimraf = require_rimraf();
    inherits(LinkWriter, Writer);
    function LinkWriter(props) {
      var self = this;
      if (!(self instanceof LinkWriter)) {
        throw new Error("LinkWriter must be called as constructor.");
      }
      if (!(props.type === "Link" && props.Link || props.type === "SymbolicLink" && props.SymbolicLink)) {
        throw new Error("Non-link type " + props.type);
      }
      if (props.linkpath === "")
        props.linkpath = ".";
      if (!props.linkpath) {
        self.error("Need linkpath property to create " + props.type);
      }
      Writer.call(this, props);
    }
    LinkWriter.prototype._create = function() {
      var self = this;
      var hard = self.type === "Link" || process.platform === "win32";
      var link2 = hard ? "link" : "symlink";
      var lp = hard ? path2.resolve(self.dirname, self.linkpath) : self.linkpath;
      if (hard)
        return clobber(self, lp, link2);
      fs2.readlink(self._path, function(er, p) {
        if (p && p === lp)
          return finish(self);
        clobber(self, lp, link2);
      });
    };
    function clobber(self, lp, link2) {
      rimraf(self._path, function(er) {
        if (er)
          return self.error(er);
        create(self, lp, link2);
      });
    }
    function create(self, lp, link2) {
      fs2[link2](lp, self._path, function(er) {
        if (er) {
          if ((er.code === "ENOENT" || er.code === "EACCES" || er.code === "EPERM") && process.platform === "win32") {
            self.ready = true;
            self.emit("ready");
            self.emit("end");
            self.emit("close");
            self.end = self._finish = function() {
            };
          } else
            return self.error(er);
        }
        finish(self);
      });
    }
    function finish(self) {
      self.ready = true;
      self.emit("ready");
      if (self._ended && !self._finished)
        self._finish();
    }
    LinkWriter.prototype.end = function() {
      this._ended = true;
      if (this.ready) {
        this._finished = true;
        this._finish();
      }
    };
  }
});

// node_modules/fstream/lib/file-writer.js
var require_file_writer = __commonJS({
  "node_modules/fstream/lib/file-writer.js"(exports, module2) {
    module2.exports = FileWriter;
    var fs2 = require_graceful_fs();
    var Writer = require_writer();
    var inherits = require_inherits();
    var EOF = {};
    inherits(FileWriter, Writer);
    function FileWriter(props) {
      var self = this;
      if (!(self instanceof FileWriter)) {
        throw new Error("FileWriter must be called as constructor.");
      }
      if (props.type !== "File" || !props.File) {
        throw new Error("Non-file type " + props.type);
      }
      self._buffer = [];
      self._bytesWritten = 0;
      Writer.call(this, props);
    }
    FileWriter.prototype._create = function() {
      var self = this;
      if (self._stream)
        return;
      var so = {};
      if (self.props.flags)
        so.flags = self.props.flags;
      so.mode = Writer.filemode;
      if (self._old && self._old.blksize)
        so.bufferSize = self._old.blksize;
      self._stream = fs2.createWriteStream(self._path, so);
      self._stream.on("open", function() {
        self.ready = true;
        self._buffer.forEach(function(c2) {
          if (c2 === EOF)
            self._stream.end();
          else
            self._stream.write(c2);
        });
        self.emit("ready");
        self.emit("drain");
      });
      self._stream.on("error", function(er) {
        self.emit("error", er);
      });
      self._stream.on("drain", function() {
        self.emit("drain");
      });
      self._stream.on("close", function() {
        self._finish();
      });
    };
    FileWriter.prototype.write = function(c2) {
      var self = this;
      self._bytesWritten += c2.length;
      if (!self.ready) {
        if (!Buffer.isBuffer(c2) && typeof c2 !== "string") {
          throw new Error("invalid write data");
        }
        self._buffer.push(c2);
        return false;
      }
      var ret = self._stream.write(c2);
      if (ret === false && self._stream._queue) {
        return self._stream._queue.length <= 2;
      } else {
        return ret;
      }
    };
    FileWriter.prototype.end = function(c2) {
      var self = this;
      if (c2)
        self.write(c2);
      if (!self.ready) {
        self._buffer.push(EOF);
        return false;
      }
      return self._stream.end();
    };
    FileWriter.prototype._finish = function() {
      var self = this;
      if (typeof self.size === "number" && self._bytesWritten !== self.size) {
        self.error("Did not get expected byte count.\nexpect: " + self.size + "\nactual: " + self._bytesWritten);
      }
      Writer.prototype._finish.call(self);
    };
  }
});

// node_modules/fstream/lib/proxy-writer.js
var require_proxy_writer = __commonJS({
  "node_modules/fstream/lib/proxy-writer.js"(exports, module2) {
    module2.exports = ProxyWriter;
    var Writer = require_writer();
    var getType = require_get_type();
    var inherits = require_inherits();
    var collect = require_collect();
    var fs2 = require("fs");
    inherits(ProxyWriter, Writer);
    function ProxyWriter(props) {
      var self = this;
      if (!(self instanceof ProxyWriter)) {
        throw new Error("ProxyWriter must be called as constructor.");
      }
      self.props = props;
      self._needDrain = false;
      Writer.call(self, props);
    }
    ProxyWriter.prototype._stat = function() {
      var self = this;
      var props = self.props;
      var stat = props.follow ? "stat" : "lstat";
      fs2[stat](props.path, function(er, current) {
        var type;
        if (er || !current) {
          type = "File";
        } else {
          type = getType(current);
        }
        props[type] = true;
        props.type = self.type = type;
        self._old = current;
        self._addProxy(Writer(props, current));
      });
    };
    ProxyWriter.prototype._addProxy = function(proxy) {
      var self = this;
      if (self._proxy) {
        return self.error("proxy already set");
      }
      self._proxy = proxy;
      [
        "ready",
        "error",
        "close",
        "pipe",
        "drain",
        "warn"
      ].forEach(function(ev) {
        proxy.on(ev, self.emit.bind(self, ev));
      });
      self.emit("proxy", proxy);
      var calls = self._buffer;
      calls.forEach(function(c2) {
        proxy[c2[0]].apply(proxy, c2[1]);
      });
      self._buffer.length = 0;
      if (self._needsDrain)
        self.emit("drain");
    };
    ProxyWriter.prototype.add = function(entry) {
      collect(entry);
      if (!this._proxy) {
        this._buffer.push(["add", [entry]]);
        this._needDrain = true;
        return false;
      }
      return this._proxy.add(entry);
    };
    ProxyWriter.prototype.write = function(c2) {
      if (!this._proxy) {
        this._buffer.push(["write", [c2]]);
        this._needDrain = true;
        return false;
      }
      return this._proxy.write(c2);
    };
    ProxyWriter.prototype.end = function(c2) {
      if (!this._proxy) {
        this._buffer.push(["end", [c2]]);
        return false;
      }
      return this._proxy.end(c2);
    };
  }
});

// node_modules/fstream/lib/writer.js
var require_writer = __commonJS({
  "node_modules/fstream/lib/writer.js"(exports, module2) {
    module2.exports = Writer;
    var fs2 = require_graceful_fs();
    var inherits = require_inherits();
    var rimraf = require_rimraf();
    var mkdir = require_mkdirp();
    var path2 = require("path");
    var umask = process.platform === "win32" ? 0 : process.umask();
    var getType = require_get_type();
    var Abstract = require_abstract();
    inherits(Writer, Abstract);
    Writer.dirmode = parseInt("0777", 8) & ~umask;
    Writer.filemode = parseInt("0666", 8) & ~umask;
    var DirWriter = require_dir_writer();
    var LinkWriter = require_link_writer();
    var FileWriter = require_file_writer();
    var ProxyWriter = require_proxy_writer();
    function Writer(props, current) {
      var self = this;
      if (typeof props === "string") {
        props = { path: props };
      }
      var type = getType(props);
      var ClassType = Writer;
      switch (type) {
        case "Directory":
          ClassType = DirWriter;
          break;
        case "File":
          ClassType = FileWriter;
          break;
        case "Link":
        case "SymbolicLink":
          ClassType = LinkWriter;
          break;
        case null:
        default:
          ClassType = ProxyWriter;
          break;
      }
      if (!(self instanceof ClassType))
        return new ClassType(props);
      Abstract.call(self);
      if (!props.path)
        self.error("Must provide a path", null, true);
      self.type = props.type;
      self.props = props;
      self.depth = props.depth || 0;
      self.clobber = props.clobber === false ? props.clobber : true;
      self.parent = props.parent || null;
      self.root = props.root || props.parent && props.parent.root || self;
      self._path = self.path = path2.resolve(props.path);
      if (process.platform === "win32") {
        self.path = self._path = self.path.replace(/\?/g, "_");
        if (self._path.length >= 260) {
          self._swallowErrors = true;
          self._path = "\\\\?\\" + self.path.replace(/\//g, "\\");
        }
      }
      self.basename = path2.basename(props.path);
      self.dirname = path2.dirname(props.path);
      self.linkpath = props.linkpath || null;
      props.parent = props.root = null;
      self.size = props.size;
      if (typeof props.mode === "string") {
        props.mode = parseInt(props.mode, 8);
      }
      self.readable = false;
      self.writable = true;
      self._buffer = [];
      self.ready = false;
      self.filter = typeof props.filter === "function" ? props.filter : null;
      self._stat(current);
    }
    Writer.prototype._create = function() {
      var self = this;
      fs2[self.props.follow ? "stat" : "lstat"](self._path, function(er) {
        if (er) {
          return self.warn("Cannot create " + self._path + "\nUnsupported type: " + self.type, "ENOTSUP");
        }
        self._finish();
      });
    };
    Writer.prototype._stat = function(current) {
      var self = this;
      var props = self.props;
      var stat = props.follow ? "stat" : "lstat";
      var who = self._proxy || self;
      if (current)
        statCb(null, current);
      else
        fs2[stat](self._path, statCb);
      function statCb(er, current2) {
        if (self.filter && !self.filter.call(who, who, current2)) {
          self._aborted = true;
          self.emit("end");
          self.emit("close");
          return;
        }
        if (er || !current2) {
          return create(self);
        }
        self._old = current2;
        var currentType = getType(current2);
        if (currentType !== self.type || self.type === "File" && current2.nlink > 1) {
          return rimraf(self._path, function(er2) {
            if (er2)
              return self.error(er2);
            self._old = null;
            create(self);
          });
        }
        create(self);
      }
    };
    function create(self) {
      mkdir(path2.dirname(self._path), Writer.dirmode, function(er, made) {
        if (er)
          return self.error(er);
        self._madeDir = made;
        return self._create();
      });
    }
    function endChmod(self, want, current, path3, cb) {
      var wantMode = want.mode;
      var chmod = want.follow || self.type !== "SymbolicLink" ? "chmod" : "lchmod";
      if (!fs2[chmod])
        return cb();
      if (typeof wantMode !== "number")
        return cb();
      var curMode = current.mode & parseInt("0777", 8);
      wantMode = wantMode & parseInt("0777", 8);
      if (wantMode === curMode)
        return cb();
      fs2[chmod](path3, wantMode, cb);
    }
    function endChown(self, want, current, path3, cb) {
      if (process.platform === "win32")
        return cb();
      if (!process.getuid || process.getuid() !== 0)
        return cb();
      if (typeof want.uid !== "number" && typeof want.gid !== "number")
        return cb();
      if (current.uid === want.uid && current.gid === want.gid)
        return cb();
      var chown = self.props.follow || self.type !== "SymbolicLink" ? "chown" : "lchown";
      if (!fs2[chown])
        return cb();
      if (typeof want.uid !== "number")
        want.uid = current.uid;
      if (typeof want.gid !== "number")
        want.gid = current.gid;
      fs2[chown](path3, want.uid, want.gid, cb);
    }
    function endUtimes(self, want, current, path3, cb) {
      if (!fs2.utimes || process.platform === "win32")
        return cb();
      var utimes = want.follow || self.type !== "SymbolicLink" ? "utimes" : "lutimes";
      if (utimes === "lutimes" && !fs2[utimes]) {
        utimes = "utimes";
      }
      if (!fs2[utimes])
        return cb();
      var curA = current.atime;
      var curM = current.mtime;
      var meA = want.atime;
      var meM = want.mtime;
      if (meA === void 0)
        meA = curA;
      if (meM === void 0)
        meM = curM;
      if (!isDate(meA))
        meA = new Date(meA);
      if (!isDate(meM))
        meA = new Date(meM);
      if (meA.getTime() === curA.getTime() && meM.getTime() === curM.getTime())
        return cb();
      fs2[utimes](path3, meA, meM, cb);
    }
    Writer.prototype._finish = function() {
      var self = this;
      if (self._finishing)
        return;
      self._finishing = true;
      var todo = 0;
      var errState = null;
      var done = false;
      if (self._old) {
        self._old.atime = new Date(0);
        self._old.mtime = new Date(0);
        setProps(self._old);
      } else {
        var stat = self.props.follow ? "stat" : "lstat";
        fs2[stat](self._path, function(er, current) {
          if (er) {
            if (er.code === "ENOENT" && (self.type === "Link" || self.type === "SymbolicLink") && process.platform === "win32") {
              self.ready = true;
              self.emit("ready");
              self.emit("end");
              self.emit("close");
              self.end = self._finish = function() {
              };
              return;
            } else
              return self.error(er);
          }
          setProps(self._old = current);
        });
      }
      return;
      function setProps(current) {
        todo += 3;
        endChmod(self, self.props, current, self._path, next("chmod"));
        endChown(self, self.props, current, self._path, next("chown"));
        endUtimes(self, self.props, current, self._path, next("utimes"));
      }
      function next(what) {
        return function(er) {
          if (errState)
            return;
          if (er) {
            er.fstream_finish_call = what;
            return self.error(errState = er);
          }
          if (--todo > 0)
            return;
          if (done)
            return;
          done = true;
          if (!self._madeDir)
            return end();
          else
            endMadeDir(self, self._path, end);
          function end(er2) {
            if (er2) {
              er2.fstream_finish_call = "setupMadeDir";
              return self.error(er2);
            }
            self.emit("end");
            self.emit("close");
          }
        };
      }
    };
    function endMadeDir(self, p, cb) {
      var made = self._madeDir;
      var d = path2.dirname(p);
      endMadeDir_(self, d, function(er) {
        if (er)
          return cb(er);
        if (d === made) {
          return cb();
        }
        endMadeDir(self, d, cb);
      });
    }
    function endMadeDir_(self, p, cb) {
      var dirProps = {};
      Object.keys(self.props).forEach(function(k) {
        dirProps[k] = self.props[k];
        if (k === "mode" && self.type !== "Directory") {
          dirProps[k] = dirProps[k] | parseInt("0111", 8);
        }
      });
      var todo = 3;
      var errState = null;
      fs2.stat(p, function(er, current) {
        if (er)
          return cb(errState = er);
        endChmod(self, dirProps, current, p, next);
        endChown(self, dirProps, current, p, next);
        endUtimes(self, dirProps, current, p, next);
      });
      function next(er) {
        if (errState)
          return;
        if (er)
          return cb(errState = er);
        if (--todo === 0)
          return cb();
      }
    }
    Writer.prototype.pipe = function() {
      this.error("Can't pipe from writable stream");
    };
    Writer.prototype.add = function() {
      this.error("Can't add to non-Directory type");
    };
    Writer.prototype.write = function() {
      return true;
    };
    function objectToString(d) {
      return Object.prototype.toString.call(d);
    }
    function isDate(d) {
      return typeof d === "object" && objectToString(d) === "[object Date]";
    }
  }
});

// node_modules/fstream/fstream.js
var require_fstream = __commonJS({
  "node_modules/fstream/fstream.js"(exports) {
    exports.Abstract = require_abstract();
    exports.Reader = require_reader();
    exports.Writer = require_writer();
    exports.File = {
      Reader: require_file_reader(),
      Writer: require_file_writer()
    };
    exports.Dir = {
      Reader: require_dir_reader(),
      Writer: require_dir_writer()
    };
    exports.Link = {
      Reader: require_link_reader(),
      Writer: require_link_writer()
    };
    exports.Proxy = {
      Reader: require_proxy_reader(),
      Writer: require_proxy_writer()
    };
    exports.Reader.Dir = exports.DirReader = exports.Dir.Reader;
    exports.Reader.File = exports.FileReader = exports.File.Reader;
    exports.Reader.Link = exports.LinkReader = exports.Link.Reader;
    exports.Reader.Proxy = exports.ProxyReader = exports.Proxy.Reader;
    exports.Writer.Dir = exports.DirWriter = exports.Dir.Writer;
    exports.Writer.File = exports.FileWriter = exports.File.Writer;
    exports.Writer.Link = exports.LinkWriter = exports.Link.Writer;
    exports.Writer.Proxy = exports.ProxyWriter = exports.Proxy.Writer;
    exports.collect = require_collect();
  }
});

// node_modules/app-bundle-info/lib/AppBundleInfo.js
var require_AppBundleInfo = __commonJS({
  "node_modules/app-bundle-info/lib/AppBundleInfo.js"(exports, module2) {
    (function() {
      var AndroidAppBundleInfo, Lock, fs2, fstream, glob2, path2, stream, tmp, yauzl;
      yauzl = require_yauzl();
      fs2 = require_lib();
      stream = require("stream");
      tmp = require_tmp();
      glob2 = require_glob2();
      Lock = require_lock();
      fstream = require_fstream();
      path2 = require("path");
      AndroidAppBundleInfo = function() {
        function AndroidAppBundleInfo2(pathOrStream) {
          this.pathOrStream = pathOrStream;
          this.extracted = false;
          this.lock = new Lock();
          this.type = "general";
          this.tmpPath = null;
        }
        AndroidAppBundleInfo2.prototype.clearContents = function(callback) {
          callback = callback || function() {
          };
          if (this.extracted) {
            return fs2.remove(this.extractPath, function(_this) {
              return function(err) {
                if (err) {
                  return callback(err);
                }
                _this.extracted = false;
                return callback();
              };
            }(this));
          } else {
            return callback();
          }
        };
        AndroidAppBundleInfo2.prototype._extractContents = function(_callback) {
          var callback;
          if (this.extracted) {
            return _callback();
          }
          callback = function(_this) {
            return function(err) {
              if (!_this.tmpPath) {
                return _callback(err);
              }
              return fs2.remove(_this.tmpPath, function() {
                return _callback(err);
              });
            };
          }(this);
          return this.lock("extract", function(_this) {
            return function(release) {
              callback = release(callback);
              return _this._getFilePath(function(err, zippath) {
                if (err) {
                  return callback(err);
                }
                return tmp.dir(function(err2, extractPath) {
                  if (err2) {
                    return callback(err2);
                  }
                  _this.extractPath = extractPath;
                  return yauzl.open(zippath, function(err3, zipfile) {
                    if (err3) {
                      return callback(err3);
                    }
                    zipfile.on("error", callback);
                    zipfile.on("entry", function(entry) {
                      if (/\/$/.test(entry.fileName)) {
                        return;
                      }
                      return zipfile.openReadStream(entry, function(err4, readStream) {
                        var filePath;
                        filePath = path2.join(extractPath, entry.fileName);
                        return fs2.ensureDir(path2.dirname(filePath), function(err5) {
                          if (err5) {
                            return callback(err5);
                          }
                          return readStream.pipe(fs2.createWriteStream(filePath));
                        });
                      });
                    });
                    return zipfile.on("close", function() {
                      _this.extracted = true;
                      return callback();
                    });
                  });
                });
              });
            };
          }(this));
        };
        AndroidAppBundleInfo2.prototype._getFilePath = function(callback) {
          if (this.pathOrStream instanceof stream.Readable) {
            return tmp.file(function(_this) {
              return function(err, file) {
                if (err) {
                  return callback(err);
                }
                _this.tmpPath = file;
                return _this.pathOrStream.pipe(fs2.createWriteStream(file)).on("close", function() {
                  return callback(null, file);
                }).on("error", callback);
              };
            }(this));
          } else {
            return callback(null, this.pathOrStream);
          }
        };
        AndroidAppBundleInfo2.prototype.findFileStream = function(matchFile, callback) {
          return this._extractContents(function(_this) {
            return function(err) {
              var searchPattern;
              if (err) {
                return callback(err);
              }
              searchPattern = _this.extractPath + "/" + matchFile;
              return glob2(searchPattern, function(err2, files) {
                if (err2) {
                  return callback(err2);
                }
                if (files.length === 0) {
                  return callback(new Error("no file found for '" + matchFile + "'"));
                }
                return callback(null, fs2.createReadStream(files[0]));
              });
            };
          }(this));
        };
        AndroidAppBundleInfo2.prototype.loadInfo = function(callback) {
          return callback(new Error("not implemented"));
        };
        AndroidAppBundleInfo2.prototype.getIdentifier = function() {
          return null;
        };
        AndroidAppBundleInfo2.prototype.getName = function() {
          return null;
        };
        AndroidAppBundleInfo2.prototype.getVersionName = function() {
          return null;
        };
        AndroidAppBundleInfo2.prototype.getVersionCode = function() {
          return null;
        };
        return AndroidAppBundleInfo2;
      }();
      module2.exports = AndroidAppBundleInfo;
    }).call(exports);
  }
});

// node_modules/stream-to/index.js
var require_stream_to = __commonJS({
  "node_modules/stream-to/index.js"(exports) {
    exports.array = toArray;
    exports.buffer = toBuffer;
    function toArray(stream, callback) {
      var arr = [];
      stream.on("data", onData);
      stream.once("end", onEnd);
      stream.once("error", callback);
      stream.once("error", cleanup);
      stream.once("close", cleanup);
      function onData(doc) {
        arr.push(doc);
      }
      function onEnd() {
        callback(null, arr);
        cleanup();
      }
      function cleanup() {
        arr = null;
        stream.removeListener("data", onData);
        stream.removeListener("end", onEnd);
        stream.removeListener("error", callback);
        stream.removeListener("error", cleanup);
        stream.removeListener("close", cleanup);
      }
      return stream;
    }
    function toBuffer(stream, callback) {
      toArray(stream, function(err, arr) {
        if (err || !arr)
          callback(err);
        else
          callback(null, Buffer.concat(arr));
      });
      return stream;
    }
  }
});

// node_modules/stream-to-buffer/index.js
var require_stream_to_buffer = __commonJS({
  "node_modules/stream-to-buffer/index.js"(exports, module2) {
    module2.exports = require_stream_to().buffer;
  }
});

// node_modules/util-deprecate/node.js
var require_node = __commonJS({
  "node_modules/util-deprecate/node.js"(exports, module2) {
    module2.exports = require("util").deprecate;
  }
});

// node_modules/xmldom/sax.js
var require_sax = __commonJS({
  "node_modules/xmldom/sax.js"(exports) {
    var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
    var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = {});
        parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
        domBuilder.endDocument();
      }
    };
    function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var k = a2.slice(1, -1);
        if (k in entityMap) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = m.index;
          lineEnd = lineStart + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /.*(?:\r\n?|\n)|.*$/g;
      var locator = domBuilder.locator;
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var closeMap = {};
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!source.substr(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substr(start));
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            appendText(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 3);
              var tagName = source.substring(tagStart + 2, end);
              var config = parseStack.pop();
              if (end < 0) {
                tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
                end = tagStart + 1 + tagName.length;
              } else if (tagName.match(/\s</)) {
                tagName = tagName.replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " maybe not complete");
                end = tagStart + 1 + tagName.length;
              }
              var localNSMap = config.localNSMap;
              var endMatch = config.tagName == tagName;
              var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
              if (endIgnoreCaseMach) {
                domBuilder.endElement(config.uri, config.localName, tagName);
                if (localNSMap) {
                  for (var prefix in localNSMap) {
                    domBuilder.endPrefixMapping(prefix);
                  }
                }
                if (!endMatch) {
                  errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
                }
              } else {
                parseStack.push(config);
              }
              end++;
              break;
            case "?":
              locator && position(tagStart);
              end = parseInstruction(source, tagStart, domBuilder);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDCC(source, tagStart, domBuilder, errorHandler);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
              var len = el.length;
              if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                el.closed = true;
                if (!entityMap.nbsp) {
                  errorHandler.warning("unclosed xml attribute");
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (el.uri === "http://www.w3.org/1999/xhtml" && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c2 = source.charAt(p);
        switch (c2) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c2, start);
              if (p > 0) {
                value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
                el.add(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c2 + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
              el.add(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c2 + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
              case S_ATTR_SPACE:
                break;
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
                } else {
                  if (currentNSMap[""] !== "http://www.w3.org/1999/xhtml" || !value.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  el.add(value, value, start);
                }
                break;
              case S_EQ:
                throw new Error("attribute value missed!!");
            }
            return p;
          case "\x80":
            c2 = " ";
          default:
            if (c2 <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  el.add(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                case S_ATTR_SPACE:
                  var tagName = el.tagName;
                  if (currentNSMap[""] !== "http://www.w3.org/1999/xhtml" || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  el.add(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = {};
            _copy(currentNSMap, currentNSMap = {});
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = "http://www.w3.org/2000/xmlns/";
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        var prefix = a.prefix;
        if (prefix) {
          if (prefix === "xml") {
            a.uri = "http://www.w3.org/XML/1998/namespace";
          }
          if (prefix !== "xmlns") {
            a.uri = currentNSMap[prefix || ""];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            domBuilder.endPrefixMapping(prefix);
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      if (/^(?:script|textarea)$/i.test(tagName)) {
        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (/[&<]/.test(text)) {
          if (/^script$/i.test(tagName)) {
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
          text = text.replace(/&#?\w+;/g, entityReplacer);
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
      }
      return elStartEnd + 1;
    }
    function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
      var pos = closeMap[tagName];
      if (pos == null) {
        pos = source.lastIndexOf("</" + tagName + ">");
        if (pos < elStartEnd) {
          pos = source.lastIndexOf("</" + tagName);
        }
        closeMap[tagName] = pos;
      }
      return pos < elStartEnd;
    }
    function _copy(source, target) {
      for (var n in source) {
        target[n] = source[n];
      }
    }
    function parseDCC(source, start, domBuilder, errorHandler) {
      var next = source.charAt(start + 2);
      switch (next) {
        case "-":
          if (source.charAt(start + 3) === "-") {
            var end = source.indexOf("-->", start + 4);
            if (end > start) {
              domBuilder.comment(source, start + 4, end - start - 4);
              return end + 3;
            } else {
              errorHandler.error("Unclosed comment");
              return -1;
            }
          } else {
            return -1;
          }
        default:
          if (source.substr(start + 3, 6) == "CDATA[") {
            var end = source.indexOf("]]>", start + 9);
            domBuilder.startCDATA();
            domBuilder.characters(source, start + 9, end - start - 9);
            domBuilder.endCDATA();
            return end + 3;
          }
          var matchs = split(source, start);
          var len = matchs.length;
          if (len > 1 && /!doctype/i.test(matchs[0][0])) {
            var name = matchs[1][0];
            var pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
            var sysid = len > 4 && matchs[4][0];
            var lastMatch = matchs[len - 1];
            domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, "$2"), sysid && sysid.replace(/^(['"])(.*?)\1$/, "$2"));
            domBuilder.endDTD();
            return lastMatch.index + lastMatch[0].length;
          }
      }
      return -1;
    }
    function parseInstruction(source, start, domBuilder) {
      var end = source.indexOf("?>", start);
      if (end) {
        var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        if (match) {
          var len = match[0].length;
          domBuilder.processingInstruction(match[1], match[2]);
          return end + 2;
        } else {
          return -1;
        }
      }
      return -1;
    }
    function ElementAttributes(source) {
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!tagNamePattern.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      add: function(qName, value, offset) {
        if (!tagNamePattern.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
    };
    function _set_proto_(thiz, parent) {
      thiz.__proto__ = parent;
      return thiz;
    }
    if (!(_set_proto_({}, _set_proto_.prototype) instanceof _set_proto_)) {
      _set_proto_ = function(thiz, parent) {
        function p() {
        }
        ;
        p.prototype = parent;
        p = new p();
        for (parent in thiz) {
          p[parent] = thiz[parent];
        }
        return p;
      };
    }
    function split(source, start) {
      var match;
      var buf = [];
      var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
      reg.lastIndex = start;
      reg.exec(source);
      while (match = reg.exec(source)) {
        buf.push(match);
        if (match[1])
          return buf;
      }
    }
    exports.XMLReader = XMLReader;
  }
});

// node_modules/xmldom/dom.js
var require_dom = __commonJS({
  "node_modules/xmldom/dom.js"(exports) {
    function copy(src, dest) {
      for (var p in src) {
        dest[p] = src[p];
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (Object.create) {
        var ppt = Object.create(Super.prototype);
        pt.__proto__ = ppt;
      }
      if (!(pt instanceof Super)) {
        let t2 = function() {
        };
        var t = t2;
        ;
        t2.prototype = Super.prototype;
        t2 = new t2();
        copy(pt, t2);
        Class.prototype = pt = t2;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknow Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var htmlns = "http://www.w3.org/1999/xhtml";
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var ExceptionCode = {};
    var ExceptionMessage = {};
    var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
    var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
    var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
    var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
    var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
    var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
    var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
    var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
    var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
    var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
    var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
    var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
    var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
    var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
    var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
    function DOMException(code, message) {
      if (message instanceof Error) {
        var error = message;
      } else {
        error = this;
        Error.call(this, ExceptionMessage[code]);
        this.message = ExceptionMessage[code];
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, DOMException);
      }
      error.code = code;
      if (message)
        this.message = this.message + ": " + message;
      return error;
    }
    DOMException.prototype = Error.prototype;
    copy(ExceptionCode, DOMException);
    function NodeList() {
    }
    NodeList.prototype = {
      length: 0,
      item: function(index) {
        return this[index] || null;
      },
      toString: function(isHTML, nodeFilter) {
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, isHTML, nodeFilter);
        }
        return buf.join("");
      }
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc != inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i];
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = list.length;
      while (i--) {
        if (list[i] === node) {
          return i;
        }
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length++] = newAttr;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i < lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
            attr.ownerElement = null;
          }
        }
      } else {
        throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      getNamedItem: function(key) {
        var i = this.length;
        while (i--) {
          var attr = this[i];
          if (attr.nodeName == key) {
            return attr;
          }
        }
      },
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItem(attr.nodeName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      setNamedItemNS: function(attr) {
        var el = attr.ownerElement, oldAttr;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      removeNamedItem: function(key) {
        var attr = this.getNamedItem(key);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      getNamedItemNS: function(namespaceURI, localName) {
        var i = this.length;
        while (i--) {
          var node = this[i];
          if (node.localName == localName && node.namespaceURI == namespaceURI) {
            return node;
          }
        }
        return null;
      }
    };
    function DOMImplementation(features) {
      this._features = {};
      if (features) {
        for (var feature in features) {
          this._features = features[feature];
        }
      }
    }
    DOMImplementation.prototype = {
      hasFeature: function(feature, version) {
        var versions = this._features[feature.toLowerCase()];
        if (versions && (!version || version in versions)) {
          return true;
        } else {
          return false;
        }
      },
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var doc = new Document();
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      createDocumentType: function(qualifiedName, publicId, systemId) {
        var node = new DocumentType();
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId;
        node.systemId = systemId;
        return node;
      }
    };
    function Node() {
    }
    Node.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      replaceChild: function(newChild, oldChild) {
        this.insertBefore(newChild, oldChild);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      normalize: function() {
        var child = this.firstChild;
        while (child) {
          var next = child.nextSibling;
          if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
            this.removeChild(next);
            child.appendData(next.data);
          } else {
            child.normalize();
            child = next;
          }
        }
      },
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      hasAttributes: function() {
        return this.attributes.length > 0;
      },
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (map[n] == namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (prefix in map) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      }
    };
    function _xmlEncoder(c2) {
      return c2 == "<" && "&lt;" || c2 == ">" && "&gt;" || c2 == "&" && "&amp;" || c2 == '"' && "&quot;" || "&#" + c2.charCodeAt() + ";";
    }
    copy(NodeType, Node);
    copy(NodeType, Node.prototype);
    function _visitNode(node, callback) {
      if (callback(node)) {
        return true;
      }
      if (node = node.firstChild) {
        do {
          if (_visitNode(node, callback)) {
            return true;
          }
        } while (node = node.nextSibling);
      }
    }
    function Document() {
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns == "http://www.w3.org/2000/xmlns/") {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns == "http://www.w3.org/2000/xmlns/") {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, el, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var cs = el.childNodes;
        if (newChild) {
          cs[cs.length++] = newChild;
        } else {
          var child = el.firstChild;
          var i = 0;
          while (child) {
            cs[i++] = child;
            child = child.nextSibling;
          }
          cs.length = i;
        }
      }
    }
    function _removeChild(parentNode, child) {
      var previous = child.previousSibling;
      var next = child.nextSibling;
      if (previous) {
        previous.nextSibling = next;
      } else {
        parentNode.firstChild = next;
      }
      if (next) {
        next.previousSibling = previous;
      } else {
        parentNode.lastChild = previous;
      }
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      return child;
    }
    function _insertBefore(parentNode, newChild, nextChild) {
      var cp = newChild.parentNode;
      if (cp) {
        cp.removeChild(newChild);
      }
      if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = newChild.firstChild;
        if (newFirst == null) {
          return newChild;
        }
        var newLast = newChild.lastChild;
      } else {
        newFirst = newLast = newChild;
      }
      var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = nextChild;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parentNode.firstChild = newFirst;
      }
      if (nextChild == null) {
        parentNode.lastChild = newLast;
      } else {
        nextChild.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parentNode;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode);
      if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
        newChild.firstChild = newChild.lastChild = null;
      }
      return newChild;
    }
    function _appendSingleChild(parentNode, newChild) {
      var cp = newChild.parentNode;
      if (cp) {
        var pre = parentNode.lastChild;
        cp.removeChild(newChild);
        var pre = parentNode.lastChild;
      }
      var pre = parentNode.lastChild;
      newChild.parentNode = parentNode;
      newChild.previousSibling = pre;
      newChild.nextSibling = null;
      if (pre) {
        pre.nextSibling = newChild;
      } else {
        parentNode.firstChild = newChild;
      }
      parentNode.lastChild = newChild;
      _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
      return newChild;
    }
    Document.prototype = {
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
      },
      removeChild: function(oldChild) {
        if (this.documentElement == oldChild) {
          this.documentElement = null;
        }
        return _removeChild(this, oldChild);
      },
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      createElement: function(tagName) {
        var node = new Element();
        node.ownerDocument = this;
        node.nodeName = tagName;
        node.tagName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      createDocumentFragment: function() {
        var node = new DocumentFragment();
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      createTextNode: function(data) {
        var node = new Text();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createComment: function(data) {
        var node = new Comment();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createCDATASection: function(data) {
        var node = new CDATASection();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction();
        node.ownerDocument = this;
        node.tagName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      createAttribute: function(name) {
        var node = new Attr();
        node.ownerDocument = this;
        node.name = name;
        node.nodeName = name;
        node.localName = name;
        node.specified = true;
        return node;
      },
      createEntityReference: function(name) {
        var node = new EntityReference();
        node.ownerDocument = this;
        node.nodeName = name;
        return node;
      },
      createElementNS: function(namespaceURI, qualifiedName) {
        var node = new Element();
        var pl = qualifiedName.split(":");
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = namespaceURI;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        attrs._ownerElement = node;
        return node;
      },
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var node = new Attr();
        var pl = qualifiedName.split(":");
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.namespaceURI = namespaceURI;
        node.specified = true;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        return node;
      }
    };
    _extends(Document, Node);
    function Element() {
      this._nsMap = {};
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE,
      hasAttribute: function(name) {
        return this.getAttributeNode(name) != null;
      },
      getAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        return attr && attr.value || "";
      },
      getAttributeNode: function(name) {
        return this.attributes.getNamedItem(name);
      },
      setAttribute: function(name, value) {
        var attr = this.ownerDocument.createAttribute(name);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      removeAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        attr && this.removeAttributeNode(attr);
      },
      appendChild: function(newChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          return this.insertBefore(newChild, null);
        } else {
          return _appendSingleChild(this, newChild);
        }
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr && attr.value || "";
      },
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      getElementsByTagName: function(tagName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node);
    function Attr() {
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node);
    function CharacterData() {
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      appendChild: function(newChild) {
        throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node);
    function Text() {
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment() {
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection() {
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, CharacterData);
    function DocumentType() {
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node);
    function Notation() {
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node);
    function Entity() {
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node);
    function EntityReference() {
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node);
    function DocumentFragment() {
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node);
    function ProcessingInstruction() {
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, Node);
    function XMLSerializer() {
    }
    XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
      return nodeSerializeToString.call(node, isHtml, nodeFilter);
    };
    Node.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(isHtml, nodeFilter) {
      var buf = [];
      var refNode = this.nodeType == 9 ? this.documentElement : this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
          ];
        }
      }
      serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!prefix && !uri) {
        return false;
      }
      if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" || uri == "http://www.w3.org/2000/xmlns/") {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix == prefix) {
          return ns.namespace != uri;
        }
      }
      return true;
    }
    function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
      if (nodeFilter) {
        node = nodeFilter(node);
        if (node) {
          if (typeof node == "string") {
            buf.push(node);
            return;
          }
        } else {
          return;
        }
      }
      switch (node.nodeType) {
        case ELEMENT_NODE:
          if (!visibleNamespaces)
            visibleNamespaces = [];
          var startVisibleNamespaces = visibleNamespaces.length;
          var attrs = node.attributes;
          var len = attrs.length;
          var child = node.firstChild;
          var nodeName = node.tagName;
          isHTML = htmlns === node.namespaceURI || isHTML;
          buf.push("<", nodeName);
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (attr.prefix == "xmlns") {
              visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
            } else if (attr.nodeName == "xmlns") {
              visibleNamespaces.push({ prefix: "", namespace: attr.value });
            }
          }
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
              var prefix = attr.prefix || "";
              var uri = attr.namespaceURI;
              var ns = prefix ? " xmlns:" + prefix : " xmlns";
              buf.push(ns, '="', uri, '"');
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
          }
          if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
            var prefix = node.prefix || "";
            var uri = node.namespaceURI;
            var ns = prefix ? " xmlns:" + prefix : " xmlns";
            buf.push(ns, '="', uri, '"');
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
            buf.push(">");
            if (isHTML && /^script$/i.test(nodeName)) {
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
                }
                child = child.nextSibling;
              }
            } else {
              while (child) {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
                child = child.nextSibling;
              }
            }
            buf.push("</", nodeName, ">");
          } else {
            buf.push("/>");
          }
          return;
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var child = node.firstChild;
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
            child = child.nextSibling;
          }
          return;
        case ATTRIBUTE_NODE:
          return buf.push(" ", node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');
        case TEXT_NODE:
          return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));
        case CDATA_SECTION_NODE:
          return buf.push("<![CDATA[", node.data, "]]>");
        case COMMENT_NODE:
          return buf.push("<!--", node.data, "-->");
        case DOCUMENT_TYPE_NODE:
          var pubid = node.publicId;
          var sysid = node.systemId;
          buf.push("<!DOCTYPE ", node.name);
          if (pubid) {
            buf.push(' PUBLIC "', pubid);
            if (sysid && sysid != ".") {
              buf.push('" "', sysid);
            }
            buf.push('">');
          } else if (sysid && sysid != ".") {
            buf.push(' SYSTEM "', sysid, '">');
          } else {
            var sub = node.internalSubset;
            if (sub) {
              buf.push(" [", sub, "]");
            }
            buf.push(">");
          }
          return;
        case PROCESSING_INSTRUCTION_NODE:
          return buf.push("<?", node.target, " ", node.data, "?>");
        case ENTITY_REFERENCE_NODE:
          return buf.push("&", node.nodeName, ";");
        default:
          buf.push("??", node.nodeName);
      }
    }
    function importNode(doc, node, deep) {
      var node2;
      switch (node.nodeType) {
        case ELEMENT_NODE:
          node2 = node.cloneNode(false);
          node2.ownerDocument = doc;
        case DOCUMENT_FRAGMENT_NODE:
          break;
        case ATTRIBUTE_NODE:
          deep = true;
          break;
      }
      if (!node2) {
        node2 = node.cloneNode(false);
      }
      node2.ownerDocument = doc;
      node2.parentNode = null;
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(importNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function cloneNode(doc, node, deep) {
      var node2 = new node.constructor();
      for (var n in node) {
        var v = node[n];
        if (typeof v != "object") {
          if (v != node2[n]) {
            node2[n] = v;
          }
        }
      }
      if (node.childNodes) {
        node2.childNodes = new NodeList();
      }
      node2.ownerDocument = doc;
      switch (node2.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var attrs2 = node2.attributes = new NamedNodeMap();
          var len = attrs.length;
          attrs2._ownerElement = node2;
          for (var i = 0; i < len; i++) {
            node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
          }
          break;
          ;
        case ATTRIBUTE_NODE:
          deep = true;
      }
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(cloneNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    try {
      if (Object.defineProperty) {
        let getTextContent2 = function(node) {
          switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              var buf = [];
              node = node.firstChild;
              while (node) {
                if (node.nodeType !== 7 && node.nodeType !== 8) {
                  buf.push(getTextContent2(node));
                }
                node = node.nextSibling;
              }
              return buf.join("");
            default:
              return node.nodeValue;
          }
        };
        getTextContent = getTextContent2;
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            return getTextContent2(this);
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    var getTextContent;
    exports.DOMImplementation = DOMImplementation;
    exports.XMLSerializer = XMLSerializer;
  }
});

// node_modules/xmldom/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/xmldom/dom-parser.js"(exports) {
    function DOMParser(options) {
      this.options = options || { locator: {} };
    }
    DOMParser.prototype.parseFromString = function(source, mimeType) {
      var options = this.options;
      var sax = new XMLReader();
      var domBuilder = options.domBuilder || new DOMHandler();
      var errorHandler = options.errorHandler;
      var locator = options.locator;
      var defaultNSMap = options.xmlns || {};
      var entityMap = { "lt": "<", "gt": ">", "amp": "&", "quot": '"', "apos": "'" };
      if (locator) {
        domBuilder.setDocumentLocator(locator);
      }
      sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
      sax.domBuilder = options.domBuilder || domBuilder;
      if (/\/x?html?$/.test(mimeType)) {
        entityMap.nbsp = "\xA0";
        entityMap.copy = "\xA9";
        defaultNSMap[""] = "http://www.w3.org/1999/xhtml";
      }
      defaultNSMap.xml = defaultNSMap.xml || "http://www.w3.org/XML/1998/namespace";
      if (source) {
        sax.parse(source, defaultNSMap, entityMap);
      } else {
        sax.errorHandler.error("invalid doc source");
      }
      return domBuilder.doc;
    };
    function buildErrorHandler(errorImpl, domBuilder, locator) {
      if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
          return domBuilder;
        }
        errorImpl = domBuilder;
      }
      var errorHandler = {};
      var isCallback = errorImpl instanceof Function;
      locator = locator || {};
      function build(key) {
        var fn = errorImpl[key];
        if (!fn && isCallback) {
          fn = errorImpl.length == 2 ? function(msg) {
            errorImpl(key, msg);
          } : errorImpl;
        }
        errorHandler[key] = fn && function(msg) {
          fn("[xmldom " + key + "]	" + msg + _locator(locator));
        } || function() {
        };
      }
      build("warning");
      build("error");
      build("fatalError");
      return errorHandler;
    }
    function DOMHandler() {
      this.cdata = false;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      startDocument: function() {
        this.doc = new DOMImplementation().createDocument(null, null, null);
        if (this.locator) {
          this.doc.documentURI = this.locator.systemId;
        }
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        var current = this.currentElement;
        var tagName = current.tagName;
        this.currentElement = current.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      setDocumentLocator: function(locator) {
        if (this.locator = locator) {
          locator.lineNumber = 0;
        }
      },
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name, publicId, systemId) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
        }
      },
      warning: function(error) {
        console.warn("[xmldom warning]	" + error, _locator(this.locator));
      },
      error: function(error) {
        console.error("[xmldom error]	" + error, _locator(this.locator));
      },
      fatalError: function(error) {
        console.error("[xmldom fatalError]	" + error, _locator(this.locator));
        throw error;
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
      DOMHandler.prototype[key] = function() {
        return null;
      };
    });
    function appendElement(hander, node) {
      if (!hander.currentElement) {
        hander.doc.appendChild(node);
      } else {
        hander.currentElement.appendChild(node);
      }
    }
    var XMLReader = require_sax().XMLReader;
    var DOMImplementation = exports.DOMImplementation = require_dom().DOMImplementation;
    exports.XMLSerializer = require_dom().XMLSerializer;
    exports.DOMParser = DOMParser;
  }
});

// node_modules/plist/lib/parse.js
var require_parse = __commonJS({
  "node_modules/plist/lib/parse.js"(exports) {
    var deprecate = require_node();
    var DOMParser = require_dom_parser().DOMParser;
    exports.parse = parse;
    exports.parseString = deprecate(parseString, "`parseString()` is deprecated. It's not actually async. Use `parse()` instead.");
    exports.parseStringSync = deprecate(parseStringSync, "`parseStringSync()` is deprecated. Use `parse()` instead.");
    function shouldIgnoreNode(node) {
      return node.nodeType === 3 || node.nodeType === 8 || node.nodeType === 4;
    }
    function parse(xml) {
      var doc = new DOMParser().parseFromString(xml);
      if (doc.documentElement.nodeName !== "plist") {
        throw new Error("malformed document. First element should be <plist>");
      }
      var plist = parsePlistXML(doc.documentElement);
      if (plist.length == 1)
        plist = plist[0];
      return plist;
    }
    function parseString(xml, callback) {
      var doc, error, plist;
      try {
        doc = new DOMParser().parseFromString(xml);
        plist = parsePlistXML(doc.documentElement);
      } catch (e) {
        error = e;
      }
      callback(error, plist);
    }
    function parseStringSync(xml) {
      var doc = new DOMParser().parseFromString(xml);
      var plist;
      if (doc.documentElement.nodeName !== "plist") {
        throw new Error("malformed document. First element should be <plist>");
      }
      plist = parsePlistXML(doc.documentElement);
      if (plist.length == 1) {
        plist = plist[0];
      }
      return plist;
    }
    function parsePlistXML(node) {
      var i, new_obj, key, val, new_arr, res, d;
      if (!node)
        return null;
      if (node.nodeName === "plist") {
        new_arr = [];
        for (i = 0; i < node.childNodes.length; i++) {
          if (!shouldIgnoreNode(node.childNodes[i])) {
            new_arr.push(parsePlistXML(node.childNodes[i]));
          }
        }
        return new_arr;
      } else if (node.nodeName === "dict") {
        new_obj = {};
        key = null;
        for (i = 0; i < node.childNodes.length; i++) {
          if (!shouldIgnoreNode(node.childNodes[i])) {
            if (key === null) {
              key = parsePlistXML(node.childNodes[i]);
            } else {
              new_obj[key] = parsePlistXML(node.childNodes[i]);
              key = null;
            }
          }
        }
        return new_obj;
      } else if (node.nodeName === "array") {
        new_arr = [];
        for (i = 0; i < node.childNodes.length; i++) {
          if (!shouldIgnoreNode(node.childNodes[i])) {
            res = parsePlistXML(node.childNodes[i]);
            if (res != null)
              new_arr.push(res);
          }
        }
        return new_arr;
      } else if (node.nodeName === "#text") {
      } else if (node.nodeName === "key") {
        return node.childNodes[0].nodeValue;
      } else if (node.nodeName === "string") {
        res = "";
        for (d = 0; d < node.childNodes.length; d++) {
          res += node.childNodes[d].nodeValue;
        }
        return res;
      } else if (node.nodeName === "integer") {
        return parseInt(node.childNodes[0].nodeValue, 10);
      } else if (node.nodeName === "real") {
        res = "";
        for (d = 0; d < node.childNodes.length; d++) {
          if (node.childNodes[d].nodeType === 3) {
            res += node.childNodes[d].nodeValue;
          }
        }
        return parseFloat(res);
      } else if (node.nodeName === "data") {
        res = "";
        for (d = 0; d < node.childNodes.length; d++) {
          if (node.childNodes[d].nodeType === 3) {
            res += node.childNodes[d].nodeValue.replace(/\s+/g, "");
          }
        }
        return new Buffer(res, "base64");
      } else if (node.nodeName === "date") {
        return new Date(node.childNodes[0].nodeValue);
      } else if (node.nodeName === "true") {
        return true;
      } else if (node.nodeName === "false") {
        return false;
      }
    }
  }
});

// node_modules/plist/node_modules/base64-js/lib/b64.js
var require_b64 = __commonJS({
  "node_modules/plist/node_modules/base64-js/lib/b64.js"(exports) {
    var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    (function(exports2) {
      "use strict";
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var PLUS = "+".charCodeAt(0);
      var SLASH = "/".charCodeAt(0);
      var NUMBER = "0".charCodeAt(0);
      var LOWER = "a".charCodeAt(0);
      var UPPER = "A".charCodeAt(0);
      var PLUS_URL_SAFE = "-".charCodeAt(0);
      var SLASH_URL_SAFE = "_".charCodeAt(0);
      function decode(elt) {
        var code = elt.charCodeAt(0);
        if (code === PLUS || code === PLUS_URL_SAFE)
          return 62;
        if (code === SLASH || code === SLASH_URL_SAFE)
          return 63;
        if (code < NUMBER)
          return -1;
        if (code < NUMBER + 10)
          return code - NUMBER + 26 + 26;
        if (code < UPPER + 26)
          return code - UPPER;
        if (code < LOWER + 26)
          return code - LOWER + 26;
      }
      function b64ToByteArray(b64) {
        var i, j, l, tmp, placeHolders, arr;
        if (b64.length % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var len = b64.length;
        placeHolders = b64.charAt(len - 2) === "=" ? 2 : b64.charAt(len - 1) === "=" ? 1 : 0;
        arr = new Arr(b64.length * 3 / 4 - placeHolders);
        l = placeHolders > 0 ? b64.length - 4 : b64.length;
        var L = 0;
        function push(v) {
          arr[L++] = v;
        }
        for (i = 0, j = 0; i < l; i += 4, j += 3) {
          tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
          push((tmp & 16711680) >> 16);
          push((tmp & 65280) >> 8);
          push(tmp & 255);
        }
        if (placeHolders === 2) {
          tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
          push(tmp & 255);
        } else if (placeHolders === 1) {
          tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
          push(tmp >> 8 & 255);
          push(tmp & 255);
        }
        return arr;
      }
      function uint8ToBase64(uint8) {
        var i, extraBytes = uint8.length % 3, output = "", temp, length;
        function encode(num) {
          return lookup.charAt(num);
        }
        function tripletToBase64(num) {
          return encode(num >> 18 & 63) + encode(num >> 12 & 63) + encode(num >> 6 & 63) + encode(num & 63);
        }
        for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
          temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
          output += tripletToBase64(temp);
        }
        switch (extraBytes) {
          case 1:
            temp = uint8[uint8.length - 1];
            output += encode(temp >> 2);
            output += encode(temp << 4 & 63);
            output += "==";
            break;
          case 2:
            temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
            output += encode(temp >> 10);
            output += encode(temp >> 4 & 63);
            output += encode(temp << 2 & 63);
            output += "=";
            break;
        }
        return output;
      }
      exports2.toByteArray = b64ToByteArray;
      exports2.fromByteArray = uint8ToBase64;
    })(typeof exports === "undefined" ? exports.base64js = {} : exports);
  }
});

// node_modules/lodash/lang/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/lang/isObject.js"(exports, module2) {
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    module2.exports = isObject;
  }
});

// node_modules/lodash/lang/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/lang/isFunction.js"(exports, module2) {
    var isObject = require_isObject();
    var funcTag = "[object Function]";
    var objectProto = Object.prototype;
    var objToString = objectProto.toString;
    function isFunction(value) {
      return isObject(value) && objToString.call(value) == funcTag;
    }
    module2.exports = isFunction;
  }
});

// node_modules/lodash/internal/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/internal/isObjectLike.js"(exports, module2) {
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    module2.exports = isObjectLike;
  }
});

// node_modules/lodash/lang/isNative.js
var require_isNative = __commonJS({
  "node_modules/lodash/lang/isNative.js"(exports, module2) {
    var isFunction = require_isFunction();
    var isObjectLike = require_isObjectLike();
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var objectProto = Object.prototype;
    var fnToString = Function.prototype.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp("^" + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (isFunction(value)) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    }
    module2.exports = isNative;
  }
});

// node_modules/lodash/internal/getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/internal/getNative.js"(exports, module2) {
    var isNative = require_isNative();
    function getNative(object, key) {
      var value = object == null ? void 0 : object[key];
      return isNative(value) ? value : void 0;
    }
    module2.exports = getNative;
  }
});

// node_modules/lodash/internal/baseProperty.js
var require_baseProperty = __commonJS({
  "node_modules/lodash/internal/baseProperty.js"(exports, module2) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module2.exports = baseProperty;
  }
});

// node_modules/lodash/internal/getLength.js
var require_getLength = __commonJS({
  "node_modules/lodash/internal/getLength.js"(exports, module2) {
    var baseProperty = require_baseProperty();
    var getLength = baseProperty("length");
    module2.exports = getLength;
  }
});

// node_modules/lodash/internal/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/internal/isLength.js"(exports, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module2.exports = isLength;
  }
});

// node_modules/lodash/internal/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/internal/isArrayLike.js"(exports, module2) {
    var getLength = require_getLength();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    }
    module2.exports = isArrayLike;
  }
});

// node_modules/lodash/lang/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/lang/isArguments.js"(exports, module2) {
    var isArrayLike = require_isArrayLike();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    function isArguments(value) {
      return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    }
    module2.exports = isArguments;
  }
});

// node_modules/lodash/lang/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/lang/isArray.js"(exports, module2) {
    var getNative = require_getNative();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var arrayTag = "[object Array]";
    var objectProto = Object.prototype;
    var objToString = objectProto.toString;
    var nativeIsArray = getNative(Array, "isArray");
    var isArray = nativeIsArray || function(value) {
      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
    };
    module2.exports = isArray;
  }
});

// node_modules/lodash/internal/isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/internal/isIndex.js"(exports, module2) {
    var reIsUint = /^\d+$/;
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isIndex(value, length) {
      value = typeof value == "number" || reIsUint.test(value) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }
    module2.exports = isIndex;
  }
});

// node_modules/lodash/object/keysIn.js
var require_keysIn = __commonJS({
  "node_modules/lodash/object/keysIn.js"(exports, module2) {
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var isObject = require_isObject();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function keysIn(object) {
      if (object == null) {
        return [];
      }
      if (!isObject(object)) {
        object = Object(object);
      }
      var length = object.length;
      length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;
      var Ctor = object.constructor, index = -1, isProto = typeof Ctor == "function" && Ctor.prototype === object, result = Array(length), skipIndexes = length > 0;
      while (++index < length) {
        result[index] = index + "";
      }
      for (var key in object) {
        if (!(skipIndexes && isIndex(key, length)) && !(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    module2.exports = keysIn;
  }
});

// node_modules/lodash/internal/shimKeys.js
var require_shimKeys = __commonJS({
  "node_modules/lodash/internal/shimKeys.js"(exports, module2) {
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var keysIn = require_keysIn();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function shimKeys(object) {
      var props = keysIn(object), propsLength = props.length, length = propsLength && object.length;
      var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));
      var index = -1, result = [];
      while (++index < propsLength) {
        var key = props[index];
        if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }
    module2.exports = shimKeys;
  }
});

// node_modules/lodash/object/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/object/keys.js"(exports, module2) {
    var getNative = require_getNative();
    var isArrayLike = require_isArrayLike();
    var isObject = require_isObject();
    var shimKeys = require_shimKeys();
    var nativeKeys = getNative(Object, "keys");
    var keys = !nativeKeys ? shimKeys : function(object) {
      var Ctor = object == null ? void 0 : object.constructor;
      if (typeof Ctor == "function" && Ctor.prototype === object || typeof object != "function" && isArrayLike(object)) {
        return shimKeys(object);
      }
      return isObject(object) ? nativeKeys(object) : [];
    };
    module2.exports = keys;
  }
});

// node_modules/lodash/internal/assignWith.js
var require_assignWith = __commonJS({
  "node_modules/lodash/internal/assignWith.js"(exports, module2) {
    var keys = require_keys();
    function assignWith(object, source, customizer) {
      var index = -1, props = keys(source), length = props.length;
      while (++index < length) {
        var key = props[index], value = object[key], result = customizer(value, source[key], key, object, source);
        if ((result === result ? result !== value : value === value) || value === void 0 && !(key in object)) {
          object[key] = result;
        }
      }
      return object;
    }
    module2.exports = assignWith;
  }
});

// node_modules/lodash/internal/baseCopy.js
var require_baseCopy = __commonJS({
  "node_modules/lodash/internal/baseCopy.js"(exports, module2) {
    function baseCopy(source, props, object) {
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        object[key] = source[key];
      }
      return object;
    }
    module2.exports = baseCopy;
  }
});

// node_modules/lodash/internal/baseAssign.js
var require_baseAssign = __commonJS({
  "node_modules/lodash/internal/baseAssign.js"(exports, module2) {
    var baseCopy = require_baseCopy();
    var keys = require_keys();
    function baseAssign(object, source) {
      return source == null ? object : baseCopy(source, keys(source), object);
    }
    module2.exports = baseAssign;
  }
});

// node_modules/lodash/utility/identity.js
var require_identity = __commonJS({
  "node_modules/lodash/utility/identity.js"(exports, module2) {
    function identity(value) {
      return value;
    }
    module2.exports = identity;
  }
});

// node_modules/lodash/internal/bindCallback.js
var require_bindCallback = __commonJS({
  "node_modules/lodash/internal/bindCallback.js"(exports, module2) {
    var identity = require_identity();
    function bindCallback(func, thisArg, argCount) {
      if (typeof func != "function") {
        return identity;
      }
      if (thisArg === void 0) {
        return func;
      }
      switch (argCount) {
        case 1:
          return function(value) {
            return func.call(thisArg, value);
          };
        case 3:
          return function(value, index, collection) {
            return func.call(thisArg, value, index, collection);
          };
        case 4:
          return function(accumulator, value, index, collection) {
            return func.call(thisArg, accumulator, value, index, collection);
          };
        case 5:
          return function(value, other, key, object, source) {
            return func.call(thisArg, value, other, key, object, source);
          };
      }
      return function() {
        return func.apply(thisArg, arguments);
      };
    }
    module2.exports = bindCallback;
  }
});

// node_modules/lodash/internal/isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "node_modules/lodash/internal/isIterateeCall.js"(exports, module2) {
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        var other = object[index];
        return value === value ? value === other : other !== other;
      }
      return false;
    }
    module2.exports = isIterateeCall;
  }
});

// node_modules/lodash/function/restParam.js
var require_restParam = __commonJS({
  "node_modules/lodash/function/restParam.js"(exports, module2) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max;
    function restParam(func, start) {
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === void 0 ? func.length - 1 : +start || 0, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), rest = Array(length);
        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
          case 0:
            return func.call(this, rest);
          case 1:
            return func.call(this, args[0], rest);
          case 2:
            return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    }
    module2.exports = restParam;
  }
});

// node_modules/lodash/internal/createAssigner.js
var require_createAssigner = __commonJS({
  "node_modules/lodash/internal/createAssigner.js"(exports, module2) {
    var bindCallback = require_bindCallback();
    var isIterateeCall = require_isIterateeCall();
    var restParam = require_restParam();
    function createAssigner(assigner) {
      return restParam(function(object, sources) {
        var index = -1, length = object == null ? 0 : sources.length, customizer = length > 2 ? sources[length - 2] : void 0, guard = length > 2 ? sources[2] : void 0, thisArg = length > 1 ? sources[length - 1] : void 0;
        if (typeof customizer == "function") {
          customizer = bindCallback(customizer, thisArg, 5);
          length -= 2;
        } else {
          customizer = typeof thisArg == "function" ? thisArg : void 0;
          length -= customizer ? 1 : 0;
        }
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, customizer);
          }
        }
        return object;
      });
    }
    module2.exports = createAssigner;
  }
});

// node_modules/lodash/object/assign.js
var require_assign2 = __commonJS({
  "node_modules/lodash/object/assign.js"(exports, module2) {
    var assignWith = require_assignWith();
    var baseAssign = require_baseAssign();
    var createAssigner = require_createAssigner();
    var assign = createAssigner(function(object, source, customizer) {
      return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
    });
    module2.exports = assign;
  }
});

// node_modules/xmlbuilder/lib/XMLStringifier.js
var require_XMLStringifier = __commonJS({
  "node_modules/xmlbuilder/lib/XMLStringifier.js"(exports, module2) {
    (function() {
      var XMLStringifier, bind = function(fn, me) {
        return function() {
          return fn.apply(me, arguments);
        };
      }, hasProp = {}.hasOwnProperty;
      module2.exports = XMLStringifier = function() {
        function XMLStringifier2(options) {
          this.assertLegalChar = bind(this.assertLegalChar, this);
          var key, ref, value;
          this.allowSurrogateChars = options != null ? options.allowSurrogateChars : void 0;
          ref = (options != null ? options.stringify : void 0) || {};
          for (key in ref) {
            if (!hasProp.call(ref, key))
              continue;
            value = ref[key];
            this[key] = value;
          }
        }
        XMLStringifier2.prototype.eleName = function(val) {
          val = "" + val || "";
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.eleText = function(val) {
          val = "" + val || "";
          return this.assertLegalChar(this.elEscape(val));
        };
        XMLStringifier2.prototype.cdata = function(val) {
          val = "" + val || "";
          if (val.match(/]]>/)) {
            throw new Error("Invalid CDATA text: " + val);
          }
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.comment = function(val) {
          val = "" + val || "";
          if (val.match(/--/)) {
            throw new Error("Comment text cannot contain double-hypen: " + val);
          }
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.raw = function(val) {
          return "" + val || "";
        };
        XMLStringifier2.prototype.attName = function(val) {
          return "" + val || "";
        };
        XMLStringifier2.prototype.attValue = function(val) {
          val = "" + val || "";
          return this.attEscape(val);
        };
        XMLStringifier2.prototype.insTarget = function(val) {
          return "" + val || "";
        };
        XMLStringifier2.prototype.insValue = function(val) {
          val = "" + val || "";
          if (val.match(/\?>/)) {
            throw new Error("Invalid processing instruction value: " + val);
          }
          return val;
        };
        XMLStringifier2.prototype.xmlVersion = function(val) {
          val = "" + val || "";
          if (!val.match(/1\.[0-9]+/)) {
            throw new Error("Invalid version number: " + val);
          }
          return val;
        };
        XMLStringifier2.prototype.xmlEncoding = function(val) {
          val = "" + val || "";
          if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-]|-)*$/)) {
            throw new Error("Invalid encoding: " + val);
          }
          return val;
        };
        XMLStringifier2.prototype.xmlStandalone = function(val) {
          if (val) {
            return "yes";
          } else {
            return "no";
          }
        };
        XMLStringifier2.prototype.dtdPubID = function(val) {
          return "" + val || "";
        };
        XMLStringifier2.prototype.dtdSysID = function(val) {
          return "" + val || "";
        };
        XMLStringifier2.prototype.dtdElementValue = function(val) {
          return "" + val || "";
        };
        XMLStringifier2.prototype.dtdAttType = function(val) {
          return "" + val || "";
        };
        XMLStringifier2.prototype.dtdAttDefault = function(val) {
          if (val != null) {
            return "" + val || "";
          } else {
            return val;
          }
        };
        XMLStringifier2.prototype.dtdEntityValue = function(val) {
          return "" + val || "";
        };
        XMLStringifier2.prototype.dtdNData = function(val) {
          return "" + val || "";
        };
        XMLStringifier2.prototype.convertAttKey = "@";
        XMLStringifier2.prototype.convertPIKey = "?";
        XMLStringifier2.prototype.convertTextKey = "#text";
        XMLStringifier2.prototype.convertCDataKey = "#cdata";
        XMLStringifier2.prototype.convertCommentKey = "#comment";
        XMLStringifier2.prototype.convertRawKey = "#raw";
        XMLStringifier2.prototype.assertLegalChar = function(str) {
          var chars, chr;
          if (this.allowSurrogateChars) {
            chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uFFFE-\uFFFF]/;
          } else {
            chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/;
          }
          chr = str.match(chars);
          if (chr) {
            throw new Error("Invalid character (" + chr + ") in string: " + str + " at index " + chr.index);
          }
          return str;
        };
        XMLStringifier2.prototype.elEscape = function(str) {
          return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
        };
        XMLStringifier2.prototype.attEscape = function(str) {
          return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        };
        return XMLStringifier2;
      }();
    }).call(exports);
  }
});

// node_modules/lodash/internal/baseCreate.js
var require_baseCreate = __commonJS({
  "node_modules/lodash/internal/baseCreate.js"(exports, module2) {
    var isObject = require_isObject();
    var baseCreate = function() {
      function object() {
      }
      return function(prototype) {
        if (isObject(prototype)) {
          object.prototype = prototype;
          var result = new object();
          object.prototype = void 0;
        }
        return result || {};
      };
    }();
    module2.exports = baseCreate;
  }
});

// node_modules/lodash/object/create.js
var require_create = __commonJS({
  "node_modules/lodash/object/create.js"(exports, module2) {
    var baseAssign = require_baseAssign();
    var baseCreate = require_baseCreate();
    var isIterateeCall = require_isIterateeCall();
    function create(prototype, properties, guard) {
      var result = baseCreate(prototype);
      if (guard && isIterateeCall(prototype, properties, guard)) {
        properties = void 0;
      }
      return properties ? baseAssign(result, properties) : result;
    }
    module2.exports = create;
  }
});

// node_modules/lodash/lang/isString.js
var require_isString = __commonJS({
  "node_modules/lodash/lang/isString.js"(exports, module2) {
    var isObjectLike = require_isObjectLike();
    var stringTag = "[object String]";
    var objectProto = Object.prototype;
    var objToString = objectProto.toString;
    function isString(value) {
      return typeof value == "string" || isObjectLike(value) && objToString.call(value) == stringTag;
    }
    module2.exports = isString;
  }
});

// node_modules/lodash/lang/isEmpty.js
var require_isEmpty = __commonJS({
  "node_modules/lodash/lang/isEmpty.js"(exports, module2) {
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLike = require_isArrayLike();
    var isFunction = require_isFunction();
    var isObjectLike = require_isObjectLike();
    var isString = require_isString();
    var keys = require_keys();
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) || isObjectLike(value) && isFunction(value.splice))) {
        return !value.length;
      }
      return !keys(value).length;
    }
    module2.exports = isEmpty;
  }
});

// node_modules/lodash/internal/arrayEvery.js
var require_arrayEvery = __commonJS({
  "node_modules/lodash/internal/arrayEvery.js"(exports, module2) {
    function arrayEvery(array, predicate) {
      var index = -1, length = array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
    module2.exports = arrayEvery;
  }
});

// node_modules/lodash/internal/arraySome.js
var require_arraySome = __commonJS({
  "node_modules/lodash/internal/arraySome.js"(exports, module2) {
    function arraySome(array, predicate) {
      var index = -1, length = array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    module2.exports = arraySome;
  }
});

// node_modules/lodash/internal/equalArrays.js
var require_equalArrays = __commonJS({
  "node_modules/lodash/internal/equalArrays.js"(exports, module2) {
    var arraySome = require_arraySome();
    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var index = -1, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
        return false;
      }
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index], result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : void 0;
        if (result !== void 0) {
          if (result) {
            continue;
          }
          return false;
        }
        if (isLoose) {
          if (!arraySome(other, function(othValue2) {
            return arrValue === othValue2 || equalFunc(arrValue, othValue2, customizer, isLoose, stackA, stackB);
          })) {
            return false;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
          return false;
        }
      }
      return true;
    }
    module2.exports = equalArrays;
  }
});

// node_modules/lodash/internal/equalByTag.js
var require_equalByTag = __commonJS({
  "node_modules/lodash/internal/equalByTag.js"(exports, module2) {
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var stringTag = "[object String]";
    function equalByTag(object, other, tag) {
      switch (tag) {
        case boolTag:
        case dateTag:
          return +object == +other;
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case numberTag:
          return object != +object ? other != +other : object == +other;
        case regexpTag:
        case stringTag:
          return object == other + "";
      }
      return false;
    }
    module2.exports = equalByTag;
  }
});

// node_modules/lodash/internal/equalObjects.js
var require_equalObjects = __commonJS({
  "node_modules/lodash/internal/equalObjects.js"(exports, module2) {
    var keys = require_keys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objProps = keys(object), objLength = objProps.length, othProps = keys(other), othLength = othProps.length;
      if (objLength != othLength && !isLoose) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var skipCtor = isLoose;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key], result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : void 0;
        if (!(result === void 0 ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
          return false;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (!skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          return false;
        }
      }
      return true;
    }
    module2.exports = equalObjects;
  }
});

// node_modules/lodash/lang/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/lang/isTypedArray.js"(exports, module2) {
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var objectProto = Object.prototype;
    var objToString = objectProto.toString;
    function isTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
    }
    module2.exports = isTypedArray;
  }
});

// node_modules/lodash/internal/baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "node_modules/lodash/internal/baseIsEqualDeep.js"(exports, module2) {
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var isArray = require_isArray();
    var isTypedArray = require_isTypedArray();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objToString = objectProto.toString;
    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
      if (!objIsArr) {
        objTag = objToString.call(object);
        if (objTag == argsTag) {
          objTag = objectTag;
        } else if (objTag != objectTag) {
          objIsArr = isTypedArray(object);
        }
      }
      if (!othIsArr) {
        othTag = objToString.call(other);
        if (othTag == argsTag) {
          othTag = objectTag;
        } else if (othTag != objectTag) {
          othIsArr = isTypedArray(other);
        }
      }
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && !(objIsArr || objIsObj)) {
        return equalByTag(object, other, objTag);
      }
      if (!isLoose) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stackA || (stackA = []);
      stackB || (stackB = []);
      var length = stackA.length;
      while (length--) {
        if (stackA[length] == object) {
          return stackB[length] == other;
        }
      }
      stackA.push(object);
      stackB.push(other);
      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
      stackA.pop();
      stackB.pop();
      return result;
    }
    module2.exports = baseIsEqualDeep;
  }
});

// node_modules/lodash/internal/baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "node_modules/lodash/internal/baseIsEqual.js"(exports, module2) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObject = require_isObject();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
    }
    module2.exports = baseIsEqual;
  }
});

// node_modules/lodash/internal/toObject.js
var require_toObject = __commonJS({
  "node_modules/lodash/internal/toObject.js"(exports, module2) {
    var isObject = require_isObject();
    function toObject(value) {
      return isObject(value) ? value : Object(value);
    }
    module2.exports = toObject;
  }
});

// node_modules/lodash/internal/baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "node_modules/lodash/internal/baseIsMatch.js"(exports, module2) {
    var baseIsEqual = require_baseIsEqual();
    var toObject = require_toObject();
    function baseIsMatch(object, matchData, customizer) {
      var index = matchData.length, length = index, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = toObject(object);
      while (index--) {
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var result = customizer ? customizer(objValue, srcValue, key) : void 0;
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module2.exports = baseIsMatch;
  }
});

// node_modules/lodash/internal/isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "node_modules/lodash/internal/isStrictComparable.js"(exports, module2) {
    var isObject = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    module2.exports = isStrictComparable;
  }
});

// node_modules/lodash/object/pairs.js
var require_pairs = __commonJS({
  "node_modules/lodash/object/pairs.js"(exports, module2) {
    var keys = require_keys();
    var toObject = require_toObject();
    function pairs(object) {
      object = toObject(object);
      var index = -1, props = keys(object), length = props.length, result = Array(length);
      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }
    module2.exports = pairs;
  }
});

// node_modules/lodash/internal/getMatchData.js
var require_getMatchData = __commonJS({
  "node_modules/lodash/internal/getMatchData.js"(exports, module2) {
    var isStrictComparable = require_isStrictComparable();
    var pairs = require_pairs();
    function getMatchData(object) {
      var result = pairs(object), length = result.length;
      while (length--) {
        result[length][2] = isStrictComparable(result[length][1]);
      }
      return result;
    }
    module2.exports = getMatchData;
  }
});

// node_modules/lodash/internal/baseMatches.js
var require_baseMatches = __commonJS({
  "node_modules/lodash/internal/baseMatches.js"(exports, module2) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var toObject = require_toObject();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        var key = matchData[0][0], value = matchData[0][1];
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === value && (value !== void 0 || key in toObject(object));
        };
      }
      return function(object) {
        return baseIsMatch(object, matchData);
      };
    }
    module2.exports = baseMatches;
  }
});

// node_modules/lodash/internal/baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/internal/baseGet.js"(exports, module2) {
    var toObject = require_toObject();
    function baseGet(object, path2, pathKey) {
      if (object == null) {
        return;
      }
      if (pathKey !== void 0 && pathKey in toObject(object)) {
        path2 = [pathKey];
      }
      var index = 0, length = path2.length;
      while (object != null && index < length) {
        object = object[path2[index++]];
      }
      return index && index == length ? object : void 0;
    }
    module2.exports = baseGet;
  }
});

// node_modules/lodash/internal/baseSlice.js
var require_baseSlice = __commonJS({
  "node_modules/lodash/internal/baseSlice.js"(exports, module2) {
    function baseSlice(array, start, end) {
      var index = -1, length = array.length;
      start = start == null ? 0 : +start || 0;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end === void 0 || end > length ? length : +end || 0;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    module2.exports = baseSlice;
  }
});

// node_modules/lodash/internal/isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/internal/isKey.js"(exports, module2) {
    var isArray = require_isArray();
    var toObject = require_toObject();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      var type = typeof value;
      if (type == "string" && reIsPlainProp.test(value) || type == "number") {
        return true;
      }
      if (isArray(value)) {
        return false;
      }
      var result = !reIsDeepProp.test(value);
      return result || object != null && value in toObject(object);
    }
    module2.exports = isKey;
  }
});

// node_modules/lodash/array/last.js
var require_last = __commonJS({
  "node_modules/lodash/array/last.js"(exports, module2) {
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : void 0;
    }
    module2.exports = last;
  }
});

// node_modules/lodash/internal/baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/internal/baseToString.js"(exports, module2) {
    function baseToString(value) {
      return value == null ? "" : value + "";
    }
    module2.exports = baseToString;
  }
});

// node_modules/lodash/internal/toPath.js
var require_toPath = __commonJS({
  "node_modules/lodash/internal/toPath.js"(exports, module2) {
    var baseToString = require_baseToString();
    var isArray = require_isArray();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
    var reEscapeChar = /\\(\\)?/g;
    function toPath(value) {
      if (isArray(value)) {
        return value;
      }
      var result = [];
      baseToString(value).replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    }
    module2.exports = toPath;
  }
});

// node_modules/lodash/internal/baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "node_modules/lodash/internal/baseMatchesProperty.js"(exports, module2) {
    var baseGet = require_baseGet();
    var baseIsEqual = require_baseIsEqual();
    var baseSlice = require_baseSlice();
    var isArray = require_isArray();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var last = require_last();
    var toObject = require_toObject();
    var toPath = require_toPath();
    function baseMatchesProperty(path2, srcValue) {
      var isArr = isArray(path2), isCommon = isKey(path2) && isStrictComparable(srcValue), pathKey = path2 + "";
      path2 = toPath(path2);
      return function(object) {
        if (object == null) {
          return false;
        }
        var key = pathKey;
        object = toObject(object);
        if ((isArr || !isCommon) && !(key in object)) {
          object = path2.length == 1 ? object : baseGet(object, baseSlice(path2, 0, -1));
          if (object == null) {
            return false;
          }
          key = last(path2);
          object = toObject(object);
        }
        return object[key] === srcValue ? srcValue !== void 0 || key in object : baseIsEqual(srcValue, object[key], void 0, true);
      };
    }
    module2.exports = baseMatchesProperty;
  }
});

// node_modules/lodash/internal/basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "node_modules/lodash/internal/basePropertyDeep.js"(exports, module2) {
    var baseGet = require_baseGet();
    var toPath = require_toPath();
    function basePropertyDeep(path2) {
      var pathKey = path2 + "";
      path2 = toPath(path2);
      return function(object) {
        return baseGet(object, path2, pathKey);
      };
    }
    module2.exports = basePropertyDeep;
  }
});

// node_modules/lodash/utility/property.js
var require_property = __commonJS({
  "node_modules/lodash/utility/property.js"(exports, module2) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    function property(path2) {
      return isKey(path2) ? baseProperty(path2) : basePropertyDeep(path2);
    }
    module2.exports = property;
  }
});

// node_modules/lodash/internal/baseCallback.js
var require_baseCallback = __commonJS({
  "node_modules/lodash/internal/baseCallback.js"(exports, module2) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var bindCallback = require_bindCallback();
    var identity = require_identity();
    var property = require_property();
    function baseCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (type == "function") {
        return thisArg === void 0 ? func : bindCallback(func, thisArg, argCount);
      }
      if (func == null) {
        return identity;
      }
      if (type == "object") {
        return baseMatches(func);
      }
      return thisArg === void 0 ? property(func) : baseMatchesProperty(func, thisArg);
    }
    module2.exports = baseCallback;
  }
});

// node_modules/lodash/internal/createBaseFor.js
var require_createBaseFor = __commonJS({
  "node_modules/lodash/internal/createBaseFor.js"(exports, module2) {
    var toObject = require_toObject();
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var iterable = toObject(object), props = keysFunc(object), length = props.length, index = fromRight ? length : -1;
        while (fromRight ? index-- : ++index < length) {
          var key = props[index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    module2.exports = createBaseFor;
  }
});

// node_modules/lodash/internal/baseFor.js
var require_baseFor = __commonJS({
  "node_modules/lodash/internal/baseFor.js"(exports, module2) {
    var createBaseFor = require_createBaseFor();
    var baseFor = createBaseFor();
    module2.exports = baseFor;
  }
});

// node_modules/lodash/internal/baseForOwn.js
var require_baseForOwn = __commonJS({
  "node_modules/lodash/internal/baseForOwn.js"(exports, module2) {
    var baseFor = require_baseFor();
    var keys = require_keys();
    function baseForOwn(object, iteratee) {
      return baseFor(object, iteratee, keys);
    }
    module2.exports = baseForOwn;
  }
});

// node_modules/lodash/internal/createBaseEach.js
var require_createBaseEach = __commonJS({
  "node_modules/lodash/internal/createBaseEach.js"(exports, module2) {
    var getLength = require_getLength();
    var isLength = require_isLength();
    var toObject = require_toObject();
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        var length = collection ? getLength(collection) : 0;
        if (!isLength(length)) {
          return eachFunc(collection, iteratee);
        }
        var index = fromRight ? length : -1, iterable = toObject(collection);
        while (fromRight ? index-- : ++index < length) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    module2.exports = createBaseEach;
  }
});

// node_modules/lodash/internal/baseEach.js
var require_baseEach = __commonJS({
  "node_modules/lodash/internal/baseEach.js"(exports, module2) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module2.exports = baseEach;
  }
});

// node_modules/lodash/internal/baseEvery.js
var require_baseEvery = __commonJS({
  "node_modules/lodash/internal/baseEvery.js"(exports, module2) {
    var baseEach = require_baseEach();
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection2) {
        result = !!predicate(value, index, collection2);
        return result;
      });
      return result;
    }
    module2.exports = baseEvery;
  }
});

// node_modules/lodash/collection/every.js
var require_every = __commonJS({
  "node_modules/lodash/collection/every.js"(exports, module2) {
    var arrayEvery = require_arrayEvery();
    var baseCallback = require_baseCallback();
    var baseEvery = require_baseEvery();
    var isArray = require_isArray();
    var isIterateeCall = require_isIterateeCall();
    function every(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = void 0;
      }
      if (typeof predicate != "function" || thisArg !== void 0) {
        predicate = baseCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }
    module2.exports = every;
  }
});

// node_modules/xmlbuilder/lib/XMLAttribute.js
var require_XMLAttribute = __commonJS({
  "node_modules/xmlbuilder/lib/XMLAttribute.js"(exports, module2) {
    (function() {
      var XMLAttribute, create;
      create = require_create();
      module2.exports = XMLAttribute = function() {
        function XMLAttribute2(parent, name, value) {
          this.stringify = parent.stringify;
          if (name == null) {
            throw new Error("Missing attribute name of element " + parent.name);
          }
          if (value == null) {
            throw new Error("Missing attribute value for attribute " + name + " of element " + parent.name);
          }
          this.name = this.stringify.attName(name);
          this.value = this.stringify.attValue(value);
        }
        XMLAttribute2.prototype.clone = function() {
          return create(XMLAttribute2.prototype, this);
        };
        XMLAttribute2.prototype.toString = function(options, level) {
          return " " + this.name + '="' + this.value + '"';
        };
        return XMLAttribute2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLProcessingInstruction.js
var require_XMLProcessingInstruction = __commonJS({
  "node_modules/xmlbuilder/lib/XMLProcessingInstruction.js"(exports, module2) {
    (function() {
      var XMLProcessingInstruction, create;
      create = require_create();
      module2.exports = XMLProcessingInstruction = function() {
        function XMLProcessingInstruction2(parent, target, value) {
          this.stringify = parent.stringify;
          if (target == null) {
            throw new Error("Missing instruction target");
          }
          this.target = this.stringify.insTarget(target);
          if (value) {
            this.value = this.stringify.insValue(value);
          }
        }
        XMLProcessingInstruction2.prototype.clone = function() {
          return create(XMLProcessingInstruction2.prototype, this);
        };
        XMLProcessingInstruction2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += "<?";
          r += this.target;
          if (this.value) {
            r += " " + this.value;
          }
          r += "?>";
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLProcessingInstruction2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLElement.js
var require_XMLElement = __commonJS({
  "node_modules/xmlbuilder/lib/XMLElement.js"(exports, module2) {
    (function() {
      var XMLAttribute, XMLElement, XMLNode, XMLProcessingInstruction, create, every, isFunction, isObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      create = require_create();
      isObject = require_isObject();
      isFunction = require_isFunction();
      every = require_every();
      XMLNode = require_XMLNode();
      XMLAttribute = require_XMLAttribute();
      XMLProcessingInstruction = require_XMLProcessingInstruction();
      module2.exports = XMLElement = function(superClass) {
        extend(XMLElement2, superClass);
        function XMLElement2(parent, name, attributes) {
          XMLElement2.__super__.constructor.call(this, parent);
          if (name == null) {
            throw new Error("Missing element name");
          }
          this.name = this.stringify.eleName(name);
          this.children = [];
          this.instructions = [];
          this.attributes = {};
          if (attributes != null) {
            this.attribute(attributes);
          }
        }
        XMLElement2.prototype.clone = function() {
          var att, attName, clonedSelf, i, len, pi, ref, ref1;
          clonedSelf = create(XMLElement2.prototype, this);
          if (clonedSelf.isRoot) {
            clonedSelf.documentObject = null;
          }
          clonedSelf.attributes = {};
          ref = this.attributes;
          for (attName in ref) {
            if (!hasProp.call(ref, attName))
              continue;
            att = ref[attName];
            clonedSelf.attributes[attName] = att.clone();
          }
          clonedSelf.instructions = [];
          ref1 = this.instructions;
          for (i = 0, len = ref1.length; i < len; i++) {
            pi = ref1[i];
            clonedSelf.instructions.push(pi.clone());
          }
          clonedSelf.children = [];
          this.children.forEach(function(child) {
            var clonedChild;
            clonedChild = child.clone();
            clonedChild.parent = clonedSelf;
            return clonedSelf.children.push(clonedChild);
          });
          return clonedSelf;
        };
        XMLElement2.prototype.attribute = function(name, value) {
          var attName, attValue;
          if (name != null) {
            name = name.valueOf();
          }
          if (isObject(name)) {
            for (attName in name) {
              if (!hasProp.call(name, attName))
                continue;
              attValue = name[attName];
              this.attribute(attName, attValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            if (!this.options.skipNullAttributes || value != null) {
              this.attributes[name] = new XMLAttribute(this, name, value);
            }
          }
          return this;
        };
        XMLElement2.prototype.removeAttribute = function(name) {
          var attName, i, len;
          if (name == null) {
            throw new Error("Missing attribute name");
          }
          name = name.valueOf();
          if (Array.isArray(name)) {
            for (i = 0, len = name.length; i < len; i++) {
              attName = name[i];
              delete this.attributes[attName];
            }
          } else {
            delete this.attributes[name];
          }
          return this;
        };
        XMLElement2.prototype.instruction = function(target, value) {
          var i, insTarget, insValue, instruction, len;
          if (target != null) {
            target = target.valueOf();
          }
          if (value != null) {
            value = value.valueOf();
          }
          if (Array.isArray(target)) {
            for (i = 0, len = target.length; i < len; i++) {
              insTarget = target[i];
              this.instruction(insTarget);
            }
          } else if (isObject(target)) {
            for (insTarget in target) {
              if (!hasProp.call(target, insTarget))
                continue;
              insValue = target[insTarget];
              this.instruction(insTarget, insValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            instruction = new XMLProcessingInstruction(this, target, value);
            this.instructions.push(instruction);
          }
          return this;
        };
        XMLElement2.prototype.toString = function(options, level) {
          var att, child, i, indent, instruction, j, len, len1, name, newline, offset, pretty, r, ref, ref1, ref2, ref3, ref4, ref5, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          ref3 = this.instructions;
          for (i = 0, len = ref3.length; i < len; i++) {
            instruction = ref3[i];
            r += instruction.toString(options, level);
          }
          if (pretty) {
            r += space;
          }
          r += "<" + this.name;
          ref4 = this.attributes;
          for (name in ref4) {
            if (!hasProp.call(ref4, name))
              continue;
            att = ref4[name];
            r += att.toString(options);
          }
          if (this.children.length === 0 || every(this.children, function(e) {
            return e.value === "";
          })) {
            r += "/>";
            if (pretty) {
              r += newline;
            }
          } else if (pretty && this.children.length === 1 && this.children[0].value != null) {
            r += ">";
            r += this.children[0].value;
            r += "</" + this.name + ">";
            r += newline;
          } else {
            r += ">";
            if (pretty) {
              r += newline;
            }
            ref5 = this.children;
            for (j = 0, len1 = ref5.length; j < len1; j++) {
              child = ref5[j];
              r += child.toString(options, level + 1);
            }
            if (pretty) {
              r += space;
            }
            r += "</" + this.name + ">";
            if (pretty) {
              r += newline;
            }
          }
          return r;
        };
        XMLElement2.prototype.att = function(name, value) {
          return this.attribute(name, value);
        };
        XMLElement2.prototype.ins = function(target, value) {
          return this.instruction(target, value);
        };
        XMLElement2.prototype.a = function(name, value) {
          return this.attribute(name, value);
        };
        XMLElement2.prototype.i = function(target, value) {
          return this.instruction(target, value);
        };
        return XMLElement2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLCData.js
var require_XMLCData = __commonJS({
  "node_modules/xmlbuilder/lib/XMLCData.js"(exports, module2) {
    (function() {
      var XMLCData, XMLNode, create, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      create = require_create();
      XMLNode = require_XMLNode();
      module2.exports = XMLCData = function(superClass) {
        extend(XMLCData2, superClass);
        function XMLCData2(parent, text) {
          XMLCData2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing CDATA text");
          }
          this.text = this.stringify.cdata(text);
        }
        XMLCData2.prototype.clone = function() {
          return create(XMLCData2.prototype, this);
        };
        XMLCData2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += "<![CDATA[" + this.text + "]]>";
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLCData2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLComment.js
var require_XMLComment = __commonJS({
  "node_modules/xmlbuilder/lib/XMLComment.js"(exports, module2) {
    (function() {
      var XMLComment, XMLNode, create, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      create = require_create();
      XMLNode = require_XMLNode();
      module2.exports = XMLComment = function(superClass) {
        extend(XMLComment2, superClass);
        function XMLComment2(parent, text) {
          XMLComment2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing comment text");
          }
          this.text = this.stringify.comment(text);
        }
        XMLComment2.prototype.clone = function() {
          return create(XMLComment2.prototype, this);
        };
        XMLComment2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += "<!-- " + this.text + " -->";
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLComment2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDAttList.js
var require_XMLDTDAttList = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDAttList.js"(exports, module2) {
    (function() {
      var XMLDTDAttList, create;
      create = require_create();
      module2.exports = XMLDTDAttList = function() {
        function XMLDTDAttList2(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          this.stringify = parent.stringify;
          if (elementName == null) {
            throw new Error("Missing DTD element name");
          }
          if (attributeName == null) {
            throw new Error("Missing DTD attribute name");
          }
          if (!attributeType) {
            throw new Error("Missing DTD attribute type");
          }
          if (!defaultValueType) {
            throw new Error("Missing DTD attribute default");
          }
          if (defaultValueType.indexOf("#") !== 0) {
            defaultValueType = "#" + defaultValueType;
          }
          if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
            throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");
          }
          if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
            throw new Error("Default value only applies to #FIXED or #DEFAULT");
          }
          this.elementName = this.stringify.eleName(elementName);
          this.attributeName = this.stringify.attName(attributeName);
          this.attributeType = this.stringify.dtdAttType(attributeType);
          this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
          this.defaultValueType = defaultValueType;
        }
        XMLDTDAttList2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += "<!ATTLIST " + this.elementName + " " + this.attributeName + " " + this.attributeType;
          if (this.defaultValueType !== "#DEFAULT") {
            r += " " + this.defaultValueType;
          }
          if (this.defaultValue) {
            r += ' "' + this.defaultValue + '"';
          }
          r += ">";
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLDTDAttList2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDEntity.js
var require_XMLDTDEntity = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDEntity.js"(exports, module2) {
    (function() {
      var XMLDTDEntity, create, isObject;
      create = require_create();
      isObject = require_isObject();
      module2.exports = XMLDTDEntity = function() {
        function XMLDTDEntity2(parent, pe, name, value) {
          this.stringify = parent.stringify;
          if (name == null) {
            throw new Error("Missing entity name");
          }
          if (value == null) {
            throw new Error("Missing entity value");
          }
          this.pe = !!pe;
          this.name = this.stringify.eleName(name);
          if (!isObject(value)) {
            this.value = this.stringify.dtdEntityValue(value);
          } else {
            if (!value.pubID && !value.sysID) {
              throw new Error("Public and/or system identifiers are required for an external entity");
            }
            if (value.pubID && !value.sysID) {
              throw new Error("System identifier is required for a public external entity");
            }
            if (value.pubID != null) {
              this.pubID = this.stringify.dtdPubID(value.pubID);
            }
            if (value.sysID != null) {
              this.sysID = this.stringify.dtdSysID(value.sysID);
            }
            if (value.nData != null) {
              this.nData = this.stringify.dtdNData(value.nData);
            }
            if (this.pe && this.nData) {
              throw new Error("Notation declaration is not allowed in a parameter entity");
            }
          }
        }
        XMLDTDEntity2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += "<!ENTITY";
          if (this.pe) {
            r += " %";
          }
          r += " " + this.name;
          if (this.value) {
            r += ' "' + this.value + '"';
          } else {
            if (this.pubID && this.sysID) {
              r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
            } else if (this.sysID) {
              r += ' SYSTEM "' + this.sysID + '"';
            }
            if (this.nData) {
              r += " NDATA " + this.nData;
            }
          }
          r += ">";
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLDTDEntity2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDElement.js
var require_XMLDTDElement = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDElement.js"(exports, module2) {
    (function() {
      var XMLDTDElement, create;
      create = require_create();
      module2.exports = XMLDTDElement = function() {
        function XMLDTDElement2(parent, name, value) {
          this.stringify = parent.stringify;
          if (name == null) {
            throw new Error("Missing DTD element name");
          }
          if (!value) {
            value = "(#PCDATA)";
          }
          if (Array.isArray(value)) {
            value = "(" + value.join(",") + ")";
          }
          this.name = this.stringify.eleName(name);
          this.value = this.stringify.dtdElementValue(value);
        }
        XMLDTDElement2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += "<!ELEMENT " + this.name + " " + this.value + ">";
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLDTDElement2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDNotation.js
var require_XMLDTDNotation = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDNotation.js"(exports, module2) {
    (function() {
      var XMLDTDNotation, create;
      create = require_create();
      module2.exports = XMLDTDNotation = function() {
        function XMLDTDNotation2(parent, name, value) {
          this.stringify = parent.stringify;
          if (name == null) {
            throw new Error("Missing notation name");
          }
          if (!value.pubID && !value.sysID) {
            throw new Error("Public or system identifiers are required for an external entity");
          }
          this.name = this.stringify.eleName(name);
          if (value.pubID != null) {
            this.pubID = this.stringify.dtdPubID(value.pubID);
          }
          if (value.sysID != null) {
            this.sysID = this.stringify.dtdSysID(value.sysID);
          }
        }
        XMLDTDNotation2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += "<!NOTATION " + this.name;
          if (this.pubID && this.sysID) {
            r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
          } else if (this.pubID) {
            r += ' PUBLIC "' + this.pubID + '"';
          } else if (this.sysID) {
            r += ' SYSTEM "' + this.sysID + '"';
          }
          r += ">";
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLDTDNotation2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDocType.js
var require_XMLDocType = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDocType.js"(exports, module2) {
    (function() {
      var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLProcessingInstruction, create, isObject;
      create = require_create();
      isObject = require_isObject();
      XMLCData = require_XMLCData();
      XMLComment = require_XMLComment();
      XMLDTDAttList = require_XMLDTDAttList();
      XMLDTDEntity = require_XMLDTDEntity();
      XMLDTDElement = require_XMLDTDElement();
      XMLDTDNotation = require_XMLDTDNotation();
      XMLProcessingInstruction = require_XMLProcessingInstruction();
      module2.exports = XMLDocType = function() {
        function XMLDocType2(parent, pubID, sysID) {
          var ref, ref1;
          this.documentObject = parent;
          this.stringify = this.documentObject.stringify;
          this.children = [];
          if (isObject(pubID)) {
            ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
          }
          if (sysID == null) {
            ref1 = [pubID, sysID], sysID = ref1[0], pubID = ref1[1];
          }
          if (pubID != null) {
            this.pubID = this.stringify.dtdPubID(pubID);
          }
          if (sysID != null) {
            this.sysID = this.stringify.dtdSysID(sysID);
          }
        }
        XMLDocType2.prototype.element = function(name, value) {
          var child;
          child = new XMLDTDElement(this, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          var child;
          child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.entity = function(name, value) {
          var child;
          child = new XMLDTDEntity(this, false, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.pEntity = function(name, value) {
          var child;
          child = new XMLDTDEntity(this, true, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.notation = function(name, value) {
          var child;
          child = new XMLDTDNotation(this, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.cdata = function(value) {
          var child;
          child = new XMLCData(this, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.comment = function(value) {
          var child;
          child = new XMLComment(this, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.instruction = function(target, value) {
          var child;
          child = new XMLProcessingInstruction(this, target, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.root = function() {
          return this.documentObject.root();
        };
        XMLDocType2.prototype.document = function() {
          return this.documentObject;
        };
        XMLDocType2.prototype.toString = function(options, level) {
          var child, i, indent, len, newline, offset, pretty, r, ref, ref1, ref2, ref3, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += "<!DOCTYPE " + this.root().name;
          if (this.pubID && this.sysID) {
            r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
          } else if (this.sysID) {
            r += ' SYSTEM "' + this.sysID + '"';
          }
          if (this.children.length > 0) {
            r += " [";
            if (pretty) {
              r += newline;
            }
            ref3 = this.children;
            for (i = 0, len = ref3.length; i < len; i++) {
              child = ref3[i];
              r += child.toString(options, level + 1);
            }
            r += "]";
          }
          r += ">";
          if (pretty) {
            r += newline;
          }
          return r;
        };
        XMLDocType2.prototype.ele = function(name, value) {
          return this.element(name, value);
        };
        XMLDocType2.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
        };
        XMLDocType2.prototype.ent = function(name, value) {
          return this.entity(name, value);
        };
        XMLDocType2.prototype.pent = function(name, value) {
          return this.pEntity(name, value);
        };
        XMLDocType2.prototype.not = function(name, value) {
          return this.notation(name, value);
        };
        XMLDocType2.prototype.dat = function(value) {
          return this.cdata(value);
        };
        XMLDocType2.prototype.com = function(value) {
          return this.comment(value);
        };
        XMLDocType2.prototype.ins = function(target, value) {
          return this.instruction(target, value);
        };
        XMLDocType2.prototype.up = function() {
          return this.root();
        };
        XMLDocType2.prototype.doc = function() {
          return this.document();
        };
        return XMLDocType2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLRaw.js
var require_XMLRaw = __commonJS({
  "node_modules/xmlbuilder/lib/XMLRaw.js"(exports, module2) {
    (function() {
      var XMLNode, XMLRaw, create, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      create = require_create();
      XMLNode = require_XMLNode();
      module2.exports = XMLRaw = function(superClass) {
        extend(XMLRaw2, superClass);
        function XMLRaw2(parent, text) {
          XMLRaw2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing raw text");
          }
          this.value = this.stringify.raw(text);
        }
        XMLRaw2.prototype.clone = function() {
          return create(XMLRaw2.prototype, this);
        };
        XMLRaw2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += this.value;
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLRaw2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLText.js
var require_XMLText = __commonJS({
  "node_modules/xmlbuilder/lib/XMLText.js"(exports, module2) {
    (function() {
      var XMLNode, XMLText, create, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      create = require_create();
      XMLNode = require_XMLNode();
      module2.exports = XMLText = function(superClass) {
        extend(XMLText2, superClass);
        function XMLText2(parent, text) {
          XMLText2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing element text");
          }
          this.value = this.stringify.eleText(text);
        }
        XMLText2.prototype.clone = function() {
          return create(XMLText2.prototype, this);
        };
        XMLText2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += this.value;
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLText2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLNode.js
var require_XMLNode = __commonJS({
  "node_modules/xmlbuilder/lib/XMLNode.js"(exports, module2) {
    (function() {
      var XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLElement, XMLNode, XMLRaw, XMLText, isEmpty, isFunction, isObject, hasProp = {}.hasOwnProperty;
      isObject = require_isObject();
      isFunction = require_isFunction();
      isEmpty = require_isEmpty();
      XMLElement = null;
      XMLCData = null;
      XMLComment = null;
      XMLDeclaration = null;
      XMLDocType = null;
      XMLRaw = null;
      XMLText = null;
      module2.exports = XMLNode = function() {
        function XMLNode2(parent) {
          this.parent = parent;
          this.options = this.parent.options;
          this.stringify = this.parent.stringify;
          if (XMLElement === null) {
            XMLElement = require_XMLElement();
            XMLCData = require_XMLCData();
            XMLComment = require_XMLComment();
            XMLDeclaration = require_XMLDeclaration();
            XMLDocType = require_XMLDocType();
            XMLRaw = require_XMLRaw();
            XMLText = require_XMLText();
          }
        }
        XMLNode2.prototype.element = function(name, attributes, text) {
          var childNode, item, j, k, key, lastChild, len, len1, ref, val;
          lastChild = null;
          if (attributes == null) {
            attributes = {};
          }
          attributes = attributes.valueOf();
          if (!isObject(attributes)) {
            ref = [attributes, text], text = ref[0], attributes = ref[1];
          }
          if (name != null) {
            name = name.valueOf();
          }
          if (Array.isArray(name)) {
            for (j = 0, len = name.length; j < len; j++) {
              item = name[j];
              lastChild = this.element(item);
            }
          } else if (isFunction(name)) {
            lastChild = this.element(name.apply());
          } else if (isObject(name)) {
            for (key in name) {
              if (!hasProp.call(name, key))
                continue;
              val = name[key];
              if (isFunction(val)) {
                val = val.apply();
              }
              if (isObject(val) && isEmpty(val)) {
                val = null;
              }
              if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
                lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
              } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && key.indexOf(this.stringify.convertPIKey) === 0) {
                lastChild = this.instruction(key.substr(this.stringify.convertPIKey.length), val);
              } else if (Array.isArray(val)) {
                for (k = 0, len1 = val.length; k < len1; k++) {
                  item = val[k];
                  childNode = {};
                  childNode[key] = item;
                  lastChild = this.element(childNode);
                }
              } else if (isObject(val)) {
                lastChild = this.element(key);
                lastChild.element(val);
              } else {
                lastChild = this.element(key, val);
              }
            }
          } else {
            if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
              lastChild = this.text(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
              lastChild = this.cdata(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
              lastChild = this.comment(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
              lastChild = this.raw(text);
            } else {
              lastChild = this.node(name, attributes, text);
            }
          }
          if (lastChild == null) {
            throw new Error("Could not create any elements with: " + name);
          }
          return lastChild;
        };
        XMLNode2.prototype.insertBefore = function(name, attributes, text) {
          var child, i, removed;
          if (this.isRoot) {
            throw new Error("Cannot insert elements at root level");
          }
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i);
          child = this.parent.element(name, attributes, text);
          Array.prototype.push.apply(this.parent.children, removed);
          return child;
        };
        XMLNode2.prototype.insertAfter = function(name, attributes, text) {
          var child, i, removed;
          if (this.isRoot) {
            throw new Error("Cannot insert elements at root level");
          }
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          child = this.parent.element(name, attributes, text);
          Array.prototype.push.apply(this.parent.children, removed);
          return child;
        };
        XMLNode2.prototype.remove = function() {
          var i, ref;
          if (this.isRoot) {
            throw new Error("Cannot remove the root element");
          }
          i = this.parent.children.indexOf(this);
          [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref = [])), ref;
          return this.parent;
        };
        XMLNode2.prototype.node = function(name, attributes, text) {
          var child, ref;
          if (name != null) {
            name = name.valueOf();
          }
          if (attributes == null) {
            attributes = {};
          }
          attributes = attributes.valueOf();
          if (!isObject(attributes)) {
            ref = [attributes, text], text = ref[0], attributes = ref[1];
          }
          child = new XMLElement(this, name, attributes);
          if (text != null) {
            child.text(text);
          }
          this.children.push(child);
          return child;
        };
        XMLNode2.prototype.text = function(value) {
          var child;
          child = new XMLText(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.cdata = function(value) {
          var child;
          child = new XMLCData(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.comment = function(value) {
          var child;
          child = new XMLComment(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.raw = function(value) {
          var child;
          child = new XMLRaw(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.declaration = function(version, encoding, standalone) {
          var doc, xmldec;
          doc = this.document();
          xmldec = new XMLDeclaration(doc, version, encoding, standalone);
          doc.xmldec = xmldec;
          return doc.root();
        };
        XMLNode2.prototype.doctype = function(pubID, sysID) {
          var doc, doctype;
          doc = this.document();
          doctype = new XMLDocType(doc, pubID, sysID);
          doc.doctype = doctype;
          return doctype;
        };
        XMLNode2.prototype.up = function() {
          if (this.isRoot) {
            throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
          }
          return this.parent;
        };
        XMLNode2.prototype.root = function() {
          var child;
          if (this.isRoot) {
            return this;
          }
          child = this.parent;
          while (!child.isRoot) {
            child = child.parent;
          }
          return child;
        };
        XMLNode2.prototype.document = function() {
          return this.root().documentObject;
        };
        XMLNode2.prototype.end = function(options) {
          return this.document().toString(options);
        };
        XMLNode2.prototype.prev = function() {
          var i;
          if (this.isRoot) {
            throw new Error("Root node has no siblings");
          }
          i = this.parent.children.indexOf(this);
          if (i < 1) {
            throw new Error("Already at the first node");
          }
          return this.parent.children[i - 1];
        };
        XMLNode2.prototype.next = function() {
          var i;
          if (this.isRoot) {
            throw new Error("Root node has no siblings");
          }
          i = this.parent.children.indexOf(this);
          if (i === -1 || i === this.parent.children.length - 1) {
            throw new Error("Already at the last node");
          }
          return this.parent.children[i + 1];
        };
        XMLNode2.prototype.importXMLBuilder = function(xmlbuilder) {
          var clonedRoot;
          clonedRoot = xmlbuilder.root().clone();
          clonedRoot.parent = this;
          clonedRoot.isRoot = false;
          this.children.push(clonedRoot);
          return this;
        };
        XMLNode2.prototype.ele = function(name, attributes, text) {
          return this.element(name, attributes, text);
        };
        XMLNode2.prototype.nod = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLNode2.prototype.txt = function(value) {
          return this.text(value);
        };
        XMLNode2.prototype.dat = function(value) {
          return this.cdata(value);
        };
        XMLNode2.prototype.com = function(value) {
          return this.comment(value);
        };
        XMLNode2.prototype.doc = function() {
          return this.document();
        };
        XMLNode2.prototype.dec = function(version, encoding, standalone) {
          return this.declaration(version, encoding, standalone);
        };
        XMLNode2.prototype.dtd = function(pubID, sysID) {
          return this.doctype(pubID, sysID);
        };
        XMLNode2.prototype.e = function(name, attributes, text) {
          return this.element(name, attributes, text);
        };
        XMLNode2.prototype.n = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLNode2.prototype.t = function(value) {
          return this.text(value);
        };
        XMLNode2.prototype.d = function(value) {
          return this.cdata(value);
        };
        XMLNode2.prototype.c = function(value) {
          return this.comment(value);
        };
        XMLNode2.prototype.r = function(value) {
          return this.raw(value);
        };
        XMLNode2.prototype.u = function() {
          return this.up();
        };
        return XMLNode2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDeclaration.js
var require_XMLDeclaration = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDeclaration.js"(exports, module2) {
    (function() {
      var XMLDeclaration, XMLNode, create, isObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      create = require_create();
      isObject = require_isObject();
      XMLNode = require_XMLNode();
      module2.exports = XMLDeclaration = function(superClass) {
        extend(XMLDeclaration2, superClass);
        function XMLDeclaration2(parent, version, encoding, standalone) {
          var ref;
          XMLDeclaration2.__super__.constructor.call(this, parent);
          if (isObject(version)) {
            ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
          }
          if (!version) {
            version = "1.0";
          }
          this.version = this.stringify.xmlVersion(version);
          if (encoding != null) {
            this.encoding = this.stringify.xmlEncoding(encoding);
          }
          if (standalone != null) {
            this.standalone = this.stringify.xmlStandalone(standalone);
          }
        }
        XMLDeclaration2.prototype.toString = function(options, level) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          level || (level = 0);
          space = new Array(level + offset + 1).join(indent);
          r = "";
          if (pretty) {
            r += space;
          }
          r += "<?xml";
          r += ' version="' + this.version + '"';
          if (this.encoding != null) {
            r += ' encoding="' + this.encoding + '"';
          }
          if (this.standalone != null) {
            r += ' standalone="' + this.standalone + '"';
          }
          r += "?>";
          if (pretty) {
            r += newline;
          }
          return r;
        };
        return XMLDeclaration2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLBuilder.js
var require_XMLBuilder = __commonJS({
  "node_modules/xmlbuilder/lib/XMLBuilder.js"(exports, module2) {
    (function() {
      var XMLBuilder, XMLDeclaration, XMLDocType, XMLElement, XMLStringifier;
      XMLStringifier = require_XMLStringifier();
      XMLDeclaration = require_XMLDeclaration();
      XMLDocType = require_XMLDocType();
      XMLElement = require_XMLElement();
      module2.exports = XMLBuilder = function() {
        function XMLBuilder2(name, options) {
          var root, temp;
          if (name == null) {
            throw new Error("Root element needs a name");
          }
          if (options == null) {
            options = {};
          }
          this.options = options;
          this.stringify = new XMLStringifier(options);
          temp = new XMLElement(this, "doc");
          root = temp.element(name);
          root.isRoot = true;
          root.documentObject = this;
          this.rootObject = root;
          if (!options.headless) {
            root.declaration(options);
            if (options.pubID != null || options.sysID != null) {
              root.doctype(options);
            }
          }
        }
        XMLBuilder2.prototype.root = function() {
          return this.rootObject;
        };
        XMLBuilder2.prototype.end = function(options) {
          return this.toString(options);
        };
        XMLBuilder2.prototype.toString = function(options) {
          var indent, newline, offset, pretty, r, ref, ref1, ref2;
          pretty = (options != null ? options.pretty : void 0) || false;
          indent = (ref = options != null ? options.indent : void 0) != null ? ref : "  ";
          offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
          newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : "\n";
          r = "";
          if (this.xmldec != null) {
            r += this.xmldec.toString(options);
          }
          if (this.doctype != null) {
            r += this.doctype.toString(options);
          }
          r += this.rootObject.toString(options);
          if (pretty && r.slice(-newline.length) === newline) {
            r = r.slice(0, -newline.length);
          }
          return r;
        };
        return XMLBuilder2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/xmlbuilder/lib/index.js"(exports, module2) {
    (function() {
      var XMLBuilder, assign;
      assign = require_assign2();
      XMLBuilder = require_XMLBuilder();
      module2.exports.create = function(name, xmldec, doctype, options) {
        options = assign({}, xmldec, doctype, options);
        return new XMLBuilder(name, options).root();
      };
    }).call(exports);
  }
});

// node_modules/plist/lib/build.js
var require_build = __commonJS({
  "node_modules/plist/lib/build.js"(exports) {
    var base64 = require_b64();
    var xmlbuilder = require_lib2();
    exports.build = build;
    function ISODateString(d) {
      function pad(n) {
        return n < 10 ? "0" + n : n;
      }
      return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
    }
    var toString = Object.prototype.toString;
    function type(obj) {
      var m = toString.call(obj).match(/\[object (.*)\]/);
      return m ? m[1] : m;
    }
    function build(obj, opts) {
      var XMLHDR = {
        version: "1.0",
        encoding: "UTF-8"
      };
      var XMLDTD = {
        pubid: "-//Apple//DTD PLIST 1.0//EN",
        sysid: "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
      };
      var doc = xmlbuilder.create("plist");
      doc.dec(XMLHDR.version, XMLHDR.encoding, XMLHDR.standalone);
      doc.dtd(XMLDTD.pubid, XMLDTD.sysid);
      doc.att("version", "1.0");
      walk_obj(obj, doc);
      if (!opts)
        opts = {};
      opts.pretty = opts.pretty !== false;
      return doc.end(opts);
    }
    function walk_obj(next, next_child) {
      var tag_type, i, prop;
      var name = type(next);
      if (name == "Undefined") {
        return;
      } else if (Array.isArray(next)) {
        next_child = next_child.ele("array");
        for (i = 0; i < next.length; i++) {
          walk_obj(next[i], next_child);
        }
      } else if (Buffer.isBuffer(next)) {
        next_child.ele("data").raw(next.toString("base64"));
      } else if (name == "Object") {
        next_child = next_child.ele("dict");
        for (prop in next) {
          if (next.hasOwnProperty(prop)) {
            next_child.ele("key").txt(prop);
            walk_obj(next[prop], next_child);
          }
        }
      } else if (name == "Number") {
        tag_type = next % 1 === 0 ? "integer" : "real";
        next_child.ele(tag_type).txt(next.toString());
      } else if (name == "Date") {
        next_child.ele("date").txt(ISODateString(new Date(next)));
      } else if (name == "Boolean") {
        next_child.ele(next ? "true" : "false");
      } else if (name == "String") {
        next_child.ele("string").txt(next);
      } else if (name == "ArrayBuffer") {
        next_child.ele("data").raw(base64.fromByteArray(next));
      } else if (next && next.buffer && type(next.buffer) == "ArrayBuffer") {
        next_child.ele("data").raw(base64.fromByteArray(new Uint8Array(next.buffer), next_child));
      }
    }
  }
});

// node_modules/plist/lib/node.js
var require_node2 = __commonJS({
  "node_modules/plist/lib/node.js"(exports) {
    var fs2 = require("fs");
    var parse = require_parse();
    var deprecate = require_node();
    exports.parseFile = deprecate(parseFile, "`parseFile()` is deprecated. Use `parseString()` instead.");
    exports.parseFileSync = deprecate(parseFileSync, "`parseFileSync()` is deprecated. Use `parseStringSync()` instead.");
    function parseFile(filename, fn) {
      fs2.readFile(filename, { encoding: "utf8" }, onread);
      function onread(err, inxml) {
        if (err)
          return fn(err);
        parse.parseString(inxml, fn);
      }
    }
    function parseFileSync(filename) {
      var inxml = fs2.readFileSync(filename, "utf8");
      return parse.parseStringSync(inxml);
    }
  }
});

// node_modules/plist/lib/plist.js
var require_plist = __commonJS({
  "node_modules/plist/lib/plist.js"(exports) {
    var i;
    var parserFunctions = require_parse();
    for (i in parserFunctions)
      exports[i] = parserFunctions[i];
    var builderFunctions = require_build();
    for (i in builderFunctions)
      exports[i] = builderFunctions[i];
    var nodeFunctions = require_node2();
    for (i in nodeFunctions)
      exports[i] = nodeFunctions[i];
  }
});

// node_modules/bplist-parser/bplistParser.js
var require_bplistParser = __commonJS({
  "node_modules/bplist-parser/bplistParser.js"(exports) {
    "use strict";
    var fs2 = require("fs");
    var debug = false;
    exports.maxObjectSize = 100 * 1e3 * 1e3;
    exports.maxObjectCount = 32768;
    var EPOCH = 9783072e5;
    var parseFile = exports.parseFile = function(fileNameOrBuffer, callback) {
      function tryParseBuffer(buffer) {
        var err = null;
        var result;
        try {
          result = parseBuffer(buffer);
        } catch (ex) {
          err = ex;
        }
        callback(err, result);
      }
      if (Buffer.isBuffer(fileNameOrBuffer)) {
        return tryParseBuffer(fileNameOrBuffer);
      } else {
        fs2.readFile(fileNameOrBuffer, function(err, data) {
          if (err) {
            return callback(err);
          }
          tryParseBuffer(data);
        });
      }
    };
    var parseBuffer = exports.parseBuffer = function(buffer) {
      var result = {};
      var header = buffer.slice(0, "bplist".length).toString("utf8");
      if (header !== "bplist") {
        throw new Error("Invalid binary plist. Expected 'bplist' at offset 0.");
      }
      var trailer = buffer.slice(buffer.length - 32, buffer.length);
      var offsetSize = trailer.readUInt8(6);
      if (debug) {
        console.log("offsetSize: " + offsetSize);
      }
      var objectRefSize = trailer.readUInt8(7);
      if (debug) {
        console.log("objectRefSize: " + objectRefSize);
      }
      var numObjects = readUInt64BE(trailer, 8);
      if (debug) {
        console.log("numObjects: " + numObjects);
      }
      var topObject = readUInt64BE(trailer, 16);
      if (debug) {
        console.log("topObject: " + topObject);
      }
      var offsetTableOffset = readUInt64BE(trailer, 24);
      if (debug) {
        console.log("offsetTableOffset: " + offsetTableOffset);
      }
      if (numObjects > exports.maxObjectCount) {
        throw new Error("maxObjectCount exceeded");
      }
      var offsetTable = [];
      for (var i = 0; i < numObjects; i++) {
        var offsetBytes = buffer.slice(offsetTableOffset + i * offsetSize, offsetTableOffset + (i + 1) * offsetSize);
        offsetTable[i] = readUInt(offsetBytes, 0);
        if (debug) {
          console.log("Offset for Object #" + i + " is " + offsetTable[i] + " [" + offsetTable[i].toString(16) + "]");
        }
      }
      function parseObject(tableOffset) {
        var offset = offsetTable[tableOffset];
        var type = buffer[offset];
        var objType = (type & 240) >> 4;
        var objInfo = type & 15;
        switch (objType) {
          case 0:
            return parseSimple();
          case 1:
            return parseInteger();
          case 8:
            return parseUID();
          case 2:
            return parseReal();
          case 3:
            return parseDate();
          case 4:
            return parseData();
          case 5:
            return parsePlistString();
          case 6:
            return parsePlistString(true);
          case 10:
            return parseArray();
          case 13:
            return parseDictionary();
          default:
            throw new Error("Unhandled type 0x" + objType.toString(16));
        }
        function parseSimple() {
          switch (objInfo) {
            case 0:
              return null;
            case 8:
              return false;
            case 9:
              return true;
            case 15:
              return null;
            default:
              throw new Error("Unhandled simple type 0x" + objType.toString(16));
          }
        }
        function parseInteger() {
          var length = Math.pow(2, objInfo);
          if (length < exports.maxObjectSize) {
            return readUInt(buffer.slice(offset + 1, offset + 1 + length));
          } else {
            throw new Error("To little heap space available! Wanted to read " + length + " bytes, but only " + exports.maxObjectSize + " are available.");
          }
        }
        function parseUID() {
          var length = objInfo + 1;
          if (length < exports.maxObjectSize) {
            return readUInt(buffer.slice(offset + 1, offset + 1 + length));
          } else {
            throw new Error("To little heap space available! Wanted to read " + length + " bytes, but only " + exports.maxObjectSize + " are available.");
          }
        }
        function parseReal() {
          var length = Math.pow(2, objInfo);
          if (length < exports.maxObjectSize) {
            var realBuffer = buffer.slice(offset + 1, offset + 1 + length);
            if (length === 4) {
              return realBuffer.readFloatBE(0);
            } else if (length === 8) {
              return realBuffer.readDoubleBE(0);
            }
          } else {
            throw new Error("To little heap space available! Wanted to read " + length + " bytes, but only " + exports.maxObjectSize + " are available.");
          }
        }
        function parseDate() {
          if (objInfo != 3) {
            console.error("Unknown date type :" + objInfo + ". Parsing anyway...");
          }
          var dateBuffer = buffer.slice(offset + 1, offset + 9);
          return new Date(EPOCH + 1e3 * dateBuffer.readDoubleBE(0));
        }
        function parseData() {
          var dataoffset = 1;
          var length = objInfo;
          if (objInfo == 15) {
            var int_type = buffer[offset + 1];
            var intType = (int_type & 240) / 16;
            if (intType != 1) {
              console.error("0x4: UNEXPECTED LENGTH-INT TYPE! " + intType);
            }
            var intInfo = int_type & 15;
            var intLength = Math.pow(2, intInfo);
            dataoffset = 2 + intLength;
            if (intLength < 3) {
              length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
            } else {
              length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
            }
          }
          if (length < exports.maxObjectSize) {
            return buffer.slice(offset + dataoffset, offset + dataoffset + length);
          } else {
            throw new Error("To little heap space available! Wanted to read " + length + " bytes, but only " + exports.maxObjectSize + " are available.");
          }
        }
        function parsePlistString(isUtf16) {
          isUtf16 = isUtf16 || 0;
          var enc = "utf8";
          var length = objInfo;
          var stroffset = 1;
          if (objInfo == 15) {
            var int_type = buffer[offset + 1];
            var intType = (int_type & 240) / 16;
            if (intType != 1) {
              console.err("UNEXPECTED LENGTH-INT TYPE! " + intType);
            }
            var intInfo = int_type & 15;
            var intLength = Math.pow(2, intInfo);
            var stroffset = 2 + intLength;
            if (intLength < 3) {
              length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
            } else {
              length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
            }
          }
          length *= isUtf16 + 1;
          if (length < exports.maxObjectSize) {
            var plistString = buffer.slice(offset + stroffset, offset + stroffset + length);
            if (isUtf16) {
              plistString = swapBytes(plistString);
              enc = "ucs2";
            }
            return plistString.toString(enc);
          } else {
            throw new Error("To little heap space available! Wanted to read " + length + " bytes, but only " + exports.maxObjectSize + " are available.");
          }
        }
        function parseArray() {
          var length = objInfo;
          var arrayoffset = 1;
          if (objInfo == 15) {
            var int_type = buffer[offset + 1];
            var intType = (int_type & 240) / 16;
            if (intType != 1) {
              console.error("0xa: UNEXPECTED LENGTH-INT TYPE! " + intType);
            }
            var intInfo = int_type & 15;
            var intLength = Math.pow(2, intInfo);
            arrayoffset = 2 + intLength;
            if (intLength < 3) {
              length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
            } else {
              length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
            }
          }
          if (length * objectRefSize > exports.maxObjectSize) {
            throw new Error("To little heap space available!");
          }
          var array = [];
          for (var i2 = 0; i2 < length; i2++) {
            var objRef = readUInt(buffer.slice(offset + arrayoffset + i2 * objectRefSize, offset + arrayoffset + (i2 + 1) * objectRefSize));
            array[i2] = parseObject(objRef);
          }
          return array;
        }
        function parseDictionary() {
          var length = objInfo;
          var dictoffset = 1;
          if (objInfo == 15) {
            var int_type = buffer[offset + 1];
            var intType = (int_type & 240) / 16;
            if (intType != 1) {
              console.error("0xD: UNEXPECTED LENGTH-INT TYPE! " + intType);
            }
            var intInfo = int_type & 15;
            var intLength = Math.pow(2, intInfo);
            dictoffset = 2 + intLength;
            if (intLength < 3) {
              length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
            } else {
              length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
            }
          }
          if (length * 2 * objectRefSize > exports.maxObjectSize) {
            throw new Error("To little heap space available!");
          }
          if (debug) {
            console.log("Parsing dictionary #" + tableOffset);
          }
          var dict = {};
          for (var i2 = 0; i2 < length; i2++) {
            var keyRef = readUInt(buffer.slice(offset + dictoffset + i2 * objectRefSize, offset + dictoffset + (i2 + 1) * objectRefSize));
            var valRef = readUInt(buffer.slice(offset + dictoffset + length * objectRefSize + i2 * objectRefSize, offset + dictoffset + length * objectRefSize + (i2 + 1) * objectRefSize));
            var key = parseObject(keyRef);
            var val = parseObject(valRef);
            if (debug) {
              console.log("  DICT #" + tableOffset + ": Mapped " + key + " to " + val);
            }
            dict[key] = val;
          }
          return dict;
        }
      }
      return [parseObject(topObject)];
    };
    function readUInt(buffer, start) {
      start = start || 0;
      var l = 0;
      for (var i = start; i < buffer.length; i++) {
        l <<= 8;
        l |= buffer[i] & 255;
      }
      return l;
    }
    function readUInt64BE(buffer, start) {
      var data = buffer.slice(start, start + 8);
      return data.readUInt32BE(4, 8);
    }
    function swapBytes(buffer) {
      var len = buffer.length;
      for (var i = 0; i < len; i += 2) {
        var a = buffer[i];
        buffer[i] = buffer[i + 1];
        buffer[i + 1] = a;
      }
      return buffer;
    }
  }
});

// node_modules/stream-buffers/lib/constants.js
var require_constants = __commonJS({
  "node_modules/stream-buffers/lib/constants.js"(exports, module2) {
    module2.exports = {
      DEFAULT_INITIAL_SIZE: 8 * 1024,
      DEFAULT_INCREMENT_AMOUNT: 8 * 1024,
      DEFAULT_FREQUENCY: 1,
      DEFAULT_CHUNK_SIZE: 1024
    };
  }
});

// node_modules/stream-buffers/lib/readable_streambuffer.js
var require_readable_streambuffer = __commonJS({
  "node_modules/stream-buffers/lib/readable_streambuffer.js"(exports, module2) {
    var stream = require("stream");
    var constants = require_constants();
    var util = require("util");
    var ReadableStreamBuffer = module2.exports = function(opts) {
      var that = this;
      stream.Stream.call(this);
      opts = opts || {};
      var frequency = opts.hasOwnProperty("frequency") ? opts.frequency : constants.DEFAULT_FREQUENCY;
      var chunkSize = opts.chunkSize || constants.DEFAULT_CHUNK_SIZE;
      var initialSize = opts.initialSize || constants.DEFAULT_INITIAL_SIZE;
      var incrementAmount = opts.incrementAmount || constants.DEFAULT_INCREMENT_AMOUNT;
      var size = 0;
      var buffer = new Buffer(initialSize);
      var encoding = null;
      this.readable = true;
      this.writable = false;
      var sendData = function() {
        var amount = Math.min(chunkSize, size);
        if (amount > 0) {
          var chunk = null;
          if (encoding) {
            chunk = buffer.toString(encoding, 0, amount);
          } else {
            chunk = new Buffer(amount);
            buffer.copy(chunk, 0, 0, amount);
          }
          that.emit("data", chunk);
          if (amount < buffer.length)
            buffer.copy(buffer, 0, amount, size);
          size -= amount;
        }
        if (size === 0 && !that.readable) {
          that.emit("end");
          that.emit("close");
          if (sendData && sendData.interval) {
            clearInterval(sendData.interval);
            sendData.interval = null;
          }
        }
      };
      this.size = function() {
        return size;
      };
      this.maxSize = function() {
        return buffer.length;
      };
      var increaseBufferIfNecessary = function(incomingDataSize) {
        if (buffer.length - size < incomingDataSize) {
          var factor = Math.ceil((incomingDataSize - (buffer.length - size)) / incrementAmount);
          var newBuffer = new Buffer(buffer.length + incrementAmount * factor);
          buffer.copy(newBuffer, 0, 0, size);
          buffer = newBuffer;
        }
      };
      this.put = function(data, encoding2) {
        if (!that.readable)
          return;
        var wasEmpty = size === 0;
        if (Buffer.isBuffer(data)) {
          increaseBufferIfNecessary(data.length);
          data.copy(buffer, size, 0);
          size += data.length;
        } else {
          data = data + "";
          var dataSizeInBytes = Buffer.byteLength(data);
          increaseBufferIfNecessary(dataSizeInBytes);
          buffer.write(data, size, encoding2 || "utf8");
          size += dataSizeInBytes;
        }
        if (wasEmpty && size > 0) {
          this.emit("readable");
        }
        if (!this.isPaused && !frequency) {
          while (size > 0) {
            sendData();
          }
        }
      };
      this.pause = function() {
        this.isPaused = true;
        if (sendData && sendData.interval) {
          clearInterval(sendData.interval);
          delete sendData.interval;
        }
      };
      this.resume = function() {
        this.isPaused = false;
        if (sendData && !sendData.interval && frequency > 0) {
          sendData.interval = setInterval(sendData, frequency);
        }
      };
      this.destroy = function() {
        that.emit("end");
        if (sendData.interval)
          clearInterval(sendData.interval);
        sendData = null;
        that.readable = false;
        that.emit("close");
      };
      this.destroySoon = function() {
        that.readable = false;
        if (!sendData.interval) {
          that.emit("end");
          that.emit("close");
        }
      };
      this.setEncoding = function(_encoding) {
        encoding = _encoding;
      };
      this.resume();
    };
    util.inherits(ReadableStreamBuffer, stream.Stream);
  }
});

// node_modules/stream-buffers/lib/writable_streambuffer.js
var require_writable_streambuffer = __commonJS({
  "node_modules/stream-buffers/lib/writable_streambuffer.js"(exports, module2) {
    var util = require("util");
    var stream = require("stream");
    var constants = require_constants();
    var WritableStreamBuffer = module2.exports = function(opts) {
      var that = this;
      stream.Stream.call(this);
      opts = opts || {};
      var initialSize = opts.initialSize || constants.DEFAULT_INITIAL_SIZE;
      var incrementAmount = opts.incrementAmount || constants.DEFAULT_INCREMENT_AMOUNT;
      var buffer = new Buffer(initialSize);
      var size = 0;
      this.writable = true;
      this.readable = false;
      this.size = function() {
        return size;
      };
      this.maxSize = function() {
        return buffer.length;
      };
      this.getContents = function(length) {
        if (!size)
          return false;
        var data = new Buffer(Math.min(length || size, size));
        buffer.copy(data, 0, 0, data.length);
        if (data.length < size)
          buffer.copy(buffer, 0, data.length);
        size -= data.length;
        return data;
      };
      this.getContentsAsString = function(encoding, length) {
        if (!size)
          return false;
        var data = buffer.toString(encoding || "utf8", 0, Math.min(length || size, size));
        var dataLength = Buffer.byteLength(data);
        if (dataLength < size)
          buffer.copy(buffer, 0, dataLength);
        size -= dataLength;
        return data;
      };
      var increaseBufferIfNecessary = function(incomingDataSize) {
        if (buffer.length - size < incomingDataSize) {
          var factor = Math.ceil((incomingDataSize - (buffer.length - size)) / incrementAmount);
          var newBuffer = new Buffer(buffer.length + incrementAmount * factor);
          buffer.copy(newBuffer, 0, 0, size);
          buffer = newBuffer;
        }
      };
      this.write = function(data, encoding, callback) {
        if (!that.writable)
          return;
        if (Buffer.isBuffer(data)) {
          increaseBufferIfNecessary(data.length);
          data.copy(buffer, size, 0);
          size += data.length;
        } else {
          data = data + "";
          increaseBufferIfNecessary(Buffer.byteLength(data));
          buffer.write(data, size, encoding || "utf8");
          size += Buffer.byteLength(data);
        }
        if (typeof callback === "function") {
          callback();
        }
      };
      this.end = function() {
        var args = Array.prototype.slice.apply(arguments);
        if (args.length)
          that.write.apply(that, args);
        that.emit("finish");
        that.destroy();
      };
      this.destroySoon = this.destroy = function() {
        that.writable = false;
        that.emit("close");
      };
    };
    util.inherits(WritableStreamBuffer, stream.Stream);
  }
});

// node_modules/stream-buffers/lib/streambuffer.js
var require_streambuffer = __commonJS({
  "node_modules/stream-buffers/lib/streambuffer.js"(exports, module2) {
    module2.exports = require_constants();
    module2.exports.ReadableStreamBuffer = require_readable_streambuffer();
    module2.exports.WritableStreamBuffer = require_writable_streambuffer();
  }
});

// node_modules/bplist-creator/bplistCreator.js
var require_bplistCreator = __commonJS({
  "node_modules/bplist-creator/bplistCreator.js"(exports, module2) {
    "use strict";
    var streamBuffers = require_streambuffer();
    var debug = false;
    function Real(value) {
      this.value = value;
    }
    module2.exports = function(dicts) {
      var buffer = new streamBuffers.WritableStreamBuffer();
      buffer.write(new Buffer("bplist00"));
      if (debug) {
        console.log("create", require("util").inspect(dicts, false, 10));
      }
      if (dicts instanceof Array && dicts.length === 1) {
        dicts = dicts[0];
      }
      var entries = toEntries(dicts);
      if (debug) {
        console.log("entries", entries);
      }
      var idSizeInBytes = computeIdSizeInBytes(entries.length);
      var offsets = [];
      var offsetSizeInBytes;
      var offsetTableOffset;
      updateEntryIds();
      entries.forEach(function(entry, entryIdx) {
        offsets[entryIdx] = buffer.size();
        if (!entry) {
          buffer.write(0);
        } else {
          write(entry);
        }
      });
      writeOffsetTable();
      writeTrailer();
      return buffer.getContents();
      function updateEntryIds() {
        var strings = {};
        var entryId = 0;
        entries.forEach(function(entry) {
          if (entry.id) {
            return;
          }
          if (entry.type === "string") {
            if (!entry.bplistOverride && strings.hasOwnProperty(entry.value)) {
              entry.type = "stringref";
              entry.id = strings[entry.value];
            } else {
              strings[entry.value] = entry.id = entryId++;
            }
          } else {
            entry.id = entryId++;
          }
        });
        entries = entries.filter(function(entry) {
          return entry.type !== "stringref";
        });
      }
      function writeTrailer() {
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeTrailer");
        }
        buffer.write(new Buffer([0, 0, 0, 0, 0, 0]));
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeTrailer(offsetSizeInBytes):", offsetSizeInBytes);
        }
        writeByte(offsetSizeInBytes);
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeTrailer(offsetSizeInBytes):", idSizeInBytes);
        }
        writeByte(idSizeInBytes);
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeTrailer(number of objects):", entries.length);
        }
        writeLong(entries.length);
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeTrailer(top object)");
        }
        writeLong(0);
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeTrailer(offset table offset):", offsetTableOffset);
        }
        writeLong(offsetTableOffset);
      }
      function writeOffsetTable() {
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeOffsetTable");
        }
        offsetTableOffset = buffer.size();
        offsetSizeInBytes = computeOffsetSizeInBytes(offsetTableOffset);
        offsets.forEach(function(offset) {
          writeBytes(offset, offsetSizeInBytes);
        });
      }
      function write(entry) {
        switch (entry.type) {
          case "dict":
            writeDict(entry);
            break;
          case "number":
          case "double":
            writeNumber(entry);
            break;
          case "UID":
            writeUID(entry);
            break;
          case "array":
            writeArray(entry);
            break;
          case "boolean":
            writeBoolean(entry);
            break;
          case "string":
          case "string-utf16":
            writeString(entry);
            break;
          case "date":
            writeDate(entry);
            break;
          case "data":
            writeData(entry);
            break;
          default:
            throw new Error("unhandled entry type: " + entry.type);
        }
      }
      function writeDate(entry) {
        writeByte(51);
        var date = Date.parse(entry.value) / 1e3 - 978307200;
        writeDouble(date);
      }
      function writeDict(entry) {
        if (debug) {
          var keysStr = entry.entryKeys.map(function(k) {
            return k.id;
          });
          var valsStr = entry.entryValues.map(function(k) {
            return k.id;
          });
          console.log("0x" + buffer.size().toString(16), "writeDict", "(id: " + entry.id + ")", "(keys: " + keysStr + ")", "(values: " + valsStr + ")");
        }
        writeIntHeader(13, entry.entryKeys.length);
        entry.entryKeys.forEach(function(entry2) {
          writeID(entry2.id);
        });
        entry.entryValues.forEach(function(entry2) {
          writeID(entry2.id);
        });
      }
      function writeNumber(entry) {
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeNumber", entry.value, " (type: " + entry.type + ")", "(id: " + entry.id + ")");
        }
        if (entry.type !== "double" && parseFloat(entry.value.toFixed()) == entry.value) {
          if (entry.value < 0) {
            writeByte(19);
            writeBytes(entry.value, 8, true);
          } else if (entry.value <= 255) {
            writeByte(16);
            writeBytes(entry.value, 1);
          } else if (entry.value <= 65535) {
            writeByte(17);
            writeBytes(entry.value, 2);
          } else if (entry.value <= 4294967295) {
            writeByte(18);
            writeBytes(entry.value, 4);
          } else {
            writeByte(20);
            writeBytes(entry.value, 8);
          }
        } else {
          writeByte(35);
          writeDouble(entry.value);
        }
      }
      function writeUID(entry) {
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeUID", entry.value, " (type: " + entry.type + ")", "(id: " + entry.id + ")");
        }
        writeIntHeader(8, 0);
        writeID(entry.value);
      }
      function writeArray(entry) {
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeArray (length: " + entry.entries.length + ")", "(id: " + entry.id + ")");
        }
        writeIntHeader(10, entry.entries.length);
        entry.entries.forEach(function(e) {
          writeID(e.id);
        });
      }
      function writeBoolean(entry) {
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeBoolean", entry.value, "(id: " + entry.id + ")");
        }
        writeByte(entry.value ? 9 : 8);
      }
      function writeString(entry) {
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeString", entry.value, "(id: " + entry.id + ")");
        }
        if (entry.type === "string-utf16" || mustBeUtf16(entry.value)) {
          var utf16 = new Buffer(entry.value, "ucs2");
          writeIntHeader(6, utf16.length / 2);
          for (var i = 0; i < utf16.length; i += 2) {
            var t = utf16[i + 0];
            utf16[i + 0] = utf16[i + 1];
            utf16[i + 1] = t;
          }
          buffer.write(utf16);
        } else {
          var utf8 = new Buffer(entry.value, "ascii");
          writeIntHeader(5, utf8.length);
          buffer.write(utf8);
        }
      }
      function writeData(entry) {
        if (debug) {
          console.log("0x" + buffer.size().toString(16), "writeData", entry.value, "(id: " + entry.id + ")");
        }
        writeIntHeader(4, entry.value.length);
        buffer.write(entry.value);
      }
      function writeLong(l) {
        writeBytes(l, 8);
      }
      function writeByte(b) {
        buffer.write(new Buffer([b]));
      }
      function writeDouble(v) {
        var buf = new Buffer(8);
        buf.writeDoubleBE(v, 0);
        buffer.write(buf);
      }
      function writeIntHeader(kind, value) {
        if (value < 15) {
          writeByte((kind << 4) + value);
        } else if (value < 256) {
          writeByte((kind << 4) + 15);
          writeByte(16);
          writeBytes(value, 1);
        } else if (value < 65536) {
          writeByte((kind << 4) + 15);
          writeByte(17);
          writeBytes(value, 2);
        } else {
          writeByte((kind << 4) + 15);
          writeByte(18);
          writeBytes(value, 4);
        }
      }
      function writeID(id) {
        writeBytes(id, idSizeInBytes);
      }
      function writeBytes(value, bytes, is_signedint) {
        var buf = new Buffer(bytes);
        var z = 0;
        if (!is_signedint) {
          while (bytes > 4) {
            buf[z++] = 0;
            bytes--;
          }
        }
        for (var i = bytes - 1; i >= 0; i--) {
          buf[z++] = value >> 8 * i;
        }
        buffer.write(buf);
      }
      function mustBeUtf16(string) {
        return Buffer.byteLength(string, "utf8") != string.length;
      }
    };
    function toEntries(dicts) {
      if (dicts.bplistOverride) {
        return [dicts];
      }
      if (dicts instanceof Array) {
        return toEntriesArray(dicts);
      } else if (dicts instanceof Buffer) {
        return [
          {
            type: "data",
            value: dicts
          }
        ];
      } else if (dicts instanceof Real) {
        return [
          {
            type: "double",
            value: dicts.value
          }
        ];
      } else if (typeof dicts === "object") {
        if (dicts instanceof Date) {
          return [
            {
              type: "date",
              value: dicts
            }
          ];
        } else if (Object.keys(dicts).length == 1 && typeof dicts.UID === "number") {
          return [
            {
              type: "UID",
              value: dicts.UID
            }
          ];
        } else {
          return toEntriesObject(dicts);
        }
      } else if (typeof dicts === "string") {
        return [
          {
            type: "string",
            value: dicts
          }
        ];
      } else if (typeof dicts === "number") {
        return [
          {
            type: "number",
            value: dicts
          }
        ];
      } else if (typeof dicts === "boolean") {
        return [
          {
            type: "boolean",
            value: dicts
          }
        ];
      } else if (typeof dicts === "bigint") {
        return [
          {
            type: "number",
            value: Number(BigInt.asIntN(32, dicts))
          }
        ];
      } else {
        throw new Error("unhandled entry: " + dicts);
      }
    }
    function toEntriesArray(arr) {
      if (debug) {
        console.log("toEntriesArray");
      }
      var results = [
        {
          type: "array",
          entries: []
        }
      ];
      arr.forEach(function(v) {
        var entry = toEntries(v);
        results[0].entries.push(entry[0]);
        results = results.concat(entry);
      });
      return results;
    }
    function toEntriesObject(dict) {
      if (debug) {
        console.log("toEntriesObject");
      }
      var results = [
        {
          type: "dict",
          entryKeys: [],
          entryValues: []
        }
      ];
      Object.keys(dict).forEach(function(key) {
        var entryKey = toEntries(key);
        results[0].entryKeys.push(entryKey[0]);
        results = results.concat(entryKey[0]);
      });
      Object.keys(dict).forEach(function(key) {
        var entryValue = toEntries(dict[key]);
        results[0].entryValues.push(entryValue[0]);
        results = results.concat(entryValue);
      });
      return results;
    }
    function computeOffsetSizeInBytes(maxOffset) {
      if (maxOffset < 256) {
        return 1;
      }
      if (maxOffset < 65536) {
        return 2;
      }
      if (maxOffset < 4294967296) {
        return 4;
      }
      return 8;
    }
    function computeIdSizeInBytes(numberOfIds) {
      if (numberOfIds < 256) {
        return 1;
      }
      if (numberOfIds < 65536) {
        return 2;
      }
      return 4;
    }
    module2.exports.Real = Real;
  }
});

// node_modules/bplist/bplist.js
var require_bplist = __commonJS({
  "node_modules/bplist/bplist.js"(exports) {
    var bplistParser = require_bplistParser();
    var bplistCreator = require_bplistCreator();
    exports.maxObjectSize = bplistParser.maxObjectSize;
    exports.parseFile = bplistParser.parseFile;
    var parseBuf = function(buf, callback) {
      try {
        var result = bplistParser.parseBuffer(buf);
        return callback(null, result);
      } catch (err) {
        return callback(err, null);
      }
    };
    exports.parseBuffer = parseBuf;
    exports.create = bplistCreator;
  }
});

// node_modules/bufferpack/bufferpack.js
var require_bufferpack = __commonJS({
  "node_modules/bufferpack/bufferpack.js"(exports, module2) {
    function BufferPack() {
      var el, bBE = false, m = this;
      m._DeArray = function(a, p, l) {
        return [a.slice(p, p + l)];
      };
      m._EnArray = function(a, p, l, v) {
        for (var i = 0; i < l; a[p + i] = v[i] ? v[i] : 0, i++)
          ;
      };
      m._DeChar = function(a, p) {
        return String.fromCharCode(a[p]);
      };
      m._EnChar = function(a, p, v) {
        a[p] = v.charCodeAt(0);
      };
      m._DeInt = function(a, p) {
        var lsb = bBE ? el.len - 1 : 0, nsb = bBE ? -1 : 1, stop = lsb + nsb * el.len, rv, i, f;
        for (rv = 0, i = lsb, f = 1; i != stop; rv += a[p + i] * f, i += nsb, f *= 256)
          ;
        if (el.bSigned && rv & Math.pow(2, el.len * 8 - 1)) {
          rv -= Math.pow(2, el.len * 8);
        }
        return rv;
      };
      m._EnInt = function(a, p, v) {
        var lsb = bBE ? el.len - 1 : 0, nsb = bBE ? -1 : 1, stop = lsb + nsb * el.len, i;
        v = v < el.min ? el.min : v > el.max ? el.max : v;
        for (i = lsb; i != stop; a[p + i] = v & 255, i += nsb, v >>= 8)
          ;
      };
      m._DeString = function(a, p, l) {
        for (var rv = new Array(l), i = 0; i < l; rv[i] = String.fromCharCode(a[p + i]), i++)
          ;
        return rv.join("");
      };
      m._EnString = function(a, p, l, v) {
        for (var t, i = 0; i < l; a[p + i] = (t = v.charCodeAt(i)) ? t : 0, i++)
          ;
      };
      m._DeNullString = function(a, p, l, v) {
        var str = m._DeString(a, p, l, v);
        return str.substring(0, str.length - 1);
      };
      m._De754 = function(a, p) {
        var s, e, m2, i, d, nBits, mLen, eLen, eBias, eMax;
        mLen = el.mLen, eLen = el.len * 8 - el.mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1;
        i = bBE ? 0 : el.len - 1;
        d = bBE ? 1 : -1;
        s = a[p + i];
        i += d;
        nBits = -7;
        for (e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = e * 256 + a[p + i], i += d, nBits -= 8)
          ;
        for (m2 = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m2 = m2 * 256 + a[p + i], i += d, nBits -= 8)
          ;
        switch (e) {
          case 0:
            e = 1 - eBias;
            break;
          case eMax:
            return m2 ? NaN : (s ? -1 : 1) * Infinity;
          default:
            m2 = m2 + Math.pow(2, mLen);
            e = e - eBias;
            break;
        }
        return (s ? -1 : 1) * m2 * Math.pow(2, e - mLen);
      };
      m._En754 = function(a, p, v) {
        var s, e, m2, i, d, c2, mLen, eLen, eBias, eMax;
        mLen = el.mLen, eLen = el.len * 8 - el.mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1;
        s = v < 0 ? 1 : 0;
        v = Math.abs(v);
        if (isNaN(v) || v == Infinity) {
          m2 = isNaN(v) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(v) / Math.LN2);
          if (v * (c2 = Math.pow(2, -e)) < 1) {
            e--;
            c2 *= 2;
          }
          if (e + eBias >= 1) {
            v += el.rt / c2;
          } else {
            v += el.rt * Math.pow(2, 1 - eBias);
          }
          if (v * c2 >= 2) {
            e++;
            c2 /= 2;
          }
          if (e + eBias >= eMax) {
            m2 = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m2 = (v * c2 - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m2 = v * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (i = bBE ? el.len - 1 : 0, d = bBE ? -1 : 1; mLen >= 8; a[p + i] = m2 & 255, i += d, m2 /= 256, mLen -= 8)
          ;
        for (e = e << mLen | m2, eLen += mLen; eLen > 0; a[p + i] = e & 255, i += d, e /= 256, eLen -= 8)
          ;
        a[p + i - d] |= s * 128;
      };
      m._sPattern = "(\\d+)?([AxcbBhHsSfdiIlL])(\\(([a-zA-Z0-9]+)\\))?";
      m._lenLut = {
        "A": 1,
        "x": 1,
        "c": 1,
        "b": 1,
        "B": 1,
        "h": 2,
        "H": 2,
        "s": 1,
        "S": 1,
        "f": 4,
        "d": 8,
        "i": 4,
        "I": 4,
        "l": 4,
        "L": 4
      };
      m._elLut = {
        "A": { en: m._EnArray, de: m._DeArray },
        "s": { en: m._EnString, de: m._DeString },
        "S": { en: m._EnString, de: m._DeNullString },
        "c": { en: m._EnChar, de: m._DeChar },
        "b": { en: m._EnInt, de: m._DeInt, len: 1, bSigned: true, min: -Math.pow(2, 7), max: Math.pow(2, 7) - 1 },
        "B": { en: m._EnInt, de: m._DeInt, len: 1, bSigned: false, min: 0, max: Math.pow(2, 8) - 1 },
        "h": { en: m._EnInt, de: m._DeInt, len: 2, bSigned: true, min: -Math.pow(2, 15), max: Math.pow(2, 15) - 1 },
        "H": { en: m._EnInt, de: m._DeInt, len: 2, bSigned: false, min: 0, max: Math.pow(2, 16) - 1 },
        "i": { en: m._EnInt, de: m._DeInt, len: 4, bSigned: true, min: -Math.pow(2, 31), max: Math.pow(2, 31) - 1 },
        "I": { en: m._EnInt, de: m._DeInt, len: 4, bSigned: false, min: 0, max: Math.pow(2, 32) - 1 },
        "l": { en: m._EnInt, de: m._DeInt, len: 4, bSigned: true, min: -Math.pow(2, 31), max: Math.pow(2, 31) - 1 },
        "L": { en: m._EnInt, de: m._DeInt, len: 4, bSigned: false, min: 0, max: Math.pow(2, 32) - 1 },
        "f": { en: m._En754, de: m._De754, len: 4, mLen: 23, rt: Math.pow(2, -24) - Math.pow(2, -77) },
        "d": { en: m._En754, de: m._De754, len: 8, mLen: 52, rt: 0 }
      };
      m._UnpackSeries = function(n, s, a, p) {
        for (var fxn = el.de, rv = [], i = 0; i < n; rv.push(fxn(a, p + i * s)), i++)
          ;
        return rv;
      };
      m._PackSeries = function(n, s, a, p, v, i) {
        for (var fxn = el.en, o = 0; o < n; fxn(a, p + o * s, v[i + o]), o++)
          ;
      };
      m._zip = function(keys, values) {
        var result = {};
        for (var i = 0; i < keys.length; i++) {
          result[keys[i]] = values[i];
        }
        return result;
      };
      m.unpack = function(fmt, a, p) {
        bBE = fmt.charAt(0) != "<";
        p = p ? p : 0;
        var re = new RegExp(this._sPattern, "g");
        var m2;
        var n;
        var s;
        var rk = [];
        var rv = [];
        while (m2 = re.exec(fmt)) {
          n = m2[1] == void 0 || m2[1] == "" ? 1 : parseInt(m2[1]);
          if (m2[2] === "S") {
            n = 0;
            while (a[p + n] !== 0) {
              n++;
            }
            n++;
          }
          s = this._lenLut[m2[2]];
          if (p + n * s > a.length) {
            return void 0;
          }
          switch (m2[2]) {
            case "A":
            case "s":
            case "S":
              rv.push(this._elLut[m2[2]].de(a, p, n));
              break;
            case "c":
            case "b":
            case "B":
            case "h":
            case "H":
            case "i":
            case "I":
            case "l":
            case "L":
            case "f":
            case "d":
              el = this._elLut[m2[2]];
              rv.push(this._UnpackSeries(n, s, a, p));
              break;
          }
          rk.push(m2[4]);
          p += n * s;
        }
        rv = Array.prototype.concat.apply([], rv);
        if (rk.indexOf(void 0) !== -1) {
          return rv;
        } else {
          return this._zip(rk, rv);
        }
      };
      m.packTo = function(fmt, a, p, values) {
        bBE = fmt.charAt(0) != "<";
        var re = new RegExp(this._sPattern, "g");
        var m2;
        var n;
        var s;
        var i = 0;
        var j;
        while (m2 = re.exec(fmt)) {
          n = m2[1] == void 0 || m2[1] == "" ? 1 : parseInt(m2[1]);
          if (m2[2] === "S") {
            n = values[i].length + 1;
          }
          s = this._lenLut[m2[2]];
          if (p + n * s > a.length) {
            return false;
          }
          switch (m2[2]) {
            case "A":
            case "s":
            case "S":
              if (i + 1 > values.length) {
                return false;
              }
              this._elLut[m2[2]].en(a, p, n, values[i]);
              i += 1;
              break;
            case "c":
            case "b":
            case "B":
            case "h":
            case "H":
            case "i":
            case "I":
            case "l":
            case "L":
            case "f":
            case "d":
              el = this._elLut[m2[2]];
              if (i + n > values.length) {
                return false;
              }
              this._PackSeries(n, s, a, p, values, i);
              i += n;
              break;
            case "x":
              for (j = 0; j < n; j++) {
                a[p + j] = 0;
              }
              break;
          }
          p += n * s;
        }
        return a;
      };
      m.pack = function(fmt, values) {
        return this.packTo(fmt, new Buffer(this.calcLength(fmt, values)), 0, values);
      };
      m.calcLength = function(format, values) {
        var re = new RegExp(this._sPattern, "g"), m2, sum = 0, i = 0;
        while (m2 = re.exec(format)) {
          var n = (m2[1] == void 0 || m2[1] == "" ? 1 : parseInt(m2[1])) * this._lenLut[m2[2]];
          if (m2[2] === "S") {
            n = values[i].length + 1;
          }
          sum += n;
          i++;
        }
        return sum;
      };
    }
    module2.exports = new BufferPack();
  }
});

// node_modules/streamifier/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/streamifier/lib/index.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var stream = require("stream");
    module2.exports.createReadStream = function(object, options) {
      return new MultiStream(object, options);
    };
    var MultiStream = function(object, options) {
      if (object instanceof Buffer || typeof object === "string") {
        options = options || {};
        stream.Readable.call(this, {
          highWaterMark: options.highWaterMark,
          encoding: options.encoding
        });
      } else {
        stream.Readable.call(this, { objectMode: true });
      }
      this._object = object;
    };
    util.inherits(MultiStream, stream.Readable);
    MultiStream.prototype._read = function() {
      this.push(this._object);
      this._object = null;
    };
  }
});

// node_modules/crc/lib/es6/create_buffer.js
var require_create_buffer = __commonJS({
  "node_modules/crc/lib/es6/create_buffer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var createBuffer = _buffer.Buffer.from && _buffer.Buffer.alloc && _buffer.Buffer.allocUnsafe && _buffer.Buffer.allocUnsafeSlow ? _buffer.Buffer.from : function(val) {
      return new _buffer.Buffer(val);
    };
    exports.default = createBuffer;
  }
});

// node_modules/crc/lib/es6/define_crc.js
var require_define_crc = __commonJS({
  "node_modules/crc/lib/es6/define_crc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = function(model, calc) {
      var fn = function fn2(buf, previous) {
        return calc(buf, previous) >>> 0;
      };
      fn.signed = calc;
      fn.unsigned = fn;
      fn.model = model;
      return fn;
    };
  }
});

// node_modules/crc/lib/es6/crc1.js
var require_crc1 = __commonJS({
  "node_modules/crc/lib/es6/crc1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var crc1 = (0, _define_crc2.default)("crc1", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = ~~previous;
      var accum = 0;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        accum += byte;
      }
      crc += accum % 256;
      return crc % 256;
    });
    exports.default = crc1;
  }
});

// node_modules/crc/lib/crc1.js
var require_crc12 = __commonJS({
  "node_modules/crc/lib/crc1.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc1().default;
  }
});

// node_modules/crc/lib/es6/crc8.js
var require_crc8 = __commonJS({
  "node_modules/crc/lib/es6/crc8.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TABLE = [0, 7, 14, 9, 28, 27, 18, 21, 56, 63, 54, 49, 36, 35, 42, 45, 112, 119, 126, 121, 108, 107, 98, 101, 72, 79, 70, 65, 84, 83, 90, 93, 224, 231, 238, 233, 252, 251, 242, 245, 216, 223, 214, 209, 196, 195, 202, 205, 144, 151, 158, 153, 140, 139, 130, 133, 168, 175, 166, 161, 180, 179, 186, 189, 199, 192, 201, 206, 219, 220, 213, 210, 255, 248, 241, 246, 227, 228, 237, 234, 183, 176, 185, 190, 171, 172, 165, 162, 143, 136, 129, 134, 147, 148, 157, 154, 39, 32, 41, 46, 59, 60, 53, 50, 31, 24, 17, 22, 3, 4, 13, 10, 87, 80, 89, 94, 75, 76, 69, 66, 111, 104, 97, 102, 115, 116, 125, 122, 137, 142, 135, 128, 149, 146, 155, 156, 177, 182, 191, 184, 173, 170, 163, 164, 249, 254, 247, 240, 229, 226, 235, 236, 193, 198, 207, 200, 221, 218, 211, 212, 105, 110, 103, 96, 117, 114, 123, 124, 81, 86, 95, 88, 77, 74, 67, 68, 25, 30, 23, 16, 5, 2, 11, 12, 33, 38, 47, 40, 61, 58, 51, 52, 78, 73, 64, 71, 82, 85, 92, 91, 118, 113, 120, 127, 106, 109, 100, 99, 62, 57, 48, 55, 34, 37, 44, 43, 6, 1, 8, 15, 26, 29, 20, 19, 174, 169, 160, 167, 178, 181, 188, 187, 150, 145, 152, 159, 138, 141, 132, 131, 222, 217, 208, 215, 194, 197, 204, 203, 230, 225, 232, 239, 250, 253, 244, 243];
    if (typeof Int32Array !== "undefined")
      TABLE = new Int32Array(TABLE);
    var crc8 = (0, _define_crc2.default)("crc-8", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = ~~previous;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        crc = TABLE[(crc ^ byte) & 255] & 255;
      }
      return crc;
    });
    exports.default = crc8;
  }
});

// node_modules/crc/lib/crc8.js
var require_crc82 = __commonJS({
  "node_modules/crc/lib/crc8.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc8().default;
  }
});

// node_modules/crc/lib/es6/crc81wire.js
var require_crc81wire = __commonJS({
  "node_modules/crc/lib/es6/crc81wire.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TABLE = [0, 94, 188, 226, 97, 63, 221, 131, 194, 156, 126, 32, 163, 253, 31, 65, 157, 195, 33, 127, 252, 162, 64, 30, 95, 1, 227, 189, 62, 96, 130, 220, 35, 125, 159, 193, 66, 28, 254, 160, 225, 191, 93, 3, 128, 222, 60, 98, 190, 224, 2, 92, 223, 129, 99, 61, 124, 34, 192, 158, 29, 67, 161, 255, 70, 24, 250, 164, 39, 121, 155, 197, 132, 218, 56, 102, 229, 187, 89, 7, 219, 133, 103, 57, 186, 228, 6, 88, 25, 71, 165, 251, 120, 38, 196, 154, 101, 59, 217, 135, 4, 90, 184, 230, 167, 249, 27, 69, 198, 152, 122, 36, 248, 166, 68, 26, 153, 199, 37, 123, 58, 100, 134, 216, 91, 5, 231, 185, 140, 210, 48, 110, 237, 179, 81, 15, 78, 16, 242, 172, 47, 113, 147, 205, 17, 79, 173, 243, 112, 46, 204, 146, 211, 141, 111, 49, 178, 236, 14, 80, 175, 241, 19, 77, 206, 144, 114, 44, 109, 51, 209, 143, 12, 82, 176, 238, 50, 108, 142, 208, 83, 13, 239, 177, 240, 174, 76, 18, 145, 207, 45, 115, 202, 148, 118, 40, 171, 245, 23, 73, 8, 86, 180, 234, 105, 55, 213, 139, 87, 9, 235, 181, 54, 104, 138, 212, 149, 203, 41, 119, 244, 170, 72, 22, 233, 183, 85, 11, 136, 214, 52, 106, 43, 117, 151, 201, 74, 20, 246, 168, 116, 42, 200, 150, 21, 75, 169, 247, 182, 232, 10, 84, 215, 137, 107, 53];
    if (typeof Int32Array !== "undefined")
      TABLE = new Int32Array(TABLE);
    var crc81wire = (0, _define_crc2.default)("dallas-1-wire", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = ~~previous;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        crc = TABLE[(crc ^ byte) & 255] & 255;
      }
      return crc;
    });
    exports.default = crc81wire;
  }
});

// node_modules/crc/lib/crc8_1wire.js
var require_crc8_1wire = __commonJS({
  "node_modules/crc/lib/crc8_1wire.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc81wire().default;
  }
});

// node_modules/crc/lib/es6/crc16.js
var require_crc16 = __commonJS({
  "node_modules/crc/lib/es6/crc16.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TABLE = [0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448];
    if (typeof Int32Array !== "undefined")
      TABLE = new Int32Array(TABLE);
    var crc16 = (0, _define_crc2.default)("crc-16", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = ~~previous;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        crc = (TABLE[(crc ^ byte) & 255] ^ crc >> 8) & 65535;
      }
      return crc;
    });
    exports.default = crc16;
  }
});

// node_modules/crc/lib/crc16.js
var require_crc162 = __commonJS({
  "node_modules/crc/lib/crc16.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc16().default;
  }
});

// node_modules/crc/lib/es6/crc16ccitt.js
var require_crc16ccitt = __commonJS({
  "node_modules/crc/lib/es6/crc16ccitt.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TABLE = [0, 4129, 8258, 12387, 16516, 20645, 24774, 28903, 33032, 37161, 41290, 45419, 49548, 53677, 57806, 61935, 4657, 528, 12915, 8786, 21173, 17044, 29431, 25302, 37689, 33560, 45947, 41818, 54205, 50076, 62463, 58334, 9314, 13379, 1056, 5121, 25830, 29895, 17572, 21637, 42346, 46411, 34088, 38153, 58862, 62927, 50604, 54669, 13907, 9842, 5649, 1584, 30423, 26358, 22165, 18100, 46939, 42874, 38681, 34616, 63455, 59390, 55197, 51132, 18628, 22757, 26758, 30887, 2112, 6241, 10242, 14371, 51660, 55789, 59790, 63919, 35144, 39273, 43274, 47403, 23285, 19156, 31415, 27286, 6769, 2640, 14899, 10770, 56317, 52188, 64447, 60318, 39801, 35672, 47931, 43802, 27814, 31879, 19684, 23749, 11298, 15363, 3168, 7233, 60846, 64911, 52716, 56781, 44330, 48395, 36200, 40265, 32407, 28342, 24277, 20212, 15891, 11826, 7761, 3696, 65439, 61374, 57309, 53244, 48923, 44858, 40793, 36728, 37256, 33193, 45514, 41451, 53516, 49453, 61774, 57711, 4224, 161, 12482, 8419, 20484, 16421, 28742, 24679, 33721, 37784, 41979, 46042, 49981, 54044, 58239, 62302, 689, 4752, 8947, 13010, 16949, 21012, 25207, 29270, 46570, 42443, 38312, 34185, 62830, 58703, 54572, 50445, 13538, 9411, 5280, 1153, 29798, 25671, 21540, 17413, 42971, 47098, 34713, 38840, 59231, 63358, 50973, 55100, 9939, 14066, 1681, 5808, 26199, 30326, 17941, 22068, 55628, 51565, 63758, 59695, 39368, 35305, 47498, 43435, 22596, 18533, 30726, 26663, 6336, 2273, 14466, 10403, 52093, 56156, 60223, 64286, 35833, 39896, 43963, 48026, 19061, 23124, 27191, 31254, 2801, 6864, 10931, 14994, 64814, 60687, 56684, 52557, 48554, 44427, 40424, 36297, 31782, 27655, 23652, 19525, 15522, 11395, 7392, 3265, 61215, 65342, 53085, 57212, 44955, 49082, 36825, 40952, 28183, 32310, 20053, 24180, 11923, 16050, 3793, 7920];
    if (typeof Int32Array !== "undefined")
      TABLE = new Int32Array(TABLE);
    var crc16ccitt = (0, _define_crc2.default)("ccitt", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = typeof previous !== "undefined" ? ~~previous : 65535;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        crc = (TABLE[(crc >> 8 ^ byte) & 255] ^ crc << 8) & 65535;
      }
      return crc;
    });
    exports.default = crc16ccitt;
  }
});

// node_modules/crc/lib/crc16_ccitt.js
var require_crc16_ccitt = __commonJS({
  "node_modules/crc/lib/crc16_ccitt.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc16ccitt().default;
  }
});

// node_modules/crc/lib/es6/crc16modbus.js
var require_crc16modbus = __commonJS({
  "node_modules/crc/lib/es6/crc16modbus.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TABLE = [0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448];
    if (typeof Int32Array !== "undefined")
      TABLE = new Int32Array(TABLE);
    var crc16modbus = (0, _define_crc2.default)("crc-16-modbus", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = typeof previous !== "undefined" ? ~~previous : 65535;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        crc = (TABLE[(crc ^ byte) & 255] ^ crc >> 8) & 65535;
      }
      return crc;
    });
    exports.default = crc16modbus;
  }
});

// node_modules/crc/lib/crc16_modbus.js
var require_crc16_modbus = __commonJS({
  "node_modules/crc/lib/crc16_modbus.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc16modbus().default;
  }
});

// node_modules/crc/lib/es6/crc16xmodem.js
var require_crc16xmodem = __commonJS({
  "node_modules/crc/lib/es6/crc16xmodem.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var crc16xmodem = (0, _define_crc2.default)("xmodem", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = typeof previous !== "undefined" ? ~~previous : 0;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        var code = crc >>> 8 & 255;
        code ^= byte & 255;
        code ^= code >>> 4;
        crc = crc << 8 & 65535;
        crc ^= code;
        code = code << 5 & 65535;
        crc ^= code;
        code = code << 7 & 65535;
        crc ^= code;
      }
      return crc;
    });
    exports.default = crc16xmodem;
  }
});

// node_modules/crc/lib/crc16_xmodem.js
var require_crc16_xmodem = __commonJS({
  "node_modules/crc/lib/crc16_xmodem.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc16xmodem().default;
  }
});

// node_modules/crc/lib/es6/crc16kermit.js
var require_crc16kermit = __commonJS({
  "node_modules/crc/lib/es6/crc16kermit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TABLE = [0, 4489, 8978, 12955, 17956, 22445, 25910, 29887, 35912, 40385, 44890, 48851, 51820, 56293, 59774, 63735, 4225, 264, 13203, 8730, 22181, 18220, 30135, 25662, 40137, 36160, 49115, 44626, 56045, 52068, 63999, 59510, 8450, 12427, 528, 5017, 26406, 30383, 17460, 21949, 44362, 48323, 36440, 40913, 60270, 64231, 51324, 55797, 12675, 8202, 4753, 792, 30631, 26158, 21685, 17724, 48587, 44098, 40665, 36688, 64495, 60006, 55549, 51572, 16900, 21389, 24854, 28831, 1056, 5545, 10034, 14011, 52812, 57285, 60766, 64727, 34920, 39393, 43898, 47859, 21125, 17164, 29079, 24606, 5281, 1320, 14259, 9786, 57037, 53060, 64991, 60502, 39145, 35168, 48123, 43634, 25350, 29327, 16404, 20893, 9506, 13483, 1584, 6073, 61262, 65223, 52316, 56789, 43370, 47331, 35448, 39921, 29575, 25102, 20629, 16668, 13731, 9258, 5809, 1848, 65487, 60998, 56541, 52564, 47595, 43106, 39673, 35696, 33800, 38273, 42778, 46739, 49708, 54181, 57662, 61623, 2112, 6601, 11090, 15067, 20068, 24557, 28022, 31999, 38025, 34048, 47003, 42514, 53933, 49956, 61887, 57398, 6337, 2376, 15315, 10842, 24293, 20332, 32247, 27774, 42250, 46211, 34328, 38801, 58158, 62119, 49212, 53685, 10562, 14539, 2640, 7129, 28518, 32495, 19572, 24061, 46475, 41986, 38553, 34576, 62383, 57894, 53437, 49460, 14787, 10314, 6865, 2904, 32743, 28270, 23797, 19836, 50700, 55173, 58654, 62615, 32808, 37281, 41786, 45747, 19012, 23501, 26966, 30943, 3168, 7657, 12146, 16123, 54925, 50948, 62879, 58390, 37033, 33056, 46011, 41522, 23237, 19276, 31191, 26718, 7393, 3432, 16371, 11898, 59150, 63111, 50204, 54677, 41258, 45219, 33336, 37809, 27462, 31439, 18516, 23005, 11618, 15595, 3696, 8185, 63375, 58886, 54429, 50452, 45483, 40994, 37561, 33584, 31687, 27214, 22741, 18780, 15843, 11370, 7921, 3960];
    if (typeof Int32Array !== "undefined")
      TABLE = new Int32Array(TABLE);
    var crc16kermit = (0, _define_crc2.default)("kermit", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = typeof previous !== "undefined" ? ~~previous : 0;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        crc = (TABLE[(crc ^ byte) & 255] ^ crc >> 8) & 65535;
      }
      return crc;
    });
    exports.default = crc16kermit;
  }
});

// node_modules/crc/lib/crc16_kermit.js
var require_crc16_kermit = __commonJS({
  "node_modules/crc/lib/crc16_kermit.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc16kermit().default;
  }
});

// node_modules/crc/lib/es6/crc24.js
var require_crc24 = __commonJS({
  "node_modules/crc/lib/es6/crc24.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TABLE = [0, 8801531, 9098509, 825846, 9692897, 1419802, 1651692, 10452759, 10584377, 2608578, 2839604, 11344079, 3303384, 11807523, 12104405, 4128302, 12930697, 4391538, 5217156, 13227903, 5679208, 13690003, 14450021, 5910942, 6606768, 14844747, 15604413, 6837830, 16197969, 7431594, 8256604, 16494759, 840169, 9084178, 8783076, 18463, 10434312, 1670131, 1434117, 9678590, 11358416, 2825259, 2590173, 10602790, 4109873, 12122826, 11821884, 3289031, 13213536, 5231515, 4409965, 12912278, 5929345, 14431610, 13675660, 5693559, 6823513, 15618722, 14863188, 6588335, 16513208, 8238147, 7417269, 16212302, 1680338, 10481449, 9664223, 1391140, 9061683, 788936, 36926, 8838341, 12067563, 4091408, 3340262, 11844381, 2868234, 11372785, 10555655, 2579964, 14478683, 5939616, 5650518, 13661357, 5180346, 13190977, 12967607, 4428364, 8219746, 16457881, 16234863, 7468436, 15633027, 6866552, 6578062, 14816117, 1405499, 9649856, 10463030, 1698765, 8819930, 55329, 803287, 9047340, 11858690, 3325945, 4072975, 12086004, 2561507, 10574104, 11387118, 2853909, 13647026, 5664841, 5958079, 14460228, 4446803, 12949160, 13176670, 5194661, 7454091, 16249200, 16476294, 8201341, 14834538, 6559633, 6852199, 15647388, 3360676, 11864927, 12161705, 4185682, 10527045, 2551230, 2782280, 11286707, 9619101, 1346150, 1577872, 10379115, 73852, 8875143, 9172337, 899466, 16124205, 7357910, 8182816, 16421083, 6680524, 14918455, 15678145, 6911546, 5736468, 13747439, 14507289, 5968354, 12873461, 4334094, 5159928, 13170435, 4167245, 12180150, 11879232, 3346363, 11301036, 2767959, 2532769, 10545498, 10360692, 1596303, 1360505, 9604738, 913813, 9157998, 8856728, 92259, 16439492, 8164415, 7343561, 16138546, 6897189, 15692510, 14936872, 6662099, 5986813, 14488838, 13733104, 5750795, 13156124, 5174247, 4352529, 12855018, 2810998, 11315341, 10498427, 2522496, 12124823, 4148844, 3397530, 11901793, 9135439, 862644, 110658, 8912057, 1606574, 10407765, 9590435, 1317464, 15706879, 6940164, 6651890, 14889737, 8145950, 16384229, 16161043, 7394792, 5123014, 13133629, 12910283, 4370992, 14535975, 5997020, 5707818, 13718737, 2504095, 10516836, 11329682, 2796649, 11916158, 3383173, 4130419, 12143240, 8893606, 129117, 876971, 9121104, 1331783, 9576124, 10389322, 1625009, 14908182, 6633453, 6925851, 15721184, 7380471, 16175372, 16402682, 8127489, 4389423, 12891860, 13119266, 5137369, 13704398, 5722165, 6015427, 14517560];
    if (typeof Int32Array !== "undefined")
      TABLE = new Int32Array(TABLE);
    var crc24 = (0, _define_crc2.default)("crc-24", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = typeof previous !== "undefined" ? ~~previous : 11994318;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        crc = (TABLE[(crc >> 16 ^ byte) & 255] ^ crc << 8) & 16777215;
      }
      return crc;
    });
    exports.default = crc24;
  }
});

// node_modules/crc/lib/crc24.js
var require_crc242 = __commonJS({
  "node_modules/crc/lib/crc24.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc24().default;
  }
});

// node_modules/crc/lib/es6/crc32.js
var require_crc32 = __commonJS({
  "node_modules/crc/lib/es6/crc32.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TABLE = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
    if (typeof Int32Array !== "undefined")
      TABLE = new Int32Array(TABLE);
    var crc32 = (0, _define_crc2.default)("crc-32", function(buf, previous) {
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = previous === 0 ? 0 : ~~previous ^ -1;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        crc = TABLE[(crc ^ byte) & 255] ^ crc >>> 8;
      }
      return crc ^ -1;
    });
    exports.default = crc32;
  }
});

// node_modules/crc/lib/crc32.js
var require_crc322 = __commonJS({
  "node_modules/crc/lib/crc32.js"(exports, module2) {
    "use strict";
    module2.exports = require_crc32().default;
  }
});

// node_modules/crc/lib/es6/crcjam.js
var require_crcjam = __commonJS({
  "node_modules/crc/lib/es6/crcjam.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _buffer = require("buffer");
    var _create_buffer = require_create_buffer();
    var _create_buffer2 = _interopRequireDefault(_create_buffer);
    var _define_crc = require_define_crc();
    var _define_crc2 = _interopRequireDefault(_define_crc);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TABLE = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
    if (typeof Int32Array !== "undefined")
      TABLE = new Int32Array(TABLE);
    var crcjam = (0, _define_crc2.default)("jam", function(buf) {
      var previous = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
      if (!_buffer.Buffer.isBuffer(buf))
        buf = (0, _create_buffer2.default)(buf);
      var crc = previous === 0 ? 0 : ~~previous;
      for (var index = 0; index < buf.length; index++) {
        var byte = buf[index];
        crc = TABLE[(crc ^ byte) & 255] ^ crc >>> 8;
      }
      return crc;
    });
    exports.default = crcjam;
  }
});

// node_modules/crc/lib/crcjam.js
var require_crcjam2 = __commonJS({
  "node_modules/crc/lib/crcjam.js"(exports, module2) {
    "use strict";
    module2.exports = require_crcjam().default;
  }
});

// node_modules/crc/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/crc/lib/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      crc1: require_crc12(),
      crc8: require_crc82(),
      crc81wire: require_crc8_1wire(),
      crc16: require_crc162(),
      crc16ccitt: require_crc16_ccitt(),
      crc16modbus: require_crc16_modbus(),
      crc16xmodem: require_crc16_xmodem(),
      crc16kermit: require_crc16_kermit(),
      crc24: require_crc242(),
      crc32: require_crc322(),
      crcjam: require_crcjam2()
    };
  }
});

// node_modules/cgbi-to-png/index.js
var require_cgbi_to_png = __commonJS({
  "node_modules/cgbi-to-png/index.js"(exports, module2) {
    "use strict";
    (function() {
      var PNGHEADER_BASE64, bufferpack, crc, ignoreChunkTypes, revertCgBIBuffer, streamToBuffer, streamifier, zlib, indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) {
          if (i in this && this[i] === item)
            return i;
        }
        return -1;
      };
      streamToBuffer = require_stream_to_buffer();
      bufferpack = require_bufferpack();
      streamifier = require_lib3();
      zlib = require("zlib");
      crc = require_lib4();
      PNGHEADER_BASE64 = "iVBORw0KGgo=";
      ignoreChunkTypes = ["CgBI", "iDOT"];
      module2.exports = function(stream, callback) {
        return streamToBuffer(stream, function(err, buffer) {
          var output;
          if (err) {
            return callback(err);
          }
          try {
            output = revertCgBIBuffer(buffer);
            return callback(null, streamifier.createReadStream(output));
          } catch (e) {
            return callback(e);
          }
        });
      };
      module2.exports.revert = revertCgBIBuffer = function(buffer) {
        let isIphoneCompressed = false;
        let offset = 0;
        let chunks = [];
        let idatCgbiData = new Buffer(0);
        let headerData = buffer.slice(0, 8);
        let ref, width, height, chunk, uncompressed, newData, j, y, ref1, ref2, k, x, idatData, chunkCRC, idat_chunk;
        offset += 8;
        if (headerData.toString("base64") !== PNGHEADER_BASE64) {
          throw new Error("not a png file");
        }
        while (offset < buffer.length) {
          chunk = {};
          let data = buffer.slice(offset, offset + 4);
          offset += 4;
          chunk.length = bufferpack.unpack("L>", data, 0)[0];
          data = buffer.slice(offset, offset + 4);
          offset += 4;
          chunk.type = data.toString();
          chunk.data = data = buffer.slice(offset, offset + chunk.length);
          offset += chunk.length;
          let dataCrc = buffer.slice(offset, offset + 4);
          offset += 4;
          chunk.crc = bufferpack.unpack("L>", dataCrc, 0)[0];
          if (chunk.type === "CgBI") {
            isIphoneCompressed = true;
          }
          if (ref = chunk.type, indexOf.call(ignoreChunkTypes, ref) >= 0) {
            continue;
          }
          if (chunk.type === "IHDR") {
            width = bufferpack.unpack("L>", data)[0];
            height = bufferpack.unpack("L>", data, 4)[0];
          }
          if (chunk.type === "IDAT" && isIphoneCompressed) {
            idatCgbiData = Buffer.concat([idatCgbiData, data]);
            continue;
          }
          if (chunk.type === "IEND" && isIphoneCompressed) {
            uncompressed = zlib.inflateRawSync(idatCgbiData);
            newData = new Buffer(uncompressed.length);
            let i = 0;
            for (y = j = 0, ref1 = height - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; y = 0 <= ref1 ? ++j : --j) {
              newData[i] = uncompressed[i];
              i++;
              for (x = k = 0, ref2 = width - 1; 0 <= ref2 ? k <= ref2 : k >= ref2; x = 0 <= ref2 ? ++k : --k) {
                newData[i + 0] = uncompressed[i + 2];
                newData[i + 1] = uncompressed[i + 1];
                newData[i + 2] = uncompressed[i + 0];
                newData[i + 3] = uncompressed[i + 3];
                i += 4;
              }
            }
            idatData = zlib.deflateSync(newData);
            chunkCRC = crc.crc32("IDAT");
            chunkCRC = crc.crc32(idatData, chunkCRC);
            chunkCRC = (chunkCRC + 4294967296) % 4294967296;
            idat_chunk = {
              type: "IDAT",
              length: idatData.length,
              data: idatData,
              crc: chunkCRC
            };
            chunks.push(idat_chunk);
          }
          chunks.push(chunk);
        }
        let output = headerData;
        for (let l = 0, len = chunks.length; l < len; l++) {
          chunk = chunks[l];
          output = Buffer.concat([output, bufferpack.pack("L>", [chunk.length])]);
          output = Buffer.concat([output, new Buffer(chunk.type)]);
          if (chunk.length > 0) {
            output = Buffer.concat([output, new Buffer(chunk.data)]);
          }
          output = Buffer.concat([output, bufferpack.pack("L>", [chunk.crc])]);
        }
        return output;
      };
    }).call(exports);
  }
});

// node_modules/app-bundle-info/lib/iOSAppBundleInfo.js
var require_iOSAppBundleInfo = __commonJS({
  "node_modules/app-bundle-info/lib/iOSAppBundleInfo.js"(exports, module2) {
    (function() {
      var AppBundleInfo, bplist, cgbiToPng, iOSAppBundleInfo, plist, stream, streamToBuffer, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      AppBundleInfo = require_AppBundleInfo();
      stream = require("stream");
      streamToBuffer = require_stream_to_buffer();
      plist = require_plist();
      bplist = require_bplist();
      cgbiToPng = require_cgbi_to_png();
      iOSAppBundleInfo = function(superClass) {
        extend(iOSAppBundleInfo2, superClass);
        iOSAppBundleInfo2.prototype.plistPath = "Payload/*.app/Info.plist";
        function iOSAppBundleInfo2(pathOrStream) {
          iOSAppBundleInfo2.__super__.constructor.call(this, pathOrStream);
          this._infoLoaded = false;
          this._info = {};
          this.type = "ios";
        }
        iOSAppBundleInfo2.prototype._loadFileInfo = function(callback) {
          if (this._infoLoaded) {
            return callback();
          }
          return this.findFileStream(this.plistPath, function(_this) {
            return function(err, fileStream) {
              if (err) {
                return callback(err);
              }
              return streamToBuffer(fileStream, function(err2, data) {
                return _this.parsePlist(data, function(err3, plist2) {
                  if (err3) {
                    return callback(err3);
                  }
                  _this._info.plist = plist2;
                  _this._infoLoaded = true;
                  return callback();
                });
              });
            };
          }(this));
        };
        iOSAppBundleInfo2.prototype.parsePlist = function(data, callback) {
          var e, error;
          if (data.slice(0, 8).toString("ascii") !== "bplist00") {
            try {
              return callback(null, plist.parse(data.toString("utf-8")));
            } catch (error2) {
              e = error2;
              return callback(e);
            }
          } else {
            return bplist.parseBuffer(data, function(err, result) {
              if (err) {
                return callback(err);
              }
              return callback(null, result[0]);
            });
          }
        };
        iOSAppBundleInfo2.prototype.loadInfo = function(callback) {
          return this.getPlist(callback);
        };
        iOSAppBundleInfo2.prototype.getPlist = function(callback) {
          return this._loadFileInfo(function(_this) {
            return function(err) {
              if (err) {
                return callback(err);
              }
              return callback(null, _this._info.plist);
            };
          }(this));
        };
        iOSAppBundleInfo2.prototype.getIconFile = function(callback) {
          return this.findFileStream("Payload/*.app/AppIcon60x60@*.png", function(err, stream2) {
            if (err) {
              return callback(err);
            }
            if (!stream2) {
              return callback();
            }
            return cgbiToPng(stream2, callback);
          });
        };
        iOSAppBundleInfo2.prototype.getIdentifier = function() {
          var ref, ref1;
          return (ref = this._info) != null ? (ref1 = ref.plist) != null ? ref1.CFBundleIdentifier : void 0 : void 0;
        };
        iOSAppBundleInfo2.prototype.getName = function() {
          var ref, ref1, ref2, ref3;
          return ((ref = this._info) != null ? (ref1 = ref.plist) != null ? ref1.CFBundleDisplayName : void 0 : void 0) || ((ref2 = this._info) != null ? (ref3 = ref2.plist) != null ? ref3.CFBundleName : void 0 : void 0);
        };
        iOSAppBundleInfo2.prototype.getVersionName = function() {
          var ref, ref1;
          return (ref = this._info) != null ? (ref1 = ref.plist) != null ? ref1.CFBundleShortVersionString : void 0 : void 0;
        };
        iOSAppBundleInfo2.prototype.getVersionCode = function() {
          var ref, ref1;
          return (ref = this._info) != null ? (ref1 = ref.plist) != null ? ref1.CFBundleVersion : void 0 : void 0;
        };
        return iOSAppBundleInfo2;
      }(AppBundleInfo);
      module2.exports = iOSAppBundleInfo;
    }).call(exports);
  }
});

// node_modules/apk-parser2/lib/index.js
var require_lib5 = __commonJS({
  "node_modules/apk-parser2/lib/index.js"(exports, module2) {
    var os2 = require("os");
    var exec2 = require("child_process").execFile;
    var extractRaw;
    var parseApk;
    var parseOutput;
    parseApk = function(filename, cb) {
      return exec2("" + __dirname + "/../tools/aapt", ["l", "-a", filename], {
        maxBuffer: 1024 * 1024 * 1024
      }, function(err, out) {
        if (err) {
          return cb(err);
        }
        return parseOutput(out, cb);
      });
    };
    extractRaw = function(string) {
      var sep = '" (Raw: "';
      var parts = string.split(sep);
      var value = parts.slice(0, parts.length / 2).join(sep);
      return value.substring(1);
    };
    parseOutput = function(text, cb) {
      var depth, element, indent, input, line;
      var matches, name, parent, parts, rest, type, value, _i, _len;
      if (!text) {
        return cb(new Error("No input!"));
      }
      var lines = text.split("\n");
      var result = {};
      var stack = [result];
      var inManifest = false;
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (line.trim() === "Android manifest:") {
          inManifest = true;
          continue;
        }
        if (!inManifest) {
          continue;
        }
        if (line.trim() === "") {
          continue;
        }
        if (line.match(/^N:/)) {
          continue;
        }
        matches = line.match(/^( +)(A|E): ([\w:\-]+)(.*)$/);
        if (!matches) {
          return cb(new Error("Parse failure: " + line));
        }
        input = matches[0], indent = matches[1], type = matches[2], name = matches[3], rest = matches[4];
        depth = indent.length / 2;
        parent = stack[depth - 1];
        if (type === "E") {
          element = {};
          while (stack.length > depth) {
            stack.pop();
          }
          if (depth === stack.length) {
            stack.push(element);
          }
          if (!parent[name]) {
            parent[name] = [];
          }
          parent[name].push(element);
        } else if (type === "A") {
          value = null;
          if (rest.substring(0, 2) === '="') {
            value = extractRaw(rest.substring(1));
          } else if (rest.substring(0, 12) === "=(type 0x12)") {
            value = rest[14] === "1";
          } else {
            parts = rest.match(/^\(0x[0-9a-f]+\)\=(.*)$/);
            if (!parts) {
              return cb(new Error("Cannot parse value: " + rest));
            }
            if (parts[1][0] === '"') {
              value = extractRaw(parts[1]);
            } else {
              if (parts[1].substring(0, 11) === "(type 0x10)") {
                value = parseInt(parts[1].substring(13), 16);
              } else {
                value = parts[1];
              }
            }
          }
          parent["@" + name] = value;
        } else {
          return cb(new Error("Unknown type: " + type));
        }
      }
      return cb(null, result);
    };
    parseApk.parseOutput = parseOutput;
    module2.exports = parseApk;
  }
});

// node_modules/app-bundle-info/lib/BinaryXML.js
var require_BinaryXML = __commonJS({
  "node_modules/app-bundle-info/lib/BinaryXML.js"(exports, module2) {
    (function() {
      var BinaryXmlParser;
      BinaryXmlParser = function() {
        var ChunkType, NodeType, StringFlags, TypedValue;
        NodeType = {
          ELEMENT_NODE: 1,
          ATTRIBUTE_NODE: 2,
          CDATA_SECTION_NODE: 4
        };
        ChunkType = {
          NULL: 0,
          STRING_POOL: 1,
          TABLE: 2,
          XML: 3,
          XML_FIRST_CHUNK: 256,
          XML_START_NAMESPACE: 256,
          XML_END_NAMESPACE: 257,
          XML_START_ELEMENT: 258,
          XML_END_ELEMENT: 259,
          XML_CDATA: 260,
          XML_LAST_CHUNK: 383,
          XML_RESOURCE_MAP: 384,
          TABLE_PACKAGE: 512,
          TABLE_TYPE: 513,
          TABLE_TYPE_SPEC: 514
        };
        StringFlags = {
          SORTED: 1 << 0,
          UTF8: 1 << 8
        };
        TypedValue = {
          COMPLEX_MANTISSA_MASK: 16777215,
          COMPLEX_MANTISSA_SHIFT: 8,
          COMPLEX_RADIX_0p23: 3,
          COMPLEX_RADIX_16p7: 1,
          COMPLEX_RADIX_23p0: 0,
          COMPLEX_RADIX_8p15: 2,
          COMPLEX_RADIX_MASK: 3,
          COMPLEX_RADIX_SHIFT: 4,
          COMPLEX_UNIT_DIP: 1,
          COMPLEX_UNIT_FRACTION: 0,
          COMPLEX_UNIT_FRACTION_PARENT: 1,
          COMPLEX_UNIT_IN: 4,
          COMPLEX_UNIT_MASK: 15,
          COMPLEX_UNIT_MM: 5,
          COMPLEX_UNIT_PT: 3,
          COMPLEX_UNIT_PX: 0,
          COMPLEX_UNIT_SHIFT: 0,
          COMPLEX_UNIT_SP: 2,
          DENSITY_DEFAULT: 0,
          DENSITY_NONE: 65535,
          TYPE_ATTRIBUTE: 2,
          TYPE_DIMENSION: 5,
          TYPE_FIRST_COLOR_INT: 28,
          TYPE_FIRST_INT: 16,
          TYPE_FLOAT: 4,
          TYPE_FRACTION: 6,
          TYPE_INT_BOOLEAN: 18,
          TYPE_INT_COLOR_ARGB4: 30,
          TYPE_INT_COLOR_ARGB8: 28,
          TYPE_INT_COLOR_RGB4: 31,
          TYPE_INT_COLOR_RGB8: 29,
          TYPE_INT_DEC: 16,
          TYPE_INT_HEX: 17,
          TYPE_LAST_COLOR_INT: 31,
          TYPE_LAST_INT: 31,
          TYPE_NULL: 0,
          TYPE_REFERENCE: 1,
          TYPE_STRING: 3
        };
        function BinaryXmlParser2(buffer) {
          this.buffer = buffer;
          this.cursor = 0;
          this.strings = [];
          this.resources = [];
          this.document = null;
          this.parent = null;
          this.stack = [];
        }
        BinaryXmlParser2.prototype.readU8 = function() {
          var val;
          val = this.buffer[this.cursor];
          this.cursor += 1;
          return val;
        };
        BinaryXmlParser2.prototype.readU16 = function() {
          var val;
          val = this.buffer.readUInt16LE(this.cursor);
          this.cursor += 2;
          return val;
        };
        BinaryXmlParser2.prototype.readS32 = function() {
          var val;
          val = this.buffer.readInt32LE(this.cursor);
          this.cursor += 4;
          return val;
        };
        BinaryXmlParser2.prototype.readU32 = function() {
          var val;
          val = this.buffer.readUInt32LE(this.cursor);
          this.cursor += 4;
          return val;
        };
        BinaryXmlParser2.prototype.readLength8 = function() {
          var len;
          len = this.readU8();
          if (len & 128) {
            len = (len & 127) << 7;
            len += this.readU8();
          }
          return len;
        };
        BinaryXmlParser2.prototype.readLength16 = function() {
          var len;
          len = this.readU16();
          if (len & 32768) {
            len = (len & 32767) << 15;
            len += this.readU16();
          }
          return len;
        };
        BinaryXmlParser2.prototype.readDimension = function() {
          var dimension, unit, value;
          dimension = {
            value: null,
            unit: null,
            rawUnit: null
          };
          value = this.readU32();
          unit = dimension.value & 255;
          dimension.value = value >> 8;
          dimension.rawUnit = unit;
          switch (unit) {
            case TypedValue.COMPLEX_UNIT_MM:
              dimension.unit = "mm";
              break;
            case TypedValue.COMPLEX_UNIT_PX:
              dimension.unit = "px";
              break;
            case TypedValue.COMPLEX_UNIT_DIP:
              dimension.unit = "dp";
              break;
            case TypedValue.COMPLEX_UNIT_SP:
              dimension.unit = "sp";
              break;
            case TypedValue.COMPLEX_UNIT_PT:
              dimension.unit = "pt";
              break;
            case TypedValue.COMPLEX_UNIT_IN:
              dimension.unit = "in";
          }
          return dimension;
        };
        BinaryXmlParser2.prototype.readFraction = function() {
          var fraction, type, value;
          fraction = {
            value: null,
            type: null,
            rawType: null
          };
          value = this.readU32();
          type = value & 15;
          fraction.value = this.convertIntToFloat(value >> 4);
          fraction.rawType = type;
          switch (type) {
            case TypedValue.COMPLEX_UNIT_FRACTION:
              fraction.type = "%";
              break;
            case TypedValue.COMPLEX_UNIT_FRACTION_PARENT:
              fraction.type = "%p";
          }
          return fraction;
        };
        BinaryXmlParser2.prototype.readHex24 = function() {
          return (this.readU32() & 16777215).toString(16);
        };
        BinaryXmlParser2.prototype.readHex32 = function() {
          return this.readU32().toString(16);
        };
        BinaryXmlParser2.prototype.readTypedValue = function() {
          var dataType, diff, end, id, ref, size, start, type, typedValue, zero;
          typedValue = {
            value: null,
            type: null,
            rawType: null
          };
          start = this.cursor;
          size = this.readU16();
          zero = this.readU8();
          dataType = this.readU8();
          typedValue.rawType = dataType;
          switch (dataType) {
            case TypedValue.TYPE_INT_DEC:
              typedValue.value = this.readS32();
              typedValue.type = "int_dec";
              break;
            case TypedValue.TYPE_INT_HEX:
              typedValue.value = this.readS32();
              typedValue.type = "int_hex";
              break;
            case TypedValue.TYPE_STRING:
              ref = this.readS32();
              typedValue.value = ref > 0 ? this.strings[ref] : "";
              typedValue.type = "string";
              break;
            case TypedValue.TYPE_REFERENCE:
              id = this.readU32();
              typedValue.value = "resourceId:0x" + id.toString(16);
              typedValue.type = "reference";
              break;
            case TypedValue.TYPE_INT_BOOLEAN:
              typedValue.value = this.readS32() !== 0;
              typedValue.type = "boolean";
              break;
            case TypedValue.TYPE_NULL:
              this.readU32();
              typedValue.value = null;
              typedValue.type = "null";
              break;
            case TypedValue.TYPE_INT_COLOR_RGB8:
              typedValue.value = this.readHex24();
              typedValue.type = "rgb8";
              break;
            case TypedValue.TYPE_INT_COLOR_RGB4:
              typedValue.value = this.readHex24();
              typedValue.type = "rgb4";
              break;
            case TypedValue.TYPE_INT_COLOR_ARGB8:
              typedValue.value = this.readHex32();
              typedValue.type = "argb8";
              break;
            case TypedValue.TYPE_INT_COLOR_ARGB4:
              typedValue.value = this.readHex32();
              typedValue.type = "argb4";
              break;
            case TypedValue.TYPE_DIMENSION:
              typedValue.value = this.readDimension();
              typedValue.type = "dimension";
              break;
            case TypedValue.TYPE_FRACTION:
              typedValue.value = this.readFraction();
              typedValue.type = "fraction";
              break;
            default:
              type = dataType.toString(16);
              typedValue.value = this.readU32();
              typedValue.type = "unknown";
          }
          end = start + size;
          if (this.cursor !== end) {
            type = dataType.toString(16);
            diff = end - this.cursor;
            this.cursor = end;
          }
          return typedValue;
        };
        BinaryXmlParser2.prototype.convertIntToFloat = function(int) {
          var buf;
          buf = new ArrayBuffer(4);
          new (Int32Array(buf)[0] = buf)();
          return new Float32Array(buf)[0];
        };
        BinaryXmlParser2.prototype.readString = function(encoding) {
          var byteLength, stringLength, value;
          switch (encoding) {
            case "utf-8":
              stringLength = this.readLength8(encoding);
              byteLength = this.readLength8(encoding);
              value = this.buffer.toString(encoding, this.cursor, this.cursor += byteLength);
              this.readU16();
              return value;
            case "ucs2":
              stringLength = this.readLength16(encoding);
              byteLength = stringLength * 2;
              value = this.buffer.toString(encoding, this.cursor, this.cursor += byteLength);
              this.readU16();
              return value;
            default:
              throw new Error("Unsupported encoding '" + encoding + "'");
          }
        };
        BinaryXmlParser2.prototype.readChunkHeader = function() {
          return {
            chunkType: this.readU16(),
            headerSize: this.readU16(),
            chunkSize: this.readU32()
          };
        };
        BinaryXmlParser2.prototype.readStringPool = function(header) {
          var anchor, encoding, i, j, offsets, ref1, ref2;
          header.stringCount = this.readU32();
          header.styleCount = this.readU32();
          header.flags = this.readU32();
          header.stringsStart = this.readU32();
          header.stylesStart = this.readU32();
          if (header.chunkType !== ChunkType.STRING_POOL) {
            throw new Error("Invalid string pool header");
          }
          anchor = this.cursor;
          offsets = [];
          for (i = 0, ref1 = header.stringCount; 0 <= ref1 ? i < ref1 : i > ref1; 0 <= ref1 ? i++ : i--) {
            offsets.push(this.readU32());
          }
          encoding = header.flags & StringFlags.UTF8 ? "utf-8" : "ucs2";
          this.cursor = anchor + header.stringsStart - header.headerSize;
          for (j = 0, ref2 = header.stringCount; 0 <= ref2 ? j < ref2 : j > ref2; 0 <= ref2 ? j++ : j--) {
            this.strings.push(this.readString(encoding));
          }
          this.cursor = anchor + header.chunkSize - header.headerSize;
          return null;
        };
        BinaryXmlParser2.prototype.readResourceMap = function(header) {
          var count, i, ref1;
          count = Math.floor((header.chunkSize - header.headerSize) / 4);
          for (i = 0, ref1 = count; 0 <= ref1 ? i < ref1 : i > ref1; 0 <= ref1 ? i++ : i--) {
            this.resources.push(this.readU32());
          }
          return null;
        };
        BinaryXmlParser2.prototype.readXmlNamespaceStart = function(header) {
          var commentRef, line, prefixRef, uriRef;
          line = this.readU32();
          commentRef = this.readU32();
          prefixRef = this.readS32();
          uriRef = this.readS32();
          return null;
        };
        BinaryXmlParser2.prototype.readXmlNamespaceEnd = function(header) {
          var commentRef, line, prefixRef, uriRef;
          line = this.readU32();
          commentRef = this.readU32();
          prefixRef = this.readS32();
          uriRef = this.readS32();
          return null;
        };
        BinaryXmlParser2.prototype.readXmlElementStart = function(header) {
          var attrCount, attrSize, attrStart, classIndex, commentRef, i, idIndex, line, nameRef, node, nsRef, ref1, styleIndex;
          node = {
            namespaceURI: null,
            nodeType: NodeType.ELEMENT_NODE,
            nodeName: null,
            attributes: [],
            childNodes: []
          };
          line = this.readU32();
          commentRef = this.readU32();
          nsRef = this.readS32();
          nameRef = this.readS32();
          if (nsRef > 0) {
            node.namespaceURI = this.strings[nsRef];
          }
          node.nodeName = this.strings[nameRef];
          attrStart = this.readU16();
          attrSize = this.readU16();
          attrCount = this.readU16();
          idIndex = this.readU16();
          classIndex = this.readU16();
          styleIndex = this.readU16();
          for (i = 0, ref1 = attrCount; 0 <= ref1 ? i < ref1 : i > ref1; 0 <= ref1 ? i++ : i--) {
            node.attributes.push(this.readXmlAttribute());
          }
          if (this.document) {
            this.parent.childNodes.push(node);
            this.parent = node;
          } else {
            this.document = this.parent = node;
          }
          this.stack.push(node);
          return node;
        };
        BinaryXmlParser2.prototype.readXmlAttribute = function() {
          var attr, nameRef, nsRef, valueRef;
          attr = {
            namespaceURI: null,
            nodeType: NodeType.ATTRIBUTE_NODE,
            nodeName: null,
            name: null,
            value: null,
            typedValue: null
          };
          nsRef = this.readS32();
          nameRef = this.readS32();
          valueRef = this.readS32();
          if (nsRef > 0) {
            attr.namespaceURI = this.strings[nsRef];
          }
          attr.nodeName = attr.name = this.strings[nameRef];
          if (valueRef > 0) {
            attr.value = this.strings[valueRef];
          }
          attr.typedValue = this.readTypedValue();
          return attr;
        };
        BinaryXmlParser2.prototype.readXmlElementEnd = function(header) {
          var commentRef, line, nameRef, nsRef;
          line = this.readU32();
          commentRef = this.readU32();
          nsRef = this.readS32();
          nameRef = this.readS32();
          this.stack.pop();
          this.parent = this.stack[this.stack.length - 1];
          return null;
        };
        BinaryXmlParser2.prototype.readXmlCData = function(header) {
          var cdata, commentRef, dataRef, line;
          cdata = {
            namespaceURI: null,
            nodeType: NodeType.CDATA_SECTION_NODE,
            nodeName: "#cdata",
            data: null,
            typedValue: null
          };
          line = this.readU32();
          commentRef = this.readU32();
          dataRef = this.readS32();
          if (dataRef > 0) {
            cdata.data = this.strings[dataRef];
          }
          cdata.typedValue = this.readTypedValue();
          this.parent.childNodes.push(cdata);
          return cdata;
        };
        BinaryXmlParser2.prototype.readNull = function(header) {
          this.cursor += header.chunkSize - header.headerSize;
          return null;
        };
        BinaryXmlParser2.prototype.parse = function() {
          var diff, end, header, resMapHeader, start, type, xmlHeader;
          xmlHeader = this.readChunkHeader();
          if (xmlHeader.chunkType !== ChunkType.XML) {
            throw new Error("Invalid XML header");
          }
          this.readStringPool(this.readChunkHeader());
          resMapHeader = this.readChunkHeader();
          if (resMapHeader.chunkType === ChunkType.XML_RESOURCE_MAP) {
            this.readResourceMap(resMapHeader);
            this.readXmlNamespaceStart(this.readChunkHeader());
          } else {
            this.readXmlNamespaceStart(resMapHeader);
          }
          while (this.cursor < this.buffer.length) {
            start = this.cursor;
            header = this.readChunkHeader();
            switch (header.chunkType) {
              case ChunkType.XML_START_NAMESPACE:
                this.readXmlNamespaceStart(header);
                break;
              case ChunkType.XML_END_NAMESPACE:
                this.readXmlNamespaceEnd(header);
                break;
              case ChunkType.XML_START_ELEMENT:
                this.readXmlElementStart(header);
                break;
              case ChunkType.XML_END_ELEMENT:
                this.readXmlElementEnd(header);
                break;
              case ChunkType.XML_CDATA:
                this.readXmlCData(header);
                break;
              case ChunkType.NULL:
                this.readNull(header);
                break;
              default:
                throw new Error("Unsupported chunk type '" + header.chunkType + "'");
            }
            end = start + header.chunkSize;
            if (this.cursor !== end) {
              diff = end - this.cursor;
              type = header.chunkType.toString(16);
              this.cursor = end;
            }
          }
          return this.document;
        };
        BinaryXmlParser2.prototype.simpleParse = function() {
          var data, document;
          document = this.parse();
          data = {};
          this._simplifyDocumentData(data, document);
          return data;
        };
        BinaryXmlParser2.prototype._simplifyDocumentData = function(data, document) {
          var attr, i, len1, ref1, results;
          data[document.nodeName] = {};
          ref1 = document.attributes;
          results = [];
          for (i = 0, len1 = ref1.length; i < len1; i++) {
            attr = ref1[i];
            results.push(data[document.nodeName][attr.nodeName] = attr.typedValue.value);
          }
          return results;
        };
        return BinaryXmlParser2;
      }();
      module2.exports = BinaryXmlParser;
    }).call(exports);
  }
});

// node_modules/app-bundle-info/lib/AndroidAppBundleInfo.js
var require_AndroidAppBundleInfo = __commonJS({
  "node_modules/app-bundle-info/lib/AndroidAppBundleInfo.js"(exports, module2) {
    (function() {
      var AndroidAppBundleInfo, AppBundleInfo, BinaryXML, apkParser, stream, streamToBuffer, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      AppBundleInfo = require_AppBundleInfo();
      stream = require("stream");
      streamToBuffer = require_stream_to_buffer();
      apkParser = require_lib5();
      BinaryXML = require_BinaryXML();
      AndroidAppBundleInfo = function(superClass) {
        extend(AndroidAppBundleInfo2, superClass);
        AndroidAppBundleInfo2.prototype.manifestPath = "AndroidManifest.xml";
        function AndroidAppBundleInfo2(pathOrStream) {
          AndroidAppBundleInfo2.__super__.constructor.call(this, pathOrStream);
          this._infoLoaded = false;
          this._info = {};
          this.type = "android";
        }
        AndroidAppBundleInfo2.prototype._loadFileInfo = function(callback) {
          if (this._infoLoaded) {
            return callback();
          }
          return this.findFileStream(this.manifestPath, function(_this) {
            return function(err, fileStream) {
              if (err) {
                return callback(err);
              }
              return streamToBuffer(fileStream, function(err2, data) {
                var bxml;
                bxml = new BinaryXML(data);
                _this._info.manifest = bxml.simpleParse().manifest;
                _this._infoLoaded = true;
                return callback();
              });
            };
          }(this));
        };
        AndroidAppBundleInfo2.prototype.loadInfo = function(callback) {
          return this.getManifest(callback);
        };
        AndroidAppBundleInfo2.prototype.getManifest = function(callback) {
          return this._loadFileInfo(function(_this) {
            return function(err) {
              if (err) {
                return callback(err);
              }
              return callback(null, _this._info.manifest);
            };
          }(this));
        };
        AndroidAppBundleInfo2.prototype.getIconFile = function(callback) {
          var find, lookupOrdered;
          find = function(_this) {
            return function(index, cb) {
              var path2;
              if (!lookupOrdered[index]) {
                return cb(new Error("Icon not found"));
              }
              path2 = lookupOrdered[index];
              return _this.findFileStream(path2, function(err, datas) {
                if (err) {
                  return find(index + 1, cb);
                } else {
                  return cb(null, datas);
                }
              });
            };
          }(this);
          lookupOrdered = ["**/mipmap-xxxhdpi*/ic_launcher.png", "**/drawable-xxxhdpi*/ic_launcher.png", "**/mipmap-xxhdpi*/ic_launcher.png", "**/drawable-xxhdpi*/ic_launcher.png", "**/mipmap-xhdpi*/ic_launcher.png", "**/drawable-xhdpi*/ic_launcher.png", "**/mipmap-hdpi*/ic_launcher.png", "**/drawable-hdpi*/ic_launcher.png", "**/mipmap-*/ic_launcher.png", "**/drawable-*/ic_launcher.png"];
          return find(0, callback);
        };
        AndroidAppBundleInfo2.prototype.getIdentifier = function() {
          var ref, ref1;
          return (ref = this._info) != null ? (ref1 = ref.manifest) != null ? ref1["package"] : void 0 : void 0;
        };
        AndroidAppBundleInfo2.prototype.getName = function() {
          var ref, ref1;
          return (ref = this._info) != null ? (ref1 = ref.manifest) != null ? ref1["package"] : void 0 : void 0;
        };
        AndroidAppBundleInfo2.prototype.getVersionName = function() {
          var ref, ref1;
          return (ref = this._info) != null ? (ref1 = ref.manifest) != null ? ref1.versionName : void 0 : void 0;
        };
        AndroidAppBundleInfo2.prototype.getVersionCode = function() {
          var ref, ref1;
          return (ref = this._info) != null ? (ref1 = ref.manifest) != null ? ref1.versionCode : void 0 : void 0;
        };
        return AndroidAppBundleInfo2;
      }(AppBundleInfo);
      module2.exports = AndroidAppBundleInfo;
    }).call(exports);
  }
});

// node_modules/app-bundle-info/index.js
var require_app_bundle_info = __commonJS({
  "node_modules/app-bundle-info/index.js"(exports, module2) {
    (function() {
      var AndroidBundleInfo, AppBundleInfo, iOSBundleInfo;
      module2.exports = AppBundleInfo = require_iOSAppBundleInfo();
      module2.exports.iOS = module2.exports.ios = iOSBundleInfo = require_iOSAppBundleInfo();
      module2.exports.Android = module2.exports.android = AndroidBundleInfo = require_AndroidAppBundleInfo();
      module2.exports.autodetect = function(fileOrStream, callback) {
        var abi;
        abi = new AppBundleInfo(fileOrStream);
        return abi.findFileStream(AndroidBundleInfo.prototype.manifestPath, function(err, manifest2) {
          var bi;
          if (manifest2) {
            bi = new AndroidBundleInfo(null);
            bi.extracted = true;
            bi.extractPath = abi.extractPath;
            return callback(null, bi);
          }
          return abi.findFileStream(iOSBundleInfo.prototype.plistPath, function(err2, plist) {
            if (plist) {
              bi = new iOSBundleInfo(null);
              bi.extracted = true;
              bi.extractPath = abi.extractPath;
              return callback(null, bi);
            }
            return callback(new Error("could not recognize bundle"));
          });
        });
      };
    }).call(exports);
  }
});

// node_modules/ipa-bundler/index.js
var require_ipa_bundler = __commonJS({
  "node_modules/ipa-bundler/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.manifest = exports.html = exports.link = exports.writeBundle = exports.createBundle = void 0;
    var path_1 = require("path");
    if (require.main === module2) {
      const [ipaPath, baseURL] = process.argv.slice(2);
      if (!ipaPath || !baseURL) {
        console.log("Usage: ipa-bundler <ipa-file> <baseurl>");
        process.exit(1);
      } else {
        writeBundle({ ipaPath, baseURL }).catch(console.error);
      }
    }
    function hasIpaPath(opt) {
      return "ipaPath" in opt && typeof opt.ipaPath === "string";
    }
    async function createBundle(inputOptions) {
      const options = Object.assign({
        outDir: ".",
        htmlFile: "index.html",
        manifestFile: "manifest.plist"
      }, inputOptions);
      const manifestUrl = new URL((0, path_1.basename)(options.manifestFile), options.baseURL).toString();
      const ipaUrl = new URL((0, path_1.basename)(options.manifestFile), options.baseURL).toString();
      if (hasIpaPath(options)) {
        const { createReadStream: createReadStream2 } = await Promise.resolve().then(() => require("fs"));
        let module3;
        try {
          module3 = await Promise.resolve().then(() => require_app_bundle_info());
        } catch (e) {
          throw new Error("When setting ipaPath, the optional dependency app-bundle-info must be installed.");
        }
        const bundle = new module3.iOS(createReadStream2(options.ipaPath));
        const info = await new Promise((resolve, reject) => bundle.loadInfo((err, info2) => err ? reject(err) : resolve(info2)));
        const appDetails = Object.assign(options, {
          bundleIdentifier: info.CFBundleIdentifier,
          bundleVersion: info.CFBundleVersion,
          bundleMarketingVersion: info.CFBundleShortVersionString,
          appTitle: info.CFBundleDisplayName || info.CFBundleName,
          appIcon: await parseImage2(bundle)
        });
        return {
          [options.htmlFile]: html(manifestUrl, appDetails),
          [options.manifestFile]: manifest2(ipaUrl, appDetails)
        };
      }
      return {
        [options.htmlFile]: html(manifestUrl, options),
        [options.manifestFile]: manifest2(ipaUrl, options)
      };
    }
    exports.createBundle = createBundle;
    async function writeBundle(inputOptions) {
      const { writeFile: writeFile2 } = require("fs");
      const { promisify: promisify2 } = require("util");
      const assets = await createBundle(inputOptions);
      return Promise.all(Object.entries(assets).map(([file, data]) => promisify2(writeFile2)(file, data, { encoding: "utf8" })));
    }
    exports.writeBundle = writeBundle;
    function link2(manifest3) {
      return `itms-services://?action=download-manifest&url=${encodeURIComponent(manifest3)}`;
    }
    exports.link = link2;
    function html(manifestUrl, options) {
      const maybeImage = options.appIcon ? `<img width=200 height=200 src="data:image/${extension2(options.appIcon)};base64,${options.appIcon.toString("base64")}" /> ` : "";
      return `
<a href="${link2(manifestUrl)}">
  ${maybeImage}
  <span class="caption">Install <span class="title">${options.appTitle}</span> (${options.bundleMarketingVersion} / ${options.bundleVersion})</span>
</a>`.trim();
    }
    exports.html = html;
    function manifest2(ipaUrl, options) {
      return `
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
      <key>items</key>
      <array>
        <dict>
          <key>assets</key>
          <array>
            <dict>
              <key>kind</key>
              <string>software-package</string>
              <key>url</key>
              <string>${ipaUrl}</string>
            </dict>
          </array>
          <key>metadata</key>
          <dict>
            <key>bundle-identifier</key>
            <string>${options.bundleIdentifier}</string>
            <key>bundle-version</key>
            <string>${options.bundleVersion}</string>
            <key>kind</key>
            <string>software</string>
            <key>title</key>
            <string>${options.appTitle}</string>
          </dict>
        </dict>
      </array>
    </dict>
  </plist>
  `.trim();
    }
    exports.manifest = manifest2;
    function parseImage2(bundle) {
      return new Promise((resolve, reject) => bundle.getIconFile((err, iconStream) => {
        if (err) {
          return reject(err);
        }
        var bufs = [];
        iconStream.on("data", (d) => bufs.push(d));
        iconStream.on("end", () => resolve(Buffer.concat(bufs)));
      }));
    }
    function extension2(buf) {
      switch (buf.slice(0, 2).toString("hex")) {
        case "ffd8":
          return "jpg";
        case "8950":
          return "png";
        default:
          return "unknown";
      }
    }
  }
});

// index.ts
var s3_slurp_exports = {};
__export(s3_slurp_exports, {
  qr: () => qr
});
var core = __toESM(require_core());
var fs = __toESM(require("fs"));
var import_glob = __toESM(require_glob());
var import_ipa_bundler = __toESM(require_ipa_bundler());
var ABI = __toESM(require_app_bundle_info());
var path = __toESM(require("path"));
var os = __toESM(require("os"));
var import_util = require("util");
var import_path = require("path");
var import_child_process = require("child_process");
run().catch(console.error);
async function run() {
  const bucket = s3name(core.getInput("bucket", { required: true }));
  const destinationPath = core.getInput("destinationPath", { required: false }) || "/";
  const destinationUrl = core.getInput("destinationUrl", { required: false }) || `https://${bucket}.s3.amazonaws.com${path.join("/", destinationPath, "/")}`;
  const sourcePaths = core.getInput("sourcePaths", { required: true });
  const dest = await (0, import_util.promisify)(fs.mkdtemp)(path.join(os.tmpdir(), "hubrise"));
  const files = await glop(sourcePaths, {});
  const data = await Promise.all(files.map((file, index) => handleFile(file, index).catch((e) => {
    console.error(`Failed to process file '${file}': ${e}`);
  })));
  const apps = data.filter((v) => v && true);
  console.log(data);
  await (0, import_util.promisify)(fs.writeFile)(path.join(dest, "index.json"), JSON.stringify(data, null, 2));
  await (0, import_util.promisify)(fs.writeFile)(path.join(dest, "index.html"), landing(apps, `${destinationUrl}/index.html`));
  core.setOutput("url", `${destinationUrl}/index.html`);
  const remote = `s3://${path.join(bucket, destinationPath)}`;
  console.log(`Syncing ${dest} to ${remote}`);
  await (0, import_util.promisify)(import_child_process.exec)(`aws s3 sync ${dest} ${remote} --acl public-read;`);
  async function handleFile(file, index) {
    const bundle = await autodetect2(fs.createReadStream(file)).catch((e) => {
      throw e;
    });
    const destFile = `${index}-${(0, import_path.basename)(file)}`;
    await (0, import_util.promisify)(fs.copyFile)(file, path.join(dest, destFile));
    const destUrl = new URL(destFile, destinationUrl).toString();
    const icon = await parseImage(bundle);
    await (0, import_util.promisify)(fs.writeFile)(path.join(path.join(dest, `${index}-icon.${extension(icon)}`)), icon);
    if (bundle.type === "ios") {
      const info = await new Promise((r, e) => bundle.loadInfo((err, info2) => err ? e(err) : r(info2)));
      const details = {
        bundleIdentifier: info.CFBundleIdentifier,
        bundleVersion: info.CFBundleVersion,
        bundleMarketingVersion: info.CFBundleShortVersionString,
        appTitle: info.CFBundleDisplayName || info.CFBundleName
      };
      await (0, import_util.promisify)(fs.writeFile)(path.join(path.join(dest, `${index}-manifest.plist`)), (0, import_ipa_bundler.manifest)(destUrl, { ...details, appIcon: icon }));
      return {
        ...details,
        appFile: file,
        urls: {
          abi: destUrl,
          manifest: new URL(`${index}-manifest.plist`, destinationUrl).toString(),
          icon: new URL(`${index}-icon.${extension(icon)}`, destinationUrl).toString()
        }
      };
    } else {
      const info = await new Promise((r, e) => bundle.loadInfo((err, info2) => err ? e(err) : r(info2)));
      return {
        bundleIdentifier: info.package,
        bundleVersion: info.versionCode || info.versionName,
        bundleMarketingVersion: info.versionName,
        appTitle: info.package,
        appFile: file,
        urls: {
          abi: destUrl,
          icon: new URL(`${index}-icon.${extension(icon)}`, destinationUrl).toString()
        }
      };
    }
  }
}
function s3name(s3scheme) {
  if (s3scheme.startsWith("s3://")) {
    s3scheme = s3scheme.replace(/^s3:\/\/\/?/, "");
  }
  return s3scheme;
}
function autodetect2(stream) {
  return new Promise((resolve, reject) => ABI.autodetect(stream, (err, data) => err ? reject(err) : resolve(data)));
}
function glop(glb, options) {
  return new Promise((resolve, reject) => (0, import_glob.default)(glb, {}, (err, paths) => err ? reject(err) : resolve(paths)));
}
function parseImage(bundle) {
  return new Promise((resolve, reject) => bundle.getIconFile((err, iconStream) => {
    if (err) {
      return reject(err);
    }
    var bufs = [];
    iconStream.on("data", (d) => bufs.push(d));
    iconStream.on("end", () => resolve(Buffer.concat(bufs)));
  }));
}
function extension(buf) {
  switch (buf.slice(0, 2).toString("hex")) {
    case "ffd8":
      return "jpg";
    case "8950":
      return "png";
    default:
      return "unknown";
  }
}
function landing(data, rootUrl) {
  const items = data.map((options) => {
    const maybeImage = options.urls.icon ? `<img width=200 height=200 src="${options.urls.icon}" /> ` : "";
    const href = options.urls.manifest ? (0, import_ipa_bundler.link)(options.urls.manifest) : options.urls.abi;
    return `
<a href="${href}">
  ${maybeImage}
  <span class="caption">Install <span class="title">${options.appTitle}</span> (${options.bundleMarketingVersion} / ${options.bundleVersion})</span>
  <div><span class="file">${options.appFile}</span></div>
</a>`.trim();
  });
  return `
<div>
  <a href="${rootUrl}"><img src="${qr(rootUrl, 200)}" />
  Scan the QR to open this page on a mobile device.
</a></div>
<ul>${items.map((html) => `<li>${html}</li>`).join("")}</ul>
`.trim();
}
function qr(url, size) {
  size = encodeURIComponent(size || "150");
  if (!url) {
    console.log("Usage: qr <url> <size>");
    process.exit(1);
  } else {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
  }
}
module.exports = __toCommonJS(s3_slurp_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  qr
});
/*!
 *  Copyright 2008 Fair Oaks Labs, Inc.
 *  All rights reserved.
 */
/*!
 * Tmp
 *
 * Copyright (c) 2011-2015 KARASZI Istvan <github@spam.raszi.hu>
 *
 * MIT Licensed
 */
