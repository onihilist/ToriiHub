import React from 'react';
import clsx from 'clsx';

export interface SkeletonProps {
  className?: string;
}

// Composable shimmer block. Pass sizing via className, e.g.
// <Skeleton className="h-4 w-32 rounded-full" />.
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={clsx('animate-pulse rounded bg-white/5', className)} />
  );
}

export default Skeleton;
