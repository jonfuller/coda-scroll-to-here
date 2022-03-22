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
  console.log(tabId);
  chrome.tabs.get(tabId, async (tab) => {
      const shouldEnable = tab.url.startsWith("https://coda.io/d/");

      if (shouldEnable) {
        chrome.action.enable({tabId});
        chrome.action.setBadgeText({
          text: "✅",
          tabId: tabId});
        }
      else {
        chrome.action.disable({tabId});
        chrome.action.setBadgeText({
          text: "⛔",
          tabId: tabId});
        }
    });
});
