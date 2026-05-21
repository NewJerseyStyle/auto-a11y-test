export const id = 479;
export const ids = [479];
export const modules = {

/***/ 34479:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ZeroShotAgent: () => (/* binding */ ZeroShotAgent)
});

// EXTERNAL MODULE: ./node_modules/@langchain/core/prompts.js + 3 modules
var prompts = __webpack_require__(36100);
// EXTERNAL MODULE: ./node_modules/langchain/dist/chains/llm_chain.js + 1 modules
var llm_chain = __webpack_require__(47064);
// EXTERNAL MODULE: ./node_modules/@langchain/core/dist/load/serializable.js + 1 modules
var serializable = __webpack_require__(93113);
;// CONCATENATED MODULE: ./node_modules/@langchain/core/load/serializable.js

// EXTERNAL MODULE: ./node_modules/@langchain/core/runnables.js
var core_runnables = __webpack_require__(85258);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/agents/agent.js


/**
 * Error class for parse errors in LangChain. Contains information about
 * the error message and the output that caused the error.
 */
class ParseError extends Error {
    constructor(msg, output) {
        super(msg);
        Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.output = output;
    }
}
/**
 * Abstract base class for agents in LangChain. Provides common
 * functionality for agents, such as handling inputs and outputs.
 */
class BaseAgent extends serializable/* Serializable */.y {
    get returnValues() {
        return ["output"];
    }
    get allowedTools() {
        return undefined;
    }
    /**
     * Return the string type key uniquely identifying this class of agent.
     */
    _agentType() {
        throw new Error("Not implemented");
    }
    /**
     * Return response when agent has been stopped due to max iterations
     */
    returnStoppedResponse(earlyStoppingMethod, _steps, _inputs, _callbackManager) {
        if (earlyStoppingMethod === "force") {
            return Promise.resolve({
                returnValues: { output: "Agent stopped due to max iterations." },
                log: "",
            });
        }
        throw new Error(`Invalid stopping method: ${earlyStoppingMethod}`);
    }
    /**
     * Prepare the agent for output, if needed
     */
    async prepareForOutput(_returnValues, _steps) {
        return {};
    }
}
/**
 * Abstract base class for single action agents in LangChain. Extends the
 * BaseAgent class and provides additional functionality specific to
 * single action agents.
 */
class BaseSingleActionAgent extends BaseAgent {
    _agentActionType() {
        return "single";
    }
}
/**
 * Abstract base class for multi-action agents in LangChain. Extends the
 * BaseAgent class and provides additional functionality specific to
 * multi-action agents.
 */
class BaseMultiActionAgent extends BaseAgent {
    _agentActionType() {
        return "multi";
    }
}
function isAgentAction(input) {
    return !Array.isArray(input) && input?.tool !== undefined;
}
function isRunnableAgent(x) {
    return (x.runnable !==
        undefined);
}
// TODO: Remove in the future. Only for backwards compatibility.
// Allows for the creation of runnables with properties that will
// be passed to the agent executor constructor.
class AgentRunnableSequence extends core_runnables/* RunnableSequence */.zZ {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "streamRunnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "singleAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromRunnables([first, ...runnables], config) {
        const sequence = core_runnables/* RunnableSequence */.zZ.from([first, ...runnables], config.name);
        sequence.singleAction = config.singleAction;
        sequence.streamRunnable = config.streamRunnable;
        return sequence;
    }
    static isAgentRunnableSequence(x) {
        return typeof x.singleAction === "boolean";
    }
}
/**
 * Class representing a single-action agent powered by runnables.
 * Extends the BaseSingleActionAgent class and provides methods for
 * planning agent actions with runnables.
 */
