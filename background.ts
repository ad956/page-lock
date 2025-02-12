import { Storage } from "@plasmohq/storage"

const storage = new Storage()

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const blockedSites = (await storage.get<string[]>("blockedSites")) || []
  const url = new URL(details.url)

  if (blockedSites.some((site) => url.hostname.includes(site))) {
    const siteLockPassword = await storage.get<string>("siteLockPassword")

    if (!siteLockPassword) {
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("tabs/password.html")
      })
    }
  }
})
