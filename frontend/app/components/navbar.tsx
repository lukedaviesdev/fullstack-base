import { Link } from "react-router"
import { Layers } from "lucide-react"
import { Button } from "~/components/ui/button"
import { ThemeToggle } from "~/components/theme-toggle"
import { useQueryClient } from "@tanstack/react-query"
import { useLogout, useUser } from "~/hooks/useAuth"

export function Navbar() {
  const { data: user } = useUser();
  const logout = useLogout()
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Fullstack Base
            </span>
          </Link>

          {/* Theme Toggle & Auth Links */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-foreground">{user.user.name}</span>
                <Button variant="outline"  onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
