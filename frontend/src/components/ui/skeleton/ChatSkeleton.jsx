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