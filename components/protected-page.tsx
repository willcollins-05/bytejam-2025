'use client'
import { useSession } from 'next-auth/react';

export default function ProtectedPage(props: { children: React.ReactNode}) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (<h1>Loading session...</h1>)
    }

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }

    
    return (
        <>
            {props.children}
        </>
    )
}