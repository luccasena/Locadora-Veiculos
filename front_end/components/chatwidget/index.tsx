"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { aiResponse } from "@/services/Aiservice";
import { Airequest } from "@/types/AIrequest";

interface Message {
  role: "user" | "bot";
  content: string | any;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setIsLoading(true);

    const airequest: Airequest = 
                    { 
                      prompt: input,
                      context: messages.filter(m => m.role === "user" || m.role === "bot").map(m => m.content) 
                    };

    const res = await aiResponse(airequest);

    console.log("AI Response:", res.data.response);

    const botMessage: Message = { role: "bot", content: res.data.response };
    setMessages(prev => [...prev, botMessage]);  

    setIsLoading(false);
  };

  useEffect(() => {
    const botMessage: Message = { role: "bot", content: "Olá! Sou o atendente virtual da UrbanMove. Como posso ajudar você hoje?" };
    setMessages(prev => [...prev, botMessage]);  
    
}, []);

  return (
    <>
        <button onClick={() => setOpen(!open)} className="botao-chat-flutuante">
          💬
        </button>

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
                }
              }
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
                background: m.role === "user" ? "#DCF8C6" : "#EEE",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}

        {isLoading && (
          <div
            style={{
              textAlign: "left",
              marginBottom: "8px"
            }}
            >
            <span
              style={{
                display: "inline-block",
                padding: "8px",
                borderRadius: "8px",
                background: "#EEE",
                fontStyle: "italic",
                opacity: 0.8
              }}
            >
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </span>
          </div>
        )}
          
        </div>
        <div style={{ padding: "12px", borderTop: "1px solid #ddd", display: "flex", gap: "8px" }}>
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
            }}/>
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              style={{
                width: "18%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                opacity: (!input.trim() || isLoading) ? 0.5 : 1,
                cursor: (!input.trim() || isLoading) ? "not-allowed" : "pointer"
              }}
            >
              {isLoading ? "..." : "Enviar"}
            </button>
        </div>
      </div>
    )}
    </>
  );
}