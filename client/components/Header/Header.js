import React from "react";

const Header = (props) => {
  const { classesName, titleName } = props;

  return (
    <header className={classesName}>
      <h1>{titleName}</h1>
    </header>
  );
};

export default Header;
