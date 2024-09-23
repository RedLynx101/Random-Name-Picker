// Initialize data from localStorage or create new data
let names = JSON.parse(localStorage.getItem('names')) || [];

function renderNames() {
    const nameList = document.getElementById('name-list');
    nameList.innerHTML = '';

    names.forEach((nameObj, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${nameObj.name} 
            <div>
                <label>
                    <input type="checkbox" ${nameObj.enabled ? 'checked' : ''} onchange="toggleEnabled(${index})">
                    Enable
                </label>
                <span>${nameObj.used ? '(Used)' : ''}</span>
            </div>
        `;
        nameList.appendChild(li);
    });
}

function addName() {
    const newNameInput = document.getElementById('new-name');
    const newName = newNameInput.value.trim();
    if (newName) {
        names.push({ name: newName, enabled: true, used: false });
        localStorage.setItem('names', JSON.stringify(names));
        renderNames();
        newNameInput.value = '';
    }
}

function toggleEnabled(index) {
    names[index].enabled = !names[index].enabled;
    localStorage.setItem('names', JSON.stringify(names));
    renderNames();
}

function selectRandomName() {
    const enabledNames = names.filter(name => name.enabled && !name.used);
    if (enabledNames.length === 0) {
        alert('No names left to select!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * enabledNames.length);
    const selectedName = enabledNames[randomIndex].name;
    document.getElementById('selected-name-display').textContent = selectedName;

    // Mark the selected name as used
    const nameObj = names.find(n => n.name === selectedName);
    nameObj.used = true;
    localStorage.setItem('names', JSON.stringify(names));
    renderNames();
}

function resetNames() {
    names = names.map(name => ({ ...name, used: false }));
    localStorage.setItem('names', JSON.stringify(names));
    renderNames();
    document.getElementById('selected-name-display').textContent = 'None';
}

document.getElementById('add-name-btn').addEventListener('click', addName);
document.getElementById('select-name-btn').addEventListener('click', selectRandomName);
document.getElementById('reset-btn').addEventListener('click', resetNames);

// Add name when Enter key is pressed in the input field
document.getElementById('new-name').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addName();
    }
});

window.onload = renderNames;
