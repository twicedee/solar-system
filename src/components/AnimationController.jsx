import { useFrame } from '@react-three/fiber'
import React from 'react'

export default function AnimationController({ isPaused, setElapsed }) {
    useFrame((state, delta) => {
        if (!isPaused) {
            setElapsed((elapsed) => elapsed + delta);
        }
    });
    return null;
}
