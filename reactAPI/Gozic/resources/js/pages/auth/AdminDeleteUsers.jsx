import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteAPI } from '../../utils/apiClient';
import { DELETE_URL } from '@/constants/apiUrl';

const DeleteUsers = () => {
    const { id } = useParams();
    const { user: currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleDelete = async () => {
        if (!id) return;

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await deleteAPI({
                url: DELETE_URL(id),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response && response.success) {
                setSuccess(true);
                if (currentUser?.id === id) {
                    setTimeout(() => {
                        logout();
                        navigate('/');
                    }, 2000);
                } else {
                    setTimeout(() => {
                        navigate('/AdminDashboard');
                    }, 2000);
                }
            } else {
                setError(response?.message || 'Xóa người dùng thất bại. Vui lòng thử lại.');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi kết nối đến server.');
            console.error('Delete user error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/AdminDashboard');
    };

    if (!currentUser) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Xác nhận xóa người dùng
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    {success ? (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            {currentUser?.id === id
                                ? 'Tài khoản đã được xóa thành công. Bạn sẽ được chuyển đến trang đăng nhập...'
                                : 'Người dùng đã được xóa thành công. Bạn sẽ được chuyển về trang dashboard...'}
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <p className="text-gray-700 mb-4">
                                    Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
                                </p>
                                {currentUser?.id === id && (
                                    <p className="text-red-600 font-semibold">
                                        Cảnh báo: Bạn đang xóa chính tài khoản của mình! Bạn sẽ bị đăng xuất ngay lập tức.
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleCancel}
                                    disabled={loading}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Đang xử lý...' : 'Xác nhận xóa'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeleteUsers;