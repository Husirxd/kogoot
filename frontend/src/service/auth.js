"use client"
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
const CheckAuthStatus = ({redirect = false}) => {
  
    const [valid, setValid] = useState(false);
    useEffect(() => {
        if(document.cookie.includes('valid=true')){
            //return null;
            setValid(true);
        }
        document.cookie = "valid=true;max-age=120";
    },[])

    
    const router = useRouter();
    const accessToken = localStorage.getItem('token');
    if(!accessToken && redirect) {

        router.push('/account');
    }

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