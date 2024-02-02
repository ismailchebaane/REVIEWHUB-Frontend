import React from 'react';
import { useState } from 'react';
import  axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
function Contact() {
 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setsubject] = useState('');
  const [alertt,setalert]=useState(false)
  const [loading,setloading]=useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true)
    axios
      .post("https://reviewhub-backendf.onrender.com/api/contact", {
        email,
        message,
        subject,
     
      })
      .then((res) => {
        
        if(res.status==200){
          setalert(true);
          setloading(false)
         }  else{
          alert('wrong email')
          
         }
        
      })
      .catch((error) => {
        console.error("Error sending email", error);
      });

   
  }

  return (
    <section class="mx-0   lg:mx-8 bg-white dark:bg-gray-900 mt-20  py-[110px] lg:py-[70px]  ">
   <div className={alertt?"alert  flex justify-between fixed  top-26 right-1 z-[999] max-w-sm alert-success shadow-lg":"hidden"}>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current  flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Message sent successfully !</span>
  </div>
  <CloseIcon  onClick={()=>{setalert(false)}} className="cursor-pointer" />
</div>
<div className={loading&&" w-16 fixed top-[50%] left-[50%] h-16 border-4 border-dashed rounded-full border-orangew animate-spin dark:border-orangew"}></div>

    <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-orangew dark:text-white">Contact Us</h2>
        <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <form onSubmit={handleSubmit} class="space-y-8">
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                <input name="email" type="email" id="email" class=" focus:border-t-transparent focus:outline-0 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"  value={email} onChange={e =>setEmail(e.target.value)} placeholder="name@gmail.com" required/>
            </div>
            <div>
                <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                <input type="text" name="subject" id="subject" class="  focus:border-t-transparent focus:outline-0 block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" value={subject} onChange={e =>setsubject(e.target.value)} required/>
            </div>
            <div class="sm:col-span-2">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                <textarea name='message' id="message" rows="6" class=" focus:border-t-transparent focus:outline-0 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."value={message} onChange={e =>setMessage(e.target.value)}></textarea>
            </div>
            <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-gray rounded-lg bg-orangew text-white sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-orange-300 ">Send message</button>
        </form>
    </div>
  </section>
  );
}

export default Contact;
