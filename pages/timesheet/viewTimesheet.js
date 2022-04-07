import React from 'react'
import moment from 'moment';
import fetch from 'isomorphic-unfetch'

const viewTimesheet = ({ timesheetentries }) => {

    const tabs = [
        { name: 'List of Timesheet', href: '/timesheet/viewTimesheet', current: true },
        { name: 'New Entry', href: '/timesheet/addTimesheet', current: false },
        // { name: 'Team Members', href: '#', current: false },
        // { name: 'Billing', href: '#', current: false },
    ]

    function className(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    onChange="location = this.value;"
                    id="tabs"
                    name="tabs"
                    className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={className(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="px-4 py-5 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">TIMESHEET</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the timesheet details.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        {/* modal pop up to add new project */}

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
                                                Activity Type</th>
                                            <th scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                Start Time</th>
                                            <th scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                End Time</th>
                                            <th scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                Description</th>
                                            <th scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {timesheetentries.data.map((timesheetentry, index) => (
                                            <tr key={timesheetentry.id}>
                                                <td className={className(
                                                    index !== timesheetentry.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {timesheetentry.attributes.project}
                                                </td>
                                                <td className={className(
                                                    index !== timesheetentry.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {moment(timesheetentry.attributes.DateAdded).format('DD-MM-yyyy')}
                                                </td>
                                                <td className={className(
                                                    index !== timesheetentry.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {timesheetentry.attributes.ActivityType}
                                                </td>
                                                <td className={className(
                                                    index !== timesheetentry.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {timesheetentry.attributes.StartTime}
                                                </td>
                                                <td className={className(
                                                    index !== timesheetentry.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {timesheetentry.attributes.EndTime}
                                                </td>
                                                <td className={className(
                                                    index !== timesheetentry.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                                )}>
                                                    {timesheetentry.attributes.Description}
                                                </td>
                                                <td className={className(
                                                    index !== timesheetentry.length - 1 ? 'border-b border-gray-200' : '',
                                                    'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                                                )}>
                                                    {/* <button onClick={() => handleShow(index)}
                                                        className="text-indigo-600 hover:text-indigo-900">
                                                        Edit<span className="sr-only">, {project.attributes.Title}</span>
                                                    </button> */}
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

        </div>

    )
}

//get data from strapi
export async function getStaticProps() {
    const { API_URL } = process.env

    const res = await fetch(`${API_URL}/api/timesheet-entries`)
    const data = await res.json()

    return {
        props: {
            timesheetentries: data
        }
    }
}

export default viewTimesheet