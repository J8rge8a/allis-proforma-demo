// src/components/header.tsx
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
<header
  className="
    w-full 
    min-w-[320px] max-w-[800px]
    flex flex-row justify-between items-start
    flex-wrap md:flex-nowrap
    p-4 bg-white shadow-sm gap-4 
    mx-auto
  "
  style={{
    flexWrap: 'nowrap',
    overflow: 'hidden',
  }}
>
      {/* Columna izquierda: logo, PROFORMA y fecha */}
      <div className="flex-shrink-0 flex flex-col items-center w-[40%] sm:w-[35%] md:w-auto">
        <img
          src="/logo.png"
          alt="Proformas DEMO Alli's"
          className="h-[70px] sm:h-[90px] md:h-[110px] w-auto mx-auto"
        />
        <h1 className="mt-1 text-xl sm:text-2xl font-semibold leading-tight text-center">
        PROFORMA DEMO
        </h1>
        <span className="mt-1 text-xs sm:text-sm font-semibold">
          Fecha: <span className="font-normal">{fecha}</span>
        </span>
      </div>

      {/* Campos del cliente alineados verticalmente a la derecha */}
      <div className="flex flex-col justify-center items-end space-y-2 w-[60%] sm:w-[65%] md:w-auto">
        <input
          type="text"
          id="cliente"
          value={cliente}
          onChange={e => {
            setCliente(e.target.value)
            sessionStorage.setItem('cliente', e.target.value)
          }}
          placeholder="Cliente"
          className="w-full max-w-[220px] sm:max-w-[760px] p-2 border rounded bg-allis-amarillo text-center sm:text-right placeholder-gray-500 focus:outline-none"
        />
        <input
          type="text"
          value={municipio}
          onChange={e => setMunicipio(e.target.value)}
          placeholder="Municipio"
          className="w-full max-w-[220px] sm:max-w-[760px] p-2 border rounded bg-allis-amarillo text-center sm:text-right placeholder-gray-500 focus:outline-none"
        />
        <input
          type="text"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          placeholder="Teléfono"
          className="w-full max-w-[220px] sm:max-w-[760px] p-2 border rounded bg-allis-amarillo text-center sm:text-right placeholder-gray-500 focus:outline-none"
        />
      </div>
    </header>
  )
}
