import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { unstable_getServerSession } from 'next-auth'

const Header = async () => {
  const session = await unstable_getServerSession()

  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            height={10}
            width={50}
            src={session.user?.image!}
            alt="Profile Picture"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>

        <LogoutButton />
      </header>
    )
  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          {/* 为了提高可访问性 "alt" 属性是必须的 */}
          {/* 图片可以使用放在 `app/` 目录下 */}
          {/* 使用第三方的圖片，並且想要用 <Image /> 優化圖片檔案，就要在 next.config.js 中設定 domain */}
          <Image
            src="https://links.papareact.com/jne"
            height={10}
            width={50}
            alt="logo"
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>

        <Link
          href="/auth/signIn"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  )
}

export default Header
