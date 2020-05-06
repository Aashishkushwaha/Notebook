import React from "react";

const Editor = (props) => {

  return (
    <div className="textareaContainer">
      <textarea></textarea>
      <div className="timestamp">{new Date().toISOString()}</div>
    </div>
  );
};

export default Editor;
