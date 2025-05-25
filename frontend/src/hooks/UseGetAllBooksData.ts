import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IBook } from '../types';
import { BookService } from '../services/book';

export default function UseGetAllBooksData(onSuccess: (data: IBook[]) => void) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError>();

    useEffect(() => {
        setLoading(true);
        BookService.getAll()
            .then((data) => {
                data && onSuccess(data);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return { loading, error };
}
