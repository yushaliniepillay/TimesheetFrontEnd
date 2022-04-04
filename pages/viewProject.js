import React from 'react'
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import fetch from 'isomorphic-unfetch'
import AddProject from './addProject'

const viewProject = ({ projects }) => {

    console.log(projects.data)

    const [modalFormOpen, setModalFormOpen] = React.useState(false);
    const [modalSelected, setModalSelected] = React.useState(0);

    const handleShow = (index) => {
        setModalSelected(index);
        setModalFormOpen(true);
        console.log(index);
    }
    function className(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <div className="px-4 py-5 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">PROJECTS</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the projects.
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
                                            <th
                                                scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                            >Project Name</th>
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
                                                    {project.attributes.DateAdded}
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
                                                    <button onClick={() => handleShow(index)} className="text-indigo-600 hover:text-indigo-900">
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


            <div>
                <Modal
                    key={projects.data[modalSelected].id}
                    className="flex justify-center py-5"
                    isOpen={modalFormOpen}
                    toggle={() => setModalFormOpen(false)} >

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
                                <input type="number" disabled className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                            <label className="block px-1 py-2">
                                <span className="block font-medium text-md text-slate-700">Project Name</span>
                                <input type="text" value={projects.data[modalSelected].attributes.Title} className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                            <label className="block px-1 py-2">
                                <span className="block font-medium text-md text-slate-700">Client Name</span>
                                <input type="text" value={projects.data[modalSelected].attributes.ClientName} className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                            <label className="block px-1 py-1">
                                <span className="block font-medium text-md text-slate-700">Date</span>
                                <input type="date" value={projects.data[modalSelected].attributes.DateAdded} className="block px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                            <label className="block px-1 py-2">
                                <span className="block font-medium text-md text-slate-700">Project Description</span>
                                <textarea value={projects.data[modalSelected].attributes.Description} className="block h-56 px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm w-80 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                            </label>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className='p-2 m-2 text-white duration-300 bg-green-600 rounded-full shadow hover:bg-green-700' type='submit'>Save Changes </button>
                    </ModalFooter>
                </Modal>
            </div>

        </div>
    )
}

export async function getServerSideProps() {
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