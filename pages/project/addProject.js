import React, { Fragment } from 'react'
import { toast } from "react-toastify";
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, XIcon } from '@heroicons/react/solid'
import { ClipboardCheckIcon } from '@heroicons/react/outline'

const addProject = () => {

    const [projectTitle, setProjectTitle] = React.useState('')
    const [clientName, setClientName] = React.useState('')
    const [projectDate, setProjectDate] = React.useState('')
    const [projectDescription, setProjectDescription] = React.useState('')

    //trying for alert message 
    function alerts() {
        return (
            <div className="p-4 rounded-md bg-green-50">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon className="w-5 h-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">Successfully added</p>
                    </div>
                    <div className="pl-3 ml-auto">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                type="button"
                                className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                            >
                                <span className="sr-only">Dismiss</span>
                                <XIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //insert new record in strapi
    async function addProj() {

        const projectInfo = {
            data: {
                Title: projectTitle,
                ClientName: clientName,
                DateAdded: projectDate,
                Description: projectDescription
            }

        }
        const { API_URL } = process.env
        console.log(JSON.stringify(projectInfo));

        const add = await fetch(`${API_URL}/api/projects`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectInfo)
        })
        if (projectInfo == '') {
            toast.error("Please fill in the Input Field")
        }

        if (!add.ok) {
            toast.error("Something went wrong!")
        } else {
            const addResponse = await add.json()
           
            toast.success('Sucessfully added');
            console.log(addResponse)
        }

    }

    //modal pop up 
    const [modalFormOpen, setModalFormOpen] = React.useState(false)
    const [modalSelected, setModalSelected] = React.useState(0)
    const handleShow = (index) => {
        setModalSelected(index)
        setModalFormOpen(true)
        console.log(index)
    }

    return (
        <div>
            <button className='inline-flex items-center px-5 py-3 ml-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                type='submit'
                onClick={() => handleShow()}>
                Add New Project
            </button>

            {/* modal popup */}
            <Transition.Root key={[modalSelected]} show={modalFormOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setModalFormOpen}>
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                                        <ClipboardCheckIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Add new project
                                        </Dialog.Title>
                                        <form className='flex-wrap p-0 px-3 modal-body'>
                                            <label className="block px-1 py-1">
                                                <span className="block font-medium text-md text-slate-700">Employee ID</span>
                                                <input type="number"
                                                    disabled
                                                    className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                            </label>
                                            <label className="block px-1 py-2">
                                                <span className="block font-medium text-md text-slate-700">Project Name</span>
                                                <input type="text"
                                                    onChange={e => setProjectTitle(e.target.value)}
                                                    value={projectTitle}
                                                    className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                            </label>
                                            <label className="block px-1 py-2">
                                                <span className="block font-medium text-md text-slate-700">Client Name</span>
                                                <input type="text"
                                                    onChange={e => setClientName(e.target.value)}
                                                    value={clientName}
                                                    className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                            </label>
                                            <label className="block px-1 py-1">
                                                <span className="block font-medium text-md text-slate-700">Date</span>
                                                <input type="date"
                                                    onChange={e => setProjectDate(e.target.value)}
                                                    value={projectDate}
                                                    className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                            </label>
                                            <label className="block px-1 py-2">
                                                <span className="block font-medium text-md text-slate-700">Project Description</span>
                                                <textarea
                                                    onChange={e => setProjectDescription(e.target.value)}
                                                    value={projectDescription}
                                                    className="block h-auto px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                            </label>
                                        </form>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">

                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 sm:mt-6">
                                    <button
                                        type='button'
                                        onClick={() => addProj()}
                                        className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm'>
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={() => setModalFormOpen(false)}>
                                        Go back to list
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* <Modal
                key={[modalSelected]}
                className="flex justify-center py-5"
                isOpen={modalFormOpen}
                toggle={() => setModalFormOpen(false)}>

                <div className=" modal-header">
                    <label className="inline-block px-10 py-3 mt-3 font-serif text-xl font-bold">Project Info</label>
                    <Button
                        color="secondary"
                        type="button"
                        onClick={() => setModalFormOpen(false)}>
                        Close
                    </Button>
                </div>
                <ModalBody>
                    <form className='flex-wrap p-0 px-3 modal-body'>
                        <label className="block px-1 py-1">
                            <span className="block font-medium text-md text-slate-700">Employee ID</span>
                            <input type="number"
                                disabled
                                className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        </label>
                        <label className="block px-1 py-2">
                            <span className="block font-medium text-md text-slate-700">Project Name</span>
                            <input type="text"
                                onChange={e => setProjectTitle(e.target.value)}
                                value={projectTitle}
                                className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        </label>
                        <label className="block px-1 py-2">
                            <span className="block font-medium text-md text-slate-700">Client Name</span>
                            <input type="text"
                                onChange={e => setClientName(e.target.value)}
                                value={clientName}
                                className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        </label>
                        <label className="block px-1 py-1">
                            <span className="block font-medium text-md text-slate-700">Date</span>
                            <input type="date"
                                onChange={e => setProjectDate(e.target.value)}
                                value={projectDate}
                                className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        </label>
                        <label className="block px-1 py-2">
                            <span className="block font-medium text-md text-slate-700">Project Description</span>
                            <textarea
                                onChange={e => setProjectDescription(e.target.value)}
                                value={projectDescription}
                                className="block h-56 px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        </label>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button
                        type='button'
                        onClick={() => addProj()}
                        className='p-2 m-2 text-white duration-300 bg-green-600 rounded-full shadow hover:bg-green-700'>
                        Save
                    </button>
                </ModalFooter>
            </Modal>
             */}
        </div >
    )
}

export default addProject