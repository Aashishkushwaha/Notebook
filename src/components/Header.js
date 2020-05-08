import React from "react";
import classes from "./Header.module.css";
import add from '../assets/images/add.svg';
import trash from '../assets/images/trash.svg';
import list from '../assets/images/list.svg';
import lock from '../assets/images/openlock.svg';
import grid from '../assets/images/grid.svg';


const Header = (props) => {
  return (
    <div className={classes.container}>
      <span className={classes.logo}>Note Karle</span>
      <ul className={classes.optionsContainer}>
        <li>one</li>
        <li onClick={props.onViewChangeHandler} title={props.currentView === "list" ? "Grid view" : "List view"}><img src={props.currentView === "list" ? grid : list} alt="grid/list view"/></li>
        <li onClick={props.onCreateFileHandler} title="Create file"><img src={add} alt="new file"/></li>
        <li onClick={props.onDeleteFileHandler} title="Delete file"><img src={trash} alt="delete file"/></li>
        <li onClick={props.onLockFileHandler} title="Lock/Unlock file"><img src={lock} alt="lock file"/></li>
      </ul>
      <div className={classes.searchContainer}>
        <input placeholder="search" />
      </div>
    </div>
  );
};

export default Header;
