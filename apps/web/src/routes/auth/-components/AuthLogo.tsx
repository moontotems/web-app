import { Link } from '@tanstack/react-router'

export const AuthLogo = () => {
  return (
    <Link to="/" aria-label="Go home" className="flex items-center gap-2">
      <svg
        className="h-6 w-6 text-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-labelledby="auth-logo-title"
      >
        <title id="auth-logo-title">Boilerplate logo</title>
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
      </svg>
      <span className="text-base font-semibold tracking-tight">Boilerplate</span>
    </Link>
  )
}
