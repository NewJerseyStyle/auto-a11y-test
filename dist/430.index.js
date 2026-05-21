export const id = 430;
export const ids = [430];
export const modules = {

/***/ 46612:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BJ: () => (/* binding */ SystemMessagePromptTemplate),
/* harmony export */   FS: () => (/* binding */ HumanMessagePromptTemplate),
/* harmony export */   RZ: () => (/* binding */ ChatPromptTemplate),
/* harmony export */   qF: () => (/* binding */ BaseChatPromptTemplate),
/* harmony export */   sS: () => (/* binding */ AIMessagePromptTemplate)
/* harmony export */ });
/* unused harmony exports BaseMessagePromptTemplate, MessagesPlaceholder, BaseMessageStringPromptTemplate, ChatMessagePromptTemplate */
/* harmony import */ var _messages_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91574);
/* harmony import */ var _prompt_values_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49484);
/* harmony import */ var _runnables_base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29248);
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3748);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1776);
/* harmony import */ var _prompt_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(68531);
/* harmony import */ var _image_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(99848);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(36574);
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(61193);
// Default generic "any" values are for backwards compatibility.
// Replace with "string" when we are comfortable with a breaking change.









/**
 * Abstract class that serves as a base for creating message prompt
 * templates. It defines how to format messages for different roles in a
 * conversation.
 */
class BaseMessagePromptTemplate extends _runnables_base_js__WEBPACK_IMPORTED_MODULE_2__/* .Runnable */ .YN {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "prompts", "chat"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    /**
     * Calls the formatMessages method with the provided input and options.
     * @param input Input for the formatMessages method
     * @param options Optional BaseCallbackConfig
     * @returns Formatted output messages
     */
    async invoke(input, options) {
        return this._callWithConfig((input) => this.formatMessages(input), input, { ...options, runType: "prompt" });
    }
}
/**
 * Class that represents a placeholder for messages in a chat prompt. It
 * extends the BaseMessagePromptTemplate.
 */
