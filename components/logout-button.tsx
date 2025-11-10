
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
            className={`px-6 py-2 rounded-md font-medium bg-red-500 hover:bg-red-600 text-white`}
        >
            Log Out
        </button>
    )

}