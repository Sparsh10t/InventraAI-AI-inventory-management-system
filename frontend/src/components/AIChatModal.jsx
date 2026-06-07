import { useState, useEffect, useRef } from "react";
import { X, Bot, Send } from "lucide-react";
import axios from "axios";

const AIChatModal = ({ show, setShow, onClose }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! 👋 Ask me anything about your inventory.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // support both show/setShow and onClose patterns
  const isVisible = show !== undefined ? show : true;
  const handleClose = () => {
    if (setShow) setShow(false);
    if (onClose) onClose();
  };

  // auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!isVisible) return null;

  const handleSend = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [...prev, { sender: "user", text: userQuestion }]);
    setQuestion("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://inventraai-ai-inventory-management-system.onrender.com/api/chat",
        { question: userQuestion },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, { sender: "ai", text: response.data.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Unable to connect to AI. Please try again." },
      ]);
      console.log(error);
    }

    setLoading(false);
  };

  return (
    /* ── Backdrop ── */
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* ── Modal ── */}
      <div className="w-[50vw] h-[60vh] min-w-[400px] bg-[rgb(6,12,28)] border border-white/10 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-[fadeUp_0.25s_ease]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm leading-tight">AI Inventory Assistant</h2>
              <p className="text-[11px] text-white/40">Powered by Inventra AI</p>
            </div>
          </div>
          {/* live dot */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] text-green-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online
            </span>
            <button
              onClick={handleClose}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/50 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {/* AI avatar */}
              {msg.sender === "ai" && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                  <Bot size={12} className="text-white" />
                </div>
              )}
              <div
                className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm leading-relaxed
                  ${msg.sender === "user"
                    ? "bg-cyan-500 text-[rgb(2,8,20)] font-medium rounded-br-sm"
                    : "bg-white/[0.06] border border-white/[0.08] text-white/85 rounded-bl-sm"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                <Bot size={12} className="text-white" />
              </div>
              <div className="bg-white/[0.06] border border-white/[0.08] px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ── */}
        <div className="border-t border-white/[0.08] p-4 bg-white/[0.02]">
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              placeholder="Ask about inventory, sales, stock..."
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!question.trim() || loading}
              className="w-10 h-10 rounded-xl bg-cyan-500 text-[rgb(2,8,20)] flex items-center justify-center hover:bg-cyan-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
          <p className="text-[11px] text-white/20 mt-2 text-center">Press Enter to send · Esc to close</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AIChatModal;