import api from '@/utils/axiosClient';

export async function calculateEstimate(formData) {
  try {
    const response = await api.post('/api/v1/estimator/calculate', formData);
    return response.data;
  } catch (error) {
    console.error('Estimator API Error:', error.response?.data || error.message);
    throw error;
  }
}