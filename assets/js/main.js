import { 
    fetchCharacters, 
    fetchEpisodes, 
    fetchEpisodeById, 
    fetchLocations, 
    fetchLocationById, 
    fetchFamilies, 
    fetchFamilyById, 
    fetchCharacterById 
} from './api.js';

document.getElementById('characters').addEventListener('click', async () => {
    try {
        const characters = await fetchCharacters();
        displayCharacters(characters);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
});

document.getElementById('episodes').addEventListener('click', async () => {
    try {
        const episodes = await fetchEpisodes();
        displayEpisodes(episodes);
    } catch (error) {
        console.error('Error fetching episodes:', error);
    }
});

document.getElementById('locations').addEventListener('click', async () => {
    try {
        const locations = await fetchLocations();
        displayLocations(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
});

document.getElementById('families').addEventListener('click', async () => {
    try {
        const families = await fetchFamilies();
        displayFamilies(families);
    } catch (error) {
        console.error('Error fetching families:', error);
    }
});

const displayCharacters = (charactersResponse) => {
    const characters = charactersResponse.data; 
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; 

    if (!Array.isArray(characters)) {
        console.error('Characters data is not an array:', characters);
        return;
    }

    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.classList.add('character');
        characterElement.textContent = character.name;
        characterElement.addEventListener('click', async () => {
            try {
                const detailedCharacterResponse = await fetchCharacterById(character.id);
                const detailedCharacter = detailedCharacterResponse.data;
                if (detailedCharacter && detailedCharacter.name) {
                    displayCharacterDetails(detailedCharacter);
                } else {
                    console.error(`Character with ID ${character.id} not found or has no name.`);
                }
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        });
        outputDiv.appendChild(characterElement);
    });
};

const displayEpisodes = (episodesResponse) => {
    const episodes = episodesResponse.data; 
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; 

    if (!Array.isArray(episodes)) {
        console.error('Episodes data is not an array:', episodes);
        return;
    }

    episodes.forEach(episode => {
        const episodeElement = document.createElement('div');
        episodeElement.classList.add('episode');
        episodeElement.textContent = episode.name;
        episodeElement.addEventListener('click', async () => {
            try {
                const detailedEpisodeResponse = await fetchEpisodeById(episode.id);
                const detailedEpisode = detailedEpisodeResponse.data;
                if (detailedEpisode && detailedEpisode.name) {
                    displayEpisodeDetails(detailedEpisode);
                } else {
                    console.error(`Episode with ID ${episode.id} not found or has no name.`);
                }
            } catch (error) {
                console.error('Error fetching episode details:', error);
            }
        });
        outputDiv.appendChild(episodeElement);
    });
};

const displayLocations = (locationsResponse) => {
    const locations = locationsResponse.data; 
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!Array.isArray(locations)) {
        console.error('Locations data is not an array:', locations);
        return;
    }

    locations.forEach(location => {
        const locationElement = document.createElement('div');
        locationElement.classList.add('location');
        locationElement.textContent = location.name;
        locationElement.addEventListener('click', async () => {
            try {
                const detailedLocationResponse = await fetchLocationById(location.id);
                const detailedLocation = detailedLocationResponse.data;
                if (detailedLocation && detailedLocation.name) {
                    displayLocationDetails(detailedLocation);
                } else {
                    console.error(`Location with ID ${location.id} not found or has no name.`);
                }
            } catch (error) {
                console.error('Error fetching location details:', error);
            }
        });
        outputDiv.appendChild(locationElement);
    });
};

const displayFamilies = (familiesResponse) => {
    const families = familiesResponse.data; 
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!Array.isArray(families)) {
        console.error('Families data is not an array:', families);
        return;
    }

    families.forEach(family => {
        const familyElement = document.createElement('div');
        familyElement.classList.add('family');
        familyElement.textContent = family.name;
        familyElement.addEventListener('click', async () => {
            try {
                const detailedFamilyResponse = await fetchFamilyById(family.id);
                const detailedFamily = detailedFamilyResponse.data;
                if (detailedFamily && detailedFamily.name) {
                    displayFamilyDetails(detailedFamily);
                } else {
                    console.error(`Family with ID ${family.id} not found or has no name.`);
                }
            } catch (error) {
                console.error('Error fetching family details:', error);
            }
        });
        outputDiv.appendChild(familyElement);
    });
};

const displayCharacterDetails = (character) => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!character || !character.name) {
        console.error('Invalid character data:', character);
        return;
    }
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('character-details');
    detailsDiv.innerHTML = `
        <h2>${character.name}</h2>
        <p><strong>Age:</strong> ${character.age || 'Unknown'}</p>
        <p><strong>Sex:</strong> ${character.sex || 'Unknown'}</p>
        <p><strong>Hair Color:</strong> ${character.hair_color || 'Unknown'}</p>
        <p><strong>Occupation:</strong> ${character.occupation || 'Unknown'}</p>
        <p><strong>Grade:</strong> ${character.grade || 'Unknown'}</p>
        <p><strong>Religion:</strong> ${character.religion || 'Unknown'}</p>
    `;
    outputDiv.appendChild(detailsDiv);
};

const displayEpisodeDetails = (episode) => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!episode || !episode.name) {
        console.error('Invalid episode data:', episode);
        return;
    }
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('episode-details');
    detailsDiv.innerHTML = `
        <h2>${episode.name}</h2>
        <p><strong>Season:</strong> ${episode.season || 'Unknown'}</p>
        <p><strong>Episode:</strong> ${episode.episode || 'Unknown'}</p>
        <p><strong>Air Date:</strong> ${episode.air_date || 'Unknown'}</p>
        <p><strong>Description:</strong> ${episode.description || 'Unknown'}</p>
    `;
    outputDiv.appendChild(detailsDiv);
};

const displayLocationDetails = (location) => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!location || !location.name) {
        console.error('Invalid location data:', location);
        return;
    }
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('location-details');
    detailsDiv.innerHTML = `
        <h2>${location.name}</h2>
    `;
    outputDiv.appendChild(detailsDiv);
};

const displayFamilyDetails = (family) => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; 

    if (!family || !family.name) {
        console.error('Invalid family data:', family);
        return;
    }
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('family-details');
    detailsDiv.innerHTML = `
        <h2>${family.name}</h2>
    `;
    outputDiv.appendChild(detailsDiv);
};
