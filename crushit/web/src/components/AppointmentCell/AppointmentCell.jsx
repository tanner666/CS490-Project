export const QUERY = gql`
  query calendar_demo($start: String!, $end: String!, $code: String!, $uid: String!) {
    getEvents(start: $start, end: $end, code: $code, uid: $uid) {
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
  <div style={{ color: 'green' }}>Error: {error?.message}</div>
)

export const Success = ({ getEvents }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <caption className="text-lg font-semibold text-gray-900 py-3">Table of Appointments</caption>
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {getEvents.events.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.summary}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.start}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
