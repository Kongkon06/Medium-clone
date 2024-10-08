import { SignupInput } from "@kongkon06/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export function Auth({type}:{type : "signup"| "signin"}){
    const navigate = useNavigate();
    const [postInputs,setpostInputs] = useState<SignupInput>({
        email:"",
        name:"",
        password:"",
    })
    async function SendReq(){
      try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
        const jwt = response.data.jwt;
        console.log(jwt);
        localStorage.setItem("token",jwt);
        navigate("/blogs");
      }catch(e){
        alert("Error while signing in")
        console.log(e);
      }
    }
    return <div className=" h-screen font-dm-sans flex justify-center">
        <div className="h-auto w-2/5 flex justify-center flex-col p-2 ">
        <div className="flex justify-center text-3xl font-extrabold mb-3">Create an account</div>
        <div className="flex justify-center mb-3">
            <div>{type==="signup"?"Already hava an account?":"Don't have an account"}</div>
            <div role="button" onClick={()=>{navigate(type==="signup"?"/Signin":"/Signup")}} className="underline hover:underline-offset-auto">{type==="signup"?"Login":"Sign up"}</div>
        </div>
        <div>
       {type=="signup"? <LabelledInput labell="Username" placeholder="Enter username" onchange={(e)=>{setpostInputs(c=>({...c,name:e.target.value}))}}/> : null}

        <LabelledInput labell="Email" placeholder="user12@email" onchange={(e)=>{setpostInputs(c=>({...c,email:e.target.value}))}}/>
        
        <LabelledInput labell="Password" type="password" placeholder="" onchange={(e)=>{setpostInputs(c=>({...c,password:e.target.value}))}}/>

        <button type="button" onClick={SendReq} className=" w-full mt-9 text-white font-bold bg-red-700 hover:bg-red-600 rounded-lg text-2xl px-5 py-2.5 me-2 mb-2 dark:bg-red-700 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-700">{type === "signup"?"Sign up": "Sign in"}</button>
        </div></div>
    </div>
}
interface LabelledInputtype{
 labell:string,
 placeholder:string,
 onchange:(e:ChangeEvent<HTMLInputElement>)=>void,
 type?:string
}
function LabelledInput({labell,placeholder,onchange,type}:LabelledInputtype){
    return <div className="w-full font-dm-sans mb-3">
   <div className=" w-64 pr-3 flex justify-start text-2xl font-bold mb-3 ">{labell}</div>
    <div className="">
      <input
        type={type||"text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-12 ps-10 p-2.5 dark:bg-slate-950 dark:border-gray-600 dark:placeholder-slate-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:bg-white focus:text-black"
        placeholder={placeholder} onChange={onchange}
      />
    </div>
  </div>
}