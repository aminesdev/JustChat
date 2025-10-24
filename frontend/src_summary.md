# Project: src

## File: App.css
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## File: App.jsx
```jsx
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
```

## File: components/chat/ChatHeader.jsx
```jsx
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
```

## File: components/chat/ConversationList.jsx
```jsx
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
                                            {/* Red circle removed */}
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
```

## File: components/chat/MessageInput.jsx
```jsx
import {useState, useRef} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useMessageStore} from '@/stores/messageStore';
import {Send, Image} from 'lucide-react';
import {uploadService} from '@/services/uploadService';
import {validateFileUpload} from '@/utils/validationUtils';

const MessageInput = ({conversationId}) => {
    const [messageText, setMessageText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const {sendMessage} = useMessageStore();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!messageText.trim() || !conversationId || isLoading) return;

        const textToSend = messageText.trim();
        setMessageText('');
        setIsLoading(true);

        try {
            await sendMessage(conversationId, {
                message_text: textToSend,
                message_type: 'TEXT'
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessageText(textToSend);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !conversationId || isLoading) return;

        const validationError = validateFileUpload(file);
        if (validationError) {
            console.error('Image validation error:', validationError);
            return;
        }

        setIsLoading(true);

        try {
            const uploadResponse = await uploadService.uploadImage(file, 'message');
            const imageUrl = uploadResponse.data.url;

            await sendMessage(conversationId, {
                message_text: '',
                message_type: 'IMAGE',
                file_url: imageUrl
            });

            fileInputRef.current.value = '';
        } catch (error) {
            console.error('Failed to upload and send image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    if (!conversationId) {
        return (
            <div className="border-t border-border p-4 h-16 flex items-center w-full">
                <div className="flex items-center justify-center text-muted-foreground text-sm w-full">
                    Select a conversation to start messaging
                </div>
            </div>
        );
    }

    return (
        <div className="border-t border-border p-4 h-16 flex items-center w-full">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
                <div className="flex items-center gap-2 flex-1">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                    >
                        <Image className="h-4 w-4" />
                    </Button>

                    <div className="flex-1">
                        <Input
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            disabled={isLoading}
                            className="w-full"
                        />
                    </div>

                    <Button
                        type="submit"
                        size="icon"
                        disabled={!messageText.trim() || isLoading}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;
```

## File: components/chat/MessageList.jsx
```jsx
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

    // Function to check if a message is the last one in a date group
    const isLastMessageInGroup = (currentMessage, groupMessages, groupIndex) => {
        return groupMessages.indexOf(currentMessage) === groupMessages.length - 1;
    };

    // Function to check if a message is the last one in the entire conversation
    const isLastMessageInConversation = (currentMessage) => {
        const allMessages = Object.values(groupedMessages).flat();
        return allMessages.indexOf(currentMessage) === allMessages.length - 1;
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
            <div className="flex-1 flex flex-col min-h-0">
                <div
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-3"
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
                            <div key={date} className="space-y-2">
                                <div className="flex justify-center">
                                    <div className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                                        {formatDateHeader(date)}
                                    </div>
                                </div>

                                {messages.map((message, index) => {
                                    const isLastInGroup = index === messages.length - 1;
                                    const isLastInConversation = isLastMessageInConversation(message);
                                    const showTimeAndStatus = isLastInGroup || isLastInConversation;

                                    return (
                                        <div
                                            key={message.id}
                                            className={`flex gap-2 ${isOwnMessage(message) ? 'justify-end' : 'justify-start'}`}
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
                                                    <p className="text-xs text-muted-foreground mb-0.5">
                                                        {message.sender?.full_name}
                                                    </p>
                                                )}

                                                <div className={`rounded-lg px-3 py-2 ${isOwnMessage(message)
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                                    }`}>
                                                    {renderMessageContent(message)}
                                                </div>

                                                {/* Show time and status only on the last message in group */}
                                                {showTimeAndStatus && (
                                                    <div className={`flex items-center gap-1 mt-0.5 ${isOwnMessage(message) ? 'flex-row-reverse' : 'flex-row'}`}>
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatMessageTime(message.created_at)}
                                                        </span>
                                                        {isOwnMessage(message) && (
                                                            <span className="text-xs">
                                                                {renderMessageStatus(message)}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
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
```

## File: components/layout/Layout.jsx
```jsx
import {useState} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-hidden min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
```

## File: components/layout/Navbar.jsx
```jsx
import {Button} from '@/components/ui/button';
import {useAuthStore} from '@/stores/authStore';
import {Menu, LogOut} from 'lucide-react';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {getAvatarUrl} from '@/utils/avatarUtils';

const Navbar = ({onMenuClick}) => {
    const {logout, user} = useAuthStore();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm h-16 flex items-center">
            <div className="flex items-center justify-between px-4 py-0 w-full">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold">JustChat</h1>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <div className="flex items-center gap-3 mr-2">
                        <div className="relative">
                            {user?.avatar_url ? (
                                <img
                                    src={getAvatarUrl(user.avatar_url)}
                                    alt={user?.full_name || 'User'}
                                    className="w-8 h-8 rounded-full object-cover border border-border"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        const fallback = e.target.nextElementSibling;
                                        if (fallback) fallback.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <div className={`w-8 h-8 bg-primary rounded-full flex items-center justify-center border border-border ${user?.avatar_url ? 'hidden' : 'flex'}`}>
                                <span className="text-xs font-medium text-primary-foreground">
                                    {user?.full_name?.charAt(0) || 'U'}
                                </span>
                            </div>
                        </div>
                        <span className="text-sm font-medium hidden sm:block">
                            {user?.full_name}
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
```

## File: components/layout/ProtectedRoute.jsx
```jsx
import {Navigate} from 'react-router-dom';
import {useAuthStore} from '@/stores/authStore';

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuthStore();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

## File: components/layout/Sidebar.jsx
```jsx
import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import {useUserStore} from '@/stores/userStore';
import {Button} from '@/components/ui/button';
import {X, MessageSquare, Users, Search, Loader2} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Avatar from '@/components/ui/Avatar';
import ConversationList from '@/components/chat/ConversationList';

