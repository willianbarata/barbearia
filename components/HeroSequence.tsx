"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  frames: string[];
  headline: string;
  subheadline: string;
  supporting: string;
  whatsappUrl: string;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function HeroSequence({ frames, headline, subheadline, supporting, whatsappUrl }: Props) {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);
  const [loadedPct, setLoadedPct] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const frameSrc = useMemo(() => frames.filter(Boolean), [frames]);
  const frameCount = frameSrc.length;

  function resizeCanvas() {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const rect = sticky.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctxRef.current = ctx;
  }

  function drawFrame(index: number, progress01: number) {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!ctx || !canvas || !img) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    ctx.fillStyle = "#0b0b0c";
    ctx.fillRect(0, 0, w, h);

    const zoom = 1 + easeOutCubic(progress01) * 0.08;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom;
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function updateFromScroll() {
    rafRef.current = null;
    if (!isReady) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const start = wrapper.offsetTop;
    const scrollLen = Math.max(1, wrapper.offsetHeight - window.innerHeight);
    const progress = clamp01((window.scrollY - start) / scrollLen);

    const nextFrame = Math.min(frameCount - 1, Math.max(0, Math.round(progress * (frameCount - 1))));
    if (nextFrame === lastFrameRef.current) return;

    lastFrameRef.current = nextFrame;
    drawFrame(nextFrame, progress);
  }

  useEffect(() => {
    if (frameCount <= 0) return;

    let cancelled = false;
    let loaded = 0;

    imagesRef.current = frameSrc.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
      img.onload = () => {
        loaded += 1;
        if (cancelled) return;
        setLoadedPct(Math.round((loaded / frameCount) * 100));
        if (loaded === 1) setIsReady(true);
        if (loaded === frameCount) setIsReady(true);
      };
      return img;
    });

    return () => {
      cancelled = true;
      imagesRef.current = [];
    };
  }, [frameCount, frameSrc]);

  useEffect(() => {
    resizeCanvas();
    const onResize = () => {
      resizeCanvas();
      updateFromScroll();
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;
    resizeCanvas();
    updateFromScroll();

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, frameCount]);

  return (
    <section ref={wrapperRef} className="heroWrap" aria-label="Transformação">
      <div ref={stickyRef} className="heroSticky">
        <canvas ref={canvasRef} className="heroCanvas" aria-hidden="true" />
        <div className="heroOverlay" aria-hidden="true" />
        <div className="heroLights" aria-hidden="true" />

        <div className="container heroInner">
          <div className="heroCopy">
            <p className="heroKicker">Cavalheiro Barbearia</p>
            <h1 className="h1">{headline}</h1>
            <p className="heroSub">{subheadline}</p>
            <p className="heroSupport">{supporting}</p>
            <div className="heroCtas">
              <a className="btn btnGold" href={whatsappUrl} target="_blank" rel="noreferrer">
                Agendar horário
              </a>
              <a className="btn btnGhost" href={whatsappUrl} target="_blank" rel="noreferrer">
                Falar no WhatsApp
              </a>
            </div>
            <div className="heroMeta">
              <span className="pill">São José do Rio Preto - SP</span>
              <span className="pill">Premium • Masculino • Sofisticado</span>
            </div>
          </div>
        </div>

        {!isReady && (
          <div className="heroLoading" aria-live="polite">
            <div className="heroLoadingBox">
              <div className="heroLoadingTitle">Preparando a transformação</div>
              <div className="heroBar">
                <div className="heroBarFill" style={{ width: `${loadedPct}%` }} />
              </div>
              <div className="heroLoadingPct">{loadedPct}%</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
