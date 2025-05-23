
import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth, ProtectedRoute } from "@/hooks/useAuth";
import Sidebar from "@/components/dashboard/Sidebar";
import UserPanel from "@/components/dashboard/UserPanel";
import Portfolio from "@/components/dashboard/Portfolio";
import ReturnCalculator from "@/components/dashboard/ReturnCalculator";
import Map from "@/components/Map";
import Balance from "@/components/dashboard/Balance";
import KYC from "@/components/dashboard/KYC";
import Support from "@/components/dashboard/Support";
import Purchase from "@/components/dashboard/Purchase";
import { Farms } from "@/components/dashboard/Farms";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 bg-gray-50 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 pb-16">
          <Routes>
            <Route index element={<UserPanel />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/calculator" element={<ReturnCalculator />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/support" element={<Support />} />
            <Route path="/purchase" element={<Purchase />} />
          </Routes>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