class RunnableSingleActionAgent extends BaseSingleActionAgent {
    get inputKeys() {
        return [];
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "runnable"]
        });
        Object.defineProperty(this, "runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether to stream from the runnable or not.
         * If true, the underlying LLM is invoked in a streaming fashion to make it
         * possible to get access to the individual LLM tokens when using
         * `streamLog` with the Agent Executor. If false then LLM is invoked in a
         * non-streaming fashion and individual LLM tokens will not be available
         * in `streamLog`.
         *
         * Note that the runnable should still only stream a single action or
         * finish chunk.
         */
        Object.defineProperty(this, "streamRunnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "defaultRunName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "RunnableAgent"
        });
        this.runnable = fields.runnable;
        this.defaultRunName =
            fields.defaultRunName ?? this.runnable.name ?? this.defaultRunName;
        this.streamRunnable = fields.streamRunnable ?? this.streamRunnable;
    }
    async plan(steps, inputs, callbackManager, config) {
        const combinedInput = { ...inputs, steps };
        const combinedConfig = (0,core_runnables/* patchConfig */.tn)(config, {
            callbacks: callbackManager,
            runName: this.defaultRunName,
        });
        if (this.streamRunnable) {
            const stream = await this.runnable.stream(combinedInput, combinedConfig);
            let finalOutput;
            for await (const chunk of stream) {
                if (finalOutput === undefined) {
                    finalOutput = chunk;
                }
                else {
                    throw new Error([
                        `Multiple agent actions/finishes received in streamed agent output.`,
                        `Set "streamRunnable: false" when initializing the agent to invoke this agent in non-streaming mode.`,
                    ].join("\n"));
                }
            }
            if (finalOutput === undefined) {
                throw new Error([
                    "No streaming output received from underlying runnable.",
                    `Set "streamRunnable: false" when initializing the agent to invoke this agent in non-streaming mode.`,
                ].join("\n"));
            }
            return finalOutput;
        }
        else {
            return this.runnable.invoke(combinedInput, combinedConfig);
        }
    }
}
/**
 * Class representing a multi-action agent powered by runnables.
 * Extends the BaseMultiActionAgent class and provides methods for
 * planning agent actions with runnables.
 */
class RunnableMultiActionAgent extends BaseMultiActionAgent {
    get inputKeys() {
        return [];
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "runnable"]
        });
        // TODO: Rename input to "intermediate_steps"
        Object.defineProperty(this, "runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultRunName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "RunnableAgent"
        });
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streamRunnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        this.runnable = fields.runnable;
        this.stop = fields.stop;
        this.defaultRunName =
            fields.defaultRunName ?? this.runnable.name ?? this.defaultRunName;
        this.streamRunnable = fields.streamRunnable ?? this.streamRunnable;
    }
    async plan(steps, inputs, callbackManager, config) {
        const combinedInput = { ...inputs, steps };
        const combinedConfig = (0,core_runnables/* patchConfig */.tn)(config, {
            callbacks: callbackManager,
            runName: this.defaultRunName,
        });
        let output;
        if (this.streamRunnable) {
            const stream = await this.runnable.stream(combinedInput, combinedConfig);
            let finalOutput;
            for await (const chunk of stream) {
                if (finalOutput === undefined) {
                    finalOutput = chunk;
                }
                else {
                    throw new Error([
                        `Multiple agent actions/finishes received in streamed agent output.`,
                        `Set "streamRunnable: false" when initializing the agent to invoke this agent in non-streaming mode.`,
                    ].join("\n"));
                }
            }
            if (finalOutput === undefined) {
                throw new Error([
                    "No streaming output received from underlying runnable.",
                    `Set "streamRunnable: false" when initializing the agent to invoke this agent in non-streaming mode.`,
                ].join("\n"));
            }
            output = finalOutput;
        }
        else {
            output = await this.runnable.invoke(combinedInput, combinedConfig);
        }
        if (isAgentAction(output)) {
            return [output];
        }
        return output;
    }
}
/** @deprecated Renamed to RunnableMultiActionAgent. */
class RunnableAgent extends (/* unused pure expression or super */ null && (RunnableMultiActionAgent)) {
}
/**
 * Class representing a single action agent using a LLMChain in LangChain.
 * Extends the BaseSingleActionAgent class and provides methods for
 * planning agent actions based on LLMChain outputs.
 * @example
 * ```typescript
 * const customPromptTemplate = new CustomPromptTemplate({
 *   tools: [new Calculator()],
 *   inputVariables: ["input", "agent_scratchpad"],
 * });
 * const customOutputParser = new CustomOutputParser();
 * const agent = new LLMSingleActionAgent({
 *   llmChain: new LLMChain({
 *     prompt: customPromptTemplate,
 *     llm: new ChatOpenAI({ temperature: 0 }),
 *   }),
 *   outputParser: customOutputParser,
 *   stop: ["\nObservation"],
 * });
 * const executor = new AgentExecutor({
 *   agent,
 *   tools: [new Calculator()],
 * });
 * const result = await executor.invoke({
 *   input:
 *     "Who is Olivia Wilde's boyfriend? What is his current age raised to the 0.23 power?",
 * });
 * ```
 */
