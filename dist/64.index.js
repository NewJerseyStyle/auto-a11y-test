export const id = 64;
export const ids = [64];
export const modules = {

/***/ 52801:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  mJ: () => (/* reexport */ BaseOutputParser),
  CC: () => (/* reexport */ OutputParserException)
});

// UNUSED EXPORTS: AsymmetricStructuredOutputParser, BaseCumulativeTransformOutputParser, BaseLLMOutputParser, BaseTransformOutputParser, BytesOutputParser, CommaSeparatedListOutputParser, CustomListOutputParser, JsonMarkdownStructuredOutputParser, JsonOutputParser, ListOutputParser, MarkdownListOutputParser, NumberedListOutputParser, StringOutputParser, StructuredOutputParser, XMLOutputParser, XML_FORMAT_INSTRUCTIONS, parseJsonMarkdown, parsePartialJson, parseXMLMarkdown

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/runnables/index.js + 4 modules
var runnables = __webpack_require__(93954);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/errors/index.js
var errors = __webpack_require__(61193);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/output_parsers/base.js


/**
 * Abstract base class for parsing the output of a Large Language Model
 * (LLM) call. It provides methods for parsing the result of an LLM call
 * and invoking the parser with a given input.
 */
class BaseLLMOutputParser extends runnables/* Runnable */.YN {
    /**
     * Parses the result of an LLM call with a given prompt. By default, it
     * simply calls `parseResult`.
     * @param generations The generations from an LLM call.
     * @param _prompt The prompt used in the LLM call.
     * @param callbacks Optional callbacks.
     * @returns A promise of the parsed output.
     */
    parseResultWithPrompt(generations, _prompt, callbacks) {
        return this.parseResult(generations, callbacks);
    }
    _baseMessageToString(message) {
        return typeof message.content === "string"
            ? message.content
            : this._baseMessageContentToString(message.content);
    }
    _baseMessageContentToString(content) {
        return JSON.stringify(content);
    }
    /**
     * Calls the parser with a given input and optional configuration options.
     * If the input is a string, it creates a generation with the input as
     * text and calls `parseResult`. If the input is a `BaseMessage`, it
     * creates a generation with the input as a message and the content of the
     * input as text, and then calls `parseResult`.
     * @param input The input to the parser, which can be a string or a `BaseMessage`.
     * @param options Optional configuration options.
     * @returns A promise of the parsed output.
     */
    async invoke(input, options) {
        if (typeof input === "string") {
            return this._callWithConfig(async (input, options) => this.parseResult([{ text: input }], options?.callbacks), input, { ...options, runType: "parser" });
        }
        else {
            return this._callWithConfig(async (input, options) => this.parseResult([
                {
                    message: input,
                    text: this._baseMessageToString(input),
                },
            ], options?.callbacks), input, { ...options, runType: "parser" });
        }
    }
}
/**
 * Class to parse the output of an LLM call.
 */
class BaseOutputParser extends BaseLLMOutputParser {
    parseResult(generations, callbacks) {
        return this.parse(generations[0].text, callbacks);
    }
    async parseWithPrompt(text, _prompt, callbacks) {
        return this.parse(text, callbacks);
    }
    /**
     * Return the string type key uniquely identifying this class of parser
     */
    _type() {
        throw new Error("_type not implemented");
    }
}
/**
 * Exception that output parsers should raise to signify a parsing error.
 *
 * This exists to differentiate parsing errors from other code or execution errors
 * that also may arise inside the output parser. OutputParserExceptions will be
 * available to catch and handle in ways to fix the parsing error, while other
 * errors will be raised.
 *
 * @param message - The error that's being re-raised or an error message.
 * @param llmOutput - String model output which is error-ing.
 * @param observation - String explanation of error which can be passed to a
 *     model to try and remediate the issue.
 * @param sendToLLM - Whether to send the observation and llm_output back to an Agent
 *     after an OutputParserException has been raised. This gives the underlying
 *     model driving the agent the context that the previous output was improperly
 *     structured, in the hopes that it will update the output to the correct
 *     format.
 */
