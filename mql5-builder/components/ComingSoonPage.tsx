'use client';

import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  description?: string;
  onBack: () => void;
}

export default function ComingSoonPage({ title, description, onBack }: ComingSoonPageProps) {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-md px-6">
        <div className="mb-6 flex justify-center">
          <Clock className="w-20 h-20 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg mb-6">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Coming Soon</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {description || 
            `The ${title} feature is currently under development. This page will be available in a future update with comprehensive functionality for managing your EAs.`}
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-600">
          <p>Expected features:</p>
          <ul className="mt-2 space-y-1">
            {title === 'Settings' && (
              <>
                <li>• Application preferences</li>
                <li>• Theme customization</li>
                <li>• Keyboard shortcuts configuration</li>
              </>
            )}
            {title === 'Templates' && (
              <>
                <li>• Save EA templates</li>
                <li>• Quick template loading</li>
                <li>• Template sharing</li>
              </>
            )}
            {title === 'Documentation' && (
              <>
                <li>• Comprehensive guides</li>
                <li>• Video tutorials</li>
                <li>• API reference</li>
              </>
            )}
            {title === 'Export History' && (
              <>
                <li>• View past exports</li>
                <li>• Re-download EAs</li>
                <li>• Version comparison</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
