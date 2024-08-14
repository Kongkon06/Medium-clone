import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
            "content": string,
            "title": string,
            "id": string,
            "author": {
                "name": string
            }
}
export const sBlog =({id}:{id:string})=>{
    const [loading,setloading] = useState(true);
    const [sblog,setblog] = useState<Blog>();
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`,{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }}).then(response=>{setblog(response.data.blog);
            setloading(false);
        });
    },[]);
    return{
        loading,
        sblog
    }
}
export const useBlogs= ()=>{
    const [loading,setloading] = useState(true);
    const [blog,setblogs] = useState<Blog[]>([]);
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`,{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }}).then(response=>{setblogs(response.data.blogs);
            setloading(false);
        });
    },[]);
    return{
        loading,
        blog
    }
}