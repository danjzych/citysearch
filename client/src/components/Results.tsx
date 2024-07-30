import { City } from "../types";

const Results = ({ cities }: { cities: City[] }) => {
  return <>{cities.length}</>;
};

export default Results;
