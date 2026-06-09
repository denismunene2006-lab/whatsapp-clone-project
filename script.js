const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");
const darkToggle = document.getElementById("darkModeToggle");
const searchInput = document.getElementById("searchInput"); // Renamed ID for clarity
const contactList = document.getElementById("contactList"); // New element for dynamic contacts
const chatName = document.getElementById("chatName");
const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");
const statusText = document.getElementById("statusText");
const headerAvatar = document.getElementById("headerAvatar");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const appContainer = document.querySelector(".app");
const clearChatBtn = document.getElementById("clearChatBtn");

// Centralized contact data
const contactsData = [
    { id: "joy", name: "Joy 💚", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: "denis", name: "Denis", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: "mom", name: "Mom", avatar: "https://i.pravatar.cc/150?img=47" },
    { id: "bro", name: "Bro", avatar: "https://i.pravatar.cc/150?img=12" }
];

// Initialize currentChat with the ID of the first contact, or a default if no contacts
let currentChatId = contactsData.length > 0 ? contactsData[0].id : null;

// Ensure initial chat name and avatar are set
let currentContact = contactsData.find(contact => contact.id === currentChatId);

let chats = JSON.parse(localStorage.getItem("whatsappChats")) || {};

const emojis = ["😀", "😂", "😍", "🥺", "🔥", "😎", "💚", "👍", "😭", "😅", "🙌", "✨", "🎉", "🤔", "👀", "🚀", "💯", "🙏", "💔", "🌹", "🎂", "🍕", "🌍", "💻", "⭐", "🌈", "✅", "❌", "👋", "🤝"];

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
    if (!currentChatId || !chats[currentChatId] || chats[currentChatId].length === 0) {
        const emptyChatDiv = document.createElement("div");
        emptyChatDiv.classList.add("empty-chat-message");
        emptyChatDiv.textContent = `Say hi to ${currentContact ? currentContact.name.split(' ')[0] : 'someone'} to start a conversation! 👋`;
        chatBox.appendChild(emptyChatDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        return;
    }

    chats[currentChatId].forEach((msg, index) => {
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
            chats[currentChatId].splice(index, 1);
            saveChats();
            renderMessages();
        };
        div.appendChild(delBtn);
        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

function createMessage(text, type) {
    if (!currentChatId) return; // Cannot send message if no chat is selected
    if (!chats[currentChatId]) chats[currentChatId] = [];

    const messageObj = {
        text: text,
        type: type,
        time: getTime(),
        seen: false
    };

    chats[currentChatId].push(messageObj);
    saveChats();
    renderMessages();
    renderContacts(searchInput.value); // Update sidebar preview

    return chats[currentChatId].length - 1;
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

    // Randomize reply delay between 1.5 to 3 seconds for a more natural feel
    setTimeout(() => {

        const reply = smartReply(userText);
        createMessage(reply, "received");

        statusText.textContent = "online";

        // Mark last sent message as seen
        const lastIndex = chats[currentChatId].length - 2;
        if (lastIndex >= 0 && chats[currentChatId][lastIndex].type === "sent") {
            chats[currentChatId][lastIndex].seen = true;
            saveChats();
            renderMessages();
        }

    }, Math.random() * 1500 + 1500); // 1500ms (1.5s) + random up to 1500ms (1.5s) = 1.5s to 3s
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
function switchChat(contactId) {
    currentChatId = contactId;
    currentContact = contactsData.find(contact => contact.id === currentChatId);

    if (currentContact) {
        chatName.textContent = currentContact.name;
        headerAvatar.src = currentContact.avatar;
    } else {
        chatName.textContent = "Select a chat";
        headerAvatar.src = ""; // Or a default avatar
    }

    renderMessages();
    renderContacts(searchInput.value); // Ensure sidebar highlight updates

    // Close sidebar drawer on mobile after selection
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
}

// Render contacts dynamically
function renderContacts(filter = "") {
    contactList.innerHTML = ""; // Clear existing contacts
    
    const filtered = contactsData.filter(c => 
        c.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(contact => {
        const chatHistory = chats[contact.id] || [];
        const lastMsg = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].text : "No messages yet";

        const li = document.createElement("li");
        li.classList.add("contact");
        if (contact.id === currentChatId) li.classList.add("active");

        li.innerHTML = `
            <img src="${contact.avatar}" alt="${contact.name}" class="avatar">
            <div class="contact-info">
                <span>${contact.name}</span>
                <div class="last-message">${lastMsg}</div>
            </div>
        `;
        li.onclick = () => switchChat(contact.id);
        contactList.appendChild(li);
    });
}

// Initial setup for chat header
if (currentContact) {
    chatName.textContent = currentContact.name;
    headerAvatar.src = currentContact.avatar;
}

if (localStorage.getItem("whatsappDarkMode") === "true") {
    document.body.classList.add("dark");
}

// Event listener for dynamically created contacts (delegation or re-attach)
// This part will be handled by the `renderContacts` function directly.


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
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("whatsappDarkMode", isDark);
};

// Clear chat history
clearChatBtn.onclick = () => {
    if (!currentChatId) return;
    
    const confirmClear = confirm(`Are you sure you want to clear the chat with ${currentContact.name}?`);
    if (confirmClear) {
        chats[currentChatId] = [];
        saveChats();
        renderMessages();
        renderContacts(searchInput.value);
    }
};

// Search contacts
searchInput.addEventListener("input", (e) => {
    renderContacts(e.target.value);
});

// Initial load
renderContacts(); // Render contacts on initial load
renderMessages();