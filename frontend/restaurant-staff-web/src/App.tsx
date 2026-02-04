import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { OrdersProvider } from './contexts/OrdersContext';

// Pages
import IndexPage from './pages/IndexPage';
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';
import OrderDetails from './pages/OrderDetails';
import BillingPayment from './pages/BillingPayment';
import Bill from './pages/Bill';
import Tables from './pages/Tables';
import NewOrder from './pages/NewOrder';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/order-details" element={<OrderDetails />} />
            <Route path="/billing-payment" element={<BillingPayment />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </OrdersProvider>
    </AuthProvider>
  );
}

export default App;
