import { Key, Lock, Shield } from "lucide-react"
import { useState } from "react"

import "../style.css"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

const PasswordPage = () => {
  const [password, setPassword] = useState("")
  const [shake, setShake] = useState(false)

  const handleSubmit = async () => {
    const storedPassword = await storage.get<string>("siteLockPassword")

    if (password === storedPassword) {
      // Close the tab and return to original URL
      window.close()
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      alert("Incorrect password!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div
        className={`max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-2xl border border-purple-500/20 backdrop-blur-sm transform transition-all duration-300 hover:shadow-purple-500/5 ${
          shake ? "animate-shake" : ""
        }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-purple-500/10 rounded-full ring-1 ring-purple-500/20">
            <Lock className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Enter Password to Continue
          </h2>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter Password"
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 text-white border border-purple-500/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transform transition-all duration-200 hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20">
            <Shield className="w-5 h-5" />
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasswordPage
