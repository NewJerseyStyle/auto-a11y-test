export const id = 543;
export const ids = [543];
export const modules = {

/***/ 1776:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ BasePromptTemplate)
/* harmony export */ });
/* harmony import */ var _runnables_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29248);
// Default generic "any" values are for backwards compatibility.
// Replace with "string" when we are comfortable with a breaking change.

/**
 * Base class for prompt templates. Exposes a format method that returns a
 * string prompt given a set of input values.
 */
class BasePromptTemplate extends _runnables_base_js__WEBPACK_IMPORTED_MODULE_0__/* .Runnable */ .YN {
    get lc_attributes() {
        return {
            partialVariables: undefined, // python doesn't support this yet
        };
    }
    constructor(input) {
        super(input);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "prompts", this._getPromptType()]
        });
        Object.defineProperty(this, "inputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "partialVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Metadata to be used for tracing.
         */
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Tags to be used for tracing. */
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { inputVariables } = input;
        if (inputVariables.includes("stop")) {
            throw new Error("Cannot have an input variable named 'stop', as it is used internally, please rename.");
        }
        Object.assign(this, input);
    }
    /**
     * Merges partial variables and user variables.
     * @param userVariables The user variables to merge with the partial variables.
     * @returns A Promise that resolves to an object containing the merged variables.
     */
    async mergePartialAndUserVariables(userVariables) {
        const partialVariables = this.partialVariables ?? {};
        const partialValues = {};
        for (const [key, value] of Object.entries(partialVariables)) {
            if (typeof value === "string") {
                partialValues[key] = value;
            }
            else {
                partialValues[key] = await value();
            }
        }
        const allKwargs = {
            ...partialValues,
            ...userVariables,
        };
        return allKwargs;
    }
    /**
     * Invokes the prompt template with the given input and options.
     * @param input The input to invoke the prompt template with.
     * @param options Optional configuration for the callback.
     * @returns A Promise that resolves to the output of the prompt template.
     */
    async invoke(input, options) {
        const metadata = {
            ...this.metadata,
            ...options?.metadata,
        };
        const tags = [...(this.tags ?? []), ...(options?.tags ?? [])];
        return this._callWithConfig((input) => this.formatPromptValue(input), input, { ...options, tags, metadata, runType: "prompt" });
    }
    /**
     * Return a json-like object representing this prompt template.
     * @deprecated
     */
    serialize() {
        throw new Error("Use .toJSON() instead");
    }
    /**
     * @deprecated
     * Load a prompt template from a json-like object describing it.
     *
     * @remarks
     * Deserializing needs to be async because templates (e.g. {@link FewShotPromptTemplate}) can
     * reference remote resources that we read asynchronously with a web
     * request.
     */
    static async deserialize(data) {
        switch (data._type) {
            case "prompt": {
                const { PromptTemplate } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 68531));
                return PromptTemplate.deserialize(data);
            }
            case undefined: {
                const { PromptTemplate } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 68531));
                return PromptTemplate.deserialize({ ...data, _type: "prompt" });
            }
            case "few_shot": {
                const { FewShotPromptTemplate } = await Promise.all(/* import() */[__webpack_require__.e(430), __webpack_require__.e(193)]).then(__webpack_require__.bind(__webpack_require__, 92430));
                return FewShotPromptTemplate.deserialize(data);
            }
            default:
                throw new Error(`Invalid prompt type in config: ${data._type}`);
        }
    }
}


/***/ }),

/***/ 68531:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PromptTemplate: () => (/* binding */ PromptTemplate)
/* harmony export */ });
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3748);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36574);
// Default generic "any" values are for backwards compatibility.
// Replace with "string" when we are comfortable with a breaking change.


/**
 * Schema to represent a basic prompt for an LLM.
 * @augments BasePromptTemplate
 * @augments PromptTemplateInput
 *
 * @example
 * ```ts
 * import { PromptTemplate } from "langchain/prompts";
 *
 * const prompt = new PromptTemplate({
 *   inputVariables: ["foo"],
 *   template: "Say {foo}",
 * });
 * ```
 */
