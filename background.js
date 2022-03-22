chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed Coda-Scroll-To-Here");
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  });
});

chrome.tabs.onActivated.addListener(({tabId, windowId}, _) => {
  chrome.tabs.get(tabId, async (tab) => {
    updateActionState(tabId, shouldEnable(tab.url), `onActivated - ${tab.url}`);
  });
});

chrome.tabs.onUpdated.addListener(({tabId, changeInfo, tab}, _) => {
  if (tab === undefined)
    return;
  const url = changeInfo?.url || tab.url;
  updateActionState(tabId, shouldEnable(url), `onUpdated - ${url}`);
  console.log(changeInfo);
});

chrome.webNavigation.onCompleted.addListener(
    details => {
      updateActionState(details.tabId, shouldEnable(details.url), `onCompleted - ${details.url}`);
    },
    {
      url: [
        {schemes: ["https"]}
      ]
    }
);

function updateActionState(tabId, shouldEnable, message) {
  console.debug(`${shouldEnable} - ${message}`);
  if (shouldEnable) {
    chrome.action.enable({tabId});
    chrome.action.setBadgeText({
      text: "✅",
      tabId: tabId});
  } else {
    chrome.action.disable({tabId});
    chrome.action.setBadgeText({
      text: "⛔",
      tabId: tabId});
  }
}

function shouldEnable(url) {
  return url.startsWith("https://coda.io/d/");
}
