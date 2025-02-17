import React from "react";
import CreateFolder from "./CreateFolder";
import { Modalcontext, modals } from "../Modalprovider";
import { useContext } from "react";
import Folderl from "./Folderl";
import UpdateFolder from "./UpdateFolder";
import EditFile from "./EditFile";
import CreateFile from "./CreateFile";

const Modal = () => {
  const access = useContext(Modalcontext);

  return (
    <>
      {access.activemodal === modals.folderl ? <CreateFolder /> : null}
      {access.activemodal === modals.folderr ? <Folderl></Folderl> : null}
      {access.activemodal === modals.updatefolder ? (
        <UpdateFolder></UpdateFolder>
      ) : null}
      {access.activemodal === modals.updatefile ? <EditFile></EditFile> : null}
      {access.activemodal === modals.createfile ? (
        <CreateFile></CreateFile>
      ) : null}

      {console.log(access.activemodal)}
    </>
  );
};

export default Modal;