class PromptTemplate extends _string_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseStringPromptTemplate */ .L {
    static lc_name() {
        return "PromptTemplate";
    }
    constructor(input) {
        super(input);
        Object.defineProperty(this, "template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "templateFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "f-string"
        });
        Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**
         * Additional fields which should be included inside
         * the message content array if using a complex message
         * content.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "additionalContentFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // If input is mustache and validateTemplate is not defined, set it to false
        if (input.templateFormat === "mustache" &&
            input.validateTemplate === undefined) {
            this.validateTemplate = false;
        }
        Object.assign(this, input);
        if (this.validateTemplate) {
            if (this.templateFormat === "mustache") {
                throw new Error("Mustache templates cannot be validated.");
            }
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
                totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .checkValidTemplate */ .Ns)(this.template, this.templateFormat, totalInputVariables);
        }
    }
    _getPromptType() {
        return "prompt";
    }
    /**
     * Formats the prompt template with the provided values.
     * @param values The values to be used to format the prompt template.
     * @returns A promise that resolves to a string which is the formatted prompt.
     */
    async format(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        return (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .renderTemplate */ .Xm)(this.template, this.templateFormat, allValues);
    }
    /**
     * Take examples in list format with prefix and suffix to create a prompt.
     *
     * Intended to be used a a way to dynamically create a prompt from examples.
     *
     * @param examples - List of examples to use in the prompt.
     * @param suffix - String to go after the list of examples. Should generally set up the user's input.
     * @param inputVariables - A list of variable names the final prompt template will expect
     * @param exampleSeparator - The separator to use in between examples
     * @param prefix - String that should go before any examples. Generally includes examples.
     *
     * @returns The final prompt template generated.
     */
    static fromExamples(examples, suffix, inputVariables, exampleSeparator = "\n\n", prefix = "") {
        const template = [prefix, ...examples, suffix].join(exampleSeparator);
        return new PromptTemplate({
            inputVariables,
            template,
        });
    }
    static fromTemplate(template, options) {
        const { templateFormat = "f-string", ...rest } = options ?? {};
        const names = new Set();
        (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .parseTemplate */ .QC)(template, templateFormat).forEach((node) => {
            if (node.type === "variable") {
                names.add(node.name);
            }
        });
        return new PromptTemplate({
            // Rely on extracted types
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            inputVariables: [...names],
            templateFormat,
            template,
            ...rest,
        });
    }
    /**
     * Partially applies values to the prompt template.
     * @param values The values to be partially applied to the prompt template.
     * @returns A new instance of PromptTemplate with the partially applied values.
     */
    async partial(values) {
        const newInputVariables = this.inputVariables.filter((iv) => !(iv in values));
        const newPartialVariables = {
            ...(this.partialVariables ?? {}),
            ...values,
        };
        const promptDict = {
            ...this,
            inputVariables: newInputVariables,
            partialVariables: newPartialVariables,
        };
        return new PromptTemplate(promptDict);
    }
    serialize() {
        if (this.outputParser !== undefined) {
            throw new Error("Cannot serialize a prompt template with an output parser");
        }
        return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            template: this.template,
            template_format: this.templateFormat,
        };
    }
    static async deserialize(data) {
        if (!data.template) {
            throw new Error("Prompt template must have a template");
        }
        const res = new PromptTemplate({
            inputVariables: data.input_variables,
            template: data.template,
            templateFormat: data.template_format,
        });
        return res;
    }
}


/***/ }),

/***/ 3748:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ BaseStringPromptTemplate)
/* harmony export */ });
/* harmony import */ var _prompt_values_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49484);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1776);
// Default generic "any" values are for backwards compatibility.
// Replace with "string" when we are comfortable with a breaking change.


/**
 * Base class for string prompt templates. It extends the
 * BasePromptTemplate class and overrides the formatPromptValue method to
 * return a StringPromptValue.
 */
