import React, { forwardRef, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, Color } from "three";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export const Cream = forwardRef((props, ref) => {
  const { nodes } = useGLTF('public/model/CreamNew.glb')
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
        x: 0.42,
        y: -2.24,
        z: 0.92,
        scrollTrigger: {
          trigger: "#main-container",
          start: "top top",
          end: "bottom 20%",
          scrub: 1,
          // markers: true,
        },
      });

      gsap.to(groupRef.current.position, {
        y: 0.5,
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

useGLTF.preload('public/model/CreamNew.glb')

export default Cream;