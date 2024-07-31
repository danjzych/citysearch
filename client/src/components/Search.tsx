import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Results from "./Results";
import PageSelect from "./PageSelect";
import CitySearch from "../api";
import useDebounceValue from "../hooks/useDebounceValue";
import formatSearchParams from "../utils/formatSearchParams";
import paginate from "../utils/paginate";
import { City } from "../types";

const CITIES_PER_PAGE = 10;

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearchTerm = useDebounceValue(searchInput, 300);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);

  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [paginatedCities, setPaginatedCities] = useState<City[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const query = searchParams.get("address");
    if (query) setSearchInput(query);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchParams.has("address")) {
      getCities();
    } else {
      setCities([]);
    }
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(formatSearchParams(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setNumPages(Math.ceil(cities.length / CITIES_PER_PAGE));
    paginateCities();
  }, [cities]);

  useEffect(() => {
    paginateCities();
  }, [page]);

  const getCities = async () => {
    try {
      setLoading(true);
      const searchResult = await CitySearch.getCities(searchParams);
      setCities(searchResult);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const changePage = (direction: "FORWARD" | "BACK") => {
    if (direction === "FORWARD") setPage(page + 1);
    if (direction === "BACK") setPage(page - 1);
  };

  const paginateCities = () => {
    setPaginatedCities(paginate(cities, page, CITIES_PER_PAGE));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex flex-col gap-8 items-center px-8 py-6">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Find Cities</h2>
        <p className="font-light">
          Instantly find cities all over the US. Start typing to see them
          appear.
        </p>
      </div>
      <div role="search" aria-label="search term">
        <label className="input input-bordered input-primary rounded-lg flex items-center gap-2 font-light focus-within:border-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Madison, WI"
            onChange={handleChange}
            value={searchInput}
            ref={inputRef}
            id="search"
            name="search"
          />
        </label>
      </div>
      {loading ? (
        <span className="loading loading-dots loading-lg fixed h-full"></span>
      ) : (
        <>
          <Results cities={paginatedCities} />
          <PageSelect page={page} numPages={numPages} changePage={changePage} />
        </>
      )}
    </div>
  );
};

export default Search;
