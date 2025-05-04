import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAPI, putAPI } from '@/utils/apiClient';
import FormInput from '@/components/input/formInput';
import CustomButton from '@/components/button/customButton';
import { useAuth } from '@/contexts/AuthContext';
import { BASE_URL, UPDATE_URL } from '@/constants/apiUrl';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, setUser, logout } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('authToken');
                const response = await getAPI({
                    url: `${BASE_URL}/api/users/${id}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                if (response) {
                    setFormData({
                        name: response.name || '',
                        email: response.email || '',
                        phone: response.phone || '',
                        address: response.address || '',
                        role: response.role || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Không thể tải thông tin người dùng.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    const handleInputChange = (field) => (value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            }

            const response = await putAPI({
                url: UPDATE_URL(id),
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });


            if (response) {
                if (user._id === id) {
                    const updatedUser = {
                        ...user,
                        ...formData
                    };
                    localStorage.setItem('userData', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                }

                navigate('/AdminDashboard');
            } else {
                setError('Cập nhật thất bại');
            }
        } catch (err) {
            console.error('Update error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Đã xảy ra lỗi khi cập nhật';
            setError(errorMessage);

            if (err.message.includes('401') || !localStorage.getItem('authToken')) {
                logout?.();
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Cập nhật thông tin người dùng
                </h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {loading && !formData.email ? (
                    <div className="text-center py-8">Đang tải dữ liệu người dùng...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="Họ và tên"
                            name="name"
                            type="text"
                            placeholder="Nhập họ tên"
                            value={formData.name}
                            setValue={handleInputChange('name')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Nhập email"
                            value={formData.email}
                            setValue={handleInputChange('email')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled
                        />

                        <FormInput
                            label="Số điện thoại"
                            name="phone"
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            value={formData.phone}
                            setValue={handleInputChange('phone')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <FormInput
                            label="Địa chỉ"
                            name="address"
                            type="text"
                            placeholder="Nhập địa chỉ"
                            value={formData.address}
                            setValue={handleInputChange('address')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <FormInput
                            label="Vai trò"
                            name="role"
                            type="text"
                            placeholder="Nhập vai trò"
                            value={formData.role}
                            setValue={handleInputChange('role')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled
                        />

                        <div className="flex space-x-4">
                            <CustomButton
                                type="submit"
                                content={loading ? 'Đang xử lý...' : 'Cập nhật'}
                                disabled={loading}
                                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium disabled:bg-blue-400"
                            />

                            <CustomButton
                                type="button"
                                content="Hủy bỏ"
                                onClick={() => navigate('/AdminDashboard')}
                                className="flex-1 bg-gray-500 text-white py-2.5 rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium"
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateUser;