import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { getAllBooks } from 'services';
import { SetBookList } from 'types';

export default function UseGetAllBooksData(setBookList: SetBookList) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError>();

    useEffect(() => {
        setLoading(true);
        getAllBooks()
            .then((data) => {
                setBookList(data);
                setLoading(false);
            })

            .catch((error) => setError(error));
    }, []);

    return { loading, error };
}
