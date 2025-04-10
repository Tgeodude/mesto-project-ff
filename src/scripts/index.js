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

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const descInput = profileFormElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

const cardFormElement = document.forms['new-place'];
const cardNameInput = cardFormElement.elements['place-name'];
const cardLinkInput = cardFormElement.elements.link;

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

profileEditBtn.addEventListener('click', handleEditClick);
profileAddBtn.addEventListener('click', handleAddClick);

profileFormElement.addEventListener('submit', handleProfileSubmit);
cardFormElement.addEventListener('submit', handleCardSubmit);

closeButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup);
  })
);

function handleEditClick() {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  descInput.value = profileDesc.textContent;
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = descInput.value;
  closeModal(popupEdit);
}

function handleAddClick() {
  openModal(popupAdd);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  cardContainer.prepend(createCard(newCard, cardLike, handleImageClick, deleteCard));
  cardFormElement.reset();
  closeModal(popupAdd);
}

function handleImageClick(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupPreview);
}

initialCards.forEach(cardData => {
  cardContainer.append(createCard(cardData, cardLike, handleImageClick, deleteCard));
});
