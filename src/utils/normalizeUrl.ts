export const normalizeUrl = (url: string): string => {
  let normalized = url.replace(/^(https?:\/\/)?(www\.)?/, "")
  normalized = normalized.replace(/\/.*$/, "")
  return normalized.toLowerCase()
}
