import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

test('Chequeo de texto de cargada de pokemones', () => {
  document.body.innerHTML = '<div class="list-group" id="indice">';
  actualizarTextoIndicePokemones('Acá va la lista');
  expect(document.querySelector('#indice').textContent)
    .toContain('Acá va la lista');
});

test('Chequeo de creación de nombres en la lista', () => {
  const arrayDePrueba = ['pokemon1', 'pokemon2'];
  const relleno = '';
  mostrarListadoPokemones(arrayDePrueba, relleno);
  const $pokemon1 = document.getElementsByTagName('a')[0].innerHTML;
  const $pokemon2 = document.getElementsByTagName('a')[1].innerHTML;
  expect($pokemon1)
    .toContain('pokemon1');
  expect($pokemon2)
    .toContain('pokemon2');
});

test('Chequeo de funcionamiento de botones de la lista', () => {
  const arrayDeRelleno = ['pokemon1', 'pokemon2'];
  const funcionDePrueba = jest.fn();
  mostrarListadoPokemones(arrayDeRelleno, funcionDePrueba);
  const $elementoPrueba1 = document.getElementsByTagName('a')[0];
  function clicEnElemento1() {
    $elementoPrueba1.click();
  }
  clicEnElemento1();
  expect(funcionDePrueba).toHaveBeenCalled();
});
