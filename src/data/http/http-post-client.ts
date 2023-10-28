import { HttpResponseModel } from "./models/http-response-model";

export type HttpPostParams<T = Record<string, any>> = {
  url: string;
  body?: T;
};

export interface HttpPostClient<T, R> {
  post(params: HttpPostParams<T>): Promise<HttpResponseModel<R>>;
}
