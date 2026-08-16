import { AuthLayout } from '@moontotems/ui'
import { Link, createFileRoute } from '@tanstack/react-router'

import { ASSETS } from '~/lib/constant'

import { AuthLogo } from '../-components/AuthLogo'
import { UserAuthFormLogin } from './-components/UserAuthForm'

const LoginPage = () => {
  return (
    <AuthLayout
      imageSrc={ASSETS.auth.background}
      logo={<AuthLogo />}
      topRightAction={
        <Link
          to="/auth/register"
          className="text-muted-foreground text-sm font-medium hover:text-foreground hover:underline"
        >
          Sign up
        </Link>
      }
      quote={{
        text: 'The best way to predict the future is to create it.',
        author: 'Peter Drucker',
      }}
      footer={
        <>
          By signing in, you agree to our{' '}
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
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-muted-foreground text-sm">Welcome back. Enter your email to continue.</p>
      </div>

      <UserAuthFormLogin />

      <div className="text-muted-foreground mt-10 text-sm">
        Don&rsquo;t have an account?{' '}
        <Link to="/auth/register" className="text-primary font-medium hover:underline">
          Create one
        </Link>
      </div>
    </AuthLayout>
  )
}

export const Route = createFileRoute('/auth/login/')({
  component: LoginPage,
  loader: ({ context }) => {
    return { user: context.user }
  },
})
