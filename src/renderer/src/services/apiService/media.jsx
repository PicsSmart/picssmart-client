import axiosProvider from ".";

export const getMediaApi = async () => {  
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.get(`${cloudUrl}/media`)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  }; 
  
export const getFullsizeMediaApi = async (id) => {
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.get(`${cloudUrl}/fullsize/${id}`)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export const getMediaByIdApi = async (id) => {
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.get(`${cloudUrl}/media/${id}`)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export const updateMediaApi = async (id, data) => {
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.put(`${cloudUrl}/media/${id}`, data);
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export const getThumbnailUrlById = async (id) => {
    const cloudUrl = await window.electronAPI.getCloudUrl()
    return `${cloudUrl}/thumbnail/${id}`
}

export const getFullSizeUrlById = async (id) => {
    const cloudUrl = await window.electronAPI.getCloudUrl()
    return `${cloudUrl}/fullsize/${id}`
}
