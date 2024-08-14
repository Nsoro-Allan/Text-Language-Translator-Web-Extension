chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getSelectedText") {
      sendResponse({selectedText: window.getSelection().toString()});
    }
  });