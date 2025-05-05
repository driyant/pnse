export const options = [
  { value: 'web', label: 'Web' },
  { value: 'image', label: 'Image' },
  { value: 'news', label: 'News' },
];

export const generateBaseURL = (option: string) => {
  // return `https://center-gateway.helloriyan.my.id/api/${option}-search-engine`;
  return process.env.NODE_ENV === 'development'
    ? `/api/${option}-search-engine.json`
    : `https://center-gateway.svrhr.my.id/api/${option}-search-engine`;
};
