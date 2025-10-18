import React from 'react';

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error?: Error }> {
  constructor(props: any) { super(props); this.state = {}; }
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error) { console.error(error); }
  render() {
    if (this.state.error) return <div style={{color:'red'}}>Error: {this.state.error.message}</div>;
    return this.props.children;
  }
}
