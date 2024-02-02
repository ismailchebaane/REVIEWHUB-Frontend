import React,{useEffect} from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch,useSelector } from 'react-redux';
import { AddToCart } from '../redux/CartSystem';
import { Link } from 'react-router-dom';

export default function Card(props) {
  const {carts}=useSelector(item=>item.favorite)
  useEffect(()=>{
    localStorage.setItem("Favorite",JSON.stringify(carts))
   
     },[carts]) 
     const dispatch=useDispatch()
   
  return (
    <div class="max-w-xs relative lg:mb-2 mb-2 overflow-hidden shadow-md rounded-xl bg-white">
    <div class="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
         onClick={() => {
           dispatch(AddToCart(props))
         }}>
      <FavoriteBorderOutlinedIcon className="text-gray-400 hover:text-red-500 transition-colors duration-300 ease-in-out" />
    </div>
    <Link to={"/p/"+props._id}>
    <img class="w-full h-60 object-cover rounded-t-xl" src={`https://reviewhub-backendf.onrender.com/${props.image[0]}`} alt="ss" />
  </Link>  <div class="px-6 pt-4">
  <Link to={"/p/"+props._id}>
     <div class="font-bold text-2xl text-gray-800 mb-2">{props.title}</div>
    </Link>  <div class="flex items-center mb-4">
      <p className='hidden'>{props.description.substring(0,80)+"..."}</p>
        
<svg aria-hidden="true" class="w-5 h-5  text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <p class="ml-2 text-md font-medium text-gray-500 dark:text-gray-500">{props.avgRate?props.avgRate:0} - 5</p>
      </div>
    </div>
    <div class="px-6 flex items-center pb-4">
      <LocationOnOutlinedIcon className="text-gray-400" />
      <p className="ml-2 text-sm text-gray-600">{props.locationString}</p>
    </div>
  </div>

  )
}
