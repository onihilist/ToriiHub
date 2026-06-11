import { useState } from 'react';
import { Avatar, Badge, Button, Modal } from '../../../components/ui';
import type { User } from '../../../lib/types';
import { FollowButton } from './FollowButton';

export interface ProfileHeaderProps {
  user: User;
  /** Hide the follow button on one's own profile. */
  isOwnProfile: boolean;
}

function formatJoinDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const formatted = new Intl.DateTimeFormat('fr-FR', {
    month: 'long',
    year: 'numeric',
  }).format(date);
  return `Inscrit en ${formatted}`;
}

export function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Built from the live URL — no backend field needed.
  const profileUrl =
    typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable (insecure context); leave the link visible.
    }
  };

  return (
    <header>
      {/* Cover placeholder — no cover image in the data model. */}
      <div className="h-40 w-full rounded-card bg-gradient-to-r from-accent to-accent-hover" />

      <div className="px-4">
        <div className="-mt-10 flex items-end justify-between">
          <Avatar
            fallback={user.username}
            alt={user.username}
            size="lg"
            className="h-20 w-20 text-2xl ring-4 ring-bg"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShareOpen(true)}
            >
              Partager
            </Button>
            {!isOwnProfile && <FollowButton userId={user.id} />}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-text-primary">
              {user.username}
            </h1>
            {isOwnProfile && <Badge variant="accent">Vous</Badge>}
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            {formatJoinDate(user.createdAt)}
          </p>
        </div>
      </div>

      <Modal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={`Partager le profil de ${user.username}`}
      >
        <p className="text-sm text-text-secondary">
          Copiez le lien ci-dessous pour partager ce profil.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <input
            readOnly
            value={profileUrl}
            onFocus={(e) => e.currentTarget.select()}
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-primary outline-none focus-visible:border-accent"
          />
          <Button variant="primary" size="md" onClick={handleCopy}>
            {copied ? 'Copié !' : 'Copier'}
          </Button>
        </div>
      </Modal>
    </header>
  );
}

export default ProfileHeader;
