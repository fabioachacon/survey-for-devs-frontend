import axios from "axios";
import {
  HttpPostClient,
  HttpPostParams,
} from "../../../data/http/http-post-client";
import { HttpResponseModel } from "../../../data/http/models/http-response-model";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  public async post(
    params: HttpPostParams<unknown>
  ): Promise<HttpResponseModel<any>> {
    const response = await axios.post(params.url, params.body);

    return {
      statusCode: response?.status,
      body: response?.data,
    };
  }
}
