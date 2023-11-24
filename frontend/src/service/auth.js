"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const CheckAuthStatus = ({redirect = false}) => {
  

    const router = useRouter();
    const [valid, setValid] = useState(false);
    const [accessToken,setAccessToken] = useState(null);
    useEffect(() => {
        if(document.cookie.includes('valid=true')){
            //return null;
            setValid(true);
        }
        document.cookie = "valid=true;max-age=120";
        setAccessToken(localStorage.getItem('token'));
        
    },[])

    
  

    if(!valid) return null;

    fetch('http://localhost:8080/auth/validate',{
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.statusCode == 401){
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            if(redirect) {
                router.push('/account');
            }
        }
    })
    .catch((err)=>{
    
        if(err.statusCode == 401){
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            if(redirect) {
                router.push('/account');
            }
        }
    })
    return null;
}
export default CheckAuthStatus;