class OutputParserException extends Error {
    constructor(message, llmOutput, observation, sendToLLM = false) {
        super(message);
        Object.defineProperty(this, "llmOutput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "observation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sendToLLM", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.llmOutput = llmOutput;
        this.observation = observation;
        this.sendToLLM = sendToLLM;
        if (sendToLLM) {
            if (observation === undefined || llmOutput === undefined) {
                throw new Error("Arguments 'observation' & 'llmOutput' are required if 'sendToLlm' is true");
            }
        }
        (0,errors/* addLangChainErrorFields */.Y)(this, "OUTPUT_PARSING_FAILURE");
    }
}

;// CONCATENATED MODULE: ./node_modules/@cfworker/json-schema/dist/esm/deep-compare-strict.js
function deep_compare_strict_deepCompareStrict(a, b) {
    const typeofa = typeof a;
    if (typeofa !== typeof b) {
        return false;
    }
    if (Array.isArray(a)) {
        if (!Array.isArray(b)) {
            return false;
        }
        const length = a.length;
        if (length !== b.length) {
            return false;
        }
        for (let i = 0; i < length; i++) {
            if (!deep_compare_strict_deepCompareStrict(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    if (typeofa === 'object') {
        if (!a || !b) {
            return a === b;
        }
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        const length = aKeys.length;
        if (length !== bKeys.length) {
            return false;
        }
        for (const k of aKeys) {
            if (!deep_compare_strict_deepCompareStrict(a[k], b[k])) {
                return false;
            }
        }
        return true;
    }
    return a === b;
}

;// CONCATENATED MODULE: ./node_modules/@cfworker/json-schema/dist/esm/dereference.js

const schemaKeyword = {
    additionalItems: true,
    unevaluatedItems: true,
    items: true,
    contains: true,
    additionalProperties: true,
    unevaluatedProperties: true,
    propertyNames: true,
    not: true,
    if: true,
    then: true,
    else: true
};
const schemaArrayKeyword = {
    prefixItems: true,
    items: true,
    allOf: true,
    anyOf: true,
    oneOf: true
};
const schemaMapKeyword = {
    $defs: true,
    definitions: true,
    properties: true,
    patternProperties: true,
    dependentSchemas: true
};
const ignoredKeyword = {
    id: true,
    $id: true,
    $ref: true,
    $schema: true,
    $anchor: true,
    $vocabulary: true,
    $comment: true,
    default: true,
    enum: true,
    const: true,
    required: true,
    type: true,
    maximum: true,
    minimum: true,
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    multipleOf: true,
    maxLength: true,
    minLength: true,
    pattern: true,
    format: true,
    maxItems: true,
    minItems: true,
    uniqueItems: true,
    maxProperties: true,
    minProperties: true
};
let initialBaseURI = typeof self !== 'undefined' &&
    self.location &&
    self.location.origin !== 'null'
    ?
        new URL(self.location.origin + self.location.pathname + location.search)
    : new URL('https://github.com/cfworker');
function dereference_dereference(schema, lookup = Object.create(null), baseURI = initialBaseURI, basePointer = '') {
    if (schema && typeof schema === 'object' && !Array.isArray(schema)) {
        const id = schema.$id || schema.id;
        if (id) {
            const url = new URL(id, baseURI.href);
            if (url.hash.length > 1) {
                lookup[url.href] = schema;
            }
            else {
                url.hash = '';
                if (basePointer === '') {
                    baseURI = url;
                }
                else {
                    dereference_dereference(schema, lookup, baseURI);
                }
            }
        }
    }
    else if (schema !== true && schema !== false) {
        return lookup;
    }
    const schemaURI = baseURI.href + (basePointer ? '#' + basePointer : '');
    if (lookup[schemaURI] !== undefined) {
        throw new Error(`Duplicate schema URI "${schemaURI}".`);
    }
    lookup[schemaURI] = schema;
    if (schema === true || schema === false) {
        return lookup;
    }
    if (schema.__absolute_uri__ === undefined) {
        Object.defineProperty(schema, '__absolute_uri__', {
            enumerable: false,
            value: schemaURI
        });
    }
    if (schema.$ref && schema.__absolute_ref__ === undefined) {
        const url = new URL(schema.$ref, baseURI.href);
        url.hash = url.hash;
        Object.defineProperty(schema, '__absolute_ref__', {
            enumerable: false,
            value: url.href
        });
    }
    if (schema.$recursiveRef && schema.__absolute_recursive_ref__ === undefined) {
        const url = new URL(schema.$recursiveRef, baseURI.href);
        url.hash = url.hash;
        Object.defineProperty(schema, '__absolute_recursive_ref__', {
            enumerable: false,
            value: url.href
        });
    }
    if (schema.$anchor) {
        const url = new URL('#' + schema.$anchor, baseURI.href);
        lookup[url.href] = schema;
    }
    for (let key in schema) {
        if (ignoredKeyword[key]) {
            continue;
        }
        const keyBase = `${basePointer}/${encodePointer(key)}`;
        const subSchema = schema[key];
        if (Array.isArray(subSchema)) {
            if (schemaArrayKeyword[key]) {
                const length = subSchema.length;
                for (let i = 0; i < length; i++) {
                    dereference_dereference(subSchema[i], lookup, baseURI, `${keyBase}/${i}`);
                }
            }
        }
        else if (schemaMapKeyword[key]) {
            for (let subKey in subSchema) {
                dereference_dereference(subSchema[subKey], lookup, baseURI, `${keyBase}/${encodePointer(subKey)}`);
            }
        }
        else {
            dereference_dereference(subSchema, lookup, baseURI, keyBase);
        }
    }
    return lookup;
}

;// CONCATENATED MODULE: ./node_modules/@cfworker/json-schema/dist/esm/format.js
const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
const HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
const URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
const URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
const URL_ = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
const UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
const JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
const RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
const EMAIL = (input) => {
    if (input[0] === '"')
        return false;
    const [name, host, ...rest] = input.split('@');
    if (!name ||
        !host ||
        rest.length !== 0 ||
        name.length > 64 ||
        host.length > 253)
        return false;
    if (name[0] === '.' || name.endsWith('.') || name.includes('..'))
        return false;
    if (!/^[a-z0-9.-]+$/i.test(host) ||
        !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(name))
        return false;
    return host
        .split('.')
        .every(part => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i.test(part));
};
const IPV4 = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
const IPV6 = /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i;
const DURATION = (input) => input.length > 1 &&
    input.length < 80 &&
    (/^P\d+([.,]\d+)?W$/.test(input) ||
        (/^P[\dYMDTHS]*(\d[.,]\d+)?[YMDHS]$/.test(input) &&
            /^P([.,\d]+Y)?([.,\d]+M)?([.,\d]+D)?(T([.,\d]+H)?([.,\d]+M)?([.,\d]+S)?)?$/.test(input)));
function bind(r) {
    return r.test.bind(r);
}
const format_format = {
    date,
    time: time.bind(undefined, false),
    'date-time': date_time,
    duration: DURATION,
    uri,
    'uri-reference': bind(URIREF),
    'uri-template': bind(URITEMPLATE),
    url: bind(URL_),
    email: EMAIL,
    hostname: bind(HOSTNAME),
    ipv4: bind(IPV4),
    ipv6: bind(IPV6),
    regex: regex,
    uuid: bind(UUID),
    'json-pointer': bind(JSON_POINTER),
    'json-pointer-uri-fragment': bind(JSON_POINTER_URI_FRAGMENT),
    'relative-json-pointer': bind(RELATIVE_JSON_POINTER)
};
function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function date(str) {
    const matches = str.match(DATE);
    if (!matches)
        return false;
    const year = +matches[1];
    const month = +matches[2];
    const day = +matches[3];
    return (month >= 1 &&
        month <= 12 &&
        day >= 1 &&
        day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]));
}
function time(full, str) {
    const matches = str.match(TIME);
    if (!matches)
        return false;
    const hour = +matches[1];
    const minute = +matches[2];
    const second = +matches[3];
    const timeZone = !!matches[5];
    return (((hour <= 23 && minute <= 59 && second <= 59) ||
        (hour == 23 && minute == 59 && second == 60)) &&
        (!full || timeZone));
}
const DATE_TIME_SEPARATOR = /t|\s/i;
function date_time(str) {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length == 2 && date(dateTime[0]) && time(true, dateTime[1]);
}
const NOT_URI_FRAGMENT = /\/|:/;
const URI_PATTERN = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
    return NOT_URI_FRAGMENT.test(str) && URI_PATTERN.test(str);
}
const Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
    if (Z_ANCHOR.test(str))
        return false;
    try {
        new RegExp(str, 'u');
        return true;
    }
    catch (e) {
        return false;
    }
}

;// CONCATENATED MODULE: ./node_modules/@cfworker/json-schema/dist/esm/types.js
var OutputFormat;
(function (OutputFormat) {
    OutputFormat[OutputFormat["Flag"] = 1] = "Flag";
    OutputFormat[OutputFormat["Basic"] = 2] = "Basic";
    OutputFormat[OutputFormat["Detailed"] = 4] = "Detailed";
})(OutputFormat || (OutputFormat = {}));

;// CONCATENATED MODULE: ./node_modules/@cfworker/json-schema/dist/esm/validate.js





function validate_validate(instance, schema, draft = '2019-09', lookup = dereference(schema), shortCircuit = true, recursiveAnchor = null, instanceLocation = '#', schemaLocation = '#', evaluated = Object.create(null)) {
    if (schema === true) {
        return { valid: true, errors: [] };
    }
    if (schema === false) {
        return {
            valid: false,
            errors: [
                {
                    instanceLocation,
                    keyword: 'false',
                    keywordLocation: instanceLocation,
                    error: 'False boolean schema.'
                }
            ]
        };
    }
    const rawInstanceType = typeof instance;
    let instanceType;
    switch (rawInstanceType) {
        case 'boolean':
        case 'number':
        case 'string':
            instanceType = rawInstanceType;
            break;
        case 'object':
            if (instance === null) {
                instanceType = 'null';
            }
            else if (Array.isArray(instance)) {
                instanceType = 'array';
            }
            else {
                instanceType = 'object';
            }
            break;
        default:
            throw new Error(`Instances of "${rawInstanceType}" type are not supported.`);
    }
    const { $ref, $recursiveRef, $recursiveAnchor, type: $type, const: $const, enum: $enum, required: $required, not: $not, anyOf: $anyOf, allOf: $allOf, oneOf: $oneOf, if: $if, then: $then, else: $else, format: $format, properties: $properties, patternProperties: $patternProperties, additionalProperties: $additionalProperties, unevaluatedProperties: $unevaluatedProperties, minProperties: $minProperties, maxProperties: $maxProperties, propertyNames: $propertyNames, dependentRequired: $dependentRequired, dependentSchemas: $dependentSchemas, dependencies: $dependencies, prefixItems: $prefixItems, items: $items, additionalItems: $additionalItems, unevaluatedItems: $unevaluatedItems, contains: $contains, minContains: $minContains, maxContains: $maxContains, minItems: $minItems, maxItems: $maxItems, uniqueItems: $uniqueItems, minimum: $minimum, maximum: $maximum, exclusiveMinimum: $exclusiveMinimum, exclusiveMaximum: $exclusiveMaximum, multipleOf: $multipleOf, minLength: $minLength, maxLength: $maxLength, pattern: $pattern, __absolute_ref__, __absolute_recursive_ref__ } = schema;
    const errors = [];
    if ($recursiveAnchor === true && recursiveAnchor === null) {
        recursiveAnchor = schema;
    }
    if ($recursiveRef === '#') {
        const refSchema = recursiveAnchor === null
            ? lookup[__absolute_recursive_ref__]
            : recursiveAnchor;
        const keywordLocation = `${schemaLocation}/$recursiveRef`;
        const result = validate_validate(instance, recursiveAnchor === null ? schema : recursiveAnchor, draft, lookup, shortCircuit, refSchema, instanceLocation, keywordLocation, evaluated);
        if (!result.valid) {
            errors.push({
                instanceLocation,
                keyword: '$recursiveRef',
                keywordLocation,
                error: 'A subschema had errors.'
            }, ...result.errors);
        }
    }
    if ($ref !== undefined) {
        const uri = __absolute_ref__ || $ref;
        const refSchema = lookup[uri];
        if (refSchema === undefined) {
            let message = `Unresolved $ref "${$ref}".`;
            if (__absolute_ref__ && __absolute_ref__ !== $ref) {
                message += `  Absolute URI "${__absolute_ref__}".`;
            }
            message += `\nKnown schemas:\n- ${Object.keys(lookup).join('\n- ')}`;
            throw new Error(message);
        }
        const keywordLocation = `${schemaLocation}/$ref`;
        const result = validate_validate(instance, refSchema, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, keywordLocation, evaluated);
        if (!result.valid) {
            errors.push({
                instanceLocation,
                keyword: '$ref',
                keywordLocation,
                error: 'A subschema had errors.'
            }, ...result.errors);
        }
        if (draft === '4' || draft === '7') {
            return { valid: errors.length === 0, errors };
        }
    }
    if (Array.isArray($type)) {
        let length = $type.length;
        let valid = false;
        for (let i = 0; i < length; i++) {
            if (instanceType === $type[i] ||
                ($type[i] === 'integer' &&
                    instanceType === 'number' &&
                    instance % 1 === 0 &&
                    instance === instance)) {
                valid = true;
                break;
            }
        }
        if (!valid) {
            errors.push({
                instanceLocation,
                keyword: 'type',
                keywordLocation: `${schemaLocation}/type`,
                error: `Instance type "${instanceType}" is invalid. Expected "${$type.join('", "')}".`
            });
        }
    }
    else if ($type === 'integer') {
        if (instanceType !== 'number' || instance % 1 || instance !== instance) {
            errors.push({
                instanceLocation,
                keyword: 'type',
                keywordLocation: `${schemaLocation}/type`,
                error: `Instance type "${instanceType}" is invalid. Expected "${$type}".`
            });
        }
    }
    else if ($type !== undefined && instanceType !== $type) {
        errors.push({
            instanceLocation,
            keyword: 'type',
            keywordLocation: `${schemaLocation}/type`,
            error: `Instance type "${instanceType}" is invalid. Expected "${$type}".`
        });
    }
    if ($const !== undefined) {
        if (instanceType === 'object' || instanceType === 'array') {
            if (!deepCompareStrict(instance, $const)) {
                errors.push({
                    instanceLocation,
                    keyword: 'const',
                    keywordLocation: `${schemaLocation}/const`,
                    error: `Instance does not match ${JSON.stringify($const)}.`
                });
            }
        }
        else if (instance !== $const) {
            errors.push({
                instanceLocation,
                keyword: 'const',
                keywordLocation: `${schemaLocation}/const`,
                error: `Instance does not match ${JSON.stringify($const)}.`
            });
        }
    }
    if ($enum !== undefined) {
        if (instanceType === 'object' || instanceType === 'array') {
            if (!$enum.some(value => deepCompareStrict(instance, value))) {
                errors.push({
                    instanceLocation,
                    keyword: 'enum',
                    keywordLocation: `${schemaLocation}/enum`,
                    error: `Instance does not match any of ${JSON.stringify($enum)}.`
                });
            }
        }
        else if (!$enum.some(value => instance === value)) {
            errors.push({
                instanceLocation,
                keyword: 'enum',
                keywordLocation: `${schemaLocation}/enum`,
                error: `Instance does not match any of ${JSON.stringify($enum)}.`
            });
        }
    }
    if ($not !== undefined) {
        const keywordLocation = `${schemaLocation}/not`;
        const result = validate_validate(instance, $not, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, keywordLocation);
        if (result.valid) {
            errors.push({
                instanceLocation,
                keyword: 'not',
                keywordLocation,
                error: 'Instance matched "not" schema.'
            });
        }
    }
    let subEvaluateds = [];
    if ($anyOf !== undefined) {
        const keywordLocation = `${schemaLocation}/anyOf`;
        const errorsLength = errors.length;
        let anyValid = false;
        for (let i = 0; i < $anyOf.length; i++) {
            const subSchema = $anyOf[i];
            const subEvaluated = Object.create(evaluated);
            const result = validate_validate(instance, subSchema, draft, lookup, shortCircuit, $recursiveAnchor === true ? recursiveAnchor : null, instanceLocation, `${keywordLocation}/${i}`, subEvaluated);
            errors.push(...result.errors);
            anyValid = anyValid || result.valid;
            if (result.valid) {
                subEvaluateds.push(subEvaluated);
            }
        }
        if (anyValid) {
            errors.length = errorsLength;
        }
        else {
            errors.splice(errorsLength, 0, {
                instanceLocation,
                keyword: 'anyOf',
                keywordLocation,
                error: 'Instance does not match any subschemas.'
            });
        }
    }
    if ($allOf !== undefined) {
        const keywordLocation = `${schemaLocation}/allOf`;
        const errorsLength = errors.length;
        let allValid = true;
        for (let i = 0; i < $allOf.length; i++) {
            const subSchema = $allOf[i];
            const subEvaluated = Object.create(evaluated);
            const result = validate_validate(instance, subSchema, draft, lookup, shortCircuit, $recursiveAnchor === true ? recursiveAnchor : null, instanceLocation, `${keywordLocation}/${i}`, subEvaluated);
            errors.push(...result.errors);
            allValid = allValid && result.valid;
            if (result.valid) {
                subEvaluateds.push(subEvaluated);
            }
        }
        if (allValid) {
            errors.length = errorsLength;
        }
        else {
            errors.splice(errorsLength, 0, {
                instanceLocation,
                keyword: 'allOf',
                keywordLocation,
                error: `Instance does not match every subschema.`
            });
        }
    }
    if ($oneOf !== undefined) {
        const keywordLocation = `${schemaLocation}/oneOf`;
        const errorsLength = errors.length;
        const matches = $oneOf.filter((subSchema, i) => {
            const subEvaluated = Object.create(evaluated);
            const result = validate_validate(instance, subSchema, draft, lookup, shortCircuit, $recursiveAnchor === true ? recursiveAnchor : null, instanceLocation, `${keywordLocation}/${i}`, subEvaluated);
            errors.push(...result.errors);
            if (result.valid) {
                subEvaluateds.push(subEvaluated);
            }
            return result.valid;
        }).length;
        if (matches === 1) {
            errors.length = errorsLength;
        }
        else {
            errors.splice(errorsLength, 0, {
                instanceLocation,
                keyword: 'oneOf',
                keywordLocation,
                error: `Instance does not match exactly one subschema (${matches} matches).`
            });
        }
    }
    if (instanceType === 'object' || instanceType === 'array') {
        Object.assign(evaluated, ...subEvaluateds);
    }
    if ($if !== undefined) {
        const keywordLocation = `${schemaLocation}/if`;
        const conditionResult = validate_validate(instance, $if, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, keywordLocation, evaluated).valid;
        if (conditionResult) {
            if ($then !== undefined) {
                const thenResult = validate_validate(instance, $then, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, `${schemaLocation}/then`, evaluated);
                if (!thenResult.valid) {
                    errors.push({
                        instanceLocation,
                        keyword: 'if',
                        keywordLocation,
                        error: `Instance does not match "then" schema.`
                    }, ...thenResult.errors);
                }
            }
        }
        else if ($else !== undefined) {
            const elseResult = validate_validate(instance, $else, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, `${schemaLocation}/else`, evaluated);
            if (!elseResult.valid) {
                errors.push({
                    instanceLocation,
                    keyword: 'if',
                    keywordLocation,
                    error: `Instance does not match "else" schema.`
                }, ...elseResult.errors);
            }
        }
    }
    if (instanceType === 'object') {
        if ($required !== undefined) {
            for (const key of $required) {
                if (!(key in instance)) {
                    errors.push({
                        instanceLocation,
                        keyword: 'required',
                        keywordLocation: `${schemaLocation}/required`,
                        error: `Instance does not have required property "${key}".`
                    });
                }
            }
        }
        const keys = Object.keys(instance);
        if ($minProperties !== undefined && keys.length < $minProperties) {
            errors.push({
                instanceLocation,
                keyword: 'minProperties',
                keywordLocation: `${schemaLocation}/minProperties`,
                error: `Instance does not have at least ${$minProperties} properties.`
            });
        }
        if ($maxProperties !== undefined && keys.length > $maxProperties) {
            errors.push({
                instanceLocation,
                keyword: 'maxProperties',
                keywordLocation: `${schemaLocation}/maxProperties`,
                error: `Instance does not have at least ${$maxProperties} properties.`
            });
        }
        if ($propertyNames !== undefined) {
            const keywordLocation = `${schemaLocation}/propertyNames`;
            for (const key in instance) {
                const subInstancePointer = `${instanceLocation}/${encodePointer(key)}`;
                const result = validate_validate(key, $propertyNames, draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, keywordLocation);
                if (!result.valid) {
                    errors.push({
                        instanceLocation,
                        keyword: 'propertyNames',
                        keywordLocation,
                        error: `Property name "${key}" does not match schema.`
                    }, ...result.errors);
                }
            }
        }
        if ($dependentRequired !== undefined) {
            const keywordLocation = `${schemaLocation}/dependantRequired`;
            for (const key in $dependentRequired) {
                if (key in instance) {
                    const required = $dependentRequired[key];
                    for (const dependantKey of required) {
                        if (!(dependantKey in instance)) {
                            errors.push({
                                instanceLocation,
                                keyword: 'dependentRequired',
                                keywordLocation,
                                error: `Instance has "${key}" but does not have "${dependantKey}".`
                            });
                        }
                    }
                }
            }
        }
        if ($dependentSchemas !== undefined) {
            for (const key in $dependentSchemas) {
                const keywordLocation = `${schemaLocation}/dependentSchemas`;
                if (key in instance) {
                    const result = validate_validate(instance, $dependentSchemas[key], draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, `${keywordLocation}/${encodePointer(key)}`, evaluated);
                    if (!result.valid) {
                        errors.push({
                            instanceLocation,
                            keyword: 'dependentSchemas',
                            keywordLocation,
                            error: `Instance has "${key}" but does not match dependant schema.`
                        }, ...result.errors);
                    }
                }
            }
        }
        if ($dependencies !== undefined) {
            const keywordLocation = `${schemaLocation}/dependencies`;
            for (const key in $dependencies) {
                if (key in instance) {
                    const propsOrSchema = $dependencies[key];
                    if (Array.isArray(propsOrSchema)) {
                        for (const dependantKey of propsOrSchema) {
                            if (!(dependantKey in instance)) {
                                errors.push({
                                    instanceLocation,
                                    keyword: 'dependencies',
                                    keywordLocation,
                                    error: `Instance has "${key}" but does not have "${dependantKey}".`
                                });
                            }
                        }
                    }
                    else {
                        const result = validate_validate(instance, propsOrSchema, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, `${keywordLocation}/${encodePointer(key)}`);
                        if (!result.valid) {
                            errors.push({
                                instanceLocation,
                                keyword: 'dependencies',
                                keywordLocation,
                                error: `Instance has "${key}" but does not match dependant schema.`
                            }, ...result.errors);
                        }
                    }
                }
            }
        }
        const thisEvaluated = Object.create(null);
        let stop = false;
        if ($properties !== undefined) {
            const keywordLocation = `${schemaLocation}/properties`;
            for (const key in $properties) {
                if (!(key in instance)) {
                    continue;
                }
                const subInstancePointer = `${instanceLocation}/${encodePointer(key)}`;
                const result = validate_validate(instance[key], $properties[key], draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, `${keywordLocation}/${encodePointer(key)}`);
                if (result.valid) {
                    evaluated[key] = thisEvaluated[key] = true;
                }
                else {
                    stop = shortCircuit;
                    errors.push({
                        instanceLocation,
                        keyword: 'properties',
                        keywordLocation,
                        error: `Property "${key}" does not match schema.`
                    }, ...result.errors);
                    if (stop)
                        break;
                }
            }
        }
        if (!stop && $patternProperties !== undefined) {
            const keywordLocation = `${schemaLocation}/patternProperties`;
            for (const pattern in $patternProperties) {
                const regex = new RegExp(pattern, 'u');
                const subSchema = $patternProperties[pattern];
                for (const key in instance) {
                    if (!regex.test(key)) {
                        continue;
                    }
                    const subInstancePointer = `${instanceLocation}/${encodePointer(key)}`;
                    const result = validate_validate(instance[key], subSchema, draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, `${keywordLocation}/${encodePointer(pattern)}`);
                    if (result.valid) {
                        evaluated[key] = thisEvaluated[key] = true;
                    }
                    else {
                        stop = shortCircuit;
                        errors.push({
                            instanceLocation,
                            keyword: 'patternProperties',
                            keywordLocation,
                            error: `Property "${key}" matches pattern "${pattern}" but does not match associated schema.`
                        }, ...result.errors);
                    }
                }
            }
        }
        if (!stop && $additionalProperties !== undefined) {
            const keywordLocation = `${schemaLocation}/additionalProperties`;
            for (const key in instance) {
                if (thisEvaluated[key]) {
                    continue;
                }
                const subInstancePointer = `${instanceLocation}/${encodePointer(key)}`;
                const result = validate_validate(instance[key], $additionalProperties, draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, keywordLocation);
                if (result.valid) {
                    evaluated[key] = true;
                }
                else {
                    stop = shortCircuit;
                    errors.push({
                        instanceLocation,
                        keyword: 'additionalProperties',
                        keywordLocation,
                        error: `Property "${key}" does not match additional properties schema.`
                    }, ...result.errors);
                }
            }
        }
        else if (!stop && $unevaluatedProperties !== undefined) {
            const keywordLocation = `${schemaLocation}/unevaluatedProperties`;
            for (const key in instance) {
                if (!evaluated[key]) {
                    const subInstancePointer = `${instanceLocation}/${encodePointer(key)}`;
                    const result = validate_validate(instance[key], $unevaluatedProperties, draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, keywordLocation);
                    if (result.valid) {
                        evaluated[key] = true;
                    }
                    else {
                        errors.push({
                            instanceLocation,
                            keyword: 'unevaluatedProperties',
                            keywordLocation,
                            error: `Property "${key}" does not match unevaluated properties schema.`
                        }, ...result.errors);
                    }
                }
            }
        }
    }
    else if (instanceType === 'array') {
        if ($maxItems !== undefined && instance.length > $maxItems) {
            errors.push({
                instanceLocation,
                keyword: 'maxItems',
                keywordLocation: `${schemaLocation}/maxItems`,
                error: `Array has too many items (${instance.length} > ${$maxItems}).`
            });
        }
        if ($minItems !== undefined && instance.length < $minItems) {
            errors.push({
                instanceLocation,
                keyword: 'minItems',
                keywordLocation: `${schemaLocation}/minItems`,
                error: `Array has too few items (${instance.length} < ${$minItems}).`
            });
        }
        const length = instance.length;
        let i = 0;
        let stop = false;
        if ($prefixItems !== undefined) {
            const keywordLocation = `${schemaLocation}/prefixItems`;
            const length2 = Math.min($prefixItems.length, length);
            for (; i < length2; i++) {
                const result = validate_validate(instance[i], $prefixItems[i], draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, `${keywordLocation}/${i}`);
                evaluated[i] = true;
                if (!result.valid) {
                    stop = shortCircuit;
                    errors.push({
                        instanceLocation,
                        keyword: 'prefixItems',
                        keywordLocation,
                        error: `Items did not match schema.`
                    }, ...result.errors);
                    if (stop)
                        break;
                }
            }
        }
        if ($items !== undefined) {
            const keywordLocation = `${schemaLocation}/items`;
            if (Array.isArray($items)) {
                const length2 = Math.min($items.length, length);
                for (; i < length2; i++) {
                    const result = validate_validate(instance[i], $items[i], draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, `${keywordLocation}/${i}`);
                    evaluated[i] = true;
                    if (!result.valid) {
                        stop = shortCircuit;
                        errors.push({
                            instanceLocation,
                            keyword: 'items',
                            keywordLocation,
                            error: `Items did not match schema.`
                        }, ...result.errors);
                        if (stop)
                            break;
                    }
                }
            }
            else {
                for (; i < length; i++) {
                    const result = validate_validate(instance[i], $items, draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, keywordLocation);
                    evaluated[i] = true;
                    if (!result.valid) {
                        stop = shortCircuit;
                        errors.push({
                            instanceLocation,
                            keyword: 'items',
                            keywordLocation,
                            error: `Items did not match schema.`
                        }, ...result.errors);
                        if (stop)
                            break;
                    }
                }
            }
            if (!stop && $additionalItems !== undefined) {
                const keywordLocation = `${schemaLocation}/additionalItems`;
                for (; i < length; i++) {
                    const result = validate_validate(instance[i], $additionalItems, draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, keywordLocation);
                    evaluated[i] = true;
                    if (!result.valid) {
                        stop = shortCircuit;
                        errors.push({
                            instanceLocation,
                            keyword: 'additionalItems',
                            keywordLocation,
                            error: `Items did not match additional items schema.`
                        }, ...result.errors);
                    }
                }
            }
        }
        if ($contains !== undefined) {
            if (length === 0 && $minContains === undefined) {
                errors.push({
                    instanceLocation,
                    keyword: 'contains',
                    keywordLocation: `${schemaLocation}/contains`,
                    error: `Array is empty. It must contain at least one item matching the schema.`
                });
            }
            else if ($minContains !== undefined && length < $minContains) {
                errors.push({
                    instanceLocation,
                    keyword: 'minContains',
                    keywordLocation: `${schemaLocation}/minContains`,
                    error: `Array has less items (${length}) than minContains (${$minContains}).`
                });
            }
            else {
                const keywordLocation = `${schemaLocation}/contains`;
                const errorsLength = errors.length;
                let contained = 0;
                for (let j = 0; j < length; j++) {
                    const result = validate_validate(instance[j], $contains, draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${j}`, keywordLocation);
                    if (result.valid) {
                        evaluated[j] = true;
                        contained++;
                    }
                    else {
                        errors.push(...result.errors);
                    }
                }
                if (contained >= ($minContains || 0)) {
                    errors.length = errorsLength;
                }
                if ($minContains === undefined &&
                    $maxContains === undefined &&
                    contained === 0) {
                    errors.splice(errorsLength, 0, {
                        instanceLocation,
                        keyword: 'contains',
                        keywordLocation,
                        error: `Array does not contain item matching schema.`
                    });
                }
                else if ($minContains !== undefined && contained < $minContains) {
                    errors.push({
                        instanceLocation,
                        keyword: 'minContains',
                        keywordLocation: `${schemaLocation}/minContains`,
                        error: `Array must contain at least ${$minContains} items matching schema. Only ${contained} items were found.`
                    });
                }
                else if ($maxContains !== undefined && contained > $maxContains) {
                    errors.push({
                        instanceLocation,
                        keyword: 'maxContains',
                        keywordLocation: `${schemaLocation}/maxContains`,
                        error: `Array may contain at most ${$maxContains} items matching schema. ${contained} items were found.`
                    });
                }
            }
        }
        if (!stop && $unevaluatedItems !== undefined) {
            const keywordLocation = `${schemaLocation}/unevaluatedItems`;
            for (i; i < length; i++) {
                if (evaluated[i]) {
                    continue;
                }
                const result = validate_validate(instance[i], $unevaluatedItems, draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, keywordLocation);
                evaluated[i] = true;
                if (!result.valid) {
                    errors.push({
                        instanceLocation,
                        keyword: 'unevaluatedItems',
                        keywordLocation,
                        error: `Items did not match unevaluated items schema.`
                    }, ...result.errors);
                }
            }
        }
        if ($uniqueItems) {
            for (let j = 0; j < length; j++) {
                const a = instance[j];
                const ao = typeof a === 'object' && a !== null;
                for (let k = 0; k < length; k++) {
                    if (j === k) {
                        continue;
                    }
                    const b = instance[k];
                    const bo = typeof b === 'object' && b !== null;
                    if (a === b || (ao && bo && deepCompareStrict(a, b))) {
                        errors.push({
                            instanceLocation,
                            keyword: 'uniqueItems',
                            keywordLocation: `${schemaLocation}/uniqueItems`,
                            error: `Duplicate items at indexes ${j} and ${k}.`
                        });
                        j = Number.MAX_SAFE_INTEGER;
                        k = Number.MAX_SAFE_INTEGER;
                    }
                }
            }
        }
    }
    else if (instanceType === 'number') {
        if (draft === '4') {
            if ($minimum !== undefined &&
                (($exclusiveMinimum === true && instance <= $minimum) ||
                    instance < $minimum)) {
                errors.push({
                    instanceLocation,
                    keyword: 'minimum',
                    keywordLocation: `${schemaLocation}/minimum`,
                    error: `${instance} is less than ${$exclusiveMinimum ? 'or equal to ' : ''} ${$minimum}.`
                });
            }
            if ($maximum !== undefined &&
                (($exclusiveMaximum === true && instance >= $maximum) ||
                    instance > $maximum)) {
                errors.push({
                    instanceLocation,
                    keyword: 'maximum',
                    keywordLocation: `${schemaLocation}/maximum`,
                    error: `${instance} is greater than ${$exclusiveMaximum ? 'or equal to ' : ''} ${$maximum}.`
                });
            }
        }
        else {
            if ($minimum !== undefined && instance < $minimum) {
                errors.push({
                    instanceLocation,
                    keyword: 'minimum',
                    keywordLocation: `${schemaLocation}/minimum`,
                    error: `${instance} is less than ${$minimum}.`
                });
            }
            if ($maximum !== undefined && instance > $maximum) {
                errors.push({
                    instanceLocation,
                    keyword: 'maximum',
                    keywordLocation: `${schemaLocation}/maximum`,
                    error: `${instance} is greater than ${$maximum}.`
                });
            }
            if ($exclusiveMinimum !== undefined && instance <= $exclusiveMinimum) {
                errors.push({
                    instanceLocation,
                    keyword: 'exclusiveMinimum',
                    keywordLocation: `${schemaLocation}/exclusiveMinimum`,
                    error: `${instance} is less than ${$exclusiveMinimum}.`
                });
            }
            if ($exclusiveMaximum !== undefined && instance >= $exclusiveMaximum) {
                errors.push({
                    instanceLocation,
                    keyword: 'exclusiveMaximum',
                    keywordLocation: `${schemaLocation}/exclusiveMaximum`,
                    error: `${instance} is greater than or equal to ${$exclusiveMaximum}.`
                });
            }
        }
        if ($multipleOf !== undefined) {
            const remainder = instance % $multipleOf;
            if (Math.abs(0 - remainder) >= 1.1920929e-7 &&
                Math.abs($multipleOf - remainder) >= 1.1920929e-7) {
                errors.push({
                    instanceLocation,
                    keyword: 'multipleOf',
                    keywordLocation: `${schemaLocation}/multipleOf`,
                    error: `${instance} is not a multiple of ${$multipleOf}.`
                });
            }
        }
    }
    else if (instanceType === 'string') {
        const length = $minLength === undefined && $maxLength === undefined
            ? 0
            : ucs2length(instance);
        if ($minLength !== undefined && length < $minLength) {
            errors.push({
                instanceLocation,
                keyword: 'minLength',
                keywordLocation: `${schemaLocation}/minLength`,
                error: `String is too short (${length} < ${$minLength}).`
            });
        }
        if ($maxLength !== undefined && length > $maxLength) {
            errors.push({
                instanceLocation,
                keyword: 'maxLength',
                keywordLocation: `${schemaLocation}/maxLength`,
                error: `String is too long (${length} > ${$maxLength}).`
            });
        }
        if ($pattern !== undefined && !new RegExp($pattern, 'u').test(instance)) {
            errors.push({
                instanceLocation,
                keyword: 'pattern',
                keywordLocation: `${schemaLocation}/pattern`,
                error: `String does not match pattern.`
            });
        }
        if ($format !== undefined &&
            format[$format] &&
            !format[$format](instance)) {
            errors.push({
                instanceLocation,
                keyword: 'format',
                keywordLocation: `${schemaLocation}/format`,
                error: `String does not match format "${$format}".`
            });
        }
    }
    return { valid: errors.length === 0, errors };
}

;// CONCATENATED MODULE: ./node_modules/@cfworker/json-schema/dist/esm/validator.js


class Validator {
    schema;
    draft;
    shortCircuit;
    lookup;
    constructor(schema, draft = '2019-09', shortCircuit = true) {
        this.schema = schema;
        this.draft = draft;
        this.shortCircuit = shortCircuit;
        this.lookup = dereference(schema);
    }
    validate(instance) {
        return validate(instance, this.schema, this.draft, this.lookup, this.shortCircuit);
    }
    addSchema(schema, id) {
        if (id) {
            schema = { ...schema, $id: id };
        }
        dereference(schema, this.lookup);
    }
}

;// CONCATENATED MODULE: ./node_modules/@cfworker/json-schema/dist/esm/index.js









// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/base.js
var base = __webpack_require__(34013);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/utils.js
var utils = __webpack_require__(9751);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/outputs.js
var outputs = __webpack_require__(58243);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/output_parsers/transform.js





/**
 * Class to parse the output of an LLM call that also allows streaming inputs.
 */
class BaseTransformOutputParser extends BaseOutputParser {
    async *_transform(inputGenerator) {
        for await (const chunk of inputGenerator) {
            if (typeof chunk === "string") {
                yield this.parseResult([{ text: chunk }]);
            }
            else {
                yield this.parseResult([
                    {
                        message: chunk,
                        text: this._baseMessageToString(chunk),
                    },
                ]);
            }
        }
    }
    /**
     * Transforms an asynchronous generator of input into an asynchronous
     * generator of parsed output.
     * @param inputGenerator An asynchronous generator of input.
     * @param options A configuration object.
     * @returns An asynchronous generator of parsed output.
     */
    async *transform(inputGenerator, options) {
        yield* this._transformStreamWithConfig(inputGenerator, this._transform.bind(this), {
            ...options,
            runType: "parser",
        });
    }
}
/**
 * A base class for output parsers that can handle streaming input. It
 * extends the `BaseTransformOutputParser` class and provides a method for
 * converting parsed outputs into a diff format.
 */
class BaseCumulativeTransformOutputParser extends BaseTransformOutputParser {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "diff", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.diff = fields?.diff ?? this.diff;
    }
    async *_transform(inputGenerator) {
        let prevParsed;
        let accGen;
        for await (const chunk of inputGenerator) {
            if (typeof chunk !== "string" && typeof chunk.content !== "string") {
                throw new Error("Cannot handle non-string output.");
            }
            let chunkGen;
            if ((0,base/* isBaseMessageChunk */.AJ)(chunk)) {
                if (typeof chunk.content !== "string") {
                    throw new Error("Cannot handle non-string message output.");
                }
                chunkGen = new outputs/* ChatGenerationChunk */.Cf({
                    message: chunk,
                    text: chunk.content,
                });
            }
            else if ((0,base/* isBaseMessage */.ny)(chunk)) {
                if (typeof chunk.content !== "string") {
                    throw new Error("Cannot handle non-string message output.");
                }
                chunkGen = new outputs/* ChatGenerationChunk */.Cf({
                    message: (0,utils/* convertToChunk */.ih)(chunk),
                    text: chunk.content,
                });
            }
            else {
                chunkGen = new outputs/* GenerationChunk */.mu({ text: chunk });
            }
            if (accGen === undefined) {
                accGen = chunkGen;
            }
            else {
                accGen = accGen.concat(chunkGen);
            }
            const parsed = await this.parsePartialResult([accGen]);
            if (parsed !== undefined &&
                parsed !== null &&
                !deep_compare_strict_deepCompareStrict(parsed, prevParsed)) {
                if (this.diff) {
                    yield this._diff(prevParsed, parsed);
                }
                else {
                    yield parsed;
                }
                prevParsed = parsed;
            }
        }
    }
    getFormatInstructions() {
        return "";
    }
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/output_parsers/bytes.js

/**
 * OutputParser that parses LLMResult into the top likely string and
 * encodes it into bytes.
 */
class BytesOutputParser extends BaseTransformOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "output_parsers", "bytes"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "textEncoder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new TextEncoder()
        });
    }
    static lc_name() {
        return "BytesOutputParser";
    }
    parse(text) {
        return Promise.resolve(this.textEncoder.encode(text));
    }
    getFormatInstructions() {
        return "";
    }
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/output_parsers/list.js


/**
 * Class to parse the output of an LLM call to a list.
 * @augments BaseOutputParser
 */
class ListOutputParser extends BaseTransformOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "re", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    async *_transform(inputGenerator) {
        let buffer = "";
        for await (const input of inputGenerator) {
            if (typeof input === "string") {
                // add current chunk to buffer
                buffer += input;
            }
            else {
                // extract message content and add to buffer
                buffer += input.content;
            }
            // get parts in buffer
            if (!this.re) {
                const parts = await this.parse(buffer);
                if (parts.length > 1) {
                    // if there are multiple parts, yield all but the last one
                    for (const part of parts.slice(0, -1)) {
                        yield [part];
                    }
                    // keep the last part in the buffer
                    buffer = parts[parts.length - 1];
                }
            }
            else {
                // if there is a regex, get all matches
                const matches = [...buffer.matchAll(this.re)];
                if (matches.length > 1) {
                    let doneIdx = 0;
                    // if there are multiple matches, yield all but the last one
                    for (const match of matches.slice(0, -1)) {
                        yield [match[1]];
                        doneIdx += (match.index ?? 0) + match[0].length;
                    }
                    // keep the last match in the buffer
                    buffer = buffer.slice(doneIdx);
                }
            }
        }
        // yield the last part
        for (const part of await this.parse(buffer)) {
            yield [part];
        }
    }
}
/**
 * Class to parse the output of an LLM call as a comma-separated list.
 * @augments ListOutputParser
 */
class CommaSeparatedListOutputParser extends ListOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "output_parsers", "list"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "CommaSeparatedListOutputParser";
    }
    /**
     * Parses the given text into an array of strings, using a comma as the
     * separator. If the parsing fails, throws an OutputParserException.
     * @param text The text to parse.
     * @returns An array of strings obtained by splitting the input text at each comma.
     */
    async parse(text) {
        try {
            return text
                .trim()
                .split(",")
                .map((s) => s.trim());
        }
        catch (e) {
            throw new OutputParserException(`Could not parse output: ${text}`, text);
        }
    }
    /**
     * Provides instructions on the expected format of the response for the
     * CommaSeparatedListOutputParser.
     * @returns A string containing instructions on the expected format of the response.
     */
    getFormatInstructions() {
        return `Your response should be a list of comma separated values, eg: \`foo, bar, baz\``;
    }
}
/**
 * Class to parse the output of an LLM call to a list with a specific length and separator.
 * @augments ListOutputParser
 */
class CustomListOutputParser extends ListOutputParser {
    constructor({ length, separator }) {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "output_parsers", "list"]
        });
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "separator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.length = length;
        this.separator = separator || ",";
    }
    /**
     * Parses the given text into an array of strings, using the specified
     * separator. If the parsing fails or the number of items in the list
     * doesn't match the expected length, throws an OutputParserException.
     * @param text The text to parse.
     * @returns An array of strings obtained by splitting the input text at each occurrence of the specified separator.
     */
    async parse(text) {
        try {
            const items = text
                .trim()
                .split(this.separator)
                .map((s) => s.trim());
            if (this.length !== undefined && items.length !== this.length) {
                throw new OutputParserException(`Incorrect number of items. Expected ${this.length}, got ${items.length}.`);
            }
            return items;
        }
        catch (e) {
            if (Object.getPrototypeOf(e) === OutputParserException.prototype) {
                throw e;
            }
            throw new OutputParserException(`Could not parse output: ${text}`);
        }
    }
    /**
     * Provides instructions on the expected format of the response for the
     * CustomListOutputParser, including the number of items and the
     * separator.
     * @returns A string containing instructions on the expected format of the response.
     */
    getFormatInstructions() {
        return `Your response should be a list of ${this.length === undefined ? "" : `${this.length} `}items separated by "${this.separator}" (eg: \`foo${this.separator} bar${this.separator} baz\`)`;
    }
}
class NumberedListOutputParser extends ListOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "output_parsers", "list"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "re", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /\d+\.\s([^\n]+)/g
        });
    }
    static lc_name() {
        return "NumberedListOutputParser";
    }
    getFormatInstructions() {
        return `Your response should be a numbered list with each item on a new line. For example: \n\n1. foo\n\n2. bar\n\n3. baz`;
    }
    async parse(text) {
        return [...(text.matchAll(this.re) ?? [])].map((m) => m[1]);
    }
}
class MarkdownListOutputParser extends ListOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "output_parsers", "list"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "re", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /^\s*[-*]\s([^\n]+)$/gm
        });
    }
    static lc_name() {
        return "NumberedListOutputParser";
    }
    getFormatInstructions() {
        return `Your response should be a numbered list with each item on a new line. For example: \n\n1. foo\n\n2. bar\n\n3. baz`;
    }
    async parse(text) {
        return [...(text.matchAll(this.re) ?? [])].map((m) => m[1]);
    }
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/output_parsers/string.js

