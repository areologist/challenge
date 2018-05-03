export default input => input
  .toString()
  .trim()
  .toLowerCase()
  .replace(/ /g, '-')
  .replace(/([^a-zA-Z0-9-]+)/g, '')
  .split('-')
  .filter(s => s !== '');
