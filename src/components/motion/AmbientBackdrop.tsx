import {motion, useReducedMotion} from 'framer-motion';
import {motionDurations} from '../../motion/animations';

function AmbientBackdrop() {
    const reduceMotion = useReducedMotion();

    return (
        <div className="ambient-backdrop" aria-hidden="true">
            <motion.div
                className="ambient-backdrop-orb ambient-backdrop-orb-primary"
                animate={
                    reduceMotion
                        ? undefined
                        : {
                            x: [0, 42, -24, 0],
                            y: [0, -18, 20, 0],
                            scale: [1, 1.08, 0.96, 1],
                        }
                }
                transition={{
                    duration: motionDurations.aurora,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="ambient-backdrop-orb ambient-backdrop-orb-secondary"
                animate={
                    reduceMotion
                        ? undefined
                        : {
                            x: [0, -32, 26, 0],
                            y: [0, 20, -24, 0],
                            scale: [1, 0.94, 1.06, 1],
                        }
                }
                transition={{
                    duration: motionDurations.auroraAlt,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="ambient-backdrop-orb ambient-backdrop-orb-accent"
                animate={
                    reduceMotion
                        ? undefined
                        : {
                            x: [0, 18, -16, 0],
                            y: [0, 26, -18, 0],
                            scale: [1, 1.04, 0.98, 1],
                        }
                }
                transition={{
                    duration: motionDurations.auroraAlt + 8,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}

export default AmbientBackdrop;
