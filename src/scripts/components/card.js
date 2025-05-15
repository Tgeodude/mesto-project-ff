import { deleteCardFromServer, likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(data, imageClickHandler, deleteHandler, currentUserId) {
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = document.createElement('span');

  const likes = data.likes || [];

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeCount.classList.add('card__like-count');
  likeCount.textContent = likes.length;
  likeButton.after(likeCount);

  const isLikedByMe = likes.some(user => user._id === currentUserId);
  if (isLikedByMe) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    const hasLike = likeButton.classList.contains('card__like-button_is-active');
    const request = hasLike ? unlikeCard(data._id) : likeCard(data._id);

    request
      .then(updatedCard => {
        likeCount.textContent = updatedCard.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch(err => console.error(err));
  });

  cardImage.addEventListener('click', imageClickHandler);

  if (data.owner && data.owner._id === currentUserId) {
    deleteButton.addEventListener('click', () => {
      deleteCardFromServer(data._id)
        .then(() => deleteHandler(cardElement))
        .catch((err) => console.error(err));
    });
  } else {
    deleteButton.remove();
  }

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}