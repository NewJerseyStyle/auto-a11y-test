export const id = 258;
export const ids = [258,574,193];
export const modules = {

/***/ 91574:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Od: () => (/* reexport */ ai/* AIMessage */.Od),
  XQ: () => (/* reexport */ base/* BaseMessage */.XQ),
  cM: () => (/* reexport */ chat/* ChatMessage */.cM),
  xc: () => (/* reexport */ human/* HumanMessage */.xc),
  tn: () => (/* reexport */ system/* SystemMessage */.tn),
  K0: () => (/* reexport */ utils/* coerceMessageLikeToMessage */.K0),
  ny: () => (/* reexport */ base/* isBaseMessage */.ny)
});

// UNUSED EXPORTS: AIMessageChunk, BaseMessageChunk, ChatMessageChunk, FunctionMessage, FunctionMessageChunk, HumanMessageChunk, RemoveMessage, SystemMessageChunk, ToolMessage, ToolMessageChunk, _isMessageFieldWithRole, _mergeDicts, _mergeLists, _mergeObj, _mergeStatus, convertToChunk, defaultTextSplitter, filterMessages, getBufferString, isAIMessage, isAIMessageChunk, isBaseMessageChunk, isChatMessage, isChatMessageChunk, isFunctionMessage, isFunctionMessageChunk, isHumanMessage, isHumanMessageChunk, isOpenAIToolCallArray, isSystemMessage, isSystemMessageChunk, isToolMessage, isToolMessageChunk, mapChatMessagesToStoredMessages, mapStoredMessageToChatMessage, mapStoredMessagesToChatMessages, mergeContent, mergeMessageRuns, trimMessages

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/ai.js
var ai = __webpack_require__(39986);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/base.js
var base = __webpack_require__(34013);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/chat.js
var chat = __webpack_require__(4274);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/function.js
var messages_function = __webpack_require__(90396);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/human.js
var human = __webpack_require__(53051);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/system.js
var system = __webpack_require__(16561);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/utils.js
var utils = __webpack_require__(9751);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/runnables/base.js + 8 modules
var runnables_base = __webpack_require__(29248);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/messages/modifier.js

/**
 * Message responsible for deleting other messages.
 */
class RemoveMessage extends base/* BaseMessage */.XQ {
    constructor(fields) {
        super({
            ...fields,
            content: "",
        });
        /**
         * The ID of the message to remove.
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = fields.id;
    }
    _getType() {
        return "remove";
    }
    get _printableFields() {
        return {
            ...super._printableFields,
            id: this.id,
        };
    }
}

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/tool.js
var tool = __webpack_require__(50434);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/messages/transformers.js










const _isMessageType = (msg, types) => {
    const typesAsStrings = [
        ...new Set(types?.map((t) => {
            if (typeof t === "string") {
                return t;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const instantiatedMsgClass = new t({});
            if (!("getType" in instantiatedMsgClass) ||
                typeof instantiatedMsgClass.getType !== "function") {
                throw new Error("Invalid type provided.");
            }
            return instantiatedMsgClass.getType();
        })),
    ];
    const msgType = msg.getType();
    return typesAsStrings.some((t) => t === msgType);
};
function filterMessages(messagesOrOptions, options) {
    if (Array.isArray(messagesOrOptions)) {
        return _filterMessages(messagesOrOptions, options);
    }
    return RunnableLambda.from((input) => {
        return _filterMessages(input, messagesOrOptions);
    });
}
function _filterMessages(messages, options = {}) {
    const { includeNames, excludeNames, includeTypes, excludeTypes, includeIds, excludeIds, } = options;
    const filtered = [];
    for (const msg of messages) {
        if (excludeNames && msg.name && excludeNames.includes(msg.name)) {
            continue;
        }
        else if (excludeTypes && _isMessageType(msg, excludeTypes)) {
            continue;
        }
        else if (excludeIds && msg.id && excludeIds.includes(msg.id)) {
            continue;
        }
        // default to inclusion when no inclusion criteria given.
        if (!(includeTypes || includeIds || includeNames)) {
            filtered.push(msg);
        }
        else if (includeNames &&
            msg.name &&
            includeNames.some((iName) => iName === msg.name)) {
            filtered.push(msg);
        }
        else if (includeTypes && _isMessageType(msg, includeTypes)) {
            filtered.push(msg);
        }
        else if (includeIds && msg.id && includeIds.some((id) => id === msg.id)) {
            filtered.push(msg);
        }
    }
    return filtered;
}
function mergeMessageRuns(messages) {
    if (Array.isArray(messages)) {
        return _mergeMessageRuns(messages);
    }
    return RunnableLambda.from(_mergeMessageRuns);
}
function _mergeMessageRuns(messages) {
    if (!messages.length) {
        return [];
    }
    const merged = [];
    for (const msg of messages) {
        const curr = msg;
        const last = merged.pop();
        if (!last) {
            merged.push(curr);
        }
        else if (curr.getType() === "tool" ||
            !(curr.getType() === last.getType())) {
            merged.push(last, curr);
        }
        else {
            const lastChunk = convertToChunk(last);
            const currChunk = convertToChunk(curr);
            const mergedChunks = lastChunk.concat(currChunk);
            if (typeof lastChunk.content === "string" &&
                typeof currChunk.content === "string") {
                mergedChunks.content = `${lastChunk.content}\n${currChunk.content}`;
            }
            merged.push(_chunkToMsg(mergedChunks));
        }
    }
    return merged;
}
function trimMessages(messagesOrOptions, options) {
    if (Array.isArray(messagesOrOptions)) {
        const messages = messagesOrOptions;
        if (!options) {
            throw new Error("Options parameter is required when providing messages.");
        }
        return _trimMessagesHelper(messages, options);
    }
    else {
        const trimmerOptions = messagesOrOptions;
        return RunnableLambda.from((input) => _trimMessagesHelper(input, trimmerOptions)).withConfig({
            runName: "trim_messages",
        });
    }
}
async function _trimMessagesHelper(messages, options) {
    const { maxTokens, tokenCounter, strategy = "last", allowPartial = false, endOn, startOn, includeSystem = false, textSplitter, } = options;
    if (startOn && strategy === "first") {
        throw new Error("`startOn` should only be specified if `strategy` is 'last'.");
    }
    if (includeSystem && strategy === "first") {
        throw new Error("`includeSystem` should only be specified if `strategy` is 'last'.");
    }
    let listTokenCounter;
    if ("getNumTokens" in tokenCounter) {
        listTokenCounter = async (msgs) => {
            const tokenCounts = await Promise.all(msgs.map((msg) => tokenCounter.getNumTokens(msg.content)));
            return tokenCounts.reduce((sum, count) => sum + count, 0);
        };
    }
    else {
        listTokenCounter = async (msgs) => tokenCounter(msgs);
    }
    let textSplitterFunc = defaultTextSplitter;
    if (textSplitter) {
        if ("splitText" in textSplitter) {
            textSplitterFunc = textSplitter.splitText;
        }
        else {
            textSplitterFunc = async (text) => textSplitter(text);
        }
    }
    if (strategy === "first") {
        return _firstMaxTokens(messages, {
            maxTokens,
            tokenCounter: listTokenCounter,
            textSplitter: textSplitterFunc,
            partialStrategy: allowPartial ? "first" : undefined,
            endOn,
        });
    }
    else if (strategy === "last") {
        return _lastMaxTokens(messages, {
            maxTokens,
            tokenCounter: listTokenCounter,
            textSplitter: textSplitterFunc,
            allowPartial,
            includeSystem,
            startOn,
            endOn,
        });
    }
    else {
        throw new Error(`Unrecognized strategy: '${strategy}'. Must be one of 'first' or 'last'.`);
    }
}
async function _firstMaxTokens(messages, options) {
    const { maxTokens, tokenCounter, textSplitter, partialStrategy, endOn } = options;
    let messagesCopy = [...messages];
    let idx = 0;
    for (let i = 0; i < messagesCopy.length; i += 1) {
        const remainingMessages = i > 0 ? messagesCopy.slice(0, -i) : messagesCopy;
        if ((await tokenCounter(remainingMessages)) <= maxTokens) {
            idx = messagesCopy.length - i;
            break;
        }
    }
    if (idx < messagesCopy.length - 1 && partialStrategy) {
        let includedPartial = false;
        if (Array.isArray(messagesCopy[idx].content)) {
            const excluded = messagesCopy[idx];
            if (typeof excluded.content === "string") {
                throw new Error("Expected content to be an array.");
            }
            const numBlock = excluded.content.length;
            const reversedContent = partialStrategy === "last"
                ? [...excluded.content].reverse()
                : excluded.content;
            for (let i = 1; i <= numBlock; i += 1) {
                const partialContent = partialStrategy === "first"
                    ? reversedContent.slice(0, i)
                    : reversedContent.slice(-i);
                const fields = Object.fromEntries(Object.entries(excluded).filter(([k]) => k !== "type" && !k.startsWith("lc_")));
                const updatedMessage = _switchTypeToMessage(excluded.getType(), {
                    ...fields,
                    content: partialContent,
                });
                const slicedMessages = [...messagesCopy.slice(0, idx), updatedMessage];
                if ((await tokenCounter(slicedMessages)) <= maxTokens) {
                    messagesCopy = slicedMessages;
                    idx += 1;
                    includedPartial = true;
                }
                else {
                    break;
                }
            }
            if (includedPartial && partialStrategy === "last") {
                excluded.content = [...reversedContent].reverse();
            }
        }
        if (!includedPartial) {
            const excluded = messagesCopy[idx];
            let text;
            if (Array.isArray(excluded.content) &&
                excluded.content.some((block) => typeof block === "string" || block.type === "text")) {
                const textBlock = excluded.content.find((block) => block.type === "text" && block.text);
                text = textBlock?.text;
            }
            else if (typeof excluded.content === "string") {
                text = excluded.content;
            }
            if (text) {
                const splitTexts = await textSplitter(text);
                const numSplits = splitTexts.length;
                if (partialStrategy === "last") {
                    splitTexts.reverse();
                }
                for (let _ = 0; _ < numSplits - 1; _ += 1) {
                    splitTexts.pop();
                    excluded.content = splitTexts.join("");
                    if ((await tokenCounter([...messagesCopy.slice(0, idx), excluded])) <=
                        maxTokens) {
                        if (partialStrategy === "last") {
                            excluded.content = [...splitTexts].reverse().join("");
                        }
                        messagesCopy = [...messagesCopy.slice(0, idx), excluded];
                        idx += 1;
                        break;
                    }
                }
            }
        }
    }
    if (endOn) {
        const endOnArr = Array.isArray(endOn) ? endOn : [endOn];
        while (idx > 0 && !_isMessageType(messagesCopy[idx - 1], endOnArr)) {
            idx -= 1;
        }
    }
    return messagesCopy.slice(0, idx);
}
async function _lastMaxTokens(messages, options) {
    const { allowPartial = false, includeSystem = false, endOn, startOn, ...rest } = options;
    // Create a copy of messages to avoid mutation
    let messagesCopy = messages.map((message) => {
        const fields = Object.fromEntries(Object.entries(message).filter(([k]) => k !== "type" && !k.startsWith("lc_")));
        return _switchTypeToMessage(message.getType(), fields, isBaseMessageChunk(message));
    });
    if (endOn) {
        const endOnArr = Array.isArray(endOn) ? endOn : [endOn];
        while (messagesCopy.length > 0 &&
            !_isMessageType(messagesCopy[messagesCopy.length - 1], endOnArr)) {
            messagesCopy = messagesCopy.slice(0, -1);
        }
    }
    const swappedSystem = includeSystem && messagesCopy[0]?.getType() === "system";
    let reversed_ = swappedSystem
        ? messagesCopy.slice(0, 1).concat(messagesCopy.slice(1).reverse())
        : messagesCopy.reverse();
    reversed_ = await _firstMaxTokens(reversed_, {
        ...rest,
        partialStrategy: allowPartial ? "last" : undefined,
        endOn: startOn,
    });
    if (swappedSystem) {
        return [reversed_[0], ...reversed_.slice(1).reverse()];
    }
    else {
        return reversed_.reverse();
    }
}
const _MSG_CHUNK_MAP = {
    human: {
        message: human/* HumanMessage */.xc,
        messageChunk: human/* HumanMessageChunk */.a7,
    },
    ai: {
        message: ai/* AIMessage */.Od,
        messageChunk: ai/* AIMessageChunk */.H,
    },
    system: {
        message: system/* SystemMessage */.tn,
        messageChunk: system/* SystemMessageChunk */.uU,
    },
    developer: {
        message: system/* SystemMessage */.tn,
        messageChunk: system/* SystemMessageChunk */.uU,
    },
    tool: {
        message: tool/* ToolMessage */.uf,
        messageChunk: tool/* ToolMessageChunk */.dr,
    },
    function: {
        message: messages_function/* FunctionMessage */.mg,
        messageChunk: messages_function/* FunctionMessageChunk */.FK,
    },
    generic: {
        message: chat/* ChatMessage */.cM,
        messageChunk: chat/* ChatMessageChunk */.XU,
    },
    remove: {
        message: RemoveMessage,
        messageChunk: RemoveMessage, // RemoveMessage does not have a chunk class.
    },
};
function _switchTypeToMessage(messageType, fields, returnChunk) {
    let chunk;
    let msg;
    switch (messageType) {
        case "human":
            if (returnChunk) {
                chunk = new HumanMessageChunk(fields);
            }
            else {
                msg = new HumanMessage(fields);
            }
            break;
        case "ai":
            if (returnChunk) {
                let aiChunkFields = {
                    ...fields,
                };
                if ("tool_calls" in aiChunkFields) {
                    aiChunkFields = {
                        ...aiChunkFields,
                        tool_call_chunks: aiChunkFields.tool_calls?.map((tc) => ({
                            ...tc,
                            type: "tool_call_chunk",
                            index: undefined,
                            args: JSON.stringify(tc.args),
                        })),
                    };
                }
                chunk = new AIMessageChunk(aiChunkFields);
            }
            else {
                msg = new AIMessage(fields);
            }
            break;
        case "system":
            if (returnChunk) {
                chunk = new SystemMessageChunk(fields);
            }
            else {
                msg = new SystemMessage(fields);
            }
            break;
        case "developer":
            if (returnChunk) {
                chunk = new SystemMessageChunk({
                    ...fields,
                    additional_kwargs: {
                        ...fields.additional_kwargs,
                        __openai_role__: "developer",
                    },
                });
            }
            else {
                msg = new SystemMessage({
                    ...fields,
                    additional_kwargs: {
                        ...fields.additional_kwargs,
                        __openai_role__: "developer",
                    },
                });
            }
            break;
        case "tool":
            if ("tool_call_id" in fields) {
                if (returnChunk) {
                    chunk = new ToolMessageChunk(fields);
                }
                else {
                    msg = new ToolMessage(fields);
                }
            }
            else {
                throw new Error("Can not convert ToolMessage to ToolMessageChunk if 'tool_call_id' field is not defined.");
            }
            break;
        case "function":
            if (returnChunk) {
                chunk = new FunctionMessageChunk(fields);
            }
            else {
                if (!fields.name) {
                    throw new Error("FunctionMessage must have a 'name' field");
                }
                msg = new FunctionMessage(fields);
            }
            break;
        case "generic":
            if ("role" in fields) {
                if (returnChunk) {
                    chunk = new ChatMessageChunk(fields);
                }
                else {
                    msg = new ChatMessage(fields);
                }
            }
            else {
                throw new Error("Can not convert ChatMessage to ChatMessageChunk if 'role' field is not defined.");
            }
            break;
        default:
            throw new Error(`Unrecognized message type ${messageType}`);
    }
    if (returnChunk && chunk) {
        return chunk;
    }
    if (msg) {
        return msg;
    }
    throw new Error(`Unrecognized message type ${messageType}`);
}
function _chunkToMsg(chunk) {
    const chunkType = chunk.getType();
    let msg;
    const fields = Object.fromEntries(Object.entries(chunk).filter(([k]) => !["type", "tool_call_chunks"].includes(k) && !k.startsWith("lc_")));
    if (chunkType in _MSG_CHUNK_MAP) {
        msg = _switchTypeToMessage(chunkType, fields);
    }
    if (!msg) {
        throw new Error(`Unrecognized message chunk class ${chunkType}. Supported classes are ${Object.keys(_MSG_CHUNK_MAP)}`);
    }
    return msg;
}
/**
 * The default text splitter function that splits text by newlines.
 *
 * @param {string} text
 * @returns A promise that resolves to an array of strings split by newlines.
 */
