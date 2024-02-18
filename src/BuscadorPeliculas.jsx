import swal from "@sweetalert/with-react";
import React from "react";
import { useState } from "react";

const BuscadorPeliculas = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie?query=";
  const API_KEY = "9149c4d066b5e1a914c705b9f29679a3";
  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
    //fetchPeliculas();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (busqueda.trim() === "") return;
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(`${urlBase}=${busqueda}&api_key=${API_KEY}`);
      const data = await response.json();
      console.log("data", data);
      if (data.results.length === 0) {
        setPeliculas([]);
        throw { status: 404, message: "No se encontraron peliculas" };
      }
      setPeliculas(data.results);
      // throw { status:. 500, message: "Error al buscar las peliculas" };
      // swal("Are you sure you want to do this?", {
      //   buttons: ["Oh noez!", "Aww yiss!"],
      // });
      if (!response.ok)
        throw { status: response.status, message: response.statusText };

      swal({
        title: "Exito!",
        text: "Peliculas encontradas",
        icon: "success",
      });

      console.log(data.results);
    } catch (error) {
      swal({
        title: "Error!",
        text: "Error al buscar las peliculas",
        icon: "error",
      });
    }
  };
  return (
    <div className="container">
      <h1 className="title">Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una pelicula"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => {
          return (
            <div key={pelicula.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title}
              />
              <h2>{pelicula.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuscadorPeliculas;
