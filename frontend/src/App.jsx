import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Auth/Login';
import {useAuthStore} from './stores/authStore';

function App() {
    const isAuthenticated = useAuthStore();

    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Routes>
                    {/* Public routes */}
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/signup"
                        element={!isAuthenticated ? <div>Signup Page Coming Soon</div> : <Navigate to="/" />}
                    />

                    {/* Protected routes - show placeholder for now */}
                    <Route
                        path="/chat"
                        element={isAuthenticated ? <div>Chat Page Coming Soon</div> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/profile"
                        element={isAuthenticated ? <div>Profile Page Coming Soon</div> : <Navigate to="/login" />}
                    />

                    {/* Default route */}
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