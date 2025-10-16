import {useEffect, useState} from 'react';
import Layout from '@/components/layout/Layout';
import ChatSkeleton from '@/components/ui/skeleton/ChatSkeleton';
import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import {Card, CardContent} from '@/components/ui/card';
import {MessageSquare} from 'lucide-react';

const Chat = () => {
    const {currentConversationId, getCurrentConversation, hasLoadedConversations, loadConversations} = useConversationStore();
    const {user, isAuthenticated} = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);
    const currentConversation = getCurrentConversation();

    useEffect(() => {
        // Only load if authenticated and not already loaded
        if (!isAuthenticated) {
            setIsLoading(false);
            return;
        }

        if (hasLoadedConversations) {
            setIsLoading(false);
            return;
        }

        const initializeChat = async () => {
            try {
                await loadConversations();
            } catch (error) {
                console.error('Failed to load conversations:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeChat();
    }, [hasLoadedConversations, isAuthenticated, loadConversations]);

    // Get the other user in the conversation
    const getOtherUser = () => {
        if (!currentConversation || !user) return null;
        return currentConversation.user1.id === user.id
            ? currentConversation.user2
            : currentConversation.user1;
    };

    const otherUser = getOtherUser();

    if (isLoading) {
        return <ChatSkeleton />;
    }

    return (
        <Layout>
            <div className="flex h-full">
                {currentConversationId ? (
                    <div className="flex-1 flex flex-col">
                        {/* Chat Header */}
                        <div className="border-b border-border p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-primary">
                                        {otherUser?.full_name?.charAt(0).toUpperCase() || '?'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        {otherUser?.full_name || 'Unknown User'}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {otherUser?.is_online ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area - Coming Soon */}
                        <div className="flex-1 flex items-center justify-center">
                            <Card className="w-full max-w-md mx-4">
                                <CardContent className="p-6 text-center">
                                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Chat Interface</h3>
                                    <p className="text-muted-foreground">
                                        Message display and real-time chat coming soon...
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <Card className="w-full max-w-md mx-4">
                            <CardContent className="p-6 text-center">
                                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Welcome to JustChat</h3>
                                <p className="text-muted-foreground mb-4">
                                    Select a conversation or start a new chat with another user
                                </p>
                                <div className="text-sm text-muted-foreground">
                                    <p>• Click "Users" to browse all app users</p>
                                    <p>• Click on a user to start a conversation</p>
                                    <p>• Use "Messages" to view your existing chats</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Chat;