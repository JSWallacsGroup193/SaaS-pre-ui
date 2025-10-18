import React from 'react';

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error?: Error }> {
  constructor(props: any) { 
    super(props); 
    this.state = {}; 
  }
  
  static getDerivedStateFromError(error: Error) { 
    return { error }; 
  }
  
  componentDidCatch(error: Error) { 
    console.error('ErrorBoundary caught:', error); 
  }
  
  render() {
    if (this.state.error) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-800 text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-red-600">{this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