/**
 * OutputParser that parses LLMResult into the top likely string.
 * @example
 * ```typescript
 * const promptTemplate = PromptTemplate.fromTemplate(
 *   "Tell me a joke about {topic}",
 * );
 *
 * const chain = RunnableSequence.from([
 *   promptTemplate,
 *   new ChatOpenAI({}),
 *   new StringOutputParser(),
 * ]);
 *
 * const result = await chain.invoke({ topic: "bears" });
 * console.log("What do you call a bear with no teeth? A gummy bear!");
 * ```
 */
class StringOutputParser extends BaseTransformOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "output_parsers", "string"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "StrOutputParser";
    }
    /**
     * Parses a string output from an LLM call. This method is meant to be
     * implemented by subclasses to define how a string output from an LLM
     * should be parsed.
     * @param text The string output from an LLM call.
     * @param callbacks Optional callbacks.
     * @returns A promise of the parsed output.
     */
    parse(text) {
        return Promise.resolve(text);
    }
    getFormatInstructions() {
        return "";
    }
    _textContentToString(content) {
        return content.text;
    }
    _imageUrlContentToString(_content) {
        throw new Error(`Cannot coerce a multimodal "image_url" message part into a string.`);
    }
    _messageContentComplexToString(content) {
        switch (content.type) {
            case "text":
            case "text_delta":
                if ("text" in content) {
                    // Type guard for MessageContentText
                    return this._textContentToString(content);
                }
                break;
            case "image_url":
                if ("image_url" in content) {
                    // Type guard for MessageContentImageUrl
                    return this._imageUrlContentToString(content);
                }
                break;
            default:
                throw new Error(`Cannot coerce "${content.type}" message part into a string.`);
        }
        throw new Error(`Invalid content type: ${content.type}`);
    }
    _baseMessageContentToString(content) {
        return content.reduce((acc, item) => acc + this._messageContentComplexToString(item), "");
    }
}

