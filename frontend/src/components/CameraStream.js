import React, { useState, useRef, useEffect } from 'react';

const CameraStream = () => {
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 400 },
          height: { ideal: 400 }
        } 
      });

      // Set video source to camera stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  useEffect(() => {
    // Cleanup function to stop camera when component unmounts
    return () => {
      if (streaming && videoRef.current) {
        stopCamera();
      }
    };
  }, [streaming]);

  return (
    <div className="camera-stream-container">
      <h2>Camera Stream</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        style={{ 
          maxWidth: '100%', 
          display: streaming ? 'block' : 'none' 
        }}
      />

      <div className="camera-controls">
        {!streaming ? (
          <button onClick={startCamera}>
            Start Camera
          </button>
        ) : (
          <button onClick={stopCamera}>
            Stop Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraStream;