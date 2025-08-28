import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import { webkit } from 'playwright';
import { nvda } from '@guidepup/nvda';
import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { tool } from '@langchain/core/tools';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';

async function run() {
  const failures = [];
  let browser;
  
  try {
    // Get inputs
    const testUrl = core.getInput('test-url', { required: true });
    const goalsPath = core.getInput('goals-path', { required: true });
    const groqApiKey = core.getInput('groq-api-key');
    const openaiApiKey = core.getInput('openai-api-key');
    const openaiApiBase = core.getInput('openai-api-base');
    const groqModel = core.getInput('groq-model');
    const groqModelTemp = parseFloat(core.getInput('groq-model-temp'));
    const openaiModel = core.getInput('openai-model');
    const openaiModelTemp = parseFloat(core.getInput('openai-model-temp'));
    const token = core.getInput('github-token', { required: true });

    // Initialize GitHub client
    const octokit = github.getOctokit(token);

    // Read goals file
    const goals = JSON.parse(fs.readFileSync(goalsPath, 'utf-8'));

    // Initialize LLM
    let llm;
    let model;

    if (openaiApiBase && !openaiApiBase.includes("groq.com")) {
      const openAIOptions = {
        modelName: openaiModel,
        temperature: openaiModelTemp,
        apiKey: openaiApiKey,
        baseURL: openaiApiBase,
      };
      llm = new ChatOpenAI(openAIOptions);
      model = new ChatOpenAI({ ...openAIOptions, temperature: 0 }).bind({
        response_format: { type: "json_object" },
      });
    } else {
      const groqOptions: {
        model: string;
        temperature: number;
        apiKey: string;
        baseURL?: string;
      } = {
        model: groqModel,
        temperature: groqModelTemp,
        apiKey: groqApiKey,
      };
      if(openaiApiBase) {
        groqOptions.baseURL = openaiApiBase;
      }
      llm = new ChatGroq(groqOptions);
      model = new ChatGroq({ ...groqOptions, temperature: 0 }).bind({
        response_format: { type: "json_object" },
      });
    }

    // Launch browser and screen reader
    browser = await webkit.launch({ headless: false });
    const page = await browser.newPage();
    await nvda.start();

    for (const item of goals) {
      try {
        await page.goto(testUrl, { waitUntil: 'load' });
        await page.waitForSelector('body');
        await nvda.navigateToWebContent();

        const keyboardNaviNextItemTool = tool(async () => { await nvda.next(); return await nvda.lastSpokenPhrase(); }, { name: "next_item_function", description: "Move to the next item." });
        const reportDateTimeTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.reportDateTime); return await nvda.lastSpokenPhrase(); }, { name: "report_date_time_function", description: "Report the current date and time." });
        const reportCurrentFocusTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.reportCurrentFocus); return await nvda.lastSpokenPhrase(); }, { name: "report_current_focus_function", description: "Report the currently focused element." });
        const reportTitleTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.reportTitle); return await nvda.lastSpokenPhrase(); }, { name: "report_title_function", description: "Report the title of the current window." });
        const readActiveWindowTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.readActiveWindow); return await nvda.lastSpokenPhrase(); }, { name: "read_active_window_function", description: "Read the content of the active window." });
        const readLineTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.readLine); return await nvda.lastSpokenPhrase(); }, { name: "read_line_function", description: "Read the current line." });
        const moveToNextHeadingTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToNextHeading); return await nvda.lastSpokenPhrase(); }, { name: "move_to_next_heading_function", description: "Move to the next heading." });
        const moveToPreviousHeadingTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToPreviousHeading); return await nvda.lastSpokenPhrase(); }, { name: "move_to_previous_heading_function", description: "Move to the previous heading." });
        const moveToNextLinkTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToNextLink); return await nvda.lastSpokenPhrase(); }, { name: "move_to_next_link_function", description: "Move to the next link." });
        const moveToPreviousLinkTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToPreviousLink); return await nvda.lastSpokenPhrase(); }, { name: "move_to_previous_link_function", description: "Move to the previous link." });
        const moveToNextButtonTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToNextButton); return await nvda.lastSpokenPhrase(); }, { name: "move_to_next_button_function", description: "Move to the next button." });
        const moveToPreviousButtonTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToPreviousButton); return await nvda.lastSpokenPhrase(); }, { name: "move_to_previous_button_function", description: "Move to the previous button." });
        const moveToNextFormFieldTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToNextFormField); return await nvda.lastSpokenPhrase(); }, { name: "move_to_next_form_field_function", description: "Move to the next form field." });
        const moveToPreviousFormFieldTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToPreviousFormField); return await nvda.lastSpokenPhrase(); }, { name: "move_to_previous_form_field_function", description: "Move to the previous form field." });
        const moveToNextLandmarkTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToNextLandmark); return await nvda.lastSpokenPhrase(); }, { name: "move_to_next_landmark_function", description: "Move to the next landmark." });
        const moveToPreviousLandmarkTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToPreviousLandmark); return await nvda.lastSpokenPhrase(); }, { name: "move_to_previous_landmark_function", description: "Move to the previous landmark." });
        const moveToNextTableTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToNextTable); return await nvda.lastSpokenPhrase(); }, { name: "move_to_next_table_function", description: "Move to the next table." });
        const moveToPreviousTableTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToPreviousTable); return await nvda.lastSpokenPhrase(); }, { name: "move_to_previous_table_function", description: "Move to the previous table." });
        const moveToNextListTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToNextList); return await nvda.lastSpokenPhrase(); }, { name: "move_to_next_list_function", description: "Move to the next list." });
        const moveToPreviousListTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToPreviousList); return await nvda.lastSpokenPhrase(); }, { name: "move_to_previous_list_function", description: "Move to the previous list." });
        const moveToNextSeparatorTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToNextSeparator); return await nvda.lastSpokenPhrase(); }, { name: "move_to_next_separator_function", description: "Move to the next separator." });
        const moveToPreviousSeparatorTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToPreviousSeparator); return await nvda.lastSpokenPhrase(); }, { name: "move_to_previous_separator_function", description: "Move to the previous separator." });
        const moveToNextTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToNext); return await nvda.lastSpokenPhrase(); }, { name: "move_to_next_function", description: "Move to the next item." });
        const moveToPreviousTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.moveToPrevious); return await nvda.lastSpokenPhrase(); }, { name: "move_to_previous_function", description: "Move to the previous item." });
        const performDefaultActionForItemTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.performDefaultActionForItem); return await nvda.lastSpokenPhrase(); }, { name: "perform_default_action_for_item_function", description: "Perform the default action for the current item." });
        const leftMouseClickTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.leftMouseClick); return await nvda.lastSpokenPhrase(); }, { name: "left_mouse_click_function", description: "Perform a left mouse click." });
        const rightMouseClickTool = tool(async () => { await nvda.perform(nvda.keyboardCommands.rightMouseClick); return await nvda.lastSpokenPhrase(); }, { name: "right_mouse_click_function", description: "Perform a right mouse click." });
        const typeInTool = tool(async (input) => { await page.keyboard.type(input); return await nvda.lastSpokenPhrase(); }, { name: "keyboard_function", description: "Type in the given text to browser.", schema: z.object({ input: z.string() }) });
        const pressEnterTool = tool(async () => { await page.keyboard.press('Enter'); return await nvda.lastSpokenPhrase(); }, { name: "keyboard_press_enter_function", description: "Press enter on keyboard." });
        
        const tools = [keyboardNaviNextItemTool, reportDateTimeTool, reportCurrentFocusTool, reportTitleTool, readActiveWindowTool, readLineTool, moveToNextHeadingTool, moveToPreviousHeadingTool, moveToNextLinkTool, moveToPreviousLinkTool, moveToNextButtonTool, moveToPreviousButtonTool, moveToNextFormFieldTool, moveToPreviousFormFieldTool, moveToNextLandmarkTool, moveToPreviousLandmarkTool, moveToNextTableTool, moveToPreviousTableTool, moveToNextListTool, moveToPreviousListTool, moveToNextSeparatorTool, moveToPreviousSeparatorTool, moveToNextTool, moveToPreviousTool, performDefaultActionForItemTool, leftMouseClickTool, rightMouseClickTool, typeInTool, pressEnterTool];

        const prompt = ChatPromptTemplate.fromMessages([
          ["system", "You are a tester, navigate the website using screen reader try your best to understand the website and finish the given task, home page is opened for you."],
          ["placeholder", "{chat_history}"],
          ["human", "{input}"],
          ["placeholder", "{agent_scratchpad}"],
        ]);

        const agent = createToolCallingAgent({ llm, tools, prompt });
        const agentExecutor = new AgentExecutor({ agent, tools });

        let agentOutput = await agentExecutor.invoke({ input: item.goal });

        if ('expect' in item) {
          const aiMsg = await model.invoke(`# task: Judge and return JSON with property 'conclusion' as true or false\n# Problem: Does the conclusion of the agent align with our expectated intepretation?\n# Expectation: ${item.expect}\n# Context: ${agentOutput.messages[agentOutput.messages.length - 1].content}`);
          const aiMsgContent = JSON.parse(aiMsg.content as string);
          if (!aiMsgContent.conclusion) throw new Error('Expected condition not met.');
        } else {
          const the_log = await nvda.spokenPhraseLog();
          const aiMsg = await model.invoke(`# task: Judge and return JSON with property'conclusion' as true or false\n# Problem: Based on the log, did agent achieve its goal?\n# Expectation: ${item.goal}\n# The Log: ${the_log}`);
          const aiMsgContent = JSON.parse(aiMsg.content as string);
          if (!aiMsgContent.conclusion) throw new Error('Goal not achieved.');
        }
      } catch (error) {
        const spokenPhraseLog = await nvda.spokenPhraseLog();
        failures.push({
          goal: item.goal,
          spokenPhraseLog,
          error,
        });
      }
    }

    if (failures.length > 0) {
      let issueContent = '# Accessibility Test Failures\n\n';
      failures.forEach(failure => {
        issueContent += `\n---\n\n## Failed Goal: ${failure.goal}\n\n### Screen Reader Log\n\`\`\`\n${failure.spokenPhraseLog.join('\n')}\n\`\`\`\n\n### Error\n\`\`\`\n${failure.error.message}\n\`\`\`\n`;
      });

      await octokit.rest.issues.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        title: `Accessibility Test Failed: ${github.context.sha}`,
        body: issueContent,
        labels: ['bug', 'accessibility'],
      });

      core.setFailed(`${failures.length} accessibility tests failed.`);
    }
  } catch (error) {
    core.setFailed(error.message);
  } finally {
    await nvda.stop();
    if (browser) {
      await browser.close();
    }
  }
}

run();