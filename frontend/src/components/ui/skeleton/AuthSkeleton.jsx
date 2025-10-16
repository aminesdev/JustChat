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