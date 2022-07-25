import React, { useState, useEffect } from 'react'
import {normalApi} from '../../services/api';
import { useNavigate } from "react-router-dom";

import ErrorAlert from '../../components/ErrorAlert';

const Login = ({history}) => {
  let [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  let result;
  const navigate = useNavigate();
  const handleSubmit = async(event)=>{
    event.preventDefault();
    console.log('result of the submit', email, password)
    
    try {
        result = await normalApi.post('/api/user/login', {email, password});

        localStorage.setItem('his-current-user-token', result.data.token);
        
        navigate('/dashboard');
    }
    catch (err) {
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message);
    }
  }
  const handleDelete = (event) => {
      setErrorMessage(null);
  }
  return (
      <>
      

    <div class="flex items-center py-16 justify-center min-h-max bg-gray-100">
        <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
            <h3 class="text-2xl font-bold text-center">Join us</h3>
            <form action="" method="POST" onSubmit={handleSubmit}>
                <div class="mt-4">
                    <div>
                        <label class="block" for="emal">Email</label>
                                <input type="email" placeholder="Email" onChange={event=> setEmail(event.target.value)}
                                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    </div>
                    <div class="mt-4">
                        <label class="block">Password</label>
                                <input type="password" placeholder="Password" onChange={event=> setPassword(event.target.value)}
                                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    </div>
                    {errorMessage ?(
            <ErrorAlert handleDelete={handleDelete} message={errorMessage}/>
          ): null }
                    
                    <div class="flex">
                        <button class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Log
                            In</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login