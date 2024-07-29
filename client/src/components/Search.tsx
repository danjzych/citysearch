import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Results from "./Results"
import CitySearch from "../api"
import formatInputFromSearchParams from "../utils/formatInputFromSearchParams"
import { City } from "../types"

const Search = () => {
    const [searchInput, setSearchInput] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [cities, setCities] = useState<City[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (searchParams.has('city') || searchParams.has('state')) {
            let formattedInput = formatInputFromSearchParams(searchParams)
            setSearchInput(formattedInput)
        }
    }, [])

    useEffect(() => {
        console.debug('searchInput effect')
        if (searchInput) {
            getCities()
        } else {
            setCities([])
        }
    }, [searchInput])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    const getCities = async () => {
        try {
            const searchResult = await CitySearch.getCities()
            setCities(searchResult)
        } catch (e) {
            console.error(e)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value);
        //TODO: format query string from input
        setSearchParams({q: e.currentTarget.value})
    }

    return (
    <div className="w-full bg-slate-50 h-full absolute top-0 z-0 flex flex-col gap-2 justify-center items-center">
        <form className="flex flex-col justify-between border-2 py-4 px-2">
            <h2>Search Cities</h2>
            <input type="text" placeholder="Start typing to see cities" className="border-2" onChange={handleChange} value={searchInput} ref={inputRef} />
        </form>
        <Results cities={cities} />
    </div>
    )
}

export default Search