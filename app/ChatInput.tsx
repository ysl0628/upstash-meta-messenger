'use client'
import React, { FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import { Message } from '../typings'

const ChatInput = () => {
  const [input, setInput] = useState<string>('')

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input) return
    const messageToSend = input
    setInput('')
    const id = v4()
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: 'Renee Lan',
      profilePic:
        'https://images.unsplash.com/photo-1672341105087-33f27340a4c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      email: 'yihsinlan@gmail.com',
    }

    const uploadMessageToUpstash = async () => {
      const res = await fetch('api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()

      console.log('Message :>> ', data)
    }
    uploadMessageToUpstash()
  }

  return (
    <form
      onSubmit={addMessage}
      className="flex bottom-0 z-50 w-full px-10 py-5 space-x-2 border-t border-gray-100"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none 
        focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 
        disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  )
}

export default ChatInput