const Sidebar = ({isOpen, onClose}) => {
    const {
        conversationsList,
        setCurrentConversation,
        getOrCreateConversation,
        currentConversationId,
        hasLoadedConversations
    } = useConversationStore();
    const {user} = useAuthStore();
    const {getAllUsers, searchedUsers, searchUsers, clearSearch, users, isLoading: usersLoading} = useUserStore();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('conversations');
    const [searchQuery, setSearchQuery] = useState('');
    const [conversationsLoading, setConversationsLoading] = useState(false);
    const [loadingUserId, setLoadingUserId] = useState(null);

    // Load conversations when view changes to conversations
    useEffect(() => {
        if (activeView === 'conversations' && !hasLoadedConversations) {
            const loadConversationsList = async () => {
                setConversationsLoading(true);
                try {
                    await useConversationStore.getState().loadConversations();
                } catch (error) {
                    console.error('Failed to load conversations:', error);
                } finally {
                    setConversationsLoading(false);
                }
            };
            loadConversationsList();
        }
    }, [activeView, hasLoadedConversations]);

    // Load users when view changes to users - ALWAYS load fresh data
    useEffect(() => {
        if (activeView === 'users') {
            const loadUsers = async () => {
                try {
                    await getAllUsers();
                } catch (error) {
                    console.error('Failed to load users:', error);
                }
            };
            loadUsers();
        }
    }, [activeView, getAllUsers]);

    const handleViewChange = (view) => {
        setActiveView(view);
        setSearchQuery('');
        clearSearch();
        setLoadingUserId(null);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        onClose();
    };

    const handleUserClick = async (selectedUser) => {
        if (selectedUser.id === user?.id) return;

        setLoadingUserId(selectedUser.id);

        try {
            const conversation = await getOrCreateConversation(selectedUser.id);
            setCurrentConversation(conversation.id);
            setActiveView('conversations');
            setSearchQuery('');
            clearSearch();

            // Navigate to chat page
            navigate('/chat');
            onClose();
        } catch (error) {
            console.error('Failed to create conversation:', error);
        } finally {
            setLoadingUserId(null);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            searchUsers(query, 20);
        } else {
            clearSearch();
        }
    };

    const handleConversationClick = (conversation) => {
        console.log("🔄 Sidebar - Conversation clicked:", conversation.id);
        setCurrentConversation(conversation.id);
        navigate('/chat');
        onClose();
    };

    const getOtherUser = (conversation) => {
        if (!conversation.user1 || !conversation.user2) return null;
        return conversation.user1.id === user?.id ? conversation.user2 : conversation.user1;
    };

    const displayUsers = searchQuery ? searchedUsers : users;

    const renderContent = () => {
        if (activeView === 'conversations') {
            return (
                <ConversationList
                    onConversationClick={handleConversationClick}
                />
            );
        } else {
            if (usersLoading && displayUsers.length === 0) {
                return (
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                );
            }

            return (
                <div className="divide-y divide-border">
                    {displayUsers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground p-4">
                            <Users className="h-8 w-8 mb-2 opacity-50" />
                            <p className="text-sm text-center">
                                {searchQuery ? 'No users found' : 'No users available'}
                            </p>
                        </div>
                    ) : (
                        displayUsers.map((userItem) => (
                            <div
                                key={userItem.id}
                                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                                onClick={() => handleUserClick(userItem)}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        user={userItem}
                                        size="md"
                                        showOnlineIndicator={true}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">
                                            {userItem.full_name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {userItem.email}
                                        </p>
                                    </div>
                                    {loadingUserId === userItem.id && (
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            );
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <div className={`
                fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border h-16">
                        <h2 className="text-lg font-semibold">
                            {activeView === 'conversations' ? 'Conversations' : 'Users'}
                        </h2>
                        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Search Section - Same height as ChatHeader */}
                    <div className="border-b border-border p-4 h-16 flex items-center">
                        <div className="flex items-center gap-2 w-full">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    placeholder={activeView === 'conversations' ? "Search conversations..." : "Search users..."}
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewChange(activeView === 'conversations' ? 'users' : 'conversations')}
                                title={activeView === 'conversations' ? 'Switch to Users' : 'Switch to Conversations'}
                            >
                                {activeView === 'conversations' ? (
                                    <Users className="h-4 w-4" />
                                ) : (
                                    <MessageSquare className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {renderContent()}
                    </div>

                    {/* Profile Section */}
                    <div className="p-4 border-t border-border h-16 flex items-center pt-5 pb-5">
                        <Button
                            variant="ghost"
                            className="w-full justify-start p-3 h-auto"
                            onClick={handleProfileClick}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <Avatar
                                    user={user}
                                    size="sm"
                                    showOnlineIndicator={false}
                                />
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium truncate">{user?.full_name}</p>
                                    <p className="text-xs text-muted-foreground truncate">View profile</p>
                                </div>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
```

## File: components/ui/Avatar.jsx
```jsx
import {useState} from 'react';
import {cn} from '@/lib/utils';
import {getAvatarUrl} from '@/utils/avatarUtils';

const Avatar = ({
    user,
    size = 'md',
    className,
    showOnlineIndicator = false
}) => {
    const [imageError, setImageError] = useState(false);

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
        '2xl': 'w-32 h-32'
    };

    const textSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
        '2xl': 'text-2xl'
    };

    const avatarUrl = user?.avatar_url ? getAvatarUrl(user.avatar_url) : null;
    const initials = user?.full_name?.charAt(0)?.toUpperCase() || 'U';

    const handleImageError = () => {
        console.log('Avatar image failed to load:', avatarUrl);
        setImageError(true);
    };

    return (
        <div className={cn('relative', className)}>
            {avatarUrl && !imageError ? (
                <>
                    <img
                        src={avatarUrl}
                        alt={user?.full_name || 'User avatar'}
                        className={cn(
                            'rounded-full object-cover border border-border',
                            sizeClasses[size]
                        )}
                        onError={handleImageError}
                        onLoad={() => {
                            console.log('Avatar image loaded successfully:', avatarUrl);
                            setImageError(false);
                        }}
                    />
                    {showOnlineIndicator && user?.is_online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                </>
            ) : (
                <div
                    className={cn(
                        'bg-primary rounded-full flex items-center justify-center border border-border',
                        sizeClasses[size]
                    )}
                >
                    <span className={cn('font-medium text-primary-foreground', textSizes[size])}>
                        {initials}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Avatar;
```

## File: components/ui/button.jsx
```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

```

## File: components/ui/card.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

## File: components/ui/dialog.jsx
```jsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

## File: components/ui/form.jsx
```jsx
"use client";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = (
  {
    ...props
  }
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props} />
  );
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props} />
  );
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props} />
  );
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}>
      {body}
    </p>
  );
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## File: components/ui/input.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }

```

## File: components/ui/label.jsx
```jsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

## File: components/ui/skeleton/AuthSkeleton.jsx
```jsx
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

const AuthSkeleton = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <div className="flex-1 flex items-center justify-center p-8 bg-background order-2 lg:order-1">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <Skeleton className="h-8 w-32 mx-auto" />
                        <Skeleton className="h-4 w-48 mx-auto" />
                    </div>
                    <Card>
                        <CardHeader className="space-y-1">
                            <Skeleton className="h-6 w-40 mx-auto" />
                            <Skeleton className="h-4 w-56 mx-auto" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Skeleton className="w-full" />
                                </div>
                                <div className="relative flex justify-center">
                                    <Skeleton className="h-4 w-32 bg-background px-2" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-4 w-48 mx-auto" />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex-1 bg-muted flex items-center justify-center p-8 order-1 lg:order-2">
                <Skeleton className="w-full h-64 rounded-lg" />
            </div>
        </div>
    );
};

export default AuthSkeleton;
```

## File: components/ui/skeleton/ChatSkeleton.jsx
```jsx
import {Skeleton} from "@/components/ui/skeleton";

const ChatSkeleton = () => {
    return (
        <div className="flex h-screen bg-background">
            <div className="w-80 border-r border-border p-4">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                    <div className="space-y-3 mt-6">
                        {Array.from({length: 5}).map((_, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="border-b border-border p-4">
                    <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-4 space-y-4">
                    {Array.from({length: 8}).map((_, i) => (
                        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            <Skeleton className="h-20 w-48 rounded-lg" />
                        </div>
                    ))}
                </div>
                <div className="border-t border-border p-4">
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    );
};

export default ChatSkeleton;
```

## File: components/ui/skeleton/ProfileSkeleton.jsx
```jsx
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

const ProfileSkeleton = () => {
    return (
        <div className="container max-w-4xl mx-auto p-6 space-y-6">
            <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-56" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="flex gap-2 pt-4">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-56" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-10 w-48" />
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileSkeleton;
```

## File: components/ui/skeleton.jsx
```jsx
import {cn} from "@/lib/utils";

function Skeleton({
    className,
    ...props
}) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
    );
}

export {Skeleton};
```

## File: components/ui/theme-toggle.jsx
```jsx
import {Moon, Sun} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useUIStore} from '@/stores/uiStore';

export function ThemeToggle() {
    const {theme, toggleTheme} = useUIStore();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
```

## File: constants/config.js
```js
export const APP_CONFIG = {
    APP_NAME: "JustChat",
    API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
    WS_URL: import.meta.env.VITE_WS_URL || "ws://localhost:5001",
    UPLOAD: {
        MAX_FILE_SIZE: 5 * 1024 * 1024,
        ALLOWED_IMAGE_TYPES: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ],
    },
    MESSAGES: {
        MAX_LENGTH: 1000,
        LOAD_LIMIT: 50,
        EDIT_TIMEOUT: 5 * 60 * 1000,
    },
    REALTIME: {
        TYPING_INDICATOR_TIMEOUT: 3000,
        RECONNECT_DELAY: 1000,
        MAX_RECONNECT_ATTEMPTS: 5,
    },
};

```

## File: constants/endpoints.js
```js

```

## File: index.css
```css
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";
@import "@fontsource/jetbrains-mono/600.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        /* Your Rose theme variables remain the same */
        --background: 0 0% 100%;
        --foreground: 240 10% 3.9%;
        --card: 0 0% 100%;
        --card-foreground: 240 10% 3.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 240 10% 3.9%;
        --primary: 346.8 77.2% 49.8%;
        --primary-foreground: 355.7 100% 97.3%;
        --secondary: 240 4.8% 95.9%;
        --secondary-foreground: 240 5.9% 10%;
        --muted: 240 4.8% 95.9%;
        --muted-foreground: 240 3.8% 46.1%;
        --accent: 240 4.8% 95.9%;
        --accent-foreground: 240 5.9% 10%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 5.9% 90%;
        --input: 240 5.9% 90%;
        --ring: 346.8 77.2% 49.8%;
        --radius: 0.65rem;
        --chart-1: 12 76% 61%;
        --chart-2: 173 58% 39%;
        --chart-3: 197 37% 24%;
        --chart-4: 43 74% 66%;
        --chart-5: 27 87% 67%;
    }

    .dark {
        --background: 20 14.3% 4.1%;
        --foreground: 0 0% 95%;
        --card: 24 9.8% 10%;
        --card-foreground: 0 0% 95%;
        --popover: 0 0% 9%;
        --popover-foreground: 0 0% 95%;
        --primary: 346.8 77.2% 49.8%;
        --primary-foreground: 355.7 100% 97.3%;
        --secondary: 240 3.7% 15.9%;
        --secondary-foreground: 0 0% 98%;
        --muted: 0 0% 15%;
        --muted-foreground: 240 5% 64.9%;
        --accent: 12 6.5% 15.1%;
        --accent-foreground: 0 0% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 0 85.7% 97.3%;
        --border: 240 3.7% 15.9%;
        --input: 240 3.7% 15.9%;
        --ring: 346.8 77.2% 49.8%;
        --chart-1: 220 70% 50%;
        --chart-2: 160 60% 45%;
        --chart-3: 30 80% 55%;
        --chart-4: 280 65% 60%;
        --chart-5: 340 75% 55%;
    }
}

@layer base {
    * {
        @apply border-border;
    }
    body {
        @apply bg-background text-foreground;
        font-family: "JetBrains Mono", monospace;
    }
}

/* Hover tooltips for sidebar buttons */
[title] {
  position: relative;
}

[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
  border: 1px solid hsl(var(--border));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## File: lib/utils.js
```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

```

## File: main.jsx
```jsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
```

## File: pages/Auth/Login.jsx
```jsx
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useAuthStore} from '@/stores/authStore';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {Github} from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const {login, error, clearError} = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        clearError();

        try {
            await login(formData);
            // If successful, navigation happens automatically via App.jsx routing
            navigate('/chat');
        } catch (error) {
            console.error('Login failed:', error);
            // Error is already set by the store
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (error) clearError();
    };

    const handleGitHubLogin = () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        window.location.href = `${apiUrl}/auth/oauth/github`;
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-foreground">JustChat</h1>
                        <p className="text-muted-foreground mt-2">Sign in to your account</p>
                    </div>

                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                            <CardDescription className="text-center">
                                Enter your credentials to continue
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mb-6"
                                onClick={handleGitHubLogin}
                                disabled={isLoading}
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Continue with GitHub
                            </Button>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with email
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-primary hover:text-primary/90"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing in...' : 'Log In'}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-primary hover:text-primary/90 font-medium"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex-1 hidden lg:flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <img
                        src="/Login.svg"
                        alt="Login Illustration"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Login;
```

## File: pages/Auth/OAuthCallback.jsx
```jsx
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
```

## File: pages/Auth/Signup.jsx
```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/authStore';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Github } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const { signup, error, clearError } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            return;
        }

        setIsLoading(true);
        clearError();

        try {
            await signup({
                email: formData.email,
                password: formData.password,
                full_name: formData.full_name,
            });
        } catch (error) {
            console.error('Signup failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (error) clearError();
    };

    const handleGitHubSignup = () => {
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/auth/oauth/github`;
    };

    const passwordsMatch = formData.password === formData.confirmPassword || !formData.confirmPassword;

    return (
        <div className="min-h-screen flex">

            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-foreground">JustChat</h1>
                        <p className="text-muted-foreground mt-2">Create your account</p>
                    </div>

                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Get started</CardTitle>
                            <CardDescription className="text-center">
                                Enter your details to create an account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mb-6"
                                onClick={handleGitHubSignup}
                                disabled={isLoading}
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Continue with GitHub
                            </Button>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with email
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        name="full_name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                    {!passwordsMatch && (
                                        <p className="text-sm text-destructive">
                                            Passwords do not match
                                        </p>
                                    )}
                                </div>

                                {error && (
                                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button 
                                    type="submit" 
                                    className="w-full" 
                                    disabled={isLoading || !passwordsMatch}
                                >
                                    {isLoading ? 'Creating account...' : 'Create Account'}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    className="text-primary hover:text-primary/90 font-medium"
                                >
                                    Log in
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex-1 hidden lg:flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <img
                        src="/SignUp.svg"
                        alt="Login Illustration"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Signup;
```

## File: pages/Chat/Chat.jsx
```jsx
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
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    if (isLoading) {
        return <ChatSkeleton />;
    }

    return (
        <Layout>
            <div className="flex h-full w-full">
                {currentConversationId ? (
                    <div className="flex-1 flex flex-col min-h-0 w-full"> {/* Ensure full width */}
                        <ChatHeader
                            conversationId={currentConversationId}
                            onDeleteClick={handleDeleteClick}
                        />
                        <MessageList
                            conversationId={currentConversationId}
                            showDeleteDialog={showDeleteDialog}
                            onDeleteDialogChange={setShowDeleteDialog}
                        />
                        <MessageInput conversationId={currentConversationId} />
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center w-full">
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
```

## File: pages/Profile/Profile.jsx
```jsx
import {useEffect, useState} from 'react';
import Layout from '@/components/layout/Layout';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useAuthStore} from '@/stores/authStore';
import {useUserStore} from '@/stores/userStore';
import {User, Mail, Camera, Save, X, Key} from 'lucide-react';
import ProfileSkeleton from "@/components/ui/skeleton/ProfileSkeleton";
import {useNavigate} from 'react-router-dom';
import {getAvatarUrl, validateAvatarFile} from '@/utils/avatarUtils';

const Profile = () => {
    const {user, isAuthenticated, updateUser} = useAuthStore();
    const {updateProfile, isLoading, error, clearError} = useUserStore();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [success, setSuccess] = useState('');
    const [pageLoading, setPageLoading] = useState(true);
    const [hasLoadedProfile, setHasLoadedProfile] = useState(false);

    console.log("🔍 Profile - Current user:", user);
    console.log("🔍 Profile - Avatar URL:", user?.avatar_url);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Always load user profile to get complete data including avatar
        const initializeProfile = async () => {
            try {
                const userStore = useUserStore.getState();
                if (!userStore.currentUser || !user?.avatar_url) {
                    console.log("🔄 Profile - Loading user profile data...");
                    await userStore.loadCurrentUser();
                }
            } catch (error) {
                console.error('Profile initialization error:', error);
            } finally {
                setPageLoading(false);
                setHasLoadedProfile(true);
            }
        };

        initializeProfile();
    }, [isAuthenticated, navigate]);

    // Set avatar preview from user data - use both authStore and userStore data
    useEffect(() => {
        const userStore = useUserStore.getState();
        const currentUser = userStore.currentUser || user;

        if (currentUser?.avatar_url) {
            const processedUrl = getAvatarUrl(currentUser.avatar_url);
            console.log('Profile - Setting avatar preview:', processedUrl);
            setAvatarPreview(processedUrl);
        } else {
            console.log('Profile - No avatar URL available, using fallback');
            setAvatarPreview('');
        }
    }, [user?.avatar_url]);

    const handleSave = async () => {
        clearError();
        setSuccess('');

        const updateData = new FormData();

        if (formData.full_name !== user?.full_name) {
            updateData.append('full_name', formData.full_name);
        }

        if (avatarFile) {
            updateData.append('avatar_file', avatarFile);
        }

        if (updateData.get('full_name') === null && updateData.get('avatar_file') === null) {
            setSuccess('No changes to save');
            setIsEditing(false);
            return;
        }

        try {
            const updatedUser = await updateProfile(updateData);

            if (updatedUser && updatedUser.id) {
                setSuccess('Profile updated successfully');
                setIsEditing(false);
                setAvatarFile(null);

                // Update local avatar preview
                if (updatedUser.avatar_url) {
                    const newAvatarUrl = getAvatarUrl(updatedUser.avatar_url);
                    console.log('✅ Profile - New avatar URL after update:', newAvatarUrl);
                    setAvatarPreview(newAvatarUrl);
                }
            }
        } catch (error) {
            console.error('Profile update error:', error);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validationError = validateAvatarFile(file);
        if (validationError) {
            useUserStore.setState({error: validationError});
            return;
        }

        setAvatarFile(file);
        clearError();

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setAvatarPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            useUserStore.setState({error: 'Passwords do not match'});
            return;
        }

        if (passwordData.newPassword.length < 6) {
            useUserStore.setState({error: 'Password must be at least 6 characters long'});
            return;
        }

        clearError();
        setSuccess('');

        const updateData = new FormData();
        updateData.append('currentPassword', passwordData.currentPassword);
        updateData.append('newPassword', passwordData.newPassword);

        try {
            await updateProfile(updateData);
            setSuccess('Password updated successfully');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setIsChangingPassword(false);
        } catch (error) {
            console.error('Password change error:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            full_name: user?.full_name || '',
        });
        setAvatarFile(null);
        // Reset to current user avatar
        const userStore = useUserStore.getState();
        const currentUser = userStore.currentUser || user;
        setAvatarPreview(currentUser?.avatar_url ? getAvatarUrl(currentUser.avatar_url) : '');
        clearError();
        setSuccess('');
        setIsEditing(false);
    };

    const clearMessages = () => {
        clearError();
        setSuccess('');
    };

    const passwordsMatch = passwordData.newPassword === passwordData.confirmPassword || !passwordData.confirmPassword;

    const handleEditClick = () => {
        setIsEditing(true);
        setFormData({
            full_name: user?.full_name || '',
        });
        const userStore = useUserStore.getState();
        const currentUser = userStore.currentUser || user;
        setAvatarPreview(currentUser?.avatar_url ? getAvatarUrl(currentUser.avatar_url) : '');
        setAvatarFile(null);
    };

    if (pageLoading) {
        return (
            <Layout>
                <ProfileSkeleton />
            </Layout>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Layout>
            <div className="container max-w-4xl mx-auto p-6">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Profile</h1>
                        <p className="text-muted-foreground">Manage your account settings</p>
                    </div>

                    {(error || success) && (
                        <Card className={error ? "border-destructive" : "border-green-500"}>
                            <CardContent className="p-4">
                                <div className={`flex items-center justify-between ${error ? "text-destructive" : "text-green-600"}`}>
                                    <span>{error || success}</span>
                                    <Button variant="ghost" size="icon" onClick={clearMessages}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-6 lg:grid-cols-3">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Profile Picture</CardTitle>
                                <CardDescription>
                                    {isEditing ? 'Select a new profile photo (JPEG only)' : 'Your profile photo'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative">
                                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                                            {avatarPreview ? (
                                                <img
                                                    src={avatarPreview}
                                                    alt="Profile"
                                                    className="w-32 h-32 rounded-full object-cover"
                                                    onError={(e) => {
                                                        console.error('❌ Profile - Failed to load avatar image:', avatarPreview);
                                                        e.target.style.display = 'none';
                                                        const nextSibling = e.target.nextSibling;
                                                        if (nextSibling && nextSibling.style) {
                                                            nextSibling.style.display = 'flex';
                                                        }
                                                    }}
                                                    onLoad={(e) => {
                                                        console.log('✅ Profile - Avatar loaded successfully');
                                                    }}
                                                />
                                            ) : null}
                                            {(!avatarPreview) && (
                                                <User className="h-16 w-16 text-primary" />
                                            )}
                                        </div>
                                        {isEditing && (
                                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                                                <Camera className="h-4 w-4" />
                                                <input
                                                    id="avatar-upload"
                                                    type="file"
                                                    accept=".jpeg,.jpg"
                                                    onChange={handleAvatarChange}
                                                    className="hidden"
                                                    disabled={isLoading}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    {isEditing ? (
                                        <div className="text-center">
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {avatarFile ? 'New photo selected' : 'Click the camera icon to choose a photo'}
                                            </p>
                                            {avatarFile && (
                                                <p className="text-xs text-muted-foreground">
                                                    Click "Save Changes" to update your profile
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-sm text-muted-foreground">
                                                Click "Edit Profile" to change your photo
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rest of the Profile component remains the same */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your personal details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                        disabled={!isEditing || isLoading}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="flex-1"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Email cannot be changed
                                    </p>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    {isEditing ? (
                                        <>
                                            <Button
                                                onClick={handleSave}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                ) : (
                                                    <Save className="h-4 w-4 mr-2" />
                                                )}
                                                Save Changes
                                            </Button>
                                            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button onClick={handleEditClick}>
                                            Edit Profile
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>
                                Update your password to keep your account secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {isChangingPassword ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                            disabled={isLoading}
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                            disabled={isLoading}
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                            disabled={isLoading}
                                            placeholder="Confirm new password"
                                        />
                                        {!passwordsMatch && (
                                            <p className="text-sm text-destructive">
                                                Passwords do not match
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handlePasswordChange}
                                            disabled={isLoading || !passwordsMatch || !passwordData.currentPassword || !passwordData.newPassword}
                                        >
                                            {isLoading ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            ) : (
                                                <Key className="h-4 w-4 mr-2" />
                                            )}
                                            Update Password
                                        </Button>
                                        <Button variant="outline" onClick={() => setIsChangingPassword(false)} disabled={isLoading}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
                                    <Key className="h-4 w-4 mr-2" />
                                    Change Password
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
```

## File: services/api.js
```js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Network error (backend not reachable)
        if (!error.response) {
            console.error("Network Error: Cannot connect to server");
            const networkError = new Error(
                "Cannot connect to server. Please check if the backend is running."
            );
            networkError.isNetworkError = true;
            return Promise.reject(networkError);
        }

        // Token refresh logic - ONLY for 401 errors and when we have a refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            const refreshToken = localStorage.getItem("refreshToken");

            // If no refresh token, don't attempt refresh - this is likely a login error
            if (!refreshToken) {
                console.log("No refresh token available - likely login error");
                // Don't clear tokens or redirect here - let the login component handle the error
                return Promise.reject(error);
            }

            // Only attempt refresh if we have a refresh token and this is not an auth endpoint
            const isAuthEndpoint = originalRequest.url.includes("/auth/");
            if (isAuthEndpoint) {
                console.log("Auth endpoint - skipping token refresh");
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh-token`,
                    { refreshToken }
                );

                const { accessToken } = response.data.data;
                localStorage.setItem("accessToken", accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);

                // Clear auth data only on refresh failure (session expired)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");

                // Redirect to login only if we're not already on login page
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(
                    new Error("Session expired. Please login again.")
                );
            }
        }

        return Promise.reject(error);
    }
);

