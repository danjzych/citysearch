const formatSearchParams = (s: string): { address: string } | undefined => {
  return s ? { address: s.toLowerCase().trim() } : undefined;
};

export default formatSearchParams;
