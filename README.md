# 💬 WhatsApp Web Clone🎖️.

A fully responsive **WhatsApp Web** frontend clone built with **HTML**, **CSS**, and **Vanilla JavaScript**. This project simulates a multi-contact chat interface with typing indicators, message read receipts, emoji picker, dark mode, and localStorage persistence — all without a backend.

> 🔗 **Live Demo:** [denismunene2006-lab.github.io/whatsapp-clone-project](https://denismunene2006-lab.github.io/whatsapp-clone-project/)

---

## ✨ Features

### 💬 Chat System
- Send and receive messages with **smart auto-replies**
- **Typing indicator** simulation for realistic UX
- Separate conversations for **multiple contacts**
- **Auto-scroll** to latest messages
- **Clear chat history** per contact

### 👁️ Message Status
- ✅ **Sent** — message delivered
- 👁️ **Seen** — auto-marked after the contact replies

### 🎨 Visual Design
- Authentic WhatsApp **"doodle" chat background**
- Message bubbles with directional **tails**
- Modern **pill-shaped** input bar
- **Profile pictures** for each contact (dynamic header avatar)

### 😀 Emoji Picker
- Built-in emoji grid
- Click to insert emojis directly into the message input

### 🌙 Dark Mode
- One-click toggle between **light** and **dark** themes
- Persisted across sessions via localStorage

### 🔍 Search
- Real-time **contact search** filter in the sidebar

### 📱 Responsive & Mobile-First
- **Sliding sidebar drawer** with hamburger menu for mobile
- **Sidebar overlay backdrop** for intuitive mobile interaction
- Dynamic viewport height (`100dvh`) for better mobile browser support
- Optimized spacing and layout for small screens

### 💾 Data Persistence
- All messages saved to **localStorage**
- Chat history persists across browser sessions

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup & structure |
| **CSS3** | Flexbox layout, media queries, custom properties (dark mode) |
| **Vanilla JavaScript** | DOM manipulation, event handling, localStorage API |

---

## 📁 Project Structure

```
whatsappp-clone/
├── index.html          # Main HTML structure
├── style.css           # All styles (light & dark themes)
├── script.js           # Application logic
└── README.md           # Project documentation
```

---

## 🧠 What I Learned

- **DOM manipulation** — dynamically creating and updating UI elements
- **State management** — tracking active chat, message history, and UI state
- **localStorage API** — persisting messages and theme preferences
- **Event handling** — keyboard events, click delegation, custom events
- **Responsive design** — media queries, `100dvh`, mobile-first navigation
- **UI simulation** — typing indicators, message statuses, smart auto-replies
- **CSS custom properties** — seamless dark/light theme switching

---

## 🚀 Future Improvements

- [ ] Real-time messaging with **Node.js & Socket.io**
- [ ] User authentication system
- [ ] Backend database integration (MongoDB / Firebase)
- [ ] Push notifications
- [ ] Voice message recording & playback
- [ ] Image & file sharing
- [ ] End-to-end encryption simulation

---

## 👨‍💻 Author

**Denis Munene**  
Frontend Developer · Software Engineering Student

[![GitHub](https://img.shields.io/badge/GitHub-@denismunene2006--lab-181717?style=flat&logo=github)](https://github.com/denismunene2006-lab)

---

## ⭐ Support

If you found this project helpful or interesting, consider giving it a **star** on GitHub — it means a lot!

---

<p align="center">
  Made with ❤️ by Denis Munene
</p>