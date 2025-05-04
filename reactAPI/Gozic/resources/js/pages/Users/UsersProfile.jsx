import React from 'react';

const UserProfileTable = ({ users, onUpdate, onDelete }) => {
    if (!users || users.length === 0) return <div>No user data available</div>;

    const fieldsToShow = ['id', 'name', 'email', 'phone', 'address', 'role'];

    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">All Users</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        {fieldsToShow.map((key) => (
                            <th key={key} className="py-2 px-4 border-b capitalize">
                                {key}
                            </th>
                        ))}
                        <th className="py-2 px-4 border-b">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id || user.email} className="hover:bg-gray-50">
                            {fieldsToShow.map((key) => (
                                <td key={key} className="py-2 px-4 border-b text-center">
                                    {user[key] || 'N/A'}
                                </td>
                            ))}
                            <td className="py-2 px-4 border-b text-center">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => onUpdate(user.id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                                    >
                                        Cập nhật
                                    </button>
                                    <button
                                        onClick={() => onDelete(user.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                                    >
                                        Xoá
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserProfileTable;
