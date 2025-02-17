import React from "react";
import "./folderl.scss";
import "./createfolder.scss";
import { Modalcontext } from "../Modalprovider";
import { useContext } from "react";
import { provider } from "../Dataprovider";

const Folderl = () => {
  const modelfeat = useContext(Modalcontext);
  const {newFolder} = useContext(provider);
  const submit = (e) => {
    e.preventDefault();
    const name = e.target.folder.value;
    console.log(name);
    console.log("submit hogaya");
    newFolder(name);
  };
  const closemodal = () => {
    modelfeat.closemodal();
  };
  return (
    <div className="modal-cont">
      <form action="" className="modal-body" onSubmit={submit}>
        <span onClick={closemodal} className="material-symbols-outlined">
          cancel
        </span>
        <h1>Create new folder</h1>

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

export const styles = {
  inputCont: {
    display: "flex",
    gap: "10px",
  },
  input: {
    border: "none",
    outline: "none",
    padding: "10px",
    borderRadius: "5px",
    flexGrow: "1",
  },
  btn: {
    border: "none",
    outline: "none",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "green",
    color: "white",
    cursor: "pointer",
  },

  // btn hover: {
  //   backgroundColor: "blue",
  // },
};

export default Folderl;
