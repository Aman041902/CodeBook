import React, { useContext } from "react";
import "./right.scss";
import { provider } from "../../provider/Dataprovider";
import { Modalcontext, modals } from "../../provider/Modalprovider";
import { useNavigate } from "react-router-dom";

const Folders = ({ folder_title, cards, id }) => {
  const { deletefolder, deletefile } = useContext(provider);
  const access = useContext(Modalcontext);
  const { setmodalpayload } = useContext(Modalcontext);
  const navigate = useNavigate();

  const editfolder = () => {
    setmodalpayload(id);
    access.openmodal(modals.updatefolder);
  };

  const del = () => {
    deletefolder(id);
  };

  const newfile = () => {
    setmodalpayload(id);
    access.openmodal(modals.createfile);
  };

  return (
    <div className="folder-cont">
      <div className="header-f">
        <div className="folder-name">
          <span class="material-symbols-outlined">folder</span>
          <span>{folder_title}</span>
        </div>
        <div className="folder-action">
          <span className="material-symbols-outlined" onClick={del}>
            delete
          </span>
          <span className="material-symbols-outlined" onClick={editfolder}>
            edit_note
          </span>

          <button onClick={newfile}>
            <span className="material-symbols-outlined">add_circle</span>
            <span>New file</span>
          </button>
        </div>
      </div>
      <div className="cards"></div>

      <div className="cards-cont">
        {cards?.map((file, index) => {
          const editfile = () => {
            setmodalpayload({
              folderid: id,
              fileid: file.id,
            });
            access.openmodal(modals.updatefile);
          };

          const del = () => {
            deletefile(id, file.id);
          };

          const nav = () => {
            // console.log(`${id} - ${file.id}`);
            navigate(`/folder/${id}/${file.id}`);
          };
          return (
            <div className="card" key={index}>
              <img
                src="right.png"
                alt="logo"
                onClick={nav}
                style={{ cursor: "pointer" }}
              />

              <div
                className="card-info"
                onClick={nav}
                style={{ cursor: "pointer" }}
              >
                <span>{file.title}</span>
                <span>Language:{file.language}</span>
              </div>

              <div className="card-action">
                <span class="material-symbols-outlined" onClick={del}>
                  delete
                </span>
                <span class="material-symbols-outlined" onClick={editfile}>
                  edit_note
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Right = () => {
  const val = useContext(provider);
  const access = useContext(Modalcontext);

  const openfolder = () => {
    access.openmodal(modals.updatefolder);
  };

  return (
    <div className="right-cont">
      <div className="header">
        <h1>My folders</h1>
        <button className="add-folder" onClick={openfolder}>
          <span className="material-symbols-outlined">add_circle</span>
          <span>New folder</span>
        </button>
      </div>

      {val?.folders.map((folder, index) => {
        return (
          <Folders
            folder_title={folder?.title}
            cards={folder?.files}
            key={index}
            id={folder?.id}
          />
        );
      })}
    </div>
  );
};

export default Right;