class MessagesPlaceholder extends BaseMessagePromptTemplate {
    static lc_name() {
        return "MessagesPlaceholder";
    }
    constructor(fields) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign
            fields = { variableName: fields };
        }
        super(fields);
        Object.defineProperty(this, "variableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "optional", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.variableName = fields.variableName;
        this.optional = fields.optional ?? false;
    }
    get inputVariables() {
        return [this.variableName];
    }
    async formatMessages(values) {
        const input = values[this.variableName];
        if (this.optional && !input) {
            return [];
        }
        else if (!input) {
            const error = new Error(`Field "${this.variableName}" in prompt uses a MessagesPlaceholder, which expects an array of BaseMessages as an input value. Received: undefined`);
            error.name = "InputFormatError";
            throw error;
        }
        let formattedMessages;
        try {
            if (Array.isArray(input)) {
                formattedMessages = input.map(_messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .coerceMessageLikeToMessage */ .K0);
            }
            else {
                formattedMessages = [(0,_messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .coerceMessageLikeToMessage */ .K0)(input)];
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (e) {
            const readableInput = typeof input === "string" ? input : JSON.stringify(input, null, 2);
            const error = new Error([
                `Field "${this.variableName}" in prompt uses a MessagesPlaceholder, which expects an array of BaseMessages or coerceable values as input.`,
                `Received value: ${readableInput}`,
                `Additional message: ${e.message}`,
            ].join("\n\n"));
            error.name = "InputFormatError";
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            error.lc_error_code = e.lc_error_code;
            throw error;
        }
        return formattedMessages;
    }
}
/**
 * Abstract class that serves as a base for creating message string prompt
 * templates. It extends the BaseMessagePromptTemplate.
 */
class BaseMessageStringPromptTemplate extends BaseMessagePromptTemplate {
    constructor(fields) {
        if (!("prompt" in fields)) {
            // eslint-disable-next-line no-param-reassign
            fields = { prompt: fields };
        }
        super(fields);
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.prompt = fields.prompt;
    }
    get inputVariables() {
        return this.prompt.inputVariables;
    }
    async formatMessages(values) {
        return [await this.format(values)];
    }
}
/**
 * Abstract class that serves as a base for creating chat prompt
 * templates. It extends the BasePromptTemplate.
 */
class BaseChatPromptTemplate extends _base_js__WEBPACK_IMPORTED_MODULE_4__/* .BasePromptTemplate */ .m {
    constructor(input) {
        super(input);
    }
    async format(values) {
        return (await this.formatPromptValue(values)).toString();
    }
    async formatPromptValue(values) {
        const resultMessages = await this.formatMessages(values);
        return new _prompt_values_js__WEBPACK_IMPORTED_MODULE_1__/* .ChatPromptValue */ .aB(resultMessages);
    }
}
/**
 * Class that represents a chat message prompt template. It extends the
 * BaseMessageStringPromptTemplate.
 */
class ChatMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    static lc_name() {
        return "ChatMessagePromptTemplate";
    }
    constructor(fields, role) {
        if (!("prompt" in fields)) {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { prompt: fields, role: role };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    async format(values) {
        return new _messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .ChatMessage */ .cM(await this.prompt.format(values), this.role);
    }
    static fromTemplate(template, role, options) {
        return new this(_prompt_js__WEBPACK_IMPORTED_MODULE_5__.PromptTemplate.fromTemplate(template, {
            templateFormat: options?.templateFormat,
        }), role);
    }
}
class _StringImageMessagePromptTemplate extends BaseMessagePromptTemplate {
    static _messageClass() {
        throw new Error("Can not invoke _messageClass from inside _StringImageMessagePromptTemplate");
    }
    constructor(
    /** @TODO When we come up with a better way to type prompt templates, fix this */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fields, additionalOptions) {
        if (!("prompt" in fields)) {
            // eslint-disable-next-line no-param-reassign
            fields = { prompt: fields };
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "prompts", "chat"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "inputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "additionalOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "messageClass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // ChatMessage contains role field, others don't.
        // Because of this, we have a separate class property for ChatMessage.
        Object.defineProperty(this, "chatMessageClass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.prompt = fields.prompt;
        if (Array.isArray(this.prompt)) {
            let inputVariables = [];
            this.prompt.forEach((prompt) => {
                if ("inputVariables" in prompt) {
                    inputVariables = inputVariables.concat(prompt.inputVariables);
                }
            });
            this.inputVariables = inputVariables;
        }
        else {
            this.inputVariables = this.prompt.inputVariables;
        }
        this.additionalOptions = additionalOptions ?? this.additionalOptions;
    }
    createMessage(content) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const constructor = this.constructor;
        if (constructor._messageClass()) {
            const MsgClass = constructor._messageClass();
            return new MsgClass({ content });
        }
        else if (constructor.chatMessageClass) {
            const MsgClass = constructor.chatMessageClass();
            // Assuming ChatMessage constructor also takes a content argument
            return new MsgClass({
                content,
                role: this.getRoleFromMessageClass(MsgClass.lc_name()),
            });
        }
        else {
            throw new Error("No message class defined");
        }
    }
    getRoleFromMessageClass(name) {
        switch (name) {
            case "HumanMessage":
                return "human";
            case "AIMessage":
                return "ai";
            case "SystemMessage":
                return "system";
            case "ChatMessage":
                return "chat";
            default:
                throw new Error("Invalid message class name");
        }
    }
    static fromTemplate(template, additionalOptions) {
        if (typeof template === "string") {
            return new this(_prompt_js__WEBPACK_IMPORTED_MODULE_5__.PromptTemplate.fromTemplate(template, additionalOptions));
        }
        const prompt = [];
        for (const item of template) {
            if (typeof item === "string" ||
                (typeof item === "object" && "text" in item)) {
                let text = "";
                if (typeof item === "string") {
                    text = item;
                }
                else if (typeof item.text === "string") {
                    text = item.text ?? "";
                }
                const options = {
                    ...additionalOptions,
                    ...(typeof item !== "string"
                        ? { additionalContentFields: item }
                        : {}),
                };
                prompt.push(_prompt_js__WEBPACK_IMPORTED_MODULE_5__.PromptTemplate.fromTemplate(text, options));
            }
            else if (typeof item === "object" && "image_url" in item) {
                let imgTemplate = item.image_url ?? "";
                let imgTemplateObject;
                let inputVariables = [];
                if (typeof imgTemplate === "string") {
                    let parsedTemplate;
                    if (additionalOptions?.templateFormat === "mustache") {
                        parsedTemplate = (0,_template_js__WEBPACK_IMPORTED_MODULE_7__/* .parseMustache */ .g2)(imgTemplate);
                    }
                    else {
                        parsedTemplate = (0,_template_js__WEBPACK_IMPORTED_MODULE_7__/* .parseFString */ .D4)(imgTemplate);
                    }
                    const variables = parsedTemplate.flatMap((item) => item.type === "variable" ? [item.name] : []);
                    if ((variables?.length ?? 0) > 0) {
                        if (variables.length > 1) {
                            throw new Error(`Only one format variable allowed per image template.\nGot: ${variables}\nFrom: ${imgTemplate}`);
                        }
                        inputVariables = [variables[0]];
                    }
                    else {
                        inputVariables = [];
                    }
                    imgTemplate = { url: imgTemplate };
                    imgTemplateObject = new _image_js__WEBPACK_IMPORTED_MODULE_6__/* .ImagePromptTemplate */ .C({
                        template: imgTemplate,
                        inputVariables,
                        templateFormat: additionalOptions?.templateFormat,
                        additionalContentFields: item,
                    });
                }
                else if (typeof imgTemplate === "object") {
                    if ("url" in imgTemplate) {
                        let parsedTemplate;
                        if (additionalOptions?.templateFormat === "mustache") {
                            parsedTemplate = (0,_template_js__WEBPACK_IMPORTED_MODULE_7__/* .parseMustache */ .g2)(imgTemplate.url);
                        }
                        else {
                            parsedTemplate = (0,_template_js__WEBPACK_IMPORTED_MODULE_7__/* .parseFString */ .D4)(imgTemplate.url);
                        }
                        inputVariables = parsedTemplate.flatMap((item) => item.type === "variable" ? [item.name] : []);
                    }
                    else {
                        inputVariables = [];
                    }
                    imgTemplateObject = new _image_js__WEBPACK_IMPORTED_MODULE_6__/* .ImagePromptTemplate */ .C({
                        template: imgTemplate,
                        inputVariables,
                        templateFormat: additionalOptions?.templateFormat,
                        additionalContentFields: item,
                    });
                }
                else {
                    throw new Error("Invalid image template");
                }
                prompt.push(imgTemplateObject);
            }
        }
        return new this({ prompt, additionalOptions });
    }
    async format(input) {
        // eslint-disable-next-line no-instanceof/no-instanceof
        if (this.prompt instanceof _string_js__WEBPACK_IMPORTED_MODULE_3__/* .BaseStringPromptTemplate */ .L) {
            const text = await this.prompt.format(input);
            return this.createMessage(text);
        }
        else {
            const content = [];
            for (const prompt of this.prompt) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let inputs = {};
                if (!("inputVariables" in prompt)) {
                    throw new Error(`Prompt ${prompt} does not have inputVariables defined.`);
                }
                for (const item of prompt.inputVariables) {
                    if (!inputs) {
                        inputs = { [item]: input[item] };
                    }
                    inputs = { ...inputs, [item]: input[item] };
                }
                // eslint-disable-next-line no-instanceof/no-instanceof
                if (prompt instanceof _string_js__WEBPACK_IMPORTED_MODULE_3__/* .BaseStringPromptTemplate */ .L) {
                    const formatted = await prompt.format(inputs);
                    let additionalContentFields;
                    if ("additionalContentFields" in prompt) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        additionalContentFields = prompt.additionalContentFields;
                    }
                    content.push({
                        ...additionalContentFields,
                        type: "text",
                        text: formatted,
                    });
                    /** @TODO replace this */
                    // eslint-disable-next-line no-instanceof/no-instanceof
                }
                else if (prompt instanceof _image_js__WEBPACK_IMPORTED_MODULE_6__/* .ImagePromptTemplate */ .C) {
                    const formatted = await prompt.format(inputs);
                    let additionalContentFields;
                    if ("additionalContentFields" in prompt) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        additionalContentFields = prompt.additionalContentFields;
                    }
                    content.push({
                        ...additionalContentFields,
                        type: "image_url",
                        image_url: formatted,
                    });
                }
            }
            return this.createMessage(content);
        }
    }
    async formatMessages(values) {
        return [await this.format(values)];
    }
}
/**
 * Class that represents a human message prompt template. It extends the
 * BaseMessageStringPromptTemplate.
 * @example
 * ```typescript
 * const message = HumanMessagePromptTemplate.fromTemplate("{text}");
 * const formatted = await message.format({ text: "Hello world!" });
 *
 * const chatPrompt = ChatPromptTemplate.fromMessages([message]);
 * const formattedChatPrompt = await chatPrompt.invoke({
 *   text: "Hello world!",
 * });
 * ```
 */
