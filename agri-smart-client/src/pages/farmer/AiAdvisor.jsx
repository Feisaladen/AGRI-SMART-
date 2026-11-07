import { useState, useRef, useEffect } from 'react'
import axios from '../../api/axios'
import FarmerSidebar from '../../components/FarmerSidebar'
import Topbar from '../../components/Topbar'
import { Sparkles } from '../../components/Icons'

const STARTER_QUESTIONS = [
  'Nitauzaje nyanya zangu kwa bei nzuri?',
  'How should I price my maize this season?',
  'Nitapangaje bajeti ya shamba langu?',
]

const AiAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Habari! Mimi ni mshauri wako wa kilimo. Niulize kuhusu bei za mazao au usimamizi wa fedha!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text = input) => {
    const userMessage = text.trim()
    if (!userMessage || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      setLoading(true)
      const response = await axios.post('/api/ai/chat', { message: userMessage })
      setMessages(prev => [...prev, { role: 'ai', content: response.data.reply }])
    } catch (error) {
      console.log(error)
      setMessages(prev => [...prev, { role: 'ai', content: 'Samahani, kuna tatizo. Jaribu tena.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <FarmerSidebar />
      <div className="flex flex-1 flex-col">
        <Topbar title="AI Advisor" />
        <main className="flex flex-1 flex-col overflow-hidden px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto flex h-full w-full max-w-4xl flex-col">
            <div className="rounded-t-2xl bg-white px-6 py-4 shadow-sm">
              <h1 className="flex items-center gap-2 text-xl font-semibold text-stone-900"><Sparkles className="h-5 w-5 text-gold-500" /> AI Advisor</h1>
              <p className="mt-1 text-sm text-stone-500">Your personal farming assistant</p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-white px-4 py-4 sm:px-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex animate-rise ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                      msg.role === 'user'
                        ? 'bg-leaf-700 text-white'
                        : 'bg-stone-100 text-stone-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {STARTER_QUESTIONS.map((question, index) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => handleSend(question)}
                      style={{ animationDelay: `${index * 90}ms` }}
                      className="animate-rise rounded-full border border-leaf-200 bg-leaf-50 px-4 py-2 text-left text-sm text-leaf-800 hover:bg-leaf-100"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex animate-rise justify-start">
                  <div className="max-w-[88%] rounded-2xl bg-stone-100 px-4 py-3 sm:max-w-[75%]">
                    <div className="flex h-5 items-center gap-1" role="status" aria-label="AI is thinking">
                      {[0, 150, 300].map((delay) => (
                        <span key={delay} style={{ animationDelay: `${delay}ms` }} className="h-2 w-2 animate-dot rounded-full bg-leaf-500" />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="rounded-b-2xl bg-white px-4 py-4 shadow-sm sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Uliza swali..."
                  disabled={loading}
                  className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-leaf-500 focus:bg-white disabled:bg-stone-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-leaf-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-leaf-800 disabled:bg-leaf-300 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AiAdvisor
