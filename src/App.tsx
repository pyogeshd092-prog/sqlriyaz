import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Playground from './pages/Playground';
import Questions from './pages/Questions';
import QuestionDetail from './pages/QuestionDetail';
import Roadmap from './pages/Roadmap';
import JobRoles from './pages/JobRoles';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
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
              </main>
              <Routes>
                <Route path="/playground" element={null} />
                <Route path="/questions/:id" element={null} />
                <Route path="/login" element={null} />
                <Route path="*" element={<Footer />} />
              </Routes>
            </div>
          </Router>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
