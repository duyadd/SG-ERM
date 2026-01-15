import React, { useState } from 'react';
import { Search, Settings, X } from 'lucide-react';
import { type UserRole } from '../../Header';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  lastLoggedIn: string | null;
  avatar: string;
}

interface UserAccessManagementProps {
  currentRole: UserRole;
}

export function UserAccessManagement({ currentRole }: UserAccessManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Yeray Rosales',
      email: 'name@email.com',
      roles: ['Data Analyst'],
      lastLoggedIn: 'Not Logged in',
      avatar: '👨‍💼',
    },
    {
      id: '2',
      name: 'Lennert Nijenbijvank',
      email: 'name@email.com',
      roles: [' User Admin'],
      lastLoggedIn: null,
      avatar: '👨‍💼',
    },
    {
      id: '3',
      name: 'Tallah Cotton',
      email: 'name@email.com',
      roles: ['Financial Analyst'],
      lastLoggedIn: null,
      avatar: '👩‍💼',
    },
    {
      id: '4',
      name: 'Adora Azubuike',
      email: 'name@email.com',
      roles: ['Super User'],
      lastLoggedIn: 'Not Logged in',
      avatar: '👩‍💼',
    },
  ]);

  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    roles: [] as string[],
  });

  const availableRoles = ['Super User', 'Data Analyst', 'User Admin', 'Financial Analyst'];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
    }
  };

  const toggleRoleForNewUser = (role: string) => {
    const newRoles = newUser.roles.includes(role)
      ? newUser.roles.filter((r) => r !== role)
      : [...newUser.roles, role];
    setNewUser({ ...newUser, roles: newRoles });
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.roles.length > 0) {
      const user: User = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        roles: newUser.roles,
        lastLoggedIn: null,
        avatar: newUser.name.charAt(0),
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', roles: [] });
      setShowAddUserModal(false);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
    const newSelected = new Set(selectedUsers);
    newSelected.delete(userId);
    setSelectedUsers(newSelected);
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      'Super User': 'bg-yellow-100 text-yellow-800',
      'Data Analyst': 'bg-green-100 text-green-800',
      'User Admin': 'bg-blue-100 text-blue-800',
      'Financial Analyst': 'bg-purple-100 text-purple-800',
      Manager: 'bg-yellow-100 text-yellow-800',
      Admin: 'bg-gray-800 text-white',
      Auditor: 'bg-green-600 text-white',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="px-6 py-2 bg-yellow-400 text-gray-900 rounded font-medium hover:bg-yellow-500 transition"
        >
          Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search User"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* User Count */}
      <div className="text-sm text-gray-600 mb-4">
        Showing {filteredUsers.length} of {users.length} total Users
      </div>

      {/* Users Table */}
      <div className="bg-white rounded border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">User Role</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      {user.lastLoggedIn && (
                        <div className="text-sm text-orange-500 font-medium">{user.lastLoggedIn}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 flex-wrap">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(role)}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Modify Roles</span>
                    </button>
                    <button
                      onClick={() => handleRemoveUser(user.id)}
                      className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-sm">Remove User</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Assign Roles</label>
                <div className="space-y-2">
                  {availableRoles.map((role) => (
                    <label key={role} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newUser.roles.includes(role)}
                        onChange={() => toggleRoleForNewUser(role)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(role)}`}>
                        {role}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email || newUser.roles.length === 0}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}