"use client"
import LogoutButton from '@/component/shared/form/LogoutButton'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Welcome = () => {
  const {data:session}= useSession()

  if(!session){
    redirect("/auth/signin")
  }
  return (
    <div className=''>
      {session?.user.email}
      <LogoutButton/>
    </div>
  )
}

export default Welcome
