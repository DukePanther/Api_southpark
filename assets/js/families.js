import { fetchFamilies, fetchFamilyById } from './api.js';

const itemsPerPage = 10;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayFamilies();
});

const fetchAndDisplayFamilies = async () => {
    try {
        const familiesResponse = await fetchFamilies(currentPage, itemsPerPage);
        displayFamilies(familiesResponse);
    } catch (error) {
        console.error('Error fetching families:', error);
    }
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

    createPaginationControls(familiesResponse, fetchFamilies, displayFamilies);
};

const displayFamilyDetails = (family) => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!family || !family.name) {
        console.error('Invalid family data:', family);
        return;
    }

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to families';
    backButton.classList.add('py-2', 'px-4', 'bg-blue-500', 'text-white', 'rounded', 'mt-4', 'cursor-pointer');
    backButton.addEventListener('click', fetchAndDisplayFamilies);
    outputDiv.appendChild(backButton);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('family-details');
    detailsDiv.innerHTML = `
        <h2>${family.name}</h2>
        <p><strong>created_at:</strong> ${family.created_at || 'Unknown'}</p>
        <p><strong>updated_at:</strong> ${family.updated_at || 'Unknown'}</p>
        <p><strong>characters:</strong></p>
        <ul>
            ${family.characters && family.characters.length > 0 ? 
                family.characters.map(character => `<li>${character}</li>`).join('') : 
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


fetchAndDisplayFamilies();
