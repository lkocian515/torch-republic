import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Route-level error boundary. Wraps the page-rendering part of the app so a
 * missing optional asset or undefined content entry can never blank the whole
 * page — the global header and footer (rendered outside this boundary) stay
 * visible, and a concise branded fallback is shown instead of a raw stack
 * trace. The boundary auto-resets when `resetKey` changes (e.g. on navigation).
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log for debugging without exposing the trace to visitors.
    console.error('Route render error:', error, info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center px-6 py-20" style={{ background: '#F7F2E9' }}>
          <div className="max-w-lg text-center">
            <p className="mb-4 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: '#9B4E2F' }}>Something went wrong</p>
            <h1 className="mb-4 font-serif text-4xl font-bold" style={{ color: '#292626' }}>This page could not load.</h1>
            <p className="mb-8 font-heading leading-7" style={{ color: '#5E4639' }}>We had trouble displaying this page. The rest of the site is still available &mdash; please try again or start from the collection.</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/" className="inline-flex min-h-[48px] items-center justify-center rounded-full px-8 py-3 font-heading font-semibold" style={{ background: '#9B4E2F', color: '#F7F2E9' }}>Return Home</Link>
              <Link to="/shop" className="inline-flex min-h-[48px] items-center justify-center rounded-full border px-8 py-3 font-heading font-semibold" style={{ borderColor: '#9B4E2F', color: '#9B4E2F' }}>Shop All Products</Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}