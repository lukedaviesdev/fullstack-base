"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"
type ColorScheme = "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultColorScheme?: ColorScheme
  storageKey?: string
  colorSchemeStorageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  colorScheme: ColorScheme
  setTheme: (theme: Theme) => void
  setColorScheme: (colorScheme: ColorScheme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  colorScheme: "slate",
  setTheme: () => null,
  setColorScheme: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColorScheme = "slate",
  storageKey = "ui-theme",
  colorSchemeStorageKey = "ui-color-scheme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(defaultColorScheme)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem(storageKey) as Theme
    const storedColorScheme = localStorage.getItem(colorSchemeStorageKey) as ColorScheme
    if (storedTheme) {
      setTheme(storedTheme)
    }
    if (storedColorScheme) {
      setColorScheme(storedColorScheme)
    }
  }, [storageKey, colorSchemeStorageKey])

  React.useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove("light", "dark")

    // Remove all color scheme classes
    const colorSchemes = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
    colorSchemes.forEach(scheme => root.classList.remove(scheme))

    // Add current color scheme
    root.classList.add(colorScheme)

    // Add theme class
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, colorScheme, mounted])

  const value = {
    theme,
    colorScheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    setColorScheme: (colorScheme: ColorScheme) => {
      localStorage.setItem(colorSchemeStorageKey, colorScheme)
      setColorScheme(colorScheme)
    },
  }

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

export type { Theme, ColorScheme }
