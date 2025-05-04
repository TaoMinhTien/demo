import { Link, useForm } from '@inertiajs/react';


export default function Dashboard() {

    const { post } = useForm();

    const handleLogout = () => {
        post('/logout');
    };
    return (
        <nav>
            <div>
                <div>day la dashboard admin</div>
                <button onClick={handleLogout}>Đăng xuất</button>
            </div>
        </nav>
    );
}