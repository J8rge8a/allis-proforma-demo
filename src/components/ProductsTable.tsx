// src/components/ProductsTable.tsx
import React from 'react'

type AvailableProduct = {
  codigo: string
  nombre: string
  precio: number
}

type Row = {
  codigo: string
  nombre: string
  precio: number
  cantidad: number
}

interface Props {
  rows: Row[]
  availableProducts: AvailableProduct[]
  onProductChange: (index: number, codigo: string) => void
  onQuantityChange: (index: number, cantidad: number) => void
  isExporting: boolean
}

export function ProductsTable({
  rows,
  availableProducts,
  onProductChange,
  onQuantityChange,
  isExporting,
}: Props) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full table-auto text-sm bg-white shadow rounded">
        <thead>
          <tr className="bg-allis-celeste">
            <th className="px-2 py-1 text-center">Producto</th>
            <th className="px-2 py-1 text-center">Cantidad</th>
            <th className="px-2 py-1 text-center">P/U</th>
            <th className="px-2 py-1 text-center">P/T</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const pt = r.precio * r.cantidad
            const ocultar = isExporting && pt === 0 ? 'text-white' : ''

            return (
              <tr key={i} className={`even:bg-gray-50 ${ocultar}`}>
                {/* Producto (select) */}
                <td className="border px-2 py-1 text-left">
                  <select
                    value={r.codigo}
                    onChange={e => onProductChange(i, e.target.value)}
                    className={`w-full p-1 outline-none bg-transparent text-black`}
                  >
                    <option value=""></option>
                    {availableProducts.map(p => (
                      <option key={p.codigo} value={p.codigo}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Cantidad */}
                <td className="border px-2 py-1 text-center">
                  <input
                    type="number"
                    min={0}
                    value={r.cantidad}
                    onChange={e =>
                      onQuantityChange(i, Number(e.target.value))
                    }
                    className="mx-auto block w-20 p-1 outline-none bg-transparent text-center"
                  />
                </td>

                {/* P/U */}
                <td className="border px-2 py-1 text-right">
                  C$ {r.precio.toFixed(2)}
                </td>

                {/* P/T */}
                <td className="border px-2 py-1 text-right">
                  C$ {pt.toFixed(2)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
