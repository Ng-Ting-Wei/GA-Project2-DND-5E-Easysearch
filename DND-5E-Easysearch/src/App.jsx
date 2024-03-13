import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Table from "./pages/Table";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />}></Route>
        <Route path="main" element={<Main />}></Route>
        <Route path="table/:id" element={<Table />}></Route>
        <Route path="table/list" element={<Info />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
