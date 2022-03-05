const cats = [
    {
        "name": "Лара",
        "img_link": "https://www.friendforpet.ru/api/sites/default/files/2021-09/167200DD-A44F-4845-8D4D-ACCFC180165A.jpeg",
        "age": 8,
        "rate": 7,
        "favourite": false,
        "description": "Лара – шотландская вислоухая, у нее остеохондродисплазия. Лара спокойная, очень ласковая и контактная. Болезнь не лечится и специального ухода не нужно.",
        "id": 1
    }
];

function createRate (rate, card) {
    for (let i = 0; i < 10; i++) {
        const img = document.createElement ("img");
        if (rate > i) {
            img.setAttribute("src", "/img/cat-fill.svg");
            img.setAttribute("id", "true");
        } else {
            img.setAttribute("src", "/img/cat-stroke.svg");
            img.setAttribute("id", "false");
        }

        card.appendChild(img);
    }
}

function createCard (cat) {
    const card = document.createElement ("div");
    card.classList.add ("card");
    card.setAttribute("id", cat.id);

    const name = document.createElement ("div");
    name.classList.add ("card_name");
    name.innerText = cat.name || "Безымянный";

    const age = document.createElement ("div");
    age.classList.add ("card_age");
    name.innerText = cat.age || "Возраст не определен";

    const description = document.createElement ("div");
    description.classList.add ("card_description");
    description.innerText = cat.description || "Без описания";

    const favourite = document.createElement ("div");
    favourite.classList.add ("card_favourite");
    favourite.innerText = cat.favourite || false;


    const img = document.createElement ("img");
    img.classList.add ("card_img");
    img.setAttribute("src", cat.img_link);

    card.appendChild(name);
    card.appendChild(age);
    card.appendChild(img);
    card.appendChild(favourite);
    card.appendChild(description);

    createRate(cat.rate, card);

    const container = document.querySelector(".container");
    container.appendChild(card);
}

api
.getAllCats()
.then((dataFromBack) => dataFromBack.data.filter((el) => el.id))
.then((cats) => {
    cats.forEach((cat) => createCard(cat));
});