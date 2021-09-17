import mostrarPokemones from '../pokemon.js';
import fixture from './pokedex.fixture.js';
import bulbasaur from '../../__tests__/pokemonPrueba.json';

document.body.HTML = fixture;

mostrarPokemones(bulbasaur);

test('función mostrar tipos', () => {
  const $tipos = document.querySelector('#tipos');
  expect($tipos).toContain('hola');
});

test('función mostrar habilidades', () => {
  const $habilidades = document.querySelector('#habilidades');
  expect($habilidades).toContain('hola');
});
