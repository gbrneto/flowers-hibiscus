"use client"

export function ScrollingMarqueeDark() {
  const messages = ["Garanzia di Crescita", "Pagamento sicuro", "Spedizione tracciata"]

  // Duplicate messages for seamless loop
  const allMessages = [...messages, ...messages, ...messages, ...messages]

  return (
    <div className="bg-black text-white py-2 overflow-hidden">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {allMessages.map((message, index) => (
          <span key={index} className="inline-flex items-center px-8 text-sm font-medium">
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}
