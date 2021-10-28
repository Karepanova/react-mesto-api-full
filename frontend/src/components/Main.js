import pen from "../images/pen.svg";
import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
 const currentUserContext = React.useContext(CurrentUserContext);

 return (
  <main className="content">
   <section className="profile">

    <div className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
     <div className="profile__avatar" style={{backgroundImage: `url(${currentUserContext.avatar})`}}> </div>
     <img alt="Карандаш" className="profile__avatar-pen" src={pen}/>
    </div>
    <div className="profile__info">
     <div className="profile__record">
      <h1 className="profile__title">{currentUserContext.name}</h1>
      <button className="profile__edit-button" type="button" onClick={props.onEditProfile}> </button>
     </div>
     <p className="profile__subtitle">{currentUserContext.about}</p>
    </div>
    <button className="profile__add-button" type="button" onClick={props.onAddPlace}> </button>
   </section>

   <section className="elements">
    {props.cards.map((card) => (
     <Card
      key={card._id}
      card={card}
      onCardClick={props.onCardClick}
      onCardLike={props.onCardLike}
      onCardDelete={props.onCardDelete}
     />
    ))}
   </section>
  </main>
 )
}

export default Main;