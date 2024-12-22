import mongoose from 'mongoose';

abstract class ErrorHandler {
  abstract handleError(error: unknown): void;

  protected logError(error: unknown): void {
    if (error instanceof Error) {
      console.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      console.error(error.stack);
    } else {
      console.error(`[${new Date().toISOString()}] Unknown error:`, error);
    }
  }
}

export class MongoErrorHandler extends ErrorHandler {
  handleError(error: unknown) {
    if (error instanceof mongoose.Error) {
      this.logError('MongoDB error occurred: ' + error.message);
    } else {
      this.logError('Non-MongoDB error occurred: ' + error);
    }
  }
}

export class QuotableErrorHandler extends ErrorHandler {
  handleError(error: unknown): void {
    this.logError('Quotable error occurred: ' + error);
  }
}
