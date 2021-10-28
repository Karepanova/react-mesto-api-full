import React from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

 const avatarRef = React.useRef();

 function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();

  onUpdateAvatar({
   avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
  });
 }

 return (
  <PopupWithForm
   title="Обновить аватар"
   name="edit-form-avatar"
   popup="avatar-form"
   buttonText="Сохранить"
   isOpen={isOpen}
   onClose={onClose}
   onSubmit={handleSubmit}
  >
   <input
    ref={avatarRef}
    className="popup__info popup__info_avatar"
    id="link-avatar"
    name="avatar"
    placeholder="Ссылка на картинку"
    type="url"
    required
   />
   <span className="popup__error" id="link-avatar-error"> </span>
  </PopupWithForm>
 )
}

export default EditAvatarPopup;