function toggleChatbot() {
    var chatbotBox = document.getElementById("chatbot-box");
    if (chatbotBox.style.display === "none" || chatbotBox.style.display === "") {
      chatbotBox.style.display = "block";
    } else {
      chatbotBox.style.display = "none";
    }
  }
  function sendMessage(event) {
    if (event.key === "Enter") {
      var input = document.getElementById("chatbot-input");
      var message = input.value.trim();
      if (message !== "") {
        var chatbox = document.getElementById("chatbot-messages");
        var userMessage = `<div><b>You:</b> ${message}</div>`;
        chatbox.innerHTML += userMessage;
        input.value = "";
        // Send message to backend
        fetch("/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
          var botMessage = `<div><b>Bot:</b> ${data.reply}</div>`;
          chatbox.innerHTML += botMessage;
        });
      }
    }
  }

