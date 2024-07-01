import { fetchEpisodes, fetchEpisodeById } from './api.js';

const itemsPerPage = 10;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayEpisodes();
});

const fetchAndDisplayEpisodes = async () => {
    try {
        const episodesResponse = await fetchEpisodes(currentPage, itemsPerPage);
        displayEpisodes(episodesResponse);
    } catch (error) {
        console.error('Error fetching episodes:', error);
    }
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

    createPaginationControls(episodesResponse, fetchEpisodes, displayEpisodes);
};

const displayEpisodeDetails = (episode) => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!episode || !episode.name) {
        console.error('Invalid episode data:', episode);
        return;
    }

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to episodes';
    backButton.classList.add('py-2', 'px-4', 'bg-blue-500', 'text-white', 'rounded', 'mt-4', 'cursor-pointer');
    backButton.addEventListener('click', fetchAndDisplayEpisodes);
    outputDiv.appendChild(backButton);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('episode-details');
    detailsDiv.innerHTML = `
        <h2>${episode.name}</h2>
        <p><strong>Season:</strong> ${episode.season || 'Unknown'}</p>
        <p><strong>Episode:</strong> ${episode.episode || 'Unknown'}</p>
        <p><strong>Air Date:</strong> ${episode.air_date || 'Unknown'}</p>
        <p><strong>Wiki URL:</strong> <a href="${episode.wiki_url || '#'}">${episode.wiki_url || 'Unknown'}</a></p>
        <p><strong>Description:</strong> ${episode.description || 'Unknown'}</p>
        <p><strong>Created At:</strong> ${episode.created_at || 'Unknown'}</p>
        <p><strong>Updated At:</strong> ${episode.updated_at || 'Unknown'}</p>
        <p><strong>Characters:</strong></p>
        <ul>
            ${episode.characters && episode.characters.length > 0 ? 
                episode.characters.map(character => `<li>${character}</li>`).join('') : 
                '<li>None</li>'
            }
        </ul>
        <p><strong>Locations:</strong></p>
        <ul>
            ${episode.locations && episode.locations.length > 0 ? 
                episode.locations.map(location => `<li>${location}</li>`).join('') : 
                '<li>None</li>'
            }
        </ul>
    `;
    outputDiv.appendChild(detailsDiv);
};

const createPaginationControls = (data, fetchFunction, displayFunction) => {
    const outputDiv = document.getElementById('output');
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            const data = await fetchFunction(currentPage, itemsPerPage);
            displayFunction(data);
        }
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = !data.links.next; 
    nextButton.addEventListener('click', async () => {
        if (data.links.next) {
            currentPage++;
            const data = await fetchFunction(currentPage, itemsPerPage);
            displayFunction(data);
        }
    });

    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(nextButton);
    outputDiv.appendChild(paginationDiv);
};


fetchAndDisplayEpisodes();
