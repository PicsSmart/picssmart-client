import axiosProvider from ".";

const getFacesUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/faces`
const getThumbnailUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/thumbnail/:id`
const getFaceGroupImagesUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/faces/:id`
const getFaceGroupIdUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/faces/group`

export async function getFacesApi(){  
    try{
        const response = await axiosProvider.get(getFacesUrl)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };  

export async function getThumbnailApi(id){
    try{
        const response = await axiosProvider.get(getThumbnailUrl.replace(':id', id))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export async function getFaceGroupImagesApi(id){
    try{
        const response = await axiosProvider.get(getFaceGroupImagesUrl.replace(':id', id))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export async function getFaceGroupIdApi(face, id){
    try{
        const response = await axiosProvider.post(getFaceGroupIdUrl, {face:face, imageId:id})
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}