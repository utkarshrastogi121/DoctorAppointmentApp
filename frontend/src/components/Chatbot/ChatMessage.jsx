const ChatMessage = ({ sender, text }) => {
  return (
    <div
      className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
        sender === 'user'
          ? 'bg-blue-600 text-white self-end'
          : 'bg-gray-200 text-black self-start'
      }`}
    >
      {text}
    </div>
  )
}

export default ChatMessage