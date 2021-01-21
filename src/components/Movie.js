import React from "react";
import Modal from "./Modal";

const Movie = ({ movie, shortPlot }) => {
  //Modal functions
  const toggleModal = () => {
    const modal = document.getElementById(`${movie.imdbID}`);
    modal.classList.add("is-active");
  };

  const hideModal = () => {
    const modal = document.getElementById(`${movie.imdbID}`);
    modal.classList.remove("is-active");
  };

  //Generate list function
  const items = movie.Actors.split(",").map((str) => {
    return <li key={movie.imdbID}>{str}</li>;
  });

  return (
    <>
      <div className="card mb-5">
        <div className="columns">
          <div className="column is-one-third">
            <div class="image">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          </div>
          <div className="column">
            <div className="content px-5 py-5">
              <h4>
                {movie.Title} ({movie.Year})
              </h4>
              <span class="tag is-primary is-light mb-4 mr-2">
                Released: {movie.Released}
              </span>
              <span class="tag is-primary is-light mb-4 mr-2">
                Rated: {movie.Rated}
              </span>
              <span class="tag is-primary is-light mb-4 mr-2">
                Type: {movie.Type}
              </span>
              <span class="tag is-primary is-light mb-4 mr-2">
                Genre: {movie.Genre}
              </span>
              <h6>Director</h6>
              <p>{movie.Director}</p>
              <h6>Awards</h6>
              <p>{movie.Awards}</p>
              <h6>Actors</h6>
              <p>
                <ul>{items}</ul>
              </p>
              <h6>Plot</h6>
              <p>{shortPlot(movie.Plot)}</p>
              <button
                onClick={() => {
                  toggleModal();
                }}
                className="button is-primary is-small"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal info={movie} hideModal={hideModal} />
    </>
  );
};

export default Movie;
