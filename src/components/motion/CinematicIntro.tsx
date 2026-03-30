import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {useEffect, useState} from 'react';

function CinematicIntro() {
    const reduceMotion = useReducedMotion();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const duration = reduceMotion ? 420 : 1500;
        const previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';

        const timer = window.setTimeout(() => {
            setVisible(false);
            document.documentElement.style.overflow = previousOverflow;
        }, duration);

        return () => {
            window.clearTimeout(timer);
            document.documentElement.style.overflow = previousOverflow;
        };
    }, [reduceMotion]);

    return (
        <AnimatePresence>
            {visible ? (
                <motion.div
                    className="cinematic-intro"
                    aria-hidden="true"
                    initial={{opacity: 1}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0, transition: {duration: 0.3, ease: 'easeOut'}}}
                >
                    <motion.div
                        className="cinematic-letterbox cinematic-letterbox-top"
                        initial={{height: '50vh'}}
                        animate={{height: '0vh'}}
                        transition={{
                            duration: reduceMotion ? 0.35 : 1.05,
                            ease: [0.22, 1, 0.36, 1],
                            delay: reduceMotion ? 0 : 0.18,
                        }}
                    />

                    <motion.div
                        className="cinematic-letterbox cinematic-letterbox-bottom"
                        initial={{height: '50vh'}}
                        animate={{height: '0vh'}}
                        transition={{
                            duration: reduceMotion ? 0.35 : 1.05,
                            ease: [0.22, 1, 0.36, 1],
                            delay: reduceMotion ? 0 : 0.18,
                        }}
                    />

                    <motion.div
                        className="cinematic-intro-caption"
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: reduceMotion ? 0 : [0, 1, 1, 0], y: reduceMotion ? 0 : [8, 0, 0, -6]}}
                        transition={{
                            duration: reduceMotion ? 0.2 : 1.15,
                            ease: 'easeOut',
                            times: reduceMotion ? undefined : [0, 0.18, 0.72, 1],
                        }}
                    >
                        REVIEW THEATER ONLINE
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default CinematicIntro;
