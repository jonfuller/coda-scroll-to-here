let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  var title = document.querySelector("div[data-coda-ui-id='page-title']").firstChild.textContent;
  var pageItems = document.querySelectorAll("div[data-coda-ui-id='page-list-item']");
  var whatever = Array.from(pageItems)
    .map(item => item.querySelector("textarea"))
    .find(item => item.textContent === title);

  whatever.scrollIntoView();
}