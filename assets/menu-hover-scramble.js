/**
 * Menu Hover Scramble Animation
 * Animates menu link titles on hover with a scramble effect using their own letters
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

  function initMenuHoverScramble() {
    console.log('Menu Hover Scramble: Initializing...');
    
    // Register the ScrambleText plugin
    if (typeof ScrambleTextPlugin !== 'undefined') {
      gsap.registerPlugin(ScrambleTextPlugin);
      console.log('Menu Hover Scramble: ScrambleTextPlugin registered');
    } else {
      console.error('Menu Hover Scramble: ScrambleTextPlugin not found!');
      return;
    }

    // Find all menu link titles
    const menuLinks = document.querySelectorAll('.menu-list__link-title');
    console.log('Menu Hover Scramble: Found', menuLinks.length, 'menu links');
    
    if (menuLinks.length === 0) {
      console.warn('Menu Hover Scramble: No menu links found');
      return;
    }

    // Add hover effect to each menu link
    menuLinks.forEach((link) => {
      // Store the original text
      const originalText = link.textContent.trim();
      
      // Create a unique character set from the original text
      // Remove duplicates and shuffle
      const uniqueChars = [...new Set(originalText.split(''))].join('');
      const scrambleChars = shuffleString(uniqueChars);
      
      let scrambleAnimation;
      
      // Mouse enter - scramble the text
      link.addEventListener('mouseenter', function() {
        // Kill any existing animation
        if (scrambleAnimation) {
          scrambleAnimation.kill();
        }
        
        // Create scramble animation
        scrambleAnimation = gsap.to(link, {
          duration: 0.6,
          scrambleText: {
            text: originalText,
            chars: scrambleChars,  // Use shuffled original characters
            revealDelay: 0.05,      // Quick reveal
            speed: 0.6,             // Medium speed
            tweenLength: false      // Allow easing
          },
          ease: "power2.out"
        });
      });
      
      // Mouse leave - ensure text is restored
      link.addEventListener('mouseleave', function() {
        // Kill any existing animation
        if (scrambleAnimation) {
          scrambleAnimation.kill();
        }
        
        // Quickly restore original text
        gsap.set(link, {
          scrambleText: {
            text: originalText,
            chars: scrambleChars,
            revealDelay: 0,
            speed: 1
          }
        });
      });
    });
  }
  
  // Helper function to shuffle a string
  function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  // Initialize on DOM ready
  function init() {
    // Run immediately if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        // Add a small delay to ensure content is rendered
        setTimeout(initMenuHoverScramble, 200);
      });
    } else {
      // Add a small delay to ensure content is rendered
      setTimeout(initMenuHoverScramble, 200);
    }

    // Also reinitialize when Shopify sections are reloaded (for theme editor)
    if (Shopify && Shopify.designMode) {
      document.addEventListener('shopify:section:load', function(event) {
        // Check if the loaded section contains menu links
        if (event.target.querySelector('.menu-list__link-title')) {
          setTimeout(initMenuHoverScramble, 100);
        }
      });
    }
  }

  // Wait for GSAP to load, then initialize
  waitForGSAP(init);
})();
