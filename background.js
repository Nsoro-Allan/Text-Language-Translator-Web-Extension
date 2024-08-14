// Create the context menu item
chrome.contextMenus.create({
  id: "translateText",
  title: "Translate selected text",
  contexts: ["selection"]
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translateText") {
    chrome.tabs.sendMessage(tab.id, {action: "getSelectedText"}, function(response) {
      if (response && response.selectedText) {
        chrome.storage.local.set({selectedText: response.selectedText}, function() {
          openTranslationPopup();
        });
      }
    });
  }
});

// Handle browser action (toolbar icon) clicks
chrome.action.onClicked.addListener((tab) => {
  openTranslationPopup();
});

// Function to open the translation popup
function openTranslationPopup() {
  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 400,
    height: 300
  });
}