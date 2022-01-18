import React from "react";
import ReactDOM from "react-dom";
import Form from "./pages/form";
import Result from "./pages/result";
import { HashRouter, Routes, Route } from "react-router-dom";
import "antd-mobile/es/global";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Form />}></Route>
          <Route path="/result" element={<Result />} />
        </Routes>
      </HashRouter>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
