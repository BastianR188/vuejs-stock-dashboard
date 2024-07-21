// src/services/api.js
import axios from 'axios';

const API_URL = 'https://sheetdb.io/api/v1/6ub8ifz7kw9ft';
// const order = [
//     'Mar 21', 'Jun 21', 'Sep 21', 'Dec 21',
//     'Mar 22', 'Jun 22', 'Sep 22', 'Dec 22',
//     'Mar 23', '', '3 Aug 23', '2 Nov 23',
//     '1 Feb 24', '2 Mai 24'
// ];

class ApiService {
    constructor() {
      this.data = [];
      this.apiClient = axios.create({
        baseURL: API_URL,
      });
    }
  
    async fetchData(sheetName) {
      try {
        // Füge den 'offset' Parameter hinzu, um die ersten 3 Zeilen zu überspringen
        const response = await this.apiClient.get(`?sheet=${sheetName}`);
        
        // Speichere die Daten in einer Variable (z.B. this.sheetData)
        this.sheetData = response.data;
        
        return this.sheetData;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    }
  }
  
  export default new ApiService();
