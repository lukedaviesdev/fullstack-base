"use client"

import { useEffect } from "react"
import { useUser } from "~/hooks/useAuth"
import { useTheme } from "~/providers/theme-provider"

/**
 * Syncs user's saved theme preferences to the theme context
 * when they log in or when user data changes.
 */
export function ThemeSync() {
  const { data: userData } = useUser()
  const { setTheme, setColorScheme, theme, colorScheme } = useTheme()

  useEffect(() => {
    if (userData?.user) {
      // Only update if different from current to avoid loops
      if (userData.user.theme !== theme) {
        setTheme(userData.user.theme)
      }
      if (userData.user.colorScheme !== colorScheme) {
        setColorScheme(userData.user.colorScheme)
      }
    }
  }, [userData?.user?.theme, userData?.user?.colorScheme])

  // This component doesn't render anything
  return null
}
