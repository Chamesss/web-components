import { useState, useEffect, Suspense } from 'react'

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Data is loaded!' });
        }, 2000); // Simulate asynchronous data fetching (2 seconds)
    });
}

export default function SuspenseComponent() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData().then((data) => setData(data.data))
    }, [])

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                {data ? (
                    <p>{data}</p>
                ) : (
                    <p>No data yet.</p>
                )}
            </Suspense>
        </div>
    );
}
