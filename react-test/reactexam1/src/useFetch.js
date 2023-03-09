import { useState, useEffect } from "react";

// 함수 Wrapping
export function useFetch(baseURL, initialType) {
    const [data, setData] = useState(null);

    const fetchUrl = (type) => {
        fetch(baseURL + '/' + type)
        .then((res) => res.json())
        .then((res) => setData(res))
    }

    useEffect(() => {
        fetchUrl(initialType); // fetchUrl('users');
    }, [])

    return {
        data,
        fetchUrl
    }
}