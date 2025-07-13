'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CardImagesData() {
    const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router=useRouter()
   const handleCardClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setInputValue('');
  };
  const handleNagaPhani=()=>{
if (inputValue === 'Naga') {
      // ✅ Add any logic here before navigating
      router.push('/daily-update-form'); // or any route you want
    } else {
      alert('Invalid input!');
    }
  }
  return (
    <div className="m-4">
        <h2 className="text-center text-orange-300">Hello... Welcome to the Workbox DailyStatus Page</h2>
        <div className="flex gap-3 flex-wrap justify-center">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-fit p-4 mt-8 cursor-pointer"
           
            >
      <Image
        src="/images/userlogin.jpg"
        alt="Card Image"
        width={100}
        height={100}
        className="object-cover rounded-lg mx-auto"
        
         onClick={handleCardClick}
      />
      <h1 className="text-center font-bold text-pink-600">NagaPhani</h1>
      {showForm && (
        <div className="mt-4">
          <input
            type="password"
            placeholder="Enter Password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border rounded px-3 py-1 w-full mb-2 text-sm"
          />
          <div className="flex justify-between gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
               onClick={handleNagaPhani}
              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-fit p-4 mt-8 cursor-pointer">
      <Image
        src="/images/userlogin.jpg"
        alt="Card Image"
        width={100}
        height={100}
        className="object-cover rounded-lg"
      />
      <h1 className="text-center font-bold text-pink-600">Pruthvi</h1>
    </div>
     <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-fit p-4 mt-8 cursor-pointer">
      <Image
        src="/images/userlogin.jpg"
        alt="Card Image"
        width={100}
        height={100}
        className="object-cover rounded-lg"
      />
      <h1 className="text-center font-bold text-pink-600">Srinivas</h1>
    </div>
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-fit p-4 mt-8 cursor-pointer">
      <Image
        src="/images/userlogin.jpg"
        alt="Card Image"
        width={100}
        height={100}
        className="object-cover rounded-lg"
      />
      <h1 className="text-center font-bold text-pink-600">Hemanth</h1>
    </div>
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-fit p-4 mt-8 cursor-pointer">
      <Image
        src="/images/userlogin.jpg"
        alt="Card Image"
        width={100}
        height={100}
        className="object-cover rounded-lg"
      />
      <h1 className="text-center font-bold text-pink-600">Abdhulla</h1>
    </div>
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-fit p-4 mt-8 cursor-pointer">
      <Image
        src="/images/userlogin.jpg"
        alt="Card Image"
        width={100}
        height={100}
        className="object-cover rounded-lg"
      />
      <h1 className="text-center font-bold text-pink-600">Sharma</h1>
    </div>
   
    </div>
    </div>
  );
}
