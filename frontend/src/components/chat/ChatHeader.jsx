import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import {Trash2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import Avatar from '@/components/ui/Avatar';

const ChatHeader = ({conversationId, onDeleteClick}) => {
    const {getCurrentConversation} = useConversationStore();
    const {user} = useAuthStore();

    const conversation = getCurrentConversation();

    if (!conversation || !conversationId) {
        return (
            <div className="border-b border-border p-4 h-16 flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-muted-foreground">?</span>
                    </div>
                    <div>
                        <h3 className="font-semibold">Select a chat</h3>
                    </div>
                </div>
            </div>
        );
    }

    const getOtherUser = () => {
        if (!conversation || !user) return null;
        return conversation.user1.id === user.id ? conversation.user2 : conversation.user1;
    };

    const otherUser = getOtherUser();

    return (
        <div className="border-b border-border p-4 h-16 flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                <Avatar
                    user={otherUser}
                    size="md"
                    showOnlineIndicator={true}
                />
                <div>
                    <h3 className="font-semibold">
                        {otherUser?.full_name || 'Unknown User'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {otherUser?.is_online ? 'Online' : 'Offline'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDeleteClick}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    title="Delete conversation"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default ChatHeader;