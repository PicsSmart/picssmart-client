import axiosProvider from ".";

export async function getScenesApi(){  
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.get(`${cloudUrl}/scenes`)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };  

export async function getSceneThumbnailApi(name){
    const cloudUrl = await window.electronAPI.getCloudUrl()
    return `${cloudUrl}/scenes/thumbnail/${name}`
}

export async function getSceneImagesApi(name){
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.get(`${cloudUrl}/scenes/${name}`)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}