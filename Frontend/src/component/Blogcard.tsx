import { Link } from "react-router-dom"

interface Blogcardprop{
    authorname:string,
    title:string,
    content:string,
    publish:string,
    id:string
}
export function Blogcard({authorname,title,content,publish,id}:Blogcardprop){
    return <Link to={`/blog/${id}`}><div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md">
        <div className="flex font-dm-sans">
         <Avatar name={authorname}/>
        <div className="font-light pl-2 text-sm"> {authorname}</div>  
        <div className="flex justify-center flex-col pl-2"> <Circle/></div>
        <div className="pl-2 font-extralight text-slate-500 text-sm">{publish}</div>
        </div> 
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-extralight">{content.slice(0,100) + "..."}</div>
        <div className="text-slate-500 text-sm font-extralight pt-4">{`${Math.ceil(content.length/100)} min read`}</div>
        </div> </Link>
}
function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}
export function Avatar({name , size="small"}:{name:string,size?:"small"|"big"}){
    return <div className={`relative inline-flex items-center justify-center ${size==="small"?" w-6 h-6":"w-10 h-10"} overflow-hidden p-2 bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size === "small"? "text-xs":"text-sm"} font-medium text-gray-600 dark:text-gray-300`}>{name[0]}</span>
  </div>
  }