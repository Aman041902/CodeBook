import React, { useContext, useRef } from "react";
import "./editor.scss";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useEffect } from "react";
import { provider } from "../../provider/Dataprovider";

const EditorC = ({ folderid, fileid, runcode }) => {
  const { getcode, getlang, updatelang, save } = useContext(provider);

  const [screen, setscreen] = useState(false);

  const [code, setcode] = useState(() => getcode(folderid, fileid));
  const [language, setlanguage] = useState(() => getlang(folderid, fileid));

  console.log(language, code);
  console.log("kglg");

  const [theme, settheme] = useState("vs-dark");
  const coderef = useRef(code);
  const editorOptions = {
    automaticLayout: true, // Automatically adjust layout when container resizes
    fontSize: 16, // Comfortable font size for readability
    fontFamily: "Fira Code, monospace", // Popular coding font with ligatures support
    lineHeight: 24, // Slightly larger line height for better readability
    cursorStyle: "block", // Block cursor for clear visibility
    cursorBlinking: "smooth", // Smooth blinking cursor animation
    minimap: {
      enabled: true, // Show minimap for quick navigation
      maxColumn: 80, // Minimap column limit for readability
    },
    wordWrap: "on", // Wrap long lines to fit within the editor
    wrappingIndent: "same", // Indent wrapped lines to the same level as the parent
    scrollBeyondLastLine: false, // Prevent extra spacing beyond the last line
    smoothScrolling: true, // Enable smooth scrolling for better UX
    tabSize: 2, // Indentation size for tabs
    insertSpaces: true, // Insert spaces when the Tab key is pressed
    renderWhitespace: "boundary", // Show whitespace at text boundaries
    renderLineHighlight: "all", // Highlight the entire active line
    renderIndentGuides: true, // Show guides for indentation
    folding: true, // Enable code folding
    bracketPairColorization: true, // Colorize matching brackets
    autoClosingBrackets: "always", // Automatically close brackets
    formatOnPaste: true, // Automatically format code when pasted
    formatOnType: true, // Automatically format code as you type
    scrollbar: {
      vertical: "visible", // Always show vertical scrollbar
      horizontal: "auto", // Automatically show horizontal scrollbar
      verticalScrollbarSize: 10, // Slim vertical scrollbar
      horizontalScrollbarSize: 8, // Slim horizontal scrollbar
    },
    quickSuggestions: true, // Show quick suggestions as you type
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "smart",
    snippetSuggestions: "top",
    showFoldingControls: "always",
  };

  const changecode = (value) => {
    coderef.current = value;
  };

  const importcode = (value) => {
    const file = value.target.files[0];
    const filetype = file.type.includes("text");
    if (filetype) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (val) => {
        const importedCode = val.target.result;
        setcode(importedCode);
        coderef.current = importedCode;
      };
    } else {
      alert("Please select a text file.");
    }
  };

  const savecode = () => {
    const text = coderef.current;
    if (!text) {
      alert("Please enter a code.");
    } else {
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "file.txt";
      a.click();
    }
  };

  const changelang = (val) => {
    updatelang(folderid, fileid, val.target.value);
    const newcode = getcode(folderid, fileid);
    setcode(newcode);
    coderef.current = newcode;
    setlanguage(val.target.value);
  };

  const changetheme = (val) => {
    settheme(val.target.value);
  };
  const onsavecode = () => {
    save(folderid, fileid, coderef.current);
    alert("code saved");
  };

  const fullscreen = () => {
    setscreen(!screen);
  };

  const sub = () => {
    runcode({
      code: coderef.current,
      language: language,
    });
  };
  return (
    <div className="main-editor-cont" style={screen ? styles.fullscreen : {}}>
      <div className="head">
        <div className="left-head">
          <button onClick={onsavecode}>save</button>
        </div>

        <div className="right-head">
          <select name="" id="" onChange={changelang} value={language}>
            <option value="cpp">CPP</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
          </select>
          <select name="" id="" onChange={changetheme} value={theme}>
            <option value="vs-dark">dark-mode</option>
            <option value="vs-light">light-mode</option>
          </select>
        </div>
      </div>
      <div className="body">
        <Editor
          height="99.99%"
          width={"99.99%"}
          language={language}
          value={code}
          theme={theme}
          options={editorOptions}
          onChange={changecode}
        />
      </div>
      <div className="footer">
        <button className="btn" onClick={fullscreen}>
          <span class="material-symbols-outlined">open_in_full</span>
        </button>
        <label htmlFor="import-code" className="btn">
          <span class="material-symbols-outlined">upload_file</span>
          <span>Import code</span>
        </label>
        <input
          type="file"
          id="import-code"
          style={{ display: "none" }}
          onChange={importcode}
        />
        <button className="btn" onClick={savecode}>
          <span class="material-symbols-outlined">download</span>
          <span>Save</span>
        </button>
        <button className="btn" onClick={sub}>
          submit
        </button>
      </div>
    </div>
  );
};

const styles = {
  fullscreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
  },
};

export default EditorC;
