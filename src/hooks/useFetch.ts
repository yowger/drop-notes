import { useEffect, useState } from "react"

type TUseFetchDataProps<T> = () => Promise<T>

function useFetchData<T>(fetchFunction: TUseFetchDataProps<T>) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [isSuccess, setSuccess] = useState(false)
    const [error, setError] = useState<null | Error>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchFunction()

                setData(data)
                setSuccess(true)
            } catch (error) {
                setError(error as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    return { data, isLoading, isSuccess, error }
}

export default function useFetch<T>(fetchFunction: TUseFetchDataProps<T>) {
    const { data, isLoading, isSuccess, error } = useFetchData(fetchFunction)

    return { result: data, isLoading, isSuccess, error }
}
