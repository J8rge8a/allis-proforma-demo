
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import productosData from "../data/productos.json";
import logo from "../assets/logo.svg";
import { Download } from "lucide-react";

interface Producto {
  codigo: string;
  nombre: string;
  um: string;
  precio: number;
  imagen: string;
  cantidad?: number;
}

interface Cliente {
  nombre: string;
  municipio: string;
  telefono: string;
}

const Proforma: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cliente, setCliente] = useState<Cliente>({
    nombre: "",
    municipio: "",
    telefono: "",
  });
  const proformaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const fechaActual = new Date().toLocaleDateString('es-NI');

  // Cargar productos al iniciar
  useEffect(() => {
    const productosConCantidad = productosData.map(p => ({ ...p, cantidad: 0 })) as Producto[];
    setProductos(productosConCantidad);
  }, []);

  // Manejar cambios en cantidad
  const handleCantidadChange = (codigo: string, cantidad: string) => {
    const cantidadNum = cantidad === "" ? 0 : parseFloat(cantidad);
    
    setProductos(prevProductos => 
      prevProductos.map(producto => 
        producto.codigo === codigo 
          ? { ...producto, cantidad: cantidadNum } 
          : producto
      )
    );
  };

  // Manejar cambios en datos del cliente
  const handleClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente(prevCliente => ({
      ...prevCliente,
      [name]: value
    }));
  };

  // Calcular subtotal por producto
  const calcularSubtotal = (precio: number, cantidad: number = 0) => {
    return precio * cantidad;
  };

  // Calcular total general
  const calcularTotal = () => {
    return productos.reduce(
      (total, producto) => 
        total + calcularSubtotal(producto.precio, producto.cantidad || 0), 
      0
    );
  };

  // Descargar la proforma como imagen JPG
  const descargarComoJPG = async () => {
    if (!proformaRef.current) return;

    try {
      toast({
        title: "Procesando",
        description: "Generando imagen de la proforma...",
      });
      
      const canvas = await html2canvas(proformaRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      x: proformaRef.current.getBoundingClientRect().left,
      y: proformaRef.current.getBoundingClientRect().top,
      width: proformaRef.current.scrollWidth,
      height: proformaRef.current.scrollHeight,
      });
      
      const image = canvas.toDataURL("image/jpeg", 0.9);
      
      const link = document.createElement("a");
      link.download = `Proforma_Allis_${new Date().toISOString().split('T')[0]}.jpg`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "¡Éxito!",
        description: "Proforma descargada como imagen JPG.",
      });
    } catch (error) {
      console.error("Error al generar la imagen:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo generar la imagen. Intente nuevamente.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[800px] mx-auto p-4">
        <div className="mb-6 pb-6 border-b">
          <Button 
            variant="outline" 
            onClick={descargarComoJPG} 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Descargar JPG
          </Button>
        </div>

        <div 
          ref={proformaRef} 
          className="proforma bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-[760px] mx-auto box-border overflow-hidden"
        >
          {/* Encabezado con logo y datos de cliente */}
          <div className="flex flex-col md:flex-row justify-between mb-6 pb-4 border-b">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={logo} alt="Alli's" className="h-16 md:h-20" />
            </div>
            
            <div className="bg-allis-amarillo p-4 rounded-lg">
              <h2 className="font-bold text-lg mb-2">Datos del Cliente</h2>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium">Nombre:</label>
                  <Input
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleClienteChange}
                    placeholder="Nombre del cliente"
                    className="bg-white text-right h-10 text-[15px] px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Municipio:</label>
                  <Input
                    name="municipio"
                    value={cliente.municipio}
                    onChange={handleClienteChange}
                    placeholder="Municipio"
                    className="bg-white text-right h-10 text-[15px] px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Teléfono:</label>
                  <Input
                    name="telefono"
                    value={cliente.telefono}
                    onChange={handleClienteChange}
                    placeholder="Número de teléfono"
                    className="bg-white text-right h-10 text-[15px] px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Fecha:</label>
                  <Input
                    value={fechaActual}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de productos */}
          <div className="mb-6 overflow-x-auto w-full min-w-[600px] max-w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Código</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="w-[80px]">UM</TableHead>
                  <TableHead className="w-[100px]">Cantidad</TableHead>
                  <TableHead className="w-[100px]">P/U (C$)</TableHead>
                  <TableHead className="w-[120px]">P/T (C$)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos.map((producto) => {
                  // Solo mostrar productos con cantidad > 0 o todos si ninguno tiene cantidad
                  const subtotal = calcularSubtotal(
                    producto.precio,
                    producto.cantidad || 0
                  );
                  const mostrarFila = (producto.cantidad || 0) > 0 || !productos.some(p => (p.cantidad || 0) > 0);
                  
                  if (!mostrarFila) return null;
                  
                  return (
                    <TableRow 
                      key={producto.codigo}
                      className={(producto.cantidad || 0) <= 0 ? "opacity-50" : ""}
                    >
                      <TableCell>{producto.codigo}</TableCell>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.um}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={(producto.cantidad || 0) > 0 ? producto.cantidad : ""}
                          onChange={(e) => handleCantidadChange(producto.codigo, e.target.value)}
                          placeholder="0"
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        {producto.precio.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right pr-2">
                        {subtotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Totales */}
          <div className="fflex flex-col items-end space-y-2 mb-6 w-full max-w-[800px] mx-auto">
            <div className="bg-allis-celeste py-2 px-4 rounded w-full md:w-64">
              <div className="flex justify-between">
                <span className="font-medium">SUBTOTAL:</span>
                <span>C$ {calcularTotal().toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-allis-rosa py-2 px-4 rounded w-full md:w-64">
              <div className="flex justify-between">
                <span className="font-bold">TOTAL:</span>
                <span className="font-bold">C$ {calcularTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
            <p className="font-medium mb-1">Alli's Helados y Snacks</p>
            <p>Vendedor: María Fernanda López</p>
            <p>Teléfono: +505 8765-4321</p>
            <p>Email: ventas@allishelados.com</p>
            <p className="mt-2">¡Gracias por su preferencia!</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Proforma;