class HumanMessagePromptTemplate extends _StringImageMessagePromptTemplate {
    static _messageClass() {
        return _messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xc;
    }
    static lc_name() {
        return "HumanMessagePromptTemplate";
    }
}
/**
 * Class that represents an AI message prompt template. It extends the
 * BaseMessageStringPromptTemplate.
 */
class AIMessagePromptTemplate extends _StringImageMessagePromptTemplate {
    static _messageClass() {
        return _messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .AIMessage */ .Od;
    }
    static lc_name() {
        return "AIMessagePromptTemplate";
    }
}
/**
 * Class that represents a system message prompt template. It extends the
 * BaseMessageStringPromptTemplate.
 * @example
 * ```typescript
 * const message = SystemMessagePromptTemplate.fromTemplate("{text}");
 * const formatted = await message.format({ text: "Hello world!" });
 *
 * const chatPrompt = ChatPromptTemplate.fromMessages([message]);
 * const formattedChatPrompt = await chatPrompt.invoke({
 *   text: "Hello world!",
 * });
 * ```
 */
class SystemMessagePromptTemplate extends _StringImageMessagePromptTemplate {
    static _messageClass() {
        return _messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .SystemMessage */ .tn;
    }
    static lc_name() {
        return "SystemMessagePromptTemplate";
    }
}
function _isBaseMessagePromptTemplate(baseMessagePromptTemplateLike) {
    return (typeof baseMessagePromptTemplateLike
        .formatMessages === "function");
}
function _coerceMessagePromptTemplateLike(messagePromptTemplateLike, extra) {
    if (_isBaseMessagePromptTemplate(messagePromptTemplateLike) ||
        (0,_messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .isBaseMessage */ .ny)(messagePromptTemplateLike)) {
        return messagePromptTemplateLike;
    }
    if (Array.isArray(messagePromptTemplateLike) &&
        messagePromptTemplateLike[0] === "placeholder") {
        const messageContent = messagePromptTemplateLike[1];
        if (extra?.templateFormat === "mustache" &&
            typeof messageContent === "string" &&
            messageContent.slice(0, 2) === "{{" &&
            messageContent.slice(-2) === "}}") {
            const variableName = messageContent.slice(2, -2);
            return new MessagesPlaceholder({ variableName, optional: true });
        }
        else if (typeof messageContent === "string" &&
            messageContent[0] === "{" &&
            messageContent[messageContent.length - 1] === "}") {
            const variableName = messageContent.slice(1, -1);
            return new MessagesPlaceholder({ variableName, optional: true });
        }
        throw new Error(`Invalid placeholder template for format ${extra?.templateFormat ?? `"f-string"`}: "${messagePromptTemplateLike[1]}". Expected a variable name surrounded by ${extra?.templateFormat === "mustache" ? "double" : "single"} curly braces.`);
    }
    const message = (0,_messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .coerceMessageLikeToMessage */ .K0)(messagePromptTemplateLike);
    let templateData;
    if (typeof message.content === "string") {
        templateData = message.content;
    }
    else {
        // Assuming message.content is an array of complex objects, transform it.
        templateData = message.content.map((item) => {
            if ("text" in item) {
                return { ...item, text: item.text };
            }
            else if ("image_url" in item) {
                return { ...item, image_url: item.image_url };
            }
            else {
                return item;
            }
        });
    }
    if (message._getType() === "human") {
        return HumanMessagePromptTemplate.fromTemplate(templateData, extra);
    }
    else if (message._getType() === "ai") {
        return AIMessagePromptTemplate.fromTemplate(templateData, extra);
    }
    else if (message._getType() === "system") {
        return SystemMessagePromptTemplate.fromTemplate(templateData, extra);
    }
    else if (_messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .ChatMessage */ .cM.isInstance(message)) {
        return ChatMessagePromptTemplate.fromTemplate(message.content, message.role, extra);
    }
    else {
        throw new Error(`Could not coerce message prompt template from input. Received message type: "${message._getType()}".`);
    }
}
function isMessagesPlaceholder(x) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return x.constructor.lc_name() === "MessagesPlaceholder";
}
/**
 * Class that represents a chat prompt. It extends the
 * BaseChatPromptTemplate and uses an array of BaseMessagePromptTemplate
 * instances to format a series of messages for a conversation.
 * @example
 * ```typescript
 * const message = SystemMessagePromptTemplate.fromTemplate("{text}");
 * const chatPrompt = ChatPromptTemplate.fromMessages([
 *   ["ai", "You are a helpful assistant."],
 *   message,
 * ]);
 * const formattedChatPrompt = await chatPrompt.invoke({
 *   text: "Hello world!",
 * });
 * ```
 */
