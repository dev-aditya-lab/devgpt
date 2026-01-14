/**
 * Pagination Component
 */

export function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-2">
            <button
                disabled={page === 1}
                onClick={() => onPageChange(Math.max(1, page - 1))}
                className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
            >
                Previous
            </button>
            <div className="px-4 py-2 text-gray-400 text-sm">
                Page {page} of {totalPages}
            </div>
            <button
                disabled={page === totalPages}
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
            >
                Next
            </button>
        </div>
    );
}
