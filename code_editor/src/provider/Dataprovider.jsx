import React, { createContext, useEffect, useState } from "react";

import { v4 } from "uuid";

export const provider = createContext();

const initial_data = [
  {
    id: v4(),
    title: "Arrays",
    files: [
      {
        id: v4(),
        title: "sorting",
        code: `cout<<"hello world"<<endl;`,
        language: "cpp",
      },
    ],
  },

  {
    id: v4(),
    title: "Graph",
    files: [
      {
        id: v4(),
        title: "bfs",
        code: `cout<<"hello world"<<endl;`,
        language: "cpp",
      },
    ],
  },
];
const defaultCode = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "hello world";
    return 0;
}`,
  java: `class Main {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}`,
  python: `print("hello world")`,
  javascript: `console.log("hello world")`,
};

const Dataprovider = ({ children }) => {
  const createNewFolder = (folder) => {
    const newfolders = [...folders];
    newfolders.push({
      id: v4(),
      title: folder.folder,
      files: [
        {
          id: v4(),
          title: folder.file,
          code: defaultCode[folder.language],
          language: folder.language,
        },
      ],
    });
    localStorage.setItem("data", JSON.stringify(newfolders));
    setfolders(newfolders);
  };

  const newFolder = (folder) => {
    const newfolders = [...folders];
    console.log(folder);
    newfolders.push({
      id: v4(),
      title: folder,
      files: [],
    });
    localStorage.setItem("data", JSON.stringify(newfolders));
    setfolders(newfolders);
  };

  const deletefolder = (id) => {
    const newfolders = [...folders];
    const updatedfolders = newfolders.filter((folder) => {
      return folder.id !== id;
    });
    localStorage.setItem("data", JSON.stringify(updatedfolders));
    setfolders(updatedfolders);
  };
  const [folders, setfolders] = useState(() => {
    const folder_data = localStorage.getItem("data");

    if (folder_data) {
      return JSON.parse(folder_data);
    }
    return initial_data;
  });

  const editfoldert = (newtitle, id) => {
    const newfolders = [...folders];
    newfolders.map((folder) => {
      if (folder.id === id) {
        folder.title = newtitle;
      }
    });
    localStorage.setItem("data", JSON.stringify(newfolders));
    setfolders(newfolders);
  };
  const editfiletitle = (newtitle, folderid, fileid) => {
    const newfolders = [...folders];
    newfolders.map((folder) => {
      if (folder.id === folderid) {
        folder.files.map((file) => {
          if (file.id === fileid) {
            file.title = newtitle;
          }
        });
      }
    });
    localStorage.setItem("data", JSON.stringify(newfolders));
    setfolders(newfolders);
  };

  const deletefile = (folderid, fileid) => {
    const newfolders = [...folders];
    newfolders.map((folder) => {
      if (folder.id === folderid) {
        folder.files = folder.files.filter((file) => {
          return file.id !== fileid;
        });
      }
    });
    localStorage.setItem("data", JSON.stringify(newfolders));
    setfolders(newfolders);
  };

  const createfile = (folderid, file) => {
    console.log("mai aa gaya");
    const newfolders = [...folders];
    newfolders.map((folder) => {
      if (folder.id === folderid) {
        folder.files.push({
          id: v4(),
          title: file.title,
          code: file.code,
          language: file.language,
        });
      }
    });
    localStorage.setItem("data", JSON.stringify(newfolders));
    setfolders(newfolders);
  };

  const updatelang = (folderid, fileid, lang) => {
    const newfolders = [...folders];
    newfolders.map((folder) => {
      if (folder.id === folderid) {
        folder.files.map((file) => {
          if (file.id === fileid) {
            file.code = defaultCode[lang];
            file.language = lang;
          }
        });
      }
    });
    localStorage.setItem("data", JSON.stringify(newfolders));
    setfolders(newfolders);
  };
  const getcode = (folderid, fileid) => {
    const folder = folders.find((folder) => folder.id === folderid);
    if (!folder) return null;

    const file = folder.files.find((file) => file.id === fileid);
    file.code = defaultCode[file.language];
    return file ? file.code : null;
  };

  const getlang = (folderid, fileid) => {
    const folder = folders.find((folder) => folder.id === folderid);
    if (!folder) return null;

    const file = folder.files.find((file) => file.id === fileid);
    return file ? file.language : null;
  };
  const save = (folderid, fileid, newcode) => {
    const newfolder = [...folders];
    newfolder.map((folder) => {
      if (folder.id === folderid) {
        folder.files.map((file) => {
          if (file.id === fileid) {
            file.code = newcode;
          }
        });
      }
    });
    localStorage.setItem("data", JSON.stringify(newfolder));
    setfolders(newfolder);
  };

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(folders));
    }
  }, [folders]);
  const folderfeature = {
    folders,
    createNewFolder,
    newFolder,
    deletefolder,
    editfoldert,
    editfiletitle,
    deletefile,
    createfile,
    getcode,
    getlang,
    updatelang,
    save,
  };
  return (
    <provider.Provider value={folderfeature}>{children}</provider.Provider>
  );
};

export default Dataprovider;
