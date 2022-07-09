const pizzaSelect = document.getElementById('pizza-select');
const sizeSelect = document.getElementById('size-select');
const saucesSelect = document.getElementById('sauces-select');
let getValuePizza = 'zero';
pizzaSelect.addEventListener('change', () => {
  if (pizzaSelect.value) {
    getValuePizza = pizzaSelect.value;
  }
});
let getSize = 'zero';
sizeSelect.addEventListener('change', () => {
  if (sizeSelect.value) {
    getSize = sizeSelect.value;
  }
});
let getSauces = 'zero';
saucesSelect.addEventListener('change', () => {
  if (saucesSelect.value) {
    getSize = saucesSelect.value;
  }
});

const form = document.querySelector('.form');
let pricePizza;
form.addEventListener('click', (event) => {
  let target = event.target;

  const price = document.querySelector('.card-price-bold');
  const cost = {
    zero: 0,
    pepperoni: 100,
    village: 120,
    hawaiian: 140,
    mushroom: 160,
    21: 10,
    26: 20,
    31: 30,
    45: 40,
    cheese: 2,
    'sweet-sour': 4,
    garlic: 6,
    barbecue: 8,
  };
  const costSize = {};
  pricePizza =
    cost[`${getValuePizza}`] + cost[`${getSize}`] + cost[`${getSauces}`];
  price.textContent = pricePizza;
});

let objPizza = {};
const formUrl =
  'https://react-form-19a9b-default-rtdb.europe-west1.firebasedatabase.app/pizza.json';

form.addEventListener('submit', (event) => {
  const formData = {};
  let emptyField = false;
  event.preventDefault();
  for (let { name, value } of form.elements) {
    if (name) {
      value = value.trim();
      formData[name] = value;
      if (value == '') emptyField = true;
    }
  }
  formData.pricePizza = pricePizza;
  if (emptyField) {
    alert('Заполнены не все поля формы!');
  } else {
    fetch(formUrl, {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((formData) => {
        alert('The order has been successfully placed!');
        location.reload();
        form.reset();
      })
      .catch((error) => {
        alert('An error has occurred, the status' + error.message);
      });
  }
  objPizza = formData;
});

const renderGoods = (goods) => {
  const goodsPizza = Object.keys(goods).map((key) => {
    return {
      id: key,
      pizzas: goods[key].pizzas,
      pricePizza: goods[key].pricePizza,
      sauces: goods[key].sauces,
      sizes: goods[key].sizes,
    };
  });
  const goodsWrapper = document.querySelector('.pizza-cards');

  goodsWrapper.innerHTML = '';
  goodsPizza.forEach((item) => {
    const { id, pizzas, pricePizza, sauces, sizes } = item;
    goodsWrapper.insertAdjacentHTML(
      'beforeend',
      `
    <div class="card order">
              <h2>Your order</h2>
              <p> Пиццы: ${pizzas}</p>
              <p> Соусы:  ${sauces}</p>
              <p> Размер: ${sizes}</p>
              <p>Цена:${pricePizza}</p>
            </a>
          </div>
    `
    );
  });
};

const getData = () => {
  fetch(
    'https://react-form-19a9b-default-rtdb.europe-west1.firebasedatabase.app/pizza.json'
  )
    .then((response) => response.json())
    .then((data) => {
      renderGoods(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
getData();
