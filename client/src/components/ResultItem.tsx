import { City } from "../types";

const ResultItem = ({ city }: { city: City }) => {
  return (
    <li className="border-b grow flex items-center justify-between px-2 max-h-9 bg-transparent">
      <div>
        {city.name}, {city.state_name}
      </div>
      <a
        href={city.url}
        className="link link-accent text-sm font-extralight"
        target="_blank"
      >
        Visit on Rentable
      </a>
    </li>
  );
};

export default ResultItem;
