// src/services/api.js
import axios from 'axios';

const API_URL = 'https://sheetdb.io/api/v1/i4vmzb5wbr8vx';

export default {
    apiClient: axios.create({
      baseURL: API_URL,
    }),
    async fetchData(sheetName, indices) {
      try {
        const url = `?sheet=${encodeURIComponent(sheetName)}`;
  
        const response = await this.apiClient.get(url);
  
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