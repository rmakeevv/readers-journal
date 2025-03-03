import { useState } from 'react';

const UseToggle = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };

    return { toggle, open };
};

export default UseToggle;
