import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import "./folder.scss";
import EditorC from "./EditorC";
import { makesubmission } from "./runcode";

const Folder = () => {
  const params = useParams();
  const { folderid, fileid } = params;
  console.log(folderid);
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");
  const [showloader, setshowloader] = useState(false);

  const importinput = (e) => {
    const file = e.target.files[0];
    const filetype = file.type.includes("text");
    if (filetype) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (val) => {
        const importedCode = val.target.result;
        setinput(importedCode);
      };
    } else {
      alert("Please select a text file.");
    }
  };

  const exportoutput = () => {
    const out = output.trim();
    if (!out) {
      alert("The output field is not filled.");
      return;
    }
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.txt";
    a.click();
  };

  const callback = ({ apiStatus, data, message }) => {
    if (apiStatus === "loading") {
      setshowloader(true);
    } else if (apiStatus === "error") {
      setshowloader(false);
      setoutput("something went wrong");
      console.error(message);
    } else {
      setshowloader(false);
      if (data.status.id === 3) {
        setoutput(atob(data.stdout));
      } else {
        setoutput(atob(data.stderr));
      }
      console.log(data);
    }
  };

  const runcode = useCallback(
    ({ code, language }) => {
      console.log(code, language);
      makesubmission({ code, language, callback, inp: input });
    },
    [input]
  );
  return (
    <div className="file-cont">
      <div className="header">
        <img src="/logo1.png" alt="logo" />
      </div>
      <div className="content">
        <div className="editor-cont">
          <EditorC
            folderid={folderid}
            fileid={fileid}
            runcode={runcode}
          ></EditorC>
        </div>
        <div className="input-cont">
          <div className="input-header">
            <b>Input:</b>
            <label htmlFor="input" className="input-label">
              <span class="material-symbols-outlined">upload_file</span>
              <span>Import input</span>
            </label>
            <input
              type="file"
              id="input"
              style={{ display: "none" }}
              onChange={importinput}
            />
          </div>
          <textarea
            name=""
            id=""
            value={input}
            onChange={(e) => setinput(e.target.value)}
          ></textarea>
        </div>
        <div className="input-cont">
          <div className="input-header">
            <b>Output:</b>
            <button className="input-label" onClick={exportoutput}>
              <span class="material-symbols-outlined">download</span>
              <span>Save output</span>
            </button>
          </div>
          <textarea
            value={output}
            onChange={(e) => setoutput(e.target.value)}
          ></textarea>
        </div>
      </div>

      {showloader && (
        <div className="load">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Folder;
