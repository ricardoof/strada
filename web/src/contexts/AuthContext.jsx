import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const addTrip = (trip) => {
    if (user) {
      const updatedUser = { ...user, trips: [...(user.trips || []), trip] };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const cancelTrip = async (tripIndex, tripData) => {
    if (!user) return;

    try {
        // 1. Chama o backend
        const response = await fetch('http://localhost:3333/cancelar-viagem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                viagemId: tripData.viagem_id,
                assentos: tripData.assentos
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "Erro ao cancelar");
        }

        // 2. Atualiza o estado local
        const updatedTrips = [...(user.trips || [])];
        if (updatedTrips[tripIndex]) {
            updatedTrips[tripIndex] = { ...updatedTrips[tripIndex], status: 'Cancelado' };
        }

        const updatedUser = { ...user, trips: updatedTrips };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        return true;

    } catch (error) {
        console.error(error);
        alert(error.message);
        return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, addTrip, cancelTrip }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};