import React from 'react';

const Modal = ({info, hideModal}) => {
  return (
    <div id={info.imdbID} className='modal'>
      <div onClick={hideModal} className='modal-background'></div>
      <div className='modal-content content has-background-white py-5 px-5'>
        <h4>{info.Title}</h4>
        <p>{info.Plot}</p>
      </div>
      <button
        onClick={hideModal}
        className='modal-close is-large'
        aria-label='close'></button>
    </div>
  );
};

export default Modal;
