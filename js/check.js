const nestedQuery = '.nested-sortable';
const identifier = 'sortableId';
const root = document.getElementById('mainList');
const additionalList = document.getElementById('additionalOptionsList');
let allSet = allOptions();

function checkCorrect() {
    var currentList = serialize(root);
    let correctSet = new Set();

    for (let i = 0; i < currentList.length; i++) {
        for (let j = 0; j < currentList[i].children.length; j++) {
            var child = currentList[i].children[j];
            var position = child.id.charAt(0);
            
            if (position == i+1) {
                correctSet.add(child.id);
            }
        }
    }
    let incorrectSet = difference(allSet, correctSet);

    colorListItems(correctSet, incorrectSet);
}

function colorListItems(correct, incorrect) {
    var matches = document.querySelectorAll("div[data-sortable-id]");
    let children = Array.from(matches);
    for (var i in children) {
        children[i].classList.remove("list-group-item-secondary");
        children[i].classList.remove("list-group-item-danger");
        children[i].classList.remove("list-group-item-success");

        if (correct.has(children[i].attributes["data-sortable-id"].nodeValue)) {
            children[i].classList.add("list-group-item-success");
        }
        else if (incorrect.has(children[i].attributes["data-sortable-id"].nodeValue)) {
            children[i].classList.add("list-group-item-danger");
        }
        else {
            children[i].classList.add("list-group-item-secondary");
        }
    }
}

function serialize(sortable) {
  var serialized = [];
  var children = [].slice.call(sortable.children);
  for (var i in children) {
    var nested = children[i].querySelector(nestedQuery);
    serialized.push({
      id: children[i].dataset[identifier],
      children: nested ? serialize(nested) : []
    });
  }
  return serialized
}

function allOptions() {
    let options = new Set();
    var children = [].slice.call(additionalList.children);
    for (var i in children) {
        options.add(children[i].attributes["data-sortable-id"].nodeValue);
    }
    return options;
}

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}
