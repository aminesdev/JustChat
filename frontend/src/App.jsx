import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import OAuthCallback from './pages/Auth/OAuthCallback';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/layout/ProtectedRoute';
import {useAuthStore} from './stores/authStore';
import {useUIStore} from './stores/uiStore';
import {useUserStore} from './stores/userStore';
import {useConversationStore} from './stores/conversationStore'; // Add this import

function App() {
    const {isAuthenticated, initialize} = useAuthStore();
    const {loadCurrentUser} = useUserStore();
    const {theme} = useUIStore();
    const {loadConversations} = useConversationStore(); // Add this
    const [isInitialized, setIsInitialized] = useState(false);

    console.log('App component - isAuthenticated:', isAuthenticated);

    useEffect(() => {
        const initApp = async () => {
            await initialize();

            if (isAuthenticated) {
                console.log('App - User is authenticated, loading profile data and conversations...');
                await loadCurrentUser();

                // Force load conversations when user authenticates
                await loadConversations();
            }

            setIsInitialized(true);
        };

        initApp();
    }, [initialize, loadCurrentUser, loadConversations, isAuthenticated]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

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