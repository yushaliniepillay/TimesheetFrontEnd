import React from 'react'
import moment from 'moment'
import SubmitArray from './submitArray'

const viewEntry = (props) => {

    function className(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const formatDate = (value) => {
        let date = moment(value).format('DD-MM-YYYY');
        return date;
    }

    const newArray = [...props.list];
    console.log(newArray)

    return (

        <div className="flex flex-col mt-8" >
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                        <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                        Entry Date</th>
                                    <th scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                        From Time</th>
                                    <th scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                        To Time</th>
                                    <th scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                        Duration</th>
                                    <th scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                        Project Name</th>
                                    <th scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                        Activity Type</th>
                                    <th scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                        Description</th>
                                    <th scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                                        <span className="sr-only">Remove</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {newArray.map((entry, index) => (
                                    <tr key={entry.id}>
                                        <td>
                                            {formatDate(entry.date)}
                                        </td>
                                        <td>
                                            {entry.beginTime}
                                        </td>
                                        <td >
                                            {entry.endTime}
                                        </td>
                                        <td >
                                            {entry.tempDuration}
                                        </td>
                                        <td>
                                            {entry.selected}
                                        </td>

                                        <td>
                                            {entry.description}
                                        </td>
                                        <td >
                                            <button id="delBtn" onClick={() => props.onDelete(entry.id)}
                                                className="text-indigo-600 hover:text-indigo-900">
                                                Remove<span className="sr-on "></span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <SubmitArray list={newArray} onDeleteSubmit={props.onDeleteSubmit} />
                </div>
            </div>
        </div >

    )
}



export default viewEntry