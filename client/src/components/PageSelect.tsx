const PageSelect = ({
  page,
  numPages,
  changePage,
}: {
  page: number;
  numPages: number;
  changePage: (direction: "FORWARD" | "BACK") => void;
}) => {
  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => changePage("BACK")}
        disabled={page === 1}
      >
        «
      </button>
      <div className="join-item btn">{page}</div>
      <button
        className="join-item btn"
        onClick={() => changePage("FORWARD")}
        disabled={page === numPages}
      >
        »
      </button>
    </div>
  );
};

export default PageSelect;
