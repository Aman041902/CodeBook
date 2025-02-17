import React from "react";
import { useContext } from "react";
import { Modalcontext } from "../Modalprovider";
import { provider } from "../Dataprovider";
import { styles } from "./Folderl";

const UpdateFolder = () => {
  const modelfeat = useContext(Modalcontext);
  const { modalpayload } = useContext(Modalcontext);
  const { editfoldert } = useContext(provider);
  const closemodal = () => {
    modelfeat.closemodal();
  };

  const submit = (e) => {
    e.preventDefault();
    const newtitle = e.target.folder.value;
    console.log(newtitle);
    editfoldert(newtitle, modalpayload);
    closemodal();
  };

  return (
    <div className="modal-cont">
      <form onSubmit={submit} className="modal-body">
        <span onClick={closemodal} className="material-symbols-outlined">
          cancel
        </span>
        <h1>Update Folder title</h1>
        <div style={styles.inputCont}>
          <input
            style={styles.input}
            type="text"
            placeholder="enter folder name"
            name="folder"
          />
          <button style={styles.btn} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFolder;
