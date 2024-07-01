import { fetchCharacters, fetchCharacterById } from './api.js';

const itemsPerPage = 10; 
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayCharacters();
});

const fetchAndDisplayCharacters = async () => {
    try {
        const charactersResponse = await fetchCharacters(currentPage, itemsPerPage);
        displayCharacters(charactersResponse);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
};

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

    createPaginationControls(charactersResponse, fetchCharacters, displayCharacters);
};

const displayCharacterDetails = (character) => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!character || !character.name) {
        console.error('Invalid character data:', character);
        return;
    }

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Characters';
    backButton.classList.add('py-2', 'px-4', 'bg-blue-500', 'text-white', 'rounded', 'mt-4', 'cursor-pointer');
    backButton.addEventListener('click', fetchAndDisplayCharacters);
    outputDiv.appendChild(backButton);

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
        <p><strong>Voiced By:</strong> ${character.voiced_by || 'Unknown'}</p>
        <p><strong>Created At:</strong> ${character.created_at || 'Unknown'}</p>
        <p><strong>Updated At:</strong> ${character.updated_at || 'Unknown'}</p>
        <p><strong>Family:</strong> ${character.family || 'Unknown'}</p>
        <p><strong>Episodes:</strong></p>
        <ul>
            ${character.episodes && character.episodes.length > 0 ? 
                character.episodes.map(episode => `<li>${episode}</li>`).join('') : 
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


fetchAndDisplayCharacters();