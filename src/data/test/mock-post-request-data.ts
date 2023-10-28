import { HttpPostParams } from "../http/http-post-client";

export const getMockedPostRequestData = (url: string): HttpPostParams<any> => {
  return {
    url: url,
    body: {},
  };
};
