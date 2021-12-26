document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".article__list-group");
  const heshStart = '?page=';

  const pageParams = new URLSearchParams(window.location.search);
  let page = +pageParams.get("page") || 1;
  let pages;
  let pageCurrent;

  //==============Получаем данные и передаём их через вызов функций=====================//
  async function getData(url) {
    const data = await fetch(url);
    const response = await data.json();
    resultData(response, page);
    pages = response.meta.pagination.pages;
    page = response.meta.pagination.page;
    pageCurrent = response.meta.pagination.current;
  }

  function resultData({ data }) {
    data.forEach((el) => {
      const item = `<li class="article__list-group-item item-elem list-group-item-primary">
      <a class="article__list-group-link" href="post.html?id=${el.id}">${el.title}</a></li>`;
      list.innerHTML += item;
    });
  }

  const pageHistory = () => {
    history.pushState({ page: page }, { page }, `${heshStart}${page}`);
    getData(`https://gorest.co.in/public/v1/posts?page=${page}`);
  };

  pageHistory();
});
