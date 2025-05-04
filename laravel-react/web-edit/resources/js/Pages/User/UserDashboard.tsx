import { Link, useForm } from '@inertiajs/react';


export default function UserDashboard() {

    const { post } = useForm();

    const handleLogout = () => {
        post('/logout');
    };
    return (
        <nav>
            <div>
                <div>day la dashboard user</div>
                <button onClick={handleLogout}>Đăng xuất</button>
            </div>
        </nav>
    );
}