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