function defaultTextSplitter(text) {
    const splits = text.split("\n");
    return Promise.resolve([
        ...splits.slice(0, -1).map((s) => `${s}\n`),
        splits[splits.length - 1],
    ]);
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/messages/index.js









// TODO: Use a star export when we deprecate the
// existing "ToolCall" type in "base.js".



/***/ }),

/***/ 93954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  YN: () => (/* reexport */ base/* Runnable */.YN),
  zZ: () => (/* reexport */ base/* RunnableSequence */.zZ),
  ZI: () => (/* reexport */ runnables_config/* ensureConfig */.ZI),
  tn: () => (/* reexport */ runnables_config/* patchConfig */.tn)
});

// UNUSED EXPORTS: RouterRunnable, RunnableAssign, RunnableBinding, RunnableBranch, RunnableEach, RunnableLambda, RunnableMap, RunnableParallel, RunnablePassthrough, RunnablePick, RunnableRetry, RunnableToolLike, RunnableWithFallbacks, RunnableWithMessageHistory, _coerceToRunnable, getCallbackManagerForConfig, mergeConfigs, pickRunnableConfigKeys

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/runnables/base.js + 8 modules
var base = __webpack_require__(29248);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/runnables/config.js
var runnables_config = __webpack_require__(6464);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/utils/stream.js
var utils_stream = __webpack_require__(27827);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/runnables/passthrough.js



