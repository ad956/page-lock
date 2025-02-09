document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submit-btn").addEventListener("click", async () => {
    const enteredPassword = document.getElementById("password-input").value

    const { siteLockPassword } =
      await chrome.storage.local.get("siteLockPassword")

    if (enteredPassword === siteLockPassword) {
      chrome.tabs.update({ url: sessionStorage.getItem("lockedSite") })
    } else {
      alert("Incorrect Password")
    }
  })
})