export default api;

```

## File: services/authService.js
```js
import api from "./api";

export const authService = {
    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response;
    },

    signup: async (userData) => {
        const response = await api.post("/auth/signup", userData);
        return response;
    },

    refreshToken: async (tokenData) => {
        const response = await api.post("/auth/refresh-token", tokenData);
        return response;
    },

    logout: async (tokenData) => {
        const response = await api.post("/auth/logout", tokenData);
        return response;
    },

    logoutAll: async () => {
        const response = await api.post("/auth/logout-all");
        return response;
    },
};

```

## File: services/chatService.js
```js
import api from "./api";

export const chatService = {
    // Conversations
    getConversations: async () => {
        const response = await api.get("/conversations");
        return response;
    },

    createConversation: async (user2Id) => {
        const response = await api.post("/conversations", {
            user2_id: user2Id,
        });
        return response;
    },

    checkConversation: async (user2Id) => {
        const response = await api.get(`/conversations/check/${user2Id}`);
        return response;
    },

    getConversation: async (conversationId) => {
        const response = await api.get(`/conversations/${conversationId}`);
        return response;
    },

    getConversationParticipants: async (conversationId) => {
        const response = await api.get(
            `/conversations/${conversationId}/participants`
        );
        return response;
    },

    deleteConversation: async (conversationId) => {
        const response = await api.delete(`/conversations/${conversationId}`);
        return response;
    },

    // Messages
    getMessages: async (conversationId, page = 1, limit = 50) => {
        const response = await api.get(
            `/conversations/${conversationId}/messages`,
            {
                params: { page, limit },
            }
        );
        return response;
    },

    sendMessage: async (conversationId, messageData) => {
        const response = await api.post(
            `/conversations/${conversationId}/messages`,
            messageData
        );
        return response;
    },

    getMessage: async (conversationId, messageId) => {
        const response = await api.get(
            `/conversations/${conversationId}/messages/${messageId}`
        );
        return response;
    },

    updateMessage: async (conversationId, messageId, updateData) => {
        const response = await api.put(
            `/conversations/${conversationId}/messages/${messageId}`,
            updateData
        );
        return response;
    },

    deleteMessage: async (conversationId, messageId) => {
        const response = await api.delete(
            `/conversations/${conversationId}/messages/${messageId}`
        );
        return response;
    },

    markAsRead: async (conversationId, messageId) => {
        const response = await api.post(
            `/conversations/${conversationId}/messages/${messageId}/read`
        );
        return response;
    },

    markAllAsRead: async (conversationId) => {
        const response = await api.post(
            `/conversations/${conversationId}/mark-all-read`
        );
        return response;
    },

    getUnreadCount: async (conversationId) => {
        const response = await api.get(
            `/conversations/${conversationId}/unread-count`
        );
        return response;
    },
};

