import React from "react";

const Footer: React.FC = () => (
  <footer className="app-footer mt-8 bg-blue-50 border border-blue-200 p-4">
    <div className="flex items-center justify-center">
      <div>
        <p className="text-sm font-medium text-blue-900">
          Your data is protected with bank-level security
        </p>
        <p className="text-sm text-blue-700 mt-1">
          We use 256-bit SSL encryption and never store your banking
          credentials. All connections are read-only and secured by Plaid.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
