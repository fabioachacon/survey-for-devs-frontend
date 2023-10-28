import "./styles.scss";

import Button from "../Button";
import Input from "../Input";
import { FunctionComponent } from "react";

type Props = {
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
};

const Form: FunctionComponent<Props> = ({ onSubmit }) => {
  return (
    <form className="loginForm">
      <h1>Sign In to your Account</h1>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button type="submit" content="Sign In" onSubmit={onSubmit} />
      <span>
        Don't have an account? <span>create one</span>
      </span>
    </form>
  );
};

export default Form;
