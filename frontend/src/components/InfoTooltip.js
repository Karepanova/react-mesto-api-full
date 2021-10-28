import successImg from '../images/check.svg';
import failImg from '../images/cross.svg';
import React from "react";

function InfoTooltip({isResponseOk, isOpen, onClose}) {
 const srcImg = isResponseOk ? successImg : failImg;
 const title = isResponseOk
  ? 'Вы успешно зарегистрировались!'
  : 'Что-то пошло не так! Попробуйте ещё раз.';


 function close(evt) {
  if (evt.target.classList.contains('popup_opened')) {
   onClose();
  }
  if (evt.target.classList.contains('popup__close-icon')) {
   onClose();
  }
 }

 React.useEffect(() => {
  function handleEscClose(event) {
   if (event.keyCode === 27) {
    onClose();
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
  <div
   className={`popup ${isOpen ? 'popup_opened' : ''}`}
   onMouseDown={close}
  >
   <div className="popup__container">
    <button
     type="button"
     className="popup__close-icon"
    />
    <img
     className="popup__result-img"
     src={srcImg}
     alt="Результат"
    />
    <p className="popup__title popup__title_tooltip">{title}</p>
   </div>
  </div>
 );
}

export default InfoTooltip;