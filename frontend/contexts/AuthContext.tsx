'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authenticateUser, registerUser, MockUser, isAdmin } from '@/lib/mockUsers'

interface User {
    id: string
    name: string
    email: string
    avatar?: string
    isSeller: boolean
    isReviewer: boolean
    reviewerStatus?: 'pending' | 'approved' | 'rejected'
    isAdmin: boolean
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => boolean
    loginWithGoogle: () => void
    register: (email: string, password: string, name: string) => boolean
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('trustmart_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (email: string, password: string): boolean => {
        const authenticatedUser = authenticateUser(email, password)
        
        if (authenticatedUser) {
            const user: User = {
                id: authenticatedUser.id,
                name: authenticatedUser.name,
                email: authenticatedUser.email,
                avatar: authenticatedUser.avatar,
                isSeller: authenticatedUser.isSeller,
                isReviewer: authenticatedUser.isReviewer,
                reviewerStatus: authenticatedUser.reviewerStatus,
                isAdmin: isAdmin(authenticatedUser.email)
            }
            
            setUser(user)
            localStorage.setItem('trustmart_user', JSON.stringify(user))
            
            // Redirect to home or previous page
            router.push('/')
            
            return true
        }
        
        return false
    }

    const loginWithGoogle = () => {
        // Mock Google login - in production, use NextAuth or Firebase
        const mockGoogleUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: 'Google User',
            email: 'google.user@gmail.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
            isSeller: false,
            isReviewer: false,
            isAdmin: false
        }
        
        setUser(mockGoogleUser)
        localStorage.setItem('trustmart_user', JSON.stringify(mockGoogleUser))
        router.push('/')
    }

    const register = (email: string, password: string, name: string): boolean => {
        try {
            const newUser = registerUser(email, password, name)
            
            const user: User = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar,
                isSeller: false,
                isReviewer: false,
                isAdmin: false
            }
            
            setUser(user)
            localStorage.setItem('trustmart_user', JSON.stringify(user))
            
            // Redirect to home
            router.push('/')
            
            return true
        } catch (error) {
            return false
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('trustmart_user')
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
