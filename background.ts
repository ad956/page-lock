import { Storage } from "@plasmohq/storage"

import { secureGet } from "~utils/crypto"
import { normalizeUrl } from "~utils/normalizeUrl"

const storage = new Storage()

// Check if the session is valid
const isSessionValid = async () => {
  const sessionData = await storage.get("passwordSession")
  if (!sessionData) return false

  const { timestamp } = JSON.parse(sessionData)
  // Session expires after browser restart or 1 hour
  const isValid = Date.now() - timestamp < 1 * 60 * 60 * 1000
  if (!isValid) {
    await storage.remove("passwordSession")
  }
  return isValid
}

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const blockedSites = (await secureGet("blockedSites")) || []
  const url = new URL(details.url)
  const normalizedCurrentUrl = normalizeUrl(url.hostname)

  // Check if any blocked site matches the normalized URL
  const isBlocked = blockedSites.some((site) => {
    const normalizedBlockedSite = normalizeUrl(site)
    return (
      normalizedCurrentUrl === normalizedBlockedSite ||
      normalizedCurrentUrl.endsWith(`.${normalizedBlockedSite}`)
    )
  })

  if (isBlocked) {
    const hasValidSession = await isSessionValid()
    if (!hasValidSession) {
      const encodedUrl = encodeURIComponent(details.url)
      chrome.tabs.update(details.tabId, {
        url: `${chrome.runtime.getURL("tabs/password.html")}?returnUrl=${encodedUrl}`
      })
    }
  }
})

chrome.runtime.onStartup.addListener(async () => {
  await storage.remove("passwordSession")
})

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})