/**
 * A runnable to passthrough inputs unchanged or with additional keys.
 *
 * This runnable behaves almost like the identity function, except that it
 * can be configured to add additional keys to the output, if the input is
 * an object.
 *
 * The example below demonstrates how to use `RunnablePassthrough to
 * passthrough the input from the `.invoke()`
 *
 * @example
 * ```typescript
 * const chain = RunnableSequence.from([
 *   {
 *     question: new RunnablePassthrough(),
 *     context: async () => loadContextFromStore(),
 *   },
 *   prompt,
 *   llm,
 *   outputParser,
 * ]);
 * const response = await chain.invoke(
 *   "I can pass a single string instead of an object since I'm using `RunnablePassthrough`."
 * );
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class RunnablePassthrough extends base/* Runnable */.YN {
    static lc_name() {
        return "RunnablePassthrough";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "func", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (fields) {
            this.func = fields.func;
        }
    }
    async invoke(input, options) {
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        if (this.func) {
            await this.func(input, config);
        }
        return this._callWithConfig((input) => Promise.resolve(input), input, config);
    }
    async *transform(generator, options) {
        const config = (0,runnables_config/* ensureConfig */.ZI)(options);
        let finalOutput;
        let finalOutputSupported = true;
        for await (const chunk of this._transformStreamWithConfig(generator, (input) => input, config)) {
            yield chunk;
            if (finalOutputSupported) {
                if (finalOutput === undefined) {
                    finalOutput = chunk;
                }
                else {
                    try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        finalOutput = (0,utils_stream/* concat */.xW)(finalOutput, chunk);
                    }
                    catch {
                        finalOutput = undefined;
                        finalOutputSupported = false;
                    }
                }
            }
        }
        if (this.func && finalOutput !== undefined) {
            await this.func(finalOutput, config);
        }
    }
    /**
     * A runnable that assigns key-value pairs to the input.
     *
     * The example below shows how you could use it with an inline function.
     *
     * @example
     * ```typescript
     * const prompt =
     *   PromptTemplate.fromTemplate(`Write a SQL query to answer the question using the following schema: {schema}
     * Question: {question}
     * SQL Query:`);
     *
     * // The `RunnablePassthrough.assign()` is used here to passthrough the input from the `.invoke()`
     * // call (in this example it's the question), along with any inputs passed to the `.assign()` method.
     * // In this case, we're passing the schema.
     * const sqlQueryGeneratorChain = RunnableSequence.from([
     *   RunnablePassthrough.assign({
     *     schema: async () => db.getTableInfo(),
     *   }),
     *   prompt,
     *   new ChatOpenAI({}).bind({ stop: ["\nSQLResult:"] }),
     *   new StringOutputParser(),
     * ]);
     * const result = await sqlQueryGeneratorChain.invoke({
     *   question: "How many employees are there?",
     * });
     * ```
     */
    static assign(mapping) {
        return new base/* RunnableAssign */.B2(new base/* RunnableMap */.ck({ steps: mapping }));
    }
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/runnables/router.js


/**
 * A runnable that routes to a set of runnables based on Input['key'].
 * Returns the output of the selected runnable.
 * @example
 * ```typescript
 * import { RouterRunnable, RunnableLambda } from "@langchain/core/runnables";
 *
 * const router = new RouterRunnable({
 *   runnables: {
 *     toUpperCase: RunnableLambda.from((text: string) => text.toUpperCase()),
 *     reverseText: RunnableLambda.from((text: string) =>
 *       text.split("").reverse().join("")
 *     ),
 *   },
 * });
 *
 * // Invoke the 'reverseText' runnable
 * const result1 = router.invoke({ key: "reverseText", input: "Hello World" });
 *
 * // "dlroW olleH"
 *
 * // Invoke the 'toUpperCase' runnable
 * const result2 = router.invoke({ key: "toUpperCase", input: "Hello World" });
 *
 * // "HELLO WORLD"
 * ```
 */
class RouterRunnable extends base/* Runnable */.YN {
    static lc_name() {
        return "RouterRunnable";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "runnables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runnables = fields.runnables;
    }
    async invoke(input, options) {
        const { key, input: actualInput } = input;
        const runnable = this.runnables[key];
        if (runnable === undefined) {
            throw new Error(`No runnable associated with key "${key}".`);
        }
        return runnable.invoke(actualInput, (0,runnables_config/* ensureConfig */.ZI)(options));
    }
    async batch(inputs, options, batchOptions) {
        const keys = inputs.map((input) => input.key);
        const actualInputs = inputs.map((input) => input.input);
        const missingKey = keys.find((key) => this.runnables[key] === undefined);
        if (missingKey !== undefined) {
            throw new Error(`One or more keys do not have a corresponding runnable.`);
        }
        const runnables = keys.map((key) => this.runnables[key]);
        const optionsList = this._getOptionsList(options ?? {}, inputs.length);
        const maxConcurrency = optionsList[0]?.maxConcurrency ?? batchOptions?.maxConcurrency;
        const batchSize = maxConcurrency && maxConcurrency > 0 ? maxConcurrency : inputs.length;
        const batchResults = [];
        for (let i = 0; i < actualInputs.length; i += batchSize) {
            const batchPromises = actualInputs
                .slice(i, i + batchSize)
                .map((actualInput, i) => runnables[i].invoke(actualInput, optionsList[i]));
            const batchResult = await Promise.all(batchPromises);
            batchResults.push(batchResult);
        }
        return batchResults.flat();
    }
    async stream(input, options) {
        const { key, input: actualInput } = input;
        const runnable = this.runnables[key];
        if (runnable === undefined) {
            throw new Error(`No runnable associated with key "${key}".`);
        }
        return runnable.stream(actualInput, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/runnables/branch.js



/**
 * Class that represents a runnable branch. The RunnableBranch is
 * initialized with an array of branches and a default branch. When invoked,
 * it evaluates the condition of each branch in order and executes the
 * corresponding branch if the condition is true. If none of the conditions
 * are true, it executes the default branch.
 * @example
 * ```typescript
 * const branch = RunnableBranch.from([
 *   [
 *     (x: { topic: string; question: string }) =>
 *       x.topic.toLowerCase().includes("anthropic"),
 *     anthropicChain,
 *   ],
 *   [
 *     (x: { topic: string; question: string }) =>
 *       x.topic.toLowerCase().includes("langchain"),
 *     langChainChain,
 *   ],
 *   generalChain,
 * ]);
 *
 * const fullChain = RunnableSequence.from([
 *   {
 *     topic: classificationChain,
 *     question: (input: { question: string }) => input.question,
 *   },
 *   branch,
 * ]);
 *
 * const result = await fullChain.invoke({
 *   question: "how do I use LangChain?",
 * });
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class RunnableBranch extends base/* Runnable */.YN {
    static lc_name() {
        return "RunnableBranch";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "runnables"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "default", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "branches", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.branches = fields.branches;
        this.default = fields.default;
    }
    /**
     * Convenience method for instantiating a RunnableBranch from
     * RunnableLikes (objects, functions, or Runnables).
     *
     * Each item in the input except for the last one should be a
     * tuple with two items. The first is a "condition" RunnableLike that
     * returns "true" if the second RunnableLike in the tuple should run.
     *
     * The final item in the input should be a RunnableLike that acts as a
     * default branch if no other branches match.
     *
     * @example
     * ```ts
     * import { RunnableBranch } from "@langchain/core/runnables";
     *
     * const branch = RunnableBranch.from([
     *   [(x: number) => x > 0, (x: number) => x + 1],
     *   [(x: number) => x < 0, (x: number) => x - 1],
     *   (x: number) => x
     * ]);
     * ```
     * @param branches An array where the every item except the last is a tuple of [condition, runnable]
     *   pairs. The last item is a default runnable which is invoked if no other condition matches.
     * @returns A new RunnableBranch.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static from(branches) {
        if (branches.length < 1) {
            throw new Error("RunnableBranch requires at least one branch");
        }
        const branchLikes = branches.slice(0, -1);
        const coercedBranches = branchLikes.map(([condition, runnable]) => [
            (0,base/* _coerceToRunnable */.Bp)(condition),
            (0,base/* _coerceToRunnable */.Bp)(runnable),
        ]);
        const defaultBranch = (0,base/* _coerceToRunnable */.Bp)(branches[branches.length - 1]);
        return new this({
            branches: coercedBranches,
            default: defaultBranch,
        });
    }
    async _invoke(input, config, runManager) {
        let result;
        for (let i = 0; i < this.branches.length; i += 1) {
            const [condition, branchRunnable] = this.branches[i];
            const conditionValue = await condition.invoke(input, (0,runnables_config/* patchConfig */.tn)(config, {
                callbacks: runManager?.getChild(`condition:${i + 1}`),
            }));
            if (conditionValue) {
                result = await branchRunnable.invoke(input, (0,runnables_config/* patchConfig */.tn)(config, {
                    callbacks: runManager?.getChild(`branch:${i + 1}`),
                }));
                break;
            }
        }
        if (!result) {
            result = await this.default.invoke(input, (0,runnables_config/* patchConfig */.tn)(config, {
                callbacks: runManager?.getChild("branch:default"),
            }));
        }
        return result;
    }
    async invoke(input, config = {}) {
        return this._callWithConfig(this._invoke, input, config);
    }
    async *_streamIterator(input, config) {
        const callbackManager_ = await (0,runnables_config/* getCallbackManagerForConfig */.kJ)(config);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), (0,base/* _coerceToDict */.GH)(input, "input"), config?.runId, undefined, undefined, undefined, config?.runName);
        let finalOutput;
        let finalOutputSupported = true;
        let stream;
        try {
            for (let i = 0; i < this.branches.length; i += 1) {
                const [condition, branchRunnable] = this.branches[i];
                const conditionValue = await condition.invoke(input, (0,runnables_config/* patchConfig */.tn)(config, {
                    callbacks: runManager?.getChild(`condition:${i + 1}`),
                }));
                if (conditionValue) {
                    stream = await branchRunnable.stream(input, (0,runnables_config/* patchConfig */.tn)(config, {
                        callbacks: runManager?.getChild(`branch:${i + 1}`),
                    }));
                    for await (const chunk of stream) {
                        yield chunk;
                        if (finalOutputSupported) {
                            if (finalOutput === undefined) {
                                finalOutput = chunk;
                            }
                            else {
                                try {
                                    finalOutput = (0,utils_stream/* concat */.xW)(finalOutput, chunk);
                                }
                                catch (e) {
                                    finalOutput = undefined;
                                    finalOutputSupported = false;
                                }
                            }
                        }
                    }
                    break;
                }
            }
            if (stream === undefined) {
                stream = await this.default.stream(input, (0,runnables_config/* patchConfig */.tn)(config, {
                    callbacks: runManager?.getChild("branch:default"),
                }));
                for await (const chunk of stream) {
                    yield chunk;
                    if (finalOutputSupported) {
                        if (finalOutput === undefined) {
                            finalOutput = chunk;
                        }
                        else {
                            try {
                                finalOutput = (0,utils_stream/* concat */.xW)(finalOutput, chunk);
                            }
                            catch (e) {
                                finalOutput = undefined;
                                finalOutputSupported = false;
                            }
                        }
                    }
                }
            }
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(finalOutput ?? {});
    }
}

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/index.js + 2 modules
var messages = __webpack_require__(91574);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/runnables/history.js



