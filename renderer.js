const { ipcRenderer } = require("electron");

let clipboardHistory = [];
let draggedElement = null;

// Get initial clipboard history
clipboardHistory = ipcRenderer.sendSync("get-clipboard-history");
renderClipboardItems();

// Listen for clipboard updates
ipcRenderer.on("clipboard-updated", (event, history) => {
  clipboardHistory = history;
  renderClipboardItems();
});

// Render clipboard items
function renderClipboardItems() {
  const container = document.getElementById("clipboardItems");

  if (clipboardHistory.length === 0) {
    container.innerHTML =
      '<div class="clipboard-item empty">No clipboard items yet</div>';
    return;
  }

  container.innerHTML = clipboardHistory
    .map((item, index) => {
      const truncated =
        item.length > 100 ? item.substring(0, 100) + "..." : item;
      return `
            <div class="clipboard-item" 
                 draggable="true" 
                 data-index="${index}"
                 data-text="${escapeHtml(item)}"
                 title="${escapeHtml(item)}">
                ${escapeHtml(truncated)}
                <button class="delete-btn" data-index="${index}" title="Delete">−</button>
            </div>
        `;
    })
    .join("");

  // Add event listeners to items
  document.querySelectorAll(".clipboard-item").forEach((item) => {
    if (!item.classList.contains("empty")) {
      setupDragAndDrop(item);
      
      // Click to copy (but not if clicking delete button)
      item.addEventListener("click", (e) => {
        if (!e.target.classList.contains("delete-btn")) {
          const text = item.getAttribute("data-text");
          ipcRenderer.send("copy-to-clipboard", text);
        }
      });
      
      // Delete button handler
      const deleteBtn = item.querySelector(".delete-btn");
      if (deleteBtn) {
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const index = parseInt(deleteBtn.getAttribute("data-index"));
          ipcRenderer.send("delete-clipboard-item", index);
        });
      }
    }
  });
}

// Setup drag and drop for an item
function setupDragAndDrop(element) {
  element.addEventListener("dragstart", (e) => {
    draggedElement = element;
    element.classList.add("dragging");
    const text = element.getAttribute("data-text");

    // Copy to clipboard immediately when drag starts
    // This ensures the text is available for paste operations
    ipcRenderer.send("copy-to-clipboard", text);

    // Set drag data with multiple formats for better compatibility
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", text);
    e.dataTransfer.setData("text", text);

    // Also try setting as HTML format
    try {
      e.dataTransfer.setData("text/html", text);
    } catch (err) {
      // Ignore if HTML format fails
    }

    // Create a custom drag image matching minimalist black/white design
    const dragImage = document.createElement("div");
    dragImage.textContent = text.substring(0, 50);
    dragImage.style.position = "absolute";
    dragImage.style.top = "-1000px";
    dragImage.style.background = "#000000";
    dragImage.style.padding = "10px 14px";
    dragImage.style.border = "1px solid #ffffff";
    dragImage.style.color = "#ffffff";
    dragImage.style.fontSize = "12px";
    dragImage.style.whiteSpace = "nowrap";
    dragImage.style.fontFamily = '"Consolas", "Courier New", monospace';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  });

  element.addEventListener("dragend", (e) => {
    element.classList.remove("dragging");
    draggedElement = null;
  });
}

// Close button handler
document.getElementById("closeBtn").addEventListener("click", () => {
  ipcRenderer.send("close-overlay");
});

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Make window draggable via header
let isDraggingWindow = false;
let dragStartX = 0;
let dragStartY = 0;

const header = document.querySelector(".header");

header.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("close-btn")) return;
  isDraggingWindow = true;
  dragStartX = e.screenX;
  dragStartY = e.screenY;
});

document.addEventListener("mousemove", (e) => {
  if (isDraggingWindow) {
    const deltaX = e.screenX - dragStartX;
    const deltaY = e.screenY - dragStartY;
    ipcRenderer.send("move-window", { x: deltaX, y: deltaY });
    dragStartX = e.screenX;
    dragStartY = e.screenY;
  }
});

document.addEventListener("mouseup", () => {
  isDraggingWindow = false;
});
