import React from "react";
import "./createfolder.scss";
import { useContext } from "react";
import { Modalcontext } from "../Modalprovider";
import { styles } from "./Folderl";
import { v4 } from "uuid";
import { provider } from "../Dataprovider";

const defaultCode = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "hello world";
    return 0;
}`,
  java: `class HelloWorld {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}`,
  python: `print("hello world")`,
  javascript: `console.log("hello world")`,
};

const CreateFile = () => {
  const modelfeat = useContext(Modalcontext);
  const { modalpayload, closemodal } = useContext(Modalcontext);
  const { createfile } = useContext(provider);
  const close = () => {
    modelfeat.closemodal();
  };

  const submit = (e) => {
    e.preventDefault();
    const filename = e.target.file.value;
    const language = e.target.language.value;
    console.log(`${filename} ${language}`);
    console.log(defaultCode[language]);
    const file = {
      id: v4(),
      title: filename,
      code: defaultCode[language],
      language: language,
    };
    createfile(modalpayload, file);
    closemodal();
  };

  return (
    <div className="modal-cont">
      <form className="modal-body" onSubmit={submit}>
        <span onClick={close} className="material-symbols-outlined">
          cancel
        </span>
        <h1>Create new file</h1>

        <div className="input-file">
          <p>Enter file name:</p>
          <input type="text" placeholder="file name" name="file" required />
        </div>

        <div className="options">
          <select name="language" required>
            <option value="cpp">CPP</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
          </select>

          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateFile;
