import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    imageURL: ""
  };

  handleUploadImage = e => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("filename", this.fileName.value);

    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: data
    }).then(response => {
      response.json().then(body => {
        this.setState({ imageURL: `http://localhost:4000/${body.file}` });
      });
    });
  };

  render() {
    const { imageURL } = this.state;

    return (
      <div className="App">
        <h1>FileUpload</h1>
        <form onSubmit={this.handleUploadImage}>
          <div>
            <input
              type="file"
              ref={ref => {
                this.uploadInput = ref;
              }}
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              ref={ref => {
                this.fileName = ref;
              }}
              placeholder="Enter the desired name of file"
            />
          </div>
          <br />
          <div>
            <button>Upload</button>
          </div>
          <hr />
          <p>Uploaded Image:</p>
          <img src={imageURL} alt="img" />
        </form>
      </div>
    );
  }
}
