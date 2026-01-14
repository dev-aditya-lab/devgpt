/**
 * Loading Components
 */

export function LoadingSpinner({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'w-4 h-4 border',
        md: 'w-8 h-8 border-2',
        lg: 'w-12 h-12 border-2',
    };

    return (
        <div
            className={`${sizes[size]} border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin ${className}`}
        />
    );
}

export function LoadingOverlay({ message = 'Loading...' }) {
    return (
        <div className="min-h-[200px] flex flex-col items-center justify-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-gray-400 text-sm">{message}</p>
        </div>
    );
}

export function FullPageLoader() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <LoadingSpinner size="lg" />
        </div>
    );
}
