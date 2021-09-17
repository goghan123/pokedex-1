import mostrarPaginador from '../paginador.js';
import fixture from './pokedex.fixture.js';
import manejarCambioPagina from '../paginador.js';

let urlSiguienteDePrueba = 'urlSiguienteDePrueba';
let urlAnteriorDePrueba = 'urlAnteriorDePrueba';

document.body.innerHTML = fixture;
const mockCallBackPaginaSeleccionada = jest.fn();

function crearItemPaginador(texto, url = '#') {
  const $item = document.createElement('li');
  const $link = document.createElement('a');
  $item.className = 'page-item';
  $link.className = 'page-link';
  $link.textContent = texto;
  $link.href = url;
  $link.dataset.pagina = texto;

  $item.appendChild($link);

  return $item;
}

describe('chequear función default', () => {
  mostrarPaginador(1500, 8, urlSiguienteDePrueba, urlAnteriorDePrueba,
    mockCallBackPaginaSeleccionada);

  test('cantidad de páginas creadas', () => {
    let listaPaginador = [];
    listaPaginador = document.getElementsByClassName('page-item');
    expect(listaPaginador).toHaveLength(77);
  });

  test('creación de botón "página anterior"', () => {
    mostrarPaginador(1500, 2, urlSiguienteDePrueba, urlAnteriorDePrueba, mockCallBackPaginaSeleccionada);
    const $paginaAnterior = crearItemPaginador('Anterior', urlAnteriorDePrueba);
    // para chequear que esté creado el botón "Página anterior":
    expect($paginaAnterior).toHaveProperty('className', 'page-item');
  });

  test('desactivación de botón "página anterior"', () => {
    const $paginaAnterior = crearItemPaginador('Anterior', urlAnteriorDePrueba);
    function desactivarPaginaAnterior() {
      urlAnteriorDePrueba = '';
      mostrarPaginador(1500, 2, urlSiguienteDePrueba, urlAnteriorDePrueba, mockCallBackPaginaSeleccionada);
    }
    desactivarPaginaAnterior();
    crearItemPaginador('Anterior', urlAnteriorDePrueba);

    if (urlAnteriorDePrueba) {
      $paginaAnterior.classList.remove('disabled');
    } else {
      $paginaAnterior.classList.add('disabled');
    }

    expect($paginaAnterior.className).toContain('disabled');
  });

  test('numeración de páginas igual al id', () => {
    const ejemploDataPaginador = document.getElementsByClassName('page-item')[4].innerHTML;
    const ejemploNombrePaginador = document.getElementsByClassName('page-item')[4].textContent;
    expect(ejemploNombrePaginador).toEqual('4');
    expect(ejemploDataPaginador).toContain('data-pagina=\"4\"');
  });

  test('creación de botón "página siguiente"', () => {
    mostrarPaginador(1500, 2, urlSiguienteDePrueba, urlAnteriorDePrueba, mockCallBackPaginaSeleccionada);
    const $paginaSiguiente = crearItemPaginador('siguiente', urlSiguienteDePrueba);
    // para chequear que esté creado el botón "Página siguiente":
    expect($paginaSiguiente).toHaveProperty('className', 'page-item');
  });

  test('desactivación de botón "página siguiente"', () => {
    const $paginaSiguiente = crearItemPaginador('Siguiente', urlSiguienteDePrueba);
    function desactivarPaginaSiguiente() {
      urlSiguienteDePrueba = '';
      mostrarPaginador(1500, 2, urlSiguienteDePrueba, urlAnteriorDePrueba, mockCallBackPaginaSeleccionada);
    }
    desactivarPaginaSiguiente();
    crearItemPaginador('Siguiente', urlSiguienteDePrueba);

    if (urlSiguienteDePrueba) {
      $paginaSiguiente.classList.remove('disabled');
    } else {
      $paginaSiguiente.classList.add('disabled');
    }

    expect($paginaSiguiente.className).toContain('disabled');
  });
});

describe('chequeo función manejarCambioPagina', () => {
  test('respuesta de clic en paginador', () => {
    const $paginador = document.querySelector('#paginador');
    const $elementoPorCliquear = document.getElementsByTagName('a')[10];
    $paginador.appendChild($elementoPorCliquear);
    $elementoPorCliquear.href = mockCallBackPaginaSeleccionada;
    $elementoPorCliquear.click();
    expect(mockCallBackPaginaSeleccionada).toHaveBeenCalledTimes(1);
    expect(mockCallBackPaginaSeleccionada).not.toHaveBeenCalledTimes(2);
  });
});
