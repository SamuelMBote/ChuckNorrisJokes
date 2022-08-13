fetch('https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png')
  .then((imagem) => imagem.blob())
  .then((logo_response) => {
    const logo = document.querySelector('#logo');
    const favicon = document.querySelector('[data-favicon]');
    let imglogo = document.createElement('img');
    imglogo.classList.add('.logo');
    imglogo.classList.add('.img-fluid');
    imglogo.setAttribute('src', URL.createObjectURL(logo_response));
    logo.innerHTML = imglogo.outerHTML;
    favicon.removeAttribute('href');
    favicon.setAttribute('href', URL.createObjectURL(logo_response));
  });
const categorias = document.querySelector('#categorias');
fetch('https://api.chucknorris.io/jokes/categories')
  .then((jokeCategories) => jokeCategories.json())
  .then((jokeCategories) => {
    const categories = Array.from(jokeCategories);
    categories.push('random');

    categories.forEach((category) => {
      let option = document.createElement('option');
      let categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      option.value = category;
      option.innerText = categoryName;
      if (category.toString().includes('random')) {
        option.setAttribute('selected', '');
      }
      categorias.innerHTML += option.outerHTML;
      console.log();
    });
  });
const btnBuscar = document.querySelector('#buscar');
btnBuscar.addEventListener('click', searchJoke);
const card = document.querySelector('.card-body p');

function searchJoke() {
  if (categorias.value == 'random') {
    fetch('https://api.chucknorris.io/jokes/random')
      .then((joke) => joke.json())
      .then((joke) => {
        card.innerHTML = joke.value;
      });
  } else {
    fetch(
      `https://api.chucknorris.io/jokes/random?category=${categorias.value}`,
    )
      .then((joke) => joke.json())
      .then((joke) => {
        card.innerHTML = joke.value;
      });
  }
}