```

## File: services/index.js
```js
export { authService } from "./authService";
export { userService } from "./userService";
export { chatService } from "./chatService";
export { uploadService } from "./uploadService";
```

## File: services/uploadService.js
```js
import api from "./api";
import { validateFile, compressImage } from "../utils/fileUtils";

export const uploadService = {
    uploadImage: async (file, type = "message") => {
        validateFile(file);

        let processedFile = file;

        if (file.size > 1024 * 1024) {
            processedFile = await compressImage(file, 0.7);
        }

        const formData = new FormData();
        formData.append("image", processedFile);
        formData.append("type", type);

        const response = await api.post("/upload/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },

    deleteImage: async (publicId) => {
        // Note: backend doesn't have delete endpoint yet
        // This is for future implementation
        console.log("Delete image endpoint not implemented yet");
    },
};

```

## File: services/userService.js
```js
import api from "./api";

export const userService = {
    searchUsers: async (query, limit = 10) => {
        const response = await api.get("/users/search", {
            params: { q: query, limit },
        });
        return response;
    },

    getAllUsers: async (limit = 50) => {
        const response = await api.get("/users", {
            params: { limit },
        });
        return response;
    },

    getUserById: async (userId) => {
        const response = await api.get(`/users/${userId}`);
        return response;
    },

    getProfile: async () => {
        const response = await api.get("/profile/me");
        return response;
    },

    updateProfile: async (profileData) => {
        const response = await api.put("/profile/update", profileData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
    },

    updateOnlineStatus: async (isOnline) => {
        const response = await api.put("/users/online-status", {
            is_online: isOnline,
        });
        return response;
    },
};

```

## File: stores/authStore.js
```js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/authService";
import { storage } from "../utils/storageUtils";
import { getErrorMessage } from "../utils/errorUtils";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            isInitialized: false,

            initialize: async (force = false) => {
                console.log("AuthStore initialize() called", { force });

                if (get().isInitialized && !force) {
                    console.log("AuthStore already initialized, skipping");
                    return;
                }

                const accessToken = localStorage.getItem("accessToken");
                const refreshToken = localStorage.getItem("refreshToken");
                const userStr = localStorage.getItem("user");

                console.log("Auth initialization - localStorage check:", {
                    accessToken: accessToken ? "Present" : "Missing",
                    refreshToken: refreshToken ? "Present" : "Missing",
                    userStr: userStr ? "Present" : "Missing",
                });

                if (accessToken && refreshToken && userStr) {
                    try {
                        const user = JSON.parse(userStr);
                        console.log(
                            "Setting authenticated state with user:",
                            user.email
                        );

                        set({
                            accessToken,
                            refreshToken,
                            user,
                            isAuthenticated: true,
                            isInitialized: true,
                        });

                        console.log("Auth initialized successfully");
                    } catch (error) {
                        console.error(
                            "Failed to parse stored user data:",
                            error
                        );
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("user");
                        set({
                            isInitialized: true,
                            isAuthenticated: false,
                        });
                    }
                } else {
                    console.log(
                        "No valid tokens found, setting unauthenticated state"
                    );
                    set({
                        isInitialized: true,
                        isAuthenticated: false,
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                    });
                }

                console.log("AuthStore initialize() completed");
            },

            resetInitialization: () => {
                console.log("Resetting auth store initialization");
                set({ isInitialized: false });
            },

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.login(credentials);
                    const { user, accessToken, refreshToken } =
                        response.data.data;

                    console.log("Login successful - User data:", user);

                    // Ensure user has avatar_url field, even if null
                    const userWithAvatar = {
                        ...user,
                        avatar_url: user.avatar_url || null,
                    };

                    // Store user data
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(userWithAvatar)
                    );

                    set({
                        user: userWithAvatar,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                        isInitialized: true,
                    });

                    return response;
                } catch (error) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("user");

                    const errorMessage =
                        getErrorMessage(error) || "Login failed";
                    set({
                        isLoading: false,
                        error: errorMessage,
                        isAuthenticated: false,
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                    });
                    throw new Error(errorMessage);
                }
            },

            signup: async (userData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.signup(userData);
                    const { user, accessToken, refreshToken } =
                        response.data.data;

                    // Ensure user has avatar_url field
                    const userWithAvatar = {
                        ...user,
                        avatar_url: user.avatar_url || null,
                    };

                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(userWithAvatar)
                    );

                    set({
                        user: userWithAvatar,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                        isInitialized: true,
                    });

                    return response;
                } catch (error) {
                    const errorMessage =
                        getErrorMessage(error) || "Signup failed";
                    set({ isLoading: false, error: errorMessage });
                    throw new Error(errorMessage);
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    const { refreshToken } = get();
                    if (refreshToken) {
                        await authService.logout({ refreshToken });
                    }
                } catch (error) {
                    console.error("Logout API call failed:", error);
                } finally {
                    // Clear everything on logout
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("user");

                    storage.clear();

                    // Reset stores to clear any cached data
                    try {
                        // Reset stores by setting their initial state
                        const { useConversationStore } = await import(
                            "./conversationStore"
                        );
                        const { useUserStore } = await import("./userStore");
                        const { useMessageStore } = await import(
                            "./messageStore"
                        );

                        const conversationStore =
                            useConversationStore.getState();
                        const userStore = useUserStore.getState();

                        if (conversationStore.resetStore)
                            conversationStore.resetStore();
                        if (userStore.resetStore) userStore.resetStore();
                    } catch (storeError) {
                        console.error("Error clearing stores:", storeError);
                    }

                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                        isInitialized: true,
                    });
                }
            },

            refreshTokens: async () => {
                const { refreshToken } = get();
                if (!refreshToken)
                    throw new Error("No refresh token available");

                try {
                    const response = await authService.refreshToken({
                        refreshToken,
                    });
                    const { accessToken } = response.data.data;
                    localStorage.setItem("accessToken", accessToken);
                    set({ accessToken, error: null });
                    return accessToken;
                } catch (error) {
                    get().logout();
                    throw new Error("Session expired. Please login again.");
                }
            },

            clearError: () => set({ error: null }),

            updateUser: (userData) => {
                set((state) => {
                    const updatedUser = { ...state.user, ...userData };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    return { user: updatedUser };
                });
            },

            syncUserData: (userData) => {
                set((state) => {
                    const updatedUser = { ...state.user, ...userData };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    return { user: updatedUser };
                });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
                isInitialized: state.isInitialized,
            }),
        }
    )
);

