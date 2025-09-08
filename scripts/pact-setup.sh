#!/bin/bash

# Pact Setup Script - Initializes Pact in a project and creates comprehensive tests
# Usage: ./pact-setup.sh [directory]

ANALYSIS_DIR=${1:-.}

echo "🚀 Setting up Pact for project: $ANALYSIS_DIR"
echo "=============================================="

# Create comprehensive Pact setup prompt
cat << 'EOF' > pact-setup.md
CRITICAL INSTRUCTION: You MUST use SmartBear MCP tools to set up Pact testing infrastructure and APPLY ALL CHANGES to the project files.

Your task is to:
1. Analyze the current project structure and identify API client code
2. Set up Pact testing infrastructure by MODIFYING the package manager (e.g. package.json, build.gradle) dependencies and scripts
3. Use mcp__smartbear__contract-testing_generate_pact_tests to create ONE basic happy path Pact test
4. APPLY ALL CHANGES to the actual project files - DO NOT just document what should be done

MANDATORY REQUIREMENTS:
- MODIFY package management to add Pact dependencies and test scripts
- USE mcp__smartbear__contract-testing_generate_pact_tests to generate the basic test
- APPLY all changes to actual files in the project
- Create ONE working happy path test (200 success scenario)
- Follow language best practices
- Use Jest as the test runner if no test framework is currently set up
- DO NOT just document steps - ACTUALLY MODIFY THE FILES

DISCOVERY AND SETUP PROCESS:
1. **Project Analysis**: Read packager manager config (e.g. package.json), identify existing dependencies and scripts
2. **API Discovery**: Find and analyze API client files to understand the structure
3. **Dependency Setup**: MODIFY package manager to add required Pact packages e.g. for Node JS:
   - @pact-foundation/pact
   - @pact-foundation/pact-cli
   - Add test scripts if missing
4. **Test Generation**: USE mcp__smartbear__contract-testing_generate_pact_tests to create the basic test
5. **File Modification**: APPLY all changes to the actual project files

SMARTBEAR MCP TOOL USAGE:
========================
You MUST call mcp__smartbear__contract-testing_generate_pact_tests to generate the basic test:

Required structure:
{
  "language": "typescript",
  "code": [
    {"filename": "discovered_api_file.js", "body": "full_file_content"},
    {"filename": "model_files.js", "body": "full_file_content"}
  ],
  "additionalInstructions": "Create ONE basic happy path test only. Use PactV4. Test one API endpoint with 200 success response. This is for infrastructure setup, not comprehensive testing."
}

BASIC TEST REQUIREMENTS:
========================
Create a simple test that:
- Tests ONE API endpoint with 200 success response
- Uses proper Pact setup and configuration
- Follows the existing project patterns
- Proves the infrastructure works
- Serves as a template for future tests

CRITICAL: APPLY CHANGES TO FILES
================================
You MUST:
1. MODIFY package.json to add dependencies and scripts
2. CREATE the test file using SmartBear MCP tools
3. MODIFY any other configuration files if needed
4. DO NOT just document what should be done - ACTUALLY DO IT

EXPECTED OUTPUTS:
================
1. **MODIFIED package manager** with Pact dependencies and test scripts APPLIED
2. **CREATED test file** (e.g. api.pact.spec.ts) with a working happy path test APPLIED
3. **Any needed configuration files** CREATED/MODIFIED
4. **Summary of ACTUAL changes made** to the project

STEP-BY-STEP EXECUTION:
======================
1. Read and analyze current project structure and package.json
2. Identify ONE main API client method for the basic test
3. MODIFY package.json to add required dependencies and scripts
4. USE mcp__smartbear__contract-testing_generate_pact_tests to create the test
5. APPLY the generated test to the project files
6. Verify all changes are actually applied to the project

OUTPUT FORMAT:
=============
Provide a complete summary of ACTUAL CHANGES MADE:
- What was ADDED to package.json (dependencies and scripts)
- What test file was CREATED and where
- What the test actually does
- Instructions for running the test
- Confirmation that changes were APPLIED, not just documented

FOCUS: This is about APPLYING Pact infrastructure changes to the project, not just documenting what should be done.
EOF

echo "📊 Running Pact setup with SmartBear MCP tools..."
cat pact-setup.md
echo ""
claude --mcp-config ~/.config/claude/mcp.json --allowedTools "Read,Write,CreateFile,EditFile,mcp__smartbear__contract-testing_generate_pact_tests" --print --output-format text < pact-setup.md > pact-setup-results.md

echo ""
echo "✅ Pact setup complete! Check pact-setup-results.md for details."