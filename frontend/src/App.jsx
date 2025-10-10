import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import { useAuthStore } from './store/authStore'; // Comment out for testing
import Login from './pages/Auth/Login';

function App() {
    // const { isAuthenticated } = useAuthStore(); // Comment out for testing

    // For testing, set isAuthenticated to false to see login page
    const isAuthenticated = false;

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