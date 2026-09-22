import React, { useState } from 'react';

interface DogAvatarProps {
  src: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fallbackGradient?: string;
}

export const DogAvatar: React.FC<DogAvatarProps> = ({
  src,
  alt,
  className = '',
  fallbackGradient = 'from-amber-400 to-amber-600'
}) => {
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${fallbackGradient} flex items-center justify-center ${className}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-2 text-center text-white select-none">
          <span className="text-4xl filter drop-shadow-md">🐕</span>
          <span className="text-xs font-semibold uppercase tracking-wider mt-1 drop-shadow">
            {alt.split(' ')[0]}
          </span>
        </div>
      )}
    </div>
  );
};
