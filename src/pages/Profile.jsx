import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { LogOut, Trash2, Gift } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import useNoIndex from '@/hooks/useNoIndex';
import SubscriptionManager from '@/components/profile/SubscriptionManager';
import LoyaltySection from '@/components/profile/LoyaltySection';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Profile() {
  // noindex - customer account page
  useSEO({
    title: 'Account Settings',
    description: 'Manage your Torch Republic account settings, subscription, and loyalty points.',
    url: '/profile',
    noindex: true,
  });

  const { user, logout, isLoadingAuth } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
      // Use base44.auth.deleteUser if available (App Store / Play Store compliance)
      // Falls back to entity delete for platforms where deleteUser isn't yet exposed
      if (typeof base44.auth.deleteUser === 'function') {
        await base44.auth.deleteUser();
      } else {
        await base44.asServiceRole.entities.User.delete(user.id);
      }
      setIsDeleteDialogOpen(false);
      logout('/');
    } catch (error) {
      console.error('Delete account error:', error);
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

        {/* Customer Portal Link */}
        <div className="bg-card border border-border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(230,183,173,0.1)' }}>
                <Gift size={18} style={{ color: '#E6B7AD' }} />
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#E6B7AD' }}>
                  Customer Portal
                </p>
                <p className="text-muted-foreground font-mono text-sm">
                  Manage subscription {'&'} loyalty points
                </p>
              </div>
            </div>
            <Link
              to="/portal"
              className="font-mono uppercase tracking-[0.2em] text-xs px-4 py-2 transition-all hover:opacity-90"
              style={{ background: '#E6B7AD', color: '#050505', borderRadius: '2px', fontWeight: 700 }}
            >
              Open →
            </Link>
          </div>
        </div>

        {/* Torchbearers Rewards Link */}
        <div className="bg-card border border-border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(230,183,173,0.1)' }}>
                <Gift size={18} style={{ color: '#E6B7AD' }} />
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#E6B7AD' }}>
                  Torchbearers Rewards
                </p>
                <p className="text-muted-foreground font-mono text-sm">
                  Learn about loyalty tiers {'&'} benefits
                </p>
              </div>
            </div>
            <Link
              to="/torchbearers-rewards"
              className="font-mono uppercase tracking-[0.2em] text-xs px-4 py-2 transition-all hover:opacity-90"
              style={{ background: '#E6B7AD', color: '#050505', borderRadius: '2px', fontWeight: 700 }}
            >
              Learn More →
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
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-destructive text-destructive font-mono text-sm tracking-widest uppercase hover:bg-destructive hover:text-destructive-foreground transition-colors select-none"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>

        {/* Delete Account Confirmation Dialog — App Store / Google Play required */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent style={{ background: '#111', border: '1px solid rgba(230,183,173,0.2)', maxWidth: '420px' }}>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-mono tracking-widest uppercase text-sm" style={{ color: '#F5EFE6' }}>
                Permanently Delete Account
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3 mt-2">
                  <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.6)' }}>
                    This action is <strong style={{ color: '#F5EFE6' }}>permanent and cannot be undone.</strong> Deleting your account will:
                  </p>
                  <ul className="space-y-1.5 pl-1">
                    {[
                      'Permanently erase your account and login credentials',
                      'Delete all loyalty points and Torchbearer rewards',
                      'Remove your order history and saved preferences',
                      'Cancel any active subscriptions (you may need to cancel directly in Shopify)',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-heading text-xs" style={{ color: 'rgba(240,235,225,0.55)' }}>
                        <span className="mt-0.5 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: '#E6B7AD', marginTop: '6px' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-xs tracking-wide" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    If you just want a break, you can simply sign out instead.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 mt-4">
              <AlertDialogCancel
                className="font-mono text-xs tracking-widest uppercase"
                style={{ background: 'transparent', border: '1px solid rgba(230,183,173,0.3)', color: '#E6B7AD', minHeight: '44px' }}
              >
                Keep My Account
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="font-mono text-xs tracking-widest uppercase"
                style={{ background: 'hsl(var(--destructive))', color: '#fff', minHeight: '44px', opacity: isDeleting ? 0.6 : 1 }}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Permanently'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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