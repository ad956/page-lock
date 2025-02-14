import { Storage } from "@plasmohq/storage"

export const encryptData = (text: string): string => {
  return btoa(text)
}

export const decryptData = (encryptedText: string): string => {
  return atob(encryptedText)
}

export const secureStore = async (key: string, value: any) => {
  const storage = new Storage()
  const encryptedValue = encryptData(JSON.stringify(value))
  await storage.set(key, encryptedValue)
}

export const secureGet = async (key: string) => {
  const storage = new Storage()
  const encryptedValue = await storage.get(key)
  if (!encryptedValue) return null
  try {
    return JSON.parse(decryptData(encryptedValue))
  } catch {
    return null
  }
}
