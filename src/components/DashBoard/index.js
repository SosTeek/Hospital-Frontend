import React from 'react'
import DashboardItems from '../DashboardItems';
import{ authApi } from '../../services/api';
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
    const navigate = useNavigate();
    const handleSubmit = async(event, data) =>{
        event.preventDefault();
        try {
            // console.log(accessToken)
            // let result = await authApi.get('/api/hospital');
            // let result = await authApi.get(`/api/${data}`);
            // result = result.data.data;
            // console.log(result);
            let result;
            const getAll = async () =>{
                result = await authApi.get(`/api/${data}`);
                result = result.data.data;
                return result;
            }
            result = await getAll();
            navigate(`/${data}`, {state: result});
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
  return (
    //   <div>Dashnoard</div>
    <div class="flex h-screen">
            <div class="w-full px-4 py-2 bg-gray-300 lg:w-full">
                <div class="container w-11/12 mx-auto mt-12">
                    <div class="grid gap-14 lg:grid-cols-3">
                        <DashboardItems itemName="Hospital" onclick={(event)=> {handleSubmit(event, 'hospital')}} />
                        <DashboardItems itemName="Lab" onclick={(event)=> {handleSubmit(event, 'lab')}}/>
                        <DashboardItems itemName="Blood Bank" onclick={(event)=> {handleSubmit(event, 'bloodbank')}}/>
                        <DashboardItems itemName="Office" onclick={(event)=> {handleSubmit(event, 'office')}}/>
                        <DashboardItems itemName="User" onclick={(event)=> {handleSubmit(event, 'user')}}/>
                        <DashboardItems itemName="Patient" onclick={(event)=> {handleSubmit(event, 'patient')}}/>
                        <DashboardItems itemName="Doctor" onclick={(event)=> {handleSubmit(event, 'doctor')}}/>
                        <DashboardItems itemName="Ambulance" onclick={(event)=> {handleSubmit(event, 'ambulance')}}/>
                        <DashboardItems itemName="Product" onclick={(event)=> {handleSubmit(event, 'product')}}/>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default DashBoard