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
        data-testid="pagination_back_button"
      >
        «
      </button>
      <div className="join-item btn">{page}</div>
      <button
        className="join-item btn"
        onClick={() => changePage("FORWARD")}
        disabled={page === numPages}
        data-testid="pagination_forward_button"
      >
        »
      </button>
    </div>
  );
};

export default PageSelect;
