import React,{useEffect} from 'react'
import FavouriteCard from "./FavouriteCard"
import { useSelector } from 'react-redux'
export default function Favorite() {
 const {carts}=useSelector(item=>item.favorite)

 
  useEffect(()=>{
    localStorage.setItem("Favorite",JSON.stringify(carts))
   
     },[carts])
     
      
     
     
   return (
  <div className='mt-[88px] '>{!carts.length<1?<div className="container mx-auto px-14 mt-10">
  <div className='    flex justify-center items-center flex-col  pt-6 p-4 bg-white ' >
  <h3 
  className="text-xl font-bold text-white tracking-wide mb-5 p-4 px-6 rounded-xl  border-gray-500" 
  style={{ backgroundColor: "#F97316", boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.4), 0 0 16px rgba(249, 199, 132, 0.4)" }}
>
  My Favourite
</h3>
   <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3 mb-10">

   {carts.map((cart,index)=>{
    return <FavouriteCard _id={cart._id} avgRate={cart.avgRate} key={index} review={cart.REVIEWS}  description={cart.description} title={cart.title} locationString={cart.locationString} images={cart.images?cart.images:cart.image} />
   })
    
   
   
   }
   
   
   

      </div></div>

    </div>:<div className='bg-white mt-80 w-full h-[40vh] '>
      <h1 class="flex justify-center  items-center self-center font-bold text-3xl">Empty <a className='text-sm items-center font-semibold ml-2' href="/">go home</a></h1>
        </div> }  </div>
  )
}
