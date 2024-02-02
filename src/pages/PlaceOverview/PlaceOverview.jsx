import React,{useState,useEffect} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios"
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import L from 'leaflet';
import FlagIcon from '@mui/icons-material/Flag';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import {motion} from "framer-motion"

export default function PlaceOverview() {
  const [formValues, setFormValues] = useState({
    id:"",
  comments:  "",
    rate: "",
    
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value })};
    const [ID,setID] = useState({}) 
    const [text , settext] = useState("")
   


    const [isclicked, setisclicked] = useState(false)

    
  const [personId, setPersonId] = useState("");
  const [username, setUsername] = useState("");
  const [rate, setRate] = useState(0);
  const [comments, setComments] = useState("");
  const [location,setLocation]=useState({lat:0,lng:0});
  const [data, setData] = useState({});
  const [loading, setloading] = useState(true);
  const [nb, setnb] = useState(0);
  const [usermongo, setusermongo] = useState({});
  const [reportdone,setreportdone]=useState(false)
  const [reporterror,setreporterror]=useState(false)

  const {id}=useParams()
  
  const myIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [36, 36],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://reviewhub-backendf.onrender.com/api/p/${id}`);
        if(res.status===200){
             const totalRate = res.data.REVIEWS.reduce((sum, review) => sum + review.rate, 0);
        const avgRate = res.data.REVIEWS.length ? parseFloat((totalRate / res.data.REVIEWS.length).toFixed(1)) : 0;
        setData({ ...res.data, avgRate });
        console.log(data)
        setloading(false);
        
        const match = data.location.match(/@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)(z|)/);
       
        
      
        setLocation({ lat: parseFloat(match[1]), lng: parseFloat(match[2]) });
        }
     
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
  }, [data]);
  
  const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    setPersonId(user._id);
    setUsername(user.username);
    
  }, []);


  useEffect(() => {
    try {
    const ress=  axios.get(`https://reviewhub-backendf.onrender.com/api/users/${user._id}`).then(res=>{
        setusermongo(res.data) ;
         
   
     
    })
  
    if(ress.status===200){
     
     console.log(" successfully received mongo user !");
 }else{
     console.log(" failedd to  received mongo user  !");

 } 
  
        } catch (err) {
      console.error(err);
    }
    
  }, []);
  
  const handlelike = async (review) => {
    try {
      console.log(id)
      const response = await axios.put(`https://reviewhub-backendf.onrender.com/api/review/${id}/${review._id}/like`,{personId});
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handledislike = async(review) =>
  {
    try {
      const response = await axios.put(`https://reviewhub-backendf.onrender.com/api/review/${id}/${review._id}/dislike`,{personId});
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleSumbit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`https://reviewhub-backendf.onrender.com/api/review/${id}`, {
        personId:personId,
        username:username,
        pic:user.profilePicture,
        rate:rate,
        comments:comments,
        
      });

  
      if(response.status===200){
         console.log("Review added successfully!");

    }
      
     
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(ID)

    try {
      await axios.put(`https://reviewhub-backendf.onrender.com/api/review/${ID._id}`, {
        comments: formValues.comments ? formValues.comments : ID.comments,
        rate: formValues.rate ? formValues.rate : ID.rate, // fix camelCase
      });
      console.log(`Updated successfully.`);
      setisclicked(false)
      setreportdone(true)
      settext("Updated")
     
      setTimeout(() => {
        window.location.reload(true)

  
   },1000)

   // fix camelCase
    } catch (error) {
      console.error(`Error updating review: ${error}`); // fix spacing and capitalization
   setreportdone(false)
    }
  };
  
  
  const handleDelete = async (review) => {
    console.log(review);
    try {
      await axios.delete(`https://reviewhub-backendf.onrender.com/api/review/${review._id}`);
      console.log(`Review with ID ${review._id} deleted successfully.`);
      setreportdone(true)
      setisclicked(false)
      settext("Deleted")
      setTimeout(() => {
        window.location.reload(true)

  
   },1000)
    } catch (error) {
      console.error(`Error deleting review with ID ${review._id}: ${error}`);
      setreportdone(false)
    }
  };
  
  
const handleReport = async(review) => {
  await axios
  .post("https://reviewhub-backendf.onrender.com/api/contact", {
    email : user.email,
    message : "you have to delete rewiew with id" +review._id,
    subject : "Review Report",
 
  })

  .then((res) => {
    
    if(res.status==200){
    console.log(res.status)
    setreportdone(true)
    settext("Reported")
    setTimeout(() => {
      window.location.reload(true)


    },1000)
 setreporterror(false)
    
     }  else{
      console.log(res.status)
     

  }})
  .catch((error) => {
    console.error("Error sending email", error);
  });
  console.log(reportdone)
  
}

  
    return (
    <div className='relative'>

  {
 loading?<div>
    
 <div className="flex e  mt-80 items-center justify-center space-x-2">
<div className="w-4 h-4  rounded-full animate-bounce  bg-black"></div>
<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
<div className="w-4 h-4 rounded-full animate-bounce  bg-black"></div>
</div>

</div>:

<div className=''>

{reportdone && (

    <div className="bg-teal-100 flex fixed  items-center justify-center border-t-4 w-[180px] md:w-[360px] text-center lg:w-[600px] xl:w-[600px]  z-[999] top-[23%] left-[25%] border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
      <div className="flex justify-center items-center">
        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p className="font-bold "> Successfully {text} comment</p>
        </div>
      </div>
    </div>

)}

{reporterror && (
  setTimeout(() => {
    return (
      <div className="bg-teal-100 flex items-center justify-center border-t-4 w-[180px] md:w-[360px] text-center lg:w-[600px] xl:w-[600px] absolute z-999 top-[50%] left-[25%] border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex justify-center items-center">
          <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p className="font-bold">Something is wrong</p>
          </div>
        </div>
      </div>
    );
  }, 3000)
)}


<div class="py-6 mt-20">
 

   <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
    <div class="flex flex-col md:flex-row -mx-4">
     <div class="md:flex-1 px-4">
  <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
    <div class="h-64 md:h-80 rounded-lg  mb-4 flex items-center justify-center">
      <img class="w-full h-full object-cover" alt="lmùl" src={`https://reviewhub-backendf.onrender.com/${data.images[nb]}`}/>
    </div>
    <div class="flex flex-wrap justify-center">
      <div class="w-1/3 p-2">
        <img class="w-full h-full object-cover rounded-lg cursor-pointer border-4 border-gray-200" onClick={()=>{setnb(0)}} alt="lmùl" src={`https://reviewhub-backendf.onrender.com/${data.images[0]}`}/>
      </div>
      <div class="w-1/3 p-2">
        <img class="w-full h-full object-cover rounded-lg cursor-pointer border-4 border-gray-200" onClick={()=>{setnb(1)}} alt="lmùl" src={`https://reviewhub-backendf.onrender.com/${data.images[1]}`}/>
      </div>
      <div class="w-1/3 p-2">
        <img class="w-full h-full object-cover rounded-lg cursor-pointer border-4 border-gray-200" onClick={()=>{setnb(2)}} alt="lmùl" src={`https://reviewhub-backendf.onrender.com/${data.images[2]}`}/>
      </div>
    </div>
  </div>
</div>

      
      
      
      
      
      <div class="md:flex-1 lg:mt-0 mt-28 px-4">
        <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{data.title}</h2>
        <p class="text-gray-500 text-sm">By Admin
        </p>

        <div class="flex items-center space-x-4 my-4">
          <div>
  <div class="flex items-center mb-4 ">
    <svg  aria-hidden="true" class="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      <p class="ml-2 text-md font-medium text-gray-500 dark:text-gray-500 ">{data.avgRate} - 5</p>
</div>
          </div>
        
        </div>

        <p class="text-gray-500">{data.description}</p>

        <div class="flex justify-start py-4 space-x-4">
          <div class=" ">
           <h1 className="text-2xl font-semibold text-gray-600 mb-2">Location :</h1>
           <a href={data.location} target='_blank' class=" cursor-pointer flex items-center pb-4">
      <LocationOnOutlinedIcon className="text-gray-400" />
      <p className="ml-2 text-sm text-gray-600">{data.locationString}</p>
    </a> 
    
    <a href={data.location}  target='_blank'  >
           <div class="mapouter  w-full"><div class="gmap_canvas">
           <div className="gmap_canvas ">
      {  location.lat>0 &&  
         <MapContainer className="" center={[location.lat,location.lng]} zoom={12} style={{ height: "200px" ,width:"400px",zIndex:"9"}}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; '
            />
            <Marker  icon={myIcon} position={[location.lat,location.lng]}>
              <Popup>
               {data.title}
              </Popup>
            </Marker>
          </MapContainer>}
        </div> 
            </div></div>
            </a>
          </div>
          </div>
      </div>
    </div>
  </div>
  
  
  
</div>
 




<div class="flex items-center justify-center mt-20 mx-auto max-w-2xl">
  <form onSubmit={handleSumbit} class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
    <div class="flex flex-wrap -mx-3 mb-6">
      <img class="w-12 h-12 object-cover mr-2 rounded-full" src={user && user.profilePicture ? `http://localhost:4000/uploads/${user.profilePicture}` : "https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o="} />
      <div>
        <h2 class="px-4 pt-3 pb-2 font-semibold text-gray-800 text-lg">Add a new comment:</h2>
        <div className="flex px-4 mb-4 items-center rating rating-sm">
          {[1, 2, 3, 4, 5].map((value) => (
            <input key={value} onClick={() => { setRate(value) }} required type="radio" value={value} name="rating" className={`mask mask-star-2 bg-orange-400 ${rate >= value ? 'checked' : ''}`} />
          ))}
        </div>
      </div>

      <div class="w-full px-3 mb-2 mt-2">
        <textarea onChange={(e) => { setComments(e.target.value) }} class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type your comment' required></textarea>
      </div>
      <div class="w-full flex items-start px-3">
        <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
          <svg fill="none" class="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xs md:text-sm pt-px">Be honest with us.</p>
        </div>
        <div class="-mr-1">
          <input type='submit' class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment' />
        </div>
      </div>
    </div>
  </form>
</div>





<div class="  grid sm:grid-cols-1     md:grid-cols-2  gap-5      lg:grid-cols-3  my-10  ">
 
  {
   data.REVIEWS.map((review)=>{
    
    
    return(
      <div class="px-7">
    
      <div class="bg-white max-w-sm rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
            <div class="flex items-center  justify-between">        
            <div className="flex"><div>
            <img class="w-12 h-12 object-cover mr-2 rounded-full" src={review.pic ? `http://localhost:4000/uploads/${review.pic}` : "https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o="} />

              </div>
              <div class="text-sm font-semibold">
                <h1>{review.username}</h1>
                <div class="flex mt-2">
          {
           Array.from({ length: review.rate<6?review.rate:5 }, (_, index) => (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          
          ))
            
           }
           
          </div>    </div></div> 
              
             {usermongo._id=== review.personId?<div className='grid grid-cols-2 gap-4'>
               <DeleteIcon onClick={() => { handleDelete(review)}} className='text-red-500 cursor-pointer' />
                <EditIcon onClick={() => {setisclicked(true); ;setID(review);console.log(review)}}   className=' cursor-pointer' />
              </div>: <FlagIcon className='cursor-pointer' onClick={() =>{handleReport(review)} } />   }  
           </div> 
        
        <div class="mt-4">
         
          <p class="mt-4 text-md tracking-wide   break-words text-gray-600">{review.comments}</p>
          {usermongo._id=== review.personId?null
              : <div className='flex  justify-end'><motion.div whileHover={{scale:1.1}}><InsertEmoticonIcon onClick={() => { handlelike(review)}}       className="mx-1 cursor-pointer focus:outline-none"
              /></motion.div> {review.likes.length} <motion.div whileHover={{scale:1.1}}><MoodBadIcon className='mx-1  cursor-pointer' onClick={() => { handledislike(review)}}/></motion.div>  {review.dislikes.length} </div> }  
           </div> 
        </div>
      </div>
    
   )})
    
    
  }
  
  
  
</div>



</div>


}

<div className="flex items-center justify-center">
  <form onSubmit={handleUpdate} className={isclicked ? "z-[999] p-5 fixed top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999] bg-white rounded-lg shadow-xl w-11/12 sm:w-4/5 md:w-3/4 lg:w-[550px]" : "hidden"}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
        Comment:
      </label>
      <textarea
        type="text"
        id="comments"
        name="comments"
  
        onChange={handleInputChange}
        value={formValues.comments ? formValues.comments : ID.comments}
        placeholder="Enter your comment"
        className="shadow appearance-none resize-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
        Rate (1 to 5):
      </label>
      <input
        pattern="[1-5]"
        type="text"
        id="rate"
        name="rate"
        onChange={handleInputChange}
        value={formValues.rate ? formValues.rate : ID.rate}
        placeholder="Enter your rate"
        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
      <p className="text-red-500 text-xs italic">Please choose a rate from 1 to 5.</p>
    </div>
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={() => setisclicked(false)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Done
      </button>
    </div>
  </form>
  
</div>




</div>


    
  )
}
