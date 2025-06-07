import  { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

const MediaPlayer = ({ src, previewOnly = false }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (previewOnly && isVideo(src)) {
      const video = document.createElement("video");
      video.src = src;
      video.crossOrigin = "anonymous";
      video.currentTime = 1;

      video.addEventListener("loadeddata", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        setThumbnail(canvas.toDataURL("image/png"));
      });

      return () => {
        video.removeAttribute("src");
        video.load();
      };
    }
  }, [src, previewOnly]);

  useEffect(() => {
    if (isVideo(src) && !previewOnly) {
      const id = requestAnimationFrame(() => {
        if (videoRef.current && !playerRef.current) {
          playerRef.current = videojs(videoRef.current, {
            autoplay: true,
            muted: true,
            controls: false,
            loop: true,
            preload: "auto",
            responsive: true,
            fluid: true,
            sources: [{ src, type: "video/mp4" }],
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
  }, [src, previewOnly]);

  // Show thumbnail (generated from video)
  if (previewOnly && isVideo(src) && thumbnail) {
    return (
      <div className="w-full max-w-4xl aspect-video overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt="Video thumbnail"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    );
  }

  // Show static image
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

  // Show full video
  if (isVideo(src) && !previewOnly) {
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

  return <div>
    <img src = "https://www.google.com/imgres?q=food%20image&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Ftop-view-table-full-food_23-2149209253.jpg%3Fsemt%3Dais_items_boosted%26w%3D740&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Ffood&docid=RB__2DxE3HJa8M&tbnid=fsEDLp6NGRf7dM&vet=12ahUKEwif1Y7RhN-NAxXwm2MGHXbkGkYQM3oECFMQAA..i&w=740&h=493&hcb=2&ved=2ahUKEwif1Y7RhN-NAxXwm2MGHXbkGkYQM3oECFMQAA"
          alt = "Thumbnail" />
  </div>;
};

export default MediaPlayer;


// import React, { useRef, useEffect } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';

// const isVideo = (url) => {
//   return url.match(/\.(mp4|webm|ogg)$/i);
// };

// const isImage = (url) => {
//   return url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
// };

// const MediaPlayer = ({ src }) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     if (isVideo(src)) {
//       const id = requestAnimationFrame(() => {
//         if (videoRef.current && !playerRef.current) {
//           playerRef.current = videojs(videoRef.current, {
//             autoplay: true,
//             muted: true,
//             controls: false,
//             loop: true,
//             preload: 'auto',
//             responsive: true,
//             fluid: true,
//             sources: [{ src, type: 'video/mp4' }],
//           });
//         }
//       });

//       return () => {
//         cancelAnimationFrame(id);
//         if (playerRef.current) {
//           playerRef.current.dispose();
//           playerRef.current = null;
//         }
//       };
//     }
//   }, [src]);

//   if (isImage(src)) {
//     return (
//       <div className="w-full max-w-4xl aspect-video overflow-hidden rounded-xl">
//         <img
//           src={src}
//           alt="Media"
//           className="w-full h-full object-cover rounded-xl"
//         />
//       </div>
//     );
//   }

//   if (isVideo(src)) {
//     return (
//       <div className="w-full max-w-4xl aspect-video overflow-hidden rounded-xl">
//         <video
//           ref={videoRef}
//           className="video-js vjs-default-skin w-full h-full"
//           playsInline
//         />
//       </div>
//     );
//   }

//   return <div>Unsupported media format</div>;
// };

// export default MediaPlayer;
