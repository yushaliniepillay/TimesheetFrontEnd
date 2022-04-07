import React from 'react'


const submitArray = (props) => {

    const cancel = () => {
        alert('Are you sure?');
        props.onDeleteSubmit(0);
    }
    //yg ni dia hantar ke database, the array lists
    const submitHandler = async e => { // Problematic method, need to refer back to VB
        //e.preventDefault();
        // try {
        //     const body = [...newArray];
        //     const response = fetch("/taskEntry/addTasks", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(body)
        //     });
        //     console.log(response);
        //     props.onDeleteSubmit();
        // } catch (err) {
        //     console.log("something went wrong");
        //     console.error(err.message)
        // }
    }

    const newArray = [...props.list];
    return (

        <div>
            <div className='flex'>
                <button
                    type="button"
                    onClick={() => { submitHandler(newArray) }}
                    className="items-center px-5 py-3 ml-6 text-md font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" >
                    Save
                </button>
            
                <button
                    type="button"
                    onClick={() => { cancel() }}
                    className="items-center px-5 py-3 ml-6 text-md font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" >
                    Cancel
                </button>
            </div>

        </div>
    )
}


export default submitArray