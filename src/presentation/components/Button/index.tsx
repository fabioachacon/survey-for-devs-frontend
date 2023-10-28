import "./styles.scss";

import React, { FunctionComponent } from "react";
import Spinner from "../Spinner";

type Props = {
  loading?: boolean;
  content: string;
  type?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onSubmit?: React.FormEventHandler<HTMLButtonElement> | undefined;
} & Partial<HTMLButtonElement>;

const Button: FunctionComponent<Props> = (props) => {
  const { onClick, onSubmit, content, loading, type } = props;

  const handleOnSubmit: React.FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    onSubmit && onSubmit(event);
  };

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    onClick && onClick(event);
  };

  return (
    <button type={type} onClick={handleOnClick} onSubmit={handleOnSubmit}>
      {(!loading && content) || (
        <div className="spinner">
          <Spinner />
        </div>
      )}
    </button>
  );
};

export default Button;
