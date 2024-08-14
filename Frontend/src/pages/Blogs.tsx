import { Blogcard } from "../component/Blogcard";
import { Appbar } from "../component/Appbar";
import { useBlogs } from "../Hooks";
import { Blogskle } from "../component/Blogskel";
export function Blogs(){
    const {loading ,blog} = useBlogs();
    if(loading){
        return <div className="flex justify-center">
            <div className="w-full max-w-screen-lg"><div className="w-full">
            <Blogskle/>
            <Blogskle/>
            <Blogskle/>
            </div></div>
        </div>
    }
    return <div className="font-dm-sans" >
        <div></div>
        <Appbar/>
        <div className="flex justify-center">
        <div >
            {blog.map(blog=> <Blogcard publish="2-15-2024" id={blog.id} authorname={blog.author.name} title={blog.title} content={blog.content}/>)}
    </div>
        </div>
    </div>
}