/**
 * Wraps a LCEL chain and manages history. It appends input messages
 * and chain outputs as history, and adds the current history messages to
 * the chain input.
 * @example
 * ```typescript
 * // yarn add @langchain/anthropic @langchain/community @upstash/redis
 *
 * import {
 *   ChatPromptTemplate,
 *   MessagesPlaceholder,
 * } from "@langchain/core/prompts";
 * import { ChatAnthropic } from "@langchain/anthropic";
 * import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
 * // For demos, you can also use an in-memory store:
 * // import { ChatMessageHistory } from "langchain/stores/message/in_memory";
 *
 * const prompt = ChatPromptTemplate.fromMessages([
 *   ["system", "You're an assistant who's good at {ability}"],
 *   new MessagesPlaceholder("history"),
 *   ["human", "{question}"],
 * ]);
 *
 * const chain = prompt.pipe(new ChatAnthropic({}));
 *
 * const chainWithHistory = new RunnableWithMessageHistory({
 *   runnable: chain,
 *   getMessageHistory: (sessionId) =>
 *     new UpstashRedisChatMessageHistory({
 *       sessionId,
 *       config: {
 *         url: process.env.UPSTASH_REDIS_REST_URL!,
 *         token: process.env.UPSTASH_REDIS_REST_TOKEN!,
 *       },
 *     }),
 *   inputMessagesKey: "question",
 *   historyMessagesKey: "history",
 * });
 *
 * const result = await chainWithHistory.invoke(
 *   {
 *     ability: "math",
 *     question: "What does cosine mean?",
 *   },
 *   {
 *     configurable: {
 *       sessionId: "some_string_identifying_a_user",
 *     },
 *   }
 * );
 *
 * const result2 = await chainWithHistory.invoke(
 *   {
 *     ability: "math",
 *     question: "What's its inverse?",
 *   },
 *   {
 *     configurable: {
 *       sessionId: "some_string_identifying_a_user",
 *     },
 *   }
 * );
 * ```
 */
class RunnableWithMessageHistory extends base/* RunnableBinding */.fJ {
    constructor(fields) {
        let historyChain = base/* RunnableLambda */.jY.from((input, options) => this._enterHistory(input, options ?? {})).withConfig({ runName: "loadHistory" });
        const messagesKey = fields.historyMessagesKey ?? fields.inputMessagesKey;
        if (messagesKey) {
            historyChain = RunnablePassthrough.assign({
                [messagesKey]: historyChain,
            }).withConfig({ runName: "insertHistory" });
        }
        const bound = historyChain
            .pipe(fields.runnable.withListeners({
            onEnd: (run, config) => this._exitHistory(run, config ?? {}),
        }))
            .withConfig({ runName: "RunnableWithMessageHistory" });
        const config = fields.config ?? {};
        super({
            ...fields,
            config,
            bound,
        });
        Object.defineProperty(this, "runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputMessagesKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputMessagesKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "historyMessagesKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getMessageHistory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runnable = fields.runnable;
        this.getMessageHistory = fields.getMessageHistory;
        this.inputMessagesKey = fields.inputMessagesKey;
        this.outputMessagesKey = fields.outputMessagesKey;
        this.historyMessagesKey = fields.historyMessagesKey;
    }
    _getInputMessages(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inputValue) {
        let parsedInputValue;
        if (typeof inputValue === "object" &&
            !Array.isArray(inputValue) &&
            !(0,messages/* isBaseMessage */.ny)(inputValue)) {
            let key;
            if (this.inputMessagesKey) {
                key = this.inputMessagesKey;
            }
            else if (Object.keys(inputValue).length === 1) {
                key = Object.keys(inputValue)[0];
            }
            else {
                key = "input";
            }
            if (Array.isArray(inputValue[key]) && Array.isArray(inputValue[key][0])) {
                parsedInputValue = inputValue[key][0];
            }
            else {
                parsedInputValue = inputValue[key];
            }
        }
        else {
            parsedInputValue = inputValue;
        }
        if (typeof parsedInputValue === "string") {
            return [new messages/* HumanMessage */.xc(parsedInputValue)];
        }
        else if (Array.isArray(parsedInputValue)) {
            return parsedInputValue;
        }
        else if ((0,messages/* isBaseMessage */.ny)(parsedInputValue)) {
            return [parsedInputValue];
        }
        else {
            throw new Error(`Expected a string, BaseMessage, or array of BaseMessages.\nGot ${JSON.stringify(parsedInputValue, null, 2)}`);
        }
    }
    _getOutputMessages(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    outputValue) {
        let parsedOutputValue;
        if (!Array.isArray(outputValue) &&
            !(0,messages/* isBaseMessage */.ny)(outputValue) &&
            typeof outputValue !== "string") {
            let key;
            if (this.outputMessagesKey !== undefined) {
                key = this.outputMessagesKey;
            }
            else if (Object.keys(outputValue).length === 1) {
                key = Object.keys(outputValue)[0];
            }
            else {
                key = "output";
            }
            // If you are wrapping a chat model directly
            // The output is actually this weird generations object
            if (outputValue.generations !== undefined) {
                parsedOutputValue = outputValue.generations[0][0].message;
            }
            else {
                parsedOutputValue = outputValue[key];
            }
        }
        else {
            parsedOutputValue = outputValue;
        }
        if (typeof parsedOutputValue === "string") {
            return [new messages/* AIMessage */.Od(parsedOutputValue)];
        }
        else if (Array.isArray(parsedOutputValue)) {
            return parsedOutputValue;
        }
        else if ((0,messages/* isBaseMessage */.ny)(parsedOutputValue)) {
            return [parsedOutputValue];
        }
        else {
            throw new Error(`Expected a string, BaseMessage, or array of BaseMessages. Received: ${JSON.stringify(parsedOutputValue, null, 2)}`);
        }
    }
    async _enterHistory(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input, kwargs) {
        const history = kwargs?.configurable?.messageHistory;
        const messages = await history.getMessages();
        if (this.historyMessagesKey === undefined) {
            return messages.concat(this._getInputMessages(input));
        }
        return messages;
    }
    async _exitHistory(run, config) {
        const history = config.configurable?.messageHistory;
        // Get input messages
        let inputs;
        // Chat model inputs are nested arrays
        if (Array.isArray(run.inputs) && Array.isArray(run.inputs[0])) {
            inputs = run.inputs[0];
        }
        else {
            inputs = run.inputs;
        }
        let inputMessages = this._getInputMessages(inputs);
        // If historic messages were prepended to the input messages, remove them to
        // avoid adding duplicate messages to history.
        if (this.historyMessagesKey === undefined) {
            const existingMessages = await history.getMessages();
            inputMessages = inputMessages.slice(existingMessages.length);
        }
        // Get output messages
        const outputValue = run.outputs;
        if (!outputValue) {
            throw new Error(`Output values from 'Run' undefined. Run: ${JSON.stringify(run, null, 2)}`);
        }
        const outputMessages = this._getOutputMessages(outputValue);
        await history.addMessages([...inputMessages, ...outputMessages]);
    }
    async _mergeConfig(...configs) {
        const config = await super._mergeConfig(...configs);
        // Extract sessionId
        if (!config.configurable || !config.configurable.sessionId) {
            const exampleInput = {
                [this.inputMessagesKey ?? "input"]: "foo",
            };
            const exampleConfig = { configurable: { sessionId: "123" } };
            throw new Error(`sessionId is required. Pass it in as part of the config argument to .invoke() or .stream()\n` +
                `eg. chain.invoke(${JSON.stringify(exampleInput)}, ${JSON.stringify(exampleConfig)})`);
        }
        // attach messageHistory
        const { sessionId } = config.configurable;
        config.configurable.messageHistory = await this.getMessageHistory(sessionId);
        return config;
    }
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/runnables/index.js








/***/ }),

/***/ 6571:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ZE: () => (/* reexport */ BaseLangChain),
  j_: () => (/* reexport */ BaseLanguageModel)
});

// UNUSED EXPORTS: calculateMaxTokens, getEmbeddingContextSize, getModelContextSize, getModelNameForTiktoken, isOpenAITool

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/utils/js-sha1/hash.js
// @ts-nocheck
// Inlined to deal with portability issues with importing crypto module
/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */

