import {React,useContext} from 'react'
import { useNavigate } from "react-router-dom"
import {useEffect} from 'react'
import {AuthContext} from "../../components/AuthContext/AuthContext"
function Logout() {
    const Navigate = useNavigate()
    const {error,   loading ,dispatch  }=useContext(AuthContext);
    const logout  =async()=>{
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
    
    

    }
        useEffect(()=>{
logout();

        },[]) ;
    
   
   
   
   
   
  
}

export default Logout
