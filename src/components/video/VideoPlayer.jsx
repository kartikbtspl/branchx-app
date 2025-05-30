import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (videoRef.current && !playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          autoplay: true,
          muted: true,
          controls: false,
          loop: true,
          preload: 'auto',
          responsive: true,
          fluid: true,
          sources: [{ src, type: 'video/mp4' }],
        });
      }
    });

    return () => {
      cancelAnimationFrame(id);
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div className="w-full max-w-4xl aspect-video overflow-hidden rounded-xl">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin w-full h-full"
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
