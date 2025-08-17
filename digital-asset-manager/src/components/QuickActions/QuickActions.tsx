import { BarChart3, Plus, Settings, Lock, ChevronRight } from "lucide-react";
import React from "react";

const QuickActions: React.FC = () => (
  <section aria-labelledby="quick-actions">
    <h3 id="quick-actions" className="text-xl font-semibold text-gray-900 mb-6">
      Quick Actions
    </h3>
    <nav className="space-y-3">
      {[
        {
          icon: <Plus className="w-5 h-5" />,
          label: "Link New Account",
          desc: "Connect via Plaid",
          onClick: () => console.log("Add account"),
        },
        {
          icon: <BarChart3 className="w-5 h-5" />,
          label: "View Analytics",
          desc: "Detailed insights",
          onClick: () => console.log("View analytics"),
        },
        {
          icon: <Settings className="w-5 h-5" />,
          label: "Account Settings",
          desc: "Manage preferences",
          onClick: () => console.log("Open settings"),
        },
        {
          icon: <Lock className="w-5 h-5" />,
          label: "Security Center",
          desc: "Privacy & security",
          onClick: () => console.log("Open security"),
        },
      ].map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className="w-full flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-describedby={`action-desc-${index}`}
        >
          <div
            className="p-2 bg-gray-50 rounded-lg text-gray-600"
            aria-hidden="true"
          >
            {action.icon}
          </div>
          <div>
            <p className="font-medium text-gray-900">{action.label}</p>
            <p id={`action-desc-${index}`} className="text-sm text-gray-500">
              {action.desc}
            </p>
          </div>
          <ChevronRight
            className="w-4 h-4 text-gray-400 ml-auto"
            aria-hidden="true"
          />
        </button>
      ))}
    </nav>
  </section>
);

export default QuickActions;
