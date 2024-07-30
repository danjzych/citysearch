import { City } from "../types";

const ResultItem = ({ city }: { city: City }) => {
  return (
    <li className="border-b grow flex items-center font-light justify-between px-2 max-h-9 bg-base-100">
      <div>
        {city.name}, {city.state_name}
      </div>
      <a href={city.url} className="link link-accent text-sm font-extralight">
        Visit on Rentable
      </a>
    </li>
  );
};

export default ResultItem;
