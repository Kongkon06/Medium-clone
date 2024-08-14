import { Link } from "react-router-dom";
import { Avatar } from "./Blogcard";
export function Appbar(){
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center text-lg font-extrabold"><Link to={'/blogs'}><div>Medium</div>
        </Link> 
        </div>   
        <Link to={'/publish'}><div><button className=" text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 ">
            New</button> 
            <Avatar size={"big"} name="Kongkon"/></div>
            </Link>
    </div>
}