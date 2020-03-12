// randomize the order of the options list
var optionsList = document.getElementById('additionalOptionsList');
for (var i = optionsList.children.length; i >= 0; i--) {
    optionsList.appendChild(optionsList.children[Math.random() * i | 0]);
}

// Create nested sortables
var nestedSortables = [].slice.call(document.querySelectorAll('.nested-sortable'));
// Loop through each nested sortable element
for (var i = 0; i < nestedSortables.length; i++) {
    new Sortable(nestedSortables[i], {
        group: 'shared',
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        ghostClass: 'active'
    });
}

// Main list with months
Sortable.create(mainList, { 
    group: 'nested',
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    sort: false
});

// List with handle
Sortable.create(additionalOptionsList, {
    group: 'shared',
    animation: 150,
    ghostClass: 'active'
});
