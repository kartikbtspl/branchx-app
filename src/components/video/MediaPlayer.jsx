import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const isVideo = (url) => {
  return url.match(/\.(mp4|webm|ogg)$/i);
};

const isImage = (url) => {
  return url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
};

const MediaPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (isVideo(src)) {
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
    }
  }, [src]);

  if (isImage(src)) {
    return (
      <div className="w-full max-w-4xl aspect-video overflow-hidden rounded-xl">
        <img
          src={src}
          alt="Media"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    );
  }

  if (isVideo(src)) {
    return (
      <div className="w-full max-w-4xl aspect-video overflow-hidden rounded-xl">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin w-full h-full"
          playsInline
        />
      </div>
    );
  }

  return <div>Unsupported media format</div>;
};

export default MediaPlayer;
