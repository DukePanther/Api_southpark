import { fetchLocations, fetchLocationById } from './api.js';

const itemsPerPage = 10; 
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayLocations();
});

const fetchAndDisplayLocations = async () => {
    try {
        const locationsResponse = await fetchLocations(currentPage, itemsPerPage);
        displayLocations(locationsResponse);
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
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

    createPaginationControls(locationsResponse, fetchLocations, displayLocations);
};

const displayLocationDetails = (location) => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!location || !location.name) {
        console.error('Invalid location data:', location);
        return;
    }

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Locations';
    backButton.classList.add('py-2', 'px-4', 'bg-blue-500', 'text-white', 'rounded', 'mt-4', 'cursor-pointer');
    backButton.addEventListener('click', fetchAndDisplayLocations);
    outputDiv.appendChild(backButton);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('location-details');
    detailsDiv.innerHTML = `
        <h2>${location.name}</h2>
        <p><strong>Created At:</strong> ${location.created_at || 'Unknown'}</p>
        <p><strong>Updated At:</strong> ${location.updated_at || 'Unknown'}</p>
        <p><strong>Episodes:</strong></p>
        <ul>
            ${location.episodes && location.episodes.length > 0 ? 
                location.episodes.map(episode => `<li>${episode}</li>`).join('') : 
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


fetchAndDisplayLocations();
