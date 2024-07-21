// src/services/dataService.js

const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split(' ');
    const months = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    return new Date(year, months[month], day);
  };
  
  const sortDataByDate = (data) => {
    if (!Array.isArray(data)) {
      console.error('Expected an array, but received:', data);
      return [];
    }
    
    return data.sort((a, b) => {
      const dateA = Object.keys(a).find(key => key.match(/^\d{1,2}\s\w{3}\s\d{2}$/));
      const dateB = Object.keys(b).find(key => key.match(/^\d{1,2}\s\w{3}\s\d{2}$/));
      if (dateA && dateB) {
        return parseDate(dateA) - parseDate(dateB);
      }
      return 0;
    });
  };
  
  export default {
    sortDataByDate
  };
  