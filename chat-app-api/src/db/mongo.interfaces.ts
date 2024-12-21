export interface MongoResponse<T> {
  message: string;
  payload: T | null;
}