```

## File: stores/conversationStore.js
```js
import { create } from "zustand";
import { chatService } from "../services/chatService";
import { getErrorMessage } from "../utils/errorUtils";
import { sortConversations, getOtherUser } from "../utils/chatUtils";
import {
    processConversations,
    getProperLastMessage,
} from "../utils/conversationHelpers";

// Helper function to get current user ID
const getCurrentUserId = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr).id : null;
};

export const useConversationStore = create((set, get) => ({
    conversations: new Map(),
    conversationsList: [],
    currentConversationId: null,
    isLoading: false,
    error: null,
    hasLoadedConversations: false,

    loadConversations: async () => {
        if (get().isLoading || get().hasLoadedConversations) return;

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            console.error("No tokens available for loading conversations");
            set({
                error: "Authentication required",
                hasLoadedConversations: true,
            });
            return;
        }

        set({ isLoading: true, error: null });
        try {
            console.log("🔄 Loading conversations from API...");
            const response = await chatService.getConversations();
            const conversations = response.data.data.conversations;

            // ADD DEBUG LOGGING
            console.log(
                "🔍 DEBUG - Raw conversations from backend:",
                conversations.map((c) => ({
                    id: c.id,
                    unread_count: c.unread_count,
                    has_unread_messages: c.has_unread_messages,
                    otherUser:
                        c.user1?.id === getCurrentUserId()
                            ? c.user2?.full_name
                            : c.user1?.full_name,
                }))
            );

            const currentUserId = getCurrentUserId();
            console.log("👤 Current user ID:", currentUserId);

            const processedConversations = processConversations(
                conversations,
                currentUserId
            );

            // ADD DEBUG LOGGING FOR PROCESSED CONVERSATIONS
            console.log(
                "🔍 DEBUG - Processed conversations:",
                processedConversations.map((c) => ({
                    id: c.id,
                    unread_count: c.unread_count,
                    has_unread_messages: c.has_unread_messages,
                    otherUser:
                        c.user1?.id === currentUserId
                            ? c.user2?.full_name
                            : c.user1?.full_name,
                }))
            );

            const sortedConversations = sortConversations(
                processedConversations
            );

            set((state) => {
                const newConversations = new Map(state.conversations);

                sortedConversations.forEach((conv) => {
                    newConversations.set(conv.id, conv);
                });

                return {
                    conversations: newConversations,
                    conversationsList: sortedConversations,
                    isLoading: false,
                    hasLoadedConversations: true,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load conversations";
            console.error("❌ Failed to load conversations:", error);
            set({
                isLoading: false,
                error: errorMessage,
                hasLoadedConversations: true,
            });
        }
    },

    createConversation: async (user2Id) => {
        set({ isLoading: true, error: null });
        try {
            console.log("🔄 Creating conversation with user:", user2Id);
            const response = await chatService.createConversation(user2Id);
            const conversation = response.data.data.conversation;
            console.log("✅ Conversation created:", conversation);

            const currentUserId = getCurrentUserId();

            const processedConversation = {
                ...conversation,
                unread_count: 0,
                has_unread_messages: false,
                last_message: getProperLastMessage(conversation),
            };

            console.log(
                "🔄 Processed new conversation:",
                processedConversation
            );

            set((state) => {
                const newConversations = new Map(state.conversations);
                newConversations.set(
                    processedConversation.id,
                    processedConversation
                );

                const conversationsList = sortConversations([
                    processedConversation,
                    ...state.conversationsList,
                ]);

                return {
                    conversations: newConversations,
                    conversationsList,
                    currentConversationId: processedConversation.id,
                    isLoading: false,
                };
            });

            return processedConversation;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to create conversation";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    getOrCreateConversation: async (user2Id) => {
        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
            throw new Error("User not authenticated");
        }

        const conversations = get().conversationsList;
        console.log(
            "🔄 Checking existing conversations:",
            conversations.length
        );

        const existingConversation = conversations.find(
            (conv) =>
                (conv.user1.id === currentUserId &&
                    conv.user2.id === user2Id) ||
                (conv.user1.id === user2Id && conv.user2.id === currentUserId)
        );

        console.log("🔄 Existing conversation found:", existingConversation);

        if (existingConversation) {
            console.log(
                "✅ Using existing conversation:",
                existingConversation.id
            );
            set({ currentConversationId: existingConversation.id });
            return existingConversation;
        }

        console.log("🔄 No existing conversation, creating new one...");
        return await get().createConversation(user2Id);
    },

    setCurrentConversation: (conversationId) => {
        console.log("🔄 Setting current conversation:", conversationId);
        set({ currentConversationId: conversationId });
    },

    deleteConversation: async (conversationId) => {
        console.log("🔄 Deleting conversation:", conversationId);

        try {
            await chatService.deleteConversation(conversationId);

            // Remove conversation from local state
            set((state) => {
                const newConversations = new Map(state.conversations);
                newConversations.delete(conversationId);

                const conversationsList = state.conversationsList.filter(
                    (conv) => conv.id !== conversationId
                );

                // Clear current conversation if it was the deleted one
                const newCurrentConversationId =
                    state.currentConversationId === conversationId
                        ? null
                        : state.currentConversationId;

                return {
                    conversations: newConversations,
                    conversationsList,
                    currentConversationId: newCurrentConversationId,
                };
            });

            console.log("✅ Conversation deleted successfully");
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to delete conversation";
            console.error("❌ Failed to delete conversation:", error);
            throw new Error(errorMessage);
        }
    },

    markConversationAsRead: async (conversationId) => {
        console.log("🔄 Marking conversation as read:", conversationId);

        try {
            // Call the backend endpoint to mark all messages as read
            const response = await chatService.markAllAsRead(conversationId);
            const { unread_count, has_unread_messages } = response.data.data;

            console.log("✅ Backend marked conversation as read:", {
                unread_count,
                has_unread_messages,
            });

            // Force reload conversations to get fresh data from backend
            console.log(
                "🔄 Forcing conversation reload after marking as read..."
            );
            await get().loadConversations();
        } catch (error) {
            console.error("Failed to mark conversation as read:", error);

            // Even if backend fails, try to reload conversations to get current state
            try {
                console.log(
                    "🔄 Attempting to reload conversations after error..."
                );
                await get().loadConversations();
            } catch (reloadError) {
                console.error("Failed to reload conversations:", reloadError);
            }
        }
    },

    updateConversationLastMessage: (conversationId, lastMessage) => {
        console.log("🔄 Updating conversation last message:", {
            conversationId,
            lastMessage,
        });
        set((state) => {
            const conversation = state.conversations.get(conversationId);
            if (!conversation) return state;

            const updatedConversation = {
                ...conversation,
                last_message: lastMessage,
            };
            const newConversations = new Map(state.conversations);
            newConversations.set(conversationId, updatedConversation);

            const conversationsList = sortConversations([
                updatedConversation,
                ...state.conversationsList.filter(
                    (conv) => conv.id !== conversationId
                ),
            ]);

            return {
                conversations: newConversations,
                conversationsList,
            };
        });
    },

    updateConversationOnNewMessage: (conversationId, message) => {
        const currentUserId = getCurrentUserId();

        console.log("🔄 Updating conversation on new message:", {
            conversationId,
            message,
            currentUserId,
        });

        set((state) => {
            const conversation = state.conversations.get(conversationId);
            if (!conversation) return state;

            const isUnread =
                message.sender_id !== currentUserId &&
                !message.read_receipts?.some(
                    (receipt) => receipt.reader_id === currentUserId
                );

            const currentUnreadCount = conversation.unread_count || 0;
            const newUnreadCount = isUnread
                ? currentUnreadCount + 1
                : currentUnreadCount;

            console.log("🔄 Message unread status:", {
                isUnread,
                currentUnreadCount,
                newUnreadCount,
            });

            const updatedConversation = {
                ...conversation,
                last_message: message,
                unread_count: newUnreadCount,
                has_unread_messages: newUnreadCount > 0,
            };

            const newConversations = new Map(state.conversations);
            newConversations.set(conversationId, updatedConversation);

            const conversationsList = sortConversations([
                updatedConversation,
                ...state.conversationsList.filter(
                    (conv) => conv.id !== conversationId
                ),
            ]);

            return {
                conversations: newConversations,
                conversationsList,
            };
        });
    },

    clearError: () => set({ error: null }),

    getCurrentConversation: () => {
        const state = get();
        const conversation = state.conversations.get(
            state.currentConversationId
        );
        console.log("🔄 Getting current conversation:", conversation);
        return conversation;
    },

    getConversationById: (conversationId) => {
        const conversation = get().conversations.get(conversationId);
        console.log("🔄 Getting conversation by ID:", {
            conversationId,
            conversation,
        });
        return conversation;
    },

    getCurrentOtherUser: () => {
        const state = get();
        const conversation = state.conversations.get(
            state.currentConversationId
        );
        const currentUserId = getCurrentUserId();
        const otherUser = conversation
            ? getOtherUser(conversation, currentUserId)
            : null;
        console.log("🔄 Getting current other user:", otherUser);
        return otherUser;
    },

    resetStore: () => {
        console.log("🔄 Resetting conversation store");
        set({
            conversations: new Map(),
            conversationsList: [],
            currentConversationId: null,
            isLoading: false,
            error: null,
            hasLoadedConversations: false,
        });
    },
}));

```

## File: stores/messageStore.js
```js
import { create } from "zustand";
import { chatService } from "../services/chatService";
import { useAuthStore } from "./authStore";
import { useConversationStore } from "./conversationStore";
import { getErrorMessage } from "../utils/errorUtils";
import { validateMessage, sanitizeMessage } from '@/utils/validationUtils';
import { groupMessagesByDate } from "../utils/chatUtils";

export const useMessageStore = create((set, get) => ({
    messages: new Map(),
    isLoading: false,
    error: null,

    loadMessages: async (conversationId, page = 1, limit = 50) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.getMessages(
                conversationId,
                page,
                limit
            );
            const { messages, pagination } = response.data.data;

            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const existingMessages = existingData.messages;

                const messageMap = new Map();
                [...existingMessages, ...messages].forEach((msg) =>
                    messageMap.set(msg.id, msg)
                );

                const mergedMessages = Array.from(messageMap.values()).sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    messages: mergedMessages,
                    pagination: {
                        ...pagination,
                        hasMore: messages.length === limit,
                        currentPage: page,
                    },
                });

                return {
                    messages: newMessages,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load messages";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    sendMessage: async (conversationId, messageData) => {
        if (messageData.message_type === "TEXT") {
            const validationError = validateMessage(messageData.message_text);
            if (validationError) {
                throw new Error(validationError);
            }
        }

        const tempId = `temp-${Date.now()}`;
        const { user } = useAuthStore.getState();

        if (!user) {
            throw new Error("User not authenticated");
        }

        const sanitizedData = {
            ...messageData,
            message_text:
                messageData.message_type === "TEXT"
                    ? sanitizeMessage(messageData.message_text)
                    : messageData.message_text,
        };

        const optimisticMessage = {
            id: tempId,
            ...sanitizedData,
            conversation_id: conversationId,
            sender_id: user.id,
            sender: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                avatar_url: user.avatar_url,
            },
            created_at: new Date().toISOString(),
            is_delivered: false,
            is_optimistic: true,
            read_receipts: [],
        };

        set((state) => {
            const existingData = state.messages.get(conversationId) || {
                messages: [],
                pagination: {},
            };
            const newMessages = new Map(state.messages);
            newMessages.set(conversationId, {
                ...existingData,
                messages: [...existingData.messages, optimisticMessage],
            });

            return { messages: newMessages };
        });

        try {
            const response = await chatService.sendMessage(
                conversationId,
                sanitizedData
            );
            const realMessage = response.data.data.message;
            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const filteredMessages = existingData.messages.filter(
                    (msg) => msg.id !== tempId
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...existingData,
                    messages: [...filteredMessages, realMessage],
                });

                return { messages: newMessages };
            });

            const { updateConversationLastMessage } =
                useConversationStore.getState();
            if (updateConversationLastMessage) {
                updateConversationLastMessage(conversationId, realMessage);
            }

            return realMessage;
        } catch (error) {
            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const filteredMessages = existingData.messages.filter(
                    (msg) => msg.id !== tempId
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...existingData,
                    messages: filteredMessages,
                });

                return {
                    messages: newMessages,
                    error: getErrorMessage(error) || "Failed to send message",
                };
            });
            throw error;
        }
    },

    markMessageAsRead: async (conversationId, messageId) => {
        try {
            await chatService.markAsRead(conversationId, messageId);

            set((state) => {
                const conversationData = state.messages.get(conversationId);
                if (!conversationData) return state;

                const { user } = useAuthStore.getState();
                if (!user) return state;

                const updatedMessages = conversationData.messages.map((msg) => {
                    if (msg.id === messageId) {
                        const existingReceipts = msg.read_receipts || [];
                        const alreadyRead = existingReceipts.some(
                            (receipt) => receipt.reader_id === user.id
                        );

                        if (!alreadyRead) {
                            return {
                                ...msg,
                                read_receipts: [
                                    ...existingReceipts,
                                    {
                                        reader_id: user.id,
                                        read_at: new Date().toISOString(),
                                        reader: {
                                            id: user.id,
                                            full_name: user.full_name,
                                        },
                                    },
                                ],
                            };
                        }
                    }
                    return msg;
                });

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...conversationData,
                    messages: updatedMessages,
                });

                return { messages: newMessages };
            });
        } catch (error) {
            console.error("Failed to mark message as read:", error);
        }
    },

    addMessage: (conversationId, message) => {
        set((state) => {
            const existingData = state.messages.get(conversationId) || {
                messages: [],
                pagination: {},
            };
            const messageExists = existingData.messages.some(
                (msg) => msg.id === message.id
            );

            if (messageExists) return state;

            const newMessages = new Map(state.messages);
            newMessages.set(conversationId, {
                ...existingData,
                messages: [...existingData.messages, message],
            });

            return { messages: newMessages };
        });
    },

    clearMessages: (conversationId) => {
        set((state) => {
            const newMessages = new Map(state.messages);
            newMessages.delete(conversationId);
            return { messages: newMessages };
        });
    },

    clearError: () => set({ error: null }),

    getMessages: (conversationId) => {
        const data = get().messages.get(conversationId);
        return data?.messages || [];
    },

    getPagination: (conversationId) => {
        const data = get().messages.get(conversationId);
        return data?.pagination || { hasMore: true, currentPage: 1 };
    },

    getGroupedMessages: (conversationId) => {
        const messages = get().getMessages(conversationId);
        return groupMessagesByDate(messages);
    },
    resetStore: () =>
        set({
            messages: new Map(),
            isLoading: false,
            error: null,
        }),
}));

