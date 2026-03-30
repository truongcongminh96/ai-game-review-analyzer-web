import type {Transition, Variants} from 'framer-motion';

export const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const motionDurations = {
    micro: 0.18,
    lift: 0.24,
    card: 0.32,
    reveal: 0.56,
    aurora: 18,
    auroraAlt: 24,
} as const;

export const hoverLiftTransition: Transition = {
    duration: motionDurations.lift,
    ease: motionEase,
};

export const parallaxSpring = {
    type: 'spring',
    stiffness: 180,
    damping: 20,
    mass: 0.9,
} as const;

export function revealVariant(delay = 0, y = 28, blur = 10): Variants {
    return {
        hidden: {
            opacity: 0,
            y,
            filter: `blur(${blur}px)`,
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: motionDurations.reveal,
                delay,
                ease: motionEase,
            },
        },
    };
}

export function staggerVariant(staggerChildren = 0.08, delayChildren = 0): Variants {
    return {
        hidden: {},
        visible: {
            transition: {
                staggerChildren,
                delayChildren,
            },
        },
    };
}
