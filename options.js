document.getElementById('save').addEventListener('click', () => {
    const targetLanguage = document.getElementById('targetLanguage').value;
    chrome.storage.sync.set({ targetLanguage }, () => {
        const message = document.getElementById('message');
        message.textContent = 'Target language saved!';
        message.className = 'message success';
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 3000);
    });
});

chrome.storage.sync.get('targetLanguage', (data) => {
    document.getElementById('targetLanguage').value = data.targetLanguage || '';
});