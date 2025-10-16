import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Planet3DProps {
  position: [number, number, number];
  type: 'gas' | 'ice' | 'rocky';
  size?: number;
  rotationSpeed?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  color?: string;
  modelUrl?: string; // chemin du modèle GLB (ex: '/models/earth.glb')
}

// Préchargement des modèles courants
(useGLTF as any).preload?.('/models/mars.glb');
(useGLTF as any).preload?.('/models/earth.glb');

export const Planet3D = ({ 
  position, 
  type, 
  size = 0.5, 
  rotationSpeed = 0.5,
  orbitRadius = 0,
  orbitSpeed = 0.2,
  color = '#ffffff',
  modelUrl
}: Planet3DProps) => {
  const planetRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  // Charger le modèle (Mars par défaut)
  const url = modelUrl ?? '/models/mars.glb';
  const gltf = useGLTF(url) as any;
  const scene: THREE.Group | undefined = gltf?.scene;
  if (scene && !('__normalized' in scene)) {
    // Nettoyage léger du modèle (évite NaN si un noeud a une scale invalide).
    // On NE MODIFIE PAS les couleurs/matériaux natifs; on clone simplement pour éviter le sharing.
    scene.traverse((obj: any) => {
      if (obj?.isMesh) {
        obj.castShadow = false;
        obj.receiveShadow = false;
        if (Array.isArray(obj.material)) {
          obj.material = obj.material.map((m: any) => (m?.clone ? m.clone() : m));
        } else if (obj.material?.clone) {
          obj.material = obj.material.clone();
        }
        if (obj.geometry && !obj.geometry.boundingSphere) {
          try {
            obj.geometry.computeBoundingSphere();
          } catch {}
        }
      }
      if (obj.scale) {
        const sx = Number(obj.scale.x) || 1;
        const sy = Number(obj.scale.y) || 1;
        const sz = Number(obj.scale.z) || 1;
        obj.scale.set(sx, sy, sz);
      }
    });
    (scene as any).__normalized = true;
  }
  console.log('Modèle chargé:', url, scene);

  const normalizedScene = useMemo<THREE.Object3D | undefined>(() => {
    if (!scene) return undefined;
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const sizeVec = new THREE.Vector3();
    box.getSize(sizeVec);
    const maxSide = Math.max(sizeVec.x, sizeVec.y, sizeVec.z) || 1;
    const scaleToUnit = 1 / maxSide;
    root.scale.setScalar(scaleToUnit);
    const center = new THREE.Vector3();
    box.getCenter(center);
    root.position.sub(center); // centre le modèle à l'origine
    // Harmoniser l'espace colorimétrique des textures pour éviter les dominantes
    root.traverse((obj: any) => {
      if (obj?.isMesh && obj.material) {
        const setTextureSpaces = (m: any) => {
          const colorTexKeys = ['map', 'emissiveMap'];
          const dataTexKeys = ['metalnessMap', 'roughnessMap', 'aoMap', 'normalMap', 'displacementMap', 'bumpMap', 'glossinessMap', 'specularMap'];
          colorTexKeys.forEach((k) => {
            if (m[k]) {
              try { m[k].colorSpace = THREE.SRGBColorSpace; m[k].needsUpdate = true; } catch {}
            }
          });
          dataTexKeys.forEach((k) => {
            if (m[k]) {
              try { m[k].colorSpace = THREE.LinearSRGBColorSpace; m[k].needsUpdate = true; } catch {}
            }
          });
          // Laisser la teinte et l'emissive du GLB intactes, mais éviter une emissive trop forte par défaut
          if ('emissiveIntensity' in m && typeof m.emissiveIntensity === 'number' && m.emissiveIntensity > 1) {
            m.emissiveIntensity = 1;
          }
        };
        if (Array.isArray(obj.material)) obj.material.forEach(setTextureSpaces);
        else setTextureSpaces(obj.material);
      }
    });
    return root;
  }, [scene, url]);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      planetRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.3;
    }
    
    if (orbitRef.current && orbitRadius > 0) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * orbitSpeed;
    }
  });

  const getPlanetColor = () => {
    switch (type) {
      case 'gas':
        return '#ff6b35';
      case 'ice':
        return '#b3e5fc';
      case 'rocky':
        return '#8d6e63';
      default:
        return color;
    }
  };

  // Vérifier que le modèle est chargé
  if (!scene || !normalizedScene) {
    return null;
  }

  return (
    <group ref={orbitRef} position={position}>
      <group position={[orbitRadius, 0, 0]}>
        <group ref={planetRef} scale={[size, size, size]}>
          <primitive object={normalizedScene} />
        </group>
      </group>
    </group>
  );
};

// Composant pour un système planétaire
export const PlanetarySystem = ({ position, systemType }: { position: [number, number, number], systemType: 'solar' | 'exotic' }) => {
  const planets = useMemo(() => {
    if (systemType === 'solar') {
      return [
        { type: 'rocky' as const, position: [0, 0, 0] as [number, number, number], size: 0.3, color: '#8d6e63', orbitRadius: 0 },
        { type: 'rocky' as const, position: [0, 0, 0] as [number, number, number], size: 0.25, color: '#ff5722', orbitRadius: 1.5, orbitSpeed: 0.8 },
        { type: 'gas' as const, position: [0, 0, 0] as [number, number, number], size: 0.6, color: '#ff6b35', orbitRadius: 3, orbitSpeed: 0.4 },
        { type: 'ice' as const, position: [0, 0, 0] as [number, number, number], size: 0.4, color: '#b3e5fc', orbitRadius: 5, orbitSpeed: 0.2 },
      ];
    } else {
      return [
        { type: 'gas' as const, position: [0, 0, 0] as [number, number, number], size: 0.8, color: '#ff1744', orbitRadius: 0 },
        { type: 'ice' as const, position: [0, 0, 0] as [number, number, number], size: 0.3, color: '#00bcd4', orbitRadius: 2, orbitSpeed: 0.6 },
        { type: 'rocky' as const, position: [0, 0, 0] as [number, number, number], size: 0.2, color: '#795548', orbitRadius: 3.5, orbitSpeed: 0.9 },
        { type: 'gas' as const, position: [0, 0, 0] as [number, number, number], size: 0.5, color: '#9c27b0', orbitRadius: 6, orbitSpeed: 0.15 },
      ];
    }
  }, [systemType]);

  return (
    <group position={position}>
      {planets.map((planet, index) => (
        <Planet3D
          key={index}
          {...planet}
          rotationSpeed={0.3 + index * 0.1}
        />
      ))}
    </group>
  );
};