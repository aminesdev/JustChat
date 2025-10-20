import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from '@/stores/authStore';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ThemeToggle} from '@/components/ui/theme-toggle';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const {initialize} = useAuthStore();
    const hasProcessed = useRef(false); // Prevent multiple executions

    useEffect(() => {
        console.log('=== OAuthCallback Component Started ===');

        // Prevent multiple executions
        if (hasProcessed.current) {
            console.log('OAuthCallback already processed, skipping');
            return;
        }
        hasProcessed.current = true;

        console.log('Current URL:', window.location.href);

        const handleOAuthCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const accessToken = urlParams.get('accessToken');
            const refreshToken = urlParams.get('refreshToken');
            const user = urlParams.get('user');

            console.log('URL Parameters:', {
                accessToken: accessToken ? `Present (${accessToken.substring(0, 20)}...)` : 'Missing',
                refreshToken: refreshToken ? `Present (${refreshToken.substring(0, 20)}...)` : 'Missing',
                user: user ? 'Present' : 'Missing'
            });

            if (accessToken && refreshToken && user) {
                try {
                    console.log('Storing tokens in localStorage...');

                    // Store tokens and user data
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    const userData = JSON.parse(decodeURIComponent(user));
                    console.log('User data parsed:', userData);
                    localStorage.setItem('user', JSON.stringify(userData));

                    console.log('Calling initialize() from auth store with force=true...');
                    // Re-initialize the auth store with force=true
                    await initialize(true);

                    console.log('Navigation to /chat starting...');
                    // Clear the URL parameters to prevent re-processing
                    window.history.replaceState({}, '', '/chat');
                    // Navigate to chat
                    navigate('/chat', {replace: true});

                } catch (error) {
                    console.error('OAuth callback processing error:', error);
                    console.error('Error details:', error.message);
                    window.history.replaceState({}, '', '/login');
                    navigate('/login?error=oauth_failed', {replace: true});
                }
            } else {
                console.error('Missing OAuth parameters in URL');
                console.log('Available URL parameters:', Object.fromEntries(urlParams.entries()));
                window.history.replaceState({}, '', '/login');
                navigate('/login?error=oauth_failed', {replace: true});
            }
        };

        handleOAuthCallback();
    }, [navigate, initialize]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Completing sign in...</CardTitle>
                    <CardDescription className="text-center">
                        Please wait while we complete your authentication.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </CardContent>
            </Card>

            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default OAuthCallback;