import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  WebGLRenderer,
  Scene as ThreeScene, // Alias Scene from three as ThreeScene
  Color,
  FogExp2,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  PointLight,
  PlaneGeometry,
  MeshPhysicalMaterial,
  CanvasTexture,
  Mesh,
  Vector3,
  Raycaster,
  Vector2,
  SRGBColorSpace,
  DoubleSide,
} from 'three';
import styled from 'styled-components';

const Scene = () => {
  const canvasRef = useRef(null);
  const titlesContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const titlesContainer = titlesContainerRef.current;
    if (!canvas || !titlesContainer) return;

    // Three.js setup
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new ThreeScene(); // Use aliased ThreeScene
    scene.background = new Color(0x000);
    scene.fog = new FogExp2(0x000, 0.08);

    const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const ambientLight = new AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    const pointLight = new PointLight(0xffffff, 2, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Settings
    const settings = {
      wheelSensitivity: 0.01,
      touchSensitivity: 0.01,
      momentumMultiplier: 2.5,
      smoothing: 0.2,
      slideLerp: 0.15,
      distortionDecay: 0.95,
      maxDistortion: 4.0,
      distortionSensitivity: 0.25,
      distortionSmoothing: 0.15,
      rotationFactor: 0.2,
      animationSpeed: 0.5,
      textFadeStart: 1.6,
      textFadeEnd: 2.1,
      textMaxBlur: 5,
      distortionIntensity: 0.3,
      horizontalDistortionDamping: 0.3,
      momentumDistortionBoost: 0.3,
      directionInfluence: 0.4,
      waveAmplitudeBoost: 0.2,
      directionChangeThreshold: 0.02,
      directionSmoothing: 0.03,
      hoverLerpSpeed: 0.3,
      hoverCursorDelay: 1000,
    };

    // Slide setup
    const slideWidth = 3.2;
    const slideHeight = 1.8;
    const gap = 0.25;
    const slideCount = 5;
    const totalWidth = slideCount * (slideWidth + gap);
    const slideUnit = slideWidth + gap;

    const textContents = [
      { title: '', text: 'Password Hashing', offset: { x: -10, y: 35 }, id: 'card1' },
      { title: '', text: 'RSA Algorithm', offset: { x: -20, y: 30 }, id: 'card2' },
      { title: '', text: 'Wireshark Sim', offset: { x: -20, y: 30 }, id: 'card3' },
      { title: '', text: 'IoT Scanner', offset: { x: -30, y: 25 }, id: 'card4' },
      { title: '', text: 'AI Misuses', offset: { x: -25, y: 30 }, id: 'card5' },
    ];

    const slides = [];
    const titleElements = [];

    // Create titles
    for (let i = 0; i < slideCount; i++) {
      const textIndex = i % textContents.length;
      const textInfo = textContents[textIndex];
      const titleEl = document.createElement('div');
      titleEl.className = 'slide-title';
      const titleText = document.createElement('h2');
      titleText.className = 'title-text';
      titleText.textContent = textInfo.title;
      const titleNumber = document.createElement('p');
      titleNumber.className = 'title-number';
      titleNumber.textContent = `0${i + 1}`;
      titleEl.appendChild(titleText);
      titleEl.appendChild(titleNumber);
      titleEl.style.opacity = '0';
      titleEl.style.filter = 'blur(0px)';
      titlesContainer.appendChild(titleEl);
      titleElements.push({ element: titleEl, offset: textInfo.offset, index: i });
    }

    // Create canvas texture for text
    const createTextTexture = (text) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 288;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#333333';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 40px "PP Neue Montreal"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      const texture = new CanvasTexture(canvas);
      texture.colorSpace = SRGBColorSpace;
      return texture;
    };

    // Create slides with text
    const createSlide = (index) => {
      const geometry = new PlaneGeometry(slideWidth, slideHeight, 64, 32);
      const textIndex = index % textContents.length;
      const textInfo = textContents[textIndex];
      const material = new MeshPhysicalMaterial({
        map: createTextTexture(textInfo.text),
        side: DoubleSide,
        metalness: 0.2,
        roughness: 0.8,
        clearcoat: 0.4,
        clearcoatRoughness: 0.3,
        emissive: 0x000000,
        emissiveIntensity: 1.0,
      });
      const mesh = new Mesh(geometry, material);
      mesh.position.x = index * (slideWidth + gap);
      mesh.userData = {
        originalVertices: [...geometry.attributes.position.array],
        index,
        time: Math.random() * 1000,
        waveSpeed: 0.5 + Math.random() * 0.5,
        waveAmplitude: 1.0,
        wavePhase: Math.random() * Math.PI * 2,
        id: textInfo.id,
        baseScale: new Vector3(1, 1, 1),
        baseLightIntensity: 2,
        targetScale: 1.0,
        currentScale: 1.0,
        targetEmissiveIntensity: 1.0,
        currentEmissiveIntensity: 1.0,
        hoverStartTime: null,
      };
      scene.add(mesh);
      slides.push(mesh);
    };

    for (let i = 0; i < slideCount; i++) {
      createSlide(i);
    }

    slides.forEach((slide) => {
      slide.position.x -= totalWidth / 2;
      slide.userData.targetX = slide.position.x;
      slide.userData.currentX = slide.position.x;
      slide.rotation.x = (Math.random() - 0.5) * 0.1;
      slide.rotation.y = (Math.random() - 0.5) * 0.1;
    });

    // Event handlers
    let isDragging = false;
    let dragStartX = 0;
    let dragLastX = 0;
    let touchStartX = 0;
    let touchLastX = 0;
    let currentPosition = 0;
    let targetPosition = 0;
    let isScrolling = false;
    let autoScrollSpeed = 0;
    let lastTime = 0;
    let globalTime = 0;
    let currentDistortionFactor = 0;
    let targetDistortionFactor = 0;
    let peakVelocity = 0;
    let velocityHistory = [0, 0, 0, 0, 0];
    let lastDeltaX = 0;
    let movementDirection = new Vector2(0, 0);
    let lastMovementInput = 0;
    let accumulatedMovement = 0;
    let mouseDownTime = 0;
    let mouseDownPos = { x: 0, y: 0 };
    const clickThreshold = 5;
    const clickTimeThreshold = 300;

    const raycaster = new Raycaster();
    const mouse = new Vector2();
    let hoveredSlide = null;

    const updateHoverEffect = (event) => {
      if (isDragging) return;
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(slides);
      const currentTime = performance.now();

      slides.forEach((slide) => {
        slide.userData.targetScale = 1.0;
        slide.userData.targetEmissiveIntensity = 1.0;
        slide.userData.hoverStartTime = null;
      });

      if (intersects.length > 0) {
        const newHoveredSlide = intersects[0].object;
        if (hoveredSlide !== newHoveredSlide) {
          newHoveredSlide.userData.hoverStartTime = currentTime;
          hoveredSlide = newHoveredSlide;
        } else {
          if (hoveredSlide.userData.hoverStartTime && (currentTime - hoveredSlide.userData.hoverStartTime) >= settings.hoverCursorDelay) {
            canvas.style.cursor = 'pointer';
          }
        }
        hoveredSlide.userData.targetScale = 1.1;
        hoveredSlide.userData.targetEmissiveIntensity = 1.5;
      } else {
        hoveredSlide = null;
        canvas.style.cursor = 'grab';
      }
    };

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      pointLight.position.x = mouseX * 3;
      pointLight.position.y = mouseY * 2;
      updateHoverEffect(e);

      if (!isDragging) return;
      const deltaX = e.clientX - dragLastX;
      lastDeltaX = deltaX;
      accumulatedMovement += deltaX;
      const now = performance.now();
      const timeDelta = now - lastMovementInput;
      if (Math.abs(accumulatedMovement) > 1 || timeDelta > 50) {
        dragLastX = e.clientX;
        const dragStrength = Math.abs(accumulatedMovement) * 0.02;
        targetDistortionFactor = Math.min(1.0, targetDistortionFactor + dragStrength);
        targetPosition -= accumulatedMovement * settings.touchSensitivity;
        accumulatedMovement = 0;
        lastMovementInput = now;
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragLastX = dragStartX;
      mouseDownTime = performance.now();
      mouseDownPos = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      canvas.style.cursor = hoveredSlide && (performance.now() - hoveredSlide.userData.hoverStartTime >= settings.hoverCursorDelay) ? 'pointer' : 'grab';
      const mouseUpTime = performance.now();
      const deltaX = e.clientX - mouseDownPos.x;
      const deltaY = e.clientY - mouseDownPos.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const timeElapsed = mouseUpTime - mouseDownTime;

      if (distance < clickThreshold && timeElapsed < clickTimeThreshold && hoveredSlide) {
        navigate(`/card/${hoveredSlide.userData.id}`);
      }

      const velocity = (dragLastX - dragStartX) * 0.005;
      if (Math.abs(velocity) > 0.5) {
        autoScrollSpeed = -velocity * settings.momentumMultiplier * 0.05;
        targetDistortionFactor = Math.min(1.0, Math.abs(velocity) * 3 * settings.distortionSensitivity);
        isScrolling = true;
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const wheelStrength = Math.abs(e.deltaY) * 0.001;
      targetDistortionFactor = Math.min(1.0, targetDistortionFactor + wheelStrength);
      targetPosition -= e.deltaY * settings.wheelSensitivity;
      isScrolling = true;
      autoScrollSpeed = Math.min(Math.abs(e.deltaY) * 0.0005, 0.05) * Math.sign(e.deltaY);
      movementDirection.x = Math.sign(e.deltaY) * -1;
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchLastX = touchStartX;
      mouseDownTime = performance.now();
      mouseDownPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      isScrolling = false;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const deltaX = touchX - touchLastX;
      lastDeltaX = deltaX;
      accumulatedMovement += deltaX;
      const now = performance.now();
      const timeDelta = now - lastMovementInput;
      if (Math.abs(accumulatedMovement) > 1 || timeDelta > 50) {
        touchLastX = touchX;
        const touchStrength = Math.abs(accumulatedMovement) * 0.02;
        targetDistortionFactor = Math.min(1.0, targetDistortionFactor + touchStrength);
        targetPosition -= accumulatedMovement * settings.touchSensitivity;
        accumulatedMovement = 0;
        lastMovementInput = now;
        isScrolling = true;
      }
    };

    const handleTouchEnd = (e) => {
      const touchUpTime = performance.now();
      const deltaX = touchLastX - mouseDownPos.x;
      const deltaY = e.changedTouches[0].clientY - mouseDownPos.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const timeElapsed = touchUpTime - mouseDownTime;

      if (distance < clickThreshold && timeElapsed < clickTimeThreshold && hoveredSlide) {
        navigate(`/card/${hoveredSlide.userData.id}`);
      }

      const velocity = (touchLastX - touchStartX) * 0.005;
      if (Math.abs(velocity) > 0.5) {
        autoScrollSpeed = -velocity * settings.momentumMultiplier * 0.05;
        targetDistortionFactor = Math.min(1.0, Math.abs(velocity) * 3 * settings.distortionSensitivity);
        movementDirection.x = Math.sign(velocity) * -1;
        isScrolling = true;
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        targetPosition += slideUnit;
        targetDistortionFactor = Math.min(1.0, targetDistortionFactor + 0.4);
        movementDirection.x = 1;
      } else if (e.key === 'ArrowRight') {
        targetPosition -= slideUnit;
        targetDistortionFactor = Math.min(1.0, targetDistortionFactor + 0.4);
        movementDirection.x = -1;
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateTitlePositions();
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    // Update functions
    const updateTitlePositions = () => {
      titleElements.forEach((titleObj) => {
        const slide = slides[titleObj.index];
        const { element, offset } = titleObj;
        const vector = new Vector3(slide.position.x, slide.position.y, slide.position.z);
        vector.project(camera);
        const screenX = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const screenY = (-vector.y * 0.5 + 0.5) * window.innerHeight;
        element.style.left = `${screenX}px`;
        element.style.top = `${screenY + offset.y}px`;
        const textRect = element.getBoundingClientRect();
        element.style.left = `${screenX - textRect.width / 2}px`;
        const distanceFromCenter = Math.abs(slide.position.x);
        let opacity;
        if (distanceFromCenter < settings.textFadeStart) {
          opacity = 1;
        } else if (distanceFromCenter > settings.textFadeEnd) {
          opacity = 0;
        } else {
          opacity = 1 - (distanceFromCenter - settings.textFadeStart) / (settings.textFadeEnd - settings.textFadeStart);
        }
        element.style.opacity = opacity.toFixed(2);
        const blurValue = (1 - opacity) * settings.textMaxBlur;
        element.style.filter = `blur(${blurValue}px)`;
      });
    };

    const updateDistortion = (mesh, distortionFactor, deltaTime) => {
      mesh.userData.time += deltaTime * settings.animationSpeed * mesh.userData.waveSpeed;
      const time = mesh.userData.time;
      const positionAttribute = mesh.geometry.attributes.position;
      const originalVertices = mesh.userData.originalVertices;
      const momentumBoost = Math.min(1.0, peakVelocity * settings.momentumDistortionBoost);
      const targetWaveAmplitude = 1.0 + momentumBoost * settings.waveAmplitudeBoost * 3.0;
      mesh.userData.waveAmplitude = mesh.userData.waveAmplitude || 1.0;
      mesh.userData.waveAmplitude += (targetWaveAmplitude - mesh.userData.waveAmplitude) * 0.05;
      const effectiveDistortion = distortionFactor * settings.distortionIntensity;
      const gravityCenterX = Math.sin(time * 0.1) * 0.5;
      const gravityCenterY = Math.cos(time * 0.15) * 0.3;
      const gravityStrength = Math.min(2.0, Math.max(0, effectiveDistortion)) * 2.0;
      const dx = mesh.userData.targetX - mesh.userData.currentX;
      const dxAbs = Math.abs(dx);
      if (dxAbs > settings.directionChangeThreshold) {
        const newDirection = dx > 0 ? -1 : 1;
        const directionBlend = Math.min(1.0, settings.directionSmoothing * (1 + dxAbs * 5));
        movementDirection.x += (newDirection - movementDirection.x) * directionBlend;
      }
      const velocityScale = Math.min(1.0, peakVelocity * 2);
      const effectiveDirectionInfluence = settings.directionInfluence * velocityScale;
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = originalVertices[i * 3];
        const y = originalVertices[i * 3 + 1];
        const z = originalVertices[i * 3 + 2];
        const distX = x - gravityCenterX;
        const distY = y - gravityCenterY;
        const dist = Math.sqrt(distX * distX + distY * distY + 0.0001);
        const gravityFactor = Math.min(1, 1 / (1 + dist * 8));
        const dirWaveX = movementDirection.x * Math.sin(dist * 5 + time) * effectiveDirectionInfluence;
        const dirWaveY = movementDirection.y * Math.cos(dist * 5 + time) * (effectiveDirectionInfluence * 0.3);
        const pullX = distX * gravityFactor * gravityStrength * 0.5;
        const pullY = distY * gravityFactor * gravityStrength * 0.5;
        const stretchFactor = effectiveDistortion * 0.3 * velocityScale;
        const stretchX = movementDirection.x * stretchFactor * (1 - Math.min(1, Math.abs(y)));
        const stretchY = movementDirection.y * stretchFactor * (1 - Math.min(1, Math.abs(x)));
        const waveScale = mesh.userData.waveAmplitude;
        const phase = mesh.userData.wavePhase;
        const pulse = Math.sin(time + dist * 3 + phase) * 0.05 * effectiveDistortion * waveScale;
        const twistAmount = effectiveDistortion * 0.1 * gravityFactor * velocityScale;
        const twistX = -y * twistAmount;
        const twistY = x * twistAmount;
        const horizontalDamping = settings.horizontalDistortionDamping * (1 - velocityScale * 0.3);
        const newX = x + Math.min(1, Math.max(-1, (pullX + stretchX + twistX + dirWaveX) * horizontalDamping));
        const newY = y + Math.min(1, Math.max(-1, pullY + stretchY + twistY + dirWaveY));
        const newZ = Math.min(2, Math.max(-2, (gravityFactor * gravityStrength + pulse) * (1 + Math.min(5, dist))));
        positionAttribute.setXYZ(i, newX, newY, newZ);
      }
      positionAttribute.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
      const targetRotFactor = Math.min(0.2, effectiveDistortion) * settings.rotationFactor * (1 + momentumBoost * 0.5);
      mesh.userData.currentRotFactor = mesh.userData.currentRotFactor || 0;
      mesh.userData.currentRotFactor += (targetRotFactor - mesh.userData.currentRotFactor) * 0.1;
      const rotFactor = mesh.userData.currentRotFactor;
      mesh.rotation.x = Math.sin(time * 0.2) * 0.1 * rotFactor;
      mesh.rotation.y = Math.sin(time * 0.3 + 0.5) * 0.1 * rotFactor;
      mesh.rotation.z = rotFactor * 0.05 * Math.sin(time * 0.1);
    };

    const updateCamera = (time) => {
      const amplitude = 0;
      const frequency = 0.2;
      camera.position.y = Math.sin(time * frequency) * amplitude;
      camera.position.x = Math.cos(time * frequency * 0.7) * amplitude * 0.5;
      camera.lookAt(0, 0, 0);
    };

    const animate = (time) => {
      const deltaTime = lastTime ? (time - lastTime) / 1000 : 0.016;
      lastTime = time;
      globalTime += deltaTime;

      pointLight.color.set(0xffffff);
      const prevPos = currentPosition;
      if (isScrolling) {
        targetPosition += autoScrollSpeed;
        const speedBasedDecay = 0.97 - Math.abs(autoScrollSpeed) * 0.5;
        autoScrollSpeed *= Math.max(0.92, speedBasedDecay);
        if (Math.abs(autoScrollSpeed) < 0.001) {
          autoScrollSpeed = 0;
        }
      }

      const positionDelta = Math.abs(targetPosition - currentPosition);
      const adaptiveSmoothing = settings.smoothing * (positionDelta < 0.1 ? 0.5 : 1.0);
      currentPosition += (targetPosition - currentPosition) * adaptiveSmoothing;

      const currentVelocity = Math.abs(currentPosition - prevPos) / deltaTime;
      const significantVelocity = currentVelocity > 0.01 ? currentVelocity : 0;
      velocityHistory.push(significantVelocity);
      velocityHistory.shift();
      const weights = [0.1, 0.15, 0.2, 0.25, 0.3];
      let weightSum = 0;
      let weightedVelocity = 0;
      for (let i = 0; i < velocityHistory.length; i++) {
        weightedVelocity += velocityHistory[i] * weights[i];
        weightSum += weights[i];
      }
      const avgVelocity = weightSum > 0 ? weightedVelocity / weightSum : 0;

      if (avgVelocity > peakVelocity) {
        peakVelocity += (avgVelocity - peakVelocity) * 0.3;
        const accelerationBoost = Math.min(0.1, avgVelocity * 0.03);
        targetDistortionFactor = Math.min(settings.maxDistortion, targetDistortionFactor + accelerationBoost);
      }
      const velocityRatio = avgVelocity / (peakVelocity + 0.001);
      const isDecelerating = velocityRatio < 0.7 && peakVelocity > 0.3;
      peakVelocity *= 0.98;
      const movementDistortion = Math.min(1.0, currentVelocity * currentVelocity * 2);
      if (currentVelocity > 0.03) {
        const blendFactor = Math.min(0.2, currentVelocity);
        targetDistortionFactor += (movementDistortion - targetDistortionFactor) * blendFactor;
      }
      if (isDecelerating) {
        targetDistortionFactor *= settings.distortionDecay * 1.01;
      } else if (avgVelocity < 0.1) {
        targetDistortionFactor *= settings.distortionDecay * 0.9;
      }
      const distortionDelta = Math.abs(targetDistortionFactor - currentDistortionFactor);
      const adaptiveDistortionSmoothing = settings.distortionSmoothing * (distortionDelta < 0.05 ? 0.5 : 1.0);
      currentDistortionFactor += (targetDistortionFactor - currentDistortionFactor) * adaptiveDistortionSmoothing;

      slides.forEach((slide) => {
        slide.userData.currentScale += (slide.userData.targetScale - slide.userData.currentScale) * settings.hoverLerpSpeed;
        slide.scale.set(slide.userData.currentScale, slide.userData.currentScale, slide.userData.currentScale);
        slide.userData.currentEmissiveIntensity += (slide.userData.targetEmissiveIntensity - slide.userData.currentEmissiveIntensity) * settings.hoverLerpSpeed;
        slide.material.emissiveIntensity = slide.userData.currentEmissiveIntensity;
      });

      if (hoveredSlide) {
        pointLight.intensity = hoveredSlide.userData.baseLightIntensity * (1.0 + 0.5 * (hoveredSlide.userData.currentScale - 1.0) / 0.1);
      } else {
        pointLight.intensity = slides[0].userData.baseLightIntensity;
      }

      updateCamera(globalTime);
      slides.forEach((slide, i) => {
        let baseX = i * slideUnit - currentPosition;
        baseX = ((baseX % totalWidth) + totalWidth) % totalWidth;
        if (baseX > totalWidth / 2) {
          baseX -= totalWidth;
        }
        if (Math.abs(baseX - slide.userData.targetX) > slideWidth * 2) {
          slide.userData.currentX = baseX;
        }
        slide.userData.targetX = baseX;
        slide.userData.currentX += (slide.userData.targetX - slide.userData.currentX) * settings.slideLerp;
        if (Math.abs(slide.userData.currentX) < totalWidth / 2 + slideWidth * 1.5) {
          slide.position.x = slide.userData.currentX;
          slide.position.z = Math.abs(slide.position.x) * -0.05;
          updateDistortion(slide, currentDistortionFactor, deltaTime);
        }
      });

      updateTitlePositions();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.addEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      titlesContainer.innerHTML = '';
    };
  }, [navigate]);

  return (
    <>
      <Canvas ref={canvasRef} />
      <TitlesContainer ref={titlesContainerRef} />
    </>
  );
};

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  cursor: grab;
  opacity: 1;
  transition: opacity 0.5s ease;

  &:active {
    cursor: grabbing;
  }
`;

const TitlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 1;
  transition: opacity 0.5s ease;

  .slide-title {
    position: absolute;
    color: white;
    pointer-events: none;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }

  .title-text {
    font-family: 'PP Neue Montreal', sans-serif;
    text-transform: uppercase;
    font-size: 6vw;
    line-height: 0.9;
    font-weight: 400;
    letter-spacing: -0.03em;
    margin: 0;
    white-space: nowrap;
  }

  .title-number {
    font-family: 'TheGoodMonolith', monospace;
    font-size: 0.8vw;
    margin: 0;
    position: relative;
    padding-top: 10px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: block;
      width: 40px;
      height: 3px;
      background-color: #ffe600;
      margin-right: 10px;
    }
  }
`;

export default Scene;