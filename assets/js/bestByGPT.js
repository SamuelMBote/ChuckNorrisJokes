fetch('https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png')
  .then((r) => r.blob())
  .then((imgBlob) => {
    const logo = document.querySelector('#logo');
    const favicon = document.querySelector('[data-favicon]');
    const imglogo = new Image();
    imglogo.classList.add('.logo', '.img-fluid');
    imglogo.src = URL.createObjectURL(imgBlob);
    logo.innerHTML = '';
    logo.appendChild(imglogo);
    favicon.href = URL.createObjectURL(imgBlob);
  });

const categorias = document.querySelector('#categorias');
fetch('https://api.chucknorris.io/jokes/categories')
  .then((r) => r.json())
  .then((categories) => {
    categories.push('random');
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.innerText = category[0].toUpperCase() + category.slice(1);
      option.selected = category.includes('random');
      categorias.appendChild(option);
    });
  });

const btnBuscar = document.querySelector('#buscar');
btnBuscar.addEventListener('click', searchJoke);
const card = document.querySelector('.card-body p');

function searchJoke() {
  const apiUrl = `https://api.chucknorris.io/jokes/random${
    categorias.value !== 'random' ? `?category=${categorias.value}` : ''
  }`;
  fetch(apiUrl)
    .then((r) => r.json())
    .then((joke) => {
      card.innerHTML = joke.value;
    });
}
