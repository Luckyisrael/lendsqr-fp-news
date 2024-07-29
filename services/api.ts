import { Article } from "types";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchNews = async () => {
  try {
    const response = await fetch(`${BASE_URL}/v2/top-headlines?country=us&apiKey=${API_KEY}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': '6291f375d1msh8e21ca58ede2ccbp1e2bf7jsne99829914425',
        'x-rapidapi-host': 'newscatcher.p.rapidapi.com'
      }
    });  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

// You can add more API functions here as needed, for example:
export const fetchNewsByTopic = async (topic) => {
  try {
    const response = await fetch(`${BASE_URL}?lang=en&media=True&topic=${topic}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news by topic:', error);
    throw error;
  }
};