var root = typeof window === "object" ? window : {};
var HEX_CHARS = "0123456789abcdef".split("");
var EXTRA = [-2147483648, 8388608, 32768, 128];
var SHIFT = [24, 16, 8, 0];
var OUTPUT_TYPES = (/* unused pure expression or super */ null && (["hex", "array", "digest", "arrayBuffer"]));
var blocks = [];
function Sha1(sharedMemory) {
    if (sharedMemory) {
        blocks[0] =
            blocks[16] =
                blocks[1] =
                    blocks[2] =
                        blocks[3] =
                            blocks[4] =
                                blocks[5] =
                                    blocks[6] =
                                        blocks[7] =
                                            blocks[8] =
                                                blocks[9] =
                                                    blocks[10] =
                                                        blocks[11] =
                                                            blocks[12] =
                                                                blocks[13] =
                                                                    blocks[14] =
                                                                        blocks[15] =
                                                                            0;
        this.blocks = blocks;
    }
    else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    this.h0 = 0x67452301;
    this.h1 = 0xefcdab89;
    this.h2 = 0x98badcfe;
    this.h3 = 0x10325476;
    this.h4 = 0xc3d2e1f0;
    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
}
Sha1.prototype.update = function (message) {
    if (this.finalized) {
        return;
    }
    var notString = typeof message !== "string";
    if (notString && message.constructor === root.ArrayBuffer) {
        message = new Uint8Array(message);
    }
    var code, index = 0, i, length = message.length || 0, blocks = this.blocks;
    while (index < length) {
        if (this.hashed) {
            this.hashed = false;
            blocks[0] = this.block;
            blocks[16] =
                blocks[1] =
                    blocks[2] =
                        blocks[3] =
                            blocks[4] =
                                blocks[5] =
                                    blocks[6] =
                                        blocks[7] =
                                            blocks[8] =
                                                blocks[9] =
                                                    blocks[10] =
                                                        blocks[11] =
                                                            blocks[12] =
                                                                blocks[13] =
                                                                    blocks[14] =
                                                                        blocks[15] =
                                                                            0;
        }
        if (notString) {
            for (i = this.start; index < length && i < 64; ++index) {
                blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
            }
        }
        else {
            for (i = this.start; index < length && i < 64; ++index) {
                code = message.charCodeAt(index);
                if (code < 0x80) {
                    blocks[i >> 2] |= code << SHIFT[i++ & 3];
                }
                else if (code < 0x800) {
                    blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                }
                else if (code < 0xd800 || code >= 0xe000) {
                    blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                }
                else {
                    code =
                        0x10000 +
                            (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
                    blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                }
            }
        }
        this.lastByteIndex = i;
        this.bytes += i - this.start;
        if (i >= 64) {
            this.block = blocks[16];
            this.start = i - 64;
            this.hash();
            this.hashed = true;
        }
        else {
            this.start = i;
        }
    }
    if (this.bytes > 4294967295) {
        this.hBytes += (this.bytes / 4294967296) << 0;
        this.bytes = this.bytes % 4294967296;
    }
    return this;
};
Sha1.prototype.finalize = function () {
    if (this.finalized) {
        return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[16] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[16];
    if (i >= 56) {
        if (!this.hashed) {
            this.hash();
        }
        blocks[0] = this.block;
        blocks[16] =
            blocks[1] =
                blocks[2] =
                    blocks[3] =
                        blocks[4] =
                            blocks[5] =
                                blocks[6] =
                                    blocks[7] =
                                        blocks[8] =
                                            blocks[9] =
                                                blocks[10] =
                                                    blocks[11] =
                                                        blocks[12] =
                                                            blocks[13] =
                                                                blocks[14] =
                                                                    blocks[15] =
                                                                        0;
    }
    blocks[14] = (this.hBytes << 3) | (this.bytes >>> 29);
    blocks[15] = this.bytes << 3;
    this.hash();
};
Sha1.prototype.hash = function () {
    var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
    var f, j, t, blocks = this.blocks;
    for (j = 16; j < 80; ++j) {
        t = blocks[j - 3] ^ blocks[j - 8] ^ blocks[j - 14] ^ blocks[j - 16];
        blocks[j] = (t << 1) | (t >>> 31);
    }
    for (j = 0; j < 20; j += 5) {
        f = (b & c) | (~b & d);
        t = (a << 5) | (a >>> 27);
        e = (t + f + e + 1518500249 + blocks[j]) << 0;
        b = (b << 30) | (b >>> 2);
        f = (a & b) | (~a & c);
        t = (e << 5) | (e >>> 27);
        d = (t + f + d + 1518500249 + blocks[j + 1]) << 0;
        a = (a << 30) | (a >>> 2);
        f = (e & a) | (~e & b);
        t = (d << 5) | (d >>> 27);
        c = (t + f + c + 1518500249 + blocks[j + 2]) << 0;
        e = (e << 30) | (e >>> 2);
        f = (d & e) | (~d & a);
        t = (c << 5) | (c >>> 27);
        b = (t + f + b + 1518500249 + blocks[j + 3]) << 0;
        d = (d << 30) | (d >>> 2);
        f = (c & d) | (~c & e);
        t = (b << 5) | (b >>> 27);
        a = (t + f + a + 1518500249 + blocks[j + 4]) << 0;
        c = (c << 30) | (c >>> 2);
    }
    for (; j < 40; j += 5) {
        f = b ^ c ^ d;
        t = (a << 5) | (a >>> 27);
        e = (t + f + e + 1859775393 + blocks[j]) << 0;
        b = (b << 30) | (b >>> 2);
        f = a ^ b ^ c;
        t = (e << 5) | (e >>> 27);
        d = (t + f + d + 1859775393 + blocks[j + 1]) << 0;
        a = (a << 30) | (a >>> 2);
        f = e ^ a ^ b;
        t = (d << 5) | (d >>> 27);
        c = (t + f + c + 1859775393 + blocks[j + 2]) << 0;
        e = (e << 30) | (e >>> 2);
        f = d ^ e ^ a;
        t = (c << 5) | (c >>> 27);
        b = (t + f + b + 1859775393 + blocks[j + 3]) << 0;
        d = (d << 30) | (d >>> 2);
        f = c ^ d ^ e;
        t = (b << 5) | (b >>> 27);
        a = (t + f + a + 1859775393 + blocks[j + 4]) << 0;
        c = (c << 30) | (c >>> 2);
    }
    for (; j < 60; j += 5) {
        f = (b & c) | (b & d) | (c & d);
        t = (a << 5) | (a >>> 27);
        e = (t + f + e - 1894007588 + blocks[j]) << 0;
        b = (b << 30) | (b >>> 2);
        f = (a & b) | (a & c) | (b & c);
        t = (e << 5) | (e >>> 27);
        d = (t + f + d - 1894007588 + blocks[j + 1]) << 0;
        a = (a << 30) | (a >>> 2);
        f = (e & a) | (e & b) | (a & b);
        t = (d << 5) | (d >>> 27);
        c = (t + f + c - 1894007588 + blocks[j + 2]) << 0;
        e = (e << 30) | (e >>> 2);
        f = (d & e) | (d & a) | (e & a);
        t = (c << 5) | (c >>> 27);
        b = (t + f + b - 1894007588 + blocks[j + 3]) << 0;
        d = (d << 30) | (d >>> 2);
        f = (c & d) | (c & e) | (d & e);
        t = (b << 5) | (b >>> 27);
        a = (t + f + a - 1894007588 + blocks[j + 4]) << 0;
        c = (c << 30) | (c >>> 2);
    }
    for (; j < 80; j += 5) {
        f = b ^ c ^ d;
        t = (a << 5) | (a >>> 27);
        e = (t + f + e - 899497514 + blocks[j]) << 0;
        b = (b << 30) | (b >>> 2);
        f = a ^ b ^ c;
        t = (e << 5) | (e >>> 27);
        d = (t + f + d - 899497514 + blocks[j + 1]) << 0;
        a = (a << 30) | (a >>> 2);
        f = e ^ a ^ b;
        t = (d << 5) | (d >>> 27);
        c = (t + f + c - 899497514 + blocks[j + 2]) << 0;
        e = (e << 30) | (e >>> 2);
        f = d ^ e ^ a;
        t = (c << 5) | (c >>> 27);
        b = (t + f + b - 899497514 + blocks[j + 3]) << 0;
        d = (d << 30) | (d >>> 2);
        f = c ^ d ^ e;
        t = (b << 5) | (b >>> 27);
        a = (t + f + a - 899497514 + blocks[j + 4]) << 0;
        c = (c << 30) | (c >>> 2);
    }
    this.h0 = (this.h0 + a) << 0;
    this.h1 = (this.h1 + b) << 0;
    this.h2 = (this.h2 + c) << 0;
    this.h3 = (this.h3 + d) << 0;
    this.h4 = (this.h4 + e) << 0;
};
Sha1.prototype.hex = function () {
    this.finalize();
    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
    return (HEX_CHARS[(h0 >> 28) & 0x0f] +
        HEX_CHARS[(h0 >> 24) & 0x0f] +
        HEX_CHARS[(h0 >> 20) & 0x0f] +
        HEX_CHARS[(h0 >> 16) & 0x0f] +
        HEX_CHARS[(h0 >> 12) & 0x0f] +
        HEX_CHARS[(h0 >> 8) & 0x0f] +
        HEX_CHARS[(h0 >> 4) & 0x0f] +
        HEX_CHARS[h0 & 0x0f] +
        HEX_CHARS[(h1 >> 28) & 0x0f] +
        HEX_CHARS[(h1 >> 24) & 0x0f] +
        HEX_CHARS[(h1 >> 20) & 0x0f] +
        HEX_CHARS[(h1 >> 16) & 0x0f] +
        HEX_CHARS[(h1 >> 12) & 0x0f] +
        HEX_CHARS[(h1 >> 8) & 0x0f] +
        HEX_CHARS[(h1 >> 4) & 0x0f] +
        HEX_CHARS[h1 & 0x0f] +
        HEX_CHARS[(h2 >> 28) & 0x0f] +
        HEX_CHARS[(h2 >> 24) & 0x0f] +
        HEX_CHARS[(h2 >> 20) & 0x0f] +
        HEX_CHARS[(h2 >> 16) & 0x0f] +
        HEX_CHARS[(h2 >> 12) & 0x0f] +
        HEX_CHARS[(h2 >> 8) & 0x0f] +
        HEX_CHARS[(h2 >> 4) & 0x0f] +
        HEX_CHARS[h2 & 0x0f] +
        HEX_CHARS[(h3 >> 28) & 0x0f] +
        HEX_CHARS[(h3 >> 24) & 0x0f] +
        HEX_CHARS[(h3 >> 20) & 0x0f] +
        HEX_CHARS[(h3 >> 16) & 0x0f] +
        HEX_CHARS[(h3 >> 12) & 0x0f] +
        HEX_CHARS[(h3 >> 8) & 0x0f] +
        HEX_CHARS[(h3 >> 4) & 0x0f] +
        HEX_CHARS[h3 & 0x0f] +
        HEX_CHARS[(h4 >> 28) & 0x0f] +
        HEX_CHARS[(h4 >> 24) & 0x0f] +
        HEX_CHARS[(h4 >> 20) & 0x0f] +
        HEX_CHARS[(h4 >> 16) & 0x0f] +
        HEX_CHARS[(h4 >> 12) & 0x0f] +
        HEX_CHARS[(h4 >> 8) & 0x0f] +
        HEX_CHARS[(h4 >> 4) & 0x0f] +
        HEX_CHARS[h4 & 0x0f]);
};
Sha1.prototype.toString = Sha1.prototype.hex;
Sha1.prototype.digest = function () {
    this.finalize();
    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
    return [
        (h0 >> 24) & 0xff,
        (h0 >> 16) & 0xff,
        (h0 >> 8) & 0xff,
        h0 & 0xff,
        (h1 >> 24) & 0xff,
        (h1 >> 16) & 0xff,
        (h1 >> 8) & 0xff,
        h1 & 0xff,
        (h2 >> 24) & 0xff,
        (h2 >> 16) & 0xff,
        (h2 >> 8) & 0xff,
        h2 & 0xff,
        (h3 >> 24) & 0xff,
        (h3 >> 16) & 0xff,
        (h3 >> 8) & 0xff,
        h3 & 0xff,
        (h4 >> 24) & 0xff,
        (h4 >> 16) & 0xff,
        (h4 >> 8) & 0xff,
        h4 & 0xff,
    ];
};
Sha1.prototype.array = Sha1.prototype.digest;
Sha1.prototype.arrayBuffer = function () {
    this.finalize();
    var buffer = new ArrayBuffer(20);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0);
    dataView.setUint32(4, this.h1);
    dataView.setUint32(8, this.h2);
    dataView.setUint32(12, this.h3);
    dataView.setUint32(16, this.h4);
    return buffer;
};
const insecureHash = (message) => {
    return new Sha1(true).update(message)["hex"]();
};

;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/utils/hash.js


// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/messages/utils.js
var utils = __webpack_require__(9751);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/caches/base.js


/**
 * This cache key should be consistent across all versions of LangChain.
 * It is currently NOT consistent across versions of LangChain.
 *
 * A huge benefit of having a remote cache (like redis) is that you can
 * access the cache from different processes/machines. The allows you to
 * separate concerns and scale horizontally.
 *
 * TODO: Make cache key consistent across versions of LangChain.
 */
const getCacheKey = (...strings) => insecureHash(strings.join("_"));
function deserializeStoredGeneration(storedGeneration) {
    if (storedGeneration.message !== undefined) {
        return {
            text: storedGeneration.text,
            message: mapStoredMessageToChatMessage(storedGeneration.message),
        };
    }
    else {
        return { text: storedGeneration.text };
    }
}
function serializeGeneration(generation) {
    const serializedValue = {
        text: generation.text,
    };
    if (generation.message !== undefined) {
        serializedValue.message = generation.message.toDict();
    }
    return serializedValue;
}
/**
 * Base class for all caches. All caches should extend this class.
 */
class BaseCache {
}
const GLOBAL_MAP = new Map();
/**
 * A cache for storing LLM generations that stores data in memory.
 */
class InMemoryCache extends BaseCache {
    constructor(map) {
        super();
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cache = map ?? new Map();
    }
    /**
     * Retrieves data from the cache using a prompt and an LLM key. If the
     * data is not found, it returns null.
     * @param prompt The prompt used to find the data.
     * @param llmKey The LLM key used to find the data.
     * @returns The data corresponding to the prompt and LLM key, or null if not found.
     */
    lookup(prompt, llmKey) {
        return Promise.resolve(this.cache.get(getCacheKey(prompt, llmKey)) ?? null);
    }
    /**
     * Updates the cache with new data using a prompt and an LLM key.
     * @param prompt The prompt used to store the data.
     * @param llmKey The LLM key used to store the data.
     * @param value The data to be stored.
     */
    async update(prompt, llmKey, value) {
        this.cache.set(getCacheKey(prompt, llmKey), value);
    }
    /**
     * Returns a global instance of InMemoryCache using a predefined global
     * map as the initial cache.
     * @returns A global instance of InMemoryCache.
     */
    static global() {
        return new InMemoryCache(GLOBAL_MAP);
    }
}

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/prompt_values.js
var prompt_values = __webpack_require__(49484);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/utils/async_caller.js
var async_caller = __webpack_require__(61637);
// EXTERNAL MODULE: ./node_modules/base64-js/index.js
var base64_js = __webpack_require__(38793);
;// CONCATENATED MODULE: ./node_modules/js-tiktoken/dist/chunk-Z5MDQTGX.js


var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/utils.ts
function never(_) {
}
function bytePairMerge(piece, ranks) {
  let parts = Array.from(
    { length: piece.length },
    (_, i) => ({ start: i, end: i + 1 })
  );
  while (parts.length > 1) {
    let minRank = null;
    for (let i = 0; i < parts.length - 1; i++) {
      const slice = piece.slice(parts[i].start, parts[i + 1].end);
      const rank = ranks.get(slice.join(","));
      if (rank == null)
        continue;
      if (minRank == null || rank < minRank[0]) {
        minRank = [rank, i];
      }
    }
    if (minRank != null) {
      const i = minRank[1];
      parts[i] = { start: parts[i].start, end: parts[i + 1].end };
      parts.splice(i + 1, 1);
    } else {
      break;
    }
  }
  return parts;
}
function bytePairEncode(piece, ranks) {
  if (piece.length === 1)
    return [ranks.get(piece.join(","))];
  return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(","))).filter((x) => x != null);
}
function escapeRegex(str) {
  return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
var _Tiktoken = class {
  /** @internal */
  specialTokens;
  /** @internal */
  inverseSpecialTokens;
  /** @internal */
  patStr;
  /** @internal */
  textEncoder = new TextEncoder();
  /** @internal */
  textDecoder = new TextDecoder("utf-8");
  /** @internal */
  rankMap = /* @__PURE__ */ new Map();
  /** @internal */
  textMap = /* @__PURE__ */ new Map();
  constructor(ranks, extendedSpecialTokens) {
    this.patStr = ranks.pat_str;
    const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x) => {
      const [_, offsetStr, ...tokens] = x.split(" ");
      const offset = Number.parseInt(offsetStr, 10);
      tokens.forEach((token, i) => memo[token] = offset + i);
      return memo;
    }, {});
    for (const [token, rank] of Object.entries(uncompressed)) {
      const bytes = base64_js.toByteArray(token);
      this.rankMap.set(bytes.join(","), rank);
      this.textMap.set(rank, bytes);
    }
    this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };
    this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {
      memo[rank] = this.textEncoder.encode(text);
      return memo;
    }, {});
  }
  encode(text, allowedSpecial = [], disallowedSpecial = "all") {
    const regexes = new RegExp(this.patStr, "ug");
    const specialRegex = _Tiktoken.specialTokenRegex(
      Object.keys(this.specialTokens)
    );
    const ret = [];
    const allowedSpecialSet = new Set(
      allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial
    );
    const disallowedSpecialSet = new Set(
      disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter(
        (x) => !allowedSpecialSet.has(x)
      ) : disallowedSpecial
    );
    if (disallowedSpecialSet.size > 0) {
      const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
        ...disallowedSpecialSet
      ]);
      const specialMatch = text.match(disallowedSpecialRegex);
      if (specialMatch != null) {
        throw new Error(
          `The text contains a special token that is not allowed: ${specialMatch[0]}`
        );
      }
    }
    let start = 0;
    while (true) {
      let nextSpecial = null;
      let startFind = start;
      while (true) {
        specialRegex.lastIndex = startFind;
        nextSpecial = specialRegex.exec(text);
        if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))
          break;
        startFind = nextSpecial.index + 1;
      }
      const end = nextSpecial?.index ?? text.length;
      for (const match of text.substring(start, end).matchAll(regexes)) {
        const piece = this.textEncoder.encode(match[0]);
        const token2 = this.rankMap.get(piece.join(","));
        if (token2 != null) {
          ret.push(token2);
          continue;
        }
        ret.push(...bytePairEncode(piece, this.rankMap));
      }
      if (nextSpecial == null)
        break;
      let token = this.specialTokens[nextSpecial[0]];
      ret.push(token);
      start = nextSpecial.index + nextSpecial[0].length;
    }
    return ret;
  }
  decode(tokens) {
    const res = [];
    let length = 0;
    for (let i2 = 0; i2 < tokens.length; ++i2) {
      const token = tokens[i2];
      const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];
      if (bytes != null) {
        res.push(bytes);
        length += bytes.length;
      }
    }
    const mergedArray = new Uint8Array(length);
    let i = 0;
    for (const bytes of res) {
      mergedArray.set(bytes, i);
      i += bytes.length;
    }
    return this.textDecoder.decode(mergedArray);
  }
};
var Tiktoken = _Tiktoken;
__publicField(Tiktoken, "specialTokenRegex", (tokens) => {
  return new RegExp(tokens.map((i) => escapeRegex(i)).join("|"), "g");
});
function getEncodingNameForModel(model) {
  switch (model) {
    case "gpt2": {
      return "gpt2";
    }
    case "code-cushman-001":
    case "code-cushman-002":
    case "code-davinci-001":
    case "code-davinci-002":
    case "cushman-codex":
    case "davinci-codex":
    case "davinci-002":
    case "text-davinci-002":
    case "text-davinci-003": {
      return "p50k_base";
    }
    case "code-davinci-edit-001":
    case "text-davinci-edit-001": {
      return "p50k_edit";
    }
    case "ada":
    case "babbage":
    case "babbage-002":
    case "code-search-ada-code-001":
    case "code-search-babbage-code-001":
    case "curie":
    case "davinci":
    case "text-ada-001":
    case "text-babbage-001":
    case "text-curie-001":
    case "text-davinci-001":
    case "text-search-ada-doc-001":
    case "text-search-babbage-doc-001":
    case "text-search-curie-doc-001":
    case "text-search-davinci-doc-001":
    case "text-similarity-ada-001":
    case "text-similarity-babbage-001":
    case "text-similarity-curie-001":
    case "text-similarity-davinci-001": {
      return "r50k_base";
    }
    case "gpt-3.5-turbo-instruct-0914":
    case "gpt-3.5-turbo-instruct":
    case "gpt-3.5-turbo-16k-0613":
    case "gpt-3.5-turbo-16k":
    case "gpt-3.5-turbo-0613":
    case "gpt-3.5-turbo-0301":
    case "gpt-3.5-turbo":
    case "gpt-4-32k-0613":
    case "gpt-4-32k-0314":
    case "gpt-4-32k":
    case "gpt-4-0613":
    case "gpt-4-0314":
    case "gpt-4":
    case "gpt-3.5-turbo-1106":
    case "gpt-35-turbo":
    case "gpt-4-1106-preview":
    case "gpt-4-vision-preview":
    case "gpt-3.5-turbo-0125":
    case "gpt-4-turbo":
    case "gpt-4-turbo-2024-04-09":
    case "gpt-4-turbo-preview":
    case "gpt-4-0125-preview":
    case "text-embedding-ada-002":
    case "text-embedding-3-small":
    case "text-embedding-3-large": {
      return "cl100k_base";
    }
    case "gpt-4o":
    case "gpt-4o-2024-05-13":
    case "gpt-4o-2024-08-06":
    case "gpt-4o-2024-11-20":
    case "gpt-4o-mini-2024-07-18":
    case "gpt-4o-mini":
    case "o1":
    case "o1-2024-12-17":
    case "o1-mini":
    case "o1-preview":
    case "o1-preview-2024-09-12":
    case "o1-mini-2024-09-12":
    case "o3-mini":
    case "o3-mini-2025-01-31":
    case "chatgpt-4o-latest":
    case "gpt-4o-realtime":
    case "gpt-4o-realtime-preview-2024-10-01": {
      return "o200k_base";
    }
    default:
      throw new Error("Unknown model");
  }
}



