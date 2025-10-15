import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from '@/stores/authStore';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const {initialize} = useAuthStore();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const accessToken = urlParams.get('accessToken');
            const refreshToken = urlParams.get('refreshToken');
            const user = urlParams.get('user');

            if (accessToken && refreshToken && user) {
                try {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    const userData = JSON.parse(decodeURIComponent(user));
                    localStorage.setItem('user', JSON.stringify(userData));

                    await initialize();
                    navigate('/chat');
                } catch (error) {
                    console.error('OAuth callback error:', error);
                    navigate('/login?error=oauth_failed');
                }
            } else {
                navigate('/login?error=oauth_failed');
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
                <CardContent className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OAuthCallback;