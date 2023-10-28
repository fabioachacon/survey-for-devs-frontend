import "./styles.scss";

import React, { FunctionComponent, useState } from "react";

type Props = Partial<React.InputHTMLAttributes<HTMLInputElement>>;

const Input: FunctionComponent<Props> = (props) => {
  const [value, setValue] = useState("");

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    event.preventDefault();

    if (props.onChange) {
      props.onChange(event);
    }

    setValue(event.target.value || "");
  };

  return (
    <input
      {...props}
      id={props.type}
      name={props.type}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default Input;
