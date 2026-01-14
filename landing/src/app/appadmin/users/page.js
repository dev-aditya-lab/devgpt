'use client';

import Link from 'next/link';
import { HiSearch, HiTrash, HiShieldCheck, HiBan } from 'react-icons/hi';
import { adminApi } from '@/lib/api';
import { usePaginatedApi } from '@/hooks';
import {
    LoadingOverlay,
    Pagination,
    RoleBadge,
    StatusBadge
} from '@/components/admin';

export default function UsersPage() {
    const {
        data: users,
        pagination,
        loading,
        error,
        page,
        setPage,
        search,
        setSearch,
        refetch
    } = usePaginatedApi((p, s) => adminApi.getUsers(p, s));

    const handleDelete = async (userId, userName) => {
        if (!confirm(`Permanently delete user "${userName}"? This cannot be undone.`)) return;
        try {
            await adminApi.deleteUser(userId);
            refetch();
        } catch (err) {
            alert(err.message || 'Failed to delete user');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">User Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage and monitor all registered users</p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 w-full md:w-72 transition-colors"
                    />
                    <HiSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </div>

            {loading ? (
                <LoadingOverlay message="Loading users..." />
            ) : error ? (
                <div className="text-red-400 text-center py-10">Error: {error}</div>
            ) : (
                <>
                    <div className="glass-card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-gray-400 text-xs uppercase font-medium">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Joined</th>
                                        <th className="px-6 py-4">Last Login</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-sm font-bold text-white border border-white/10">
                                                        {user.name?.[0] || '?'}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-medium">{user.name}</div>
                                                        <div className="text-gray-500 text-xs">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <RoleBadge role={user.role} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge isBanned={user.isBanned} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/appadmin/users/${user._id}`}
                                                        className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <HiShieldCheck className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(user._id, user.name)}
                                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <HiTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="text-center py-12 text-gray-500">
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination
                        page={page}
                        totalPages={pagination.pages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </div>
    );
}
