import { AccountModel } from "../models/AccountModel";
import { AuthParams } from "../usecases/Authentication";
import { faker } from "@faker-js/faker";

export const getMockedAuthenticationData = (): AuthParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const getMockedAccountModel = (): AccountModel => {
  return {
    accessToken: faker.string.uuid(),
  };
};
