import React, { Fragment } from 'react'
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { Dialog, Transition } from '@headlessui/react'
import { ClipboardCheckIcon } from '@heroicons/react/outline'
import moment from 'moment';
import fetch from 'isomorphic-unfetch'
import AddProject from '../project/addProject'
import EditProject from '../project/editProject';

const viewProject = ({ projects, id }) => {

    console.log(projects.data)

    const [modalFormOpen, setModalFormOpen] = React.useState(false);
    const [modalSelected, setModalSelected] = React.useState(0);

    const [idProject, setIdProject] = React.useState([]);//get all id from Database 

    const [Title, setProjectTitle] = React.useState(projects.data[modalSelected].attributes.Title)
    const [ClientName, setClientName] = React.useState(projects.data[modalSelected].attributes.ClientName)
    const [DateAdded, setProjectDate] = React.useState(projects.data[modalSelected].attributes.DateAdded)
    const [Description, setProjectDescription] = React.useState(projects.data[modalSelected].attributes.Description)

    const handleShow = (index) => {
        setModalSelected(index);
        setModalFormOpen(true);
        console.log(index);
    }

    function className(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    

    //update new record in strapi
    async function editProj(e) {
        e.preventDefault();
        const projectInfo = {
            data: {
                Title: Title,
                ClientName: ClientName,
                DateAdded: DateAdded,
                Description: Description
            }

        }
        const { API_URL } = process.env
        console.log(JSON.stringify(projectInfo));

        const update = await fetch(`${API_URL}/api/projects/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectInfo)
        })

        const updateResponse = await update.json()

        console.log(updateResponse)
    }

    return (
        <div>
            <div className="px-4 py-5 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">PROJECTS</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the projects details.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        {/* modal pop up to add new project */}
                        <AddProject />
                    </div>
                </div>

                {/* view and edit existing project */}
                <div className="flex flex-col mt-8">
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                                <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                Project Name</th>
                                            <th scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                Date Added</th>
                                            <th scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                Client Name</th>
                                            <th scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                Project Description</th>
                                            <th scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {projects.data.map((project, index) => (
                                            <tr key={project.id}>
                                                <td className={className(
                                                    index !== project.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {project.attributes.Title}
                                                </td>
                                                <td className={className(
                                                    index !== project.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {moment(project.attributes.DateAdded).format('DD-MM-yyyy')}
                                                </td>
                                                <td className={className(
                                                    index !== project.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {project.attributes.ClientName}
                                                </td>
                                                <td className={className(
                                                    index !== project.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {project.attributes.Description}
                                                </td>
                                                <td className={className(
                                                    index !== project.length - 1 ? 'border-b border-gray-200' : '',
                                                    'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                                                )}>
                                                    <button onClick={() => handleShow(index)}
                                                        data-target={`#id${project.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900">
                                                        Edit<span className="sr-only">, {project.attributes.Title}</span>
                                                    </button>
                                                    {/* <button className='text-indigo-600 hover:text-indigo-900'
                                                        type='submit'
                                                        onClick={() => handleShow(index)}>
                                                        Edit
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* modal popup */}
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
                                            onClick={() => editProj(projects)}
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

        </div>
    )
}

//get data from strapi
export async function getStaticProps() {
    const { API_URL } = process.env

    const res = await fetch(`${API_URL}/api/projects`)
    const data = await res.json()

    return {
        props: {
            projects: data
        }
    }
}



export default viewProject