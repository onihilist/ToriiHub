import React from 'react';
import clsx from 'clsx';

export type FeedTab = 'for-you' | 'following';

interface FeedTabsProps {
  active: FeedTab;
  onChange: (tab: FeedTab) => void;
}

const TABS: { id: FeedTab; label: string }[] = [
  { id: 'for-you', label: 'For You' },
  { id: 'following', label: 'Following' },
];

// Pill-style segmented control. "Following" has no dedicated endpoint yet, so
// it is wired purely as UI state — the page shows a placeholder for it.
export function FeedTabs({ active, onChange }: FeedTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Feed sections"
      className="flex gap-1 rounded-full border border-border bg-surface p-1"
    >
      {TABS.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'flex-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              'outline-none focus-visible:ring-2 focus-visible:ring-accent',
              selected
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default FeedTabs;