```

## File: stores/uiStore.js
```js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
    persist(
        (set, get) => ({
            theme: "light",
            activeSidebar: "conversations",
            isMobileSidebarOpen: false,
            modals: {
                userProfile: false,
                imagePreview: false,
                deleteConfirm: false,
                newConversation: false,
            },
            toast: null,
            loadingStates: new Map(),

            setTheme: (theme) => {
                set({ theme });
                document.documentElement.classList.toggle(
                    "dark",
                    theme === "dark"
                );
            },

            toggleTheme: () => {
                const newTheme = get().theme === "light" ? "dark" : "light";
                set({ theme: newTheme });
                document.documentElement.classList.toggle(
                    "dark",
                    newTheme === "dark"
                );
            },

            setActiveSidebar: (sidebar) => set({ activeSidebar: sidebar }),
            toggleMobileSidebar: () =>
                set((state) => ({
                    isMobileSidebarOpen: !state.isMobileSidebarOpen,
                })),
            openModal: (modalName) =>
                set((state) => ({
                    modals: { ...state.modals, [modalName]: true },
                })),
            closeModal: (modalName) =>
                set((state) => ({
                    modals: { ...state.modals, [modalName]: false },
                })),
            closeAllModals: () =>
                set({
                    modals: {
                        userProfile: false,
                        imagePreview: false,
                        deleteConfirm: false,
                        newConversation: false,
                    },
                }),
            showToast: (toastData) => set({ toast: toastData }),
            hideToast: () => set({ toast: null }),
            setLoading: (key, isLoading) =>
                set((state) => {
                    const newLoadingStates = new Map(state.loadingStates);
                    if (isLoading) newLoadingStates.set(key, true);
                    else newLoadingStates.delete(key);
                    return { loadingStates: newLoadingStates };
                }),
            isLoading: (key) => get().loadingStates.has(key),
            isModalOpen: (modalName) => get().modals[modalName],
        }),
        {
            name: "ui-storage",
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);

```

## File: stores/userStore.js
```js
import { create } from "zustand";
import { userService } from "../services/userService";
import { getErrorMessage } from "../utils/errorUtils";
import { useAuthStore } from "./authStore";

export const useUserStore = create((set, get) => ({
    currentUser: null,
    users: [],
    searchedUsers: [],
    onlineUsers: new Set(),
    isLoading: false,
    error: null,
    hasLoadedCurrentUser: false,

    loadCurrentUser: async () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            console.log("No tokens available for loading user profile");
            set({
                error: "Authentication required",
                hasLoadedCurrentUser: true,
            });
            return;
        }

        set({ isLoading: true, error: null });
        try {
            const response = await userService.getProfile();
            const user = response.data.data.user;

            console.log("UserStore - Loaded current user:", {
                id: user.id,
                email: user.email,
                avatar_url: user.avatar_url,
            });

            // Ensure avatar_url is properly set (not undefined)
            const userWithAvatar = {
                ...user,
                avatar_url: user.avatar_url || null,
            };

            // Sync the complete user data to authStore
            const authStore = useAuthStore.getState();
            authStore.syncUserData(userWithAvatar);

            set({
                currentUser: userWithAvatar,
                users: [userWithAvatar],
                isLoading: false,
                hasLoadedCurrentUser: true,
            });

            return userWithAvatar;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load profile";
            console.error("Failed to load user profile:", error);
            set({
                isLoading: false,
                error: errorMessage,
                hasLoadedCurrentUser: true,
            });
        }
    },

    getAllUsers: async (limit = 50) => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.getAllUsers(limit);
            const users = response.data.data.users;

            console.log("UserStore - Loaded all users:", users.length);

            // Filter out the current user from the list
            const currentUserId = get().currentUser?.id;
            const otherUsers = users.filter(
                (user) => user.id !== currentUserId
            );

            set({
                users: otherUsers, // Store only other users, not current user
                isLoading: false,
            });

            return otherUsers;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load users";
            console.error("Failed to load users:", error);
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    searchUsers: async (query, limit = 10) => {
        const trimmedQuery = query?.trim();
        if (!trimmedQuery || trimmedQuery.length < 2) {
            set({ searchedUsers: [] });
            return [];
        }

        set({ isLoading: true, error: null });
        try {
            const response = await userService.searchUsers(trimmedQuery, limit);
            const users = response.data.data.users;

            set({
                searchedUsers: users,
                isLoading: false,
            });

            return users;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to search users";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.updateProfile(profileData);
            const updatedUser =
                response.data?.data?.user ||
                response.data?.data ||
                response.data?.user ||
                response.data;

            if (!updatedUser || !updatedUser.id) {
                throw new Error("Invalid user data in response");
            }

            console.log("✅ Profile updated - New user data:", updatedUser);

            // Sync updated user data to authStore
            const authStore = useAuthStore.getState();
            authStore.syncUserData(updatedUser);

            set({
                currentUser: updatedUser,
                isLoading: false,
                error: null,
            });

            return updatedUser;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to update profile";
            set({
                isLoading: false,
                error: errorMessage,
            });
            throw error;
        }
    },

    uploadAvatar: async (file) => {
        set({ isLoading: true, error: null });
        try {
            const formData = new FormData();
            formData.append("avatar_file", file);

            const response = await userService.updateProfile(formData);
            const updatedUser =
                response.data?.data?.user ||
                response.data?.data ||
                response.data?.user ||
                response.data;

            if (!updatedUser || !updatedUser.id) {
                throw new Error("Invalid user data in response");
            }

            // Sync updated user data to authStore
            const authStore = useAuthStore.getState();
            authStore.syncUserData(updatedUser);

            set({
                currentUser: updatedUser,
                isLoading: false,
                error: null,
            });

            return updatedUser;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to upload avatar";
            set({
                isLoading: false,
                error: errorMessage,
            });
            throw error;
        }
    },

    clearSearch: () => set({ searchedUsers: [] }),
    clearError: () => set({ error: null }),
    getUserById: (userId) => {
        const state = get();
        return state.users.find((user) => user && user.id === userId);
    },
    isUserOnline: (userId) => get().onlineUsers.has(userId),
    setUserOnline: (userId) => {
        set((state) => {
            const newOnlineUsers = new Set(state.onlineUsers);
            newOnlineUsers.add(userId);
            return { onlineUsers: newOnlineUsers };
        });
    },
    setUserOffline: (userId) => {
        set((state) => {
            const newOnlineUsers = new Set(state.onlineUsers);
            newOnlineUsers.delete(userId);
            return { onlineUsers: newOnlineUsers };
        });
    },
    resetStore: () =>
        set({
            currentUser: null,
            users: [],
            searchedUsers: [],
            onlineUsers: new Set(),
            isLoading: false,
            error: null,
            hasLoadedCurrentUser: false,
        }),
}));

