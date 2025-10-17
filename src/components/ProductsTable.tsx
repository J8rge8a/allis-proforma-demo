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
        <div
      className="w-full max-w-[800px] mx-auto overflow-x-auto bg-white shadow rounded"
    >
      <table className="w-full min-w-[600px] table-auto text-sm sm:text-base border-collapse">
        <thead>
          <tr className="bg-allis-celeste">
            <th className="px-2 py-1 text-center whitespace-nowrap">Producto</th>
            <th className="px-2 py-1 text-center whitespace-nowrap">Cantidad</th>
            <th className="px-2 py-1 text-center whitespace-nowrap">P/U</th>
            <th className="px-2 py-1 text-center whitespace-nowrap">P/T</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const pt = r.precio * r.cantidad
            const ocultar = isExporting && pt === 0 ? 'text-white' : ''

            return (
              <tr key={i} className={`even:bg-gray-50 ${ocultar} transition-colors`}>
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
                    value={r.cantidad === 0 ? '' : r.cantidad}
                      onChange={e => {
                        const val = e.target.value
                        onQuantityChange(i, val === '' ? 0 : Number(val))}
                    }
                    className="mx-auto block w-16 sm:w-20 p-1 outline-none bg-transparent text-center text-sm sm:text-base"
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
