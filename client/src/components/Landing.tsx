import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            About <span className="text-primary">CitySearch</span>
          </h2>
          <p>
            <span className="font-semibold text-primary">CitySearch</span> is
            the <span className="font-semibold">number-one</span> locally-run
            app for searching for cities.
          </p>
          <p>
            To get started, head over to our search cities page and start
            searching.
          </p>
        </div>
        <Link
          to={"/cities"}
          className="btn btn-primary btn-sm text-base-100 rounded-lg"
        >
          Search Cities
        </Link>
      </div>
    </div>
  );
};

export default Landing;
