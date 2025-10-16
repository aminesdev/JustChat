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
            console.log('🔄 Profile - Setting avatar preview:', processedUrl);
            setAvatarPreview(processedUrl);
        } else {
            console.log('🔄 Profile - No avatar URL available');
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