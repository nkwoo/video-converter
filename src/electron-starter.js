const { app, BrowserWindow, Tray, Menu, Notification } = require('electron');
const url = require('url');
const path = require('path');

let tray = null;
let firstAppMinimize = true;

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


const createWindow = () => {

    // init window option
    const window = new BrowserWindow({
        width: 600,
        height: 600,
        resizable: false,
        maximizable: false,
        center: true,
        autoHideMenuBar: true,
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

    // window.webContents.openDevTools();

    // window.on('minimize',function(event){
    //     event.preventDefault();
    //     window.hide();
    // });

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
                buttons: ['Yes', 'No'],
                title: 'Confirm',
                message: 'Are you sure you want to quit?'
            });
            if (choice === 1) {
                e.preventDefault();
            }
        }
    });

    setTimeout(() => {
        tray = new Tray(path.join(__dirname, '/../build/favicon.ico'));

        // sets tray icon image
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show App',
                click: () => window.show()
            },
            {
                label: 'Quit',
                click: () => {
                    app.isQuiting = true;
                    app.quit();
                }
            }
        ]);

        tray.setContextMenu(contextMenu);

        tray.on('double-click', () => {
            window.show();
        });
    }, 0);
}

// Menu.setApplicationMenu(false);

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