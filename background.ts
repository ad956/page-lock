chrome.webNavigation.onBeforeNavigate.addListener(
  async (details) => {
    const blockedSites = ["facebook.com"]
    const url = new URL(details.url)

    if (blockedSites.some((site) => url.hostname.includes(site))) {
      try {
        const { siteLockPassword } =
          await chrome.storage.local.get("siteLockPassword")

        if (!siteLockPassword) {
          // Redirect to password page if no password is set
          chrome.tabs.update(details.tabId, {
            url: chrome.runtime.getURL("password.html")
          })
        }
      } catch (error) {
        console.error("Error getting password from storage:", error)
      }
    }
  },
  { url: [{ hostContains: "facebook.com" }] }
)
