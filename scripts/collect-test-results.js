#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Collects test results from Playwright and formats them for GitHub
 */
class TestResultsCollector {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      skipped: 0,
      total: 0,
      duration: 0,
      failedTests: [],
      passedTests: [],
      accessibilityIssues: [],
      goals: {
        achieved: [],
        failed: []
      }
    };
  }

  /**
   * Run tests and collect results
   * @param {string} testCommand - The test command to run
   * @returns {Object} Test results
   */
  async runAndCollect(testCommand) {
    const startTime = Date.now();
    let testOutput = '';
    let exitCode = 0;

    try {
      // Run tests and capture output
      testOutput = execSync(testCommand, {
        encoding: 'utf8',
        stdio: 'pipe'
      });
    } catch (error) {
      testOutput = error.stdout || error.toString();
      exitCode = error.status || 1;
    }

    this.results.duration = Date.now() - startTime;

    // Parse test output
    this.parseTestOutput(testOutput);
    
    // Check for specific test goals
    this.checkTestGoals(testOutput);
    
    // Extract accessibility issues
    this.extractAccessibilityIssues(testOutput);

    this.results.exitCode = exitCode;
    this.results.success = exitCode === 0 && this.results.failed === 0;

    return this.results;
  }

  /**
   * Parse test output for pass/fail counts
   * @param {string} output - Test output
   */
  parseTestOutput(output) {
    // Parse Playwright output format
    const lines = output.split('\n');
    
    lines.forEach(line => {
      // Look for test results
      if (line.includes('[chromium]') || line.includes('[webkit]')) {
        if (line.includes('✓') || line.includes('passed')) {
          this.results.passed++;
          const testName = this.extractTestName(line);
          if (testName) {
            this.results.passedTests.push({
              name: testName,
              browser: this.extractBrowser(line)
            });
          }
        } else if (line.includes('✕') || line.includes('failed')) {
          this.results.failed++;
          const testName = this.extractTestName(line);
          if (testName) {
            this.results.failedTests.push({
              name: testName,
              browser: this.extractBrowser(line),
              error: this.extractError(output, testName)
            });
          }
        } else if (line.includes('-') || line.includes('skipped')) {
          this.results.skipped++;
        }
      }
      
      // Look for summary line
      if (line.match(/(\d+) passed/)) {
        const match = line.match(/(\d+) passed/);
        this.results.passed = parseInt(match[1]);
      }
      if (line.match(/(\d+) failed/)) {
        const match = line.match(/(\d+) failed/);
        this.results.failed = parseInt(match[1]);
      }
      if (line.match(/(\d+) skipped/)) {
        const match = line.match(/(\d+) skipped/);
        this.results.skipped = parseInt(match[1]);
      }
    });

    this.results.total = this.results.passed + this.results.failed + this.results.skipped;
  }

  /**
   * Check if specific test goals were achieved
   * @param {string} output - Test output
   */
  checkTestGoals(output) {
    const goals = [
      {
        name: 'Find secret code',
        pattern: /QUANTUM-LEAP-2024/,
        achieved: false
      },
      {
        name: 'Navigate between pages',
        pattern: /navigate|navigation successful/i,
        achieved: false
      },
      {
        name: 'Validate accessibility',
        pattern: /accessibility.*pass|aria.*valid/i,
        achieved: false
      },
      {
        name: 'Screen reader compatibility',
        pattern: /NVDA|VoiceOver|screen reader/i,
        achieved: false
      }
    ];

    goals.forEach(goal => {
      if (goal.pattern.test(output)) {
        goal.achieved = true;
        this.results.goals.achieved.push(goal.name);
      } else {
        this.results.goals.failed.push(goal.name);
      }
    });
  }

  /**
   * Extract accessibility issues from test output
   * @param {string} output - Test output
   */
  extractAccessibilityIssues(output) {
    const issues = [];
    
    // Common accessibility error patterns
    const patterns = [
      {
        pattern: /missing.*aria-label/i,
        severity: 'serious',
        wcag: '4.1.2'
      },
      {
        pattern: /contrast ratio/i,
        severity: 'serious',
        wcag: '1.4.3'
      },
      {
        pattern: /keyboard.*accessible/i,
        severity: 'critical',
        wcag: '2.1.1'
      },
      {
        pattern: /missing.*alt/i,
        severity: 'serious',
        wcag: '1.1.1'
      }
    ];

    patterns.forEach(({ pattern, severity, wcag }) => {
      if (pattern.test(output)) {
        const match = output.match(new RegExp(`.*${pattern.source}.*`, 'i'));
        if (match) {
          issues.push({
            description: match[0].trim(),
            severity,
            wcag: `WCAG ${wcag}`
          });
        }
      }
    });

    this.results.accessibilityIssues = issues;
  }

  /**
   * Extract test name from line
   * @param {string} line - Test output line
   * @returns {string} Test name
   */
  extractTestName(line) {
    const match = line.match(/›\s+(.+?)(?:\s+\(\d+ms\))?$/);
    return match ? match[1].trim() : null;
  }

  /**
   * Extract browser from line
   * @param {string} line - Test output line
   * @returns {string} Browser name
   */
  extractBrowser(line) {
    const match = line.match(/\[(chromium|webkit|firefox)\]/);
    return match ? match[1] : 'unknown';
  }

  /**
   * Extract error message for a failed test
   * @param {string} output - Full test output
   * @param {string} testName - Name of the test
   * @returns {string} Error message
   */
  extractError(output, testName) {
    const lines = output.split('\n');
    const testIndex = lines.findIndex(line => line.includes(testName));
    
    if (testIndex !== -1) {
      // Look for error message after the test name
      for (let i = testIndex + 1; i < Math.min(testIndex + 10, lines.length); i++) {
        if (lines[i].includes('Error:') || lines[i].includes('AssertionError:')) {
          return lines[i].trim();
        }
      }
    }
    
    return 'Error details not found';
  }

  /**
   * Generate markdown report for GitHub comment
   * @returns {string} Markdown formatted report
   */
  generateMarkdownReport() {
    const { passed, failed, skipped, total, duration, success } = this.results;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
    
    let status = success ? '✅' : '❌';
    let statusText = success ? 'PASSED' : 'FAILED';
    
    let markdown = `## ${status} AI Accessibility Test Results\n\n`;
    markdown += `**Status:** ${statusText}\n`;
    markdown += `**Pass Rate:** ${passRate}%\n`;
    markdown += `**Duration:** ${(duration / 1000).toFixed(2)}s\n\n`;
    
    // Summary table
    markdown += `### Summary\n\n`;
    markdown += `| Metric | Count |\n`;
    markdown += `|--------|-------|\n`;
    markdown += `| ✅ Passed | ${passed} |\n`;
    markdown += `| ❌ Failed | ${failed} |\n`;
    markdown += `| ⏭️ Skipped | ${skipped} |\n`;
    markdown += `| 📊 Total | ${total} |\n\n`;
    
    // Test Goals
    if (this.results.goals.achieved.length > 0 || this.results.goals.failed.length > 0) {
      markdown += `### Test Goals\n\n`;
      this.results.goals.achieved.forEach(goal => {
        markdown += `- ✅ ${goal}\n`;
      });
      this.results.goals.failed.forEach(goal => {
        markdown += `- ❌ ${goal}\n`;
      });
      markdown += '\n';
    }
    
    // Failed tests
    if (this.results.failedTests.length > 0) {
      markdown += `### ❌ Failed Tests\n\n`;
      this.results.failedTests.forEach((test, index) => {
        markdown += `${index + 1}. **${test.name}** (${test.browser})\n`;
        if (test.error) {
          markdown += `   - Error: \`${test.error}\`\n`;
        }
      });
      markdown += '\n';
    }
    
    // Accessibility issues
    if (this.results.accessibilityIssues.length > 0) {
      markdown += `### ⚠️ Accessibility Issues\n\n`;
      markdown += `| Issue | Severity | WCAG |\n`;
      markdown += `|-------|----------|------|\n`;
      this.results.accessibilityIssues.forEach(issue => {
        const severityIcon = {
          'critical': '🔴',
          'serious': '🟠',
          'moderate': '🟡',
          'minor': '🔵'
        }[issue.severity] || '⚪';
        markdown += `| ${issue.description} | ${severityIcon} ${issue.severity} | ${issue.wcag} |\n`;
      });
      markdown += '\n';
    }
    
    return markdown;
  }

  /**
   * Save results to file
   * @param {string} filepath - Path to save results
   */
  saveResults(filepath) {
    fs.writeFileSync(filepath, JSON.stringify(this.results, null, 2));
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const collector = new TestResultsCollector();
  const testCommand = process.argv[2] || 'npx playwright test';
  
  console.log('Running tests and collecting results...');
  collector.runAndCollect(testCommand).then(results => {
    console.log('\nTest Results:');
    console.log(collector.generateMarkdownReport());
    
    // Save results to file
    collector.saveResults('test-results.json');
    console.log('\nResults saved to test-results.json');
    
    // Exit with appropriate code
    process.exit(results.exitCode);
  });
}

export default TestResultsCollector;