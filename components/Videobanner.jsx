'use client';

import { useState, useEffect, useRef } from 'react';

const Videobanner = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (videoEl) {
      videoEl.load();
      videoEl.play().catch(e => console.log("Play failed:", e));

      const handleEnded = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      };

      videoEl.addEventListener('ended', handleEnded);

      return () => {
        videoEl.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentIndex, videos.length]);

  const currentVideo = videos[currentIndex];

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        className='absolute inset-0 w-full h-full object-cover'
      >
        <source src={currentVideo.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='absolute inset-0 flex flex-col items-center justify-center p-4 text-center'>
        <h2 className='text-4xl font-bold text-white mb-2'>{currentVideo.title}</h2>
        <p className='text-xl font-semibold text-white'>{currentVideo.subtitle}</p>
      </div>
    </div>
  );
};

export default Videobanner;
