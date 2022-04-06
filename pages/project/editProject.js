import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ClipboardCheckIcon } from '@heroicons/react/outline'
import moment from 'moment';
import fetch from 'isomorphic-unfetch'



const editProject = ({projects}) => {

    const [modalFormOpen, setModalFormOpen] = useState(true);
    const [modalSelected, setModalSelected] = useState(0);

    return (

        <div>

            <Transition.Root key={projects.data[modalSelected].id} show={modalFormOpen} as={Fragment}>
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
                                    <div className="mt-3 mb-4 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Update Project Details
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
                                                    value={projects.data[modalSelected].attributes.Title}
                                                    className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                            </label>
                                            <label className="block px-1 py-2">
                                                <span className="block font-medium text-md text-slate-700">Client Name</span>
                                                <input type="text"
                                                    onChange={e => setClientName(e.target.value)}
                                                    value={projects.data[modalSelected].attributes.ClientName}
                                                    className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                            </label>
                                            <label className="block px-1 py-1">
                                                <span className="block font-medium text-md text-slate-700">Date</span>
                                                <input type="date"
                                                    onChange={e => setProjectDate(e.target.value)}
                                                    value={projects.data[modalSelected].attributes.DateAdded}
                                                    className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                            </label>
                                            <label className="block px-1 py-2">
                                                <span className="block font-medium text-md text-slate-700">Project Description</span>
                                                <textarea
                                                    onChange={e => setProjectDescription(e.target.value)}
                                                    value={projects.data[modalSelected].attributes.Description}
                                                    className="block h-auto px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                            </label>
                                        </form>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">

                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type='button'
                                        onClick={() => editProj(projects.id)}
                                        className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm'>
                                        Save changes
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
        </div>
    )
}

export async function getStaticProps() {
    const { API_URL } = process.env
    console.log(JSON.stringify(projectInfo));

    const update = await fetch(`${API_URL}/api/projects/${projects.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectInfo)
    })

    const updateResponse = await update.json()

    console.log(updateResponse)
}

export default editProject