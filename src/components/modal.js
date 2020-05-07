import React from "react";

const Modal = (props) => {
  let assignedClasses = ["modal"];
  if (!props.showModal) assignedClasses.push("hide-modal");
  else assignedClasses = ["modal"];
  return (
    <div className={assignedClasses.join(" ")}>
      {props.children}
      <span onClick={props.onModalHandler} className="close">
        &times;
      </span>
    </div>
  );
};

export default Modal;
