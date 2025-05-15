import '../pages/index.css';
import avatar from '../images/avatar.jpg';

import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  updateUserAvatar,
  addNewCard
} from './components/api.js';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

const cardContainer = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupPreview = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar');

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const avatarEditBtn = profileImage;

const closeButtons = document.querySelectorAll('.popup__close');

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const descInput = profileFormElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

const cardFormElement = document.forms['new-place'];
const cardNameInput = cardFormElement.elements['place-name'];
const cardLinkInput = cardFormElement.elements.link;

const avatarFormElement = document.forms['edit-avatar'];
const avatarInput = avatarFormElement.elements.avatar;

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

let currentUserId;
let initialName = '';
let initialAbout = '';

function handleProfileInput() {
  const saveButton = profileFormElement.querySelector('.popup__button');
  const hasChanged =
    nameInput.value !== initialName || descInput.value !== initialAbout;
  const isValid = profileFormElement.checkValidity();

  if (hasChanged && isValid) {
    saveButton.classList.remove(validationConfig.inactiveButtonClass);
    saveButton.disabled = false;
  } else {
    saveButton.classList.add(validationConfig.inactiveButtonClass);
    saveButton.disabled = true;
  }
}

profileEditBtn.addEventListener('click', () => {
  initialName = profileTitle.textContent;
  initialAbout = profileDesc.textContent;

  nameInput.value = initialName;
  descInput.value = initialAbout;

  clearValidation(profileFormElement, validationConfig);
  handleProfileInput();
  openModal(popupEdit);
});

profileAddBtn.addEventListener('click', () => {
  cardFormElement.reset();
  clearValidation(cardFormElement, validationConfig);
  openModal(popupAdd);
});

avatarEditBtn.addEventListener('click', () => {
  avatarFormElement.reset();
  clearValidation(avatarFormElement, validationConfig);
  openModal(popupAvatar);
});

closeButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    const popup = btn.closest('.popup');
    if (popup) closeModal(popup);
  })
);

profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const about = descInput.value;

  updateUserInfo(name, about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDesc.textContent = userData.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error(err);
    });
});

cardFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  addNewCard(name, link)
    .then((cardData) => {
      cardContainer.prepend(createCard(cardData, handleImageClick, deleteCard, currentUserId));
      cardFormElement.reset();
      closeModal(popupAdd);
    })
    .catch((err) => {
      console.error(err);
    });
});

avatarFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newAvatarUrl = avatarInput.value;

  updateUserAvatar(newAvatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.error(err);
    });
});

function handleImageClick(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupPreview);
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDesc.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    currentUserId = userData._id;

    cards.forEach(cardData => {
      cardContainer.append(createCard(cardData, handleImageClick, deleteCard, currentUserId));
    });
  })
  .catch((err) => {
    console.error(err);
  });

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

nameInput.addEventListener('input', handleProfileInput);
descInput.addEventListener('input', handleProfileInput);