class LLMSingleActionAgent extends BaseSingleActionAgent {
    constructor(input) {
        super(input);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents"]
        });
        Object.defineProperty(this, "llmChain", {
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
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.stop = input.stop;
        this.llmChain = input.llmChain;
        this.outputParser = input.outputParser;
    }
    get inputKeys() {
        return this.llmChain.inputKeys;
    }
    /**
     * Decide what to do given some input.
     *
     * @param steps - Steps the LLM has taken so far, along with observations from each.
     * @param inputs - User inputs.
     * @param callbackManager - Callback manager.
     *
     * @returns Action specifying what tool to use.
     */
    async plan(steps, inputs, callbackManager) {
        const output = await this.llmChain.call({
            intermediate_steps: steps,
            stop: this.stop,
            ...inputs,
        }, callbackManager);
        return this.outputParser.parse(output[this.llmChain.outputKey], callbackManager);
    }
}
/**
 * Class responsible for calling a language model and deciding an action.
 *
 * @remarks This is driven by an LLMChain. The prompt in the LLMChain *must*
 * include a variable called "agent_scratchpad" where the agent can put its
 * intermediary work.
 *
 * @deprecated Use {@link https://js.langchain.com/docs/modules/agents/agent_types/ | new agent creation methods}.
 */
class Agent extends BaseSingleActionAgent {
    get allowedTools() {
        return this._allowedTools;
    }
    get inputKeys() {
        return this.llmChain.inputKeys.filter((k) => k !== "agent_scratchpad");
    }
    constructor(input) {
        super(input);
        Object.defineProperty(this, "llmChain", {
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
        Object.defineProperty(this, "_allowedTools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        this.llmChain = input.llmChain;
        this._allowedTools = input.allowedTools;
        this.outputParser = input.outputParser;
    }
    /**
     * Get the default output parser for this agent.
     */
    static getDefaultOutputParser(_fields) {
        throw new Error("Not implemented");
    }
    /**
     * Create a prompt for this class
     *
     * @param _tools - List of tools the agent will have access to, used to format the prompt.
     * @param _fields - Additional fields used to format the prompt.
     *
     * @returns A PromptTemplate assembled from the given tools and fields.
     * */
    static createPrompt(_tools, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fields) {
        throw new Error("Not implemented");
    }
    /** Construct an agent from an LLM and a list of tools */
    static fromLLMAndTools(_llm, _tools, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _args) {
        throw new Error("Not implemented");
    }
    /**
     * Validate that appropriate tools are passed in
     */
    static validateTools(_tools) { }
    _stop() {
        return [`\n${this.observationPrefix()}`];
    }
    /**
     * Name of tool to use to terminate the chain.
     */
    finishToolName() {
        return "Final Answer";
    }
    /**
     * Construct a scratchpad to let the agent continue its thought process
     */
    async constructScratchPad(steps) {
        return steps.reduce((thoughts, { action, observation }) => thoughts +
            [
                action.log,
                `${this.observationPrefix()}${observation}`,
                this.llmPrefix(),
            ].join("\n"), "");
    }
    async _plan(steps, inputs, suffix, callbackManager) {
        const thoughts = await this.constructScratchPad(steps);
        const newInputs = {
            ...inputs,
            agent_scratchpad: suffix ? `${thoughts}${suffix}` : thoughts,
        };
        if (this._stop().length !== 0) {
            newInputs.stop = this._stop();
        }
        const output = await this.llmChain.predict(newInputs, callbackManager);
        if (!this.outputParser) {
            throw new Error("Output parser not set");
        }
        return this.outputParser.parse(output, callbackManager);
    }
    /**
     * Decide what to do given some input.
     *
     * @param steps - Steps the LLM has taken so far, along with observations from each.
     * @param inputs - User inputs.
     * @param callbackManager - Callback manager to use for this call.
     *
     * @returns Action specifying what tool to use.
     */
    plan(steps, inputs, callbackManager) {
        return this._plan(steps, inputs, undefined, callbackManager);
    }
    /**
     * Return response when agent has been stopped due to max iterations
     */
    async returnStoppedResponse(earlyStoppingMethod, steps, inputs, callbackManager) {
        if (earlyStoppingMethod === "force") {
            return {
                returnValues: { output: "Agent stopped due to max iterations." },
                log: "",
            };
        }
        if (earlyStoppingMethod === "generate") {
            try {
                const action = await this._plan(steps, inputs, "\n\nI now need to return a final answer based on the previous steps:", callbackManager);
                if ("returnValues" in action) {
                    return action;
                }
                return { returnValues: { output: action.log }, log: action.log };
            }
            catch (err) {
                // fine to use instanceof because we're in the same module
                // eslint-disable-next-line no-instanceof/no-instanceof
                if (!(err instanceof ParseError)) {
                    throw err;
                }
                return { returnValues: { output: err.output }, log: err.output };
            }
        }
        throw new Error(`Invalid stopping method: ${earlyStoppingMethod}`);
    }
    /**
     * Load an agent from a json-like object describing it.
     */
    static async deserialize(data) {
        switch (data._type) {
            case "zero-shot-react-description": {
                const { ZeroShotAgent } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 34479));
                return ZeroShotAgent.deserialize(data);
            }
            default:
                throw new Error("Unknown agent type");
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/agents/helpers.js

const deserializeHelper = async (llm, tools, data, fromLLMAndTools, fromConstructor) => {
    if (data.load_from_llm_and_tools) {
        if (!llm) {
            throw new Error("Loading from llm and tools, llm must be provided.");
        }
        if (!tools) {
            throw new Error("Loading from llm and tools, tools must be provided.");
        }
        return fromLLMAndTools(llm, tools, data);
    }
    if (!data.llm_chain) {
        throw new Error("Loading from constructor, llm_chain must be provided.");
    }
    const llmChain = await llm_chain.LLMChain.deserialize(data.llm_chain);
    return fromConstructor({ ...data, llmChain });
};

// EXTERNAL MODULE: ./node_modules/@langchain/core/output_parsers.js + 18 modules
var output_parsers = __webpack_require__(52801);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/agents/types.js

/**
 * Abstract class representing an output parser specifically for agent
 * actions and finishes in LangChain. It extends the `BaseOutputParser`
 * class.
 */
class AgentActionOutputParser extends output_parsers/* BaseOutputParser */.mJ {
}
/**
 * Abstract class representing an output parser specifically for agents
 * that return multiple actions.
 */
class AgentMultiActionOutputParser extends (/* unused pure expression or super */ null && (BaseOutputParser)) {
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/agents/mrkl/prompt.js
const PREFIX = `Answer the following questions as best you can. You have access to the following tools:`;
const FORMAT_INSTRUCTIONS = `Use the following format in your response:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question`;
const SUFFIX = `Begin!

Question: {input}
Thought:{agent_scratchpad}`;

;// CONCATENATED MODULE: ./node_modules/langchain/dist/agents/mrkl/outputParser.js



const FINAL_ANSWER_ACTION = "Final Answer:";
/**
 * A class that extends `AgentActionOutputParser` to provide a custom
 * implementation for parsing the output of a ZeroShotAgent action.
 */
class ZeroShotAgentOutputParser extends AgentActionOutputParser {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "mrkl"]
        });
        Object.defineProperty(this, "finishToolName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.finishToolName = fields?.finishToolName || FINAL_ANSWER_ACTION;
    }
    /**
     * Parses the text output of an agent action, extracting the tool, tool
     * input, and output.
     * @param text The text output of an agent action.
     * @returns An object containing the tool, tool input, and output extracted from the text, along with the original text as a log.
     */
    async parse(text) {
        if (text.includes(this.finishToolName)) {
            const parts = text.split(this.finishToolName);
            const output = parts[parts.length - 1].trim();
            return {
                returnValues: { output },
                log: text,
            };
        }
        const match = /Action:([\s\S]*?)(?:\nAction Input:([\s\S]*?))?$/.exec(text);
        if (!match) {
            throw new output_parsers/* OutputParserException */.CC(`Could not parse LLM output: ${text}`);
        }
        return {
            tool: match[1].trim(),
            toolInput: match[2]
                ? match[2].trim().replace(/^("+)(.*?)(\1)$/, "$2")
                : "",
            log: text,
        };
    }
    /**
     * Returns the format instructions for parsing the output of an agent
     * action in the style of the ZeroShotAgent.
     * @returns The format instructions for parsing the output.
     */
    getFormatInstructions() {
        return FORMAT_INSTRUCTIONS;
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/agents/mrkl/index.js






/**
 * Agent for the MRKL chain.
 * @augments Agent
 * @example
 * ```typescript
 *
 * const agent = new ZeroShotAgent({
 *   llmChain: new LLMChain({
 *     llm: new ChatOpenAI({ temperature: 0 }),
 *     prompt: ZeroShotAgent.createPrompt([new SerpAPI(), new Calculator()], {
 *       prefix: `Answer the following questions as best you can, but speaking as a pirate might speak. You have access to the following tools:`,
 *       suffix: `Begin! Remember to speak as a pirate when giving your final answer. Use lots of "Args"
 * Question: {input}
 * {agent_scratchpad}`,
 *       inputVariables: ["input", "agent_scratchpad"],
 *     }),
 *   }),
 *   allowedTools: ["search", "calculator"],
 * });
 *
 * const result = await agent.invoke({
 *   input: `Who is Olivia Wilde's boyfriend? What is his current age raised to the 0.23 power?`,
 * });
 * ```
 *
 * @deprecated Use the {@link https://api.js.langchain.com/functions/langchain.agents.createReactAgent.html | createReactAgent method instead}.
 */
class ZeroShotAgent extends Agent {
    static lc_name() {
        return "ZeroShotAgent";
    }
    constructor(input) {
        const outputParser = input?.outputParser ?? ZeroShotAgent.getDefaultOutputParser();
        super({ ...input, outputParser });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "mrkl"]
        });
    }
    _agentType() {
        return "zero-shot-react-description";
    }
    observationPrefix() {
        return "Observation: ";
    }
    llmPrefix() {
        return "Thought:";
    }
    /**
     * Returns the default output parser for the ZeroShotAgent.
     * @param fields Optional arguments for the output parser.
     * @returns An instance of ZeroShotAgentOutputParser.
     */
    static getDefaultOutputParser(fields) {
        return new ZeroShotAgentOutputParser(fields);
    }
    /**
     * Validates the tools for the ZeroShotAgent. Throws an error if any tool
     * does not have a description.
     * @param tools List of tools to validate.
     */
    static validateTools(tools) {
        const descriptionlessTool = tools.find((tool) => !tool.description);
        if (descriptionlessTool) {
            const msg = `Got a tool ${descriptionlessTool.name} without a description.` +
                ` This agent requires descriptions for all tools.`;
            throw new Error(msg);
        }
    }
    /**
     * Create prompt in the style of the zero shot agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     * @param args.inputVariables - List of input variables the final prompt will expect.
     */
    static createPrompt(tools, args) {
        const { prefix = PREFIX, suffix = SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
        const toolStrings = tools
            .map((tool) => `${tool.name}: ${tool.description}`)
            .join("\n");
        const toolNames = tools.map((tool) => `"${tool.name}"`).join(", ");
        const formatInstructions = (0,prompts/* renderTemplate */.Xm)(FORMAT_INSTRUCTIONS, "f-string", {
            tool_names: toolNames,
        });
        const template = [prefix, toolStrings, formatInstructions, suffix].join("\n\n");
        return new prompts/* PromptTemplate */.Hh({
            template,
            inputVariables,
        });
    }
    /**
     * Creates a ZeroShotAgent from a Large Language Model and a set of tools.
     * @param llm The Large Language Model to use.
     * @param tools The tools for the agent to use.
     * @param args Optional arguments for creating the agent.
     * @returns A new instance of ZeroShotAgent.
     */
    static fromLLMAndTools(llm, tools, args) {
        ZeroShotAgent.validateTools(tools);
        const prompt = ZeroShotAgent.createPrompt(tools, args);
        const outputParser = args?.outputParser ?? ZeroShotAgent.getDefaultOutputParser();
        const chain = new llm_chain.LLMChain({
            prompt,
            llm,
            callbacks: args?.callbacks ?? args?.callbackManager,
        });
        return new ZeroShotAgent({
            llmChain: chain,
            allowedTools: tools.map((t) => t.name),
            outputParser,
        });
    }
    static async deserialize(data) {
        const { llm, tools, ...rest } = data;
        return deserializeHelper(llm, tools, rest, (llm, tools, args) => ZeroShotAgent.fromLLMAndTools(llm, tools, {
            prefix: args.prefix,
            suffix: args.suffix,
            inputVariables: args.input_variables,
        }), (args) => new ZeroShotAgent(args));
    }
}


/***/ })

};
