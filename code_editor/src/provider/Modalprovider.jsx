import React from "react";
import { createContext } from "react";
import CreateFolder from "./modals/CreateFolder";
import { useState } from "react";

export const Modalcontext = createContext();

export const modals = {
  folderl: "create-folderl",
  folderr: "create-folderr",
  updatefolder: "update-folder",
  updatefile: "update-file",
  createfile: "create-file",
};

const Modalprovider = ({ children }) => {
  const [modaltype, setmodal] = useState(null);
  const [modalpayload, setmodalpayload] = useState(null);

  const modalfeat = {
    openmodal: (e) => {
      setmodal(e);
      console.log(` ${modaltype} lol`);
    },
    closemodal: () => {
      setmodal(null);
      console.log(` ${modaltype} lol123`);
    },
    activemodal: modaltype,
    modalpayload,
    setmodalpayload,
  };
  return (
    <Modalcontext.Provider value={modalfeat}>{children}</Modalcontext.Provider>
  );
};

export default Modalprovider;
