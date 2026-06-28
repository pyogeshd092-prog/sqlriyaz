import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

const Home = lazy(() => import('./pages/Home'));
const Playground = lazy(() => import('./pages/Playground'));
const Questions = lazy(() => import('./pages/Questions'));
const QuestionDetail = lazy(() => import('./pages/QuestionDetail'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const JobRoles = lazy(() => import('./pages/JobRoles'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Feedback = lazy(() => import('./pages/Feedback'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/playground" element={<Playground />} />
                    <Route path="/questions" element={<Questions />} />
                    <Route path="/questions/:id" element={<QuestionDetail />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="/roles" element={<JobRoles />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="*" element={
                      <div className="min-h-screen pt-24 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-6xl font-black mb-4 opacity-20">404</p>
                          <p className="text-gray-400 mb-4">Page not found</p>
                          <a href="/" className="text-cyan-400 underline">Go Home</a>
                        </div>
                      </div>
                    } />
                  </Routes>
                </Suspense>
              </main>
              <Routes>
                <Route path="/playground" element={null} />
                <Route path="/questions/:id" element={null} />
                <Route path="/login" element={null} />
                <Route path="/feedback" element={null} />
                <Route path="*" element={<Footer />} />
              </Routes>
            </div>
          </Router>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
