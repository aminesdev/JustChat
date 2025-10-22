import {useEffect, useRef, useState} from 'react';
import {useMessageStore} from '@/stores/messageStore';
import {useAuthStore} from '@/stores/authStore';
import {useConversationStore} from '@/stores/conversationStore';
import {formatMessageTime, formatDateHeader} from '@/utils/dateUtils';
import {getAvatarUrl} from '@/utils/avatarUtils';
import {Card} from '@/components/ui/card';
import Avatar from '@/components/ui/Avatar';
import {Button} from '@/components/ui/button';
import {Trash2, AlertTriangle, MessageSquare} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const MessageList = ({conversationId, showDeleteDialog, onDeleteDialogChange}) => {
    const {getGroupedMessages, loadMessages, getPagination, getMessages} = useMessageStore();
    const {user} = useAuthStore();
    const {markConversationAsRead, deleteConversation, getCurrentOtherUser} = useConversationStore();
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const groupedMessages = getGroupedMessages(conversationId);
    const pagination = getPagination(conversationId);
    const messages = getMessages(conversationId);
    const otherUser = getCurrentOtherUser();

    useEffect(() => {
        if (conversationId) {
            loadMessages(conversationId);

            // Mark conversation as read when opening it
            markConversationAsRead(conversationId);
        }
    }, [conversationId, loadMessages, markConversationAsRead]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    const loadMoreMessages = () => {
        if (pagination.hasMore) {
            loadMessages(conversationId, pagination.currentPage + 1);
        }
    };

    const handleDeleteConversation = async () => {
        if (!conversationId) return;

        setIsDeleting(true);
        try {
            await deleteConversation(conversationId);
            onDeleteDialogChange(false);
        } catch (error) {
            console.error('Failed to delete conversation:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const isOwnMessage = (message) => message.sender_id === user?.id;

    const getMessageStatus = (message) => {
        if (message.is_optimistic) return 'sending';
        if (message.read_receipts?.length > 0) return 'read';
        if (message.is_delivered) return 'delivered';
        return 'sent';
    };

    const renderMessageStatus = (message) => {
        const status = getMessageStatus(message);
        switch (status) {
            case 'sending':
                return <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/30 animate-pulse" />;
            case 'sent':
                return '✓';
            case 'delivered':
                return '✓✓';
            case 'read':
                return <span className="text-primary">✓✓</span>;
            default:
                return null;
        }
    };

    const renderMessageContent = (message) => {
        if (message.message_type === 'IMAGE') {
            return (
                <div className="max-w-xs">
                    <img
                        src={getAvatarUrl(message.file_url)}
                        alt="Shared image"
                        className="rounded-lg max-w-full h-auto border border-border"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.nextElementSibling;
                            if (fallback) fallback.style.display = 'block';
                        }}
                    />
                    <div className="hidden bg-muted rounded-lg p-4 text-center text-sm text-muted-foreground">
                        Image not available
                    </div>
                </div>
            );
        }

        return (
            <p className="text-sm whitespace-pre-wrap break-words">
                {message.message_text}
            </p>
        );
    };

    if (!conversationId) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <Card className="w-full max-w-md">
                    <div className="p-6 text-center">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                        <p className="text-muted-foreground text-sm">
                            Select a conversation or start a new chat to begin messaging
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <>
            <div className="flex-1 flex flex-col min-h-0"> {/* Crucial for scrolling */}
                <div
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-6"
                    style={{
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {pagination.hasMore && (
                        <div className="flex justify-center">
                            <button
                                onClick={loadMoreMessages}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md bg-background hover:bg-accent"
                                disabled={!pagination.hasMore}
                            >
                                Load earlier messages
                            </button>
                        </div>
                    )}

                    {Object.keys(groupedMessages).length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center text-muted-foreground">
                                <p className="text-lg font-medium mb-2">No messages yet</p>
                                <p className="text-sm">Send a message to start the conversation</p>
                            </div>
                        </div>
                    ) : (
                        Object.entries(groupedMessages).map(([date, messages]) => (
                            <div key={date} className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                                        {formatDateHeader(date)}
                                    </div>
                                </div>

                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${isOwnMessage(message) ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {!isOwnMessage(message) && (
                                            <div className="flex-shrink-0">
                                                <Avatar
                                                    user={message.sender}
                                                    size="sm"
                                                    showOnlineIndicator={false}
                                                />
                                            </div>
                                        )}

                                        <div className={`flex flex-col max-w-xs lg:max-w-md ${isOwnMessage(message) ? 'items-end' : 'items-start'}`}>
                                            {!isOwnMessage(message) && (
                                                <p className="text-xs text-muted-foreground mb-1">
                                                    {message.sender?.full_name}
                                                </p>
                                            )}

                                            <div className={`rounded-lg px-3 py-2 ${isOwnMessage(message)
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                                }`}>
                                                {renderMessageContent(message)}
                                            </div>

                                            <div className={`flex items-center gap-2 mt-1 ${isOwnMessage(message) ? 'flex-row-reverse' : 'flex-row'
                                                }`}>
                                                <span className="text-xs text-muted-foreground">
                                                    {formatMessageTime(message.created_at)}
                                                </span>
                                                {isOwnMessage(message) && (
                                                    <span className="text-xs">
                                                        {renderMessageStatus(message)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Delete Conversation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={onDeleteDialogChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            Delete Conversation
                        </DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the conversation
                            with <strong>{otherUser?.full_name || 'this user'}</strong> for both participants
                            and remove all messages from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => onDeleteDialogChange(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConversation}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Conversation
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MessageList;