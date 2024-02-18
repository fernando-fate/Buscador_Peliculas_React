import React from "react";
import ReactDOM from "react-dom/client";
import BuscadorPeliculas from "./BuscadorPeliculas";
import "./styles/buscador.css";
import swal from "@sweetalert/with-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BuscadorPeliculas></BuscadorPeliculas>
  </React.StrictMode>
);