// EXTERNAL MODULE: ./node_modules/zod/lib/index.mjs
var lib = __webpack_require__(54383);
// EXTERNAL MODULE: ./node_modules/zod-to-json-schema/dist/esm/index.js + 36 modules
var esm = __webpack_require__(80357);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/output_parsers/structured.js



class StructuredOutputParser extends BaseOutputParser {
    static lc_name() {
        return "StructuredOutputParser";
    }
    toJSON() {
        return this.toJSONNotImplemented();
    }
    constructor(schema) {
        super(schema);
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: schema
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "output_parsers", "structured"]
        });
    }
    /**
     * Creates a new StructuredOutputParser from a Zod schema.
     * @param schema The Zod schema which the output should match
     * @returns A new instance of StructuredOutputParser.
     */
    static fromZodSchema(schema) {
        return new this(schema);
    }
    /**
     * Creates a new StructuredOutputParser from a set of names and
     * descriptions.
     * @param schemas An object where each key is a name and each value is a description
     * @returns A new instance of StructuredOutputParser.
     */
    static fromNamesAndDescriptions(schemas) {
        const zodSchema = lib.z.object(Object.fromEntries(Object.entries(schemas).map(([name, description]) => [name, lib.z.string().describe(description)])));
        return new this(zodSchema);
    }
    /**
     * Returns a markdown code snippet with a JSON object formatted according
     * to the schema.
     * @param options Optional. The options for formatting the instructions
     * @returns A markdown code snippet with a JSON object formatted according to the schema.
     */
    getFormatInstructions() {
        return `You must format your output as a JSON value that adheres to a given "JSON Schema" instance.

"JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
\`\`\`json
${JSON.stringify((0,esm/* zodToJsonSchema */.Ik)(this.schema))}
\`\`\`
`;
    }
    /**
     * Parses the given text according to the schema.
     * @param text The text to parse
     * @returns The parsed output.
     */
    async parse(text) {
        try {
            const json = text.includes("```")
                ? text.trim().split(/```(?:json)?/)[1]
                : text.trim();
            const escapedJson = json
                .replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, (_match, capturedGroup) => {
                const escapedInsideQuotes = capturedGroup.replace(/\n/g, "\\n");
                return `"${escapedInsideQuotes}"`;
            })
                .replace(/\n/g, "");
            return await this.schema.parseAsync(JSON.parse(escapedJson));
        }
        catch (e) {
            throw new OutputParserException(`Failed to parse. Text: "${text}". Error: ${e}`, text);
        }
    }
}
/**
 * A specific type of `StructuredOutputParser` that parses JSON data
 * formatted as a markdown code snippet.
 */
class JsonMarkdownStructuredOutputParser extends StructuredOutputParser {
    static lc_name() {
        return "JsonMarkdownStructuredOutputParser";
    }
    getFormatInstructions(options) {
        const interpolationDepth = options?.interpolationDepth ?? 1;
        if (interpolationDepth < 1) {
            throw new Error("f string interpolation depth must be at least 1");
        }
        return `Return a markdown code snippet with a JSON object formatted to look like:\n\`\`\`json\n${this._schemaToInstruction((0,esm/* zodToJsonSchema */.Ik)(this.schema))
            .replaceAll("{", "{".repeat(interpolationDepth))
            .replaceAll("}", "}".repeat(interpolationDepth))}\n\`\`\``;
    }
    _schemaToInstruction(schemaInput, indent = 2) {
        const schema = schemaInput;
        if ("type" in schema) {
            let nullable = false;
            let type;
            if (Array.isArray(schema.type)) {
                const nullIdx = schema.type.findIndex((type) => type === "null");
                if (nullIdx !== -1) {
                    nullable = true;
                    schema.type.splice(nullIdx, 1);
                }
                type = schema.type.join(" | ");
            }
            else {
                type = schema.type;
            }
            if (schema.type === "object" && schema.properties) {
                const description = schema.description
                    ? ` // ${schema.description}`
                    : "";
                const properties = Object.entries(schema.properties)
                    .map(([key, value]) => {
                    const isOptional = schema.required?.includes(key)
                        ? ""
                        : " (optional)";
                    return `${" ".repeat(indent)}"${key}": ${this._schemaToInstruction(value, indent + 2)}${isOptional}`;
                })
                    .join("\n");
                return `{\n${properties}\n${" ".repeat(indent - 2)}}${description}`;
            }
            if (schema.type === "array" && schema.items) {
                const description = schema.description
                    ? ` // ${schema.description}`
                    : "";
                return `array[\n${" ".repeat(indent)}${this._schemaToInstruction(schema.items, indent + 2)}\n${" ".repeat(indent - 2)}] ${description}`;
            }
            const isNullable = nullable ? " (nullable)" : "";
            const description = schema.description ? ` // ${schema.description}` : "";
            return `${type}${description}${isNullable}`;
        }
        if ("anyOf" in schema) {
            return schema.anyOf
                .map((s) => this._schemaToInstruction(s, indent))
                .join(`\n${" ".repeat(indent - 2)}`);
        }
        throw new Error("unsupported schema type");
    }
    static fromZodSchema(schema) {
        return new this(schema);
    }
    static fromNamesAndDescriptions(schemas) {
        const zodSchema = lib.z.object(Object.fromEntries(Object.entries(schemas).map(([name, description]) => [name, lib.z.string().describe(description)])));
        return new this(zodSchema);
    }
}
/**
 * A type of `StructuredOutputParser` that handles asymmetric input and
 * output schemas.
 */
class AsymmetricStructuredOutputParser extends BaseOutputParser {
    constructor({ inputSchema }) {
        super(...arguments);
        Object.defineProperty(this, "structuredInputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.structuredInputParser = new JsonMarkdownStructuredOutputParser(inputSchema);
    }
    async parse(text) {
        let parsedInput;
        try {
            parsedInput = await this.structuredInputParser.parse(text);
        }
        catch (e) {
            throw new OutputParserException(`Failed to parse. Text: "${text}". Error: ${e}`, text);
        }
        return this.outputProcessor(parsedInput);
    }
    getFormatInstructions() {
        return this.structuredInputParser.getFormatInstructions();
    }
}

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/utils/fast-json-patch/index.js + 3 modules
var fast_json_patch = __webpack_require__(67954);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/utils/json_patch.js


// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/utils/json.js
var json = __webpack_require__(31225);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/output_parsers/json.js



/**
 * Class for parsing the output of an LLM into a JSON object.
 */
class JsonOutputParser extends BaseCumulativeTransformOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "output_parsers"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "JsonOutputParser";
    }
    _diff(prev, next) {
        if (!next) {
            return undefined;
        }
        if (!prev) {
            return [{ op: "replace", path: "", value: next }];
        }
        return (0,fast_json_patch/* compare */.UD)(prev, next);
    }
    // This should actually return Partial<T>, but there's no way
    // to specify emitted chunks as instances separate from the main output type.
    async parsePartialResult(generations) {
        return (0,json/* parseJsonMarkdown */.D)(generations[0].text);
    }
    async parse(text) {
        return (0,json/* parseJsonMarkdown */.D)(text, JSON.parse);
    }
    getFormatInstructions() {
        return "";
    }
}


