import { Globe, Key, Lock, Plus, RefreshCw, Save, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

import { secureGet, secureStore } from "~utils/crypto"

import "./style.css"

import { normalizeUrl } from "~utils/normalizeUrl"

const Options = () => {
  const [hasPassword, setHasPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [resetPassword, setResetPassword] = useState("")
  const [blockedSite, setBlockedSite] = useState("")
  const [blockedSites, setBlockedSites] = useState<string[]>([])

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    const existingPassword = await secureGet("siteLockPassword")
    setHasPassword(!!existingPassword)
    const sites = (await secureGet("blockedSites")) || []
    setBlockedSites(sites)
  }

  const handleSetPassword = async () => {
    if (!newPassword) {
      alert("Please enter a password")
      return
    }
    await secureStore("siteLockPassword", newPassword)
    setHasPassword(true)
    setNewPassword("")
    alert("Password Saved!")
  }

  const handleResetPassword = async () => {
    const currentPassword = await secureGet("siteLockPassword")
    if (oldPassword === currentPassword) {
      await secureStore("siteLockPassword", resetPassword)
      setOldPassword("")
      setResetPassword("")
      alert("Password Reset Successfully!")
    } else {
      alert("Incorrect Old Password!")
    }
  }

  const handleAddSite = async () => {
    if (!blockedSite) {
      alert("Please enter a site URL")
      return
    }

    // Normalize the URL before saving
    const normalizedUrl = normalizeUrl(blockedSite)

    // Check if site is already blocked
    const exists = blockedSites.some(
      (site) => normalizeUrl(site) === normalizedUrl
    )

    if (!exists) {
      const updatedSites = [...blockedSites, normalizedUrl]
      await secureStore("blockedSites", updatedSites)
      setBlockedSites(updatedSites)
      setBlockedSite("")
    } else {
      alert("This site is already blocked!")
    }
  }

  const handleRemoveSite = async (siteToRemove: string) => {
    const updatedSites = blockedSites.filter((site) => site !== siteToRemove)
    await secureStore("blockedSites", updatedSites)
    setBlockedSites(updatedSites)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 border border-purple-500/20">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-purple-500/10 rounded-full ring-1 ring-purple-500/20">
            <Lock className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Page Lock Settings</h1>
        </div>

        <div className="space-y-8">
          {!hasPassword ? (
            <section className="space-y-4 transform transition-all duration-300 hover:scale-[1.01]">
              <h2 className="text-xl font-semibold flex items-center space-x-2 text-white">
                <Key className="w-5 h-5 text-purple-400" />
                <span>Set Lock Password</span>
              </h2>
              <div className="space-y-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full p-3 bg-gray-900/50 text-white border border-purple-500/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                />
                <button
                  onClick={handleSetPassword}
                  className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20">
                  <Save className="w-5 h-5" />
                  <span>Save Password</span>
                </button>
              </div>
            </section>
          ) : (
            <section className="space-y-4 transform transition-all duration-300 hover:scale-[1.01]">
              <h2 className="text-xl font-semibold flex items-center space-x-2 text-white">
                <RefreshCw className="w-5 h-5 text-purple-400" />
                <span>Reset Password</span>
              </h2>
              <div className="space-y-3">
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter Old Password"
                  className="w-full p-3 bg-gray-900/50 text-white border border-purple-500/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                />
                <input
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full p-3 bg-gray-900/50 text-white border border-purple-500/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20">
                  <Key className="w-5 h-5" />
                  <span>Reset Password</span>
                </button>
              </div>
            </section>
          )}

          <section className="space-y-4 transform transition-all duration-300 hover:scale-[1.01]">
            <h2 className="text-xl font-semibold flex items-center space-x-2 text-white">
              <Globe className="w-5 h-5 text-purple-400" />
              <span>Blocked Websites</span>
            </h2>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={blockedSite}
                  onChange={(e) => setBlockedSite(e.target.value)}
                  placeholder="Enter Site URL"
                  className="flex-1 p-3 bg-gray-900/50 text-white border border-purple-500/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                />
                <button
                  onClick={handleAddSite}
                  className="px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {blockedSites.map((site) => (
                  <li
                    key={site}
                    className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg group hover:bg-gray-900 transition-all duration-200 border border-purple-500/10">
                    <span className="flex items-center space-x-2 text-white">
                      <Globe className="w-4 h-4 text-purple-400" />
                      <span>{site}</span>
                    </span>
                    <button
                      onClick={() => handleRemoveSite(site)}
                      className="text-red-400 hover:text-red-300 p-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Options
