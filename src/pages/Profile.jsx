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
  const [deleteStep, setDeleteStep] = useState(1); // 1 = explainer + type-to-confirm, 2 = final confirmation
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteError, setDeleteError] = useState(null);

  const DELETE_PHRASE = 'DELETE';
  const canProceedToFinal = deleteConfirmText.trim().toUpperCase() === DELETE_PHRASE;

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
    setDeleteError(null);
    try {
      await base44.auth.deleteUser();
      // Clear any locally-stored session/preferences before logout
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) { /* ignore storage errors */ }
      setIsDeleteDialogOpen(false);
      // Hard redirect to homepage after account is deleted + auth cleared
      logout('/');
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Delete account error:', error);
      setIsDeleting(false);
      setDeleteError(
        'We could not complete your request right now. Please try again, or contact support if the issue persists.'
      );
    }
  };

  const closeDeleteDialog = (open) => {
    if (isDeleting) return; // don't allow closing mid-request
    setIsDeleteDialogOpen(open);
    if (!open) {
      // reset state when dismissed
      setDeleteStep(1);
      setDeleteConfirmText('');
      setDeleteError(null);
    }
  };

  const resetToDeleteStep1 = () => {
    setDeleteStep(1);
    setDeleteConfirmText('');
    setDeleteError(null);
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
              to="/loyalty"
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
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-primary text-primary font-mono text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
            style={{ borderRadius: '2px' }}
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Sign Out
          </button>

          {/* Delete Account Button */}
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-destructive text-destructive font-mono text-sm tracking-widest uppercase hover:bg-destructive hover:text-destructive-foreground transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
            style={{ borderRadius: '2px' }}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            Delete Account
          </button>
        </div>

        {/* Delete Account Confirmation Dialog — two-step, App Store / Google Play compliant */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
          <AlertDialogContent style={{ background: '#FFFFFF', border: '1px solid #E4D8C9', maxWidth: '460px' }}>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-mono tracking-widest uppercase text-sm" style={{ color: '#2D2824' }}>
                Permanently Delete Account
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3 mt-2">
                  {deleteStep === 1 ? (
                    <>
                      <p className="font-heading text-sm leading-relaxed" style={{ color: '#5F574F' }}>
                        This action is <strong style={{ color: '#2D2824' }}>permanent and cannot be undone.</strong> In accordance with app store data-privacy requirements, deleting your account will:
                      </p>
                      <ul className="space-y-1.5 pl-1">
                        {[
                          'Permanently erase your account record and login credentials',
                          'Delete all loyalty points and Torchbearer rewards history',
                          'Remove your saved preferences and order history',
                          'Sign you out across all devices immediately',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 font-heading text-xs" style={{ color: '#5F574F' }}>
                            <span className="flex-shrink-0 w-1 h-1 rounded-full" style={{ background: '#B7653E', marginTop: '6px' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-1">
                        <p className="font-heading text-xs mb-1.5" style={{ color: '#5F574F' }}>
                          To continue, type <strong style={{ color: '#2D2824' }}>"{DELETE_PHRASE}"</strong> below to confirm.
                        </p>
                        <input
                          type="text"
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                          placeholder={DELETE_PHRASE}
                          className="w-full px-3 py-2 font-mono text-sm uppercase tracking-widest"
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E4D8C9',
                            color: '#2D2824',
                            borderRadius: '4px',
                            outline: 'none',
                          }}
                          aria-label="Type DELETE to confirm"
                          autoComplete="off"
                        />
                      </div>
                      <p className="font-mono text-xs tracking-wide" style={{ color: '#8A8076' }}>
                        If you just want a break, you can simply sign out instead. Active Shopify subscriptions may need to be cancelled in your Shopify account.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-heading text-sm leading-relaxed" style={{ color: '#5F574F' }}>
                        You typed <strong style={{ color: '#2D2824' }}>"{DELETE_PHRASE}"</strong>. This is your final chance to cancel.
                      </p>
                      <p className="font-heading text-sm leading-relaxed" style={{ color: '#5F574F' }}>
                        If you proceed, your account and all associated personal data will be <strong style={{ color: '#2D2824' }}>permanently deleted</strong> — we cannot recover it afterward.
                      </p>
                      {deleteError && (
                        <p className="font-mono text-xs" style={{ color: 'hsl(var(--destructive))' }}>
                          {deleteError}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 mt-4">
              {deleteStep === 2 ? (
                <button
                  type="button"
                  onClick={resetToDeleteStep1}
                  disabled={isDeleting}
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ background: 'transparent', border: '1px solid #E4D8C9', color: '#5F574F', minHeight: '44px', borderRadius: '4px' }}
                >
                  Back
                </button>
              ) : (
                <AlertDialogCancel
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ background: 'transparent', border: '1px solid #E4D8C9', color: '#5F574F', minHeight: '44px' }}
                  disabled={isDeleting}
                >
                  Keep My Account
                </AlertDialogCancel>
              )}
              {deleteStep === 1 ? (
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    if (canProceedToFinal) setDeleteStep(2);
                  }}
                  disabled={!canProceedToFinal}
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{
                    background: canProceedToFinal ? 'hsl(var(--destructive))' : '#F0EAE0',
                    color: canProceedToFinal ? '#fff' : '#9C948A',
                    minHeight: '44px',
                    cursor: canProceedToFinal ? 'pointer' : 'not-allowed',
                  }}
                >
                  Continue
                </AlertDialogAction>
              ) : (
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ background: 'hsl(var(--destructive))', color: '#fff', minHeight: '44px', opacity: isDeleting ? 0.6 : 1 }}
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete Permanently'}
                </AlertDialogAction>
              )}
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