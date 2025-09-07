module.exports = {
  // Consumer settings
  consumer: 'ProductConsumer',
  provider: 'ProductProvider',
  
  // Pact file output directory
  dir: './pacts',
  
  // Log level
  logLevel: 'INFO',
  
  // Specification version
  spec: 4,
  
  // Pact broker settings (configure these via environment variables)
  pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  consumerVersion: process.env.GITHUB_SHA || '1.0.0',
  
  // Tags for consumer version
  tags: ['main', 'production'],
  
  // Enable/disable SSL verification
  pactBrokerVerifySSL: true,
  
  // Timeout settings
  timeout: 120000
};