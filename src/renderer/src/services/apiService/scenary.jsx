import axiosProvider from ".";

const getScenesUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/scenes`
const getSceneThumbnailUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/scene/thumbnail/:name`
const getSceneImagesUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/scenes/:name`

export async function getScenesApi(){  
    try{
        const response = await axiosProvider.get(getScenesUrl)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };  

export async function getSceneThumbnailApi(name){
    try{
        const response = await axiosProvider.get(getSceneThumbnailUrl.replace(':name', name))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export async function getSceneImagesApi(name){
    try{
        const response = await axiosProvider.get(getSceneImagesUrl.replace(':name', name))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}