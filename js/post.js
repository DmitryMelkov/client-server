document.addEventListener("DOMContentLoaded", () => {
  //данные страницы
  const title = document.querySelector(".post__title");
  const subTitle = document.querySelector(".post__content");
  const pageTitle = document.querySelector("title");

  //данные для комментариев
  const name = document.querySelector(".name");
  const email = document.querySelector(".email");
  const comment = document.querySelector(".comment");

  //данные для кнопки
  const card = document.querySelector(".card-content");
  const btnBack = document.createElement("button");

  const pageParams = document.location.search;

  //===============Распаковываем данные станицы=================//
  async function getPost() {
    const data = await fetch(`https://gorest.co.in/public/v1/posts${pageParams}`);
    const response = await data.json();

    postData(response);
    console.log(response);
  }
  console.log(pageParams);
  //===============Собираем страницу с контентом======================//
  function postData({ data }) {
    data.forEach((el) => {
      title.textContent = el.title;
      subTitle.textContent = el.body;
      pageTitle.textContent = el.title;
    });
    console.log(data);
  }

  //==========Распаковываем коментарии и передаём в вызов функций==============//
  async function getPostCommints() {
    const commints = await fetch(`https://gorest.co.in/public/v1/comments${pageParams}`);
    const commintPage = await commints.json();
    console.log(commintPage);
    postDicript(commintPage);
  }

  //=============Собираем блок для комментариев=============//
  function postDicript({ data }) {
    data.forEach((el) => {
      name.textContent = `name: ${el.name}`;
      email.textContent = `email: ${el.email}`;
      comment.textContent = `comment: ${el.body}`;
    });
    console.log(data);
  }

  //===================кнопка назад==============//
  btnBack.classList.add("card__btn");
  btnBack.textContent = "Назад";
  card.append(btnBack);
  //=========Обработчик кнопки возрата к списку========//
  btnBack.addEventListener("click", () => {
    history.back();
  });

  getPostCommints();
  getPost();
});
