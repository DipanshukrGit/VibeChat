"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import ChatHeader   from "../components/chat/ChatHeader";
import ContactList  from "../components/chat/ContactList";
import ChatWindow   from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";
import ProfileModal from "../components/chat/ProfileModal";

/* ── Mock contacts ── */
const INITIAL_CONTACTS = [
  { id:"vibebot", name:"VibeBot 🤖",   initials:"VB", color:"#22c55e", avatar:"/avatar/bot.png",       lastMsg:"Hello! Type 'hi' to start.",      time:"now",       online:true,  isBot:true  },
  { id:"alex",    name:"Alex Johnson",  initials:"AJ", color:"#3b82f6", avatar:"/avatar/man.png",       lastMsg:"Hey, when are you free?",          time:"2m",        online:true,  isBot:false, unread:3 },
  { id:"sarah",   name:"Sarah Chen",    initials:"SC", color:"#a855f7", avatar:"/avatar/user.png",      lastMsg:"Did you see the latest update?",   time:"15m",       online:false, isBot:false },
  { id:"mike",    name:"Mike Davis",    initials:"MD", color:"#f97316", avatar:"/avatar/hacker.png",    lastMsg:"Let's catch up soon!",             time:"1h",        online:true,  isBot:false },
  { id:"emma",    name:"Emma Wilson",   initials:"EW", color:"#ec4899", avatar:"/avatar/astronaut.png", lastMsg:"Thanks for the help earlier 😊",  time:"2h",        online:false, isBot:false },
  { id:"james",   name:"James Brown",   initials:"JB", color:"#14b8a6", avatar:"/avatar/dog.png",       lastMsg:"The project looks great!",         time:"3h",        online:false, isBot:false },
  { id:"lisa",    name:"Lisa Martinez", initials:"LM", color:"#f59e0b", avatar:"/avatar/user.png",      lastMsg:"Can you review my PR?",            time:"Yesterday", online:true,  isBot:false, unread:7 },
  { id:"chris",   name:"Chris Taylor",  initials:"CT", color:"#6366f1", avatar:"/avatar/man.png",       lastMsg:"Coffee tomorrow?",                 time:"Yesterday", online:false, isBot:false },
];

/* ── Default profile ── */
const DEFAULT_PROFILE = { name:"You", email:"you@vibechat.app", bio:"", initials:"YO", color:"#22c55e", avatar:"/avatar/user.png" };

/* ── Bot response logic ── */
function getBotReply(text) {
  const m = text.toLowerCase().trim();
  if (/^(hi|hello|hey|hii+|helo)$/.test(m))
    return "Hello! 👋 How can I help you today?";
  if (/how (are|r) (you|u)/.test(m))
    return "I'm doing great, thank you! 😊 How are you?";
  return "I don't know about this yet, but I will learn it! 🤖";
}

/* ── Generate initial vibebot messages ── */
function defaultMessages() {
  const now = new Date();
  return {
    vibebot: [
      { id:"b0", text:"Hello! 👋 I'm VibeBot. Ask me anything!", sender:"bot", ts: new Date(now - 60000).toISOString(), status:"sent" },
    ],
    alex:  [{ id:"a1", text:"Hey! How's it going?",         sender:"contact", ts: new Date(now - 120000).toISOString(), status:"sent" }],
    sarah: [{ id:"s1", text:"Did you see the latest update?",sender:"contact", ts: new Date(now - 900000).toISOString(), status:"sent" }],
    mike:  [{ id:"m1", text:"Let's catch up soon!",          sender:"contact", ts: new Date(now - 3600000).toISOString(), status:"sent" }],
    emma:  [{ id:"e1", text:"Thanks for the help earlier 😊",sender:"contact", ts: new Date(now - 7200000).toISOString(), status:"sent" }],
    james: [{ id:"j1", text:"The project looks great!",      sender:"contact", ts: new Date(now-10800000).toISOString(), status:"sent" }],
    lisa:  [{ id:"l1", text:"Can you review my PR?",         sender:"contact", ts: new Date(now-86400000).toISOString(), status:"sent" }],
    chris: [{ id:"c1", text:"Coffee tomorrow?",              sender:"contact", ts: new Date(now-90000000).toISOString(), status:"sent" }],
  };
}

export default function ChatPage() {
  const router = useRouter();

  /* Auth guard */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("vibechat_auth");
      if (!raw || !JSON.parse(raw).loggedIn) router.replace("/login");
    } catch { router.replace("/login"); }
  }, [router]);

  /* Profile */
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vibechat_profile")) || DEFAULT_PROFILE; }
    catch { return DEFAULT_PROFILE; }
  });

  /* Messages */
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vibechat_messages")) || defaultMessages(); }
    catch { return defaultMessages(); }
  });

  /* UI state */
  const [selectedId, setSelectedId]     = useState("vibebot");
  const [isTyping,   setIsTyping]       = useState(false);
  const [showProfile,setShowProfile]    = useState(false);
  const [mobileSide, setMobileSide]     = useState(true);   // true = sidebar visible on mobile
  const [contacts,   setContacts]       = useState(INITIAL_CONTACTS);

  /* Persist messages */
  useEffect(() => {
    localStorage.setItem("vibechat_messages", JSON.stringify(messages));
  }, [messages]);

  /* Persist profile */
  useEffect(() => {
    localStorage.setItem("vibechat_profile", JSON.stringify(profile));
  }, [profile]);

  /* Send a message */
  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      ts: new Date().toISOString(),
      status: "sent",
    };
    setMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), userMsg],
    }));

    /* Update last message in contact list */
    setContacts(prev => prev.map(c =>
      c.id === selectedId ? { ...c, lastMsg: text.trim(), time: "now" } : c
    ));

    /* Bot auto-reply only for vibebot */
    if (selectedId === "vibebot") {
      const delay = 1200 + Math.random() * 600;
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const botMsg = {
          id: (Date.now() + 1).toString(),
          text: getBotReply(text),
          sender: "bot",
          ts: new Date().toISOString(),
          status: "sent",
        };
        setMessages(prev => ({
          ...prev,
          vibebot: [...(prev.vibebot || []), botMsg],
        }));
      }, delay);
    }
  }, [selectedId]);

  const selectedContact = contacts.find(c => c.id === selectedId);
  const currentMessages = messages[selectedId] || [];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <ChatHeader
        profile={profile}
        onProfileClick={() => setShowProfile(true)}
        onBack={() => setMobileSide(true)}
        showBack={!mobileSide}
        contactName={selectedContact?.name}
        contactOnline={selectedContact?.online}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Contact list — 30% desktop, full mobile when mobileSide=true */}
        <div className={`${mobileSide ? "flex" : "hidden"} w-full flex-col md:flex md:w-[30%] md:max-w-xs lg:max-w-[320px]`}>
          <ContactList
            contacts={contacts}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id);
              setMobileSide(false);
              setContacts(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
            }}
          />
        </div>

        {/* Chat area — 70% desktop, full mobile when mobileSide=false */}
        <div className={`${!mobileSide ? "flex" : "hidden"} flex-1 flex-col overflow-hidden md:flex border-l border-gray-100`}>
          <ChatWindow
            messages={currentMessages}
            isTyping={isTyping}
            contact={selectedContact}
            profile={profile}
          />
          <MessageInput onSend={sendMessage} />
        </div>
      </div>

      {showProfile && (
        <ProfileModal
          profile={profile}
          onSave={(updated) => { setProfile(updated); setShowProfile(false); }}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}
