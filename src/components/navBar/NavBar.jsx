import React,{useState,useContext, useEffect} from 'react'
import { Link, useNavigate,  } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import {useSelector} from 'react-redux'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import imageup from "../../assets/Logoup.png"
import imagedown from "../../assets/Logodown.png"
import { motion } from "framer-motion"
export default function NavBar() {



   const Navigate=useNavigate()
  const {user}=useContext(AuthContext); 
  const [toggleCategory,setToggle]=useState(false)
 
  const[isClick,setIsClick]=useState(false)
  const [toggleSearch,setSearch]=useState(false)
  const [query, setQuery] = useState('');
  const {carts}=useSelector(item=>item.favorite)
  useEffect(()=>{
    localStorage.setItem("Favorite",JSON.stringify(carts))
   
     },[carts]) 
     
     const handleSubmit = (e) => {
      e.preventDefault();
      if(query){ 
         Navigate(`/search?q=${query}`);
    }
   
    };
    const userfb = JSON.parse(localStorage.getItem('user'))

  return (
    <div className=' fixed top-0 z-[999]  w-full'>
      
<header class="bg-white">
  <div class="container mx-auto px-4 py-4 flex justify-around items-center">


  <a href="/" class="flex flex-col items-center md:w-48 ml-2 mr-3">
  <motion.img  transition={{
        
      
        repeat: Infinity,
        duration:1.2
      }} 
      animate={{y:[-10,0,-10]}} 
      src={imageup} class="h-10" alt="REVIEWHUB-Logo">
        
      </motion.img>
  
  <img src={imagedown} class="h-6" alt="REVIEWHUB-Logo"></img>
</a>

    <div className='flex '>
  <div className="flex w-full flex-row   max-w-xs xl:max-w-lg 2xl:max-w-2xl xl:flex items-center justify-between ">

    <div class=" bg-gray-100  py-4 lg:py-0 xl:py-0 md:py-0 rounded-md  relative flex items-center">
    <button  onMouseLeave={()=>{setToggle(false)}} 
     onClick={()=>{setToggle(!toggleCategory)}} className={!toggleSearch?"pl-2   mr-4 font-bold flex items-center cursor-pointer ":"hidden"}>Categories </button>
    <div
  onMouseLeave={()=>{setToggle(false)}} onMouseEnter={()=>{setToggle(true)}}
  class={toggleCategory?"   flex flex-col absolute bg-white rounded-xl shadow-xl top-10 uppercase font-bold text-sm p-4 mr-4":"hidden"}
 
>

  
  <Link className="mb-2" reloadDocument to="/category/hotel">Hôtels</Link>
  <Link className="mb-2" reloadDocument to="/category/mall">Malls</Link>
  <Link className="mb-2" reloadDocument to="/category/cafe">cafes</Link>
  <Link className="mb-2" reloadDocument to="/category/restaurant">Restaurants</Link>
  <Link className="mb-2" reloadDocument to="/category/amusement park">Amusement Parks</Link>
</div><div className={toggleCategory?"":"hidden"} ><ArrowDropUpIcon fontSize="large" className={"absolute text-white left-20 top-5 "} /></div> 

    <form className='flex items-center border-l-4 border-white' onSubmit={handleSubmit} >
      <input  value={query} onChange={(e) => setQuery(e.target.value)} class="disabled:resize-none md:block lg:block hidden w-28 xl:w-full focus:border-t-transparent focus:outline-0 border-gray-300 bg-transparent font-semibold text-md py-4 px-2 xl:p-4" type="text" placeholder="I'm searching for ..." />
    <button className="">  <svg  aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="hidden cursor-pointer lg:block md:block  ml-auto h-5 xl:h-6 px-4 text-gray-500 svg-inline--fa fa-search fa-w-16 fa-9x"><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"></path></svg>
   </button>  </form>
    
    </div>
  <div className=' lg:hidden md:hidden cursor-pointer flex items-center h-full  bg-zinc-100 ' >{!toggleSearch?<SearchIcon  onClick={()=>{setSearch(!toggleSearch)}} className='mx-4 text-gray-500'  />:<CloseIcon   onClick={()=>{setSearch(!toggleSearch)}} className='mx-4 text-gray-500'  />}</div>  
    <form   onSubmit={handleSubmit} >
     <input  value={query} onChange={(e) => setQuery(e.target.value)} className={toggleSearch?"disabled:resize-none lg:hidden md:hidden bg-zinc-100  w-28 xl:w-full focus:border-t-transparent focus:outline-0 border-gray-300 bg-transparent font-semibold text-md py-4 px-2 xl:p-4":"hidden"} type="text" placeholder="I'm searching for ..."></input>
     </form>
   </div>
   </div>

  
      
   
        
   
    <div className=" flex items-center  ">
        {user ?<Link   to="/favorite" class="relative">
            <div  class="absolute -top-1 right-0 z-10 bg-orange-500 text-xs font-bold px-1 py-0.5 rounded-lg text-white">{carts?carts.length:0}</div>
            <motion.svg whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }} aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-9 lg:h-10 p-2 text-gray-500 svg-inline--fa fa-heart fa-w-16 fa-9x"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></motion.svg>
          </Link> :""}
        {
          user?<div  class="relative  ml-2">
          <svg onClick={()=>{setIsClick(!isClick)}}  aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="cursor-pointer h-9 lg:h-10  p-2 text-gray-500 svg-inline--fa fa-user fa-w-14 fa-9x"><path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path></svg>
       <div  onMouseEnter={()=>{setIsClick(true)}} onMouseLeave={()=>{setIsClick(false)}} className={isClick?"bg-white shadow-2xl border-t-2  border-b-2  rounded-2xl text-gray-600  pt-4 flex flex-col absolute right-1 h-40 w-60":"hidden"}>
       <Link className="flex justify-between border-b-2 h-full  pb-2 px-4" to="/setting"> <div><h1>Signed in as</h1>
        <h1 className="font-semibold max-w-sm text-black whitespace-normal">{user.username}</h1></div>
        <div className='rounded-full bg-orangew p-1'>
  <img
    className="h-10 w-10 object-cover rounded-full"
    src={user && user.profilePicture ? `https://reviewhub-backendf.onrender.com/uploads/${user.profilePicture}` : "https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o="}    alt="Profile picture"/>
</div>
</Link>
        <Link className=" border-b-2 py-2 px-4" to="/setting"> 
        <h1 className="cursor-pointer  text-black">Setting</h1></Link>
        <Link className="cursor-pointer  py-2 px-4" to="/logout"> 
        <h1 className="cursor-pointer  text-black">Sign out</h1></Link>
       </div>
        </div>:
        <div class=" flex items-center " >
          {<Link   to="/favorite" class="relative">
            <div  class="absolute -top-1 right-0 z-10 bg-orange-500 text-xs font-bold px-1 py-0.5 rounded-lg text-white">{carts?carts.length:0}</div>
            <motion.svg whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }} aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-9 lg:h-10 p-2 text-gray-500 svg-inline--fa fa-heart fa-w-16 fa-9x"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></motion.svg>
          </Link> }
  <div class="hidden md:flex lg:flex xl:flex   items-center space-x-1">
      <Link to="/login" class="py-5 h1 px-3">Login</Link>
      <Link to="/register" class="py-2 h1 px-3 bg-orangew hover:bg-orange-300 text-white hover:text-orange-800 rounded transition duration-300">Register</Link>
    </div>
    <Link to="/login" class="cursor-pointer flex items-center md:hidden lg:hidden xl:hidden ml-2" >
          <svg  aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-9 lg:h-10  p-2 text-gray-500 svg-inline--fa fa-user fa-w-14 fa-9x"><path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path></svg>
        </Link>
    </div>
        }  
       
       
       
        </div>
    
        
          
   
  </div>
  
  <hr></hr>
</header>
    </div>
  )
}