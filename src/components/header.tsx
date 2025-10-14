// src/components/Header.tsx
import React, { useState, useEffect } from 'react'

export function Header() {
  const [fecha, setFecha] = useState('')
  const [cliente, setCliente] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [telefono, setTelefono] = useState('')

  useEffect(() => {
    setFecha(new Date().toLocaleDateString('es-NI'))
  }, [])

  return (
    <header className="w-full flex items-start justify-between p-4 bg-white shadow-sm">
      {/* Columna izquierda: logo, PROFORMA y fecha */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Facturas Alli's"
          className="h-[100px] w-auto"
        />
        <h1 className="mt-2 text-2xl font-bold">FACTURA</h1>
        <span className="mt-1 text-sm font-semibold">
          Fecha: <span className="font-normal">{fecha}</span>
        </span>
      </div>

      {/* Campos del cliente alineados verticalmente a la derecha */}
      <div className="flex flex-col items-end space-y-3">
        <input
          type="text"
          id="cliente"
          value={cliente}
          onChange={e => {
            setCliente(e.target.value)
            sessionStorage.setItem('cliente', e.target.value)
          }}
          placeholder="Cliente"
          className="w-[260px] p-2 border rounded bg-allis-amarillo placeholder-gray-500 focus:outline-none text-right"
        />
        <input
          type="text"
          value={municipio}
          onChange={e => setMunicipio(e.target.value)}
          placeholder="Municipio"
          className="w-[260px] p-2 border rounded bg-allis-amarillo placeholder-gray-500 focus:outline-none text-right"
        />
        <input
          type="text"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          placeholder="Teléfono"
          className="w-[260px] p-2 border rounded bg-allis-amarillo placeholder-gray-500 focus:outline-none text-right"
        />
      </div>
    </header>
  )
}