;// CONCATENATED MODULE: ./node_modules/js-tiktoken/dist/lite.js


;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/utils/tiktoken.js


const cache = {};
const caller = /* #__PURE__ */ new async_caller/* AsyncCaller */.g({});
async function getEncoding(encoding) {
    if (!(encoding in cache)) {
        cache[encoding] = caller
            .fetch(`https://tiktoken.pages.dev/js/${encoding}.json`)
            .then((res) => res.json())
            .then((data) => new Tiktoken(data))
            .catch((e) => {
            delete cache[encoding];
            throw e;
        });
    }
    return await cache[encoding];
}
async function tiktoken_encodingForModel(model) {
    return getEncoding(getEncodingNameForModel(model));
}

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/runnables/base.js + 8 modules
var base = __webpack_require__(29248);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/dist/language_models/base.js






// https://www.npmjs.com/package/js-tiktoken
const getModelNameForTiktoken = (modelName) => {
    if (modelName.startsWith("gpt-3.5-turbo-16k")) {
        return "gpt-3.5-turbo-16k";
    }
    if (modelName.startsWith("gpt-3.5-turbo-")) {
        return "gpt-3.5-turbo";
    }
    if (modelName.startsWith("gpt-4-32k")) {
        return "gpt-4-32k";
    }
    if (modelName.startsWith("gpt-4-")) {
        return "gpt-4";
    }
    if (modelName.startsWith("gpt-4o")) {
        return "gpt-4o";
    }
    return modelName;
};
const getEmbeddingContextSize = (modelName) => {
    switch (modelName) {
        case "text-embedding-ada-002":
            return 8191;
        default:
            return 2046;
    }
};
const getModelContextSize = (modelName) => {
    switch (getModelNameForTiktoken(modelName)) {
        case "gpt-3.5-turbo-16k":
            return 16384;
        case "gpt-3.5-turbo":
            return 4096;
        case "gpt-4-32k":
            return 32768;
        case "gpt-4":
            return 8192;
        case "text-davinci-003":
            return 4097;
        case "text-curie-001":
            return 2048;
        case "text-babbage-001":
            return 2048;
        case "text-ada-001":
            return 2048;
        case "code-davinci-002":
            return 8000;
        case "code-cushman-001":
            return 2048;
        default:
            return 4097;
    }
};
/**
 * Whether or not the input matches the OpenAI tool definition.
 * @param {unknown} tool The input to check.
 * @returns {boolean} Whether the input is an OpenAI tool definition.
 */
