import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendChatMessage } from "./services/chatService";
import { httpPost } from "../config/httphandler"; 
import axios from "axios";

export default function ChatWidget() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("chatOpen") === "true";
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [{ role: "assistant", content: "Hi! Welcome to GlowUp Salon ✨ How can I help you today?" }];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // ── Persist open state ──
  useEffect(() => {
    localStorage.setItem("chatOpen", isOpen);
  }, [isOpen]);

  // ── Persist messages ──
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // ── Auto scroll ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Auto open on every /services visit ──
  useEffect(() => {
    if (location.pathname.startsWith("/services")) {
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
  }, [location.pathname]);



  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const history = updatedMessages.map(({ role, content }) => ({
        role,
        content,
      }));
      const reply = await sendChatMessage(history);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };


 
  return (
    <>
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes tooltipBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes onlinePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .pulse-ring {
          position: absolute;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.35);
          animation: pulseRing 1.5s ease-out infinite;
          bottom: 0;
          right: 0;
        }
        .tooltip-label {
          background: #7c3aed;
          color: #fff;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(124,58,237,0.4);
          animation: tooltipBounce 1.8s ease-in-out infinite;
          margin-bottom: 8px;
        }
        .chat-float-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #9f67fa);
          border: none;
          font-size: 1.5rem;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.45);
          transition: transform 0.2s;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-float-btn:hover { transform: scale(1.1); }
        .chat-window-animated {
          animation: chatSlideIn 0.3s ease forwards;
        }
        .online-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #86efac;
          animation: onlinePulse 2s infinite;
        }
        .typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7c3aed;
          margin: 0 2px;
          animation: typingBounce 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        .quick-btn:hover {
          background: #7c3aed !important;
          color: #fff !important;
        }
      `}</style>

      {/* ── Floating Button (shown when closed) ── */}
      {!isOpen && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <div style={{ position: "relative", width: "56px", height: "56px" }}>
            <div className="pulse-ring" />
            <button
              className="chat-float-btn"
              onClick={() => setIsOpen(true)}
            >
              🧙
            </button>
          </div>
        </div>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div style={styles.chatWindow} className="chat-window-animated">

          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={styles.avatarCircle}>🧙</div>
              <div>
                <div style={styles.headerTitle}>GlowUp Assistant</div>
                <div style={styles.headerStatus}>
                  <span className="online-dot" />
                  &nbsp;Online · Replies instantly
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={styles.closeBtn}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.bubble,
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #7c3aed, #9f67fa)"
                      : "#f3f0ff",
                    color: msg.role === "user" ? "#ffffff" : "#2d1b69",
                    borderBottomRightRadius: msg.role === "user" ? "4px" : "14px",
                    borderBottomLeftRadius: msg.role === "user" ? "14px" : "4px",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ ...styles.bubble, background: "#f3f0ff" }}>
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
       {["📅 Check my bookings", "💆 Recommend a service", "🗓️ Slots for tomorrow", "💰 Pricing"].map((q) => (
          <button
            key={q}
            className="quick-btn"
            style={styles.quickBtn}
            onClick={() => {
              setInput(q.replace(/^.{2}/, "").trim());
              setTimeout(() => handleSend(), 100);
            }}
          >
            {q}
          </button>
      ))}

          {/* Input */}
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              disabled={loading}
            />
            <button
              style={{
                ...styles.sendBtn,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "default" : "pointer",
              }}
              onClick={handleSend}
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  chatWindow: {
    position: "fixed",
    bottom: "90px",
    right: "24px",
    width: "340px",
    height: "460px",
    maxWidth: "calc(100vw - 48px)",
    background: "#ffffff",
    border: "1px solid #e5d9fb",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(124, 58, 237, 0.2)",
    zIndex: 9999,
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #7c3aed, #9f67fa)",
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatarCircle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
  },
  headerTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  headerStatus: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.7rem",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginTop: "2px",
  },
  closeBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "#fff",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#faf8ff",
  },
  bubble: {
    maxWidth: "80%",
    padding: "10px 14px",
    borderRadius: "14px",
    fontSize: "0.83rem",
    lineHeight: "1.55",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  quickReplies: {
    padding: "8px 12px",
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    borderTop: "1px solid #f0e8ff",
    background: "#ffffff",
  },
  quickBtn: {
    background: "#f3f0ff",
    border: "1px solid #d8b4fe",
    color: "#7c3aed",
    borderRadius: "20px",
    padding: "5px 10px",
    fontSize: "0.72rem",
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  inputArea: {
    display: "flex",
    gap: "8px",
    padding: "12px",
    borderTop: "1px solid #f0e8ff",
    background: "#ffffff",
  },
  input: {
    flex: 1,
    background: "#f3f0ff",
    border: "1px solid #d8b4fe",
    borderRadius: "20px",
    padding: "9px 16px",
    color: "#2d1b69",
    fontSize: "0.82rem",
    outline: "none",
  },
  sendBtn: {
    background: "linear-gradient(135deg, #7c3aed, #9f67fa)",
    border: "none",
    borderRadius: "50%",
    width: "38px",
    height: "38px",
    color: "#ffffff",
    fontSize: "0.9rem",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(124,58,237,0.35)",
  },
};