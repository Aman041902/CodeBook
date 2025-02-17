import React, { useContext } from "react";
import "./createfolder.scss";
import { Modalcontext } from "../Modalprovider";
import { provider } from "../Dataprovider";

const CreateFolder = () => {
  const modelfeat = useContext(Modalcontext);
  const folderfeat = useContext(provider);
  const newFolder = useContext(provider);
  const closemodal = () => {
    modelfeat.closemodal();
  };
  const onsubmitmodal = (e) => {
    e.preventDefault();
    const folder = e.target.folder.value;
    const file = e.target.file.value;
    const language = e.target.language.value;
    console.log(folder, file, language);
    folderfeat.createNewFolder({ folder, file, language });

    closemodal();
  };
  return (
    <div className="modal-cont">
      <form className="modal-body" onSubmit={onsubmitmodal}>
        <span onClick={closemodal} className="material-symbols-outlined">
          cancel
        </span>
        <h1>Create new folder</h1>
        <div className="input-folder">
          <p>Enter folder name:</p>
          <input type="text" placeholder="folder name" name="folder" required />
        </div>

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

export default CreateFolder;
