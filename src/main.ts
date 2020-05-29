import { app, BrowserWindow, net, Menu } from "electron";
import debug from "electron-debug";
import path from "path";
import fs from "fs";
import getConfigPath from "appdata-path";
const configPath = path.join(getConfigPath(), "stardms-client/config.json");

debug({
  showDevTools: false,
  devToolsMode: "undocked",
});

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  const menuTemplate = [
    {
      label: "Əməliyyatlar",
      submenu: [
        {
          label: "Admin girişi",
          click: () => {
            const adminWin = new BrowserWindow({
              width: 800,
              height: 600,
              webPreferences: {
                nodeIntegration: true,
              },
            });
            adminWin.loadFile(path.resolve(__dirname, "../public/admin/adminIndex.html"));
          }
        },
        {
          label: "Çıxın",
          click: () => {
            if (process.platform !== "darwin") {
              app.quit();
            }
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  win.loadFile(path.resolve(__dirname, "../public/index.html"));
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
