const { app, BrowserWindow, screen, Menu } = require('electron');
const url = require('url');
const path = require('path');

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // init window option
    const window = new BrowserWindow({

        width: width / 1.25,
        height: height / 1.25,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // react build link generation
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    window.loadURL(startUrl);
}

Menu.setApplicationMenu(false);

// electron setting finish end call create window
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});