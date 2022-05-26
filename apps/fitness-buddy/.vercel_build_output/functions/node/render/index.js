var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, {
          get: () => from[key2],
          enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError('Cannot ' + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, 'read from private field');
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError('Cannot add the same private member more than once');
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, 'write to private field');
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// ../../node_modules/.pnpm/@sveltejs+kit@1.0.0-next.335_svelte@3.48.0/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData,
});
function _fileName(headerValue) {
  const m2 = headerValue.match(
    /\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i,
  );
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || '';
  let filename = match.slice(match.lastIndexOf('\\') + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError('Failed to fetch');
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError('no or bad content-type header, no multipart boundary');
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder('utf-8');
  decoder.decode();
  parser.onPartBegin = function () {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = '';
    headerValue = '';
    entryValue = '';
    entryName = '';
    contentType = '';
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function (ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function (ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function () {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === 'content-disposition') {
      const m3 = headerValue.match(
        /\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i,
      );
      if (m3) {
        entryName = m3[2] || m3[3] || '';
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === 'content-type') {
      contentType = headerValue;
    }
    headerValue = '';
    headerField = '';
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_worker_threads,
  s,
  S,
  f,
  F,
  LF,
  CR,
  SPACE,
  HYPHEN,
  COLON,
  A,
  Z,
  lower,
  noop,
  MultipartParser;
var init_multipart_parser = __esm({
  '../../node_modules/.pnpm/@sveltejs+kit@1.0.0-next.335_svelte@3.48.0/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js'() {
    import_node_worker_threads = require('worker_threads');
    init_install_fetch();
    globalThis.DOMException ||
      (() => {
        const port = new import_node_worker_threads.MessageChannel().port1;
        const ab = new ArrayBuffer(0);
        try {
          port.postMessage(ab, [ab, ab]);
        } catch (err) {
          return err.constructor;
        }
      })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++,
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: (f *= 2),
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {};
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = '\r\n--' + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + 'Mark'] = i2;
        };
        const clear = (name) => {
          delete this[name + 'Mark'];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + 'Mark';
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback('onPartBegin');
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark('onHeaderField');
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear('onHeaderField');
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback('onHeaderField', true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark('onHeaderValue');
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback('onHeaderValue', true);
                callback('onHeaderEnd');
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback('onHeadersEnd');
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark('onPartData');
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback('onPartData', true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback('onPartEnd');
                    callback('onPartBegin');
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback('onPartEnd');
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(
                  lookbehind.buffer,
                  lookbehind.byteOffset,
                  lookbehind.byteLength,
                );
                callback('onPartData', 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark('onPartData');
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback('onHeaderField');
        dataCallback('onHeaderValue');
        dataCallback('onPartData');
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (
          (this.state === S.HEADER_FIELD_START && this.index === 0) ||
          (this.state === S.PART_DATA && this.index === this.boundary.length)
        ) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error('MultipartParser.end(): stream ended unexpectedly');
        }
      }
    };
  },
});

// ../../node_modules/.pnpm/@sveltejs+kit@1.0.0-next.335_svelte@3.48.0/node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError(
      '`uri` does not appear to be a Data URI (must begin with "data:")',
    );
  }
  uri = uri.replace(/\r?\n/g, '');
  const firstComma = uri.indexOf(',');
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError('malformed data: URI');
  }
  const meta = uri.substring(5, firstComma).split(';');
  let charset = '';
  let base642 = false;
  const type = meta[0] || 'text/plain';
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === 'base64') {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf('charset=') === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ';charset=US-ASCII';
    charset = 'US-ASCII';
  }
  const encoding = base642 ? 'base64' : 'ascii';
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ('stream' in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(
          position,
          Math.min(part.size, position + POOL_SIZE),
        );
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, '').slice(-28).padStart(32, '-'),
    c = [],
    p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) =>
    typeof v == 'string'
      ? c.push(
          p +
            e(n) +
            `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, '\r\n')}\r
`,
        )
      : c.push(
          p +
            e(n) +
            `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || 'application/octet-stream'}\r
\r
`,
          v,
          '\r\n',
        ),
  );
  c.push(`--${b}--`);
  return new B(c, { type: 'multipart/form-data; boundary=' + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(
          `content size at ${data.url} over limit: ${data.size}`,
          'max-size',
        );
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ =
      error2 instanceof FetchBaseError
        ? error2
        : new FetchError(
            `Invalid response body while trying to fetch ${data.url}: ${error2.message}`,
            'system',
            error2,
          );
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === 'string')) {
        return Buffer.from(accum.join(''));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(
        `Could not create Buffer from response body for ${data.url}: ${error2.message}`,
        'system',
        error2,
      );
    }
  } else {
    throw new FetchError(
      `Premature close of server response while trying to fetch ${data.url}`,
    );
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(
    headers
      .reduce((result, value, index, array) => {
        if (index % 2 === 0) {
          result.push(array.slice(index, index + 2));
        }
        return result;
      }, [])
      .filter(([name, value]) => {
        try {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return true;
        } catch {
          return false;
        }
      }),
  );
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return 'no-referrer';
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return 'no-referrer';
  }
  url.username = '';
  url.password = '';
  url.hash = '';
  if (originOnly) {
    url.pathname = '';
    url.search = '';
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, '');
  const hostIPVersion = (0, import_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === 'file:') {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === 'data:') {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(
  request,
  { referrerURLCallback, referrerOriginCallback } = {},
) {
  if (request.referrer === 'no-referrer' || request.referrerPolicy === '') {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === 'about:client') {
    return 'no-referrer';
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case 'no-referrer':
      return 'no-referrer';
    case 'origin':
      return referrerOrigin;
    case 'unsafe-url':
      return referrerURL;
    case 'strict-origin':
      if (
        isUrlPotentiallyTrustworthy(referrerURL) &&
        !isUrlPotentiallyTrustworthy(currentURL)
      ) {
        return 'no-referrer';
      }
      return referrerOrigin.toString();
    case 'strict-origin-when-cross-origin':
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (
        isUrlPotentiallyTrustworthy(referrerURL) &&
        !isUrlPotentiallyTrustworthy(currentURL)
      ) {
        return 'no-referrer';
      }
      return referrerOrigin;
    case 'same-origin':
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return 'no-referrer';
    case 'origin-when-cross-origin':
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case 'no-referrer-when-downgrade':
      if (
        isUrlPotentiallyTrustworthy(referrerURL) &&
        !isUrlPotentiallyTrustworthy(currentURL)
      ) {
        return 'no-referrer';
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get('referrer-policy') || '').split(/[,\s]+/);
  let policy = '';
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(
        `node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(
          /:$/,
          '',
        )}" is not supported.`,
      );
    }
    if (parsedURL.protocol === 'data:') {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, {
        headers: { 'Content-Type': data.typeFull },
      });
      resolve2(response2);
      return;
    }
    const send = (
      parsedURL.protocol === 'https:'
        ? import_node_https.default
        : import_node_http.default
    ).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError('The operation was aborted.');
      reject(error2);
      if (
        request.body &&
        request.body instanceof import_node_stream.default.Readable
      ) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit('error', error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener('abort', abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener('abort', abortAndFinalize);
      }
    };
    request_.on('error', (error2) => {
      reject(
        new FetchError(
          `request to ${request.url} failed, reason: ${error2.message}`,
          'system',
          error2,
        ),
      );
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < 'v14') {
      request_.on('socket', (s3) => {
        let endedWithEventsCount;
        s3.prependListener('end', () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener('close', (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error('Premature close');
            error2.code = 'ERR_STREAM_PREMATURE_CLOSE';
            response.body.emit('error', error2);
          }
        });
      });
    }
    request_.on('response', (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get('Location');
        const locationURL =
          location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case 'error':
            reject(
              new FetchError(
                `uri requested responds with a redirect, redirect mode is set to error: ${request.url}`,
                'no-redirect',
              ),
            );
            finalize();
            return;
          case 'manual':
            if (locationURL !== null) {
              headers.set('Location', locationURL);
            }
            break;
          case 'follow': {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(
                new FetchError(
                  `maximum redirect reached at: ${request.url}`,
                  'max-redirect',
                ),
              );
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy,
            };
            if (
              response_.statusCode !== 303 &&
              request.body &&
              options_.body instanceof import_node_stream.default.Readable
            ) {
              reject(
                new FetchError(
                  'Cannot follow redirect with body being a readable stream',
                  'unsupported-redirect',
                ),
              );
              finalize();
              return;
            }
            if (
              response_.statusCode === 303 ||
              ((response_.statusCode === 301 || response_.statusCode === 302) &&
                request.method === 'POST')
            ) {
              requestOptions.method = 'GET';
              requestOptions.body = void 0;
              requestOptions.headers.delete('content-length');
            }
            const responseReferrerPolicy =
              parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(
              new TypeError(
                `Redirect option '${request.redirect}' is not a valid value of RequestRedirect`,
              ),
            );
        }
      }
      if (signal) {
        response_.once('end', () => {
          signal.removeEventListener('abort', abortAndFinalize);
        });
      }
      let body = (0, import_node_stream.pipeline)(
        response_,
        new import_node_stream.PassThrough(),
        reject,
      );
      if (process.version < 'v12.10') {
        response_.on('aborted', abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark,
      };
      const codings = headers.get('Content-Encoding');
      if (
        !request.compress ||
        request.method === 'HEAD' ||
        codings === null ||
        response_.statusCode === 204 ||
        response_.statusCode === 304
      ) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH,
      };
      if (codings === 'gzip' || codings === 'x-gzip') {
        body = (0, import_node_stream.pipeline)(
          body,
          import_node_zlib.default.createGunzip(zlibOptions),
          reject,
        );
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === 'deflate' || codings === 'x-deflate') {
        const raw = (0, import_node_stream.pipeline)(
          response_,
          new import_node_stream.PassThrough(),
          reject,
        );
        raw.once('data', (chunk) => {
          body =
            (chunk[0] & 15) === 8
              ? (0, import_node_stream.pipeline)(
                  body,
                  import_node_zlib.default.createInflate(),
                  reject,
                )
              : (0, import_node_stream.pipeline)(
                  body,
                  import_node_zlib.default.createInflateRaw(),
                  reject,
                );
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === 'br') {
        body = (0, import_node_stream.pipeline)(
          body,
          import_node_zlib.default.createBrotliDecompress(),
          reject,
        );
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from('0\r\n\r\n');
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on('response', (response) => {
    const { headers } = response;
    isChunkedTransfer =
      headers['transfer-encoding'] === 'chunked' && !headers['content-length'];
  });
  request.on('socket', (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error('Premature close');
        error2.code = 'ERR_STREAM_PREMATURE_CLOSE';
        errorCallback(error2);
      }
    };
    socket.prependListener('close', onSocketClose);
    request.on('abort', () => {
      socket.removeListener('close', onSocketClose);
    });
    socket.on('data', (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived =
          Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) ===
            0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installFetch() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2,
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2,
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2,
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2,
    },
  });
}
var import_node_http,
  import_node_https,
  import_node_zlib,
  import_node_stream,
  import_node_util,
  import_node_url,
  import_net,
  commonjsGlobal,
  ponyfill_es2018,
  POOL_SIZE$1,
  POOL_SIZE,
  _parts,
  _type,
  _size,
  _a,
  _Blob,
  Blob,
  Blob$1,
  _lastModified,
  _name,
  _a2,
  _File,
  File,
  t,
  i,
  h,
  r,
  m,
  f2,
  e,
  x,
  _d,
  _a3,
  FormData,
  FetchBaseError,
  FetchError,
  NAME,
  isURLSearchParameters,
  isBlob,
  isAbortSignal,
  INTERNALS$2,
  Body,
  clone,
  getNonSpecFormDataBoundary,
  extractContentType,
  getTotalBytes,
  writeToStream,
  validateHeaderName,
  validateHeaderValue,
  Headers2,
  redirectStatus,
  isRedirect,
  INTERNALS$1,
  Response2,
  getSearch,
  ReferrerPolicy,
  DEFAULT_REFERRER_POLICY,
  INTERNALS,
  isRequest,
  Request2,
  getNodeRequestOptions,
  AbortError,
  supportedSchemas;
var init_install_fetch = __esm({
  '../../node_modules/.pnpm/@sveltejs+kit@1.0.0-next.335_svelte@3.48.0/node_modules/@sveltejs/kit/dist/install-fetch.js'() {
    import_node_http = __toESM(require('http'), 1);
    import_node_https = __toESM(require('https'), 1);
    import_node_zlib = __toESM(require('zlib'), 1);
    import_node_stream = __toESM(require('stream'), 1);
    import_node_util = require('util');
    import_node_url = require('url');
    import_net = require('net');
    commonjsGlobal =
      typeof globalThis !== 'undefined'
        ? globalThis
        : typeof window !== 'undefined'
        ? window
        : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
        ? self
        : {};
    ponyfill_es2018 = { exports: {} };
    (function (module2, exports) {
      (function (global2, factory) {
        factory(exports);
      })(commonjsGlobal, function (exports2) {
        const SymbolPolyfill =
          typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? Symbol
            : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== 'undefined') {
            return self;
          } else if (typeof window !== 'undefined') {
            return window;
          } else if (typeof commonjsGlobal !== 'undefined') {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return (
            (typeof x2 === 'object' && x2 !== null) || typeof x2 === 'function'
          );
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(
            PerformPromiseThen(promise, onFulfilled, onRejected),
            void 0,
            rethrowAssertionErrorRejection,
          );
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(
          promise,
          fulfillmentHandler,
          rejectionHandler,
        ) {
          return PerformPromiseThen(
            promise,
            fulfillmentHandler,
            rejectionHandler,
          );
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === 'function') {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== 'function') {
            throw new TypeError('Argument is not a function');
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0,
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0,
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === 'readable') {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === 'closed') {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(
              reader,
              stream._storedError,
            );
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === 'readable') {
            defaultReaderClosedPromiseReject(
              reader,
              new TypeError(
                `Reader was released and can no longer be used to monitor the stream's closedness`,
              ),
            );
          } else {
            defaultReaderClosedPromiseResetToRejected(
              reader,
              new TypeError(
                `Reader was released and can no longer be used to monitor the stream's closedness`,
              ),
            );
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError(
            'Cannot ' + name + ' a stream using a released reader',
          );
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(
          reader,
          reason,
        ) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill('[[AbortSteps]]');
        const ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
        const CancelSteps = SymbolPolyfill('[[CancelSteps]]');
        const PullSteps = SymbolPolyfill('[[PullSteps]]');
        const NumberIsFinite =
          Number.isFinite ||
          function (x2) {
            return typeof x2 === 'number' && isFinite(x2);
          };
        const MathTrunc =
          Math.trunc ||
          function (v) {
            return v < 0 ? Math.ceil(v) : Math.floor(v);
          };
        function isDictionary(x2) {
          return typeof x2 === 'object' || typeof x2 === 'function';
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== 'function') {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return (
            (typeof x2 === 'object' && x2 !== null) || typeof x2 === 'function'
          );
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(
              `Parameter ${position} is required in '${context}'.`,
            );
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(
              `${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`,
            );
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, 'ReadableStreamDefaultReader');
            assertReadableStream(stream, 'First parameter');
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError(
                'This stream has already been locked for exclusive reading by another reader',
              );
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(
                defaultReaderBrandCheckException('closed'),
              );
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(
                defaultReaderBrandCheckException('cancel'),
              );
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException('cancel'));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(
                defaultReaderBrandCheckException('read'),
              );
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException('read from'));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) =>
                resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2),
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException('releaseLock');
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError(
                'Tried to release a reader lock when that reader has pending read() calls un-settled',
              );
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            ReadableStreamDefaultReader.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'ReadableStreamDefaultReader',
              configurable: true,
            },
          );
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, '_readRequests')) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === 'closed') {
            readRequest._closeSteps();
          } else if (stream._state === 'errored') {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(
            `ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`,
          );
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(
          Object.getPrototypeOf(async function* () {}).prototype,
        );
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise
              ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps)
              : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise
              ? transformPromiseWith(
                  this._ongoingPromise,
                  returnSteps,
                  returnSteps,
                )
              : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException('iterate'));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() =>
                  resolvePromise({ value: chunk, done: false }),
                );
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              },
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(
                readerLockException('finish iterating'),
              );
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({
                value,
                done: true,
              }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(
                streamAsyncIteratorBrandCheckException('next'),
              );
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(
                streamAsyncIteratorBrandCheckException('return'),
              );
            }
            return this._asyncIteratorImpl.return(value);
          },
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(
            ReadableStreamAsyncIteratorPrototype,
            AsyncIteratorPrototype,
          );
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(
            reader,
            preventCancel,
          );
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, '_asyncIteratorImpl')) {
            return false;
          }
          try {
            return (
              x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl
            );
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(
            `ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`,
          );
        }
        const NumberIsNaN =
          Number.isNaN ||
          function (x2) {
            return x2 !== x2;
          };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(
            new Uint8Array(src, srcOffset, n),
            destOffset,
          );
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== 'number') {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(
            O.buffer,
            O.byteOffset,
            O.byteOffset + O.byteLength,
          );
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError(
              'Size must be a finite, non-NaN, non-negative number.',
            );
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError('Illegal constructor');
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException('view');
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException('respond');
            }
            assertRequiredArgument(bytesWritten, 1, 'respond');
            bytesWritten = convertUnsignedLongLongWithEnforceRange(
              bytesWritten,
              'First parameter',
            );
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError('This BYOB request has been invalidated');
            }
            if (IsDetachedBuffer(this._view.buffer));
            ReadableByteStreamControllerRespond(
              this._associatedReadableByteStreamController,
              bytesWritten,
            );
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException('respondWithNewView');
            }
            assertRequiredArgument(view, 1, 'respondWithNewView');
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError(
                'You can only respond with array buffer views',
              );
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError('This BYOB request has been invalidated');
            }
            if (IsDetachedBuffer(view.buffer));
            ReadableByteStreamControllerRespondWithNewView(
              this._associatedReadableByteStreamController,
              view,
            );
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            ReadableStreamBYOBRequest.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'ReadableStreamBYOBRequest',
              configurable: true,
            },
          );
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError('Illegal constructor');
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException('byobRequest');
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException('desiredSize');
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException('close');
            }
            if (this._closeRequested) {
              throw new TypeError(
                'The stream has already been closed; do not close it again!',
              );
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== 'readable') {
              throw new TypeError(
                `The stream (in ${state} state) is not in the readable state and cannot be closed`,
              );
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException('enqueue');
            }
            assertRequiredArgument(chunk, 1, 'enqueue');
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError('chunk must be an array buffer view');
            }
            if (chunk.byteLength === 0) {
              throw new TypeError('chunk must have non-zero byteLength');
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(
                `chunk's buffer must have non-zero byteLength`,
              );
            }
            if (this._closeRequested) {
              throw new TypeError('stream is closed or draining');
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== 'readable') {
              throw new TypeError(
                `The stream (in ${state} state) is not in the readable state and cannot be enqueued to`,
              );
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException('error');
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry5 = this._queue.shift();
              this._queueTotalSize -= entry5.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(
                entry5.buffer,
                entry5.byteOffset,
                entry5.byteLength,
              );
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: 'default',
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            ReadableByteStreamController.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'ReadableByteStreamController',
              configurable: true,
            },
          );
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_controlledReadableByteStream',
            )
          ) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_associatedReadableByteStreamController',
            )
          ) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull =
            ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(
            pullPromise,
            () => {
              controller._pulling = false;
              if (controller._pullAgain) {
                controller._pullAgain = false;
                ReadableByteStreamControllerCallPullIfNeeded(controller);
              }
            },
            (e2) => {
              ReadableByteStreamControllerError(controller, e2);
            },
          );
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(
          stream,
          pullIntoDescriptor,
        ) {
          let done = false;
          if (stream._state === 'closed') {
            done = true;
          }
          const filledView =
            ReadableByteStreamControllerConvertPullIntoDescriptor(
              pullIntoDescriptor,
            );
          if (pullIntoDescriptor.readerType === 'default') {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(
          pullIntoDescriptor,
        ) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(
            pullIntoDescriptor.buffer,
            pullIntoDescriptor.byteOffset,
            bytesFilled / elementSize,
          );
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(
          controller,
          buffer,
          byteOffset,
          byteLength,
        ) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(
          controller,
          pullIntoDescriptor,
        ) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes =
            pullIntoDescriptor.bytesFilled -
            (pullIntoDescriptor.bytesFilled % elementSize);
          const maxBytesToCopy = Math.min(
            controller._queueTotalSize,
            pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled,
          );
          const maxBytesFilled =
            pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes =
            maxBytesFilled - (maxBytesFilled % elementSize);
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining =
              maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(
              totalBytesToCopyRemaining,
              headOfQueue.byteLength,
            );
            const destStart =
              pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(
              pullIntoDescriptor.buffer,
              destStart,
              headOfQueue.buffer,
              headOfQueue.byteOffset,
              bytesToCopy,
            );
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(
              controller,
              bytesToCopy,
              pullIntoDescriptor,
            );
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(
          controller,
          size,
          pullIntoDescriptor,
        ) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController =
            void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(
          controller,
        ) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (
              ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(
                controller,
                pullIntoDescriptor,
              )
            ) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(
                controller._controlledReadableByteStream,
                pullIntoDescriptor,
              );
            }
          }
        }
        function ReadableByteStreamControllerPullInto(
          controller,
          view,
          readIntoRequest,
        ) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: 'byob',
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === 'closed') {
            const emptyView = new ctor(
              pullIntoDescriptor.buffer,
              pullIntoDescriptor.byteOffset,
              0,
            );
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (
              ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(
                controller,
                pullIntoDescriptor,
              )
            ) {
              const filledView =
                ReadableByteStreamControllerConvertPullIntoDescriptor(
                  pullIntoDescriptor,
                );
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError(
                'Insufficient bytes to fill elements in the given buffer',
              );
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(
          controller,
          firstDescriptor,
        ) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor =
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(
                stream,
                pullIntoDescriptor,
              );
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(
          controller,
          bytesWritten,
          pullIntoDescriptor,
        ) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(
            controller,
            bytesWritten,
            pullIntoDescriptor,
          );
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize =
            pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end =
              pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(
              pullIntoDescriptor.buffer,
              end - remainderSize,
              end,
            );
            ReadableByteStreamControllerEnqueueChunkToQueue(
              controller,
              remainder,
              0,
              remainder.byteLength,
            );
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(
            controller._controlledReadableByteStream,
            pullIntoDescriptor,
          );
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(
            controller,
          );
        }
        function ReadableByteStreamControllerRespondInternal(
          controller,
          bytesWritten,
        ) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === 'closed') {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(
              controller,
              bytesWritten,
              firstDescriptor,
            );
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== 'readable') {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (
            ReadableStreamHasDefaultReader(stream) &&
            ReadableStreamGetNumReadRequests(stream) > 0
          ) {
            return true;
          }
          if (
            ReadableStreamHasBYOBReader(stream) &&
            ReadableStreamGetNumReadIntoRequests(stream) > 0
          ) {
            return true;
          }
          const desiredSize =
            ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== 'readable') {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError(
                'Insufficient bytes to fill elements in the given buffer',
              );
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== 'readable') {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer));
            firstPendingPullInto.buffer = TransferArrayBuffer(
              firstPendingPullInto.buffer,
            );
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(
                controller,
                transferredBuffer,
                byteOffset,
                byteLength,
              );
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(
                transferredBuffer,
                byteOffset,
                byteLength,
              );
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(
              controller,
              transferredBuffer,
              byteOffset,
              byteLength,
            );
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(
              controller,
            );
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(
              controller,
              transferredBuffer,
              byteOffset,
              byteLength,
            );
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== 'readable') {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (
            controller._byobRequest === null &&
            controller._pendingPullIntos.length > 0
          ) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(
              firstDescriptor.buffer,
              firstDescriptor.byteOffset + firstDescriptor.bytesFilled,
              firstDescriptor.byteLength - firstDescriptor.bytesFilled,
            );
            const byobRequest = Object.create(
              ReadableStreamBYOBRequest.prototype,
            );
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === 'errored') {
            return null;
          }
          if (state === 'closed') {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === 'closed') {
            if (bytesWritten !== 0) {
              throw new TypeError(
                'bytesWritten must be 0 when calling respond() on a closed stream',
              );
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError(
                'bytesWritten must be greater than 0 when calling respond() on a readable stream',
              );
            }
            if (
              firstDescriptor.bytesFilled + bytesWritten >
              firstDescriptor.byteLength
            ) {
              throw new RangeError('bytesWritten out of range');
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(
          controller,
          view,
        ) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === 'closed') {
            if (view.byteLength !== 0) {
              throw new TypeError(
                "The view's length must be 0 when calling respondWithNewView() on a closed stream",
              );
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError(
                "The view's length must be greater than 0 when calling respondWithNewView() on a readable stream",
              );
            }
          }
          if (
            firstDescriptor.byteOffset + firstDescriptor.bytesFilled !==
            view.byteOffset
          ) {
            throw new RangeError(
              'The region specified by view does not match byobRequest',
            );
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError(
              'The buffer of view has different capacity than byobRequest',
            );
          }
          if (
            firstDescriptor.bytesFilled + view.byteLength >
            firstDescriptor.byteLength
          ) {
            throw new RangeError(
              'The region specified by view is larger than byobRequest',
            );
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(
            controller,
            viewByteLength,
          );
        }
        function SetUpReadableByteStreamController(
          stream,
          controller,
          startAlgorithm,
          pullAlgorithm,
          cancelAlgorithm,
          highWaterMark,
          autoAllocateChunkSize,
        ) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(
            promiseResolvedWith(startResult),
            () => {
              controller._started = true;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            },
            (r2) => {
              ReadableByteStreamControllerError(controller, r2);
            },
          );
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(
          stream,
          underlyingByteSource,
          highWaterMark,
        ) {
          const controller = Object.create(
            ReadableByteStreamController.prototype,
          );
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize =
            underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError('autoAllocateChunkSize must be greater than 0');
          }
          SetUpReadableByteStreamController(
            stream,
            controller,
            startAlgorithm,
            pullAlgorithm,
            cancelAlgorithm,
            highWaterMark,
            autoAllocateChunkSize,
          );
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(
            `ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`,
          );
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(
            `ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`,
          );
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, 'ReadableStreamBYOBReader');
            assertReadableStream(stream, 'First parameter');
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError(
                'This stream has already been locked for exclusive reading by another reader',
              );
            }
            if (
              !IsReadableByteStreamController(stream._readableStreamController)
            ) {
              throw new TypeError(
                'Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source',
              );
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(
                byobReaderBrandCheckException('closed'),
              );
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(
                byobReaderBrandCheckException('cancel'),
              );
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException('cancel'));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException('read'));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(
                new TypeError('view must be an array buffer view'),
              );
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(
                new TypeError('view must have non-zero byteLength'),
              );
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(
                new TypeError(`view's buffer must have non-zero byteLength`),
              );
            }
            if (IsDetachedBuffer(view.buffer));
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException('read from'));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) =>
                resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) =>
                resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2),
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException('releaseLock');
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError(
                'Tried to release a reader lock when that reader has pending read() calls un-settled',
              );
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            ReadableStreamBYOBReader.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'ReadableStreamBYOBReader',
              configurable: true,
            },
          );
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, '_readIntoRequests')) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === 'errored') {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(
              stream._readableStreamController,
              view,
              readIntoRequest,
            );
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(
            `ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`,
          );
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError('Invalid highWaterMark');
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark =
            init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark:
              highWaterMark === void 0
                ? void 0
                : convertUnrestrictedDouble(highWaterMark),
            size:
              size === void 0
                ? void 0
                : convertQueuingStrategySize(
                    size,
                    `${context} has member 'size' that`,
                  ),
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort =
            original === null || original === void 0 ? void 0 : original.abort;
          const close =
            original === null || original === void 0 ? void 0 : original.close;
          const start =
            original === null || original === void 0 ? void 0 : original.start;
          const type =
            original === null || original === void 0 ? void 0 : original.type;
          const write =
            original === null || original === void 0 ? void 0 : original.write;
          return {
            abort:
              abort === void 0
                ? void 0
                : convertUnderlyingSinkAbortCallback(
                    abort,
                    original,
                    `${context} has member 'abort' that`,
                  ),
            close:
              close === void 0
                ? void 0
                : convertUnderlyingSinkCloseCallback(
                    close,
                    original,
                    `${context} has member 'close' that`,
                  ),
            start:
              start === void 0
                ? void 0
                : convertUnderlyingSinkStartCallback(
                    start,
                    original,
                    `${context} has member 'start' that`,
                  ),
            write:
              write === void 0
                ? void 0
                : convertUnderlyingSinkWriteCallback(
                    write,
                    original,
                    `${context} has member 'write' that`,
                  ),
            type,
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) =>
            promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== 'object' || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === 'boolean';
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === 'function';
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, 'First parameter');
            }
            const strategy = convertQueuingStrategy(
              rawStrategy,
              'Second parameter',
            );
            const underlyingSink = convertUnderlyingSink(
              rawUnderlyingSink,
              'First parameter',
            );
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError('Invalid type is specified');
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(
              this,
              underlyingSink,
              highWaterMark,
              sizeAlgorithm,
            );
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2('locked');
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2('abort'));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(
                new TypeError(
                  'Cannot abort a stream that already has a writer',
                ),
              );
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2('close'));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(
                new TypeError(
                  'Cannot close a stream that already has a writer',
                ),
              );
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(
                new TypeError('Cannot close an already-closing stream'),
              );
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2('getWriter');
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            WritableStream.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'WritableStream',
              configurable: true,
            },
          );
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(
          startAlgorithm,
          writeAlgorithm,
          closeAlgorithm,
          abortAlgorithm,
          highWaterMark = 1,
          sizeAlgorithm = () => 1,
        ) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(
            WritableStreamDefaultController.prototype,
          );
          SetUpWritableStreamDefaultController(
            stream,
            controller,
            startAlgorithm,
            writeAlgorithm,
            closeAlgorithm,
            abortAlgorithm,
            highWaterMark,
            sizeAlgorithm,
          );
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = 'writable';
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_writableStreamController',
            )
          ) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === 'closed' || stream._state === 'errored') {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null ||
          _a4 === void 0
            ? void 0
            : _a4.abort();
          const state = stream._state;
          if (state === 'closed' || state === 'errored') {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === 'erroring') {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring,
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === 'closed' || state === 'errored') {
            return promiseRejectedWith(
              new TypeError(
                `The stream (in ${state} state) is not in the writable state and cannot be closed`,
              ),
            );
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject,
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (
            writer !== void 0 &&
            stream._backpressure &&
            state === 'writable'
          ) {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(
            stream._writableStreamController,
          );
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject,
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === 'writable') {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = 'erroring';
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(
              writer,
              reason,
            );
          }
          if (
            !WritableStreamHasOperationMarkedInFlight(stream) &&
            controller._started
          ) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = 'errored';
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](
            abortRequest._reason,
          );
          uponPromise(
            promise,
            () => {
              abortRequest._resolve();
              WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            },
            (reason) => {
              abortRequest._reject(reason);
              WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            },
          );
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === 'erroring') {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = 'closed';
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (
            stream._closeRequest === void 0 &&
            stream._inFlightCloseRequest === void 0
          ) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (
            stream._inFlightWriteRequest === void 0 &&
            stream._inFlightCloseRequest === void 0
          ) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, 'WritableStreamDefaultWriter');
            assertWritableStream(stream, 'First parameter');
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError(
                'This stream has already been locked for exclusive writing by another writer',
              );
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === 'writable') {
              if (
                !WritableStreamCloseQueuedOrInFlight(stream) &&
                stream._backpressure
              ) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === 'erroring') {
              defaultWriterReadyPromiseInitializeAsRejected(
                this,
                stream._storedError,
              );
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === 'closed') {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(
                defaultWriterBrandCheckException('closed'),
              );
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException('desiredSize');
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException('desiredSize');
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(
                defaultWriterBrandCheckException('ready'),
              );
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(
                defaultWriterBrandCheckException('abort'),
              );
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException('abort'));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(
                defaultWriterBrandCheckException('close'),
              );
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException('close'));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(
                new TypeError('Cannot close an already-closing stream'),
              );
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException('releaseLock');
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(
                defaultWriterBrandCheckException('write'),
              );
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(
                defaultWriterLockException('write to'),
              );
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            WritableStreamDefaultWriter.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'WritableStreamDefaultWriter',
              configurable: true,
            },
          );
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(x2, '_ownerWritableStream')
          ) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (
            WritableStreamCloseQueuedOrInFlight(stream) ||
            state === 'closed'
          ) {
            return promiseResolvedWith(void 0);
          }
          if (state === 'errored') {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(
          writer,
          error2,
        ) {
          if (writer._closedPromiseState === 'pending') {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(
          writer,
          error2,
        ) {
          if (writer._readyPromiseState === 'pending') {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === 'errored' || state === 'erroring') {
            return null;
          }
          if (state === 'closed') {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(
            stream._writableStreamController,
          );
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(
            `Writer was released and can no longer be used to monitor the stream's closedness`,
          );
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(
            writer,
            releasedError,
          );
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(
            writer,
            releasedError,
          );
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(
            controller,
            chunk,
          );
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException('write to'));
          }
          const state = stream._state;
          if (state === 'errored') {
            return promiseRejectedWith(stream._storedError);
          }
          if (
            WritableStreamCloseQueuedOrInFlight(stream) ||
            state === 'closed'
          ) {
            return promiseRejectedWith(
              new TypeError(
                'The stream is closing or closed and cannot be written to',
              ),
            );
          }
          if (state === 'erroring') {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError('Illegal constructor');
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2('abortReason');
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2('signal');
            }
            if (this._abortController === void 0) {
              throw new TypeError(
                'WritableStreamDefaultController.prototype.signal is not supported',
              );
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2('error');
            }
            const state = this._controlledWritableStream._state;
            if (state !== 'writable') {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            WritableStreamDefaultController.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'WritableStreamDefaultController',
              configurable: true,
            },
          );
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_controlledWritableStream',
            )
          ) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(
          stream,
          controller,
          startAlgorithm,
          writeAlgorithm,
          closeAlgorithm,
          abortAlgorithm,
          highWaterMark,
          sizeAlgorithm,
        ) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure =
            WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(
            startPromise,
            () => {
              controller._started = true;
              WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
            },
            (r2) => {
              controller._started = true;
              WritableStreamDealWithRejection(stream, r2);
            },
          );
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(
          stream,
          underlyingSink,
          highWaterMark,
          sizeAlgorithm,
        ) {
          const controller = Object.create(
            WritableStreamDefaultController.prototype,
          );
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(
            stream,
            controller,
            startAlgorithm,
            writeAlgorithm,
            closeAlgorithm,
            abortAlgorithm,
            highWaterMark,
            sizeAlgorithm,
          );
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(
          controller,
          chunk,
        ) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(
              controller,
              chunkSizeE,
            );
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(
          controller,
          chunk,
          chunkSize,
        ) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (
            !WritableStreamCloseQueuedOrInFlight(stream) &&
            stream._state === 'writable'
          ) {
            const backpressure =
              WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(
          controller,
        ) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === 'erroring') {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(
          controller,
          error2,
        ) {
          if (controller._controlledWritableStream._state === 'writable') {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(
            sinkClosePromise,
            () => {
              WritableStreamFinishInFlightClose(stream);
            },
            (reason) => {
              WritableStreamFinishInFlightCloseWithError(stream, reason);
            },
          );
        }
        function WritableStreamDefaultControllerProcessWrite(
          controller,
          chunk,
        ) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(
            sinkWritePromise,
            () => {
              WritableStreamFinishInFlightWrite(stream);
              const state = stream._state;
              DequeueValue(controller);
              if (
                !WritableStreamCloseQueuedOrInFlight(stream) &&
                state === 'writable'
              ) {
                const backpressure =
                  WritableStreamDefaultControllerGetBackpressure(controller);
                WritableStreamUpdateBackpressure(stream, backpressure);
              }
              WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
            },
            (reason) => {
              if (stream._state === 'writable') {
                WritableStreamDefaultControllerClearAlgorithms(controller);
              }
              WritableStreamFinishInFlightWriteWithError(stream, reason);
            },
          );
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize =
            WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(
            `WritableStream.prototype.${name} can only be used on a WritableStream`,
          );
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(
            `WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`,
          );
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(
            `WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`,
          );
        }
        function defaultWriterLockException(name) {
          return new TypeError(
            'Cannot ' + name + ' a stream using a released writer',
          );
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = 'pending';
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(
          writer,
          reason,
        ) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = 'rejected';
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = 'resolved';
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = 'pending';
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = 'rejected';
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = 'fulfilled';
        }
        const NativeDOMException =
          typeof DOMException !== 'undefined' ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === 'function' || typeof ctor === 'object')) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || '';
            this.name = name || 'Error';
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, 'constructor', {
            value: ctor,
            writable: true,
            configurable: true,
          });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException)
          ? NativeDOMException
          : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(
          source,
          dest,
          preventClose,
          preventAbort,
          preventCancel,
          signal,
        ) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1('Aborted', 'AbortError');
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === 'writable') {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === 'readable') {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(
                  () => Promise.all(actions.map((action) => action())),
                  true,
                  error2,
                );
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener('abort', abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(
                        WritableStreamDefaultWriterWrite(writer, chunk),
                        void 0,
                        noop4,
                      );
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead,
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(
                  () => WritableStreamAbort(dest, storedError),
                  true,
                  storedError,
                );
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(
                  () => ReadableStreamCancel(source, storedError),
                  true,
                  storedError,
                );
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() =>
                  WritableStreamDefaultWriterCloseWithErrorPropagation(writer),
                );
              } else {
                shutdown();
              }
            });
            if (
              WritableStreamCloseQueuedOrInFlight(dest) ||
              dest._state === 'closed'
            ) {
              const destClosed = new TypeError(
                'the destination writable stream closed before all data could be piped to it',
              );
              if (!preventCancel) {
                shutdownWithAction(
                  () => ReadableStreamCancel(source, destClosed),
                  true,
                  destClosed,
                );
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () =>
                oldCurrentWrite !== currentWrite
                  ? waitForWritesToFinish()
                  : void 0,
              );
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === 'errored') {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === 'closed') {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(
              action,
              originalIsError,
              originalError,
            ) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (
                dest._state === 'writable' &&
                !WritableStreamCloseQueuedOrInFlight(dest)
              ) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(
                  action(),
                  () => finalize(originalIsError, originalError),
                  (newError) => finalize(true, newError),
                );
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (
                dest._state === 'writable' &&
                !WritableStreamCloseQueuedOrInFlight(dest)
              ) {
                uponFulfillment(waitForWritesToFinish(), () =>
                  finalize(isError, error2),
                );
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener('abort', abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError('Illegal constructor');
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1('desiredSize');
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1('close');
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError(
                'The stream is not in a state that permits close',
              );
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1('enqueue');
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError(
                'The stream is not in a state that permits enqueue',
              );
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1('error');
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            ReadableStreamDefaultController.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'ReadableStreamDefaultController',
              configurable: true,
            },
          );
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_controlledReadableStream',
            )
          ) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull =
            ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(
            pullPromise,
            () => {
              controller._pulling = false;
              if (controller._pullAgain) {
                controller._pullAgain = false;
                ReadableStreamDefaultControllerCallPullIfNeeded(controller);
              }
            },
            (e2) => {
              ReadableStreamDefaultControllerError(controller, e2);
            },
          );
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (
            IsReadableStreamLocked(stream) &&
            ReadableStreamGetNumReadRequests(stream) > 0
          ) {
            return true;
          }
          const desiredSize =
            ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (
            IsReadableStreamLocked(stream) &&
            ReadableStreamGetNumReadRequests(stream) > 0
          ) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== 'readable') {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === 'errored') {
            return null;
          }
          if (state === 'closed') {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === 'readable') {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(
          stream,
          controller,
          startAlgorithm,
          pullAlgorithm,
          cancelAlgorithm,
          highWaterMark,
          sizeAlgorithm,
        ) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(
            promiseResolvedWith(startResult),
            () => {
              controller._started = true;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            },
            (r2) => {
              ReadableStreamDefaultControllerError(controller, r2);
            },
          );
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(
          stream,
          underlyingSource,
          highWaterMark,
          sizeAlgorithm,
        ) {
          const controller = Object.create(
            ReadableStreamDefaultController.prototype,
          );
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(
            stream,
            controller,
            startAlgorithm,
            pullAlgorithm,
            cancelAlgorithm,
            highWaterMark,
            sizeAlgorithm,
          );
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(
            `ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`,
          );
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (
            IsReadableByteStreamController(stream._readableStreamController)
          ) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(
                      branch1._readableStreamController,
                      chunk1,
                    );
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(
                      branch2._readableStreamController,
                      chunk2,
                    );
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(
                    branch1._readableStreamController,
                  );
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(
                    branch2._readableStreamController,
                  );
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              },
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(
                stream,
                compositeReason,
              );
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(
                stream,
                compositeReason,
              );
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {}
          branch1 = CreateReadableStream(
            startAlgorithm,
            pullAlgorithm,
            cancel1Algorithm,
          );
          branch2 = CreateReadableStream(
            startAlgorithm,
            pullAlgorithm,
            cancel2Algorithm,
          );
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(
              branch1._readableStreamController,
              r2,
            );
            ReadableStreamDefaultControllerError(
              branch2._readableStreamController,
              r2,
            );
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(
                branch1._readableStreamController,
                r2,
              );
              ReadableByteStreamControllerError(
                branch2._readableStreamController,
                r2,
              );
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(
                        branch1._readableStreamController,
                        cloneE,
                      );
                      ReadableByteStreamControllerError(
                        branch2._readableStreamController,
                        cloneE,
                      );
                      resolveCancelPromise(
                        ReadableStreamCancel(stream, cloneE),
                      );
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(
                      branch1._readableStreamController,
                      chunk1,
                    );
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(
                      branch2._readableStreamController,
                      chunk2,
                    );
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(
                    branch1._readableStreamController,
                  );
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(
                    branch2._readableStreamController,
                  );
                }
                if (
                  branch1._readableStreamController._pendingPullIntos.length > 0
                ) {
                  ReadableByteStreamControllerRespond(
                    branch1._readableStreamController,
                    0,
                  );
                }
                if (
                  branch2._readableStreamController._pendingPullIntos.length > 0
                ) {
                  ReadableByteStreamControllerRespond(
                    branch2._readableStreamController,
                    0,
                  );
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              },
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(
                        byobBranch._readableStreamController,
                        cloneE,
                      );
                      ReadableByteStreamControllerError(
                        otherBranch._readableStreamController,
                        cloneE,
                      );
                      resolveCancelPromise(
                        ReadableStreamCancel(stream, cloneE),
                      );
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(
                        byobBranch._readableStreamController,
                        chunk,
                      );
                    }
                    ReadableByteStreamControllerEnqueue(
                      otherBranch._readableStreamController,
                      clonedChunk,
                    );
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(
                      byobBranch._readableStreamController,
                      chunk,
                    );
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(
                    byobBranch._readableStreamController,
                  );
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(
                    otherBranch._readableStreamController,
                  );
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(
                      byobBranch._readableStreamController,
                      chunk,
                    );
                  }
                  if (
                    !otherCanceled &&
                    otherBranch._readableStreamController._pendingPullIntos
                      .length > 0
                  ) {
                    ReadableByteStreamControllerRespond(
                      otherBranch._readableStreamController,
                      0,
                    );
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              },
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(
              branch1._readableStreamController,
            );
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(
              branch2._readableStreamController,
            );
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(
                stream,
                compositeReason,
              );
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(
                stream,
                compositeReason,
              );
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(
            startAlgorithm,
            pull1Algorithm,
            cancel1Algorithm,
          );
          branch2 = CreateReadableByteStream(
            startAlgorithm,
            pull2Algorithm,
            cancel2Algorithm,
          );
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize =
            original === null || original === void 0
              ? void 0
              : original.autoAllocateChunkSize;
          const cancel =
            original === null || original === void 0 ? void 0 : original.cancel;
          const pull =
            original === null || original === void 0 ? void 0 : original.pull;
          const start =
            original === null || original === void 0 ? void 0 : original.start;
          const type =
            original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize:
              autoAllocateChunkSize === void 0
                ? void 0
                : convertUnsignedLongLongWithEnforceRange(
                    autoAllocateChunkSize,
                    `${context} has member 'autoAllocateChunkSize' that`,
                  ),
            cancel:
              cancel === void 0
                ? void 0
                : convertUnderlyingSourceCancelCallback(
                    cancel,
                    original,
                    `${context} has member 'cancel' that`,
                  ),
            pull:
              pull === void 0
                ? void 0
                : convertUnderlyingSourcePullCallback(
                    pull,
                    original,
                    `${context} has member 'pull' that`,
                  ),
            start:
              start === void 0
                ? void 0
                : convertUnderlyingSourceStartCallback(
                    start,
                    original,
                    `${context} has member 'start' that`,
                  ),
            type:
              type === void 0
                ? void 0
                : convertReadableStreamType(
                    type,
                    `${context} has member 'type' that`,
                  ),
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== 'bytes') {
            throw new TypeError(
              `${context} '${type}' is not a valid enumeration value for ReadableStreamType`,
            );
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode =
            options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode:
              mode === void 0
                ? void 0
                : convertReadableStreamReaderMode(
                    mode,
                    `${context} has member 'mode' that`,
                  ),
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== 'byob') {
            throw new TypeError(
              `${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`,
            );
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel =
            options === null || options === void 0
              ? void 0
              : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort =
            options === null || options === void 0
              ? void 0
              : options.preventAbort;
          const preventCancel =
            options === null || options === void 0
              ? void 0
              : options.preventCancel;
          const preventClose =
            options === null || options === void 0
              ? void 0
              : options.preventClose;
          const signal =
            options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal,
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable3 =
            pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable3, 'readable', 'ReadableWritablePair');
          assertReadableStream(
            readable3,
            `${context} has member 'readable' that`,
          );
          const writable3 =
            pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable3, 'writable', 'ReadableWritablePair');
          assertWritableStream(
            writable3,
            `${context} has member 'writable' that`,
          );
          return { readable: readable3, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, 'First parameter');
            }
            const strategy = convertQueuingStrategy(
              rawStrategy,
              'Second parameter',
            );
            const underlyingSource = convertUnderlyingDefaultOrByteSource(
              rawUnderlyingSource,
              'First parameter',
            );
            InitializeReadableStream(this);
            if (underlyingSource.type === 'bytes') {
              if (strategy.size !== void 0) {
                throw new RangeError(
                  'The strategy for a byte stream cannot have a size function',
                );
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(
                this,
                underlyingSource,
                highWaterMark,
              );
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(
                this,
                underlyingSource,
                highWaterMark,
                sizeAlgorithm,
              );
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1('locked');
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1('cancel'));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(
                new TypeError(
                  'Cannot cancel a stream that already has a reader',
                ),
              );
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1('getReader');
            }
            const options = convertReaderOptions(rawOptions, 'First parameter');
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1('pipeThrough');
            }
            assertRequiredArgument(rawTransform, 1, 'pipeThrough');
            const transform = convertReadableWritablePair(
              rawTransform,
              'First parameter',
            );
            const options = convertPipeOptions(rawOptions, 'Second parameter');
            if (IsReadableStreamLocked(this)) {
              throw new TypeError(
                'ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream',
              );
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError(
                'ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream',
              );
            }
            const promise = ReadableStreamPipeTo(
              this,
              transform.writable,
              options.preventClose,
              options.preventAbort,
              options.preventCancel,
              options.signal,
            );
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1('pipeTo'));
            }
            if (destination === void 0) {
              return promiseRejectedWith(
                `Parameter 1 is required in 'pipeTo'.`,
              );
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(
                new TypeError(
                  `ReadableStream.prototype.pipeTo's first argument must be a WritableStream`,
                ),
              );
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, 'Second parameter');
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(
                new TypeError(
                  'ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream',
                ),
              );
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(
                new TypeError(
                  'ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream',
                ),
              );
            }
            return ReadableStreamPipeTo(
              this,
              destination,
              options.preventClose,
              options.preventAbort,
              options.preventCancel,
              options.signal,
            );
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1('tee');
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1('values');
            }
            const options = convertIteratorOptions(
              rawOptions,
              'First parameter',
            );
            return AcquireReadableStreamAsyncIterator(
              this,
              options.preventCancel,
            );
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            ReadableStream2.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'ReadableStream',
              configurable: true,
            },
          );
        }
        if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
          Object.defineProperty(
            ReadableStream2.prototype,
            SymbolPolyfill.asyncIterator,
            {
              value: ReadableStream2.prototype.values,
              writable: true,
              configurable: true,
            },
          );
        }
        function CreateReadableStream(
          startAlgorithm,
          pullAlgorithm,
          cancelAlgorithm,
          highWaterMark = 1,
          sizeAlgorithm = () => 1,
        ) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(
            ReadableStreamDefaultController.prototype,
          );
          SetUpReadableStreamDefaultController(
            stream,
            controller,
            startAlgorithm,
            pullAlgorithm,
            cancelAlgorithm,
            highWaterMark,
            sizeAlgorithm,
          );
          return stream;
        }
        function CreateReadableByteStream(
          startAlgorithm,
          pullAlgorithm,
          cancelAlgorithm,
        ) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(
            ReadableByteStreamController.prototype,
          );
          SetUpReadableByteStreamController(
            stream,
            controller,
            startAlgorithm,
            pullAlgorithm,
            cancelAlgorithm,
            0,
            void 0,
          );
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = 'readable';
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_readableStreamController',
            )
          ) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === 'closed') {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === 'errored') {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise =
            stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = 'closed';
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = 'errored';
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(
            `ReadableStream.prototype.${name} can only be used on a ReadableStream`,
          );
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark =
            init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(
            highWaterMark,
            'highWaterMark',
            'QueuingStrategyInit',
          );
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark),
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, 'name', {
          value: 'size',
          configurable: true,
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, 'ByteLengthQueuingStrategy');
            options = convertQueuingStrategyInit(options, 'First parameter');
            this._byteLengthQueuingStrategyHighWaterMark =
              options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException('highWaterMark');
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException('size');
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            ByteLengthQueuingStrategy.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'ByteLengthQueuingStrategy',
              configurable: true,
            },
          );
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(
            `ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`,
          );
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_byteLengthQueuingStrategyHighWaterMark',
            )
          ) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, 'name', {
          value: 'size',
          configurable: true,
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, 'CountQueuingStrategy');
            options = convertQueuingStrategyInit(options, 'First parameter');
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException('highWaterMark');
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException('size');
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            CountQueuingStrategy.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'CountQueuingStrategy',
              configurable: true,
            },
          );
        }
        function countBrandCheckException(name) {
          return new TypeError(
            `CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`,
          );
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_countQueuingStrategyHighWaterMark',
            )
          ) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush =
            original === null || original === void 0 ? void 0 : original.flush;
          const readableType =
            original === null || original === void 0
              ? void 0
              : original.readableType;
          const start =
            original === null || original === void 0 ? void 0 : original.start;
          const transform =
            original === null || original === void 0
              ? void 0
              : original.transform;
          const writableType =
            original === null || original === void 0
              ? void 0
              : original.writableType;
          return {
            flush:
              flush === void 0
                ? void 0
                : convertTransformerFlushCallback(
                    flush,
                    original,
                    `${context} has member 'flush' that`,
                  ),
            readableType,
            start:
              start === void 0
                ? void 0
                : convertTransformerStartCallback(
                    start,
                    original,
                    `${context} has member 'start' that`,
                  ),
            transform:
              transform === void 0
                ? void 0
                : convertTransformerTransformCallback(
                    transform,
                    original,
                    `${context} has member 'transform' that`,
                  ),
            writableType,
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) =>
            promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(
            rawTransformer = {},
            rawWritableStrategy = {},
            rawReadableStrategy = {},
          ) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(
              rawWritableStrategy,
              'Second parameter',
            );
            const readableStrategy = convertQueuingStrategy(
              rawReadableStrategy,
              'Third parameter',
            );
            const transformer = convertTransformer(
              rawTransformer,
              'First parameter',
            );
            if (transformer.readableType !== void 0) {
              throw new RangeError('Invalid readableType specified');
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError('Invalid writableType specified');
            }
            const readableHighWaterMark = ExtractHighWaterMark(
              readableStrategy,
              0,
            );
            const readableSizeAlgorithm =
              ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(
              writableStrategy,
              1,
            );
            const writableSizeAlgorithm =
              ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(
              this,
              startPromise,
              writableHighWaterMark,
              writableSizeAlgorithm,
              readableHighWaterMark,
              readableSizeAlgorithm,
            );
            SetUpTransformStreamDefaultControllerFromTransformer(
              this,
              transformer,
            );
            if (transformer.start !== void 0) {
              startPromise_resolve(
                transformer.start(this._transformStreamController),
              );
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException('readable');
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException('writable');
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            TransformStream.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'TransformStream',
              configurable: true,
            },
          );
        }
        function InitializeTransformStream(
          stream,
          startPromise,
          writableHighWaterMark,
          writableSizeAlgorithm,
          readableHighWaterMark,
          readableSizeAlgorithm,
        ) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(
            startAlgorithm,
            writeAlgorithm,
            closeAlgorithm,
            abortAlgorithm,
            writableHighWaterMark,
            writableSizeAlgorithm,
          );
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(
            startAlgorithm,
            pullAlgorithm,
            cancelAlgorithm,
            readableHighWaterMark,
            readableSizeAlgorithm,
          );
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_transformStreamController',
            )
          ) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(
            stream._readable._readableStreamController,
            e2,
          );
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(
            stream._transformStreamController,
          );
          WritableStreamDefaultControllerErrorIfNeeded(
            stream._writable._writableStreamController,
            e2,
          );
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError('Illegal constructor');
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException('desiredSize');
            }
            const readableController =
              this._controlledTransformStream._readable
                ._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(
              readableController,
            );
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException('enqueue');
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException('error');
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException('terminate');
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true },
        });
        if (typeof SymbolPolyfill.toStringTag === 'symbol') {
          Object.defineProperty(
            TransformStreamDefaultController.prototype,
            SymbolPolyfill.toStringTag,
            {
              value: 'TransformStreamDefaultController',
              configurable: true,
            },
          );
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              x2,
              '_controlledTransformStream',
            )
          ) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(
          stream,
          controller,
          transformAlgorithm,
          flushAlgorithm,
        ) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(
          stream,
          transformer,
        ) {
          const controller = Object.create(
            TransformStreamDefaultController.prototype,
          );
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) =>
              transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(
            stream,
            controller,
            transformAlgorithm,
            flushAlgorithm,
          );
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (
            !ReadableStreamDefaultControllerCanCloseOrEnqueue(
              readableController,
            )
          ) {
            throw new TypeError(
              'Readable side is not in a state that permits enqueue',
            );
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure =
            ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(
          controller,
          chunk,
        ) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError('TransformStream terminated');
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === 'erroring') {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(
                controller,
                chunk,
              );
            });
          }
          return TransformStreamDefaultControllerPerformTransform(
            controller,
            chunk,
          );
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable3 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(
            flushPromise,
            () => {
              if (readable3._state === 'errored') {
                throw readable3._storedError;
              }
              ReadableStreamDefaultControllerClose(
                readable3._readableStreamController,
              );
            },
            (r2) => {
              TransformStreamError(stream, r2);
              throw readable3._storedError;
            },
          );
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(
            `TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`,
          );
        }
        function streamBrandCheckException(name) {
          return new TypeError(
            `TransformStream.prototype.${name} can only be used on a TransformStream`,
          );
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController =
          ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController =
          TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController =
          WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, '__esModule', { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require('process');
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {};
          Object.assign(globalThis, require('stream/web'));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require('buffer');
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: 'bytes',
            async pull(ctrl) {
              const chunk = blob.slice(
                position,
                Math.min(blob.size, position + POOL_SIZE$1),
              );
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            },
          });
        };
      }
    } catch (error2) {}
    POOL_SIZE = 65536;
    _Blob =
      ((_a = class {
        constructor(blobParts = [], options = {}) {
          __privateAdd(this, _parts, []);
          __privateAdd(this, _type, '');
          __privateAdd(this, _size, 0);
          if (typeof blobParts !== 'object' || blobParts === null) {
            throw new TypeError(
              "Failed to construct 'Blob': The provided value cannot be converted to a sequence.",
            );
          }
          if (typeof blobParts[Symbol.iterator] !== 'function') {
            throw new TypeError(
              "Failed to construct 'Blob': The object must have a callable @@iterator property.",
            );
          }
          if (typeof options !== 'object' && typeof options !== 'function') {
            throw new TypeError(
              "Failed to construct 'Blob': parameter 2 cannot convert to dictionary.",
            );
          }
          if (options === null) options = {};
          const encoder2 = new TextEncoder();
          for (const element of blobParts) {
            let part;
            if (ArrayBuffer.isView(element)) {
              part = new Uint8Array(
                element.buffer.slice(
                  element.byteOffset,
                  element.byteOffset + element.byteLength,
                ),
              );
            } else if (element instanceof ArrayBuffer) {
              part = new Uint8Array(element.slice(0));
            } else if (element instanceof _a) {
              part = element;
            } else {
              part = encoder2.encode(element);
            }
            __privateSet(
              this,
              _size,
              __privateGet(this, _size) +
                (ArrayBuffer.isView(part) ? part.byteLength : part.size),
            );
            __privateGet(this, _parts).push(part);
          }
          const type = options.type === void 0 ? '' : String(options.type);
          __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : '');
        }
        get size() {
          return __privateGet(this, _size);
        }
        get type() {
          return __privateGet(this, _type);
        }
        async text() {
          const decoder = new TextDecoder();
          let str = '';
          for await (const part of toIterator(
            __privateGet(this, _parts),
            false,
          )) {
            str += decoder.decode(part, { stream: true });
          }
          str += decoder.decode();
          return str;
        }
        async arrayBuffer() {
          const data = new Uint8Array(this.size);
          let offset = 0;
          for await (const chunk of toIterator(
            __privateGet(this, _parts),
            false,
          )) {
            data.set(chunk, offset);
            offset += chunk.length;
          }
          return data.buffer;
        }
        stream() {
          const it = toIterator(__privateGet(this, _parts), true);
          return new globalThis.ReadableStream({
            type: 'bytes',
            async pull(ctrl) {
              const chunk = await it.next();
              chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
            },
            async cancel() {
              await it.return();
            },
          });
        }
        slice(start = 0, end = this.size, type = '') {
          const { size } = this;
          let relativeStart =
            start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
          let relativeEnd =
            end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
          const span = Math.max(relativeEnd - relativeStart, 0);
          const parts = __privateGet(this, _parts);
          const blobParts = [];
          let added = 0;
          for (const part of parts) {
            if (added >= span) {
              break;
            }
            const size2 = ArrayBuffer.isView(part)
              ? part.byteLength
              : part.size;
            if (relativeStart && size2 <= relativeStart) {
              relativeStart -= size2;
              relativeEnd -= size2;
            } else {
              let chunk;
              if (ArrayBuffer.isView(part)) {
                chunk = part.subarray(
                  relativeStart,
                  Math.min(size2, relativeEnd),
                );
                added += chunk.byteLength;
              } else {
                chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
                added += chunk.size;
              }
              relativeEnd -= size2;
              blobParts.push(chunk);
              relativeStart = 0;
            }
          }
          const blob = new _a([], { type: String(type).toLowerCase() });
          __privateSet(blob, _size, span);
          __privateSet(blob, _parts, blobParts);
          return blob;
        }
        get [Symbol.toStringTag]() {
          return 'Blob';
        }
        static [Symbol.hasInstance](object) {
          return (
            object &&
            typeof object === 'object' &&
            typeof object.constructor === 'function' &&
            (typeof object.stream === 'function' ||
              typeof object.arrayBuffer === 'function') &&
            /^(Blob|File)$/.test(object[Symbol.toStringTag])
          );
        }
      }),
      (_parts = new WeakMap()),
      (_type = new WeakMap()),
      (_size = new WeakMap()),
      _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true },
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File =
      ((_a2 = class extends Blob$1 {
        constructor(fileBits, fileName, options = {}) {
          if (arguments.length < 2) {
            throw new TypeError(
              `Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`,
            );
          }
          super(fileBits, options);
          __privateAdd(this, _lastModified, 0);
          __privateAdd(this, _name, '');
          if (options === null) options = {};
          const lastModified =
            options.lastModified === void 0
              ? Date.now()
              : Number(options.lastModified);
          if (!Number.isNaN(lastModified)) {
            __privateSet(this, _lastModified, lastModified);
          }
          __privateSet(this, _name, String(fileName));
        }
        get name() {
          return __privateGet(this, _name);
        }
        get lastModified() {
          return __privateGet(this, _lastModified);
        }
        get [Symbol.toStringTag]() {
          return 'File';
        }
      }),
      (_lastModified = new WeakMap()),
      (_name = new WeakMap()),
      _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m =
      'append,set,get,getAll,delete,keys,values,entries,forEach,constructor'.split(
        ',',
      );
    f2 = (a, b, c) => (
      (a += ''),
      /^(Blob|File)$/.test(b && b[t])
        ? [
            ((c = c !== void 0 ? c + '' : b[t] == 'File' ? b.name : 'blob'), a),
            b.name !== c || b[t] == 'blob' ? new File([b], c, b) : b,
          ]
        : [a, b + '']
    );
    e = (c, f3) =>
      (f3 ? c : c.replace(/\r?\n|\r/g, '\r\n'))
        .replace(/\n/g, '%0A')
        .replace(/\r/g, '%0D')
        .replace(/"/g, '%22');
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(
          `Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`,
        );
      }
    };
    FormData =
      ((_a3 = class {
        constructor(...a) {
          __privateAdd(this, _d, []);
          if (a.length)
            throw new TypeError(
              `Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`,
            );
        }
        get [t]() {
          return 'FormData';
        }
        [i]() {
          return this.entries();
        }
        static [h](o) {
          return (
            o &&
            typeof o === 'object' &&
            o[t] === 'FormData' &&
            !m.some((m2) => typeof o[m2] != 'function')
          );
        }
        append(...a) {
          x('append', arguments, 2);
          __privateGet(this, _d).push(f2(...a));
        }
        delete(a) {
          x('delete', arguments, 1);
          a += '';
          __privateSet(
            this,
            _d,
            __privateGet(this, _d).filter(([b]) => b !== a),
          );
        }
        get(a) {
          x('get', arguments, 1);
          a += '';
          for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
            if (b[c][0] === a) return b[c][1];
          return null;
        }
        getAll(a, b) {
          x('getAll', arguments, 1);
          b = [];
          a += '';
          __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
          return b;
        }
        has(a) {
          x('has', arguments, 1);
          a += '';
          return __privateGet(this, _d).some((b) => b[0] === a);
        }
        forEach(a, b) {
          x('forEach', arguments, 1);
          for (var [c, d] of this) a.call(b, d, c, this);
        }
        set(...a) {
          x('set', arguments, 2);
          var b = [],
            c = true;
          a = f2(...a);
          __privateGet(this, _d).forEach((d) => {
            d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
          });
          c && b.push(a);
          __privateSet(this, _d, b);
        }
        *entries() {
          yield* __privateGet(this, _d);
        }
        *keys() {
          for (var [a] of this) yield a;
        }
        *values() {
          for (var [, a] of this) yield a;
        }
      }),
      (_d = new WeakMap()),
      _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return (
        typeof object === 'object' &&
        typeof object.append === 'function' &&
        typeof object.delete === 'function' &&
        typeof object.get === 'function' &&
        typeof object.getAll === 'function' &&
        typeof object.has === 'function' &&
        typeof object.set === 'function' &&
        typeof object.sort === 'function' &&
        object[NAME] === 'URLSearchParams'
      );
    };
    isBlob = (object) => {
      return (
        object &&
        typeof object === 'object' &&
        typeof object.arrayBuffer === 'function' &&
        typeof object.type === 'string' &&
        typeof object.stream === 'function' &&
        typeof object.constructor === 'function' &&
        /^(Blob|File)$/.test(object[NAME])
      );
    };
    isAbortSignal = (object) => {
      return (
        typeof object === 'object' &&
        (object[NAME] === 'AbortSignal' || object[NAME] === 'EventTarget')
      );
    };
    INTERNALS$2 = Symbol('Body internals');
    Body = class {
      constructor(body, { size = 0 } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body));
        else if (Buffer.isBuffer(body));
        else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default);
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split('=')[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null,
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on('error', (error_) => {
            const error2 =
              error_ instanceof FetchBaseError
                ? error_
                : new FetchError(
                    `Invalid response body while trying to fetch ${this.url}: ${error_.message}`,
                    'system',
                    error_,
                  );
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get('content-type');
        if (ct.startsWith('application/x-www-form-urlencoded')) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(
          () => (init_multipart_parser(), multipart_parser_exports),
        );
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct =
          (this.headers && this.headers.get('content-type')) ||
          (this[INTERNALS$2].body && this[INTERNALS$2].body.type) ||
          '';
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct,
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(
      Body.prototype.buffer,
      "Please use 'response.arrayBuffer()' instead of 'response.buffer()'",
      'node-fetch#buffer',
    );
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error('cannot clone body after it is used');
      }
      if (
        body instanceof import_node_stream.default &&
        typeof body.getBoundary !== 'function'
      ) {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)(
      (body) => body.getBoundary(),
      "form-data doesn't follow the spec and requires special treatment. Use alternative package",
      'https://github.com/node-fetch/node-fetch/issues/1167',
    );
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === 'string') {
        return 'text/plain;charset=UTF-8';
      }
      if (isURLSearchParameters(body)) {
        return 'application/x-www-form-urlencoded;charset=UTF-8';
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (
        Buffer.isBuffer(body) ||
        import_node_util.types.isAnyArrayBuffer(body) ||
        ArrayBuffer.isView(body)
      ) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === 'function') {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(
          body,
        )}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return 'text/plain;charset=UTF-8';
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === 'function') {
        return body.hasKnownLength && body.hasKnownLength()
          ? body.getLengthSync()
          : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName =
      typeof import_node_http.default.validateHeaderName === 'function'
        ? import_node_http.default.validateHeaderName
        : (name) => {
            if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
              const error2 = new TypeError(
                `Header name must be a valid HTTP token [${name}]`,
              );
              Object.defineProperty(error2, 'code', {
                value: 'ERR_INVALID_HTTP_TOKEN',
              });
              throw error2;
            }
          };
    validateHeaderValue =
      typeof import_node_http.default.validateHeaderValue === 'function'
        ? import_node_http.default.validateHeaderValue
        : (name, value) => {
            if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
              const error2 = new TypeError(
                `Invalid character in header content ["${name}"]`,
              );
              Object.defineProperty(error2, 'code', {
                value: 'ERR_INVALID_CHAR',
              });
              throw error2;
            }
          };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null);
        else if (
          typeof init2 === 'object' &&
          !import_node_util.types.isBoxedPrimitive(init2)
        ) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== 'function') {
              throw new TypeError('Header pairs must be iterable');
            }
            result = [...init2]
              .map((pair) => {
                if (
                  typeof pair !== 'object' ||
                  import_node_util.types.isBoxedPrimitive(pair)
                ) {
                  throw new TypeError(
                    'Each header pair must be an iterable object',
                  );
                }
                return [...pair];
              })
              .map((pair) => {
                if (pair.length !== 2) {
                  throw new TypeError(
                    'Each header pair must be a name/value tuple',
                  );
                }
                return [...pair];
              });
          }
        } else {
          throw new TypeError(
            "Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)",
          );
        }
        result =
          result.length > 0
            ? result.map(([name, value]) => {
                validateHeaderName(name);
                validateHeaderValue(name, String(value));
                return [String(name).toLowerCase(), String(value)];
              })
            : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case 'append':
              case 'set':
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase(),
                    String(value),
                  );
                };
              case 'delete':
              case 'has':
              case 'getAll':
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase(),
                  );
                };
              case 'keys':
                return () => {
                  target.sort();
                  return new Set(
                    URLSearchParams.prototype.keys.call(target),
                  ).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          },
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(', ');
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for('nodejs.util.inspect.custom')]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === 'host') {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(
      Headers2.prototype,
      ['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
        result[property] = { enumerable: true };
        return result;
      }, {}),
    );
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol('Response internals');
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has('Content-Type')) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append('Content-Type', contentType);
          }
        }
        this[INTERNALS$1] = {
          type: 'default',
          url: options.url,
          status,
          statusText: options.statusText || '',
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark,
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || '';
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return (
          this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300
        );
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark,
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError(
            'Failed to execute "redirect" on "response": Invalid status code',
          );
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString(),
          },
          status,
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: '' });
        response[INTERNALS$1].type = 'error';
        return response;
      }
      get [Symbol.toStringTag]() {
        return 'Response';
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true },
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 =
        parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
      return parsedURL.href[lastOffset - hash2.length] === '?' ? '?' : '';
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      '',
      'no-referrer',
      'no-referrer-when-downgrade',
      'same-origin',
      'origin',
      'strict-origin',
      'origin-when-cross-origin',
      'strict-origin-when-cross-origin',
      'unsafe-url',
    ]);
    DEFAULT_REFERRER_POLICY = 'strict-origin-when-cross-origin';
    INTERNALS = Symbol('Request internals');
    isRequest = (object) => {
      return (
        typeof object === 'object' && typeof object[INTERNALS] === 'object'
      );
    };
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== '' || parsedURL.password !== '') {
          throw new TypeError(
            `${parsedURL} is an url with embedded credentails.`,
          );
        }
        let method = init2.method || input.method || 'GET';
        method = method.toUpperCase();
        if (
          (init2.body != null || isRequest(input)) &&
          input.body !== null &&
          (method === 'GET' || method === 'HEAD')
        ) {
          throw new TypeError('Request with GET/HEAD method cannot have body');
        }
        const inputBody = init2.body
          ? init2.body
          : isRequest(input) && input.body !== null
          ? clone(input)
          : null;
        super(inputBody, {
          size: init2.size || input.size || 0,
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has('Content-Type')) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set('Content-Type', contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ('signal' in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError(
            'Expected signal to be an instanceof AbortSignal or EventTarget',
          );
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === '') {
          referrer = 'no-referrer';
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer)
            ? 'client'
            : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || 'follow',
          headers,
          parsedURL,
          signal,
          referrer,
        };
        this.follow =
          init2.follow === void 0
            ? input.follow === void 0
              ? 20
              : input.follow
            : init2.follow;
        this.compress =
          init2.compress === void 0
            ? input.compress === void 0
              ? true
              : input.compress
            : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark =
          init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser =
          init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy =
          init2.referrerPolicy || input.referrerPolicy || '';
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === 'no-referrer') {
          return '';
        }
        if (this[INTERNALS].referrer === 'client') {
          return 'about:client';
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return 'Request';
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true },
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has('Accept')) {
        headers.set('Accept', '*/*');
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = '0';
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set('Content-Length', contentLengthValue);
      }
      if (request.referrerPolicy === '') {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== 'no-referrer') {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = 'no-referrer';
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set('Referer', request.referrer);
      }
      if (!headers.has('User-Agent')) {
        headers.set('User-Agent', 'node-fetch');
      }
      if (request.compress && !headers.has('Accept-Encoding')) {
        headers.set('Accept-Encoding', 'gzip,deflate,br');
      }
      let { agent } = request;
      if (typeof agent === 'function') {
        agent = agent(parsedURL);
      }
      if (!headers.has('Connection') && !agent) {
        headers.set('Connection', 'close');
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent,
      };
      return {
        parsedURL,
        options,
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = 'aborted') {
        super(message, type);
      }
    };
    supportedSchemas = /* @__PURE__ */ new Set(['data:', 'http:', 'https:']);
  },
});

// .svelte-kit/output/server/chunks/index-46a73c56.js
function noop2() {}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a
    ? b == b
    : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props) if (!keys.has(k) && k[0] !== '$') rest[k] = props[k];
  return rest;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error('Function called outside component initialization');
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += ' ' + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add),
        );
      }
    }
  }
  let str = '';
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name)) return;
    const value = attributes[name];
    if (value === true) str += ' ' + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value) str += ' ' + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(';')) {
    const colon_index = individual_style.indexOf(':');
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name) continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === 'string' ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  let str = '';
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === 'svelte:component') name += ' this={...}';
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`,
    );
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(
        context || (parent_component ? parent_component.$$.context : []),
      ),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object(),
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (
      props = {},
      { $$slots = {}, context = /* @__PURE__ */ new Map() } = {},
    ) => {
      on_destroy = [];
      const result = { title: '', head: '', css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css)
            .map((css8) => css8.code)
            .join('\n'),
          map: null,
        },
        head: result.title + result.head,
      };
    },
    $$render,
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || (boolean && !value)) return '';
  const assignment =
    boolean && value === true
      ? ''
      : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object)
    .filter((key2) => style_object[key2])
    .map((key2) => `${key2}: ${style_object[key2]};`)
    .join(' ');
}
var current_component,
  boolean_attributes,
  invalid_attribute_name_character,
  escaped,
  missing_component,
  on_destroy;
var init_index_46a73c56 = __esm({
  '.svelte-kit/output/server/chunks/index-46a73c56.js'() {
    Promise.resolve();
    boolean_attributes = /* @__PURE__ */ new Set([
      'allowfullscreen',
      'allowpaymentrequest',
      'async',
      'autofocus',
      'autoplay',
      'checked',
      'controls',
      'default',
      'defer',
      'disabled',
      'formnovalidate',
      'hidden',
      'ismap',
      'loop',
      'multiple',
      'muted',
      'nomodule',
      'novalidate',
      'open',
      'playsinline',
      'readonly',
      'required',
      'reversed',
      'selected',
    ]);
    invalid_attribute_name_character =
      /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    escaped = {
      '"': '&quot;',
      "'": '&#39;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
    };
    missing_component = {
      $$render: () => '',
    };
  },
});

// .svelte-kit/output/server/chunks/hooks-1c45ba0b.js
var hooks_1c45ba0b_exports = {};
var init_hooks_1c45ba0b = __esm({
  '.svelte-kit/output/server/chunks/hooks-1c45ba0b.js'() {},
});

// .svelte-kit/output/server/chunks/audio-fc6739fd.js
function readable2(value, start) {
  return {
    subscribe: writable2(value, start).subscribe,
  };
}
function writable2(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue2, audioStore, audioActions;
var init_audio_fc6739fd = __esm({
  '.svelte-kit/output/server/chunks/audio-fc6739fd.js'() {
    init_index_46a73c56();
    subscriber_queue2 = [];
    audioStore = writable2('idle');
    audioActions = {
      beep: () => {
        audioStore.update(() => {
          return 'beeping';
        });
      },
      finish: () => {
        audioStore.update(() => {
          return 'idle';
        });
      },
    };
  },
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout,
});
var audioUrl,
  BeepAudio,
  SwordIcon,
  css$2,
  BottomBar,
  css$1,
  TopBar,
  css,
  _layout;
var init_layout_svelte = __esm({
  '.svelte-kit/output/server/entries/pages/__layout.svelte.js'() {
    init_index_46a73c56();
    init_audio_fc6739fd();
    audioUrl = '/_app/assets/beep-96dd90a8.wav';
    BeepAudio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $audioStore, $$unsubscribe_audioStore;
      $$unsubscribe_audioStore = subscribe(
        audioStore,
        (value) => ($audioStore = value),
      );
      let audio;
      {
        {
          if ($audioStore === 'beeping') {
            audio.play();
          }
        }
      }
      $$unsubscribe_audioStore();
      return `<audio${add_attribute('this', audio, 0)}><source${add_attribute(
        'src',
        audioUrl,
        0,
      )} type="${'audio/wav'}"></audio>`;
    });
    SwordIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { width = 32 } = $$props;
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      return `<svg${add_attribute('width', width, 0)}${add_attribute(
        'height',
        width,
        0,
      )} viewBox="${'0 0 32 32'}" fill="${'none'}" xmlns="${'http://www.w3.org/2000/svg'}"><path d="${'M9.52515 16.5251L19.0251 5.02513L27 5L26.9749 12.9749L15.4749 22.4749'}" stroke="${'black'}" stroke-width="${'2'}" stroke-linecap="${'round'}" stroke-linejoin="${'round'}"></path><path d="${'M12.5 19.5L20 12'}" stroke="${'black'}" stroke-width="${'2'}" stroke-linecap="${'round'}" stroke-linejoin="${'round'}"></path><path d="${'M10.2678 24.6821L6.52511 28.4247C6.43226 28.5176 6.32202 28.5912 6.20069 28.6415C6.07937 28.6917 5.94933 28.7176 5.81801 28.7176C5.68669 28.7176 5.55665 28.6917 5.43532 28.6415C5.314 28.5912 5.20376 28.5176 5.1109 28.4247L3.57536 26.8892C3.48251 26.7963 3.40885 26.6861 3.35859 26.5648C3.30834 26.4434 3.28247 26.3134 3.28247 26.1821C3.28247 26.0507 3.30834 25.9207 3.35859 25.7994C3.40885 25.6781 3.48251 25.5678 3.57536 25.475L7.31801 21.7323C7.41086 21.6395 7.48452 21.5292 7.53478 21.4079C7.58503 21.2866 7.6109 21.1565 7.6109 21.0252C7.6109 20.8939 7.58503 20.7639 7.53478 20.6425C7.48452 20.5212 7.41086 20.411 7.31801 20.3181L4.7071 17.7072C4.51956 17.5197 4.4142 17.2653 4.4142 17.0001C4.4142 16.7349 4.51956 16.4805 4.7071 16.293L6.29288 14.7072C6.48042 14.5197 6.73477 14.4143 6.99999 14.4143C7.26521 14.4143 7.51956 14.5197 7.7071 14.7072L17.2929 24.293C17.4804 24.4805 17.5858 24.7349 17.5858 25.0001C17.5858 25.2653 17.4804 25.5197 17.2929 25.7072L15.7071 27.293C15.5196 27.4805 15.2652 27.5859 15 27.5859C14.7348 27.5859 14.4804 27.4805 14.2929 27.293L11.682 24.6821C11.4944 24.4945 11.2401 24.3892 10.9749 24.3892C10.7096 24.3892 10.4553 24.4945 10.2678 24.6821V24.6821Z'}" stroke="${'black'}" stroke-width="${'2'}" stroke-linecap="${'round'}" stroke-linejoin="${'round'}"></path></svg>`;
    });
    css$2 = {
      code: '.navbar.svelte-injj2a{@apply bottom-0 mx-auto border-t shadow-md;;@apply bg-white;;min-height:var(--nav-height);box-shadow:rgb(0 0 0 / 20%) 0px 2px 4px -1px,\n      rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px}.link.svelte-injj2a{@apply inline-flex flex-col items-center p-4 text-xs;}body{--nav-height:60px}',
      map: null,
    };
    BottomBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$2);
      return `<nav class="${'navbar svelte-injj2a'}"><a sveltekit:prefetch href="${'/'}" class="${'link svelte-injj2a'}">${validate_component(
        SwordIcon,
        'SwordIcon',
      ).$$render($$result, { width: 24 }, {}, {})}
    Training
  </a>
</nav>`;
    });
    css$1 = {
      code: '.header.svelte-1mwmt9p{@apply bg-pink-600;;@apply text-white;;@apply py-3;;box-shadow:rgb(0 0 0 / 20%) 0px 2px 4px -1px,\n      rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px}.title.svelte-1mwmt9p{@apply text-3xl;;@apply text-center;;@apply font-title;}',
      map: null,
    };
    TopBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$1);
      return `<header class="${'header svelte-1mwmt9p'}"><h2 class="${'title svelte-1mwmt9p'}">My Fitness Buddy</h2>
</header>`;
    });
    css = {
      code: 'body{min-height:100vh;min-height:-webkit-fill-available}html{height:-webkit-fill-available}main.svelte-1wa4s6j{height:calc(100vh - 73px - 60px)}',
      map: null,
    };
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return `${
        (($$result.head += `<link rel="${'preconnect'}" href="${'https://fonts.googleapis.com'}" data-svelte="svelte-xvfycw"><link rel="${'preconnect'}" href="${'https://fonts.gstatic.com'}" crossorigin="${'true'}" data-svelte="svelte-xvfycw"><link href="${'https://fonts.googleapis.com/css2?family=Roboto&family=Shadows+Into+Light+Two&Rubik:wght@500;600;700&display=swap'}" rel="${'stylesheet'}" data-svelte="svelte-xvfycw">`),
        '')
      }

${validate_component(TopBar, 'TopBar').$$render($$result, {}, {}, {})}
<main class="${'container relative flex flex-col flex-1 h-full p-4 mx-auto overflow-scroll svelte-1wa4s6j'}">${
        slots.default ? slots.default({}) : ``
      }</main>
${validate_component(BottomBar, 'BottomBar').$$render($$result, {}, {}, {})}
${validate_component(BeepAudio, 'BeepAudio').$$render($$result, {}, {}, {})}`;
    });
  },
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css2,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports,
});
var entry, js, css2;
var init__ = __esm({
  '.svelte-kit/output/server/nodes/0.js'() {
    init_layout_svelte();
    entry = 'pages/__layout.svelte-df40705a.js';
    js = [
      'pages/__layout.svelte-df40705a.js',
      'chunks/index-85439ac7.js',
      'chunks/audio-03895b51.js',
      'chunks/index-d5338481.js',
    ];
    css2 = ['assets/pages/__layout.svelte-0dd7bfad.css'];
  },
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load,
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  '.svelte-kit/output/server/entries/fallbacks/error.svelte.js'() {
    init_index_46a73c56();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  },
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css3,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports,
});
var entry2, js2, css3;
var init__2 = __esm({
  '.svelte-kit/output/server/nodes/1.js'() {
    init_error_svelte();
    entry2 = 'error.svelte-debfa737.js';
    js2 = ['error.svelte-debfa737.js', 'chunks/index-85439ac7.js'];
    css3 = [];
  },
});

// .svelte-kit/output/server/chunks/TrainingInfo-2c3affe7.js
var TrainingInfo;
var init_TrainingInfo_2c3affe7 = __esm({
  '.svelte-kit/output/server/chunks/TrainingInfo-2c3affe7.js'() {
    init_index_46a73c56();
    TrainingInfo = create_ssr_component(
      ($$result, $$props, $$bindings, slots) => {
        let { training } = $$props;
        let { onClick } = $$props;
        const ADVANCED_TECHNIQUES = {
          bi_set: 'BI-SET',
          fst_7: 'FST-7',
          gvt: 'GVT',
          rest_and_pause: `Rest 'n' Pause 3x`,
          'drop-set': `Drop-Set 3x`,
        };
        if (
          $$props.training === void 0 &&
          $$bindings.training &&
          training !== void 0
        )
          $$bindings.training(training);
        if (
          $$props.onClick === void 0 &&
          $$bindings.onClick &&
          onClick !== void 0
        )
          $$bindings.onClick(onClick);
        return `<section class="${'w-full mb-4 cursor-pointer'}"><h3 class="${'font-semibold font-heading'}">${escape(
          training.exercise.name,
        )}</h3>
  <p class="${'mt-2 font-sans'}"><span>${escape(training.series)}x${escape(
          training.repetitions,
        )}</span>
    ${
      training.advancedTechnique
        ? `<span class="${'inline-block ml-2 text-gray-400'}">${escape(
            ADVANCED_TECHNIQUES[training.advancedTechnique],
          )}</span>`
        : ``
    }</p></section>`;
      },
    );
  },
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes,
});
var LoaderSpinner, css4, TrainingDate, Routes;
var init_index_svelte = __esm({
  '.svelte-kit/output/server/entries/pages/index.svelte.js'() {
    init_index_46a73c56();
    init_TrainingInfo_2c3affe7();
    LoaderSpinner = create_ssr_component(
      ($$result, $$props, $$bindings, slots) => {
        return `<svg xmlns="${'http://www.w3.org/2000/svg'}" viewBox="${'0 0 45 45'}" stroke="${'#db2777'}" class="${'w-20'}"><g fill="${'none'}" fill-rule="${'evenodd'}" transform="${'translate(1 1)'}" stroke-width="${'2'}"><circle cx="${'22'}" cy="${'22'}" r="${'6'}" stroke-opacity="${'0'}"><animate attributeName="${'r'}" begin="${'1s'}" dur="${'2s'}" values="${'6;22'}" calcMode="${'linear'}" repeatCount="${'indefinite'}"></animate><animate attributeName="${'stroke-opacity'}" begin="${'1s'}" dur="${'2s'}" values="${'1;0'}" calcMode="${'linear'}" repeatCount="${'indefinite'}"></animate><animate attributeName="${'stroke-width'}" begin="${'1s'}" dur="${'2s'}" values="${'2;0'}" calcMode="${'linear'}" repeatCount="${'indefinite'}"></animate></circle><circle cx="${'22'}" cy="${'22'}" r="${'6'}" stroke-opacity="${'0'}"><animate attributeName="${'r'}" begin="${'2s'}" dur="${'2s'}" values="${'6;22'}" calcMode="${'linear'}" repeatCount="${'indefinite'}"></animate><animate attributeName="${'stroke-opacity'}" begin="${'2s'}" dur="${'2s'}" values="${'1;0'}" calcMode="${'linear'}" repeatCount="${'indefinite'}"></animate><animate attributeName="${'stroke-width'}" begin="${'2s'}" dur="${'2s'}" values="${'2;0'}" calcMode="${'linear'}" repeatCount="${'indefinite'}"></animate></circle><circle cx="${'22'}" cy="${'22'}" r="${'8'}"><animate attributeName="${'r'}" begin="${'0s'}" dur="${'1s'}" values="${'6;1;2;3;4;5;6'}" calcMode="${'linear'}" repeatCount="${'indefinite'}"></animate></circle></g></svg>`;
      },
    );
    css4 = {
      code: '.active.svelte-1vtu3w7{@apply bg-pink-500 text-white shadow-md;}',
      map: null,
    };
    TrainingDate = create_ssr_component(
      ($$result, $$props, $$bindings, slots) => {
        let { date } = $$props;
        let { isActive = false } = $$props;
        let { onClick } = $$props;
        const convertedDate = new Date(date);
        const dateMap = {
          0: 'Seg',
          1: 'Ter',
          2: 'Qua',
          3: 'Qui',
          4: 'Sex',
          5: 'S\xE1b',
          6: 'Dom',
        };
        if ($$props.date === void 0 && $$bindings.date && date !== void 0)
          $$bindings.date(date);
        if (
          $$props.isActive === void 0 &&
          $$bindings.isActive &&
          isActive !== void 0
        )
          $$bindings.isActive(isActive);
        if (
          $$props.onClick === void 0 &&
          $$bindings.onClick &&
          onClick !== void 0
        )
          $$bindings.onClick(onClick);
        $$result.css.add(css4);
        return `<button class="${[
          'flex flex-col items-center px-3 py-1 svelte-1vtu3w7',
          isActive ? 'active' : '',
        ]
          .join(' ')
          .trim()}"><span class="${'font-black font-heading'}">${escape(
          convertedDate.getDate(),
        )}</span>
  <span>${escape(dateMap[convertedDate.getDay()])}</span>
</button>`;
      },
    );
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let currentIndex;
      let currentRoutine;
      let showAnimation;
      let { trainingSheet } = $$props;
      let { suggestedCurrentIndex } = $$props;
      const TRAINING_PERSISTENCE_KEY = `training__currentIndex_${trainingSheet._id}`;
      function onTrainingClick(index) {
        currentIndex = index;
        localStorage.setItem(TRAINING_PERSISTENCE_KEY, currentIndex.toString());
      }
      if (
        $$props.trainingSheet === void 0 &&
        $$bindings.trainingSheet &&
        trainingSheet !== void 0
      )
        $$bindings.trainingSheet(trainingSheet);
      if (
        $$props.suggestedCurrentIndex === void 0 &&
        $$bindings.suggestedCurrentIndex &&
        suggestedCurrentIndex !== void 0
      )
        $$bindings.suggestedCurrentIndex(suggestedCurrentIndex);
      currentIndex = null;
      currentRoutine =
        currentIndex !== null
          ? trainingSheet.schema[currentIndex].routine
          : null;
      showAnimation = true;
      return `${
        (($$result.head += `${
          (($$result.title = `<title>Fitness Buddy ${escape(
            currentRoutine ? `- ${currentRoutine.name}` : null,
          )}</title>`),
          '')
        }`),
        '')
      }

${
  showAnimation
    ? `<div class="${'grid w-full h-full place-items-center'}">${validate_component(
        LoaderSpinner,
        'LoaderSpinner',
      ).$$render($$result, {}, {}, {})}</div>`
    : `<nav class="${'flex justify-between'}">${each(
        trainingSheet.schema,
        (schema, index) => {
          return `${validate_component(TrainingDate, 'TrainingDate').$$render(
            $$result,
            {
              date: schema.routine.date,
              isActive: currentIndex === index,
              onClick: () => onTrainingClick(index),
            },
            {},
            {},
          )}`;
        },
      )}</nav>

  <h1 class="${'mt-8 text-3xl font-bold font-heading'}">${escape(
        currentRoutine.name,
      )}
    ${
      currentRoutine.description
        ? `<span class="${'block font-sans text-base italic font-normal text-gray-700'}">${escape(
            currentRoutine.description,
          )}</span>`
        : ``
    }</h1>

  <hr class="${'my-6'}">

  <div>${each(currentRoutine.training, (training) => {
    return `${validate_component(TrainingInfo, 'TrainingInfo').$$render(
      $$result,
      {
        training,
        onClick: () => {
          console.log(training);
        },
      },
      {},
      {},
    )}`;
  })}</div>`
}`;
    });
  },
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css5,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports,
});
var entry3, js3, css5;
var init__3 = __esm({
  '.svelte-kit/output/server/nodes/2.js'() {
    init_index_svelte();
    entry3 = 'pages/index.svelte-cfe5cb5e.js';
    js3 = [
      'pages/index.svelte-cfe5cb5e.js',
      'chunks/index-85439ac7.js',
      'chunks/TrainingInfo-ff5fbf6e.js',
    ];
    css5 = ['assets/pages/index.svelte-9658af69.css'];
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/_virtual/_tslib.js
var require_tslib = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/_virtual/_tslib.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.__assign = function () {
      exports.__assign =
        Object.assign ||
        function __assign2(t2) {
          for (var s3, i2 = 1, n = arguments.length; i2 < n; i2++) {
            s3 = arguments[i2];
            for (var p in s3)
              if (Object.prototype.hasOwnProperty.call(s3, p)) t2[p] = s3[p];
          }
          return t2;
        };
      return exports.__assign.apply(this, arguments);
    };
    function __rest2(s3, e2) {
      var t2 = {};
      for (var p in s3)
        if (Object.prototype.hasOwnProperty.call(s3, p) && e2.indexOf(p) < 0)
          t2[p] = s3[p];
      if (s3 != null && typeof Object.getOwnPropertySymbols === 'function')
        for (
          var i2 = 0, p = Object.getOwnPropertySymbols(s3);
          i2 < p.length;
          i2++
        ) {
          if (
            e2.indexOf(p[i2]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(s3, p[i2])
          )
            t2[p[i2]] = s3[p[i2]];
        }
      return t2;
    }
    function __values(o) {
      var s3 = typeof Symbol === 'function' && Symbol.iterator,
        m2 = s3 && o[s3],
        i2 = 0;
      if (m2) return m2.call(o);
      if (o && typeof o.length === 'number')
        return {
          next: function () {
            if (o && i2 >= o.length) o = void 0;
            return { value: o && o[i2++], done: !o };
          },
        };
      throw new TypeError(
        s3 ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
      );
    }
    function __read2(o, n) {
      var m2 = typeof Symbol === 'function' && o[Symbol.iterator];
      if (!m2) return o;
      var i2 = m2.call(o),
        r2,
        ar = [],
        e2;
      try {
        while ((n === void 0 || n-- > 0) && !(r2 = i2.next()).done)
          ar.push(r2.value);
      } catch (error2) {
        e2 = { error: error2 };
      } finally {
        try {
          if (r2 && !r2.done && (m2 = i2['return'])) m2.call(i2);
        } finally {
          if (e2) throw e2.error;
        }
      }
      return ar;
    }
    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i2 = 0, l = from.length, ar; i2 < l; i2++) {
          if (ar || !(i2 in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
            ar[i2] = from[i2];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    }
    exports.__read = __read2;
    exports.__rest = __rest2;
    exports.__spreadArray = __spreadArray;
    exports.__values = __values;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/types.js
var require_types = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/types.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.ActionTypes = void 0;
    (function (ActionTypes) {
      ActionTypes['Start'] = 'xstate.start';
      ActionTypes['Stop'] = 'xstate.stop';
      ActionTypes['Raise'] = 'xstate.raise';
      ActionTypes['Send'] = 'xstate.send';
      ActionTypes['Cancel'] = 'xstate.cancel';
      ActionTypes['NullEvent'] = '';
      ActionTypes['Assign'] = 'xstate.assign';
      ActionTypes['After'] = 'xstate.after';
      ActionTypes['DoneState'] = 'done.state';
      ActionTypes['DoneInvoke'] = 'done.invoke';
      ActionTypes['Log'] = 'xstate.log';
      ActionTypes['Init'] = 'xstate.init';
      ActionTypes['Invoke'] = 'xstate.invoke';
      ActionTypes['ErrorExecution'] = 'error.execution';
      ActionTypes['ErrorCommunication'] = 'error.communication';
      ActionTypes['ErrorPlatform'] = 'error.platform';
      ActionTypes['ErrorCustom'] = 'xstate.error';
      ActionTypes['Update'] = 'xstate.update';
      ActionTypes['Pure'] = 'xstate.pure';
      ActionTypes['Choose'] = 'xstate.choose';
    })(exports.ActionTypes || (exports.ActionTypes = {}));
    exports.SpecialTargets = void 0;
    (function (SpecialTargets) {
      SpecialTargets['Parent'] = '#_parent';
      SpecialTargets['Internal'] = '#_internal';
    })(exports.SpecialTargets || (exports.SpecialTargets = {}));
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/actionTypes.js
var require_actionTypes = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/actionTypes.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var types2 = require_types();
    var start = types2.ActionTypes.Start;
    var stop = types2.ActionTypes.Stop;
    var raise = types2.ActionTypes.Raise;
    var send = types2.ActionTypes.Send;
    var cancel = types2.ActionTypes.Cancel;
    var nullEvent = types2.ActionTypes.NullEvent;
    var assign2 = types2.ActionTypes.Assign;
    var after = types2.ActionTypes.After;
    var doneState = types2.ActionTypes.DoneState;
    var log = types2.ActionTypes.Log;
    var init2 = types2.ActionTypes.Init;
    var invoke = types2.ActionTypes.Invoke;
    var errorExecution = types2.ActionTypes.ErrorExecution;
    var errorPlatform = types2.ActionTypes.ErrorPlatform;
    var error2 = types2.ActionTypes.ErrorCustom;
    var update = types2.ActionTypes.Update;
    var choose = types2.ActionTypes.Choose;
    var pure = types2.ActionTypes.Pure;
    exports.after = after;
    exports.assign = assign2;
    exports.cancel = cancel;
    exports.choose = choose;
    exports.doneState = doneState;
    exports.error = error2;
    exports.errorExecution = errorExecution;
    exports.errorPlatform = errorPlatform;
    exports.init = init2;
    exports.invoke = invoke;
    exports.log = log;
    exports.nullEvent = nullEvent;
    exports.pure = pure;
    exports.raise = raise;
    exports.send = send;
    exports.start = start;
    exports.stop = stop;
    exports.update = update;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/constants.js
var require_constants = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/constants.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var STATE_DELIMITER = '.';
    var EMPTY_ACTIVITY_MAP = {};
    var DEFAULT_GUARD_TYPE = 'xstate.guard';
    var TARGETLESS_KEY = '';
    exports.DEFAULT_GUARD_TYPE = DEFAULT_GUARD_TYPE;
    exports.EMPTY_ACTIVITY_MAP = EMPTY_ACTIVITY_MAP;
    exports.STATE_DELIMITER = STATE_DELIMITER;
    exports.TARGETLESS_KEY = TARGETLESS_KEY;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/environment.js
var require_environment = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/environment.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var IS_PRODUCTION = process.env.NODE_ENV === 'production';
    exports.IS_PRODUCTION = IS_PRODUCTION;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/utils.js
var require_utils = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/utils.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var constants = require_constants();
    var environment = require_environment();
    var _a4;
    function keys(value) {
      return Object.keys(value);
    }
    function matchesState(parentStateId, childStateId, delimiter) {
      if (delimiter === void 0) {
        delimiter = constants.STATE_DELIMITER;
      }
      var parentStateValue = toStateValue(parentStateId, delimiter);
      var childStateValue = toStateValue(childStateId, delimiter);
      if (isString(childStateValue)) {
        if (isString(parentStateValue)) {
          return childStateValue === parentStateValue;
        }
        return false;
      }
      if (isString(parentStateValue)) {
        return parentStateValue in childStateValue;
      }
      return Object.keys(parentStateValue).every(function (key2) {
        if (!(key2 in childStateValue)) {
          return false;
        }
        return matchesState(parentStateValue[key2], childStateValue[key2]);
      });
    }
    function getEventType(event2) {
      try {
        return isString(event2) || typeof event2 === 'number'
          ? ''.concat(event2)
          : event2.type;
      } catch (e2) {
        throw new Error(
          'Events must be strings or objects with a string event.type property.',
        );
      }
    }
    function getActionType(action) {
      try {
        return isString(action) || typeof action === 'number'
          ? ''.concat(action)
          : isFunction(action)
          ? action.name
          : action.type;
      } catch (e2) {
        throw new Error(
          'Actions must be strings or objects with a string action.type property.',
        );
      }
    }
    function toStatePath(stateId, delimiter) {
      try {
        if (isArray(stateId)) {
          return stateId;
        }
        return stateId.toString().split(delimiter);
      } catch (e2) {
        throw new Error("'".concat(stateId, "' is not a valid state path."));
      }
    }
    function isStateLike(state) {
      return (
        typeof state === 'object' &&
        'value' in state &&
        'context' in state &&
        'event' in state &&
        '_event' in state
      );
    }
    function toStateValue(stateValue, delimiter) {
      if (isStateLike(stateValue)) {
        return stateValue.value;
      }
      if (isArray(stateValue)) {
        return pathToStateValue(stateValue);
      }
      if (typeof stateValue !== 'string') {
        return stateValue;
      }
      var statePath = toStatePath(stateValue, delimiter);
      return pathToStateValue(statePath);
    }
    function pathToStateValue(statePath) {
      if (statePath.length === 1) {
        return statePath[0];
      }
      var value = {};
      var marker = value;
      for (var i2 = 0; i2 < statePath.length - 1; i2++) {
        if (i2 === statePath.length - 2) {
          marker[statePath[i2]] = statePath[i2 + 1];
        } else {
          marker[statePath[i2]] = {};
          marker = marker[statePath[i2]];
        }
      }
      return value;
    }
    function mapValues(collection, iteratee) {
      var result = {};
      var collectionKeys = Object.keys(collection);
      for (var i2 = 0; i2 < collectionKeys.length; i2++) {
        var key2 = collectionKeys[i2];
        result[key2] = iteratee(collection[key2], key2, collection, i2);
      }
      return result;
    }
    function mapFilterValues(collection, iteratee, predicate) {
      var e_1, _a5;
      var result = {};
      try {
        for (
          var _b = _tslib.__values(Object.keys(collection)), _c = _b.next();
          !_c.done;
          _c = _b.next()
        ) {
          var key2 = _c.value;
          var item = collection[key2];
          if (!predicate(item)) {
            continue;
          }
          result[key2] = iteratee(item, key2, collection);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1,
        };
      } finally {
        try {
          if (_c && !_c.done && (_a5 = _b.return)) _a5.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return result;
    }
    var path = function (props) {
      return function (object) {
        var e_2, _a5;
        var result = object;
        try {
          for (
            var props_1 = _tslib.__values(props), props_1_1 = props_1.next();
            !props_1_1.done;
            props_1_1 = props_1.next()
          ) {
            var prop = props_1_1.value;
            result = result[prop];
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1,
          };
        } finally {
          try {
            if (props_1_1 && !props_1_1.done && (_a5 = props_1.return))
              _a5.call(props_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
        return result;
      };
    };
    function nestedPath(props, accessorProp) {
      return function (object) {
        var e_3, _a5;
        var result = object;
        try {
          for (
            var props_2 = _tslib.__values(props), props_2_1 = props_2.next();
            !props_2_1.done;
            props_2_1 = props_2.next()
          ) {
            var prop = props_2_1.value;
            result = result[accessorProp][prop];
          }
        } catch (e_3_1) {
          e_3 = {
            error: e_3_1,
          };
        } finally {
          try {
            if (props_2_1 && !props_2_1.done && (_a5 = props_2.return))
              _a5.call(props_2);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
        return result;
      };
    }
    function toStatePaths(stateValue) {
      if (!stateValue) {
        return [[]];
      }
      if (isString(stateValue)) {
        return [[stateValue]];
      }
      var result = flatten(
        Object.keys(stateValue).map(function (key2) {
          var subStateValue = stateValue[key2];
          if (
            typeof subStateValue !== 'string' &&
            (!subStateValue || !Object.keys(subStateValue).length)
          ) {
            return [[key2]];
          }
          return toStatePaths(stateValue[key2]).map(function (subPath) {
            return [key2].concat(subPath);
          });
        }),
      );
      return result;
    }
    function pathsToStateValue(paths) {
      var e_4, _a5;
      var result = {};
      if (paths && paths.length === 1 && paths[0].length === 1) {
        return paths[0][0];
      }
      try {
        for (
          var paths_1 = _tslib.__values(paths), paths_1_1 = paths_1.next();
          !paths_1_1.done;
          paths_1_1 = paths_1.next()
        ) {
          var currentPath = paths_1_1.value;
          var marker = result;
          for (var i2 = 0; i2 < currentPath.length; i2++) {
            var subPath = currentPath[i2];
            if (i2 === currentPath.length - 2) {
              marker[subPath] = currentPath[i2 + 1];
              break;
            }
            marker[subPath] = marker[subPath] || {};
            marker = marker[subPath];
          }
        }
      } catch (e_4_1) {
        e_4 = {
          error: e_4_1,
        };
      } finally {
        try {
          if (paths_1_1 && !paths_1_1.done && (_a5 = paths_1.return))
            _a5.call(paths_1);
        } finally {
          if (e_4) throw e_4.error;
        }
      }
      return result;
    }
    function flatten(array) {
      var _a5;
      return (_a5 = []).concat.apply(
        _a5,
        _tslib.__spreadArray([], _tslib.__read(array), false),
      );
    }
    function toArrayStrict(value) {
      if (isArray(value)) {
        return value;
      }
      return [value];
    }
    function toArray(value) {
      if (value === void 0) {
        return [];
      }
      return toArrayStrict(value);
    }
    function mapContext(mapper, context, _event) {
      var e_5, _a5;
      if (isFunction(mapper)) {
        return mapper(context, _event.data);
      }
      var result = {};
      try {
        for (
          var _b = _tslib.__values(Object.keys(mapper)), _c = _b.next();
          !_c.done;
          _c = _b.next()
        ) {
          var key2 = _c.value;
          var subMapper = mapper[key2];
          if (isFunction(subMapper)) {
            result[key2] = subMapper(context, _event.data);
          } else {
            result[key2] = subMapper;
          }
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1,
        };
      } finally {
        try {
          if (_c && !_c.done && (_a5 = _b.return)) _a5.call(_b);
        } finally {
          if (e_5) throw e_5.error;
        }
      }
      return result;
    }
    function isBuiltInEvent(eventType) {
      return /^(done|error)\./.test(eventType);
    }
    function isPromiseLike(value) {
      if (value instanceof Promise) {
        return true;
      }
      if (
        value !== null &&
        (isFunction(value) || typeof value === 'object') &&
        isFunction(value.then)
      ) {
        return true;
      }
      return false;
    }
    function isBehavior(value) {
      return (
        value !== null &&
        typeof value === 'object' &&
        'transition' in value &&
        typeof value.transition === 'function'
      );
    }
    function partition(items, predicate) {
      var e_6, _a5;
      var _b = _tslib.__read([[], []], 2),
        truthy = _b[0],
        falsy = _b[1];
      try {
        for (
          var items_1 = _tslib.__values(items), items_1_1 = items_1.next();
          !items_1_1.done;
          items_1_1 = items_1.next()
        ) {
          var item = items_1_1.value;
          if (predicate(item)) {
            truthy.push(item);
          } else {
            falsy.push(item);
          }
        }
      } catch (e_6_1) {
        e_6 = {
          error: e_6_1,
        };
      } finally {
        try {
          if (items_1_1 && !items_1_1.done && (_a5 = items_1.return))
            _a5.call(items_1);
        } finally {
          if (e_6) throw e_6.error;
        }
      }
      return [truthy, falsy];
    }
    function updateHistoryStates(hist, stateValue) {
      return mapValues(hist.states, function (subHist, key2) {
        if (!subHist) {
          return void 0;
        }
        var subStateValue =
          (isString(stateValue) ? void 0 : stateValue[key2]) ||
          (subHist ? subHist.current : void 0);
        if (!subStateValue) {
          return void 0;
        }
        return {
          current: subStateValue,
          states: updateHistoryStates(subHist, subStateValue),
        };
      });
    }
    function updateHistoryValue(hist, stateValue) {
      return {
        current: stateValue,
        states: updateHistoryStates(hist, stateValue),
      };
    }
    function updateContext(context, _event, assignActions, state) {
      if (!environment.IS_PRODUCTION) {
        exports.warn(!!context, 'Attempting to update undefined context');
      }
      var updatedContext = context
        ? assignActions.reduce(function (acc, assignAction) {
            var e_7, _a5;
            var assignment = assignAction.assignment;
            var meta = {
              state,
              action: assignAction,
              _event,
            };
            var partialUpdate = {};
            if (isFunction(assignment)) {
              partialUpdate = assignment(acc, _event.data, meta);
            } else {
              try {
                for (
                  var _b = _tslib.__values(Object.keys(assignment)),
                    _c = _b.next();
                  !_c.done;
                  _c = _b.next()
                ) {
                  var key2 = _c.value;
                  var propAssignment = assignment[key2];
                  partialUpdate[key2] = isFunction(propAssignment)
                    ? propAssignment(acc, _event.data, meta)
                    : propAssignment;
                }
              } catch (e_7_1) {
                e_7 = {
                  error: e_7_1,
                };
              } finally {
                try {
                  if (_c && !_c.done && (_a5 = _b.return)) _a5.call(_b);
                } finally {
                  if (e_7) throw e_7.error;
                }
              }
            }
            return Object.assign({}, acc, partialUpdate);
          }, context)
        : context;
      return updatedContext;
    }
    exports.warn = function () {};
    if (!environment.IS_PRODUCTION) {
      exports.warn = function (condition, message) {
        var error2 = condition instanceof Error ? condition : void 0;
        if (!error2 && condition) {
          return;
        }
        if (console !== void 0) {
          var args = ['Warning: '.concat(message)];
          if (error2) {
            args.push(error2);
          }
          console.warn.apply(console, args);
        }
      };
    }
    function isArray(value) {
      return Array.isArray(value);
    }
    function isFunction(value) {
      return typeof value === 'function';
    }
    function isString(value) {
      return typeof value === 'string';
    }
    function toGuard(condition, guardMap) {
      if (!condition) {
        return void 0;
      }
      if (isString(condition)) {
        return {
          type: constants.DEFAULT_GUARD_TYPE,
          name: condition,
          predicate: guardMap ? guardMap[condition] : void 0,
        };
      }
      if (isFunction(condition)) {
        return {
          type: constants.DEFAULT_GUARD_TYPE,
          name: condition.name,
          predicate: condition,
        };
      }
      return condition;
    }
    function isObservable(value) {
      try {
        return 'subscribe' in value && isFunction(value.subscribe);
      } catch (e2) {
        return false;
      }
    }
    var symbolObservable = /* @__PURE__ */ (function () {
      return (
        (typeof Symbol === 'function' && Symbol.observable) || '@@observable'
      );
    })();
    var interopSymbols =
      ((_a4 = {}),
      (_a4[symbolObservable] = function () {
        return this;
      }),
      (_a4[Symbol.observable] = function () {
        return this;
      }),
      _a4);
    function isMachine(value) {
      return !!value && '__xstatenode' in value;
    }
    function isActor(value) {
      return !!value && typeof value.send === 'function';
    }
    var uniqueId = /* @__PURE__ */ (function () {
      var currentId = 0;
      return function () {
        currentId++;
        return currentId.toString(16);
      };
    })();
    function toEventObject(event2, payload) {
      if (isString(event2) || typeof event2 === 'number') {
        return _tslib.__assign(
          {
            type: event2,
          },
          payload,
        );
      }
      return event2;
    }
    function toSCXMLEvent(event2, scxmlEvent) {
      if (
        !isString(event2) &&
        '$$type' in event2 &&
        event2.$$type === 'scxml'
      ) {
        return event2;
      }
      var eventObject = toEventObject(event2);
      return _tslib.__assign(
        {
          name: eventObject.type,
          data: eventObject,
          $$type: 'scxml',
          type: 'external',
        },
        scxmlEvent,
      );
    }
    function toTransitionConfigArray(event2, configLike) {
      var transitions = toArrayStrict(configLike).map(function (
        transitionLike,
      ) {
        if (
          typeof transitionLike === 'undefined' ||
          typeof transitionLike === 'string' ||
          isMachine(transitionLike)
        ) {
          return {
            target: transitionLike,
            event: event2,
          };
        }
        return _tslib.__assign(_tslib.__assign({}, transitionLike), {
          event: event2,
        });
      });
      return transitions;
    }
    function normalizeTarget(target) {
      if (target === void 0 || target === constants.TARGETLESS_KEY) {
        return void 0;
      }
      return toArray(target);
    }
    function reportUnhandledExceptionOnInvocation(
      originalError,
      currentError,
      id,
    ) {
      if (!environment.IS_PRODUCTION) {
        var originalStackTrace = originalError.stack
          ? " Stacktrace was '".concat(originalError.stack, "'")
          : '';
        if (originalError === currentError) {
          console.error(
            "Missing onError handler for invocation '"
              .concat(id, "', error was '")
              .concat(originalError, "'.")
              .concat(originalStackTrace),
          );
        } else {
          var stackTrace = currentError.stack
            ? " Stacktrace was '".concat(currentError.stack, "'")
            : '';
          console.error(
            "Missing onError handler and/or unhandled exception/promise rejection for invocation '".concat(
              id,
              "'. ",
            ) +
              "Original error: '"
                .concat(originalError, "'. ")
                .concat(originalStackTrace, " Current error is '")
                .concat(currentError, "'.")
                .concat(stackTrace),
          );
        }
      }
    }
    function evaluateGuard(machine, guard, context, _event, state) {
      var guards = machine.options.guards;
      var guardMeta = {
        state,
        cond: guard,
        _event,
      };
      if (guard.type === constants.DEFAULT_GUARD_TYPE) {
        return (
          (guards === null || guards === void 0
            ? void 0
            : guards[guard.name]) || guard.predicate
        )(context, _event.data, guardMeta);
      }
      var condFn =
        guards === null || guards === void 0 ? void 0 : guards[guard.type];
      if (!condFn) {
        throw new Error(
          "Guard '"
            .concat(guard.type, "' is not implemented on machine '")
            .concat(machine.id, "'."),
        );
      }
      return condFn(context, _event.data, guardMeta);
    }
    function toInvokeSource(src) {
      if (typeof src === 'string') {
        return {
          type: src,
        };
      }
      return src;
    }
    function toObserver(nextHandler, errorHandler, completionHandler) {
      if (typeof nextHandler === 'object') {
        return nextHandler;
      }
      var noop4 = function () {
        return void 0;
      };
      return {
        next: nextHandler,
        error: errorHandler || noop4,
        complete: completionHandler || noop4,
      };
    }
    function createInvokeId(stateNodeId, index) {
      return ''.concat(stateNodeId, ':invocation[').concat(index, ']');
    }
    exports.createInvokeId = createInvokeId;
    exports.evaluateGuard = evaluateGuard;
    exports.flatten = flatten;
    exports.getActionType = getActionType;
    exports.getEventType = getEventType;
    exports.interopSymbols = interopSymbols;
    exports.isActor = isActor;
    exports.isArray = isArray;
    exports.isBehavior = isBehavior;
    exports.isBuiltInEvent = isBuiltInEvent;
    exports.isFunction = isFunction;
    exports.isMachine = isMachine;
    exports.isObservable = isObservable;
    exports.isPromiseLike = isPromiseLike;
    exports.isStateLike = isStateLike;
    exports.isString = isString;
    exports.keys = keys;
    exports.mapContext = mapContext;
    exports.mapFilterValues = mapFilterValues;
    exports.mapValues = mapValues;
    exports.matchesState = matchesState;
    exports.nestedPath = nestedPath;
    exports.normalizeTarget = normalizeTarget;
    exports.partition = partition;
    exports.path = path;
    exports.pathToStateValue = pathToStateValue;
    exports.pathsToStateValue = pathsToStateValue;
    exports.reportUnhandledExceptionOnInvocation =
      reportUnhandledExceptionOnInvocation;
    exports.symbolObservable = symbolObservable;
    exports.toArray = toArray;
    exports.toArrayStrict = toArrayStrict;
    exports.toEventObject = toEventObject;
    exports.toGuard = toGuard;
    exports.toInvokeSource = toInvokeSource;
    exports.toObserver = toObserver;
    exports.toSCXMLEvent = toSCXMLEvent;
    exports.toStatePath = toStatePath;
    exports.toStatePaths = toStatePaths;
    exports.toStateValue = toStateValue;
    exports.toTransitionConfigArray = toTransitionConfigArray;
    exports.uniqueId = uniqueId;
    exports.updateContext = updateContext;
    exports.updateHistoryStates = updateHistoryStates;
    exports.updateHistoryValue = updateHistoryValue;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/actions.js
var require_actions = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/actions.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var types2 = require_types();
    var actionTypes = require_actionTypes();
    var utils = require_utils();
    var environment = require_environment();
    var initEvent = /* @__PURE__ */ utils.toSCXMLEvent({
      type: actionTypes.init,
    });
    function getActionFunction(actionType, actionFunctionMap) {
      return actionFunctionMap
        ? actionFunctionMap[actionType] || void 0
        : void 0;
    }
    function toActionObject(action, actionFunctionMap) {
      var actionObject;
      if (utils.isString(action) || typeof action === 'number') {
        var exec2 = getActionFunction(action, actionFunctionMap);
        if (utils.isFunction(exec2)) {
          actionObject = {
            type: action,
            exec: exec2,
          };
        } else if (exec2) {
          actionObject = exec2;
        } else {
          actionObject = {
            type: action,
            exec: void 0,
          };
        }
      } else if (utils.isFunction(action)) {
        actionObject = {
          type: action.name || action.toString(),
          exec: action,
        };
      } else {
        var exec2 = getActionFunction(action.type, actionFunctionMap);
        if (utils.isFunction(exec2)) {
          actionObject = _tslib.__assign(_tslib.__assign({}, action), {
            exec: exec2,
          });
        } else if (exec2) {
          var actionType = exec2.type || action.type;
          actionObject = _tslib.__assign(
            _tslib.__assign(_tslib.__assign({}, exec2), action),
            {
              type: actionType,
            },
          );
        } else {
          actionObject = action;
        }
      }
      return actionObject;
    }
    var toActionObjects = function (action, actionFunctionMap) {
      if (!action) {
        return [];
      }
      var actions = utils.isArray(action) ? action : [action];
      return actions.map(function (subAction) {
        return toActionObject(subAction, actionFunctionMap);
      });
    };
    function toActivityDefinition(action) {
      var actionObject = toActionObject(action);
      return _tslib.__assign(
        _tslib.__assign(
          {
            id: utils.isString(action) ? action : actionObject.id,
          },
          actionObject,
        ),
        {
          type: actionObject.type,
        },
      );
    }
    function raise(event2) {
      if (!utils.isString(event2)) {
        return send(event2, {
          to: types2.SpecialTargets.Internal,
        });
      }
      return {
        type: actionTypes.raise,
        event: event2,
      };
    }
    function resolveRaise(action) {
      return {
        type: actionTypes.raise,
        _event: utils.toSCXMLEvent(action.event),
      };
    }
    function send(event2, options) {
      return {
        to: options ? options.to : void 0,
        type: actionTypes.send,
        event: utils.isFunction(event2) ? event2 : utils.toEventObject(event2),
        delay: options ? options.delay : void 0,
        id:
          options && options.id !== void 0
            ? options.id
            : utils.isFunction(event2)
            ? event2.name
            : utils.getEventType(event2),
      };
    }
    function resolveSend(action, ctx, _event, delaysMap) {
      var meta = {
        _event,
      };
      var resolvedEvent = utils.toSCXMLEvent(
        utils.isFunction(action.event)
          ? action.event(ctx, _event.data, meta)
          : action.event,
      );
      var resolvedDelay;
      if (utils.isString(action.delay)) {
        var configDelay = delaysMap && delaysMap[action.delay];
        resolvedDelay = utils.isFunction(configDelay)
          ? configDelay(ctx, _event.data, meta)
          : configDelay;
      } else {
        resolvedDelay = utils.isFunction(action.delay)
          ? action.delay(ctx, _event.data, meta)
          : action.delay;
      }
      var resolvedTarget = utils.isFunction(action.to)
        ? action.to(ctx, _event.data, meta)
        : action.to;
      return _tslib.__assign(_tslib.__assign({}, action), {
        to: resolvedTarget,
        _event: resolvedEvent,
        event: resolvedEvent.data,
        delay: resolvedDelay,
      });
    }
    function sendParent(event2, options) {
      return send(
        event2,
        _tslib.__assign(_tslib.__assign({}, options), {
          to: types2.SpecialTargets.Parent,
        }),
      );
    }
    function sendTo(actor, event2, options) {
      return send(
        event2,
        _tslib.__assign(_tslib.__assign({}, options), {
          to: actor,
        }),
      );
    }
    function sendUpdate() {
      return sendParent(actionTypes.update);
    }
    function respond2(event2, options) {
      return send(
        event2,
        _tslib.__assign(_tslib.__assign({}, options), {
          to: function (_, __, _a4) {
            var _event = _a4._event;
            return _event.origin;
          },
        }),
      );
    }
    var defaultLogExpr = function (context, event2) {
      return {
        context,
        event: event2,
      };
    };
    function log(expr, label) {
      if (expr === void 0) {
        expr = defaultLogExpr;
      }
      return {
        type: actionTypes.log,
        label,
        expr,
      };
    }
    var resolveLog = function (action, ctx, _event) {
      return _tslib.__assign(_tslib.__assign({}, action), {
        value: utils.isString(action.expr)
          ? action.expr
          : action.expr(ctx, _event.data, {
              _event,
            }),
      });
    };
    var cancel = function (sendId) {
      return {
        type: actionTypes.cancel,
        sendId,
      };
    };
    function start(activity) {
      var activityDef = toActivityDefinition(activity);
      return {
        type: types2.ActionTypes.Start,
        activity: activityDef,
        exec: void 0,
      };
    }
    function stop(actorRef) {
      var activity = utils.isFunction(actorRef)
        ? actorRef
        : toActivityDefinition(actorRef);
      return {
        type: types2.ActionTypes.Stop,
        activity,
        exec: void 0,
      };
    }
    function resolveStop(action, context, _event) {
      var actorRefOrString = utils.isFunction(action.activity)
        ? action.activity(context, _event.data)
        : action.activity;
      var resolvedActorRef =
        typeof actorRefOrString === 'string'
          ? {
              id: actorRefOrString,
            }
          : actorRefOrString;
      var actionObject = {
        type: types2.ActionTypes.Stop,
        activity: resolvedActorRef,
      };
      return actionObject;
    }
    var assign2 = function (assignment) {
      return {
        type: actionTypes.assign,
        assignment,
      };
    };
    function isActionObject(action) {
      return typeof action === 'object' && 'type' in action;
    }
    function after(delayRef, id) {
      var idSuffix = id ? '#'.concat(id) : '';
      return ''
        .concat(types2.ActionTypes.After, '(')
        .concat(delayRef, ')')
        .concat(idSuffix);
    }
    function done(id, data) {
      var type = ''.concat(types2.ActionTypes.DoneState, '.').concat(id);
      var eventObject = {
        type,
        data,
      };
      eventObject.toString = function () {
        return type;
      };
      return eventObject;
    }
    function doneInvoke(id, data) {
      var type = ''.concat(types2.ActionTypes.DoneInvoke, '.').concat(id);
      var eventObject = {
        type,
        data,
      };
      eventObject.toString = function () {
        return type;
      };
      return eventObject;
    }
    function error2(id, data) {
      var type = ''.concat(types2.ActionTypes.ErrorPlatform, '.').concat(id);
      var eventObject = {
        type,
        data,
      };
      eventObject.toString = function () {
        return type;
      };
      return eventObject;
    }
    function pure(getActions) {
      return {
        type: types2.ActionTypes.Pure,
        get: getActions,
      };
    }
    function forwardTo(target, options) {
      return send(
        function (_, event2) {
          return event2;
        },
        _tslib.__assign(_tslib.__assign({}, options), {
          to: target,
        }),
      );
    }
    function escalate(errorData, options) {
      return sendParent(
        function (context, event2, meta) {
          return {
            type: actionTypes.error,
            data: utils.isFunction(errorData)
              ? errorData(context, event2, meta)
              : errorData,
          };
        },
        _tslib.__assign(_tslib.__assign({}, options), {
          to: types2.SpecialTargets.Parent,
        }),
      );
    }
    function choose(conds) {
      return {
        type: types2.ActionTypes.Choose,
        conds,
      };
    }
    function resolveActions(
      machine,
      currentState,
      currentContext,
      _event,
      actions,
      preserveActionOrder,
    ) {
      if (preserveActionOrder === void 0) {
        preserveActionOrder = false;
      }
      var _a4 = _tslib.__read(
          preserveActionOrder
            ? [[], actions]
            : utils.partition(actions, function (action) {
                return action.type === actionTypes.assign;
              }),
          2,
        ),
        assignActions = _a4[0],
        otherActions = _a4[1];
      var updatedContext = assignActions.length
        ? utils.updateContext(
            currentContext,
            _event,
            assignActions,
            currentState,
          )
        : currentContext;
      var preservedContexts = preserveActionOrder ? [currentContext] : void 0;
      var resolvedActions = utils.flatten(
        otherActions
          .map(function (actionObject) {
            var _a5;
            switch (actionObject.type) {
              case actionTypes.raise:
                return resolveRaise(actionObject);
              case actionTypes.send:
                var sendAction = resolveSend(
                  actionObject,
                  updatedContext,
                  _event,
                  machine.options.delays,
                );
                if (!environment.IS_PRODUCTION) {
                  utils.warn(
                    !utils.isString(actionObject.delay) ||
                      typeof sendAction.delay === 'number',
                    "No delay reference for delay expression '"
                      .concat(actionObject.delay, "' was found on machine '")
                      .concat(machine.id, "'"),
                  );
                }
                return sendAction;
              case actionTypes.log:
                return resolveLog(actionObject, updatedContext, _event);
              case actionTypes.choose: {
                var chooseAction = actionObject;
                var matchedActions =
                  (_a5 = chooseAction.conds.find(function (condition) {
                    var guard = utils.toGuard(
                      condition.cond,
                      machine.options.guards,
                    );
                    return (
                      !guard ||
                      utils.evaluateGuard(
                        machine,
                        guard,
                        updatedContext,
                        _event,
                        currentState,
                      )
                    );
                  })) === null || _a5 === void 0
                    ? void 0
                    : _a5.actions;
                if (!matchedActions) {
                  return [];
                }
                var _b = _tslib.__read(
                    resolveActions(
                      machine,
                      currentState,
                      updatedContext,
                      _event,
                      toActionObjects(
                        utils.toArray(matchedActions),
                        machine.options.actions,
                      ),
                      preserveActionOrder,
                    ),
                    2,
                  ),
                  resolvedActionsFromChoose = _b[0],
                  resolvedContextFromChoose = _b[1];
                updatedContext = resolvedContextFromChoose;
                preservedContexts === null || preservedContexts === void 0
                  ? void 0
                  : preservedContexts.push(updatedContext);
                return resolvedActionsFromChoose;
              }
              case actionTypes.pure: {
                var matchedActions = actionObject.get(
                  updatedContext,
                  _event.data,
                );
                if (!matchedActions) {
                  return [];
                }
                var _c = _tslib.__read(
                    resolveActions(
                      machine,
                      currentState,
                      updatedContext,
                      _event,
                      toActionObjects(
                        utils.toArray(matchedActions),
                        machine.options.actions,
                      ),
                      preserveActionOrder,
                    ),
                    2,
                  ),
                  resolvedActionsFromPure = _c[0],
                  resolvedContext = _c[1];
                updatedContext = resolvedContext;
                preservedContexts === null || preservedContexts === void 0
                  ? void 0
                  : preservedContexts.push(updatedContext);
                return resolvedActionsFromPure;
              }
              case actionTypes.stop: {
                return resolveStop(actionObject, updatedContext, _event);
              }
              case actionTypes.assign: {
                updatedContext = utils.updateContext(
                  updatedContext,
                  _event,
                  [actionObject],
                  currentState,
                );
                preservedContexts === null || preservedContexts === void 0
                  ? void 0
                  : preservedContexts.push(updatedContext);
                break;
              }
              default:
                var resolvedActionObject = toActionObject(
                  actionObject,
                  machine.options.actions,
                );
                var exec_1 = resolvedActionObject.exec;
                if (exec_1 && preservedContexts) {
                  var contextIndex_1 = preservedContexts.length - 1;
                  resolvedActionObject = _tslib.__assign(
                    _tslib.__assign({}, resolvedActionObject),
                    {
                      exec: function (_ctx) {
                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                          args[_i - 1] = arguments[_i];
                        }
                        exec_1.apply(
                          void 0,
                          _tslib.__spreadArray(
                            [preservedContexts[contextIndex_1]],
                            _tslib.__read(args),
                            false,
                          ),
                        );
                      },
                    },
                  );
                }
                return resolvedActionObject;
            }
          })
          .filter(function (a) {
            return !!a;
          }),
      );
      return [resolvedActions, updatedContext];
    }
    exports.actionTypes = actionTypes;
    exports.after = after;
    exports.assign = assign2;
    exports.cancel = cancel;
    exports.choose = choose;
    exports.done = done;
    exports.doneInvoke = doneInvoke;
    exports.error = error2;
    exports.escalate = escalate;
    exports.forwardTo = forwardTo;
    exports.getActionFunction = getActionFunction;
    exports.initEvent = initEvent;
    exports.isActionObject = isActionObject;
    exports.log = log;
    exports.pure = pure;
    exports.raise = raise;
    exports.resolveActions = resolveActions;
    exports.resolveLog = resolveLog;
    exports.resolveRaise = resolveRaise;
    exports.resolveSend = resolveSend;
    exports.resolveStop = resolveStop;
    exports.respond = respond2;
    exports.send = send;
    exports.sendParent = sendParent;
    exports.sendTo = sendTo;
    exports.sendUpdate = sendUpdate;
    exports.start = start;
    exports.stop = stop;
    exports.toActionObject = toActionObject;
    exports.toActionObjects = toActionObjects;
    exports.toActivityDefinition = toActivityDefinition;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/serviceScope.js
var require_serviceScope = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/serviceScope.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var serviceStack = [];
    var provide = function (service, fn) {
      serviceStack.push(service);
      var result = fn(service);
      serviceStack.pop();
      return result;
    };
    var consume = function (fn) {
      return fn(serviceStack[serviceStack.length - 1]);
    };
    exports.consume = consume;
    exports.provide = provide;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/Actor.js
var require_Actor = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/Actor.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var utils = require_utils();
    var serviceScope = require_serviceScope();
    function createNullActor(id) {
      var _a4;
      return (
        (_a4 = {
          id,
          send: function () {
            return void 0;
          },
          subscribe: function () {
            return {
              unsubscribe: function () {
                return void 0;
              },
            };
          },
          getSnapshot: function () {
            return void 0;
          },
          toJSON: function () {
            return {
              id,
            };
          },
        }),
        (_a4[utils.symbolObservable] = function () {
          return this;
        }),
        _a4
      );
    }
    function createInvocableActor(invokeDefinition, machine, context, _event) {
      var _a4;
      var invokeSrc = utils.toInvokeSource(invokeDefinition.src);
      var serviceCreator =
        (_a4 =
          machine === null || machine === void 0
            ? void 0
            : machine.options.services) === null || _a4 === void 0
          ? void 0
          : _a4[invokeSrc.type];
      var resolvedData = invokeDefinition.data
        ? utils.mapContext(invokeDefinition.data, context, _event)
        : void 0;
      var tempActor = serviceCreator
        ? createDeferredActor(serviceCreator, invokeDefinition.id, resolvedData)
        : createNullActor(invokeDefinition.id);
      tempActor.meta = invokeDefinition;
      return tempActor;
    }
    function createDeferredActor(entity, id, data) {
      var tempActor = createNullActor(id);
      tempActor.deferred = true;
      if (utils.isMachine(entity)) {
        var initialState_1 = (tempActor.state = serviceScope.provide(
          void 0,
          function () {
            return (data ? entity.withContext(data) : entity).initialState;
          },
        ));
        tempActor.getSnapshot = function () {
          return initialState_1;
        };
      }
      return tempActor;
    }
    function isActor(item) {
      try {
        return typeof item.send === 'function';
      } catch (e2) {
        return false;
      }
    }
    function isSpawnedActor(item) {
      return isActor(item) && 'id' in item;
    }
    function toActorRef(actorRefLike) {
      var _a4;
      return _tslib.__assign(
        ((_a4 = {
          subscribe: function () {
            return {
              unsubscribe: function () {
                return void 0;
              },
            };
          },
          id: 'anonymous',
          getSnapshot: function () {
            return void 0;
          },
        }),
        (_a4[utils.symbolObservable] = function () {
          return this;
        }),
        _a4),
        actorRefLike,
      );
    }
    exports.createDeferredActor = createDeferredActor;
    exports.createInvocableActor = createInvocableActor;
    exports.createNullActor = createNullActor;
    exports.isActor = isActor;
    exports.isSpawnedActor = isSpawnedActor;
    exports.toActorRef = toActorRef;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/stateUtils.js
var require_stateUtils = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/stateUtils.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var utils = require_utils();
    var isLeafNode = function (stateNode) {
      return stateNode.type === 'atomic' || stateNode.type === 'final';
    };
    function getChildren(stateNode) {
      return Object.keys(stateNode.states)
        .map(function (key2) {
          return stateNode.states[key2];
        })
        .filter(function (sn) {
          return sn.type !== 'history';
        });
    }
    function getAllStateNodes(stateNode) {
      var stateNodes = [stateNode];
      if (isLeafNode(stateNode)) {
        return stateNodes;
      }
      return stateNodes.concat(
        utils.flatten(getChildren(stateNode).map(getAllStateNodes)),
      );
    }
    function getConfiguration(prevStateNodes, stateNodes) {
      var e_1, _a4, e_2, _b, e_3, _c, e_4, _d2;
      var prevConfiguration = new Set(prevStateNodes);
      var prevAdjList = getAdjList(prevConfiguration);
      var configuration = new Set(stateNodes);
      try {
        for (
          var configuration_1 = _tslib.__values(configuration),
            configuration_1_1 = configuration_1.next();
          !configuration_1_1.done;
          configuration_1_1 = configuration_1.next()
        ) {
          var s3 = configuration_1_1.value;
          var m2 = s3.parent;
          while (m2 && !configuration.has(m2)) {
            configuration.add(m2);
            m2 = m2.parent;
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1,
        };
      } finally {
        try {
          if (
            configuration_1_1 &&
            !configuration_1_1.done &&
            (_a4 = configuration_1.return)
          )
            _a4.call(configuration_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      var adjList = getAdjList(configuration);
      try {
        for (
          var configuration_2 = _tslib.__values(configuration),
            configuration_2_1 = configuration_2.next();
          !configuration_2_1.done;
          configuration_2_1 = configuration_2.next()
        ) {
          var s3 = configuration_2_1.value;
          if (
            s3.type === 'compound' &&
            (!adjList.get(s3) || !adjList.get(s3).length)
          ) {
            if (prevAdjList.get(s3)) {
              prevAdjList.get(s3).forEach(function (sn) {
                return configuration.add(sn);
              });
            } else {
              s3.initialStateNodes.forEach(function (sn) {
                return configuration.add(sn);
              });
            }
          } else {
            if (s3.type === 'parallel') {
              try {
                for (
                  var _e = ((e_3 = void 0), _tslib.__values(getChildren(s3))),
                    _f = _e.next();
                  !_f.done;
                  _f = _e.next()
                ) {
                  var child = _f.value;
                  if (!configuration.has(child)) {
                    configuration.add(child);
                    if (prevAdjList.get(child)) {
                      prevAdjList.get(child).forEach(function (sn) {
                        return configuration.add(sn);
                      });
                    } else {
                      child.initialStateNodes.forEach(function (sn) {
                        return configuration.add(sn);
                      });
                    }
                  }
                }
              } catch (e_3_1) {
                e_3 = {
                  error: e_3_1,
                };
              } finally {
                try {
                  if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                } finally {
                  if (e_3) throw e_3.error;
                }
              }
            }
          }
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1,
        };
      } finally {
        try {
          if (
            configuration_2_1 &&
            !configuration_2_1.done &&
            (_b = configuration_2.return)
          )
            _b.call(configuration_2);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
      try {
        for (
          var configuration_3 = _tslib.__values(configuration),
            configuration_3_1 = configuration_3.next();
          !configuration_3_1.done;
          configuration_3_1 = configuration_3.next()
        ) {
          var s3 = configuration_3_1.value;
          var m2 = s3.parent;
          while (m2 && !configuration.has(m2)) {
            configuration.add(m2);
            m2 = m2.parent;
          }
        }
      } catch (e_4_1) {
        e_4 = {
          error: e_4_1,
        };
      } finally {
        try {
          if (
            configuration_3_1 &&
            !configuration_3_1.done &&
            (_d2 = configuration_3.return)
          )
            _d2.call(configuration_3);
        } finally {
          if (e_4) throw e_4.error;
        }
      }
      return configuration;
    }
    function getValueFromAdj(baseNode, adjList) {
      var childStateNodes = adjList.get(baseNode);
      if (!childStateNodes) {
        return {};
      }
      if (baseNode.type === 'compound') {
        var childStateNode = childStateNodes[0];
        if (childStateNode) {
          if (isLeafNode(childStateNode)) {
            return childStateNode.key;
          }
        } else {
          return {};
        }
      }
      var stateValue = {};
      childStateNodes.forEach(function (csn) {
        stateValue[csn.key] = getValueFromAdj(csn, adjList);
      });
      return stateValue;
    }
    function getAdjList(configuration) {
      var e_5, _a4;
      var adjList = /* @__PURE__ */ new Map();
      try {
        for (
          var configuration_4 = _tslib.__values(configuration),
            configuration_4_1 = configuration_4.next();
          !configuration_4_1.done;
          configuration_4_1 = configuration_4.next()
        ) {
          var s3 = configuration_4_1.value;
          if (!adjList.has(s3)) {
            adjList.set(s3, []);
          }
          if (s3.parent) {
            if (!adjList.has(s3.parent)) {
              adjList.set(s3.parent, []);
            }
            adjList.get(s3.parent).push(s3);
          }
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1,
        };
      } finally {
        try {
          if (
            configuration_4_1 &&
            !configuration_4_1.done &&
            (_a4 = configuration_4.return)
          )
            _a4.call(configuration_4);
        } finally {
          if (e_5) throw e_5.error;
        }
      }
      return adjList;
    }
    function getValue(rootNode, configuration) {
      var config = getConfiguration([rootNode], configuration);
      return getValueFromAdj(rootNode, getAdjList(config));
    }
    function has(iterable, item) {
      if (Array.isArray(iterable)) {
        return iterable.some(function (member) {
          return member === item;
        });
      }
      if (iterable instanceof Set) {
        return iterable.has(item);
      }
      return false;
    }
    function nextEvents(configuration) {
      return _tslib.__spreadArray(
        [],
        _tslib.__read(
          new Set(
            utils.flatten(
              _tslib.__spreadArray(
                [],
                _tslib.__read(
                  configuration.map(function (sn) {
                    return sn.ownEvents;
                  }),
                ),
                false,
              ),
            ),
          ),
        ),
        false,
      );
    }
    function isInFinalState(configuration, stateNode) {
      if (stateNode.type === 'compound') {
        return getChildren(stateNode).some(function (s3) {
          return s3.type === 'final' && has(configuration, s3);
        });
      }
      if (stateNode.type === 'parallel') {
        return getChildren(stateNode).every(function (sn) {
          return isInFinalState(configuration, sn);
        });
      }
      return false;
    }
    function getMeta(configuration) {
      if (configuration === void 0) {
        configuration = [];
      }
      return configuration.reduce(function (acc, stateNode) {
        if (stateNode.meta !== void 0) {
          acc[stateNode.id] = stateNode.meta;
        }
        return acc;
      }, {});
    }
    function getTagsFromConfiguration(configuration) {
      return new Set(
        utils.flatten(
          configuration.map(function (sn) {
            return sn.tags;
          }),
        ),
      );
    }
    exports.getAdjList = getAdjList;
    exports.getAllStateNodes = getAllStateNodes;
    exports.getChildren = getChildren;
    exports.getConfiguration = getConfiguration;
    exports.getMeta = getMeta;
    exports.getTagsFromConfiguration = getTagsFromConfiguration;
    exports.getValue = getValue;
    exports.has = has;
    exports.isInFinalState = isInFinalState;
    exports.isLeafNode = isLeafNode;
    exports.nextEvents = nextEvents;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/State.js
var require_State = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/State.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var constants = require_constants();
    var utils = require_utils();
    var stateUtils = require_stateUtils();
    var actions = require_actions();
    var environment = require_environment();
    function stateValuesEqual(a, b) {
      if (a === b) {
        return true;
      }
      if (a === void 0 || b === void 0) {
        return false;
      }
      if (utils.isString(a) || utils.isString(b)) {
        return a === b;
      }
      var aKeys = Object.keys(a);
      var bKeys = Object.keys(b);
      return (
        aKeys.length === bKeys.length &&
        aKeys.every(function (key2) {
          return stateValuesEqual(a[key2], b[key2]);
        })
      );
    }
    function isStateConfig(state) {
      if (typeof state !== 'object' || state === null) {
        return false;
      }
      return 'value' in state && '_event' in state;
    }
    var isState = isStateConfig;
    function bindActionToState(action, state) {
      var exec2 = action.exec;
      var boundAction = _tslib.__assign(_tslib.__assign({}, action), {
        exec:
          exec2 !== void 0
            ? function () {
                return exec2(state.context, state.event, {
                  action,
                  state,
                  _event: state._event,
                });
              }
            : void 0,
      });
      return boundAction;
    }
    var State2 = /* @__PURE__ */ (function () {
      function State3(config) {
        var _this = this;
        var _a4;
        this.actions = [];
        this.activities = constants.EMPTY_ACTIVITY_MAP;
        this.meta = {};
        this.events = [];
        this.value = config.value;
        this.context = config.context;
        this._event = config._event;
        this._sessionid = config._sessionid;
        this.event = this._event.data;
        this.historyValue = config.historyValue;
        this.history = config.history;
        this.actions = config.actions || [];
        this.activities = config.activities || constants.EMPTY_ACTIVITY_MAP;
        this.meta = stateUtils.getMeta(config.configuration);
        this.events = config.events || [];
        this.matches = this.matches.bind(this);
        this.toStrings = this.toStrings.bind(this);
        this.configuration = config.configuration;
        this.transitions = config.transitions;
        this.children = config.children;
        this.done = !!config.done;
        this.tags =
          (_a4 = Array.isArray(config.tags)
            ? new Set(config.tags)
            : config.tags) !== null && _a4 !== void 0
            ? _a4
            : /* @__PURE__ */ new Set();
        this.machine = config.machine;
        Object.defineProperty(this, 'nextEvents', {
          get: function () {
            return stateUtils.nextEvents(_this.configuration);
          },
        });
      }
      State3.from = function (stateValue, context) {
        if (stateValue instanceof State3) {
          if (stateValue.context !== context) {
            return new State3({
              value: stateValue.value,
              context,
              _event: stateValue._event,
              _sessionid: null,
              historyValue: stateValue.historyValue,
              history: stateValue.history,
              actions: [],
              activities: stateValue.activities,
              meta: {},
              events: [],
              configuration: [],
              transitions: [],
              children: {},
            });
          }
          return stateValue;
        }
        var _event = actions.initEvent;
        return new State3({
          value: stateValue,
          context,
          _event,
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
      };
      State3.create = function (config) {
        return new State3(config);
      };
      State3.inert = function (stateValue, context) {
        if (stateValue instanceof State3) {
          if (!stateValue.actions.length) {
            return stateValue;
          }
          var _event = actions.initEvent;
          return new State3({
            value: stateValue.value,
            context,
            _event,
            _sessionid: null,
            historyValue: stateValue.historyValue,
            history: stateValue.history,
            activities: stateValue.activities,
            configuration: stateValue.configuration,
            transitions: [],
            children: {},
          });
        }
        return State3.from(stateValue, context);
      };
      State3.prototype.toStrings = function (stateValue, delimiter) {
        var _this = this;
        if (stateValue === void 0) {
          stateValue = this.value;
        }
        if (delimiter === void 0) {
          delimiter = '.';
        }
        if (utils.isString(stateValue)) {
          return [stateValue];
        }
        var valueKeys = Object.keys(stateValue);
        return valueKeys.concat.apply(
          valueKeys,
          _tslib.__spreadArray(
            [],
            _tslib.__read(
              valueKeys.map(function (key2) {
                return _this
                  .toStrings(stateValue[key2], delimiter)
                  .map(function (s3) {
                    return key2 + delimiter + s3;
                  });
              }),
            ),
            false,
          ),
        );
      };
      State3.prototype.toJSON = function () {
        var _a4 = this;
        _a4.configuration;
        _a4.transitions;
        var tags = _a4.tags;
        _a4.machine;
        var jsonValues = _tslib.__rest(_a4, [
          'configuration',
          'transitions',
          'tags',
          'machine',
        ]);
        return _tslib.__assign(_tslib.__assign({}, jsonValues), {
          tags: Array.from(tags),
        });
      };
      State3.prototype.matches = function (parentStateValue) {
        return utils.matchesState(parentStateValue, this.value);
      };
      State3.prototype.hasTag = function (tag) {
        return this.tags.has(tag);
      };
      State3.prototype.can = function (event2) {
        var _a4;
        if (environment.IS_PRODUCTION) {
          utils.warn(
            !!this.machine,
            'state.can(...) used outside of a machine-created State object; this will always return false.',
          );
        }
        var transitionData =
          (_a4 = this.machine) === null || _a4 === void 0
            ? void 0
            : _a4.getTransitionData(this, event2);
        return (
          !!(transitionData === null || transitionData === void 0
            ? void 0
            : transitionData.transitions.length) &&
          transitionData.transitions.some(function (t2) {
            return t2.target !== void 0 || t2.actions.length;
          })
        );
      };
      return State3;
    })();
    exports.State = State2;
    exports.bindActionToState = bindActionToState;
    exports.isState = isState;
    exports.isStateConfig = isStateConfig;
    exports.stateValuesEqual = stateValuesEqual;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/scheduler.js
var require_scheduler = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/scheduler.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var defaultOptions = {
      deferEvents: false,
    };
    var Scheduler = /* @__PURE__ */ (function () {
      function Scheduler2(options) {
        this.processingEvent = false;
        this.queue = [];
        this.initialized = false;
        this.options = _tslib.__assign(
          _tslib.__assign({}, defaultOptions),
          options,
        );
      }
      Scheduler2.prototype.initialize = function (callback) {
        this.initialized = true;
        if (callback) {
          if (!this.options.deferEvents) {
            this.schedule(callback);
            return;
          }
          this.process(callback);
        }
        this.flushEvents();
      };
      Scheduler2.prototype.schedule = function (task) {
        if (!this.initialized || this.processingEvent) {
          this.queue.push(task);
          return;
        }
        if (this.queue.length !== 0) {
          throw new Error(
            'Event queue should be empty when it is not processing events',
          );
        }
        this.process(task);
        this.flushEvents();
      };
      Scheduler2.prototype.clear = function () {
        this.queue = [];
      };
      Scheduler2.prototype.flushEvents = function () {
        var nextCallback = this.queue.shift();
        while (nextCallback) {
          this.process(nextCallback);
          nextCallback = this.queue.shift();
        }
      };
      Scheduler2.prototype.process = function (callback) {
        this.processingEvent = true;
        try {
          callback();
        } catch (e2) {
          this.clear();
          throw e2;
        } finally {
          this.processingEvent = false;
        }
      };
      return Scheduler2;
    })();
    exports.Scheduler = Scheduler;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/registry.js
var require_registry = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/registry.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var children = /* @__PURE__ */ new Map();
    var sessionIdIndex = 0;
    var registry = {
      bookId: function () {
        return 'x:'.concat(sessionIdIndex++);
      },
      register: function (id, actor) {
        children.set(id, actor);
        return id;
      },
      get: function (id) {
        return children.get(id);
      },
      free: function (id) {
        children.delete(id);
      },
    };
    exports.registry = registry;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/devTools.js
var require_devTools = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/devTools.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var environment = require_environment();
    function getGlobal() {
      if (typeof globalThis !== 'undefined') {
        return globalThis;
      }
      if (typeof self !== 'undefined') {
        return self;
      }
      if (typeof window !== 'undefined') {
        return window;
      }
      if (typeof global !== 'undefined') {
        return global;
      }
      if (!environment.IS_PRODUCTION) {
        console.warn(
          'XState could not find a global object in this environment. Please let the maintainers know and raise an issue here: https://github.com/statelyai/xstate/issues',
        );
      }
    }
    function getDevTools() {
      var global2 = getGlobal();
      if (global2 && '__xstate__' in global2) {
        return global2.__xstate__;
      }
      return void 0;
    }
    function registerService(service) {
      if (!getGlobal()) {
        return;
      }
      var devTools = getDevTools();
      if (devTools) {
        devTools.register(service);
      }
    }
    exports.getGlobal = getGlobal;
    exports.registerService = registerService;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/behaviors.js
var require_behaviors = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/behaviors.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var actions = require_actions();
    var Actor = require_Actor();
    var utils = require_utils();
    function fromReducer(transition, initialState) {
      return {
        transition,
        initialState,
      };
    }
    function fromPromise(promiseFn) {
      var initialState = {
        error: void 0,
        data: void 0,
        status: 'pending',
      };
      return {
        transition: function (state, event2, _a4) {
          var parent = _a4.parent,
            id = _a4.id,
            observers = _a4.observers;
          switch (event2.type) {
            case 'fulfill':
              parent === null || parent === void 0
                ? void 0
                : parent.send(actions.doneInvoke(id, event2.data));
              return {
                error: void 0,
                data: event2.data,
                status: 'fulfilled',
              };
            case 'reject':
              parent === null || parent === void 0
                ? void 0
                : parent.send(actions.error(id, event2.error));
              observers.forEach(function (observer) {
                observer.error(event2.error);
              });
              return {
                error: event2.error,
                data: void 0,
                status: 'rejected',
              };
            default:
              return state;
          }
        },
        initialState,
        start: function (_a4) {
          var self2 = _a4.self;
          promiseFn().then(
            function (data) {
              self2.send({
                type: 'fulfill',
                data,
              });
            },
            function (reason) {
              self2.send({
                type: 'reject',
                error: reason,
              });
            },
          );
          return initialState;
        },
      };
    }
    function spawnBehavior(behavior, options) {
      if (options === void 0) {
        options = {};
      }
      var state = behavior.initialState;
      var observers = /* @__PURE__ */ new Set();
      var mailbox = [];
      var flushing = false;
      var flush = function () {
        if (flushing) {
          return;
        }
        flushing = true;
        while (mailbox.length > 0) {
          var event_1 = mailbox.shift();
          state = behavior.transition(state, event_1, actorCtx);
          observers.forEach(function (observer) {
            return observer.next(state);
          });
        }
        flushing = false;
      };
      var actor = Actor.toActorRef({
        id: options.id,
        send: function (event2) {
          mailbox.push(event2);
          flush();
        },
        getSnapshot: function () {
          return state;
        },
        subscribe: function (next, handleError, complete) {
          var observer = utils.toObserver(next, handleError, complete);
          observers.add(observer);
          observer.next(state);
          return {
            unsubscribe: function () {
              observers.delete(observer);
            },
          };
        },
      });
      var actorCtx = {
        parent: options.parent,
        self: actor,
        id: options.id || 'anonymous',
        observers,
      };
      state = behavior.start ? behavior.start(actorCtx) : state;
      return actor;
    }
    exports.fromPromise = fromPromise;
    exports.fromReducer = fromReducer;
    exports.spawnBehavior = spawnBehavior;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/interpreter.js
var require_interpreter = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/interpreter.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var types2 = require_types();
    var State2 = require_State();
    var actionTypes = require_actionTypes();
    var actions = require_actions();
    var environment = require_environment();
    var utils = require_utils();
    var scheduler = require_scheduler();
    var Actor = require_Actor();
    var stateUtils = require_stateUtils();
    var registry = require_registry();
    var devTools = require_devTools();
    var serviceScope = require_serviceScope();
    var behaviors = require_behaviors();
    var DEFAULT_SPAWN_OPTIONS = {
      sync: false,
      autoForward: false,
    };
    exports.InterpreterStatus = void 0;
    (function (InterpreterStatus) {
      InterpreterStatus[(InterpreterStatus['NotStarted'] = 0)] = 'NotStarted';
      InterpreterStatus[(InterpreterStatus['Running'] = 1)] = 'Running';
      InterpreterStatus[(InterpreterStatus['Stopped'] = 2)] = 'Stopped';
    })(exports.InterpreterStatus || (exports.InterpreterStatus = {}));
    var Interpreter = /* @__PURE__ */ (function () {
      function Interpreter2(machine, options) {
        var _this = this;
        if (options === void 0) {
          options = Interpreter2.defaultOptions;
        }
        this.machine = machine;
        this.delayedEventsMap = {};
        this.listeners = /* @__PURE__ */ new Set();
        this.contextListeners = /* @__PURE__ */ new Set();
        this.stopListeners = /* @__PURE__ */ new Set();
        this.doneListeners = /* @__PURE__ */ new Set();
        this.eventListeners = /* @__PURE__ */ new Set();
        this.sendListeners = /* @__PURE__ */ new Set();
        this.initialized = false;
        this.status = exports.InterpreterStatus.NotStarted;
        this.children = /* @__PURE__ */ new Map();
        this.forwardTo = /* @__PURE__ */ new Set();
        this.init = this.start;
        this.send = function (event2, payload) {
          if (utils.isArray(event2)) {
            _this.batch(event2);
            return _this.state;
          }
          var _event = utils.toSCXMLEvent(utils.toEventObject(event2, payload));
          if (_this.status === exports.InterpreterStatus.Stopped) {
            if (!environment.IS_PRODUCTION) {
              utils.warn(
                false,
                'Event "'
                  .concat(_event.name, '" was sent to stopped service "')
                  .concat(
                    _this.machine.id,
                    '". This service has already reached its final state, and will not transition.\nEvent: ',
                  )
                  .concat(JSON.stringify(_event.data)),
              );
            }
            return _this.state;
          }
          if (
            _this.status !== exports.InterpreterStatus.Running &&
            !_this.options.deferEvents
          ) {
            throw new Error(
              'Event "'
                .concat(_event.name, '" was sent to uninitialized service "')
                .concat(
                  _this.machine.id,
                  '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: ',
                )
                .concat(JSON.stringify(_event.data)),
            );
          }
          _this.scheduler.schedule(function () {
            _this.forward(_event);
            var nextState = _this.nextState(_event);
            _this.update(nextState, _event);
          });
          return _this._state;
        };
        this.sendTo = function (event2, to) {
          var isParent =
            _this.parent &&
            (to === types2.SpecialTargets.Parent || _this.parent.id === to);
          var target = isParent
            ? _this.parent
            : utils.isString(to)
            ? _this.children.get(to) || registry.registry.get(to)
            : utils.isActor(to)
            ? to
            : void 0;
          if (!target) {
            if (!isParent) {
              throw new Error(
                "Unable to send event to child '"
                  .concat(to, "' from service '")
                  .concat(_this.id, "'."),
              );
            }
            if (!environment.IS_PRODUCTION) {
              utils.warn(
                false,
                "Service '"
                  .concat(_this.id, "' has no parent: unable to send event ")
                  .concat(event2.type),
              );
            }
            return;
          }
          if ('machine' in target) {
            target.send(
              _tslib.__assign(_tslib.__assign({}, event2), {
                name:
                  event2.name === actionTypes.error
                    ? ''.concat(actions.error(_this.id))
                    : event2.name,
                origin: _this.sessionId,
              }),
            );
          } else {
            target.send(event2.data);
          }
        };
        var resolvedOptions = _tslib.__assign(
          _tslib.__assign({}, Interpreter2.defaultOptions),
          options,
        );
        var clock = resolvedOptions.clock,
          logger = resolvedOptions.logger,
          parent = resolvedOptions.parent,
          id = resolvedOptions.id;
        var resolvedId = id !== void 0 ? id : machine.id;
        this.id = resolvedId;
        this.logger = logger;
        this.clock = clock;
        this.parent = parent;
        this.options = resolvedOptions;
        this.scheduler = new scheduler.Scheduler({
          deferEvents: this.options.deferEvents,
        });
        this.sessionId = registry.registry.bookId();
      }
      Object.defineProperty(Interpreter2.prototype, 'initialState', {
        get: function () {
          var _this = this;
          if (this._initialState) {
            return this._initialState;
          }
          return serviceScope.provide(this, function () {
            _this._initialState = _this.machine.initialState;
            return _this._initialState;
          });
        },
        enumerable: false,
        configurable: true,
      });
      Object.defineProperty(Interpreter2.prototype, 'state', {
        get: function () {
          if (!environment.IS_PRODUCTION) {
            utils.warn(
              this.status !== exports.InterpreterStatus.NotStarted,
              "Attempted to read state from uninitialized service '".concat(
                this.id,
                "'. Make sure the service is started first.",
              ),
            );
          }
          return this._state;
        },
        enumerable: false,
        configurable: true,
      });
      Interpreter2.prototype.execute = function (state, actionsConfig) {
        var e_1, _a4;
        try {
          for (
            var _b = _tslib.__values(state.actions), _c = _b.next();
            !_c.done;
            _c = _b.next()
          ) {
            var action = _c.value;
            this.exec(action, state, actionsConfig);
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1,
          };
        } finally {
          try {
            if (_c && !_c.done && (_a4 = _b.return)) _a4.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      };
      Interpreter2.prototype.update = function (state, _event) {
        var e_2, _a4, e_3, _b, e_4, _c, e_5, _d2;
        var _this = this;
        state._sessionid = this.sessionId;
        this._state = state;
        if (this.options.execute) {
          this.execute(this.state);
        }
        this.children.forEach(function (child) {
          _this.state.children[child.id] = child;
        });
        if (this.devTools) {
          this.devTools.send(_event.data, state);
        }
        if (state.event) {
          try {
            for (
              var _e = _tslib.__values(this.eventListeners), _f = _e.next();
              !_f.done;
              _f = _e.next()
            ) {
              var listener = _f.value;
              listener(state.event);
            }
          } catch (e_2_1) {
            e_2 = {
              error: e_2_1,
            };
          } finally {
            try {
              if (_f && !_f.done && (_a4 = _e.return)) _a4.call(_e);
            } finally {
              if (e_2) throw e_2.error;
            }
          }
        }
        try {
          for (
            var _g = _tslib.__values(this.listeners), _h = _g.next();
            !_h.done;
            _h = _g.next()
          ) {
            var listener = _h.value;
            listener(state, state.event);
          }
        } catch (e_3_1) {
          e_3 = {
            error: e_3_1,
          };
        } finally {
          try {
            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
        try {
          for (
            var _j = _tslib.__values(this.contextListeners), _k = _j.next();
            !_k.done;
            _k = _j.next()
          ) {
            var contextListener = _k.value;
            contextListener(
              this.state.context,
              this.state.history ? this.state.history.context : void 0,
            );
          }
        } catch (e_4_1) {
          e_4 = {
            error: e_4_1,
          };
        } finally {
          try {
            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
          } finally {
            if (e_4) throw e_4.error;
          }
        }
        var isDone = stateUtils.isInFinalState(
          state.configuration || [],
          this.machine,
        );
        if (this.state.configuration && isDone) {
          var finalChildStateNode = state.configuration.find(function (sn) {
            return sn.type === 'final' && sn.parent === _this.machine;
          });
          var doneData =
            finalChildStateNode && finalChildStateNode.doneData
              ? utils.mapContext(
                  finalChildStateNode.doneData,
                  state.context,
                  _event,
                )
              : void 0;
          try {
            for (
              var _l = _tslib.__values(this.doneListeners), _m = _l.next();
              !_m.done;
              _m = _l.next()
            ) {
              var listener = _m.value;
              listener(actions.doneInvoke(this.id, doneData));
            }
          } catch (e_5_1) {
            e_5 = {
              error: e_5_1,
            };
          } finally {
            try {
              if (_m && !_m.done && (_d2 = _l.return)) _d2.call(_l);
            } finally {
              if (e_5) throw e_5.error;
            }
          }
          this.stop();
        }
      };
      Interpreter2.prototype.onTransition = function (listener) {
        this.listeners.add(listener);
        if (this.status === exports.InterpreterStatus.Running) {
          listener(this.state, this.state.event);
        }
        return this;
      };
      Interpreter2.prototype.subscribe = function (
        nextListenerOrObserver,
        _,
        completeListener,
      ) {
        var _this = this;
        if (!nextListenerOrObserver) {
          return {
            unsubscribe: function () {
              return void 0;
            },
          };
        }
        var listener;
        var resolvedCompleteListener = completeListener;
        if (typeof nextListenerOrObserver === 'function') {
          listener = nextListenerOrObserver;
        } else {
          listener = nextListenerOrObserver.next.bind(nextListenerOrObserver);
          resolvedCompleteListener = nextListenerOrObserver.complete.bind(
            nextListenerOrObserver,
          );
        }
        this.listeners.add(listener);
        if (this.status !== exports.InterpreterStatus.NotStarted) {
          listener(this.state);
        }
        if (resolvedCompleteListener) {
          if (this.status === exports.InterpreterStatus.Stopped) {
            resolvedCompleteListener();
          } else {
            this.onDone(resolvedCompleteListener);
          }
        }
        return {
          unsubscribe: function () {
            listener && _this.listeners.delete(listener);
            resolvedCompleteListener &&
              _this.doneListeners.delete(resolvedCompleteListener);
          },
        };
      };
      Interpreter2.prototype.onEvent = function (listener) {
        this.eventListeners.add(listener);
        return this;
      };
      Interpreter2.prototype.onSend = function (listener) {
        this.sendListeners.add(listener);
        return this;
      };
      Interpreter2.prototype.onChange = function (listener) {
        this.contextListeners.add(listener);
        return this;
      };
      Interpreter2.prototype.onStop = function (listener) {
        this.stopListeners.add(listener);
        return this;
      };
      Interpreter2.prototype.onDone = function (listener) {
        this.doneListeners.add(listener);
        return this;
      };
      Interpreter2.prototype.off = function (listener) {
        this.listeners.delete(listener);
        this.eventListeners.delete(listener);
        this.sendListeners.delete(listener);
        this.stopListeners.delete(listener);
        this.doneListeners.delete(listener);
        this.contextListeners.delete(listener);
        return this;
      };
      Interpreter2.prototype.start = function (initialState) {
        var _this = this;
        if (this.status === exports.InterpreterStatus.Running) {
          return this;
        }
        this.machine._init();
        registry.registry.register(this.sessionId, this);
        this.initialized = true;
        this.status = exports.InterpreterStatus.Running;
        var resolvedState =
          initialState === void 0
            ? this.initialState
            : serviceScope.provide(this, function () {
                return State2.isStateConfig(initialState)
                  ? _this.machine.resolveState(initialState)
                  : _this.machine.resolveState(
                      State2.State.from(initialState, _this.machine.context),
                    );
              });
        if (this.options.devTools) {
          this.attachDev();
        }
        this.scheduler.initialize(function () {
          _this.update(resolvedState, actions.initEvent);
        });
        return this;
      };
      Interpreter2.prototype.stop = function () {
        var e_6, _a4, e_7, _b, e_8, _c, e_9, _d2, e_10, _e;
        var _this = this;
        try {
          for (
            var _f = _tslib.__values(this.listeners), _g = _f.next();
            !_g.done;
            _g = _f.next()
          ) {
            var listener = _g.value;
            this.listeners.delete(listener);
          }
        } catch (e_6_1) {
          e_6 = {
            error: e_6_1,
          };
        } finally {
          try {
            if (_g && !_g.done && (_a4 = _f.return)) _a4.call(_f);
          } finally {
            if (e_6) throw e_6.error;
          }
        }
        try {
          for (
            var _h = _tslib.__values(this.stopListeners), _j = _h.next();
            !_j.done;
            _j = _h.next()
          ) {
            var listener = _j.value;
            listener();
            this.stopListeners.delete(listener);
          }
        } catch (e_7_1) {
          e_7 = {
            error: e_7_1,
          };
        } finally {
          try {
            if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
          } finally {
            if (e_7) throw e_7.error;
          }
        }
        try {
          for (
            var _k = _tslib.__values(this.contextListeners), _l = _k.next();
            !_l.done;
            _l = _k.next()
          ) {
            var listener = _l.value;
            this.contextListeners.delete(listener);
          }
        } catch (e_8_1) {
          e_8 = {
            error: e_8_1,
          };
        } finally {
          try {
            if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
          } finally {
            if (e_8) throw e_8.error;
          }
        }
        try {
          for (
            var _m = _tslib.__values(this.doneListeners), _o = _m.next();
            !_o.done;
            _o = _m.next()
          ) {
            var listener = _o.value;
            this.doneListeners.delete(listener);
          }
        } catch (e_9_1) {
          e_9 = {
            error: e_9_1,
          };
        } finally {
          try {
            if (_o && !_o.done && (_d2 = _m.return)) _d2.call(_m);
          } finally {
            if (e_9) throw e_9.error;
          }
        }
        if (!this.initialized) {
          return this;
        }
        _tslib
          .__spreadArray([], _tslib.__read(this.state.configuration), false)
          .sort(function (a, b) {
            return b.order - a.order;
          })
          .forEach(function (stateNode) {
            var e_11, _a5;
            try {
              for (
                var _b2 = _tslib.__values(stateNode.definition.exit),
                  _c2 = _b2.next();
                !_c2.done;
                _c2 = _b2.next()
              ) {
                var action = _c2.value;
                _this.exec(action, _this.state);
              }
            } catch (e_11_1) {
              e_11 = {
                error: e_11_1,
              };
            } finally {
              try {
                if (_c2 && !_c2.done && (_a5 = _b2.return)) _a5.call(_b2);
              } finally {
                if (e_11) throw e_11.error;
              }
            }
          });
        this.children.forEach(function (child) {
          if (utils.isFunction(child.stop)) {
            child.stop();
          }
        });
        this.children.clear();
        try {
          for (
            var _p = _tslib.__values(Object.keys(this.delayedEventsMap)),
              _q = _p.next();
            !_q.done;
            _q = _p.next()
          ) {
            var key2 = _q.value;
            this.clock.clearTimeout(this.delayedEventsMap[key2]);
          }
        } catch (e_10_1) {
          e_10 = {
            error: e_10_1,
          };
        } finally {
          try {
            if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
          } finally {
            if (e_10) throw e_10.error;
          }
        }
        this.scheduler.clear();
        this.scheduler = new scheduler.Scheduler({
          deferEvents: this.options.deferEvents,
        });
        this.initialized = false;
        this.status = exports.InterpreterStatus.Stopped;
        this._initialState = void 0;
        registry.registry.free(this.sessionId);
        return this;
      };
      Interpreter2.prototype.batch = function (events) {
        var _this = this;
        if (
          this.status === exports.InterpreterStatus.NotStarted &&
          this.options.deferEvents
        ) {
          if (!environment.IS_PRODUCTION) {
            utils.warn(
              false,
              ''
                .concat(
                  events.length,
                  ' event(s) were sent to uninitialized service "',
                )
                .concat(
                  this.machine.id,
                  '" and are deferred. Make sure .start() is called for this service.\nEvent: ',
                )
                .concat(JSON.stringify(event)),
            );
          }
        } else if (this.status !== exports.InterpreterStatus.Running) {
          throw new Error(
            ''
              .concat(
                events.length,
                ' event(s) were sent to uninitialized service "',
              )
              .concat(
                this.machine.id,
                '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.',
              ),
          );
        }
        this.scheduler.schedule(function () {
          var e_12, _a4;
          var nextState = _this.state;
          var batchChanged = false;
          var batchedActions = [];
          var _loop_1 = function (event_12) {
            var _event = utils.toSCXMLEvent(event_12);
            _this.forward(_event);
            nextState = serviceScope.provide(_this, function () {
              return _this.machine.transition(nextState, _event);
            });
            batchedActions.push.apply(
              batchedActions,
              _tslib.__spreadArray(
                [],
                _tslib.__read(
                  nextState.actions.map(function (a) {
                    return State2.bindActionToState(a, nextState);
                  }),
                ),
                false,
              ),
            );
            batchChanged = batchChanged || !!nextState.changed;
          };
          try {
            for (
              var events_1 = _tslib.__values(events),
                events_1_1 = events_1.next();
              !events_1_1.done;
              events_1_1 = events_1.next()
            ) {
              var event_1 = events_1_1.value;
              _loop_1(event_1);
            }
          } catch (e_12_1) {
            e_12 = {
              error: e_12_1,
            };
          } finally {
            try {
              if (events_1_1 && !events_1_1.done && (_a4 = events_1.return))
                _a4.call(events_1);
            } finally {
              if (e_12) throw e_12.error;
            }
          }
          nextState.changed = batchChanged;
          nextState.actions = batchedActions;
          _this.update(
            nextState,
            utils.toSCXMLEvent(events[events.length - 1]),
          );
        });
      };
      Interpreter2.prototype.sender = function (event2) {
        return this.send.bind(this, event2);
      };
      Interpreter2.prototype.nextState = function (event2) {
        var _this = this;
        var _event = utils.toSCXMLEvent(event2);
        if (
          _event.name.indexOf(actionTypes.errorPlatform) === 0 &&
          !this.state.nextEvents.some(function (nextEvent) {
            return nextEvent.indexOf(actionTypes.errorPlatform) === 0;
          })
        ) {
          throw _event.data.data;
        }
        var nextState = serviceScope.provide(this, function () {
          return _this.machine.transition(_this.state, _event);
        });
        return nextState;
      };
      Interpreter2.prototype.forward = function (event2) {
        var e_13, _a4;
        try {
          for (
            var _b = _tslib.__values(this.forwardTo), _c = _b.next();
            !_c.done;
            _c = _b.next()
          ) {
            var id = _c.value;
            var child = this.children.get(id);
            if (!child) {
              throw new Error(
                "Unable to forward event '"
                  .concat(event2, "' from interpreter '")
                  .concat(this.id, "' to nonexistant child '")
                  .concat(id, "'."),
              );
            }
            child.send(event2);
          }
        } catch (e_13_1) {
          e_13 = {
            error: e_13_1,
          };
        } finally {
          try {
            if (_c && !_c.done && (_a4 = _b.return)) _a4.call(_b);
          } finally {
            if (e_13) throw e_13.error;
          }
        }
      };
      Interpreter2.prototype.defer = function (sendAction) {
        var _this = this;
        this.delayedEventsMap[sendAction.id] = this.clock.setTimeout(
          function () {
            if (sendAction.to) {
              _this.sendTo(sendAction._event, sendAction.to);
            } else {
              _this.send(sendAction._event);
            }
          },
          sendAction.delay,
        );
      };
      Interpreter2.prototype.cancel = function (sendId) {
        this.clock.clearTimeout(this.delayedEventsMap[sendId]);
        delete this.delayedEventsMap[sendId];
      };
      Interpreter2.prototype.exec = function (
        action,
        state,
        actionFunctionMap,
      ) {
        if (actionFunctionMap === void 0) {
          actionFunctionMap = this.machine.options.actions;
        }
        var context = state.context,
          _event = state._event;
        var actionOrExec =
          action.exec ||
          actions.getActionFunction(action.type, actionFunctionMap);
        var exec2 = utils.isFunction(actionOrExec)
          ? actionOrExec
          : actionOrExec
          ? actionOrExec.exec
          : action.exec;
        if (exec2) {
          try {
            return exec2(context, _event.data, {
              action,
              state: this.state,
              _event,
            });
          } catch (err) {
            if (this.parent) {
              this.parent.send({
                type: 'xstate.error',
                data: err,
              });
            }
            throw err;
          }
        }
        switch (action.type) {
          case actionTypes.send:
            var sendAction = action;
            if (typeof sendAction.delay === 'number') {
              this.defer(sendAction);
              return;
            } else {
              if (sendAction.to) {
                this.sendTo(sendAction._event, sendAction.to);
              } else {
                this.send(sendAction._event);
              }
            }
            break;
          case actionTypes.cancel:
            this.cancel(action.sendId);
            break;
          case actionTypes.start: {
            if (this.status !== exports.InterpreterStatus.Running) {
              return;
            }
            var activity = action.activity;
            if (!this.state.activities[activity.id || activity.type]) {
              break;
            }
            if (activity.type === types2.ActionTypes.Invoke) {
              var invokeSource = utils.toInvokeSource(activity.src);
              var serviceCreator = this.machine.options.services
                ? this.machine.options.services[invokeSource.type]
                : void 0;
              var id = activity.id,
                data = activity.data;
              if (!environment.IS_PRODUCTION) {
                utils.warn(
                  !('forward' in activity),
                  "`forward` property is deprecated (found in invocation of '"
                    .concat(activity.src, "' in in machine '")
                    .concat(this.machine.id, "'). ") +
                    'Please use `autoForward` instead.',
                );
              }
              var autoForward =
                'autoForward' in activity
                  ? activity.autoForward
                  : !!activity.forward;
              if (!serviceCreator) {
                if (!environment.IS_PRODUCTION) {
                  utils.warn(
                    false,
                    "No service found for invocation '"
                      .concat(activity.src, "' in machine '")
                      .concat(this.machine.id, "'."),
                  );
                }
                return;
              }
              var resolvedData = data
                ? utils.mapContext(data, context, _event)
                : void 0;
              if (typeof serviceCreator === 'string') {
                return;
              }
              var source = utils.isFunction(serviceCreator)
                ? serviceCreator(context, _event.data, {
                    data: resolvedData,
                    src: invokeSource,
                    meta: activity.meta,
                  })
                : serviceCreator;
              if (!source) {
                return;
              }
              var options = void 0;
              if (utils.isMachine(source)) {
                source = resolvedData
                  ? source.withContext(resolvedData)
                  : source;
                options = {
                  autoForward,
                };
              }
              this.spawn(source, id, options);
            } else {
              this.spawnActivity(activity);
            }
            break;
          }
          case actionTypes.stop: {
            this.stopChild(action.activity.id);
            break;
          }
          case actionTypes.log:
            var label = action.label,
              value = action.value;
            if (label) {
              this.logger(label, value);
            } else {
              this.logger(value);
            }
            break;
          default:
            if (!environment.IS_PRODUCTION) {
              utils.warn(
                false,
                "No implementation found for action type '".concat(
                  action.type,
                  "'",
                ),
              );
            }
            break;
        }
        return void 0;
      };
      Interpreter2.prototype.removeChild = function (childId) {
        var _a4;
        this.children.delete(childId);
        this.forwardTo.delete(childId);
        (_a4 = this.state) === null || _a4 === void 0
          ? true
          : delete _a4.children[childId];
      };
      Interpreter2.prototype.stopChild = function (childId) {
        var child = this.children.get(childId);
        if (!child) {
          return;
        }
        this.removeChild(childId);
        if (utils.isFunction(child.stop)) {
          child.stop();
        }
      };
      Interpreter2.prototype.spawn = function (entity, name, options) {
        if (utils.isPromiseLike(entity)) {
          return this.spawnPromise(Promise.resolve(entity), name);
        } else if (utils.isFunction(entity)) {
          return this.spawnCallback(entity, name);
        } else if (Actor.isSpawnedActor(entity)) {
          return this.spawnActor(entity, name);
        } else if (utils.isObservable(entity)) {
          return this.spawnObservable(entity, name);
        } else if (utils.isMachine(entity)) {
          return this.spawnMachine(
            entity,
            _tslib.__assign(_tslib.__assign({}, options), {
              id: name,
            }),
          );
        } else if (utils.isBehavior(entity)) {
          return this.spawnBehavior(entity, name);
        } else {
          throw new Error(
            'Unable to spawn entity "'
              .concat(name, '" of type "')
              .concat(typeof entity, '".'),
          );
        }
      };
      Interpreter2.prototype.spawnMachine = function (machine, options) {
        var _this = this;
        if (options === void 0) {
          options = {};
        }
        var childService = new Interpreter2(
          machine,
          _tslib.__assign(_tslib.__assign({}, this.options), {
            parent: this,
            id: options.id || machine.id,
          }),
        );
        var resolvedOptions = _tslib.__assign(
          _tslib.__assign({}, DEFAULT_SPAWN_OPTIONS),
          options,
        );
        if (resolvedOptions.sync) {
          childService.onTransition(function (state) {
            _this.send(actionTypes.update, {
              state,
              id: childService.id,
            });
          });
        }
        var actor = childService;
        this.children.set(childService.id, actor);
        if (resolvedOptions.autoForward) {
          this.forwardTo.add(childService.id);
        }
        childService
          .onDone(function (doneEvent) {
            _this.removeChild(childService.id);
            _this.send(
              utils.toSCXMLEvent(doneEvent, {
                origin: childService.id,
              }),
            );
          })
          .start();
        return actor;
      };
      Interpreter2.prototype.spawnBehavior = function (behavior, id) {
        var actorRef = behaviors.spawnBehavior(behavior, {
          id,
          parent: this,
        });
        this.children.set(id, actorRef);
        return actorRef;
      };
      Interpreter2.prototype.spawnPromise = function (promise, id) {
        var _a4;
        var _this = this;
        var canceled = false;
        var resolvedData;
        promise.then(
          function (response) {
            if (!canceled) {
              resolvedData = response;
              _this.removeChild(id);
              _this.send(
                utils.toSCXMLEvent(actions.doneInvoke(id, response), {
                  origin: id,
                }),
              );
            }
          },
          function (errorData) {
            if (!canceled) {
              _this.removeChild(id);
              var errorEvent = actions.error(id, errorData);
              try {
                _this.send(
                  utils.toSCXMLEvent(errorEvent, {
                    origin: id,
                  }),
                );
              } catch (error2) {
                utils.reportUnhandledExceptionOnInvocation(
                  errorData,
                  error2,
                  id,
                );
                if (_this.devTools) {
                  _this.devTools.send(errorEvent, _this.state);
                }
                if (_this.machine.strict) {
                  _this.stop();
                }
              }
            }
          },
        );
        var actor =
          ((_a4 = {
            id,
            send: function () {
              return void 0;
            },
            subscribe: function (next, handleError, complete) {
              var observer = utils.toObserver(next, handleError, complete);
              var unsubscribed = false;
              promise.then(
                function (response) {
                  if (unsubscribed) {
                    return;
                  }
                  observer.next(response);
                  if (unsubscribed) {
                    return;
                  }
                  observer.complete();
                },
                function (err) {
                  if (unsubscribed) {
                    return;
                  }
                  observer.error(err);
                },
              );
              return {
                unsubscribe: function () {
                  return (unsubscribed = true);
                },
              };
            },
            stop: function () {
              canceled = true;
            },
            toJSON: function () {
              return {
                id,
              };
            },
            getSnapshot: function () {
              return resolvedData;
            },
          }),
          (_a4[utils.symbolObservable] = function () {
            return this;
          }),
          _a4);
        this.children.set(id, actor);
        return actor;
      };
      Interpreter2.prototype.spawnCallback = function (callback, id) {
        var _a4;
        var _this = this;
        var canceled = false;
        var receivers = /* @__PURE__ */ new Set();
        var listeners = /* @__PURE__ */ new Set();
        var emitted;
        var receive = function (e2) {
          emitted = e2;
          listeners.forEach(function (listener) {
            return listener(e2);
          });
          if (canceled) {
            return;
          }
          _this.send(
            utils.toSCXMLEvent(e2, {
              origin: id,
            }),
          );
        };
        var callbackStop;
        try {
          callbackStop = callback(receive, function (newListener) {
            receivers.add(newListener);
          });
        } catch (err) {
          this.send(actions.error(id, err));
        }
        if (utils.isPromiseLike(callbackStop)) {
          return this.spawnPromise(callbackStop, id);
        }
        var actor =
          ((_a4 = {
            id,
            send: function (event2) {
              return receivers.forEach(function (receiver) {
                return receiver(event2);
              });
            },
            subscribe: function (next) {
              var observer = utils.toObserver(next);
              listeners.add(observer.next);
              return {
                unsubscribe: function () {
                  listeners.delete(observer.next);
                },
              };
            },
            stop: function () {
              canceled = true;
              if (utils.isFunction(callbackStop)) {
                callbackStop();
              }
            },
            toJSON: function () {
              return {
                id,
              };
            },
            getSnapshot: function () {
              return emitted;
            },
          }),
          (_a4[utils.symbolObservable] = function () {
            return this;
          }),
          _a4);
        this.children.set(id, actor);
        return actor;
      };
      Interpreter2.prototype.spawnObservable = function (source, id) {
        var _a4;
        var _this = this;
        var emitted;
        var subscription = source.subscribe(
          function (value) {
            emitted = value;
            _this.send(
              utils.toSCXMLEvent(value, {
                origin: id,
              }),
            );
          },
          function (err) {
            _this.removeChild(id);
            _this.send(
              utils.toSCXMLEvent(actions.error(id, err), {
                origin: id,
              }),
            );
          },
          function () {
            _this.removeChild(id);
            _this.send(
              utils.toSCXMLEvent(actions.doneInvoke(id), {
                origin: id,
              }),
            );
          },
        );
        var actor =
          ((_a4 = {
            id,
            send: function () {
              return void 0;
            },
            subscribe: function (next, handleError, complete) {
              return source.subscribe(next, handleError, complete);
            },
            stop: function () {
              return subscription.unsubscribe();
            },
            getSnapshot: function () {
              return emitted;
            },
            toJSON: function () {
              return {
                id,
              };
            },
          }),
          (_a4[utils.symbolObservable] = function () {
            return this;
          }),
          _a4);
        this.children.set(id, actor);
        return actor;
      };
      Interpreter2.prototype.spawnActor = function (actor, name) {
        this.children.set(name, actor);
        return actor;
      };
      Interpreter2.prototype.spawnActivity = function (activity) {
        var implementation =
          this.machine.options && this.machine.options.activities
            ? this.machine.options.activities[activity.type]
            : void 0;
        if (!implementation) {
          if (!environment.IS_PRODUCTION) {
            utils.warn(
              false,
              "No implementation found for activity '".concat(
                activity.type,
                "'",
              ),
            );
          }
          return;
        }
        var dispose = implementation(this.state.context, activity);
        this.spawnEffect(activity.id, dispose);
      };
      Interpreter2.prototype.spawnEffect = function (id, dispose) {
        var _a4;
        this.children.set(
          id,
          ((_a4 = {
            id,
            send: function () {
              return void 0;
            },
            subscribe: function () {
              return {
                unsubscribe: function () {
                  return void 0;
                },
              };
            },
            stop: dispose || void 0,
            getSnapshot: function () {
              return void 0;
            },
            toJSON: function () {
              return {
                id,
              };
            },
          }),
          (_a4[utils.symbolObservable] = function () {
            return this;
          }),
          _a4),
        );
      };
      Interpreter2.prototype.attachDev = function () {
        var global2 = devTools.getGlobal();
        if (this.options.devTools && global2) {
          if (global2.__REDUX_DEVTOOLS_EXTENSION__) {
            var devToolsOptions =
              typeof this.options.devTools === 'object'
                ? this.options.devTools
                : void 0;
            this.devTools = global2.__REDUX_DEVTOOLS_EXTENSION__.connect(
              _tslib.__assign(
                _tslib.__assign(
                  {
                    name: this.id,
                    autoPause: true,
                    stateSanitizer: function (state) {
                      return {
                        value: state.value,
                        context: state.context,
                        actions: state.actions,
                      };
                    },
                  },
                  devToolsOptions,
                ),
                {
                  features: _tslib.__assign(
                    {
                      jump: false,
                      skip: false,
                    },
                    devToolsOptions ? devToolsOptions.features : void 0,
                  ),
                },
              ),
              this.machine,
            );
            this.devTools.init(this.state);
          }
          devTools.registerService(this);
        }
      };
      Interpreter2.prototype.toJSON = function () {
        return {
          id: this.id,
        };
      };
      Interpreter2.prototype[utils.symbolObservable] = function () {
        return this;
      };
      Interpreter2.prototype.getSnapshot = function () {
        if (this.status === exports.InterpreterStatus.NotStarted) {
          return this.initialState;
        }
        return this._state;
      };
      Interpreter2.defaultOptions = {
        execute: true,
        deferEvents: true,
        clock: {
          setTimeout: function (fn, ms) {
            return setTimeout(fn, ms);
          },
          clearTimeout: function (id) {
            return clearTimeout(id);
          },
        },
        logger: /* @__PURE__ */ console.log.bind(console),
        devTools: false,
      };
      Interpreter2.interpret = interpret2;
      return Interpreter2;
    })();
    var resolveSpawnOptions = function (nameOrOptions) {
      if (utils.isString(nameOrOptions)) {
        return _tslib.__assign(_tslib.__assign({}, DEFAULT_SPAWN_OPTIONS), {
          name: nameOrOptions,
        });
      }
      return _tslib.__assign(
        _tslib.__assign(_tslib.__assign({}, DEFAULT_SPAWN_OPTIONS), {
          name: utils.uniqueId(),
        }),
        nameOrOptions,
      );
    };
    function spawn(entity, nameOrOptions) {
      var resolvedOptions = resolveSpawnOptions(nameOrOptions);
      return serviceScope.consume(function (service) {
        if (!environment.IS_PRODUCTION) {
          var isLazyEntity =
            utils.isMachine(entity) || utils.isFunction(entity);
          utils.warn(
            !!service || isLazyEntity,
            'Attempted to spawn an Actor (ID: "'.concat(
              utils.isMachine(entity) ? entity.id : 'undefined',
              '") outside of a service. This will have no effect.',
            ),
          );
        }
        if (service) {
          return service.spawn(entity, resolvedOptions.name, resolvedOptions);
        } else {
          return Actor.createDeferredActor(entity, resolvedOptions.name);
        }
      });
    }
    function interpret2(machine, options) {
      var interpreter = new Interpreter(machine, options);
      return interpreter;
    }
    exports.Interpreter = Interpreter;
    exports.interpret = interpret2;
    exports.spawn = spawn;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/invokeUtils.js
var require_invokeUtils = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/invokeUtils.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    require_types();
    var actionTypes = require_actionTypes();
    require_utils();
    require_environment();
    function toInvokeSource(src) {
      if (typeof src === 'string') {
        var simpleSrc = {
          type: src,
        };
        simpleSrc.toString = function () {
          return src;
        };
        return simpleSrc;
      }
      return src;
    }
    function toInvokeDefinition(invokeConfig) {
      return _tslib.__assign(
        _tslib.__assign(
          {
            type: actionTypes.invoke,
          },
          invokeConfig,
        ),
        {
          toJSON: function () {
            invokeConfig.onDone;
            invokeConfig.onError;
            var invokeDef = _tslib.__rest(invokeConfig, ['onDone', 'onError']);
            return _tslib.__assign(_tslib.__assign({}, invokeDef), {
              type: actionTypes.invoke,
              src: toInvokeSource(invokeConfig.src),
            });
          },
        },
      );
    }
    exports.toInvokeDefinition = toInvokeDefinition;
    exports.toInvokeSource = toInvokeSource;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/StateNode.js
var require_StateNode = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/StateNode.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var utils = require_utils();
    var types2 = require_types();
    var State2 = require_State();
    var actionTypes = require_actionTypes();
    var actions = require_actions();
    var environment = require_environment();
    var constants = require_constants();
    var stateUtils = require_stateUtils();
    var Actor = require_Actor();
    var invokeUtils = require_invokeUtils();
    var NULL_EVENT = '';
    var STATE_IDENTIFIER = '#';
    var WILDCARD = '*';
    var EMPTY_OBJECT = {};
    var isStateId = function (str) {
      return str[0] === STATE_IDENTIFIER;
    };
    var createDefaultOptions = function () {
      return {
        actions: {},
        guards: {},
        services: {},
        activities: {},
        delays: {},
      };
    };
    var validateArrayifiedTransitions = function (
      stateNode,
      event2,
      transitions,
    ) {
      var hasNonLastUnguardedTarget = transitions
        .slice(0, -1)
        .some(function (transition) {
          return (
            !('cond' in transition) &&
            !('in' in transition) &&
            (utils.isString(transition.target) ||
              utils.isMachine(transition.target))
          );
        });
      var eventText =
        event2 === NULL_EVENT
          ? 'the transient event'
          : "event '".concat(event2, "'");
      utils.warn(
        !hasNonLastUnguardedTarget,
        'One or more transitions for '
          .concat(eventText, " on state '")
          .concat(stateNode.id, "' are unreachable. ") +
          'Make sure that the default transition is the last one defined.',
      );
    };
    var StateNode = /* @__PURE__ */ (function () {
      function StateNode2(config, options, _context, _stateInfo) {
        var _this = this;
        if (_context === void 0) {
          _context = 'context' in config ? config.context : void 0;
        }
        var _a4;
        this.config = config;
        this._context = _context;
        this.order = -1;
        this.__xstatenode = true;
        this.__cache = {
          events: void 0,
          relativeValue: /* @__PURE__ */ new Map(),
          initialStateValue: void 0,
          initialState: void 0,
          on: void 0,
          transitions: void 0,
          candidates: {},
          delayedTransitions: void 0,
        };
        this.idMap = {};
        this.tags = [];
        this.options = Object.assign(createDefaultOptions(), options);
        this.parent =
          _stateInfo === null || _stateInfo === void 0
            ? void 0
            : _stateInfo.parent;
        this.key =
          this.config.key ||
          (_stateInfo === null || _stateInfo === void 0
            ? void 0
            : _stateInfo.key) ||
          this.config.id ||
          '(machine)';
        this.machine = this.parent ? this.parent.machine : this;
        this.path = this.parent ? this.parent.path.concat(this.key) : [];
        this.delimiter =
          this.config.delimiter ||
          (this.parent ? this.parent.delimiter : constants.STATE_DELIMITER);
        this.id =
          this.config.id ||
          _tslib
            .__spreadArray([this.machine.key], _tslib.__read(this.path), false)
            .join(this.delimiter);
        this.version = this.parent ? this.parent.version : this.config.version;
        this.type =
          this.config.type ||
          (this.config.parallel
            ? 'parallel'
            : this.config.states && Object.keys(this.config.states).length
            ? 'compound'
            : this.config.history
            ? 'history'
            : 'atomic');
        this.schema = this.parent
          ? this.machine.schema
          : (_a4 = this.config.schema) !== null && _a4 !== void 0
          ? _a4
          : {};
        this.description = this.config.description;
        if (!environment.IS_PRODUCTION) {
          utils.warn(
            !('parallel' in this.config),
            'The "parallel" property is deprecated and will be removed in version 4.1. '
              .concat(
                this.config.parallel
                  ? "Replace with `type: 'parallel'`"
                  : "Use `type: '".concat(this.type, "'`"),
                " in the config for state node '",
              )
              .concat(this.id, "' instead."),
          );
        }
        this.initial = this.config.initial;
        this.states = this.config.states
          ? utils.mapValues(this.config.states, function (stateConfig, key2) {
              var _a5;
              var stateNode = new StateNode2(stateConfig, {}, void 0, {
                parent: _this,
                key: key2,
              });
              Object.assign(
                _this.idMap,
                _tslib.__assign(
                  ((_a5 = {}), (_a5[stateNode.id] = stateNode), _a5),
                  stateNode.idMap,
                ),
              );
              return stateNode;
            })
          : EMPTY_OBJECT;
        var order = 0;
        function dfs(stateNode) {
          var e_1, _a5;
          stateNode.order = order++;
          try {
            for (
              var _b = _tslib.__values(stateUtils.getChildren(stateNode)),
                _c = _b.next();
              !_c.done;
              _c = _b.next()
            ) {
              var child = _c.value;
              dfs(child);
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1,
            };
          } finally {
            try {
              if (_c && !_c.done && (_a5 = _b.return)) _a5.call(_b);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }
        dfs(this);
        this.history =
          this.config.history === true
            ? 'shallow'
            : this.config.history || false;
        this._transient =
          !!this.config.always ||
          (!this.config.on
            ? false
            : Array.isArray(this.config.on)
            ? this.config.on.some(function (_a5) {
                var event2 = _a5.event;
                return event2 === NULL_EVENT;
              })
            : NULL_EVENT in this.config.on);
        this.strict = !!this.config.strict;
        this.onEntry = utils
          .toArray(this.config.entry || this.config.onEntry)
          .map(function (action) {
            return actions.toActionObject(action);
          });
        this.onExit = utils
          .toArray(this.config.exit || this.config.onExit)
          .map(function (action) {
            return actions.toActionObject(action);
          });
        this.meta = this.config.meta;
        this.doneData = this.type === 'final' ? this.config.data : void 0;
        this.invoke = utils
          .toArray(this.config.invoke)
          .map(function (invokeConfig, i2) {
            var _a5, _b;
            if (utils.isMachine(invokeConfig)) {
              var invokeId = utils.createInvokeId(_this.id, i2);
              _this.machine.options.services = _tslib.__assign(
                ((_a5 = {}), (_a5[invokeId] = invokeConfig), _a5),
                _this.machine.options.services,
              );
              return invokeUtils.toInvokeDefinition({
                src: invokeId,
                id: invokeId,
              });
            } else if (utils.isString(invokeConfig.src)) {
              var invokeId =
                invokeConfig.id || utils.createInvokeId(_this.id, i2);
              return invokeUtils.toInvokeDefinition(
                _tslib.__assign(_tslib.__assign({}, invokeConfig), {
                  id: invokeId,
                  src: invokeConfig.src,
                }),
              );
            } else if (
              utils.isMachine(invokeConfig.src) ||
              utils.isFunction(invokeConfig.src)
            ) {
              var invokeId =
                invokeConfig.id || utils.createInvokeId(_this.id, i2);
              _this.machine.options.services = _tslib.__assign(
                ((_b = {}), (_b[invokeId] = invokeConfig.src), _b),
                _this.machine.options.services,
              );
              return invokeUtils.toInvokeDefinition(
                _tslib.__assign(
                  _tslib.__assign(
                    {
                      id: invokeId,
                    },
                    invokeConfig,
                  ),
                  {
                    src: invokeId,
                  },
                ),
              );
            } else {
              var invokeSource = invokeConfig.src;
              return invokeUtils.toInvokeDefinition(
                _tslib.__assign(
                  _tslib.__assign(
                    {
                      id: utils.createInvokeId(_this.id, i2),
                    },
                    invokeConfig,
                  ),
                  {
                    src: invokeSource,
                  },
                ),
              );
            }
          });
        this.activities = utils
          .toArray(this.config.activities)
          .concat(this.invoke)
          .map(function (activity) {
            return actions.toActivityDefinition(activity);
          });
        this.transition = this.transition.bind(this);
        this.tags = utils.toArray(this.config.tags);
      }
      StateNode2.prototype._init = function () {
        if (this.__cache.transitions) {
          return;
        }
        stateUtils.getAllStateNodes(this).forEach(function (stateNode) {
          return stateNode.on;
        });
      };
      StateNode2.prototype.withConfig = function (options, context) {
        var _a4 = this.options,
          actions2 = _a4.actions,
          activities = _a4.activities,
          guards = _a4.guards,
          services = _a4.services,
          delays = _a4.delays;
        return new StateNode2(
          this.config,
          {
            actions: _tslib.__assign(
              _tslib.__assign({}, actions2),
              options.actions,
            ),
            activities: _tslib.__assign(
              _tslib.__assign({}, activities),
              options.activities,
            ),
            guards: _tslib.__assign(
              _tslib.__assign({}, guards),
              options.guards,
            ),
            services: _tslib.__assign(
              _tslib.__assign({}, services),
              options.services,
            ),
            delays: _tslib.__assign(
              _tslib.__assign({}, delays),
              options.delays,
            ),
          },
          context !== null && context !== void 0 ? context : this.context,
        );
      };
      StateNode2.prototype.withContext = function (context) {
        return new StateNode2(this.config, this.options, context);
      };
      Object.defineProperty(StateNode2.prototype, 'context', {
        get: function () {
          return utils.isFunction(this._context)
            ? this._context()
            : this._context;
        },
        enumerable: false,
        configurable: true,
      });
      Object.defineProperty(StateNode2.prototype, 'definition', {
        get: function () {
          return {
            id: this.id,
            key: this.key,
            version: this.version,
            context: this.context,
            type: this.type,
            initial: this.initial,
            history: this.history,
            states: utils.mapValues(this.states, function (state) {
              return state.definition;
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
        enumerable: false,
        configurable: true,
      });
      StateNode2.prototype.toJSON = function () {
        return this.definition;
      };
      Object.defineProperty(StateNode2.prototype, 'on', {
        get: function () {
          if (this.__cache.on) {
            return this.__cache.on;
          }
          var transitions = this.transitions;
          return (this.__cache.on = transitions.reduce(function (
            map,
            transition,
          ) {
            map[transition.eventType] = map[transition.eventType] || [];
            map[transition.eventType].push(transition);
            return map;
          },
          {}));
        },
        enumerable: false,
        configurable: true,
      });
      Object.defineProperty(StateNode2.prototype, 'after', {
        get: function () {
          return (
            this.__cache.delayedTransitions ||
            ((this.__cache.delayedTransitions = this.getDelayedTransitions()),
            this.__cache.delayedTransitions)
          );
        },
        enumerable: false,
        configurable: true,
      });
      Object.defineProperty(StateNode2.prototype, 'transitions', {
        get: function () {
          return (
            this.__cache.transitions ||
            ((this.__cache.transitions = this.formatTransitions()),
            this.__cache.transitions)
          );
        },
        enumerable: false,
        configurable: true,
      });
      StateNode2.prototype.getCandidates = function (eventName) {
        if (this.__cache.candidates[eventName]) {
          return this.__cache.candidates[eventName];
        }
        var transient = eventName === NULL_EVENT;
        var candidates = this.transitions.filter(function (transition) {
          var sameEventType = transition.eventType === eventName;
          return transient
            ? sameEventType
            : sameEventType || transition.eventType === WILDCARD;
        });
        this.__cache.candidates[eventName] = candidates;
        return candidates;
      };
      StateNode2.prototype.getDelayedTransitions = function () {
        var _this = this;
        var afterConfig = this.config.after;
        if (!afterConfig) {
          return [];
        }
        var mutateEntryExit = function (delay, i2) {
          var delayRef = utils.isFunction(delay)
            ? ''.concat(_this.id, ':delay[').concat(i2, ']')
            : delay;
          var eventType = actions.after(delayRef, _this.id);
          _this.onEntry.push(
            actions.send(eventType, {
              delay,
            }),
          );
          _this.onExit.push(actions.cancel(eventType));
          return eventType;
        };
        var delayedTransitions = utils.isArray(afterConfig)
          ? afterConfig.map(function (transition, i2) {
              var eventType = mutateEntryExit(transition.delay, i2);
              return _tslib.__assign(_tslib.__assign({}, transition), {
                event: eventType,
              });
            })
          : utils.flatten(
              Object.keys(afterConfig).map(function (delay, i2) {
                var configTransition = afterConfig[delay];
                var resolvedTransition = utils.isString(configTransition)
                  ? {
                      target: configTransition,
                    }
                  : configTransition;
                var resolvedDelay = !isNaN(+delay) ? +delay : delay;
                var eventType = mutateEntryExit(resolvedDelay, i2);
                return utils
                  .toArray(resolvedTransition)
                  .map(function (transition) {
                    return _tslib.__assign(_tslib.__assign({}, transition), {
                      event: eventType,
                      delay: resolvedDelay,
                    });
                  });
              }),
            );
        return delayedTransitions.map(function (delayedTransition) {
          var delay = delayedTransition.delay;
          return _tslib.__assign(
            _tslib.__assign({}, _this.formatTransition(delayedTransition)),
            {
              delay,
            },
          );
        });
      };
      StateNode2.prototype.getStateNodes = function (state) {
        var _a4;
        var _this = this;
        if (!state) {
          return [];
        }
        var stateValue =
          state instanceof State2.State
            ? state.value
            : utils.toStateValue(state, this.delimiter);
        if (utils.isString(stateValue)) {
          var initialStateValue = this.getStateNode(stateValue).initial;
          return initialStateValue !== void 0
            ? this.getStateNodes(
                ((_a4 = {}), (_a4[stateValue] = initialStateValue), _a4),
              )
            : [this, this.states[stateValue]];
        }
        var subStateKeys = Object.keys(stateValue);
        var subStateNodes = [this];
        subStateNodes.push.apply(
          subStateNodes,
          _tslib.__spreadArray(
            [],
            _tslib.__read(
              utils.flatten(
                subStateKeys.map(function (subStateKey) {
                  return _this
                    .getStateNode(subStateKey)
                    .getStateNodes(stateValue[subStateKey]);
                }),
              ),
            ),
            false,
          ),
        );
        return subStateNodes;
      };
      StateNode2.prototype.handles = function (event2) {
        var eventType = utils.getEventType(event2);
        return this.events.includes(eventType);
      };
      StateNode2.prototype.resolveState = function (state) {
        var stateFromConfig =
          state instanceof State2.State ? state : State2.State.create(state);
        var configuration = Array.from(
          stateUtils.getConfiguration(
            [],
            this.getStateNodes(stateFromConfig.value),
          ),
        );
        return new State2.State(
          _tslib.__assign(_tslib.__assign({}, stateFromConfig), {
            value: this.resolve(stateFromConfig.value),
            configuration,
            done: stateUtils.isInFinalState(configuration, this),
            tags: stateUtils.getTagsFromConfiguration(configuration),
            machine: this.machine,
          }),
        );
      };
      StateNode2.prototype.transitionLeafNode = function (
        stateValue,
        state,
        _event,
      ) {
        var stateNode = this.getStateNode(stateValue);
        var next = stateNode.next(state, _event);
        if (!next || !next.transitions.length) {
          return this.next(state, _event);
        }
        return next;
      };
      StateNode2.prototype.transitionCompoundNode = function (
        stateValue,
        state,
        _event,
      ) {
        var subStateKeys = Object.keys(stateValue);
        var stateNode = this.getStateNode(subStateKeys[0]);
        var next = stateNode._transition(
          stateValue[subStateKeys[0]],
          state,
          _event,
        );
        if (!next || !next.transitions.length) {
          return this.next(state, _event);
        }
        return next;
      };
      StateNode2.prototype.transitionParallelNode = function (
        stateValue,
        state,
        _event,
      ) {
        var e_2, _a4;
        var transitionMap = {};
        try {
          for (
            var _b = _tslib.__values(Object.keys(stateValue)), _c = _b.next();
            !_c.done;
            _c = _b.next()
          ) {
            var subStateKey = _c.value;
            var subStateValue = stateValue[subStateKey];
            if (!subStateValue) {
              continue;
            }
            var subStateNode = this.getStateNode(subStateKey);
            var next = subStateNode._transition(subStateValue, state, _event);
            if (next) {
              transitionMap[subStateKey] = next;
            }
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1,
          };
        } finally {
          try {
            if (_c && !_c.done && (_a4 = _b.return)) _a4.call(_b);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
        var stateTransitions = Object.keys(transitionMap).map(function (key2) {
          return transitionMap[key2];
        });
        var enabledTransitions = utils.flatten(
          stateTransitions.map(function (st) {
            return st.transitions;
          }),
        );
        var willTransition = stateTransitions.some(function (st) {
          return st.transitions.length > 0;
        });
        if (!willTransition) {
          return this.next(state, _event);
        }
        var entryNodes = utils.flatten(
          stateTransitions.map(function (t2) {
            return t2.entrySet;
          }),
        );
        var configuration = utils.flatten(
          Object.keys(transitionMap).map(function (key2) {
            return transitionMap[key2].configuration;
          }),
        );
        return {
          transitions: enabledTransitions,
          entrySet: entryNodes,
          exitSet: utils.flatten(
            stateTransitions.map(function (t2) {
              return t2.exitSet;
            }),
          ),
          configuration,
          source: state,
          actions: utils.flatten(
            Object.keys(transitionMap).map(function (key2) {
              return transitionMap[key2].actions;
            }),
          ),
        };
      };
      StateNode2.prototype._transition = function (stateValue, state, _event) {
        if (utils.isString(stateValue)) {
          return this.transitionLeafNode(stateValue, state, _event);
        }
        if (Object.keys(stateValue).length === 1) {
          return this.transitionCompoundNode(stateValue, state, _event);
        }
        return this.transitionParallelNode(stateValue, state, _event);
      };
      StateNode2.prototype.getTransitionData = function (state, event2) {
        return this._transition(state.value, state, utils.toSCXMLEvent(event2));
      };
      StateNode2.prototype.next = function (state, _event) {
        var e_3, _a4;
        var _this = this;
        var eventName = _event.name;
        var actions2 = [];
        var nextStateNodes = [];
        var selectedTransition;
        try {
          for (
            var _b = _tslib.__values(this.getCandidates(eventName)),
              _c = _b.next();
            !_c.done;
            _c = _b.next()
          ) {
            var candidate = _c.value;
            var cond = candidate.cond,
              stateIn = candidate.in;
            var resolvedContext = state.context;
            var isInState = stateIn
              ? utils.isString(stateIn) && isStateId(stateIn)
                ? state.matches(
                    utils.toStateValue(
                      this.getStateNodeById(stateIn).path,
                      this.delimiter,
                    ),
                  )
                : utils.matchesState(
                    utils.toStateValue(stateIn, this.delimiter),
                    utils.path(this.path.slice(0, -2))(state.value),
                  )
              : true;
            var guardPassed = false;
            try {
              guardPassed =
                !cond ||
                utils.evaluateGuard(
                  this.machine,
                  cond,
                  resolvedContext,
                  _event,
                  state,
                );
            } catch (err) {
              throw new Error(
                "Unable to evaluate guard '"
                  .concat(cond.name || cond.type, "' in transition for event '")
                  .concat(eventName, "' in state node '")
                  .concat(this.id, "':\n")
                  .concat(err.message),
              );
            }
            if (guardPassed && isInState) {
              if (candidate.target !== void 0) {
                nextStateNodes = candidate.target;
              }
              actions2.push.apply(
                actions2,
                _tslib.__spreadArray(
                  [],
                  _tslib.__read(candidate.actions),
                  false,
                ),
              );
              selectedTransition = candidate;
              break;
            }
          }
        } catch (e_3_1) {
          e_3 = {
            error: e_3_1,
          };
        } finally {
          try {
            if (_c && !_c.done && (_a4 = _b.return)) _a4.call(_b);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
        if (!selectedTransition) {
          return void 0;
        }
        if (!nextStateNodes.length) {
          return {
            transitions: [selectedTransition],
            entrySet: [],
            exitSet: [],
            configuration: state.value ? [this] : [],
            source: state,
            actions: actions2,
          };
        }
        var allNextStateNodes = utils.flatten(
          nextStateNodes.map(function (stateNode) {
            return _this.getRelativeStateNodes(stateNode, state.historyValue);
          }),
        );
        var isInternal = !!selectedTransition.internal;
        var reentryNodes = isInternal
          ? []
          : utils.flatten(
              allNextStateNodes.map(function (n) {
                return _this.nodesFromChild(n);
              }),
            );
        return {
          transitions: [selectedTransition],
          entrySet: reentryNodes,
          exitSet: isInternal ? [] : [this],
          configuration: allNextStateNodes,
          source: state,
          actions: actions2,
        };
      };
      StateNode2.prototype.nodesFromChild = function (childStateNode) {
        if (childStateNode.escapes(this)) {
          return [];
        }
        var nodes = [];
        var marker = childStateNode;
        while (marker && marker !== this) {
          nodes.push(marker);
          marker = marker.parent;
        }
        nodes.push(this);
        return nodes;
      };
      StateNode2.prototype.escapes = function (stateNode) {
        if (this === stateNode) {
          return false;
        }
        var parent = this.parent;
        while (parent) {
          if (parent === stateNode) {
            return false;
          }
          parent = parent.parent;
        }
        return true;
      };
      StateNode2.prototype.getActions = function (
        transition,
        currentContext,
        _event,
        prevState,
      ) {
        var e_4, _a4, e_5, _b;
        var prevConfig = stateUtils.getConfiguration(
          [],
          prevState ? this.getStateNodes(prevState.value) : [this],
        );
        var resolvedConfig = transition.configuration.length
          ? stateUtils.getConfiguration(prevConfig, transition.configuration)
          : prevConfig;
        try {
          for (
            var resolvedConfig_1 = _tslib.__values(resolvedConfig),
              resolvedConfig_1_1 = resolvedConfig_1.next();
            !resolvedConfig_1_1.done;
            resolvedConfig_1_1 = resolvedConfig_1.next()
          ) {
            var sn = resolvedConfig_1_1.value;
            if (!stateUtils.has(prevConfig, sn)) {
              transition.entrySet.push(sn);
            }
          }
        } catch (e_4_1) {
          e_4 = {
            error: e_4_1,
          };
        } finally {
          try {
            if (
              resolvedConfig_1_1 &&
              !resolvedConfig_1_1.done &&
              (_a4 = resolvedConfig_1.return)
            )
              _a4.call(resolvedConfig_1);
          } finally {
            if (e_4) throw e_4.error;
          }
        }
        try {
          for (
            var prevConfig_1 = _tslib.__values(prevConfig),
              prevConfig_1_1 = prevConfig_1.next();
            !prevConfig_1_1.done;
            prevConfig_1_1 = prevConfig_1.next()
          ) {
            var sn = prevConfig_1_1.value;
            if (
              !stateUtils.has(resolvedConfig, sn) ||
              stateUtils.has(transition.exitSet, sn.parent)
            ) {
              transition.exitSet.push(sn);
            }
          }
        } catch (e_5_1) {
          e_5 = {
            error: e_5_1,
          };
        } finally {
          try {
            if (
              prevConfig_1_1 &&
              !prevConfig_1_1.done &&
              (_b = prevConfig_1.return)
            )
              _b.call(prevConfig_1);
          } finally {
            if (e_5) throw e_5.error;
          }
        }
        var doneEvents = utils.flatten(
          transition.entrySet.map(function (sn2) {
            var events = [];
            if (sn2.type !== 'final') {
              return events;
            }
            var parent = sn2.parent;
            if (!parent.parent) {
              return events;
            }
            events.push(
              actions.done(sn2.id, sn2.doneData),
              actions.done(
                parent.id,
                sn2.doneData
                  ? utils.mapContext(sn2.doneData, currentContext, _event)
                  : void 0,
              ),
            );
            var grandparent = parent.parent;
            if (grandparent.type === 'parallel') {
              if (
                stateUtils
                  .getChildren(grandparent)
                  .every(function (parentNode) {
                    return stateUtils.isInFinalState(
                      transition.configuration,
                      parentNode,
                    );
                  })
              ) {
                events.push(actions.done(grandparent.id));
              }
            }
            return events;
          }),
        );
        transition.exitSet.sort(function (a, b) {
          return b.order - a.order;
        });
        transition.entrySet.sort(function (a, b) {
          return a.order - b.order;
        });
        var entryStates = new Set(transition.entrySet);
        var exitStates = new Set(transition.exitSet);
        var _c = _tslib.__read(
            [
              utils
                .flatten(
                  Array.from(entryStates).map(function (stateNode) {
                    return _tslib.__spreadArray(
                      _tslib.__spreadArray(
                        [],
                        _tslib.__read(
                          stateNode.activities.map(function (activity) {
                            return actions.start(activity);
                          }),
                        ),
                        false,
                      ),
                      _tslib.__read(stateNode.onEntry),
                      false,
                    );
                  }),
                )
                .concat(doneEvents.map(actions.raise)),
              utils.flatten(
                Array.from(exitStates).map(function (stateNode) {
                  return _tslib.__spreadArray(
                    _tslib.__spreadArray(
                      [],
                      _tslib.__read(stateNode.onExit),
                      false,
                    ),
                    _tslib.__read(
                      stateNode.activities.map(function (activity) {
                        return actions.stop(activity);
                      }),
                    ),
                    false,
                  );
                }),
              ),
            ],
            2,
          ),
          entryActions = _c[0],
          exitActions = _c[1];
        var actions$1 = actions.toActionObjects(
          exitActions.concat(transition.actions).concat(entryActions),
          this.machine.options.actions,
        );
        return actions$1;
      };
      StateNode2.prototype.transition = function (state, event2, context) {
        if (state === void 0) {
          state = this.initialState;
        }
        var _event = utils.toSCXMLEvent(event2);
        var currentState;
        if (state instanceof State2.State) {
          currentState =
            context === void 0
              ? state
              : this.resolveState(State2.State.from(state, context));
        } else {
          var resolvedStateValue = utils.isString(state)
            ? this.resolve(utils.pathToStateValue(this.getResolvedPath(state)))
            : this.resolve(state);
          var resolvedContext =
            context !== null && context !== void 0
              ? context
              : this.machine.context;
          currentState = this.resolveState(
            State2.State.from(resolvedStateValue, resolvedContext),
          );
        }
        if (!environment.IS_PRODUCTION && _event.name === WILDCARD) {
          throw new Error(
            "An event cannot have the wildcard type ('".concat(WILDCARD, "')"),
          );
        }
        if (this.strict) {
          if (
            !this.events.includes(_event.name) &&
            !utils.isBuiltInEvent(_event.name)
          ) {
            throw new Error(
              "Machine '"
                .concat(this.id, "' does not accept event '")
                .concat(_event.name, "'"),
            );
          }
        }
        var stateTransition = this._transition(
          currentState.value,
          currentState,
          _event,
        ) || {
          transitions: [],
          configuration: [],
          entrySet: [],
          exitSet: [],
          source: currentState,
          actions: [],
        };
        var prevConfig = stateUtils.getConfiguration(
          [],
          this.getStateNodes(currentState.value),
        );
        var resolvedConfig = stateTransition.configuration.length
          ? stateUtils.getConfiguration(
              prevConfig,
              stateTransition.configuration,
            )
          : prevConfig;
        stateTransition.configuration = _tslib.__spreadArray(
          [],
          _tslib.__read(resolvedConfig),
          false,
        );
        return this.resolveTransition(
          stateTransition,
          currentState,
          currentState.context,
          _event,
        );
      };
      StateNode2.prototype.resolveRaisedTransition = function (
        state,
        _event,
        originalEvent,
      ) {
        var _a4;
        var currentActions = state.actions;
        state = this.transition(state, _event);
        state._event = originalEvent;
        state.event = originalEvent.data;
        (_a4 = state.actions).unshift.apply(
          _a4,
          _tslib.__spreadArray([], _tslib.__read(currentActions), false),
        );
        return state;
      };
      StateNode2.prototype.resolveTransition = function (
        stateTransition,
        currentState,
        context,
        _event,
      ) {
        var e_6, _a4;
        var _this = this;
        if (_event === void 0) {
          _event = actions.initEvent;
        }
        var configuration = stateTransition.configuration;
        var willTransition =
          !currentState || stateTransition.transitions.length > 0;
        var resolvedStateValue = willTransition
          ? stateUtils.getValue(this.machine, configuration)
          : void 0;
        var historyValue = currentState
          ? currentState.historyValue
            ? currentState.historyValue
            : stateTransition.source
            ? this.machine.historyValue(currentState.value)
            : void 0
          : void 0;
        var actions$1 = this.getActions(
          stateTransition,
          context,
          _event,
          currentState,
        );
        var activities = currentState
          ? _tslib.__assign({}, currentState.activities)
          : {};
        try {
          for (
            var actions_1 = _tslib.__values(actions$1),
              actions_1_1 = actions_1.next();
            !actions_1_1.done;
            actions_1_1 = actions_1.next()
          ) {
            var action = actions_1_1.value;
            if (action.type === actionTypes.start) {
              activities[action.activity.id || action.activity.type] = action;
            } else if (action.type === actionTypes.stop) {
              activities[action.activity.id || action.activity.type] = false;
            }
          }
        } catch (e_6_1) {
          e_6 = {
            error: e_6_1,
          };
        } finally {
          try {
            if (actions_1_1 && !actions_1_1.done && (_a4 = actions_1.return))
              _a4.call(actions_1);
          } finally {
            if (e_6) throw e_6.error;
          }
        }
        var _b = _tslib.__read(
            actions.resolveActions(
              this,
              currentState,
              context,
              _event,
              actions$1,
              this.machine.config.preserveActionOrder,
            ),
            2,
          ),
          resolvedActions = _b[0],
          updatedContext = _b[1];
        var _c = _tslib.__read(
            utils.partition(resolvedActions, function (action2) {
              return (
                action2.type === actionTypes.raise ||
                (action2.type === actionTypes.send &&
                  action2.to === types2.SpecialTargets.Internal)
              );
            }),
            2,
          ),
          raisedEvents = _c[0],
          nonRaisedActions = _c[1];
        var invokeActions = resolvedActions.filter(function (action2) {
          var _a5;
          return (
            action2.type === actionTypes.start &&
            ((_a5 = action2.activity) === null || _a5 === void 0
              ? void 0
              : _a5.type) === actionTypes.invoke
          );
        });
        var children = invokeActions.reduce(
          function (acc, action2) {
            acc[action2.activity.id] = Actor.createInvocableActor(
              action2.activity,
              _this.machine,
              updatedContext,
              _event,
            );
            return acc;
          },
          currentState ? _tslib.__assign({}, currentState.children) : {},
        );
        var resolvedConfiguration = willTransition
          ? stateTransition.configuration
          : currentState
          ? currentState.configuration
          : [];
        var isDone = stateUtils.isInFinalState(resolvedConfiguration, this);
        var nextState = new State2.State({
          value: resolvedStateValue || currentState.value,
          context: updatedContext,
          _event,
          _sessionid: currentState ? currentState._sessionid : null,
          historyValue: resolvedStateValue
            ? historyValue
              ? utils.updateHistoryValue(historyValue, resolvedStateValue)
              : void 0
            : currentState
            ? currentState.historyValue
            : void 0,
          history:
            !resolvedStateValue || stateTransition.source
              ? currentState
              : void 0,
          actions: resolvedStateValue ? nonRaisedActions : [],
          activities: resolvedStateValue
            ? activities
            : currentState
            ? currentState.activities
            : {},
          events: [],
          configuration: resolvedConfiguration,
          transitions: stateTransition.transitions,
          children,
          done: isDone,
          tags: stateUtils.getTagsFromConfiguration(resolvedConfiguration),
          machine: this,
        });
        var didUpdateContext = context !== updatedContext;
        nextState.changed =
          _event.name === actionTypes.update || didUpdateContext;
        var history = nextState.history;
        if (history) {
          delete history.history;
        }
        var isTransient =
          !isDone &&
          (this._transient ||
            configuration.some(function (stateNode) {
              return stateNode._transient;
            }));
        if (!willTransition && (!isTransient || _event.name === NULL_EVENT)) {
          return nextState;
        }
        var maybeNextState = nextState;
        if (!isDone) {
          if (isTransient) {
            maybeNextState = this.resolveRaisedTransition(
              maybeNextState,
              {
                type: actionTypes.nullEvent,
              },
              _event,
            );
          }
          while (raisedEvents.length) {
            var raisedEvent = raisedEvents.shift();
            maybeNextState = this.resolveRaisedTransition(
              maybeNextState,
              raisedEvent._event,
              _event,
            );
          }
        }
        var changed =
          maybeNextState.changed ||
          (history
            ? !!maybeNextState.actions.length ||
              didUpdateContext ||
              typeof history.value !== typeof maybeNextState.value ||
              !State2.stateValuesEqual(maybeNextState.value, history.value)
            : void 0);
        maybeNextState.changed = changed;
        maybeNextState.history = history;
        return maybeNextState;
      };
      StateNode2.prototype.getStateNode = function (stateKey) {
        if (isStateId(stateKey)) {
          return this.machine.getStateNodeById(stateKey);
        }
        if (!this.states) {
          throw new Error(
            "Unable to retrieve child state '"
              .concat(stateKey, "' from '")
              .concat(this.id, "'; no child states exist."),
          );
        }
        var result = this.states[stateKey];
        if (!result) {
          throw new Error(
            "Child state '"
              .concat(stateKey, "' does not exist on '")
              .concat(this.id, "'"),
          );
        }
        return result;
      };
      StateNode2.prototype.getStateNodeById = function (stateId) {
        var resolvedStateId = isStateId(stateId)
          ? stateId.slice(STATE_IDENTIFIER.length)
          : stateId;
        if (resolvedStateId === this.id) {
          return this;
        }
        var stateNode = this.machine.idMap[resolvedStateId];
        if (!stateNode) {
          throw new Error(
            "Child state node '#"
              .concat(resolvedStateId, "' does not exist on machine '")
              .concat(this.id, "'"),
          );
        }
        return stateNode;
      };
      StateNode2.prototype.getStateNodeByPath = function (statePath) {
        if (typeof statePath === 'string' && isStateId(statePath)) {
          try {
            return this.getStateNodeById(statePath.slice(1));
          } catch (e2) {}
        }
        var arrayStatePath = utils
          .toStatePath(statePath, this.delimiter)
          .slice();
        var currentStateNode = this;
        while (arrayStatePath.length) {
          var key2 = arrayStatePath.shift();
          if (!key2.length) {
            break;
          }
          currentStateNode = currentStateNode.getStateNode(key2);
        }
        return currentStateNode;
      };
      StateNode2.prototype.resolve = function (stateValue) {
        var _a4;
        var _this = this;
        if (!stateValue) {
          return this.initialStateValue || EMPTY_OBJECT;
        }
        switch (this.type) {
          case 'parallel':
            return utils.mapValues(
              this.initialStateValue,
              function (subStateValue, subStateKey) {
                return subStateValue
                  ? _this
                      .getStateNode(subStateKey)
                      .resolve(stateValue[subStateKey] || subStateValue)
                  : EMPTY_OBJECT;
              },
            );
          case 'compound':
            if (utils.isString(stateValue)) {
              var subStateNode = this.getStateNode(stateValue);
              if (
                subStateNode.type === 'parallel' ||
                subStateNode.type === 'compound'
              ) {
                return (
                  (_a4 = {}),
                  (_a4[stateValue] = subStateNode.initialStateValue),
                  _a4
                );
              }
              return stateValue;
            }
            if (!Object.keys(stateValue).length) {
              return this.initialStateValue || {};
            }
            return utils.mapValues(
              stateValue,
              function (subStateValue, subStateKey) {
                return subStateValue
                  ? _this.getStateNode(subStateKey).resolve(subStateValue)
                  : EMPTY_OBJECT;
              },
            );
          default:
            return stateValue || EMPTY_OBJECT;
        }
      };
      StateNode2.prototype.getResolvedPath = function (stateIdentifier) {
        if (isStateId(stateIdentifier)) {
          var stateNode =
            this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];
          if (!stateNode) {
            throw new Error(
              "Unable to find state node '".concat(stateIdentifier, "'"),
            );
          }
          return stateNode.path;
        }
        return utils.toStatePath(stateIdentifier, this.delimiter);
      };
      Object.defineProperty(StateNode2.prototype, 'initialStateValue', {
        get: function () {
          var _a4;
          if (this.__cache.initialStateValue) {
            return this.__cache.initialStateValue;
          }
          var initialStateValue;
          if (this.type === 'parallel') {
            initialStateValue = utils.mapFilterValues(
              this.states,
              function (state) {
                return state.initialStateValue || EMPTY_OBJECT;
              },
              function (stateNode) {
                return !(stateNode.type === 'history');
              },
            );
          } else if (this.initial !== void 0) {
            if (!this.states[this.initial]) {
              throw new Error(
                "Initial state '"
                  .concat(this.initial, "' not found on '")
                  .concat(this.key, "'"),
              );
            }
            initialStateValue = stateUtils.isLeafNode(this.states[this.initial])
              ? this.initial
              : ((_a4 = {}),
                (_a4[this.initial] =
                  this.states[this.initial].initialStateValue),
                _a4);
          } else {
            initialStateValue = {};
          }
          this.__cache.initialStateValue = initialStateValue;
          return this.__cache.initialStateValue;
        },
        enumerable: false,
        configurable: true,
      });
      StateNode2.prototype.getInitialState = function (stateValue, context) {
        this._init();
        var configuration = this.getStateNodes(stateValue);
        return this.resolveTransition(
          {
            configuration,
            entrySet: configuration,
            exitSet: [],
            transitions: [],
            source: void 0,
            actions: [],
          },
          void 0,
          context !== null && context !== void 0
            ? context
            : this.machine.context,
          void 0,
        );
      };
      Object.defineProperty(StateNode2.prototype, 'initialState', {
        get: function () {
          var initialStateValue = this.initialStateValue;
          if (!initialStateValue) {
            throw new Error(
              "Cannot retrieve initial state from simple state '".concat(
                this.id,
                "'.",
              ),
            );
          }
          return this.getInitialState(initialStateValue);
        },
        enumerable: false,
        configurable: true,
      });
      Object.defineProperty(StateNode2.prototype, 'target', {
        get: function () {
          var target;
          if (this.type === 'history') {
            var historyConfig = this.config;
            if (utils.isString(historyConfig.target)) {
              target = isStateId(historyConfig.target)
                ? utils.pathToStateValue(
                    this.machine
                      .getStateNodeById(historyConfig.target)
                      .path.slice(this.path.length - 1),
                  )
                : historyConfig.target;
            } else {
              target = historyConfig.target;
            }
          }
          return target;
        },
        enumerable: false,
        configurable: true,
      });
      StateNode2.prototype.getRelativeStateNodes = function (
        relativeStateId,
        historyValue,
        resolve2,
      ) {
        if (resolve2 === void 0) {
          resolve2 = true;
        }
        return resolve2
          ? relativeStateId.type === 'history'
            ? relativeStateId.resolveHistory(historyValue)
            : relativeStateId.initialStateNodes
          : [relativeStateId];
      };
      Object.defineProperty(StateNode2.prototype, 'initialStateNodes', {
        get: function () {
          var _this = this;
          if (stateUtils.isLeafNode(this)) {
            return [this];
          }
          if (this.type === 'compound' && !this.initial) {
            if (!environment.IS_PRODUCTION) {
              utils.warn(
                false,
                "Compound state node '".concat(
                  this.id,
                  "' has no initial state.",
                ),
              );
            }
            return [this];
          }
          var initialStateNodePaths = utils.toStatePaths(
            this.initialStateValue,
          );
          return utils.flatten(
            initialStateNodePaths.map(function (initialPath) {
              return _this.getFromRelativePath(initialPath);
            }),
          );
        },
        enumerable: false,
        configurable: true,
      });
      StateNode2.prototype.getFromRelativePath = function (relativePath) {
        if (!relativePath.length) {
          return [this];
        }
        var _a4 = _tslib.__read(relativePath),
          stateKey = _a4[0],
          childStatePath = _a4.slice(1);
        if (!this.states) {
          throw new Error(
            "Cannot retrieve subPath '".concat(
              stateKey,
              "' from node with no states",
            ),
          );
        }
        var childStateNode = this.getStateNode(stateKey);
        if (childStateNode.type === 'history') {
          return childStateNode.resolveHistory();
        }
        if (!this.states[stateKey]) {
          throw new Error(
            "Child state '"
              .concat(stateKey, "' does not exist on '")
              .concat(this.id, "'"),
          );
        }
        return this.states[stateKey].getFromRelativePath(childStatePath);
      };
      StateNode2.prototype.historyValue = function (relativeStateValue) {
        if (!Object.keys(this.states).length) {
          return void 0;
        }
        return {
          current: relativeStateValue || this.initialStateValue,
          states: utils.mapFilterValues(
            this.states,
            function (stateNode, key2) {
              if (!relativeStateValue) {
                return stateNode.historyValue();
              }
              var subStateValue = utils.isString(relativeStateValue)
                ? void 0
                : relativeStateValue[key2];
              return stateNode.historyValue(
                subStateValue || stateNode.initialStateValue,
              );
            },
            function (stateNode) {
              return !stateNode.history;
            },
          ),
        };
      };
      StateNode2.prototype.resolveHistory = function (historyValue) {
        var _this = this;
        if (this.type !== 'history') {
          return [this];
        }
        var parent = this.parent;
        if (!historyValue) {
          var historyTarget = this.target;
          return historyTarget
            ? utils.flatten(
                utils
                  .toStatePaths(historyTarget)
                  .map(function (relativeChildPath) {
                    return parent.getFromRelativePath(relativeChildPath);
                  }),
              )
            : parent.initialStateNodes;
        }
        var subHistoryValue = utils.nestedPath(
          parent.path,
          'states',
        )(historyValue).current;
        if (utils.isString(subHistoryValue)) {
          return [parent.getStateNode(subHistoryValue)];
        }
        return utils.flatten(
          utils.toStatePaths(subHistoryValue).map(function (subStatePath) {
            return _this.history === 'deep'
              ? parent.getFromRelativePath(subStatePath)
              : [parent.states[subStatePath[0]]];
          }),
        );
      };
      Object.defineProperty(StateNode2.prototype, 'stateIds', {
        get: function () {
          var _this = this;
          var childStateIds = utils.flatten(
            Object.keys(this.states).map(function (stateKey) {
              return _this.states[stateKey].stateIds;
            }),
          );
          return [this.id].concat(childStateIds);
        },
        enumerable: false,
        configurable: true,
      });
      Object.defineProperty(StateNode2.prototype, 'events', {
        get: function () {
          var e_7, _a4, e_8, _b;
          if (this.__cache.events) {
            return this.__cache.events;
          }
          var states = this.states;
          var events = new Set(this.ownEvents);
          if (states) {
            try {
              for (
                var _c = _tslib.__values(Object.keys(states)), _d2 = _c.next();
                !_d2.done;
                _d2 = _c.next()
              ) {
                var stateId = _d2.value;
                var state = states[stateId];
                if (state.states) {
                  try {
                    for (
                      var _e = ((e_8 = void 0), _tslib.__values(state.events)),
                        _f = _e.next();
                      !_f.done;
                      _f = _e.next()
                    ) {
                      var event_1 = _f.value;
                      events.add(''.concat(event_1));
                    }
                  } catch (e_8_1) {
                    e_8 = {
                      error: e_8_1,
                    };
                  } finally {
                    try {
                      if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    } finally {
                      if (e_8) throw e_8.error;
                    }
                  }
                }
              }
            } catch (e_7_1) {
              e_7 = {
                error: e_7_1,
              };
            } finally {
              try {
                if (_d2 && !_d2.done && (_a4 = _c.return)) _a4.call(_c);
              } finally {
                if (e_7) throw e_7.error;
              }
            }
          }
          return (this.__cache.events = Array.from(events));
        },
        enumerable: false,
        configurable: true,
      });
      Object.defineProperty(StateNode2.prototype, 'ownEvents', {
        get: function () {
          var events = new Set(
            this.transitions
              .filter(function (transition) {
                return !(
                  !transition.target &&
                  !transition.actions.length &&
                  transition.internal
                );
              })
              .map(function (transition) {
                return transition.eventType;
              }),
          );
          return Array.from(events);
        },
        enumerable: false,
        configurable: true,
      });
      StateNode2.prototype.resolveTarget = function (_target) {
        var _this = this;
        if (_target === void 0) {
          return void 0;
        }
        return _target.map(function (target) {
          if (!utils.isString(target)) {
            return target;
          }
          var isInternalTarget = target[0] === _this.delimiter;
          if (isInternalTarget && !_this.parent) {
            return _this.getStateNodeByPath(target.slice(1));
          }
          var resolvedTarget = isInternalTarget ? _this.key + target : target;
          if (_this.parent) {
            try {
              var targetStateNode =
                _this.parent.getStateNodeByPath(resolvedTarget);
              return targetStateNode;
            } catch (err) {
              throw new Error(
                "Invalid transition definition for state node '"
                  .concat(_this.id, "':\n")
                  .concat(err.message),
              );
            }
          } else {
            return _this.getStateNodeByPath(resolvedTarget);
          }
        });
      };
      StateNode2.prototype.formatTransition = function (transitionConfig) {
        var _this = this;
        var normalizedTarget = utils.normalizeTarget(transitionConfig.target);
        var internal =
          'internal' in transitionConfig
            ? transitionConfig.internal
            : normalizedTarget
            ? normalizedTarget.some(function (_target) {
                return (
                  utils.isString(_target) && _target[0] === _this.delimiter
                );
              })
            : true;
        var guards = this.machine.options.guards;
        var target = this.resolveTarget(normalizedTarget);
        var transition = _tslib.__assign(
          _tslib.__assign({}, transitionConfig),
          {
            actions: actions.toActionObjects(
              utils.toArray(transitionConfig.actions),
            ),
            cond: utils.toGuard(transitionConfig.cond, guards),
            target,
            source: this,
            internal,
            eventType: transitionConfig.event,
            toJSON: function () {
              return _tslib.__assign(_tslib.__assign({}, transition), {
                target: transition.target
                  ? transition.target.map(function (t2) {
                      return '#'.concat(t2.id);
                    })
                  : void 0,
                source: '#'.concat(_this.id),
              });
            },
          },
        );
        return transition;
      };
      StateNode2.prototype.formatTransitions = function () {
        var e_9, _a4;
        var _this = this;
        var onConfig;
        if (!this.config.on) {
          onConfig = [];
        } else if (Array.isArray(this.config.on)) {
          onConfig = this.config.on;
        } else {
          var _b = this.config.on,
            _c = WILDCARD,
            _d2 = _b[_c],
            wildcardConfigs = _d2 === void 0 ? [] : _d2,
            strictTransitionConfigs_1 = _tslib.__rest(_b, [
              typeof _c === 'symbol' ? _c : _c + '',
            ]);
          onConfig = utils.flatten(
            Object.keys(strictTransitionConfigs_1)
              .map(function (key2) {
                if (!environment.IS_PRODUCTION && key2 === NULL_EVENT) {
                  utils.warn(
                    false,
                    "Empty string transition configs (e.g., `{ on: { '': ... }}`) for transient transitions are deprecated. Specify the transition in the `{ always: ... }` property instead. " +
                      'Please check the `on` configuration for "#'.concat(
                        _this.id,
                        '".',
                      ),
                  );
                }
                var transitionConfigArray = utils.toTransitionConfigArray(
                  key2,
                  strictTransitionConfigs_1[key2],
                );
                if (!environment.IS_PRODUCTION) {
                  validateArrayifiedTransitions(
                    _this,
                    key2,
                    transitionConfigArray,
                  );
                }
                return transitionConfigArray;
              })
              .concat(utils.toTransitionConfigArray(WILDCARD, wildcardConfigs)),
          );
        }
        var eventlessConfig = this.config.always
          ? utils.toTransitionConfigArray('', this.config.always)
          : [];
        var doneConfig = this.config.onDone
          ? utils.toTransitionConfigArray(
              String(actions.done(this.id)),
              this.config.onDone,
            )
          : [];
        if (!environment.IS_PRODUCTION) {
          utils.warn(
            !(this.config.onDone && !this.parent),
            'Root nodes cannot have an ".onDone" transition. Please check the config of "'.concat(
              this.id,
              '".',
            ),
          );
        }
        var invokeConfig = utils.flatten(
          this.invoke.map(function (invokeDef) {
            var settleTransitions = [];
            if (invokeDef.onDone) {
              settleTransitions.push.apply(
                settleTransitions,
                _tslib.__spreadArray(
                  [],
                  _tslib.__read(
                    utils.toTransitionConfigArray(
                      String(actions.doneInvoke(invokeDef.id)),
                      invokeDef.onDone,
                    ),
                  ),
                  false,
                ),
              );
            }
            if (invokeDef.onError) {
              settleTransitions.push.apply(
                settleTransitions,
                _tslib.__spreadArray(
                  [],
                  _tslib.__read(
                    utils.toTransitionConfigArray(
                      String(actions.error(invokeDef.id)),
                      invokeDef.onError,
                    ),
                  ),
                  false,
                ),
              );
            }
            return settleTransitions;
          }),
        );
        var delayedTransitions = this.after;
        var formattedTransitions = utils.flatten(
          _tslib
            .__spreadArray(
              _tslib.__spreadArray(
                _tslib.__spreadArray(
                  _tslib.__spreadArray([], _tslib.__read(doneConfig), false),
                  _tslib.__read(invokeConfig),
                  false,
                ),
                _tslib.__read(onConfig),
                false,
              ),
              _tslib.__read(eventlessConfig),
              false,
            )
            .map(function (transitionConfig) {
              return utils.toArray(transitionConfig).map(function (transition) {
                return _this.formatTransition(transition);
              });
            }),
        );
        try {
          for (
            var delayedTransitions_1 = _tslib.__values(delayedTransitions),
              delayedTransitions_1_1 = delayedTransitions_1.next();
            !delayedTransitions_1_1.done;
            delayedTransitions_1_1 = delayedTransitions_1.next()
          ) {
            var delayedTransition = delayedTransitions_1_1.value;
            formattedTransitions.push(delayedTransition);
          }
        } catch (e_9_1) {
          e_9 = {
            error: e_9_1,
          };
        } finally {
          try {
            if (
              delayedTransitions_1_1 &&
              !delayedTransitions_1_1.done &&
              (_a4 = delayedTransitions_1.return)
            )
              _a4.call(delayedTransitions_1);
          } finally {
            if (e_9) throw e_9.error;
          }
        }
        return formattedTransitions;
      };
      return StateNode2;
    })();
    exports.StateNode = StateNode;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/Machine.js
var require_Machine = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/Machine.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var StateNode = require_StateNode();
    function Machine(config, options, initialContext) {
      if (initialContext === void 0) {
        initialContext = config.context;
      }
      return new StateNode.StateNode(config, options, initialContext);
    }
    function createMachine2(config, options) {
      return new StateNode.StateNode(config, options);
    }
    exports.Machine = Machine;
    exports.createMachine = createMachine2;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/mapState.js
var require_mapState = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/mapState.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var utils = require_utils();
    function mapState(stateMap, stateId) {
      var e_1, _a4;
      var foundStateId;
      try {
        for (
          var _b = _tslib.__values(Object.keys(stateMap)), _c = _b.next();
          !_c.done;
          _c = _b.next()
        ) {
          var mappedStateId = _c.value;
          if (
            utils.matchesState(mappedStateId, stateId) &&
            (!foundStateId || stateId.length > foundStateId.length)
          ) {
            foundStateId = mappedStateId;
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1,
        };
      } finally {
        try {
          if (_c && !_c.done && (_a4 = _b.return)) _a4.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return stateMap[foundStateId];
    }
    exports.mapState = mapState;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/match.js
var require_match = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/match.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _tslib = require_tslib();
    var State2 = require_State();
    function matchState(state, patterns, defaultValue) {
      var e_1, _a4;
      var resolvedState = State2.State.from(
        state,
        state instanceof State2.State ? state.context : void 0,
      );
      try {
        for (
          var patterns_1 = _tslib.__values(patterns),
            patterns_1_1 = patterns_1.next();
          !patterns_1_1.done;
          patterns_1_1 = patterns_1.next()
        ) {
          var _b = _tslib.__read(patterns_1_1.value, 2),
            stateValue = _b[0],
            getValue = _b[1];
          if (resolvedState.matches(stateValue)) {
            return getValue(resolvedState);
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1,
        };
      } finally {
        try {
          if (patterns_1_1 && !patterns_1_1.done && (_a4 = patterns_1.return))
            _a4.call(patterns_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return defaultValue(resolvedState);
    }
    exports.matchState = matchState;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/schema.js
var require_schema = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/schema.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function createSchema(schema) {
      return schema;
    }
    var t2 = createSchema;
    exports.createSchema = createSchema;
    exports.t = t2;
  },
});

// ../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/index.js
var require_lib = __commonJS({
  '../../node_modules/.pnpm/xstate@4.32.1/node_modules/xstate/lib/index.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var actions = require_actions();
    var Actor = require_Actor();
    var interpreter = require_interpreter();
    var Machine = require_Machine();
    var mapState = require_mapState();
    var match = require_match();
    var schema = require_schema();
    var State2 = require_State();
    var StateNode = require_StateNode();
    var behaviors = require_behaviors();
    var types2 = require_types();
    var utils = require_utils();
    var assign2 = actions.assign;
    var send = actions.send;
    var sendParent = actions.sendParent;
    var sendUpdate = actions.sendUpdate;
    var forwardTo = actions.forwardTo;
    var doneInvoke = actions.doneInvoke;
    exports.actions = actions;
    exports.toActorRef = Actor.toActorRef;
    exports.Interpreter = interpreter.Interpreter;
    Object.defineProperty(exports, 'InterpreterStatus', {
      enumerable: true,
      get: function () {
        return interpreter.InterpreterStatus;
      },
    });
    exports.interpret = interpreter.interpret;
    exports.spawn = interpreter.spawn;
    exports.Machine = Machine.Machine;
    exports.createMachine = Machine.createMachine;
    exports.mapState = mapState.mapState;
    exports.matchState = match.matchState;
    exports.createSchema = schema.createSchema;
    exports.t = schema.t;
    exports.State = State2.State;
    exports.StateNode = StateNode.StateNode;
    exports.spawnBehavior = behaviors.spawnBehavior;
    Object.defineProperty(exports, 'ActionTypes', {
      enumerable: true,
      get: function () {
        return types2.ActionTypes;
      },
    });
    Object.defineProperty(exports, 'SpecialTargets', {
      enumerable: true,
      get: function () {
        return types2.SpecialTargets;
      },
    });
    exports.matchesState = utils.matchesState;
    exports.toEventObject = utils.toEventObject;
    exports.toObserver = utils.toObserver;
    exports.toSCXMLEvent = utils.toSCXMLEvent;
    exports.assign = assign2;
    exports.doneInvoke = doneInvoke;
    exports.forwardTo = forwardTo;
    exports.send = send;
    exports.sendParent = sendParent;
    exports.sendUpdate = sendUpdate;
  },
});

// .svelte-kit/output/server/entries/pages/workout/_id_.svelte.js
var id_svelte_exports = {};
__export(id_svelte_exports, {
  default: () => U5Bidu5D,
});
function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secs = seconds % 60;
  const secondsFormat = secs < 10 ? `0${secs}` : secs;
  return `${minutesFormat}:${secondsFormat}`;
}
function useMachine(machine) {
  var _a4 = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    _a4[_i - 1] = arguments[_i];
  }
  var _b = __read(_a4, 1),
    _c = _b[0],
    options = _c === void 0 ? {} : _c;
  var context = options.context,
    guards = options.guards,
    actions = options.actions,
    activities = options.activities,
    services = options.services,
    delays = options.delays,
    rehydratedState = options.state,
    interpreterOptions = __rest(options, [
      'context',
      'guards',
      'actions',
      'activities',
      'services',
      'delays',
      'state',
    ]);
  var machineConfig = {
    context,
    guards,
    actions,
    activities,
    services,
    delays,
  };
  var resolvedMachine = machine.withConfig(machineConfig, function () {
    return __assign(__assign({}, machine.context), context);
  });
  var service = (0, import_xstate.interpret)(
    resolvedMachine,
    interpreterOptions,
  ).start(rehydratedState ? new import_xstate.State(rehydratedState) : void 0);
  onDestroy(function () {
    return service.stop();
  });
  var state = readable2(service.state, function (set) {
    return service.subscribe(function (state2) {
      if (state2.changed) {
        set(state2);
      }
    }).unsubscribe;
  });
  return { state, send: service.send, service };
}
function canFastForward(context) {
  return context.remainingSeries < context.totalSeries;
}
function canRewind(context) {
  return context.remainingSeries > 1;
}
function continueTimer(context) {
  const nextContext = __spreadValues2({}, context);
  const intervalID = setInterval(() => {
    if (nextContext.remainingRest >= 0) {
      nextContext.remainingRest--;
    } else {
      nextContext.remainingSeries++;
      nextContext.remainingRest = nextContext.totalRest;
      nextContext.state = 'idle';
      clearInterval(intervalID);
      audioActions.beep();
    }
  }, 1e3);
}
var import_xstate,
  __defProp3,
  __defProps2,
  __getOwnPropDescs2,
  __getOwnPropSymbols2,
  __hasOwnProp3,
  __propIsEnum2,
  __defNormalProp2,
  __spreadValues2,
  __spreadProps2,
  css$4,
  ContentTitle,
  CardioCard,
  activityStore,
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  RewindIcon,
  __assign,
  __rest,
  __read,
  clockMachine,
  clockMachineService,
  TrashIcon,
  css$3,
  Clock,
  Content,
  css$22,
  DropSetCalculator,
  css$12,
  Activity,
  css6,
  U5Bidu5D;
var init_id_svelte = __esm({
  '.svelte-kit/output/server/entries/pages/workout/_id_.svelte.js'() {
    init_index_46a73c56();
    init_TrainingInfo_2c3affe7();
    init_audio_fc6739fd();
    import_xstate = __toESM(require_lib(), 1);
    __defProp3 = Object.defineProperty;
    __defProps2 = Object.defineProperties;
    __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
    __hasOwnProp3 = Object.prototype.hasOwnProperty;
    __propIsEnum2 = Object.prototype.propertyIsEnumerable;
    __defNormalProp2 = (obj, key2, value) =>
      key2 in obj
        ? __defProp3(obj, key2, {
            enumerable: true,
            configurable: true,
            writable: true,
            value,
          })
        : (obj[key2] = value);
    __spreadValues2 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp3.call(b, prop)) __defNormalProp2(a, prop, b[prop]);
      if (__getOwnPropSymbols2)
        for (var prop of __getOwnPropSymbols2(b)) {
          if (__propIsEnum2.call(b, prop)) __defNormalProp2(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
    css$4 = {
      code: '.title.svelte-10oo0e8{@apply text-xl font-bold text-center text-gray-600 mb-4;}',
      map: null,
    };
    ContentTitle = create_ssr_component(
      ($$result, $$props, $$bindings, slots) => {
        let $$restProps = compute_rest_props($$props, ['title']);
        let { title } = $$props;
        if ($$props.title === void 0 && $$bindings.title && title !== void 0)
          $$bindings.title(title);
        $$result.css.add(css$4);
        return `<h2${spread(
          [
            escape_object($$restProps),
            {
              class: escape_attribute_value(`title ${$$restProps.class}`),
            },
          ],
          { classes: 'svelte-10oo0e8' },
        )}>${escape(title)}</h2>`;
      },
    );
    CardioCard = create_ssr_component(
      ($$result, $$props, $$bindings, slots) => {
        let { cardioTime } = $$props;
        if (
          $$props.cardioTime === void 0 &&
          $$bindings.cardioTime &&
          cardioTime !== void 0
        )
          $$bindings.cardioTime(cardioTime);
        return `<div class="${'pb-2 space-y-2'}"><header class="${'flex'}"><h2 class="${'text-base font-semibold'}">Qualquer c\xE1rdio</h2></header>
  <p class="${'text-sm'}">${escape(cardioTime)} min</p></div>`;
      },
    );
    activityStore = writable2({
      state: 'closed',
      currentTraining: null,
      trainingList: /* @__PURE__ */ new Map(),
      currentTabActive: 'clock',
    });
    PlayIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { size = '20px' } = $$props;
      let { width = size } = $$props;
      let { height = size } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      return `<svg${spread(
        [
          { xmlns: 'http://www.w3.org/2000/svg' },
          { width: escape_attribute_value(width) },
          { height: escape_attribute_value(height) },
          { viewBox: '0 0 20 20' },
          { fill: 'currentColor' },
          escape_object($$props),
        ],
        {},
      )}><path fill-rule="${'evenodd'}" d="${'M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'}" clip-rule="${'evenodd'}"></path></svg>`;
    });
    PauseIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { size = '20px' } = $$props;
      let { width = size } = $$props;
      let { height = size } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      return `<svg${spread(
        [
          { xmlns: 'http://www.w3.org/2000/svg' },
          { width: escape_attribute_value(width) },
          { height: escape_attribute_value(height) },
          { viewBox: '0 0 20 20' },
          { fill: 'currentColor' },
          escape_object($$props),
        ],
        {},
      )}><path fill-rule="${'evenodd'}" d="${'M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z'}" clip-rule="${'evenodd'}"></path></svg>`;
    });
    FastForwardIcon = create_ssr_component(
      ($$result, $$props, $$bindings, slots) => {
        let { size = '20px' } = $$props;
        let { width = size } = $$props;
        let { height = size } = $$props;
        if ($$props.size === void 0 && $$bindings.size && size !== void 0)
          $$bindings.size(size);
        if ($$props.width === void 0 && $$bindings.width && width !== void 0)
          $$bindings.width(width);
        if ($$props.height === void 0 && $$bindings.height && height !== void 0)
          $$bindings.height(height);
        return `<svg${spread(
          [
            { xmlns: 'http://www.w3.org/2000/svg' },
            { width: escape_attribute_value(width) },
            { height: escape_attribute_value(height) },
            { viewBox: '0 0 20 20' },
            { fill: 'currentColor' },
            escape_object($$props),
          ],
          {},
        )}><path d="${'M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z'}"></path></svg>`;
      },
    );
    RewindIcon = create_ssr_component(
      ($$result, $$props, $$bindings, slots) => {
        let { size = '20px' } = $$props;
        let { width = size } = $$props;
        let { height = size } = $$props;
        if ($$props.size === void 0 && $$bindings.size && size !== void 0)
          $$bindings.size(size);
        if ($$props.width === void 0 && $$bindings.width && width !== void 0)
          $$bindings.width(width);
        if ($$props.height === void 0 && $$bindings.height && height !== void 0)
          $$bindings.height(height);
        return `<svg${spread(
          [
            { xmlns: 'http://www.w3.org/2000/svg' },
            { width: escape_attribute_value(width) },
            { height: escape_attribute_value(height) },
            { viewBox: '0 0 20 20' },
            { fill: 'currentColor' },
            escape_object($$props),
          ],
          {},
        )}><path d="${'M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z'}"></path></svg>`;
      },
    );
    __assign =
      (globalThis && globalThis.__assign) ||
      function () {
        __assign =
          Object.assign ||
          function (t2) {
            for (var s3, i2 = 1, n = arguments.length; i2 < n; i2++) {
              s3 = arguments[i2];
              for (var p in s3)
                if (Object.prototype.hasOwnProperty.call(s3, p)) t2[p] = s3[p];
            }
            return t2;
          };
        return __assign.apply(this, arguments);
      };
    __rest =
      (globalThis && globalThis.__rest) ||
      function (s3, e2) {
        var t2 = {};
        for (var p in s3)
          if (Object.prototype.hasOwnProperty.call(s3, p) && e2.indexOf(p) < 0)
            t2[p] = s3[p];
        if (s3 != null && typeof Object.getOwnPropertySymbols === 'function')
          for (
            var i2 = 0, p = Object.getOwnPropertySymbols(s3);
            i2 < p.length;
            i2++
          ) {
            if (
              e2.indexOf(p[i2]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(s3, p[i2])
            )
              t2[p[i2]] = s3[p[i2]];
          }
        return t2;
      };
    __read =
      (globalThis && globalThis.__read) ||
      function (o, n) {
        var m2 = typeof Symbol === 'function' && o[Symbol.iterator];
        if (!m2) return o;
        var i2 = m2.call(o),
          r2,
          ar = [],
          e2;
        try {
          while ((n === void 0 || n-- > 0) && !(r2 = i2.next()).done)
            ar.push(r2.value);
        } catch (error2) {
          e2 = { error: error2 };
        } finally {
          try {
            if (r2 && !r2.done && (m2 = i2['return'])) m2.call(i2);
          } finally {
            if (e2) throw e2.error;
          }
        }
        return ar;
      };
    clockMachine = (0, import_xstate.createMachine)(
      {
        tsTypes: {},
        schema: {
          context: {},
          events: {},
        },
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
            on: {
              SET_ACTIVITY: {
                target: 'idle',
                actions: ['setActivity'],
              },
            },
          },
          idle: {
            on: {
              RUN: {
                target: 'running',
                actions: ['startClock'],
              },
              TOGGLE: {
                target: 'running',
                actions: ['startClock'],
              },
              FAST_FORWARD: {
                target: 'idle',
                actions: ['fastForward'],
                cond: 'canFastForward',
              },
              REWIND: {
                target: 'idle',
                actions: ['rewind'],
                cond: 'canRewind',
              },
              RESET: {
                target: 'idle',
                actions: ['reset'],
              },
            },
          },
          running: {
            invoke: {
              src: () => (cb) => {
                const intervalId = setInterval(() => {
                  cb({ type: 'TICK' });
                }, 1e3);
                return () => {
                  clearInterval(intervalId);
                };
              },
            },
            exit: ['startNextSession'],
            always: [
              {
                target: 'idle',
                cond: (context) => {
                  return context.remainingRest < 0;
                },
              },
            ],
            on: {
              TOGGLE: {
                target: 'pause',
              },
              TICK: {
                actions: ['tick'],
              },
              FINISH: 'idle',
            },
          },
          pause: {
            on: {
              TOGGLE: 'running',
              RESET: {
                target: 'idle',
                actions: ['reset'],
              },
            },
          },
        },
      },
      {
        actions: {
          setActivity: (0, import_xstate.assign)((_, { payload }) => {
            const nextContext = {
              exerciseId: payload.exerciseId,
              totalRest: payload.totalRest,
              totalSeries: payload.totalSeries,
              remainingRest: payload.remainingRest ?? payload.totalRest,
              remainingSeries: payload.remainingSeries ?? 1,
            };
            return nextContext;
          }),
          startClock(context) {
            return context;
          },
          tick: (0, import_xstate.assign)({
            remainingRest: (context) => context.remainingRest - 1,
          }),
          startNextSession: (0, import_xstate.assign)((context, event2) => {
            if (event2.type === '') {
              audioActions.beep();
              return {
                remainingSeries: context.remainingSeries + 1,
                remainingRest: context.totalRest,
              };
            }
            return context;
          }),
          fastForward: (0, import_xstate.assign)({
            remainingSeries: (context) => context.remainingSeries + 1,
          }),
          rewind: (0, import_xstate.assign)({
            remainingSeries: (context) => context.remainingSeries - 1,
          }),
          reset: (0, import_xstate.assign)({
            remainingSeries: 1,
            remainingRest: (context) => context.totalRest,
          }),
        },
        guards: {
          canFastForward,
          canRewind,
        },
      },
    );
    clockMachineService = useMachine(clockMachine);
    clockMachineService.service.start();
    TrashIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { size = '20px' } = $$props;
      let { width = size } = $$props;
      let { height = size } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      return `<svg xmlns="${'http://www.w3.org/2000/svg'}"${add_attribute(
        'width',
        width,
        0,
      )}${add_attribute(
        'height',
        height,
        0,
      )} viewBox="${'0 0 20 20'}" fill="${'currentColor'}"><path fill-rule="${'evenodd'}" d="${'M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'}" clip-rule="${'evenodd'}"></path></svg>`;
    });
    css$3 = {
      code: '.clockWrapper.svelte-5g55m{@apply flex flex-col h-full justify-around;}.info.svelte-5g55m{@apply space-y-4;}h3.svelte-5g55m{@apply text-center text-lg font-bold mb-2;}span.svelte-5g55m{@apply text-center font-bold mb-2 text-6xl block text-gray-500;;font-variant-numeric:tabular-nums}.actions.svelte-5g55m{@apply mt-14 w-full grid grid-flow-col;}.action.svelte-5g55m{@apply text-blue-400;;@apply justify-self-center;}.action.svelte-5g55m:disabled{@apply opacity-50;}.start.svelte-5g55m{@apply text-pink-600;}.resetWrapper.svelte-5g55m{@apply grid place-items-center mt-12;}.reset.svelte-5g55m{@apply text-gray-400;}.reset.svelte-5g55m:disabled{@apply opacity-50;}',
      map: null,
    };
    Clock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let currentClockNew;
      let clockState;
      let isRewindButtonDisabled;
      let isFastForwardButtonDisabled;
      let isResetButtonDisabled;
      let $$unsubscribe_activityStore;
      let $state, $$unsubscribe_state;
      $$unsubscribe_activityStore = subscribe(activityStore, (value) => value);
      const { send, state } = clockMachineService;
      $$unsubscribe_state = subscribe(state, (value) => ($state = value));
      onDestroy(() => {
        const clockContextWithState = __spreadProps2(
          __spreadValues2({}, currentClockNew),
          { state: clockState },
        );
        if (clockState === 'running') {
          continueTimer(clockContextWithState);
        }
      });
      $$result.css.add(css$3);
      currentClockNew = $state.context;
      clockState = $state.value;
      isRewindButtonDisabled =
        clockState !== 'idle' || !canRewind(currentClockNew);
      isFastForwardButtonDisabled =
        clockState !== 'idle' || !canFastForward(currentClockNew);
      isResetButtonDisabled =
        clockState === 'running' || clockState === 'unset';
      $$unsubscribe_activityStore();
      $$unsubscribe_state();
      return `<div class="${'clockWrapper svelte-5g55m'}"><div class="${'info svelte-5g55m'}"><section><h3 class="${'svelte-5g55m'}">Series</h3>
      <span class="${'svelte-5g55m'}">${escape(
        currentClockNew.remainingSeries,
      )}/${escape(currentClockNew.totalSeries)}</span></section>

    <section><h3 class="${'svelte-5g55m'}">Time left</h3>
      <span class="${'svelte-5g55m'}">${escape(
        secondsToMinutes($state.context.remainingRest),
      )}</span></section></div>

  <div class="${'actions svelte-5g55m'}"><button class="${'action svelte-5g55m'}" ${
        isRewindButtonDisabled ? 'disabled' : ''
      }>${validate_component(RewindIcon, 'RewindIcon').$$render(
        $$result,
        { size: '60' },
        {},
        {},
      )}</button>

    <button class="${'action start svelte-5g55m'}">${
        clockState === 'pause' || clockState === 'idle'
          ? `${validate_component(PlayIcon, 'PlayIcon').$$render(
              $$result,
              { size: '80' },
              {},
              {},
            )}`
          : `${validate_component(PauseIcon, 'PauseIcon').$$render(
              $$result,
              { size: '80' },
              {},
              {},
            )}`
      }</button>

    <button class="${'action svelte-5g55m'}" ${
        isFastForwardButtonDisabled ? 'disabled' : ''
      }>${validate_component(FastForwardIcon, 'FastForwardIcon').$$render(
        $$result,
        { size: '60' },
        {},
        {},
      )}</button></div>

  <section class="${'resetWrapper svelte-5g55m'}"><h3 class="${'sectionTitle svelte-5g55m'}">Reset Counter</h3>
    <button class="${'reset svelte-5g55m'}" ${
        isResetButtonDisabled ? 'disabled' : ''
      }>${validate_component(TrashIcon, 'TrashIcon').$$render(
        $$result,
        { size: '32' },
        {},
        {},
      )}</button></section>
</div>`;
    });
    Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      var _a4;
      let $activityStore, $$unsubscribe_activityStore;
      $$unsubscribe_activityStore = subscribe(
        activityStore,
        (value) => ($activityStore = value),
      );
      let currentExercise = $activityStore.currentTraining.exercise;
      const youtubeUrl = currentExercise.youtubeVideoId
        ? `https://www.youtube.com/embed/${currentExercise.youtubeVideoId}`
        : void 0;
      $$unsubscribe_activityStore();
      return `${validate_component(ContentTitle, 'ContentTitle').$$render(
        $$result,
        { title: 'Video' },
        {},
        {},
      )}

<div class="${'aspect-w-2 aspect-h-1'}"><iframe${add_attribute(
        'src',
        youtubeUrl,
        0,
      )} title="${'YouTube video player'}" frameborder="${'0'}" allow="${'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}" allowfullscreen></iframe></div>

<br>

${
  (
    (_a4 = currentExercise == null ? void 0 : currentExercise.image) == null
      ? void 0
      : _a4.url
  )
    ? `${validate_component(ContentTitle, 'ContentTitle').$$render(
        $$result,
        { title: 'Image' },
        {},
        {},
      )}

  <figure class="${'aspect-w-16 aspect-h-9'}"><img class="${'object-cover object-center w-full h-full'}"${add_attribute(
        'src',
        currentExercise.image.url,
        0,
      )}${add_attribute('alt', currentExercise.name, 0)}></figure>`
    : ``
}`;
    });
    css$22 = {
      code: "fieldset.svelte-v4y26p{@apply grid grid-flow-col grid-cols-6 mb-2;;place-items:baseline}label.svelte-v4y26p{@apply col-span-2 font-bold;}input.svelte-v4y26p{@apply col-span-4;}input.svelte-v4y26p{@apply bg-transparent p-1;}input[type='number'].svelte-v4y26p{@apply border-b border-gray-300;}.resultTitle.svelte-v4y26p{@apply text-center font-bold text-xl my-3 text-gray-600;}table.svelte-v4y26p{@apply w-80 mx-auto;}td.svelte-v4y26p{@apply text-center border border-gray-500;}",
      map: null,
    };
    DropSetCalculator = create_ssr_component(
      ($$result, $$props, $$bindings, slots) => {
        let times = 3;
        let result = [];
        let initialWeight = 10;
        let percentage = 0.8;
        let round = false;
        $$result.css.add(css$22);
        return `<fieldset class="${'svelte-v4y26p'}"><label for="${'initialWeight'}" class="${'svelte-v4y26p'}">Initial Weight:</label>
  <input type="${'number'}" id="${'initialWeight'}" class="${'svelte-v4y26p'}"${add_attribute(
          'value',
          initialWeight,
          0,
        )}></fieldset>

<fieldset class="${'svelte-v4y26p'}"><label for="${'percentage'}" class="${'svelte-v4y26p'}">Percentage:</label>
  <input type="${'number'}" id="${'percentage'}" class="${'svelte-v4y26p'}"${add_attribute(
          'value',
          percentage,
          0,
        )}></fieldset>

<fieldset class="${'svelte-v4y26p'}"><label for="${'round'}" class="${'svelte-v4y26p'}">Round:</label>
  <input type="${'checkbox'}" id="${'round'}" class="${'svelte-v4y26p'}"${add_attribute(
          'value',
          round,
          0,
        )}></fieldset>

<fieldset class="${'svelte-v4y26p'}"><label for="${'initialWeight'}" class="${'svelte-v4y26p'}">Times:</label>
  <input type="${'number'}" id="${'initialWeight'}" class="${'svelte-v4y26p'}"${add_attribute(
          'value',
          times,
          0,
        )}></fieldset>

<button class="${'px-4 py-2 mt-4 font-semibold text-blue-700 bg-blue-200 rounded-lg'}">Calculate</button>

<hr class="${'my-4'}">

<h2 class="${'resultTitle svelte-v4y26p'}">Result</h2>

<table class="${'table-auto svelte-v4y26p'}"><thead><tr><th>Order</th>
      <th>Weight(kg)</th></tr></thead>
  <tbody>${each(result, (result2, index) => {
    return `<tr><td class="${'svelte-v4y26p'}">${escape(index + 1)}</td>
        <td class="${'svelte-v4y26p'}">${escape(result2)}</td>
      </tr>`;
  })}</tbody>
</table>`;
      },
    );
    css$12 = {
      code: '.overlay.svelte-jck1c0{@apply absolute top-0 bottom-0 right-0 left-0;;background-color:rgba(0, 0, 0, 0.7)}.wrapper.svelte-jck1c0{@apply absolute bottom-0 right-0 left-0;;@apply bg-gray-100;;@apply rounded-t-2xl p-4;;height:80vh;@apply flex flex-col;}.closeButton.svelte-jck1c0{@apply absolute -top-8;;@apply px-4 py-2;;@apply rounded-t-full;;@apply bg-gray-100;;@apply text-pink-600;;right:calc(50% - 38px)}.tabs.svelte-jck1c0{@apply flex flex-row;;@apply overflow-x-auto pb-2 -m-2;;@apply border-t;;scrollbar-width:none;@apply bg-gray-100 z-10;}.tabs.svelte-jck1c0::-webkit-scrollbar{display:none}.tab.svelte-jck1c0{@apply flex-1;;@apply text-center font-medium text-gray-500;;@apply p-1;;min-width:120px}.tabActive.svelte-jck1c0{@apply border-t-2 border-pink-600 text-pink-600;}.tabContent.svelte-jck1c0{@apply pt-4 pb-8 flex-1 overflow-y-auto;}',
      map: null,
    };
    Activity = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $activityStore, $$unsubscribe_activityStore;
      $$unsubscribe_activityStore = subscribe(
        activityStore,
        (value) => ($activityStore = value),
      );
      const tabs = [
        { label: 'Clock', value: 'clock' },
        { label: 'Content', value: 'content' },
        {
          label: 'Drop Set Calculator',
          value: 'drop-set-calculator',
        },
      ];
      if ($$props.tabs === void 0 && $$bindings.tabs && tabs !== void 0)
        $$bindings.tabs(tabs);
      $$result.css.add(css$12);
      $$unsubscribe_activityStore();
      return `${
        $activityStore.state === 'open'
          ? `<div class="${'overlay svelte-jck1c0'}"></div>
  <div class="${'bg-white wrapper svelte-jck1c0'}"><button class="${'closeButton svelte-jck1c0'}">Close</button>

    ${validate_component(TrainingInfo, 'TrainingInfo').$$render(
      $$result,
      { training: $activityStore.currentTraining },
      {},
      {},
    )}

    <hr class="${'my-2'}">

    <section class="${'tabContent svelte-jck1c0'}">${
              $activityStore.currentTabActive === 'clock'
                ? `${validate_component(Clock, 'Clock').$$render(
                    $$result,
                    {},
                    {},
                    {},
                  )}
        
        `
                : `${
                    $activityStore.currentTabActive === 'content'
                      ? `${validate_component(Content, 'Content').$$render(
                          $$result,
                          {},
                          {},
                          {},
                        )}`
                      : `${
                          $activityStore.currentTabActive ===
                          'drop-set-calculator'
                            ? `${validate_component(
                                DropSetCalculator,
                                'DropSetCalculator',
                              ).$$render($$result, {}, {}, {})}`
                            : ``
                        }`
                  }`
            }</section>

    <nav class="${'tabs svelte-jck1c0'}">${each(tabs, (tab) => {
              return `<button class="${[
                'tab svelte-jck1c0',
                $activityStore.currentTabActive === tab.value
                  ? 'tabActive'
                  : '',
              ]
                .join(' ')
                .trim()}">${escape(tab.label)}
        </button>`;
            })}</nav></div>`
          : ``
      }`;
    });
    css6 = {
      code: '.title.svelte-o5zz3q{@apply text-3xl font-bold text-center;}.subtitle.svelte-o5zz3q{@apply text-base font-normal text-gray-700 italic block;}',
      map: null,
    };
    U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      var _a4;
      let { trainingRoutine } = $$props;
      if (
        $$props.trainingRoutine === void 0 &&
        $$bindings.trainingRoutine &&
        trainingRoutine !== void 0
      )
        $$bindings.trainingRoutine(trainingRoutine);
      $$result.css.add(css6);
      return `${
        (($$result.head += `${
          (($$result.title = `<title>${escape(trainingRoutine.name)}</title>`),
          '')
        }`),
        '')
      }

<div><h1 class="${'title svelte-o5zz3q'}">${escape(trainingRoutine.name)}
    ${
      trainingRoutine.description
        ? `<span class="${'subtitle svelte-o5zz3q'}">${escape(
            trainingRoutine.description,
          )}</span>`
        : ``
    }</h1>

  <hr class="${'my-6'}">

  <div class="${'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'}">${validate_component(
        ContentTitle,
        'ContentTitle',
      ).$$render($$result, { title: 'Workout' }, {}, {})}

    ${each(trainingRoutine.training, (training) => {
      return `${validate_component(TrainingInfo, 'TrainingInfo').$$render(
        $$result,
        { training },
        {},
        {},
      )}`;
    })}

    ${
      (
        (_a4 = trainingRoutine == null ? void 0 : trainingRoutine.cardio) ==
        null
          ? void 0
          : _a4.time
      )
        ? `${validate_component(ContentTitle, 'ContentTitle').$$render(
            $$result,
            { title: 'Cardio' },
            {},
            {},
          )}
      ${validate_component(CardioCard, 'CardioCard').$$render(
        $$result,
        { cardioTime: trainingRoutine.cardio.time },
        {},
        {},
      )}`
        : ``
    }</div></div>

${validate_component(Activity, 'Actvity').$$render($$result, {}, {}, {})}`;
    });
  },
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  css: () => css7,
  entry: () => entry4,
  js: () => js4,
  module: () => id_svelte_exports,
});
var entry4, js4, css7;
var init__4 = __esm({
  '.svelte-kit/output/server/nodes/3.js'() {
    init_id_svelte();
    entry4 = 'pages/workout/_id_.svelte-ec7cbedd.js';
    js4 = [
      'pages/workout/_id_.svelte-ec7cbedd.js',
      'chunks/index-85439ac7.js',
      'chunks/TrainingInfo-ff5fbf6e.js',
      'chunks/index-d5338481.js',
      'chunks/audio-03895b51.js',
    ];
    css7 = ['assets/pages/workout/_id_.svelte-f990049e.css'];
  },
});

// ../../node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  '../../node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError(
          'Object.assign cannot be called with null or undefined',
        );
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String('abc');
        test1[5] = 'de';
        if (Object.getOwnPropertyNames(test1)[0] === '5') {
          return false;
        }
        var test2 = {};
        for (var i2 = 0; i2 < 10; i2++) {
          test2['_' + String.fromCharCode(i2)] = i2;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
          return test2[n];
        });
        if (order2.join('') !== '0123456789') {
          return false;
        }
        var test3 = {};
        'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
          test3[letter] = letter;
        });
        if (
          Object.keys(Object.assign({}, test3)).join('') !==
          'abcdefghijklmnopqrst'
        ) {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative()
      ? Object.assign
      : function (target, source) {
          var from;
          var to = toObject(target);
          var symbols;
          for (var s3 = 1; s3 < arguments.length; s3++) {
            from = Object(arguments[s3]);
            for (var key2 in from) {
              if (hasOwnProperty.call(from, key2)) {
                to[key2] = from[key2];
              }
            }
            if (getOwnPropertySymbols) {
              symbols = getOwnPropertySymbols(from);
              for (var i2 = 0; i2 < symbols.length; i2++) {
                if (propIsEnumerable.call(from, symbols[i2])) {
                  to[symbols[i2]] = from[symbols[i2]];
                }
              }
            }
          }
          return to;
        };
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/isFunction.js
var require_isFunction = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/isFunction.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function isFunction(x2) {
      return typeof x2 === 'function';
    }
    exports.isFunction = isFunction;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/config.js
var require_config = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/config.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _enable_super_gross_mode_that_will_cause_bad_things = false;
    exports.config = {
      Promise: void 0,
      set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
          var error2 = new Error();
          console.warn(
            'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' +
              error2.stack,
          );
        } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
          console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
      },
      get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
      },
    };
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/hostReportError.js
var require_hostReportError = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/hostReportError.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function hostReportError(err) {
      setTimeout(function () {
        throw err;
      }, 0);
    }
    exports.hostReportError = hostReportError;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/Observer.js
var require_Observer = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/Observer.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var config_1 = require_config();
    var hostReportError_1 = require_hostReportError();
    exports.empty = {
      closed: true,
      next: function (value) {},
      error: function (err) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
          throw err;
        } else {
          hostReportError_1.hostReportError(err);
        }
      },
      complete: function () {},
    };
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/isArray.js
var require_isArray = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/isArray.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.isArray = (function () {
      return (
        Array.isArray ||
        function (x2) {
          return x2 && typeof x2.length === 'number';
        }
      );
    })();
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/isObject.js
var require_isObject = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/isObject.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function isObject(x2) {
      return x2 !== null && typeof x2 === 'object';
    }
    exports.isObject = isObject;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/UnsubscriptionError.js
var require_UnsubscriptionError = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/UnsubscriptionError.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var UnsubscriptionErrorImpl = (function () {
      function UnsubscriptionErrorImpl2(errors) {
        Error.call(this);
        this.message = errors
          ? errors.length +
            ' errors occurred during unsubscription:\n' +
            errors
              .map(function (err, i2) {
                return i2 + 1 + ') ' + err.toString();
              })
              .join('\n  ')
          : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
        return this;
      }
      UnsubscriptionErrorImpl2.prototype = Object.create(Error.prototype);
      return UnsubscriptionErrorImpl2;
    })();
    exports.UnsubscriptionError = UnsubscriptionErrorImpl;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/Subscription.js
var require_Subscription = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/Subscription.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var isArray_1 = require_isArray();
    var isObject_1 = require_isObject();
    var isFunction_1 = require_isFunction();
    var UnsubscriptionError_1 = require_UnsubscriptionError();
    var Subscription = (function () {
      function Subscription2(unsubscribe) {
        this.closed = false;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (unsubscribe) {
          this._ctorUnsubscribe = true;
          this._unsubscribe = unsubscribe;
        }
      }
      Subscription2.prototype.unsubscribe = function () {
        var errors;
        if (this.closed) {
          return;
        }
        var _a4 = this,
          _parentOrParents = _a4._parentOrParents,
          _ctorUnsubscribe = _a4._ctorUnsubscribe,
          _unsubscribe = _a4._unsubscribe,
          _subscriptions = _a4._subscriptions;
        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (_parentOrParents instanceof Subscription2) {
          _parentOrParents.remove(this);
        } else if (_parentOrParents !== null) {
          for (var index = 0; index < _parentOrParents.length; ++index) {
            var parent_1 = _parentOrParents[index];
            parent_1.remove(this);
          }
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
          if (_ctorUnsubscribe) {
            this._unsubscribe = void 0;
          }
          try {
            _unsubscribe.call(this);
          } catch (e2) {
            errors =
              e2 instanceof UnsubscriptionError_1.UnsubscriptionError
                ? flattenUnsubscriptionErrors(e2.errors)
                : [e2];
          }
        }
        if (isArray_1.isArray(_subscriptions)) {
          var index = -1;
          var len = _subscriptions.length;
          while (++index < len) {
            var sub = _subscriptions[index];
            if (isObject_1.isObject(sub)) {
              try {
                sub.unsubscribe();
              } catch (e2) {
                errors = errors || [];
                if (e2 instanceof UnsubscriptionError_1.UnsubscriptionError) {
                  errors = errors.concat(
                    flattenUnsubscriptionErrors(e2.errors),
                  );
                } else {
                  errors.push(e2);
                }
              }
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
      };
      Subscription2.prototype.add = function (teardown) {
        var subscription = teardown;
        if (!teardown) {
          return Subscription2.EMPTY;
        }
        switch (typeof teardown) {
          case 'function':
            subscription = new Subscription2(teardown);
          case 'object':
            if (
              subscription === this ||
              subscription.closed ||
              typeof subscription.unsubscribe !== 'function'
            ) {
              return subscription;
            } else if (this.closed) {
              subscription.unsubscribe();
              return subscription;
            } else if (!(subscription instanceof Subscription2)) {
              var tmp = subscription;
              subscription = new Subscription2();
              subscription._subscriptions = [tmp];
            }
            break;
          default: {
            throw new Error(
              'unrecognized teardown ' + teardown + ' added to Subscription.',
            );
          }
        }
        var _parentOrParents = subscription._parentOrParents;
        if (_parentOrParents === null) {
          subscription._parentOrParents = this;
        } else if (_parentOrParents instanceof Subscription2) {
          if (_parentOrParents === this) {
            return subscription;
          }
          subscription._parentOrParents = [_parentOrParents, this];
        } else if (_parentOrParents.indexOf(this) === -1) {
          _parentOrParents.push(this);
        } else {
          return subscription;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions === null) {
          this._subscriptions = [subscription];
        } else {
          subscriptions.push(subscription);
        }
        return subscription;
      };
      Subscription2.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
          var subscriptionIndex = subscriptions.indexOf(subscription);
          if (subscriptionIndex !== -1) {
            subscriptions.splice(subscriptionIndex, 1);
          }
        }
      };
      Subscription2.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
      })(new Subscription2());
      return Subscription2;
    })();
    exports.Subscription = Subscription;
    function flattenUnsubscriptionErrors(errors) {
      return errors.reduce(function (errs, err) {
        return errs.concat(
          err instanceof UnsubscriptionError_1.UnsubscriptionError
            ? err.errors
            : err,
        );
      }, []);
    }
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/symbol/rxSubscriber.js
var require_rxSubscriber = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/symbol/rxSubscriber.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.rxSubscriber = (function () {
      return typeof Symbol === 'function'
        ? Symbol('rxSubscriber')
        : '@@rxSubscriber_' + Math.random();
    })();
    exports.$$rxSubscriber = exports.rxSubscriber;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/Subscriber.js
var require_Subscriber = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/Subscriber.js'(
    exports,
  ) {
    'use strict';
    var __extends =
      (exports && exports.__extends) ||
      (function () {
        var extendStatics = function (d, b) {
          extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (d2, b2) {
                d2.__proto__ = b2;
              }) ||
            function (d2, b2) {
              for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
            };
          return extendStatics(d, b);
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      })();
    Object.defineProperty(exports, '__esModule', { value: true });
    var isFunction_1 = require_isFunction();
    var Observer_1 = require_Observer();
    var Subscription_1 = require_Subscription();
    var rxSubscriber_1 = require_rxSubscriber();
    var config_1 = require_config();
    var hostReportError_1 = require_hostReportError();
    var Subscriber = (function (_super) {
      __extends(Subscriber2, _super);
      function Subscriber2(destinationOrNext, error2, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
          case 0:
            _this.destination = Observer_1.empty;
            break;
          case 1:
            if (!destinationOrNext) {
              _this.destination = Observer_1.empty;
              break;
            }
            if (typeof destinationOrNext === 'object') {
              if (destinationOrNext instanceof Subscriber2) {
                _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                _this.destination = destinationOrNext;
                destinationOrNext.add(_this);
              } else {
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(
                  _this,
                  destinationOrNext,
                );
              }
              break;
            }
          default:
            _this.syncErrorThrowable = true;
            _this.destination = new SafeSubscriber(
              _this,
              destinationOrNext,
              error2,
              complete,
            );
            break;
        }
        return _this;
      }
      Subscriber2.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return this;
      };
      Subscriber2.create = function (next, error2, complete) {
        var subscriber = new Subscriber2(next, error2, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
      };
      Subscriber2.prototype.next = function (value) {
        if (!this.isStopped) {
          this._next(value);
        }
      };
      Subscriber2.prototype.error = function (err) {
        if (!this.isStopped) {
          this.isStopped = true;
          this._error(err);
        }
      };
      Subscriber2.prototype.complete = function () {
        if (!this.isStopped) {
          this.isStopped = true;
          this._complete();
        }
      };
      Subscriber2.prototype.unsubscribe = function () {
        if (this.closed) {
          return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
      };
      Subscriber2.prototype._next = function (value) {
        this.destination.next(value);
      };
      Subscriber2.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
      };
      Subscriber2.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
      };
      Subscriber2.prototype._unsubscribeAndRecycle = function () {
        var _parentOrParents = this._parentOrParents;
        this._parentOrParents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parentOrParents = _parentOrParents;
        return this;
      };
      return Subscriber2;
    })(Subscription_1.Subscription);
    exports.Subscriber = Subscriber;
    var SafeSubscriber = (function (_super) {
      __extends(SafeSubscriber2, _super);
      function SafeSubscriber2(
        _parentSubscriber,
        observerOrNext,
        error2,
        complete,
      ) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction_1.isFunction(observerOrNext)) {
          next = observerOrNext;
        } else if (observerOrNext) {
          next = observerOrNext.next;
          error2 = observerOrNext.error;
          complete = observerOrNext.complete;
          if (observerOrNext !== Observer_1.empty) {
            context = Object.create(observerOrNext);
            if (isFunction_1.isFunction(context.unsubscribe)) {
              _this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = _this.unsubscribe.bind(_this);
          }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error2;
        _this._complete = complete;
        return _this;
      }
      SafeSubscriber2.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
          var _parentSubscriber = this._parentSubscriber;
          if (
            !config_1.config.useDeprecatedSynchronousErrorHandling ||
            !_parentSubscriber.syncErrorThrowable
          ) {
            this.__tryOrUnsub(this._next, value);
          } else if (
            this.__tryOrSetError(_parentSubscriber, this._next, value)
          ) {
            this.unsubscribe();
          }
        }
      };
      SafeSubscriber2.prototype.error = function (err) {
        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber;
          var useDeprecatedSynchronousErrorHandling =
            config_1.config.useDeprecatedSynchronousErrorHandling;
          if (this._error) {
            if (
              !useDeprecatedSynchronousErrorHandling ||
              !_parentSubscriber.syncErrorThrowable
            ) {
              this.__tryOrUnsub(this._error, err);
              this.unsubscribe();
            } else {
              this.__tryOrSetError(_parentSubscriber, this._error, err);
              this.unsubscribe();
            }
          } else if (!_parentSubscriber.syncErrorThrowable) {
            this.unsubscribe();
            if (useDeprecatedSynchronousErrorHandling) {
              throw err;
            }
            hostReportError_1.hostReportError(err);
          } else {
            if (useDeprecatedSynchronousErrorHandling) {
              _parentSubscriber.syncErrorValue = err;
              _parentSubscriber.syncErrorThrown = true;
            } else {
              hostReportError_1.hostReportError(err);
            }
            this.unsubscribe();
          }
        }
      };
      SafeSubscriber2.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber;
          if (this._complete) {
            var wrappedComplete = function () {
              return _this._complete.call(_this._context);
            };
            if (
              !config_1.config.useDeprecatedSynchronousErrorHandling ||
              !_parentSubscriber.syncErrorThrowable
            ) {
              this.__tryOrUnsub(wrappedComplete);
              this.unsubscribe();
            } else {
              this.__tryOrSetError(_parentSubscriber, wrappedComplete);
              this.unsubscribe();
            }
          } else {
            this.unsubscribe();
          }
        }
      };
      SafeSubscriber2.prototype.__tryOrUnsub = function (fn, value) {
        try {
          fn.call(this._context, value);
        } catch (err) {
          this.unsubscribe();
          if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw err;
          } else {
            hostReportError_1.hostReportError(err);
          }
        }
      };
      SafeSubscriber2.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config_1.config.useDeprecatedSynchronousErrorHandling) {
          throw new Error('bad call');
        }
        try {
          fn.call(this._context, value);
        } catch (err) {
          if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
          } else {
            hostReportError_1.hostReportError(err);
            return true;
          }
        }
        return false;
      };
      SafeSubscriber2.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
      };
      return SafeSubscriber2;
    })(Subscriber);
    exports.SafeSubscriber = SafeSubscriber;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/canReportError.js
var require_canReportError = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/canReportError.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Subscriber_1 = require_Subscriber();
    function canReportError(observer) {
      while (observer) {
        var _a4 = observer,
          closed_1 = _a4.closed,
          destination = _a4.destination,
          isStopped = _a4.isStopped;
        if (closed_1 || isStopped) {
          return false;
        } else if (
          destination &&
          destination instanceof Subscriber_1.Subscriber
        ) {
          observer = destination;
        } else {
          observer = null;
        }
      }
      return true;
    }
    exports.canReportError = canReportError;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/toSubscriber.js
var require_toSubscriber = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/toSubscriber.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Subscriber_1 = require_Subscriber();
    var rxSubscriber_1 = require_rxSubscriber();
    var Observer_1 = require_Observer();
    function toSubscriber(nextOrObserver, error2, complete) {
      if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
          return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
          return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
      }
      if (!nextOrObserver && !error2 && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
      }
      return new Subscriber_1.Subscriber(nextOrObserver, error2, complete);
    }
    exports.toSubscriber = toSubscriber;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/symbol/observable.js
var require_observable = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/symbol/observable.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.observable = (function () {
      return (
        (typeof Symbol === 'function' && Symbol.observable) || '@@observable'
      );
    })();
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/identity.js
var require_identity = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/identity.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function identity(x2) {
      return x2;
    }
    exports.identity = identity;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/pipe.js
var require_pipe = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/util/pipe.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var identity_1 = require_identity();
    function pipe() {
      var fns = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
      }
      return pipeFromArray(fns);
    }
    exports.pipe = pipe;
    function pipeFromArray(fns) {
      if (fns.length === 0) {
        return identity_1.identity;
      }
      if (fns.length === 1) {
        return fns[0];
      }
      return function piped(input) {
        return fns.reduce(function (prev, fn) {
          return fn(prev);
        }, input);
      };
    }
    exports.pipeFromArray = pipeFromArray;
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/Observable.js
var require_Observable = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/Observable.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var canReportError_1 = require_canReportError();
    var toSubscriber_1 = require_toSubscriber();
    var observable_1 = require_observable();
    var pipe_1 = require_pipe();
    var config_1 = require_config();
    var Observable = (function () {
      function Observable2(subscribe2) {
        this._isScalar = false;
        if (subscribe2) {
          this._subscribe = subscribe2;
        }
      }
      Observable2.prototype.lift = function (operator) {
        var observable = new Observable2();
        observable.source = this;
        observable.operator = operator;
        return observable;
      };
      Observable2.prototype.subscribe = function (
        observerOrNext,
        error2,
        complete,
      ) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(
          observerOrNext,
          error2,
          complete,
        );
        if (operator) {
          sink.add(operator.call(sink, this.source));
        } else {
          sink.add(
            this.source ||
              (config_1.config.useDeprecatedSynchronousErrorHandling &&
                !sink.syncErrorThrowable)
              ? this._subscribe(sink)
              : this._trySubscribe(sink),
          );
        }
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
          if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
              throw sink.syncErrorValue;
            }
          }
        }
        return sink;
      };
      Observable2.prototype._trySubscribe = function (sink) {
        try {
          return this._subscribe(sink);
        } catch (err) {
          if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
          }
          if (canReportError_1.canReportError(sink)) {
            sink.error(err);
          } else {
            console.warn(err);
          }
        }
      };
      Observable2.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve2, reject) {
          var subscription;
          subscription = _this.subscribe(
            function (value) {
              try {
                next(value);
              } catch (err) {
                reject(err);
                if (subscription) {
                  subscription.unsubscribe();
                }
              }
            },
            reject,
            resolve2,
          );
        });
      };
      Observable2.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
      };
      Observable2.prototype[observable_1.observable] = function () {
        return this;
      };
      Observable2.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
          return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
      };
      Observable2.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve2, reject) {
          var value;
          _this.subscribe(
            function (x2) {
              return (value = x2);
            },
            function (err) {
              return reject(err);
            },
            function () {
              return resolve2(value);
            },
          );
        });
      };
      Observable2.create = function (subscribe2) {
        return new Observable2(subscribe2);
      };
      return Observable2;
    })();
    exports.Observable = Observable;
    function getPromiseCtor(promiseCtor) {
      if (!promiseCtor) {
        promiseCtor = config_1.config.Promise || Promise;
      }
      if (!promiseCtor) {
        throw new Error('no Promise impl found');
      }
      return promiseCtor;
    }
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/operators/filter.js
var require_filter = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/operators/filter.js'(
    exports,
  ) {
    'use strict';
    var __extends =
      (exports && exports.__extends) ||
      (function () {
        var extendStatics = function (d, b) {
          extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (d2, b2) {
                d2.__proto__ = b2;
              }) ||
            function (d2, b2) {
              for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
            };
          return extendStatics(d, b);
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      })();
    Object.defineProperty(exports, '__esModule', { value: true });
    var Subscriber_1 = require_Subscriber();
    function filter(predicate, thisArg) {
      return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
      };
    }
    exports.filter = filter;
    var FilterOperator = (function () {
      function FilterOperator2(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
      }
      FilterOperator2.prototype.call = function (subscriber, source) {
        return source.subscribe(
          new FilterSubscriber(subscriber, this.predicate, this.thisArg),
        );
      };
      return FilterOperator2;
    })();
    var FilterSubscriber = (function (_super) {
      __extends(FilterSubscriber2, _super);
      function FilterSubscriber2(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
      }
      FilterSubscriber2.prototype._next = function (value) {
        var result;
        try {
          result = this.predicate.call(this.thisArg, value, this.count++);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        if (result) {
          this.destination.next(value);
        }
      };
      return FilterSubscriber2;
    })(Subscriber_1.Subscriber);
  },
});

// ../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/operators/map.js
var require_map = __commonJS({
  '../../node_modules/.pnpm/rxjs@6.6.7/node_modules/rxjs/internal/operators/map.js'(
    exports,
  ) {
    'use strict';
    var __extends =
      (exports && exports.__extends) ||
      (function () {
        var extendStatics = function (d, b) {
          extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (d2, b2) {
                d2.__proto__ = b2;
              }) ||
            function (d2, b2) {
              for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
            };
          return extendStatics(d, b);
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      })();
    Object.defineProperty(exports, '__esModule', { value: true });
    var Subscriber_1 = require_Subscriber();
    function map(project, thisArg) {
      return function mapOperation(source) {
        if (typeof project !== 'function') {
          throw new TypeError(
            'argument is not a function. Are you looking for `mapTo()`?',
          );
        }
        return source.lift(new MapOperator(project, thisArg));
      };
    }
    exports.map = map;
    var MapOperator = (function () {
      function MapOperator2(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
      }
      MapOperator2.prototype.call = function (subscriber, source) {
        return source.subscribe(
          new MapSubscriber(subscriber, this.project, this.thisArg),
        );
      };
      return MapOperator2;
    })();
    exports.MapOperator = MapOperator;
    var MapSubscriber = (function (_super) {
      __extends(MapSubscriber2, _super);
      function MapSubscriber2(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
      }
      MapSubscriber2.prototype._next = function (value) {
        var result;
        try {
          result = this.project.call(this.thisArg, value, this.count++);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      return MapSubscriber2;
    })(Subscriber_1.Subscriber);
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/observable.js
var require_observable2 = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/observable.js'(
    exports,
    module2,
  ) {
    'use strict';
    var _require = require_Observable();
    var Observable = _require.Observable;
    var _require2 = require_filter();
    var filter = _require2.filter;
    var _require3 = require_map();
    var map = _require3.map;
    module2.exports = {
      Observable,
      filter,
      map,
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/getSelection.js
var require_getSelection = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/getSelection.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = function getSelection(sel) {
      if (typeof sel === 'string' || Array.isArray(sel)) {
        return {
          id: sel,
        };
      }
      if (sel && sel.query) {
        return 'params' in sel
          ? {
              query: sel.query,
              params: sel.params,
            }
          : {
              query: sel.query,
            };
      }
      var selectionOpts = [
        '* Document ID (<docId>)',
        '* Array of document IDs',
        '* Object containing `query`',
      ].join('\n');
      throw new Error(
        'Unknown selection - must be one of:\n\n'.concat(selectionOpts),
      );
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/validators.js
var require_validators = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/validators.js'(
    exports,
  ) {
    'use strict';
    function _typeof(obj) {
      '@babel/helpers - typeof';
      return (
        (_typeof =
          typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
            ? function (obj2) {
                return typeof obj2;
              }
            : function (obj2) {
                return obj2 &&
                  typeof Symbol == 'function' &&
                  obj2.constructor === Symbol &&
                  obj2 !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj2;
              }),
        _typeof(obj)
      );
    }
    var VALID_ASSET_TYPES = ['image', 'file'];
    var VALID_INSERT_LOCATIONS = ['before', 'after', 'replace'];
    exports.dataset = function (name) {
      if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name)) {
        throw new Error(
          'Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters',
        );
      }
    };
    exports.projectId = function (id) {
      if (!/^[-a-z0-9]+$/i.test(id)) {
        throw new Error(
          '`projectId` can only contain only a-z, 0-9 and dashes',
        );
      }
    };
    exports.validateAssetType = function (type) {
      if (VALID_ASSET_TYPES.indexOf(type) === -1) {
        throw new Error(
          'Invalid asset type: '
            .concat(type, '. Must be one of ')
            .concat(VALID_ASSET_TYPES.join(', ')),
        );
      }
    };
    exports.validateObject = function (op, val) {
      if (val === null || _typeof(val) !== 'object' || Array.isArray(val)) {
        throw new Error(''.concat(op, '() takes an object of properties'));
      }
    };
    exports.requireDocumentId = function (op, doc) {
      if (!doc._id) {
        throw new Error(
          ''.concat(
            op,
            '() requires that the document contains an ID ("_id" property)',
          ),
        );
      }
      exports.validateDocumentId(op, doc._id);
    };
    exports.validateDocumentId = function (op, id) {
      if (typeof id !== 'string' || !/^[a-z0-9_.-]+$/i.test(id)) {
        throw new Error(
          ''.concat(op, '(): "').concat(id, '" is not a valid document ID'),
        );
      }
    };
    exports.validateInsert = function (at, selector, items) {
      var signature = 'insert(at, selector, items)';
      if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
        var valid = VALID_INSERT_LOCATIONS.map(function (loc) {
          return '"'.concat(loc, '"');
        }).join(', ');
        throw new Error(
          ''
            .concat(signature, ' takes an "at"-argument which is one of: ')
            .concat(valid),
        );
      }
      if (typeof selector !== 'string') {
        throw new Error(
          ''.concat(
            signature,
            ' takes a "selector"-argument which must be a string',
          ),
        );
      }
      if (!Array.isArray(items)) {
        throw new Error(
          ''.concat(
            signature,
            ' takes an "items"-argument which must be an array',
          ),
        );
      }
    };
    exports.hasDataset = function (config) {
      if (!config.dataset) {
        throw new Error('`dataset` must be provided to perform queries');
      }
      return config.dataset || '';
    };
    exports.requestTag = function (tag) {
      if (typeof tag !== 'string' || !/^[a-z0-9._-]{1,75}$/i.test(tag)) {
        throw new Error(
          'Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long.',
        );
      }
      return tag;
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/patch.js
var require_patch = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/patch.js'(
    exports,
    module2,
  ) {
    'use strict';
    function _defineProperty(obj, key2, value) {
      if (key2 in obj) {
        Object.defineProperty(obj, key2, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key2] = value;
      }
      return obj;
    }
    var assign2 = require_object_assign();
    var getSelection = require_getSelection();
    var validate = require_validators();
    var validateObject = validate.validateObject;
    var validateInsert = validate.validateInsert;
    function Patch(selection) {
      var operations =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var client2 =
        arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      this.selection = selection;
      this.operations = assign2({}, operations);
      this.client = client2;
    }
    assign2(Patch.prototype, {
      clone: function clone2() {
        return new Patch(
          this.selection,
          assign2({}, this.operations),
          this.client,
        );
      },
      set: function set(props) {
        return this._assign('set', props);
      },
      diffMatchPatch: function diffMatchPatch(props) {
        validateObject('diffMatchPatch', props);
        return this._assign('diffMatchPatch', props);
      },
      unset: function unset(attrs) {
        if (!Array.isArray(attrs)) {
          throw new Error(
            'unset(attrs) takes an array of attributes to unset, non-array given',
          );
        }
        this.operations = assign2({}, this.operations, {
          unset: attrs,
        });
        return this;
      },
      setIfMissing: function setIfMissing(props) {
        return this._assign('setIfMissing', props);
      },
      replace: function replace(props) {
        validateObject('replace', props);
        return this._set('set', {
          $: props,
        });
      },
      inc: function inc(props) {
        return this._assign('inc', props);
      },
      dec: function dec(props) {
        return this._assign('dec', props);
      },
      insert: function insert(at, selector, items) {
        var _this$_assign;
        validateInsert(at, selector, items);
        return this._assign(
          'insert',
          ((_this$_assign = {}),
          _defineProperty(_this$_assign, at, selector),
          _defineProperty(_this$_assign, 'items', items),
          _this$_assign),
        );
      },
      append: function append(selector, items) {
        return this.insert('after', ''.concat(selector, '[-1]'), items);
      },
      prepend: function prepend(selector, items) {
        return this.insert('before', ''.concat(selector, '[0]'), items);
      },
      splice: function splice(selector, start, deleteCount, items) {
        var delAll = typeof deleteCount === 'undefined' || deleteCount === -1;
        var startIndex = start < 0 ? start - 1 : start;
        var delCount = delAll ? -1 : Math.max(0, start + deleteCount);
        var delRange = startIndex < 0 && delCount >= 0 ? '' : delCount;
        var rangeSelector = ''
          .concat(selector, '[')
          .concat(startIndex, ':')
          .concat(delRange, ']');
        return this.insert('replace', rangeSelector, items || []);
      },
      ifRevisionId: function ifRevisionId(rev) {
        this.operations.ifRevisionID = rev;
        return this;
      },
      serialize: function serialize2() {
        return assign2(getSelection(this.selection), this.operations);
      },
      toJSON: function toJSON() {
        return this.serialize();
      },
      commit: function commit() {
        var options =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (!this.client) {
          throw new Error(
            'No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method',
          );
        }
        var returnFirst = typeof this.selection === 'string';
        var opts = assign2(
          {
            returnFirst,
            returnDocuments: true,
          },
          options,
        );
        return this.client.mutate(
          {
            patch: this.serialize(),
          },
          opts,
        );
      },
      reset: function reset() {
        this.operations = {};
        return this;
      },
      _set: function _set(op, props) {
        return this._assign(op, props, false);
      },
      _assign: function _assign(op, props) {
        var merge =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
        validateObject(op, props);
        this.operations = assign2(
          {},
          this.operations,
          _defineProperty(
            {},
            op,
            assign2({}, (merge && this.operations[op]) || {}, props),
          ),
        );
        return this;
      },
    });
    module2.exports = Patch;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/transaction.js
var require_transaction = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/transaction.js'(
    exports,
    module2,
  ) {
    'use strict';
    function _defineProperty(obj, key2, value) {
      if (key2 in obj) {
        Object.defineProperty(obj, key2, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key2] = value;
      }
      return obj;
    }
    var assign2 = require_object_assign();
    var validators = require_validators();
    var Patch = require_patch();
    var defaultMutateOptions = {
      returnDocuments: false,
    };
    function Transaction() {
      var operations =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var client2 = arguments.length > 1 ? arguments[1] : void 0;
      var transactionId = arguments.length > 2 ? arguments[2] : void 0;
      this.trxId = transactionId;
      this.operations = operations;
      this.client = client2;
    }
    assign2(Transaction.prototype, {
      clone: function clone2() {
        return new Transaction(
          this.operations.slice(0),
          this.client,
          this.trxId,
        );
      },
      create: function create(doc) {
        validators.validateObject('create', doc);
        return this._add({
          create: doc,
        });
      },
      createIfNotExists: function createIfNotExists(doc) {
        var op = 'createIfNotExists';
        validators.validateObject(op, doc);
        validators.requireDocumentId(op, doc);
        return this._add(_defineProperty({}, op, doc));
      },
      createOrReplace: function createOrReplace(doc) {
        var op = 'createOrReplace';
        validators.validateObject(op, doc);
        validators.requireDocumentId(op, doc);
        return this._add(_defineProperty({}, op, doc));
      },
      delete: function _delete(documentId) {
        validators.validateDocumentId('delete', documentId);
        return this._add({
          delete: {
            id: documentId,
          },
        });
      },
      patch: function patch(documentId, patchOps) {
        var isBuilder = typeof patchOps === 'function';
        var isPatch = documentId instanceof Patch;
        if (isPatch) {
          return this._add({
            patch: documentId.serialize(),
          });
        }
        if (isBuilder) {
          var patch2 = patchOps(new Patch(documentId, {}, this.client));
          if (!(patch2 instanceof Patch)) {
            throw new Error(
              'function passed to `patch()` must return the patch',
            );
          }
          return this._add({
            patch: patch2.serialize(),
          });
        }
        return this._add({
          patch: assign2(
            {
              id: documentId,
            },
            patchOps,
          ),
        });
      },
      transactionId: function transactionId(id) {
        if (!id) {
          return this.trxId;
        }
        this.trxId = id;
        return this;
      },
      serialize: function serialize2() {
        return this.operations.slice();
      },
      toJSON: function toJSON() {
        return this.serialize();
      },
      commit: function commit(options) {
        if (!this.client) {
          throw new Error(
            'No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method',
          );
        }
        return this.client.mutate(
          this.serialize(),
          assign2(
            {
              transactionId: this.trxId,
            },
            defaultMutateOptions,
            options || {},
          ),
        );
      },
      reset: function reset() {
        this.operations = [];
        return this;
      },
      _add: function _add(mut) {
        this.operations.push(mut);
        return this;
      },
    });
    module2.exports = Transaction;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/encodeQueryString.js
var require_encodeQueryString = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/encodeQueryString.js'(
    exports,
    module2,
  ) {
    'use strict';
    var _excluded = ['tag'];
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key2, i2;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
          key2 = sourceSymbolKeys[i2];
          if (excluded.indexOf(key2) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key2))
            continue;
          target[key2] = source[key2];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key2, i2;
      for (i2 = 0; i2 < sourceKeys.length; i2++) {
        key2 = sourceKeys[i2];
        if (excluded.indexOf(key2) >= 0) continue;
        target[key2] = source[key2];
      }
      return target;
    }
    var enc = encodeURIComponent;
    module2.exports = function (_ref) {
      var query = _ref.query,
        _ref$params = _ref.params,
        params = _ref$params === void 0 ? {} : _ref$params,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options;
      var tag = options.tag,
        opts = _objectWithoutProperties(options, _excluded);
      var q = 'query='.concat(enc(query));
      var base2 = tag ? '?tag='.concat(enc(tag), '&').concat(q) : '?'.concat(q);
      var qString = Object.keys(params).reduce(function (qs, param) {
        return ''
          .concat(qs, '&')
          .concat(enc('$'.concat(param)), '=')
          .concat(enc(JSON.stringify(params[param])));
      }, base2);
      return Object.keys(opts).reduce(function (qs, option) {
        return options[option]
          ? ''
              .concat(qs, '&')
              .concat(enc(option), '=')
              .concat(enc(options[option]))
          : qs;
      }, qString);
    };
  },
});

// ../../node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  '../../node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = function required(port, protocol) {
      protocol = protocol.split(':')[0];
      port = +port;
      if (!port) return false;
      switch (protocol) {
        case 'http':
        case 'ws':
          return port !== 80;
        case 'https':
        case 'wss':
          return port !== 443;
        case 'ftp':
          return port !== 21;
        case 'gopher':
          return port !== 70;
        case 'file':
          return false;
      }
      return port !== 0;
    };
  },
});

// ../../node_modules/.pnpm/querystringify@2.2.0/node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  '../../node_modules/.pnpm/querystringify@2.2.0/node_modules/querystringify/index.js'(
    exports,
  ) {
    'use strict';
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode2(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, ' '));
      } catch (e2) {
        return null;
      }
    }
    function encode2(input) {
      try {
        return encodeURIComponent(input);
      } catch (e2) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g,
        result = {},
        part;
      while ((part = parser.exec(query))) {
        var key2 = decode2(part[1]),
          value = decode2(part[2]);
        if (key2 === null || value === null || key2 in result) continue;
        result[key2] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || '';
      var pairs = [],
        value,
        key2;
      if (typeof prefix !== 'string') prefix = '?';
      for (key2 in obj) {
        if (has.call(obj, key2)) {
          value = obj[key2];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = '';
          }
          key2 = encode2(key2);
          value = encode2(value);
          if (key2 === null || value === null) continue;
          pairs.push(key2 + '=' + value);
        }
      }
      return pairs.length ? prefix + pairs.join('&') : '';
    }
    exports.stringify = querystringify;
    exports.parse = querystring;
  },
});

// ../../node_modules/.pnpm/url-parse@1.5.10/node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  '../../node_modules/.pnpm/url-parse@1.5.10/node_modules/url-parse/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace =
      /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : '').toString().replace(controlOrWhitespace, '');
    }
    var rules = [
      ['#', 'hash'],
      ['?', 'query'],
      function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, '/') : address;
      },
      ['/', 'pathname'],
      ['@', 'auth', 1],
      [NaN, 'host', void 0, 1, 1],
      [/:(\d*)$/, 'port', void 0, 1],
      [NaN, 'hostname', void 0, 1, 1],
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== 'undefined') globalVar = window;
      else if (typeof global !== 'undefined') globalVar = global;
      else if (typeof self !== 'undefined') globalVar = self;
      else globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {},
        type = typeof loc,
        key2;
      if (loc.protocol === 'blob:') {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if (type === 'string') {
        finaldestination = new Url(loc, {});
        for (key2 in ignore) delete finaldestination[key2];
      } else if (type === 'object') {
        for (key2 in loc) {
          if (key2 in ignore) continue;
          finaldestination[key2] = loc[key2];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme2) {
      return (
        scheme2 === 'file:' ||
        scheme2 === 'ftp:' ||
        scheme2 === 'http:' ||
        scheme2 === 'https:' ||
        scheme2 === 'ws:' ||
        scheme2 === 'wss:'
      );
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, '');
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : '';
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === 'file:') {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest,
      };
    }
    function resolve2(relative, base2) {
      if (relative === '') return base2;
      var path = (base2 || '/')
          .split('/')
          .slice(0, -1)
          .concat(relative.split('/')),
        i2 = path.length,
        last = path[i2 - 1],
        unshift = false,
        up = 0;
      while (i2--) {
        if (path[i2] === '.') {
          path.splice(i2, 1);
        } else if (path[i2] === '..') {
          path.splice(i2, 1);
          up++;
        } else if (up) {
          if (i2 === 0) unshift = true;
          path.splice(i2, 1);
          up--;
        }
      }
      if (unshift) path.unshift('');
      if (last === '.' || last === '..') path.push('');
      return path.join('/');
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, '');
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative,
        extracted,
        parse2,
        instruction,
        index,
        key2,
        instructions = rules.slice(),
        type = typeof location,
        url = this,
        i2 = 0;
      if (type !== 'object' && type !== 'string') {
        parser = location;
        location = null;
      }
      if (parser && typeof parser !== 'function') parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || '', location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || (relative && location.slashes);
      url.protocol = extracted.protocol || location.protocol || '';
      address = extracted.rest;
      if (
        (extracted.protocol === 'file:' &&
          (extracted.slashesCount !== 2 || windowsDriveLetter.test(address))) ||
        (!extracted.slashes &&
          (extracted.protocol ||
            extracted.slashesCount < 2 ||
            !isSpecial(url.protocol)))
      ) {
        instructions[3] = [/(.*)/, 'pathname'];
      }
      for (; i2 < instructions.length; i2++) {
        instruction = instructions[i2];
        if (typeof instruction === 'function') {
          address = instruction(address, url);
          continue;
        }
        parse2 = instruction[0];
        key2 = instruction[1];
        if (parse2 !== parse2) {
          url[key2] = address;
        } else if (typeof parse2 === 'string') {
          index =
            parse2 === '@'
              ? address.lastIndexOf(parse2)
              : address.indexOf(parse2);
          if (~index) {
            if (typeof instruction[2] === 'number') {
              url[key2] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key2] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if ((index = parse2.exec(address))) {
          url[key2] = index[1];
          address = address.slice(0, index.index);
        }
        url[key2] =
          url[key2] || (relative && instruction[3] ? location[key2] || '' : '');
        if (instruction[4]) url[key2] = url[key2].toLowerCase();
      }
      if (parser) url.query = parser(url.query);
      if (
        relative &&
        location.slashes &&
        url.pathname.charAt(0) !== '/' &&
        (url.pathname !== '' || location.pathname !== '')
      ) {
        url.pathname = resolve2(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== '/' && isSpecial(url.protocol)) {
        url.pathname = '/' + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = '';
      }
      url.username = url.password = '';
      if (url.auth) {
        index = url.auth.indexOf(':');
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password
          ? url.username + ':' + url.password
          : url.username;
      }
      url.origin =
        url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
          ? url.protocol + '//' + url.host
          : 'null';
      url.href = url.toString();
    }
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case 'query':
          if (typeof value === 'string' && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case 'port':
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = '';
          } else if (value) {
            url.host = url.hostname + ':' + value;
          }
          break;
        case 'hostname':
          url[part] = value;
          if (url.port) value += ':' + url.port;
          url.host = value;
          break;
        case 'host':
          url[part] = value;
          if (port.test(value)) {
            value = value.split(':');
            url.port = value.pop();
            url.hostname = value.join(':');
          } else {
            url.hostname = value;
            url.port = '';
          }
          break;
        case 'protocol':
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case 'pathname':
        case 'hash':
          if (value) {
            var char = part === 'pathname' ? '/' : '#';
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case 'username':
        case 'password':
          url[part] = encodeURIComponent(value);
          break;
        case 'auth':
          var index = value.indexOf(':');
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i2 = 0; i2 < rules.length; i2++) {
        var ins = rules[i2];
        if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password
        ? url.username + ':' + url.password
        : url.username;
      url.origin =
        url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
          ? url.protocol + '//' + url.host
          : 'null';
      url.href = url.toString();
      return url;
    }
    function toString(stringify) {
      if (!stringify || typeof stringify !== 'function')
        stringify = qs.stringify;
      var query,
        url = this,
        host = url.host,
        protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ':')
        protocol += ':';
      var result =
        protocol +
        ((url.protocol && url.slashes) || isSpecial(url.protocol) ? '//' : '');
      if (url.username) {
        result += url.username;
        if (url.password) result += ':' + url.password;
        result += '@';
      } else if (url.password) {
        result += ':' + url.password;
        result += '@';
      } else if (
        url.protocol !== 'file:' &&
        isSpecial(url.protocol) &&
        !host &&
        url.pathname !== '/'
      ) {
        result += '@';
      }
      if (
        host[host.length - 1] === ':' ||
        (port.test(url.hostname) && !url.port)
      ) {
        host += ':';
      }
      result += host + url.pathname;
      query = typeof url.query === 'object' ? stringify(url.query) : url.query;
      if (query) result += query.charAt(0) !== '?' ? '?' + query : query;
      if (url.hash) result += url.hash;
      return result;
    }
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  },
});

// ../../node_modules/.pnpm/original@1.0.2/node_modules/original/index.js
var require_original = __commonJS({
  '../../node_modules/.pnpm/original@1.0.2/node_modules/original/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var parse2 = require_url_parse();
    function origin(url) {
      if (typeof url === 'string') url = parse2(url);
      if (!url.protocol || !url.hostname) return 'null';
      return (url.protocol + '//' + url.host).toLowerCase();
    }
    origin.same = function same(a, b) {
      return origin(a) === origin(b);
    };
    module2.exports = origin;
  },
});

// ../../node_modules/.pnpm/eventsource@1.1.0/node_modules/eventsource/lib/eventsource.js
var require_eventsource = __commonJS({
  '../../node_modules/.pnpm/eventsource@1.1.0/node_modules/eventsource/lib/eventsource.js'(
    exports,
    module2,
  ) {
    var original = require_original();
    var parse2 = require('url').parse;
    var events = require('events');
    var https2 = require('https');
    var http2 = require('http');
    var util = require('util');
    var httpsOptions = [
      'pfx',
      'key',
      'passphrase',
      'cert',
      'ca',
      'ciphers',
      'rejectUnauthorized',
      'secureProtocol',
      'servername',
      'checkServerIdentity',
    ];
    var bom = [239, 187, 191];
    var colon = 58;
    var space = 32;
    var lineFeed = 10;
    var carriageReturn = 13;
    function hasBom(buf) {
      return bom.every(function (charCode, index) {
        return buf[index] === charCode;
      });
    }
    function EventSource(url, eventSourceInitDict) {
      var readyState = EventSource.CONNECTING;
      Object.defineProperty(this, 'readyState', {
        get: function () {
          return readyState;
        },
      });
      Object.defineProperty(this, 'url', {
        get: function () {
          return url;
        },
      });
      var self2 = this;
      self2.reconnectInterval = 1e3;
      self2.connectionInProgress = false;
      function onConnectionClosed(message) {
        if (readyState === EventSource.CLOSED) return;
        readyState = EventSource.CONNECTING;
        _emit('error', new Event('error', { message }));
        if (reconnectUrl) {
          url = reconnectUrl;
          reconnectUrl = null;
        }
        setTimeout(function () {
          if (
            readyState !== EventSource.CONNECTING ||
            self2.connectionInProgress
          ) {
            return;
          }
          self2.connectionInProgress = true;
          connect();
        }, self2.reconnectInterval);
      }
      var req;
      var lastEventId = '';
      if (
        eventSourceInitDict &&
        eventSourceInitDict.headers &&
        eventSourceInitDict.headers['Last-Event-ID']
      ) {
        lastEventId = eventSourceInitDict.headers['Last-Event-ID'];
        delete eventSourceInitDict.headers['Last-Event-ID'];
      }
      var discardTrailingNewline = false;
      var data = '';
      var eventName = '';
      var reconnectUrl = null;
      function connect() {
        var options = parse2(url);
        var isSecure = options.protocol === 'https:';
        options.headers = {
          'Cache-Control': 'no-cache',
          Accept: 'text/event-stream',
        };
        if (lastEventId) options.headers['Last-Event-ID'] = lastEventId;
        if (eventSourceInitDict && eventSourceInitDict.headers) {
          for (var i2 in eventSourceInitDict.headers) {
            var header = eventSourceInitDict.headers[i2];
            if (header) {
              options.headers[i2] = header;
            }
          }
        }
        options.rejectUnauthorized = !(
          eventSourceInitDict && !eventSourceInitDict.rejectUnauthorized
        );
        if (
          eventSourceInitDict &&
          eventSourceInitDict.createConnection !== void 0
        ) {
          options.createConnection = eventSourceInitDict.createConnection;
        }
        var useProxy = eventSourceInitDict && eventSourceInitDict.proxy;
        if (useProxy) {
          var proxy = parse2(eventSourceInitDict.proxy);
          isSecure = proxy.protocol === 'https:';
          options.protocol = isSecure ? 'https:' : 'http:';
          options.path = url;
          options.headers.Host = options.host;
          options.hostname = proxy.hostname;
          options.host = proxy.host;
          options.port = proxy.port;
        }
        if (eventSourceInitDict && eventSourceInitDict.https) {
          for (var optName in eventSourceInitDict.https) {
            if (httpsOptions.indexOf(optName) === -1) {
              continue;
            }
            var option = eventSourceInitDict.https[optName];
            if (option !== void 0) {
              options[optName] = option;
            }
          }
        }
        if (
          eventSourceInitDict &&
          eventSourceInitDict.withCredentials !== void 0
        ) {
          options.withCredentials = eventSourceInitDict.withCredentials;
        }
        req = (isSecure ? https2 : http2).request(options, function (res) {
          self2.connectionInProgress = false;
          if (
            res.statusCode === 500 ||
            res.statusCode === 502 ||
            res.statusCode === 503 ||
            res.statusCode === 504
          ) {
            _emit(
              'error',
              new Event('error', {
                status: res.statusCode,
                message: res.statusMessage,
              }),
            );
            onConnectionClosed();
            return;
          }
          if (
            res.statusCode === 301 ||
            res.statusCode === 302 ||
            res.statusCode === 307
          ) {
            if (!res.headers.location) {
              _emit(
                'error',
                new Event('error', {
                  status: res.statusCode,
                  message: res.statusMessage,
                }),
              );
              return;
            }
            if (res.statusCode === 307) reconnectUrl = url;
            url = res.headers.location;
            process.nextTick(connect);
            return;
          }
          if (res.statusCode !== 200) {
            _emit(
              'error',
              new Event('error', {
                status: res.statusCode,
                message: res.statusMessage,
              }),
            );
            return self2.close();
          }
          readyState = EventSource.OPEN;
          res.on('close', function () {
            res.removeAllListeners('close');
            res.removeAllListeners('end');
            onConnectionClosed();
          });
          res.on('end', function () {
            res.removeAllListeners('close');
            res.removeAllListeners('end');
            onConnectionClosed();
          });
          _emit('open', new Event('open'));
          var isFirst = true;
          var buf;
          var startingPos = 0;
          var startingFieldLength = -1;
          res.on('data', function (chunk) {
            buf = buf ? Buffer.concat([buf, chunk]) : chunk;
            if (isFirst && hasBom(buf)) {
              buf = buf.slice(bom.length);
            }
            isFirst = false;
            var pos = 0;
            var length = buf.length;
            while (pos < length) {
              if (discardTrailingNewline) {
                if (buf[pos] === lineFeed) {
                  ++pos;
                }
                discardTrailingNewline = false;
              }
              var lineLength = -1;
              var fieldLength = startingFieldLength;
              var c;
              for (var i3 = startingPos; lineLength < 0 && i3 < length; ++i3) {
                c = buf[i3];
                if (c === colon) {
                  if (fieldLength < 0) {
                    fieldLength = i3 - pos;
                  }
                } else if (c === carriageReturn) {
                  discardTrailingNewline = true;
                  lineLength = i3 - pos;
                } else if (c === lineFeed) {
                  lineLength = i3 - pos;
                }
              }
              if (lineLength < 0) {
                startingPos = length - pos;
                startingFieldLength = fieldLength;
                break;
              } else {
                startingPos = 0;
                startingFieldLength = -1;
              }
              parseEventStreamLine(buf, pos, fieldLength, lineLength);
              pos += lineLength + 1;
            }
            if (pos === length) {
              buf = void 0;
            } else if (pos > 0) {
              buf = buf.slice(pos);
            }
          });
        });
        req.on('error', function (err) {
          self2.connectionInProgress = false;
          onConnectionClosed(err.message);
        });
        if (req.setNoDelay) req.setNoDelay(true);
        req.end();
      }
      connect();
      function _emit() {
        if (self2.listeners(arguments[0]).length > 0) {
          self2.emit.apply(self2, arguments);
        }
      }
      this._close = function () {
        if (readyState === EventSource.CLOSED) return;
        readyState = EventSource.CLOSED;
        if (req.abort) req.abort();
        if (req.xhr && req.xhr.abort) req.xhr.abort();
      };
      function parseEventStreamLine(buf, pos, fieldLength, lineLength) {
        if (lineLength === 0) {
          if (data.length > 0) {
            var type = eventName || 'message';
            _emit(
              type,
              new MessageEvent(type, {
                data: data.slice(0, -1),
                lastEventId,
                origin: original(url),
              }),
            );
            data = '';
          }
          eventName = void 0;
        } else if (fieldLength > 0) {
          var noValue = fieldLength < 0;
          var step = 0;
          var field = buf
            .slice(pos, pos + (noValue ? lineLength : fieldLength))
            .toString();
          if (noValue) {
            step = lineLength;
          } else if (buf[pos + fieldLength + 1] !== space) {
            step = fieldLength + 1;
          } else {
            step = fieldLength + 2;
          }
          pos += step;
          var valueLength = lineLength - step;
          var value = buf.slice(pos, pos + valueLength).toString();
          if (field === 'data') {
            data += value + '\n';
          } else if (field === 'event') {
            eventName = value;
          } else if (field === 'id') {
            lastEventId = value;
          } else if (field === 'retry') {
            var retry = parseInt(value, 10);
            if (!Number.isNaN(retry)) {
              self2.reconnectInterval = retry;
            }
          }
        }
      }
    }
    module2.exports = EventSource;
    util.inherits(EventSource, events.EventEmitter);
    EventSource.prototype.constructor = EventSource;
    ['open', 'error', 'message'].forEach(function (method) {
      Object.defineProperty(EventSource.prototype, 'on' + method, {
        get: function get3() {
          var listener = this.listeners(method)[0];
          return listener
            ? listener._listener
              ? listener._listener
              : listener
            : void 0;
        },
        set: function set(listener) {
          this.removeAllListeners(method);
          this.addEventListener(method, listener);
        },
      });
    });
    Object.defineProperty(EventSource, 'CONNECTING', {
      enumerable: true,
      value: 0,
    });
    Object.defineProperty(EventSource, 'OPEN', { enumerable: true, value: 1 });
    Object.defineProperty(EventSource, 'CLOSED', {
      enumerable: true,
      value: 2,
    });
    EventSource.prototype.CONNECTING = 0;
    EventSource.prototype.OPEN = 1;
    EventSource.prototype.CLOSED = 2;
    EventSource.prototype.close = function () {
      this._close();
    };
    EventSource.prototype.addEventListener = function addEventListener(
      type,
      listener,
    ) {
      if (typeof listener === 'function') {
        listener._listener = listener;
        this.on(type, listener);
      }
    };
    EventSource.prototype.dispatchEvent = function dispatchEvent(event2) {
      if (!event2.type) {
        throw new Error('UNSPECIFIED_EVENT_TYPE_ERR');
      }
      this.emit(event2.type, event2.detail);
    };
    EventSource.prototype.removeEventListener = function removeEventListener(
      type,
      listener,
    ) {
      if (typeof listener === 'function') {
        listener._listener = void 0;
        this.removeListener(type, listener);
      }
    };
    function Event(type, optionalProperties) {
      Object.defineProperty(this, 'type', {
        writable: false,
        value: type,
        enumerable: true,
      });
      if (optionalProperties) {
        for (var f3 in optionalProperties) {
          if (optionalProperties.hasOwnProperty(f3)) {
            Object.defineProperty(this, f3, {
              writable: false,
              value: optionalProperties[f3],
              enumerable: true,
            });
          }
        }
      }
    }
    function MessageEvent(type, eventInitDict) {
      Object.defineProperty(this, 'type', {
        writable: false,
        value: type,
        enumerable: true,
      });
      for (var f3 in eventInitDict) {
        if (eventInitDict.hasOwnProperty(f3)) {
          Object.defineProperty(this, f3, {
            writable: false,
            value: eventInitDict[f3],
            enumerable: true,
          });
        }
      }
    }
  },
});

// ../../node_modules/.pnpm/@sanity+eventsource@3.0.2/node_modules/@sanity/eventsource/node.js
var require_node = __commonJS({
  '../../node_modules/.pnpm/@sanity+eventsource@3.0.2/node_modules/@sanity/eventsource/node.js'(
    exports,
    module2,
  ) {
    module2.exports = require_eventsource();
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/pick.js
var require_pick = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/pick.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = function (obj, props) {
      return props.reduce(function (selection, prop) {
        if (typeof obj[prop] === 'undefined') {
          return selection;
        }
        selection[prop] = obj[prop];
        return selection;
      }, {});
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/defaults.js
var require_defaults = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/defaults.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = function (obj, defaults) {
      return Object.keys(defaults)
        .concat(Object.keys(obj))
        .reduce(function (target, prop) {
          target[prop] =
            typeof obj[prop] === 'undefined' ? defaults[prop] : obj[prop];
          return target;
        }, {});
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/listen.js
var require_listen = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/listen.js'(
    exports,
    module2,
  ) {
    'use strict';
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly &&
          (symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          })),
          keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2] != null ? arguments[i2] : {};
        i2 % 2
          ? ownKeys(Object(source), true).forEach(function (key2) {
              _defineProperty(target, key2, source[key2]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(
              target,
              Object.getOwnPropertyDescriptors(source),
            )
          : ownKeys(Object(source)).forEach(function (key2) {
              Object.defineProperty(
                target,
                key2,
                Object.getOwnPropertyDescriptor(source, key2),
              );
            });
      }
      return target;
    }
    function _defineProperty(obj, key2, value) {
      if (key2 in obj) {
        Object.defineProperty(obj, key2, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key2] = value;
      }
      return obj;
    }
    var assign2 = require_object_assign();
    var _require = require_observable2();
    var Observable = _require.Observable;
    var polyfilledEventSource = require_node();
    var pick = require_pick();
    var defaults = require_defaults();
    var encodeQueryString = require_encodeQueryString();
    var MAX_URL_LENGTH = 16e3 - 1200;
    var EventSource = polyfilledEventSource;
    var possibleOptions = [
      'includePreviousRevision',
      'includeResult',
      'visibility',
      'effectFormat',
      'tag',
    ];
    var defaultOptions = {
      includeResult: true,
    };
    module2.exports = function listen(query, params) {
      var opts =
        arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var _this$clientConfig = this.clientConfig,
        url = _this$clientConfig.url,
        token = _this$clientConfig.token,
        withCredentials = _this$clientConfig.withCredentials,
        requestTagPrefix = _this$clientConfig.requestTagPrefix;
      var tag =
        opts.tag && requestTagPrefix
          ? [requestTagPrefix, opts.tag].join('.')
          : opts.tag;
      var options = _objectSpread(
        _objectSpread({}, defaults(opts, defaultOptions)),
        {},
        {
          tag,
        },
      );
      var listenOpts = pick(options, possibleOptions);
      var qs = encodeQueryString({
        query,
        params,
        options: listenOpts,
        tag,
      });
      var uri = ''.concat(url).concat(this.getDataUrl('listen', qs));
      if (uri.length > MAX_URL_LENGTH) {
        return new Observable(function (observer) {
          return observer.error(new Error('Query too large for listener'));
        });
      }
      var listenFor = options.events ? options.events : ['mutation'];
      var shouldEmitReconnect = listenFor.indexOf('reconnect') !== -1;
      var esOptions = {};
      if (token || withCredentials) {
        esOptions.withCredentials = true;
      }
      if (token) {
        esOptions.headers = {
          Authorization: 'Bearer '.concat(token),
        };
      }
      return new Observable(function (observer) {
        var es = getEventSource();
        var reconnectTimer;
        var stopped = false;
        function onError() {
          if (stopped) {
            return;
          }
          emitReconnect();
          if (stopped) {
            return;
          }
          if (es.readyState === EventSource.CLOSED) {
            unsubscribe();
            clearTimeout(reconnectTimer);
            reconnectTimer = setTimeout(open, 100);
          }
        }
        function onChannelError(err) {
          observer.error(cooerceError(err));
        }
        function onMessage(evt) {
          var event2 = parseEvent(evt);
          return event2 instanceof Error
            ? observer.error(event2)
            : observer.next(event2);
        }
        function onDisconnect(evt) {
          stopped = true;
          unsubscribe();
          observer.complete();
        }
        function unsubscribe() {
          es.removeEventListener('error', onError, false);
          es.removeEventListener('channelError', onChannelError, false);
          es.removeEventListener('disconnect', onDisconnect, false);
          listenFor.forEach(function (type) {
            return es.removeEventListener(type, onMessage, false);
          });
          es.close();
        }
        function emitReconnect() {
          if (shouldEmitReconnect) {
            observer.next({
              type: 'reconnect',
            });
          }
        }
        function getEventSource() {
          var evs = new EventSource(uri, esOptions);
          evs.addEventListener('error', onError, false);
          evs.addEventListener('channelError', onChannelError, false);
          evs.addEventListener('disconnect', onDisconnect, false);
          listenFor.forEach(function (type) {
            return evs.addEventListener(type, onMessage, false);
          });
          return evs;
        }
        function open() {
          es = getEventSource();
        }
        function stop() {
          stopped = true;
          unsubscribe();
        }
        return stop;
      });
    };
    function parseEvent(event2) {
      try {
        var data = (event2.data && JSON.parse(event2.data)) || {};
        return assign2(
          {
            type: event2.type,
          },
          data,
        );
      } catch (err) {
        return err;
      }
    }
    function cooerceError(err) {
      if (err instanceof Error) {
        return err;
      }
      var evt = parseEvent(err);
      return evt instanceof Error ? evt : new Error(extractErrorMessage(evt));
    }
    function extractErrorMessage(err) {
      if (!err.error) {
        return err.message || 'Unknown listener error';
      }
      if (err.error.description) {
        return err.error.description;
      }
      return typeof err.error === 'string'
        ? err.error
        : JSON.stringify(err.error, null, 2);
    }
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/dataMethods.js
var require_dataMethods = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/data/dataMethods.js'(
    exports,
    module2,
  ) {
    'use strict';
    function _defineProperty(obj, key2, value) {
      if (key2 in obj) {
        Object.defineProperty(obj, key2, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key2] = value;
      }
      return obj;
    }
    var assign2 = require_object_assign();
    var _require = require_observable2();
    var map = _require.map;
    var filter = _require.filter;
    var validators = require_validators();
    var getSelection = require_getSelection();
    var encodeQueryString = require_encodeQueryString();
    var Transaction = require_transaction();
    var Patch = require_patch();
    var listen = require_listen();
    var excludeFalsey = function excludeFalsey2(param, defValue) {
      var value = typeof param === 'undefined' ? defValue : param;
      return param === false ? void 0 : value;
    };
    var getMutationQuery = function getMutationQuery2() {
      var options =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return {
        dryRun: options.dryRun,
        returnIds: true,
        returnDocuments: excludeFalsey(options.returnDocuments, true),
        visibility: options.visibility || 'sync',
        autoGenerateArrayKeys: options.autoGenerateArrayKeys,
        skipCrossDatasetReferenceValidation:
          options.skipCrossDatasetReferenceValidation,
      };
    };
    var isResponse = function isResponse2(event2) {
      return event2.type === 'response';
    };
    var getBody = function getBody2(event2) {
      return event2.body;
    };
    var indexBy = function indexBy2(docs, attr) {
      return docs.reduce(function (indexed, doc) {
        indexed[attr(doc)] = doc;
        return indexed;
      }, /* @__PURE__ */ Object.create(null));
    };
    var toPromise = function toPromise2(observable) {
      return observable.toPromise();
    };
    var getQuerySizeLimit = 11264;
    module2.exports = {
      listen,
      getDataUrl: function getDataUrl(operation, path) {
        var config = this.clientConfig;
        var catalog = validators.hasDataset(config);
        var baseUri = '/'.concat(operation, '/').concat(catalog);
        var uri = path ? ''.concat(baseUri, '/').concat(path) : baseUri;
        return '/data'.concat(uri).replace(/\/($|\?)/, '$1');
      },
      fetch: function fetch3(query, params) {
        var options =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var mapResponse =
          options.filterResponse === false
            ? function (res) {
                return res;
              }
            : function (res) {
                return res.result;
              };
        var observable = this._dataRequest(
          'query',
          {
            query,
            params,
          },
          options,
        ).pipe(map(mapResponse));
        return this.isPromiseAPI() ? toPromise(observable) : observable;
      },
      getDocument: function getDocument(id) {
        var opts =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var options = {
          uri: this.getDataUrl('doc', id),
          json: true,
          tag: opts.tag,
        };
        var observable = this._requestObservable(options).pipe(
          filter(isResponse),
          map(function (event2) {
            return event2.body.documents && event2.body.documents[0];
          }),
        );
        return this.isPromiseAPI() ? toPromise(observable) : observable;
      },
      getDocuments: function getDocuments(ids) {
        var opts =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var options = {
          uri: this.getDataUrl('doc', ids.join(',')),
          json: true,
          tag: opts.tag,
        };
        var observable = this._requestObservable(options).pipe(
          filter(isResponse),
          map(function (event2) {
            var indexed = indexBy(event2.body.documents || [], function (doc) {
              return doc._id;
            });
            return ids.map(function (id) {
              return indexed[id] || null;
            });
          }),
        );
        return this.isPromiseAPI() ? toPromise(observable) : observable;
      },
      create: function create(doc, options) {
        return this._create(doc, 'create', options);
      },
      createIfNotExists: function createIfNotExists(doc, options) {
        validators.requireDocumentId('createIfNotExists', doc);
        return this._create(doc, 'createIfNotExists', options);
      },
      createOrReplace: function createOrReplace(doc, options) {
        validators.requireDocumentId('createOrReplace', doc);
        return this._create(doc, 'createOrReplace', options);
      },
      patch: function patch(selector, operations) {
        return new Patch(selector, operations, this);
      },
      delete: function _delete(selection, options) {
        return this.dataRequest(
          'mutate',
          {
            mutations: [
              {
                delete: getSelection(selection),
              },
            ],
          },
          options,
        );
      },
      mutate: function mutate(mutations, options) {
        var mut =
          mutations instanceof Patch || mutations instanceof Transaction
            ? mutations.serialize()
            : mutations;
        var muts = Array.isArray(mut) ? mut : [mut];
        var transactionId = options && options.transactionId;
        return this.dataRequest(
          'mutate',
          {
            mutations: muts,
            transactionId,
          },
          options,
        );
      },
      transaction: function transaction(operations) {
        return new Transaction(operations, this);
      },
      dataRequest: function dataRequest(endpoint, body) {
        var options =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var request = this._dataRequest(endpoint, body, options);
        return this.isPromiseAPI() ? toPromise(request) : request;
      },
      _dataRequest: function _dataRequest(endpoint, body) {
        var options =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var isMutation = endpoint === 'mutate';
        var isQuery = endpoint === 'query';
        var strQuery = !isMutation && encodeQueryString(body);
        var useGet = !isMutation && strQuery.length < getQuerySizeLimit;
        var stringQuery = useGet ? strQuery : '';
        var returnFirst = options.returnFirst;
        var timeout = options.timeout,
          token = options.token,
          tag = options.tag,
          headers = options.headers;
        var uri = this.getDataUrl(endpoint, stringQuery);
        var reqOptions = {
          method: useGet ? 'GET' : 'POST',
          uri,
          json: true,
          body: useGet ? void 0 : body,
          query: isMutation && getMutationQuery(options),
          timeout,
          headers,
          token,
          tag,
          canUseCdn: isQuery,
        };
        return this._requestObservable(reqOptions).pipe(
          filter(isResponse),
          map(getBody),
          map(function (res) {
            if (!isMutation) {
              return res;
            }
            var results = res.results || [];
            if (options.returnDocuments) {
              return returnFirst
                ? results[0] && results[0].document
                : results.map(function (mut) {
                    return mut.document;
                  });
            }
            var key2 = returnFirst ? 'documentId' : 'documentIds';
            var ids = returnFirst
              ? results[0] && results[0].id
              : results.map(function (mut) {
                  return mut.id;
                });
            return _defineProperty(
              {
                transactionId: res.transactionId,
                results,
              },
              key2,
              ids,
            );
          }),
        );
      },
      _create: function _create(doc, op) {
        var options =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var mutation = _defineProperty({}, op, doc);
        var opts = assign2(
          {
            returnFirst: true,
            returnDocuments: true,
          },
          options,
        );
        return this.dataRequest(
          'mutate',
          {
            mutations: [mutation],
          },
          opts,
        );
      },
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/datasets/datasetsClient.js
var require_datasetsClient = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/datasets/datasetsClient.js'(
    exports,
    module2,
  ) {
    'use strict';
    var assign2 = require_object_assign();
    var validate = require_validators();
    function DatasetsClient(client2) {
      this.request = client2.request.bind(client2);
    }
    assign2(DatasetsClient.prototype, {
      create: function create(name, options) {
        return this._modify('PUT', name, options);
      },
      edit: function edit(name, options) {
        return this._modify('PATCH', name, options);
      },
      delete: function _delete(name) {
        return this._modify('DELETE', name);
      },
      list: function list() {
        return this.request({
          uri: '/datasets',
        });
      },
      _modify: function _modify(method, name, body) {
        validate.dataset(name);
        return this.request({
          method,
          uri: '/datasets/'.concat(name),
          body,
        });
      },
    });
    module2.exports = DatasetsClient;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/projects/projectsClient.js
var require_projectsClient = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/projects/projectsClient.js'(
    exports,
    module2,
  ) {
    'use strict';
    var assign2 = require_object_assign();
    function ProjectsClient(client2) {
      this.client = client2;
    }
    assign2(ProjectsClient.prototype, {
      list: function list() {
        return this.client.request({
          uri: '/projects',
        });
      },
      getById: function getById(id) {
        return this.client.request({
          uri: '/projects/'.concat(id),
        });
      },
    });
    module2.exports = ProjectsClient;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/queryString.js
var require_queryString = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/queryString.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = function (params) {
      var qs = [];
      for (var key2 in params) {
        if (params.hasOwnProperty(key2)) {
          qs.push(
            ''
              .concat(encodeURIComponent(key2), '=')
              .concat(encodeURIComponent(params[key2])),
          );
        }
      }
      return qs.length > 0 ? '?'.concat(qs.join('&')) : '';
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/assets/assetsClient.js
var require_assetsClient = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/assets/assetsClient.js'(
    exports,
    module2,
  ) {
    'use strict';
    function _slicedToArray(arr, i2) {
      return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i2) ||
        _unsupportedIterableToArray(arr, i2) ||
        _nonIterableRest()
      );
    }
    function _nonIterableRest() {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === 'Object' && o.constructor) n = o.constructor.name;
      if (n === 'Map' || n === 'Set') return Array.from(o);
      if (
        n === 'Arguments' ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      )
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
        arr2[i2] = arr[i2];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i2) {
      var _i =
        arr == null
          ? null
          : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
            arr['@@iterator'];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d2 = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i2 && _arr.length === i2) break;
        }
      } catch (err) {
        _d2 = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i['return'] != null) _i['return']();
        } finally {
          if (_d2) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    var assign2 = require_object_assign();
    var _require = require_observable2();
    var map = _require.map;
    var filter = _require.filter;
    var queryString = require_queryString();
    var validators = require_validators();
    function AssetsClient(client2) {
      this.client = client2;
    }
    function optionsFromFile(opts, file) {
      if (typeof window === 'undefined' || !(file instanceof window.File)) {
        return opts;
      }
      return assign2(
        {
          filename: opts.preserveFilename === false ? void 0 : file.name,
          contentType: file.type,
        },
        opts,
      );
    }
    assign2(AssetsClient.prototype, {
      upload: function upload(assetType, body) {
        var opts =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        validators.validateAssetType(assetType);
        var meta = opts.extract || void 0;
        if (meta && !meta.length) {
          meta = ['none'];
        }
        var dataset = validators.hasDataset(this.client.clientConfig);
        var assetEndpoint = assetType === 'image' ? 'images' : 'files';
        var options = optionsFromFile(opts, body);
        var tag = options.tag,
          label = options.label,
          title = options.title,
          description = options.description,
          creditLine = options.creditLine,
          filename = options.filename,
          source = options.source;
        var query = {
          label,
          title,
          description,
          filename,
          meta,
          creditLine,
        };
        if (source) {
          query.sourceId = source.id;
          query.sourceName = source.name;
          query.sourceUrl = source.url;
        }
        var observable = this.client._requestObservable({
          tag,
          method: 'POST',
          timeout: options.timeout || 0,
          uri: '/assets/'.concat(assetEndpoint, '/').concat(dataset),
          headers: options.contentType
            ? {
                'Content-Type': options.contentType,
              }
            : {},
          query,
          body,
        });
        return this.client.isPromiseAPI()
          ? observable
              .pipe(
                filter(function (event2) {
                  return event2.type === 'response';
                }),
                map(function (event2) {
                  return event2.body.document;
                }),
              )
              .toPromise()
          : observable;
      },
      delete: function _delete(type, id) {
        console.warn(
          'client.assets.delete() is deprecated, please use client.delete(<document-id>)',
        );
        var docId = id || '';
        if (!/^(image|file)-/.test(docId)) {
          docId = ''.concat(type, '-').concat(docId);
        } else if (type._id) {
          docId = type._id;
        }
        validators.hasDataset(this.client.clientConfig);
        return this.client.delete(docId);
      },
      getImageUrl: function getImageUrl(ref, query) {
        var id = ref._ref || ref;
        if (typeof id !== 'string') {
          throw new Error(
            'getImageUrl() needs either an object with a _ref, or a string with an asset document ID',
          );
        }
        if (!/^image-[A-Za-z0-9_]+-\d+x\d+-[a-z]{1,5}$/.test(id)) {
          throw new Error(
            'Unsupported asset ID "'.concat(
              id,
              '". URL generation only works for auto-generated IDs.',
            ),
          );
        }
        var _id$split = id.split('-'),
          _id$split2 = _slicedToArray(_id$split, 4),
          assetId = _id$split2[1],
          size = _id$split2[2],
          format2 = _id$split2[3];
        validators.hasDataset(this.client.clientConfig);
        var _this$client$clientCo = this.client.clientConfig,
          projectId = _this$client$clientCo.projectId,
          dataset = _this$client$clientCo.dataset;
        var qs = query ? queryString(query) : '';
        return 'https://cdn.sanity.io/images/'
          .concat(projectId, '/')
          .concat(dataset, '/')
          .concat(assetId, '-')
          .concat(size, '.')
          .concat(format2)
          .concat(qs);
      },
    });
    module2.exports = AssetsClient;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/users/usersClient.js
var require_usersClient = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/users/usersClient.js'(
    exports,
    module2,
  ) {
    'use strict';
    var assign2 = require_object_assign();
    function UsersClient(client2) {
      this.client = client2;
    }
    assign2(UsersClient.prototype, {
      getById: function getById(id) {
        return this.client.request({
          uri: '/users/'.concat(id),
        });
      },
    });
    module2.exports = UsersClient;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/auth/authClient.js
var require_authClient = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/auth/authClient.js'(
    exports,
    module2,
  ) {
    'use strict';
    var assign2 = require_object_assign();
    function AuthClient(client2) {
      this.client = client2;
    }
    assign2(AuthClient.prototype, {
      getLoginProviders: function getLoginProviders() {
        return this.client.request({
          uri: '/auth/providers',
        });
      },
      logout: function logout() {
        return this.client.request({
          uri: '/auth/logout',
          method: 'POST',
        });
      },
    });
    module2.exports = AuthClient;
  },
});

// ../../node_modules/.pnpm/nano-pubsub@1.0.2/node_modules/nano-pubsub/index.js
var require_nano_pubsub = __commonJS({
  '../../node_modules/.pnpm/nano-pubsub@1.0.2/node_modules/nano-pubsub/index.js'(
    exports,
    module2,
  ) {
    module2.exports = function Pubsub() {
      var subscribers = [];
      return {
        subscribe: subscribe2,
        publish,
      };
      function subscribe2(subscriber) {
        subscribers.push(subscriber);
        return function unsubscribe() {
          var idx = subscribers.indexOf(subscriber);
          if (idx > -1) {
            subscribers.splice(idx, 1);
          }
        };
      }
      function publish() {
        for (var i2 = 0; i2 < subscribers.length; i2++) {
          subscribers[i2].apply(null, arguments);
        }
      }
    };
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/util/middlewareReducer.js
var require_middlewareReducer = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/util/middlewareReducer.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = (middleware) => {
      const applyMiddleware = (hook, defaultValue, ...args) => {
        const bailEarly = hook === 'onError';
        let value = defaultValue;
        for (let i2 = 0; i2 < middleware[hook].length; i2++) {
          const handler = middleware[hook][i2];
          value = handler(value, ...args);
          if (bailEarly && !value) {
            break;
          }
        }
        return value;
      };
      return applyMiddleware;
    };
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/defaultOptionsProcessor.js
var require_defaultOptionsProcessor = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/defaultOptionsProcessor.js'(
    exports,
    module2,
  ) {
    'use strict';
    var objectAssign = require_object_assign();
    var urlParse = require_url_parse();
    var isReactNative =
      typeof navigator === 'undefined'
        ? false
        : navigator.product === 'ReactNative';
    var has = Object.prototype.hasOwnProperty;
    var defaultOptions = {
      timeout: isReactNative ? 6e4 : 12e4,
    };
    module2.exports = (opts) => {
      const options =
        typeof opts === 'string'
          ? objectAssign(
              {
                url: opts,
              },
              defaultOptions,
            )
          : objectAssign({}, defaultOptions, opts);
      const url = urlParse(options.url, {}, true);
      options.timeout = normalizeTimeout(options.timeout);
      if (options.query) {
        url.query = objectAssign({}, url.query, removeUndefined(options.query));
      }
      options.method =
        options.body && !options.method
          ? 'POST'
          : (options.method || 'GET').toUpperCase();
      options.url = url.toString(stringifyQueryString);
      return options;
    };
    function stringifyQueryString(obj) {
      const pairs = [];
      for (const key2 in obj) {
        if (has.call(obj, key2)) {
          push(key2, obj[key2]);
        }
      }
      return pairs.length ? pairs.join('&') : '';
      function push(key2, val) {
        if (Array.isArray(val)) {
          val.forEach((item) => push(key2, item));
        } else {
          pairs.push([key2, val].map(encodeURIComponent).join('='));
        }
      }
    }
    function normalizeTimeout(time) {
      if (time === false || time === 0) {
        return false;
      }
      if (time.connect || time.socket) {
        return time;
      }
      const delay = Number(time);
      if (isNaN(delay)) {
        return normalizeTimeout(defaultOptions.timeout);
      }
      return {
        connect: delay,
        socket: delay,
      };
    }
    function removeUndefined(obj) {
      const target = {};
      for (const key2 in obj) {
        if (obj[key2] !== void 0) {
          target[key2] = obj[key2];
        }
      }
      return target;
    }
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/defaultOptionsValidator.js
var require_defaultOptionsValidator = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/defaultOptionsValidator.js'(
    exports,
    module2,
  ) {
    'use strict';
    var validUrl = /^https?:\/\//i;
    module2.exports = (options) => {
      if (!validUrl.test(options.url)) {
        throw new Error(`"${options.url}" is not a valid URL`);
      }
    };
  },
});

// ../../node_modules/.pnpm/simple-concat@1.0.1/node_modules/simple-concat/index.js
var require_simple_concat = __commonJS({
  '../../node_modules/.pnpm/simple-concat@1.0.1/node_modules/simple-concat/index.js'(
    exports,
    module2,
  ) {
    module2.exports = function (stream, cb) {
      var chunks = [];
      stream.on('data', function (chunk) {
        chunks.push(chunk);
      });
      stream.once('end', function () {
        if (cb) cb(null, Buffer.concat(chunks));
        cb = null;
      });
      stream.once('error', function (err) {
        if (cb) cb(err);
        cb = null;
      });
    };
  },
});

// ../../node_modules/.pnpm/ms@2.0.0/node_modules/ms/index.js
var require_ms = __commonJS({
  '../../node_modules/.pnpm/ms@2.0.0/node_modules/ms/index.js'(
    exports,
    module2,
  ) {
    var s3 = 1e3;
    var m2 = s3 * 60;
    var h2 = m2 * 60;
    var d = h2 * 24;
    var y = d * 365.25;
    module2.exports = function (val, options) {
      options = options || {};
      var type = typeof val;
      if (type === 'string' && val.length > 0) {
        return parse2(val);
      } else if (type === 'number' && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        'val is not a non-empty string or a valid number. val=' +
          JSON.stringify(val),
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match =
        /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
          str,
        );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || 'ms').toLowerCase();
      switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
          return n * y;
        case 'days':
        case 'day':
        case 'd':
          return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
          return n * h2;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
          return n * m2;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
          return n * s3;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + 'd';
      }
      if (ms >= h2) {
        return Math.round(ms / h2) + 'h';
      }
      if (ms >= m2) {
        return Math.round(ms / m2) + 'm';
      }
      if (ms >= s3) {
        return Math.round(ms / s3) + 's';
      }
      return ms + 'ms';
    }
    function fmtLong(ms) {
      return (
        plural(ms, d, 'day') ||
        plural(ms, h2, 'hour') ||
        plural(ms, m2, 'minute') ||
        plural(ms, s3, 'second') ||
        ms + ' ms'
      );
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + ' ' + name;
      }
      return Math.ceil(ms / n) + ' ' + name + 's';
    }
  },
});

// ../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/debug.js
var require_debug = __commonJS({
  '../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/debug.js'(
    exports,
    module2,
  ) {
    exports =
      module2.exports =
      createDebug.debug =
      createDebug['default'] =
        createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms();
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash2 = 0,
        i2;
      for (i2 in namespace) {
        hash2 = (hash2 << 5) - hash2 + namespace.charCodeAt(i2);
        hash2 |= 0;
      }
      return exports.colors[Math.abs(hash2) % exports.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled) return;
        var self2 = debug;
        var curr = +new Date();
        var ms = curr - (prevTime || curr);
        self2.diff = ms;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i2 = 0; i2 < args.length; i2++) {
          args[i2] = arguments[i2];
        }
        args[0] = exports.coerce(args[0]);
        if (typeof args[0] !== 'string') {
          args.unshift('%O');
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format2) {
          if (match === '%%') return match;
          index++;
          var formatter = exports.formatters[format2];
          if (typeof formatter === 'function') {
            var val = args[index];
            match = formatter.call(self2, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self2, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self2, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      if (typeof exports.init === 'function') {
        exports.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === 'string' ? namespaces : '').split(
        /[\s,]+/,
      );
      var len = split.length;
      for (var i2 = 0; i2 < len; i2++) {
        if (!split[i2]) continue;
        namespaces = split[i2].replace(/\*/g, '.*?');
        if (namespaces[0] === '-') {
          exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
        } else {
          exports.names.push(new RegExp('^' + namespaces + '$'));
        }
      }
    }
    function disable() {
      exports.enable('');
    }
    function enabled(name) {
      var i2, len;
      for (i2 = 0, len = exports.skips.length; i2 < len; i2++) {
        if (exports.skips[i2].test(name)) {
          return false;
        }
      }
      for (i2 = 0, len = exports.names.length; i2 < len; i2++) {
        if (exports.names[i2].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  },
});

// ../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  '../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/browser.js'(
    exports,
    module2,
  ) {
    exports = module2.exports = require_debug();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load2;
    exports.useColors = useColors;
    exports.storage =
      typeof chrome != 'undefined' && typeof chrome.storage != 'undefined'
        ? chrome.storage.local
        : localstorage();
    exports.colors = [
      'lightseagreen',
      'forestgreen',
      'goldenrod',
      'dodgerblue',
      'darkorchid',
      'crimson',
    ];
    function useColors() {
      if (
        typeof window !== 'undefined' &&
        window.process &&
        window.process.type === 'renderer'
      ) {
        return true;
      }
      return (
        (typeof document !== 'undefined' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window !== 'undefined' &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator !== 'undefined' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator !== 'undefined' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      );
    }
    exports.formatters.j = function (v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return '[UnexpectedJSONParseError]: ' + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] =
        (useColors2 ? '%c' : '') +
        this.namespace +
        (useColors2 ? ' %c' : ' ') +
        args[0] +
        (useColors2 ? '%c ' : ' ') +
        '+' +
        exports.humanize(this.diff);
      if (!useColors2) return;
      var c = 'color: ' + this.color;
      args.splice(1, 0, c, 'color: inherit');
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function (match) {
        if (match === '%%') return;
        index++;
        if (match === '%c') {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return (
        typeof console === 'object' &&
        console.log &&
        Function.prototype.apply.call(console.log, console, arguments)
      );
    }
    function save(namespaces) {
      try {
        if (namespaces == null) {
          exports.storage.removeItem('debug');
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e2) {}
    }
    function load2() {
      var r2;
      try {
        r2 = exports.storage.debug;
      } catch (e2) {}
      if (!r2 && typeof process !== 'undefined' && 'env' in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    exports.enable(load2());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e2) {}
    }
  },
});

// ../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/node.js
var require_node2 = __commonJS({
  '../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/node.js'(
    exports,
    module2,
  ) {
    var tty = require('tty');
    var util = require('util');
    exports = module2.exports = require_debug();
    exports.init = init2;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load2;
    exports.useColors = useColors;
    exports.colors = [6, 2, 3, 4, 5, 1];
    exports.inspectOpts = Object.keys(process.env)
      .filter(function (key2) {
        return /^debug_/i.test(key2);
      })
      .reduce(function (obj, key2) {
        var prop = key2
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, function (_, k) {
            return k.toUpperCase();
          });
        var val = process.env[key2];
        if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
        else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
        else if (val === 'null') val = null;
        else val = Number(val);
        obj[prop] = val;
        return obj;
      }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (fd !== 1 && fd !== 2) {
      util.deprecate(function () {},
      'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')();
    }
    var stream =
      fd === 1
        ? process.stdout
        : fd === 2
        ? process.stderr
        : createWritableStdioStream(fd);
    function useColors() {
      return 'colors' in exports.inspectOpts
        ? Boolean(exports.inspectOpts.colors)
        : tty.isatty(fd);
    }
    exports.formatters.o = function (v) {
      this.inspectOpts.colors = this.useColors;
      return util
        .inspect(v, this.inspectOpts)
        .split('\n')
        .map(function (str) {
          return str.trim();
        })
        .join(' ');
    };
    exports.formatters.O = function (v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var prefix = '  \x1B[3' + c + ';1m' + name + ' \x1B[0m';
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push(
          '\x1B[3' + c + 'm+' + exports.humanize(this.diff) + '\x1B[0m',
        );
      } else {
        args[0] = new Date().toUTCString() + ' ' + name + ' ' + args[0];
      }
    }
    function log() {
      return stream.write(util.format.apply(util, arguments) + '\n');
    }
    function save(namespaces) {
      if (namespaces == null) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load2() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding('tty_wrap');
      switch (tty_wrap.guessHandleType(fd2)) {
        case 'TTY':
          stream2 = new tty.WriteStream(fd2);
          stream2._type = 'tty';
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case 'FILE':
          var fs = require('fs');
          stream2 = new fs.SyncWriteStream(fd2, { autoClose: false });
          stream2._type = 'fs';
          break;
        case 'PIPE':
        case 'TCP':
          var net = require('net');
          stream2 = new net.Socket({
            fd: fd2,
            readable: false,
            writable: true,
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = 'pipe';
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error('Implement me. Unknown stream file type!');
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init2(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports.inspectOpts);
      for (var i2 = 0; i2 < keys.length; i2++) {
        debug.inspectOpts[keys[i2]] = exports.inspectOpts[keys[i2]];
      }
    }
    exports.enable(load2());
  },
});

// ../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/index.js
var require_src = __commonJS({
  '../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/index.js'(
    exports,
    module2,
  ) {
    if (typeof process !== 'undefined' && process.type === 'renderer') {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node2();
    }
  },
});

// ../../node_modules/.pnpm/follow-redirects@1.14.9_debug@2.6.9/node_modules/follow-redirects/debug.js
var require_debug2 = __commonJS({
  '../../node_modules/.pnpm/follow-redirects@1.14.9_debug@2.6.9/node_modules/follow-redirects/debug.js'(
    exports,
    module2,
  ) {
    var debug;
    module2.exports = function () {
      if (!debug) {
        try {
          debug = require_src()('follow-redirects');
        } catch (error2) {}
        if (typeof debug !== 'function') {
          debug = function () {};
        }
      }
      debug.apply(null, arguments);
    };
  },
});

// ../../node_modules/.pnpm/follow-redirects@1.14.9_debug@2.6.9/node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  '../../node_modules/.pnpm/follow-redirects@1.14.9_debug@2.6.9/node_modules/follow-redirects/index.js'(
    exports,
    module2,
  ) {
    var url = require('url');
    var URL2 = url.URL;
    var http2 = require('http');
    var https2 = require('https');
    var Writable = require('stream').Writable;
    var assert = require('assert');
    var debug = require_debug2();
    var events = ['abort', 'aborted', 'connect', 'error', 'socket', 'timeout'];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function (event2) {
      eventHandlers[event2] = function (arg1, arg2, arg3) {
        this._redirectable.emit(event2, arg1, arg2, arg3);
      };
    });
    var RedirectionError = createErrorType(
      'ERR_FR_REDIRECTION_FAILURE',
      'Redirected request failed',
    );
    var TooManyRedirectsError = createErrorType(
      'ERR_FR_TOO_MANY_REDIRECTS',
      'Maximum number of redirects exceeded',
    );
    var MaxBodyLengthExceededError = createErrorType(
      'ERR_FR_MAX_BODY_LENGTH_EXCEEDED',
      'Request body larger than maxBodyLength limit',
    );
    var WriteAfterEndError = createErrorType(
      'ERR_STREAM_WRITE_AFTER_END',
      'write after end',
    );
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on('response', responseCallback);
      }
      var self2 = this;
      this._onNativeResponse = function (response) {
        self2._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function () {
      abortRequest(this._currentRequest);
      this.emit('abort');
    };
    RedirectableRequest.prototype.write = function (data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (
        !(
          typeof data === 'string' ||
          (typeof data === 'object' && 'length' in data)
        )
      ) {
        throw new TypeError('data should be a string, Buffer or Uint8Array');
      }
      if (typeof encoding === 'function') {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (
        this._requestBodyLength + data.length <=
        this._options.maxBodyLength
      ) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit('error', new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function (data, encoding, callback) {
      if (typeof data === 'function') {
        callback = data;
        data = encoding = null;
      } else if (typeof encoding === 'function') {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self2 = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function () {
          self2._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function (name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function (name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
      var self2 = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener('timeout', socket.destroy);
        socket.addListener('timeout', socket.destroy);
      }
      function startTimer(socket) {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
        }
        self2._timeout = setTimeout(function () {
          self2.emit('timeout');
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
          self2._timeout = null;
        }
        self2.removeListener('abort', clearTimer);
        self2.removeListener('error', clearTimer);
        self2.removeListener('response', clearTimer);
        if (callback) {
          self2.removeListener('timeout', callback);
        }
        if (!self2.socket) {
          self2._currentRequest.removeListener('socket', startTimer);
        }
      }
      if (callback) {
        this.on('timeout', callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once('socket', startTimer);
      }
      this.on('socket', destroyOnTimeout);
      this.on('abort', clearTimer);
      this.on('error', clearTimer);
      this.on('response', clearTimer);
      return this;
    };
    ['flushHeaders', 'getHeader', 'setNoDelay', 'setSocketKeepAlive'].forEach(
      function (method) {
        RedirectableRequest.prototype[method] = function (a, b) {
          return this._currentRequest[method](a, b);
        };
      },
    );
    ['aborted', 'connection', 'socket'].forEach(function (property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function () {
          return this._currentRequest[property];
        },
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function (options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf('?');
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function () {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit('error', new TypeError('Unsupported protocol ' + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme2 = protocol.substr(0, protocol.length - 1);
        this._options.agent = this._options.agents[scheme2];
      }
      var request = (this._currentRequest = nativeProtocol.request(
        this._options,
        this._onNativeResponse,
      ));
      this._currentUrl = url.format(this._options);
      request._redirectable = this;
      for (var e2 = 0; e2 < events.length; e2++) {
        request.on(events[e2], eventHandlers[events[e2]]);
      }
      if (this._isRedirect) {
        var i2 = 0;
        var self2 = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error2) {
          if (request === self2._currentRequest) {
            if (error2) {
              self2.emit('error', error2);
            } else if (i2 < buffers.length) {
              var buffer = buffers[i2++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self2._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function (response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode,
        });
      }
      var location = response.headers.location;
      if (
        !location ||
        this._options.followRedirects === false ||
        statusCode < 300 ||
        statusCode >= 400
      ) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit('response', response);
        this._requestBodyBuffers = [];
        return;
      }
      abortRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit('error', new TooManyRedirectsError());
        return;
      }
      if (
        ((statusCode === 301 || statusCode === 302) &&
          this._options.method === 'POST') ||
        (statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method))
      ) {
        this._options.method = 'GET';
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(
        /^host$/i,
        this._options.headers,
      );
      var currentUrlParts = url.parse(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location)
        ? this._currentUrl
        : url.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl;
      try {
        redirectUrl = url.resolve(currentUrl, location);
      } catch (cause) {
        this.emit('error', new RedirectionError(cause));
        return;
      }
      debug('redirecting to', redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);
      if (
        (redirectUrlParts.protocol !== currentUrlParts.protocol &&
          redirectUrlParts.protocol !== 'https:') ||
        (redirectUrlParts.host !== currentHost &&
          !isSubdomain(redirectUrlParts.host, currentHost))
      ) {
        removeMatchingHeaders(
          /^(?:authorization|cookie)$/i,
          this._options.headers,
        );
      }
      if (typeof this._options.beforeRedirect === 'function') {
        var responseDetails = { headers: response.headers };
        try {
          this._options.beforeRedirect.call(
            null,
            this._options,
            responseDetails,
          );
        } catch (err) {
          this.emit('error', err);
          return;
        }
        this._sanitizeOptions(this._options);
      }
      try {
        this._performRequest();
      } catch (cause) {
        this.emit('error', new RedirectionError(cause));
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024,
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function (scheme2) {
        var protocol = scheme2 + ':';
        var nativeProtocol = (nativeProtocols[protocol] = protocols[scheme2]);
        var wrappedProtocol = (exports2[scheme2] =
          Object.create(nativeProtocol));
        function request(input, options, callback) {
          if (typeof input === 'string') {
            var urlStr = input;
            try {
              input = urlToOptions(new URL2(urlStr));
            } catch (err) {
              input = url.parse(urlStr);
            }
          } else if (URL2 && input instanceof URL2) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (typeof options === 'function') {
            callback = options;
            options = null;
          }
          options = Object.assign(
            {
              maxRedirects: exports2.maxRedirects,
              maxBodyLength: exports2.maxBodyLength,
            },
            input,
            options,
          );
          options.nativeProtocols = nativeProtocols;
          assert.equal(options.protocol, protocol, 'protocol mismatch');
          debug('options', options);
          return new RedirectableRequest(options, callback);
        }
        function get3(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(
            input,
            options,
            callback,
          );
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: {
            value: request,
            configurable: true,
            enumerable: true,
            writable: true,
          },
          get: {
            value: get3,
            configurable: true,
            enumerable: true,
            writable: true,
          },
        });
      });
      return exports2;
    }
    function noop4() {}
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith('[')
          ? urlObject.hostname.slice(1, -1)
          : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href,
      };
      if (urlObject.port !== '') {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === 'undefined'
        ? void 0
        : String(lastValue).trim();
    }
    function createErrorType(code, defaultMessage) {
      function CustomError(cause) {
        Error.captureStackTrace(this, this.constructor);
        if (!cause) {
          this.message = defaultMessage;
        } else {
          this.message = defaultMessage + ': ' + cause.message;
          this.cause = cause;
        }
      }
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = 'Error [' + code + ']';
      CustomError.prototype.code = code;
      return CustomError;
    }
    function abortRequest(request) {
      for (var e2 = 0; e2 < events.length; e2++) {
        request.removeListener(events[e2], eventHandlers[events[e2]]);
      }
      request.on('error', noop4);
      request.abort();
    }
    function isSubdomain(subdomain, domain) {
      const dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === '.' && subdomain.endsWith(domain);
    }
    module2.exports = wrap({ http: http2, https: https2 });
    module2.exports.wrap = wrap;
  },
});

// ../../node_modules/.pnpm/@sanity+timed-out@4.0.2/node_modules/@sanity/timed-out/index.js
var require_timed_out = __commonJS({
  '../../node_modules/.pnpm/@sanity+timed-out@4.0.2/node_modules/@sanity/timed-out/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = function (req, time) {
      if (req.timeoutTimer) {
        return req;
      }
      var delays = isNaN(time) ? time : { socket: time, connect: time };
      var hostHeader = req.getHeader('host');
      var host = hostHeader ? ' to ' + hostHeader : '';
      if (delays.connect !== void 0) {
        req.timeoutTimer = setTimeout(function timeoutHandler() {
          req.abort();
          var e2 = new Error('Connection timed out on request' + host);
          e2.code = 'ETIMEDOUT';
          req.emit('error', e2);
        }, delays.connect);
      }
      req.on('socket', function assign2(socket) {
        if (!(socket.connecting || socket._connecting)) {
          connect();
          return;
        }
        socket.once('connect', connect);
      });
      function clear() {
        if (req.timeoutTimer) {
          clearTimeout(req.timeoutTimer);
          req.timeoutTimer = null;
        }
      }
      function connect() {
        clear();
        if (delays.socket !== void 0) {
          req.setTimeout(delays.socket, function socketTimeoutHandler() {
            req.abort();
            var e2 = new Error('Socket timed out on request' + host);
            e2.code = 'ESOCKETTIMEDOUT';
            req.emit('error', e2);
          });
        }
      }
      return req.on('error', clear);
    };
  },
});

// ../../node_modules/.pnpm/is-stream@1.1.0/node_modules/is-stream/index.js
var require_is_stream = __commonJS({
  '../../node_modules/.pnpm/is-stream@1.1.0/node_modules/is-stream/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var isStream = (module2.exports = function (stream) {
      return (
        stream !== null &&
        typeof stream === 'object' &&
        typeof stream.pipe === 'function'
      );
    });
    isStream.writable = function (stream) {
      return (
        isStream(stream) &&
        stream.writable !== false &&
        typeof stream._write === 'function' &&
        typeof stream._writableState === 'object'
      );
    };
    isStream.readable = function (stream) {
      return (
        isStream(stream) &&
        stream.readable !== false &&
        typeof stream._read === 'function' &&
        typeof stream._readableState === 'object'
      );
    };
    isStream.duplex = function (stream) {
      return isStream.writable(stream) && isStream.readable(stream);
    };
    isStream.transform = function (stream) {
      return (
        isStream.duplex(stream) &&
        typeof stream._transform === 'function' &&
        typeof stream._transformState === 'object'
      );
    };
  },
});

// ../../node_modules/.pnpm/process-nextick-args@2.0.1/node_modules/process-nextick-args/index.js
var require_process_nextick_args = __commonJS({
  '../../node_modules/.pnpm/process-nextick-args@2.0.1/node_modules/process-nextick-args/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    if (
      typeof process === 'undefined' ||
      !process.version ||
      process.version.indexOf('v0.') === 0 ||
      (process.version.indexOf('v1.') === 0 &&
        process.version.indexOf('v1.8.') !== 0)
    ) {
      module2.exports = { nextTick };
    } else {
      module2.exports = process;
    }
    function nextTick(fn, arg1, arg2, arg3) {
      if (typeof fn !== 'function') {
        throw new TypeError('"callback" argument must be a function');
      }
      var len = arguments.length;
      var args, i2;
      switch (len) {
        case 0:
        case 1:
          return process.nextTick(fn);
        case 2:
          return process.nextTick(function afterTickOne() {
            fn.call(null, arg1);
          });
        case 3:
          return process.nextTick(function afterTickTwo() {
            fn.call(null, arg1, arg2);
          });
        case 4:
          return process.nextTick(function afterTickThree() {
            fn.call(null, arg1, arg2, arg3);
          });
        default:
          args = new Array(len - 1);
          i2 = 0;
          while (i2 < args.length) {
            args[i2++] = arguments[i2];
          }
          return process.nextTick(function afterTick() {
            fn.apply(null, args);
          });
      }
    }
  },
});

// ../../node_modules/.pnpm/isarray@1.0.0/node_modules/isarray/index.js
var require_isarray = __commonJS({
  '../../node_modules/.pnpm/isarray@1.0.0/node_modules/isarray/index.js'(
    exports,
    module2,
  ) {
    var toString = {}.toString;
    module2.exports =
      Array.isArray ||
      function (arr) {
        return toString.call(arr) == '[object Array]';
      };
  },
});

// ../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = __commonJS({
  '../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/internal/streams/stream.js'(
    exports,
    module2,
  ) {
    module2.exports = require('stream');
  },
});

// ../../node_modules/.pnpm/safe-buffer@5.1.2/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  '../../node_modules/.pnpm/safe-buffer@5.1.2/node_modules/safe-buffer/index.js'(
    exports,
    module2,
  ) {
    var buffer = require('buffer');
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key2 in src) {
        dst[key2] = src[key2];
      }
    }
    if (
      Buffer2.from &&
      Buffer2.alloc &&
      Buffer2.allocUnsafe &&
      Buffer2.allocUnsafeSlow
    ) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function (arg, encodingOrOffset, length) {
      if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function (size, fill, encoding) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === 'string') {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
      }
      return buffer.SlowBuffer(size);
    };
  },
});

// ../../node_modules/.pnpm/core-util-is@1.0.3/node_modules/core-util-is/lib/util.js
var require_util = __commonJS({
  '../../node_modules/.pnpm/core-util-is@1.0.3/node_modules/core-util-is/lib/util.js'(
    exports,
  ) {
    function isArray(arg) {
      if (Array.isArray) {
        return Array.isArray(arg);
      }
      return objectToString(arg) === '[object Array]';
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === 'number';
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === 'string';
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === 'symbol';
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return objectToString(re) === '[object RegExp]';
    }
    exports.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }
    exports.isObject = isObject;
    function isDate2(d) {
      return objectToString(d) === '[object Date]';
    }
    exports.isDate = isDate2;
    function isError(e2) {
      return objectToString(e2) === '[object Error]' || e2 instanceof Error;
    }
    exports.isError = isError;
    function isFunction(arg) {
      return typeof arg === 'function';
    }
    exports.isFunction = isFunction;
    function isPrimitive2(arg) {
      return (
        arg === null ||
        typeof arg === 'boolean' ||
        typeof arg === 'number' ||
        typeof arg === 'string' ||
        typeof arg === 'symbol' ||
        typeof arg === 'undefined'
      );
    }
    exports.isPrimitive = isPrimitive2;
    exports.isBuffer = require('buffer').Buffer.isBuffer;
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
  },
});

// ../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  '../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js'(
    exports,
    module2,
  ) {
    if (typeof Object.create === 'function') {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true,
            },
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function () {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  },
});

// ../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  '../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js'(
    exports,
    module2,
  ) {
    try {
      util = require('util');
      if (typeof util.inherits !== 'function') throw '';
      module2.exports = util.inherits;
    } catch (e2) {
      module2.exports = require_inherits_browser();
    }
    var util;
  },
});

// ../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/internal/streams/BufferList.js
var require_BufferList = __commonJS({
  '../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/internal/streams/BufferList.js'(
    exports,
    module2,
  ) {
    'use strict';
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Buffer2 = require_safe_buffer().Buffer;
    var util = require('util');
    function copyBuffer(src, target, offset) {
      src.copy(target, offset);
    }
    module2.exports = (function () {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      BufferList.prototype.push = function push(v) {
        var entry5 = { data: v, next: null };
        if (this.length > 0) this.tail.next = entry5;
        else this.head = entry5;
        this.tail = entry5;
        ++this.length;
      };
      BufferList.prototype.unshift = function unshift(v) {
        var entry5 = { data: v, next: this.head };
        if (this.length === 0) this.tail = entry5;
        this.head = entry5;
        ++this.length;
      };
      BufferList.prototype.shift = function shift() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList.prototype.join = function join(s3) {
        if (this.length === 0) return '';
        var p = this.head;
        var ret = '' + p.data;
        while ((p = p.next)) {
          ret += s3 + p.data;
        }
        return ret;
      };
      BufferList.prototype.concat = function concat(n) {
        if (this.length === 0) return Buffer2.alloc(0);
        if (this.length === 1) return this.head.data;
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i2 = 0;
        while (p) {
          copyBuffer(p.data, ret, i2);
          i2 += p.data.length;
          p = p.next;
        }
        return ret;
      };
      return BufferList;
    })();
    if (util && util.inspect && util.inspect.custom) {
      module2.exports.prototype[util.inspect.custom] = function () {
        var obj = util.inspect({ length: this.length });
        return this.constructor.name + ' ' + obj;
      };
    }
  },
});

// ../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  '../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/internal/streams/destroy.js'(
    exports,
    module2,
  ) {
    'use strict';
    var pna = require_process_nextick_args();
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed =
        this._readableState && this._readableState.destroyed;
      var writableDestroyed =
        this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (
          err &&
          (!this._writableState || !this._writableState.errorEmitted)
        ) {
          pna.nextTick(emitErrorNT, this, err);
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function (err2) {
        if (!cb && err2) {
          pna.nextTick(emitErrorNT, _this, err2);
          if (_this._writableState) {
            _this._writableState.errorEmitted = true;
          }
        } else if (cb) {
          cb(err2);
        }
      });
      return this;
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit('error', err);
    }
    module2.exports = {
      destroy,
      undestroy,
    };
  },
});

// ../../node_modules/.pnpm/util-deprecate@1.0.2/node_modules/util-deprecate/node.js
var require_node3 = __commonJS({
  '../../node_modules/.pnpm/util-deprecate@1.0.2/node_modules/util-deprecate/node.js'(
    exports,
    module2,
  ) {
    module2.exports = require('util').deprecate;
  },
});

// ../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  '../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_writable.js'(
    exports,
    module2,
  ) {
    'use strict';
    var pna = require_process_nextick_args();
    module2.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function () {
        onCorkedFinish(_this, state);
      };
    }
    var asyncWrite =
      !process.browser &&
      ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1
        ? setImmediate
        : pna.nextTick;
    var Duplex;
    Writable.WritableState = WritableState;
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    var internalUtil = {
      deprecate: require_node3(),
    };
    var Stream2 = require_stream();
    var Buffer2 = require_safe_buffer().Buffer;
    var OurUint8Array = global.Uint8Array || function () {};
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    util.inherits(Writable, Stream2);
    function nop() {}
    function WritableState(options, stream) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      var isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      var hwm = options.highWaterMark;
      var writableHwm = options.writableHighWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      if (hwm || hwm === 0) this.highWaterMark = hwm;
      else if (isDuplex && (writableHwm || writableHwm === 0))
        this.highWaterMark = writableHwm;
      else this.highWaterMark = defaultHwm;
      this.highWaterMark = Math.floor(this.highWaterMark);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || 'utf8';
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function (er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function () {
      try {
        Object.defineProperty(WritableState.prototype, 'buffer', {
          get: internalUtil.deprecate(
            function () {
              return this.getBuffer();
            },
            '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.',
            'DEP0003',
          ),
        });
      } catch (_) {}
    })();
    var realHasInstance;
    if (
      typeof Symbol === 'function' &&
      Symbol.hasInstance &&
      typeof Function.prototype[Symbol.hasInstance] === 'function'
    ) {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function (object) {
          if (realHasInstance.call(this, object)) return true;
          if (this !== Writable) return false;
          return object && object._writableState instanceof WritableState;
        },
      });
    } else {
      realHasInstance = function (object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
        return new Writable(options);
      }
      this._writableState = new WritableState(options, this);
      this.writable = true;
      if (options) {
        if (typeof options.write === 'function') this._write = options.write;
        if (typeof options.writev === 'function') this._writev = options.writev;
        if (typeof options.destroy === 'function')
          this._destroy = options.destroy;
        if (typeof options.final === 'function') this._final = options.final;
      }
      Stream2.call(this);
    }
    Writable.prototype.pipe = function () {
      this.emit('error', new Error('Cannot pipe, not readable'));
    };
    function writeAfterEnd(stream, cb) {
      var er = new Error('write after end');
      stream.emit('error', er);
      pna.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var valid = true;
      var er = false;
      if (chunk === null) {
        er = new TypeError('May not write null values to stream');
      } else if (
        typeof chunk !== 'string' &&
        chunk !== void 0 &&
        !state.objectMode
      ) {
        er = new TypeError('Invalid non-string/buffer chunk');
      }
      if (er) {
        stream.emit('error', er);
        pna.nextTick(cb, er);
        valid = false;
      }
      return valid;
    }
    Writable.prototype.write = function (chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer2.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }
      if (isBuf) encoding = 'buffer';
      else if (!encoding) encoding = state.defaultEncoding;
      if (typeof cb !== 'function') cb = nop;
      if (state.ended) writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function () {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function () {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (
          !state.writing &&
          !state.corked &&
          !state.finished &&
          !state.bufferProcessing &&
          state.bufferedRequest
        )
          clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(
      encoding,
    ) {
      if (typeof encoding === 'string') encoding = encoding.toLowerCase();
      if (
        !(
          [
            'hex',
            'utf8',
            'utf-8',
            'ascii',
            'binary',
            'base64',
            'ucs2',
            'ucs-2',
            'utf16le',
            'utf-16le',
            'raw',
          ].indexOf((encoding + '').toLowerCase()) > -1
        )
      )
        throw new TypeError('Unknown encoding: ' + encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    function decodeChunk(state, chunk, encoding) {
      if (
        !state.objectMode &&
        state.decodeStrings !== false &&
        typeof chunk === 'string'
      ) {
        chunk = Buffer2.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
      enumerable: false,
      get: function () {
        return this._writableState.highWaterMark;
      },
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = 'buffer';
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret) state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null,
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (writev) stream._writev(chunk, state.onwrite);
      else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        pna.nextTick(cb, er);
        pna.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        stream.emit('error', er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        stream.emit('error', er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      onwriteStateUpdate(state);
      if (er) onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state);
        if (
          !finished &&
          !state.corked &&
          !state.bufferProcessing &&
          state.bufferedRequest
        ) {
          clearBuffer(stream, state);
        }
        if (sync) {
          asyncWrite(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished) onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit('drain');
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry5 = state.bufferedRequest;
      if (stream._writev && entry5 && entry5.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry5;
        var count = 0;
        var allBuffers = true;
        while (entry5) {
          buffer[count] = entry5;
          if (!entry5.isBuf) allBuffers = false;
          entry5 = entry5.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, '', holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry5) {
          var chunk = entry5.chunk;
          var encoding = entry5.encoding;
          var cb = entry5.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry5 = entry5.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry5 === null) state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry5;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function (chunk, encoding, cb) {
      cb(new Error('_write() is not implemented'));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function (chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === 'function') {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending && !state.finished) endWritable(this, state, cb);
    };
    function needFinish(state) {
      return (
        state.ending &&
        state.length === 0 &&
        state.bufferedRequest === null &&
        !state.finished &&
        !state.writing
      );
    }
    function callFinal(stream, state) {
      stream._final(function (err) {
        state.pendingcb--;
        if (err) {
          stream.emit('error', err);
        }
        state.prefinished = true;
        stream.emit('prefinish');
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === 'function') {
          state.pendingcb++;
          state.finalCalled = true;
          pna.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit('prefinish');
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit('finish');
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished) pna.nextTick(cb);
        else stream.once('finish', cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry5 = corkReq.entry;
      corkReq.entry = null;
      while (entry5) {
        var cb = entry5.callback;
        state.pendingcb--;
        cb(err);
        entry5 = entry5.next;
      }
      if (state.corkedRequestsFree) {
        state.corkedRequestsFree.next = corkReq;
      } else {
        state.corkedRequestsFree = corkReq;
      }
    }
    Object.defineProperty(Writable.prototype, 'destroyed', {
      get: function () {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function (value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      },
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function (err, cb) {
      this.end();
      cb(err);
    };
  },
});

// ../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  '../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_duplex.js'(
    exports,
    module2,
  ) {
    'use strict';
    var pna = require_process_nextick_args();
    var objectKeys =
      Object.keys ||
      function (obj) {
        var keys2 = [];
        for (var key2 in obj) {
          keys2.push(key2);
        }
        return keys2;
      };
    module2.exports = Duplex;
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    var Readable2 = require_stream_readable();
    var Writable = require_stream_writable();
    util.inherits(Duplex, Readable2);
    {
      keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method])
          Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable2.call(this, options);
      Writable.call(this, options);
      if (options && options.readable === false) this.readable = false;
      if (options && options.writable === false) this.writable = false;
      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false)
        this.allowHalfOpen = false;
      this.once('end', onend);
    }
    Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
      enumerable: false,
      get: function () {
        return this._writableState.highWaterMark;
      },
    });
    function onend() {
      if (this.allowHalfOpen || this._writableState.ended) return;
      pna.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex.prototype, 'destroyed', {
      get: function () {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function (value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      },
    });
    Duplex.prototype._destroy = function (err, cb) {
      this.push(null);
      this.end();
      pna.nextTick(cb, err);
    };
  },
});

// ../../node_modules/.pnpm/string_decoder@1.1.1/node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  '../../node_modules/.pnpm/string_decoder@1.1.1/node_modules/string_decoder/lib/string_decoder.js'(
    exports,
  ) {
    'use strict';
    var Buffer2 = require_safe_buffer().Buffer;
    var isEncoding =
      Buffer2.isEncoding ||
      function (encoding) {
        encoding = '' + encoding;
        switch (encoding && encoding.toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
          case 'raw':
            return true;
          default:
            return false;
        }
      };
    function _normalizeEncoding(enc) {
      if (!enc) return 'utf8';
      var retried;
      while (true) {
        switch (enc) {
          case 'utf8':
          case 'utf-8':
            return 'utf8';
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return 'utf16le';
          case 'latin1':
          case 'binary':
            return 'latin1';
          case 'base64':
          case 'ascii':
          case 'hex':
            return enc;
          default:
            if (retried) return;
            enc = ('' + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (
        typeof nenc !== 'string' &&
        (Buffer2.isEncoding === isEncoding || !isEncoding(enc))
      )
        throw new Error('Unknown encoding: ' + enc);
      return nenc || enc;
    }
    exports.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case 'utf16le':
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case 'utf8':
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case 'base64':
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer2.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function (buf) {
      if (buf.length === 0) return '';
      var r2;
      var i2;
      if (this.lastNeed) {
        r2 = this.fillLast(buf);
        if (r2 === void 0) return '';
        i2 = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i2 = 0;
      }
      if (i2 < buf.length)
        return r2 ? r2 + this.text(buf, i2) : this.text(buf, i2);
      return r2 || '';
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function (buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(
          this.lastChar,
          this.lastTotal - this.lastNeed,
          0,
          this.lastNeed,
        );
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127) return 0;
      else if (byte >> 5 === 6) return 2;
      else if (byte >> 4 === 14) return 3;
      else if (byte >> 3 === 30) return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i2) {
      var j = buf.length - 1;
      if (j < i2) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i2 || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i2 || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;
          else self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return '\uFFFD';
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return '\uFFFD';
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return '\uFFFD';
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r2 = utf8CheckExtraBytes(this, buf, p);
      if (r2 !== void 0) return r2;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i2) {
      var total = utf8CheckIncomplete(this, buf, i2);
      if (!this.lastNeed) return buf.toString('utf8', i2);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString('utf8', i2, end);
    }
    function utf8End(buf) {
      var r2 = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) return r2 + '\uFFFD';
      return r2;
    }
    function utf16Text(buf, i2) {
      if ((buf.length - i2) % 2 === 0) {
        var r2 = buf.toString('utf16le', i2);
        if (r2) {
          var c = r2.charCodeAt(r2.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r2.slice(0, -1);
          }
        }
        return r2;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString('utf16le', i2, buf.length - 1);
    }
    function utf16End(buf) {
      var r2 = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r2 + this.lastChar.toString('utf16le', 0, end);
      }
      return r2;
    }
    function base64Text(buf, i2) {
      var n = (buf.length - i2) % 3;
      if (n === 0) return buf.toString('base64', i2);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString('base64', i2, buf.length - n);
    }
    function base64End(buf) {
      var r2 = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed)
        return r2 + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
      return r2;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : '';
    }
  },
});

// ../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  '../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_readable.js'(
    exports,
    module2,
  ) {
    'use strict';
    var pna = require_process_nextick_args();
    module2.exports = Readable2;
    var isArray = require_isarray();
    var Duplex;
    Readable2.ReadableState = ReadableState;
    var EE = require('events').EventEmitter;
    var EElistenerCount = function (emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream2 = require_stream();
    var Buffer2 = require_safe_buffer().Buffer;
    var OurUint8Array = global.Uint8Array || function () {};
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    var debugUtil = require('util');
    var debug = void 0;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog('stream');
    } else {
      debug = function () {};
    }
    var BufferList = require_BufferList();
    var destroyImpl = require_destroy();
    var StringDecoder;
    util.inherits(Readable2, Stream2);
    var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];
    function prependListener(emitter, event2, fn) {
      if (typeof emitter.prependListener === 'function')
        return emitter.prependListener(event2, fn);
      if (!emitter._events || !emitter._events[event2]) emitter.on(event2, fn);
      else if (isArray(emitter._events[event2]))
        emitter._events[event2].unshift(fn);
      else emitter._events[event2] = [fn, emitter._events[event2]];
    }
    function ReadableState(options, stream) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      var isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      var hwm = options.highWaterMark;
      var readableHwm = options.readableHighWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      if (hwm || hwm === 0) this.highWaterMark = hwm;
      else if (isDuplex && (readableHwm || readableHwm === 0))
        this.highWaterMark = readableHwm;
      else this.highWaterMark = defaultHwm;
      this.highWaterMark = Math.floor(this.highWaterMark);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || 'utf8';
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable2(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable2)) return new Readable2(options);
      this._readableState = new ReadableState(options, this);
      this.readable = true;
      if (options) {
        if (typeof options.read === 'function') this._read = options.read;
        if (typeof options.destroy === 'function')
          this._destroy = options.destroy;
      }
      Stream2.call(this);
    }
    Object.defineProperty(Readable2.prototype, 'destroyed', {
      get: function () {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function (value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      },
    });
    Readable2.prototype.destroy = destroyImpl.destroy;
    Readable2.prototype._undestroy = destroyImpl.undestroy;
    Readable2.prototype._destroy = function (err, cb) {
      this.push(null);
      cb(err);
    };
    Readable2.prototype.push = function (chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === 'string') {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = '';
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable2.prototype.unshift = function (chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(
      stream,
      chunk,
      encoding,
      addToFront,
      skipChunkCheck,
    ) {
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state, chunk);
        if (er) {
          stream.emit('error', er);
        } else if (state.objectMode || (chunk && chunk.length > 0)) {
          if (
            typeof chunk !== 'string' &&
            !state.objectMode &&
            Object.getPrototypeOf(chunk) !== Buffer2.prototype
          ) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              stream.emit(
                'error',
                new Error('stream.unshift() after end event'),
              );
            else addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            stream.emit('error', new Error('stream.push() after EOF'));
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
        }
      }
      return needMoreData(state);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit('data', chunk);
        stream.read(0);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (
        !_isUint8Array(chunk) &&
        typeof chunk !== 'string' &&
        chunk !== void 0 &&
        !state.objectMode
      ) {
        er = new TypeError('Invalid non-string/buffer chunk');
      }
      return er;
    }
    function needMoreData(state) {
      return (
        !state.ended &&
        (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0)
      );
    }
    Readable2.prototype.isPaused = function () {
      return this._readableState.flowing === false;
    };
    Readable2.prototype.setEncoding = function (enc) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    var MAX_HWM = 8388608;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || (state.length === 0 && state.ended)) return 0;
      if (state.objectMode) return 1;
      if (n !== n) {
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
      }
      if (n > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length) return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable2.prototype.read = function (n) {
      debug('read', n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0) state.emittedReadable = false;
      if (
        n === 0 &&
        state.needReadable &&
        (state.length >= state.highWaterMark || state.ended)
      ) {
        debug('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug('need readable', doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug('length less than watermark', doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug('reading or ended', doRead);
      } else if (doRead) {
        debug('do read');
        state.reading = true;
        state.sync = true;
        if (state.length === 0) state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading) n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0) ret = fromList(n, state);
      else ret = null;
      if (ret === null) {
        state.needReadable = true;
        n = 0;
      } else {
        state.length -= n;
      }
      if (state.length === 0) {
        if (!state.ended) state.needReadable = true;
        if (nOrig !== n && state.ended) endReadable(this);
      }
      if (ret !== null) this.emit('data', ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      if (state.ended) return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      emitReadable(stream);
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug('emitReadable', state.flowing);
        state.emittedReadable = true;
        if (state.sync) pna.nextTick(emitReadable_, stream);
        else emitReadable_(stream);
      }
    }
    function emitReadable_(stream) {
      debug('emit readable');
      stream.emit('readable');
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        pna.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      var len = state.length;
      while (
        !state.reading &&
        !state.flowing &&
        !state.ended &&
        state.length < state.highWaterMark
      ) {
        debug('maybeReadMore read 0');
        stream.read(0);
        if (len === state.length) break;
        else len = state.length;
      }
      state.readingMore = false;
    }
    Readable2.prototype._read = function (n) {
      this.emit('error', new Error('_read() is not implemented'));
    };
    Readable2.prototype.pipe = function (dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
      var doEnd =
        (!pipeOpts || pipeOpts.end !== false) &&
        dest !== process.stdout &&
        dest !== process.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted) pna.nextTick(endFn);
      else src.once('end', endFn);
      dest.on('unpipe', onunpipe);
      function onunpipe(readable3, unpipeInfo) {
        debug('onunpipe');
        if (readable3 === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug('onend');
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on('drain', ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug('cleanup');
        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend);
        src.removeListener('end', unpipe);
        src.removeListener('data', ondata);
        cleanedUp = true;
        if (
          state.awaitDrain &&
          (!dest._writableState || dest._writableState.needDrain)
        )
          ondrain();
      }
      var increasedAwaitDrain = false;
      src.on('data', ondata);
      function ondata(chunk) {
        debug('ondata');
        increasedAwaitDrain = false;
        var ret = dest.write(chunk);
        if (ret === false && !increasedAwaitDrain) {
          if (
            ((state.pipesCount === 1 && state.pipes === dest) ||
              (state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1)) &&
            !cleanedUp
          ) {
            debug('false write response, pause', src._readableState.awaitDrain);
            src._readableState.awaitDrain++;
            increasedAwaitDrain = true;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
      }
      prependListener(dest, 'error', onerror);
      function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
      }
      dest.once('close', onclose);
      function onfinish() {
        debug('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
      }
      dest.once('finish', onfinish);
      function unpipe() {
        debug('unpipe');
        src.unpipe(dest);
      }
      dest.emit('pipe', src);
      if (!state.flowing) {
        debug('pipe resume');
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function () {
        var state = src._readableState;
        debug('pipeOnDrain', state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable2.prototype.unpipe = function (dest) {
      var state = this._readableState;
      var unpipeInfo = { hasUnpiped: false };
      if (state.pipesCount === 0) return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit('unpipe', this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i2 = 0; i2 < len; i2++) {
          dests[i2].emit('unpipe', this, unpipeInfo);
        }
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1) return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1) state.pipes = state.pipes[0];
      dest.emit('unpipe', this, unpipeInfo);
      return this;
    };
    Readable2.prototype.on = function (ev, fn) {
      var res = Stream2.prototype.on.call(this, ev, fn);
      if (ev === 'data') {
        if (this._readableState.flowing !== false) this.resume();
      } else if (ev === 'readable') {
        var state = this._readableState;
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.emittedReadable = false;
          if (!state.reading) {
            pna.nextTick(nReadingNextTick, this);
          } else if (state.length) {
            emitReadable(this);
          }
        }
      }
      return res;
    };
    Readable2.prototype.addListener = Readable2.prototype.on;
    function nReadingNextTick(self2) {
      debug('readable nexttick read 0');
      self2.read(0);
    }
    Readable2.prototype.resume = function () {
      var state = this._readableState;
      if (!state.flowing) {
        debug('resume');
        state.flowing = true;
        resume(this, state);
      }
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        pna.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      if (!state.reading) {
        debug('resume read 0');
        stream.read(0);
      }
      state.resumeScheduled = false;
      state.awaitDrain = 0;
      stream.emit('resume');
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }
    Readable2.prototype.pause = function () {
      debug('call pause flowing=%j', this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug('pause');
        this._readableState.flowing = false;
        this.emit('pause');
      }
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug('flow', state.flowing);
      while (state.flowing && stream.read() !== null) {}
    }
    Readable2.prototype.wrap = function (stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on('end', function () {
        debug('wrapped end');
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on('data', function (chunk) {
        debug('wrapped data');
        if (state.decoder) chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i2 in stream) {
        if (this[i2] === void 0 && typeof stream[i2] === 'function') {
          this[i2] = (function (method) {
            return function () {
              return stream[method].apply(stream, arguments);
            };
          })(i2);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function (n2) {
        debug('wrapped _read', n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    Object.defineProperty(Readable2.prototype, 'readableHighWaterMark', {
      enumerable: false,
      get: function () {
        return this._readableState.highWaterMark;
      },
    });
    Readable2._fromList = fromList;
    function fromList(n, state) {
      if (state.length === 0) return null;
      var ret;
      if (state.objectMode) ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder) ret = state.buffer.join('');
        else if (state.buffer.length === 1) ret = state.buffer.head.data;
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = fromListPartial(n, state.buffer, state.decoder);
      }
      return ret;
    }
    function fromListPartial(n, list, hasStrings) {
      var ret;
      if (n < list.head.data.length) {
        ret = list.head.data.slice(0, n);
        list.head.data = list.head.data.slice(n);
      } else if (n === list.head.data.length) {
        ret = list.shift();
      } else {
        ret = hasStrings
          ? copyFromBufferString(n, list)
          : copyFromBuffer(n, list);
      }
      return ret;
    }
    function copyFromBufferString(n, list) {
      var p = list.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;
      while ((p = p.next)) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;
        else ret += str.slice(0, n);
        n -= nb;
        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) list.head = p.next;
            else list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = str.slice(nb);
          }
          break;
        }
        ++c;
      }
      list.length -= c;
      return ret;
    }
    function copyFromBuffer(n, list) {
      var ret = Buffer2.allocUnsafe(n);
      var p = list.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;
      while ((p = p.next)) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;
        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) list.head = p.next;
            else list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = buf.slice(nb);
          }
          break;
        }
        ++c;
      }
      list.length -= c;
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      if (state.length > 0)
        throw new Error('"endReadable()" called on non-empty stream');
      if (!state.endEmitted) {
        state.ended = true;
        pna.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    }
    function indexOf(xs, x2) {
      for (var i2 = 0, l = xs.length; i2 < l; i2++) {
        if (xs[i2] === x2) return i2;
      }
      return -1;
    }
  },
});

// ../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  '../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_transform.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = Transform;
    var Duplex = require_stream_duplex();
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    util.inherits(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (!cb) {
        return this.emit(
          'error',
          new Error('write callback called multiple times'),
        );
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null) this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null,
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === 'function')
          this._transform = options.transform;
        if (typeof options.flush === 'function') this._flush = options.flush;
      }
      this.on('prefinish', prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === 'function') {
        this._flush(function (er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform.prototype.push = function (chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function (chunk, encoding, cb) {
      throw new Error('_transform() is not implemented');
    };
    Transform.prototype._write = function (chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function (n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function (err, cb) {
      var _this2 = this;
      Duplex.prototype._destroy.call(this, err, function (err2) {
        cb(err2);
        _this2.emit('close');
      });
    };
    function done(stream, er, data) {
      if (er) return stream.emit('error', er);
      if (data != null) stream.push(data);
      if (stream._writableState.length)
        throw new Error('Calling transform done when ws.length != 0');
      if (stream._transformState.transforming)
        throw new Error('Calling transform done when still transforming');
      return stream.push(null);
    }
  },
});

// ../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  '../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/lib/_stream_passthrough.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = PassThrough2;
    var Transform = require_stream_transform();
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    util.inherits(PassThrough2, Transform);
    function PassThrough2(options) {
      if (!(this instanceof PassThrough2)) return new PassThrough2(options);
      Transform.call(this, options);
    }
    PassThrough2.prototype._transform = function (chunk, encoding, cb) {
      cb(null, chunk);
    };
  },
});

// ../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/readable.js
var require_readable = __commonJS({
  '../../node_modules/.pnpm/readable-stream@2.3.7/node_modules/readable-stream/readable.js'(
    exports,
    module2,
  ) {
    var Stream2 = require('stream');
    if (process.env.READABLE_STREAM === 'disable' && Stream2) {
      module2.exports = Stream2;
      exports = module2.exports = Stream2.Readable;
      exports.Readable = Stream2.Readable;
      exports.Writable = Stream2.Writable;
      exports.Duplex = Stream2.Duplex;
      exports.Transform = Stream2.Transform;
      exports.PassThrough = Stream2.PassThrough;
      exports.Stream = Stream2;
    } else {
      exports = module2.exports = require_stream_readable();
      exports.Stream = Stream2 || exports;
      exports.Readable = exports;
      exports.Writable = require_stream_writable();
      exports.Duplex = require_stream_duplex();
      exports.Transform = require_stream_transform();
      exports.PassThrough = require_stream_passthrough();
    }
  },
});

// ../../node_modules/.pnpm/from2@2.3.0/node_modules/from2/index.js
var require_from2 = __commonJS({
  '../../node_modules/.pnpm/from2@2.3.0/node_modules/from2/index.js'(
    exports,
    module2,
  ) {
    var Readable2 = require_readable().Readable;
    var inherits = require_inherits();
    module2.exports = from2;
    from2.ctor = ctor;
    from2.obj = obj;
    var Proto = ctor();
    function toFunction(list) {
      list = list.slice();
      return function (_, cb) {
        var err = null;
        var item = list.length ? list.shift() : null;
        if (item instanceof Error) {
          err = item;
          item = null;
        }
        cb(err, item);
      };
    }
    function from2(opts, read2) {
      if (typeof opts !== 'object' || Array.isArray(opts)) {
        read2 = opts;
        opts = {};
      }
      var rs = new Proto(opts);
      rs._from = Array.isArray(read2) ? toFunction(read2) : read2 || noop4;
      return rs;
    }
    function ctor(opts, read2) {
      if (typeof opts === 'function') {
        read2 = opts;
        opts = {};
      }
      opts = defaults(opts);
      inherits(Class, Readable2);
      function Class(override) {
        if (!(this instanceof Class)) return new Class(override);
        this._reading = false;
        this._callback = check;
        this.destroyed = false;
        Readable2.call(this, override || opts);
        var self2 = this;
        var hwm = this._readableState.highWaterMark;
        function check(err, data) {
          if (self2.destroyed) return;
          if (err) return self2.destroy(err);
          if (data === null) return self2.push(null);
          self2._reading = false;
          if (self2.push(data)) self2._read(hwm);
        }
      }
      Class.prototype._from = read2 || noop4;
      Class.prototype._read = function (size) {
        if (this._reading || this.destroyed) return;
        this._reading = true;
        this._from(size, this._callback);
      };
      Class.prototype.destroy = function (err) {
        if (this.destroyed) return;
        this.destroyed = true;
        var self2 = this;
        process.nextTick(function () {
          if (err) self2.emit('error', err);
          self2.emit('close');
        });
      };
      return Class;
    }
    function obj(opts, read2) {
      if (typeof opts === 'function' || Array.isArray(opts)) {
        read2 = opts;
        opts = {};
      }
      opts = defaults(opts);
      opts.objectMode = true;
      opts.highWaterMark = 16;
      return from2(opts, read2);
    }
    function noop4() {}
    function defaults(opts) {
      opts = opts || {};
      return opts;
    }
  },
});

// ../../node_modules/.pnpm/p-is-promise@1.1.0/node_modules/p-is-promise/index.js
var require_p_is_promise = __commonJS({
  '../../node_modules/.pnpm/p-is-promise@1.1.0/node_modules/p-is-promise/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = (x2) =>
      x2 instanceof Promise ||
      (x2 !== null &&
        typeof x2 === 'object' &&
        typeof x2.then === 'function' &&
        typeof x2.catch === 'function');
  },
});

// ../../node_modules/.pnpm/into-stream@3.1.0/node_modules/into-stream/index.js
var require_into_stream = __commonJS({
  '../../node_modules/.pnpm/into-stream@3.1.0/node_modules/into-stream/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var from = require_from2();
    var pIsPromise = require_p_is_promise();
    module2.exports = (x2) => {
      if (Array.isArray(x2)) {
        x2 = x2.slice();
      }
      let promise;
      let iterator;
      prepare(x2);
      function prepare(value) {
        x2 = value;
        promise = pIsPromise(x2) ? x2 : null;
        const shouldIterate =
          !promise &&
          x2[Symbol.iterator] &&
          typeof x2 !== 'string' &&
          !Buffer.isBuffer(x2);
        iterator = shouldIterate ? x2[Symbol.iterator]() : null;
      }
      return from(function reader(size, cb) {
        if (promise) {
          promise.then(prepare).then(() => reader.call(this, size, cb), cb);
          return;
        }
        if (iterator) {
          const obj = iterator.next();
          setImmediate(cb, null, obj.done ? null : obj.value);
          return;
        }
        if (x2.length === 0) {
          setImmediate(cb, null, null);
          return;
        }
        const chunk = x2.slice(0, size);
        x2 = x2.slice(size);
        setImmediate(cb, null, chunk);
      });
    };
    module2.exports.obj = (x2) => {
      if (Array.isArray(x2)) {
        x2 = x2.slice();
      }
      let promise;
      let iterator;
      prepare(x2);
      function prepare(value) {
        x2 = value;
        promise = pIsPromise(x2) ? x2 : null;
        iterator =
          !promise && x2[Symbol.iterator] ? x2[Symbol.iterator]() : null;
      }
      return from.obj(function reader(size, cb) {
        if (promise) {
          promise.then(prepare).then(() => reader.call(this, size, cb), cb);
          return;
        }
        if (iterator) {
          const obj = iterator.next();
          setImmediate(cb, null, obj.done ? null : obj.value);
          return;
        }
        this.push(x2);
        setImmediate(cb, null, null);
      });
    };
  },
});

// ../../node_modules/.pnpm/xtend@4.0.2/node_modules/xtend/immutable.js
var require_immutable = __commonJS({
  '../../node_modules/.pnpm/xtend@4.0.2/node_modules/xtend/immutable.js'(
    exports,
    module2,
  ) {
    module2.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend() {
      var target = {};
      for (var i2 = 0; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key2 in source) {
          if (hasOwnProperty.call(source, key2)) {
            target[key2] = source[key2];
          }
        }
      }
      return target;
    }
  },
});

// ../../node_modules/.pnpm/through2@2.0.5/node_modules/through2/through2.js
var require_through2 = __commonJS({
  '../../node_modules/.pnpm/through2@2.0.5/node_modules/through2/through2.js'(
    exports,
    module2,
  ) {
    var Transform = require_readable().Transform;
    var inherits = require('util').inherits;
    var xtend = require_immutable();
    function DestroyableTransform(opts) {
      Transform.call(this, opts);
      this._destroyed = false;
    }
    inherits(DestroyableTransform, Transform);
    DestroyableTransform.prototype.destroy = function (err) {
      if (this._destroyed) return;
      this._destroyed = true;
      var self2 = this;
      process.nextTick(function () {
        if (err) self2.emit('error', err);
        self2.emit('close');
      });
    };
    function noop4(chunk, enc, callback) {
      callback(null, chunk);
    }
    function through2(construct) {
      return function (options, transform, flush) {
        if (typeof options == 'function') {
          flush = transform;
          transform = options;
          options = {};
        }
        if (typeof transform != 'function') transform = noop4;
        if (typeof flush != 'function') flush = null;
        return construct(options, transform, flush);
      };
    }
    module2.exports = through2(function (options, transform, flush) {
      var t2 = new DestroyableTransform(options);
      t2._transform = transform;
      if (flush) t2._flush = flush;
      return t2;
    });
    module2.exports.ctor = through2(function (options, transform, flush) {
      function Through2(override) {
        if (!(this instanceof Through2)) return new Through2(override);
        this.options = xtend(options, override);
        DestroyableTransform.call(this, this.options);
      }
      inherits(Through2, DestroyableTransform);
      Through2.prototype._transform = transform;
      if (flush) Through2.prototype._flush = flush;
      return Through2;
    });
    module2.exports.obj = through2(function (options, transform, flush) {
      var t2 = new DestroyableTransform(
        xtend({ objectMode: true, highWaterMark: 16 }, options),
      );
      t2._transform = transform;
      if (flush) t2._flush = flush;
      return t2;
    });
  },
});

// ../../node_modules/.pnpm/speedometer@1.0.0/node_modules/speedometer/index.js
var require_speedometer = __commonJS({
  '../../node_modules/.pnpm/speedometer@1.0.0/node_modules/speedometer/index.js'(
    exports,
    module2,
  ) {
    var tick = 1;
    var maxTick = 65535;
    var resolution = 4;
    var inc = function () {
      tick = (tick + 1) & maxTick;
    };
    var timer = setInterval(inc, (1e3 / resolution) | 0);
    if (timer.unref) timer.unref();
    module2.exports = function (seconds) {
      var size = resolution * (seconds || 5);
      var buffer = [0];
      var pointer = 1;
      var last = (tick - 1) & maxTick;
      return function (delta) {
        var dist = (tick - last) & maxTick;
        if (dist > size) dist = size;
        last = tick;
        while (dist--) {
          if (pointer === size) pointer = 0;
          buffer[pointer] = buffer[pointer === 0 ? size - 1 : pointer - 1];
          pointer++;
        }
        if (delta) buffer[pointer - 1] += delta;
        var top = buffer[pointer - 1];
        var btm =
          buffer.length < size ? 0 : buffer[pointer === size ? 0 : pointer];
        return buffer.length < resolution
          ? top
          : ((top - btm) * resolution) / buffer.length;
      };
    };
  },
});

// ../../node_modules/.pnpm/progress-stream@2.0.0/node_modules/progress-stream/index.js
var require_progress_stream = __commonJS({
  '../../node_modules/.pnpm/progress-stream@2.0.0/node_modules/progress-stream/index.js'(
    exports,
    module2,
  ) {
    var through = require_through2();
    var speedometer = require_speedometer();
    module2.exports = function (options, onprogress) {
      if (typeof options === 'function') return module2.exports(null, options);
      options = options || {};
      var length = options.length || 0;
      var time = options.time || 0;
      var drain = options.drain || false;
      var transferred = options.transferred || 0;
      var nextUpdate = Date.now() + time;
      var delta = 0;
      var speed = speedometer(options.speed || 5e3);
      var startTime = Date.now();
      var update = {
        percentage: 0,
        transferred,
        length,
        remaining: length,
        eta: 0,
        runtime: 0,
      };
      var emit = function (ended) {
        update.delta = delta;
        update.percentage = ended
          ? 100
          : length
          ? (transferred / length) * 100
          : 0;
        update.speed = speed(delta);
        update.eta = Math.round(update.remaining / update.speed);
        update.runtime = parseInt((Date.now() - startTime) / 1e3);
        nextUpdate = Date.now() + time;
        delta = 0;
        tr.emit('progress', update);
      };
      var write = function (chunk, enc, callback) {
        var len = options.objectMode ? 1 : chunk.length;
        transferred += len;
        delta += len;
        update.transferred = transferred;
        update.remaining = length >= transferred ? length - transferred : 0;
        if (Date.now() >= nextUpdate) emit(false);
        callback(null, chunk);
      };
      var end = function (callback) {
        emit(true);
        callback();
      };
      var tr = through(
        options.objectMode ? { objectMode: true, highWaterMark: 16 } : {},
        write,
        end,
      );
      var onlength = function (newLength) {
        length = newLength;
        update.length = length;
        update.remaining = length - update.transferred;
        tr.emit('length', length);
      };
      tr.setLength = onlength;
      tr.on('pipe', function (stream) {
        if (typeof length === 'number') return;
        if (stream.readable && !stream.writable && stream.headers) {
          return onlength(parseInt(stream.headers['content-length'] || 0));
        }
        if (typeof stream.length === 'number') {
          return onlength(stream.length);
        }
        stream.on('response', function (res) {
          if (!res || !res.headers) return;
          if (res.headers['content-encoding'] === 'gzip') return;
          if (res.headers['content-length']) {
            return onlength(parseInt(res.headers['content-length']));
          }
        });
      });
      if (drain) tr.resume();
      if (onprogress) tr.on('progress', onprogress);
      tr.progress = function () {
        update.speed = speed(0);
        update.eta = Math.round(update.remaining / update.speed);
        return update;
      };
      return tr;
    };
  },
});

// ../../node_modules/.pnpm/mimic-response@3.1.0/node_modules/mimic-response/index.js
var require_mimic_response = __commonJS({
  '../../node_modules/.pnpm/mimic-response@3.1.0/node_modules/mimic-response/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var knownProperties = [
      'aborted',
      'complete',
      'headers',
      'httpVersion',
      'httpVersionMinor',
      'httpVersionMajor',
      'method',
      'rawHeaders',
      'rawTrailers',
      'setTimeout',
      'socket',
      'statusCode',
      'statusMessage',
      'trailers',
      'url',
    ];
    module2.exports = (fromStream, toStream) => {
      if (toStream._readableState.autoDestroy) {
        throw new Error(
          'The second stream must have the `autoDestroy` option set to `false`',
        );
      }
      const fromProperties = new Set(
        Object.keys(fromStream).concat(knownProperties),
      );
      const properties = {};
      for (const property of fromProperties) {
        if (property in toStream) {
          continue;
        }
        properties[property] = {
          get() {
            const value = fromStream[property];
            const isFunction = typeof value === 'function';
            return isFunction ? value.bind(fromStream) : value;
          },
          set(value) {
            fromStream[property] = value;
          },
          enumerable: true,
          configurable: false,
        };
      }
      Object.defineProperties(toStream, properties);
      fromStream.once('aborted', () => {
        toStream.destroy();
        toStream.emit('aborted');
      });
      fromStream.once('close', () => {
        if (fromStream.complete) {
          if (toStream.readable) {
            toStream.once('end', () => {
              toStream.emit('close');
            });
          } else {
            toStream.emit('close');
          }
        } else {
          toStream.emit('close');
        }
      });
      return toStream;
    };
  },
});

// ../../node_modules/.pnpm/decompress-response@6.0.0/node_modules/decompress-response/index.js
var require_decompress_response = __commonJS({
  '../../node_modules/.pnpm/decompress-response@6.0.0/node_modules/decompress-response/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var { Transform, PassThrough: PassThrough2 } = require('stream');
    var zlib2 = require('zlib');
    var mimicResponse = require_mimic_response();
    module2.exports = (response) => {
      const contentEncoding = (
        response.headers['content-encoding'] || ''
      ).toLowerCase();
      if (!['gzip', 'deflate', 'br'].includes(contentEncoding)) {
        return response;
      }
      const isBrotli = contentEncoding === 'br';
      if (isBrotli && typeof zlib2.createBrotliDecompress !== 'function') {
        response.destroy(new Error('Brotli is not supported on Node.js < 12'));
        return response;
      }
      let isEmpty = true;
      const checker = new Transform({
        transform(data, _encoding, callback) {
          isEmpty = false;
          callback(null, data);
        },
        flush(callback) {
          callback();
        },
      });
      const finalStream = new PassThrough2({
        autoDestroy: false,
        destroy(error2, callback) {
          response.destroy();
          callback(error2);
        },
      });
      const decompressStream = isBrotli
        ? zlib2.createBrotliDecompress()
        : zlib2.createUnzip();
      decompressStream.once('error', (error2) => {
        if (isEmpty && !response.readable) {
          finalStream.end();
          return;
        }
        finalStream.destroy(error2);
      });
      mimicResponse(response, finalStream);
      response.pipe(checker).pipe(decompressStream).pipe(finalStream);
      return finalStream;
    };
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/request/node/proxy.js
var require_proxy = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/request/node/proxy.js'(
    exports,
  ) {
    'use strict';
    var url = require('url');
    var objectAssign = require_object_assign();
    function formatHostname(hostname) {
      return hostname.replace(/^\.*/, '.').toLowerCase();
    }
    function parseNoProxyZone(zoneStr) {
      const zone = zoneStr.trim().toLowerCase();
      const zoneParts = zone.split(':', 2);
      const zoneHost = formatHostname(zoneParts[0]);
      const zonePort = zoneParts[1];
      const hasPort = zone.indexOf(':') > -1;
      return {
        hostname: zoneHost,
        port: zonePort,
        hasPort,
      };
    }
    function uriInNoProxy(uri, noProxy) {
      const port = uri.port || (uri.protocol === 'https:' ? '443' : '80');
      const hostname = formatHostname(uri.hostname);
      const noProxyList = noProxy.split(',');
      return noProxyList.map(parseNoProxyZone).some((noProxyZone) => {
        const isMatchedAt = hostname.indexOf(noProxyZone.hostname);
        const hostnameMatched =
          isMatchedAt > -1 &&
          isMatchedAt === hostname.length - noProxyZone.hostname.length;
        if (noProxyZone.hasPort) {
          return port === noProxyZone.port && hostnameMatched;
        }
        return hostnameMatched;
      });
    }
    function getProxyFromUri(uri) {
      const noProxy = process.env.NO_PROXY || process.env.no_proxy || '';
      if (noProxy === '*') {
        return null;
      }
      if (noProxy !== '' && uriInNoProxy(uri, noProxy)) {
        return null;
      }
      if (uri.protocol === 'http:') {
        return process.env.HTTP_PROXY || process.env.http_proxy || null;
      }
      if (uri.protocol === 'https:') {
        return (
          process.env.HTTPS_PROXY ||
          process.env.https_proxy ||
          process.env.HTTP_PROXY ||
          process.env.http_proxy ||
          null
        );
      }
      return null;
    }
    function getHostFromUri(uri) {
      let host = uri.host;
      if (uri.port) {
        if (
          (uri.port === '80' && uri.protocol === 'http:') ||
          (uri.port === '443' && uri.protocol === 'https:')
        ) {
          host = uri.hostname;
        }
      }
      return host;
    }
    function getHostHeaderWithPort(uri) {
      const port = uri.port || (uri.protocol === 'https:' ? '443' : '80');
      return `${uri.hostname}:${port}`;
    }
    function rewriteUriForProxy(reqOpts, uri, proxy) {
      const headers = reqOpts.headers || {};
      const options = objectAssign({}, reqOpts, {
        headers,
      });
      headers.host = headers.host || getHostHeaderWithPort(uri);
      options.protocol = proxy.protocol || options.protocol;
      options.hostname = proxy.host.replace(/:\d+/, '');
      options.port = proxy.port;
      options.host = getHostFromUri(objectAssign({}, uri, proxy));
      options.href = `${options.protocol}//${options.host}${options.path}`;
      options.path = url.format(uri);
      return options;
    }
    function getProxyOptions(options) {
      let proxy;
      if (options.hasOwnProperty('proxy')) {
        proxy = options.proxy;
      } else {
        const uri = url.parse(options.url);
        proxy = getProxyFromUri(uri);
      }
      return typeof proxy === 'string' ? url.parse(proxy) : proxy;
    }
    exports.rewriteUriForProxy = rewriteUriForProxy;
    exports.getProxyOptions = getProxyOptions;
  },
});

// ../../node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js
var require_safe_buffer2 = __commonJS({
  '../../node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js'(
    exports,
    module2,
  ) {
    var buffer = require('buffer');
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key2 in src) {
        dst[key2] = src[key2];
      }
    }
    if (
      Buffer2.from &&
      Buffer2.alloc &&
      Buffer2.allocUnsafe &&
      Buffer2.allocUnsafeSlow
    ) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function (arg, encodingOrOffset, length) {
      if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function (size, fill, encoding) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === 'string') {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
      }
      return buffer.SlowBuffer(size);
    };
  },
});

// ../../node_modules/.pnpm/tunnel-agent@0.6.0/node_modules/tunnel-agent/index.js
var require_tunnel_agent = __commonJS({
  '../../node_modules/.pnpm/tunnel-agent@0.6.0/node_modules/tunnel-agent/index.js'(
    exports,
  ) {
    'use strict';
    var net = require('net');
    var tls = require('tls');
    var http2 = require('http');
    var https2 = require('https');
    var events = require('events');
    var assert = require('assert');
    var util = require('util');
    var Buffer2 = require_safe_buffer2().Buffer;
    exports.httpOverHttp = httpOverHttp;
    exports.httpsOverHttp = httpsOverHttp;
    exports.httpOverHttps = httpOverHttps;
    exports.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http2.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http2.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https2.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https2.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self2 = this;
      self2.options = options || {};
      self2.proxyOptions = self2.options.proxy || {};
      self2.maxSockets =
        self2.options.maxSockets || http2.Agent.defaultMaxSockets;
      self2.requests = [];
      self2.sockets = [];
      self2.on('free', function onFree(socket, host, port) {
        for (var i2 = 0, len = self2.requests.length; i2 < len; ++i2) {
          var pending = self2.requests[i2];
          if (pending.host === host && pending.port === port) {
            self2.requests.splice(i2, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self2.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, options) {
      var self2 = this;
      if (typeof options === 'string') {
        options = {
          host: options,
          port: arguments[2],
          path: arguments[3],
        };
      }
      if (self2.sockets.length >= this.maxSockets) {
        self2.requests.push({
          host: options.host,
          port: options.port,
          request: req,
        });
        return;
      }
      self2.createConnection({
        host: options.host,
        port: options.port,
        request: req,
      });
    };
    TunnelingAgent.prototype.createConnection = function createConnection(
      pending,
    ) {
      var self2 = this;
      self2.createSocket(pending, function (socket) {
        socket.on('free', onFree);
        socket.on('close', onCloseOrRemove);
        socket.on('agentRemove', onCloseOrRemove);
        pending.request.onSocket(socket);
        function onFree() {
          self2.emit('free', socket, pending.host, pending.port);
        }
        function onCloseOrRemove(err) {
          self2.removeSocket(socket);
          socket.removeListener('free', onFree);
          socket.removeListener('close', onCloseOrRemove);
          socket.removeListener('agentRemove', onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self2 = this;
      var placeholder = {};
      self2.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self2.proxyOptions, {
        method: 'CONNECT',
        path: options.host + ':' + options.port,
        agent: false,
      });
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers['Proxy-Authorization'] =
          'Basic ' + Buffer2.from(connectOptions.proxyAuth).toString('base64');
      }
      debug('making CONNECT request');
      var connectReq = self2.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once('response', onResponse);
      connectReq.once('upgrade', onUpgrade);
      connectReq.once('connect', onConnect);
      connectReq.once('error', onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function () {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode === 200) {
          assert.equal(head.length, 0);
          debug('tunneling connection has established');
          self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
          cb(socket);
        } else {
          debug(
            'tunneling socket could not be established, statusCode=%d',
            res.statusCode,
          );
          var error2 = new Error(
            'tunneling socket could not be established, statusCode=' +
              res.statusCode,
          );
          error2.code = 'ECONNRESET';
          options.request.emit('error', error2);
          self2.removeSocket(placeholder);
        }
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug(
          'tunneling socket could not be established, cause=%s\n',
          cause.message,
          cause.stack,
        );
        var error2 = new Error(
          'tunneling socket could not be established, cause=' + cause.message,
        );
        error2.code = 'ECONNRESET';
        options.request.emit('error', error2);
        self2.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) return;
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createConnection(pending);
      }
    };
    function createSecureSocket(options, cb) {
      var self2 = this;
      TunnelingAgent.prototype.createSocket.call(
        self2,
        options,
        function (socket) {
          var secureSocket = tls.connect(
            0,
            mergeOptions({}, self2.options, {
              servername: options.host,
              socket,
            }),
          );
          self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
          cb(secureSocket);
        },
      );
    }
    function mergeOptions(target) {
      for (var i2 = 1, len = arguments.length; i2 < len; ++i2) {
        var overrides = arguments[i2];
        if (typeof overrides === 'object') {
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
      debug = function () {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === 'string') {
          args[0] = 'TUNNEL: ' + args[0];
        } else {
          args.unshift('TUNNEL:');
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function () {};
    }
    exports.debug = debug;
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/request/node/tunnel.js
var require_tunnel = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/request/node/tunnel.js'(
    exports,
  ) {
    'use strict';
    var url = require('url');
    var tunnel = require_tunnel_agent();
    var objectAssign = require_object_assign();
    var uriParts = [
      'protocol',
      'slashes',
      'auth',
      'host',
      'port',
      'hostname',
      'hash',
      'search',
      'query',
      'pathname',
      'path',
      'href',
    ];
    var defaultProxyHeaderWhiteList = [
      'accept',
      'accept-charset',
      'accept-encoding',
      'accept-language',
      'accept-ranges',
      'cache-control',
      'content-encoding',
      'content-language',
      'content-location',
      'content-md5',
      'content-range',
      'content-type',
      'connection',
      'date',
      'expect',
      'max-forwards',
      'pragma',
      'referer',
      'te',
      'user-agent',
      'via',
    ];
    var defaultProxyHeaderExclusiveList = ['proxy-authorization'];
    exports.shouldEnable = (options, tunnelOption) => {
      if (typeof options.tunnel !== 'undefined') {
        return Boolean(options.tunnel);
      }
      const uri = url.parse(options.url);
      if (uri.protocol === 'https:') {
        return true;
      }
      return false;
    };
    exports.applyAgent = (opts = {}, proxy) => {
      const options = objectAssign({}, opts);
      const proxyHeaderWhiteList = defaultProxyHeaderWhiteList
        .concat(options.proxyHeaderWhiteList || [])
        .map((header) => header.toLowerCase());
      const proxyHeaderExclusiveList = defaultProxyHeaderExclusiveList
        .concat(options.proxyHeaderExclusiveList || [])
        .map((header) => header.toLowerCase());
      const proxyHeaders = getAllowedProxyHeaders(
        options.headers,
        proxyHeaderWhiteList,
      );
      proxyHeaders.host = constructProxyHost(options);
      options.headers = Object.keys(options.headers || {}).reduce(
        (headers, header) => {
          const isAllowed =
            proxyHeaderExclusiveList.indexOf(header.toLowerCase()) === -1;
          if (isAllowed) {
            headers[header] = options.headers[header];
          }
          return headers;
        },
        {},
      );
      const tunnelFn = getTunnelFn(options, proxy);
      const tunnelOptions = constructTunnelOptions(
        options,
        proxy,
        proxyHeaders,
      );
      options.agent = tunnelFn(tunnelOptions);
      return options;
    };
    function getTunnelFn(options, proxy) {
      const uri = getUriParts(options);
      const tunnelFnName = constructTunnelFnName(uri, proxy);
      return tunnel[tunnelFnName];
    }
    function getUriParts(options) {
      return uriParts.reduce((uri, part) => {
        uri[part] = options[part];
        return uri;
      }, {});
    }
    function constructTunnelFnName(uri, proxy) {
      const uriProtocol = uri.protocol === 'https:' ? 'https' : 'http';
      const proxyProtocol = proxy.protocol === 'https:' ? 'Https' : 'Http';
      return [uriProtocol, proxyProtocol].join('Over');
    }
    function constructProxyHost(uri) {
      const port = uri.port;
      const protocol = uri.protocol;
      let proxyHost = `${uri.hostname}:`;
      if (port) {
        proxyHost += port;
      } else if (protocol === 'https:') {
        proxyHost += '443';
      } else {
        proxyHost += '80';
      }
      return proxyHost;
    }
    function getAllowedProxyHeaders(headers, whiteList) {
      return Object.keys(headers)
        .filter((header) => whiteList.indexOf(header.toLowerCase()) !== -1)
        .reduce((set, header) => {
          set[header] = headers[header];
          return set;
        }, {});
    }
    function constructTunnelOptions(options, proxy, proxyHeaders) {
      return {
        proxy: {
          host: proxy.hostname,
          port: +proxy.port,
          proxyAuth: proxy.auth,
          headers: proxyHeaders,
        },
        headers: options.headers,
        ca: options.ca,
        cert: options.cert,
        key: options.key,
        passphrase: options.passphrase,
        pfx: options.pfx,
        ciphers: options.ciphers,
        rejectUnauthorized: options.rejectUnauthorized,
        secureOptions: options.secureOptions,
        secureProtocol: options.secureProtocol,
      };
    }
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/request/node-request.js
var require_node_request = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/request/node-request.js'(
    exports,
    module2,
  ) {
    'use strict';
    var qs = require('querystring');
    var url = require('url');
    var http2 = require('http');
    var https2 = require('https');
    var concat = require_simple_concat();
    var follow = require_follow_redirects();
    var timedOut = require_timed_out();
    var isStream = require_is_stream();
    var toStream = require_into_stream();
    var objectAssign = require_object_assign();
    var progressStream = require_progress_stream();
    var decompressResponse = require_decompress_response();
    var { getProxyOptions, rewriteUriForProxy } = require_proxy();
    var tunneling = require_tunnel();
    var adapter = 'node';
    var reduceResponse = (res, reqUrl, method, body) => ({
      body,
      url: reqUrl,
      method,
      headers: res.headers,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
    });
    module2.exports = (context, cb) => {
      const options = context.options;
      const uri = objectAssign({}, url.parse(options.url));
      const bodyType = isStream(options.body) ? 'stream' : typeof options.body;
      if (
        bodyType !== 'undefined' &&
        bodyType !== 'stream' &&
        bodyType !== 'string' &&
        !Buffer.isBuffer(options.body)
      ) {
        throw new Error(
          `Request body must be a string, buffer or stream, got ${bodyType}`,
        );
      }
      const lengthHeader = {};
      if (options.bodySize) {
        lengthHeader['content-length'] = options.bodySize;
      } else if (options.body && bodyType !== 'stream') {
        lengthHeader['content-length'] = Buffer.byteLength(options.body);
      }
      let aborted = false;
      const callback = (err, res) => !aborted && cb(err, res);
      context.channels.abort.subscribe(() => {
        aborted = true;
      });
      let reqOpts = objectAssign({}, uri, {
        method: options.method,
        headers: objectAssign(
          {},
          lowerCaseHeaders(options.headers),
          lengthHeader,
        ),
        maxRedirects: options.maxRedirects,
      });
      const proxy = getProxyOptions(options);
      const tunnel = proxy && tunneling.shouldEnable(options);
      const injectedResponse = context.applyMiddleware(
        'interceptRequest',
        void 0,
        {
          adapter,
          context,
        },
      );
      if (injectedResponse) {
        const cbTimer = setImmediate(callback, null, injectedResponse);
        const abort = () => clearImmediate(cbTimer);
        return {
          abort,
        };
      }
      if (options.maxRedirects !== 0) {
        reqOpts.maxRedirects = options.maxRedirects || 5;
      }
      if (proxy && tunnel) {
        reqOpts = tunneling.applyAgent(reqOpts, proxy);
      } else if (proxy && !tunnel) {
        reqOpts = rewriteUriForProxy(reqOpts, uri, proxy);
      }
      if (
        !tunnel &&
        proxy &&
        proxy.auth &&
        !reqOpts.headers['proxy-authorization']
      ) {
        const [username, password] = proxy.auth.username
          ? [proxy.auth.username, proxy.auth.password]
          : proxy.auth.split(':').map((item) => qs.unescape(item));
        const auth = Buffer.from(`${username}:${password}`, 'utf8');
        const authBase64 = auth.toString('base64');
        reqOpts.headers['proxy-authorization'] = `Basic ${authBase64}`;
      }
      const transport = getRequestTransport(reqOpts, proxy, tunnel);
      if (typeof options.debug === 'function' && proxy) {
        options.debug(
          'Proxying using %s',
          reqOpts.agent ? 'tunnel agent' : `${reqOpts.host}:${reqOpts.port}`,
        );
      }
      const tryCompressed = reqOpts.method !== 'HEAD';
      if (
        tryCompressed &&
        !reqOpts.headers['accept-encoding'] &&
        options.compress !== false
      ) {
        reqOpts.headers['accept-encoding'] = 'br, gzip, deflate';
      }
      const finalOptions = context.applyMiddleware('finalizeOptions', reqOpts);
      const request = transport.request(finalOptions, (response) => {
        const res = tryCompressed ? decompressResponse(response) : response;
        const resStream = context.applyMiddleware('onHeaders', res, {
          headers: response.headers,
          adapter,
          context,
        });
        const reqUrl = response.responseUrl || options.url;
        if (options.stream) {
          callback(
            null,
            reduceResponse(res, reqUrl, reqOpts.method, resStream),
          );
          return;
        }
        concat(resStream, (err, data) => {
          if (err) {
            return callback(err);
          }
          const body = options.rawBody ? data : data.toString();
          const reduced = reduceResponse(res, reqUrl, reqOpts.method, body);
          return callback(null, reduced);
        });
      });
      if (options.timeout) {
        timedOut(request, options.timeout);
      }
      request.once('error', callback);
      const { bodyStream, progress } = getProgressStream(options);
      context.applyMiddleware('onRequest', {
        options,
        adapter,
        request,
        context,
        progress,
      });
      if (bodyStream) {
        bodyStream.pipe(request);
      } else {
        request.end(options.body);
      }
      return {
        abort: () => request.abort(),
      };
    };
    function getProgressStream(options) {
      if (!options.body) {
        return {};
      }
      const bodyIsStream = isStream(options.body);
      const length =
        options.bodySize ||
        (bodyIsStream ? null : Buffer.byteLength(options.body));
      if (!length) {
        return bodyIsStream
          ? {
              bodyStream: options.body,
            }
          : {};
      }
      const progress = progressStream({
        time: 16,
        length,
      });
      const bodyStream = bodyIsStream ? options.body : toStream(options.body);
      return {
        bodyStream: bodyStream.pipe(progress),
        progress,
      };
    }
    function getRequestTransport(reqOpts, proxy, tunnel) {
      const isHttpsRequest = reqOpts.protocol === 'https:';
      const transports =
        reqOpts.maxRedirects === 0
          ? {
              http: http2,
              https: https2,
            }
          : {
              http: follow.http,
              https: follow.https,
            };
      if (!proxy || tunnel) {
        return isHttpsRequest ? transports.https : transports.http;
      }
      let isHttpsProxy = proxy.port === 443;
      if (proxy.protocol) {
        isHttpsProxy = /^https:?/.test(proxy.protocol);
      }
      return isHttpsProxy ? transports.https : transports.http;
    }
    function lowerCaseHeaders(headers) {
      return Object.keys(headers || {}).reduce((acc, header) => {
        acc[header.toLowerCase()] = headers[header];
        return acc;
      }, {});
    }
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/request/index.js
var require_request = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/request/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = require_node_request();
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/index.js
var require_lib_node = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var pubsub = require_nano_pubsub();
    var middlewareReducer = require_middlewareReducer();
    var processOptions = require_defaultOptionsProcessor();
    var validateOptions = require_defaultOptionsValidator();
    var httpRequester = require_request();
    var channelNames = ['request', 'response', 'progress', 'error', 'abort'];
    var middlehooks = [
      'processOptions',
      'validateOptions',
      'interceptRequest',
      'finalizeOptions',
      'onRequest',
      'onResponse',
      'onError',
      'onReturn',
      'onHeaders',
    ];
    module2.exports = function createRequester(
      initMiddleware = [],
      httpRequest = httpRequester,
    ) {
      const loadedMiddleware = [];
      const middleware = middlehooks.reduce(
        (ware, name) => {
          ware[name] = ware[name] || [];
          return ware;
        },
        {
          processOptions: [processOptions],
          validateOptions: [validateOptions],
        },
      );
      function request(opts) {
        const channels = channelNames.reduce((target, name) => {
          target[name] = pubsub();
          return target;
        }, {});
        const applyMiddleware = middlewareReducer(middleware);
        const options = applyMiddleware('processOptions', opts);
        applyMiddleware('validateOptions', options);
        const context = {
          options,
          channels,
          applyMiddleware,
        };
        let ongoingRequest = null;
        const unsubscribe = channels.request.subscribe((ctx) => {
          ongoingRequest = httpRequest(ctx, (err, res) =>
            onResponse(err, res, ctx),
          );
        });
        channels.abort.subscribe(() => {
          unsubscribe();
          if (ongoingRequest) {
            ongoingRequest.abort();
          }
        });
        const returnValue = applyMiddleware('onReturn', channels, context);
        if (returnValue === channels) {
          channels.request.publish(context);
        }
        return returnValue;
        function onResponse(reqErr, res, ctx) {
          let error2 = reqErr;
          let response = res;
          if (!error2) {
            try {
              response = applyMiddleware('onResponse', res, ctx);
            } catch (err) {
              response = null;
              error2 = err;
            }
          }
          error2 = error2 && applyMiddleware('onError', error2, ctx);
          if (error2) {
            channels.error.publish(error2);
          } else if (response) {
            channels.response.publish(response);
          }
        }
      }
      request.use = function use(newMiddleware) {
        if (!newMiddleware) {
          throw new Error(
            'Tried to add middleware that resolved to falsey value',
          );
        }
        if (typeof newMiddleware === 'function') {
          throw new Error(
            'Tried to add middleware that was a function. It probably expects you to pass options to it.',
          );
        }
        if (newMiddleware.onReturn && middleware.onReturn.length > 0) {
          throw new Error(
            'Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event',
          );
        }
        middlehooks.forEach((key2) => {
          if (newMiddleware[key2]) {
            middleware[key2].push(newMiddleware[key2]);
          }
        });
        loadedMiddleware.push(newMiddleware);
        return request;
      };
      request.clone = function clone2() {
        return createRequester(loadedMiddleware);
      };
      initMiddleware.forEach(request.use);
      return request;
    };
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/index.js
var require_get_it = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/index.js'(
    exports,
    module2,
  ) {
    module2.exports = require_lib_node();
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/util/global.js
var require_global = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/util/global.js'(
    exports,
    module2,
  ) {
    'use strict';
    if (typeof globalThis !== 'undefined') {
      module2.exports = globalThis;
    } else if (typeof window !== 'undefined') {
      module2.exports = window;
    } else if (typeof global !== 'undefined') {
      module2.exports = global;
    } else if (typeof self !== 'undefined') {
      module2.exports = self;
    } else {
      module2.exports = {};
    }
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/observable.js
var require_observable3 = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/observable.js'(
    exports,
    module2,
  ) {
    'use strict';
    var global2 = require_global();
    var objectAssign = require_object_assign();
    module2.exports = function () {
      var opts =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var Observable = opts.implementation || global2.Observable;
      if (!Observable) {
        throw new Error(
          '`Observable` is not available in global scope, and no implementation was passed',
        );
      }
      return {
        onReturn: function onReturn(channels, context) {
          return new Observable(function (observer) {
            channels.error.subscribe(function (err) {
              return observer.error(err);
            });
            channels.progress.subscribe(function (event2) {
              return observer.next(
                objectAssign(
                  {
                    type: 'progress',
                  },
                  event2,
                ),
              );
            });
            channels.response.subscribe(function (response) {
              observer.next(
                objectAssign(
                  {
                    type: 'response',
                  },
                  response,
                ),
              );
              observer.complete();
            });
            channels.request.publish(context);
            return function () {
              return channels.abort.publish();
            };
          });
        },
      };
    };
  },
});

// ../../node_modules/.pnpm/isobject@3.0.1/node_modules/isobject/index.js
var require_isobject = __commonJS({
  '../../node_modules/.pnpm/isobject@3.0.1/node_modules/isobject/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = function isObject(val) {
      return (
        val != null && typeof val === 'object' && Array.isArray(val) === false
      );
    };
  },
});

// ../../node_modules/.pnpm/is-plain-object@2.0.4/node_modules/is-plain-object/index.js
var require_is_plain_object = __commonJS({
  '../../node_modules/.pnpm/is-plain-object@2.0.4/node_modules/is-plain-object/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var isObject = require_isobject();
    function isObjectObject(o) {
      return (
        isObject(o) === true &&
        Object.prototype.toString.call(o) === '[object Object]'
      );
    }
    module2.exports = function isPlainObject(o) {
      var ctor, prot;
      if (isObjectObject(o) === false) return false;
      ctor = o.constructor;
      if (typeof ctor !== 'function') return false;
      prot = ctor.prototype;
      if (isObjectObject(prot) === false) return false;
      if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
      }
      return true;
    };
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/jsonRequest.js
var require_jsonRequest = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/jsonRequest.js'(
    exports,
    module2,
  ) {
    'use strict';
    function _typeof(obj) {
      '@babel/helpers - typeof';
      return (
        (_typeof =
          typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
            ? function (obj2) {
                return typeof obj2;
              }
            : function (obj2) {
                return obj2 &&
                  typeof Symbol == 'function' &&
                  obj2.constructor === Symbol &&
                  obj2 !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj2;
              }),
        _typeof(obj)
      );
    }
    var objectAssign = require_object_assign();
    var isPlainObject = require_is_plain_object();
    var serializeTypes = ['boolean', 'string', 'number'];
    var isBuffer = function isBuffer2(obj) {
      return (
        !!obj.constructor &&
        typeof obj.constructor.isBuffer === 'function' &&
        obj.constructor.isBuffer(obj)
      );
    };
    module2.exports = function () {
      return {
        processOptions: function processOptions(options) {
          var body = options.body;
          if (!body) {
            return options;
          }
          var isStream = typeof body.pipe === 'function';
          var shouldSerialize =
            !isStream &&
            !isBuffer(body) &&
            (serializeTypes.indexOf(_typeof(body)) !== -1 ||
              Array.isArray(body) ||
              isPlainObject(body));
          if (!shouldSerialize) {
            return options;
          }
          return objectAssign({}, options, {
            body: JSON.stringify(options.body),
            headers: objectAssign({}, options.headers, {
              'Content-Type': 'application/json',
            }),
          });
        },
      };
    };
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/jsonResponse.js
var require_jsonResponse = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/jsonResponse.js'(
    exports,
    module2,
  ) {
    'use strict';
    var objectAssign = require_object_assign();
    module2.exports = function (opts) {
      return {
        onResponse: function onResponse(response) {
          var contentType = response.headers['content-type'] || '';
          var shouldDecode =
            (opts && opts.force) ||
            contentType.indexOf('application/json') !== -1;
          if (!response.body || !contentType || !shouldDecode) {
            return response;
          }
          return objectAssign({}, response, {
            body: tryParse(response.body),
          });
        },
        processOptions: function processOptions(options) {
          return objectAssign({}, options, {
            headers: objectAssign(
              {
                Accept: 'application/json',
              },
              options.headers,
            ),
          });
        },
      };
    };
    function tryParse(body) {
      try {
        return JSON.parse(body);
      } catch (err) {
        err.message = 'Failed to parsed response body as JSON: '.concat(
          err.message,
        );
        throw err;
      }
    }
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/progress/node-progress.js
var require_node_progress = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/progress/node-progress.js'(
    exports,
    module2,
  ) {
    'use strict';
    var progressStream = require_progress_stream();
    function normalizer(stage) {
      return function (prog) {
        return {
          stage,
          percent: prog.percentage,
          total: prog.length,
          loaded: prog.transferred,
          lengthComputable: !(prog.length === 0 && prog.percentage === 0),
        };
      };
    }
    module2.exports = function () {
      return {
        onHeaders: function onHeaders(response, evt) {
          var progress = progressStream({
            time: 16,
          });
          var normalize2 = normalizer('download');
          var contentLength = response.headers['content-length'];
          var length = contentLength && Number(contentLength);
          if (!isNaN(length) && length > 0) {
            progress.setLength(length);
          }
          progress.on('progress', function (prog) {
            return evt.context.channels.progress.publish(normalize2(prog));
          });
          return response.pipe(progress);
        },
        onRequest: function onRequest(evt) {
          if (!evt.progress) {
            return;
          }
          var normalize2 = normalizer('upload');
          evt.progress.on('progress', function (prog) {
            return evt.context.channels.progress.publish(normalize2(prog));
          });
        },
      };
    };
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/progress/index.js
var require_progress = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib/middleware/progress/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = require_node_progress();
  },
});

// ../../node_modules/.pnpm/make-error@1.3.6/node_modules/make-error/index.js
var require_make_error = __commonJS({
  '../../node_modules/.pnpm/make-error@1.3.6/node_modules/make-error/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var construct = typeof Reflect !== 'undefined' ? Reflect.construct : void 0;
    var defineProperty = Object.defineProperty;
    var captureStackTrace = Error.captureStackTrace;
    if (captureStackTrace === void 0) {
      captureStackTrace = function captureStackTrace2(error2) {
        var container = new Error();
        defineProperty(error2, 'stack', {
          configurable: true,
          get: function getStack() {
            var stack = container.stack;
            defineProperty(this, 'stack', {
              configurable: true,
              value: stack,
              writable: true,
            });
            return stack;
          },
          set: function setStack(stack) {
            defineProperty(error2, 'stack', {
              configurable: true,
              value: stack,
              writable: true,
            });
          },
        });
      };
    }
    function BaseError(message) {
      if (message !== void 0) {
        defineProperty(this, 'message', {
          configurable: true,
          value: message,
          writable: true,
        });
      }
      var cname = this.constructor.name;
      if (cname !== void 0 && cname !== this.name) {
        defineProperty(this, 'name', {
          configurable: true,
          value: cname,
          writable: true,
        });
      }
      captureStackTrace(this, this.constructor);
    }
    BaseError.prototype = Object.create(Error.prototype, {
      constructor: {
        configurable: true,
        value: BaseError,
        writable: true,
      },
    });
    var setFunctionName = (function () {
      function setFunctionName2(fn, name) {
        return defineProperty(fn, 'name', {
          configurable: true,
          value: name,
        });
      }
      try {
        var f3 = function () {};
        setFunctionName2(f3, 'foo');
        if (f3.name === 'foo') {
          return setFunctionName2;
        }
      } catch (_) {}
    })();
    function makeError(constructor, super_) {
      if (super_ == null || super_ === Error) {
        super_ = BaseError;
      } else if (typeof super_ !== 'function') {
        throw new TypeError('super_ should be a function');
      }
      var name;
      if (typeof constructor === 'string') {
        name = constructor;
        constructor =
          construct !== void 0
            ? function () {
                return construct(super_, arguments, this.constructor);
              }
            : function () {
                super_.apply(this, arguments);
              };
        if (setFunctionName !== void 0) {
          setFunctionName(constructor, name);
          name = void 0;
        }
      } else if (typeof constructor !== 'function') {
        throw new TypeError(
          'constructor should be either a string or a function',
        );
      }
      constructor.super_ = constructor['super'] = super_;
      var properties = {
        constructor: {
          configurable: true,
          value: constructor,
          writable: true,
        },
      };
      if (name !== void 0) {
        properties.name = {
          configurable: true,
          value: name,
          writable: true,
        };
      }
      constructor.prototype = Object.create(super_.prototype, properties);
      return constructor;
    }
    exports = module2.exports = makeError;
    exports.BaseError = BaseError;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/errors.js
var require_errors = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/errors.js'(
    exports,
  ) {
    'use strict';
    var makeError = require_make_error();
    var assign2 = require_object_assign();
    function ClientError(res) {
      var props = extractErrorProps(res);
      ClientError.super.call(this, props.message);
      assign2(this, props);
    }
    function ServerError(res) {
      var props = extractErrorProps(res);
      ServerError.super.call(this, props.message);
      assign2(this, props);
    }
    function extractErrorProps(res) {
      var body = res.body;
      var props = {
        response: res,
        statusCode: res.statusCode,
        responseBody: stringifyBody(body, res),
      };
      if (body.error && body.message) {
        props.message = ''.concat(body.error, ' - ').concat(body.message);
        return props;
      }
      if (body.error && body.error.description) {
        props.message = body.error.description;
        props.details = body.error;
        return props;
      }
      props.message = body.error || body.message || httpErrorMessage(res);
      return props;
    }
    function httpErrorMessage(res) {
      var statusMessage = res.statusMessage
        ? ' '.concat(res.statusMessage)
        : '';
      return ''
        .concat(res.method, '-request to ')
        .concat(res.url, ' resulted in HTTP ')
        .concat(res.statusCode)
        .concat(statusMessage);
    }
    function stringifyBody(body, res) {
      var contentType = (res.headers['content-type'] || '').toLowerCase();
      var isJson = contentType.indexOf('application/json') !== -1;
      return isJson ? JSON.stringify(body, null, 2) : body;
    }
    makeError(ClientError);
    makeError(ServerError);
    exports.ClientError = ClientError;
    exports.ServerError = ServerError;
  },
});

// ../../node_modules/.pnpm/is-retry-allowed@1.2.0/node_modules/is-retry-allowed/index.js
var require_is_retry_allowed = __commonJS({
  '../../node_modules/.pnpm/is-retry-allowed@1.2.0/node_modules/is-retry-allowed/index.js'(
    exports,
    module2,
  ) {
    'use strict';
    var WHITELIST = [
      'ETIMEDOUT',
      'ECONNRESET',
      'EADDRINUSE',
      'ESOCKETTIMEDOUT',
      'ECONNREFUSED',
      'EPIPE',
      'EHOSTUNREACH',
      'EAI_AGAIN',
    ];
    var BLACKLIST = [
      'ENOTFOUND',
      'ENETUNREACH',
      'UNABLE_TO_GET_ISSUER_CERT',
      'UNABLE_TO_GET_CRL',
      'UNABLE_TO_DECRYPT_CERT_SIGNATURE',
      'UNABLE_TO_DECRYPT_CRL_SIGNATURE',
      'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',
      'CERT_SIGNATURE_FAILURE',
      'CRL_SIGNATURE_FAILURE',
      'CERT_NOT_YET_VALID',
      'CERT_HAS_EXPIRED',
      'CRL_NOT_YET_VALID',
      'CRL_HAS_EXPIRED',
      'ERROR_IN_CERT_NOT_BEFORE_FIELD',
      'ERROR_IN_CERT_NOT_AFTER_FIELD',
      'ERROR_IN_CRL_LAST_UPDATE_FIELD',
      'ERROR_IN_CRL_NEXT_UPDATE_FIELD',
      'OUT_OF_MEM',
      'DEPTH_ZERO_SELF_SIGNED_CERT',
      'SELF_SIGNED_CERT_IN_CHAIN',
      'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
      'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
      'CERT_CHAIN_TOO_LONG',
      'CERT_REVOKED',
      'INVALID_CA',
      'PATH_LENGTH_EXCEEDED',
      'INVALID_PURPOSE',
      'CERT_UNTRUSTED',
      'CERT_REJECTED',
    ];
    module2.exports = function (err) {
      if (!err || !err.code) {
        return true;
      }
      if (WHITELIST.indexOf(err.code) !== -1) {
        return true;
      }
      if (BLACKLIST.indexOf(err.code) !== -1) {
        return false;
      }
      return true;
    };
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/util/node-shouldRetry.js
var require_node_shouldRetry = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/util/node-shouldRetry.js'(
    exports,
    module2,
  ) {
    'use strict';
    var allowed = require_is_retry_allowed();
    module2.exports = (err, num, options) => {
      if (options.method !== 'GET' && options.method !== 'HEAD') {
        return false;
      }
      if (err.response && err.response.statusCode) {
        return false;
      }
      return allowed(err);
    };
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/retry.js
var require_retry = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/retry.js'(
    exports,
    module2,
  ) {
    'use strict';
    var objectAssign = require_object_assign();
    var defaultShouldRetry = require_node_shouldRetry();
    var isStream = (stream) =>
      stream !== null &&
      typeof stream === 'object' &&
      typeof stream.pipe === 'function';
    var retry = (opts = {}) => {
      const maxRetries = opts.maxRetries || 5;
      const retryDelay = opts.retryDelay || getRetryDelay;
      const allowRetry = opts.shouldRetry || defaultShouldRetry;
      return {
        onError: (err, context) => {
          const options = context.options;
          const max = options.maxRetries || maxRetries;
          const shouldRetry = options.shouldRetry || allowRetry;
          const attemptNumber = options.attemptNumber || 0;
          if (isStream(options.body)) {
            return err;
          }
          if (
            !shouldRetry(err, attemptNumber, options) ||
            attemptNumber >= max
          ) {
            return err;
          }
          const newContext = objectAssign({}, context, {
            options: objectAssign({}, options, {
              attemptNumber: attemptNumber + 1,
            }),
          });
          setTimeout(
            () => context.channels.request.publish(newContext),
            retryDelay(attemptNumber),
          );
          return null;
        },
      };
    };
    retry.shouldRetry = defaultShouldRetry;
    module2.exports = retry;
    function getRetryDelay(attemptNum) {
      return 100 * Math.pow(2, attemptNum) + Math.random() * 100;
    }
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/debug.js
var require_debug3 = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/debug.js'(
    exports,
    module2,
  ) {
    'use strict';
    var debugIt = require_src();
    var SENSITIVE_HEADERS = ['Cookie', 'Authorization'];
    var hasOwn = Object.prototype.hasOwnProperty;
    var redactKeys = (source, keys) => {
      const target = {};
      for (const key2 in source) {
        if (hasOwn.call(source, key2)) {
          target[key2] = keys.indexOf(key2) > -1 ? '<redacted>' : source[key2];
        }
      }
      return target;
    };
    module2.exports = (opts = {}) => {
      const verbose = opts.verbose;
      const namespace = opts.namespace || 'get-it';
      const defaultLogger = debugIt(namespace);
      const log = opts.log || defaultLogger;
      const shortCircuit = log === defaultLogger && !debugIt.enabled(namespace);
      let requestId = 0;
      return {
        processOptions: (options) => {
          options.debug = log;
          options.requestId = options.requestId || ++requestId;
          return options;
        },
        onRequest: (event2) => {
          if (shortCircuit || !event2) {
            return event2;
          }
          const options = event2.options;
          log(
            '[%s] HTTP %s %s',
            options.requestId,
            options.method,
            options.url,
          );
          if (verbose && options.body && typeof options.body === 'string') {
            log('[%s] Request body: %s', options.requestId, options.body);
          }
          if (verbose && options.headers) {
            const headers =
              opts.redactSensitiveHeaders === false
                ? options.headers
                : redactKeys(options.headers, SENSITIVE_HEADERS);
            log(
              '[%s] Request headers: %s',
              options.requestId,
              JSON.stringify(headers, null, 2),
            );
          }
          return event2;
        },
        onResponse: (res, context) => {
          if (shortCircuit || !res) {
            return res;
          }
          const reqId = context.options.requestId;
          log(
            '[%s] Response code: %s %s',
            reqId,
            res.statusCode,
            res.statusMessage,
          );
          if (verbose && res.body) {
            log('[%s] Response body: %s', reqId, stringifyBody(res));
          }
          return res;
        },
        onError: (err, context) => {
          const reqId = context.options.requestId;
          if (!err) {
            log(
              '[%s] Error encountered, but handled by an earlier middleware',
              reqId,
            );
            return err;
          }
          log('[%s] ERROR: %s', reqId, err.message);
          return err;
        },
      };
    };
    function stringifyBody(res) {
      const contentType = (res.headers['content-type'] || '').toLowerCase();
      const isJson = contentType.indexOf('application/json') !== -1;
      return isJson ? tryFormat(res.body) : res.body;
    }
    function tryFormat(body) {
      try {
        const parsed = typeof body === 'string' ? JSON.parse(body) : body;
        return JSON.stringify(parsed, null, 2);
      } catch (err) {
        return body;
      }
    }
  },
});

// ../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/headers.js
var require_headers = __commonJS({
  '../../node_modules/.pnpm/get-it@6.1.0/node_modules/get-it/lib-node/middleware/headers.js'(
    exports,
    module2,
  ) {
    'use strict';
    var objectAssign = require_object_assign();
    module2.exports = (headers, opts = {}) => ({
      processOptions: (options) => {
        const existing = options.headers || {};
        options.headers = opts.override
          ? objectAssign({}, existing, headers)
          : objectAssign({}, headers, existing);
        return options;
      },
    });
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/package.json
var require_package = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/package.json'(
    exports,
    module2,
  ) {
    module2.exports = {
      name: '@sanity/client',
      version: '3.3.0',
      description:
        'Client for retrieving, creating and patching data from Sanity.io',
      main: 'lib/sanityClient.js',
      umd: 'umd/sanityClient.min.js',
      unpkg: 'umd/sanityClient.min.js',
      types: './sanityClient.d.ts',
      scripts: {
        browserify:
          "NODE_ENV=production BROWSERIFY_ENV=build DEBUG='' browserify -t envify -g uglifyify lib/sanityClient.js -o umd/sanityClient.js --standalone=SanityClient",
        compile: 'babel -d lib src',
        build: 'npm run compile && npm run browserify && npm run minify',
        lint: 'eslint .',
        clean: 'rimraf lib coverage .nyc_output umd/*.js',
        coverage:
          'DEBUG=sanity NODE_ENV=test nyc --reporter=html --reporter=lcov --reporter=text npm test',
        minify: 'terser -c -m -- umd/sanityClient.js > umd/sanityClient.min.js',
        prepublishOnly: 'npm run build',
        test: 'NODE_ENV=test tape test/*.test.js',
        posttest: 'npm run lint',
      },
      browser: {
        './src/http/nodeMiddleware.js': './src/http/browserMiddleware.js',
        './lib/http/nodeMiddleware.js': './lib/http/browserMiddleware.js',
      },
      engines: {
        node: '>=12',
      },
      dependencies: {
        '@sanity/eventsource': '^3.0.2',
        '@sanity/generate-help-url': '^3.0.0',
        'get-it': '^6.0.1',
        'make-error': '^1.3.0',
        'object-assign': '^4.1.1',
        rxjs: '^6.0.0',
      },
      devDependencies: {
        '@babel/cli': '^7.17.6',
        '@babel/core': '^7.17.7',
        '@babel/preset-env': '^7.11.5',
        browserify: '^17.0.0',
        envify: '^4.0.0',
        eslint: '^8.11.0',
        'eslint-config-prettier': '^8.5.0',
        'eslint-config-sanity': '^5.1.0',
        nock: '^13.2.4',
        nyc: '^15.1.0',
        prettier: '^2.6.0',
        rimraf: '^3.0.2',
        'sse-channel': '^4.0.0',
        tape: '^5.5.2',
        terser: '^5.12.1',
        uglifyify: '^5.0.1',
        xtend: '4.0.2',
      },
      repository: {
        type: 'git',
        url: 'git+https://github.com/sanity-io/client.git',
      },
      keywords: [
        'sanity',
        'cms',
        'headless',
        'realtime',
        'content',
        'client',
        'fetch',
        'api',
      ],
      author: 'Sanity.io <hello@sanity.io>',
      license: 'MIT',
      bugs: {
        url: 'https://github.com/sanity-io/client/issues',
      },
      homepage: 'https://www.sanity.io/',
      nyc: {
        include: ['src/**/*.js'],
        sourceMap: false,
      },
      prettier: {
        semi: false,
        printWidth: 100,
        bracketSpacing: false,
        singleQuote: true,
      },
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/nodeMiddleware.js
var require_nodeMiddleware = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/nodeMiddleware.js'(
    exports,
    module2,
  ) {
    'use strict';
    var retry = require_retry();
    var debug = require_debug3();
    var headers = require_headers();
    var pkg = require_package();
    var middleware = [
      debug({
        verbose: true,
        namespace: 'sanity:client',
      }),
      headers({
        'User-Agent': ''.concat(pkg.name, ' ').concat(pkg.version),
      }),
      retry({
        maxRetries: 3,
      }),
    ];
    module2.exports = middleware;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/request.js
var require_request2 = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/request.js'(
    exports,
    module2,
  ) {
    'use strict';
    var getIt = require_get_it();
    var assign2 = require_object_assign();
    var observable = require_observable3();
    var jsonRequest = require_jsonRequest();
    var jsonResponse = require_jsonResponse();
    var progress = require_progress();
    var _require = require_observable2();
    var Observable = _require.Observable;
    var _require2 = require_errors();
    var ClientError = _require2.ClientError;
    var ServerError = _require2.ServerError;
    var httpError = {
      onResponse: function onResponse(res) {
        if (res.statusCode >= 500) {
          throw new ServerError(res);
        } else if (res.statusCode >= 400) {
          throw new ClientError(res);
        }
        return res;
      },
    };
    var printWarnings = {
      onResponse: function onResponse(res) {
        var warn = res.headers['x-sanity-warning'];
        var warnings = Array.isArray(warn) ? warn : [warn];
        warnings.filter(Boolean).forEach(function (msg) {
          return console.warn(msg);
        });
        return res;
      },
    };
    var envSpecific = require_nodeMiddleware();
    var middleware = envSpecific.concat([
      printWarnings,
      jsonRequest(),
      jsonResponse(),
      progress(),
      httpError,
      observable({
        implementation: Observable,
      }),
    ]);
    var request = getIt(middleware);
    function httpRequest(options) {
      var requester =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : request;
      return requester(
        assign2(
          {
            maxRedirects: 0,
          },
          options,
        ),
      );
    }
    httpRequest.defaultRequester = request;
    httpRequest.ClientError = ClientError;
    httpRequest.ServerError = ServerError;
    module2.exports = httpRequest;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/requestOptions.js
var require_requestOptions = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/http/requestOptions.js'(
    exports,
    module2,
  ) {
    'use strict';
    var assign2 = require_object_assign();
    var projectHeader = 'X-Sanity-Project-ID';
    module2.exports = function (config) {
      var overrides =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var headers = {};
      var token = overrides.token || config.token;
      if (token) {
        headers.Authorization = 'Bearer '.concat(token);
      }
      if (
        !overrides.useGlobalApi &&
        !config.useProjectHostname &&
        config.projectId
      ) {
        headers[projectHeader] = config.projectId;
      }
      var withCredentials = Boolean(
        typeof overrides.withCredentials === 'undefined'
          ? config.token || config.withCredentials
          : overrides.withCredentials,
      );
      var timeout =
        typeof overrides.timeout === 'undefined'
          ? config.timeout
          : overrides.timeout;
      return assign2({}, overrides, {
        headers: assign2({}, headers, overrides.headers || {}),
        timeout: typeof timeout === 'undefined' ? 5 * 60 * 1e3 : timeout,
        proxy: overrides.proxy || config.proxy,
        json: true,
        withCredentials,
      });
    };
  },
});

// ../../node_modules/.pnpm/@sanity+generate-help-url@3.0.0/node_modules/@sanity/generate-help-url/dist/generate-help-url.cjs.js
var require_generate_help_url_cjs = __commonJS({
  '../../node_modules/.pnpm/@sanity+generate-help-url@3.0.0/node_modules/@sanity/generate-help-url/dist/generate-help-url.cjs.js'(
    exports,
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports[Symbol.toStringTag] = 'Module';
    var t2 = 'https://docs.sanity.io/help/';
    function r2(e2) {
      return t2 + e2;
    }
    exports.generateHelpUrl = r2;
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/once.js
var require_once = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/util/once.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = function (fn) {
      var didCall = false;
      var returnValue;
      return function () {
        if (didCall) {
          return returnValue;
        }
        returnValue = fn.apply(void 0, arguments);
        didCall = true;
        return returnValue;
      };
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/warnings.js
var require_warnings = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/warnings.js'(
    exports,
  ) {
    'use strict';
    var generateHelpUrl = require_generate_help_url_cjs().generateHelpUrl;
    var once = require_once();
    var createWarningPrinter = function createWarningPrinter2(message) {
      return once(function () {
        var _console;
        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }
        return (_console = console).warn.apply(
          _console,
          [message.join(' ')].concat(args),
        );
      });
    };
    exports.printCdnWarning = createWarningPrinter([
      'You are not using the Sanity CDN. That means your data is always fresh, but the CDN is faster and',
      'cheaper. Think about it! For more info, see '.concat(
        generateHelpUrl('js-client-cdn-configuration'),
        '.',
      ),
      'To hide this warning, please set the `useCdn` option to either `true` or `false` when creating',
      'the client.',
    ]);
    exports.printBrowserTokenWarning = createWarningPrinter([
      'You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.',
      'See '.concat(
        generateHelpUrl('js-client-browser-token'),
        ' for more information and how to hide this warning.',
      ),
    ]);
    exports.printNoApiVersionSpecifiedWarning = createWarningPrinter([
      'Using the Sanity client without specifying an API version is deprecated.',
      'See '.concat(generateHelpUrl('js-client-api-version')),
    ]);
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/config.js
var require_config2 = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/config.js'(
    exports,
  ) {
    'use strict';
    var generateHelpUrl = require_generate_help_url_cjs().generateHelpUrl;
    var assign2 = require_object_assign();
    var validate = require_validators();
    var warnings = require_warnings();
    var defaultCdnHost = 'apicdn.sanity.io';
    var defaultConfig = {
      apiHost: 'https://api.sanity.io',
      apiVersion: '1',
      useProjectHostname: true,
      isPromiseAPI: true,
    };
    var LOCALHOSTS = ['localhost', '127.0.0.1', '0.0.0.0'];
    var isLocal = function isLocal2(host) {
      return LOCALHOSTS.indexOf(host) !== -1;
    };
    exports.defaultConfig = defaultConfig;
    exports.initConfig = function (config, prevConfig) {
      var specifiedConfig = assign2({}, prevConfig, config);
      if (!specifiedConfig.apiVersion) {
        warnings.printNoApiVersionSpecifiedWarning();
      }
      var newConfig = assign2({}, defaultConfig, specifiedConfig);
      var projectBased = newConfig.useProjectHostname;
      if (typeof Promise === 'undefined') {
        var helpUrl = generateHelpUrl('js-client-promise-polyfill');
        throw new Error(
          'No native Promise-implementation found, polyfill needed - see '.concat(
            helpUrl,
          ),
        );
      }
      if (projectBased && !newConfig.projectId) {
        throw new Error('Configuration must contain `projectId`');
      }
      var isBrowser =
        typeof window !== 'undefined' &&
        window.location &&
        window.location.hostname;
      var isLocalhost = isBrowser && isLocal(window.location.hostname);
      if (
        isBrowser &&
        isLocalhost &&
        newConfig.token &&
        newConfig.ignoreBrowserTokenWarning !== true
      ) {
        warnings.printBrowserTokenWarning();
      } else if (typeof newConfig.useCdn === 'undefined') {
        warnings.printCdnWarning();
      }
      if (projectBased) {
        validate.projectId(newConfig.projectId);
      }
      if (newConfig.dataset) {
        validate.dataset(newConfig.dataset);
      }
      if ('requestTagPrefix' in newConfig) {
        newConfig.requestTagPrefix = newConfig.requestTagPrefix
          ? validate.requestTag(newConfig.requestTagPrefix).replace(/\.+$/, '')
          : void 0;
      }
      newConfig.apiVersion = ''.concat(newConfig.apiVersion).replace(/^v/, '');
      newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost;
      newConfig.useCdn =
        Boolean(newConfig.useCdn) && !newConfig.withCredentials;
      exports.validateApiVersion(newConfig.apiVersion);
      var hostParts = newConfig.apiHost.split('://', 2);
      var protocol = hostParts[0];
      var host = hostParts[1];
      var cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
      if (newConfig.useProjectHostname) {
        newConfig.url = ''
          .concat(protocol, '://')
          .concat(newConfig.projectId, '.')
          .concat(host, '/v')
          .concat(newConfig.apiVersion);
        newConfig.cdnUrl = ''
          .concat(protocol, '://')
          .concat(newConfig.projectId, '.')
          .concat(cdnHost, '/v')
          .concat(newConfig.apiVersion);
      } else {
        newConfig.url = ''
          .concat(newConfig.apiHost, '/v')
          .concat(newConfig.apiVersion);
        newConfig.cdnUrl = newConfig.url;
      }
      return newConfig;
    };
    exports.validateApiVersion = function validateApiVersion(apiVersion) {
      if (apiVersion === '1' || apiVersion === 'X') {
        return;
      }
      var apiDate = new Date(apiVersion);
      var apiVersionValid =
        /^\d{4}-\d{2}-\d{2}$/.test(apiVersion) &&
        apiDate instanceof Date &&
        apiDate.getTime() > 0;
      if (!apiVersionValid) {
        throw new Error(
          'Invalid API version string, expected `1` or date in format `YYYY-MM-DD`',
        );
      }
    };
  },
});

// ../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/sanityClient.js
var require_sanityClient = __commonJS({
  '../../node_modules/.pnpm/@sanity+client@3.3.0/node_modules/@sanity/client/lib/sanityClient.js'(
    exports,
    module2,
  ) {
    'use strict';
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly &&
          (symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          })),
          keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2] != null ? arguments[i2] : {};
        i2 % 2
          ? ownKeys(Object(source), true).forEach(function (key2) {
              _defineProperty(target, key2, source[key2]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(
              target,
              Object.getOwnPropertyDescriptors(source),
            )
          : ownKeys(Object(source)).forEach(function (key2) {
              Object.defineProperty(
                target,
                key2,
                Object.getOwnPropertyDescriptor(source, key2),
              );
            });
      }
      return target;
    }
    function _defineProperty(obj, key2, value) {
      if (key2 in obj) {
        Object.defineProperty(obj, key2, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key2] = value;
      }
      return obj;
    }
    var assign2 = require_object_assign();
    var _require = require_observable2();
    var Observable = _require.Observable;
    var map = _require.map;
    var filter = _require.filter;
    var Patch = require_patch();
    var Transaction = require_transaction();
    var dataMethods = require_dataMethods();
    var DatasetsClient = require_datasetsClient();
    var ProjectsClient = require_projectsClient();
    var AssetsClient = require_assetsClient();
    var UsersClient = require_usersClient();
    var AuthClient = require_authClient();
    var httpRequest = require_request2();
    var getRequestOptions = require_requestOptions();
    var _require2 = require_config2();
    var defaultConfig = _require2.defaultConfig;
    var initConfig = _require2.initConfig;
    var validate = require_validators();
    var toPromise = function toPromise2(observable) {
      return observable.toPromise();
    };
    function SanityClient() {
      var config =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : defaultConfig;
      if (!(this instanceof SanityClient)) {
        return new SanityClient(config);
      }
      this.config(config);
      this.assets = new AssetsClient(this);
      this.datasets = new DatasetsClient(this);
      this.projects = new ProjectsClient(this);
      this.users = new UsersClient(this);
      this.auth = new AuthClient(this);
      if (this.clientConfig.isPromiseAPI) {
        var observableConfig = assign2({}, this.clientConfig, {
          isPromiseAPI: false,
        });
        this.observable = new SanityClient(observableConfig);
      }
    }
    assign2(SanityClient.prototype, dataMethods);
    assign2(SanityClient.prototype, {
      clone: function clone2() {
        return new SanityClient(this.config());
      },
      config: function config(newConfig) {
        if (typeof newConfig === 'undefined') {
          return assign2({}, this.clientConfig);
        }
        if (this.observable) {
          var observableConfig = assign2({}, newConfig, {
            isPromiseAPI: false,
          });
          this.observable.config(observableConfig);
        }
        this.clientConfig = initConfig(newConfig, this.clientConfig || {});
        return this;
      },
      withConfig: function withConfig(newConfig) {
        return this.clone().config(newConfig);
      },
      getUrl: function getUrl(uri) {
        var useCdn =
          arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : false;
        var base2 = useCdn ? this.clientConfig.cdnUrl : this.clientConfig.url;
        return ''.concat(base2, '/').concat(uri.replace(/^\//, ''));
      },
      isPromiseAPI: function isPromiseAPI() {
        return this.clientConfig.isPromiseAPI;
      },
      _requestObservable: function _requestObservable(options) {
        var _this = this;
        var uri = options.url || options.uri;
        var canUseCdn =
          typeof options.canUseCdn === 'undefined'
            ? ['GET', 'HEAD'].indexOf(options.method || 'GET') >= 0 &&
              uri.indexOf('/data/') === 0
            : options.canUseCdn;
        var useCdn = this.clientConfig.useCdn && canUseCdn;
        var tag =
          options.tag && this.clientConfig.requestTagPrefix
            ? [this.clientConfig.requestTagPrefix, options.tag].join('.')
            : options.tag || this.clientConfig.requestTagPrefix;
        if (tag) {
          options.query = _objectSpread(
            {
              tag: validate.requestTag(tag),
            },
            options.query,
          );
        }
        var reqOptions = getRequestOptions(
          this.clientConfig,
          assign2({}, options, {
            url: this.getUrl(uri, useCdn),
          }),
        );
        return new Observable(function (subscriber) {
          return httpRequest(
            reqOptions,
            _this.clientConfig.requester,
          ).subscribe(subscriber);
        });
      },
      request: function request(options) {
        var observable = this._requestObservable(options).pipe(
          filter(function (event2) {
            return event2.type === 'response';
          }),
          map(function (event2) {
            return event2.body;
          }),
        );
        return this.isPromiseAPI() ? toPromise(observable) : observable;
      },
    });
    SanityClient.Patch = Patch;
    SanityClient.Transaction = Transaction;
    SanityClient.ClientError = httpRequest.ClientError;
    SanityClient.ServerError = httpRequest.ServerError;
    SanityClient.requester = httpRequest.defaultRequester;
    module2.exports = SanityClient;
  },
});

// ../../node_modules/.pnpm/groq@2.29.3/node_modules/groq/lib/groq.js
var require_groq = __commonJS({
  '../../node_modules/.pnpm/groq@2.29.3/node_modules/groq/lib/groq.js'(
    exports,
    module2,
  ) {
    'use strict';
    module2.exports = function groq2(strings) {
      for (
        var _len = arguments.length,
          keys = new Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        keys[_key - 1] = arguments[_key];
      }
      var lastIndex = strings.length - 1;
      return (
        strings.slice(0, lastIndex).reduce(function (acc, str, i2) {
          return acc + str + keys[i2];
        }, '') + strings[lastIndex]
      );
    };
  },
});

// .svelte-kit/output/server/chunks/api-8cad7f2c.js
var import_client,
  import_groq,
  __defProp4,
  __getOwnPropSymbols3,
  __hasOwnProp4,
  __propIsEnum3,
  __defNormalProp3,
  __spreadValues3,
  client,
  TrainingSheetApi;
var init_api_8cad7f2c = __esm({
  '.svelte-kit/output/server/chunks/api-8cad7f2c.js'() {
    import_client = __toESM(require_sanityClient(), 1);
    import_groq = __toESM(require_groq(), 1);
    __defProp4 = Object.defineProperty;
    __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
    __hasOwnProp4 = Object.prototype.hasOwnProperty;
    __propIsEnum3 = Object.prototype.propertyIsEnumerable;
    __defNormalProp3 = (obj, key2, value) =>
      key2 in obj
        ? __defProp4(obj, key2, {
            enumerable: true,
            configurable: true,
            writable: true,
            value,
          })
        : (obj[key2] = value);
    __spreadValues3 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp4.call(b, prop)) __defNormalProp3(a, prop, b[prop]);
      if (__getOwnPropSymbols3)
        for (var prop of __getOwnPropSymbols3(b)) {
          if (__propIsEnum3.call(b, prop)) __defNormalProp3(a, prop, b[prop]);
        }
      return a;
    };
    client = (0, import_client.default)({
      projectId: 'gc3hakk3',
      dataset: 'production',
      apiVersion: 'v1',
      useCdn: false,
    });
    TrainingSheetApi = {
      async getSheet() {
        const query = import_groq.default`
*[_type=="trainingSchema"]|order(_createdAt desc)[1]{
  title,
  _id,
  schema[] -> {
    _id,
    routine{
      ...,
      training[] {
        ...,
        exercise ->{
           name,
          "image": image.asset->{
            url,
            "width": metadata.dimensions.width,
            "height": metadata.dimensions.height,
          },
          "youtubeVideoId": video.videoId
        }
      }
    }
  }
}
`;
        return client.fetch(query);
      },
      async getById(key2) {
        const query = import_groq.default`
    *[_type=="trainingRoutine" && _id == $id][0]{
      _id,
      routine{
        ...,
        training[] {
          ...,
          exercise ->{
            name,
            "image": image.asset->{
              url,
              "width": metadata.dimensions.width,
              "height": metadata.dimensions.height,
            },
            "youtubeVideoId": video.videoId
          }
        }
      }
    }
    `;
        const result = await client.fetch(query, { id: key2 });
        return __spreadValues3(
          {
            _id: result._id,
          },
          result.routine,
        );
      },
    };
  },
});

// .svelte-kit/output/server/entries/endpoints/index.ts.js
var index_ts_exports = {};
__export(index_ts_exports, {
  get: () => get,
});
async function get() {
  const trainingSheet = await TrainingSheetApi.getSheet();
  const suggestedCurrentIndex = trainingSheet.schema.findIndex((s3) => {
    const schemasFormattedDate = new Intl.DateTimeFormat('pt-BR').format(
      new Date(s3.routine.date),
    );
    const todaysFormattedDate = new Intl.DateTimeFormat('pt-BR').format(
      new Date(),
    );
    return schemasFormattedDate === todaysFormattedDate;
  });
  return {
    body: {
      trainingSheet,
      suggestedCurrentIndex,
    },
  };
}
var import_client2, import_groq2;
var init_index_ts = __esm({
  '.svelte-kit/output/server/entries/endpoints/index.ts.js'() {
    init_api_8cad7f2c();
    import_client2 = __toESM(require_sanityClient(), 1);
    import_groq2 = __toESM(require_groq(), 1);
  },
});

// .svelte-kit/output/server/entries/endpoints/workout/_id_.ts.js
var id_ts_exports = {};
__export(id_ts_exports, {
  get: () => get2,
});
async function get2({ params }) {
  const { id } = params;
  const trainingRoutine = await TrainingSheetApi.getById(id);
  return {
    body: {
      trainingRoutine,
    },
  };
}
var import_client3, import_groq3;
var init_id_ts = __esm({
  '.svelte-kit/output/server/entries/endpoints/workout/_id_.ts.js'() {
    init_api_8cad7f2c();
    import_client3 = __toESM(require_sanityClient(), 1);
    import_groq3 = __toESM(require_groq(), 1);
  },
});

// .svelte-kit/vercel-tmp/serverless.js
var serverless_exports = {};
__export(serverless_exports, {
  default: () => serverless_default,
});
module.exports = __toCommonJS(serverless_exports);
init_install_fetch();

// ../../node_modules/.pnpm/@sveltejs+kit@1.0.0-next.335_svelte@3.48.0/node_modules/@sveltejs/kit/dist/node.js
var import_stream = require('stream');
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2['content-type']) {
      return fulfil(null);
    }
    req.on('error', reject);
    const length = Number(h2['content-length']);
    if (isNaN(length) && h2['transfer-encoding'] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on('data', (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit',
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on('data', (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on('end', () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[':method'];
    delete headers[':path'];
    delete headers[':authority'];
    delete headers[':scheme'];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req),
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has('set-cookie')) {
    headers['set-cookie'] = response.headers.raw()['set-cookie'];
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_46a73c56();
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) =>
  key2 in obj
    ? __defProp2(obj, key2, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key2] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function afterUpdate() {}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext('__svelte__', stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if (
    $$props.components === void 0 &&
    $$bindings.components &&
    components !== void 0
  )
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${
  components[1]
    ? `${validate_component(
        components[0] || missing_component,
        'svelte:component',
      ).$$render(
        $$result,
        Object.assign(props_0 || {}),
        {},
        {
          default: () => {
            return `${
              components[2]
                ? `${validate_component(
                    components[1] || missing_component,
                    'svelte:component',
                  ).$$render(
                    $$result,
                    Object.assign(props_1 || {}),
                    {},
                    {
                      default: () => {
                        return `${validate_component(
                          components[2] || missing_component,
                          'svelte:component',
                        ).$$render(
                          $$result,
                          Object.assign(props_2 || {}),
                          {},
                          {},
                        )}`;
                      },
                    },
                  )}`
                : `${validate_component(
                    components[1] || missing_component,
                    'svelte:component',
                  ).$$render($$result, Object.assign(props_1 || {}), {}, {})}`
            }`;
          },
        },
      )}`
    : `${validate_component(
        components[0] || missing_component,
        'svelte:component',
      ).$$render($$result, Object.assign(props_0 || {}), {}, {})}`
}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value) continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === 'string') {
    while (i2) hash2 = (hash2 * 33) ^ value.charCodeAt(--i2);
  } else {
    while (i2) hash2 = (hash2 * 33) ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2]
      .replace(/%23/g, '#')
      .replace(/%3[Bb]/g, ';')
      .replace(/%2[Cc]/g, ',')
      .replace(/%2[Ff]/g, '/')
      .replace(/%3[Ff]/g, '?')
      .replace(/%3[Aa]/g, ':')
      .replace(/%40/g, '@')
      .replace(/%26/g, '&')
      .replace(/%3[Dd]/g, '=')
      .replace(/%2[Bb]/g, '+')
      .replace(/%24/g, '$');
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== 'object') return false;
  if (body) {
    if (body instanceof Uint8Array) return false;
    if (body._readableState && typeof body.pipe === 'function') return false;
    if (typeof ReadableStream !== 'undefined' && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event2) {
  const method = event2.request.method.toLowerCase();
  return method === 'delete' ? 'del' : method;
}
function error(body) {
  return new Response(body, {
    status: 500,
  });
}
function is_string(s22) {
  return typeof s22 === 'string' || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  'application/xml',
  'application/json',
  'application/x-www-form-urlencoded',
  'multipart/form-data',
]);
function is_text(content_type) {
  if (!content_type) return true;
  const type = content_type.split(';')[0].toLowerCase();
  return (
    type.startsWith('text/') || type.endsWith('+xml') || text_types.has(type)
  );
}
async function render_endpoint(event2, mod) {
  const method = normalize_request_method(event2);
  let handler = mod[method];
  if (!handler && method === 'head') {
    handler = mod.get;
  }
  if (!handler) {
    const allowed = [];
    for (const method2 in ['get', 'post', 'put', 'patch']) {
      if (mod[method2]) allowed.push(method2.toUpperCase());
    }
    if (mod.del) allowed.push('DELETE');
    if (mod.get || mod.head) allowed.push('HEAD');
    return event2.request.headers.get('x-sveltekit-load')
      ? new Response(void 0, {
          status: 204,
        })
      : new Response(`${event2.request.method} method not allowed`, {
          status: 405,
          headers: {
            allow: allowed.join(', '),
          },
        });
  }
  const response = await handler(event2);
  const preface = `Invalid response from route ${event2.url.pathname}`;
  if (typeof response !== 'object') {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error(
      'fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching',
    );
  }
  const { status = 200, body = {} } = response;
  const headers =
    response.headers instanceof Headers
      ? new Headers(response.headers)
      : to_headers(response.headers);
  const type = headers.get('content-type');
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(
      `${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`,
    );
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith('application/json'))) {
    headers.set('content-type', 'application/json; charset=utf-8');
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if (
    (typeof normalized_body === 'string' ||
      normalized_body instanceof Uint8Array) &&
    !headers.has('etag')
  ) {
    const cache_control = headers.get('cache-control');
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set('etag', `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== 'head' ? normalized_body : void 0, {
    status,
    headers,
  });
}
var chars$1 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved =
  /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  '<': '\\u003C',
  '>': '\\u003E',
  '/': '\\u002F',
  '\\': '\\\\',
  '\b': '\\b',
  '\f': '\\f',
  '\n': '\\n',
  '\r': '\\r',
  '	': '\\t',
  '\0': '\\0',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype)
  .sort()
  .join('\0');
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === 'function') {
      throw new Error('Cannot stringify a function');
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case 'Number':
        case 'String':
        case 'Boolean':
        case 'Date':
        case 'RegExp':
          return;
        case 'Array':
          thing.forEach(walk);
          break;
        case 'Set':
        case 'Map':
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (
            proto !== Object.prototype &&
            proto !== null &&
            Object.getOwnPropertyNames(proto).sort().join('\0') !==
              objectProtoOwnPropertyNames
          ) {
            throw new Error('Cannot stringify arbitrary non-POJOs');
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error('Cannot stringify POJOs with symbolic keys');
          }
          Object.keys(thing).forEach(function (key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts)
    .filter(function (entry5) {
      return entry5[1] > 1;
    })
    .sort(function (a, b) {
      return b[1] - a[1];
    })
    .forEach(function (entry5, i2) {
      names.set(entry5[0], getName(i2));
    });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case 'Number':
      case 'String':
      case 'Boolean':
        return 'Object(' + stringify(thing.valueOf()) + ')';
      case 'RegExp':
        return (
          'new RegExp(' +
          stringifyString(thing.source) +
          ', "' +
          thing.flags +
          '")'
        );
      case 'Date':
        return 'new Date(' + thing.getTime() + ')';
      case 'Array':
        var members = thing.map(function (v, i2) {
          return i2 in thing ? stringify(v) : '';
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? '' : ',';
        return '[' + members.join(',') + tail + ']';
      case 'Set':
      case 'Map':
        return (
          'new ' +
          type +
          '([' +
          Array.from(thing).map(stringify).join(',') +
          '])'
        );
      default:
        var obj =
          '{' +
          Object.keys(thing)
            .map(function (key2) {
              return safeKey(key2) + ':' + stringify(thing[key2]);
            })
            .join(',') +
          '}';
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0
            ? 'Object.assign(Object.create(null),' + obj + ')'
            : 'Object.create(null)';
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function (name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case 'Number':
        case 'String':
        case 'Boolean':
          values_1.push('Object(' + stringify(thing.valueOf()) + ')');
          break;
        case 'RegExp':
          values_1.push(thing.toString());
          break;
        case 'Date':
          values_1.push('new Date(' + thing.getTime() + ')');
          break;
        case 'Array':
          values_1.push('Array(' + thing.length + ')');
          thing.forEach(function (v, i2) {
            statements_1.push(name + '[' + i2 + ']=' + stringify(v));
          });
          break;
        case 'Set':
          values_1.push('new Set');
          statements_1.push(
            name +
              '.' +
              Array.from(thing)
                .map(function (v) {
                  return 'add(' + stringify(v) + ')';
                })
                .join('.'),
          );
          break;
        case 'Map':
          values_1.push('new Map');
          statements_1.push(
            name +
              '.' +
              Array.from(thing)
                .map(function (_a4) {
                  var k = _a4[0],
                    v = _a4[1];
                  return 'set(' + stringify(k) + ', ' + stringify(v) + ')';
                })
                .join('.'),
          );
          break;
        default:
          values_1.push(
            Object.getPrototypeOf(thing) === null
              ? 'Object.create(null)'
              : '{}',
          );
          Object.keys(thing).forEach(function (key2) {
            statements_1.push(
              '' + name + safeProp(key2) + '=' + stringify(thing[key2]),
            );
          });
      }
    });
    statements_1.push('return ' + str);
    return (
      '(function(' +
      params_1.join(',') +
      '){' +
      statements_1.join(';') +
      '}(' +
      values_1.join(',') +
      '))'
    );
  } else {
    return str;
  }
}
function getName(num) {
  var name = '';
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + '_' : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === 'string') return stringifyString(thing);
  if (thing === void 0) return 'void 0';
  if (thing === 0 && 1 / thing < 0) return '-0';
  var str = String(thing);
  if (typeof thing === 'number') return str.replace(/^(-)?0\./, '$1.');
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2)
    ? key2
    : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2)
    ? '.' + key2
    : '[' + escapeUnsafeChars(JSON.stringify(key2)) + ']';
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i2];
      } else {
        result += '\\u' + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {}
function safe_not_equal2(a, b) {
  return a != a
    ? b == b
    : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe,
  };
}
function writable(value, start = noop3) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || (err && err.name && err.message)
    ? err
    : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  '<': '\\u003C',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};
var render_json_payload_script_regex = new RegExp(
  `[${Object.keys(render_json_payload_script_dict).join('')}]`,
  'g',
);
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(
    render_json_payload_script_regex,
    (match) => render_json_payload_script_dict[match],
  );
  let safe_attrs = '';
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0) continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  '&': '&amp;',
  '"': '&quot;',
};
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join(
    '',
  )}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  'g',
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === 'search' || prop === 'searchParams') {
        throw new Error(
          `Cannot access url.${prop} on a page with prerendering enabled`,
        );
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array = encode$1(data);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[(i22 + 1) & 15];
        b = w[(i22 + 14) & 15];
        tmp = w[i22 & 15] =
          (((a >>> 7) ^ (a >>> 18) ^ (a >>> 3) ^ (a << 25) ^ (a << 14)) +
            ((b >>> 17) ^ (b >>> 19) ^ (b >>> 10) ^ (b << 15) ^ (b << 13)) +
            w[i22 & 15] +
            w[(i22 + 9) & 15]) |
          0;
      }
      tmp =
        tmp +
        out7 +
        ((out4 >>> 6) ^
          (out4 >>> 11) ^
          (out4 >>> 25) ^
          (out4 << 26) ^
          (out4 << 21) ^
          (out4 << 7)) +
        (out6 ^ (out4 & (out5 ^ out6))) +
        key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = (out3 + tmp) | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 =
        (tmp +
          ((out1 & out2) ^ (out3 & (out1 ^ out2))) +
          ((out1 >>> 2) ^
            (out1 >>> 13) ^
            (out1 >>> 22) ^
            (out1 << 30) ^
            (out1 << 19) ^
            (out1 << 10))) |
        0;
    }
    out[0] = (out[0] + out0) | 0;
    out[1] = (out[1] + out1) | 0;
    out[2] = (out[2] + out2) | 0;
    out[3] = (out[3] + out3) | 0;
    out[4] = (out[4] + out4) | 0;
    out[5] = (out[5] + out5) | 0;
    out[6] = (out[6] + out6) | 0;
    out[7] = (out[7] + out7) | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
function base64(bytes) {
  const l = bytes.length;
  let result = '';
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[((bytes[i2 - 2] & 3) << 4) | (bytes[i2 - 1] >> 4)];
    result += chars[((bytes[i2 - 1] & 15) << 2) | (bytes[i2] >> 6)];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += '==';
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[((bytes[i2 - 2] & 3) << 4) | (bytes[i2 - 1] >> 4)];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += '=';
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== 'undefined') {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = 'crypto';
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString('base64');
    };
    generate_hash = (input) => {
      return crypto2
        .createHash('sha256')
        .update(input, 'utf-8')
        .digest()
        .toString('base64');
    };
  });
}
var quoted = /* @__PURE__ */ new Set([
  'self',
  'unsafe-eval',
  'unsafe-hashes',
  'unsafe-inline',
  'none',
  'strict-dynamic',
  'report-sample',
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes,
  _dev,
  _script_needs_csp,
  _style_needs_csp,
  _directives,
  _script_src,
  _style_src;
var Csp = class {
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    __privateAdd(this, _use_hashes, void 0);
    __privateAdd(this, _dev, void 0);
    __privateAdd(this, _script_needs_csp, void 0);
    __privateAdd(this, _style_needs_csp, void 0);
    __privateAdd(this, _directives, void 0);
    __privateAdd(this, _script_src, void 0);
    __privateAdd(this, _style_src, void 0);
    __privateSet(
      this,
      _use_hashes,
      mode === 'hash' || (mode === 'auto' && prerender),
    );
    __privateSet(
      this,
      _directives,
      dev ? __spreadValues({}, directives) : directives,
    );
    __privateSet(this, _dev, dev);
    const d = __privateGet(this, _directives);
    if (dev) {
      const effective_style_src2 = d['style-src'] || d['default-src'];
      if (
        effective_style_src2 &&
        !effective_style_src2.includes('unsafe-inline')
      ) {
        d['style-src'] = [...effective_style_src2, 'unsafe-inline'];
      }
    }
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d['script-src'] || d['default-src'];
    const effective_style_src = d['style-src'] || d['default-src'];
    __privateSet(
      this,
      _script_needs_csp,
      !!effective_script_src &&
        effective_script_src.filter((value) => value !== 'unsafe-inline')
          .length > 0,
    );
    __privateSet(
      this,
      _style_needs_csp,
      !dev &&
        !!effective_style_src &&
        effective_style_src.filter((value) => value !== 'unsafe-inline')
          .length > 0,
    );
    this.script_needs_nonce =
      __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce =
      __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(
          `sha256-${generate_hash(content)}`,
        );
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues({}, __privateGet(this, _directives));
    if (__privateGet(this, _style_src).length > 0) {
      directives['style-src'] = [
        ...(directives['style-src'] || directives['default-src'] || []),
        ...__privateGet(this, _style_src),
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives['script-src'] = [
        ...(directives['script-src'] || directives['default-src'] || []),
        ...__privateGet(this, _script_src),
      ];
    }
    for (const key2 in directives) {
      if (
        is_meta &&
        (key2 === 'frame-ancestors' ||
          key2 === 'report-uri' ||
          key2 === 'sandbox')
      ) {
        continue;
      }
      const value = directives[key2];
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(' '));
    }
    return header.join('; ');
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
_use_hashes = new WeakMap();
_dev = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
var updated = __spreadProps(__spreadValues({}, readable(false)), {
  check: () => false,
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event: event2,
  resolve_opts,
  stuff,
}) {
  if (state.prerender) {
    if (options.csp.mode === 'nonce') {
      throw new Error(
        'Cannot use prerendering if config.kit.csp.mode === "nonce"',
      );
    }
    if (options.template_contains_nonce) {
      throw new Error(
        'Cannot use prerendering if page template contains %svelte.nonce%',
      );
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let cache;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(
      ({ node, props: props2, loaded, fetched, uses_credentials }) => {
        if (node.css) node.css.forEach((url) => stylesheets.add(url));
        if (node.js) node.js.forEach((url) => modulepreloads.add(url));
        if (node.styles)
          Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
        if (fetched && page_config.hydrate) serialized_data.push(...fetched);
        if (props2) shadow_props = props2;
        cache = loaded == null ? void 0 : loaded.cache;
        is_private =
          (cache == null ? void 0 : cache.private) ?? uses_credentials;
      },
    );
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: __spreadProps(__spreadValues({}, session), {
          subscribe: (fn) => {
            is_private = (cache == null ? void 0 : cache.private) ?? true;
            return session.subscribe(fn);
          },
        }),
        updated,
      },
      page: {
        error: error2,
        params: event2.params,
        routeId: event2.routeId,
        status,
        stuff,
        url: state.prerender
          ? create_prerendering_url_proxy(event2.url)
          : event2.url,
      },
      components: branch.map(({ node }) => node.module.default),
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(
            `$page.${property} has been replaced by $page.url.${replacement}`,
          );
        },
      });
    };
    print_error('origin', 'origin');
    print_error('path', 'pathname');
    print_error('query', 'searchParams');
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: '', html: '', css: { code: '', map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join('\n');
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce,
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
        throw new Error(`Failed to serialize session data: ${error3.message}`);
      })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${
        resolve_opts.ssr && page_config.hydrate
          ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || [])
            .map(({ node }) => `import(${s2(options.prefix + node.entry)})`)
            .join(',\n						')}
				],
				params: ${devalue(event2.params)},
				routeId: ${s2(event2.routeId)}
			}`
          : 'null'
      }
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			addEventListener('load', () => {
				navigator.serviceWorker.register('${options.service_worker}');
			});
		}
	`;
  if (options.amp) {
    const styles2 = `${inlined_style}
${rendered.css.code}`;
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${styles2}</style>`;
    if (options.service_worker) {
      head +=
        '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev) attributes.push(' data-sveltekit');
      if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join('')}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets)
      .map((dep) => {
        const attributes = [
          'rel="stylesheet"',
          `href="${options.prefix + dep}"`,
        ];
        if (csp.style_needs_nonce) {
          attributes.push(`nonce="${csp.nonce}"`);
        }
        if (styles.has(dep)) {
          attributes.push('disabled', 'media="(max-width: 0)"');
        }
        return `
	<link ${attributes.join(' ')}>`;
      })
      .join('');
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads)
        .map(
          (dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`,
        )
        .join('');
      const attributes = [
        'type="module"',
        `data-sveltekit-hydrate="${target}"`,
      ];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      body += `
		<script ${attributes.join(' ')}>${init_app}<\/script>`;
      body += serialized_data
        .map(({ url, body: body2, response }) =>
          render_json_payload_script(
            {
              type: 'data',
              url,
              body: typeof body2 === 'string' ? hash(body2) : void 0,
            },
            response,
          ),
        )
        .join('\n	');
      if (shadow_props) {
        body += render_json_payload_script({ type: 'props' }, shadow_props);
      }
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${
          csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ''
        }>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender && !options.amp) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (cache) {
      http_equiv.push(
        `<meta http-equiv="cache-control" content="max-age=${cache.maxage}">`,
      );
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join('\n') + head;
    }
  }
  const segments = event2.url.pathname
    .slice(options.paths.base.length)
    .split('/')
    .slice(2);
  const assets2 =
    options.paths.assets ||
    (segments.length > 0 ? segments.map(() => '..').join('/') : '.');
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce }),
  });
  const headers = new Headers({
    'content-type': 'text/html',
    etag: `"${hash(html)}"`,
  });
  if (cache) {
    headers.set(
      'cache-control',
      `${is_private ? 'private' : 'public'}, max-age=${cache.maxage}`,
    );
  }
  if (!options.floc) {
    headers.set('permissions-policy', 'interest-cohort=()');
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set('content-security-policy', csp_header);
    }
  }
  return new Response(html, {
    status,
    headers,
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail) fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2) return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(
      __spreadProps(__spreadValues({}, error2), { name, message, stack }),
    );
  }
  if (!serialized) {
    serialized = '{}';
  }
  return serialized;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf('=', index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(';', index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(';', eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index, eqIdx).trim();
    if (obj[key2] === void 0) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }
  var str = name + '=' + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid');
    }
    str += '; Max-Age=' + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }
    str += '; Domain=' + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }
    str += '; Path=' + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError('option expires is invalid');
    }
    str += '; Expires=' + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += '; HttpOnly';
  }
  if (opt.secure) {
    str += '; Secure';
  }
  if (opt.priority) {
    var priority =
      typeof opt.priority === 'string'
        ? opt.priority.toLowerCase()
        : opt.priority;
    switch (priority) {
      case 'low':
        str += '; Priority=Low';
        break;
      case 'medium':
        str += '; Priority=Medium';
        break;
      case 'high':
        str += '; Priority=High';
        break;
      default:
        throw new TypeError('option priority is invalid');
    }
  }
  if (opt.sameSite) {
    var sameSite =
      typeof opt.sameSite === 'string'
        ? opt.sameSite.toLowerCase()
        : opt.sameSite;
    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf('%') !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === '[object Date]' || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false,
};
function isNonEmptyString(str) {
  return typeof str === 'string' && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(';').filter(isNonEmptyString);
  var nameValue = parts.shift().split('=');
  var name = nameValue.shift();
  var value = nameValue.join('=');
  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" +
        value +
        "'. Set options.decodeValues to false to disable this feature.",
      e2,
    );
  }
  var cookie = {
    name,
    value,
  };
  parts.forEach(function (part) {
    var sides = part.split('=');
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join('=');
    if (key2 === 'expires') {
      cookie.expires = new Date(value2);
    } else if (key2 === 'max-age') {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === 'secure') {
      cookie.secure = true;
    } else if (key2 === 'httponly') {
      cookie.httpOnly = true;
    } else if (key2 === 'samesite') {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse(input, options) {
  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers['set-cookie']) {
    input = input.headers['set-cookie'];
  } else if (input.headers) {
    var sch =
      input.headers[
        Object.keys(input.headers).find(function (key2) {
          return key2.toLowerCase() === 'set-cookie';
        })
      ];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn(
        'Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.',
      );
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function (str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function (cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== 'string') {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== '=' && ch !== ';' && ch !== ',';
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ',') {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = (setCookie.exports.parseString = parseString);
var splitCookiesString_1 = (setCookie.exports.splitCookiesString =
  splitCookiesString);
function normalize(loaded) {
  if (loaded.fallthrough) {
    throw new Error(
      'fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching',
    );
  }
  if ('maxage' in loaded) {
    throw new Error('maxage should be replaced with cache: { maxage }');
  }
  const has_error_status =
    loaded.status &&
    loaded.status >= 400 &&
    loaded.status <= 599 &&
    !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error2 =
      typeof loaded.error === 'string' ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(
          `"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`,
        ),
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn(
        '"error" returned from load() without a valid status code \u2014 defaulting to 500',
      );
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error(
          '"redirect" property returned from load() must be accompanied by a 3xx status code',
        ),
      };
    }
    if (typeof loaded.redirect !== 'string') {
      return {
        status: 500,
        error: new Error(
          '"redirect" property returned from load() must be a string',
        ),
      };
    }
  }
  if (loaded.dependencies) {
    if (
      !Array.isArray(loaded.dependencies) ||
      loaded.dependencies.some((dep) => typeof dep !== 'string')
    ) {
      return {
        status: 500,
        error: new Error(
          '"dependencies" property returned from load() must be of type string[]',
        ),
      };
    }
  }
  if (loaded.context) {
    throw new Error(
      'You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.',
    );
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path)) return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match
    ? []
    : base2.slice(base_match[0].length).split('/');
  const pathparts = path_match
    ? path.slice(path_match[0].length).split('/')
    : path.split('/');
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === '.') continue;
    else if (part === '..') baseparts.pop();
    else baseparts.push(part);
  }
  const prefix =
    (path_match && path_match[0]) || (base_match && base_match[0]) || '';
  return `${prefix}${baseparts.join('/')}`;
}
function is_root_relative(path) {
  return path[0] === '/' && path[1] !== '/';
}
function normalize_path(path, trailing_slash) {
  if (path === '/' || trailing_slash === 'ignore') return path;
  if (trailing_slash === 'never') {
    return path.endsWith('/') ? path.slice(0, -1) : path;
  } else if (trailing_slash === 'always' && !path.endsWith('/')) {
    return path + '/';
  }
  return path;
}
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === '.' ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith('.' + normalized);
}
function path_matches(path, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith('/')
    ? constraint.slice(0, -1)
    : constraint;
  if (path === normalized) return true;
  return path.startsWith(normalized + '/');
}
async function load_node({
  event: event2,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2,
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  const cookies = parse_1(event2.request.headers.get('cookie') || '');
  const new_cookies = [];
  let loaded;
  const shadow = is_leaf
    ? await load_shadow_data(route, event2, options, !!state.prerender)
    : {};
  if (shadow.cookies) {
    shadow.cookies.forEach((header) => {
      new_cookies.push(parseString_1(header));
    });
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error,
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect,
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerender
        ? create_prerendering_url_proxy(event2.url)
        : event2.url,
      params: event2.params,
      props: shadow.body || {},
      routeId: event2.routeId,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === 'string') {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues(
            {
              method: resource.method,
              headers: resource.headers,
              body: resource.body,
              mode: resource.mode,
              credentials: resource.credentials,
              cache: resource.cache,
              redirect: resource.redirect,
              referrer: resource.referrer,
              integrity: resource.integrity,
            },
            opts,
          );
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event2.request.headers) {
          if (
            key2 !== 'authorization' &&
            key2 !== 'cookie' &&
            key2 !== 'host' &&
            key2 !== 'if-none-match' &&
            !opts.headers.has(key2)
          ) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event2.url.pathname, requested.split('?')[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(
          resolved.startsWith(prefix)
            ? resolved.slice(prefix.length)
            : resolved,
        ).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset
              ? options.manifest.mimeTypes[
                  filename.slice(filename.lastIndexOf('.'))
                ]
              : 'text/html';
            response = new Response(options.read(file), {
              headers: type ? { 'content-type': type } : {},
            });
          } else {
            response = await fetch(`${event2.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== 'omit') {
            uses_credentials = true;
            const authorization = event2.request.headers.get('authorization');
            const combined_cookies = __spreadValues({}, cookies);
            for (const cookie2 of new_cookies) {
              if (!domain_matches(event2.url.hostname, cookie2.domain))
                continue;
              if (!path_matches(resolved, cookie2.path)) continue;
              combined_cookies[cookie2.name] = cookie2.value;
            }
            const cookie = Object.entries(combined_cookies)
              .map(([name, value]) => `${name}=${value}`)
              .join('; ');
            if (cookie) {
              opts.headers.set('cookie', cookie);
            }
            if (authorization && !opts.headers.has('authorization')) {
              opts.headers.set('authorization', authorization);
            }
          }
          if (opts.body && typeof opts.body !== 'string') {
            throw new Error('Request body must be a string');
          }
          response = await respond(
            new Request(
              new URL(requested, event2.url).href,
              __spreadProps(__spreadValues({}, opts), { credentials: void 0 }),
            ),
            options,
            __spreadProps(__spreadValues({}, state), {
              initiator: route,
            }),
          );
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith('//')) {
            requested = event2.url.protocol + requested;
          }
          if (
            `.${new URL(requested).hostname}`.endsWith(
              `.${event2.url.hostname}`,
            ) &&
            opts.credentials !== 'omit'
          ) {
            uses_credentials = true;
            const cookie = event2.request.headers.get('cookie');
            if (cookie) opts.headers.set('cookie', cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(
            null,
            external_request,
          );
        }
        const set_cookie = response.headers.get('set-cookie');
        if (set_cookie) {
          new_cookies.push(
            ...splitCookiesString_1(set_cookie).map((str) =>
              parseString_1(str),
            ),
          );
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 !== 'set-cookie' && key3 !== 'etag') {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === 'string') {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(
                    `response.status is not a number. value: "${
                      response2.status
                    }" type: ${typeof response2.status}`,
                  );
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers,
                    body,
                  },
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === 'arrayBuffer') {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === 'text') {
              return text;
            }
            if (key2 === 'json') {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          },
        });
        return proxy;
      },
      stuff: __spreadValues({}, stuff),
      status: is_error ? status ?? null : null,
      error: is_error ? error2 ?? null : null,
    };
    if (options.dev) {
      Object.defineProperty(load_input, 'page', {
        get: () => {
          throw new Error(
            '`page` in `load` functions has been replaced by `url` and `params`',
          );
        },
      });
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(
        `load function must return a value${
          options.dev ? ` (${node.entry})` : ''
        }`,
      );
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body,
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event2.url.pathname.replace(/\/$/, '')}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body),
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers: new_cookies.map((new_cookie) => {
      const _a4 = new_cookie,
        { name, value } = _a4,
        options2 = __objRest(_a4, ['name', 'value']);
      return serialize_1(name, value, options2);
    }),
    uses_credentials,
  };
}
async function load_shadow_data(route, event2, options, prerender) {
  if (!route.shadow) return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error(
        'Cannot prerender pages that have endpoints with mutative methods',
      );
    }
    const method = normalize_request_method(event2);
    const is_get = method === 'head' || method === 'get';
    const handler = method === 'head' ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`),
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {},
    };
    if (!is_get) {
      const result = await handler(event2);
      if (result.fallthrough) {
        throw new Error(
          'fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching',
        );
      }
      const { status, headers, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers);
      if (status >= 300 && status < 400) {
        data.redirect =
          headers instanceof Headers
            ? headers.get('location')
            : headers.location;
        return data;
      }
      data.body = body;
    }
    const get3 = (method === 'head' && mod.head) || mod.get;
    if (get3) {
      const result = await get3(event2);
      if (result.fallthrough) {
        throw new Error(
          'fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching',
        );
      }
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers);
      data.status = status;
      if (status >= 400) {
        data.error = new Error('Failed to load data');
        return data;
      }
      if (status >= 300) {
        data.redirect =
          headers instanceof Headers
            ? headers.get('location')
            : headers.location;
        return data;
      }
      data.body = __spreadValues(__spreadValues({}, body), data.body);
    }
    return data;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event2);
    return {
      status: 500,
      error: error2,
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers['set-cookie'];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has('set-cookie')) {
      throw new Error(
        'Endpoint request handler cannot use Headers interface with Set-Cookie headers',
      );
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error(
      'Body returned from endpoint request handler must be a plain object',
    );
  }
  return { status, headers, body };
}
async function respond_with_error({
  event: event2,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts,
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event: event2,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false,
      });
      const error_loaded = await load_node({
        event: event2,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error2,
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router,
      },
      stuff,
      status,
      error: error2,
      branch,
      event: event2,
      resolve_opts,
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event2);
    return new Response(error3.stack, {
      status: 500,
    });
  }
}
async function respond$1(opts) {
  const { event: event2, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response(
      __spreadProps(__spreadValues({}, opts), {
        branch: [],
        page_config: {
          hydrate: true,
          router: true,
        },
        status: 200,
        error: null,
        event: event2,
        stuff: {},
      }),
    );
  }
  try {
    nodes = await Promise.all(
      route.a.map((n) => (n == void 0 ? n : options.manifest._.nodes[n]())),
    );
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event2);
    return await respond_with_error({
      event: event2,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts,
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerender) {
    const should_prerender = leaf.prerender ?? state.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204,
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr: {
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      let loaded;
      if (node) {
        try {
          loaded = await load_node(
            __spreadProps(__spreadValues({}, opts), {
              node,
              stuff,
              is_error: false,
              is_leaf: i2 === nodes.length - 1,
            }),
          );
          set_cookie_headers = set_cookie_headers.concat(
            loaded.set_cookie_headers,
          );
          if (loaded.loaded.redirect) {
            return with_cookies(
              new Response(void 0, {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect,
                },
              }),
              set_cookie_headers,
            );
          }
          if (loaded.loaded.error) {
            ({ status, error: error2 } = loaded.loaded);
          }
        } catch (err) {
          const e2 = coalesce_to_error(err);
          options.handle_error(e2, event2);
          status = 500;
          error2 = e2;
        }
        if (loaded && !error2) {
          branch.push(loaded);
        }
        if (error2) {
          while (i2--) {
            if (route.b[i2]) {
              const index = route.b[i2];
              const error_node = await options.manifest._.nodes[index]();
              let node_loaded;
              let j = i2;
              while (!(node_loaded = branch[j])) {
                j -= 1;
              }
              try {
                const error_loaded = await load_node(
                  __spreadProps(__spreadValues({}, opts), {
                    node: error_node,
                    stuff: node_loaded.stuff,
                    is_error: true,
                    is_leaf: false,
                    status,
                    error: error2,
                  }),
                );
                if (error_loaded.loaded.error) {
                  continue;
                }
                page_config = get_page_config(error_node.module, options);
                branch = branch.slice(0, j + 1).concat(error_loaded);
                stuff = __spreadValues(
                  __spreadValues({}, node_loaded.stuff),
                  error_loaded.stuff,
                );
                break ssr;
              } catch (err) {
                const e2 = coalesce_to_error(err);
                options.handle_error(e2, event2);
                continue;
              }
            }
          }
          return with_cookies(
            await respond_with_error({
              event: event2,
              options,
              state,
              $session,
              status,
              error: error2,
              resolve_opts,
            }),
            set_cookie_headers,
          );
        }
      }
      if (loaded && loaded.loaded.stuff) {
        stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
      }
    }
  }
  try {
    return with_cookies(
      await render_response(
        __spreadProps(__spreadValues({}, opts), {
          stuff,
          event: event2,
          page_config,
          status,
          error: error2,
          branch: branch.filter(Boolean),
        }),
      ),
      set_cookie_headers,
    );
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event2);
    return with_cookies(
      await respond_with_error(
        __spreadProps(__spreadValues({}, opts), {
          status: 500,
          error: error3,
        }),
      ),
      set_cookie_headers,
    );
  }
}
function get_page_config(leaf, options) {
  if ('ssr' in leaf) {
    throw new Error(
      '`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle',
    );
  }
  return {
    router: 'router' in leaf ? !!leaf.router : options.router,
    hydrate: 'hydrate' in leaf ? !!leaf.hydrate : options.hydrate,
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append('set-cookie', value);
    });
  }
  return response;
}
async function render_page(event2, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event2.url.pathname}`, {
      status: 404,
    });
  }
  if (route.shadow) {
    const type = negotiate(
      event2.request.headers.get('accept') || 'text/html',
      ['text/html', 'application/json'],
    );
    if (type === 'application/json') {
      return render_endpoint(event2, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event2);
  return respond$1({
    event: event2,
    options,
    state,
    $session,
    resolve_opts,
    route,
  });
}
function negotiate(accept, types2) {
  const parts = accept
    .split(',')
    .map((str, i2) => {
      const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
      if (match) {
        const [, type, subtype, q = '1'] = match;
        return { type, subtype, q: +q, i: i2 };
      }
      throw new Error(`Invalid Accept header: ${accept}`);
    })
    .sort((a, b) => {
      if (a.q !== b.q) {
        return b.q - a.q;
      }
      if ((a.subtype === '*') !== (b.subtype === '*')) {
        return a.subtype === '*' ? 1 : -1;
      }
      if ((a.type === '*') !== (b.type === '*')) {
        return a.type === '*' ? 1 : -1;
      }
      return a.i - b.i;
    });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split('/');
    const priority = parts.findIndex(
      (part) =>
        (part.type === type || part.type === '*') &&
        (part.subtype === subtype || part.subtype === '*'),
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || '';
    if (type) {
      const matcher = matchers[type];
      if (!matcher) throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value)) return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = '/__data.json';
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a4, _b, _c;
  let url = new URL(request.url);
  const { parameter, allowed } = options.method_override;
  const method_override =
    (_a4 = url.searchParams.get(parameter)) == null
      ? void 0
      : _a4.toUpperCase();
  if (method_override) {
    if (request.method === 'POST') {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === 'method') return method_override;
            return Reflect.get(target, property, target);
          },
        });
      } else {
        const verb = allowed.length === 0 ? 'enabled' : 'allowed';
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400,
        });
      }
    } else {
      throw new Error(
        `${parameter}=${method_override} is only allowed with POST requests`,
      );
    }
  }
  let decoded = decodeURI(url.pathname);
  let route = null;
  let params = {};
  if (
    options.paths.base &&
    !((_b = state.prerender) == null ? void 0 : _b.fallback)
  ) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || '/';
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    decoded = decoded.slice(0, -DATA_SUFFIX.length) || '/';
    url = new URL(
      url.origin + url.pathname.slice(0, -DATA_SUFFIX.length) + url.search,
    );
  }
  if (!state.prerender || !state.prerender.fallback) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match) continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if ((route == null ? void 0 : route.type) === 'page') {
    const normalized = normalize_path(url.pathname, options.trailing_slash);
    if (
      normalized !== url.pathname &&
      !((_c = state.prerender) == null ? void 0 : _c.fallback)
    ) {
      return new Response(void 0, {
        status: 301,
        headers: {
          'x-sveltekit-normalize': '1',
          location:
            (normalized.startsWith('//')
              ? url.origin + normalized
              : normalized) + (url.search === '?' ? '' : url.search),
        },
      });
    }
  }
  const event2 = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(
          `${'@sveltejs/adapter-vercel'} does not specify getClientAddress. Please raise an issue`,
        );
      }
      Object.defineProperty(event2, 'clientAddress', {
        value: state.getClientAddress(),
      });
      return event2.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url,
  };
  const removed = (property, replacement, suffix = '') => ({
    get: () => {
      throw new Error(
        `event.${property} has been replaced by event.${replacement}` + suffix,
      );
    },
  });
  const details = '. See https://github.com/sveltejs/kit/pull/3384 for details';
  const body_getter = {
    get: () => {
      throw new Error(
        'To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`' +
          details,
      );
    },
  };
  Object.defineProperties(event2, {
    method: removed('method', 'request.method', details),
    headers: removed('headers', 'request.headers', details),
    origin: removed('origin', 'url.origin'),
    path: removed('path', 'url.pathname'),
    query: removed('query', 'url.searchParams'),
    body: body_getter,
    rawBody: body_getter,
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform,
  };
  try {
    const response = await options.hooks.handle({
      event: event2,
      resolve: async (event22, opts) => {
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform,
          };
        }
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            event: event22,
            options,
            state,
            $session: await options.hooks.getSession(event22),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: __spreadProps(__spreadValues({}, resolve_opts), {
              ssr: false,
            }),
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === 'page' && route.shadow) {
            response2 = await render_endpoint(event22, await route.shadow());
            if (request.headers.has('x-sveltekit-load')) {
              if (response2.status >= 300 && response2.status < 400) {
                const location = response2.headers.get('location');
                if (location) {
                  const headers = new Headers(response2.headers);
                  headers.set('x-sveltekit-location', location);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers,
                  });
                }
              }
            }
          } else {
            response2 =
              route.type === 'endpoint'
                ? await render_endpoint(event22, await route.load())
                : await render_page(
                    event22,
                    route,
                    options,
                    state,
                    resolve_opts,
                  );
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has('etag')) {
              let if_none_match_value = request.headers.get('if-none-match');
              if (
                if_none_match_value == null
                  ? void 0
                  : if_none_match_value.startsWith('W/"')
              ) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get('etag');
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  'cache-control',
                  'content-location',
                  'date',
                  'expires',
                  'vary',
                ]) {
                  const value = response2.headers.get(key2);
                  if (value) headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers,
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event22);
          return await respond_with_error({
            event: event22,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event22.url.pathname}`),
            resolve_opts,
          });
        }
        if (state.prerender) {
          return new Response('not found', { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error(
          'request in handle has been replaced with event' + details,
        );
      },
    });
    if (response && !(response instanceof Response)) {
      throw new Error('handle must return a Response object' + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event2);
    try {
      const $session = await options.hooks.getSession(event2);
      return await respond_with_error({
        event: event2,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts,
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500,
      });
    }
  }
}
var base = '';
var assets = '';
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) =>
  '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="description" content="" />\n    <link rel="icon" href="' +
  assets2 +
  '/favicon.png" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <link rel="manifest" href="' +
  assets2 +
  '/manifest.json" />\n    ' +
  head +
  '\n  </head>\n  <body>\n    ' +
  body +
  '\n  </body>\n</html>\n';
var read = null;
set_paths({ base: '', assets: '' });
var Server = class {
  constructor(manifest2) {
    this.options = {
      amp: false,
      csp: {
        mode: 'auto',
        directives: {
          'upgrade-insecure-requests': false,
          'block-all-mixed-content': false,
        },
      },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event2) => {
        this.options.hooks.handleError({
          error: error2,
          event: event2,
          get request() {
            throw new Error(
              'request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details',
            );
          },
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { parameter: '_method', allowed: [] },
      paths: { base, assets },
      prefix: assets + '/_app/',
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: 'never',
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error(
        'The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details',
      );
    }
    if (!this.options.hooks) {
      const module2 = await Promise.resolve().then(
        () => (init_hooks_1c45ba0b(), hooks_1c45ba0b_exports),
      );
      this.options.hooks = {
        getSession: module2.getSession || (() => ({})),
        handle:
          module2.handle ||
          (({ event: event2, resolve: resolve2 }) => resolve2(event2)),
        handleError:
          module2.handleError ||
          (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module2.externalFetch || fetch,
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: '_app',
  assets: /* @__PURE__ */ new Set(['favicon.png', 'manifest.json']),
  mimeTypes: { '.png': 'image/png', '.json': 'application/json' },
  _: {
    entry: {
      file: 'start-db9de3b2.js',
      js: [
        'start-db9de3b2.js',
        'chunks/index-85439ac7.js',
        'chunks/index-d5338481.js',
      ],
      css: [],
    },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
    ],
    routes: [
      {
        type: 'page',
        id: '',
        pattern: /^\/$/,
        names: [],
        types: [],
        path: '/',
        shadow: () =>
          Promise.resolve().then(() => (init_index_ts(), index_ts_exports)),
        a: [0, 2],
        b: [1],
      },
      {
        type: 'page',
        id: 'workout/[id]',
        pattern: /^\/workout\/([^/]+?)\/?$/,
        names: ['id'],
        types: [null],
        path: null,
        shadow: () =>
          Promise.resolve().then(() => (init_id_ts(), id_ts_exports)),
        a: [0, 3],
        b: [1],
      },
    ],
    matchers: async () => {
      return {};
    },
  },
};

// .svelte-kit/vercel-tmp/serverless.js
installFetch();
var server = new Server(manifest);
var serverless_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || 'Invalid request body');
  }
  setResponse(
    res,
    await server.respond(request, {
      getClientAddress() {
        return request.headers.get('x-forwarded-for');
      },
    }),
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
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
***************************************************************************** */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! simple-concat. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
