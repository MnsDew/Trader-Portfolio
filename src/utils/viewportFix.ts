// Fix for mobile viewport issues
export const fixMobileViewport = () => {
  // Function to set the correct viewport height
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Set initial viewport height
  setViewportHeight();

  // Update on resize and orientation change
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', () => {
    // Delay to ensure the orientation change is complete
    setTimeout(setViewportHeight, 100);
  });

  // Fix for iOS Safari address bar
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) {
    // Handle iOS viewport changes
    window.addEventListener('scroll', () => {
      setViewportHeight();
    });
  }
};

// Fix for initial page load on mobile
export const fixInitialMobileLoad = () => {
  // Prevent initial flash of incorrect viewport
  const metaViewport = document.querySelector('meta[name="viewport"]');
  if (metaViewport) {
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
  }

  // Add a class to body to indicate mobile viewport is fixed
  document.body.classList.add('viewport-fixed');
};





