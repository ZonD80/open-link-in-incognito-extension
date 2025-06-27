// Content script to handle link clicks with modifier keys
(function () {
    'use strict';



    // Function to check if the correct modifier keys are pressed
    function hasCorrectModifiers(event) {
        // For macOS: Command + Shift
        // For Windows/Linux: Ctrl + Shift
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

        if (isMac) {
            return event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey;
        } else {
            return event.ctrlKey && event.shiftKey && !event.metaKey && !event.altKey;
        }
    }

    // Function to get the URL from a link element
    function getLinkUrl(element) {
        // Check if it's a link element
        if (element.tagName === 'A' && element.href) {
            return element.href;
        }

        // Check if it's inside a link element
        let parent = element.parentElement;
        while (parent) {
            if (parent.tagName === 'A' && parent.href) {
                return parent.href;
            }
            parent = parent.parentElement;
        }

        return null;
    }

    // Main click handler
    function handleClick(event) {
        // Check if the correct modifier keys are pressed
        if (!hasCorrectModifiers(event)) return;

        // Get the URL from the clicked element
        const url = getLinkUrl(event.target);
        if (!url) return;

        // Prevent the default link behavior
        event.preventDefault();
        event.stopPropagation();

        // Send message to background script to open in incognito
        chrome.runtime.sendMessage({
            action: 'openInIncognito',
            url: url
        });
    }

    // Add click event listener to the document
    document.addEventListener('click', handleClick, true);





    // Clean up when page unloads
    window.addEventListener('beforeunload', () => {
        document.removeEventListener('click', handleClick, true);
    });
})(); 