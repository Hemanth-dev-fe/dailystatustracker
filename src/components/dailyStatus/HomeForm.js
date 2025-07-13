'use client'
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
function UserLogin()
{
      const [loading, setLoading] = useState(false);
      const [form,setForm]=useState({username:"",password:""})
      const [error,setError]=useState("")
      
      const router=useRouter()
      const handleUserLogin=(e)=>{
e.preventDefault()
setLoading(true)
setTimeout(()=>{
  if(form.username==="" && form.password==="")
{
  alert("All fields are required...")
  setLoading(false)
  return
}
if(form.username==="workbox" && form.password==="workbox")
{

  setLoading(false)
  setError("")
  setForm({username:"",password:""})
router.push("/UsersPage")
}
else{
setLoading(false)
  setError("invalid credentials")
}
},1000)
      }

      
    return(
        <>
       {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <h1 className="font-bold text-2xl mb-4">User Login</h1>

        <form className="flex flex-col items-center justify-center w-full max-w-sm" onSubmit={handleUserLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-400 rounded p-2 mb-3"
            value={form.username}
            onChange={(e)=>{setForm({...form, username:e.target.value})}}
          />
         <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-400 rounded p-2 mb-3"
            value={form.password}
            onChange={(e)=>{setForm({...form, password:e.target.value})}}
          />
          <button
            type="submit"
            className={`w-full border border-gray-400 rounded p-2 mb-3 bg-blue-700 text-white font-bold ${
              loading ? "opacity-50 cursor-wait" : "cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? "User Logging..." : "User Login"}
          </button>
        </form>

        </>
    )
}
function AdminLogin()
{
      const [loading, setLoading] = useState(false);
      const [adminForm,setAdminForm]=useState({username:"",password:""})
     const router=useRouter()
      const handleAdminSubmit=async(e)=>{
        e.preventDefault()
        if(adminForm.username==="lead" && adminForm.password==="18")
        {
          const res= await fetch("api/auth/setcookielogin",{
  method:"POST",
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: adminForm.username.toLowerCase() }),
  credentials: 'include'
})
        router.push(`/admin/${adminForm.username.toLowerCase()}`)
        }
        else{
          alert("invalid credentials")
        }
      }
    return(
        <>
     
        <h1 className="font-bold text-2xl mb-4">Admin Login</h1>

        <form className="flex flex-col items-center justify-center w-full max-w-sm" onSubmit={handleAdminSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-400 rounded p-2 mb-3"
            value={adminForm.username}
            onChange={(e)=>setAdminForm({...adminForm,username:e.target.value})}
          />
         <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-400 rounded p-2 mb-3"
            value={adminForm.password}
            onChange={(e)=>setAdminForm({...adminForm,password:e.target.value})}
            
          />
          <button
            type="submit"
            className={`w-full border border-gray-400 rounded p-2 mb-3 bg-blue-700 text-white font-bold ${
              loading ? "opacity-50 cursor-wait" : "cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? "Admin Logging..." : "Admin Login"}
          </button>
        </form>

        </>
    )
}
export default function HomeForm()
{

       const [isLogging,setIsLogging]=useState(true)
    return(
        <>
        <div className="flex flex-col items-center justify-center mt-16">
      <div className="bg-white w-full max-w-sm shadow-lg rounded-xl p-7 pt-4 border-2">
        <div className="flex justify-between pb-8">
            <Image src="/images/userlogin.jpg" alt="User Login" width={60} height={50} onClick={()=>setIsLogging(true)} 
            className="cursor-pointer"/>
            <Image src="/images/adminlogin.jpg" alt="Admin Login" width={60} height={50} onClick={()=>setIsLogging(false)}
            className="cursor-pointer"
            />
        </div>
        {
           isLogging ? <UserLogin /> :<AdminLogin/>
        }
        
      </div>
    </div>
        </>
    )
}