import React from 'react'
import Image from 'next/image'
import { getProviders } from 'next-auth/react'
import SignInComponent from './SignInComponent'

// SSR
const SignInPage = async () => {
  const providers = await getProviders()
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="https://links.papareact.com/161"
          alt="Profile Picture"
        />
      </div>

      <SignInComponent providers={providers} />
    </div>
  )
}

export default SignInPage
