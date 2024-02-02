import React, { useEffect, useState } from 'react'

import AttractionsIcon from '@mui/icons-material/Attractions';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { AddToCart } from '../redux/CartSystem';
import axios from'axios';
export default function Header() {
   const {carts}=useSelector(item=>item.favorite)
   useEffect(()=>{
     localStorage.setItem("Favorite",JSON.stringify(carts))
    
      },[carts])   
      const dispatch=useDispatch()

 const [hotel,setHotel]=useState([{}])
  const [hloading,sethloading]=useState(true)
  const [cafe,setcafe]=useState([{}])
  const [restaurant,setrestaurant]=useState([{}])

  const [cloading,setcloading]=useState(true)
  const [rloading,setrloading]=useState(true)


   
     useEffect(() => {
      async function fetchData() {
        await   axios.get("https://reviewhub-backendf.onrender.com/api/toprated/hotel").then((res)=>{
          const sortedPosts = res.data.sort((post1, post2) => post2.REVIEWS.length - post1.REVIEWS.length);
          const rress =  sortedPosts.map(post => {
           
            const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
            const avgRatee =  post.REVIEWS.length ? totalRate /  post.REVIEWS.length : 0;
            const avgRate =parseFloat(avgRatee.toFixed(1))
            return { ...post, avgRate };
          });
          setHotel(rress);
           sethloading(false)
        })
      
        await  axios.get("https://reviewhub-backendf.onrender.com/api/toprated/cafe").then((res)=>{
      
        const sortedPosts = res.data.sort((post1, post2) => post2.REVIEWS.length - post1.REVIEWS.length);
        const rress =  sortedPosts.map(post => {
           
          const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
          const avgRatee =  post.REVIEWS.length ? totalRate /  post.REVIEWS.length : 0;
          const avgRate =parseFloat(avgRatee.toFixed(1))
          return { ...post, avgRate };
        });
        setcafe(rress);
        
       setcloading(false)
      })
      await  axios.get("https://reviewhub-backendf.onrender.com/api/toprated/restaurant").then((res)=>{
      
        const sortedPosts = res.data.sort((post1, post2) => post2.REVIEWS.length - post1.REVIEWS.length);
        const rress =  sortedPosts.map(post => {
           
          const totalRate = post.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
          const avgRatee =  post.REVIEWS.length ? totalRate /  post.REVIEWS.length : 0;
          const avgRate =parseFloat(avgRatee.toFixed(1))
          return { ...post, avgRate };
        }); 
        setrestaurant(rress);
        
       setrloading(false)
      })
      



        
        }
        fetchData();
       
   
    }, [])
  
   
 return (<div className="mt-28">
           <div className='lg:flex hidden  justify-center mb-10'>
           <Link to="/category/hotel"  className=" ml-14 cursor-pointer hover:border-gray-200 hover:border-4 hover:bg-black hover:text-white px-4 rounded-xl flex justify-between items-center border-2 border-black h-16 w-40">
              <h1 className='font-semibold'>hotel</h1><BedOutlinedIcon/>

            </Link> 
            <Link to="/category/mall"  className=" ml-14 cursor-pointer hover:border-gray-200 hover:border-4 hover:bg-black hover:text-white px-4 rounded-xl flex justify-between items-center border-2 border-black h-16 w-40">
              <h1 className='font-semibold'>Malls</h1> <StoreMallDirectoryOutlinedIcon />
            </Link>  
            <Link to="/category/cafe" className=" ml-14 cursor-pointer hover:border-gray-200 hover:border-4 hover:bg-black hover:text-white px-4 rounded-xl flex justify-between items-center border-2 border-black h-16 w-40">
              <h1 className='font-semibold'>Cafes</h1> <LocalCafeOutlinedIcon />
            </Link> 
             <Link  to="/category/restaurant"  className=" ml-14 cursor-pointer hover:border-gray-200 hover:border-4 hover:bg-black hover:text-white px-4 rounded-xl flex justify-between items-center border-2 border-black h-16 w-40">
              <h1 className='font-semibold'>Restaurants</h1> <RestaurantOutlinedIcon />
            </Link> 
             <Link  to="/category/amusement park"  className=" ml-14 cursor-pointer hover:border-gray-200 hover:border-4 hover:bg-black hover:text-white px-4 rounded-xl flex justify-between items-center border-2 border-black h-16 w-40">
              <h1 className='font-semibold'>Amusement Parks</h1> <AttractionsIcon />
            </Link>
             
            </div> 
            
         { rloading?<div>
    
    <div className="flex mt-80 items-center justify-center space-x-2">
	<div className="w-4 h-4  rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
	<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
</div>
   
   </div>
   :  
        <div  className='  lg:px-14 grid  lg:grid-cols-3 md:gap-1 sm:grid-cols-1 md:grid-cols-3 lg:gap-1'>
      
    
         <div style={{ background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)`, backgroundSize:"cover"}}
         className={"imageopacity lg:mb-0 mb-1   w-full  lg:w-[400px ] relative h-[600px]"}>
    <Link to={"/p/"+hotel[4]._id}>   <img  className="w-full h-full object-cover opacity-70" alt='ddd' src={`https://reviewhub-backendf.onrender.com/${hotel[4].images[0]}`}></img>
    </Link>       <div className='absolute cursor-pointer top-2 right-4 rounded-full w-max h-max p-2 bg-white' onClick={()=>{
          dispatch(AddToCart(hotel[4]))
        }}> <FavoriteBorderOutlinedIcon />
       </div>  
       <div className='bottom-28 w-full px-10  absolute'>
   
         <h1 className='text-white tracking-wide text-center font-semibold  text-3xl '>{hotel[4].title}</h1>
         <div className='flex mt-4  items-center justify-around'>
         <div class="flex  justify-center items-center">
    <svg aria-hidden="true" class="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      <p class="ml-2 text-md font-medium text-white dark:text-white "> {hotel[4].avgRate} - 5</p>
</div>    <p className='text-center font-semibold text-white'>July 4, 2023</p>
       
          </div></div>
         </div>
       


        <div  className='flex lg:mx-1 w-full h-full flex-col'>
      
        <div style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)", backgroundSize:"cover"}}
             className='imageopacity mb-1  w-full  lg:w-[400px]   relative h-[197px]'>
    <Link to={"/p/"+cafe[7]._id}>      <img  className="w-full h-full object-cover opacity-60" alt='ddd' src={`https://reviewhub-backendf.onrender.com/${cafe[7].images[1]}`}></img>
  </Link>
      <div className='absolute cursor-pointer top-2 right-4 rounded-full w-max h-max p-2 bg-white' onClick={()=>{
          dispatch(AddToCart(cafe[7]))
        }}><FavoriteBorderOutlinedIcon />
       </div>

    <div className='bottom-4  w-full px-10   absolute'>
   
         <h1 className='text-white tracking-wide mb-2 text-center font-semibold  text-2xl '>{cafe[7].title}</h1>
         <div className='flex justify-around'>
         <div class="flex justify-center items-center">
    <svg aria-hidden="true" class="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
     <p class="ml-2 text-md font-medium text-white dark:text-white ">{cafe[7].avgRate} - 5</p>
</div>   <p className='text-center font-semibold text-white'>July 4, 2023</p>
       
          </div></div>
    
    </div>
    
    
    
    
    <div style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)", backgroundSize:"cover"}}
         className='imageopacity mb-1  w-full  lg:w-[400px] relative h-[197px]'>
    <Link to={"/p/"+cafe[6]._id}>
     <img  className="w-full h-full object-cover opacity-60" alt='ddd' src={`https://reviewhub-backendf.onrender.com/${cafe[6].images[1]}`}></img>
    </Link> <div className='absolute cursor-pointer top-2 right-4 rounded-full w-max h-max p-2 bg-white' onClick={()=>{
          dispatch(AddToCart(cafe[6]))
        }}><FavoriteBorderOutlinedIcon />
       </div>
    <div className='bottom-4  w-full px-10   absolute'>
    
         <h1 className='text-white tracking-wide text-center font-semibold  text-2xl '>{cafe[6].title}</h1>
         <div className='flex  mt-4  justify-around'>
         <div class="flex  justify-center items-center">
    <svg aria-hidden="true" class="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      <p class="ml-2 text-md font-medium text-white dark:text-white ">{cafe[6].avgRate} - 5</p>
</div>    <p className='text-center font-semibold text-white'>July 4, 2023</p>
       
          </div></div>
    
    
     
    </div>
    
    
    
    
    <div style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)", backgroundSize:"cover" }}
          className='imageopacity mb-1  w-full  lg:w-[400px] relative h-[197px]'>
     <Link to={"/p/"+cafe[3]._id}>  
        <img  className="w-full h-full object-cover opacity-60" alt='ddd' src={`https://reviewhub-backendf.onrender.com/${cafe[3].images[0]}`}></img>
         </Link>  
   <div className='absolute cursor-pointer top-2 right-4 rounded-full w-max h-max p-2 bg-white' onClick={()=>{
          dispatch(AddToCart(cafe[3]))
        }}><FavoriteBorderOutlinedIcon />
       </div>
    <div className='bottom-4  w-full px-10   absolute'>
   
         <h1 className='text-white tracking-wide text-center font-semibold  text-2xl '>{cafe[3].title}</h1>
         <div className='flex  mt-4 justify-around'>
         <div class="flex  justify-center items-center">
    <svg aria-hidden="true" class="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
     <p class="ml-2 text-md font-medium text-white dark:text-white ">{cafe[3].avgRate} - 5</p>
</div>  <p className='text-center font-semibold text-white'>July 4, 2023</p>
       
          </div></div>
    
    
     
    </div>
    
    
      </div>
      <div  className=' h-full '>
       <div style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)", backgroundSize:"cover" }}
             className='imageopacity mb-1  w-full  lg:w-[400px] relative  h-[298px]'>
               <Link to={"/p/"+restaurant[5]._id}>    
                <img  className="w-full h-full object-cover opacity-60" alt='ddd' src={`https://reviewhub-backendf.onrender.com/${restaurant[5].images[0]}`}></img>
          </Link>
      <div className='absolute cursor-pointer top-2 right-4 rounded-full w-max h-max p-2 bg-white'onClick={()=>{
          dispatch(AddToCart(restaurant[5]))
        }}><FavoriteBorderOutlinedIcon />
       </div>
       <div className='bottom-10  w-full px-10   absolute'>
     <h1 className='text-white tracking-wide text-center font-semibold  text-3xl '>{restaurant[5].title}</h1>
         <div className='flex mt-4 justify-around'>
         <div class="flex  justify-center items-center">
    <svg aria-hidden="true" class="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
     <p class="ml-2 text-md font-medium text-white dark:text-white ">{restaurant[5].avgRate} - 5</p>
