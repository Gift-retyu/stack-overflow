import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    fallbackComponent: React.ReactNode;
    children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    // You can also log the error to a service like Sentry or Bugsnag

    // Optionally, you can set a flag to indicate the error is reported
    // this.setState({ hasError: true, error: error });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          {this.props.fallbackComponent}

            <h2>Error Occurred</h2>
            <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
