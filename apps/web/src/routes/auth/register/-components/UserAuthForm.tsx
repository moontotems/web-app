import { Button, Input, Label, cn } from '@moontotems/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { ArrowRight, Github, LoaderCircle } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

import { loginFn, oauthFn, verifyCodeFn } from '~/lib/auth/server'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

const oauthButtonClass =
  'h-10 w-full rounded-md border border-transparent bg-card text-foreground shadow-sm shadow-black/5 ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-muted/60 dark:ring-foreground/15 dark:hover:bg-muted/60'

const inputClass =
  'h-10 rounded-md border border-transparent bg-white text-base shadow-sm ring-1 ring-foreground/10 transition-[color,box-shadow] placeholder:text-muted-foreground/75 focus-visible:border-foreground/30 focus-visible:ring-[3px] focus-visible:ring-ring/25 dark:bg-foreground/5 dark:focus-visible:border-foreground/25'

const submitButtonClass =
  'h-10 w-full rounded-md border-[0.5px] border-white/10 bg-primary text-primary-foreground shadow-md shadow-black/15 ring-1 ring-[var(--ring-color)] [--ring-color:color-mix(in_oklab,black_15%,var(--color-primary))] hover:bg-primary/90 dark:border-transparent dark:[--ring-color:color-mix(in_oklab,white_15%,var(--color-primary))] [&_svg]:drop-shadow-sm'

export function UserAuthFormRegister({ className, ...props }: UserAuthFormProps) {
  const [email, setEmail] = React.useState<string>('')
  const [verificationCode, setVerificationCode] = React.useState<string>('')
  const [isEmailSent, setIsEmailSent] = React.useState<boolean>(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const emailSignup = useMutation({
    mutationFn: async (variables: { email: string }) => {
      return await loginFn({ data: variables })
    },
    onSuccess: () => {
      setIsEmailSent(true)
      toast.success('Registration verification code sent to your email')
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message}`)
    },
  })

  const verifyCodeMutation = useMutation({
    mutationFn: async (variables: { email: string; code: string }) => {
      return await verifyCodeFn({ data: variables })
    },
    onSuccess: async () => {
      toast.success('Registration successful')
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      router.navigate({ to: '/' })
    },
    onError: (error) => {
      toast.error(`Verification failed: ${error.message}`)
    },
  })

  const githubSignIn = useMutation({
    mutationFn: async (variables: { provider: 'github' }) => {
      return await oauthFn({ data: variables })
    },
    onError: (error) => {
      toast.error(`GitHub sign-in failed: ${error.message}`)
    },
  })

  const isLoading = emailSignup.isPending || githubSignIn.isPending || verifyCodeMutation.isPending

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    emailSignup.mutate({ email })
  }

  async function onVerifyCode(event: React.SyntheticEvent) {
    event.preventDefault()
    verifyCodeMutation.mutate({ email, code: verificationCode })
  }

  return (
    <div className={cn('space-y-6', className)} {...props}>
      {!isEmailSent ? (
        <>
          <Button
            type="button"
            variant="outline"
            className={oauthButtonClass}
            disabled={isLoading}
            onClick={() => githubSignIn.mutate({ provider: 'github' })}
          >
            {githubSignIn.isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Github className="size-4" />
            )}
            Sign up with GitHub
          </Button>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="border-card h-px border-b bg-border" />
            <div className="text-muted-foreground text-center text-xs uppercase tracking-wide">
              or continue with
            </div>
            <div className="border-card h-px border-b bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="block">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <Button disabled={isLoading} type="submit" className={submitButtonClass}>
              {emailSignup.isPending && <LoaderCircle className="size-4 animate-spin" />}
              Create account
            </Button>
          </form>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
            <p>
              We sent a verification code to <span className="font-medium">{email}</span>.
            </p>
            <a href="http://localhost:54424/" target="_blank" rel="noreferrer">
              <Button size="sm" variant="ghost" className="w-full">
                Open local email client <ArrowRight className="ml-2 size-4" />
              </Button>
            </a>
          </div>

          <form onSubmit={onVerifyCode} className="space-y-5">
            <div className="space-y-2.5">
              <Label htmlFor="verificationCode" className="block">
                Verification code
              </Label>
              <Input
                id="verificationCode"
                placeholder="Enter the code from your email"
                type="text"
                inputMode="numeric"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <Button disabled={isLoading} type="submit" className={submitButtonClass}>
              {verifyCodeMutation.isPending && <LoaderCircle className="size-4 animate-spin" />}
              Verify and continue
            </Button>
          </form>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsEmailSent(false)}
            className="w-full"
          >
            Use a different email
          </Button>
        </>
      )}
    </div>
  )
}
