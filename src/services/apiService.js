// src/services/api.js
import axios from 'axios';

const API_URL = 'https://sheetdb.io/api/v1/6ub8ifz7kw9ft';
// const order = [
//     'Mar 21', 'Jun 21', 'Sep 21', 'Dec 21',
//     'Mar 22', 'Jun 22', 'Sep 22', 'Dec 22',
//     'Mar 23', '', '3 Aug 23', '2 Nov 23',
//     '1 Feb 24', '2 Mai 24'
// ];

export default {
    apiClient: axios.create({
      baseURL: API_URL,
    }),
    async fetchData(sheetName, indices) {
      try {
        console.log(`Fetching data for ${sheetName}`);
        const url = `?sheet=${encodeURIComponent(sheetName)}`;
        console.log(`Full URL: ${API_URL}${url}`);
  
        const response = await this.apiClient.get(url);
        console.log(`Response for ${sheetName}:`, response);
  
        const rawData = response.data;
        
        if (Array.isArray(indices) && indices.length > 0) {
          const filteredData = indices.map(index => rawData[index]);
          return filteredData;
        } else {
          console.warn(`No indices provided for ${sheetName}, returning all data`);
          return rawData;
        }
      } catch (error) {
        console.error(`Error fetching data for ${sheetName}:`, error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        throw error;
      }
    },
  };