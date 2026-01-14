/**
 * Badge Component
 * Displays role or status badges with appropriate colors
 */

const BADGE_VARIANTS = {
    // Roles
    admin: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    user: 'bg-white/5 border-white/10 text-gray-400',

    // Status
    active: 'bg-green-500/10 border-green-500/20 text-green-400',
    banned: 'bg-red-500/10 border-red-500/20 text-red-400',
    pending: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',

    // General
    default: 'bg-white/5 border-white/10 text-gray-400',
    primary: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    danger: 'bg-red-500/10 border-red-500/20 text-red-400',
    success: 'bg-green-500/10 border-green-500/20 text-green-400',
};

export function Badge({ children, variant = 'default', className = '' }) {
    const variantClass = BADGE_VARIANTS[variant] || BADGE_VARIANTS.default;

    return (
        <span className={`text-xs px-2 py-1 rounded-full border ${variantClass} ${className}`}>
            {children}
        </span>
    );
}

/**
 * RoleBadge - Convenience wrapper for user roles
 */
export function RoleBadge({ role }) {
    return <Badge variant={role}>{role}</Badge>;
}

/**
 * StatusBadge - Convenience wrapper for user status
 */
export function StatusBadge({ isBanned }) {
    return (
        <Badge variant={isBanned ? 'banned' : 'active'}>
            {isBanned ? 'Banned' : 'Active'}
        </Badge>
    );
}
