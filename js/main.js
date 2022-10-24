{
let url = `https://gorest.co.in/public-api/posts?page`;
let searchParams = new URLSearchParams(window.location.search);

const getData = async () => {
  page = searchParams.get('page');
  if (page === null) {
    page = 1;
  }
  const response = await fetch(`${url}=${page}`);
  const data = await response.json();
  const dataArr = data.data;
  let meta = data;
  console.log(dataArr);
  let length = meta.data.length
  return {
    page,
    response,
    data,
    dataArr,
    length
  }
};

let container = document.querySelector('.container');
let listGroup = document.createElement('div');

listGroup.classList.add('list-group');
container.append(listGroup);

function createBodyPost() {
  let post = document.createElement('p');
  post.classList.add('mb-1');
  return post;
}

function createHeader() {
  let header = document.createElement('h3');
  header.classList.add('mb-1');
  return header;
}

function createLink() {
  let link = document.createElement('a');
  link.style.cursor = 'pointer';
  link.classList.add('list-group-item', 'list-group-item-action');
  return link;
}

function createDivFlex() {
  let flexDiv = document.createElement('div');
  flexDiv.classList.add('d-flex', 'w-100', 'justify-content-between');
  return flexDiv;
}

function createNav() {
  let nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Page navigation example');
  container.append(nav);
  return nav;
}

function createNavList() {
  let list = document.createElement('ul');
  list.classList.add('pagination');
  let nav = createNav();
  nav.append(list);
  return list;
}

function firstEl() {
  let liItem = document.createElement('li');
  liItem.classList.add('page-item');
  liItem.style.order = '-2';
  let first = document.createElement('a');
  let laq = document.createElement('span');
  laq.setAttribute('aria-hidden', 'true');
  laq.innerHTML = '&laquo;';

  first.classList.add('page-link', 'first');
  first.setAttribute('aria-label', 'First');
  liItem.append(first);
  first.append(laq);
  return {
    liItem,
    first
  }
}

function lastEl() {
  let liItem = document.createElement('li');
  liItem.classList.add('page-item');
  liItem.style.order = '3';
  let last = document.createElement('a');
  let raq = document.createElement('span');
  raq.setAttribute('aria-hidden', 'true');
  raq.innerHTML = '&raquo;';

  last.classList.add('page-link', 'next');
  last.setAttribute('aria-label', 'Last');
  liItem.append(last)
  last.append(raq);
  return {
    liItem,
    last
  }
}

function prevTen() {
  let liItem = document.createElement('li');
  liItem.classList.add('page-item');
  liItem.style.order = '-1';
  let prev = document.createElement('a');
  let raq = document.createElement('span');
  raq.setAttribute('aria-hidden', 'true');
  raq.innerHTML = '&lt;';

  prev.classList.add('page-link', 'prev');
  prev.setAttribute('aria-label', 'Prev');
  liItem.append(prev)
  prev.append(raq);
  return {
    liItem,
    prev
  } 
}

function nextTen() {
  let liItem = document.createElement('li');
  liItem.classList.add('page-item');
  let next = document.createElement('a');
  let raq = document.createElement('span');
  raq.setAttribute('aria-hidden', 'true');
  raq.innerHTML = '&gt;';

  next.classList.add('page-link', 'next');
  next.setAttribute('aria-label', 'Next');
  liItem.append(next);
  next.append(raq);
  return {
    liItem,
    next
  } 
}

let listPagination = createNavList();

async function pagination() {
  let data = await getData();
  let pagination = data.data.meta.pagination;
  let lengthPages = data.data.meta.pagination.pages;
  let currPage = data.page;
  let first = firstEl();
  let firstLink = first.first;
  let last = lastEl();
  let lastLink = last.last;
  let prevT = prevTen();
  let prevLink = prevT.prev;
  let nextT = nextTen();
  let nextLink = nextT.next;

  let currentPageNum = Number(currPage);

  if (currentPageNum - 10 < 1) {
    prevLink.setAttribute(`href`, `index.html?page=${currPage}`);
  } else {
    prevLink.setAttribute(`href`, `index.html?page=${currPage - 10}`);
  }

  if (currentPageNum + 10 >= lengthPages) {
    nextLink.setAttribute(`href`, `index.html?page=${lengthPages}`);
  } else {
    nextLink.setAttribute(`href`, `index.html?page=${currentPageNum + 10}`);
  }
  let lastResult = last.liItem;
  let prevResult = prevT.liItem;
  let firstResult = first.liItem;
  let nextResult = nextT.liItem;
  listPagination.append(firstResult, lastResult, prevResult, nextResult);
  firstLink.setAttribute(`href`, `index.html`);
  lastLink.setAttribute(`href`, `index.html?page=${pagination.pages}`);
  

}
async function currentPage() {
  const data = await getData();
  let currPage = data.page;
  let lengthPages = data.data.meta.pagination.pages;
  let resultNum = Number(currPage);
  for (let i = resultNum - 2; i < resultNum + 3; i++) {
    let itemList = document.createElement('li');
    itemList.classList.add('page-item');
    listPagination.append(itemList);
    let itemLink = document.createElement('a');
    itemLink.setAttribute('href', `index.html?page=${i}`);
    itemLink.classList.add('page-link');
    itemLink.textContent = [i];
    itemList.append(itemLink);
    if (i <= 0 || i > lengthPages) {
      itemLink.style.display = 'none';
    }
  }
  pagination();
}
currentPage();

async function postsList() {
  let data = await getData();
  let dataArr = data.dataArr;
  for (let post in dataArr) {
    let postTitle = dataArr[post].title;
    let postBody = dataArr[post].body;

    let p = createBodyPost();
    let head = createHeader();
    let link = createLink();
    let flexDiv = createDivFlex();
    link.setAttribute(`href`, `post.html?id=${dataArr[post].id}`)
    p.textContent = postBody;
    head.textContent = postTitle;
    listGroup.append(link);
    link.append(flexDiv, head, p);
  }
}
postsList();

}