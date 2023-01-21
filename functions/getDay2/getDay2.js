const axios = require('axios'); 
const handler = async (event) => {
  const date = event.queryStringParameters.date || 'World'; 
  const API_KEY = 'Q7eUFC5b2mYxCPCNftgZNZ7n5GCTI9eRASdY3us3'; //process.env.API_KEY;
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`; 
  try { 
    const data = await axios.get(url)
    return { 
      statusCode: 200,
      body: JSON.stringify(data.data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
