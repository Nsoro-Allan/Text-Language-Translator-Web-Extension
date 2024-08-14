document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('translateButton').addEventListener('click', function() {
      const targetLanguage = document.getElementById('languageSelect').value;
      
      chrome.storage.local.get(['selectedText'], function(result) {
        if (result.selectedText) {
          translateText(result.selectedText, targetLanguage);
        } else {
          // If no text is pre-selected, prompt the user to enter text
          const userInput = prompt("Enter text to translate:");
          if (userInput) {
            translateText(userInput, targetLanguage);
          } else {
            document.getElementById('result').textContent = "No text provided for translation.";
          }
        }
      });
    });
  });
  
  function translateText(text, targetLanguage) {
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`)
      .then(response => response.json())
      .then(result => {
        const translation = result[0][0][0];
        document.getElementById('result').textContent = `Translation: ${translation}`;
      })
      .catch(error => {
        console.error("Translation error:", error);
        document.getElementById('result').textContent = "Error translating text. Please try again.";
      });
  }