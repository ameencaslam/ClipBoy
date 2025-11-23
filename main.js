const {
  app,
  BrowserWindow,
  clipboard,
  globalShortcut,
  ipcMain,
} = require("electron");
const path = require("path");

let overlayWindow = null;
let clipboardHistory = [];
let lastClipboardContent = "";

function createOverlayWindow() {
  overlayWindow = new BrowserWindow({
    width: 300,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
    x: 100,
    y: 100,
  });

  overlayWindow.loadFile("index.html");

  // Make window click-through when not hovering (but allow dragging)
  // Disable forward for better drag-and-drop support
  overlayWindow.setIgnoreMouseEvents(false, { forward: false });

  // Quit app when window is closed
  overlayWindow.on("close", (event) => {
    app.quit();
  });

  overlayWindow.on("blur", () => {
    // Optional: hide on blur or keep visible
  });
}

// Handle window dragging
ipcMain.on("move-window", (event, { x, y }) => {
  if (overlayWindow) {
    const [currentX, currentY] = overlayWindow.getPosition();
    overlayWindow.setPosition(currentX + x, currentY + y);
  }
});

function checkClipboard() {
  const currentContent = clipboard.readText();

  if (currentContent && currentContent !== lastClipboardContent) {
    lastClipboardContent = currentContent;

    // Add to history (keep last 20 items)
    if (!clipboardHistory.includes(currentContent)) {
      clipboardHistory.unshift(currentContent);
      if (clipboardHistory.length > 20) {
        clipboardHistory.pop();
      }

      // Notify renderer
      if (overlayWindow && !overlayWindow.isDestroyed()) {
        overlayWindow.webContents.send("clipboard-updated", clipboardHistory);
      }
    }
  }
}

app.whenReady().then(() => {
  createOverlayWindow();

  // Check clipboard every 500ms
  setInterval(checkClipboard, 500);

  // Initial clipboard check
  checkClipboard();

  // Register global shortcut to show/hide overlay (Ctrl+Shift+V)
  globalShortcut.register("CommandOrControl+Shift+V", () => {
    if (overlayWindow) {
      if (overlayWindow.isVisible()) {
        overlayWindow.hide();
      } else {
        overlayWindow.show();
      }
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createOverlayWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

// IPC handlers
ipcMain.on("get-clipboard-history", (event) => {
  event.returnValue = clipboardHistory;
});

ipcMain.on("copy-to-clipboard", (event, text) => {
  clipboard.writeText(text);
  lastClipboardContent = text;
});

ipcMain.on("close-overlay", () => {
  // Quit app when close button is clicked
  app.quit();
});

ipcMain.on("delete-clipboard-item", (event, index) => {
  if (index >= 0 && index < clipboardHistory.length) {
    clipboardHistory.splice(index, 1);
    
    // Notify renderer to update UI
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.webContents.send("clipboard-updated", clipboardHistory);
    }
  }
});
