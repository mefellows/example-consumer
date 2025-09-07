import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { API } from './api';

const { like, eachLike, string, integer, number } = MatchersV3;

// Pact test for network timeout
describe('Consumer Pact for Network Timeout', () => {
  const provider = new PactV3({
    consumer: 'ProductConsumer',
    provider: 'ProductProvider',
  });

  it('handles network timeout gracefully', () => {
    provider
      .uponReceiving('a request for all products with a network timeout')
      .withRequest({
        method: 'GET',
        path: '/products',
        headers: {
          Authorization: string('Bearer some-token'),
        },
      })
      .willRespondWith({
        status: 504,
      });

    return provider.executeTest(async (mockserver) => {
      const api = new API(mockserver.url);
      try {
        await api.getAllProducts();
      } catch (error) {
        expect(error.response.status).toBe(504);
      }
    });
  });
});

// Pact test for server error
describe('Consumer Pact for Server Error', () => {
  const provider = new PactV3({
    consumer: 'ProductConsumer',
    provider: 'ProductProvider',
  });

  it('handles server error gracefully', () => {
    provider
      .uponReceiving('a request for a product with server error')
      .withRequest({
        method: 'GET',
        path: '/product/1',
        headers: {
          Authorization: string('Bearer some-token'),
        },
      })
      .willRespondWith({
        status: 500,
      });

    return provider.executeTest(async (mockserver) => {
      const api = new API(mockserver.url);
      try {
        await api.getProduct('1');
      } catch (error) {
        expect(error.response.status).toBe(500);
      }
    });
  });
});

// Pact test for service unavailable
describe('Consumer Pact for Service Unavailable', () => {
  const provider = new PactV3({
    consumer: 'ProductConsumer',
    provider: 'ProductProvider',
  });

  it('handles service unavailable gracefully', () => {
    provider
      .uponReceiving('a request for all products with service unavailable')
      .withRequest({
        method: 'GET',
        path: '/products',
        headers: {
          Authorization: string('Bearer some-token'),
        },
      })
      .willRespondWith({
        status: 503,
      });

    return provider.executeTest(async (mockserver) => {
      const api = new API(mockserver.url);
      try {
        await api.getAllProducts();
      } catch (error) {
        expect(error.response.status).toBe(503);
      }
    });
  });
});

// Pact test for rate limiting
describe('Consumer Pact for Rate Limiting', () => {
  const provider = new PactV3({
    consumer: 'ProductConsumer',
    provider: 'ProductProvider',
  });

  it('handles rate limiting gracefully', () => {
    provider
      .uponReceiving('a request for all products with rate limiting')
      .withRequest({
        method: 'GET',
        path: '/products',
        headers: {
          Authorization: string('Bearer some-token'),
        },
      })
      .willRespondWith({
        status: 429,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Retry-After': '60',
        },
        body: {
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Try again later.',
        },
      });

    return provider.executeTest(async (mockserver) => {
      const api = new API(mockserver.url);
      try {
        await api.getAllProducts();
      } catch (error) {
        expect(error.response.status).toBe(429);
        expect(error.response.headers['retry-after']).toBe('60');
      }
    });
  });
});

// Pact test for missing authorization headers
describe('Consumer Pact for Missing Authorization Headers', () => {
  const provider = new PactV3({
    consumer: 'ProductConsumer',
    provider: 'ProductProvider',
  });

  it('handles missing authorization headers gracefully', () => {
    provider
      .uponReceiving('a request for all products with missing authorization headers')
      .withRequest({
        method: 'GET',
        path: '/products',
      })
      .willRespondWith({
        status: 401,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
          error: 'Unauthorized',
          message: 'Authorization header is required',
        },
      });

    return provider.executeTest(async (mockserver) => {
      // Create API instance but modify it to not send auth headers for this test
      const api = new API(mockserver.url);
      const originalGenerateAuthToken = api.generateAuthToken;
      api.generateAuthToken = () => null;
      
      try {
        await api.getAllProducts();
      } catch (error) {
        expect(error.response.status).toBe(401);
      } finally {
        api.generateAuthToken = originalGenerateAuthToken;
      }
    });
  });
});

// Pact test for expired tokens
describe('Consumer Pact for Expired Tokens', () => {
  const provider = new PactV3({
    consumer: 'ProductConsumer',
    provider: 'ProductProvider',
  });

  it('handles expired tokens gracefully', () => {
    provider
      .uponReceiving('a request for all products with expired token')
      .withRequest({
        method: 'GET',
        path: '/products',
        headers: {
          Authorization: string('Bearer expired-token'),
        },
      })
      .willRespondWith({
        status: 401,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
          error: 'Unauthorized',
          message: 'Token has expired',
        },
      });

    return provider.executeTest(async (mockserver) => {
      const api = new API(mockserver.url);
      // Override token generation to return expired token
      api.generateAuthToken = () => 'Bearer expired-token';
      
      try {
        await api.getAllProducts();
      } catch (error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.message).toBe('Token has expired');
      }
    });
  });
});

// Pact test for large response payloads
describe('Consumer Pact for Large Response Payloads', () => {
  const provider = new PactV3({
    consumer: 'ProductConsumer',
    provider: 'ProductProvider',
  });

  it('handles large response payloads gracefully', () => {
    provider
      .given('large product catalog exists')
      .uponReceiving('a request for all products with large response payload')
      .withRequest({
        method: 'GET',
        path: '/products',
        headers: {
          Authorization: string('Bearer some-token'),
        },
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: eachLike({
          id: string('1'),
          name: string('Product 1'),
          type: string('Type A'),
        }, { min: 100 }), // Simulating a large payload with 100+ items
      });

    return provider.executeTest(async (mockserver) => {
      const api = new API(mockserver.url);
      const products = await api.getAllProducts();
      expect(products.length).toBeGreaterThanOrEqual(100);
      expect(products[0]).toHaveProperty('id');
      expect(products[0]).toHaveProperty('name');
      expect(products[0]).toHaveProperty('type');
    });
  });
});

// Pact test for malformed product data
describe('Consumer Pact for Malformed Product Data', () => {
  const provider = new PactV3({
    consumer: 'ProductConsumer',
    provider: 'ProductProvider',
  });

  it('handles products with missing required fields', () => {
    provider
      .given('products with incomplete data exist')
      .uponReceiving('a request for products with missing fields')
      .withRequest({
        method: 'GET',
        path: '/products',
        headers: {
          Authorization: string('Bearer some-token'),
        },
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: [
          {
            id: string('1'),
            name: string('Product 1'),
            // missing 'type' field
          },
          {
            id: string('2'),
            // missing 'name' field
            type: string('Type B'),
          },
        ],
      });

    return provider.executeTest(async (mockserver) => {
      const api = new API(mockserver.url);
      const products = await api.getAllProducts();
      expect(products).toHaveLength(2);
      // Test that the API gracefully handles missing fields
      expect(products[0].name).toBe('Product 1');
      expect(products[0].type).toBeUndefined();
      expect(products[1].name).toBeUndefined();
      expect(products[1].type).toBe('Type B');
    });
  });
});