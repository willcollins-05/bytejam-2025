
import { signOut } from 'next-auth/react';

export default function LogoutButton() {

    const handleLogout = async () => {
        await signOut({
            callbackUrl: '/',
            redirect: true
        })
    }

    return (
        <button onClick={handleLogout}
            className={`px-6 py-2 rounded font-medium dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-gray-600 text-white hover:bg-gray-700`}
        >
            Log Out
        </button>
    )

}