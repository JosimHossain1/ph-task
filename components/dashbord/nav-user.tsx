"use client";

interface User {
  name: string;
  email: string;
  avatar: string;
}

export function NavUser({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-3 p-3 border-t mt-4">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
