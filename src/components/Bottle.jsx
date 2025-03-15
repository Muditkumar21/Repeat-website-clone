import React, { forwardRef, useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, Color } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export const Bottle = forwardRef((props, ref) => {
  const { nodes } = useGLTF("/model/WaterBottleNew.glb");
  const groupRef = useRef();
  const color = new Color("black");
  const { pageFiveRef } = props;
  
  // Mouse position state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Store the fixed initial transformations
  const initialState = useRef({
    position: new THREE.Vector3(0.96, -1.40, 0.30),
    rotation: new THREE.Euler(6.90, 0.30, 1.19),
    scale: new THREE.Vector3(3, 3, 3),
    scrollY: 0,
    initialScrollY: 0
  });

  const material = new MeshStandardMaterial({ color });
  const stroke = new MeshStandardMaterial({ color: "#F5FF7D" });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!pageFiveRef.current) return;
  
      const rect = pageFiveRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;
  
      // Check if mouse is inside pageFive element
      const isInside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;
  
      if (isInside) {
        const x = (clientX / window.innerWidth) * 2 - 1;
        const y = (clientY / window.innerHeight) * 2 - 1;
        setMousePosition({ x, y });
      } else {
        // Reset to neutral position when outside
        // setMousePosition({ x: 0, y: 0 });
      }
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pageFiveRef]); // Add pageFiveRef to dependencies 

  // Set up initial state
  useEffect(() => {
    if (groupRef.current) {
      // Force initial transformations
      groupRef.current.position.copy(initialState.current.position);
      groupRef.current.rotation.copy(initialState.current.rotation);
      groupRef.current.scale.copy(initialState.current.scale);
      
      // Store initial scroll position
      initialState.current.initialScrollY = window.scrollY;
    }
  }, []);

  // Custom animation frame
  useFrame(() => {
    if (!groupRef.current || !pageFiveRef.current) return;
    
    // Get current scroll position
    const currentScrollY = window.scrollY;
    
    // Calculate relative scroll progress for the specific element
    const rect = pageFiveRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Element is in view when its top enters the viewport
    // and leaves when its bottom exits
    const startPoint = -viewportHeight; // When element's top reaches bottom of viewport
    const endPoint = rect.height; // When element's bottom exits viewport
    
    // Calculate progress (0 to 1)
    const scrollPosition = rect.top;
    let progress = 1 - (scrollPosition - startPoint) / (endPoint - startPoint);
    progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
    
    // Apply scroll-based rotation
    const targetRotationX = initialState.current.rotation.x + progress * 1.5;
    
    // Apply mouse-based rotation (subtle effect)
    // Adjust these multipliers to control the intensity of the effect
    const mouseRotationY = mousePosition.x * 0.1;
    const mouseRotationX = mousePosition.y * 0.1;
    
    // Apply combined transformations
    groupRef.current.position.copy(initialState.current.position);
    groupRef.current.rotation.set(
      targetRotationX + mouseRotationX,
      initialState.current.rotation.y + mouseRotationY,
      initialState.current.rotation.z
    );
    groupRef.current.scale.copy(initialState.current.scale);
  });

  return (
    <group
      ref={(node) => {
        groupRef.current = node;
        if (ref) {
          if (typeof ref === "function") ref(node);
          else ref.current = node;
        }
      }}
      dispose={null}
    >
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001.geometry}
          material={stroke}
        />
        <mesh geometry={nodes.Mesh001_1.geometry} scale={[1.015, 1.01, 1.01]}>
          <meshBasicMaterial color={"#F5FF7D"} side={THREE.BackSide} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001_1.geometry}
          material={material}
        />
      </group>
    </group>
  );
});

useGLTF.preload("/model/WaterBottleNew.glb");

export default Bottle;