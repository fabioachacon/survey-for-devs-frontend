import { faker } from "@faker-js/faker";
import axios from "axios";

export const getMockedAxiosPostRequest = () => {
  const axios = getMockedAxios();

  const mockedAxiosResult = getMockedAxiosResult();
  axios.post.mockResolvedValue(mockedAxiosResult);

  return axios;
};

export const getMockedAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  return mockedAxios;
};

export const getMockedAxiosResult = () => {
  return {
    data: "",
    status: faker.number.int(),
  };
};
