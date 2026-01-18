"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Palette } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useTheme, type ColorScheme } from "~/providers/theme-provider"
import { useUser, useUpdatePreferences } from "~/hooks/useAuth"
import type { Theme } from "~/services/auth"

const colorSchemes: { value: ColorScheme; label: string }[] = [
  { value: "slate", label: "Slate" },
  { value: "gray", label: "Gray" },
  { value: "zinc", label: "Zinc" },
  { value: "neutral", label: "Neutral" },
  { value: "stone", label: "Stone" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "amber", label: "Amber" },
  { value: "yellow", label: "Yellow" },
  { value: "lime", label: "Lime" },
  { value: "green", label: "Green" },
  { value: "emerald", label: "Emerald" },
  { value: "teal", label: "Teal" },
  { value: "cyan", label: "Cyan" },
  { value: "sky", label: "Sky" },
  { value: "blue", label: "Blue" },
  { value: "indigo", label: "Indigo" },
  { value: "violet", label: "Violet" },
  { value: "purple", label: "Purple" },
  { value: "fuchsia", label: "Fuchsia" },
  { value: "pink", label: "Pink" },
  { value: "rose", label: "Rose" },
]

export function ThemeToggle() {
  const { setTheme, theme, colorScheme, setColorScheme } = useTheme()
  const { data: userData } = useUser()
  const { mutate: savePreferences } = useUpdatePreferences()

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)

    if (userData?.user) {
      savePreferences({ theme: newTheme })
    }
  }

  const handleColorSchemeChange = (newColorScheme: ColorScheme) => {
    setColorScheme(newColorScheme)

    if (userData?.user) {
      savePreferences({ colorScheme: newColorScheme })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
          {theme === "light" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
          {theme === "dark" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
          {theme === "system" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 h-4 w-4" />
            Color Scheme
            <span className="ml-auto text-xs text-muted-foreground capitalize">
              {colorScheme}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48 max-h-80 overflow-y-auto">
            {colorSchemes.map((scheme) => (
              <DropdownMenuItem
                key={scheme.value}
                onClick={() => handleColorSchemeChange(scheme.value)}
                className="capitalize"
              >
                <div
                  className={`mr-2 h-4 w-4 rounded-full border-2 ${
                    scheme.value === 'red' ? 'bg-red-500' :
                    scheme.value === 'orange' ? 'bg-orange-500' :
                    scheme.value === 'amber' ? 'bg-amber-500' :
                    scheme.value === 'yellow' ? 'bg-yellow-500' :
                    scheme.value === 'lime' ? 'bg-lime-500' :
                    scheme.value === 'green' ? 'bg-green-500' :
                    scheme.value === 'emerald' ? 'bg-emerald-500' :
                    scheme.value === 'teal' ? 'bg-teal-500' :
                    scheme.value === 'cyan' ? 'bg-cyan-500' :
                    scheme.value === 'sky' ? 'bg-sky-500' :
                    scheme.value === 'blue' ? 'bg-blue-500' :
                    scheme.value === 'indigo' ? 'bg-indigo-500' :
                    scheme.value === 'violet' ? 'bg-violet-500' :
                    scheme.value === 'purple' ? 'bg-purple-500' :
                    scheme.value === 'fuchsia' ? 'bg-fuchsia-500' :
                    scheme.value === 'pink' ? 'bg-pink-500' :
                    scheme.value === 'rose' ? 'bg-rose-500' :
                    'bg-slate-500'
                  }`}
                />
                {scheme.label}
                {colorScheme === scheme.value && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