```

## File: utils/avatarUtils.js
```js
export const getAvatarUrl = (url) => {
    if (!url) {
        console.log("❌ getAvatarUrl: No URL provided");
        return null;
    }

    console.log("🖼️ getAvatarUrl - Input:", url);

    // If it's already a full URL, return as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
        console.log("✅ getAvatarUrl: Already full URL");
        return url;
    }

    // Cloudinary URL without protocol
    if (
        url.includes("cloudinary.com") ||
        url.startsWith("res.cloudinary.com")
    ) {
        let processedUrl = url;
        if (url.startsWith("//")) {
            processedUrl = `https:${url}`;
        } else if (url.startsWith("res.cloudinary.com")) {
            processedUrl = `https://${url}`;
        }
        console.log("☁️ getAvatarUrl: Cloudinary URL processed:", processedUrl);
        return processedUrl;
    }

    // If it starts with /, it's a relative path to the backend
    if (url.startsWith("/")) {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
        const fullUrl = `${baseUrl}${url}`;
        console.log("🔗 getAvatarUrl: Relative path processed:", fullUrl);
        return fullUrl;
    }

    // If it's just a filename, assume it's in uploads directory
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
    const fullUrl = `${baseUrl}/uploads/${url}`;
    console.log("📁 getAvatarUrl: Filename processed:", fullUrl);
    return fullUrl;
};

export const validateAvatarFile = (file) => {
    if (!file) return "No file selected";

    const allowedTypes = ["image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
        return "Only JPEG (.jpeg, .jpg) images are allowed";
    }

    if (file.size > 5 * 1024 * 1024) {
        return "Image must be smaller than 5MB";
    }

    return null;
};

```

## File: utils/chatUtils.js
```js
import { formatMessageTime } from "./dateUtils";

export const sortConversations = (conversations) => {
    if (!Array.isArray(conversations)) return [];

    return [...conversations].sort((a, b) => {
        if (a.has_unread_messages && !b.has_unread_messages) return -1;
        if (!a.has_unread_messages && b.has_unread_messages) return 1;

        const aTime = a.last_message?.created_at || a.created_at;
        const bTime = b.last_message?.created_at || b.created_at;

        if (!aTime || !bTime) return 0;

        return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
};

export const getOtherUser = (conversation, currentUserId) => {
    if (!conversation || !currentUserId) return null;

    const { user1, user2 } = conversation;

    if (!user1 || !user2) return null;

    return user1.id === currentUserId ? user2 : user1;
};

export const groupMessagesByDate = (messages) => {
    if (!Array.isArray(messages)) return {};

    const groups = {};

    messages.forEach((message) => {
        if (!message?.created_at) return;

        try {
            const date = new Date(message.created_at).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        } catch (error) {
            console.error("Error grouping message by date:", error);
        }
    });

    return groups;
};

export const isUserOnline = (user, onlineUsers) => {
    if (!user) return false;

    return user.is_online === true || (onlineUsers && onlineUsers.has(user.id));
};

export const getConversationPreview = (conversation, currentUserId) => {
    if (!conversation) return "No messages yet";

    const { last_message } = conversation;

    if (!last_message) return "No messages yet";

    const isCurrentUser = last_message.sender_id === currentUserId;
    const prefix = isCurrentUser ? "You: " : "";

    if (last_message.message_type === "IMAGE") {
        return `${prefix}Image`;
    }

    if (last_message.message_text === "This message was deleted") {
        return `${prefix}Message deleted`;
    }

    const preview = last_message.message_text || "Message";
    return `${prefix}${
        preview.length > 30 ? preview.substring(0, 30) + "..." : preview
    }`;
};

export const isOwnMessage = (message, currentUserId) => {
    return message?.sender_id === currentUserId;
};

export const formatMessageTimestamp = (timestamp) => {
    if (!timestamp) return "";

    try {
        return formatMessageTime(timestamp);
    } catch (error) {
        console.error("Error formatting timestamp:", error);
        return "";
    }
};

```

## File: utils/conversationDisplayUtils.jsx
```jsx
export const formatConversationTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    } else {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    }
};

export const getUnreadBadge = (conversation) => {
    console.log("🔄 getUnreadBadge called:", {
        conversationId: conversation.id,
        unreadCount: conversation.unread_count,
        hasUnreadMessages: conversation.has_unread_messages,
        shouldShowBadge: conversation.unread_count > 0,
    });

    if (!conversation.unread_count || conversation.unread_count === 0) {
        console.log("❌ Not showing badge - no unread messages");
        return null;
    }

    const count = conversation.unread_count;
    const displayCount = count > 99 ? "99+" : count;

    console.log("✅ Showing badge with count:", displayCount);

    return (
        <div className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-5 h-5 flex items-center justify-center">
            {displayCount}
        </div>
    );
};

