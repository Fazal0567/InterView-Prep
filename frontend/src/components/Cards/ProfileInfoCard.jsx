import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  // Enforce HTTPS on the image URL
  const getSecureImageUrl = (url) => {
    if (!url) return '/default-avatar.png';
    return url.startsWith('http://') ? url.replace('http://', 'https://') : url;
  };

  return user && (
    <div className='flex items-center'>
      <img
        src={getSecureImageUrl(user.profileImageUrl)}
        alt="Profile"
        className='w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover'
      />
      <div>
        <div className="text-[15px] text-black font-bold leading-3">
          {user.name || ''}
        </div>
        <button
          className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
