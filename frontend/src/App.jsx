import {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import OAuthCallback from './pages/Auth/OAuthCallback';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/layout/ProtectedRoute';
import {useAuthStore} from './stores/authStore';
import {useUIStore} from './stores/uiStore';

function App() {
    const {isAuthenticated, initialize} = useAuthStore();
    const {theme} = useUIStore();

    // Initialize auth and theme on app load
    useEffect(() => {
        initialize();
    }, [initialize]);

    // Apply theme class to html element
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Routes>
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <Login /> : <Navigate to="/chat" />}
                    />
                    <Route
                        path="/signup"
                        element={!isAuthenticated ? <Signup /> : <Navigate to="/chat" />}
                    />
                    <Route
                        path="/oauth-callback"
                        element={<OAuthCallback />}
                    />
                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoute>
                                <Chat />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;