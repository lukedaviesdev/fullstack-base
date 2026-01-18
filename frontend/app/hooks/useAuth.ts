import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { login, register, getMe, updatePreferences, type User, type Theme, type ColorScheme } from '~/services/auth'

// Hook to get current user
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    retry: false,  // Don't retry if unauthorized
  })
}

// Hook for login
export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('token', data.token)
      // Update user cache
      queryClient.setQueryData(['user'], { user: data.user })
      // Redirect to home/dashboard
      navigate('/')
    },
  })
}

// Hook for register
export function useRegister() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      queryClient.setQueryData(['user'], { user: data.user })
      navigate('/')
    },
  })
}

// Hook for logout
export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return () => {
    localStorage.removeItem('token')
    queryClient.setQueryData(['user'], null)
    queryClient.clear()
    navigate('/login')
  }
}

// Hook for updating preferences
export function useUpdatePreferences() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePreferences,
    onSuccess: (data) => {
      // Update user cache with new preferences
      queryClient.setQueryData(['user'], { user: data.user })
    },
  })
}
