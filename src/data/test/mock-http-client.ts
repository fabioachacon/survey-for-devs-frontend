import { HttpPostClient, HttpPostParams } from "../http/http-post-client";
import { HttpStatusCode } from "../http/http-status-code";
import { HttpResponseModel } from "../http/models/http-response-model";

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  public url?: string | undefined;
  public body?: T;
  public response: HttpResponseModel<R>;

  constructor() {
    this.response = {
      statusCode: HttpStatusCode.OK,
    };
  }

  async post({ url, body }: HttpPostParams<T>): Promise<HttpResponseModel<R>> {
    this.url = url;
    this.body = body;

    return this.response;
  }
}
