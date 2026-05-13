import { useEffect, useMemo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import timerAnim from "../../public/images/lottie/timer-glow.json";

type Props = { minutes: number; onFinish?: () => void };

export default function PomodoroRing({ minutes, onFinish }: Props) {
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  const totalSeconds = useMemo(() => minutes * 60, [minutes]);
  const [seconds, setSeconds] = useState(totalSeconds);
  const controls = useAnimation();

  useEffect(() => {
    setSeconds(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      controls.start({ rotate: 360, transition: { duration: 0.6 } });
      onFinish?.();
      return;
    }
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds, controls, onFinish]);

  const progress = ((totalSeconds - seconds) / totalSeconds) * circ;

  return (
    <div className="flex flex-col items-center">
      <Lottie animationData={timerAnim} style={{ width: 180 }} loop={false} />
      <svg className="w-40 h-40 -mt-20">
        <circle cx={radius + 5} cy={radius + 5} r={radius} stroke="#e5e7eb" strokeWidth={8} fill="none" />
        <motion.circle
          cx={radius + 5}
          cy={radius + 5}
          r={radius}
          stroke="#6366f1"
          strokeWidth={8}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={circ - progress}
          strokeLinecap="round"
          animate={controls}
        />
      </svg>
      <div className="mt-2 text-2xl font-mono">
        {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}
      </div>
    </div>
  );
}
