import React from "react";
import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Modal from "./components/modal";
import FileThumbnail from "./components/fileThumbnail";

class App extends React.Component {
  state = {
    files: [],
    enableEditor: false,
    editorText: "",
    currentFile: {
      content: "",
      lastModified: null,
      isLocked: false,
    },
    currentFileIndex: 0,
    showModal: false,
    modalContent: "This is modal",
    currentView: "list",
  };

  onEditorChangeHandler = (e) => {
    const { files, currentFileIndex } = this.state;
    files[currentFileIndex].content = e.target.value;
    files[currentFileIndex].lastModified = new Date().toISOString();
    this.setState({
      editorText: e.target.value,
      currentFile: {
        content: e.target.value,
        lastModified: new Date().toISOString(),
        isLocked: this.state.currentFile.isLocked,
      },
      files: files,
    });
  };

  onModalHandler = () => {
    this.setState((state) => {
      return {
        showModal: !state.showModal,
      };
    });
  };

  onChangeCurrentFileHandler = (id) => {
    this.setState({
      currentFileIndex: id,
      editorText: this.state.files[id].content,
      currentFile: this.state.files[id],
      enableEditor: true,
    });
  };

  onCreateFileHandler = () => {
    let files = this.state.files;
    let newFile = {
      content: "",
      lastModified: new Date().toISOString(),
      isLocked: false,
    };
    files.unshift(newFile);
    this.setState({
      files: files,
      enableEditor: true,
      editorText: "",
      currentFile: newFile,
      currentFileIndex: 0,
    });
  };

  onViewChangeHandler = () => {
    this.setState((state) => ({
      currentView: state.currentView === "list" ? "grid" : "list",
    }));
  };

  onDeleteFileHandler = () => {
    const { files, currentFileIndex } = { ...this.state };

    if (currentFileIndex !== -1)
      if (files[currentFileIndex].isLocked) {
        this.setState({
          showModal: true,
          modalContent: `File can't be deleted because file is locked. 
          First unlock the file then try to delete it.`,
        });
        return;
      }

    let newfiles = [...files];
    newfiles = newfiles.filter((file, index) => {
      if (index !== currentFileIndex) return file;
    });

    this.setState({
      currentFile: {
        content: "",
        lastModified: null,
        isLocked: false,
      },
      files: newfiles,
      editorText: "",
      enableEditor: false,
      currentFileIndex: -1,
    });
  };

  onLockFileHandler = () => {
    const { files, currentFileIndex } = { ...this.state };
    const currentFile = files[currentFileIndex];
    currentFile.isLocked = !currentFile.isLocked;
    files[currentFileIndex] = currentFile;
    this.setState({
      currentFile: currentFile,
      files,
    });
  };

  render() {
    return (
      <div>
        <Modal
          onModalHandler={this.onModalHandler}
          showModal={this.state.showModal}
        >
          {" "}
          {this.state.modalContent}
        </Modal>
        <Header
          onCreateFileHandler={this.onCreateFileHandler}
          onLockFileHandler={this.onLockFileHandler}
          onDeleteFileHandler={this.onDeleteFileHandler}
          onViewChangeHandler={this.onViewChangeHandler}
        />
        <div className="mainContainer">
          <div style={{ overflowY: 'auto' }}
            className={
              this.state.currentView === "grid" ? "gridFileContainer" : null
            }
          >
            {this.state.files.map((file, index) => (
              <FileThumbnail
                key={index}
                file={file}
                index={index}
                active={index === this.state.currentFileIndex}
                onChangeCurrentFileHandler={this.onChangeCurrentFileHandler}
              />
            ))}
            {/* { this.state.files.length } */}
          </div>
          <Editor
            lastModified={this.state.currentFile.lastModified}
            editorText={this.state.editorText}
            isEditable={this.state.enableEditor}
            onEditorChangeHandler={this.onEditorChangeHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;
