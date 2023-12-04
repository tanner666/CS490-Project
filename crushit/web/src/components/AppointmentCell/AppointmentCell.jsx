import { useQuery } from "@redwoodjs/web"
import React from "react"

export const QUERY = gql`
  query calendar_demo($start: String!, $end: String!, $code: String!) {
    getEvents(start: $start, end: $end, code: $code) {
      code
      events {
        summary
        description
        start
        end
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'blue' }}>Error: {error?.message}</div>
)

export const Success = ({ getEvents }) => {
  return (
    <>
       <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Table of Appointments
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Start
              </th>
              <th scope="col" className="py-3 px-6">
                End
              </th>
            </tr>
          </thead>
          <tbody>
            {getEvents.events.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                <td className="py-4 px-6">{item.summary}</td>
                <td className="py-4 px-6">{item.start}</td>
                <td className="py-4 px-6">{item.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}