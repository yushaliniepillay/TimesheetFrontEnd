import React from 'react'

const viewTimesheet = () => {
    const tabs = [
        { name: 'List of Timesheet', href: '/timesheet/viewTimesheet', current: true },
        { name: 'New Entry', href: '/timesheet/addTimesheet', current: false },
        // { name: 'Team Members', href: '#', current: false },
        // { name: 'Billing', href: '#', current: false },
    ]

    function classNames(...classes) {
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
                                className={classNames(
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
                        <h1 className="text-xl font-semibold text-gray-900">PROJECTS</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the timesheet details.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        {/* modal pop up to add new project */}
                        
                    </div>
                </div>


            </div>

        </div>

    )
}

export default viewTimesheet