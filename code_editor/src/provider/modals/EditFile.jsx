import React, { useContext } from "react";
import "./createfolder.scss";
import { Modalcontext } from "../Modalprovider";
import { styles } from "./Folderl";
import { provider } from "../Dataprovider";

const EditFile = () => {
  const modelfeat = useContext(Modalcontext);
  const pro = useContext(provider);
  const close = () => {
    modelfeat.closemodal();
  };

  const submit = (e) => {
    e.preventDefault();
    const newtitle = e.target.fileName.value;
    console.log(newtitle);
    if (!newtitle) {
      alert("Please enter a file name.");
      return;
    }
    pro.editfiletitle(
      newtitle,
      modelfeat.modalpayload.folderid,
      modelfeat.modalpayload.fileid
    );
    modelfeat.closemodal();
  };
  return (
    <div className="modal-cont">
      <form onSubmit={submit} className="modal-body">
        <span onClick={close} className="material-symbols-outlined">
          cancel
        </span>
        <h1>Update file title</h1>
        <div style={styles.inputCont}>
          <input
            style={styles.input}
            type="text"
            placeholder="edit file name"
            name="fileName"
          />
          <button style={styles.btn} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFile;
