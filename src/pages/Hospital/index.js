import React , { useState, useEffect } from 'react'
import SideNav from '../../components/NavBar/SideNav';
import AddItem from '../../components/AddItem';
import { useLocation } from "react-router-dom";
import logo from '../../assets/images/logo1.png';
import {NotificationContainer, NotificationManager} from 'react-notifications';

// import UpdateModal from './updateModal';

import {authApi} from '../../services/api';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import AddHospital from './AddHospital';
// import Input from "@material-tailwind/react/Input";
// import "@material-tailwind/react/tailwind.css";
//npm install --save react-geocode
// import 'flowbite';

const Hospital =   () => {
    let {state} = useLocation();
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // const [showDeleteModal, setShowDeleteModal] = useState(false);
    let [data, setData] = useState();
    const handleOpen =  async(id) => {
        const result = await getEditData(id);
        setData(result);
        if(data){
            setShowModal(true);
        }
    };
    const handleClose = () => setShowModal(false);
    const [hospitalName, setHospitalName] = useState();
    const [hospitalAddress, setHospitalAddress] = useState();
    const [hospitalPhone, setHospitalPhone] = useState();
    const [hospitalDescription, setHospitalDescription] = useState();
    const [image, setImage] = useState(null);
    const [id, setId] = useState();
    const onImageChange = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    }

    const getEditData = async (hospitalId) => {
        const result = await authApi.get(`/api/hospital/${hospitalId}`);
        setId(hospitalId);
        data = result.data.Hospital.doc;
        return data;
    }
    const handleUpdate = async (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('hospitalName', hospitalName);
        formData.append('hospitalAddress', hospitalAddress);
        formData.append('phone', hospitalPhone);
        formData.append('description', hospitalDescription);
        formData.append('image', image);

        await authApi.patch(`/api/hospital/${id}`, formData);

        setShowModal(false);

        let result = await authApi.get(`/api/hospital`);
        state = result.data.data;
        // window.location.reload(false);

    }
    const handleDelete=async (id)=>{
        console.log('hello', id)
        await authApi.delete(`/api/hospital/${id}`);
        // setShowDeleteModal(true);
        NotificationManager.success(null, 'Hospital Deleted Successfully!!', 4000, null, null, '');

    }
  return (
    // <div>Hospital</div>
    <div class='flex'>
      <div class='flex-none'>
        <SideNav varient='primary' />
      </div>
      <div class='flex-auto'>
      <div class="flex flex-grow-0 flex-col mt-8">
        <div class="pl-8 -ml-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
            class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            {/* <AddItem name='Hospital'/> */}
            <div class='flex justify-between  bg-gray-400'>
                <div class=''>
                    <h1 class='m-2 px-6 py-2'>Hospital</h1>
                </div>
                <NotificationContainer class='pt-3' />
                <div class="px-8">                                                                      
                    <button class="w-full pl-19 py-2 m-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={() => setCreateModalOpen(true)}>Add Hospital</button>
                </div>
            </div>
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Hospital Name</th>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Address</th>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Phone Number</th>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Edit</th>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Delete</th>
                    </tr>
                </thead>

                <tbody class="bg-white">
                    {
                        state.map((item) =>(
                            <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 w-10 h-10">
                                    <img class="w-10 h-10 rounded-full"
                                        src={logo}
                                        alt="admin dashboard ui" />
                                </div>

                                <div class="ml-4">
                                    <div class="text-sm font-medium leading-5 text-gray-900">
                                        {item.hospitalName}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-500">{item.hospitalAddress}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span
                                class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{item.phone}</span>
                        </td>

                        <td
                            class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 cursor-pointer" >
                            <button type="button" 
                            onClick={() =>{handleOpen(item.id)}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            {
                                data ? (
                                    // < UpdateModal />
                                <Modal className='w-full' size="regular" active={showModal} toggler={() => setShowModal(false)}>
                                    <ModalHeader className='flex'>
                                        <p className="absolute pt-2 pr-5 inset-y-0 right-0 ">Hospital</p>
                                    </ModalHeader>
                                    <ModalBody>
                                    <form className='border-current	'>
                                        <div class="relative z-0 mb-6 w-full group">
                                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hospital Name</label>
                                        <input type="text" id="small-input" onChange={(event)=>{setHospitalName(event.target.value)}} class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={data.hospitalName}/>
                                        </div>
                                        <div class="grid xl:grid-cols-2 xl:gap-6">
                                            <div class="relative z-0 mb-6 w-full group">
                                                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                                                <input type="text" id="small-input" onChange={(event)=>{setHospitalAddress(event.target.value)}} class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.hospitalAddress}/>
                                            </div>
                                            <div class="relative z-0 mb-6 w-full group">
                                                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contact Number</label>
                                                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={(event)=>{setHospitalPhone(event.target.value)}} name="phone" id="phone" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.phone}/>
                                            </div>
                                        </div>
                                        <div class="grid xl:grid-cols-2 xl:gap-6">
                                            <div class="relative z-0 mb-6 w-full group">
                                                <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hospital Description</label>
                                                <input type="text" id="large-input" onChange={(event)=>{setHospitalDescription(event.target.value)}} class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.description}/>
                                            </div>
                                            <div class="relative z-0 mb-6 w-full group">
                                            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Hospital Image</label>
                                            <input type="file" onChange={onImageChange} />
                                            </div>
                                        </div>
                                        </form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button 
                                            color="red"
                                            buttonType="link"
                                            onClick={handleClose}
                                            ripple="dark"
                                        >
                                            Close
                                        </Button>
                                        {/* <Button
                                            color="green"
                                            onClick={handleClose}
                                            ripple="light"
                                        >
                                            Save Changes
                                        </Button> */}
                                        <button type="button" class="focus:outline-none text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={handleUpdate}>Update</button>
                                        {/* <button type="button" class="focus:outline-none text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={event =>{ handleUpdate(item.id)}}>Update</button> */}

                                    </ModalFooter>
                                </Modal>
                                    ) : null
                            }
                            
                        </td>
                        <td
                            class="px-6 py-4 mt-3 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 cursor-pointer"type="button" data-modal-toggle="update-modal">
                            <button type="button" data-modal-toggle="popup-modal" onClick={() =>{handleDelete(item.id)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-400"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </ button>
                            {/* {showDeleteModal ? 
                            <Modal className='w-full' size="regular" active={showDeleteModal} toggler={() => setShowDeleteModal(false)}>
                            
                            <ModalHeader className='flex'>
                                <p className="absolute pt-2 pr-5 inset-y-0 right-0 ">Delete Hospital</p>
                            </ModalHeader>
                            <ModalBody>
                                <p class='pt-4'>Are You Sure you want to delete this Hospital?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button 
                                    color="red"
                                    // buttonType="link"
                                    onClick={() =>{handleDeleteHospital(item.id)}}
                                    // ripple="dark"
                                >
                                    Delete Hospital
                                </Button>
                                <Button 
                                    color="green"
                                    // buttonType="link"
                                    onClick={() =>setShowDeleteModal(false)}
                                    // ripple="dark"
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                         : null
                            } */}
                           </td>
                    </tr>
                        ))
                    }

                </tbody>
            </table>
            <AddHospital createModalOpen={createModalOpen} setCreateModalOpen={setCreateModalOpen}  />
        </div>
        </div>
      </div>
      </div>

    </div>

  )
}

export default Hospital