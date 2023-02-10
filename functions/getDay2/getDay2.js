const axios = require('axios'); 
const handler = async (event) => {
  const date = event.queryStringParameters.date || 'World'; 
  const API_KEY = process.env.API_KEY;
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
