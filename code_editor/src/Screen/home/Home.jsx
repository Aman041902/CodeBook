import React from "react";
import "./home.scss";
import Right from "./Right";
import Modal from "../../provider/modals/Modal";
import { Modalcontext, modals } from "../../provider/Modalprovider";
import { useContext } from "react";

const Home = () => {
  const access = useContext(Modalcontext);
  const createfolder = () => {
    access.openmodal(modals.folderl);
    console.log(access);
  };
  return (
    <div className="home-container">
      <div className="left">
        <div className="left-cont">
          <img src="logo1.png" alt="img" />
          <h1>
            <i>Where syntax meets creativity</i>.
          </h1>
          <button onClick={createfolder}>
            <span className="material-symbols-outlined">add_circle</span>
            <span>Create folder</span>
          </button>
        </div>
      </div>
      <Right></Right>
      <Modal></Modal>
    </div>
  );
};

export default Home;
