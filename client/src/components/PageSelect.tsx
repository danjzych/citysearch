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
    <div className="join rounded-md">
      <button
        className="join-item btn"
        onClick={() => changePage("BACK")}
        disabled={page === 1}
        data-testid="pagination_back_button"
      >
        «
      </button>
      <div className="join-item btn hover:border-inherit hover:bg-base-200">
        {page}
      </div>
      <button
        className="join-item btn"
        onClick={() => changePage("FORWARD")}
        disabled={numPages ? page === numPages : true}
        data-testid="pagination_forward_button"
      >
        »
      </button>
    </div>
  );
};

export default PageSelect;
