// Elige cuántas columnas usar según la cantidad de tarjetas, para que la
// última fila no quede con una sola tarjeta suelta. Ej: 4 tarjetas se ven
// mejor en 2x2 que en 3+1; con un número impar, la primera fila lleva más
// tarjetas que la última (5 = 3 arriba y 2 abajo).
const COLUMNS_BY_COUNT = { 1: 1, 2: 2, 3: 3, 4: 2, 5: 3, 6: 3 }

// Clases estáticas (no interpoladas) para que Tailwind las detecte al compilar.
const WIDTH_CLASS_BY_COLUMNS = {
  1: 'w-full',
  2: 'w-full sm:w-[calc(50%-1rem)]',
  3: 'w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]',
}

export function cardWidthClass(count) {
  const columns = COLUMNS_BY_COUNT[count] || 3
  return WIDTH_CLASS_BY_COLUMNS[columns]
}
