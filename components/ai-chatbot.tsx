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

  // Simple pattern matching for offline responses
  const getOfflineResponse = (question: string): string => {
    const q = question.toLowerCase()
    
    // Greetings
    if (q.match(/\b(hi|hello|hey|greetings)\b/)) {
      return "Hey there! I'm Sahil's AI assistant. Feel free to ask me about his experience, skills, education, or projects!"
    }
    
    // Recent/Latest experience
    if (q.match(/\b(recent|latest|current|last|campusx|new)\b/) && q.match(/\b(experience|work|job|role|position)\b/)) {
      return "Sahil's most recent role was Co-Founder & Founding ML Engineer at CampusX (Sep 2025 - Jan 2026) in Los Angeles. He built end-to-end ML pipelines, predictive models, and improved feed conversion by 12% using Python, SQL, and AWS."
    }
    
    // CampusX specific
    if (q.match(/\b(campusx|campus x)\b/)) {
      return "At CampusX (Sep 2025 - Jan 2026), Sahil was Co-Founder & Founding ML Engineer. He built end-to-end ML pipelines and predictive models, improving feed conversion by 12% using Python, SQL, and AWS."
    }
    
    // TCS specific
    if (q.match(/\b(tcs|tata|consultancy)\b/)) {
      return "At Tata Consultancy Services (May 2024 - June 2025), Sahil worked as an AI Engineer. He developed scalable PySpark and SQL pipelines processing 80K+ records and built forecasting models that reduced pipeline failures by 15%."
    }
    
    // RethinkSoft specific
    if (q.match(/\b(rethinksoft|rethink)\b/)) {
      return "At RethinkSoft (May 2023 - July 2023), Sahil was an ML Engineer Intern. He built flight price forecasting models with 98% accuracy and automated EDA pipelines, reducing analysis time by 30%."
    }
    
    // NeuroNexus specific
    if (q.match(/\b(neuronexus|neuro)\b/)) {
      return "At NeuroNexus Innovations (Feb 2023 - Apr 2023), Sahil worked as an ML Intern. He developed student performance prediction systems achieving 87% accuracy using logistic regression, random forest, and XGBoost."
    }
    
    // General experience questions
    if (q.match(/\b(experience|work|job|career|role|position|company|companies)\b/)) {
      return "Sahil has great experience! Most recently, he was Co-Founder & ML Engineer at CampusX where he built ML pipelines and improved feed conversion by 12%. Before that, he was an AI Engineer at TCS, working on PySpark pipelines processing 80K+ records. He also interned at RethinkSoft and NeuroNexus Innovations."
    }
    
    // Skills
    if (q.match(/\b(skill|tech|stack|programming|language|tool|framework|know)\b/)) {
      return "Sahil is skilled in Python, SQL, JavaScript, and TypeScript. For ML/AI, he uses TensorFlow, PyTorch, scikit-learn, and PySpark. For web development, he works with React, Next.js, FastAPI, and Node.js. He's also experienced with AWS, Docker, Git, PostgreSQL, and MongoDB."
    }
    
    // Education
    if (q.match(/\b(education|study|degree|university|college|usc|school|masters|bachelor)\b/)) {
      return "Sahil is currently pursuing his MS in Computer Science at the University of Southern California (USC), specializing in AI/ML. He completed his BE in Computer Science from SRM Institute of Science and Technology."
    }
    
    // Location
    if (q.match(/\b(where|location|based|live|city|from|country)\b/)) {
      return "Sahil is currently based in Los Angeles, CA, where he's pursuing his Master's at USC."
    }
    
    // Contact
    if (q.match(/\b(contact|email|reach|connect|linkedin|github|social|mail)\b/)) {
      return "You can reach Sahil at satasiyasahil14@gmail.com. Connect with him on LinkedIn at linkedin.com/in/sahilsatasiya or check out his projects on GitHub at github.com/sahil1402."
    }
    
    // Projects
    if (q.match(/\b(project|portfolio|built|build|create|made)\b/)) {
      return "Sahil has worked on various ML projects including flight price forecasting with 98% accuracy, student performance prediction systems, and marketplace analytics pipelines. Check out his GitHub at github.com/sahil1402 for more!"
    }
    
    // Who is Sahil / About
    if (q.match(/\b(who|about|tell me|introduce|describe)\b/) && q.match(/\b(sahil|him|he)\b/)) {
      return "Sahil Satasiya is an AI/ML Engineer and MS Computer Science student at USC. He has experience building ML pipelines, predictive models, and data systems at companies like CampusX and TCS. He's passionate about applying ML to solve real-world problems!"
    }
    
    // Internship
    if (q.match(/\b(intern|internship)\b/)) {
      return "Sahil completed two internships: ML Engineer Intern at RethinkSoft (May-July 2023) where he built flight price forecasting models with 98% accuracy, and ML Intern at NeuroNexus Innovations (Feb-Apr 2023) where he worked on student performance prediction achieving 87% accuracy."
    }
    
    // ML/AI specific
    if (q.match(/\b(machine learning|ml|ai|artificial intelligence|deep learning|model)\b/)) {
      return "Sahil specializes in ML/AI! He's built forecasting models, classification systems, and data pipelines. He's skilled in TensorFlow, PyTorch, scikit-learn, and PySpark. His projects include flight price prediction (98% accuracy) and student performance prediction (87% accuracy)."
    }

    // Thank you
    if (q.match(/\b(thank|thanks|thx)\b/)) {
      return "You're welcome! Feel free to ask if you have more questions about Sahil. You can also contact him directly at satasiyasahil14@gmail.com."
    }

    // Bye
    if (q.match(/\b(bye|goodbye|see you|later)\b/)) {
      return "Goodbye! Thanks for learning about Sahil. Feel free to reach out to him at satasiyasahil14@gmail.com or connect on LinkedIn!"
    }
    
    // Default fallback
    return "I can tell you about Sahil's work experience, skills, education, projects, or how to contact him. What would you like to know?"
  }

  const handleSendWithText = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate a small delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 500))

    const responseText = getOfflineResponse(text)
    
    const assistantMessage: Message = {
      role: "assistant",
      content: responseText
    }
    setMessages((prev) => [...prev, assistantMessage])
    speakText(responseText)
    setIsLoading(false)
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