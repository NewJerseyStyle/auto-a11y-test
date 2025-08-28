# Test Server for AI Navigation Testing

This directory contains a simple test server and pages designed to validate the AI-powered screen reader navigation capabilities.

## Structure

- `server.js` - Express server serving test pages
- `public/index.html` - Main test page with navigation button
- `public/secret-info.html` - Hidden page containing secret code "QUANTUM-LEAP-2024"

## Test Scenario

The AI assistant is challenged to:
1. Start on the home page
2. Navigate without explicit instructions  
3. Find and click the "Discover More Information" button
4. Discover the secret code on the hidden page

## Running the Test

### Local Testing
```bash
# Install dependencies
npm install

# Start the test server
npm run test:server

# In another terminal, run the AI navigation test
npm test
```

### GitHub Actions Testing
The test automatically runs in CI/CD via the `.github/workflows/test-action.yml` workflow.

## Success Criteria

The test is successful when:
- AI navigates from home page to secret page
- AI discovers and reports the code "QUANTUM-LEAP-2024"
- Navigation completes within the step limit

## Configuration

Set these environment variables:
- `AI_PROVIDER`: "openai" or "groq"
- `AI_API_KEY`: Your API key for the chosen provider
- `TEST_URL`: URL of the test server (default: http://localhost:3000)