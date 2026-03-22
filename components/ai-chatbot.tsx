"use client"

import { useState, useRef, useEffect } from "react"

const SAHIL_INFO = `
You are an AI assistant for Sahil Satasiya's portfolio website. Answer questions about Sahil based on this information. Keep responses concise (2-3 sentences max) since they will be spoken aloud.

**About Sahil:**
- MS Computer Science student at University of Southern California (USC), specializing in AI/ML
- Based in Los Angeles, CA
- Email: satasiyasahil14@gmail.com
- GitHub: github.com/sahil1402
- LinkedIn: linkedin.com/in/sahilsatasiya

**Work Experience:**
1. Co-Founder & Founding ML Engineer at CampusX (Sep 2025 - Jan 2026)
   - Built end-to-end ML pipelines and predictive models
   - Improved feed conversion by 12%
   - Used Python, SQL, and AWS

2. AI Engineer at Tata Consultancy Services (May 2024 - June 2025)
   - Developed scalable PySpark and SQL pipelines processing 80K+ records
   - Built forecasting models, reduced pipeline failures by 15%

3. ML Engineer Intern at RethinkSoft (May 2023 - July 2023)
   - Built flight price forecasting models with 98% accuracy
   - Automated EDA pipelines, reducing analysis time by 30%

4. ML Intern at NeuroNexus Innovations (Feb 2023 - Apr 2023)
   - Student performance prediction with 87% accuracy
   - Worked with logistic regression, random forest, XGBoost

**Skills:**
- Languages: Python, SQL, JavaScript, TypeScript
- ML/AI: TensorFlow, PyTorch, scikit-learn, PySpark
- Web: React, Next.js, FastAPI, Node.js
- Tools: AWS, Docker, Git, PostgreSQL, MongoDB

**Education:**
- MS in Computer Science at USC (Current)
- BE in Computer Science from SRM Institute of Science and Technology

Keep responses friendly, concise, and professional. If asked something not covered here, politely say you don't have that information but they can contact Sahil directly.
`

const INITIAL_MESSAGE = {
  role: "assistant" as const,
  content: "Hey! 👋 I'm Sahil's AI assistant. You can type or click the mic to ask me anything about his experience, skills, or background!"
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
        setTimeout(() => {
          handleSendWithText(transcript)
        }, 300)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1
      
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel"))
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleSendWithText = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SAHIL_INFO,
          messages: [{ role: "user", content: text }],
        }),
      })

      const data = await response.json()
      const responseText = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again!"
      
      const assistantMessage: Message = {
        role: "assistant",
        content: responseText
      }
      setMessages((prev) => [...prev, assistantMessage])
      speakText(responseText)
    } catch (error) {
      const errorMsg = "Sorry, I'm having trouble connecting. Please try again later!"
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }])
      speakText(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    handleSendWithText(input)
  }

  return (
    <>
      <style jsx global>{`
        @keyframes chatPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes chatListening {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        }
        @keyframes chatSpeaking {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(45, 212, 191, 0); }
        }
        @keyframes chatSoundWave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer z-50 border-0"
        style={{
          background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
          boxShadow: "0 4px 20px rgba(45, 212, 191, 0.4)",
          animation: isOpen ? "none" : "chatPulse 2s infinite",
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-[380px] h-[520px] rounded-2xl border border-border flex flex-col overflow-hidden z-50"
          style={{
            backgroundColor: "#111111",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            animation: "chatSlideUp 0.3s ease",
          }}
        >
          {/* Header */}
          <div 
            className="p-4 border-b border-border"
            style={{ background: "linear-gradient(135deg, rgba(45, 212, 191, 0.1), transparent)" }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-black"
                style={{
                  background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
                  animation: isSpeaking ? "chatSpeaking 1s infinite" : "none",
                }}
              >
                S
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground">Sahil&apos;s AI Assistant</h3>
                <p className="text-xs text-muted-foreground">
                  {isSpeaking ? "Speaking..." : isListening ? "Listening..." : "Voice & Text enabled"}
                </p>
              </div>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="px-3 py-1.5 rounded-lg border-0 text-xs cursor-pointer text-white"
                  style={{ backgroundColor: "#ef4444" }}
                >
                  Stop
                </button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] p-3 px-4 text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "self-end rounded-2xl rounded-br-sm bg-primary text-primary-foreground" 
                    : "self-start rounded-2xl rounded-bl-sm bg-card text-foreground"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="self-start p-3 px-4 rounded-2xl rounded-bl-sm bg-card flex gap-1 text-primary">
                <span style={{ animation: "chatBounce 1s infinite", animationDelay: "0s" }}>●</span>
                <span style={{ animation: "chatBounce 1s infinite", animationDelay: "0.2s" }}>●</span>
                <span style={{ animation: "chatBounce 1s infinite", animationDelay: "0.4s" }}>●</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border flex gap-2 items-center">
            {/* Mic Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isLoading}
              className="w-11 h-11 rounded-xl border-0 flex items-center justify-center cursor-pointer transition-all"
              style={{
                backgroundColor: isListening ? "#ef4444" : "#1e1e1e",
                color: isListening ? "#fff" : "#71717a",
                animation: isListening ? "chatListening 1.5s infinite" : "none",
              }}
            >
              {isListening ? (
                <div className="flex gap-0.5 items-center">
                  <div className="w-[3px] h-3 bg-white rounded-sm" style={{ animation: "chatSoundWave 0.5s infinite", animationDelay: "0s" }} />
                  <div className="w-[3px] h-[18px] bg-white rounded-sm" style={{ animation: "chatSoundWave 0.5s infinite", animationDelay: "0.1s" }} />
                  <div className="w-[3px] h-3 bg-white rounded-sm" style={{ animation: "chatSoundWave 0.5s infinite", animationDelay: "0.2s" }} />
                </div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              )}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isListening ? "Listening..." : "Type or speak..."}
              disabled={isListening}
              className="flex-1 p-3 px-4 rounded-xl border border-border bg-card text-foreground text-sm outline-none disabled:opacity-50"
            />

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim() || isListening}
              className="px-4 py-3 rounded-xl border-0 font-semibold cursor-pointer transition-all disabled:cursor-not-allowed"
              style={{
                background: input.trim() && !isListening ? "linear-gradient(135deg, #2dd4bf, #14b8a6)" : "#27272a",
                color: input.trim() && !isListening ? "#000" : "#71717a",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}