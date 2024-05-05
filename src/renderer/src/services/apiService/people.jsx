import axiosProvider from ".";

export async function getFacesApi(){  
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.get(`${cloudUrl}/faces`)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };  

export async function getThumbnailUrlApi(id){
    const cloudUrl = await window.electronAPI.getCloudUrl()
    return `${cloudUrl}/thumbnail/${id}`
}

export async function getFaceGroupImagesApi(id){
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.get(`${cloudUrl}/faces/${id}`)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export async function getFaceGroupIdApi(face, id){
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.post(`${cloudUrl}/faces/group`, {face:face, imageId:id})
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}
