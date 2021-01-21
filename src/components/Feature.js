import Modal from "./Modal";

const Feature = ({ feature, shortPlot }) => {
  //Modal functions
  const toggleModal = () => {
    const modal = document.getElementById(`${feature.imdbID}`);
    modal.classList.add("is-active");
  };

  const hideModal = () => {
    const modal = document.getElementById(`${feature.imdbID}`);
    modal.classList.remove("is-active");
  };

  return (
    <>
      <div className="column">
        <div className="card">
          <div className="columns">
            <div className="column">
              <div class="image">
                <img src={feature.Poster} alt={feature.Title} />
              </div>
            </div>
            <div className="column">
              <div className="content px-5 py-5">
                <h4>
                  {feature.Title} ({feature.Year})
                </h4>
                <h6>Awards</h6>
                <p>{feature.Awards}</p>
                <h6>Plot</h6>
                <p>{shortPlot(feature.Plot)}</p>
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
      </div>
      <Modal info={feature} hideModal={hideModal} />
    </>
  );
};

export default Feature;
