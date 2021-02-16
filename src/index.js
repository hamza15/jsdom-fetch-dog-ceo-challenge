console.log('%c HI', 'color: firebrick')


document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    getBreeds()
})

function fetchDogs() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => 
        addImage(image) )
    });
}

function addImage(imageUrl) {
    let container = document.getElementById('dog-image-container')
    let image = document.createElement('img')
    image.src = imageUrl
    container.appendChild(image)
}

function getBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
    .then(res=> res.json())
    .then(results => {
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelectListener();
      });
  }
  
  function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
  }
  
  function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
  }
  
  function filterBreed(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
  }
  
  function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
      filterBreed(event.target.value);
    });
  }
  
  function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
  }
  function updateColor(event) {
    event.target.style.color = 'pink';
  }