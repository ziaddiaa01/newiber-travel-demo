import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // required for httpOnly cookies
});

// Optional: response interceptor for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors globally (e.g., redirect to login)
    if (error.response && error.response.status === 401) {
      // You can redirect to login or dispatch a logout action
      // window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Public endpoints
export const fetchServices = () => API.get('/services');
export const fetchService = (id) => API.get(`/services/${id}`);
export const fetchTestimonials = () => API.get('/testimonials');
export const fetchFAQs = () => API.get('/faqs');
export const getDestinations = () => API.get('/destinations');

export const submitContact = (formData) => API.post('/contact', formData);
// Admin endpoints (protected)
export const adminLogin = (data) => API.post('/auth/login', data);
export const adminLogout = () => API.post('/auth/logout');
export const getCurrentUser = () => API.get('/auth/me');

// Admin Services
export const getAdminServices = () => API.get('/admin/services');
export const createAdminService = (data) => API.post('/admin/services', data);
export const updateAdminService = (id, data) => API.put(`/admin/services/${id}`, data);
export const deleteAdminService = (id) => API.delete(`/admin/services/${id}`);

// Admin Testimonials
export const getAdminTestimonials = () => API.get('/admin/testimonials');
export const createAdminTestimonial = (data) => API.post('/admin/testimonials', data);
export const updateAdminTestimonial = (id, data) => API.put(`/admin/testimonials/${id}`, data);
export const deleteAdminTestimonial = (id) => API.delete(`/admin/testimonials/${id}`);

// Admin FAQs
export const getAdminFAQs = () => API.get('/admin/faqs');
export const createAdminFAQ = (data) => API.post('/admin/faqs', data);
export const updateAdminFAQ = (id, data) => API.put(`/admin/faqs/${id}`, data);
export const deleteAdminFAQ = (id) => API.delete(`/admin/faqs/${id}`);

// Admin Contacts
export const getAdminContacts = () => API.get('/admin/contacts');
export const markContactRead = (id) => API.patch(`/admin/contacts/${id}/read`);
export const deleteAdminContact = (id) => API.delete(`/admin/contacts/${id}`);