;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/utils/sax-js/sax.js
// @ts-nocheck
// Inlined to deal with portability issues
// Originally from: https://github.com/isaacs/sax-js
const initializeSax = function () {
    const sax = {};
    sax.parser = function (strict, opt) {
        return new SAXParser(strict, opt);
    };
    sax.SAXParser = SAXParser;
    sax.SAXStream = SAXStream;
    sax.createStream = createStream;
    // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
    // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
    // since that's the earliest that a buffer overrun could occur.  This way, checks are
    // as rare as required, but as often as necessary to ensure never crossing this bound.
    // Furthermore, buffers are only tested at most once per write(), so passing a very
    // large string into write() might have undesirable effects, but this is manageable by
    // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
    // edge case, result in creating at most one complete copy of the string passed in.
    // Set to Infinity to have unlimited buffers.
    sax.MAX_BUFFER_LENGTH = 64 * 1024;
    const buffers = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script",
    ];
    sax.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace",
    ];
    function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) {
            return new SAXParser(strict, opt);
        }
        var parser = this;
        clearBuffers(parser);
        parser.q = parser.c = "";
        parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
        parser.opt = opt || {};
        parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
        parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
        parser.tags = [];
        parser.closed = parser.closedRoot = parser.sawRoot = false;
        parser.tag = parser.error = null;
        parser.strict = !!strict;
        parser.noscript = !!(strict || parser.opt.noscript);
        parser.state = S.BEGIN;
        parser.strictEntities = parser.opt.strictEntities;
        parser.ENTITIES = parser.strictEntities
            ? Object.create(sax.XML_ENTITIES)
            : Object.create(sax.ENTITIES);
        parser.attribList = [];
        // namespaces form a prototype chain.
        // it always points at the current tag,
        // which protos to its parent tag.
        if (parser.opt.xmlns) {
            parser.ns = Object.create(rootNS);
        }
        // mostly just for error reporting
        parser.trackPosition = parser.opt.position !== false;
        if (parser.trackPosition) {
            parser.position = parser.line = parser.column = 0;
        }
        emit(parser, "onready");
    }
    if (!Object.create) {
        Object.create = function (o) {
            function F() { }
            F.prototype = o;
            var newf = new F();
            return newf;
        };
    }
    if (!Object.keys) {
        Object.keys = function (o) {
            var a = [];
            for (var i in o)
                if (o.hasOwnProperty(i))
                    a.push(i);
            return a;
        };
    }
    function checkBufferLength(parser) {
        var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
        var maxActual = 0;
        for (var i = 0, l = buffers.length; i < l; i++) {
            var len = parser[buffers[i]].length;
            if (len > maxAllowed) {
                // Text/cdata nodes can get big, and since they're buffered,
                // we can get here under normal conditions.
                // Avoid issues by emitting the text node now,
                // so at least it won't get any bigger.
                switch (buffers[i]) {
                    case "textNode":
                        closeText(parser);
                        break;
                    case "cdata":
                        emitNode(parser, "oncdata", parser.cdata);
                        parser.cdata = "";
                        break;
                    case "script":
                        emitNode(parser, "onscript", parser.script);
                        parser.script = "";
                        break;
                    default:
                        error(parser, "Max buffer length exceeded: " + buffers[i]);
                }
            }
            maxActual = Math.max(maxActual, len);
        }
        // schedule the next check for the earliest possible buffer overrun.
        var m = sax.MAX_BUFFER_LENGTH - maxActual;
        parser.bufferCheckPosition = m + parser.position;
    }
    function clearBuffers(parser) {
        for (var i = 0, l = buffers.length; i < l; i++) {
            parser[buffers[i]] = "";
        }
    }
    function flushBuffers(parser) {
        closeText(parser);
        if (parser.cdata !== "") {
            emitNode(parser, "oncdata", parser.cdata);
            parser.cdata = "";
        }
        if (parser.script !== "") {
            emitNode(parser, "onscript", parser.script);
            parser.script = "";
        }
    }
    SAXParser.prototype = {
        end: function () {
            end(this);
        },
        write: write,
        resume: function () {
            this.error = null;
            return this;
        },
        close: function () {
            return this.write(null);
        },
        flush: function () {
            flushBuffers(this);
        },
    };
    var Stream = ReadableStream;
    if (!Stream)
        Stream = function () { };
    var streamWraps = sax.EVENTS.filter(function (ev) {
        return ev !== "error" && ev !== "end";
    });
    function createStream(strict, opt) {
        return new SAXStream(strict, opt);
    }
    function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) {
            return new SAXStream(strict, opt);
        }
        Stream.apply(this);
        this._parser = new SAXParser(strict, opt);
        this.writable = true;
        this.readable = true;
        var me = this;
        this._parser.onend = function () {
            me.emit("end");
        };
        this._parser.onerror = function (er) {
            me.emit("error", er);
            // if didn't throw, then means error was handled.
            // go ahead and clear error, so we can write again.
            me._parser.error = null;
        };
        this._decoder = null;
        streamWraps.forEach(function (ev) {
            Object.defineProperty(me, "on" + ev, {
                get: function () {
                    return me._parser["on" + ev];
                },
                set: function (h) {
                    if (!h) {
                        me.removeAllListeners(ev);
                        me._parser["on" + ev] = h;
                        return h;
                    }
                    me.on(ev, h);
                },
                enumerable: true,
                configurable: false,
            });
        });
    }
    SAXStream.prototype = Object.create(Stream.prototype, {
        constructor: {
            value: SAXStream,
        },
    });
    SAXStream.prototype.write = function (data) {
        this._parser.write(data.toString());
        this.emit("data", data);
        return true;
    };
    SAXStream.prototype.end = function (chunk) {
        if (chunk && chunk.length) {
            this.write(chunk);
        }
        this._parser.end();
        return true;
    };
    SAXStream.prototype.on = function (ev, handler) {
        var me = this;
        if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
            me._parser["on" + ev] = function () {
                var args = arguments.length === 1
                    ? [arguments[0]]
                    : Array.apply(null, arguments);
                args.splice(0, 0, ev);
                me.emit.apply(me, args);
            };
        }
        return Stream.prototype.on.call(me, ev, handler);
    };
    // this really needs to be replaced with character classes.
    // XML allows all manner of ridiculous numbers and digits.
    var CDATA = "[CDATA[";
    var DOCTYPE = "DOCTYPE";
    var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
    var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
    var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
    // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
    // This implementation works on strings, a single character at a time
    // as such, it cannot ever support astral-plane characters (10000-EFFFF)
    // without a significant breaking change to either this  parser, or the
    // JavaScript language.  Implementation of an emoji-capable xml parser
    // is left as an exercise for the reader.
    var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function isWhitespace(c) {
        return c === " " || c === "\n" || c === "\r" || c === "\t";
    }
    function isQuote(c) {
        return c === '"' || c === "'";
    }
    function isAttribEnd(c) {
        return c === ">" || isWhitespace(c);
    }
    function isMatch(regex, c) {
        return regex.test(c);
    }
    function notMatch(regex, c) {
        return !isMatch(regex, c);
    }
    var S = 0;
    sax.STATE = {
        BEGIN: S++,
        BEGIN_WHITESPACE: S++,
        TEXT: S++,
        TEXT_ENTITY: S++,
        OPEN_WAKA: S++,
        SGML_DECL: S++,
        SGML_DECL_QUOTED: S++,
        DOCTYPE: S++,
        DOCTYPE_QUOTED: S++,
        DOCTYPE_DTD: S++,
        DOCTYPE_DTD_QUOTED: S++,
        COMMENT_STARTING: S++,
        COMMENT: S++,
        COMMENT_ENDING: S++,
        COMMENT_ENDED: S++,
        CDATA: S++,
        CDATA_ENDING: S++,
        CDATA_ENDING_2: S++,
        PROC_INST: S++,
        PROC_INST_BODY: S++,
        PROC_INST_ENDING: S++,
        OPEN_TAG: S++,
        OPEN_TAG_SLASH: S++,
        ATTRIB: S++,
        ATTRIB_NAME: S++,
        ATTRIB_NAME_SAW_WHITE: S++,
        ATTRIB_VALUE: S++,
        ATTRIB_VALUE_QUOTED: S++,
        ATTRIB_VALUE_CLOSED: S++,
        ATTRIB_VALUE_UNQUOTED: S++,
        ATTRIB_VALUE_ENTITY_Q: S++,
        ATTRIB_VALUE_ENTITY_U: S++,
        CLOSE_TAG: S++,
        CLOSE_TAG_SAW_WHITE: S++,
        SCRIPT: S++,
        SCRIPT_ENDING: S++, // <script> ... <
    };
    sax.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
    };
    sax.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830,
    };
    Object.keys(sax.ENTITIES).forEach(function (key) {
        var e = sax.ENTITIES[key];
        var s = typeof e === "number" ? String.fromCharCode(e) : e;
        sax.ENTITIES[key] = s;
    });
    for (var s in sax.STATE) {
        sax.STATE[sax.STATE[s]] = s;
    }
    // shorthand
    S = sax.STATE;
    function emit(parser, event, data) {
        parser[event] && parser[event](data);
    }
    function emitNode(parser, nodeType, data) {
        if (parser.textNode)
            closeText(parser);
        emit(parser, nodeType, data);
    }
    function closeText(parser) {
        parser.textNode = textopts(parser.opt, parser.textNode);
        if (parser.textNode)
            emit(parser, "ontext", parser.textNode);
        parser.textNode = "";
    }
    function textopts(opt, text) {
        if (opt.trim)
            text = text.trim();
        if (opt.normalize)
            text = text.replace(/\s+/g, " ");
        return text;
    }
    function error(parser, er) {
        closeText(parser);
        if (parser.trackPosition) {
            er +=
                "\nLine: " +
                    parser.line +
                    "\nColumn: " +
                    parser.column +
                    "\nChar: " +
                    parser.c;
        }
        er = new Error(er);
        parser.error = er;
        emit(parser, "onerror", er);
        return parser;
    }
    function end(parser) {
        if (parser.sawRoot && !parser.closedRoot)
            strictFail(parser, "Unclosed root tag");
        if (parser.state !== S.BEGIN &&
            parser.state !== S.BEGIN_WHITESPACE &&
            parser.state !== S.TEXT) {
            error(parser, "Unexpected end");
        }
        closeText(parser);
        parser.c = "";
        parser.closed = true;
        emit(parser, "onend");
        SAXParser.call(parser, parser.strict, parser.opt);
        return parser;
    }
    function strictFail(parser, message) {
        if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
            throw new Error("bad call to strictFail");
        }
        if (parser.strict) {
            error(parser, message);
        }
    }
    function newTag(parser) {
        if (!parser.strict)
            parser.tagName = parser.tagName[parser.looseCase]();
        var parent = parser.tags[parser.tags.length - 1] || parser;
        var tag = (parser.tag = { name: parser.tagName, attributes: {} });
        // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
        if (parser.opt.xmlns) {
            tag.ns = parent.ns;
        }
        parser.attribList.length = 0;
        emitNode(parser, "onopentagstart", tag);
    }
    function qname(name, attribute) {
        var i = name.indexOf(":");
        var qualName = i < 0 ? ["", name] : name.split(":");
        var prefix = qualName[0];
        var local = qualName[1];
        // <x "xmlns"="http://foo">
        if (attribute && name === "xmlns") {
            prefix = "xmlns";
            local = "";
        }
        return { prefix: prefix, local: local };
    }
    function attrib(parser) {
        if (!parser.strict) {
            parser.attribName = parser.attribName[parser.looseCase]();
        }
        if (parser.attribList.indexOf(parser.attribName) !== -1 ||
            parser.tag.attributes.hasOwnProperty(parser.attribName)) {
            parser.attribName = parser.attribValue = "";
            return;
        }
        if (parser.opt.xmlns) {
            var qn = qname(parser.attribName, true);
            var prefix = qn.prefix;
            var local = qn.local;
            if (prefix === "xmlns") {
                // namespace binding attribute. push the binding into scope
                if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
                    strictFail(parser, "xml: prefix must be bound to " +
                        XML_NAMESPACE +
                        "\n" +
                        "Actual: " +
                        parser.attribValue);
                }
                else if (local === "xmlns" &&
                    parser.attribValue !== XMLNS_NAMESPACE) {
                    strictFail(parser, "xmlns: prefix must be bound to " +
                        XMLNS_NAMESPACE +
                        "\n" +
                        "Actual: " +
                        parser.attribValue);
                }
                else {
                    var tag = parser.tag;
                    var parent = parser.tags[parser.tags.length - 1] || parser;
                    if (tag.ns === parent.ns) {
                        tag.ns = Object.create(parent.ns);
                    }
                    tag.ns[local] = parser.attribValue;
                }
            }
            // defer onattribute events until all attributes have been seen
            // so any new bindings can take effect. preserve attribute order
            // so deferred events can be emitted in document order
            parser.attribList.push([parser.attribName, parser.attribValue]);
        }
        else {
            // in non-xmlns mode, we can emit the event right away
            parser.tag.attributes[parser.attribName] = parser.attribValue;
            emitNode(parser, "onattribute", {
                name: parser.attribName,
                value: parser.attribValue,
            });
        }
        parser.attribName = parser.attribValue = "";
    }
    function openTag(parser, selfClosing) {
        if (parser.opt.xmlns) {
            // emit namespace binding events
            var tag = parser.tag;
            // add namespace info to tag
            var qn = qname(parser.tagName);
            tag.prefix = qn.prefix;
            tag.local = qn.local;
            tag.uri = tag.ns[qn.prefix] || "";
            if (tag.prefix && !tag.uri) {
                strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
                tag.uri = qn.prefix;
            }
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (tag.ns && parent.ns !== tag.ns) {
                Object.keys(tag.ns).forEach(function (p) {
                    emitNode(parser, "onopennamespace", {
                        prefix: p,
                        uri: tag.ns[p],
                    });
                });
            }
            // handle deferred onattribute events
            // Note: do not apply default ns to attributes:
            //   http://www.w3.org/TR/REC-xml-names/#defaulting
            for (var i = 0, l = parser.attribList.length; i < l; i++) {
                var nv = parser.attribList[i];
                var name = nv[0];
                var value = nv[1];
                var qualName = qname(name, true);
                var prefix = qualName.prefix;
                var local = qualName.local;
                var uri = prefix === "" ? "" : tag.ns[prefix] || "";
                var a = {
                    name: name,
                    value: value,
                    prefix: prefix,
                    local: local,
                    uri: uri,
                };
                // if there's any attributes with an undefined namespace,
                // then fail on them now.
                if (prefix && prefix !== "xmlns" && !uri) {
                    strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
                    a.uri = prefix;
                }
                parser.tag.attributes[name] = a;
                emitNode(parser, "onattribute", a);
            }
            parser.attribList.length = 0;
        }
        parser.tag.isSelfClosing = !!selfClosing;
        // process the tag
        parser.sawRoot = true;
        parser.tags.push(parser.tag);
        emitNode(parser, "onopentag", parser.tag);
        if (!selfClosing) {
            // special case for <script> in non-strict mode.
            if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
                parser.state = S.SCRIPT;
            }
            else {
                parser.state = S.TEXT;
            }
            parser.tag = null;
            parser.tagName = "";
        }
        parser.attribName = parser.attribValue = "";
        parser.attribList.length = 0;
    }
    function closeTag(parser) {
        if (!parser.tagName) {
            strictFail(parser, "Weird empty close tag.");
            parser.textNode += "</>";
            parser.state = S.TEXT;
            return;
        }
        if (parser.script) {
            if (parser.tagName !== "script") {
                parser.script += "</" + parser.tagName + ">";
                parser.tagName = "";
                parser.state = S.SCRIPT;
                return;
            }
            emitNode(parser, "onscript", parser.script);
            parser.script = "";
        }
        // first make sure that the closing tag actually exists.
        // <a><b></c></b></a> will close everything, otherwise.
        var t = parser.tags.length;
        var tagName = parser.tagName;
        if (!parser.strict) {
            tagName = tagName[parser.looseCase]();
        }
        var closeTo = tagName;
        while (t--) {
            var close = parser.tags[t];
            if (close.name !== closeTo) {
                // fail the first time in strict mode
                strictFail(parser, "Unexpected close tag");
            }
            else {
                break;
            }
        }
        // didn't find it.  we already failed for strict, so just abort.
        if (t < 0) {
            strictFail(parser, "Unmatched closing tag: " + parser.tagName);
            parser.textNode += "</" + parser.tagName + ">";
            parser.state = S.TEXT;
            return;
        }
        parser.tagName = tagName;
        var s = parser.tags.length;
        while (s-- > t) {
            var tag = (parser.tag = parser.tags.pop());
            parser.tagName = parser.tag.name;
            emitNode(parser, "onclosetag", parser.tagName);
            var x = {};
            for (var i in tag.ns) {
                x[i] = tag.ns[i];
            }
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (parser.opt.xmlns && tag.ns !== parent.ns) {
                // remove namespace bindings introduced by tag
                Object.keys(tag.ns).forEach(function (p) {
                    var n = tag.ns[p];
                    emitNode(parser, "onclosenamespace", { prefix: p, uri: n });
                });
            }
        }
        if (t === 0)
            parser.closedRoot = true;
        parser.tagName = parser.attribValue = parser.attribName = "";
        parser.attribList.length = 0;
        parser.state = S.TEXT;
    }
    function parseEntity(parser) {
        var entity = parser.entity;
        var entityLC = entity.toLowerCase();
        var num;
        var numStr = "";
        if (parser.ENTITIES[entity]) {
            return parser.ENTITIES[entity];
        }
        if (parser.ENTITIES[entityLC]) {
            return parser.ENTITIES[entityLC];
        }
        entity = entityLC;
        if (entity.charAt(0) === "#") {
            if (entity.charAt(1) === "x") {
                entity = entity.slice(2);
                num = parseInt(entity, 16);
                numStr = num.toString(16);
            }
            else {
                entity = entity.slice(1);
                num = parseInt(entity, 10);
                numStr = num.toString(10);
            }
        }
        entity = entity.replace(/^0+/, "");
        if (isNaN(num) || numStr.toLowerCase() !== entity) {
            strictFail(parser, "Invalid character entity");
            return "&" + parser.entity + ";";
        }
        return String.fromCodePoint(num);
    }
    function beginWhiteSpace(parser, c) {
        if (c === "<") {
            parser.state = S.OPEN_WAKA;
            parser.startTagPosition = parser.position;
        }
        else if (!isWhitespace(c)) {
            // have to process this as a text node.
            // weird, but happens.
            strictFail(parser, "Non-whitespace before first tag.");
            parser.textNode = c;
            parser.state = S.TEXT;
        }
    }
    function charAt(chunk, i) {
        var result = "";
        if (i < chunk.length) {
            result = chunk.charAt(i);
        }
        return result;
    }
    function write(chunk) {
        var parser = this;
        if (this.error) {
            throw this.error;
        }
        if (parser.closed) {
            return error(parser, "Cannot write after close. Assign an onready handler.");
        }
        if (chunk === null) {
            return end(parser);
        }
        if (typeof chunk === "object") {
            chunk = chunk.toString();
        }
        var i = 0;
        var c = "";
        while (true) {
            c = charAt(chunk, i++);
            parser.c = c;
            if (!c) {
                break;
            }
            if (parser.trackPosition) {
                parser.position++;
                if (c === "\n") {
                    parser.line++;
                    parser.column = 0;
                }
                else {
                    parser.column++;
                }
            }
            switch (parser.state) {
                case S.BEGIN:
                    parser.state = S.BEGIN_WHITESPACE;
                    if (c === "\uFEFF") {
                        continue;
                    }
                    beginWhiteSpace(parser, c);
                    continue;
                case S.BEGIN_WHITESPACE:
                    beginWhiteSpace(parser, c);
                    continue;
                case S.TEXT:
                    if (parser.sawRoot && !parser.closedRoot) {
                        var starti = i - 1;
                        while (c && c !== "<" && c !== "&") {
                            c = charAt(chunk, i++);
                            if (c && parser.trackPosition) {
                                parser.position++;
                                if (c === "\n") {
                                    parser.line++;
                                    parser.column = 0;
                                }
                                else {
                                    parser.column++;
                                }
                            }
                        }
                        parser.textNode += chunk.substring(starti, i - 1);
                    }
                    if (c === "<" &&
                        !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                        parser.state = S.OPEN_WAKA;
                        parser.startTagPosition = parser.position;
                    }
                    else {
                        if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
                            strictFail(parser, "Text data outside of root node.");
                        }
                        if (c === "&") {
                            parser.state = S.TEXT_ENTITY;
                        }
                        else {
                            parser.textNode += c;
                        }
                    }
                    continue;
                case S.SCRIPT:
                    // only non-strict
                    if (c === "<") {
                        parser.state = S.SCRIPT_ENDING;
                    }
                    else {
                        parser.script += c;
                    }
                    continue;
                case S.SCRIPT_ENDING:
                    if (c === "/") {
                        parser.state = S.CLOSE_TAG;
                    }
                    else {
                        parser.script += "<" + c;
                        parser.state = S.SCRIPT;
                    }
                    continue;
                case S.OPEN_WAKA:
                    // either a /, ?, !, or text is coming next.
                    if (c === "!") {
                        parser.state = S.SGML_DECL;
                        parser.sgmlDecl = "";
                    }
                    else if (isWhitespace(c)) {
                        // wait for it...
                    }
                    else if (isMatch(nameStart, c)) {
                        parser.state = S.OPEN_TAG;
                        parser.tagName = c;
                    }
                    else if (c === "/") {
                        parser.state = S.CLOSE_TAG;
                        parser.tagName = "";
                    }
                    else if (c === "?") {
                        parser.state = S.PROC_INST;
                        parser.procInstName = parser.procInstBody = "";
                    }
                    else {
                        strictFail(parser, "Unencoded <");
                        // if there was some whitespace, then add that in.
                        if (parser.startTagPosition + 1 < parser.position) {
                            var pad = parser.position - parser.startTagPosition;
                            c = new Array(pad).join(" ") + c;
                        }
                        parser.textNode += "<" + c;
                        parser.state = S.TEXT;
                    }
                    continue;
                case S.SGML_DECL:
                    if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
                        emitNode(parser, "onopencdata");
                        parser.state = S.CDATA;
                        parser.sgmlDecl = "";
                        parser.cdata = "";
                    }
                    else if (parser.sgmlDecl + c === "--") {
                        parser.state = S.COMMENT;
                        parser.comment = "";
                        parser.sgmlDecl = "";
                    }
                    else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
                        parser.state = S.DOCTYPE;
                        if (parser.doctype || parser.sawRoot) {
                            strictFail(parser, "Inappropriately located doctype declaration");
                        }
                        parser.doctype = "";
                        parser.sgmlDecl = "";
                    }
                    else if (c === ">") {
                        emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                        parser.sgmlDecl = "";
                        parser.state = S.TEXT;
                    }
                    else if (isQuote(c)) {
                        parser.state = S.SGML_DECL_QUOTED;
                        parser.sgmlDecl += c;
                    }
                    else {
                        parser.sgmlDecl += c;
                    }
                    continue;
                case S.SGML_DECL_QUOTED:
                    if (c === parser.q) {
                        parser.state = S.SGML_DECL;
                        parser.q = "";
                    }
                    parser.sgmlDecl += c;
                    continue;
                case S.DOCTYPE:
                    if (c === ">") {
                        parser.state = S.TEXT;
                        emitNode(parser, "ondoctype", parser.doctype);
                        parser.doctype = true; // just remember that we saw it.
                    }
                    else {
                        parser.doctype += c;
                        if (c === "[") {
                            parser.state = S.DOCTYPE_DTD;
                        }
                        else if (isQuote(c)) {
                            parser.state = S.DOCTYPE_QUOTED;
                            parser.q = c;
                        }
                    }
                    continue;
                case S.DOCTYPE_QUOTED:
                    parser.doctype += c;
                    if (c === parser.q) {
                        parser.q = "";
                        parser.state = S.DOCTYPE;
                    }
                    continue;
                case S.DOCTYPE_DTD:
                    parser.doctype += c;
                    if (c === "]") {
                        parser.state = S.DOCTYPE;
                    }
                    else if (isQuote(c)) {
                        parser.state = S.DOCTYPE_DTD_QUOTED;
                        parser.q = c;
                    }
                    continue;
                case S.DOCTYPE_DTD_QUOTED:
                    parser.doctype += c;
                    if (c === parser.q) {
                        parser.state = S.DOCTYPE_DTD;
                        parser.q = "";
                    }
                    continue;
                case S.COMMENT:
                    if (c === "-") {
                        parser.state = S.COMMENT_ENDING;
                    }
                    else {
                        parser.comment += c;
                    }
                    continue;
                case S.COMMENT_ENDING:
                    if (c === "-") {
                        parser.state = S.COMMENT_ENDED;
                        parser.comment = textopts(parser.opt, parser.comment);
                        if (parser.comment) {
                            emitNode(parser, "oncomment", parser.comment);
                        }
                        parser.comment = "";
                    }
                    else {
                        parser.comment += "-" + c;
                        parser.state = S.COMMENT;
                    }
                    continue;
                case S.COMMENT_ENDED:
                    if (c !== ">") {
                        strictFail(parser, "Malformed comment");
                        // allow <!-- blah -- bloo --> in non-strict mode,
                        // which is a comment of " blah -- bloo "
                        parser.comment += "--" + c;
                        parser.state = S.COMMENT;
                    }
                    else {
                        parser.state = S.TEXT;
                    }
                    continue;
                case S.CDATA:
                    if (c === "]") {
                        parser.state = S.CDATA_ENDING;
                    }
                    else {
                        parser.cdata += c;
                    }
                    continue;
                case S.CDATA_ENDING:
                    if (c === "]") {
                        parser.state = S.CDATA_ENDING_2;
                    }
                    else {
                        parser.cdata += "]" + c;
                        parser.state = S.CDATA;
                    }
                    continue;
                case S.CDATA_ENDING_2:
                    if (c === ">") {
                        if (parser.cdata) {
                            emitNode(parser, "oncdata", parser.cdata);
                        }
                        emitNode(parser, "onclosecdata");
                        parser.cdata = "";
                        parser.state = S.TEXT;
                    }
                    else if (c === "]") {
                        parser.cdata += "]";
                    }
                    else {
                        parser.cdata += "]]" + c;
                        parser.state = S.CDATA;
                    }
                    continue;
                case S.PROC_INST:
                    if (c === "?") {
                        parser.state = S.PROC_INST_ENDING;
                    }
                    else if (isWhitespace(c)) {
                        parser.state = S.PROC_INST_BODY;
                    }
                    else {
                        parser.procInstName += c;
                    }
                    continue;
                case S.PROC_INST_BODY:
                    if (!parser.procInstBody && isWhitespace(c)) {
                        continue;
                    }
                    else if (c === "?") {
                        parser.state = S.PROC_INST_ENDING;
                    }
                    else {
                        parser.procInstBody += c;
                    }
                    continue;
                case S.PROC_INST_ENDING:
                    if (c === ">") {
                        emitNode(parser, "onprocessinginstruction", {
                            name: parser.procInstName,
                            body: parser.procInstBody,
                        });
                        parser.procInstName = parser.procInstBody = "";
                        parser.state = S.TEXT;
                    }
                    else {
                        parser.procInstBody += "?" + c;
                        parser.state = S.PROC_INST_BODY;
                    }
                    continue;
                case S.OPEN_TAG:
                    if (isMatch(nameBody, c)) {
                        parser.tagName += c;
                    }
                    else {
                        newTag(parser);
                        if (c === ">") {
                            openTag(parser);
                        }
                        else if (c === "/") {
                            parser.state = S.OPEN_TAG_SLASH;
                        }
                        else {
                            if (!isWhitespace(c)) {
                                strictFail(parser, "Invalid character in tag name");
                            }
                            parser.state = S.ATTRIB;
                        }
                    }
                    continue;
                case S.OPEN_TAG_SLASH:
                    if (c === ">") {
                        openTag(parser, true);
                        closeTag(parser);
                    }
                    else {
                        strictFail(parser, "Forward-slash in opening tag not followed by >");
                        parser.state = S.ATTRIB;
                    }
                    continue;
                case S.ATTRIB:
                    // haven't read the attribute name yet.
                    if (isWhitespace(c)) {
                        continue;
                    }
                    else if (c === ">") {
                        openTag(parser);
                    }
                    else if (c === "/") {
                        parser.state = S.OPEN_TAG_SLASH;
                    }
                    else if (isMatch(nameStart, c)) {
                        parser.attribName = c;
                        parser.attribValue = "";
                        parser.state = S.ATTRIB_NAME;
                    }
                    else {
                        strictFail(parser, "Invalid attribute name");
                    }
                    continue;
                case S.ATTRIB_NAME:
                    if (c === "=") {
                        parser.state = S.ATTRIB_VALUE;
                    }
                    else if (c === ">") {
                        strictFail(parser, "Attribute without value");
                        parser.attribValue = parser.attribName;
                        attrib(parser);
                        openTag(parser);
                    }
                    else if (isWhitespace(c)) {
                        parser.state = S.ATTRIB_NAME_SAW_WHITE;
                    }
                    else if (isMatch(nameBody, c)) {
                        parser.attribName += c;
                    }
                    else {
                        strictFail(parser, "Invalid attribute name");
                    }
                    continue;
                case S.ATTRIB_NAME_SAW_WHITE:
                    if (c === "=") {
                        parser.state = S.ATTRIB_VALUE;
                    }
                    else if (isWhitespace(c)) {
                        continue;
                    }
                    else {
                        strictFail(parser, "Attribute without value");
                        parser.tag.attributes[parser.attribName] = "";
                        parser.attribValue = "";
                        emitNode(parser, "onattribute", {
                            name: parser.attribName,
                            value: "",
                        });
                        parser.attribName = "";
                        if (c === ">") {
                            openTag(parser);
                        }
                        else if (isMatch(nameStart, c)) {
                            parser.attribName = c;
                            parser.state = S.ATTRIB_NAME;
                        }
                        else {
                            strictFail(parser, "Invalid attribute name");
                            parser.state = S.ATTRIB;
                        }
                    }
                    continue;
                case S.ATTRIB_VALUE:
                    if (isWhitespace(c)) {
                        continue;
                    }
                    else if (isQuote(c)) {
                        parser.q = c;
                        parser.state = S.ATTRIB_VALUE_QUOTED;
                    }
                    else {
                        strictFail(parser, "Unquoted attribute value");
                        parser.state = S.ATTRIB_VALUE_UNQUOTED;
                        parser.attribValue = c;
                    }
                    continue;
                case S.ATTRIB_VALUE_QUOTED:
                    if (c !== parser.q) {
                        if (c === "&") {
                            parser.state = S.ATTRIB_VALUE_ENTITY_Q;
                        }
                        else {
                            parser.attribValue += c;
                        }
                        continue;
                    }
                    attrib(parser);
                    parser.q = "";
                    parser.state = S.ATTRIB_VALUE_CLOSED;
                    continue;
                case S.ATTRIB_VALUE_CLOSED:
                    if (isWhitespace(c)) {
                        parser.state = S.ATTRIB;
                    }
                    else if (c === ">") {
                        openTag(parser);
                    }
                    else if (c === "/") {
                        parser.state = S.OPEN_TAG_SLASH;
                    }
                    else if (isMatch(nameStart, c)) {
                        strictFail(parser, "No whitespace between attributes");
                        parser.attribName = c;
                        parser.attribValue = "";
                        parser.state = S.ATTRIB_NAME;
                    }
                    else {
                        strictFail(parser, "Invalid attribute name");
                    }
                    continue;
                case S.ATTRIB_VALUE_UNQUOTED:
                    if (!isAttribEnd(c)) {
                        if (c === "&") {
                            parser.state = S.ATTRIB_VALUE_ENTITY_U;
                        }
                        else {
                            parser.attribValue += c;
                        }
                        continue;
                    }
                    attrib(parser);
                    if (c === ">") {
                        openTag(parser);
                    }
                    else {
                        parser.state = S.ATTRIB;
                    }
                    continue;
                case S.CLOSE_TAG:
                    if (!parser.tagName) {
                        if (isWhitespace(c)) {
                            continue;
                        }
                        else if (notMatch(nameStart, c)) {
                            if (parser.script) {
                                parser.script += "</" + c;
                                parser.state = S.SCRIPT;
                            }
                            else {
                                strictFail(parser, "Invalid tagname in closing tag.");
                            }
                        }
                        else {
                            parser.tagName = c;
                        }
                    }
                    else if (c === ">") {
                        closeTag(parser);
                    }
                    else if (isMatch(nameBody, c)) {
                        parser.tagName += c;
                    }
                    else if (parser.script) {
                        parser.script += "</" + parser.tagName;
                        parser.tagName = "";
                        parser.state = S.SCRIPT;
                    }
                    else {
                        if (!isWhitespace(c)) {
                            strictFail(parser, "Invalid tagname in closing tag");
                        }
                        parser.state = S.CLOSE_TAG_SAW_WHITE;
                    }
                    continue;
                case S.CLOSE_TAG_SAW_WHITE:
                    if (isWhitespace(c)) {
                        continue;
                    }
                    if (c === ">") {
                        closeTag(parser);
                    }
                    else {
                        strictFail(parser, "Invalid characters in closing tag");
                    }
                    continue;
                case S.TEXT_ENTITY:
                case S.ATTRIB_VALUE_ENTITY_Q:
                case S.ATTRIB_VALUE_ENTITY_U:
                    var returnState;
                    var buffer;
                    switch (parser.state) {
                        case S.TEXT_ENTITY:
                            returnState = S.TEXT;
                            buffer = "textNode";
                            break;
                        case S.ATTRIB_VALUE_ENTITY_Q:
                            returnState = S.ATTRIB_VALUE_QUOTED;
                            buffer = "attribValue";
                            break;
                        case S.ATTRIB_VALUE_ENTITY_U:
                            returnState = S.ATTRIB_VALUE_UNQUOTED;
                            buffer = "attribValue";
                            break;
                    }
                    if (c === ";") {
                        if (parser.opt.unparsedEntities) {
                            var parsedEntity = parseEntity(parser);
                            parser.entity = "";
                            parser.state = returnState;
                            parser.write(parsedEntity);
                        }
                        else {
                            parser[buffer] += parseEntity(parser);
                            parser.entity = "";
                            parser.state = returnState;
                        }
                    }
                    else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
                        parser.entity += c;
                    }
                    else {
                        strictFail(parser, "Invalid character in entity name");
                        parser[buffer] += "&" + parser.entity + c;
                        parser.entity = "";
                        parser.state = returnState;
                    }
                    continue;
                default: /* istanbul ignore next */ {
                    throw new Error(parser, "Unknown state: " + parser.state);
                }
            }
        } // while
        if (parser.position >= parser.bufferCheckPosition) {
            checkBufferLength(parser);
        }
        return parser;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    /* istanbul ignore next */
    if (!String.fromCodePoint) {
        (function () {
            var stringFromCharCode = String.fromCharCode;
            var floor = Math.floor;
            var fromCodePoint = function () {
                var MAX_SIZE = 0x4000;
                var codeUnits = [];
                var highSurrogate;
                var lowSurrogate;
                var index = -1;
                var length = arguments.length;
                if (!length) {
                    return "";
                }
                var result = "";
                while (++index < length) {
                    var codePoint = Number(arguments[index]);
                    if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                        codePoint < 0 || // not a valid Unicode code point
                        codePoint > 0x10ffff || // not a valid Unicode code point
                        floor(codePoint) !== codePoint // not an integer
                    ) {
                        throw RangeError("Invalid code point: " + codePoint);
                    }
                    if (codePoint <= 0xffff) {
                        // BMP code point
                        codeUnits.push(codePoint);
                    }
                    else {
                        // Astral code point; split in surrogate halves
                        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                        codePoint -= 0x10000;
                        highSurrogate = (codePoint >> 10) + 0xd800;
                        lowSurrogate = (codePoint % 0x400) + 0xdc00;
                        codeUnits.push(highSurrogate, lowSurrogate);
                    }
                    if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                        result += stringFromCharCode.apply(null, codeUnits);
                        codeUnits.length = 0;
                    }
                }
                return result;
            };
            /* istanbul ignore next */
            if (Object.defineProperty) {
                Object.defineProperty(String, "fromCodePoint", {
                    value: fromCodePoint,
                    configurable: true,
                    writable: true,
                });
            }
            else {
                String.fromCodePoint = fromCodePoint;
            }
        })();
    }
    return sax;
};
const sax = /** #__PURE__ */ initializeSax();


