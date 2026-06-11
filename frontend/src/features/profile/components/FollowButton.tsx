import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui';
import { useFollowUser } from '../../../lib/hooks';

export interface FollowButtonProps {
  userId: string;
}

// The backend exposes only a one-way follow (no toggle, no isFollowing), so the
// followed state is owned locally and flipped optimistically on success.
export function FollowButton({ userId }: FollowButtonProps) {
  const follow = useFollowUser();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    if (isFollowing) return;
    follow.mutate(userId, {
      onSuccess: () => setIsFollowing(true),
    });
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }} className="inline-block">
      <Button
        variant={isFollowing ? 'secondary' : 'primary'}
        onClick={handleClick}
        isLoading={follow.isPending}
        disabled={isFollowing}
      >
        {isFollowing ? 'Suivi' : 'Suivre'}
      </Button>
    </motion.div>
  );
}

export default FollowButton;
