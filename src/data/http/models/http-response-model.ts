import { HttpStatusCode } from "../http-status-code";

export type HttpResponseModel<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};
