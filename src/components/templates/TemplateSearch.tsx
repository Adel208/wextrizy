'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface TemplateSearchProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export default function TemplateSearch({ 
  onSearch, 
  placeholder = "Rechercher des templates..." 
}: TemplateSearchProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch?.('')
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 transition-colors duration-200 ${
            isFocused ? 'text-blue-400' : 'text-white/40'
          }`} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 ${
            isFocused ? 'bg-white/15 border-white/30' : ''
          }`}
        />
        
        {query && (
          <motion.button
            type="button"
            onClick={clearSearch}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <div className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200">
              <X className="h-4 w-4 text-white/60 hover:text-white" />
            </div>
          </motion.button>
        )}
      </div>
      
      {/* Search suggestions */}
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 z-10"
        >
          <div className="space-y-3">
            <div className="text-sm font-medium text-white/60 mb-2">
              Suggestions populaires
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['E-commerce', 'Portfolio', 'Blog', 'Landing Page', 'Dashboard', 'Application'].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion)
                    onSearch?.(suggestion)
                  }}
                  className="text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.form>
  )
}
