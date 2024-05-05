export const isConnectedToCloud = async () => {
  const response = import.meta.env.VITE_PERSONAL_CLOUD_URL ? true : false
  return response
}

export const getCloudUrl = async () => {
  const response = import.meta.env.VITE_PERSONAL_CLOUD_URL ? import.meta.env.VITE_PERSONAL_CLOUD_URL : ''
  return response
}
