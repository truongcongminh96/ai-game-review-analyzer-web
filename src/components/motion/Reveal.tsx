import {motion, useReducedMotion} from 'framer-motion';
import type {CSSProperties, ReactNode} from 'react';
import {revealVariant, staggerVariant} from '../../motion/animations';

type MotionRevealProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    delay?: number;
    y?: number;
    blur?: number;
    amount?: number;
    once?: boolean;
};

type MotionStaggerProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    amount?: number;
    once?: boolean;
    staggerChildren?: number;
    delayChildren?: number;
};

export function MotionReveal({
    children,
    className,
    style,
    delay = 0,
    y = 28,
    blur = 10,
    amount = 0.18,
    once = true,
}: MotionRevealProps) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            className={className}
            style={style}
            initial="hidden"
            whileInView="visible"
            viewport={{once, amount}}
            variants={revealVariant(delay, y, blur)}
        >
            {children}
        </motion.div>
    );
}

export function MotionStagger({
    children,
    className,
    style,
    amount = 0.18,
    once = true,
    staggerChildren = 0.08,
    delayChildren = 0,
}: MotionStaggerProps) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            className={className}
            style={style}
            initial="hidden"
            whileInView="visible"
            viewport={{once, amount}}
            variants={staggerVariant(staggerChildren, delayChildren)}
        >
            {children}
        </motion.div>
    );
}
