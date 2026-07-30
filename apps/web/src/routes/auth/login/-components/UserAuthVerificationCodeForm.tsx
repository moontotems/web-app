import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@moontotems/ui'
import { verifyCodeFn } from '~/lib/auth/server'

const formSchema = z.object({
  code: z.string().min(1, {
    message: 'Verification code is required',
  }),
})

interface UserAuthVerificationCodeFormProps {
  email: string
  onBack?: () => void
}

export function UserAuthVerificationCodeForm({ email, onBack }: UserAuthVerificationCodeFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await verifyCodeFn({
        data: { email, code: values.code },
      })

      toast.success('Success!', {
        description: 'You have successfully logged in.',
      })

      await queryClient.invalidateQueries({ queryKey: ['user'] })
      router.navigate({ to: '/' })
    } catch (error) {
      toast.error('Error', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Verification Code</h1>
          <p className="text-sm text-muted-foreground">
            Please enter the verification code sent to {email}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your verification code"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              {onBack && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={isLoading}
                  className="w-full"
                >
                  Back
                </Button>
              )}
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