class BaseStringPromptTemplate extends _base_js__WEBPACK_IMPORTED_MODULE_1__/* .BasePromptTemplate */ .m {
    /**
     * Formats the prompt given the input values and returns a formatted
     * prompt value.
     * @param values The input values to format the prompt.
     * @returns A Promise that resolves to a formatted prompt value.
     */
    async formatPromptValue(values) {
        const formattedPrompt = await this.format(values);
        return new _prompt_values_js__WEBPACK_IMPORTED_MODULE_0__/* .StringPromptValue */ .HY(formattedPrompt);
    }
}


/***/ }),

/***/ 36574:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ns: () => (/* binding */ checkValidTemplate),
  D4: () => (/* binding */ parseFString),
  g2: () => (/* binding */ parseMustache),
  QC: () => (/* binding */ template_parseTemplate),
  Xm: () => (/* binding */ renderTemplate)
});

// UNUSED EXPORTS: DEFAULT_FORMATTER_MAPPING, DEFAULT_PARSER_MAPPING, interpolateFString, interpolateMustache

;// CONCATENATED MODULE: ./node_modules/mustache/mustache.mjs
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

var objectToString = Object.prototype.toString;
var isArray = Array.isArray || function isArrayPolyfill (object) {
  return objectToString.call(object) === '[object Array]';
};

function isFunction (object) {
  return typeof object === 'function';
}

/**
 * More correct typeof string handling array
 * which normally returns typeof 'object'
 */
function typeStr (obj) {
  return isArray(obj) ? 'array' : typeof obj;
}

function escapeRegExp (string) {
  return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}

/**
 * Null safe way of checking whether or not an object,
 * including its prototype, has a given property
 */
function hasProperty (obj, propName) {
  return obj != null && typeof obj === 'object' && (propName in obj);
}

/**
 * Safe way of detecting whether or not the given thing is a primitive and
 * whether it has the given property
 */
function primitiveHasOwnProperty (primitive, propName) {
  return (
    primitive != null
    && typeof primitive !== 'object'
    && primitive.hasOwnProperty
    && primitive.hasOwnProperty(propName)
  );
}

// Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
// See https://github.com/janl/mustache.js/issues/189
var regExpTest = RegExp.prototype.test;
function testRegExp (re, string) {
  return regExpTest.call(re, string);
}

var nonSpaceRe = /\S/;
function isWhitespace (string) {
  return !testRegExp(nonSpaceRe, string);
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return entityMap[s];
  });
}

var whiteRe = /\s*/;
var spaceRe = /\s+/;
var equalsRe = /\s*=/;
var curlyRe = /\s*\}/;
var tagRe = /#|\^|\/|>|\{|&|=|!/;

/**
 * Breaks up the given `template` string into a tree of tokens. If the `tags`
 * argument is given here it must be an array with two string values: the
 * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
 * course, the default is to use mustaches (i.e. mustache.tags).
 *
 * A token is an array with at least 4 elements. The first element is the
 * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
 * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
 * all text that appears outside a symbol this element is "text".
 *
 * The second element of a token is its "value". For mustache tags this is
 * whatever else was inside the tag besides the opening symbol. For text tokens
 * this is the text itself.
 *
 * The third and fourth elements of the token are the start and end indices,
 * respectively, of the token in the original template.
 *
 * Tokens that are the root node of a subtree contain two more elements: 1) an
 * array of tokens in the subtree and 2) the index in the original template at
 * which the closing tag for that section begins.
 *
 * Tokens for partials also contain two more elements: 1) a string value of
 * indendation prior to that tag and 2) the index of that tag on that line -
 * eg a value of 2 indicates the partial is the third tag on this line.
 */
