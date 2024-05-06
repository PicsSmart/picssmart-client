import axios from "axios"

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
  const response = await axios.get(`${url}/health`)
  if (response.status === 200 && response.data.status === 'up') {
    await window.electronAPI.setCloudUrl(url)
    return true
  }
  else {
    return false
  }
}

export const disconnectFromCloud = async () => {
  await window.electronAPI.setCloudUrl('')
}
