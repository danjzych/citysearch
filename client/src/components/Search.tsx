import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Results from "./Results";
import CitySearch from "../api";
import formatSearchParams from "../utils/formatSearchParams";
import { City } from "../types";

const CITIES_PER_PAGE = 10;

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const query = searchParams.get("address");
    if (query) setSearchInput(query);
  }, []);

  useEffect(() => {
    if (searchParams.has("address")) getCities();
  }, [searchParams]);

  useEffect(() => {
    setNumPages(Math.ceil(cities.length / CITIES_PER_PAGE));
  }, [cities]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
    setSearchParams(formatSearchParams(e.currentTarget.value));
  };

  return (
    <div className="w-full bg-slate-50 h-full absolute top-0 z-0 flex flex-col gap-2 justify-center items-center">
      <h2>Find Cities</h2>
      <p>
        Instantly find cities all over the US. Start typing to see them appear.
      </p>
      <div
        role="search"
        aria-label="search term"
        className="flex flex-col justify-between border-2 py-4 px-2"
      >
        <label htmlFor="search"></label>
        <input
          type="text"
          placeholder="Madison, WI"
          className="input input-bordered"
          onChange={handleChange}
          value={searchInput}
          ref={inputRef}
          id="search"
          name="search"
        />
      </div>
      {loading ? "loading..." : <Results cities={cities} />}
    </div>
  );
};

export default Search;
