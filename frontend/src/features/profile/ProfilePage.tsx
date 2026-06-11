import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, usePosts } from '../../lib/hooks';
import { MOCK_USER_ID } from '../../constants/mockUser';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileStats } from './components/ProfileStats';
import { ProfileTabs, type ProfileTab } from './components/ProfileTabs';
import { ProfileTweetList } from './components/ProfileTweetList';
import { ProfileSkeleton } from './components/ProfileSkeleton';

function EmptyTab({ label }: { label: string }) {
  return (
    <p className="py-12 text-center text-sm text-text-secondary">
      {label}
    </p>
  );
}

export function ProfilePage() {
  const { id = '' } = useParams<{ id: string }>();
  const userQuery = useUser(id);
  const postsQuery = usePosts();
  const [activeTab, setActiveTab] = useState<ProfileTab>('tweets');

  if (userQuery.isLoading || postsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-bg">
        <ProfileSkeleton />
      </div>
    );
  }

  if (userQuery.isError || !userQuery.data) {
    return (
      <div className="min-h-screen bg-bg">
        <p className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-text-secondary">
          Profil introuvable.
        </p>
      </div>
    );
  }

  const user = userQuery.data;
  const userPosts = (postsQuery.data ?? []).filter((p) => p.userId === id);

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-2xl">
        <ProfileHeader user={user} isOwnProfile={id === MOCK_USER_ID} />

        <div className="px-4">
          <ProfileStats postsCount={userPosts.length} />
        </div>

        <ProfileTabs active={activeTab} onChange={setActiveTab} />

        {activeTab === 'tweets' && <ProfileTweetList posts={userPosts} />}
        {activeTab === 'replies' && (
          <EmptyTab label="Aucune réponse à afficher." />
        )}
        {activeTab === 'media' && <EmptyTab label="Aucun média à afficher." />}
        {activeTab === 'likes' && <EmptyTab label="Aucun like à afficher." />}
      </div>
    </div>
  );
}

export default ProfilePage;
