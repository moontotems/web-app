import { AuthLayout } from '@moontotems/ui'
import { Link, createFileRoute } from '@tanstack/react-router'

import { AuthLogo } from '../-components/AuthLogo'
import { UserAuthFormRegister } from './-components/UserAuthForm'

const RegisterPage = () => {
  return (
    <AuthLayout
      imageSrc="/auth.webp"
      logo={<AuthLogo />}
      topRightAction={
        <Link
          to="/auth/login"
          className="text-muted-foreground text-sm font-medium hover:text-foreground hover:underline"
        >
          Sign in
        </Link>
      }
      quote={{
        text: 'Let the games begin.',
        author: 'Bot No. 1',
      }}
      footer={
        <>
          By signing up, you agree to our{' '}
          <a href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </a>
        </>
      }
    >
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="text-muted-foreground text-sm">Enter your details to get started.</p>
      </div>

      <UserAuthFormRegister />

      <div className="text-muted-foreground mt-10 text-sm">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  )
}

export const Route = createFileRoute('/auth/register/')({
  component: RegisterPage,
  loader: ({ context }) => {
    return { user: context.user }
  },
})
