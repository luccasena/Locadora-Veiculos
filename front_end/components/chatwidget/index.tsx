"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { aiResponse } from "@/services/Aiservice";

interface Message {
  role: "user" | "bot";
  content: string | any;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const res = await aiResponse({ prompt: input });

    const botMessage: Message = { role: "bot", content: res.prompt };
    setMessages(prev => [...prev, botMessage]);  
  };


  return (
    <>
      {/* Botão flutuante */}
      <button onClick={() => setOpen(!open)} className="botao-chat-flutuante">
        💬
      </button>

      {/* Modal do chat */}
      {open && (
        <div className="modal-chat">
          <div style={{ padding: "12px", background: "#000000ff", color: "#fff", fontSize: "16px" }}>
            Atendente Virtual – UrbanMove
          </div>
          <div
            style={{
              flex: 1,
              padding: "12px",
              overflowY: "auto",
              fontSize: "14px"
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.role === "user" ? "right" : "left",
                  marginBottom: "8px"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px",
                    borderRadius: "8px",
                    background: m.role === "user" ? "#DCF8C6" : "#EEE"
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>

          <div style={{ padding: "12px", borderTop: "1px solid #ddd" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Digite sua mensagem..."
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}