function parseTemplate (template, tags) {
  if (!template)
    return [];
  var lineHasNonSpace = false;
  var sections = [];     // Stack to hold section tokens
  var tokens = [];       // Buffer to hold the tokens
  var spaces = [];       // Indices of whitespace tokens on the current line
  var hasTag = false;    // Is there a {{tag}} on the current line?
  var nonSpace = false;  // Is there a non-space char on the current line?
  var indentation = '';  // Tracks indentation for tags that use it
  var tagIndex = 0;      // Stores a count of number of tags encountered on a line

  // Strips all whitespace tokens array for the current line
  // if there was a {{#tag}} on it and otherwise only space.
  function stripSpace () {
    if (hasTag && !nonSpace) {
      while (spaces.length)
        delete tokens[spaces.pop()];
    } else {
      spaces = [];
    }

    hasTag = false;
    nonSpace = false;
  }

  var openingTagRe, closingTagRe, closingCurlyRe;
  function compileTags (tagsToCompile) {
    if (typeof tagsToCompile === 'string')
      tagsToCompile = tagsToCompile.split(spaceRe, 2);

    if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
      throw new Error('Invalid tags: ' + tagsToCompile);

    openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
    closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
    closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
  }

  compileTags(tags || mustache.tags);

  var scanner = new Scanner(template);

  var start, type, value, chr, token, openSection;
  while (!scanner.eos()) {
    start = scanner.pos;

    // Match any text between tags.
    value = scanner.scanUntil(openingTagRe);

    if (value) {
      for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
        chr = value.charAt(i);

        if (isWhitespace(chr)) {
          spaces.push(tokens.length);
          indentation += chr;
        } else {
          nonSpace = true;
          lineHasNonSpace = true;
          indentation += ' ';
        }

        tokens.push([ 'text', chr, start, start + 1 ]);
        start += 1;

        // Check for whitespace on the current line.
        if (chr === '\n') {
          stripSpace();
          indentation = '';
          tagIndex = 0;
          lineHasNonSpace = false;
        }
      }
    }

    // Match the opening tag.
    if (!scanner.scan(openingTagRe))
      break;

    hasTag = true;

    // Get the tag type.
    type = scanner.scan(tagRe) || 'name';
    scanner.scan(whiteRe);

    // Get the tag value.
    if (type === '=') {
      value = scanner.scanUntil(equalsRe);
      scanner.scan(equalsRe);
      scanner.scanUntil(closingTagRe);
    } else if (type === '{') {
      value = scanner.scanUntil(closingCurlyRe);
      scanner.scan(curlyRe);
      scanner.scanUntil(closingTagRe);
      type = '&';
    } else {
      value = scanner.scanUntil(closingTagRe);
    }

    // Match the closing tag.
    if (!scanner.scan(closingTagRe))
      throw new Error('Unclosed tag at ' + scanner.pos);

    if (type == '>') {
      token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
    } else {
      token = [ type, value, start, scanner.pos ];
    }
    tagIndex++;
    tokens.push(token);

    if (type === '#' || type === '^') {
      sections.push(token);
    } else if (type === '/') {
      // Check section nesting.
      openSection = sections.pop();

      if (!openSection)
        throw new Error('Unopened section "' + value + '" at ' + start);

      if (openSection[1] !== value)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
    } else if (type === 'name' || type === '{' || type === '&') {
      nonSpace = true;
    } else if (type === '=') {
      // Set the tags for the next time around.
      compileTags(value);
    }
  }

  stripSpace();

  // Make sure there are no open sections when we're done.
  openSection = sections.pop();

  if (openSection)
    throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

  return nestTokens(squashTokens(tokens));
}

/**
 * Combines the values of consecutive text tokens in the given `tokens` array
 * to a single token.
 */
function squashTokens (tokens) {
  var squashedTokens = [];

  var token, lastToken;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    if (token) {
      if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        squashedTokens.push(token);
        lastToken = token;
      }
    }
  }

  return squashedTokens;
}

/**
 * Forms the given array of `tokens` into a nested tree structure where
 * tokens that represent a section have two additional items: 1) an array of
 * all tokens that appear in that section and 2) the index in the original
 * template that represents the end of that section.
 */
function nestTokens (tokens) {
  var nestedTokens = [];
  var collector = nestedTokens;
  var sections = [];

  var token, section;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
    }
  }

  return nestedTokens;
}

/**
 * A simple string scanner that is used by the template parser to find
 * tokens in template strings.
 */
function Scanner (string) {
  this.string = string;
  this.tail = string;
  this.pos = 0;
}

/**
 * Returns `true` if the tail is empty (end of string).
 */
Scanner.prototype.eos = function eos () {
  return this.tail === '';
};

