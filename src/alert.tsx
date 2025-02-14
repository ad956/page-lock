import { AlertCircle, CheckCircle2, X } from "lucide-react"
import { useEffect, useState } from "react"

interface AlertProps {
  message: string
  type: "error" | "success"
  isVisible: boolean
  onClose: () => void
}

export const Alert = ({ message, type, isVisible, onClose }: AlertProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`transform transition-all duration-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
        <div
          className={`flex items-center space-x-3 p-4 rounded-lg shadow-lg border ${
            type === "error"
              ? "bg-red-900/90 border-red-500/50 text-red-100"
              : "bg-green-900/90 border-green-500/50 text-green-100"
          }`}>
          {type === "error" ? (
            <AlertCircle className="w-5 h-5 text-red-300" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-green-300" />
          )}
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-${type === "error" ? "red" : "green"}-800 transition-colors duration-200`}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
