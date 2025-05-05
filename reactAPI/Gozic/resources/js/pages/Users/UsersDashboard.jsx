import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import UserProfileTable from '../Users/UsersProfile';
import { BASE_URL } from '@/constants/apiUrl';
import { getAPI } from '@/utils/apiClient';

const UsersDashboard = () => {
    const { user, logout, isAuthenticated, loading } = useAuth();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated && user?.role === 'admin') {
            const fetchUsers = async () => {
                const token = localStorage.getItem('authToken');
                try {
                    const result = await getAPI({
                        url: `${BASE_URL}/api/users`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });

                    if (Array.isArray(result)) {
                        setUsers(result);
                    } else {
                        console.error('API response is not an array:', result);
                        setUsers([]);
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                    setUsers([]);
                }
            };

            fetchUsers();
        }
    }, [isAuthenticated, loading, user]);

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    const handleDelete = (id) => {
        navigate(`/delete/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-red-500 font-semibold">Error: User data is not available</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Welcome to your Dashboard, <span className="text-blue-600">{user.name}</span>
                </h1>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">All Users</h2>
                {Array.isArray(users) && users.length > 0 ? (
                    <UserProfileTable
                        users={users}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ) : (
                    <p>No users available</p>
                )}
            </div>
        </div>
    );
};

export default UsersDashboard;
