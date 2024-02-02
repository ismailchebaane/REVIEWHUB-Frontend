import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import CardCategorie from "./CardCategorie"
import { useDispatch,useSelector } from 'react-redux';


export default function CategoriePreview() {
    const {carts}=useSelector(item=>item.favorite)
  const [results, setResults] = useState();
  const [isLoading, setisLoading] = useState(true);

  const {id}=useParams()
  console.log(id)
  useEffect( () => {
   
      
    axios
    .get(`https://reviewhub-backendf.onrender.com/api/category/${id}`)
    .then((response) => {
      const rress =  response.data.map(post => {
           
        const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
        const avgRatee =  post.REVIEWS.length ? totalRate /  post.REVIEWS.length : 0;
        const avgRate =parseFloat(avgRatee.toFixed(1))
        return { ...post, avgRate };
      });
    
      
      setResults(rress);
      setisLoading(false)
    })
    .catch((error) => {
      console.log(error);
    });
    
  }, []);
    console.log(results);
     useEffect(()=>{
       localStorage.setItem("Favorite",JSON.stringify(carts))
      
        },[carts])
  

  

  
  
  return (<div className='mt-[88px] '>
   {isLoading?<div className='h-[80vh]'>
    
    <div className="flex mt-80 items-center justify-center space-x-2">
	<div className="w-4 h-4  rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
</div>
   
   </div>:    <div className="container mx-auto px-14 mt-10">
 {!results.length>0 ?<div className=' flex justify-center items-center h-screen text-3xl font-bold'>Category not Found</div>:
 <div className='    flex justify-center items-center flex-col  pt-6 p-4 bg-white ' >
 <h3 
  className="text-md md:text-xl lg:text-xl font-bold text-white tracking-wide mb-5 p-4 px-6 rounded-xl  border-gray-500" 
  style={{ backgroundColor: "#F97316", boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.4), 0 0 16px rgba(249, 199, 132, 0.4)" }}
>
{id.toLocaleUpperCase()}</h3>      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3 mb-10">
    
      {results.map((result) => {
   
      return (  <CardCategorie
            avgRate={result.avgRate}
            key={result.id}
            _id={result._id}
            title={result.title}
            reviewNB={result.rate}
            locationString={result.locationString}
            description={result.description}
            images={result.images}
          />
  )})} 
    
    
    
    
    
    </div>
    </div>
   }
    </div>}
 </div> )
}
