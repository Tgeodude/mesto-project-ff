export function createCard(cardParams, likeHandler, imageHandler, deleteHandler) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardLikeButton = card.querySelector('.card__like-button');

  cardTitle.textContent = cardParams.name;
  cardImage.src = cardParams.link;
  cardImage.alt = cardParams.name;

  cardDeleteButton.addEventListener('click', deleteHandler);
  cardLikeButton.addEventListener('click', likeHandler);
  cardImage.addEventListener('click', imageHandler);

  return card;
}

export function cardLike(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(e) {
  e.target.closest('.card').remove();
}
