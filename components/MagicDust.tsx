
import React, { useEffect } from 'react';

declare var gsap: any;

const MagicDust: React.FC = () => {
  useEffect(() => {
    const end_panel = document.querySelector("#panel") as HTMLElement;
    const end_cv = document.getElementById("magic-dust") as HTMLCanvasElement;
    if (!end_cv || !end_panel) return;
    
    const end_ctx = end_cv.getContext("2d");
    if (!end_ctx) return;

    let end_cvWidth = parseInt(window.getComputedStyle(end_panel).width, 10);
    let end_cvHeight = parseInt(window.getComputedStyle(end_panel).height, 10);
    const resolution = window.devicePixelRatio || 1;
    let sprites: any[] = [];
    const toRad = Math.PI / 180;

    const resizeCv = () => {
      end_cvWidth = parseInt(window.getComputedStyle(end_panel).width, 10);
      end_cvHeight = parseInt(window.getComputedStyle(end_panel).height, 10);
      end_cv.width = end_cvWidth * resolution;
      end_cv.height = end_cvHeight * resolution;
      end_cv.style.width = end_cvWidth + "px";
      end_cv.style.height = end_cvHeight + "px";
      end_ctx.scale(resolution, resolution);
    };

    const randomNr = (min: number, max?: number) => {
      if (max === undefined) { max = min; min = 0; }
      return min + (max - min) * Math.random();
    };

    const randomInt = (min: number, max?: number) => {
      if (max === undefined) { max = min; min = 0; }
      return Math.floor(min + (max - min + 1) * Math.random());
    };

    const createStar = (w: number, h: number) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return canvas;
      canvas.width = w * resolution;
      canvas.height = h * resolution;
      const radius = w / 2;
      const gradient = context.createRadialGradient(radius, radius, 0, radius, radius, radius);
      
      // Star colors: white, cyan, light purple
      const rand = Math.random();
      if (rand > 0.8) {
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.4)");
      } else if (rand > 0.5) {
        gradient.addColorStop(0, "rgba(168, 240, 255, 0.9)");
        gradient.addColorStop(0.2, "rgba(168, 240, 255, 0.3)");
      } else {
        gradient.addColorStop(0, "rgba(216, 180, 254, 0.8)");
        gradient.addColorStop(0.2, "rgba(216, 180, 254, 0.2)");
      }
      
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, w, h);
      return canvas;
    };

    const createSprite = (x?: number, y?: number, isMouse?: boolean) => {
      const size = isMouse ? randomInt(4, 8) : randomInt(2, 6);
      const texture = createStar(size * 4, size * 4);
      const duration = isMouse ? randomNr(1, 3) : randomNr(10, 30);
      
      const tl = gsap.timeline({
        repeat: isMouse ? 0 : -1,
        repeatDelay: isMouse ? 0 : randomNr(2)
      });

      const sprite = {
        texture: texture,
        width: size * 4,
        height: size * 4,
        alpha: 0,
        rotation: 0,
        scale: isMouse ? 1 : randomNr(0.5, 1.5),
        x: x || randomNr(0, end_cvWidth),
        y: y || randomNr(0, end_cvHeight),
      };

      if (isMouse) {
        tl.to(sprite, { alpha: 1, duration: 0.2 })
          .to(sprite, {
            x: sprite.x + (Math.random() - 0.5) * 100,
            y: sprite.y + (Math.random() - 0.5) * 100,
            alpha: 0,
            duration: duration,
            ease: "power1.out"
          });
      } else {
        // Slow drifting stars
        tl.fromTo(sprite, { alpha: 0 }, { alpha: randomNr(0.3, 1), duration: 2 })
          .to(sprite, {
            x: sprite.x + (Math.random() - 0.5) * 200,
            y: sprite.y + (Math.random() - 0.5) * 200,
            duration: duration,
            ease: "none"
          }, 0)
          .to(sprite, { alpha: 0, duration: 2 }, duration - 2);
      }

      return sprite;
    };

    const renderCv = () => {
      end_ctx.clearRect(0, 0, end_cvWidth, end_cvHeight);
      for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        if (!sprite.alpha) continue;
        end_ctx.save();
        end_ctx.translate(sprite.x, sprite.y);
        end_ctx.scale(sprite.scale, sprite.scale);
        end_ctx.globalAlpha = sprite.alpha;
        end_ctx.drawImage(sprite.texture, -sprite.width / 2, -sprite.height / 2);
        end_ctx.restore();
      }
    };

    resizeCv();
    for (let i = 0; i < 80; i++) {
      sprites.push(createSprite());
    }

    gsap.ticker.add(renderCv);

    const handleMouseMove = (e: MouseEvent) => {
      const scrollPos = window.scrollY;
      for (let i = 0; i < 2; i++) {
        sprites.push(createSprite(e.clientX, e.clientY, true));
      }
      if (sprites.length > 250) sprites.splice(0, 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCv);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCv);
      gsap.ticker.remove(renderCv);
    };
  }, []);

  return null;
};

export default MagicDust;
