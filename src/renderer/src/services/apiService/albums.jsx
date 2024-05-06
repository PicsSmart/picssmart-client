import axiosProvider from ".";

export const getAlbumsApi = async ()=>{
    try {
        const cloudUrl = await window.electronAPI.getCloudUrl() 
        const response = await axiosProvider.get(`${cloudUrl}/albums`);
        return Promise.resolve(response);
    }catch(exception){
        return Promise.reject(exception);
    }
}

export const getAlbumMediaApi = async (id)=>{
    try{
        const cloudUrl = await window.electronAPI.getCloudUrl()
        const response = await axiosProvider.get(`${cloudUrl}/albums/${id}/media`);
        return Promise.resolve(response);
    }catch(execption){
        return Promise.reject(exception)
    }
}