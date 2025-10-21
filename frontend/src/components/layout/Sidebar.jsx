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

    // Add this function to handle conversation click from ConversationList
    const handleConversationClick = (conversation) => {
        console.log("🔄 Sidebar - Conversation clicked:", conversation.id);

        // Set the current conversation
        setCurrentConversation(conversation.id);

        // Navigate to chat page
        navigate('/chat');

        // Close sidebar on mobile
        onClose();
    };

    const getOtherUser = (conversation) => {
        if (!conversation.user1 || !conversation.user2) return null;
        return conversation.user1.id === user?.id ? conversation.user2 : conversation.user1;
    };

    const getLastMessagePreview = (conversation) => {
        if (!conversation.last_message) return 'No messages yet';

        const isCurrentUser = conversation.last_message.sender_id === user?.id;
        const prefix = isCurrentUser ? 'You: ' : '';

        if (conversation.last_message.message_type === 'IMAGE') {
            return `${prefix}Image`;
        }

        const text = conversation.last_message.message_text || 'Message';
        return `${prefix}${text.length > 30 ? text.substring(0, 30) + '...' : text}`;
    };

    const displayUsers = searchQuery ? searchedUsers : users;

    const renderContent = () => {
        if (activeView === 'conversations') {
            // Use the ConversationList component for conversations view
            return (
                <ConversationList
                    // Pass the click handler to ConversationList
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
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <h2 className="text-lg font-semibold">
                            {activeView === 'conversations' ? 'Messages' : 'All Users'}
                        </h2>
                        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex border-b border-border">
                        <Button
                            variant={activeView === 'conversations' ? 'secondary' : 'ghost'}
                            className="flex-1 rounded-none"
                            onClick={() => handleViewChange('conversations')}
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Messages
                        </Button>
                        <Button
                            variant={activeView === 'users' ? 'secondary' : 'ghost'}
                            className="flex-1 rounded-none"
                            onClick={() => handleViewChange('users')}
                        >
                            <Users className="h-4 w-4 mr-2" />
                            Users
                        </Button>
                    </div>

                    <div className="p-4 border-b border-border">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                placeholder={activeView === 'conversations' ? "Search conversations..." : "Search users..."}
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {renderContent()}
                    </div>

                    {/* Profile Button with Avatar */}
                    <div className="p-4 border-t border-border">
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