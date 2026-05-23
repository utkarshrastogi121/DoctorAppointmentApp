import { useState } from 'react'

const ChatInput = ({ onSend, loading }) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (!message.trim()) return

    onSend(message)
    setMessage('')
  }

  return (
    <div className="p-3 border-t flex gap-2 bg-white">
      <input
        type="text"
        placeholder="Ask your health question..."
        value={message}
        disabled={loading}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend()
          }
        }}
        className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl transition-all"
      >
        Send
      </button>
    </div>
  )
}

export default ChatInput