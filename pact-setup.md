CRITICAL INSTRUCTION: You MUST set up Pact testing infrastructure in this project with a basic working test.

Your task is to:
1. Analyze the current project structure and identify API client code
2. Set up Pact testing infrastructure (package.json dependencies, configuration)
3. Create ONE basic happy path Pact test to prove the setup works
4. Configure the project for future comprehensive Pact test development

MANDATORY REQUIREMENTS:
- Install all necessary Pact dependencies in package.json
- Create basic test infrastructure and configuration
- Create ONE working happy path test (200 success scenario)
- Follow TypeScript best practices
- Use PactV4 specification
- Use Jest as the test runner if no test framework is currently set up
- DO NOT create comprehensive tests - focus on setup only

DISCOVERY AND SETUP PROCESS:
1. **Project Analysis**: Read package.json, identify existing dependencies and scripts
2. **API Discovery**: Find and analyze API client files to understand the structure
3. **Dependency Setup**: Add required Pact packages to package.json if missing:
   - @pact-foundation/pact
   - @pact-foundation/pact-cli
   - jest (if not present)
   - typescript (if not present)
   - @types/jest (if not present)
4. **Test Infrastructure**: Create/update test configuration files ONLY if needed 
5. **Work with the established patterns** Try not to change the project structure or configurations unless absolutely necessary
6. **Basic Test Creation**: Create ONE simple happy path test to validate setup

BASIC TEST REQUIREMENTS:
========================
Create a simple test that:
- Tests ONE API endpoint with 200 success response
- Uses proper Pact setup and configuration
- Follows the existing project patterns
- Proves the infrastructure works
- Serves as a template for future tests

EXPECTED OUTPUTS:
================
1. **Updated package.json** with Pact dependencies and test scripts
2. **ONE basic test file** (*.pact.spec.ts) with a working happy path test
3. **Configuration files** (jest.config.js, tsconfig.json ONLY if needed)
4. **Clear documentation** explaining:
   - How to run the basic test
   - How to add more tests later
   - What infrastructure was set up

EXAMPLE PACKAGE.JSON ADDITIONS:
```json
{
  "devDependencies": {
    "@pact-foundation/pact": "^12.0.0",
    "@pact-foundation/pact-cli": "^15.0.0",
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
2. Identify ONE main API client method for the basic test
3. Update package.json with required dependencies
4. Create basic test infrastructure and configuration
5. Create ONE working happy path test
6. Provide setup summary and next steps

OUTPUT FORMAT:
=============
Provide a complete summary of:
- Dependencies added to package.json
- Configuration files created/updated
- Basic test created (which endpoint and scenario)
- Instructions for running the test
- How to add comprehensive tests later
- Clear note that this is SETUP ONLY, not comprehensive testing

FOCUS: This is about getting Pact infrastructure working, not creating comprehensive test suites.
