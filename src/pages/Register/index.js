import React, { useState } from 'react'
import { normalApi } from '../../services/api';
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
//   const [buttonState, setButtonState] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (event)=>{
    event.preventDefault();
    console.log('result of the submit', fullName, email, password, passwordConfirm, gender, dateOfBirth);
    try {   
        // if(passwordConfirm === password) {
        //     setButtonState(!buttonState);
        // }
        const result = await normalApi.post('/api/user/signup', {
            fullName, email, password, passwordConfirm, gender, dateOfBirth
        });
        navigate('/');
    } catch (error) {
        console.log(error.response);
    }

  }

  return (
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <h3 class="text-2xl font-bold text-center">Join us</h3>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <div class="mt-4">
                        <div>
                            <label class="block" for="Name">Full Name</label>
                                    <input type="text" placeholder="Full Name" onChange={(event)=>{setFullName(event.target.value)}}
                                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div class="mt-4">
                            <label class="block" for="email">Email</label>
                                    <input type="text" placeholder="Email" onChange={(event)=>{setEmail(event.target.value)}}
                                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div class="mt-4">
                            <label class="block" for="email">Date Of Birth</label>
                                    <input type="date" onChange={(event)=>{setDateOfBirth(event.target.value)}}
                                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div class="mt-4">
                                    <div class="inline-block relative w-64">
                                        <select onChange={(event)=>{setGender(event.target.value)}} class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" >
                                            <option>Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Others</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                        </div>
                        <div class="mt-4">
                            <label class="block">Password</label>
                                    <input type="password" placeholder="Password" onChange={event=> setPassword(event.target.value)}
                                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div class="mt-4">
                            <label class="block">Confirm Password</label>
                                    <input type="password" placeholder="Password" onChange={event=> setPasswordConfirm(event.target.value)}
                                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        {/* <span class="text-xs text-red-400">Password must be same!</span> */}
                        <div class="flex">
                            <button class="w-full px-6 py-2 mt-8 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                                Account</button>
                        </div>
                        <div class="mt-6 text-grey-dark">
                            Already have an account?
                            <a class="text-blue-600 hover:underline" href="#">
                                Log in
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Register