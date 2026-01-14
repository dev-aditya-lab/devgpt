'use client';

import { useState } from 'react';
import {
    HiMail,
    HiCheck,
    HiReply,
    HiArchive,
    HiExternalLink
} from 'react-icons/hi';
import { adminApi } from '@/lib/api';
import { useApi } from '@/hooks';
import { LoadingOverlay, Badge } from '@/components/admin';

const STATUS_FILTERS = [
    { value: '', label: 'All' },
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' },
    { value: 'archived', label: 'Archived' },
];

export default function ContactsPage() {
    const [statusFilter, setStatusFilter] = useState('');

    const { data, loading, error, refetch } = useApi(
        () => adminApi.getContacts(statusFilter),
        [statusFilter]
    );

    const handleStatusChange = async (contactId, newStatus) => {
        try {
            await adminApi.updateContact(contactId, newStatus);
            refetch();
        } catch (err) {
            alert(err.message || 'Failed to update status');
        }
    };

    const handleReply = (email, subject) => {
        const replySubject = `Re: ${subject}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(replySubject)}`;
    };

    if (loading) return <LoadingOverlay message="Loading contacts..." />;
    if (error) return <div className="text-red-400 text-center mt-20">Error: {error}</div>;

    const contacts = data?.contacts || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
                    <p className="text-gray-500 text-sm mt-1">Messages from the contact form</p>
                </div>
                <div className="flex gap-2">
                    {STATUS_FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setStatusFilter(filter.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === filter.value
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {contacts.map((contact) => (
                    <div key={contact._id} className="glass-card p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                                        <HiMail className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{contact.name}</h3>
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="text-cyan-400 text-sm hover:underline"
                                        >
                                            {contact.email}
                                        </a>
                                    </div>
                                    <StatusBadge status={contact.status} />
                                </div>
                                <h4 className="text-white font-medium mt-4 mb-2">{contact.subject}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{contact.message}</p>
                                <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                                    <span>{new Date(contact.createdAt).toLocaleString()}</span>
                                    {contact.ipAddress && <span>IP: {contact.ipAddress}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {contact.status === 'new' && (
                                    <button
                                        onClick={() => handleStatusChange(contact._id, 'read')}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        title="Mark as Read"
                                    >
                                        <HiCheck className="w-5 h-5" />
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        handleReply(contact.email, contact.subject);
                                        handleStatusChange(contact._id, 'replied');
                                    }}
                                    className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                                    title="Reply"
                                >
                                    <HiReply className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleStatusChange(contact._id, 'archived')}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    title="Archive"
                                >
                                    <HiArchive className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {contacts.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <HiMail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No contact submissions found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const variants = {
        new: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
        read: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
        replied: 'bg-green-500/10 border-green-500/20 text-green-400',
        archived: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
    };

    return (
        <span className={`text-xs px-2 py-1 rounded-full border ${variants[status] || variants.new}`}>
            {status}
        </span>
    );
}