function isOpenAITool(tool) {
    if (typeof tool !== "object" || !tool)
        return false;
    if ("type" in tool &&
        tool.type === "function" &&
        "function" in tool &&
        typeof tool.function === "object" &&
        tool.function &&
        "name" in tool.function &&
        "parameters" in tool.function) {
        return true;
    }
    return false;
}
const calculateMaxTokens = async ({ prompt, modelName, }) => {
    let numTokens;
    try {
        numTokens = (await encodingForModel(getModelNameForTiktoken(modelName))).encode(prompt).length;
    }
    catch (error) {
        console.warn("Failed to calculate number of tokens, falling back to approximate count");
        // fallback to approximate calculation if tiktoken is not available
        // each token is ~4 characters: https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them#
        numTokens = Math.ceil(prompt.length / 4);
    }
    const maxTokens = getModelContextSize(modelName);
    return maxTokens - numTokens;
};
const getVerbosity = () => false;
/**
 * Base class for language models, chains, tools.
 */
class BaseLangChain extends base/* Runnable */.YN {
    get lc_attributes() {
        return {
            callbacks: undefined,
            verbose: undefined,
        };
    }
    constructor(params) {
        super(params);
        /**
         * Whether to print out response text.
         */
        Object.defineProperty(this, "verbose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "callbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.verbose = params.verbose ?? getVerbosity();
        this.callbacks = params.callbacks;
        this.tags = params.tags ?? [];
        this.metadata = params.metadata ?? {};
    }
}
/**
 * Base class for language models.
 */
class BaseLanguageModel extends BaseLangChain {
    /**
     * Keys that the language model accepts as call options.
     */
    get callKeys() {
        return ["stop", "timeout", "signal", "tags", "metadata", "callbacks"];
    }
    constructor({ callbacks, callbackManager, ...params }) {
        const { cache, ...rest } = params;
        super({
            callbacks: callbacks ?? callbackManager,
            ...rest,
        });
        /**
         * The async caller should be used by subclasses to make any async calls,
         * which will thus benefit from the concurrency and retry logic.
         */
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_encoding", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (typeof cache === "object") {
            this.cache = cache;
        }
        else if (cache) {
            this.cache = InMemoryCache.global();
        }
        else {
            this.cache = undefined;
        }
        this.caller = new async_caller/* AsyncCaller */.g(params ?? {});
    }
    async getNumTokens(content) {
        // TODO: Figure out correct value.
        if (typeof content !== "string") {
            return 0;
        }
        // fallback to approximate calculation if tiktoken is not available
        let numTokens = Math.ceil(content.length / 4);
        if (!this._encoding) {
            try {
                this._encoding = await tiktoken_encodingForModel("modelName" in this
                    ? getModelNameForTiktoken(this.modelName)
                    : "gpt2");
            }
            catch (error) {
                console.warn("Failed to calculate number of tokens, falling back to approximate count", error);
            }
        }
        if (this._encoding) {
            try {
                numTokens = this._encoding.encode(content).length;
            }
            catch (error) {
                console.warn("Failed to calculate number of tokens, falling back to approximate count", error);
            }
        }
        return numTokens;
    }
    static _convertInputToPromptValue(input) {
        if (typeof input === "string") {
            return new prompt_values/* StringPromptValue */.HY(input);
        }
        else if (Array.isArray(input)) {
            return new prompt_values/* ChatPromptValue */.aB(input.map(utils/* coerceMessageLikeToMessage */.K0));
        }
        else {
            return input;
        }
    }
    /**
     * Get the identifying parameters of the LLM.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _identifyingParams() {
        return {};
    }
    /**
     * Create a unique cache key for a specific call to a specific language model.
     * @param callOptions Call options for the model
     * @returns A unique cache key.
     */
    _getSerializedCacheKeyParametersForCall(
    // TODO: Fix when we remove the RunnableLambda backwards compatibility shim.
    { config, ...callOptions }) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params = {
            ...this._identifyingParams(),
            ...callOptions,
            _type: this._llmType(),
            _model: this._modelType(),
        };
        const filteredEntries = Object.entries(params).filter(([_, value]) => value !== undefined);
        const serializedEntries = filteredEntries
            .map(([key, value]) => `${key}:${JSON.stringify(value)}`)
            .sort()
            .join(",");
        return serializedEntries;
    }
    /**
     * @deprecated
     * Return a json-like object representing this LLM.
     */
    serialize() {
        return {
            ...this._identifyingParams(),
            _type: this._llmType(),
            _model: this._modelType(),
        };
    }
    /**
     * @deprecated
     * Load an LLM from a json-like object describing it.
     */
    static async deserialize(_data) {
        throw new Error("Use .toJSON() instead");
    }
}

