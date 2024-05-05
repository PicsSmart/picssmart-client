import axiosProvider from ".";

const getMediaUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/media`
const getFullsizeMediaUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/fullsize/:id`
const getMediaByIdUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/media/:id`
const updateMediaUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/media/:id`

const getThumbnailUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/thumbnail/:id`

export const getMediaApi = async () => {  
    try{
        const response = await axiosProvider.get(getMediaUrl)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  }; 
  
export const getFullsizeMediaApi = async (id) => {
    try{
        const response = await axiosProvider.get(getFullsizeMediaUrl.replace(':id', id))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export const getMediaByIdApi = async (id) => {
    try{
        const response = await axiosProvider.get(getMediaByIdUrl.replace(':id', id));
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export const updateMediaApi = async (id, data) => {
    try{
        const response = await axiosProvider.put(updateMediaUrl.replace(':id', id), data);
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export const getThumbnailUrlById = (id) => {
    return getThumbnailUrl.replace(':id', id);
}

export const getFullSizeUrlById = (id) => {
    return getFullsizeMediaUrl.replace(':id', id);
}
