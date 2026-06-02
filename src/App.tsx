import { Navigate, Route, Routes } from 'react-router-dom'

import { AppLayout } from './components/AppLayout'
import { ProtectedRoute } from './features/auth/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { DocumentsPage } from './pages/DocumentsPage'
import { FuelPage } from './pages/FuelPage'
import { LoginPage } from './pages/LoginPage'
import { MaintenancePage } from './pages/MaintenancePage'
import { OdometerPage } from './pages/OdometerPage'
import { VehiclesPage } from './pages/VehiclesPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/odometer" element={<OdometerPage />} />
          <Route path="/fuel" element={<FuelPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/documents" element={<DocumentsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
