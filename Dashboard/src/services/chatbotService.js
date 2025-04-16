import axios from 'axios';

// Fallback responses when API is not available
const mockResponses = [
  "I'm here to help with your financial questions!",
  "You can ask me about your investments, account balance, or market information.",
  "I can help you understand various financial terms and concepts.",
  "Need help with a transaction? Just let me know the details.",
  "I'm an AI assistant and still learning. For complex requests, please contact customer support."
];

// Get a random response from the mock responses
const getRandomResponse = () => {
  const randomIndex = Math.floor(Math.random() * mockResponses.length);
  return mockResponses[randomIndex];
};

export const sendMessage = async (message) => {
  try {
    // Try to make the actual API call
    const response = await axios.post('/api/chatbot', { message });
    return response.data;
  } catch (error) {
    // If API fails, use mock response
    console.log('API call failed, using mock response');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      message: getRandomResponse(),
      timestamp: new Date().toISOString(),
    };
  }
};

export default { sendMessage };
