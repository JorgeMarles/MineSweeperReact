import { useEffect, useState } from "react";
import Modal from "./Modal";
import Info from "./Info";



let minas: number;
let minasOrig: number;
function matriz(rows: number, cols: number): string[][] {
  let factorCantidad = 1.5;
  minas = Math.round(Math.round((rows * cols) / 10) * factorCantidad);
  minasOrig = minas;
  console.log("minas: ", minasOrig);

  let m = Array.from({ length: rows }, () => Array.from({ length: cols }, () => '0'));

  let indexes = randomIndex((rows * cols), minasOrig);

  for (let i = 0; i < indexes.length; i++) {
    let pos = indexes[i];
    let y = pos % cols;
    let x = Math.round((pos - y) / cols);
    m[x][y] = 'x';
  }

  return m;
}

function randomIndex(n: number, x: number): number[] {
  let arr: any[] = []; // matriz para almacenar los índices aleatorios

  // Generar n índices aleatorios únicos y agregarlos a la matriz
  for (let i = 0; i < x; i++) {
    let randIndex;
    do {
      randIndex = Math.floor(Math.random() * n); // Generar un número aleatorio entre 0 y n-1
    } while (arr.includes(randIndex)); // Generar otro número si el número aleatorio generado ya está en la matriz
    arr.push(randIndex); // Agregar el número aleatorio generado a la matriz
  }
  return arr;
}
let GAME_STATE = 0;
export default function Tablero() {

  const MINA = 'bg-red-500';
  const MARCADO = 'bg-green-500';
  const SIN_ROMPER = 'bg-blue-500';
  const rows = 5, cols = 5;

  const [celdas, setCeldas] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => "0")));
  const [color, setColor] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => "bg-blue-500")));
  const [valor, setValor] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")));
  const [time, setTime] = useState("");

  function getCollindants(i: number, j: number, diag: boolean): any[] {
    const positions: number[][] =
      [
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1]
      ];

    let v: any[] = []
    for (let index = 0; index < 8; index += (diag ? 1 : 2)) {
      const [sum1, sum2] = positions[index];
      const pos1 = i + sum1;
      const pos2 = j + sum2;
      if (celdas[pos1] !== undefined && celdas[pos1][pos2] !== undefined) v.push([pos1, pos2]);
    }
    return v;
  }

  function countMines(i: number, j: number, x = celdas): number {
    let r = 0;
    let array = getCollindants(i, j, true);
    //console.log("collindants",i,j,array);

    array.map((e) => {
      let [i, j] = e;
      //console.log("contando minas",`${i},${j}`,x[i][j]);

      if (x[i][j] === 'x') r++;
    })
    return r;
  }

  function getCollindantsZeros(i: number, j: number): any[] {
    let neighbors = getCollindants(i, j, false);
    let rt: any[] = [];
    neighbors.map((e) => {
      let [i, j] = e;

      if (celdas[i][j] !== 'x' && color[i][j] === SIN_ROMPER) {
        rt.push([i, j])
        //console.log(`Celda en ${i},${j}: ${celdas[i][j]} con color ${color[i][j]}`);

      }
    })
    return rt;
  }

  function breakZeros(i: number, j: number, calledFromAnother = false) {
    let unbroken = getCollindantsZeros(i, j);
    setColorPos(i, j, '');
    setValorPos(i, j, celdas[i][j])
    //console.log(`unbroken on ${i},${j}`, unbroken);
    if (unbroken.length === 0) return;
    unbroken.map((e) => {
      let [x, y] = e;
      if (color[x][y] !== '') {
        if (celdas[x][y] === '0') breakZeros(x, y, true);
        else if (calledFromAnother) breakZerosLast(x, y);
      }
    })
  }

  function breakZerosLast(i: number, j: number) {
    let unbroken = getCollindantsZeros(i, j);
    setColorPos(i, j, '');
    setValorPos(i, j, celdas[i][j])
    unbroken.map((e) => {
      let [x, y] = e;
      setColorPos(x, y, '');
      setValorPos(x, y, celdas[x][y])
    })
  }

  function breakMines() {
    for (let i = 0; i < celdas.length; i++) {
      for (let j = 0; j < celdas[i].length; j++) {
        let c = celdas[i][j];
        if (c === 'x') {
          valor[i][j] = c;
          color[i][j] = MINA;

        }
      }

    }
  }

  function verificarGanarJuego() {
    let ok = true;
    for (let i = 0; ok && i < celdas.length; i++) {
      for (let j = 0; ok && j < celdas[i].length; j++) {
        if (celdas[i][j] !== 'x') ok = color[i][j] === '';

      }

    }
    if (ok) GAME_STATE = 1;

  }

  function handleClick(i: number, j: number, e: any) {
    //console.log(celdas);

    let s: string = celdas[i][j];

    switch (e.button) {
      case 0:
        if (color[i][j] !== '' && color[i][j] !== MINA) {
          if (s === 'x') {
            GAME_STATE = -1;
            breakMines();
            setColorPos(i, j, MINA)
            setValorPos(i, j, "x")
          }
          else {
            breakZeros(i, j);
            //setColorPos(i, j, '')
          }
        }

        break;
      case 2:
        if (color[i][j] === SIN_ROMPER) setColorPos(i, j, MARCADO), minas--;
        else if (color[i][j] === MARCADO) setColorPos(i, j, SIN_ROMPER), minas++;
        break;
    }
    verificarGanarJuego();
  }

 

  function setColorPos(i: number, j: number, c: string) {
    let copy = [...color];
    copy[i][j] = c;

    setColor(copy);
  }

  function setValorPos(i: number, j: number, c: string) {
    let copy = [...valor];
    copy[i][j] = c === '0' ? '' : c;

    setValor(copy);
  }

  function numbers(mat: string[][]): string[][] {
    let matriz = [...mat]
    //console.log(mat, matriz);

    matriz.map((arr, i) => {
      arr.map((e, j) => {
        let num = countMines(i, j, mat);
        if (e !== 'x') matriz[i][j] = "" + num;
        //console.log(`para ${i}, ${j}: `,e);

      })
    })
    console.log("numbers", matriz);

    return matriz;
  }

  useEffect(() => {
    let x = numbers(matriz(rows, cols))
    setCeldas(x);
  }, [])

  function getFrame() {
    let r = null;
    if (GAME_STATE !== 0) {
      let title: string = "";
      let body: string = "";
      if(GAME_STATE === 1){
        title = "Ganaste :D";
        body = `Felicidades! lograste completar el tablero en ${time}`
      }else if(GAME_STATE === -1){
        title = "Perdiste :(";
        body = `Te faltaban ${minas} minas. Tardaste ${time} en perder.`;
      }
      
      r = <Modal opened={true} title={title} body={body}/>
    } else {
      r = <>
        <div className="table w-full">
          {celdas.map((v: any[], i) => {
            return <>
              <div className="table-row" key={i + 'row'}>
                {v.map((val: any, j) => {
                  let c = color[i][j];
                  let key = i * cols + j;
                  let numero = valor[i][j];
                  return <div onContextMenu={(e) => e.preventDefault()} onMouseDown={e => handleClick(i, j, e)} className={`table-cell border-2 border-black w-12 h-24 text-center align-middle ${c}`} key={key}>{numero}</div>
                })}
              </div>
            </>
          })}
        </div>
        <Info minas={minas} time={new Date()} setTime={setTime}/>
      </>

    }
    return r;
  }
  //pasarle del componente timer al tablero mandandole el set por aca
  
  return <>
    {getFrame()}
    </>;
}
