import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useAuth() {
    const { toast } = useToast();

    const { data: user, isLoading } = useQuery({
        queryKey: ["/api/user"],
        retry: false,
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials: any) => {
            const res = await apiRequest("POST", "/api/login", credentials);
            return await res.json();
        },
        onSuccess: (user) => {
            queryClient.setQueryData(["/api/user"], user);
            toast({ title: "Logged in successfully" });
        },
        onError: (error: any) => {
            toast({
                title: "Login failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await apiRequest("POST", "/api/logout");
        },
        onSuccess: () => {
            queryClient.setQueryData(["/api/user"], null);
            toast({ title: "Logged out successfully" });
        },
    });

    return {
        user,
        isLoading,
        loginMutation,
        logoutMutation,
    };
}
