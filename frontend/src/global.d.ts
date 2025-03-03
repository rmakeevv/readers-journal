declare module '*.module.css';
declare module '*.module.scss';

declare module '*.svg' {
    import { ReactElement, SVGProps } from 'react';
    export const ReactComponent: (props: SVGProps<SVGElement>) => ReactElement;
    const src: string;
    export default src;
}

declare module '*.png' {
    const value: string;
    export default value;
}