```

## File: utils/conversationHelpers.js
```js
// Helper function to calculate unread messages
export const calculateUnreadCount = (conversation, currentUserId) => {
    console.log("🔄 Calculating unread count:", {
        conversationId: conversation.id,
        currentUserId,
        hasMessages: !!conversation.messages,
        messagesCount: conversation.messages?.length,
    });

    if (!conversation.messages || !currentUserId) {
        console.log("❌ No messages or current user ID, returning 0");
        return 0;
    }

    const unreadMessages = conversation.messages.filter((message) => {
        const isFromOtherUser = message.sender_id !== currentUserId;
        const isRead = message.read_receipts?.some(
            (receipt) => receipt.reader_id === currentUserId
        );
        const isUnread = isFromOtherUser && !isRead;

        console.log("📨 Message analysis:", {
            messageId: message.id,
            sender: message.sender_id,
            isFromOtherUser,
            isRead,
            isUnread,
        });

        return isUnread;
    });

    console.log("✅ Unread messages count:", unreadMessages.length);
    return unreadMessages.length;
};

// Helper function to get the proper last message
export const getProperLastMessage = (conversation) => {
    console.log(
        "🔄 Getting proper last message for conversation:",
        conversation.id
    );

    if (conversation.last_message) {
        console.log(
            "✅ Using conversation.last_message:",
            conversation.last_message
        );
        return conversation.last_message;
    }

    if (conversation.messages && conversation.messages.length > 0) {
        const sortedMessages = [...conversation.messages].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        const lastMessage = sortedMessages[0];
        console.log(
            "✅ Using latest message from messages array:",
            lastMessage
        );
        return lastMessage;
    }

    console.log("❌ No last message found");
    return null;
};

// Process conversations for display
export const processConversations = (conversations, currentUserId) => {
    console.log("🔄 Processing conversations:", {
        inputCount: conversations.length,
        currentUserId,
    });

    if (!Array.isArray(conversations)) {
        console.log("❌ conversations is not an array");
        return [];
    }

    const processed = conversations.map((conv) => {
        // Use backend-provided unread counts if available
        const backendUnreadCount = conv.unread_count || 0;
        const backendHasUnread = conv.has_unread_messages || false;

        // Only calculate locally if backend doesn't provide the data
        const unreadCount = backendUnreadCount >= 0 ? backendUnreadCount : calculateUnreadCount(conv, currentUserId);
        const hasUnreadMessages = backendHasUnread !== undefined ? backendHasUnread : unreadCount > 0;
        const lastMessage = getProperLastMessage(conv);

        const result = {
            ...conv,
            unread_count: unreadCount,
            has_unread_messages: hasUnreadMessages,
            last_message: lastMessage,
        };

        console.log("📊 Processed conversation:", {
            id: result.id,
            otherUser: result.user1?.id === currentUserId ? result.user2?.full_name : result.user1?.full_name,
            backendUnreadCount,
            backendHasUnread,
            finalUnreadCount: result.unread_count,
            finalHasUnread: result.has_unread_messages,
        });

        return result;
    });

    return processed;
};

```

## File: utils/dateUtils.js
```js
export const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";

    try {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return "";

        const now = new Date();
        const diffInMs = now - date;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        const diffInDays = diffInHours / 24;

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            if (diffInMinutes < 1) return "Just now";
            return `${diffInMinutes}m ago`;
        }

        if (diffInHours < 24) {
            return date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });
        } else if (diffInDays < 2) {
            return "Yesterday";
        } else if (diffInDays < 7) {
            return date.toLocaleDateString("en-US", {
                weekday: "short",
            });
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }
    } catch (error) {
        console.error("Error formatting message time:", error);
        return "";
    }
};

export const formatLastSeen = (timestamp) => {
    if (!timestamp) return "Never";

    try {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return "Never";

        const now = new Date();
        const diffInMinutes = (now - date) / (1000 * 60);

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
        if (diffInMinutes < 1440)
            return `${Math.floor(diffInMinutes / 60)}h ago`;

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    } catch (error) {
        console.error("Error formatting last seen:", error);
        return "Never";
    }
};

export const isToday = (timestamp) => {
    if (!timestamp) return false;

    try {
        const date = new Date(timestamp);
        const today = new Date();

        return date.toDateString() === today.toDateString();
    } catch (error) {
        console.error("Error checking if date is today:", error);
        return false;
    }
};

export const isYesterday = (timestamp) => {
    if (!timestamp) return false;

    try {
        const date = new Date(timestamp);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        return date.toDateString() === yesterday.toDateString();
    } catch (error) {
        console.error("Error checking if date is yesterday:", error);
        return false;
    }
};

export const formatDateHeader = (timestamp) => {
    if (!timestamp) return "";

    try {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return "";

        if (isToday(date)) return "Today";
        if (isYesterday(date)) return "Yesterday";

        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch (error) {
        console.error("Error formatting date header:", error);
        return "";
    }
};

```

## File: utils/errorUtils.js
```js
export const getErrorMessage = (error) => {
    if (!error) return "An unexpected error occurred";

    if (typeof error === "string") return error;

    // Axios error
    if (error.response?.data?.msg) {
        return error.response.data.msg;
    }

    // Error object with message
    if (error.message) {
        return error.message;
    }

    // Network error
    if (error.code === "NETWORK_ERROR" || error.message?.includes("Network")) {
        return "Network error. Please check your connection.";
    }

    // Fallback
    return "An unexpected error occurred";
};

export const isNetworkError = (error) => {
    return (
        !error?.response &&
        (error?.code === "NETWORK_ERROR" || error?.message?.includes("Network"))
    );
};

export const isAuthError = (error) => {
    return error?.response?.status === 401;
};

export const isServerError = (error) => {
    return error?.response?.status >= 500;
};

export const handleApiError = (error, fallback = "Something went wrong") => {
    console.error("API Error:", error);

    const message = getErrorMessage(error);

    if (isNetworkError(error)) {
        return "Network error. Please check your connection.";
    }

    if (isAuthError(error)) {
        return "Session expired. Please login again.";
    }

    return message || fallback;
};

export const logError = (error, context = "") => {
    console.error(`Error${context ? ` in ${context}` : ""}:`, {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
    });
};

```

## File: utils/fileUtils.js
```js
export const validateFile = (file, options = {}) => {
    const {
        maxSize = 5 * 1024 * 1024, // 5MB
        allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    } = options;

    if (!file) {
        throw new Error("No file provided");
    }

    if (file.size > maxSize) {
        throw new Error(
            `File size must be less than ${maxSize / 1024 / 1024}MB`
        );
    }

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only image files (JPEG, PNG, WebP, GIF) are allowed");
    }

    return true;
};

export const getFilePreview = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
};

export const compressImage = (file, quality = 0.8, maxWidth = 1024) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            // Calculate new dimensions while maintaining aspect ratio
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Canvas to Blob conversion failed"));
                        return;
                    }
                    resolve(
                        new File([blob], file.name, {
                            type: "image/jpeg",
                            lastModified: Date.now(),
                        })
                    );
                },
                "image/jpeg",
                quality
            );
        };

        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
    });
};

export const getFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

```

## File: utils/index.js
```js
export * from "./dateUtils";
export * from "./fileUtils";
export * from "./stringUtils";
export * from "./storageUtils";
export * from "./validationUtils";
export * from "./chatUtils";
export * from "./errorUtils";
export * from "./uiUtils";

```

## File: utils/storageUtils.js
```js
export const storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing from localStorage:", error);
        }
    },

    clear: () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    },
};

export const sessionStorage = {
    get: (key, defaultValue = null) => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set: (key, value) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to sessionStorage:", error);
        }
    },
};

// Token-specific helpers
export const tokenStorage = {
    getAccessToken: () => storage.get("accessToken"),
    setAccessToken: (token) => storage.set("accessToken", token),
    getRefreshToken: () => storage.get("refreshToken"),
    setRefreshToken: (token) => storage.set("refreshToken", token),
    clearTokens: () => {
        storage.remove("accessToken");
        storage.remove("refreshToken");
    },
};

```

## File: utils/stringUtils.js
```js
// utils/stringUtils.js
export const truncateText = (text, maxLength = 50) => {
    if (!text || typeof text !== "string") return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

export const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";

    return name
        .trim()
        .split(/\s+/)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
};

export const capitalizeFirst = (text) => {
    if (!text || typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const generateRandomId = (prefix = "") => {
    return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

```

## File: utils/uiUtils.js
```js
export const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
};

```

## File: utils/validationUtils.js
```js
export const isValidEmail = (email) => {
    if (!email || typeof email !== "string") return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const isValidPassword = (password) => {
    if (!password || typeof password !== "string") return false;

    // At least 6 characters, with at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
};

export const isValidName = (name) => {
    if (!name || typeof name !== "string") return false;

    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 100;
};

export const validateMessage = (text) => {
    if (!text && text !== "") {
        return "Message is required";
    }

    const trimmed = text.toString().trim();
    if (!trimmed) return "Message cannot be empty";
    if (trimmed.length > 1000) return "Message too long (max 1000 characters)";

    return null;
};

export const validateConversationId = (id) => {
    if (!id || typeof id !== "string") return false;

    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
};

export const validateFileUpload = (file, options = {}) => {
    const {
        maxSize = 5 * 1024 * 1024,
        allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    } = options;

    if (!file) {
        return "No file selected";
    }

    if (file.size > maxSize) {
        return `File must be smaller than ${maxSize / 1024 / 1024}MB`;
    }

    if (!allowedTypes.includes(file.type)) {
        return "Only JPEG, PNG, WebP, and GIF images are allowed";
    }

    return null;
};

// Add the missing sanitizeMessage function
export const sanitizeMessage = (text) => {
    if (!text || typeof text !== "string") return "";

    return text
        .trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
};

// Add unsanitizeMessage if needed
export const unsanitizeMessage = (text) => {
    if (!text || typeof text !== "string") return "";

    return text
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/<br>/g, "\n");
};

```

