import React, { forwardRef, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, Color } from "three";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

// Convert to forwardRef to expose the ref to parent components
export const Medicine = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('public/model/MedicineNew.glb')
  const groupRef = useRef();
  const color = new Color("#EDE7E2");
  
  const material = new MeshStandardMaterial({
      color,
    });

  const stroke = new MeshStandardMaterial({
      color: "black",
    });
  
  useGSAP(() => {
    if (groupRef.current) {
        gsap.to(groupRef.current.rotation, {
          y: 0.54,
          z: 1.91,
          scrollTrigger: {
            trigger: "#main-container",
            start: "top 10%",
            end: "bottom -10%",
            scrub: 1,
            // markers: true,
          },
        });
  
        gsap.to(groupRef.current.position, {
          y: -3,
          scrollTrigger: {
            trigger: "#main-container",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            // markers: true,
          },
        });
      }
  }, []);
  
  return (
    <group {...props} ref={(node) => {
      groupRef.current = node;
      if (ref) {
        if (typeof ref === 'function') ref(node);
        else ref.current = node;
      }
    }} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh.geometry}
          material={material}
        />
        <mesh geometry={nodes.Mesh.geometry} scale={[1.03, 1.03, 1]}>
          <meshBasicMaterial color={"black"} side={THREE.BackSide} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={stroke}
        />
      </group>
    </group>
  )
});

useGLTF.preload('public/model/MedicineNew.glb')

export default Medicine;