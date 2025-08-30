// Memory Pool for Particles - Performance optimization
export class ParticlePool {
  private pool: HTMLElement[] = [];
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.initPool();
  }

  private initPool() {
    for (let i = 0; i < this.maxSize; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      this.pool.push(particle);
    }
  }

  get(): HTMLElement {
    return this.pool.pop() || this.createParticle();
  }

  release(particle: HTMLElement) {
    if (this.pool.length < this.maxSize) {
      particle.style.display = 'none';
      particle.removeAttribute('style');
      particle.className = 'particle';
      this.pool.push(particle);
    }
  }

  private createParticle(): HTMLElement {
    const particle = document.createElement('div');
    particle.className = 'particle';
    return particle;
  }
}

export const particlePool = new ParticlePool();