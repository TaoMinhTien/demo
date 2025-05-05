import FormInput from "@/components/input/formInput";
import React, { useState } from "react";
import CustomButton from "@/components/button/customButton";
import { postAPI } from "@/utils/apiClient";
import { LOGIN_URL } from "@/constants/apiUrl";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const result = await postAPI({
                url: LOGIN_URL,
                data: { email, password },
            });
            if (result.token) {
                if (!['admin', 'user'].includes(result.user.role)) {
                    setError('Tài khoản của bạn không có quyền truy cập');
                    return;
                }
                await login(result.token, {
                    id: result.user.id,
                    email: result.user.email,
                    name: result.user.name,
                    address: result.user.address,
                    phone: result.user.phone,
                    role: result.user.role
                });
                if (result.user.role === 'admin') {
                    navigate("/AdminDashboard");
                } else {
                    navigate("/UserDashboard");
                }
            } else {
                setError('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        } catch (err) {
            console.log('error', err);
            setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="w-full h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>
                    <FormInput
                        label="Email"
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        setValue={setEmail}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        setValue={setPassword}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <CustomButton
                        content="Login"
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                    />
                    {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={handleRegisterRedirect}
                                className="text-blue-600 hover:underline"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoginPage;
