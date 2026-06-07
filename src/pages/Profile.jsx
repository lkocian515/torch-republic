import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { LogOut, Trash2, Gift } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import SubscriptionManager from '@/components/profile/SubscriptionManager';
import LoyaltySection from '@/components/profile/LoyaltySection';

export default function Profile() {
  const { user, logout, isLoadingAuth } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    setIsDeleting(true);
    try {
      await base44.asServiceRole.entities.User.delete(user.id);
      logout(true);
    } catch (error) {
      console.error('Delete account error:', error);
      alert('Failed to delete account. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-2">
            Account Settings
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            Manage your profile and account preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border p-6 md:p-8 mb-6">
          <div className="mb-8">
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase mb-2">
              Email Address
            </p>
            <p className="text-foreground font-mono text-lg">{user?.email}</p>
          </div>

          {user?.full_name && (
            <div className="mb-8">
              <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase mb-2">
                Full Name
              </p>
              <p className="text-foreground font-mono text-lg">{user.full_name}</p>
            </div>
          )}

          {user?.role && (
            <div>
              <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase mb-2">
                Role
              </p>
              <p className="text-foreground font-mono text-lg capitalize">{user.role}</p>
            </div>
          )}
        </div>

        {/* Loyalty Points */}
        {user && <LoyaltySection user={user} />}

        {/* Loyalty Portal Link */}
        <div className="bg-card border border-border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(230,183,173,0.1)' }}>
                <Gift size={18} style={{ color: '#E6B7AD' }} />
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#E6B7AD' }}>
                  Loyalty Portal
                </p>
                <p className="text-muted-foreground font-mono text-sm">
                  View full rewards & earning history
                </p>
              </div>
            </div>
            <Link
              to="/loyalty"
              className="font-mono uppercase tracking-[0.2em] text-xs px-4 py-2 transition-all hover:opacity-90"
              style={{ background: '#E6B7AD', color: '#050505', borderRadius: '2px', fontWeight: 700 }}
            >
              Open →
            </Link>
          </div>
        </div>

        {/* Subscription */}
        <SubscriptionManager />

        {/* Actions */}
        <div className="space-y-4">
          {/* Logout Button */}
          <button
            onClick={() => logout(true)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-primary text-primary font-mono text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors select-none"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>

          {/* Delete Account Button */}
          {showDeleteConfirm ? (
            <div className="bg-destructive/10 border border-destructive p-4 space-y-3">
              <p className="text-foreground font-mono text-sm">
                Are you sure? This action cannot be undone and will permanently delete your account.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="flex-1 py-2 px-3 border border-border text-foreground font-mono text-xs tracking-widest uppercase hover:bg-card transition-colors select-none disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 py-2 px-3 bg-destructive text-destructive-foreground font-mono text-xs tracking-widest uppercase hover:bg-destructive/90 transition-colors select-none disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-destructive text-destructive font-mono text-sm tracking-widest uppercase hover:bg-destructive hover:text-destructive-foreground transition-colors select-none"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-12 p-4 bg-muted border border-border/50">
          <p className="text-muted-foreground font-mono text-xs leading-relaxed">
            Changes are applied immediately. If you have any questions, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}