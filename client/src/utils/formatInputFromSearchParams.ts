const formatInputFromSearchParams = (p: URLSearchParams): string => {
  const city = p.get("city");
  const state = p.get("state");

  return `${city || ""}${city && state ? ", " : ""}${state || ""}`;
};

export default formatInputFromSearchParams;
