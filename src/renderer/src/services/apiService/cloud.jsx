export const isConnectedToCloud = async () => {
  const cloudUrl = await window.electronAPI.getCloudUrl()
  console.log('cloudUrl', cloudUrl)
  return cloudUrl !== '' ? true : false
}

export const getCloudUrl = async () => {
  const cloudUrl = await window.electronAPI.getCloudUrl()
  return cloudUrl
}

export const connectToCloud = async (url) => {
  await window.electronAPI.setCloudUrl(url)
}

export const disconnectFromCloud = async () => {
  await window.electronAPI.setCloudUrl('')
}
