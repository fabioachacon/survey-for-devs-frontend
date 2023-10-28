import { InternalServerError } from "../../http/errors/InternalServerError";
import { NotFoundError } from "../../http/errors/NotFoundError";
import { UnexpectedError } from "../../http/errors/UnexpectedError";
import { AccountModel } from "../../../domain/models/AccountModel";
import {
  AuthParams,
  Authentication,
} from "../../../domain/usecases/Authentication";
import { HttpPostClient } from "../../http/http-post-client";
import { HttpStatusCode } from "../../http/http-status-code";
import { InvalidCredentialsError } from "../../../domain/errors/InvalidCredentialsError";

export class RemoteAuthentication implements Authentication {
  private readonly url: string;
  private readonly httpPostClient: HttpPostClient<AuthParams, AccountModel>;

  constructor(
    url: string,
    httpPostClient: HttpPostClient<AuthParams, AccountModel>
  ) {
    this.url = url;
    this.httpPostClient = httpPostClient;
  }

  public async auth(authParams: AuthParams): Promise<AccountModel | undefined> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: authParams,
    });

    if (response.statusCode === HttpStatusCode.OK) {
      return response.body;
    } else {
      this.handleError(response.statusCode);
    }
  }

  private handleError(statusCode: HttpStatusCode) {
    switch (statusCode) {
      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialsError();
      case HttpStatusCode.NOT_FOUND:
        throw new NotFoundError();
      case HttpStatusCode.INTERNAL_SERVER_ERROR:
        throw new InternalServerError();
      default:
        throw new UnexpectedError();
    }
  }
}
