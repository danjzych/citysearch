import { City } from "../types";

const ResultItem = ({ city }: { city: City }) => {
  return (
    <li className="border grow flex items-center font-light justify-between px-2">
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
