/**
 * Hero Scramble Animation
 * Animates H1 tags within the hero section with a buttery smooth scramble effect
 */

(function() {
  'use strict';

  // Wait for GSAP to be loaded
  function waitForGSAP(callback) {
    if (typeof gsap !== 'undefined' && typeof gsap.registerPlugin === 'function') {
      callback();
    } else {
      setTimeout(() => waitForGSAP(callback), 100);
    }
  }

  function initHeroScrambleAnimation() {
    console.log('Hero Scramble: Initializing...');
    
    // Register the ScrambleText plugin
    if (typeof ScrambleTextPlugin !== 'undefined') {
      gsap.registerPlugin(ScrambleTextPlugin);
      console.log('Hero Scramble: ScrambleTextPlugin registered');
    } else {
      console.error('Hero Scramble: ScrambleTextPlugin not found!');
      return;
    }

    // Find all H1 elements within hero RTE content
    const heroH1s = document.querySelectorAll('.hero__content-wrapper rte-formatter h1');
    console.log('Hero Scramble: Found', heroH1s.length, 'H1 elements');
    
    if (heroH1s.length === 0) {
      console.warn('Hero Scramble: No H1 elements found in hero');
      return;
    }

    // Animate each H1 with a slight stagger
    heroH1s.forEach((h1, index) => {
      // Store the original text
      const originalText = h1.textContent.trim();
      
      // Set initial state - scrambled text
      h1.style.opacity = '1';
      
      console.log('Hero Scramble: Animating H1 with text:', originalText);
      
      // Create the scramble animation
      gsap.to(h1, {
        duration: 1,
        scrambleText: {
          text: originalText,
          chars: "01XO!@#$%^&*",  // Tech/digital character set
          revealDelay: 0.2,       // Quick start to scramble
          speed: 0.8,             // Fast initial scramble
          tweenLength: false,     // Allows for easing
          rightToLeft: false      // Scramble from left to right
        },
        delay: index * 0.15,      // Slight stagger between elements (buttery smooth)
        ease: "power2.out",       // Fast start, smooth finish
        onStart: function() {
          console.log('Hero Scramble: Animation started for:', originalText);
          // Ensure the element is visible
          h1.style.visibility = 'visible';
        },
        onComplete: function() {
          console.log('Hero Scramble: Animation completed for:', originalText);
        }
      });
    });
  }

  // Initialize on DOM ready
  function init() {
    // Run immediately if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        // Add a small delay to ensure content is rendered
        setTimeout(initHeroScrambleAnimation, 200);
      });
    } else {
      // Add a small delay to ensure content is rendered
      setTimeout(initHeroScrambleAnimation, 200);
    }

    // Also reinitialize when Shopify sections are reloaded (for theme editor)
    if (Shopify && Shopify.designMode) {
      document.addEventListener('shopify:section:load', function(event) {
        // Check if the loaded section contains hero content
        if (event.target.querySelector('.hero__content-wrapper')) {
          setTimeout(initHeroScrambleAnimation, 100); // Small delay to ensure content is rendered
        }
      });
    }
  }

  // Wait for GSAP to load, then initialize
  waitForGSAP(init);
})();
