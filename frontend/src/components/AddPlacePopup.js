import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
 const [name, setName] = React.useState('');
 const [link, setLink] = React.useState('');

 React.useEffect(() => {
  setName('');
  setLink('');
 }, [isOpen]);


 function handleNameChange(e) {
  setName(e.target.value);
 }

 function handleLinkChange(e) {
  setLink(e.target.value);
 }

 function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();

  onAddPlace({
   name,
   link
  });
 }

 return (
  <PopupWithForm
   title="Новое место"
   name="add-card-form-name"
   popup="new-card"
   buttonText="Создать"
   isOpen={isOpen}
   onClose={onClose}
   onSubmit={handleSubmit}
  >
   <input
    value={name || ''}
    className="popup__info popup__info_naming"
    id="name-card"
    maxLength="30"
    minLength="2"
    name="name"
    placeholder="Название"
    required
    type="text"
    onChange={handleNameChange}
   />
   <span className="popup__error" id="name-card-error"> </span>
   <input
    value={link || ''}
    className="popup__info popup__info_link"
    id="link"
    name="link"
    placeholder="Ссылка на картинку"
    required
    type="url"
    onChange={handleLinkChange}
   />
   <span className="popup__error" id="link-error"> </span>
  </PopupWithForm>
 )
}

export default AddPlacePopup;