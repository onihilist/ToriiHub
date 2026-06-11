import React, { useState } from 'react';
import { Button, Skeleton } from '../../components/ui';
import { usePosts } from '../../lib/hooks';
import { Composer } from './components/Composer';
import { FeedTabs, type FeedTab } from './components/FeedTabs';
import { PostList } from './components/PostList';

// Skeleton placeholders shown while the timeline loads.
function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-card border border-border bg-surface p-4"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-32 rounded-full" />
              <Skeleton className="h-3 w-20 rounded-full" />
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-3 w-4/5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeedPage() {
  const [tab, setTab] = useState<FeedTab>('for-you');
  const { data: posts, isLoading, isError, refetch, isFetching } = usePosts();

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-text-primary">Home</h1>

      <div className="space-y-4">
        <FeedTabs active={tab} onChange={setTab} />

        {tab === 'following' ? (
          <div className="rounded-card border border-border bg-surface p-8 text-center text-text-secondary">
            <p className="font-medium text-text-primary">Following is coming soon</p>
            <p className="mt-1 text-sm">
              There is no following timeline endpoint yet.
            </p>
          </div>
        ) : (
          <>
            <Composer />

            {isLoading ? (
              <FeedSkeleton />
            ) : isError ? (
              <div className="rounded-card border border-border bg-surface p-8 text-center">
                <p className="text-text-primary">Couldn't load the timeline.</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3"
                  onClick={() => refetch()}
                  isLoading={isFetching}
                >
                  Retry
                </Button>
              </div>
            ) : !posts || posts.length === 0 ? (
              <div className="rounded-card border border-border bg-surface p-8 text-center text-text-secondary">
                <p className="font-medium text-text-primary">No posts yet</p>
                <p className="mt-1 text-sm">Be the first to post something.</p>
              </div>
            ) : (
              <PostList posts={posts} />
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default FeedPage;
