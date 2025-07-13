'use client'

import Image from "next/image";
import { useState } from 'react';
import { useRouter } from "next/navigation";
export default function CardData()
{
    const users = [
  { name: 'NagaPhani', password: '93811n' },
  { name: 'Pruthvi', password: '93811p' },
  { name: 'Srinivas', password: '93811s' },
  { name: 'Hemanth', password: '93811h' },
  { name: 'Abdhul', password: '93811a' },
  { name: 'Karthik', password: '93811k' },
];
const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState('');
  const [error,setError]=useState(null)
  const router=useRouter()
  const handleCancel=()=>{
    setSelectedUser(null)
    setInput("")
    setError(null)
  }
 const handleSubmit = async(user) => {
  if (input === user.password) {

const res= await fetch("api/auth/setcookielogin",{
  method:"POST",
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: user.name.toLowerCase() }),
  credentials: 'include'
})

      router.push(`/form/${user.name.toLowerCase()}`);


    return;
  }
else{
  setError(user.name);
}
  
};

    return(
        <>
        <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Workbox Daily Status</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {users.map((user, i) => (
          <div key={i} className="border rounded-xl shadow p-4 w-fit">
            <Image
  src="/images/userlogin.jpg"
  width={100}
  height={100}
  alt={user.name}
  className="rounded-full mx-auto cursor-pointer"
  onClick={() => {
    setSelectedUser(user);     // Select the user
    setInput("");              // Clear password input
    setError(null);        // Clear old error message
  }}
/>

            <h3 className="text-pink-600 font-bold mt-2">{user.name}</h3>
            {selectedUser?.name === user.name && (
              <div className="mt-2">

                    <input
                  type="password"
                  className="border px-2 py-1 w-full rounded"
                  placeholder="Enter password"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                {error===user.name && <p className="text-red-500 text-sm mb-1 mt-1 text-left">Invalid Error...</p>}
               <div className="flex justify-between">
                  <button
                  className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={()=>handleSubmit(user)}
                >
                  Submit
                </button>
                </div>
              </div>
              
            )}
          </div>
        ))}
      </div>
    </div>
        </>
    )
}