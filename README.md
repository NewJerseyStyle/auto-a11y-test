# AI Website Navigation Testing
Proof of concept for an AI-powered system that uses a screen reader to assess the user experience (UX) of a website for users with visual impairments. The AI simulates human interaction, providing a report on achieved and failed goals, focusing on ease of use and accessibility.

## Project Overview

The project aims to automate the process of verifying website accessibility and UX by using a screen reader to interact with the website and extract information about the completion status of specific tasks or goals. The AI component analyzes the screen reader output to identify whether each goal was successfully achieved or not, and provides insights into potential usability issues.

## Goals

The specific goals to be achieved by the system are defined in a configuration file (e.g., `goals.json`).  An example might include:

* Navigate to the homepage.
* View the homepage and guess what the site is about.
* Submit the contact form.
* Access the FAQ section and find info about payment method.


## Technology Stack

* **Programming Language:** Javascript
* **Screen Reader:** [NVDA](https://www.nvaccess.org/download/), [Guidepup](https://www.guidepup.dev/)
* **AI Libraries:** Langchain, Zod
* **Webdriver:** [Playwright](https://playwright.dev/)


## Setup and Usage

The tests are run automatically on every push or pull request to the `main` branch using GitHub Actions.

### Configuration

The test configuration is managed through GitHub Actions secrets and variables.

1.  **Configure Goals:**
    *   The test goals are defined in a JSON file. You can modify the `example-goals.json` file to define your own goals.
    *   Each goal should be an object in an array with a `"goal"` property. Optionally, you can include an `"expect"` property for expected outcomes for interpretation task.
    *   Example `example-goals.json`:
        ```json
        [
            {
                "goal": "Navigate to the homepage."
            },
            {
                "goal": "View the homepage and guess what the site is about.",
                "expect": "It is the source code repository of software."
            }
        ]
        ```

2.  **Configure Environment Variables:**
    *   The environment variables for the test are defined in the `.github/workflows/node.js.yml` file and should be configured in your repository's "Settings" > "Secrets and variables" > "Actions".
    *   The test script can use either the Groq API or any other OpenAI-compatible API endpoint.

    *   **Using Groq (Default):**
        *   **Secrets:**
            *   `GROQ_API_KEY`: Your Groq API key.
        *   **Variables:**
            *   `GROQ_MODEL`: The Groq model to use (e.g., `llama-3.3-70b-versatile`).
            *   `GROQ_MODEL_TEMP`: The temperature for the model (e.g., `0`).

    *   **Using a custom OpenAI-compatible endpoint:**
        *   **Secrets:**
            *   `OPENAI_API_KEY`: Your API key for the custom endpoint.
        *   **Variables:**
            *   `OPENAI_API_BASE`: The base URL of your custom OpenAI-compatible endpoint.
            *   `OPENAI_MODEL`: The model to use (e.g., `gpt-4`).
            *   `OPENAI_MODEL_TEMP`: The temperature for the model (e.g., `0`).

    *   **Common Variables:**
        *   `TEST_ENTRY_URL`: The URL of the website to test.
        *   `TEST_CASE_JSON_PATH`: The path to the JSON file containing the test goals (e.g., `example-goals.json`).

### Running the Tests

The tests will run automatically when you push a commit to the `main` branch or open a pull request. You can view the test results in the "Actions" tab of your GitHub repository.

For local development, you can still run the tests using Playwright. Make sure you have Node.js and npm installed.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Install Playwright Browsers:**
    ```bash
    npx playwright install --with-deps webkit
    ```
3.  **Set Environment Variables:**
    Create a `.env` file and add the necessary variables depending on the service you want to use (Groq or a custom OpenAI-compatible endpoint).
4.  **Run Tests:**
    ```bash
    npx playwright test
    ```


## Results

The output will be a simple report detailing:

* **Successfully Achieved Goals:** A list of goals that were successfully completed.
* **Failed Goals:** A list of goals that were not successfully completed, along with potential reasons for failure (if identified).  This section should provide actionable feedback for improving the website's accessibility and UX.
* **Accessibility Issues:** A list of identified accessibility issues, such as missing alt text or poor semantic HTML.

## User Experience Considerations

This proof-of-concept prioritizes ease of use for both the AI and human users. The AI's actions are designed to mimic the natural flow of a human user interacting with a website using a screen reader. The system's design aims to be intuitive and straightforward, minimizing any complexities that might hinder accessibility for users with disabilities.  Future development will focus on user testing to further refine the UX and ensure accessibility for a wide range of users.

## Testing Methodology

The AI testing methodology is designed to simulate real-world user interactions. This includes:

* **Realistic Navigation:** The AI navigates the website using screen reader commands that a human user would typically employ.
* **Error Handling:** The system incorporates robust error handling to gracefully manage unexpected situations, such as broken links or unexpected website changes.
* **Accessibility Checks:** Beyond goal completion, the system also performs basic accessibility checks, such as verifying the presence of appropriate ARIA attributes and semantic HTML.

## Limitations

1. The AI testing system only consider keyboard navigation. Did not provide insights in touch screen.
2. The AI may need more instruction in order to control the behavior to mimic specific operation styles (e.g. reading each element on website vs jumping to next header).
3. The screen reader support only added for NVDA, VoiceOver also supported by not implemented.

## Contributing

Contributions are welcome! Please feel free to submit pull requests.
