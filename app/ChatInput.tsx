'use client'
import React, { FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import { Message } from '../typings'
import useSWR from 'swr'
import fetcher from '../utils/fetchMessage'

const ChatInput = () => {
  const [input, setInput] = useState<string>('')
  const { data: messages, error, mutate } = useSWR('api/getMessages', fetcher)

  console.log(messages)

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
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
        'https://images.unsplash.com/photo-1548544099-a89e27f73a84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      email: 'yihsinlan@gmail.com',
    }

    const uploadMessageToUpstash = async () => {
      const data = await fetch('api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json())

      // 將新增的 message 與取得的 messages 一起打回去給 upstash
      return [data.message, ...messages!]
    }
    await mutate(uploadMessageToUpstash, {
      // 在客戶端輸入的 message, 以及已經存在的 messages
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    })
  }

  return (
    <form
      onSubmit={addMessage}
      className="flex fixed bottom-0 z-50 w-full px-10 py-5 space-x-2 border-t border-gray-100 bg-white"
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
