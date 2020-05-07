import React from "react";

const FileThumbnail = ({ file, active, index, onChangeCurrentFileHandler }) => {
  let assignedClasses = ["fileContainer"];
  assignedClasses.push(active ? "activeFile" : null);
  return (
    <div
      className={assignedClasses.join(" ")}
      onClick={() => onChangeCurrentFileHandler(index)}
    >
      <li className="file" style={{ textOverflow: "ellipsis" }}>
        {file.content}
      </li>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{file.isLocked ? "Locked" : ""}</span>
        <span>{file.lastModified}</span>
      </div>
    </div>
  );
};

export default FileThumbnail;
