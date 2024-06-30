
const apiRoot = 'https://spapi.dev/api/';

export const fetchCharacters = async () => {
    try {
        const response = await fetch(`${apiRoot}characters`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};

export const fetchEpisodes = async () => {
    try {
        const response = await fetch(`${apiRoot}episodes`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching episodes:', error);
        throw error;
    }
};

export const fetchEpisodeById = async (id) => {
    try {
        const response = await fetch(`${apiRoot}episodes/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching episode with ID ${id}:`, error);
        throw error;
    }
};

export const fetchLocations = async () => {
    try {
        const response = await fetch(`${apiRoot}locations`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchLocationById = async (id) => {
    try {
        const response = await fetch(`${apiRoot}locations/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching location with ID ${id}:`, error);
        throw error;
    }
};

export const fetchFamilies = async () => {
    try {
        const response = await fetch(`${apiRoot}families`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching families:', error);
        throw error;
    }
};

export const fetchFamilyById = async (id) => {
    try {
        const response = await fetch(`${apiRoot}families/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching family with ID ${id}:`, error);
        throw error;
    }
};

export const fetchCharacterById = async (id) => {
    try {
        const response = await fetch(`${apiRoot}characters/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching character with ID ${id}:`, error);
        throw error;
    }
};