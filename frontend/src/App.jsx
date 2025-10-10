import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useAuthStore} from './store/authStore';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';

function App() {
    const {isAuthenticated} = useAuthStore();

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    {/* Public routes */}
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <Login /> : <Navigate to="/chat" />}
                    />
                    <Route
                        path="/signup"
                        element={!isAuthenticated ? <Signup /> : <Navigate to="/chat" />}
                    />

                    {/* Protected routes */}
                    <Route
                        path="/chat"
                        element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/profile"
                        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
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