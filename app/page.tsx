import { unstable_getServerSession } from 'next-auth'
import React from 'react'
import { Message } from '../typings'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import Providers from './providers'

const HomePage = async () => {
  // implement SSR
  const data = await fetch(
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`
  ).then((res) => res.json())

  const messages: Message[] = data.messages
  const session = await unstable_getServerSession()

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  )
}

export default HomePage
