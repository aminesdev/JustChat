import {useEffect, useState} from 'react';
import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import {MessageSquare} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import {getOtherUser, getConversationPreview} from '@/utils/chatUtils';
import {formatConversationTime, getUnreadBadge} from '@/utils/conversationDisplayUtils';

const ConversationList = ({onConversationClick}) => {
    const {conversationsList, setCurrentConversation, currentConversationId, hasLoadedConversations, loadConversations, markConversationAsRead} = useConversationStore();
    const {user} = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    console.log("🔄 ConversationList render - FULL STATE:", {
        conversationsCount: conversationsList.length,
        hasLoadedConversations,
        currentConversationId,
        user: user?.id,
        conversationsList: conversationsList.map(c => ({
            id: c.id,
            otherUser: getOtherUser(c, user?.id)?.full_name,
            unread_count: c.unread_count,
            has_unread_messages: c.has_unread_messages,
            last_message: c.last_message?.message_text
        }))
    });

    useEffect(() => {
        if (!hasLoadedConversations) {
            console.log("🔄 Initializing conversations...");
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
        }
    }, [hasLoadedConversations, loadConversations]);

    const filteredConversations = conversationsList.filter(conversation => {
        const otherUser = getOtherUser(conversation, user?.id);
        const matchesSearch = otherUser.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            otherUser.email.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
    });

    console.log("📊 Filtered conversations for display:", filteredConversations.map(c => ({
        id: c.id,
        otherUser: getOtherUser(c, user?.id)?.full_name,
        unreadCount: c.unread_count,
        hasUnread: c.has_unread_messages,
        willShowUnreadBadge: c.unread_count > 0,
        willShowUnreadDot: c.has_unread_messages
    })));

    const handleConversationClick = async (conversation) => {
        console.log("🖱️ Clicked conversation:", conversation.id);

        // Set current conversation first
        setCurrentConversation(conversation.id);

        // Mark conversation as read if it has unread messages
        if (conversation.has_unread_messages || conversation.unread_count > 0) {
            await markConversationAsRead(conversation.id);
        }

        // Call the parent click handler (for navigation)
        if (onConversationClick) {
            onConversationClick(conversation);
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
        <div className="flex-1 flex flex-col">
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
                            const otherUser = getOtherUser(conversation, user?.id);
                            const isActive = conversation.id === currentConversationId;
                            const hasUnread = conversation.has_unread_messages;
                            const unreadCount = conversation.unread_count;

                            console.log("🎯 RENDERING Conversation Item:", {
                                id: conversation.id,
                                otherUser: otherUser.full_name,
                                isActive,
                                hasUnread,
                                unreadCount,
                                willShowBadge: unreadCount > 0,
                                willShowDot: hasUnread
                            });

                            return (
                                <div
                                    key={conversation.id}
                                    className={`p-4 cursor-pointer transition-colors ${isActive
                                        ? 'bg-accent'
                                        : hasUnread
                                            ? 'bg-blue-50 dark:bg-blue-950/20 border-l-2 border-l-primary'
                                            : 'hover:bg-accent/50'
                                        }`}
                                    onClick={() => handleConversationClick(conversation)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="relative">
                                            <Avatar
                                                user={otherUser}
                                                size="md"
                                                showOnlineIndicator={true}
                                            />
                                            {hasUnread && (
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-1">
                                                <div className="flex items-center gap-2">
                                                    <p className={`font-medium text-sm truncate ${hasUnread ? 'font-semibold text-foreground' : ''
                                                        }`}>
                                                        {otherUser.full_name}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {conversation.last_message && (
                                                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                                            {formatConversationTime(conversation.last_message.created_at)}
                                                        </span>
                                                    )}
                                                    {getUnreadBadge(conversation)}
                                                </div>
                                            </div>

                                            <p className={`text-sm truncate ${hasUnread
                                                ? 'text-foreground font-medium'
                                                : 'text-muted-foreground'
                                                }`}>
                                                {getConversationPreview(conversation, user?.id)}
                                            </p>
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