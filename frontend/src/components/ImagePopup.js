import React from "react";
import {useRef} from 'react';

function ImagePopup(props) {
 const imageFallbackContainer = useRef(null);
 const popupOpened = props.isOpen ? 'popup_opened' : '';

 function close(evt) {
  if (evt.target.classList.contains('popup_opened')) {
   props.onClose();
  }
  if (evt.target.classList.contains('popup__close-icon')) {
   props.onClose();
  }
 }

 React.useEffect(() => {
  function handleEscClose(event) {
   if (event.keyCode === 27) {
    props.onClose();
   }
  }

  //монтирование (рождение)
  document.addEventListener('keydown', handleEscClose);

  return () => {
   //размонтирование (умирание)
   document.removeEventListener('keydown', handleEscClose);
  }
 }, [])

 return (
  <>
   <div
    className={`popup popup_image-card ${popupOpened}`}
    onMouseDown={close}
   >
    <div className="popup__image-container">
     <button className="popup__close-icon popup__close-image" type="button"></button>
     <figure className="popup__view" ref={imageFallbackContainer}>
      {props.card.link && <img alt="#" className="popup__img" src={props.card.link}
           onLoad={e => {
            imageFallbackContainer.current.style.width = `${e.target.offsetWidth}px`
            imageFallbackContainer.current.style.height = `${e.target.offsetHeight}px`
           }}
      />}

     </figure>
     <h2 className="popup__img-signature">{props.card.name}</h2>
    </div>
   </div>
  </>
 );
}

export default ImagePopup;