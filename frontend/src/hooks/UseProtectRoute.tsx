import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseProtectRouteProps {
    condition: boolean;
    navigatePath: string;
    action?: () => void;
}

const UseProtectRoute = ({
    condition,
    navigatePath,
    action = () => {
        console.log('ошибка перехода по url');
    },
}: UseProtectRouteProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (condition) {
            navigate(navigatePath);
            action();
        }
    }, [condition]);
};

export default UseProtectRoute;
