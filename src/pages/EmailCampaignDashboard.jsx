import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Send, Users, Mail, TrendingUp, DollarSign, ShoppingCart, Clock, CheckCircle, AlertCircle, Activity, Download, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

function StatCard({ title, value, icon: IconComponent, color, subtext }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6"
            style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '8px' }}
        >
            <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    {title}
                </p>
                <IconComponent className="w-5 h-5" style={{ color }} />
            </div>
            <p className="font-serif font-bold text-3xl mb-2" style={{ color: '#F5EFE6' }}>
                {value}
            </p>
            {subtext && (
                <p className="font-heading text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {subtext}
                </p>
            )}
        </motion.div>
    );
}

function SegmentCard({ segment, count, onSend }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-5"
            style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '8px' }}
        >
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-lg" style={{ color: '#F5EFE6' }}>
                    {segment}
                </h3>
                <div className="flex items-center gap-2 px-3 py-1" style={{ background: 'rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                    <Users className="w-3.5 h-3.5" style={{ color: '#E6B7AD' }} />
                    <span className="font-mono text-sm font-bold" style={{ color: '#E6B7AD' }}>{count}</span>
                </div>
            </div>
            <p className="font-heading text-xs mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {segment === 'Previous Purchasers' && 'Customers who have placed orders'}
                {segment === 'Email Subscribers' && 'Subscribed but haven\'t purchased'}
                {segment === 'Abandoned Cart' && 'Added to cart but didn\'t complete'}
            </p>
            <button
                onClick={() => onSend(segment)}
                className="w-full flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 transition-all hover:opacity-90"
                style={{ background: '#E6B7AD', color: '#080808', borderRadius: '4px' }}
            >
                <Send className="w-3.5 h-3.5" />
                Send Email #1
            </button>
        </motion.div>
    );
}

