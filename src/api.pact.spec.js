const { Pact } = require("@pact-foundation/pact");
const { API } = require("./api");
const { Product } = require("./product");
const path = require("path");

describe("Product API Pact Tests", () => {
  let provider;
  let api;

  beforeAll(async () => {
    provider = new Pact({
      consumer: "consumer",
      provider: "product-service",
      port: 1234,
      log: path.resolve(process.cwd(), "logs", "pact.log"),
      dir: path.resolve(process.cwd(), "pacts"),
      logLevel: "INFO",
      spec: 4,
    });

    api = new API("http://localhost:1234");
    await provider.setup();
  });

  afterAll(async () => {
    await provider.finalize();
  });

  afterEach(async () => {
    await provider.verify();
  });

  describe("GET /products", () => {
    test("should return all products", async () => {
      const expectedProducts = [
        {
          id: 1,
          name: "Product 1",
          type: "Electronics"
        },
        {
          id: 2,
          name: "Product 2",
          type: "Books"
        }
      ];

      await provider.addInteraction({
        state: "products exist",
        uponReceiving: "a request for all products",
        withRequest: {
          method: "GET",
          path: "/products",
          headers: {
            Accept: "application/json; charset=utf-8",
            Authorization: Pact.term({
              matcher: "Bearer \\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z",
              generate: "Bearer 2023-01-01T12:00:00.000Z"
            })
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: expectedProducts
        }
      });

      const products = await api.getAllProducts();

      expect(products).toHaveLength(2);
      expect(products[0]).toBeInstanceOf(Product);
      expect(products[0].id).toBe(1);
      expect(products[0].name).toBe("Product 1");
      expect(products[0].type).toBe("Electronics");
      expect(products[1]).toBeInstanceOf(Product);
      expect(products[1].id).toBe(2);
      expect(products[1].name).toBe("Product 2");
      expect(products[1].type).toBe("Books");
    });
  });
});