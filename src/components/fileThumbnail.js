import React from "react";
import open from "../assets/images/openlock.svg";
import closed from "../assets/images/closedlock.svg";
// import { renderToString } from "react-dom/server";

const FileThumbnail = ({
  file,
  active,
  index,
  onChangeCurrentFileHandler,
  id,
}) => {
  let assignedClasses = ["fileContainer"];
  assignedClasses.push(active ? "activeFile" : null);
  return (
    <div
      className={assignedClasses.join(" ")}
      onClick={() => onChangeCurrentFileHandler(index)}
    >
      <li className="file" id={id} style={{ textOverflow: "ellipsis" }}>
        {file.content}
      </li>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <img
          style={{ height: "1.5rem" }}
          src={file.isLocked ? closed : open}
          alt="lock/unlocked"
        />
        <span style={{ fontSize: ".7rem" }}>{file.lastModified}</span>
      </div>
    </div>
  );
};

export default FileThumbnail;