/**
 * Tries to match the given regular expression at the current position.
 * Returns the matched text if it can match, the empty string otherwise.
 */
Scanner.prototype.scan = function scan (re) {
  var match = this.tail.match(re);

  if (!match || match.index !== 0)
    return '';

  var string = match[0];

  this.tail = this.tail.substring(string.length);
  this.pos += string.length;

  return string;
};

/**
 * Skips all text until the given regular expression can be matched. Returns
 * the skipped string, which is the entire tail if no match can be made.
 */
Scanner.prototype.scanUntil = function scanUntil (re) {
  var index = this.tail.search(re), match;

  switch (index) {
    case -1:
      match = this.tail;
      this.tail = '';
      break;
    case 0:
      match = '';
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
  }

  this.pos += match.length;

  return match;
};

/**
 * Represents a rendering context by wrapping a view object and
 * maintaining a reference to the parent context.
 */
function Context (view, parentContext) {
  this.view = view;
  this.cache = { '.': this.view };
  this.parent = parentContext;
}

/**
 * Creates a new context using the given view with this context
 * as the parent.
 */
Context.prototype.push = function push (view) {
  return new Context(view, this);
};

/**
 * Returns the value of the given name in this context, traversing
 * up the context hierarchy if the value is absent in this context's view.
 */
Context.prototype.lookup = function lookup (name) {
  var cache = this.cache;

  var value;
  if (cache.hasOwnProperty(name)) {
    value = cache[name];
  } else {
    var context = this, intermediateValue, names, index, lookupHit = false;

    while (context) {
      if (name.indexOf('.') > 0) {
        intermediateValue = context.view;
        names = name.split('.');
        index = 0;

        /**
         * Using the dot notion path in `name`, we descend through the
         * nested objects.
         *
         * To be certain that the lookup has been successful, we have to
         * check if the last object in the path actually has the property
         * we are looking for. We store the result in `lookupHit`.
         *
         * This is specially necessary for when the value has been set to
         * `undefined` and we want to avoid looking up parent contexts.
         *
         * In the case where dot notation is used, we consider the lookup
         * to be successful even if the last "object" in the path is
         * not actually an object but a primitive (e.g., a string, or an
         * integer), because it is sometimes useful to access a property
         * of an autoboxed primitive, such as the length of a string.
         **/
        while (intermediateValue != null && index < names.length) {
          if (index === names.length - 1)
            lookupHit = (
              hasProperty(intermediateValue, names[index])
              || primitiveHasOwnProperty(intermediateValue, names[index])
            );

          intermediateValue = intermediateValue[names[index++]];
        }
      } else {
        intermediateValue = context.view[name];

        /**
         * Only checking against `hasProperty`, which always returns `false` if
         * `context.view` is not an object. Deliberately omitting the check
         * against `primitiveHasOwnProperty` if dot notation is not used.
         *
         * Consider this example:
         * ```
         * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
         * ```
         *
         * If we were to check also against `primitiveHasOwnProperty`, as we do
         * in the dot notation case, then render call would return:
         *
         * "The length of a football field is 9."
         *
         * rather than the expected:
         *
         * "The length of a football field is 100 yards."
         **/
        lookupHit = hasProperty(context.view, name);
      }

      if (lookupHit) {
        value = intermediateValue;
        break;
      }

      context = context.parent;
    }

    cache[name] = value;
  }

  if (isFunction(value))
    value = value.call(this.view);

  return value;
};

/**
 * A Writer knows how to take a stream of tokens and render them to a
 * string, given a context. It also maintains a cache of templates to
 * avoid the need to parse the same template twice.
 */
function Writer () {
  this.templateCache = {
    _cache: {},
    set: function set (key, value) {
      this._cache[key] = value;
    },
    get: function get (key) {
      return this._cache[key];
    },
    clear: function clear () {
      this._cache = {};
    }
  };
}

/**
 * Clears all cached templates in this writer.
 */
Writer.prototype.clearCache = function clearCache () {
  if (typeof this.templateCache !== 'undefined') {
    this.templateCache.clear();
  }
};

/**
 * Parses and caches the given `template` according to the given `tags` or
 * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
 * that is generated from the parse.
 */
