import { PropsWithChildren } from 'react';
import styles from './index.module.css';

const ContentWrapper = ({ children }: PropsWithChildren) => {
    return <div className={styles.container}>{children}</div>;
};

export default ContentWrapper;
