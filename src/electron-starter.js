const { app, BrowserWindow, Tray, Menu, Notification, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let tray = undefined;
let window = undefined;
let firstAppMinimize = true;

const getFilePath = (filePath) => {
   return path.join(__dirname, (process.env.ELECTRON_START_URL ? '/../public' : '/../build') + filePath);
}

const showNotification = (title, body, clickEvent = undefined) => {
    const notificationOption = {
        title: title,
        body: body
    }

    const notification = new Notification(notificationOption);

    if (clickEvent !== undefined) {
        notification.on("click", clickEvent);
    }

    notification.show();
}

const createTray = () => {
    tray = new Tray(getFilePath('/favicon.ico'));

    // sets tray icon image
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '앱 열기',
            click: () => window.show()
        },
        {
            label: '종료',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    tray.on('double-click', () => {
        window.show();
    });

    tray.setContextMenu(contextMenu);
}
const createWindow = () => {

    // init window option
    window = new BrowserWindow({
        width: 600,
        height: 600,
        minWidth: 600,
        minHeight: 600,
        center: true,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        }
    });

    window.loadFile(getFilePath('/loading.html'));

    window.once('show', () => {
        // react build link generation

        const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        });

        setTimeout(() => {
            window.loadURL(startUrl);
        }, 1000);

        // window.webContents.openDevTools();

        /**
         enum ClickEventType {
            Minimize,
            Maximize,
            UnMaximize,
            Close
        }
         */
        ipcMain.on('mainAppTitleEvent', (event, res) => {
            switch (res) {
                case 0:
                    window.minimize();
                    break;
                case 1:
                    window.maximize();
                    event.sender.send('updateMaximize', true);
                    break;
                case 2:
                    window.unmaximize();
                    event.sender.send('updateMaximize', false);
                    break;
                case 3:
                    window.close();
                    break;
                default:
                    console.log("How did you get in?");
                    break;
            }
        });

        window.on('maximize', () => window.webContents.send('updateMaximize', true));

        window.on('unmaximize', () => window.webContents.send('updateMaximize', false));

        window.on('close', function(e) {
            if (!app.isQuiting) {
                e.preventDefault();
                window.hide();

                if (firstAppMinimize) {
                    showNotification("앱이 최소화 되었습니다.", "앱을 다시 열려면 작업 표시줄을 확인해주세요!");
                    firstAppMinimize = false;
                }
            } else {
                window.show();

                const choice = require('electron').dialog.showMessageBoxSync(window, {
                    type: 'question',
                    buttons: ['예', '아니요'],
                    title: '앱 종료',
                    message: '프로그램을 종료하시겠습니까?'
                });
                if (choice === 1) {
                    e.preventDefault();
                }
            }
        });
    });

    window.show();
}

// Menu.setApplicationMenu(false);

// electron setting finish end call create window
app.whenReady().then(() => {
    createWindow();
    createTray();
});

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