Writer.prototype.parse = function parse (template, tags) {
  var cache = this.templateCache;
  var cacheKey = template + ':' + (tags || mustache.tags).join(':');
  var isCacheEnabled = typeof cache !== 'undefined';
  var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

  if (tokens == undefined) {
    tokens = parseTemplate(template, tags);
    isCacheEnabled && cache.set(cacheKey, tokens);
  }
  return tokens;
};

/**
 * High-level method that is used to render the given `template` with
 * the given `view`.
 *
 * The optional `partials` argument may be an object that contains the
 * names and templates of partials that are used in the template. It may
 * also be a function that is used to load partial templates on the fly
 * that takes a single argument: the name of the partial.
 *
 * If the optional `config` argument is given here, then it should be an
 * object with a `tags` attribute or an `escape` attribute or both.
 * If an array is passed, then it will be interpreted the same way as
 * a `tags` attribute on a `config` object.
 *
 * The `tags` attribute of a `config` object must be an array with two
 * string values: the opening and closing tags used in the template (e.g.
 * [ "<%", "%>" ]). The default is to mustache.tags.
 *
 * The `escape` attribute of a `config` object must be a function which
 * accepts a string as input and outputs a safely escaped string.
 * If an `escape` function is not provided, then an HTML-safe string
 * escaping function is used as the default.
 */
Writer.prototype.render = function render (template, view, partials, config) {
  var tags = this.getConfigTags(config);
  var tokens = this.parse(template, tags);
  var context = (view instanceof Context) ? view : new Context(view, undefined);
  return this.renderTokens(tokens, context, partials, template, config);
};

/**
 * Low-level method that renders the given array of `tokens` using
 * the given `context` and `partials`.
 *
 * Note: The `originalTemplate` is only ever used to extract the portion
 * of the original template that was contained in a higher-order section.
 * If the template doesn't use higher-order sections, this argument may
 * be omitted.
 */
Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
  var buffer = '';

  var token, symbol, value;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    value = undefined;
    token = tokens[i];
    symbol = token[0];

    if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
    else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
    else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
    else if (symbol === '&') value = this.unescapedValue(token, context);
    else if (symbol === 'name') value = this.escapedValue(token, context, config);
    else if (symbol === 'text') value = this.rawValue(token);

    if (value !== undefined)
      buffer += value;
  }

  return buffer;
};

Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
  var self = this;
  var buffer = '';
  var value = context.lookup(token[1]);

  // This function is used to render an arbitrary template
  // in the current context by higher-order sections.
  function subRender (template) {
    return self.render(template, context, partials, config);
  }

  if (!value) return;

  if (isArray(value)) {
    for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
      buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
    }
  } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
    buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
  } else if (isFunction(value)) {
    if (typeof originalTemplate !== 'string')
      throw new Error('Cannot use higher-order sections without the original template');

    // Extract the portion of the original template that the section contains.
    value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

    if (value != null)
      buffer += value;
  } else {
    buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
  }
  return buffer;
};

Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
  var value = context.lookup(token[1]);

  // Use JavaScript's definition of falsy. Include empty arrays.
  // See https://github.com/janl/mustache.js/issues/186
  if (!value || (isArray(value) && value.length === 0))
    return this.renderTokens(token[4], context, partials, originalTemplate, config);
};

Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
  var filteredIndentation = indentation.replace(/[^ \t]/g, '');
  var partialByNl = partial.split('\n');
  for (var i = 0; i < partialByNl.length; i++) {
    if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
      partialByNl[i] = filteredIndentation + partialByNl[i];
    }
  }
  return partialByNl.join('\n');
};

Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
  if (!partials) return;
  var tags = this.getConfigTags(config);

  var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
  if (value != null) {
    var lineHasNonSpace = token[6];
    var tagIndex = token[5];
    var indentation = token[4];
    var indentedValue = value;
    if (tagIndex == 0 && indentation) {
      indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
    }
    var tokens = this.parse(indentedValue, tags);
    return this.renderTokens(tokens, context, partials, indentedValue, config);
  }
};

