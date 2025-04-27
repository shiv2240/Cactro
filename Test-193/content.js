document.addEventListener("mouseup", () => {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      const popup = document.createElement("div");
      popup.textContent = "💾 Save Highlight?";
      popup.style = "position: absolute; background: yellow; cursor: pointer; padding: 5px; border: 1px solid black; z-index: 10000;";
      document.body.appendChild(popup);
      
      const { x, y } = window.getSelection().getRangeAt(0).getBoundingClientRect();
      popup.style.left = `${x + window.scrollX}px`;
      popup.style.top = `${y + window.scrollY - 30}px`;
  
      popup.onclick = () => {
        chrome.runtime.sendMessage({ type: "saveHighlight", text: selection });
        document.body.removeChild(popup);
      };
  
      setTimeout(() => popup.remove(), 4000);
    }
  });
  