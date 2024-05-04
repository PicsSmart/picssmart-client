import axiosProvider from ".";

const textSearchUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/text-search`
const similaritySearchByIdUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/similar-search?imageId=:id&limit=4`
const similarSearchByImageUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/similar-search`

export const textSearchApi = async (caption) => {  
    try{
        const response = await axiosProvider.post(textSearchUrl, {caption})
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };

export const similaritySearchById = async (id) => {
    try{
        const response = await axiosProvider.get(similaritySearchByIdUrl.replace(':id', id))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
};

export const similarSearchByImage = async (file) => {
    try{
        const response = await axiosProvider.post(similarSearchByImageUrl, {'file': file}, {headers:{'Content-Type':'multipart/form-data'}})
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}