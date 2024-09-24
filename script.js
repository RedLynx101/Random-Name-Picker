// Initialize data from localStorage or create new data
let lists = JSON.parse(localStorage.getItem('nameLists')) || { "Default List": [] };
let currentList = localStorage.getItem('currentList') || "Default List";
let isGridView = JSON.parse(localStorage.getItem('isGridView')) || false;

function saveData() {
    localStorage.setItem('nameLists', JSON.stringify(lists));
    localStorage.setItem('currentList', currentList);
    localStorage.setItem('isGridView', JSON.stringify(isGridView));
}

function renderLists() {
    const listSelector = document.getElementById('list-selector');
    listSelector.innerHTML = '';
    Object.keys(lists).forEach(listName => {
        const option = document.createElement('option');
        option.value = listName;
        option.textContent = listName;
        if (listName === currentList) {
            option.selected = true;
        }
        listSelector.appendChild(option);
    });
}

function renderNames() {
    const nameList = document.getElementById('name-list');
    nameList.innerHTML = '';

    lists[currentList].forEach((nameObj, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${nameObj.name} 
            <div>
                <label>
                    <input type="checkbox" ${nameObj.enabled ? 'checked' : ''} onchange="toggleEnabled(${index})">
                    Enable
                </label>
                <label>
                    <input type="checkbox" ${nameObj.used ? 'checked' : ''} onchange="toggleUsed(${index})">
                    Used
                </label>
                <button onclick="deleteName(${index})">Delete</button>
            </div>
        `;
        nameList.appendChild(li);
    });

    updateView();
}

function updateView() {
    const nameContainer = document.getElementById('name-container');
    if (isGridView) {
        nameContainer.classList.remove('list-view');
        nameContainer.classList.add('grid-view');
    } else {
        nameContainer.classList.remove('grid-view');
        nameContainer.classList.add('list-view');
    }
}

function toggleView() {
    isGridView = !isGridView;
    saveData();
    updateView();
}

function addName() {
    const newNameInput = document.getElementById('new-name');
    const newName = newNameInput.value.trim();
    if (newName) {
        lists[currentList].push({ name: newName, enabled: true, used: false });
        saveData();
        renderNames();
        newNameInput.value = '';
    }
}

function toggleEnabled(index) {
    lists[currentList][index].enabled = !lists[currentList][index].enabled;
    saveData();
    renderNames();
}

function toggleUsed(index) {
    lists[currentList][index].used = !lists[currentList][index].used;
    saveData();
    renderNames();
}

async function selectRandomName() {
    const selectButton = document.getElementById('select-name-btn');
    selectButton.classList.add('spin', 'disabled');
    selectButton.disabled = true;

    const enabledNames = lists[currentList].filter(name => name.enabled && !name.used);
    if (enabledNames.length === 0) {
        alert('No names left to select!');
        selectButton.classList.remove('spin', 'disabled');
        selectButton.disabled = false;
        return;
    }

    // Simulate a delay for the selection process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const randomIndex = Math.floor(Math.random() * enabledNames.length);
    const selectedName = enabledNames[randomIndex].name;
    document.getElementById('selected-name-display').textContent = selectedName;

    // Mark the selected name as used
    const nameObj = lists[currentList].find(n => n.name === selectedName);
    nameObj.used = true;
    saveData();
    renderNames();

    // Highlight the selected name in the list
    const nameItems = document.querySelectorAll('#name-list li');
    nameItems.forEach(item => {
        if (item.textContent.includes(selectedName)) {
            item.classList.add('highlight');
            setTimeout(() => item.classList.remove('highlight'), 1000);
        }
    });

    selectButton.classList.remove('spin', 'disabled');
    selectButton.disabled = false;
}

function resetNames() {
    lists[currentList] = lists[currentList].map(name => ({ ...name, used: false }));
    saveData();
    renderNames();
    document.getElementById('selected-name-display').textContent = 'None';
}

function createNewList() {
    const newListName = document.getElementById('new-list-name').value.trim();
    if (newListName && !lists[newListName]) {
        lists[newListName] = [];
        currentList = newListName;
        saveData();
        renderLists();
        renderNames();
        document.getElementById('new-list-name').value = '';
    } else {
        alert('Please enter a unique list name.');
    }
}

function changeCurrentList() {
    currentList = document.getElementById('list-selector').value;
    saveData();
    renderNames();
}

function exportData() {
    const dataStr = JSON.stringify(lists);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'name_lists.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function importData() {
    const fileInput = document.getElementById('import-file');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                lists = importedData;
                currentList = Object.keys(lists)[0] || "Default List";
                saveData();
                renderLists();
                renderNames();
                alert('Data imported successfully!');
            } catch (error) {
                alert('Error importing data. Please make sure the file is a valid JSON.');
            }
        };
        reader.readAsText(file);
    }
}

function deleteName(index) {
    if (confirm(`Are you sure you want to delete "${lists[currentList][index].name}"?`)) {
        lists[currentList].splice(index, 1);
        saveData();
        renderNames();
    }
}

function deleteList() {
    if (Object.keys(lists).length === 1) {
        alert("You cannot delete the only list.");
        return;
    }

    if (confirm(`Are you sure you want to delete the list "${currentList}"?`)) {
        delete lists[currentList];
        currentList = Object.keys(lists)[0];
        saveData();
        renderLists();
        renderNames();
    }
}

document.getElementById('add-name-btn').addEventListener('click', addName);
document.getElementById('select-name-btn').addEventListener('click', selectRandomName);
document.getElementById('reset-btn').addEventListener('click', resetNames);
document.getElementById('create-list-btn').addEventListener('click', createNewList);
document.getElementById('list-selector').addEventListener('change', changeCurrentList);
document.getElementById('export-btn').addEventListener('click', exportData);
document.getElementById('import-btn').addEventListener('click', function() {
    document.getElementById('import-file').click();
});
document.getElementById('import-file').addEventListener('change', importData);
document.getElementById('delete-list-btn').addEventListener('click', deleteList);
document.getElementById('toggle-view-btn').addEventListener('click', toggleView);

// Add name when Enter key is pressed in the input field
document.getElementById('new-name').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addName();
    }
});

// Add list when Enter key is pressed in the new list input field
document.getElementById('new-list-name').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        createNewList();
    }
});

window.onload = function() {
    renderLists();
    renderNames();
};
