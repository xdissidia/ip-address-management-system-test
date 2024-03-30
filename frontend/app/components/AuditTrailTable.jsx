import React from 'react'

const AuditTrailTable = () => {
    return (
        <section className='w-full'>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">IP Address</th>
                                        <th scope="col" className="px-6 py-4">Username</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                        <th scope="col" className="px-6 py-4">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                        <td className="whitespace-nowrap px-6 py-4">Otto</td>
                                        <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                                        <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                                    </tr>
                                    <tr
                                        className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                        <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                                        <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                                        <td className="whitespace-nowrap px-6 py-4">@fat</td>
                                        <td className="whitespace-nowrap px-6 py-4">@fat</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuditTrailTable