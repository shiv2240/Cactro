document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("highlights");

  chrome.storage.local.get("highlights", ({ highlights }) => {
    if (!highlights || highlights.length === 0) {
      container.textContent = "No highlights saved yet.";
      return;
    }

    highlights.forEach((text, i) => {
      const div = document.createElement("div");
      div.textContent = text;
      const del = document.createElement("button");
      del.textContent = "❌";
      del.onclick = () => {
        highlights.splice(i, 1);
        chrome.storage.local.set({ highlights });
        location.reload();
      };
      div.appendChild(del);
      container.appendChild(div);
    });
  });

  document.getElementById("summarizeBtn").onclick = async () => {
    chrome.storage.local.get("highlights", async ({ highlights }) => {
      if (!highlights || highlights.length === 0) {
        alert("No highlights to summarize.");
        return;
      }

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer API KEY",
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "user",
                content: "Summarize the following:\n" + highlights.join("\n"),
              },
            ],
          }),
        });

        const data = await response.json();
        document.getElementById("summary").textContent =
          data.choices[0].message.content;
      } catch (error) {
        console.error("Error summarizing:", error);
        alert("Failed to get summary. Check your API key or network.");
      }
    });
  };
});
