import { AdminHeader } from '../../components';
import { UseLogOut } from '../../hooks';

const StudentRoute = () => {
    const logOut = UseLogOut();

    return (
        <div>
            <AdminHeader logOut={logOut} />
            <div style={{ marginTop: '80px' }}>
                <h1>Страница ученика</h1>
            </div>
        </div>
    );
};

export default StudentRoute;
