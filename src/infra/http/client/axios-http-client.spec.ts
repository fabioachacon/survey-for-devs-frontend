import { AxiosHttpClient } from "./axios-http-client";
import { faker } from "@faker-js/faker";

import { getMockedAxiosPostRequest } from "../../test/mock-axios";
import { AxiosStatic } from "axios";
import { HttpResponseModel } from "../../../data/http/models/http-response-model";
import { getMockedPostRequestData } from "../../../data/test/mock-post-request-data";

type Sut = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<AxiosStatic>;
};

jest.mock("axios");

const mockedAxios = getMockedAxiosPostRequest();
const mockedUrl = faker.internet.url();

const getSut = (): Sut => {
  return {
    sut: new AxiosHttpClient(),
    mockedAxios: mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  test("Should call axios with correct url and http method", async () => {
    const mockedRequestData = getMockedPostRequestData(mockedUrl);

    const { sut } = getSut();
    await sut.post(mockedRequestData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      mockedRequestData.url,
      mockedRequestData.body
    );
  });

  test("Should return correct statusCode and body", async () => {
    const mockedRequestData = getMockedPostRequestData(mockedUrl);

    const { sut } = getSut();
    const httpReponse = sut.post(mockedRequestData);

    expect(httpReponse).toEqual<HttpResponseModel<any>>(
      mockedAxios.post.mock.results[0].value
    );
  });
});
