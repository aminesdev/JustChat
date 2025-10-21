import {useEffect, useState} from 'react';
import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Search, MessageSquare, Users} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import {getOtherUser, getConversationPreview} from '@/utils/chatUtils';
import {formatConversationTime, getUnreadBadge} from '@/utils/conversationDisplayUtils';

const ConversationList = () => {
    const {conversationsList, setCurrentConversation, currentConversationId, hasLoadedConversations, loadConversations} = useConversationStore();
    const {user} = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!hasLoadedConversations) {
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
        return otherUser.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            otherUser.email.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col border-r border-border">
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Messages</h2>
                    <Button variant="ghost" size="icon">
                        <Users className="h-4 w-4" />
                    </Button>
                </div>

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

                            return (
                                <div
                                    key={conversation.id}
                                    className={`p-4 cursor-pointer transition-colors ${isActive
                                            ? 'bg-accent'
                                            : hasUnread
                                                ? 'bg-blue-50 dark:bg-blue-950/20 border-l-2 border-l-primary'
                                                : 'hover:bg-accent/50'
                                        }`}
                                    onClick={() => setCurrentConversation(conversation.id)}
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