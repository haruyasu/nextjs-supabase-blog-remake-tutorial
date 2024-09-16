interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  return <div className="mx-auto max-w-screen-lg px-2 my-10">{children}</div>
}

export default MainLayout
