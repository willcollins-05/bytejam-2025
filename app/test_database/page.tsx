import { getAllProps } from '@/lib/supabase/queries'

export default async function TestDatabasePage() {
    const data = await getAllProps(); 
    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )
}