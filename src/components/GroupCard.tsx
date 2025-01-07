import { Users, Lock, UnlockKeyhole } from 'lucide-react';
import type { Group } from '../types/group';

interface GroupCardProps {
  group: Group;
  onJoin: (groupId: string) => void;
  onLeave: (groupId: string) => void;
  onViewDiscussions: (groupId: string) => void;
  isMember: boolean;
}

export default function GroupCard({ group, onJoin, onLeave, onViewDiscussions, isMember }: GroupCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 relative">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-full object-cover mix-blend-overlay"
        />
        {group.isPrivate && (
          <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
            <Lock className="h-4 w-4 text-gray-600" />
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
        <p className="text-gray-600 mt-2">{group.description}</p>
        
        <div className="flex items-center mt-4 text-gray-500">
          <Users className="h-5 w-5" />
          <span className="ml-2">{group.memberCount} members</span>
        </div>

        <div className="mt-6 flex space-x-3">
          {isMember ? (
            <>
              <button
                onClick={() => onViewDiscussions(group.id)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                View Discussions
              </button>
              <button
                onClick={() => onLeave(group.id)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Leave
              </button>
            </>
          ) : (
            <button
              onClick={() => onJoin(group.id)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Join Group
            </button>
          )}
        </div>
      </div>
    </div>
  );
}