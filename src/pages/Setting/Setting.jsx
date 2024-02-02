import React,{useState,useEffect,useContext} from 'react'
import BackupIcon from '@mui/icons-material/Backup';
import axios from 'axios';
import { AuthContext } from "../../components/AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function Setting() {
  const user = JSON.parse(localStorage.getItem('user'))
  
  const [username,setusername]=useState(user.username||"")
  const [city,setcity]=useState(user.city||"")
  const [country,setcountry]=useState(user.country||"")
  const [email,setemail]=useState(user.email||"")
  const [adress,setadress]=useState(user.address||"")
  const [age,setage]=useState(user.age||"")
  const [phone,setphone]=useState(user.phone||"")
  const [zip,setzip]=useState(user.zip||"")
  const [loading,setloading]=useState(false)
  const [confirmpassword,setconfirmpassword]=useState("")
  const [newpassword,setnewpassword]=useState("")
  const [file,setfile]=useState(null)
  const { dispatch } = useContext(AuthContext);
  console.log(user) 
  
  const userfb = JSON.parse(localStorage.getItem('user'))
 
    
    const Navigate = useNavigate()
    
       
  const  handleDeleteAccount=async(e)=>{
    e.preventDefault();

try {
await    axios.delete("https://reviewhub-backendf.onrender.com/api/users/delete/"+user._id).then( (res)=> {
      console.log(res.status)
       if(res.status===200){
        try {
          fetch("/logout",{
         method:"GET",
         crossDomain:true,
         headers:{
             "content-type":"application/json",
             Accept:"application/json",
             "Access-Control-Allow-Origin":"*",
         
         },credentials:"include"
         
         }).then((res)=>{res.json()
             if(res.status===401 ||!res||res.status===400){
            
             alert('logout later ')
     
             }else{
                 dispatch({type:"LOG_OUT"})
                 
                 Navigate('/')
                 window.location.reload()
             }
         
         }).then((data)=>{
             console.log(data)
             
         })
       } catch (error) {
         console.log(error)
       }
       localStorage.setItem("Favorite", null);
       
 
       
 
     
       
       
       
        alert("Delete ")
    
      
       }  else{
        alert('failed')
        
       }
      })
} catch (error) {

console.log(error)
} 
   
}

  
    
  const  handleUpdateInfo=async(e)=>{
    e.preventDefault();

try {
await    axios.put("https://reviewhub-backendf.onrender.com/api/users/"+user._id,{
         
         username:username,
         city:city,
         country:country,
         address:adress,
         age:age,
         phone:phone,
         zip:zip,
         email:email,
     
    }).then( (res)=> {
      console.log(res.status)
       if(res.status===200){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });   
      
        alert("updated")
    
      
       }  else{
        alert('failed')
        
       }
      })
} catch (error) {

console.log(error)
} 
   
}

  
    const handleUpdatePassword =async (e) => {
      
      e.preventDefault()
      if(newpassword===confirmpassword){
      
try {
  await    axios.put("https://reviewhub-backendf.onrender.com/api/users/update/password/"+user._id,{
           password:newpassword,
        
       
      }).then( (res)=> {
        console.log(res.status)
         if(res.status===200){
         
          alert("updated")
       
        
         }  else{
          alert('failed')
          
         }
        })
  } catch (error) {
  
  console.log(error)
  } }else{alert("verify your password")}
      
    }
    
    
    
    
    const handleFileSelect = (e) => {
      setfile(e.target.files[0]);
    };
    
    const updatePicture = async (e) => {
      e.preventDefault();
      
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        
        try {
          const response = await axios.put(`https://reviewhub-backendf.onrender.com/api/users/update/profilepicture/${user._id}`, formData);
        
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data });   
         
          alert("Updated");
          window.location.reload()
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("No file selected");
      }
    };

   
  return (
    <div className='bg-zinc-50 px-10 pt-28 h-max pb-20 w-full' >
   { <> <h1 className="font-semibold p my-4 text-3xl">User settings</h1>
      <div className=" 2 div  lg:flex justify-around ">
      <div className="bg-white lg:mb-0 mb-4 h-max mr-4 flex justify-center flex-col items-center w-full lg:w-1/4 rounded-2xl shadow-xl px-5 py-4">
      <img class="object-cover h-20 w-20 rounded-2xl " src={user && user.profilePicture ? `https://reviewhub-backendf.onrender.com/uploads/${user.profilePicture}`  : "https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o="} alt="ss" />

     
       <h1 className='text-lg my-2 font-semibold'>{user.username}</h1>
       <div class="flex   items-center justify-center bg-gray-100">
      <label class="  whitespace-normal flex flex-col items-center px-4 py-2 bg-white text-orange-400 rounded-lg shadow-lg tracking-wide uppercase border border-orange-600 cursor-pointer hover:bg-orange-500 hover:text-white">
        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        
        <span class="mt-2 text-base text-center leading-normal">Update profile picture</span>
        <input type='file' className=' whitespace-normal' class="hidden" onChange={handleFileSelect} ></input><h1 className=' whitespace-normal'>{file&&file.name} </h1>
        
        
    </label>
   
</div>
      <button  
       onClick={updatePicture}
       className={file?"py-3 mt-4 px-5 text-sm font-medium text-center text-gray rounded-lg bg-orangew text-white sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-orange-300 ":"hidden"}>
        Update picture
      </button>
    </div>
    <div className="rightSide flex  flex-col">
    <form onSubmit={handleUpdateInfo} className='bg-white rounded-xl px-6 py-6 lg:w-max h-max shadow-lg'>
      <h1 className="text-2xl mb-2 font-semibold">General information</h1>
      <div className="lg:flex  md:flex justify-between">
      <div className=" lg:mr-6 lg:pl-2">
        <h1 className="font-semibold">Username</h1>
        <input required value={username} onChange={(e)=>{setusername(e.target.value)}}  className="rounded-full lg:w-80 md:lg:w-80 w-full bg-zinc-100   focus:border-t-transparent focus:outline-0 p-2 mt-1 mb-4" placeholder='username' type="text" name="username" />
        <h1 className="font-semibold">Country</h1>
        <input  value={country} onChange={(e)=>{setcountry(e.target.value)}} className="rounded-full lg:w-80 md:lg:w-80 w-full bg-zinc-100   focus:border-t-transparent focus:outline-0  p-2 mt-1 mb-4" 
        placeholder='Country' type="text" name="country" />
        <h1 className="font-semibold">Address</h1>
        <input  value={adress} onChange={(e)=>{setadress(e.target.value)}}  className="rounded-full  lg:w-80 md:lg:w-80 w-full bg-zinc-100   focus:border-t-transparent focus:outline-0  p-2 mt-1 mb-4" 
        placeholder='Address' type="text" name="adress" />
        <h1 className="font-semibold">Phone Number</h1>
        <input    value={phone} onChange={(e)=>{setphone(e.target.value)}} className="rounded-full  lg:w-80 md:lg:w-80 w-full bg-zinc-100   focus:border-t-transparent focus:outline-0  p-2 mt-1 mb-4"
         placeholder='+216xxxxxxxx' type="text" name="phone" />
       
        
      
      </div>
      <div className="">
        <h1 className="font-semibold">City</h1>
        <input     value={city} onChange={(e)=>{setcity(e.target.value)}}    className="rounded-full  lg:w-80 md:lg:w-80 w-full bg-zinc-100  focus:border-t-transparent focus:outline-0  p-2 mt-1 mb-4"
         placeholder='City' type="text" name="city" />
        <h1 className="font-semibold">Email</h1>
        <input required  value={email} onChange={(e)=>{setemail(e.target.value)}}  className="rounded-full  lg:w-80 md:lg:w-80 w-full bg-zinc-100   focus:border-t-transparent focus:outline-0  p-2 mt-1 mb-4" 
        placeholder='example@gmail.com' type="email" name="email" />
        <h1  className="font-semibold">Age</h1>
        <input  value={age} onChange={(e)=>{setage(e.target.value)}}  className="rounded-full  lg:w-80 md:lg:w-80 w-full bg-zinc-100   focus:border-t-transparent focus:outline-0  p-2 mt-1 mb-4" 
        placeholder='age' type="text" name="age" />

        <h1 className="font-semibold">Zip/postal code</h1>
        <input    value={zip} onChange={(e)=>{setzip(e.target.value)}} className="rounded-full  lg:w-80 md:lg:w-80 w-full bg-zinc-100   focus:border-t-transparent focus:outline-0  p-2 mt-1 mb-4" 
        placeholder='Zip/postal code' type="text" name="zip" />
        
      
      </div>
     
      </div>
      <button class="bg-orangew mt-2 flex items-center lg:ml-2 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-600 hover:border-orange-500 rounded">
      <BackupIcon fontSize='small' className="mr-2 " />Save all
</button>
    </form>
    <form onSubmit={handleUpdatePassword} className="passworddiv bg-white rounded-xl px-6 py-6 w-full h-max mt-6 shadow-lg">
    <h1 className="text-2xl mb-2 font-semibold">Password information</h1>
      <div className="lg:flex lg:justify-between justify-start md:flex ">
        <div  className="lg:flex   md:flex flex-col md:mr-4 lg:mr-4">
        <h1 className="font-semibold">New password</h1>
        <input required  value={newpassword} onChange={(e)=>{setnewpassword(e.target.value)}} className="rounded-full  lg:w-80 md:lg:w-80 w-full bg-zinc-100   focus:border-t-transparent focus:outline-0  p-2 mt-1 mb-4"
         placeholder='••••••••' type="password" name="newpassword" />
       
          </div>
      <div>
        <h1 className="font-semibold">Confirm password</h1>
        <input required  value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)}} className="rounded-full  lg:w-80 md:lg:w-80 w-full bg-zinc-100   focus:border-t-transparent focus:outline-0  p-2 mt-1 mb-4" 
        placeholder='••••••••' type="password" name="confirmpassword" />
        

      </div>
      </div>

         <button class="bg-orangew flex items-center justify-center w-max hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-600 hover:border-orange-500 rounded">

      <BackupIcon fontSize='small' className="mr-2 " />Save all
</button>
<button onClick={handleDeleteAccount} class="bg-orangew mt-4 flex items-center justify-center w-max hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-600 hover:border-orange-500 rounded">

Delete account 
</button>
    </form>
 
    
    
    </div>
    
    
    
    </div>
    </>} 
    </div>
  )
}
