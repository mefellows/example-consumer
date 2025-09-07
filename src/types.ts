// Type definitions for the Product API

export interface ProductData {
  id: string;
  name: string;
  type: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

// API Client interface
export interface IAPIClient {
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product>;
}

// Product class interface
export interface IProduct {
  id: string;
  name: string;
  type: string;
}

// Auth token generator
export interface IAuthTokenGenerator {
  generateAuthToken(): string;
}