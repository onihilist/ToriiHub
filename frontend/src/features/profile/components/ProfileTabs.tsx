import { motion } from 'framer-motion';
import clsx from 'clsx';

export type ProfileTab = 'tweets' | 'replies' | 'media' | 'likes';

export interface ProfileTabsProps {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
}

const TABS: { id: ProfileTab; label: string }[] = [
  { id: 'tweets', label: 'Tweets' },
  { id: 'replies', label: 'Réponses' },
  { id: 'media', label: 'Médias' },
  { id: 'likes', label: 'Likes' },
];

export function ProfileTabs({ active, onChange }: ProfileTabsProps) {
  return (
    <nav className="mt-6 flex border-b border-border">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={clsx(
              'relative flex-1 px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="profile-tab-indicator"
                className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-accent"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default ProfileTabs;