class ChatPromptTemplate extends BaseChatPromptTemplate {
    static lc_name() {
        return "ChatPromptTemplate";
    }
    get lc_aliases() {
        return {
            promptMessages: "messages",
        };
    }
    constructor(input) {
        super(input);
        Object.defineProperty(this, "promptMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "templateFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "f-string"
        });
        // If input is mustache and validateTemplate is not defined, set it to false
        if (input.templateFormat === "mustache" &&
            input.validateTemplate === undefined) {
            this.validateTemplate = false;
        }
        Object.assign(this, input);
        if (this.validateTemplate) {
            const inputVariablesMessages = new Set();
            for (const promptMessage of this.promptMessages) {
                // eslint-disable-next-line no-instanceof/no-instanceof
                if (promptMessage instanceof _messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessage */ .XQ)
                    continue;
                for (const inputVariable of promptMessage.inputVariables) {
                    inputVariablesMessages.add(inputVariable);
                }
            }
            const totalInputVariables = this.inputVariables;
            const inputVariablesInstance = new Set(this.partialVariables
                ? totalInputVariables.concat(Object.keys(this.partialVariables))
                : totalInputVariables);
            const difference = new Set([...inputVariablesInstance].filter((x) => !inputVariablesMessages.has(x)));
            if (difference.size > 0) {
                throw new Error(`Input variables \`${[
                    ...difference,
                ]}\` are not used in any of the prompt messages.`);
            }
            const otherDifference = new Set([...inputVariablesMessages].filter((x) => !inputVariablesInstance.has(x)));
            if (otherDifference.size > 0) {
                throw new Error(`Input variables \`${[
                    ...otherDifference,
                ]}\` are used in prompt messages but not in the prompt template.`);
            }
        }
    }
    _getPromptType() {
        return "chat";
    }
    async _parseImagePrompts(message, inputValues) {
        if (typeof message.content === "string") {
            return message;
        }
        const formattedMessageContent = await Promise.all(message.content.map(async (item) => {
            if (item.type !== "image_url") {
                return item;
            }
            let imageUrl = "";
            if (typeof item.image_url === "string") {
                imageUrl = item.image_url;
            }
            else {
                imageUrl = item.image_url.url;
            }
            const promptTemplatePlaceholder = _prompt_js__WEBPACK_IMPORTED_MODULE_5__.PromptTemplate.fromTemplate(imageUrl, {
                templateFormat: this.templateFormat,
            });
            const formattedUrl = await promptTemplatePlaceholder.format(inputValues);
            if (typeof item.image_url !== "string" && "url" in item.image_url) {
                // eslint-disable-next-line no-param-reassign
                item.image_url.url = formattedUrl;
            }
            else {
                // eslint-disable-next-line no-param-reassign
                item.image_url = formattedUrl;
            }
            return item;
        }));
        // eslint-disable-next-line no-param-reassign
        message.content = formattedMessageContent;
        return message;
    }
    async formatMessages(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        let resultMessages = [];
        for (const promptMessage of this.promptMessages) {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (promptMessage instanceof _messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessage */ .XQ) {
                resultMessages.push(await this._parseImagePrompts(promptMessage, allValues));
            }
            else {
                const inputValues = promptMessage.inputVariables.reduce((acc, inputVariable) => {
                    if (!(inputVariable in allValues) &&
                        !(isMessagesPlaceholder(promptMessage) && promptMessage.optional)) {
                        const error = (0,_errors_index_js__WEBPACK_IMPORTED_MODULE_8__/* .addLangChainErrorFields */ .Y)(new Error(`Missing value for input variable \`${inputVariable.toString()}\``), "INVALID_PROMPT_INPUT");
                        throw error;
                    }
                    acc[inputVariable] = allValues[inputVariable];
                    return acc;
                }, {});
                const message = await promptMessage.formatMessages(inputValues);
                resultMessages = resultMessages.concat(message);
            }
        }
        return resultMessages;
    }
    async partial(values) {
        // This is implemented in a way it doesn't require making
        // BaseMessagePromptTemplate aware of .partial()
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
        return new ChatPromptTemplate(promptDict);
    }
    static fromTemplate(template, options) {
        const prompt = _prompt_js__WEBPACK_IMPORTED_MODULE_5__.PromptTemplate.fromTemplate(template, options);
        const humanTemplate = new HumanMessagePromptTemplate({ prompt });
        return this.fromMessages([humanTemplate]);
    }
    /**
     * Create a chat model-specific prompt from individual chat messages
     * or message-like tuples.
     * @param promptMessages Messages to be passed to the chat model
     * @returns A new ChatPromptTemplate
     */
    static fromMessages(promptMessages, extra) {
        const flattenedMessages = promptMessages.reduce((acc, promptMessage) => acc.concat(
        // eslint-disable-next-line no-instanceof/no-instanceof
        promptMessage instanceof ChatPromptTemplate
            ? promptMessage.promptMessages
            : [
                _coerceMessagePromptTemplateLike(promptMessage, extra),
            ]), []);
        const flattenedPartialVariables = promptMessages.reduce((acc, promptMessage) => 
        // eslint-disable-next-line no-instanceof/no-instanceof
        promptMessage instanceof ChatPromptTemplate
            ? Object.assign(acc, promptMessage.partialVariables)
            : acc, Object.create(null));
        const inputVariables = new Set();
        for (const promptMessage of flattenedMessages) {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (promptMessage instanceof _messages_index_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseMessage */ .XQ)
                continue;
            for (const inputVariable of promptMessage.inputVariables) {
                if (inputVariable in flattenedPartialVariables) {
                    continue;
                }
                inputVariables.add(inputVariable);
            }
        }
        return new this({
            ...extra,
            inputVariables: [...inputVariables],
            promptMessages: flattenedMessages,
            partialVariables: flattenedPartialVariables,
            templateFormat: extra?.templateFormat,
        });
    }
    /** @deprecated Renamed to .fromMessages */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromPromptMessages(promptMessages) {
        return this.fromMessages(promptMessages);
    }
}


