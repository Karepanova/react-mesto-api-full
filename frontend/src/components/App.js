import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import {Route, Switch, withRouter, useHistory} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute'; // импортируем HOC

import InfoTooltip from './InfoTooltip';
import Token from '../utils/token';

import api from '../utils/api';
import auth from '../utils/auth';

import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
 const history = useHistory();
 const [email, setEmail] = React.useState(null);
 const [isResponseOk, setIsResponseOk] = React.useState(false); // успех или нет в регистрации
 const [loggedIn, setLoggedIn] = React.useState(false); //авторизован или нет
 const [isLoading, setIsLoading] = React.useState(false); //содержит статус пользователя
 const [idCardDelete, setIdCardDelete] = React.useState(null); // id для удаления карточки


 const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); // отркыта ли форма "Обновить аватар"
 const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); //открыта ли форма Редактирования профиля
 const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); // открытиа ли форма добавления карточки
 const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false); //открыта ли Всплывающая подсказка
 const [isConfirmFormOpen, setIsConfirmFormOpen] = React.useState(false); //открыто ли подтверждение "вы уверены?"

 const [selectedCard, setSelectedCard] = React.useState({}); // объект открытой карточки (картинки)
 const [currentUser, setCurrentUser] = React.useState({}); //
 const [cards, setCards] = React.useState([]);


 React.useEffect(() => {
  const token = Token.getToken();
  if (token) {
   auth.checkToken(token)
    .then(({data}) => {
     setEmail(data.email);
     setLoggedIn(true);
     history.push('/');
    })
    .catch(() => showInfoTooltip(false));
  }
 }, [loggedIn]);

 React.useEffect(() => {
  api.getUserData()
   .then((data) => {
    setCurrentUser(data);
   })
   .catch((err) => {
    console.log(`Ошибка сервера ${err}`)
   });
 }, []);

 React.useEffect(() => {
  //монтирование (рождение)
  api.getArrayCards()
   .then((data) => {
    setCards(data);
   })
   .catch((err) => {
    console.log(`Ошибка сервера ${err}`)
   });
 }, []);

 function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true);
  //document.querySelector('.popup_avatar-form').classList.add('popup_opened');
 }

 function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
  //document.querySelector('.popup_edit-profile').classList.add('popup_opened');
 }

 function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
  //document.querySelector('.popup_new-card').classList.add('popup_opened');
 }

 // закрытие попапов
 function closeAllPopups() {
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setSelectedCard({});
  setIsLoading(false);
  setIdCardDelete(null);
  setIsInfoTooltipOpen(false);
  setIsConfirmFormOpen(false);

 }

 function handleCardClick(card) {
  setSelectedCard(card);
 }

 function handleUpdateUser(data) {
  setIsLoading(true);
  api.editUserProfile(data)
   .then((dataProfile) => {
    setCurrentUser(dataProfile);
    closeAllPopups();
   })
   .catch((err) => {
   console.log(`Ошибка сервера ${err}`)
  });
 }

 function handleUpdateAvatar(data) {
  api.editAvatar(data)
   .then((dataAvatar) => {
    setCurrentUser(dataAvatar);
    closeAllPopups();
   })
   .catch((err) => {
    console.log(`Ошибка сервера ${err}`)
   });
 }

 function handleAddPlaceSubmit(data) {
  setIsLoading(true);
  api.addNewCard(data)
   .then((dataNewCard) => {
    setCards([dataNewCard, ...cards]);
    closeAllPopups();
   })
   .catch((err) => {
    console.log(`Ошибка сервера ${err}`)
   });
 }


 function handleCardLike(card) {
  // Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Отправляем запрос в API и получаем обновлённые данные карточки
  api.changeLikeCardStatus(card._id, !isLiked)
   .then((newCard) => {
   // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
   const newCards = cards.map((c) => c._id === card._id ? newCard : c);
   // Обновляем стейт
   setCards(newCards);
  })
   .catch((err) => {
    console.log(`Ошибка сервера ${err}`)
   });
 }

//открытие окна с подтверждением
 function handleCardDeleteWindow(card) {
  setIdCardDelete(card._id);
  setIsConfirmFormOpen(true);

 }

 //удаление карточки
 function cardDel(e) {
// Запрещаем браузеру переходить по адресу формы
  e.preventDefault();

  api.delCard(idCardDelete)
   .then(() => {
    const data = cards.filter(function (i) {
     return i._id !== idCardDelete;
    });
    setCards(data);
    //setCards((state) => state.filter((c) => c._id !== card._id));
    closeAllPopups();
   })
   .catch((err) => {
    console.log(`Ошибка сервера ${err}`)
   });
 }

 //выход из системы
 function handleSignOut() {
  Token.removeToken();
  setEmail(null);
  setLoggedIn(false);
 }

 //показать подсказку с информацией
 function showInfoTooltip(isОк) {

  setIsResponseOk(isОк);
  setIsInfoTooltipOpen(true);
 }

 function handleRegister(formData) {
  auth.registration(formData)
   .then((res) => {
    if (res.data) {
     showInfoTooltip(true);
     history.push('/sign-in'); //переход по ссылке
    }
   })
   .catch(() => showInfoTooltip(false));
 }

 function handleLogin(formData) {
  auth.authorization(formData)
   .then(({token}) => {
    if (token) {
     Token.saveToken(token);
     setLoggedIn(true);
     history.push('/');
    }
   })
   .catch(() => showInfoTooltip(false));
 }


 return (
  <CurrentUserContext.Provider value={currentUser}>
   <div>
    <div className="container">
     <div className="page">
      <Header
       userEmail={email}
       loggedIn={loggedIn}
       onSignOut={handleSignOut}
      />

      <Switch>
       <Route path="/sign-in">
        <Login onLogin={handleLogin}/>
       </Route>

       <Route path="/sign-up">
        <Register onRegister={handleRegister}/>
       </Route>


       <ProtectedRoute
        path="/"
        component={Main}
        loggedIn={loggedIn}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDeleteWindow}
       />
      </Switch>

      <Footer/>
     </div>
    </div>

    {/*попАп Редактирования профиля*/}
    <EditProfilePopup
     isOpen={isEditProfilePopupOpen}
     onClose={closeAllPopups}
     onUpdateUser={handleUpdateUser}
     isLoading={isLoading}
    />

    {/*попАп Редактирования аватара*/}
    <EditAvatarPopup
     isOpen={isEditAvatarPopupOpen}
     onClose={closeAllPopups}
     onUpdateAvatar={handleUpdateAvatar}
     isLoading={isLoading}
    />

    {/*попАп Добавить место*/}
    <AddPlacePopup
     isOpen={isAddPlacePopupOpen}
     onClose={closeAllPopups}
     onAddPlace={handleAddPlaceSubmit}
     isLoading={isLoading}
    />


    {/*попАп С Формой подтверждения*/}
    <PopupWithForm
     isOpen={isConfirmFormOpen}
     title="Вы уверены?"
     name=""
     popup="confirm"
     buttonText="Да"
     onClose={closeAllPopups}
     onSubmit={cardDel}
    >
    </PopupWithForm>

    <ImagePopup
     card={selectedCard}
     onClose={closeAllPopups}
     isOpen={Object.keys(selectedCard).length !== 0}
    />

   </div>


   {/*попАп подсказка с информацией*/}
   <InfoTooltip
    isOpen={isInfoTooltipOpen}
    onClose={closeAllPopups}
    isResponseOk={isResponseOk}

   />
  </CurrentUserContext.Provider>
 );

}

export default withRouter(App);
