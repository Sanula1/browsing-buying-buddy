import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DanaPage from "./pages/Dana";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/temples" element={
              <ProtectedRoute>
                <MainLayout>
                  <div className="text-center text-gray-500">Temples page coming soon...</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/villages" element={
              <ProtectedRoute>
                <MainLayout>
                  <div className="text-center text-gray-500">Villages page coming soon...</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/families" element={
              <ProtectedRoute>
                <MainLayout>
                  <div className="text-center text-gray-500">Families page coming soon...</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dana" element={
              <ProtectedRoute>
                <MainLayout>
                  <DanaPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/members" element={
              <ProtectedRoute>
                <MainLayout>
                  <div className="text-center text-gray-500">Members page coming soon...</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/assignments" element={
              <ProtectedRoute>
                <MainLayout>
                  <div className="text-center text-gray-500">Assignments page coming soon...</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
