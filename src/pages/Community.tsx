import { useState } from 'react';
import { MessageSquare, Users, Newspaper } from 'lucide-react';
import IndustryNews from '../components/IndustryNews';
import GroupCard from '../components/GroupCard';
import GroupDiscussions from '../components/GroupDiscussions';
import DiscussionForum from '../components/DiscussionForum';
import type { Group } from '../types/group';
import type { Post } from '../types/forum';

const sampleGroups: Group[] = [
  {
    id: '1',
    name: 'Clinical Laboratory Scientists',
    description: 'A group for certified Clinical Laboratory Scientists to discuss techniques, regulations, and best practices.',
    members: ['1'],
    category: 'Clinical',
    image: 'https://images.unsplash.com/photo-1581093458791-9d58946cc0d8?auto=format&fit=crop&q=80&w=2940',
    memberCount: 156,
    isPrivate: false
  },
  // ... other groups
];

export default function Community() {
  const [view, setView] = useState<'general' | 'news' | 'groups' | 'group-discussions' | 'forum'>('general');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>(sampleGroups);

  // Mock current user ID - replace with actual auth
  const currentUserId = '1';

  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId
        ? { ...group, members: [...group.members, currentUserId], memberCount: group.memberCount + 1 }
        : group
    ));
  };

  const handleLeaveGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId
        ? { 
            ...group, 
            members: group.members.filter(id => id !== currentUserId),
            memberCount: group.memberCount - 1
          }
        : group
    ));
  };

  const handleViewGroupDiscussions = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (group) {
      setSelectedGroup(group);
      setView('group-discussions');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Lab Community</h1>
        <p className="mt-4 text-xl text-gray-600">Connect, share, and grow with fellow laboratory professionals</p>
      </div>

      {view === 'general' && (
        <>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div 
              onClick={() => setView('forum')}
              className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Discussion Forums</h2>
              <p className="text-gray-600">Join conversations about lab techniques, equipment, and industry trends.</p>
            </div>

            <div 
              onClick={() => setView('groups')}
              className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <Users className="h-8 w-8 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Professional Groups</h2>
              <p className="text-gray-600">Connect with peers in your specific field or area of expertise.</p>
            </div>

            <div 
              onClick={() => setView('news')}
              className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <Newspaper className="h-8 w-8 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Industry News</h2>
              <p className="text-gray-600">Stay updated with the latest developments in laboratory science.</p>
            </div>
          </div>
        </>
      )}

      {view === 'forum' && (
        <div className="space-y-6">
          <button
            onClick={() => setView('general')}
            className="text-blue-600 hover:text-blue-700 flex items-center space-x-2"
          >
            ← Back to Community
          </button>
          <DiscussionForum currentUserId={currentUserId} />
        </div>
      )}

      {view === 'news' && (
        <div className="space-y-6">
          <button
            onClick={() => setView('general')}
            className="text-blue-600 hover:text-blue-700 flex items-center space-x-2"
          >
            ← Back to Community
          </button>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <IndustryNews />
          </div>
        </div>
      )}

      {view === 'groups' && (
        <div className="space-y-6">
          <button
            onClick={() => setView('general')}
            className="text-blue-600 hover:text-blue-700 flex items-center space-x-2"
          >
            ← Back to Community
          </button>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onJoin={handleJoinGroup}
                onLeave={handleLeaveGroup}
                onViewDiscussions={handleViewGroupDiscussions}
                isMember={group.members.includes(currentUserId)}
              />
            ))}
          </div>
        </div>
      )}

      {view === 'group-discussions' && selectedGroup && (
        <GroupDiscussions
          group={selectedGroup}
          onBack={() => setView('groups')}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
}