/***/ }),

/***/ 92430:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FewShotPromptTemplate: () => (/* binding */ FewShotPromptTemplate)
/* harmony export */ });
/* unused harmony export FewShotChatMessagePromptTemplate */
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3748);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36574);
/* harmony import */ var _prompt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68531);
/* harmony import */ var _chat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46612);




/**
 * Prompt template that contains few-shot examples.
 * @augments BasePromptTemplate
 * @augments FewShotPromptTemplateInput
 * @example
 * ```typescript
 * const examplePrompt = PromptTemplate.fromTemplate(
 *   "Input: {input}\nOutput: {output}",
 * );
 *
 * const exampleSelector = await SemanticSimilarityExampleSelector.fromExamples(
 *   [
 *     { input: "happy", output: "sad" },
 *     { input: "tall", output: "short" },
 *     { input: "energetic", output: "lethargic" },
 *     { input: "sunny", output: "gloomy" },
 *     { input: "windy", output: "calm" },
 *   ],
 *   new OpenAIEmbeddings(),
 *   HNSWLib,
 *   { k: 1 },
 * );
 *
 * const dynamicPrompt = new FewShotPromptTemplate({
 *   exampleSelector,
 *   examplePrompt,
 *   prefix: "Give the antonym of every input",
 *   suffix: "Input: {adjective}\nOutput:",
 *   inputVariables: ["adjective"],
 * });
 *
 * // Format the dynamic prompt with the input 'rainy'
 * console.log(await dynamicPrompt.format({ adjective: "rainy" }));
 *
 * ```
 */
