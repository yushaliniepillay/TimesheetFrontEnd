import React, { Fragment, useState } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { PlusSmIcon, CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import moment from 'moment'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import ViewEntry from './viewEntry'

let id = 0;
const initialList = [];

const addTimesheet1 = () => {

  const activityType = [
    { id: 1, name: 'Development' },
    { id: 2, name: 'Maintenance' },
    { id: 3, name: 'Meeting' },
    { id: 4, name: 'Requirement' },
    { id: 5, name: 'Testing' },
    { id: 6, name: 'UAT' },
    { id: 7, name: 'Others' },
  ]


  const [open, setOpen] = useState(true)
  const [modalSelected, setModalSelected] = React.useState(0)
  const handleShow = (index) => {
    setModalSelected(index)
    setOpen(true)
    console.log(index)
  }

  const [list, setList] = useState(initialList);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("description...");
  const [ts_date, setTs_Date] = useState(new Date());
  const [fromTime, setFromTime] = useState(setHours(setMinutes(new Date(), 0), 9));
  const [toTime, setToTime] = useState(setHours(setMinutes(new Date(), 30), 18));
  const [duration, setDuration] = useState("");
  const [selected, setSelected] = useState(activityType)


  const tabs = [
    { name: 'List of Timesheet', href: '/timesheet/viewTimesheet', current: false },
    { name: 'New Entry', href: '/timesheet/addTimesheet1', current: true },
  ]

  function className(...classes) {
    return classes.filter(Boolean).join(' ')
  }



  return (
    <div>
      {/* tabs */}
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
            <h1 className="text-xl font-semibold text-gray-900">List of Timesheet Entries</h1>

          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {/* modal pop up to add new project */}
            <button
              type="button"
              onClick={() => handleShow()}
              className="flex items-center justify-center p-1 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusSmIcon className="w-6 h-6" aria-hidden="true" />
              <span className="sr-only">Add entry</span>
            </button>

          </div>
        </div>

        {/* list of view entry */}
        <ViewEntry list={list} />


        {/* modal side pop up */}
        <div>
          <Transition.Root key={[modalSelected]} show={open} as={Fragment}>
            <Dialog as="div" className="fixed overflow-y-auto inset-y-12" onClose={setOpen}>
              <div className="absolute inset-0 overflow-hidden">
                <Dialog.Overlay className="absolute inset-0" />

                <div className="fixed right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <div className="w-screen max-w-md pointer-events-auto">
                      <form name='task_form' id='form_id_1'
                        className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
                        <div className="flex flex-col flex-1 min-h-0 overflow-auto">
                          <div className="px-4 py-6 bg-indigo-700 sm:px-6">
                            <div className="flex items-center justify-between">{/* close button */}
                              <Dialog.Title className="text-lg font-medium text-white"> New Entry </Dialog.Title>
                              <div className="flex items-center ml-3 h-7">
                                <button
                                  type="button"
                                  className="text-indigo-200 bg-indigo-700 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XIcon className="w-6 h-6" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                            <div className="mt-1">
                              <p className="text-sm text-indigo-300">
                                Get started by filling in the information below to insert your new entry.
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between flex-1">
                            <div className="px-4 divide-y divide-gray-200 sm:px-6">
                              <div className="pt-6 pb-5 space-y-6">
                                <div>
                                  <label htmlFor="project-name" className="block text-sm font-medium text-gray-900">
                                    Project name
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      value={title}
                                      onChange={e => setTitle(e.target.value)}
                                      className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="entry-date" className="block text-sm font-medium text-gray-900">
                                    Entry Date
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      value={ts_date}
                                      onChange={e => setTs_Date(e.target.value)}
                                      className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="input_duration" className="block text-sm font-medium text-gray-900">
                                    {' '}
                                    Duration{' '}
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      step={0.01}
                                      max='23.59'
                                      min='0'
                                      id="input_duration"
                                      value={duration}
                                      onChange={e => setDuration(e.target.value)}
                                      className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                {/* <div>
                                  <label htmlFor="input_startTime" className="block text-sm font-medium text-gray-900">
                                    {' '}
                                    Start Time{' '}
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="time"
                                      id="input_startTime"
                                      value={fromTime}
                                      onChange={e => setFromTime(e.target.value)}
                                      className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div> 
                                </div>*/}
                                {/* <div>
                                  <label htmlFor="input_endTime" className="block text-sm font-medium text-gray-900">
                                    {' '}
                                    End Time{' '}
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="time"
                                      id="input_endTime"
                                      value={toTime}
                                      minTime={fromTime}
                                      onChange={e => setToTime(e.target.value)}
                                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div> */}

                                {/* Activity type */}
                                <div>
                                  <label htmlFor="activity-type" className="block text-sm font-medium text-gray-900">
                                    {' '}
                                    Activity Type{' '}
                                  </label>
                                  <div className="mt-1">

                                    <Listbox value={selected} onChange={setSelected} >
                                      {({ open }) => (
                                        <>
                                          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">Activity Type</Listbox.Label> */}

                                          <Listbox.Button className="relative block w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <span className="block truncate">{selected.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                          </Listbox.Button>

                                          <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                          >
                                            <Listbox.Options className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                              {activityType.map((acttype) => (
                                                <Listbox.Option
                                                  key={acttype.id}
                                                  className={({ active }) =>
                                                    className(
                                                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                      'cursor-default select-none relative py-2 pl-3 pr-9'
                                                    )
                                                  }
                                                  value={acttype}
                                                >
                                                  {({ selected, active }) => (
                                                    <>
                                                      <span className={className(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {acttype.name}
                                                      </span>

                                                      {selected ? (
                                                        <span
                                                          className={className(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                          )}
                                                        >
                                                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                        </span>
                                                      ) : null}
                                                    </>
                                                  )}
                                                </Listbox.Option>
                                              ))}
                                            </Listbox.Options>
                                          </Transition>
                                        </>
                                      )}
                                    </Listbox>
                                  </div>
                                </div>

                                <div>
                                  <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                    {' '}
                                    Description{' '}
                                  </label>
                                  <div className="mt-1">
                                    <textarea
                                      placeholder="Task Description..."
                                      onChange={e => setDescription(e.target.value)}
                                      rows={3}
                                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end flex-shrink-0 px-4 py-4">
                          <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          //onClick={() => clearForm()} 
                          >
                            Clear
                          </button>
                          <button
                            type="submit"
                            //onClick={() => handleChange()}
                            className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>

      </div>
    </div>


  )
}




//get data from strapi
// export async function getStaticProps() {
//   const { API_URL } = process.env

//   const res = await fetch(`${API_URL}/api/timesheet-entries`)
//   const data = await res.json()

//   return {
//     props: {
//       timesheetentries: data
//     }
//   }
// }

export default addTimesheet1