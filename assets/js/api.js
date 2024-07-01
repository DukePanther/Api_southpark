
const baseURL = 'https://spapi.dev/api';

export const fetchCharacters = async (page = 1, perPage = 10) => {
    try {
        const response = await fetch(`${baseURL}/characters?page=${page}&per_page=${perPage}`);
        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching characters:', error);
        return { data: [] };
    }
};

export const fetchCharacterById = async (characterId) => {
    try {
        const response = await fetch(`${baseURL}/characters/${characterId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch character with ID ${characterId}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching character with ID ${characterId}:`, error);
        return { data: {} }; 
    }
};

export const fetchEpisodes = async (page = 1, perPage = 10) => {
    try {
        const response = await fetch(`${baseURL}/episodes?page=${page}&per_page=${perPage}`);
        if (!response.ok) {
            throw new Error('Failed to fetch episodes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching episodes:', error);
        return { data: [] };
    }
};

export const fetchEpisodeById = async (episodeId) => {
    try {
        const response = await fetch(`${baseURL}/episodes/${episodeId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch episode with ID ${episodeId}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching episode with ID ${episodeId}:`, error);
        return { data: {} };
    }
};

export const fetchLocations = async (page = 1, perPage = 10) => {
    try {
        const response = await fetch(`${baseURL}/locations?page=${page}&per_page=${perPage}`);
        if (!response.ok) {
            throw new Error('Failed to fetch locations');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching locations:', error);
        return { data: [] };
    }
};

export const fetchFamilyById = async (familyId) => {
    try {
        const response = await fetch(`${baseURL}/families/${familyId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch family with ID ${familyId}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching family with ID ${familyId}:`, error);
        return { data: {} };
    }
};

export const fetchFamilies = async (page = 1, perPage = 10) => {
    try {
        const response = await fetch(`${baseURL}/families?page=${page}&per_page=${perPage}`);
        if (!response.ok) {
            throw new Error('Failed to fetch families');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching families:', error);
        return { data: [] };
    }
};

export const fetchLocationById = async (locationId) => {
    try {
        const response = await fetch(`${baseURL}/locations/${locationId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch location with ID ${locationId}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching location with ID ${locationId}:`, error);
        return { data: {} };
    }
};