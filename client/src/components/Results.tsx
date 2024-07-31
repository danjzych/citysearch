import ResultItem from "./ResultItem";
import { City } from "../types";

const Results = ({ cities }: { cities: City[] }) => {
  return (
    <div className="grow border w-3/4 rounded-lg border-primary flex justify-center items-center shadow-md">
      {cities.length ? (
        <ul className="h-full w-full flex flex-col font-light">
          {cities.map((c) => {
            return <ResultItem city={c} key={c.id} />;
          })}
          {cities.length < 10 && (
            <div className="font-normal grow text-center p-2">
              end of results
            </div>
          )}
        </ul>
      ) : (
        <p>Nothing here... try searching for a recognizable city or state</p>
      )}
    </div>
  );
};

export default Results;