Writer.prototype.unescapedValue = function unescapedValue (token, context) {
  var value = context.lookup(token[1]);
  if (value != null)
    return value;
};

Writer.prototype.escapedValue = function escapedValue (token, context, config) {
  var escape = this.getConfigEscape(config) || mustache.escape;
  var value = context.lookup(token[1]);
  if (value != null)
    return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
};

Writer.prototype.rawValue = function rawValue (token) {
  return token[1];
};

Writer.prototype.getConfigTags = function getConfigTags (config) {
  if (isArray(config)) {
    return config;
  }
  else if (config && typeof config === 'object') {
    return config.tags;
  }
  else {
    return undefined;
  }
};

Writer.prototype.getConfigEscape = function getConfigEscape (config) {
  if (config && typeof config === 'object' && !isArray(config)) {
    return config.escape;
  }
  else {
    return undefined;
  }
};

var mustache = {
  name: 'mustache.js',
  version: '4.2.0',
  tags: [ '{{', '}}' ],
  clearCache: undefined,
  escape: undefined,
  parse: undefined,
  render: undefined,
  Scanner: undefined,
  Context: undefined,
  Writer: undefined,
  /**
   * Allows a user to override the default caching strategy, by providing an
   * object with set, get and clear methods. This can also be used to disable
   * the cache by setting it to the literal `undefined`.
   */
  set templateCache (cache) {
    defaultWriter.templateCache = cache;
  },
  /**
   * Gets the default or overridden caching object from the default writer.
   */
  get templateCache () {
    return defaultWriter.templateCache;
  }
};

// All high-level mustache.* functions use this writer.
var defaultWriter = new Writer();

/**
 * Clears all cached templates in the default writer.
 */
mustache.clearCache = function clearCache () {
  return defaultWriter.clearCache();
};

/**
 * Parses and caches the given template in the default writer and returns the
 * array of tokens it contains. Doing this ahead of time avoids the need to
 * parse templates on the fly as they are rendered.
 */
mustache.parse = function parse (template, tags) {
  return defaultWriter.parse(template, tags);
};

/**
 * Renders the `template` with the given `view`, `partials`, and `config`
 * using the default writer.
 */
mustache.render = function render (template, view, partials, config) {
  if (typeof template !== 'string') {
    throw new TypeError('Invalid template! Template should be a "string" ' +
                        'but "' + typeStr(template) + '" was given as the first ' +
                        'argument for mustache#render(template, view, partials)');
  }

  return defaultWriter.render(template, view, partials, config);
};

// Export the escaping function so that the user may override it.
// See https://github.com/janl/mustache.js/issues/244
mustache.escape = escapeHtml;

// Export these mainly for testing, but also for advanced usage.
mustache.Scanner = Scanner;
mustache.Context = Context;
mustache.Writer = Writer;

/* harmony default export */ const mustache_mustache = (mustache);

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/errors/index.js
var errors = __webpack_require__(61193);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/prompts/template.js


function configureMustache() {
    // Use unescaped HTML
    // https://github.com/janl/mustache.js?tab=readme-ov-file#variables
    mustache_mustache.escape = (text) => text;
}
const parseFString = (template) => {
    // Core logic replicated from internals of pythons built in Formatter class.
    // https://github.com/python/cpython/blob/135ec7cefbaffd516b77362ad2b2ad1025af462e/Objects/stringlib/unicode_format.h#L700-L706
    const chars = template.split("");
    const nodes = [];
    const nextBracket = (bracket, start) => {
        for (let i = start; i < chars.length; i += 1) {
            if (bracket.includes(chars[i])) {
                return i;
            }
        }
        return -1;
    };
    let i = 0;
    while (i < chars.length) {
        if (chars[i] === "{" && i + 1 < chars.length && chars[i + 1] === "{") {
            nodes.push({ type: "literal", text: "{" });
            i += 2;
        }
        else if (chars[i] === "}" &&
            i + 1 < chars.length &&
            chars[i + 1] === "}") {
            nodes.push({ type: "literal", text: "}" });
            i += 2;
        }
        else if (chars[i] === "{") {
            const j = nextBracket("}", i);
            if (j < 0) {
                throw new Error("Unclosed '{' in template.");
            }
            nodes.push({
                type: "variable",
                name: chars.slice(i + 1, j).join(""),
            });
            i = j + 1;
        }
        else if (chars[i] === "}") {
            throw new Error("Single '}' in template.");
        }
        else {
            const next = nextBracket("{}", i);
            const text = (next < 0 ? chars.slice(i) : chars.slice(i, next)).join("");
            nodes.push({ type: "literal", text });
            i = next < 0 ? chars.length : next;
        }
    }
    return nodes;
};
/**
 * Convert the result of mustache.parse into an array of ParsedTemplateNode,
 * to make it compatible with other LangChain string parsing template formats.
 *
 * @param {mustache.TemplateSpans} template The result of parsing a mustache template with the mustache.js library.
 * @returns {ParsedTemplateNode[]}
 */
