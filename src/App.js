import React from "react";
import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";

function App() {
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <span>React Notes App</span>
        <Editor />
        {/* <textarea rows={30} cols={30}></textarea> */}
      </div>
    </div>
  );
}

export default App;
