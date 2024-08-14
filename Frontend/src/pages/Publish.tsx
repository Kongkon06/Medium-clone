import { ChangeEvent, useState } from "react"
import { Appbar } from "../component/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CreateBlog } from "@kongkon06/medium-common";
import { useNavigate } from "react-router-dom";

export const Publish = ()=>{
   const [publishpost,setpublish] = useState<CreateBlog>({
    title:"",
    content:""
   });
   const navigate = useNavigate();
    return <div className="font-dm-sans">
        <Appbar/>
        <div className="flex justify-center w-full">
        <div className="max-w-screen-lg w-full">
        <input onChange={(e)=>{setpublish(c=>({...c,title:e.target.value}))}} 
            className="w-full border block p-2.5 w-full text-3xl font-bold text-white bg-slate-950 rounded-lg border focus:bg-white focus:text-slate-950" placeholder="Title..">
        </input>
          <TextEditor onChange={(e)=>{setpublish(c=>({...c,content:e.target.value}))}} />
          <button type="submit" onClick={async()=>{await axios.post(`${BACKEND_URL}/api/v1/blogs/blog`,publishpost,{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }}).then(response=>{
            navigate(`/blog/${response.data.Id}`)
        })}} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-slate-950 rounded-lg focus:ring-4 focus:ring-blue-200">
           Publish post
       </button>
          </div>
        </div>
    </div>
}

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
    return  <form className="mt-4">
       <div  className="w-full mb-2 border border-gray-200 rounded-lg dark:bg-slate-950 focus:bg-white">
               <textarea id="editor" rows={8} onChange={onChange} className="block w-full p-2 rounded-lg text-slate-900 bg-white border-0 dark:bg-slate-950 dark:text-white dark:placeholder-gray-400 focus:bg-white focus:text-slate-950" placeholder="Write an article..." required ></textarea>
       </div>
    </form>
    
    
}