import React from "react";
import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Modal from "./components/modal";
import FileThumbnail from "./components/fileThumbnail";

class App extends React.Component {
  state = {
    files: [],
    displayFiles: [],
    enableEditor: false,
    editorText: "",
    currentFile: {
      content: "",
      lastModified: null,
      isLocked: false,
      id: null,
    },
    currentFileIndex: 0,
    showModal: false,
    modalContent: "This is modal",
    currentView: "list",
    searchText: "",
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

  onSearchTextChangeHandler = (e) => {
    this.setState(
      {
        searchText: e.target.value,
        displayFiles: this.state.files
      },
      () => {
        let newDisplayFiles = [...this.state.files];
        newDisplayFiles = newDisplayFiles.filter((file, index) => {
          let text = this.state.searchText;
          let regexText = text.replace(/[-[\]{}()*+?.,\\^$|#(\s)]/g, "\\$&");
          let regexp = new RegExp(regexText, "ig");
          let htmlFile = document.getElementById(`${file.id}`);
          let isMatched = false;
          if (text.length && htmlFile) {
            console.log('before text : ' + htmlFile.innerHTML)
            htmlFile.innerHTML = htmlFile.innerText.replace(
              regexp,
              (matched) => {
                isMatched = true;
                return `<mark>${matched}</mark>`;
              }
            );
            console.log('after text : ', htmlFile)
          } else htmlFile.innerHTML = file.content ;// || "New file";
          return isMatched ? htmlFile : null;
        });
      }
    );
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
      id: "file" + (this.state.files.length + 1),
    };
    files.unshift(newFile);
    this.setState({
      files: files,
      displayFiles: files,
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
      displayFiles: newfiles,
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
      displayFiles: files,
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
          onSearchTextChangeHandler={this.onSearchTextChangeHandler}
          serachText={this.state.searchText}
          currentView={this.state.currentView}
        />
        <div className="mainContainer">
          <div
            style={{ overflowY: "auto" }}
            className={
              this.state.currentView === "grid" ? "gridFileContainer" : null
            }
          >
            {this.state.displayFiles.map((file, index) => (
              <FileThumbnail
                key={index}
                file={file}
                index={index}
                id={file.id}
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