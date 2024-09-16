interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-center mt-20">{children}</div>
  )
}

export default AuthLayout
