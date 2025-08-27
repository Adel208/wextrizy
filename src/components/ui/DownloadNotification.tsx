'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, CheckCircle, X, AlertCircle, ExternalLink } from 'lucide-react'

interface DownloadNotificationProps {
  isVisible: boolean
  onClose: () => void
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  downloadUrl?: string
  templateName?: string
}

export default function DownloadNotification({
  isVisible,
  onClose,
  type,
  title,
  message,
  downloadUrl,
  templateName
}: DownloadNotificationProps) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isVisible) {
      // Auto-close après 10 secondes
      const timer = setTimeout(() => {
        handleClose()
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-400" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-400" />
      case 'info':
        return <Download className="h-6 w-6 text-blue-400" />
      default:
        return <Download className="h-6 w-6 text-blue-400" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30'
      case 'error':
        return 'from-red-500/20 to-pink-500/20 border-red-500/30'
      case 'info':
        return 'from-blue-500/20 to-purple-500/20 border-blue-500/30'
      default:
        return 'from-blue-500/20 to-purple-500/20 border-blue-500/30'
    }
  }

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
  }

  return (
    <AnimatePresence>
      {isVisible && !isClosing && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed top-24 right-6 z-50 max-w-md w-full bg-gradient-to-r ${getBackgroundColor()} backdrop-blur-sm rounded-2xl border p-6 shadow-2xl`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getIcon()}
              <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                {templateName && (
                  <p className="text-sm text-white/60">{templateName}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Message */}
          <p className="text-white/80 mb-4 leading-relaxed">{message}</p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            {downloadUrl && (
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
                <ExternalLink className="h-4 w-4" />
              </motion.button>
            )}
            
            <button
              onClick={handleClose}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Fermer
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 10, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
