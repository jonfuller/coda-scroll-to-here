var title = document.querySelector("div[data-coda-ui-id='page-title']").firstChild.textContent;
var pageItems = document.querySelectorAll("div[data-coda-ui-id='page-list-item']");
var pageItem = Array.from(pageItems)
  .map(item => item.querySelector("textarea"))
  .find(item => item.textContent === title);

pageItem.scrollIntoView({behavior: 'smooth'});
