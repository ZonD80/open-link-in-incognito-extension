# Open Link in Incognito

A lightweight Chrome/Chromium browser extension that enables opening links in incognito mode using keyboard shortcuts.

## Technical Overview

This extension uses Chrome Extension Manifest V3 architecture with the following components:

### Architecture

- **Content Script** (`content.js`): Injected into all web pages to capture link clicks with modifier keys
- **Background Service Worker** (`background.js`): Handles incognito window creation and extension lifecycle
- **Popup Interface** (`popup.html`, `popup.js`): Provides user instructions and platform detection

### Functionality

- **Platform Detection**: Automatically detects macOS vs Windows/Linux for appropriate key combinations
- **Modifier Key Handling**: 
  - macOS: `Cmd + Shift + Click`
  - Windows/Linux: `Ctrl + Shift + Click`
- **Link Detection**: Recursively searches parent elements to find clickable links
- **Incognito Window Creation**: Opens links in new incognito windows with error fallback

### Permissions

- `activeTab`: Access to current tab for content script injection
- `scripting`: Dynamic script injection capabilities
- `tabs`: Tab management and creation

### Browser Support

Compatible with Chromium-based browsers supporting Manifest V3 (Chrome 88+, Edge 88+).

## Installation

Load the `extension/` directory as an unpacked extension in Chrome Developer Mode.