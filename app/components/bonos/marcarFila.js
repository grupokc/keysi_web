export function marcarFilaAmarilla(dataBonoRango) {
  let iCeros = 0;

  return dataBonoRango.map((bonoRango, index) => {
    let filaAmarilla = false;

    if (
      index > 0 &&
      index < dataBonoRango.length - 1 &&
      bonoRango.En_Rango === 1 &&
      dataBonoRango[index - 1].En_Rango === 1 &&
      dataBonoRango[index + 1].En_Rango === 0
    ) {
      filaAmarilla = true;
    }

    if (bonoRango.En_Rango === 0) {
      iCeros++;
    }

    return { ...bonoRango, filaAmarilla };
  });
}
