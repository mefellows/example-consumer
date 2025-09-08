const { PactV4, MatchersV4 } = require('@pact-foundation/pact');
const { API } = require('./api');

const { like, regex } = MatchersV4;

describe('PactV4 Test for Product API', () => {
  const provider = new PactV4({
    consumer: 'ProductConsumer',
    provider: 'ProductProvider',
  });

  describe('when a request to get a product by ID is made', () => {
    it('should return the product details', async () => {
      await provider
        .given('a product with ID 123 exists')
        .uponReceiving('a request to get a product by ID')
        .withRequest({
          method: 'GET',
          path: '/product/123',
          headers: {
            Authorization: regex({
              generate: 'Bearer 2023-10-10T10:00:00.000Z',
              matcher: 'Bearer \\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z',
            }),
          },
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: like({
            id: '123',
            name: 'Product Name',
            type: 'Product Type',
          }),
        });

      await provider.executeTest(async (mockServer) => {
        const api = new API(mockServer.url);
        const product = await api.getProduct('123');
        expect(product).toEqual({
          id: '123',
          name: 'Product Name',
          type: 'Product Type',
        });
      });
    });
  });
});