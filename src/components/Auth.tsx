
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import logo from '../assets/logo.svg';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const { toast } = useToast();
  
  // Contraseña correcta
  const correctPassword = 'allis123';
  
  // Verificar si está bloqueado al cargar
  useEffect(() => {
    const lockedUntil = localStorage.getItem('lockedUntil');
    if (lockedUntil && parseInt(lockedUntil) > Date.now()) {
      setLocked(true);
    } else {
      localStorage.removeItem('lockedUntil');
    }
  }, []);
  
  const handleLogin = () => {
    if (locked) return;
    
    if (password === correctPassword) {
      toast({
        title: "Acceso concedido",
        description: "Bienvenido al sistema de proformas",
      });
      onLogin();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        // Bloquear por 30 minutos
        const lockUntil = Date.now() + (30 * 60 * 1000);
        localStorage.setItem('lockedUntil', lockUntil.toString());
        setLocked(true);
        
        toast({
          variant: "destructive",
          title: "Sistema bloqueado",
          description: "Demasiados intentos fallidos. Sistema bloqueado por 30 minutos.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Contraseña incorrecta",
          description: `Intento ${newAttempts} de 3. La contraseña es incorrecta.`,
        });
      }
      
      setPassword('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-allis-amarillo p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Alli's Logo" className="h-[300px] w-auto mx-auto mb-0" />
          </div>
          <CardTitle className="text-2xl">Generador de Proformas</CardTitle>
          <CardDescription>
            Ingrese la contraseña para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={locked}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="w-full" 
            onClick={handleLogin}
            disabled={locked}
          >
            {locked ? "Sistema bloqueado" : "Ingresar"}
          </Button>
        </CardFooter>
      </Card>
      {locked && (
        <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded">
          Sistema bloqueado. Contacte al administrador o espere 30 minutos.
        </div>
      )}
    </div>
  );
};

export default Auth;
