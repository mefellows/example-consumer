CRITICAL INSTRUCTION: You MUST use SmartBear MCP tools to set up comprehensive Pact testing in this project.

Your task is to:
1. Analyze the current project structure and identify API client code
2. Set up Pact testing infrastructure (package.json dependencies, configuration)
3. Generate complete Pact tests using mcp__smartbear__contract-testing_generate_pact_tests
4. Create a comprehensive test suite covering all API endpoints and scenarios

MANDATORY REQUIREMENTS:
- Install all necessary Pact dependencies in package.json
- Create or update Pact test files with complete coverage
- Include scenarios: 200 (success), 400 (bad request), 401 (unauthorized), 404 (not found)
- Follow TypeScript best practices
- Use PactV4 specification
- Generate tests for ALL API methods discovered

DISCOVERY AND SETUP PROCESS:
1. **Project Analysis**: Read package.json, identify existing dependencies and scripts
2. **API Discovery**: Find and analyze all API client files (*.js, *.ts files with HTTP calls)
3. **Dependency Setup**: Add required Pact packages to package.json if missing:
   - @pact-foundation/pact
   - axios (if not present)
   - jest (if not present)
   - typescript (if not present)
4. **Test Infrastructure**: Create/update test configuration files
5. **Test Generation**: Use SmartBear MCP tools to generate comprehensive tests

SMARTBEAR MCP TOOL USAGE:
========================
For each API method discovered, call:
mcp__smartbear__contract-testing_generate_pact_tests

Required structure:
{
  "language": "typescript",
  "code": [
    {"filename": "discovered_api_file.js", "body": "full_file_content"},
    {"filename": "model_files.js", "body": "full_file_content"}
  ],
  "openapi": {
    "document": "openapi_spec_if_available",
    "matcher": {
      "path": "endpoint_path",
      "methods": ["GET", "POST", "PUT", "DELETE"],
      "statusCodes": [200, 400, 401, 404],
      "operationId": "operation_id"
    }
  },
  "additionalInstructions": "Create comprehensive test suite following Jest patterns, use PactV4, include all HTTP status codes"
}

EXPECTED OUTPUTS:
================
1. **Updated package.json** with Pact dependencies and test scripts
2. **Complete test files** (*.pact.spec.ts) with full API coverage
3. **Configuration files** (jest.config.js, tsconfig.json if needed)
4. **Documentation** explaining the setup and how to run tests

EXAMPLE PACKAGE.JSON ADDITIONS:
```json
{
  "devDependencies": {
    "@pact-foundation/pact": "^12.0.0",
    "@types/jest": "^29.0.0",
    "jest": "^29.0.0",
    "typescript": "^5.0.0"
  },
  "scripts": {
    "test": "jest",
    "test:pact": "jest --testMatch='**/*.pact.spec.ts'",
    "pact:publish": "pact-broker publish pacts --consumer-app-version=$GITHUB_SHA --broker-base-url=$PACT_BROKER_BASE_URL --broker-token=$PACT_BROKER_TOKEN"
  }
}
```

STEP-BY-STEP EXECUTION:
======================
1. Read and analyze current project structure
2. Identify all API client files and methods
3. Update package.json with required dependencies
4. For each API endpoint, call mcp__smartbear__contract-testing_generate_pact_tests
5. Create comprehensive test files
6. Set up test infrastructure and configuration
7. Provide setup summary and next steps

OUTPUT FORMAT:
=============
Provide a complete summary of:
- Files created/modified
- Dependencies added
- Test coverage achieved
- Instructions for running the tests
- Next steps for the developer

Execute this setup now and create a fully functional Pact testing environment.
