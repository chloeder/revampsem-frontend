import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default function Provider({children}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               {children}
            </BrowserRouter>
        </QueryClientProvider>
    );
}