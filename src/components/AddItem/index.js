import React from 'react'

const AddItem = (props) => {
    console.log(props);
    const handleSubmit = () => {
      
    }
  return (
    // <div>AddItem</div>
    <div class='flex justify-between  bg-gray-400'>
        <div class=''>
            <h1 class='m-2 px-6 py-2'>{props.name}</h1>
        </div>
        <div class="px-8">
        <button class="w-full pl-19 py-2 m-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={handleSubmit}>Add Item</button>
        </div>
    </div>
  )
}

export default AddItem