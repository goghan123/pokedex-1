import mostrarPokemones from '../pokemon.js';
import fixture from './pokedex.fixture.js';
import bulbasaur from '../../__tests__/pokemonPrueba2.json';

document.body.innerHTML = fixture;
mostrarPokemones(bulbasaur);

test('función mostrar tipos', () => {
  const $tipos = document.querySelector('#tipos');
  expect($tipos.innerHTML).toContain('poison');
});

test('función mostrar habilidades', () => {
  const $habilidades = document.querySelector('#habilidades');
  expect(bulbasaur).toMatchObject($habilidades);
});
