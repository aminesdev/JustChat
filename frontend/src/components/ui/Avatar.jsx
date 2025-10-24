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
    const [imageLoading, setImageLoading] = useState(true);

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
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        console.log('Avatar image loaded successfully:', avatarUrl);
        setImageLoading(false);
        setImageError(false);
    };

    return (
        <div className={cn('relative', className)}>
            {avatarUrl && !imageError ? (
                <>
                    <img
                        src={avatarUrl}
                        alt={user?.full_name || 'User avatar'}
                        className={cn(
                            'rounded-full object-cover border border-border transition-opacity',
                            sizeClasses[size],
                            imageLoading ? 'opacity-0' : 'opacity-100'
                        )}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                    />

                    {/* Loading skeleton */}
                    {imageLoading && (
                        <div
                            className={cn(
                                'absolute inset-0 bg-muted rounded-full animate-pulse',
                                sizeClasses[size]
                            )}
                        />
                    )}

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