export const generateBaseURL = (option) => {
  // return `https://center-gateway.helloriyan.my.id/api/${option}-search-engine`;
  return process.env.NODE_ENV === "development"
    ? `/api/${option}-search-engine.json`
    : `https://center-gateway.svrhr.my.id/api/${option}-search-engine`;
};
