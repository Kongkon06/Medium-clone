import { useParams } from "react-router-dom";
import { sBlog } from "../Hooks"
import { Fullblog } from "./Fullblog";
import { Blogskle } from "../component/Blogskel";

export function Blog(){
    const { id } = useParams()
    const {loading,sblog} = sBlog({
        id: String(id ||"")
    });
    console.log(sblog);
    if(loading || !sblog){
        return <div className="flex justify-center">
            <div className="w-full max-w-screen-lg"><div className="w-full">
            <Blogskle/>
            <Blogskle/>
            <Blogskle/>
            </div></div>
        </div>
    }
    return <div>
        <Fullblog data={sblog}/>
    </div>
}