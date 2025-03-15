import React from "react";
import { useFrame } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Environment, Float, CameraControls } from "@react-three/drei";
import { useRef, useEffect, memo } from "react";
import { lerp } from "three/src/math/MathUtils";
import { Can } from "./Can";
import SvgOverlay from "./SvgOverlay";
import SvgOverlayTwo from "./SvgOverlayTwo";
import SvgOverlayThree from "./SvgOverlayThree";
import Hero from "./Hero";
import { Cream } from "./Cream";
import { Medicine } from "./Medicine";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

// Constants remain the same
const AZIMUTH_SENSITIVITY = Math.PI * 0.5;
const POLAR_SENSITIVITY = Math.PI * 0.2;
const INITIAL_AZIMUTH = 0;
const INITIAL_POLAR = Math.PI / 2.2;
const POLAR_MIN = 0.1;
const POLAR_MAX = Math.PI - 0.1;
const AZIMUTH_MIN = -Math.PI / 12;
const AZIMUTH_MAX = Math.PI / 12;
const LERP_FACTOR = 0.1;

// CursorControlledCamera component (same as before)
const CursorControlledCamera = memo(({ cursor }) => {
  const cameraControlsRef = useRef();

  useEffect(() => {
    cameraControlsRef.current?.rotateTo(INITIAL_AZIMUTH, INITIAL_POLAR, false);
  }, []);

  useFrame(() => {
    if (!cameraControlsRef.current) return;

    // Calculate target angles
    let targetAzimuth =
      INITIAL_AZIMUTH + (cursor.x - 0.5) * AZIMUTH_SENSITIVITY;
    const targetPolar = INITIAL_POLAR + (cursor.y - 0.5) * POLAR_SENSITIVITY;

    // Clamp azimuth angle
    targetAzimuth = Math.min(Math.max(targetAzimuth, AZIMUTH_MIN), AZIMUTH_MAX);

    // Clamp polar angle
    const clampedPolar = Math.min(Math.max(targetPolar, POLAR_MIN), POLAR_MAX);

    // Smoothly interpolate angles
    const currentAzimuth = lerp(
      cameraControlsRef.current.azimuthAngle,
      targetAzimuth,
      LERP_FACTOR
    );
    const currentPolar = lerp(
      cameraControlsRef.current.polarAngle,
      clampedPolar,
      LERP_FACTOR
    );

    // Update camera position
    cameraControlsRef.current.rotateTo(currentAzimuth, currentPolar, false);
  });

  return (
    <CameraControls
      ref={cameraControlsRef}
      minDistance={5}
      maxDistance={5}
      truck={false}
      dolly={false}
      rotate={false}
    />
  );
});

// CursorSmoother component (same as before)
const CursorSmoother = memo(({ cursorRef, cursorTarget }) => {
  useFrame(() => {
    cursorRef.current.x = lerp(
      cursorRef.current.x,
      cursorTarget.current.x,
      LERP_FACTOR
    );
    cursorRef.current.y = lerp(
      cursorRef.current.y,
      cursorTarget.current.y,
      LERP_FACTOR
    );
  });
  return null;
});

// Modified main component
function Canvass() {
  const cursorRef = useRef({ x: 0.5, y: 0.5 });
  const cursorTarget = useRef({ x: 0.5, y: 0.5 });
  
  // Create refs for all three models
  const canRef = useRef();
  const creamRef = useRef();
  const medicineRef = useRef();

  // Paths to the SVG files
  const canSvgUrl = "src/assets/svgsss/svgexport-9.svg";
  const creamSvgUrl = "src/assets/svgsss/svgexport-10.svg"; // Update with your actual SVG path
  const medicineSvgUrl = "src/assets/svgsss/svgexport-11.svg"; // Update with your actual SVG path

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorTarget.current.x = (e.clientX - rect.left) / rect.width;
    cursorTarget.current.y = (e.clientY - rect.top) / rect.height;
  };

  return (
    <div
    id="main-container"
      className="relative h-[150vh] w-screen"
      onPointerMove={handlePointerMove}
    >
      <View className="absolute w-full h-full left-0 top-0">
        <CursorSmoother cursorRef={cursorRef} cursorTarget={cursorTarget} />
        <CursorControlledCamera cursor={cursorRef.current} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          {/* Can with SVG Overlay */}
          <Can
            ref={canRef}
            position={[-2.2, 0.40000000000000003, 0]}
            rotation={[0.03, -2.86, 0.36]}
            scale={2}
          />
          <SvgOverlay 
            targetRef={canRef}
            svgUrl={canSvgUrl}
            width={200}
            height={350}
            offsetX={0}
            offsetY={1.3}
          />
          
          {/* Medicine with SVG Overlay */}
          <Medicine
            ref={medicineRef}
            position={[1, -0.8999999999999998, 0.5]} 
            rotation={[0.10000000000000026, 0.3000000000000013, 0.4999999999999998]}
            scale={1.6}
          />
          <SvgOverlayTwo 
            targetRef={medicineRef}
            svgUrl={medicineSvgUrl}
            width={200}
            height={350}
            offsetX={0.5}
            offsetY={-1}
          />
          
          {/* Cream with SVG Overlay */}
          <Cream
            ref={creamRef}
            position={[1.7000000000000017, 1.8000000000000032, 0.10000000000000003]}
            rotation={[1.3000000000000027, -1.1999999999999955, 1.0999999999999983]}
            scale={1.2999999999999998}
          />
          <SvgOverlayThree 
            targetRef={creamRef}
            svgUrl={creamSvgUrl}
            width={200}
            height={350}
            offsetX={0.6}
            offsetY={-0.5}
          />
        </Float>
        <Environment files="/hdr/lobby.hdr" environmentIntensity={2.2} />
        <ambientLight intensity={0.8} color="#FFFFFF" />
      </View>
      <Hero />
    </div>
  );
}

export default Canvass;