class FewShotPromptTemplate extends _string_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseStringPromptTemplate */ .L {
    constructor(input) {
        super(input);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "examples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleSelector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "examplePrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "suffix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "exampleSeparator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "\n\n"
        });
        Object.defineProperty(this, "prefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
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
        Object.assign(this, input);
        if (this.examples !== undefined && this.exampleSelector !== undefined) {
            throw new Error("Only one of 'examples' and 'example_selector' should be provided");
        }
        if (this.examples === undefined && this.exampleSelector === undefined) {
            throw new Error("One of 'examples' and 'example_selector' should be provided");
        }
        if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
                totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .checkValidTemplate */ .Ns)(this.prefix + this.suffix, this.templateFormat, totalInputVariables);
        }
    }
    _getPromptType() {
        return "few_shot";
    }
    static lc_name() {
        return "FewShotPromptTemplate";
    }
    async getExamples(inputVariables) {
        if (this.examples !== undefined) {
            return this.examples;
        }
        if (this.exampleSelector !== undefined) {
            return this.exampleSelector.selectExamples(inputVariables);
        }
        throw new Error("One of 'examples' and 'example_selector' should be provided");
    }
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
        return new FewShotPromptTemplate(promptDict);
    }
    /**
     * Formats the prompt with the given values.
     * @param values The values to format the prompt with.
     * @returns A promise that resolves to a string representing the formatted prompt.
     */
    async format(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        const examples = await this.getExamples(allValues);
        const exampleStrings = await Promise.all(examples.map((example) => this.examplePrompt.format(example)));
        const template = [this.prefix, ...exampleStrings, this.suffix].join(this.exampleSeparator);
        return (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .renderTemplate */ .Xm)(template, this.templateFormat, allValues);
    }
    serialize() {
        if (this.exampleSelector || !this.examples) {
            throw new Error("Serializing an example selector is not currently supported");
        }
        if (this.outputParser !== undefined) {
            throw new Error("Serializing an output parser is not currently supported");
        }
        return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            example_prompt: this.examplePrompt.serialize(),
            example_separator: this.exampleSeparator,
            suffix: this.suffix,
            prefix: this.prefix,
            template_format: this.templateFormat,
            examples: this.examples,
        };
    }
    static async deserialize(data) {
        const { example_prompt } = data;
        if (!example_prompt) {
            throw new Error("Missing example prompt");
        }
        const examplePrompt = await _prompt_js__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.deserialize(example_prompt);
        let examples;
        if (Array.isArray(data.examples)) {
            examples = data.examples;
        }
        else {
            throw new Error("Invalid examples format. Only list or string are supported.");
        }
        return new FewShotPromptTemplate({
            inputVariables: data.input_variables,
            examplePrompt,
            examples,
            exampleSeparator: data.example_separator,
            prefix: data.prefix,
            suffix: data.suffix,
            templateFormat: data.template_format,
        });
    }
}
/**
 * Chat prompt template that contains few-shot examples.
 * @augments BasePromptTemplateInput
 * @augments FewShotChatMessagePromptTemplateInput
 */