function MetricsTable({ metrics }) {
    const segments = metrics?.bySegment;

    if (!segments || Object.values(segments).every(s => s.sent === 0)) {
        return (
            <p className="font-heading text-center py-12" style={{ color: 'rgba(255,255,255,0.5)' }}>
                No campaign data yet. Send emails to start tracking performance.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.1)' }}>
                        <th className="text-left py-3 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Segment</th>
                        <th className="text-right py-3 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Sent</th>
                        <th className="text-right py-3 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Open Rate</th>
                        <th className="text-right py-3 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Click Rate</th>
                        <th className="text-right py-3 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Conv. Rate</th>
                        <th className="text-right py-3 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(segments).map(([key, data]) => (
                        <tr key={key} style={{ borderBottom: '1px solid rgba(230,183,173,0.05)' }}>
                            <td className="py-3 px-4 font-heading text-sm" style={{ color: '#F5EFE6' }}>
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            <td className="text-right py-3 px-4 font-mono text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                {data.sent || 0}
                            </td>
                            <td className="text-right py-3 px-4 font-mono text-sm" style={{ color: data.openRate > 40 ? '#10B981' : 'rgba(255,255,255,0.7)' }}>
                                {data.openRate || 0}%
                            </td>
                            <td className="text-right py-3 px-4 font-mono text-sm" style={{ color: data.clickRate > 20 ? '#10B981' : 'rgba(255,255,255,0.7)' }}>
                                {data.clickRate || 0}%
                            </td>
                            <td className="text-right py-3 px-4 font-mono text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                {data.conversionRate || 0}%
                            </td>
                            <td className="text-right py-3 px-4 font-mono text-sm font-bold" style={{ color: '#E6B7AD' }}>
                                ${data.revenue || 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function EmailCampaignDashboard() {
    useSEO({ title: 'Email Campaign Dashboard | Admin', description: 'Internal email campaign management.', url: '/email-campaign', noindex: true });
    const queryClient = useQueryClient();
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [sendStatus, setSendStatus] = useState('idle');

    // Fetch customer counts from the Customer entity (what's actually in the DB)
    const { data: customers, isLoading: loadingCustomers, refetch: refetchCustomers } = useQuery({
        queryKey: ['customerCounts'],
        queryFn: async () => {
            const all = await base44.entities.Customer.list();
            const segments = {
                previousPurchasers: all.filter(c => c.total_orders > 0),
                emailSubscribers: all.filter(c => c.accepts_email_marketing && c.total_orders === 0),
                abandonedCart: all.filter(c => !c.accepts_email_marketing && c.total_orders === 0),
            };
            return {
                data: {
                    totalCustomers: all.length,
                    segments,
                }
            };
        },
    });

    // Fetch campaign metrics
    const { data: metrics, isLoading: loadingMetrics } = useQuery({
        queryKey: ['campaignMetrics'],
        queryFn: async () => {
            const response = await base44.functions.invoke('getCampaignMetrics', {});
            return response.data;
        },
        refetchInterval: 30000, // Refresh every 30 seconds
    });

    // Verify Shopify variant IDs
    const [variantResults, setVariantResults] = React.useState(null);
    const verifyVariantsMutation = useMutation({
        mutationFn: async () => {
            const response = await base44.functions.invoke('getActualVariantIds', {});
            return response.data;
        },
        onSuccess: (data) => {
            setVariantResults(data);
        },
    });

    // Import customers from Shopify — calls importCustomers which saves to DB
    const importCustomersMutation = useMutation({
        mutationFn: async () => {
            const response = await base44.functions.invoke('importCustomers', {});
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['customerCounts']);
            queryClient.invalidateQueries(['campaignMetrics']);
            alert(`Import complete! ${data?.data?.totalCustomers || 0} customers saved to database.`);
        },
    });

    // Send email mutation
    const sendEmailMutation = useMutation({
        mutationFn: async (segment) => {
            const response = await base44.functions.invoke('sendBatchRelaunchEmails', {
                segment,
                emailNumber: 1,
            });
            return response.data;
        },
        onMutate: async (segment) => {
            setSendStatus('sending');
            setSelectedSegment(segment);
            await queryClient.cancelQueries({ queryKey: ['campaignMetrics'] });
            const previousMetrics = queryClient.getQueryData(['campaignMetrics']);
            const segmentKey = segment.replace(/\s+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toLowerCase());
            const sentCount = customers?.data?.segments?.[segmentKey]?.length || 0;
            queryClient.setQueryData(['campaignMetrics'], old => {
                if (!old) return old;
                const previousSegment = old.bySegment?.[segmentKey] || {};
                return {
                    ...old,
                    totalSent: (old.totalSent || 0) + sentCount,
                    bySegment: {
                        ...(old.bySegment || {}),
                        [segmentKey]: {
                            ...previousSegment,
                            sent: (previousSegment.sent || 0) + sentCount,
                        },
                    },
                };
            });
            return { previousMetrics };
        },
        onSuccess: () => {
            setSendStatus('success');
            setTimeout(() => setSendStatus('idle'), 3000);
        },
        onError: (error, _segment, context) => {
            if (context?.previousMetrics) queryClient.setQueryData(['campaignMetrics'], context.previousMetrics);
            setSendStatus('error');
            console.error('Send failed:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['campaignMetrics'] });
        },
    });

    const handleSendEmail = (segment) => {
        if (confirm(`Send Relaunch Email #1 to ${segment}? This will email all customers in this segment.`)) {
            setSelectedSegment(segment);
            sendEmailMutation.mutate(segment);
        }
    };

    return (
        <div className="min-h-screen" style={{ background: '#080808', padding: '40px 20px' }}>
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Mail className="w-6 h-6" style={{ color: '#E6B7AD' }} />
                        <h1 className="font-serif font-bold text-3xl" style={{ color: '#F5EFE6' }}>
                            Torch Republic Relaunch Campaign
                        </h1>
                    </div>
                    <p className="font-heading text-base" style={{ color: 'rgba(245,239,230,0.7)' }}>
                        Customer re-engagement email campaign · WELCOME10 discount code
                    </p>
                </motion.div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
                    <StatCard
                        title="Total Customers"
                        value={customers?.data?.totalCustomers || 0}
                        icon={Users}
                        color="#E6B7AD"
                        subtext="Across all segments"
                    />
                    <StatCard
                        title="Emails Sent"
                        value={metrics?.totalSent || 0}
                        icon={Send}
                        color="#10B981"
                        subtext="Campaign total"
                    />
                    <StatCard
                        title="Open Rate"
                        value={`${metrics?.overallOpenRate || 0}%`}
                        icon={TrendingUp}
                        color="#6366F1"
                        subtext="Industry avg: 21%"
                    />
                    <StatCard
                        title="Click Rate"
                        value={`${metrics?.overallClickRate || 0}%`}
                        icon={Activity}
                        color="#F59E0B"
                        subtext="Industry avg: 2.5%"
                    />
                    <StatCard
                        title="Conversion Rate"
                        value={`${metrics?.overallConversionRate || 0}%`}
                        icon={ShoppingCart}
                        color="#10B981"
                        subtext="Purchases from emails"
                    />
                    <StatCard
                        title="Revenue Generated"
                        value={`$${metrics?.totalRevenue || 0}`}
                        icon={DollarSign}
                        color="#E6B7AD"
                        subtext="Total attributed revenue"
                    />
                </div>

                {/* Customer Segments */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-10"
                >
                    <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#F5EFE6' }}>
                        Customer Segments
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {customers?.data?.segments && Object.entries(customers.data.segments).map(([key, segment]) => (
                            <SegmentCard
                                key={key}
                                segment={key.replace(/([A-Z])/g, ' $1').trim()}
                                count={segment.length}
                                onSend={handleSendEmail}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Campaign Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
                >
                    <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#F5EFE6' }}>
                        Email Sequence
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-5" style={{ background: '#141312', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px' }}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)' }}>
                                <CheckCircle className="w-6 h-6" style={{ color: '#10B981' }} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-serif font-bold text-lg" style={{ color: '#F5EFE6' }}>
                                    Email #1: Relaunch Announcement
                                </h3>
                                <p className="font-heading text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    Welcome back message · Founder note · WELCOME10 offer
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: '#10B981' }}>
                                    Sent Immediately
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5" style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '8px' }}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(230,183,173,0.1)' }}>
                                <Clock className="w-6 h-6" style={{ color: '#E6B7AD' }} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-serif font-bold text-lg" style={{ color: '#F5EFE6' }}>
                                    Email #2: Best Sellers
                                </h3>
                                <p className="font-heading text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    Product highlights · Customer reviews · Social proof
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
                                    +3 Days
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5" style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '8px' }}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(230,183,173,0.1)' }}>
                                <Clock className="w-6 h-6" style={{ color: '#E6B7AD' }} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-serif font-bold text-lg" style={{ color: '#F5EFE6' }}>
                                    Email #3: Last Chance
                                </h3>
                                <p className="font-heading text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    Urgency · Discount expiration reminder
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
                                    +7 Days
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#F5EFE6' }}>
                        Campaign Performance
                    </h2>
                    <div className="p-6" style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '8px' }}>
                        {loadingMetrics ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <MetricsTable metrics={metrics} />
                        )}
                    </div>
                </motion.div>

                {/* Send Status */}
                {sendStatus === 'sending' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-6 right-6 p-5"
                        style={{ background: '#6366F1', borderRadius: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
                    >
                        <div className="flex items-center gap-3">
                            <Send className="w-5 h-5 text-white" />
                            <p className="font-mono text-sm text-white font-bold">
                                Sending {selectedSegment} emails...
                            </p>
                        </div>
                    </motion.div>
                )}

                {sendStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-6 right-6 p-5"
                        style={{ background: '#10B981', borderRadius: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
                    >
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-white" />
                            <p className="font-mono text-sm text-white font-bold">
                                Emails sent successfully!
                            </p>
                        </div>
                    </motion.div>
                )}

                {sendStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-6 right-6 p-5"
                        style={{ background: '#EF4444', borderRadius: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
                    >
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-white" />
                            <p className="font-mono text-sm text-white font-bold">
                                Failed to send emails. Check console for details.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 p-6"
                    style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '8px' }}
                >
                    <h3 className="font-serif font-bold text-xl mb-4" style={{ color: '#F5EFE6' }}>
                        Quick Actions
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => importCustomersMutation.mutate()}
                            disabled={importCustomersMutation.isPending}
                            className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 px-6 transition-all hover:opacity-90 flex items-center gap-2"
                            style={{ background: '#E6B7AD', color: '#080808', borderRadius: '4px', opacity: importCustomersMutation.isPending ? 0.6 : 1 }}
                        >
                            <Download className="w-3.5 h-3.5" />
                            {importCustomersMutation.isPending ? 'Importing...' : 'Import from Shopify'}
                        </button>
                        <button
                            onClick={() => queryClient.invalidateQueries(['shopifyCustomers'])}
                            className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 px-6 transition-all hover:opacity-90"
                            style={{ background: 'rgba(230,183,173,0.1)', color: '#E6B7AD', border: '1px solid rgba(230,183,173,0.2)', borderRadius: '4px' }}
                        >
                            Refresh Customer Data
                        </button>
                        <button
                            onClick={() => queryClient.invalidateQueries(['campaignMetrics'])}
                            className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 px-6 transition-all hover:opacity-90"
                            style={{ background: 'rgba(230,183,173,0.1)', color: '#E6B7AD', border: '1px solid rgba(230,183,173,0.2)', borderRadius: '4px' }}
                        >
                            Refresh Metrics
                        </button>
                        <button
                            onClick={() => verifyVariantsMutation.mutate()}
                            disabled={verifyVariantsMutation.isPending}
                            className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 px-6 transition-all hover:opacity-90 flex items-center gap-2"
                            style={{ background: 'rgba(99,102,241,0.15)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '4px' }}
                        >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {verifyVariantsMutation.isPending ? 'Verifying...' : 'Verify Shopify Variant IDs'}
                        </button>
                        <Link
                            to="/shop"
                            className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 px-6 transition-all hover:opacity-90"
                            style={{ background: '#E6B7AD', color: '#080808', borderRadius: '4px' }}
                        >
                            View Shop →
                        </Link>
                    </div>
                </motion.div>

                {/* Variant ID Verification Results */}
                {variantResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-6"
                        style={{ background: '#141312', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px' }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-5 h-5" style={{ color: '#818CF8' }} />
                            <h3 className="font-serif font-bold text-xl" style={{ color: '#F5EFE6' }}>
                                Shopify Variant ID Verification
                            </h3>
                        </div>
                        <pre className="font-mono text-[9px] leading-relaxed overflow-auto max-h-64 p-4"
                            style={{ background: '#0A0908', color: 'rgba(230,183,173,0.8)', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                            {JSON.stringify(variantResults, null, 2)}
                        </pre>
                    </motion.div>
                )}
            </div>
        </div>
    );
}