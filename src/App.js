import { useState } from "react";

import Header from "./common/header/Header";
import Sidebar from "./common/sidebar/Sidebar";

import BoardContext from "./contexts/BoardContext";

import "./App.css";
import Context from "./common/context/Context";

function App() {
  const [boards, setBoard] = useState([]);
  return (
    <BoardContext.Provider value={boards}>
      <div className="App">
        <Header />
        <div className="context">
          <Sidebar />
          <Context />
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default App;
