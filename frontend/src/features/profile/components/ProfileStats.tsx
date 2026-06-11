export interface ProfileStatsProps {
  postsCount: number;
}

// Following/followers counts are not exposed by the backend, so they render as
// a neutral placeholder. Only the post count is real (computed front-side).
export function ProfileStats({ postsCount }: ProfileStatsProps) {
  return (
    <div className="mt-4 flex gap-6 text-sm">
      <span className="text-text-secondary">
        <b className="text-text-primary">{postsCount}</b> Posts
      </span>
      <span className="text-text-secondary">
        <b className="text-text-primary">—</b> Abonnements
      </span>
      <span className="text-text-secondary">
        <b className="text-text-primary">—</b> Abonnés
      </span>
    </div>
  );
}

export default ProfileStats;
