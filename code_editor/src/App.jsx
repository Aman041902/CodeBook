import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Screen/home/Home.jsx";
import Folder from "./Screen/folder/Folder.jsx";
import Dataprovider from "./provider/Dataprovider.jsx";
import Modalprovider from "./provider/Modalprovider.jsx";

function App() {
  return (
    <Dataprovider>
      <Modalprovider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/folder/:folderid/:fileid" element={<Folder />} />
          </Routes>
        </BrowserRouter>
      </Modalprovider>
    </Dataprovider>
  );
}

export default App;
