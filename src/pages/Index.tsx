// src/pages/Index.tsx
import React, { useState, useMemo, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Header } from '@/components/header'
import { ProductsTable } from '@/components/ProductsTable'
import productsData from '@/data/productos.json'

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

export default function Index() {
  const availableProducts: AvailableProduct[] = productsData

  const [rows, setRows] = useState<Row[]>(
    Array.from({ length: 10 }, () => ({
      codigo: '',
      nombre: '',
      precio: 0,
      cantidad: 0,
    }))
  )

  const [isExporting, setIsExporting] = useState(false)

  const handleProductChange = (index: number, codigo: string) => {
    const prod = availableProducts.find(p => p.codigo === codigo)
    setRows(prev =>
      prev.map((r, i) =>
        i === index && prod
          ? {
              codigo: prod.codigo,
              nombre: prod.nombre,
              precio: prod.precio,
              cantidad: 0,
            }
          : i === index
          ? { codigo: '', nombre: '', precio: 0, cantidad: 0 }
          : r
      )
    )
  }

  const handleQuantityChange = (index: number, cantidad: number) => {
    setRows(prev =>
      prev.map((r, i) => (i === index ? { ...r, cantidad } : r))
    )
  }

  const total = useMemo(
    () =>
      rows
        .reduce((sum, r) => sum + r.precio * r.cantidad, 0)
        .toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    [rows]
  )

  const proformaRef = useRef<HTMLDivElement>(null)

  const exportToJpg = async () => {
    setIsExporting(true)
    await new Promise(resolve => setTimeout(resolve, 50)) // Pequeña espera visual

    if (!proformaRef.current) return

    // Reemplazar inputs y selects por spans para la captura
    const container = proformaRef.current
    const elements = Array.from(
      container.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
        'input, select'
      )
    )
    // Reemplazar inputs/selects por spans visuales
const backups = elements.map(el => {
  const span = document.createElement('span')

  // ✅ Detectar si el input pertenece al encabezado
  const isHeaderField =
  (el instanceof HTMLInputElement &&
    (
      el.id === 'cliente' ||
      el.placeholder === 'Municipio' ||
      el.placeholder === 'Teléfono'
    )) ||
  el.closest('header')

  // Copiar texto visible
  if (el instanceof HTMLInputElement) {
    span.textContent = el.value
  } else {
    const selectedText = el.options[el.selectedIndex]?.text || ''
    span.textContent = selectedText
    if (el.value === '') span.style.color = '#ffffff'
  }

  // Copiar estilos base
  span.className = el.className
  span.style.cssText = getComputedStyle(el).cssText

  // 🔧 Si está en el encabezado, mantener el ancho exacto
  if (isHeaderField) {
  const rect = el.getBoundingClientRect()
  span.style.display = 'flex'
  span.style.alignItems = 'center'
  span.style.justifyContent = 'flex-end' // texto a la derecha
  span.style.width = `${rect.width}px`
  span.style.height = `${rect.height}px`
  span.style.boxSizing = 'border-box'
  span.style.overflow = 'hidden'
  span.style.textAlign = 'right'
  span.style.whiteSpace = 'nowrap'
  span.style.paddingRight = '6px' // mantiene margen interior como input
  }

  // Ocultar input original y mostrar span temporal
  el.style.display = 'none'
  el.parentElement?.appendChild(span)

  return { el, span }
})

    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: '#ffffff',
    })

    backups.forEach(({ el, span }) => {
      el.style.display = ''
      span.remove()
    })

    setIsExporting(false)

    canvas.toBlob(blob => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const now = new Date()
      const dd = String(now.getDate()).padStart(2, '0')
      const mmm = now.toLocaleString('es-ES', { month: 'short' })
      const clienteRaw =
        sessionStorage.getItem('cliente') || 'sin_nombre'
      const cliente = clienteRaw.trim().replace(/\s+/g, '_')
      link.href = url
      link.download = `proforma_allis_${cliente}_${dd}_${mmm}.jpg`
      link.click()
      URL.revokeObjectURL(url)
    }, 'image/jpeg', 0.9)
  }

  return (
    <main className="p-4 bg-white rounded shadow space-y-4">
      <div
        ref={proformaRef}
        className="mx-auto w-full max-w-[750px] bg-white p-4 rounded"
      >
        <Header />

        <ProductsTable
          rows={rows}
          availableProducts={availableProducts}
          onProductChange={handleProductChange}
          onQuantityChange={handleQuantityChange}
          isExporting={isExporting}
        />

        <div className="flex justify-end pr-4 mt-4">
          <div className="bg-allis-celeste p-1.5 rounded shadow w-full max-w-[750px] text-right">
            <span className="font-semibold">Total:</span>{' '}
            <span className="font-bold">C${total}</span>
          </div>
        </div>

        <footer className="mt-6 text-center text-sm text-gray-600 space-y-1">
          <div>Alli&apos;s Helados & Snacks</div>
          <div>Sandra Morazan</div>
          <div>Teléfono: +505 5887-1570</div>
          <div>¡Gracias por su preferencia!</div>
        </footer>
      </div>

      <div className="flex justify-center">
        <button
          onClick={exportToJpg}
          className="bg-allis-celeste hover:bg-allis-rosa text-black font-semibold py-2 px-4 rounded"
        >
          Descargar JPG
        </button>
      </div>
    </main>
  )
}
