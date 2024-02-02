import React, { useEffect, useState } from 'react'
import Card from './Card'
import StarIcon from '@mui/icons-material/Star';
import axios from'axios';
export default function TopRated() {
  
  const [hotel,setHotel]=useState([{}])
  const [hloading,sethloading]=useState(true)
  const [cafe,setcafe]=useState([{}])
  const [cloading,setcloading]=useState(true)
  const [amusementpark,setamusementpark]=useState([{}])
  const [aloading,setaloading]=useState(true)
  const [mall,setmall]=useState([{}])
  const [mloading,setmloading]=useState(true)
  const [restaurant,setrestaurant]=useState([{}])
  const [rloading,setrloading]=useState(true)
  useEffect(() => {
    axios.get("https://reviewhub-backendf.onrender.com/api/toprated/hotel").then((res) => {
      const rress = res.data.map(post => {
        const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
        const avgRatee = post.REVIEWS.length ? totalRate / post.REVIEWS.length : 0;
        const avgRate = parseFloat(avgRatee.toFixed(1));
        return { ...post, avgRate };
      });
      const sortedPosts = rress.sort((post1, post2) => post2.avgRate - post1.avgRate);
      setHotel(sortedPosts);
      sethloading(false);
    })
    axios.get("https://reviewhub-backendf.onrender.com/api/toprated/cafe").then((res) => {
      const rress = res.data.map(post => {
        const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
        const avgRatee = post.REVIEWS.length ? totalRate / post.REVIEWS.length : 0;
        const avgRate = parseFloat(avgRatee.toFixed(1));
        return { ...post, avgRate };
      });
      const sortedPosts = rress.sort((post1, post2) => post2.avgRate - post1.avgRate);
    
      setcafe(sortedPosts);
      
      
     setcloading(false);
    })
    
    axios.get("https://reviewhub-backendf.onrender.com/api/toprated/amusement%20park").then((res) => {
      const rress = res.data.map(post => {
        const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
        const avgRatee = post.REVIEWS.length ? totalRate / post.REVIEWS.length : 0;
        const avgRate = parseFloat(avgRatee.toFixed(1));
        return { ...post, avgRate };
      });
      const sortedPosts = rress.sort((post1, post2) => post2.avgRate - post1.avgRate);
    
      setamusementpark(sortedPosts);  
      
      
    setaloading(false);
    })
    
    
    axios.get("https://reviewhub-backendf.onrender.com/api/toprated/mall").then((res) => {
      const rress = res.data.map(post => {
        const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
        const avgRatee = post.REVIEWS.length ? totalRate / post.REVIEWS.length : 0;
        const avgRate = parseFloat(avgRatee.toFixed(1));
        return { ...post, avgRate };
      });
      const sortedPosts = rress.sort((post1, post2) => post2.avgRate - post1.avgRate);
    
    
      setmall(sortedPosts);  
      
      
      setmloading(false);
    
    })
    
    axios.get("https://reviewhub-backendf.onrender.com/api/toprated/restaurant").then((res) => {
      const rress = res.data.map(post => {
        const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
        const avgRatee = post.REVIEWS.length ? totalRate / post.REVIEWS.length : 0;
        const avgRate = parseFloat(avgRatee.toFixed(1));
        return { ...post, avgRate };
      });
      const sortedPosts = rress.sort((post1, post2) => post2.avgRate - post1.avgRate);
    
      setrestaurant(sortedPosts);  
      
      setrloading(false);
    })
  }, [])
  





 
  
  return (
    
    <div className="container mx-auto px-14 mt-10">

    
<div className="flex justify-center items-center  text-center">
  <hr className=" w-20 h-1 bg-black"/>
  <h1 className="font-bold text-2xl my-4 px-2">Top Rated Hotels</h1>
  <hr className="w-20 h-1 bg-black" />
</div>    
      {hloading?<div>
    
    <div className="flex mt-80 items-center justify-center space-x-2">
	<div className="w-4 h-4  rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
</div>
   
   </div>:
   <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 mb-10">
     
      {hotel.slice(0, 5).map(h=>(
       <Card _id={h._id} avgRate={h.avgRate} description={h.description} title={h.title} locationString={h.locationString}  image={h.images} />
    
    ))}
     
         </div> }
      <div className="flex justify-center items-center  text-center">
  <hr className=" w-20 h-1 bg-black"/>
  <h1 className="font-bold text-2xl my-4 px-2">Top Rated Malls</h1>
  <hr className="w-20 h-1 bg-black" />
</div>     {mloading?<div>
    
    <div className="flex mt-80 items-center justify-center space-x-2">
	<div className="w-4 h-4  rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
</div>
   
   </div>:
   <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 mb-10">
     
      {mall.slice(0, 5).map(h=>(
       <Card _id={h._id} avgRate={h.avgRate} description={h.description} title={h.title} locationString={h.locationString}  image={h.images} />
    
    ))}
     
         </div> }
      <div className="flex justify-center items-center  text-center">
  <hr className=" w-20 h-1 bg-black"/>
  <h1 className="font-bold text-2xl my-4 px-2">Top Rated Cafes</h1>
  <hr className="w-20 h-1 bg-black" />
</div>      {cloading?<div>
    
    <div className="flex mt-80 items-center justify-center space-x-2">
	<div className="w-4 h-4  rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
</div>
   
   </div>:
   <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 mb-10">
     
      {cafe.slice(0, 5).map(h=>(
       <Card _id={h._id} avgRate={h.avgRate} description={h.description} title={h.title} locationString={h.locationString} image={h.images} />
    
    ))}
     
         </div> }
      <div className="flex justify-center items-center  text-center">
  <hr className=" w-20 h-1 bg-black"/>
  <h1 className="font-bold text-2xl my-4 px-2">Top Rated Restaurant</h1>
  <hr className="w-20 h-1 bg-black" />
</div>      {rloading?<div>
    
    <div className="flex mt-80 items-center justify-center space-x-2">
	<div className="w-4 h-4  rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
</div>
   
   </div>:
   <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 mb-10">
     
      {restaurant.slice(0, 5).map(h=>(
       <Card _id={h._id} avgRate={h.avgRate} description={h.description} title={h.title} locationString={h.locationString} image={h.images} />
    
    ))}
     
         </div> }
      <div className="flex justify-center items-center  text-center">
  <hr className=" w-20 h-1 bg-black"/>
  <h1 className="font-bold text-2xl my-4 px-2">Top Rated Amusement Parks</h1>
  <hr className="w-20 h-1 bg-black" />
</div>    {aloading?<div>
    
    <div className="flex mt-80 items-center justify-center space-x-2">
	<div className="w-4 h-4  rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
</div>
   
   </div>:
   <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 mb-10">
     
      {amusementpark.slice(0, 5).map(h=>(
       <Card _id={h._id} avgRate={h.avgRate} description={h.description} title={h.title} locationString={h.locationString} image={h.images} />
    
    ))}
     
         </div> }
      
    </div>
  )
}
