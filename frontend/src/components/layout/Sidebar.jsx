import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import {useUserStore} from '@/stores/userStore';
import {Button} from '@/components/ui/button';
import {X, MessageSquare, Users, Search, Loader2} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

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
    const [actionLoading, setActionLoading] = useState(false);

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

    // Load users when view changes to users
    useEffect(() => {
        if (activeView === 'users' && users.length === 0) {
            getAllUsers();
        }
    }, [activeView, users.length, getAllUsers]);

    const handleViewChange = (view) => {
        setActiveView(view);
        setSearchQuery('');
        clearSearch();
    };

    const handleProfileClick = () => {
        navigate('/profile');
        onClose();
    };

    const handleUserClick = async (selectedUser) => {
        if (selectedUser.id === user?.id) return;

        setActionLoading(true);
        try {
            const conversation = await getOrCreateConversation(selectedUser.id);
            setCurrentConversation(conversation.id);
            setActiveView('conversations');
            setSearchQuery('');
            clearSearch();
            onClose();
        } catch (error) {
            console.error('Failed to create conversation:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleConversationClick = (conversation) => {
        setCurrentConversation(conversation.id);
        onClose();
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

    const getOtherUser = (conversation) => {
        if (!conversation.user1 || !conversation.user2) return null;
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

    const displayUsers = searchQuery ? searchedUsers : users;

    const renderContent = () => {
        if (activeView === 'conversations') {
            if (conversationsLoading) {
                return (
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                );
            }

            return (
                <div className="divide-y divide-border">
                    {conversationsList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground p-4">
                            <MessageSquare className="h-8 w-8 mb-2 opacity-50" />
                            <p className="text-sm text-center">No conversations yet</p>
                            <p className="text-xs text-center mt-1">Start a chat with another user</p>
                        </div>
                    ) : (
                        conversationsList.map((conversation) => {
                            const otherUser = getOtherUser(conversation);
                            if (!otherUser) return null;

                            return (
                                <div
                                    key={conversation.id}
                                    className={`p-4 cursor-pointer transition-colors ${conversation.id === currentConversationId
                                        ? 'bg-accent'
                                        : 'hover:bg-accent/50'
                                        }`}
                                    onClick={() => handleConversationClick(conversation)}
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
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-medium text-sm truncate">
                                                    {otherUser.full_name}
                                                </p>
                                            </div>

                                            <p className="text-sm text-muted-foreground truncate">
                                                {getLastMessagePreview(conversation)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
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
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary">
                                                {userItem.full_name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        {userItem.is_online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">
                                            {userItem.full_name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {userItem.email}
                                        </p>
                                    </div>
                                    {actionLoading && (
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

                    <div className="p-4 border-t border-border">
                        <Button
                            variant="ghost"
                            className="w-full justify-start p-3 h-auto"
                            onClick={handleProfileClick}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-xs font-medium text-primary-foreground">
                                        {user?.full_name?.charAt(0) || 'U'}
                                    </span>
                                </div>
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