import ResultItem from "./ResultItem";
import { City } from "../types";

const Results = ({ cities }: { cities: City[] }) => {
  return (
    <div className="grow border w-3/4 rounded-lg border-primary flex justify-center items-center">
      {cities.length ? (
        <ul className="h-full w-full flex flex-col">
          {cities.map((c) => {
            return <ResultItem city={c} key={c.id} />;
          })}
        </ul>
      ) : (
        <p>Nothing here... try searching for a recognizable city or state</p>
      )}
    </div>
  );
};

export default Results;