;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/output_parsers/xml.js



const XML_FORMAT_INSTRUCTIONS = `The output should be formatted as a XML file.
1. Output should conform to the tags below. 
2. If tags are not given, make them on your own.
3. Remember to always open and close all the tags.

As an example, for the tags ["foo", "bar", "baz"]:
1. String "<foo>\n   <bar>\n      <baz></baz>\n   </bar>\n</foo>" is a well-formatted instance of the schema. 
2. String "<foo>\n   <bar>\n   </foo>" is a badly-formatted instance.
3. String "<foo>\n   <tag>\n   </tag>\n</foo>" is a badly-formatted instance.

Here are the output tags:
\`\`\`
{tags}
\`\`\``;
class XMLOutputParser extends BaseCumulativeTransformOutputParser {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "output_parsers"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        this.tags = fields?.tags;
    }
    static lc_name() {
        return "XMLOutputParser";
    }
    _diff(prev, next) {
        if (!next) {
            return undefined;
        }
        if (!prev) {
            return [{ op: "replace", path: "", value: next }];
        }
        return (0,fast_json_patch/* compare */.UD)(prev, next);
    }
    async parsePartialResult(generations) {
        return parseXMLMarkdown(generations[0].text);
    }
    async parse(text) {
        return parseXMLMarkdown(text);
    }
    getFormatInstructions() {
        const withTags = !!(this.tags && this.tags.length > 0);
        return withTags
            ? XML_FORMAT_INSTRUCTIONS.replace("{tags}", this.tags?.join(", ") ?? "")
            : XML_FORMAT_INSTRUCTIONS;
    }
}
const strip = (text) => text
    .split("\n")
    .map((line) => line.replace(/^\s+/, ""))
    .join("\n")
    .trim();
