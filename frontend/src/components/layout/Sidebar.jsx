import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import {Button} from '@/components/ui/button';
import {X, MessageSquare, Plus, User, Settings} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const Sidebar = ({isOpen, onClose}) => {
    const {conversationsList, loadConversations, setCurrentConversation} = useConversationStore();
    const {user} = useAuthStore();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
        onClose();
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <h2 className="text-lg font-semibold">Conversations</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {conversationsList.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No conversations yet</p>
                                <p className="text-sm">Start a new chat to begin messaging</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {conversationsList.map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        className="p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                                        onClick={() => {
                                            setCurrentConversation(conversation.id);
                                            onClose();
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                <MessageSquare className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">
                                                    {conversation.user1.id === user?.id
                                                        ? conversation.user2.full_name
                                                        : conversation.user1.full_name
                                                    }
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {conversation.last_message?.message_text || 'No messages yet'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User Profile Button */}
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
                                <Settings className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;