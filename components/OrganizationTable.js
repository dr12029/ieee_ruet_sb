// Reusable component for organization table
export default function OrganizationTable({ organization, members, colorScheme }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className={`text-2xl font-bold text-${colorScheme}-700 mb-4 pb-3 border-b-2 border-${colorScheme}-200`}>
        {organization}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-12 px-2 py-3 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="w-48 px-2 py-3 text-left text-sm font-semibold text-gray-700">Designation</th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.no} className={`hover:bg-${colorScheme}-50 transition-colors`}>
                <td className="w-12 px-2 py-3 text-sm text-gray-600">{member.no}</td>
                <td className="w-48 px-2 py-3 text-sm font-medium text-gray-900 break-words">
                  {member.designation}
                </td>
                <td className="px-2 py-3 text-sm text-gray-700 break-words">{member.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
