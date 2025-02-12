import { useState } from "react"

import "../style.css"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

const PasswordPage = () => {
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    const storedPassword = await storage.get<string>("siteLockPassword")

    if (password === storedPassword) {
      // Close the tab and return to original URL
      window.close()
    } else {
      alert("Incorrect password!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">
          Enter Password to Continue
        </h2>
        <div className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasswordPage
