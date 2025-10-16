import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, MeshDistortMaterial, Sphere, useTexture, shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, DepthOfField, Glitch, Noise } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import * as THREE from 'three';
import * as random from 'maath/random';
import { extend } from '@react-three/fiber';
import { Planet3D, PlanetarySystem } from './Planet3D';

// Shader personnalisé pour effet holographique
const HolographicMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color('#00d9ff'),
    uColor2: new THREE.Color('#ff00ff'),
    uColor3: new THREE.Color('#00ff88'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      float displacement = sin(position.x * 5.0 + uTime) * 0.1;
      displacement += sin(position.y * 3.0 + uTime * 0.5) * 0.1;
      pos += normal * displacement;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec3 color = mix(uColor1, uColor2, sin(vUv.y * 10.0 + uTime) * 0.5 + 0.5);
      color = mix(color, uColor3, sin(vUv.x * 10.0 + uTime * 0.5) * 0.5 + 0.5);
      
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      color += fresnel * 0.5;
      
      float scanline = sin(vUv.y * 100.0 + uTime * 5.0) * 0.1;
      color += scanline;
      
      float alpha = 0.7 + sin(uTime + vUv.y * 5.0) * 0.3;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ HolographicMaterial });

const StarField = () => {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => random.inSphere(new Float32Array(15000), { radius: 2 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += Math.sin(state.clock.elapsedTime + i) * 0.0001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00d9ff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const WaveGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value = [
        Math.sin(state.clock.elapsedTime * 0.5) * 0.5,
        Math.cos(state.clock.elapsedTime * 0.3) * 0.5,
      ];
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      
      float dist = distance(pos.xy, uMouse * 10.0);
      float wave1 = sin(pos.x * 3.0 + uTime * 2.0) * 0.15;
      float wave2 = sin(pos.y * 4.0 + uTime * 1.5) * 0.15;
      float wave3 = sin(dist * 2.0 - uTime * 3.0) * 0.2;
      
      float elevation = wave1 + wave2 + wave3;
      pos.z += elevation;
      
      vElevation = elevation;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vec3 color1 = vec3(0.0, 0.85, 1.0);
      vec3 color2 = vec3(1.0, 0.0, 1.0);
      vec3 color3 = vec3(0.0, 1.0, 0.53);
      vec3 color4 = vec3(1.0, 0.67, 0.0);
      
      float mixValue = vElevation * 5.0 + 0.5;
      vec3 color = mix(color1, color2, sin(mixValue + uTime));
      color = mix(color, color3, cos(mixValue * 0.5 + uTime * 0.5));
      color = mix(color, color4, sin(mixValue * 0.3 + uTime * 0.7));
      
      float alpha = 0.4 + abs(vElevation) * 3.0;
      
      float grid = max(
        step(0.98, fract(vUv.x * 50.0)),
        step(0.98, fract(vUv.y * 50.0))
      );
      
      color = mix(color, vec3(1.0), grid * 0.3);
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[25, 25, 150, 150]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: [0, 0] },
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const FloatingGeometry = ({ position, geometry, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      
      const newY = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.8;
      const newX = position[0] + Math.cos(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.set(newX, newY, position[2]);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        {geometry === 'box' && <boxGeometry args={[0.6, 0.6, 0.6]} />}
        {geometry === 'sphere' && <sphereGeometry args={[0.35, 32, 32]} />}
        {geometry === 'torus' && <torusGeometry args={[0.35, 0.12, 16, 100]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[0.35]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight position={position} intensity={2} color={color} distance={3} decay={2} />
    </group>
  );
};

const CentralOrb = () => {
  const orbRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      orbRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={orbRef} args={[0.8, 64, 64]} position={[0, 0, -3]}>
      <MeshDistortMaterial
        color="#00d9ff"
        emissive="#00d9ff"
        emissiveIntensity={0.5}
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={1}
      />
    </Sphere>
  );
};

const EnergyRings = () => {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={ringsRef} position={[0, 0, -3]}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 5]}>
          <torusGeometry args={[1.5 + i * 0.3, 0.02, 16, 100]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00d9ff' : '#ff00ff'}
            transparent
            opacity={0.6 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

const HolographicSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 1, -4]}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <holographicMaterial ref={materialRef} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

export const Background3D = () => {
  const geometries = [
    { position: [-4, 1, -2], geometry: 'box', color: '#00d9ff' },
    { position: [4, 2, -3], geometry: 'sphere', color: '#ff00ff' },
    { position: [-3, -1, -4], geometry: 'torus', color: '#00ff88' },
    { position: [3, -2, -2], geometry: 'octahedron', color: '#ffaa00' },
    { position: [0, 4, -5], geometry: 'box', color: '#ff0088' },
    { position: [-5, 0, -3], geometry: 'sphere', color: '#8800ff' },
    { position: [5, -1, -4], geometry: 'torus', color: '#00ffff' },
    { position: [-2, 3, -3], geometry: 'octahedron', color: '#ff6600' },
  ];

  // Configuration des planètes
  const planets = [
    { position: [-6, 2, -8] as [number, number, number], type: 'gas' as const, size: 0.8, color: '#ff6b35' },
    { position: [6, -1, -6] as [number, number, number], type: 'ice' as const, size: 0.6, color: '#b3e5fc' },
    { position: [-8, -2, -10] as [number, number, number], type: 'rocky' as const, size: 0.5, color: '#8d6e63' },
    { position: [8, 3, -7] as [number, number, number], type: 'gas' as const, size: 0.7, color: '#9c27b0' },
    { position: [-4, -3, -12] as [number, number, number], type: 'ice' as const, size: 0.4, color: '#00bcd4' },
    { position: [4, 4, -9] as [number, number, number], type: 'rocky' as const, size: 0.6, color: '#795548' },
  ];

  // Systèmes planétaires
  const planetarySystems = [
    { position: [-10, 5, -15] as [number, number, number], systemType: 'solar' as const },
    { position: [10, -3, -12] as [number, number, number], systemType: 'exotic' as const },
    { position: [0, 6, -18] as [number, number, number], systemType: 'solar' as const },
  ];

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 5, 20]} />
        
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d9ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
        <pointLight position={[0, 10, 5]} intensity={1} color="#00ff88" />
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#ffaa00" />
        
        <StarField />
        <WaveGrid />
        <CentralOrb />
        <EnergyRings />
        <HolographicSphere />
        
        {/* Planètes individuelles */}
        {planets.map((planet, index) => (
          <Planet3D
            key={`planet-${index}`}
            position={planet.position}
            type={planet.type}
            size={planet.size}
            color={planet.color}
            rotationSpeed={0.2 + index * 0.1}
          />
        ))}
        
        {/* Systèmes planétaires */}
        {planetarySystems.map((system, index) => (
          <PlanetarySystem
            key={`system-${index}`}
            position={system.position}
            systemType={system.systemType}
          />
        ))}
        
        {geometries.map((geo, index) => (
          <FloatingGeometry key={index} {...geo} />
        ))}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        <EffectComposer>
          <Bloom
            intensity={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
          {/* <ChromaticAberration offset={[0.003, 0.003]} /> */}
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
          {/* <Noise opacity={0.03} />
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} />
          <Glitch
            delay={[8, 12]}
            duration={[0.1, 0.3]}
            strength={[0.1, 0.2]}
            mode={GlitchMode.SPORADIC}
          /> */}
        </EffectComposer>
      </Canvas>
    </div>
  );
};
