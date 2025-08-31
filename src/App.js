import "./styles.css";
import Home from "./components/Home";
import List from "./components/List";
import Form from "./components/Form";
import Nav from "./components/Head";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/List"
          element={
            <>
              <Nav /> <List />
            </>
          }
        />
        <Route
          path="/Form"
          element={
            <>
              <Nav /> <Form />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
