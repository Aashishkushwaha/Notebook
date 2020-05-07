import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.container}>
      <span className={classes.logo}>Note Karle</span>
      <ul className={classes.optionsContainer}>
        <li>one</li>
        <li>list/grid</li>
        <li onClick={props.onCreateFileHandler}>new</li>
        <li onClick={props.onDeleteFileHandler}>delete</li>
        <li onClick={props.onLockFileHandler}>Lock</li>
      </ul>
      <div className={classes.searchContainer}>
        <input placeholder="search" />
      </div>
    </div>
  );
};

export default Header;
