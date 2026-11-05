import type { APIRequestContext, APIResponse } from '@playwright/test';

export class MercadoLibreService {
  private readonly request: APIRequestContext;

  private readonly endpoint =
    'https://www.mercadolibre.com.ar/menu/departments';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getDepartments(): Promise<APIResponse> {
    const response = await this.request.get(this.endpoint);

    return response;
  }
}