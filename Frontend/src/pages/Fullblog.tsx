import { Appbar } from "../component/Appbar"
import { Avatar } from "../component/Blogcard"
import { Blog } from "../Hooks"

export function Fullblog({data}:{data:Blog}){
    return <div className="pt-200 font-dm-sans">
        <Appbar/>
        <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10  max-w-screen-xl pt-10">
        <div className="col-span-8">
            <div className="font-extrabold text-5xl">
                {data.title}
            </div>
            <div className="pt-4">{data.content}</div>
        </div>
        <div className="col-span-4 p-2">
            <div className="text-slate-500"></div>
            Author
            <div className="w-full flex ">
                <div className="pr-4 flex flex-col justify-center">
                <Avatar name="A" size="big" />
                </div>
                <div>
                <div className="text-lg font-bold">
                Anonymous
            </div>
            <div className="pt-4 text-slate-500">Random cath prase about the author ability to grab attention</div>
                </div>
            </div>
        </div>
      </div>
    </div>
    </div> 
}