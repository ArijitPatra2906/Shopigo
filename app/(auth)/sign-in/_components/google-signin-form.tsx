'use client'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'

export function GoogleSignInForm() {
  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button
        disabled={pending}
        className='w-full flex items-center gap-2'
        variant='outline'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 48 48'
          width='24'
          height='24'
        >
          <path
            fill='#4285F4'
            d='M24 9.5c3.18 0 6.05 1.16 8.3 3.1l6.17-6.17C34.93 3.26 29.67 1 24 1 14.73 1 6.8 6.3 2.97 14.04l7.2 5.6c1.86-5.58 7.16-10.14 13.83-10.14Z'
          />
          <path
            fill='#34A853'
            d='M46.58 24.48c0-1.47-.13-2.9-.38-4.28H24v8.56h12.8c-.54 2.8-2.08 5.19-4.45 6.84l7.18 5.57c4.19-3.88 6.95-9.61 6.95-16.69Z'
          />
          <path
            fill='#FBBC05'
            d='M10.17 28.35c-.47-1.4-.72-2.89-.72-4.35s.25-2.95.72-4.35l-7.2-5.6C.94 16.02 0 19.9 0 24s.94 7.98 2.97 11.94l7.2-5.6Z'
          />
          <path
            fill='#EA4335'
            d='M24 48c6.48 0 11.91-2.14 15.88-5.82l-7.18-5.57c-2.06 1.37-4.66 2.19-7.7 2.19-6.67 0-11.97-4.56-13.83-10.14l-7.2 5.6C6.8 41.7 14.73 48 24 48Z'
          />
        </svg>
        {pending ? 'Redirecting to Google...' : 'Sign In with Google'}
      </Button>
    )
  }
  return (
    <form action={SignInWithGoogle}>
      <SignInButton />
    </form>
  )
}
