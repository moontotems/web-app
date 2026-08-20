import { Center, OrbitControls, Resize, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { Box3, Group, Mesh, MeshLambertMaterial } from 'three'
import { SkeletonUtils } from 'three-stdlib'

import { HEADER_HEIGHT } from '~/lib/constants'

import { TOTEM_MODEL_IDS, getTotemModelUrl } from '../-data'

const WALL_COLOR = '#d9d1c3'

for (const id of TOTEM_MODEL_IDS) {
  useGLTF.preload(getTotemModelUrl(id))
}

function TotemModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const prepared = useMemo(() => {
    const clone = SkeletonUtils.clone(scene)
    clone.traverse((child) => {
      if (!(child instanceof Mesh)) return
      child.castShadow = false
      child.receiveShadow = false
      child.geometry = child.geometry.clone()
      for (const name of Object.keys(child.geometry.attributes)) {
        if (name.startsWith('_')) child.geometry.deleteAttribute(name)
      }
      const previous = child.material
      child.material = new MeshLambertMaterial({ vertexColors: true, color: 0xffffff })
      if (Array.isArray(previous)) previous.forEach((material) => material.dispose())
      else previous.dispose()
    })
    return clone
  }, [scene])

  return <primitive object={prepared} />
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.08} color="#fff6ea" />
      <directionalLight
        position={[-3.2, 2.8, 3.6]}
        intensity={1.6}
        color="#fff4e5"
      />
      <directionalLight position={[3.5, 0.8, 2.5]} intensity={0.25} color="#e8d4b8" />
      <directionalLight position={[0.5, 1.2, -2]} intensity={0.4} color="#c8d4e8" />
    </>
  )
}

const WALL_GAP = 0.3

function TotemOnWall({ url }: { url: string }) {
  const maskRef = useRef<Group>(null)

  useLayoutEffect(() => {
    const mask = maskRef.current
    if (!mask) return
    mask.position.z = 0
    mask.updateWorldMatrix(true, true)
    const box = new Box3().setFromObject(mask)
    if (box.isEmpty()) return
    mask.position.z = WALL_GAP - box.min.z
  }, [url])

  return (
    <>
      <group ref={maskRef}>
        <Center disableZ cacheKey={url}>
          <group scale={2.4}>
            <Resize height>
              <TotemModel url={url} />
            </Resize>
          </group>
        </Center>
      </group>
      <mesh position={[0, 0, 0]} renderOrder={-1}>
        <planeGeometry args={[40, 24]} />
        <meshBasicMaterial
          color={WALL_COLOR}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={4}
          polygonOffsetUnits={4}
        />
      </mesh>
    </>
  )
}

export function TotemViewer({ modelUrl }: { modelUrl: string }) {
  return (
    <div
      className="w-full"
      style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)`, background: WALL_COLOR }}
    >
      <Canvas
        camera={{ fov: 40, position: [0, 0, 5.4], near: 0.05, far: 200 }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor(WALL_COLOR)
        }}
      >
        <color attach="background" args={[WALL_COLOR]} />
        <Lights />
        <Suspense fallback={null}>
          <TotemOnWall url={modelUrl} />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          target={[0, 0, 0.4]}
          minAzimuthAngle={-Math.PI * 0.4}
          maxAzimuthAngle={Math.PI * 0.4}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
        />
      </Canvas>
    </div>
  )
}
