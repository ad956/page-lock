import { useState } from "react"

function IndexPopup() {
  const [password, setPassword] = useState("")

  const savePassword = () => {
    chrome.storage.local.set({ siteLockPassword: password })
    alert("Password Saved")
  }

  return (
    <div>
      <h2>Set Lock Password</h2>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={savePassword}>Save Password</button>
    </div>
  )
}

export default IndexPopup
