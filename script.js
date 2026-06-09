const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");
const darkToggle = document.getElementById("darkModeToggle");
const searchInput = document.getElementById("search");
const contacts = document.querySelectorAll(".contact");
const chatName = document.getElementById("chatName");
const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");
const statusText = document.getElementById("statusText");
const headerAvatar = document.getElementById("headerAvatar");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const appContainer = document.querySelector(".app");

let currentChat = "Joy 💚";
let chats = JSON.parse(localStorage.getItem("whatsappChats")) || {};

const emojis = ["😀", "", "😍", "🥺", "🔥", "😎", "💚", "👍", "😭", "😅", "🙌", "✨", "🎉", "🤔", "👀", "🚀", "💯", "🙏", "💔", "🌹", "🎂", "🍕", "🌍", "💻", "⭐", "🌈", "✅", "❌", "👋", "🤝"];

function saveChats() {
    localStorage.setItem("whatsappChats", JSON.stringify(chats));
}

function getTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes;
}

function renderMessages() {
    chatBox.innerHTML = "";
    if (!chats[currentChat]) return;

    chats[currentChat].forEach((msg, index) => {
        const div = document.createElement("div");
        div.classList.add("message", msg.type);

        // Safely add message text
        const textSpan = document.createElement("span");
        textSpan.textContent = msg.text + " "; 
        div.appendChild(textSpan);

        // Add time and ticks
        const infoSpan = document.createElement("span");
        infoSpan.className = "time";
        infoSpan.textContent = msg.time + " ";
        
        if (msg.type === "sent") {
            const tickSpan = document.createElement("span");
            tickSpan.className = "tick";
            tickSpan.textContent = msg.seen ? "✔✔" : "✔";
            infoSpan.appendChild(tickSpan);
        }
        div.appendChild(infoSpan);

        // Add delete button
        const delBtn = document.createElement("span");
        delBtn.className = "delete-btn";
        delBtn.textContent = " ❌";
        delBtn.onclick = () => {
            chats[currentChat].splice(index, 1);
            saveChats();
            renderMessages();
        };
        div.appendChild(delBtn);
        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

function createMessage(text, type) {
    if (!chats[currentChat]) chats[currentChat] = [];

    const messageObj = {
        text: text,
        type: type,
        time: getTime(),
        seen: false
    };

    chats[currentChat].push(messageObj);
    saveChats();
    renderMessages();

    return chats[currentChat].length - 1;
}

function smartReply(userText) {
    const text = userText.toLowerCase();

    if (text.includes("hi") || text.includes("hello") || text.includes("hey"))
        return "Hey😀";
    if (text.includes("how are you") || text.includes("how's it going"))
        return "I'm doing great! How are things with you? 😊";
    if (text.includes("love"))
        return "Aww that’s sweet 💚";
    if (text.includes("miss"))
        return "I miss you too 🥺";
    if (text.includes("thanks") || text.includes("thank you"))
        return "You're very welcome! ✨";
    if (text.includes("bye") || text.includes("good night") || text.includes("goodnight"))
        return "Catch you later! 👋 Have a good one.";
    if (text.includes("what's up") || text.includes("sup"))
        return "Not much, just catching up on some messages. You? ☕";
    if (text.includes("haha") || text.includes("lol") || text.includes("lmao"))
        return "Haha, I'm glad you're laughing! 😂";

    const randomReplies = [
        "Tell me more 👀",
        "Really? 😅",
        "Okay 💚",
        "That's interesting, go on...",
        "I see! ✨",
        "Wait, what? 😂",
        "Mind blown! 🤯",
        "Cool! 👍"
    ];

    return randomReplies[Math.floor(Math.random() * randomReplies.length)];
}

function simulateReply(userText) {
    statusText.textContent = "typing...";
    statusText.classList.remove("offline");

    setTimeout(() => {

        const reply = smartReply(userText);
        createMessage(reply, "received");

        statusText.textContent = "online";

        // Mark last sent message as seen
        const lastIndex = chats[currentChat].length - 2;
        if (lastIndex >= 0 && chats[currentChat][lastIndex].type === "sent") {
            chats[currentChat][lastIndex].seen = true;
            saveChats();
            renderMessages();
        }

    }, 1500);
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    createMessage(text, "sent");
    messageInput.value = "";

    simulateReply(text);
}

sendBtn.onclick = sendMessage;

messageInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

messageInput.addEventListener("focus", () => {
    // Scroll to bottom when keyboard appears to keep the input and context visible
    setTimeout(() => chatBox.scrollTop = chatBox.scrollHeight, 300);
});

// Emoji Picker
emojiBtn.onclick = () => {
    emojiPicker.style.display =
        emojiPicker.style.display === "flex" ? "none" : "flex";
};

emojis.forEach(e => {
    const span = document.createElement("span");
    span.textContent = e;
    span.onclick = () => {
        messageInput.value += e;
    };
    emojiPicker.appendChild(span);
});

// Online / Offline simulation
setInterval(() => {
    const online = Math.random() > 0.3;

    if (online) {
        statusText.textContent = "online";
        statusText.classList.remove("offline");
    } else {
        statusText.textContent = "offline";
        statusText.classList.add("offline");
    }
}, 8000);

// Switch chats + change avatar
contacts.forEach(contact => {
    contact.onclick = () => {
        const name = contact.querySelector("span").textContent;
        const imgSrc = contact.querySelector("img").src;

        currentChat = name;
        chatName.textContent = name;
        headerAvatar.src = imgSrc;

        renderMessages();

        // Close sidebar drawer on mobile after selection
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
    };
});

menuBtn.onclick = () => {
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
};

sidebarOverlay.onclick = () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
};

// Dark mode
darkToggle.onclick = () => {
    document.body.classList.toggle("dark");
};

// Search contacts
// 'input' event is more robust than 'keyup' as it handles mouse-pasted text too
searchInput.addEventListener("input", (e) => {
    const filter = e.target.value.toLowerCase();

    contacts.forEach(contact => {
        const name = contact.querySelector("span").textContent.toLowerCase();
        contact.style.display = name.includes(filter) ? "flex" : "none";
    });
});

// Initial load
renderMessages();