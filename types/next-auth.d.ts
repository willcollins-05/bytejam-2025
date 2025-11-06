import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string,
            username?: string | null,
            pfp_url?: string | null
        } & DefaultSession['user']
        token?: string
    }

    interface User {
        id?: string | null,
        username?: string | null,
        pfp_url?: string | null
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string | null,
        username?: string | null,
        pfp_url?: string | null
    }
}