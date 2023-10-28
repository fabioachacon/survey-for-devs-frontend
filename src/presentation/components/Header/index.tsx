import "./style.scss";

import React, { memo } from "react";
import Logo from "../Logo";

const Header = () => {
  return (
    <header className="loginHeader">
      <Logo />
      <h2>4Dev - Survey for Developers</h2>
    </header>
  );
};

export default memo(Header);
