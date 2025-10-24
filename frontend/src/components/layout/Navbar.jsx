import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {useAuthStore} from '@/stores/authStore';
import {Menu, LogOut} from 'lucide-react';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {getAvatarUrl} from '@/utils/avatarUtils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const Navbar = ({onMenuClick}) => {
    const {logout, user} = useAuthStore();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutDialog(true);
    };

    const handleConfirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            // Dialog will close automatically due to navigation
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoggingOut(false);
            setShowLogoutDialog(false);
        }
    };

    const handleCancelLogout = () => {
        setShowLogoutDialog(false);
    };

    return (
        <>
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
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLogoutClick}
                            disabled={isLoggingOut}
                            title="Logout"
                        >
                            {isLoggingOut ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : (
                                <LogOut className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Logout Confirmation Dialog */}
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <LogOut className="h-5 w-5" />
                            Confirm Logout
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to logout? You'll need to sign in again to access your chats.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={handleCancelLogout}
                            disabled={isLoggingOut}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Logging out...
                                </>
                            ) : (
                                <>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Navbar;