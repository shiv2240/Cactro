chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "saveHighlight") {
      chrome.storage.local.get({ highlights: [] }, ({ highlights }) => {
        highlights.push(message.text);
        chrome.storage.local.set({ highlights });
      });
    }
  });
  