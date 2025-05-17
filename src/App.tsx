// src/App.tsx
import React, { useState, useEffect } from 'react'
import Auth from './components/Auth'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import './index.css'

const queryClient = new QueryClient()

const App: React.FC = () => {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('auth') === 'ok') {
      setAuthed(true)
    }
  }, [])

  if (!authed) {
    return (
      <Auth
        onLogin={() => {
          sessionStorage.setItem('auth', 'ok')
          setAuthed(true)
        }}
      />
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* El Header sólo se monta aquí, una única vez */}
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
