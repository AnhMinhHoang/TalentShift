import api from './api';
import apiPublic from './apiPublic';

// Job API functions

export const fetchJobById = async (id, userId) => {
    try {
        const response = await api.get(`/jobs/${id}`, { params: { userId } });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch job');
    }
};

export const searchJobs = async (params) => {
    try {
        const response = await api.get('/jobs', { params });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to search jobs');
    }
};

export const fetchAllJobs = async (userId) => {
    try {
        const response = await api.get(`/jobs?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch all jobs');
    }
};

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
        throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
};

export const fetchLocations = async () => {
    try {
        const response = await apiPublic.get('/jobs/locations');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch locations');
    }
};

export const fetchSkills = async () => {
    try {
        const response = await apiPublic.get('/skills');
        return response.data.map(skill => skill.skillName);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch skills');
    }
};

export const fetchSkillsByCategory = async (category) => {
    try {
        const response = await apiPublic.get('/skills/by-category', { params: { category } });
        return response.data.map(skill => skill.skillName);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch skills');
    }
};

export const createJobPost = async (jobData) => {
    try {
        const response = await api.post('/jobs', jobData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create job');
    }
};

export const fetchAllActiveJobs = async (userId) => {
    try {
        const response = await api.get("/jobs/active", { params: { userId } })
        return response.data
    } catch (error) {
        console.error("Error fetching active jobs:", error)
        throw error
    }
}

export const fetchPublishedJobsByUser = async (userId) => {
    try {
        const response = await api.get(`/jobs/user/${userId}/published`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch published jobs');
    }
};

export const fetchDraftJobsByUser = async (userId) => {
    try {
        const response = await api.get(`/jobs/user/${userId}/drafts`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch draft jobs');
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

export const applyToJob = async (jobId, userId, coverLetter) => {
    try {
        const response = await api.post(`/jobs/${jobId}/apply?userId=${userId}`, coverLetter, {
            headers: { 'Content-Type': 'text/plain' }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to apply to job');
    }
};

export const toggleBookmark = async (jobId, userId) => {
    try {
        const response = await api.post(`/jobs/${jobId}/bookmark?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to toggle bookmark');
    }
};

export const fetchAppliedJobsByUser = async (userId) => {
    try {
        const response = await api.get(`/jobs/user/${userId}/applied`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch applied jobs');
    }
};

export const fetchBookmarkedJobsByUser = async (userId) => {
    try {
        const response = await api.get(`/jobs/user/${userId}/bookmarked`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch bookmarked jobs');
    }
};

export const updateApplicationStatus = async (jobId, applicantId, status) => {
    try {
        const response = await api.put(`/jobs/${jobId}/application/${applicantId}?userId=${applicantId}`, { status });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update application status');
    }
};

export const updateJobStatus = async (jobId, status, userId) => {
    try {
        const response = await api.put(`/jobs/${jobId}/status?userId=${userId}`, { status });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update job status');
    }
};

export const createRating = async (jobId, freelancerId, ratingData, userId) => {
    try {
        const response = await api.post(`/ratings/job/${jobId}/freelancer/${freelancerId}?userId=${userId}`, ratingData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create rating');
    }
};

export const getAllRatingsByFreelancer = async (freelancerId) => {
    try {
        const response = await api.get(`/ratings/freelancer/${freelancerId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch freelancer ratings');
    }
};