import { QuotableErrorHandler } from '../../utils/error-handlers';
import { STOIC_QUOTE_URL } from './quotable.constants';
import axios, { AxiosInstance } from 'axios';

class QuotableService {
  private readonly errorHandler = new QuotableErrorHandler();
  private readonly http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({ baseURL });
  }

  async randomQuote<T>(endpoint: string): Promise<T | null> {
    try {
      const response = await this.http.get<T>(endpoint);
      return response.data;
    } catch (error) {
      this.errorHandler.handleError(error);
      return null;
    }
  }
}

export const stoicQuoteService = new QuotableService(STOIC_QUOTE_URL);
