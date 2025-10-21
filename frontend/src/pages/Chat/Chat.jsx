import {useEffect, useState} from 'react';
import Layout from '@/components/layout/Layout';
import ChatSkeleton from '@/components/ui/skeleton/ChatSkeleton';
import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import ChatHeader from '@/components/chat/ChatHeader';
import {Card, CardContent} from '@/components/ui/card';
import {MessageSquare} from 'lucide-react';

const Chat = () => {
    const {currentConversationId, getCurrentConversation, hasLoadedConversations, loadConversations} = useConversationStore();
    const {user, isAuthenticated} = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);
    const currentConversation = getCurrentConversation();

    useEffect(() => {
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

    if (isLoading) {
        return <ChatSkeleton />;
    }

    return (
        <Layout>
            <div className="flex h-full">
                {currentConversationId ? (
                    <div className="flex-1 flex flex-col">
                        <ChatHeader conversationId={currentConversationId} />
                        <MessageList conversationId={currentConversationId} />
                        <MessageInput conversationId={currentConversationId} />
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <Card className="w-full max-w-md mx-4">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Welcome to JustChat</h3>
                                <p className="text-muted-foreground mb-4">
                                    Select a conversation from the sidebar to start chatting
                                </p>
                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p>• Click "Messages" in the sidebar to view conversations</p>
                                    <p>• Click "Users" to find people to chat with</p>
                                    <p>• Unread messages are highlighted with badges</p>
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