const parseParsedResult = (input) => {
    if (Object.keys(input).length === 0) {
        return {};
    }
    const result = {};
    if (input.children.length > 0) {
        result[input.name] = input.children.map(parseParsedResult);
        return result;
    }
    else {
        result[input.name] = input.text ?? undefined;
        return result;
    }
};
function parseXMLMarkdown(s) {
    const cleanedString = strip(s);
    const parser = sax.parser(true);
    let parsedResult = {};
    const elementStack = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parser.onopentag = (node) => {
        const element = {
            name: node.name,
            attributes: node.attributes,
            children: [],
            text: "",
            isSelfClosing: node.isSelfClosing,
        };
        if (elementStack.length > 0) {
            const parentElement = elementStack[elementStack.length - 1];
            parentElement.children.push(element);
        }
        else {
            parsedResult = element;
        }
        if (!node.isSelfClosing) {
            elementStack.push(element);
        }
    };
    parser.onclosetag = () => {
        if (elementStack.length > 0) {
            const lastElement = elementStack.pop();
            if (elementStack.length === 0 && lastElement) {
                parsedResult = lastElement;
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parser.ontext = (text) => {
        if (elementStack.length > 0) {
            const currentElement = elementStack[elementStack.length - 1];
            currentElement.text += text;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parser.onattribute = (attr) => {
        if (elementStack.length > 0) {
            const currentElement = elementStack[elementStack.length - 1];
            currentElement.attributes[attr.name] = attr.value;
        }
    };
    // Try to find XML string within triple backticks.
    const match = /```(xml)?(.*)```/s.exec(cleanedString);
    const xmlString = match ? match[2] : cleanedString;
    parser.write(xmlString).close();
    // Remove the XML declaration if present
    if (parsedResult && parsedResult.name === "?xml") {
        parsedResult = parsedResult.children[0];
    }
    return parseParsedResult(parsedResult);
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/output_parsers/index.js









;// CONCATENATED MODULE: ./node_modules/@langchain/core/output_parsers.js


/***/ }),

/***/ 36100:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  sS: () => (/* reexport */ chat/* AIMessagePromptTemplate */.sS),
  m2: () => (/* reexport */ base/* BasePromptTemplate */.m),
  RZ: () => (/* reexport */ chat/* ChatPromptTemplate */.RZ),
  FS: () => (/* reexport */ chat/* HumanMessagePromptTemplate */.FS),
  Hh: () => (/* reexport */ prompts_prompt.PromptTemplate),
  BJ: () => (/* reexport */ chat/* SystemMessagePromptTemplate */.BJ),
  Xm: () => (/* reexport */ template/* renderTemplate */.Xm)
});

// UNUSED EXPORTS: BaseChatPromptTemplate, BaseMessagePromptTemplate, BaseMessageStringPromptTemplate, BaseStringPromptTemplate, ChatMessagePromptTemplate, DEFAULT_FORMATTER_MAPPING, DEFAULT_PARSER_MAPPING, FewShotChatMessagePromptTemplate, FewShotPromptTemplate, ImagePromptTemplate, MessagesPlaceholder, PipelinePromptTemplate, StructuredPrompt, checkValidTemplate, interpolateFString, interpolateMustache, parseFString, parseMustache, parseTemplate

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/prompts/base.js
var base = __webpack_require__(1776);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/prompts/chat.js
var chat = __webpack_require__(46612);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/prompts/few_shot.js
var few_shot = __webpack_require__(92430);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/prompts/pipeline.js


/**
 * Class that handles a sequence of prompts, each of which may require
 * different input variables. Includes methods for formatting these
 * prompts, extracting required input values, and handling partial
 * prompts.
 * @example
 * ```typescript
 * const composedPrompt = new PipelinePromptTemplate({
 *   pipelinePrompts: [
 *     {
 *       name: "introduction",
 *       prompt: PromptTemplate.fromTemplate(`You are impersonating {person}.`),
 *     },
 *     {
 *       name: "example",
 *       prompt: PromptTemplate.fromTemplate(
 *         `Here's an example of an interaction:
 * Q: {example_q}
 * A: {example_a}`,
 *       ),
 *     },
 *     {
 *       name: "start",
 *       prompt: PromptTemplate.fromTemplate(
 *         `Now, do this for real!
 * Q: {input}
 * A:`,
 *       ),
 *     },
 *   ],
 *   finalPrompt: PromptTemplate.fromTemplate(
 *     `{introduction}
 * {example}
 * {start}`,
 *   ),
 * });
 *
 * const formattedPrompt = await composedPrompt.format({
 *   person: "Elon Musk",
 *   example_q: `What's your favorite car?`,
 *   example_a: "Tesla",
 *   input: `What's your favorite social media site?`,
 * });
 * ```
 */
class PipelinePromptTemplate extends base/* BasePromptTemplate */.m {
    static lc_name() {
        return "PipelinePromptTemplate";
    }
    constructor(input) {
        super({ ...input, inputVariables: [] });
        Object.defineProperty(this, "pipelinePrompts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "finalPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pipelinePrompts = input.pipelinePrompts;
        this.finalPrompt = input.finalPrompt;
        this.inputVariables = this.computeInputValues();
    }
    /**
     * Computes the input values required by the pipeline prompts.
     * @returns Array of input values required by the pipeline prompts.
     */
    computeInputValues() {
        const intermediateValues = this.pipelinePrompts.map((pipelinePrompt) => pipelinePrompt.name);
        const inputValues = this.pipelinePrompts
            .map((pipelinePrompt) => pipelinePrompt.prompt.inputVariables.filter((inputValue) => !intermediateValues.includes(inputValue)))
            .flat();
        return [...new Set(inputValues)];
    }
    static extractRequiredInputValues(allValues, requiredValueNames) {
        return requiredValueNames.reduce((requiredValues, valueName) => {
            // eslint-disable-next-line no-param-reassign
            requiredValues[valueName] = allValues[valueName];
            return requiredValues;
        }, {});
    }
    /**
     * Formats the pipeline prompts based on the provided input values.
     * @param values Input values to format the pipeline prompts.
     * @returns Promise that resolves with the formatted input values.
     */
    async formatPipelinePrompts(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        for (const { name: pipelinePromptName, prompt: pipelinePrompt } of this
            .pipelinePrompts) {
            const pipelinePromptInputValues = PipelinePromptTemplate.extractRequiredInputValues(allValues, pipelinePrompt.inputVariables);
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (pipelinePrompt instanceof chat/* ChatPromptTemplate */.RZ) {
                allValues[pipelinePromptName] = await pipelinePrompt.formatMessages(pipelinePromptInputValues);
            }
            else {
                allValues[pipelinePromptName] = await pipelinePrompt.format(pipelinePromptInputValues);
            }
        }
        return PipelinePromptTemplate.extractRequiredInputValues(allValues, this.finalPrompt.inputVariables);
    }
    /**
     * Formats the final prompt value based on the provided input values.
     * @param values Input values to format the final prompt value.
     * @returns Promise that resolves with the formatted final prompt value.
     */
    async formatPromptValue(values) {
        return this.finalPrompt.formatPromptValue(await this.formatPipelinePrompts(values));
    }
    async format(values) {
        return this.finalPrompt.format(await this.formatPipelinePrompts(values));
    }
    /**
     * Handles partial prompts, which are prompts that have been partially
     * filled with input values.
     * @param values Partial input values.
     * @returns Promise that resolves with a new PipelinePromptTemplate instance with updated input variables.
     */
    async partial(values) {
        const promptDict = { ...this };
        promptDict.inputVariables = this.inputVariables.filter((iv) => !(iv in values));
        promptDict.partialVariables = {
            ...(this.partialVariables ?? {}),
            ...values,
        };
        return new PipelinePromptTemplate(promptDict);
    }
    serialize() {
        throw new Error("Not implemented.");
    }
    _getPromptType() {
        return "pipeline";
    }
}

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/prompts/prompt.js
var prompts_prompt = __webpack_require__(68531);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/prompts/string.js
var string = __webpack_require__(3748);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/prompts/template.js + 1 modules
var template = __webpack_require__(36574);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/prompts/image.js
var prompts_image = __webpack_require__(99848);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/prompts/structured.js

function isWithStructuredOutput(x
// eslint-disable-next-line @typescript-eslint/ban-types
) {
    return (typeof x === "object" &&
        x != null &&
        "withStructuredOutput" in x &&
        typeof x.withStructuredOutput === "function");
}
function isRunnableBinding(x) {
    return (typeof x === "object" &&
        x != null &&
        "lc_id" in x &&
        Array.isArray(x.lc_id) &&
        x.lc_id.join("/") === "langchain_core/runnables/RunnableBinding");
}
class StructuredPrompt extends chat/* ChatPromptTemplate */.RZ {
    get lc_aliases() {
        return {
            ...super.lc_aliases,
            schema: "schema_",
        };
    }
    constructor(input) {
        super(input);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "prompts", "structured"]
        });
        this.schema = input.schema;
    }
    pipe(coerceable) {
        if (isWithStructuredOutput(coerceable)) {
            return super.pipe(coerceable.withStructuredOutput(this.schema));
        }
        if (isRunnableBinding(coerceable) &&
            isWithStructuredOutput(coerceable.bound)) {
            return super.pipe(coerceable.bound
                .withStructuredOutput(this.schema)
                .bind(coerceable.kwargs ?? {})
                .withConfig(coerceable.config));
        }
        throw new Error(`Structured prompts need to be piped to a language model that supports the "withStructuredOutput()" method.`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromMessagesAndSchema(promptMessages, schema
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        return StructuredPrompt.fromMessages(promptMessages, { schema });
    }
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/prompts/index.js











;// CONCATENATED MODULE: ./node_modules/@langchain/core/prompts.js


/***/ }),

/***/ 47064:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  LLMChain: () => (/* binding */ LLMChain)
});

