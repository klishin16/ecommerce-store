'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/admin/statistics');
    }, [])

    return <></>
}

export default AdminPage;
