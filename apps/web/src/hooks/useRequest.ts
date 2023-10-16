'use client'
import { useEffect, useState } from "react";


export const useRequest = <Data>(request: () => Promise<Data>): [Data | null, boolean, () => void] => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data | null>(null)

    const execution = () => {
        setLoading(true)
        setTimeout(() => {
            request()
                .then(response => setData(response))
                .finally(() => setLoading(false))
        }, 1000)
    }

    useEffect(() => execution(), []);

    return [data, loading, execution]
}
