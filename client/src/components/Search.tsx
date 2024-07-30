import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Results from "./Results"
import CitySearch from "../api"
import formatSearchParams from "../utils/formatSearchParams"
import { City } from "../types"

const Search = () => {
    const [searchInput, setSearchInput] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [cities, setCities] = useState<City[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const query = searchParams.get('address');
        if (query) setSearchInput(query);
    }, [])

    useEffect(() => {
        if(searchParams.has('address')) getCities();
    }, [searchParams])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    const getCities = async () => {
        try {
            setLoading(true)
            const searchResult = await CitySearch.getCities(searchParams);
            setCities(searchResult);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value);
        setSearchParams(formatSearchParams(e.currentTarget.value))
    }

    return (
    <div className="w-full bg-slate-50 h-full absolute top-0 z-0 flex flex-col gap-2 justify-center items-center">
        <h2>Find Cities</h2>
        <p>Instantly find any city in the US you may be looking for.</p>
        <form className="flex flex-col justify-between border-2 py-4 px-2">
            <input type="text" placeholder="Start typing to see cities" className="border-2" onChange={handleChange} value={searchInput} ref={inputRef} />
        </form>
        {loading ? "loading..." : <Results cities={cities} />}
    </div>
    )
}

export default Search