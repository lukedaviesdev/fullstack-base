import { Navigate, Outlet } from 'react-router'
import { useUser } from '~/hooks/useAuth'

export function ProtectedLayout() {
  const { data: user, isLoading, isError } = useUser()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedLayout
