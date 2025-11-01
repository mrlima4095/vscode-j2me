# 📱 J2ME Support for VS Code

Bring back the glory of Java ME development!  
This VS Code extension adds syntax highlighting, snippets, and essential tools for building **MIDlets** and J2ME applications directly inside your editor.

---

## ✨ Features

### 🧠 Smart Syntax Highlighting
- Highlights Java ME (`javax.microedition.*`) classes and methods.
- Extends Java grammar to support J2ME-specific APIs such as:
  - `javax.microedition.lcdui.*`
  - `javax.microedition.midlet.*`
  - `javax.microedition.rms.*`

### ⚡ Code Snippets
Quickly create common J2ME structures with just a few keystrokes:

| Prefix | Description |
|:-------|:-------------|
| `midlet` | Generates a basic MIDlet class template |
| `canvas` | Creates a Canvas-based game loop class |
| `rms` | Adds RecordStore (RMS) read/write helper functions |

### 💾 RMS Utilities
Includes code templates for:
- Reading records with `loadRMS()`
- Writing records with `writeRMS()`
- Safe open/close of `RecordStore`

### 🎨 Automatic Language Detection
Files containing J2ME imports (`import javax.microedition.*`) are automatically detected and highlighted using the J2ME grammar.

### 🧩 Lightweight and Compatible
- Works on any platform (Linux, Windows, macOS)
- Compatible with existing `.java` files
- No external dependencies required

---

## 🛠️ Installation

### From Source
```bash
git clone https://github.com/mrlima4095/vscode-j2me
cd vscode-j2me
npm install -g @vscode/vsce
vsce package
code --install-extension vscode-j2me-0.0.1.vsix
