//Imports
import React from "react";
import { useState, useEffect } from "react";
import Feature from "./components/Feature";
import Movie from "./components/Movie";
import Footer from "./components/Footer";

// Environment variables
require("dotenv").config();

//Define top App component
const App = () => {
  //Set state variables
  const [movies, setMovies] = useState([]);
  const [ids, setIds] = useState(["tt0089218", "tt0099472"]);
  const [features, setFeatures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [plot, setPlot] = useState("&plot=full");

  //Query featured movies
  useEffect(() => {
    ids.forEach((id) => {
      fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}${plot}`
      )
        .then((res) => res.json())
        .then((data) => setFeatures((old) => [...old, data]))
        .catch((err) => console.log(err));
    });
    setFeatures([]);
  }, []);

  //Search function
  const onSubmitHandler = (e) => {
    e.preventDefault();

    fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchTerm}${plot}`
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = data.Search.slice(0, 5);

        newData.forEach((obj) => {
          fetch(
            `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${obj.imdbID}${plot}`
          )
            .then((res) => res.json())
            .then((data) => setMovies((old) => [...old, data]));
        });
        setMovies([]);
      })
      .catch((error) => console.log(error));
    setSearchTerm("");
  };

  //

  //Utilities
  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const plotHandler = (e) => {
    setPlot(e.target.value);
  };

  const shortPlot = (plot) => {
    const newPlpot = plot.split(" ").slice(0, 20).join(" ") + "...";
    return newPlpot;
  };

  return (
    <>
      <nav
        className="navbar mb-6 p-3"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <h1 className="title">Cinema App</h1>
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">Plot:</div>
          <div className="navbar-item">
            <div className="select">
              <select value={plot} onChange={plotHandler}>
                <option value={plot} selected>
                  Full
                </option>
                <option value="">Short</option>
              </select>
            </div>
          </div>
        </div>
        <div className="navbar-item">
          <form onSubmit={onSubmitHandler}>
            <input
              type="search"
              className="input"
              placeholder="Press enter to search"
              value={searchTerm}
              onChange={onChangeHandler}
            />
          </form>
        </div>
      </nav>

      <div className="container px-5">
        <h1 className="title is-4 m-5">Featured Movies</h1>
        <div className="columns">
          {features.map((feature) => (
            <Feature
              key={feature.imdbID}
              feature={feature}
              shortPlot={shortPlot}
            />
          ))}
        </div>
      </div>
      <div id="searchResult" className="container px-5">
        <h1 className="title is-4 m-5">Search Results</h1>
        {movies.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} shortPlot={shortPlot} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default App;
