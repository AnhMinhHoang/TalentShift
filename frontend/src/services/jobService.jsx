import api from './api';

// Job API functions

export const fetchJobById = (id) => api.get(`/jobs/${id}`);

export const fetchJobCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data.map(category => category.name);
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch categories');
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


export const fetchLocations = async () => {
    try {
        const response = await api.get('/jobs/locations');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch locations');
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

export const fetchAllJobs = async () => {
    try {
        const response = await api.get('/jobs');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch all jobs');
    }
};