import React from "react";

const Editor = (props) => {

  return (
    <div className="textareaContainer">
      <textarea readOnly={!props.isEditable} onChange={props.onEditorChangeHandler} value={props.editorText}
        placeholder={props.isEditable ? props.editorText === "" ? "Type something..." : null : null}></textarea>
      <div className="timestamp">{props.lastModified ? props.lastModified: ""}</div>
    </div>
  );
};

export default Editor;
