import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FavouriteCard from '../Favourite/FavouriteCard';
import CardCategorie from "../../components/CategoriePreview/CardCategorie"
import Card from '../../components/TopRated/Card';

export default function Search() {
    const [results, setResults] = useState({});
    const location = useLocation();
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q');
    
        axios.get(`https://reviewhub-backendf.onrender.com/api/search?q=${query}`).then((response) => {
          const rress =  response.data.map(post => {
           
            const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
            const avgRatee =  post.REVIEWS.length ? totalRate /  post.REVIEWS.length : 0;
            const avgRate =parseFloat(avgRatee.toFixed(1))
            return { ...post, avgRate };
          });
        
          setResults(rress);  
          setisLoading(false)
           
        });
      }, [location.search]);
    
  return (<div className='   mt-[88px] '>
    {isLoading?<div>
    
    <div className="flex mt-80 items-center justify-center space-x-2">
	<div className="w-4 h-4 rounded-full animate-bounce animate-pulse bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce animate-pulse bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce animate-pulse bg-black"></div>
</div>
   
   </div>:  <div className='text-3xl flex justify-center  items-center flex-col  pt-6 p-4 bg-white ' >
   <h3 
  className="text-sm md:text-xl lg:text-xl font-bold text-white tracking-wide mb-5 p-4 px-6 rounded-xl  border-gray-500" 
  style={{ backgroundColor: "#F97316", boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.4), 0 0 16px rgba(249, 199, 132, 0.4)" }}>Search</h3>  <div className=" pt-[10px]  grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-6 m-4 	 ">
    {results.map((h,index)=>(
      
      
       <CardCategorie
           
       key={index}
       _id={h._id}
       title={h.title}
       reviewNB={h.rate}
       description={h.description}
       locationString={h.locationString}
       avgRate={h.avgRate}
       images={h.images}
     />
    ))}
   

    </div>

  </div>}</div>
   
  )
}