</div>
          <p className='text-center font-semibold text-white '>July 4, 2023</p>
       
          </div></div>
       </div>
       <div style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)", backgroundSize:"cover" }}
            className='imageopacity  w-full  lg:w-[400px] relative  h-[298px]'>
       <Link to={"/p/"+restaurant[7]._id}>   
          <img  className="w-full h-full object-cover opacity-60" alt='ddd' src={`https://reviewhub-backendf.onrender.com/${restaurant[7].images[0]}`}></img>
      </Link>  
      <div className='absolute cursor-pointer top-2 right-4 rounded-full w-max h-max p-2 bg-white'onClick={()=>{
          dispatch(AddToCart(restaurant[7]))
        }}><FavoriteBorderOutlinedIcon />
       </div>
       <div className='bottom-10  w-full px-10   absolute'>
      
         <h1 className='text-white tracking-wide text-center font-semibold  text-3xl '>{restaurant[7].title}</h1>
         <div className='flex mt-4 justify-around'>
         <div class="flex  justify-center items-center">
    <svg aria-hidden="true" class="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
     <p class="ml-2 text-md font-medium text-white dark:text-white ">{restaurant[7].avgRate} - 5</p>
</div>    <p className='text-center font-semibold text-white'>July 4, 2023</p>
       
          </div></div>


       </div>

      </div>
      
     
    </div>
    
    } 
    </div>
  )
}
