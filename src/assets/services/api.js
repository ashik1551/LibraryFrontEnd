import axios from "axios"

const base_Url="http://127.0.0.1:8000/api/"

function getHeader(){

    let token=sessionStorage.getItem('access')

    let headers={
        'Authorization':'Bearer '+token
    }

    return headers
}

export async function getTokenApi(data){

    return axios.post(base_Url+'token/',data)

}


export async function getBookListApi(arg){

    return axios.get(base_Url+'book/'+arg,{headers:getHeader()})

}

export async function deleteBookApi(id){

    return axios.delete(base_Url+`book/${id}/`,{headers:getHeader()})

}

export async function retreiveBookApi(id){

    return axios.get(base_Url+`book/${id}/`,{headers:getHeader()})

}

export async function postBookApi(data,authorId,genreId){

    return axios.post(base_Url+`book/?author=${authorId}&genre=${genreId}`,data,{headers:getHeader()})

}

export async function updateBookApi(id,data,authorId,genreId){

    return axios.put(base_Url+`book/${id}/?author=${authorId}&genre=${genreId}`,data,{headers:getHeader()})

}


export async function getAuthorListApi(){

    return axios.get(base_Url+'author/',{headers:getHeader()})

}

export async function postAuthorApi(data){
    
    return axios.post(base_Url+'author/',data,{headers:getHeader()})

}

export async function retrieveAuthorApi(id){

    return axios.get(base_Url+`author/${id}/`,{headers:getHeader()})

}

export async function updateAuthorApi(id,data){

    return axios.put(base_Url+`author/${id}/`,data,{headers:getHeader()})

}

export async function deleteAuthorApi(id){

    return axios.delete(base_Url+`author/${id}/`,{headers:getHeader()})

}


export async function getGenreListApi(){

    return axios.get(base_Url+'genre/',{headers:getHeader()})
    
}

export async function postGenreApi(data){

    return axios.post(base_Url+'genre/',data,{headers:getHeader()})
    
}

export async function deleteGenreApi(id){

    return axios.delete(base_Url+`genre/${id}/`,{headers:getHeader()})
    
}

export async function retreiveGenreApi(id){

    return axios.get(base_Url+`genre/${id}/`,{headers:getHeader()})
    
}

export async function updateGenreApi(id,data){

    return axios.put(base_Url+`genre/${id}/`,data,{headers:getHeader()})
    
}


export async function getMemberApi(){

    return axios.get(base_Url+'member/',{headers:getHeader()})
    
}

export async function retreiveMemberApi(id){

    return axios.get(base_Url+`member/${id}/`,{headers:getHeader()})
    
}

export async function postMemberApi(data){

    return axios.post(base_Url+'member/',data,{headers:getHeader()})
    
}


export async function getRentListApi(arg){

    return axios.get(base_Url+'rent/'+arg,{headers:getHeader()})
    
}

export async function retrieveRentApi(id){

    return axios.get(base_Url+`rent/${id}/`,{headers:getHeader()})
    
}

export async function updateRentApi(id,data=null){

    return axios.put(base_Url+`rent/${id}/`,data,{headers:getHeader()})
    
}

export async function postRentApi(args,data){

    return axios.post(base_Url+`rent/${args}`,data,{headers:getHeader()})
    
}