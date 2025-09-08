import { PactV4, MatchersV3 } from '@pact-foundation/pact';
import { API } from './api';
import { Product } from './product';
import path from 'path';

const { like, eachLike } = MatchersV3;

describe('API Pact Tests', () => {
  let pact: PactV4;
  let api: API;

  beforeAll(() => {
    pact = new PactV4({
      consumer: 'consumer',
      provider: 'products-service',
      dir: path.resolve(process.cwd(), 'pacts'),
    });
  });

  describe('getAllProducts', () => {
    it('should return all products successfully', async () => {
      // Arrange
      const expectedProducts = [
        { id: 1, name: 'Product 1', type: 'TYPE_A' },
        { id: 2, name: 'Product 2', type: 'TYPE_B' }
      ];

      await pact
        .addInteraction()
        .given('products exist')
        .uponReceiving('a request for all products')
        .withRequest({
          method: 'GET',
          path: '/products',
          headers: {
            'Authorization': like('Bearer 2023-01-01T00:00:00.000Z'),
            'Accept': 'application/json; charset=utf-8'
          },
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: eachLike({
            id: like(1),
            name: like('Product 1'),
            type: like('TYPE_A')
          }, { min: 2 })
        });

      await pact.executeTest(async (mockService) => {
        // Act
        api = new API(mockService.url);
        const products = await api.getAllProducts();

        // Assert
        expect(products).toHaveLength(2);
        expect(products[0]).toBeInstanceOf(Product);
        expect(products[0].id).toBe(1);
        expect(products[0].name).toBe('Product 1');
        expect(products[0].type).toBe('TYPE_A');
        expect(products[1]).toBeInstanceOf(Product);
        expect(products[1].id).toBe(2);
        expect(products[1].name).toBe('Product 2');
        expect(products[1].type).toBe('TYPE_B');
      });
    });
  });
});