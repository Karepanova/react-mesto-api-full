import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardLike, onCardClick, onCardDelete}) {

 const currentUserContext = React.useContext(CurrentUserContext);

 const handleCardClick = () => {
  onCardClick(card);
 }

 const handleLikeClick = () => {
  onCardLike(card);
 };

 const handleDeleteClick = () => {
  onCardDelete(card);
 };


 // Определяем, являемся ли мы владельцем текущей карточки
 const isOwn = card.owner._id === currentUserContext._id;
// Создаём переменную, которую после зададим в `className` для кнопки удаления
 const cardDeleteButtonClassName = (
  `profile__delete ${isOwn ? '' : 'profile__delete_hidden'}`
 );

 // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
 const isLiked = card.likes.some(i => i._id === currentUserContext._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
 const cardLikeButtonClassName = `element__button ${isLiked ? `element__button_active` : ``}` ;



 return (
  <div className="element">
   <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}> </button>
   <div className="element__img-block">
    <div className="element__img" style={{backgroundImage: `url(${card.link})`}} onClick={handleCardClick}> </div>
   </div>
   <div className="element__card">
    <h2 className="element__text">{card.name}</h2>
    <div className="element__group">
     <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}> </button>
     <span className="element__count-likes">{card.likes.length}</span>
    </div>
   </div>
  </div>
 )
}

export default Card;
