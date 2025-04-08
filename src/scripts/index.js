import '../pages/index.css';
import avatar from '../images/avatar.jpg';

import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, cardLike, deleteCard } from './components/card.js';

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

const cardContainer = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupPreview = document.querySelector('.popup_type_image');

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

profileEditBtn.addEventListener('click', handleEditClick);
profileAddBtn.addEventListener('click', handleAddClick);
closeButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup);
  })
);

function handleEditClick() {
  openModal(popupEdit);

  const form = document.forms['edit-profile'];
  const nameInput = form.elements.name;
  const descInput = form.elements.description;

  nameInput.value = document.querySelector('.profile__title').textContent;
  descInput.value = document.querySelector('.profile__description').textContent;

  form.addEventListener('submit', handleProfileSubmit);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;

  document.querySelector('.profile__title').textContent = form.elements.name.value;
  document.querySelector('.profile__description').textContent = form.elements.description.value;

  form.removeEventListener('submit', handleProfileSubmit);
  closeModal(popupEdit);
}

function handleAddClick() {
  openModal(popupAdd);

  const form = document.forms['new-place'];
  form.addEventListener('submit', handleCardSubmit);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;

  const newCard = {
    name: form.elements['place-name'].value,
    link: form.elements.link.value
  };

  cardContainer.prepend(createCard(newCard, cardLike, handleImageClick, deleteCard));
  form.reset();
  form.removeEventListener('submit', handleCardSubmit);
  closeModal(popupAdd);
}

function handleImageClick(evt) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;

  openModal(popupPreview);
}

initialCards.map((cardData) => {
  cardContainer.append(createCard(cardData, cardLike, handleImageClick, deleteCard));
});
