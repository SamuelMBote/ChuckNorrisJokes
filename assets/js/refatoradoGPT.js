async function fetchLogo() {
  const logoResponse = await fetch('https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png');
  const logoBlob = await logoResponse.blob();
  const logo = document.querySelector('#logo');
  const favicon = document.querySelector('[data-favicon]');
  let imglogo = document.createElement('img');
  imglogo.classList.add('.logo');
  imglogo.classList.add('.img-fluid');
  imglogo.setAttribute('src', URL.createObjectURL(logoBlob));
  logo.innerHTML = imglogo.outerHTML;
  favicon.removeAttribute('href');
  favicon.setAttribute('href', URL.createObjectURL(logoBlob));
}

async function fetchCategories() {
  const categorias = document.querySelector('#categorias');
  const jokeCategoriesResponse = await fetch('https://api.chucknorris.io/jokes/categories');
  const jokeCategories = await jokeCategoriesResponse.json();
  const categories = [...jokeCategories, 'random'];

  categories.forEach((category) => {
    let option = document.createElement('option');
    let categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    option.value = category;
    option.innerText = categoryName;
    if (category.toString().includes('random')) {
      option.setAttribute('selected', '');
    }
    categorias.innerHTML += option.outerHTML;
  });
}

async function searchJoke() {
  const categorias = document.querySelector('#categorias');
  const card = document.querySelector('.card-body p');
  const endpoint = categorias.value === 'random'
    ? 'https://api.chucknorris.io/jokes/random'
    : `https://api.chucknorris.io/jokes/random?category=${categorias.value}`;
  const jokeResponse = await fetch(endpoint);
  const joke = await jokeResponse.json();
  card.innerHTML = joke.value;
}

document.querySelector('#buscar').addEventListener('click', searchJoke);

fetchLogo();
fetchCategories();
