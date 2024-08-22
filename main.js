const { app, BrowserWindow } = require("electron");

const createWin = () => {
    let win = new BrowserWindow({
        autoHideMenuBar: true,
        webPreferences: {
            devTools: true,
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    win.loadFile("./src/index.html");
    win.maximize();

    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWin();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWin()
        }
    });
})

app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
})
