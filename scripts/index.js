function createCard(cardParams) {
    const card = document.querySelector('#card-template')
        .content
        .querySelector('.card')
        .cloneNode(true);
    card.querySelector('.card__delete-button')
        .addEventListener('click', () => {
            card.remove()
        })
        .targetElement = card
    card.querySelector('.card__title').textContent = cardParams.name;
    card.querySelector('.card__image').setAttribute('src', cardParams.link);
    return card;
}

initialCards.forEach((cardParams) => {
    document.querySelector('.places__list').append(createCard(cardParams));
});
