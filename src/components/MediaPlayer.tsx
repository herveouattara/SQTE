import React from 'react';
import ReactPlayer from 'react-player';

interface MediaPlayerProps {
  url: string;
  title: string;
}

export const MediaPlayer = ({ url, title }: MediaPlayerProps) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        title={title}
        config={{
          youtube: {
            playerVars: { showinfo: 1 }
          }
        }}
      />
    </div>
  );
};