import { useEffect, useState } from "react"

import "./style.css"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

const Options = () => {
  const [newPassword, setNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [resetPassword, setResetPassword] = useState("")
  const [blockedSite, setBlockedSite] = useState("")
  const [blockedSites, setBlockedSites] = useState<string[]>([])

  useEffect(() => {
    loadBlockedSites()
  }, [])

  const loadBlockedSites = async () => {
    const sites = (await storage.get<string[]>("blockedSites")) || []
    setBlockedSites(sites)
  }

  const handleSetPassword = async () => {
    if (!newPassword) {
      alert("Please enter a password")
      return
    }
    await storage.set("siteLockPassword", newPassword)
    setNewPassword("")
    alert("Password Saved!")
  }

  const handleResetPassword = async () => {
    const currentPassword = await storage.get<string>("siteLockPassword")
    if (oldPassword === currentPassword) {
      await storage.set("siteLockPassword", resetPassword)
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
    const sites = (await storage.get<string[]>("blockedSites")) || []
    if (!sites.includes(blockedSite)) {
      const updatedSites = [...sites, blockedSite]
      await storage.set("blockedSites", updatedSites)
      setBlockedSites(updatedSites)
      setBlockedSite("")
    }
  }

  const handleRemoveSite = async (siteToRemove: string) => {
    const updatedSites = blockedSites.filter((site) => site !== siteToRemove)
    await storage.set("blockedSites", updatedSites)
    setBlockedSites(updatedSites)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Page Lock Settings</h1>

      <div className="space-y-6">
        {/* Password Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Set Lock Password</h2>
          <div className="space-y-2">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleSetPassword}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Save Password
            </button>
          </div>
        </section>

        {/* Reset Password Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Reset Password</h2>
          <div className="space-y-2">
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter Old Password"
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              placeholder="Enter New Password"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Reset Password
            </button>
          </div>
        </section>

        {/* Blocked Sites Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Blocked Websites</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={blockedSite}
              onChange={(e) => setBlockedSite(e.target.value)}
              placeholder="Enter Site URL"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAddSite}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Add Site
            </button>
          </div>
          <ul className="space-y-2">
            {blockedSites.map((site) => (
              <li
                key={site}
                className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{site}</span>
                <button
                  onClick={() => handleRemoveSite(site)}
                  className="text-red-500 hover:text-red-600">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Options
