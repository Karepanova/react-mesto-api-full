import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

 const [name, setName] = React.useState('');
 const [description, setDescription] = React.useState('');

 // Подписка на контекст
 const currentUser = React.useContext(CurrentUserContext);
 React.useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
 }, [currentUser, isOpen]);

 function handleNameChange(e) {
  setName(e.target.value);
 }

 function handleDescriptionChange(e) {
  setDescription(e.target.value);
 }

 function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();

  // Передаём значения управляемых компонентов во внешний обработчик
  onUpdateUser({
   name,
   about: description,
  });
 }

 return (
  <PopupWithForm
   title="Редактировать профиль"
   name="profile-form-name"
   popup="edit-profile"
   buttonText="Сохранить"
   isOpen={isOpen}
   onClose={onClose}
   onSubmit={handleSubmit}
  >
   <input
    value={name || ''}
    className="popup__info popup__info_profile_name"
    id="popup-name"
    maxLength="40"
    minLength="2"
    name="name"
    placeholder="Имя"
    type="text"
    required
    onChange={handleNameChange}
   />
   <span className="popup__error" id="popup-name-error"> </span>
   <input
    value={description || ''}
    className="popup__info popup__info_profile_about"
    id="popup-text"
    maxLength="200"
    minLength="2"
    name="about"
    placeholder="О себе"
    type="text"
    required
    onChange={handleDescriptionChange}
   />
   <span className="popup__error" id="popup-text-error"> </span>
  </PopupWithForm>
 )
}

export default EditProfilePopup;