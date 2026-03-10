import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';


export default function PageNotFound({}) {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="max-w-md w-full">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-7xl font-black text-muted-foreground/30 font-heading">404</h1>
                        <div className="h-px w-16 bg-primary/30 mx-auto"></div>
                    </div>
                    
                    <div className="space-y-3">
                        <h2 className="text-2xl font-heading font-bold text-foreground uppercase tracking-wider">
                            Page Not Found
                        </h2>
                        <p className="text-muted-foreground font-mono text-sm">
                            The page "{pageName}" could not be found.
                        </p>
                    </div>
                    
                    {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' && (
                        <div className="mt-8 p-4 bg-card border border-border">
                            <p className="text-sm text-muted-foreground">
                                Admin: This page hasn't been implemented yet.
                            </p>
                        </div>
                    )}
                    
                    <div className="pt-6">
                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="inline-flex items-center px-6 py-3 text-sm font-mono tracking-widest uppercase text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}