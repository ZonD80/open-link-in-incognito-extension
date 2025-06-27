// Background service worker for handling incognito tab creation
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openInIncognito') {
        // Create a new incognito window with the specified URL
        chrome.windows.create({
            url: request.url,
            incognito: true,
            focused: true
        }).then(() => {
            console.log('Opened URL in incognito mode:', request.url);
        }).catch((error) => {
            console.error('Failed to open incognito window:', error);
            // Fallback: try to open in a regular new tab if incognito fails
            chrome.tabs.create({
                url: request.url,
                active: true
            });
        });
    }
});

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Open Link in Incognito extension installed');

        // Show welcome notification
        chrome.action.setBadgeText({ text: 'NEW' });
        chrome.action.setBadgeBackgroundColor({ color: '#4285f4' });

        // Clear badge after 5 seconds
        setTimeout(() => {
            chrome.action.setBadgeText({ text: '' });
        }, 5000);
    }
});

// Handle browser action click (extension icon click)
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup, which is handled by popup.html
}); 