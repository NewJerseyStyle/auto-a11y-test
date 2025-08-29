# 🦾 Your Website Through Screen Reader - AI-Powered Accessibility Testing

> **"We discovered our web page was impossible to navigate with a screen reader. This tool found it in 10 minutes."**  
> — *That's why we implemented this to help us allocate our energy in coding*

## 🎯 What if CI/CD could see your website the way 285 million visually impaired people experience it?

Every day, millions of people use screen readers to navigate the web. But most websites are never tested with real screen reader technology. **Until now.**

This tool uses artificial intelligence to navigate your website exactly like a blind user would - using real screen readers (NVDA/VoiceOver), discovering barriers, and reporting what works and what doesn't.

### 💡 Why This Matters

- **15% of the world's population** lives with some form of disability
- **$13 trillion** in annual disposable income from people with disabilities
- **Legal requirements** (ADA, WCAG) with significant penalties for non-compliance
- **Better for everyone** - accessible sites rank higher on Google and work better on mobile
- **Afordable and scalable** - get most out even if you cannot get a a11y specialist

---

## 🚀 For Accessibility Testers & QA Teams

### What This Tool Does For You

Instead of manually testing every page with a screen reader (which can take days), this tool:

1. **Automatically navigates** your entire website using AI
2. **Uses real screen readers** (NVDA on Windows, VoiceOver on Mac)
3. **Attempts real user tasks** like "Find the contact information" or "Purchase a product"
4. **Reports exactly what fails** with specific error messages and locations
5. **Runs on every code change** to catch issues before they go live

### Real-World Example: Testing an Online Store

Let's say you want to test if customers can complete a purchase using only a screen reader.

**Without this tool:** Manual testing takes 4-6 hours  
**With this tool:** Automated testing in under 5 minutes

Here's what you'll discover:
```
❌ FAILED: Complete a purchase
  - ✅ Found product catalog
  - ✅ Added item to cart
  - ❌ Checkout button has no accessible label
  - ❌ Payment form fields missing descriptions
  - ❌ Order confirmation unreachable via keyboard
```

And the output list will be attached to the Pull Request comment before the maintainer decided to pass or reject.

---

## 📖 Quick Start Guide (No Coding Required!)

### For Accessibility Testers

If your development team has already set this up, you just need to:

1. **Create a test scenario** - Write what you want to test in plain English:
   ```
   Find and read the privacy policy
   Navigate to contact page and find phone number
   Complete newsletter signup
   ```

2. **Ask your dev team** to convert these tests into the YAML format

3. **Review the reports** - You'll get clear, readable reports showing:
   - What the AI could accomplish ✅
   - What failed and why ❌
   - Exact WCAG violations found
   - Suggestions for fixes

### For Development Teams - 10-Minute Setup

#### Step 1: Add to Your GitHub Repository

Create a new file `.github/workflows/accessibility.yml`:

```yaml
name: Accessibility Testing

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: windows-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Test Accessibility
      uses: NewJerseyStyle/auto-a11y-test@main
      with:
        url: 'https://your-website.com'
        goals: |
          Navigate to the contact page
          Find customer service phone number
          Locate business hours
          Test the search functionality
        ai-provider: 'openai'
        ai-api-key: ${{ secrets.OPENAI_API_KEY }}
```

#### Step 2: Add Your API Key

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `OPENAI_API_KEY`
5. Value: Your OpenAI API key (get one at https://platform.openai.com)

#### Step 3: Watch It Work!

Every time you push code or create a pull request, the AI will:
- Test your website with a screen reader
- Post results as a comment on your pull request
- Alert you to any accessibility failures


---

## 📚 Common Use Cases & Examples

### 1. E-commerce Site Testing

**Goal:** Ensure customers can complete purchases

```yaml
goals: |
  Browse product categories
  Search for "blue shirt"
  Add item to shopping cart
  Navigate to checkout
  Complete purchase with test data
  Find order confirmation number
```

**What it finds:**
- Missing alt text on product images
- Checkout button only visible on hover
- Form fields without labels
- Payment errors not announced to screen readers

### 2. Government/Public Service Sites

**Goal:** Ensure all citizens can access services

```yaml
goals: |
  Find office locations and hours
  Download tax forms
  Submit a service request
  Check application status
  Contact support
```

**What it finds:**
- PDFs that aren't accessible
- Complex forms missing navigation aids
- Important alerts not announced
- Tables without proper headers

### 3. Educational Platforms

**Goal:** Ensure all students can learn

```yaml
goals: |
  Log into student portal
  Find course materials
  Submit an assignment
  Check grades
  Access video lectures with captions
```

**What it finds:**
- Video players without keyboard controls
- Quiz timers not announced
- Discussion boards difficult to navigate
- Missing headings in long documents


---

## 📊 Understanding Your Test Reports

When tests run, you'll see results like this in your pull requests:

### ✅ Success Report Example
```markdown
## ✅ AI Accessibility Test Results

**Status:** PASSED
**Pass Rate:** 100%

✅ Find contact information - COMPLETED
✅ Navigate menu - COMPLETED  
✅ Submit contact form - COMPLETED

Great job! Your site is accessible.
```

### ❌ Failure Report Example
```markdown
## ❌ AI Accessibility Test Results

**Status:** FAILED
**Pass Rate:** 60%

✅ Find contact information - COMPLETED
❌ Navigate menu - FAILED
   Error: Menu items not reachable via keyboard (WCAG 2.1.1)
❌ Submit contact form - FAILED
   Error: Submit button has no accessible name (WCAG 4.1.2)

Action Required: Fix the above issues before merging.
```

---

## ��️ Technical Documentation

### Technology Stack

* **Programming Language:** Javascript
* **Screen Reader:** [NVDA](https://www.nvaccess.org/download/), [Guidepup](https://www.guidepup.dev/)
* **AI Libraries:** Langchain, Zod
* **Webdriver:** [Playwright](https://playwright.dev/)

### Setup and Usage

The tests are run automatically on every push or pull request to the `main` branch using GitHub Actions.

### Supported Platforms

| Platform | Screen Reader | GitHub Runner |
|----------|--------------|---------------|
| Windows | NVDA (Free) | `windows-latest` |
| macOS | VoiceOver (Built-in) | `macos-latest` |

### Configuration Options

| Option | Required | Description | Example |
|--------|----------|-------------|---------|  
| `url` | Yes | Website to test | `https://example.com` |
| `goals` | Yes | Test objectives (one per line) | `Find contact info` |
| `ai-provider` | Yes | AI service to use | `openai` or `groq` |
| `ai-api-key` | Yes | API key for AI service | `${{ secrets.OPENAI_API_KEY }}` |
| `max-steps` | No | Maximum navigation attempts | `20` (default) |
| `viewport-width` | No | Browser width | `1280` (default) |
| `viewport-height` | No | Browser height | `720` (default) |

### Running Locally

```bash
# Clone the repository
git clone https://github.com/NewJerseyStyle/AI-Website-ScreenReader-Navigation-Tester.git
cd AI-Website-ScreenReader-Navigation-Tester

# Install dependencies
npm install

# Set environment variables
export AI_PROVIDER=openai
export OPENAI_API_KEY=your-key-here
export TEST_URL=https://your-site.com

# Run tests
npm test
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| "Screen reader not starting" | Ensure you're using `windows-latest` for NVDA or `macos-latest` for VoiceOver |
| "API key not valid" | Check your API key is correctly set in GitHub Secrets |
| "Navigation timeout" | Increase `max-steps` parameter or simplify test goals |
| "Cannot find element" | Ensure your site has proper ARIA labels and semantic HTML |


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