const mustacheTemplateToNodes = (template) => template.map((temp) => {
    if (temp[0] === "name") {
        const name = temp[1].includes(".") ? temp[1].split(".")[0] : temp[1];
        return { type: "variable", name };
    }
    else if (["#", "&", "^", ">"].includes(temp[0])) {
        // # represents a section, "&" represents an unescaped variable.
        // These should both be considered variables.
        return { type: "variable", name: temp[1] };
    }
    else {
        return { type: "literal", text: temp[1] };
    }
});
const parseMustache = (template) => {
    configureMustache();
    const parsed = mustache_mustache.parse(template);
    return mustacheTemplateToNodes(parsed);
};
const interpolateFString = (template, values) => {
    return parseFString(template).reduce((res, node) => {
        if (node.type === "variable") {
            if (node.name in values) {
                const stringValue = typeof values[node.name] === "string"
                    ? values[node.name]
                    : JSON.stringify(values[node.name]);
                return res + stringValue;
            }
            throw new Error(`(f-string) Missing value for input ${node.name}`);
        }
        return res + node.text;
    }, "");
};
const interpolateMustache = (template, values) => {
    configureMustache();
    return mustache_mustache.render(template, values);
};
const DEFAULT_FORMATTER_MAPPING = {
    "f-string": interpolateFString,
    mustache: interpolateMustache,
};
const DEFAULT_PARSER_MAPPING = {
    "f-string": parseFString,
    mustache: parseMustache,
};
const renderTemplate = (template, templateFormat, inputValues) => {
    try {
        return DEFAULT_FORMATTER_MAPPING[templateFormat](template, inputValues);
    }
    catch (e) {
        const error = (0,errors/* addLangChainErrorFields */.Y)(e, "INVALID_PROMPT_INPUT");
        throw error;
    }
};
const template_parseTemplate = (template, templateFormat) => DEFAULT_PARSER_MAPPING[templateFormat](template);
const checkValidTemplate = (template, templateFormat, inputVariables) => {
    if (!(templateFormat in DEFAULT_FORMATTER_MAPPING)) {
        const validFormats = Object.keys(DEFAULT_FORMATTER_MAPPING);
        throw new Error(`Invalid template format. Got \`${templateFormat}\`;
                         should be one of ${validFormats}`);
    }
    try {
        const dummyInputs = inputVariables.reduce((acc, v) => {
            acc[v] = "foo";
            return acc;
        }, {});
        if (Array.isArray(template)) {
            template.forEach((message) => {
                if (message.type === "text") {
                    renderTemplate(message.text, templateFormat, dummyInputs);
                }
                else if (message.type === "image_url") {
                    if (typeof message.image_url === "string") {
                        renderTemplate(message.image_url, templateFormat, dummyInputs);
                    }
                    else {
                        const imageUrl = message.image_url.url;
                        renderTemplate(imageUrl, templateFormat, dummyInputs);
                    }
                }
                else {
                    throw new Error(`Invalid message template received. ${JSON.stringify(message, null, 2)}`);
                }
            });
        }
        else {
            renderTemplate(template, templateFormat, dummyInputs);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        throw new Error(`Invalid prompt schema: ${e.message}`);
    }
};


/***/ })

};