// EXTERNAL MODULE: ./node_modules/@langchain/core/language_models/base.js + 7 modules
var base = __webpack_require__(6571);
// EXTERNAL MODULE: ./node_modules/@langchain/core/prompts.js + 3 modules
var prompts = __webpack_require__(36100);
// EXTERNAL MODULE: ./node_modules/@langchain/core/runnables.js
var runnables = __webpack_require__(85258);
// EXTERNAL MODULE: ./node_modules/langchain/dist/chains/base.js + 2 modules
var chains_base = __webpack_require__(97258);
// EXTERNAL MODULE: ./node_modules/@langchain/core/output_parsers.js + 18 modules
var output_parsers = __webpack_require__(52801);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/output_parsers/noop.js

/**
 * The NoOpOutputParser class is a type of output parser that does not
 * perform any operations on the output. It extends the BaseOutputParser
 * class and is part of the LangChain's output parsers module. This class
 * is useful in scenarios where the raw output of the Large Language
 * Models (LLMs) is required.
 */
class NoOpOutputParser extends output_parsers/* BaseOutputParser */.mJ {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "output_parsers", "default"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "NoOpOutputParser";
    }
    /**
     * This method takes a string as input and returns the same string as
     * output. It does not perform any operations on the input string.
     * @param text The input string to be parsed.
     * @returns The same input string without any operations performed on it.
     */
    parse(text) {
        return Promise.resolve(text);
    }
    /**
     * This method returns an empty string. It does not provide any formatting
     * instructions.
     * @returns An empty string, indicating no formatting instructions.
     */
    getFormatInstructions() {
        return "";
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/chains/llm_chain.js





function isBaseLanguageModel(llmLike) {
    return typeof llmLike._llmType === "function";
}
function _getLanguageModel(llmLike) {
    if (isBaseLanguageModel(llmLike)) {
        return llmLike;
    }
    else if ("bound" in llmLike && runnables/* Runnable */.YN.isRunnable(llmLike.bound)) {
        return _getLanguageModel(llmLike.bound);
    }
    else if ("runnable" in llmLike &&
        "fallbacks" in llmLike &&
        runnables/* Runnable */.YN.isRunnable(llmLike.runnable)) {
        return _getLanguageModel(llmLike.runnable);
    }
    else if ("default" in llmLike && runnables/* Runnable */.YN.isRunnable(llmLike.default)) {
        return _getLanguageModel(llmLike.default);
    }
    else {
        throw new Error("Unable to extract BaseLanguageModel from llmLike object.");
    }
}
/**
 * @deprecated This class will be removed in 1.0.0. Use the LangChain Expression Language (LCEL) instead.
 * See the example below for how to use LCEL with the LLMChain class:
 *
 * Chain to run queries against LLMs.
 *
 * @example
 * ```ts
 * import { ChatPromptTemplate } from "@langchain/core/prompts";
 * import { ChatOpenAI } from "@langchain/openai";
 *
 * const prompt = ChatPromptTemplate.fromTemplate("Tell me a {adjective} joke");
 * const llm = new ChatOpenAI();
 * const chain = prompt.pipe(llm);
 *
 * const response = await chain.invoke({ adjective: "funny" });
 * ```
 */
class LLMChain extends chains_base/* BaseChain */.r {
    static lc_name() {
        return "LLMChain";
    }
    get inputKeys() {
        return this.prompt.inputVariables;
    }
    get outputKeys() {
        return [this.outputKey];
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llmKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text"
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.prompt = fields.prompt;
        this.llm = fields.llm;
        this.llmKwargs = fields.llmKwargs;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.outputParser =
            fields.outputParser ?? new NoOpOutputParser();
        if (this.prompt.outputParser) {
            if (fields.outputParser) {
                throw new Error("Cannot set both outputParser and prompt.outputParser");
            }
            this.outputParser = this.prompt.outputParser;
        }
    }
    getCallKeys() {
        const callKeys = "callKeys" in this.llm ? this.llm.callKeys : [];
        return callKeys;
    }
    /** @ignore */
    _selectMemoryInputs(values) {
        const valuesForMemory = super._selectMemoryInputs(values);
        const callKeys = this.getCallKeys();
        for (const key of callKeys) {
            if (key in values) {
                delete valuesForMemory[key];
            }
        }
        return valuesForMemory;
    }
    /** @ignore */
    async _getFinalOutput(generations, promptValue, runManager) {
        let finalCompletion;
        if (this.outputParser) {
            finalCompletion = await this.outputParser.parseResultWithPrompt(generations, promptValue, runManager?.getChild());
        }
        else {
            finalCompletion = generations[0].text;
        }
        return finalCompletion;
    }
    /**
     * Run the core logic of this chain and add to output if desired.
     *
     * Wraps _call and handles memory.
     */
    call(values, config) {
        return super.call(values, config);
    }
    /** @ignore */
    async _call(values, runManager) {
        const valuesForPrompt = { ...values };
        const valuesForLLM = {
            ...this.llmKwargs,
        };
        const callKeys = this.getCallKeys();
        for (const key of callKeys) {
            if (key in values) {
                if (valuesForLLM) {
                    valuesForLLM[key] =
                        values[key];
                    delete valuesForPrompt[key];
                }
            }
        }
        const promptValue = await this.prompt.formatPromptValue(valuesForPrompt);
        if ("generatePrompt" in this.llm) {
            const { generations } = await this.llm.generatePrompt([promptValue], valuesForLLM, runManager?.getChild());
            return {
                [this.outputKey]: await this._getFinalOutput(generations[0], promptValue, runManager),
            };
        }
        const modelWithParser = this.outputParser
            ? this.llm.pipe(this.outputParser)
            : this.llm;
        const response = await modelWithParser.invoke(promptValue, runManager?.getChild());
        return {
            [this.outputKey]: response,
        };
    }
    /**
     * Format prompt with values and pass to LLM
     *
     * @param values - keys to pass to prompt template
     * @param callbackManager - CallbackManager to use
     * @returns Completion from LLM.
     *
     * @example
     * ```ts
     * llm.predict({ adjective: "funny" })
     * ```
     */
    async predict(values, callbackManager) {
        const output = await this.call(values, callbackManager);
        return output[this.outputKey];
    }
    _chainType() {
        return "llm";
    }
    static async deserialize(data) {
        const { llm, prompt } = data;
        if (!llm) {
            throw new Error("LLMChain must have llm");
        }
        if (!prompt) {
            throw new Error("LLMChain must have prompt");
        }
        return new LLMChain({
            llm: await base/* BaseLanguageModel */.j_.deserialize(llm),
            prompt: await prompts/* BasePromptTemplate */.m2.deserialize(prompt),
        });
    }
    /** @deprecated */
    serialize() {
        const serialize = "serialize" in this.llm ? this.llm.serialize() : undefined;
        return {
            _type: `${this._chainType()}_chain`,
            llm: serialize,
            prompt: this.prompt.serialize(),
        };
    }
    _getNumTokens(text) {
        return _getLanguageModel(this.llm).getNumTokens(text);
    }
}


/***/ })

};
