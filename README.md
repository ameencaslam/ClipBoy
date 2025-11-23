# 📋 ClipBoy

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)
![Electron](https://img.shields.io/badge/Electron-28.0.0-47848F.svg)

**A minimalist clipboard manager with drag-and-drop overlay for Windows**

_Never lose a copied item again!_ 🚀

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Development](#-development) • [License](#-license)

</div>

---

## ✨ Features

| Feature                    | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| 🪟 **Transparent Overlay** | Always-on-top, frameless window that stays out of your way |
| 📚 **Clipboard History**   | Automatically tracks the last 20 clipboard items           |
| 🖱️ **Drag-and-Drop**       | Drag any clipboard item directly into other applications   |
| 👆 **Click to Copy**       | Click any item to copy it back to your clipboard           |
| ⌨️ **Global Shortcut**     | Press `Ctrl+Shift+V` to show/hide the overlay              |
| 🎯 **Draggable Window**    | Move the overlay by dragging the header                    |
| 🗑️ **Delete Items**        | Remove unwanted items from your clipboard history          |
| 🎨 **Minimalist Design**   | Clean black and white aesthetic with smooth animations     |

## 📦 Installation

### 🚀 Download Pre-built Executable

> **Note:** The executable is not included in the repository. Download it from [Releases](../../releases) or build it yourself.

1. Download `ClipBoy 1.0.0.exe` from the latest [Release](../../releases)
2. Run the executable - **no installation required** (portable) ✨

### 🔨 Build from Source

#### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

#### Steps

1. **Clone this repository:**

   ```bash
   git clone <repository-url>
   cd ClipBoy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run in development mode:**

   ```bash
   npm start
   ```

4. **Build for Windows:**

   ```bash
   npm run build:win
   ```

   The built executable will be in the `dist` folder. 📁

## 🎮 Usage

| Action                   | How to                                                             |
| ------------------------ | ------------------------------------------------------------------ |
| 🚀 **Launch ClipBoy**    | Run the executable to start the application                        |
| 👁️ **Show/Hide Overlay** | Press `Ctrl+Shift+V` to toggle the overlay window                  |
| 📋 **Copy Items**        | Click any item in the clipboard history to copy it                 |
| 🖱️ **Drag Items**        | Drag any item from the overlay and drop it into other applications |
| 🗑️ **Delete Items**      | Hover over an item and click the `−` button to remove it           |
| 🎯 **Move Window**       | Click and drag the header to reposition the overlay                |
| ❌ **Close Application** | Click the `×` button in the header to quit                         |

### 💡 Tips

- The overlay automatically tracks your clipboard - no configuration needed! 🎯
- Items are stored in memory only - your data stays private 🔒
- The window is click-through when not hovering, so it won't interfere with your work 🪟

## 🔧 Technical Details

### Tech Stack

- **Framework:** [Electron](https://www.electronjs.org/) 28.0.0 ⚡
- **Platform:** Windows (portable executable) 🪟
- **Language:** JavaScript (Node.js) 💻

### Specifications

| Feature                     | Details                                                                        |
| --------------------------- | ------------------------------------------------------------------------------ |
| 📊 **Clipboard Monitoring** | Checks clipboard every 500ms                                                   |
| 📝 **History Limit**        | Stores up to 20 clipboard items                                                |
| 🪟 **Window Features**      | Transparent background, always on top, click-through support, frameless design |

## 💻 Development

### 📁 Project Structure

```
ClipBoy/
├── main.js          # Main Electron process
├── renderer.js      # Renderer process (UI logic)
├── index.html       # UI markup
├── styles.css       # Styling
├── package.json     # Project configuration
└── build/           # Build assets (icons, etc.)
```

### 🛠️ Available Scripts

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `npm start`         | Run the application in development mode 🚀 |
| `npm run dev`       | Run with development flags 🔧              |
| `npm run build`     | Build the application 📦                   |
| `npm run build:win` | Build Windows portable executable 🪟       |

### 🧪 Development Workflow

1. Make your changes to the source code
2. Test with `npm start`
3. Build with `npm run build:win`
4. Test the built executable from `dist/`

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👤 Author

See `package.json` for author information.

---

<div align="center">

**Made with ❤️ using Electron**

⭐ Star this repo if you find it useful!

</div>
