import { useEffect, useRef } from 'react';

export class PerformanceMonitor {
  private frameCount = 0;
  private fps = 0;
  private lastTime = performance.now();

  update() {
    const now = performance.now();
    this.frameCount++;

    if (now - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
      this.frameCount = 0;
      this.lastTime = now;

      if (this.fps < 30) {
        this.reduceQuality();
      }
    }
  }

  private reduceQuality() {
    document.body.classList.add('low-performance');
  }

  getFPS() {
    return this.fps;
  }
}

export const usePerformanceMonitor = () => {
  const monitorRef = useRef(new PerformanceMonitor());

  useEffect(() => {
    const performanceLoop = () => {
      monitorRef.current.update();
      requestAnimationFrame(performanceLoop);
    };

    const animationId = requestAnimationFrame(performanceLoop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return monitorRef.current;
};