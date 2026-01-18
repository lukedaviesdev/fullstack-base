import { api } from '~/lib/api'

// Theme types matching backend enums
export type Theme = 'light' | 'dark' | 'system'
export type ColorScheme = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'

export type User = {
  id: number
  name: string
  email: string
  theme: Theme
  colorScheme: ColorScheme
}

type LoginRequest = {
  email: string
  password: string
}

type RegisterRequest = {
  name: string
  email: string
  password: string
}

type AuthResponse = {
  user: User
  token: string
}

type UpdatePreferencesRequest = {
  theme?: Theme
  colorScheme?: ColorScheme
}

export const login = (data: LoginRequest) =>
  api<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const register = (data: RegisterRequest) =>
  api<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const getMe = () =>
  api<{ user: User }>('/auth/me')

export const updatePreferences = (data: UpdatePreferencesRequest) =>
  api<{ user: User }>('/auth/preferences', {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
