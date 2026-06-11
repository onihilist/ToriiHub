import { Skeleton } from '../../../components/ui';

// Loading placeholder mirroring the profile layout: cover, avatar, header,
// stats, then a few tweet cards.
export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-2xl">
      <Skeleton className="h-40 w-full rounded-card" />

      <div className="px-4">
        <div className="-mt-10 flex items-end justify-between">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>

        <div className="mt-4 space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="mt-4 flex gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="mt-6 space-y-4 px-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-card" />
        ))}
      </div>
    </div>
  );
}

export default ProfileSkeleton;
