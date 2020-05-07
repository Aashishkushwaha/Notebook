import React from "react";

const Editor = (props) => {

  return (
    <div className="textareaContainer">
      <textarea readOnly={!props.isEditable} onChange={props.onEditorChangeHandler} value={props.editorText}></textarea>
      <div className="timestamp">{props.lastModified ? props.lastModified: ""}</div>
    </div>
  );
};

export default Editor;
