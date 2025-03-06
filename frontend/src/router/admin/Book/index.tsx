import { useEffect, useState } from 'react';
import { ContentWrapper, AdminHeader } from '../../../components';
import { UseLogOut } from '../../../hooks';
import { getOneBook } from '../../../services';
import { useParams } from 'react-router-dom';
import { IBook } from '../../../types';
import { Descriptions, DescriptionsProps } from 'antd';
import styles from './index.module.css';

const getDescriptionItems = (book: IBook) => {
    const bookItems = Object.entries(book);

    const itemsTest: DescriptionsProps['items'] = bookItems.map((item) => {
        const [key, value] = item;

        return {
            key,
            label: key,
            children: <span>{value || '-'}</span>,
        };
    });

    return itemsTest;
};

const Book = () => {
    const logOut = UseLogOut();

    const { id = '' } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const [bookData, setBookData] = useState<IBook | undefined>(undefined);

    useEffect(() => {
        setIsLoading(true);
        getOneBook(id)
            .then((data) => {
                setBookData(data);
            })
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div>
            <AdminHeader logOut={logOut} />
            {isLoading || bookData === undefined ? (
                <></>
            ) : (
                <ContentWrapper>
                    <div className={styles.container}>
                        <Descriptions
                            title={bookData.name}
                            items={getDescriptionItems(bookData)}
                            layout="vertical"
                            bordered
                        />
                    </div>
                </ContentWrapper>
            )}
        </div>
    );
};

export default Book;
