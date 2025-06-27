// Popup JavaScript for the extension
document.addEventListener('DOMContentLoaded', function () {
    const keyCombo = document.getElementById('key-combo');
    const platformInfo = document.getElementById('platform-info');

    // Detect platform and update UI
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (isMac) {
        keyCombo.textContent = 'Cmd + Shift';
        platformInfo.textContent = 'macOS detected - using Command key';
    } else {
        keyCombo.textContent = 'Ctrl + Shift';
        platformInfo.textContent = 'Windows/Linux detected - using Control key';
    }
}); 