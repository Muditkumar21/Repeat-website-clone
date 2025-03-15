import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const SvgOverlay = ({ targetRef, svgUrl, width, height, offsetX, offsetY }) => {
  const { camera, size } = useThree();
  const [position, setPosition] = useState({ x: 0, y: 0, visible: false });
  
  // Update position on each frame - this will now track during GSAP animations
  useFrame(() => {
    if (targetRef.current) {
      // Get the world position of the target object
      const targetPosition = new THREE.Vector3();
      targetRef.current.getWorldPosition(targetPosition);
      
      // Add offset in world space
      targetPosition.x += offsetX;
      targetPosition.y += offsetY;
      
      // Project the 3D position to 2D screen space
      const vector = targetPosition.clone();
      vector.project(camera);
      
      // Convert to CSS coordinates
      const x = (vector.x * 0.5 + 0.5) * size.width;
      const y = (-(vector.y * 0.5) + 0.5) * size.height;
      
      // Check if the point is in front of the camera
      const isVisible = vector.z < 1;
      
      // Update state with the new position
      setPosition({ x, y, visible: isVisible });
    }
  });

  // Use useEffect to create and update the HTML element
  useEffect(() => {
    // Create a container for our SVG if it doesn't exist
    let container = document.getElementById('svg-overlay-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'svg-overlay-container';
      container.style.position = 'absolute';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '-1'; // Increased z-index to ensure visibility
      document.body.appendChild(container);
    }
    
    // Create or get our SVG element
    let svgElement = document.getElementById('can-svg-label');
    if (!svgElement) {
      svgElement = document.createElement('img');
      svgElement.id = 'can-svg-label';
      svgElement.src = svgUrl;
      svgElement.style.position = 'absolute';
      svgElement.style.width = `${width}px`;
      svgElement.style.height = `${height}px`;
      svgElement.style.transform = 'translate(-50%, -50%)';
      svgElement.style.pointerEvents = 'none';
      container.appendChild(svgElement);
    }
    
    // Update position
    if (svgElement) {
      svgElement.style.left = `${position.x}px`;
      svgElement.style.top = `${position.y}px`;
      svgElement.style.display = position.visible ? 'block' : 'none';
    }
    
    // Safer cleanup function
    return () => {
      const existingElement = document.getElementById('can-svg-label');
      const existingContainer = document.getElementById('svg-overlay-container');
      
      if (existingElement && existingContainer && existingContainer.contains(existingElement)) {
        existingContainer.removeChild(existingElement);
      }
      
      // Only remove container if it exists and has no children
      if (existingContainer && existingContainer.childNodes.length === 0) {
        if (document.body.contains(existingContainer)) {
          document.body.removeChild(existingContainer);
        }
      }
    };
  }, [position, svgUrl, width, height]);

  // This component doesn't render anything in the Three.js scene
  return null;
};

export default SvgOverlay;