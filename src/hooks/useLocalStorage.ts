import { useState } from "react"

import type { Dispatch, SetStateAction } from "react"

interface IUseLocalStorageOptions {
    initializeWithValue?: boolean
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T),
    options: IUseLocalStorageOptions = {}
): [T, Dispatch<SetStateAction<T>>] {
    const { initializeWithValue = true } = options

    const serializer = (value: T) => {
        return JSON.stringify(value)
    }

    const deserializer = (value: string): T => {
        if (value === "undefined") {
            return undefined as unknown as T
        }

        const defaultValue: T =
            initialValue instanceof Function ? initialValue() : initialValue

        let parsedValue: unknown
        try {
            parsedValue = JSON.parse(value)
        } catch (error) {
            console.error("Error parsing JSON:", error)
            return defaultValue
        }

        return parsedValue as T
    }

    const readValue = (): T => {
        console.log("reading value")
        const initialValueToUse =
            initialValue instanceof Function ? initialValue() : initialValue

        try {
            const storageData = window.localStorage.getItem(key)

            return storageData ? deserializer(storageData) : initialValueToUse
        } catch (error) {
            console.log(
                `Error reading from localStorage with key "${key}": `,
                error
            )

            return initialValueToUse
        }
    }

    const [storedValue, setStoredValue] = useState(() => {
        if (initializeWithValue) {
            return readValue()
        }

        return initialValue instanceof Function ? initialValue() : initialValue
    })

    const setValue: Dispatch<SetStateAction<T>> = (value) => {
        console.log("setting value")
        try {
            const newValue =
                value instanceof Function ? value(readValue()) : value

            window.localStorage.setItem(key, serializer(newValue))

            handleStorageChange(key)
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error)
        }
    }

    const handleStorageChange = (key: string) => {
        console.log("storage change")
        if (!key) return

        setStoredValue(readValue())
    }

    return [storedValue, setValue]
}
