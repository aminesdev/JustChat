import {useEffect, useState} from 'react';
import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Search, MessageSquare, Users} from 'lucide-react';

const ConversationList = () => {
    const {conversationsList, setCurrentConversation, currentConversationId, hasLoadedConversations, loadConversations} = useConversationStore();
    const {user, isAuthenticated} = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

        const initializeConversations = async () => {
            setIsLoading(true);
            try {
                await loadConversations();
            } catch (error) {
                console.error('Failed to load conversations:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeConversations();
    }, [hasLoadedConversations, isAuthenticated, loadConversations]);

    const filteredConversations = conversationsList.filter(conversation => {
        const otherUser = conversation.user1.id === user?.id ? conversation.user2 : conversation.user1;
        return otherUser.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            otherUser.email.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const getOtherUser = (conversation) => {
        return conversation.user1.id === user?.id ? conversation.user2 : conversation.user1;
    };

    const getLastMessagePreview = (conversation) => {
        if (!conversation.last_message) return 'No messages yet';

        const isCurrentUser = conversation.last_message.sender_id === user?.id;
        const prefix = isCurrentUser ? 'You: ' : '';

        if (conversation.last_message.message_type === 'IMAGE') {
            return `${prefix}📷 Image`;
        }

        const text = conversation.last_message.message_text || 'Message';
        return `${prefix}${text.length > 30 ? text.substring(0, 30) + '...' : text}`;
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        } else {
            return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col border-r border-border">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Messages</h2>
                    <Button variant="ghost" size="icon">
                        <Users className="h-4 w-4" />
                    </Button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
                        <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                        <p className="text-center mb-2">
                            {searchQuery ? 'No conversations found' : 'No conversations yet'}
                        </p>
                        <p className="text-sm text-center">
                            {searchQuery ? 'Try a different search term' : 'Start a new chat to begin messaging'}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {filteredConversations.map((conversation) => {
                            const otherUser = getOtherUser(conversation);
                            const isActive = conversation.id === currentConversationId;

                            return (
                                <div
                                    key={conversation.id}
                                    className={`p-4 cursor-pointer transition-colors ${isActive
                                        ? 'bg-accent'
                                        : 'hover:bg-accent/50'
                                        }`}
                                    onClick={() => setCurrentConversation(conversation.id)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-primary">
                                                    {otherUser.full_name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            {otherUser.is_online && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-1">
                                                <p className="font-medium text-sm truncate">
                                                    {otherUser.full_name}
                                                </p>
                                                {conversation.last_message && (
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                                        {formatTime(conversation.last_message.created_at)}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-sm text-muted-foreground truncate">
                                                {getLastMessagePreview(conversation)}
                                            </p>

                                            {conversation._count?.messages > 0 && (
                                                <div className="flex items-center justify-between mt-1">
                                                    <div className="flex-1" />
                                                    {conversation._count.messages > 0 && (
                                                        <div className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-5 h-5 flex items-center justify-center">
                                                            {conversation._count.messages > 99 ? '99+' : conversation._count.messages}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationList;