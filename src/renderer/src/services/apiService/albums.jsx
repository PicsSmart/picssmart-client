import axiosProvider from ".";

const getAlbumsUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/albums`
const getAlbumMediaUrl = `${import.meta.env.VITE_PERSONAL_CLOUD_URL}/albums/:id/media`

export const getAlbumsApi = async ()=>{
    try {
        const response = await axiosProvider.get(getAlbumsUrl);
        return Promise.resolve(response);
    }catch(exception){
        return Promise.reject(exception);
    }
}

export const getAlbumMediaApi = async (id)=>{
    try{
        const response = await axiosProvider.get(getAlbumMediaUrl.replace(':id', id));
        return Promise.resolve(response);
    }catch(execption){
        return Promise.reject(exception)
    }
}