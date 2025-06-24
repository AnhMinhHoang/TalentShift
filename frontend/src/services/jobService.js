import api from './api';

// Job API functions

export const fetchJobById = (id) => api.get(`/jobs/${id}`);
export const searchJobs = (params) => api.get('/jobs', { params });
export const fetchAllJobs = () => api.get('/jobs/all');

export const fetchJobCategories = async () => {
    try {
        const response = await api.get('/categories');
        console.log("Raw category data:", response.data);
        const names = response.data.map((category, index) => {
            console.log(`Category ${index}:`, category);
            return category?.name;
        });
        return names;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch categories');
    }
};
export const fetchLocations = async () => {
    try {
        const response = await api.get('/jobs/locations');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch locations');
    }
};

export const fetchSkills = async () => {
    try {
        const response = await api.get('/skills');
        return response.data.map(skill => skill.skillName);
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch skills');
    }
};

export const createJobPost = async (jobData) => {
    try {
        const response = await api.post('/jobs', jobData);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to create job');
    }
};

export const fetchAllActiveJobs = async () => {
    try {
        const response = await api.get('/jobs/active');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch active jobs');
    }
};