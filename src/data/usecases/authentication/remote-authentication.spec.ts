import { faker } from "@faker-js/faker";

import { InternalServerError } from "../../http/errors/InternalServerError";
import { NotFoundError } from "../../http/errors/NotFoundError";
import { AccountModel } from "../../../domain/models/AccountModel";

import { AuthParams } from "../../../domain/usecases/Authentication";
import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

import { InvalidCredentialsError } from "../../../domain/errors/InvalidCredentialsError";
import { HttpStatusCode } from "../../http/http-status-code";

import {
  getMockedAccountModel,
  getMockedAuthenticationData,
} from "../../../domain/test/mock-authentication";

type Sut = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthParams, AccountModel>;
};

const mockedUrl = faker.internet.url();

const getSut = (url = mockedUrl): Sut => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthParams, AccountModel>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const { sut, httpPostClientSpy } = getSut();

    const mockAuthParams = getMockedAuthenticationData();
    await sut.auth(mockAuthParams);

    expect(httpPostClientSpy.url).toBe(mockedUrl);
  });

  test("Should call HttpPostClient with correct body", () => {
    const { sut, httpPostClientSpy } = getSut();

    const mockAuthParams = getMockedAuthenticationData();
    sut.auth(mockAuthParams);

    expect(httpPostClientSpy.body).toEqual(mockAuthParams);
  });

  test("Should throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = getSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    };

    const mockAuthParams = getMockedAuthenticationData();
    const promise = sut.auth(mockAuthParams);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("Should throw NotFountError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = getSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };

    const mockAuthParams = getMockedAuthenticationData();
    const promise = sut.auth(mockAuthParams);

    await expect(promise).rejects.toThrow(new NotFoundError());
  });

  test("Should throw InternalServerError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = getSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };

    const mockAuthParams = getMockedAuthenticationData();
    const promise = sut.auth(mockAuthParams);

    await expect(promise).rejects.toThrow(new InternalServerError());
  });

  test("Should return an AccountModel on if HttpPostClient status code is 200", async () => {
    const { sut, httpPostClientSpy } = getSut();

    const httpResponseBody = getMockedAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: httpResponseBody,
    };

    const mockAuthParams = getMockedAuthenticationData();
    const account = await sut.auth(mockAuthParams);

    expect(account).toEqual(httpResponseBody);
  });
});