;// CONCATENATED MODULE: ./node_modules/@langchain/core/language_models/base.js


/***/ }),

/***/ 85258:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   YN: () => (/* reexport safe */ _dist_runnables_index_js__WEBPACK_IMPORTED_MODULE_0__.YN),
/* harmony export */   ZI: () => (/* reexport safe */ _dist_runnables_index_js__WEBPACK_IMPORTED_MODULE_0__.ZI),
/* harmony export */   tn: () => (/* reexport safe */ _dist_runnables_index_js__WEBPACK_IMPORTED_MODULE_0__.tn),
/* harmony export */   zZ: () => (/* reexport safe */ _dist_runnables_index_js__WEBPACK_IMPORTED_MODULE_0__.zZ)
/* harmony export */ });
/* harmony import */ var _dist_runnables_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93954);


/***/ }),

/***/ 97258:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  r: () => (/* binding */ BaseChain)
});

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/outputs.js
var outputs = __webpack_require__(58243);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/outputs.js

// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/callbacks/manager.js + 8 modules
var manager = __webpack_require__(29747);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/callbacks/manager.js

// EXTERNAL MODULE: ./node_modules/@langchain/core/runnables.js
var runnables = __webpack_require__(85258);
// EXTERNAL MODULE: ./node_modules/@langchain/core/language_models/base.js + 7 modules
var base = __webpack_require__(6571);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/chains/base.js




/**
 * Base interface that all chains must implement.
 */
class BaseChain extends base/* BaseLangChain */.ZE {
    get lc_namespace() {
        return ["langchain", "chains", this._chainType()];
    }
    constructor(fields, 
    /** @deprecated */
    verbose, 
    /** @deprecated */
    callbacks) {
        if (arguments.length === 1 &&
            typeof fields === "object" &&
            !("saveContext" in fields)) {
            // fields is not a BaseMemory
            const { memory, callbackManager, ...rest } = fields;
            super({ ...rest, callbacks: callbackManager ?? rest.callbacks });
            this.memory = memory;
        }
        else {
            // fields is a BaseMemory
            super({ verbose, callbacks });
            this.memory = fields;
        }
    }
    /** @ignore */
    _selectMemoryInputs(values) {
        const valuesForMemory = { ...values };
        if ("signal" in valuesForMemory) {
            delete valuesForMemory.signal;
        }
        if ("timeout" in valuesForMemory) {
            delete valuesForMemory.timeout;
        }
        return valuesForMemory;
    }
    /**
     * Invoke the chain with the provided input and returns the output.
     * @param input Input values for the chain run.
     * @param config Optional configuration for the Runnable.
     * @returns Promise that resolves with the output of the chain run.
     */
    async invoke(input, options) {
        const config = (0,runnables/* ensureConfig */.ZI)(options);
        const fullValues = await this._formatValues(input);
        const callbackManager_ = await manager/* CallbackManager */.Td.configure(config?.callbacks, this.callbacks, config?.tags, this.tags, config?.metadata, this.metadata, { verbose: this.verbose });
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), fullValues, undefined, undefined, undefined, undefined, config?.runName);
        let outputValues;
        try {
            outputValues = await (fullValues.signal
                ? Promise.race([
                    this._call(fullValues, runManager, config),
                    new Promise((_, reject) => {
                        fullValues.signal?.addEventListener("abort", () => {
                            reject(new Error("AbortError"));
                        });
                    }),
                ])
                : this._call(fullValues, runManager, config));
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        if (!(this.memory == null)) {
            await this.memory.saveContext(this._selectMemoryInputs(input), outputValues);
        }
        await runManager?.handleChainEnd(outputValues);
        // add the runManager's currentRunId to the outputValues
        Object.defineProperty(outputValues, outputs/* RUN_KEY */.SP, {
            value: runManager ? { runId: runManager?.runId } : undefined,
            configurable: true,
        });
        return outputValues;
    }
    _validateOutputs(outputs) {
        const missingKeys = this.outputKeys.filter((k) => !(k in outputs));
        if (missingKeys.length) {
            throw new Error(`Missing output keys: ${missingKeys.join(", ")} from chain ${this._chainType()}`);
        }
    }
    async prepOutputs(inputs, outputs, returnOnlyOutputs = false) {
        this._validateOutputs(outputs);
        if (this.memory) {
            await this.memory.saveContext(inputs, outputs);
        }
        if (returnOnlyOutputs) {
            return outputs;
        }
        return { ...inputs, ...outputs };
    }
    /**
     * Return a json-like object representing this chain.
     */
    serialize() {
        throw new Error("Method not implemented.");
    }
    /** @deprecated Use .invoke() instead. Will be removed in 0.2.0. */
    async run(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input, config) {
        const inputKeys = this.inputKeys.filter((k) => !this.memory?.memoryKeys.includes(k) ?? true);
        const isKeylessInput = inputKeys.length <= 1;
        if (!isKeylessInput) {
            throw new Error(`Chain ${this._chainType()} expects multiple inputs, cannot use 'run' `);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values = inputKeys.length ? { [inputKeys[0]]: input } : {};
        const returnValues = await this.call(values, config);
        const keys = Object.keys(returnValues);
        if (keys.length === 1) {
            return returnValues[keys[0]];
        }
        throw new Error("return values have multiple keys, `run` only supported when one key currently");
    }
    async _formatValues(values) {
        const fullValues = { ...values };
        if (fullValues.timeout && !fullValues.signal) {
            fullValues.signal = AbortSignal.timeout(fullValues.timeout);
            delete fullValues.timeout;
        }
        if (!(this.memory == null)) {
            const newValues = await this.memory.loadMemoryVariables(this._selectMemoryInputs(values));
            for (const [key, value] of Object.entries(newValues)) {
                fullValues[key] = value;
            }
        }
        return fullValues;
    }
    /**
     * @deprecated Use .invoke() instead. Will be removed in 0.2.0.
     *
     * Run the core logic of this chain and add to output if desired.
     *
     * Wraps _call and handles memory.
     */
    async call(values, config, 
    /** @deprecated */
    tags) {
        const parsedConfig = { tags, ...(0,manager/* parseCallbackConfigArg */.H_)(config) };
        return this.invoke(values, parsedConfig);
    }
    /**
     * @deprecated Use .batch() instead. Will be removed in 0.2.0.
     *
     * Call the chain on all inputs in the list
     */
    async apply(inputs, config) {
        return Promise.all(inputs.map(async (i, idx) => this.call(i, config?.[idx])));
    }
    /**
     * Load a chain from a json-like object describing it.
     */
    static async deserialize(data, values = {}) {
        switch (data._type) {
            case "llm_chain": {
                const { LLMChain } = await Promise.all(/* import() */[__webpack_require__.e(430), __webpack_require__.e(543), __webpack_require__.e(64)]).then(__webpack_require__.bind(__webpack_require__, 47064));
                return LLMChain.deserialize(data);
            }
            case "sequential_chain": {
                const { SequentialChain } = await __webpack_require__.e(/* import() */ 173).then(__webpack_require__.bind(__webpack_require__, 44554));
                return SequentialChain.deserialize(data);
            }
            case "simple_sequential_chain": {
                const { SimpleSequentialChain } = await __webpack_require__.e(/* import() */ 173).then(__webpack_require__.bind(__webpack_require__, 44554));
                return SimpleSequentialChain.deserialize(data);
            }
            case "stuff_documents_chain": {
                const { StuffDocumentsChain } = await Promise.all(/* import() */[__webpack_require__.e(430), __webpack_require__.e(543), __webpack_require__.e(64), __webpack_require__.e(316)]).then(__webpack_require__.bind(__webpack_require__, 71173));
                return StuffDocumentsChain.deserialize(data);
            }
            case "map_reduce_documents_chain": {
                const { MapReduceDocumentsChain } = await Promise.all(/* import() */[__webpack_require__.e(430), __webpack_require__.e(543), __webpack_require__.e(64), __webpack_require__.e(316)]).then(__webpack_require__.bind(__webpack_require__, 71173));
                return MapReduceDocumentsChain.deserialize(data);
            }
            case "refine_documents_chain": {
                const { RefineDocumentsChain } = await Promise.all(/* import() */[__webpack_require__.e(430), __webpack_require__.e(543), __webpack_require__.e(64), __webpack_require__.e(316)]).then(__webpack_require__.bind(__webpack_require__, 71173));
                return RefineDocumentsChain.deserialize(data);
            }
            case "vector_db_qa": {
                const { VectorDBQAChain } = await Promise.all(/* import() */[__webpack_require__.e(430), __webpack_require__.e(543), __webpack_require__.e(64), __webpack_require__.e(845)]).then(__webpack_require__.bind(__webpack_require__, 64845));
                return VectorDBQAChain.deserialize(data, values);
            }
            case "api_chain": {
                const { APIChain } = await Promise.all(/* import() */[__webpack_require__.e(430), __webpack_require__.e(543), __webpack_require__.e(64), __webpack_require__.e(831)]).then(__webpack_require__.bind(__webpack_require__, 77212));
                return APIChain.deserialize(data);
            }
            default:
                throw new Error(`Invalid prompt type in config: ${data._type}`);
        }
    }
}


/***/ })

};
