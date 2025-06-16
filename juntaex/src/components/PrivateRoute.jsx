import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

/**
 * Componente para envolver rutas que requieren autenticación.
 * Si no hay token válido en localStorage redirige a /login,
 * guardando en state la ruta de origen para poder volver luego.
 */
export default function PrivateRoute({ children }) {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (!token) {
    // No autenticado, redirige a login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Autenticado, renderiza los hijos (por ejemplo, <Layout />)
  return children
}