const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
    headers: {
      authorization: '0ed281b8-2bfe-4678-ae11-56d77504ea73',
      'Content-Type': 'application/json'
    }
  };

function loadUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: "0ed281b8-2bfe-4678-ae11-56d77504ea73",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}

function loadCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: {
      authorization: "0ed281b8-2bfe-4678-ae11-56d77504ea73",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.message}`);
    });
}

function updateLoadUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "0ed281b8-2bfe-4678-ae11-56d77504ea73",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, about }),
  }).then((res) => {
    if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
    return res.json();
  });
}

function createNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "0ed281b8-2bfe-4678-ae11-56d77504ea73",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link }),
  }).then((res) => {
    if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
    return res.json();
  });
}

function likeUser(cardId) { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: "PUT",
    headers: { 
        authorization: "0ed281b8-2bfe-4678-ae11-56d77504ea73"
    }
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}

function unlikeUser(cardId) { 
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
      method: "DELETE",
      headers: { 
          authorization: "0ed281b8-2bfe-4678-ae11-56d77504ea73"
      }
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

function deleteCard(cardId) { 
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
        method: "DELETE",
        headers: { 
            authorization: "0ed281b8-2bfe-4678-ae11-56d77504ea73",
        },
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

function updateAvatar(avatarUrl) { 
    return fetch(`${config.baseUrl}/users/me/avatar`, { 
        method: "PATCH",
        headers: { 
            authorization: "0ed281b8-2bfe-4678-ae11-56d77504ea73",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ avatar: avatarUrl }),
    })
    .then(res => res.ok ? res.json() : Promise.json(`Ошибка: ${res.status}`));
}

export { loadCards, loadUserData, updateLoadUser, createNewCard, likeUser, unlikeUser, deleteCard, updateAvatar };
