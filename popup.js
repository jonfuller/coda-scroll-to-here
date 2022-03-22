let scrollButton = document.getElementById("scrollToCurrent");

scrollButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scrollToCurrent,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function scrollToCurrent() {
  var title = document.querySelector("div[data-coda-ui-id='page-title']").firstChild.textContent;
  var pageItems = document.querySelectorAll("div[data-coda-ui-id='page-list-item']");
  var pageItem = Array.from(pageItems)
    .map(item => item.querySelector("textarea"))
    .find(item => item.textContent === title);

  pageItem.scrollIntoView();
}