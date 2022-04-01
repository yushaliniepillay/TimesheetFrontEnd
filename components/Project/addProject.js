import React from 'react'
import getConfig from 'next/config'
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"

const { publicRuntimeConfig } = getConfig();

const addProject = () => {

    const [projectTitle, setProjectTitle] = React.useState('')
    const [clientName, setClientName] = React.useState('')
    const [projectDate, setProjectDate] = React.useState('')
    const [projectDescription, setProjectDescription] = React.useState('')

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

        const addResponse = await add.json()

        console.log(addResponse)
    }

    const [modalFormOpen, setModalFormOpen] = React.useState(false)
    const [modalSelected, setModalSelected] = React.useState(0)

    const handleShow = (index) => {
        setModalSelected(index)
        setModalFormOpen(true)
        console.log(index)
    }
    return (
        <div>
            <button className='p-2 m-2 text-white duration-300 bg-indigo-500 rounded-full shadow hover:bg-green-700'
                type='submit'
                onClick={() => handleShow()}>
                Add New Project
            </button>

            <Modal
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
        </div >
    )
}

export default addProject