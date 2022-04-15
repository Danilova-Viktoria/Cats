const cardContainer = document.querySelector(".grid");

// show all cats
const buttonShowAll = document.querySelector("#buttonShowAll");
buttonShowAll.onclick = () =>
  api.getAllCats().then((dataFromBack) => createGrid(dataFromBack.data));

// show cats by id
const buttonShowById = document.querySelector("#buttonShowById");
const inputShowById = document.querySelector("#inputShowById");

buttonShowById.onclick = () => {
  api
    .getCatById(inputShowById.value)
    .then((dataFromBack) => createGrid(dataFromBack.data)); // [{}, {}] ==> {}
};

function createCard(cat) {
  const card = document.createElement("div");
  card.setAttribute("id", cat["id"]);
  card.classList.add(["card"]);

  createImage(card, cat);
  createTitle(card, cat);
  createRating(card, cat);

  createActions(card, cat);

  cardContainer.appendChild(card);
}

function createImage(container, cat) {
  const img = document.createElement("img");
  img.setAttribute("src", cat["img_link"]);
  img.classList.add(["card__image"]);

  container.appendChild(img);
}

function createTitle(container, cat) {
  const title = document.createElement("h3");
  title.innerText = cat["name"];
  title.classList.add(["card__title"]);

  container.appendChild(title);
}

function createRating(container, cat) {
  const rating = document.createElement("div");
  rating.classList.add(["card__rating"]);

  const ratingValue = Number(cat["rate"]);

  for (let i = 0; i < 10; i++) {
    createRatingImage(rating, i < ratingValue);
  }

  container.appendChild(rating);
}

function createRatingImage(container, filled = true) {
  const src = filled ? "img/cat-fill.svg" : "img/cat-stroke.svg";
  const img = document.createElement("img");
  img.setAttribute("src", src);
  img.classList.add(["rating__image"]);

  container.appendChild(img);
}

function createActions(container, cat) {
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

  deleteBtn.addEventListener("click", () => {
    api
      .deleteCat(cat["id"])
      .then(() =>
        api.getAllCats().then((dataFromBack) => createGrid(dataFromBack.data))
      );
  });

  container.addEventListener("click", () => {
    info.show(cat);
  });

  container.appendChild(deleteBtn);
}

function createGrid(cats) {
  cardContainer.innerHTML = "";
  if (Array.isArray(cats)) {
    cats
      .sort((a, b) => a.id - b.id)
      .forEach((cat) => {
        createCard(cat);
      });
  }
}

function createInfoBlock() {
  const container = document.createElement("div");
  container.classList.add("info");
  container.classList.add("wrapper");
  container.classList.add("hidden");

  const body = document.createElement("div");
  body.classList.add("info");
  body.classList.add("body");

  const image = document.createElement("img");
  image.classList.add("info");
  image.classList.add("body__image");

  const info = document.createElement("div");
  info.classList.add("info");
  info.classList.add("body__info");

  const title = document.createElement("h2");
  title.classList.add("info");
  title.classList.add("info__title");

  const age = document.createElement("h3");
  age.classList.add("info");
  age.classList.add("info__age");

  const description = document.createElement("p");
  description.classList.add("info__description");

  const exitButton = document.createElement("button");
  exitButton.innerText = "Закрыть";
  exitButton.addEventListener("click", hide);



  info.appendChild(title);
  info.appendChild(age);
  info.appendChild(description);
  info.appendChild(exitButton);

  body.appendChild(image);
  body.appendChild(info);

  container.appendChild(body);

  document.body.appendChild(container);

  function show(cat) {
    image.setAttribute("src", cat["img_link"]);
    title.innerText = cat["name"];
    age.innerText = `Возраст: ${cat["age"]}`;
    description.innerText = cat["description"];
    container.classList.remove("hidden");
  }

  function hide() {
    container.classList.add("hidden");
  }

  return {
    show,
    hide,
  };
}

function attachCreateCatListener() {
  const addCat = document.querySelector("#addCat");
  const inputs = addCat.querySelectorAll("input");

  addCat.addEventListener("click", (e) => {
    e.preventDefault();
    const bodyJSON = {};
    inputs.forEach((input) => {
      if (input.name === "favourite") {
        bodyJSON[input.name] = input.checked;
      } else {
        bodyJSON[input.name] = input.value;
      }
    });

    api
      .addCat(bodyJSON)
      .then(() =>
        api.getAllCats().then((dataFromBack) => createGrid(dataFromBack.data))
      );
  });
}

attachCreateCatListener();
const info = createInfoBlock();

const cats = api
  .getAllCats()
  .then((dataFromBack) => createGrid(dataFromBack.data));
