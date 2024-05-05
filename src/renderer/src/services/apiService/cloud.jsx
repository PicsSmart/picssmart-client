export const isConnectedToCloud = async () => {
  // TODO: Remove when connect/disconnect buttons are implemented
  await window.electronAPI.setCloudUrl('http://127.0.0.1:8000')

  const cloudUrl = await window.electronAPI.getCloudUrl()
  console.log('cloudUrl', cloudUrl)
  return cloudUrl ? true : false
}

export const getCloudUrl = async () => {
  const cloudUrl = await window.electronAPI.getCloudUrl()
  return cloudUrl
}
