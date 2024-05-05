import axiosProvider from ".";

export const textSearchApi = async (caption) => {  
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.post(`${cloudUrl}/text-search`, {caption})
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };

export const similaritySearchById = async (id) => {
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.get(`${cloudUrl}/similar-search?imageId=${id}&limit=4`)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
};

export const similarSearchByImage = async (file) => {
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.post(`${cloudUrl}/similar-search`
            , {'file': file}, {headers:{'Content-Type':'multipart/form-data'}})
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}