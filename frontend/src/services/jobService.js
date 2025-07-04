import api from './api';
import apiPublic from './apiPublic';

// Job API functions

export const fetchJobById = (id) => api.get(`/jobs/${id}`);
export const searchJobs = (params) => api.get('/jobs', { params });
export const fetchAllJobs = () => api.get('/jobs/all');

export const fetchJobCategories = async () => {
    try {
        const response = await apiPublic.get('/categories');
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
        const response = await apiPublic.get('/jobs/locations');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch locations');
    }
};

export const fetchSkills = async () => {
    try {
        const response = await apiPublic.get('/skills');
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
        const response = await apiPublic.get('/jobs/active');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch active jobs');
    }

};

export const fetchPublishedJobsByUser = async (userId) => {
    try {
        const response = await api.get(`/jobs/user/${userId}/published`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch published jobs');
    }
};

export const fetchDraftJobsByUser = async (userId) => {
    try {
        const response = await api.get(`/jobs/user/${userId}/drafts`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch draft jobs');
    }
};
export const publishDraftJob = async (jobId) => {
    try {
        const response = await api.put(`/jobs/${jobId}/publish`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to publish job');
    }
};

export const deleteJob = async (jobId) => {
    try {
        await api.delete(`/jobs/${jobId}`);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete job');
    }
};

export const updateJob = async (jobId, jobData) => {
    try {
        const response = await api.put(`/jobs/${jobId}`, jobData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update job');
    }
};