class FewShotChatMessagePromptTemplate extends _chat_js__WEBPACK_IMPORTED_MODULE_3__/* .BaseChatPromptTemplate */ .qF {
    _getPromptType() {
        return "few_shot_chat";
    }
    static lc_name() {
        return "FewShotChatMessagePromptTemplate";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "examples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleSelector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "examplePrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "suffix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "exampleSeparator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "\n\n"
        });
        Object.defineProperty(this, "prefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
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
        this.examples = fields.examples;
        this.examplePrompt = fields.examplePrompt;
        this.exampleSeparator = fields.exampleSeparator ?? "\n\n";
        this.exampleSelector = fields.exampleSelector;
        this.prefix = fields.prefix ?? "";
        this.suffix = fields.suffix ?? "";
        this.templateFormat = fields.templateFormat ?? "f-string";
        this.validateTemplate = fields.validateTemplate ?? true;
        if (this.examples !== undefined && this.exampleSelector !== undefined) {
            throw new Error("Only one of 'examples' and 'example_selector' should be provided");
        }
        if (this.examples === undefined && this.exampleSelector === undefined) {
            throw new Error("One of 'examples' and 'example_selector' should be provided");
        }
        if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
                totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .checkValidTemplate */ .Ns)(this.prefix + this.suffix, this.templateFormat, totalInputVariables);
        }
    }
    async getExamples(inputVariables) {
        if (this.examples !== undefined) {
            return this.examples;
        }
        if (this.exampleSelector !== undefined) {
            return this.exampleSelector.selectExamples(inputVariables);
        }
        throw new Error("One of 'examples' and 'example_selector' should be provided");
    }
    /**
     * Formats the list of values and returns a list of formatted messages.
     * @param values The values to format the prompt with.
     * @returns A promise that resolves to a string representing the formatted prompt.
     */
    async formatMessages(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        let examples = await this.getExamples(allValues);
        examples = examples.map((example) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = {};
            this.examplePrompt.inputVariables.forEach((inputVariable) => {
                result[inputVariable] = example[inputVariable];
            });
            return result;
        });
        const messages = [];
        for (const example of examples) {
            const exampleMessages = await this.examplePrompt.formatMessages(example);
            messages.push(...exampleMessages);
        }
        return messages;
    }
    /**
     * Formats the prompt with the given values.
     * @param values The values to format the prompt with.
     * @returns A promise that resolves to a string representing the formatted prompt.
     */
    async format(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        const examples = await this.getExamples(allValues);
        const exampleMessages = await Promise.all(examples.map((example) => this.examplePrompt.formatMessages(example)));
        const exampleStrings = exampleMessages
            .flat()
            .map((message) => message.content);
        const template = [this.prefix, ...exampleStrings, this.suffix].join(this.exampleSeparator);
        return (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .renderTemplate */ .Xm)(template, this.templateFormat, allValues);
    }
    /**
     * Partially formats the prompt with the given values.
     * @param values The values to partially format the prompt with.
     * @returns A promise that resolves to an instance of `FewShotChatMessagePromptTemplate` with the given values partially formatted.
     */
    async partial(values) {
        const newInputVariables = this.inputVariables.filter((variable) => !(variable in values));
        const newPartialVariables = {
            ...(this.partialVariables ?? {}),
            ...values,
        };
        const promptDict = {
            ...this,
            inputVariables: newInputVariables,
            partialVariables: newPartialVariables,
        };
        return new FewShotChatMessagePromptTemplate(promptDict);
    }
}


