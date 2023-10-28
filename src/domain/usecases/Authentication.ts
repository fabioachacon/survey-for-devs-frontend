import { AccountModel } from "../models/AccountModel";

export type AuthParams = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(data: AuthParams): Promise<AccountModel | undefined>;
}