/***/ }),

/***/ 99848:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ ImagePromptTemplate)
/* harmony export */ });
/* harmony import */ var _prompt_values_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49484);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1776);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36574);



/**
 * An image prompt template for a multimodal model.
 */
class ImagePromptTemplate extends _base_js__WEBPACK_IMPORTED_MODULE_1__/* .BasePromptTemplate */ .m {
    static lc_name() {
        return "ImagePromptTemplate";
    }
    constructor(input) {
        super(input);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "prompts", "image"]
        });
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
        this.template = input.template;
        this.templateFormat = input.templateFormat ?? this.templateFormat;
        this.validateTemplate = input.validateTemplate ?? this.validateTemplate;
        this.additionalContentFields = input.additionalContentFields;
        if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
                totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            (0,_template_js__WEBPACK_IMPORTED_MODULE_2__/* .checkValidTemplate */ .Ns)([
                { type: "image_url", image_url: this.template },
            ], this.templateFormat, totalInputVariables);
        }
    }
    _getPromptType() {
        return "prompt";
    }
    /**
     * Partially applies values to the prompt template.
     * @param values The values to be partially applied to the prompt template.
     * @returns A new instance of ImagePromptTemplate with the partially applied values.
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
        return new ImagePromptTemplate(promptDict);
    }
    /**
     * Formats the prompt template with the provided values.
     * @param values The values to be used to format the prompt template.
     * @returns A promise that resolves to a string which is the formatted prompt.
     */
    async format(values) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted = {};
        for (const [key, value] of Object.entries(this.template)) {
            if (typeof value === "string") {
                formatted[key] = (0,_template_js__WEBPACK_IMPORTED_MODULE_2__/* .renderTemplate */ .Xm)(value, this.templateFormat, values);
            }
            else {
                formatted[key] = value;
            }
        }
        const url = values.url || formatted.url;
        const detail = values.detail || formatted.detail;
        if (!url) {
            throw new Error("Must provide either an image URL.");
        }
        if (typeof url !== "string") {
            throw new Error("url must be a string.");
        }
        const output = { url };
        if (detail) {
            output.detail = detail;
        }
        return output;
    }
    /**
     * Formats the prompt given the input values and returns a formatted
     * prompt value.
     * @param values The input values to format the prompt.
     * @returns A Promise that resolves to a formatted prompt value.
     */
    async formatPromptValue(values) {
        const formattedPrompt = await this.format(values);
        return new _prompt_values_js__WEBPACK_IMPORTED_MODULE_0__/* .ImagePromptValue */ .vX(formattedPrompt);
    }
}


/***/ })

};
