import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/eggRoom.css';

const WORLD = { width: 800, height: 600 };
const START = { x: 400, y: 555 };
const EXIT_Y = 570;
const TREE_DEPTH_Y = 292;
const SEAL_POSITION = { x: 535, y: 320 };
const EGG_COOKIE_NAME = 'egg';
const EGG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const FRONT_TREE_DIALOG = ['* There is a man behind the tree.'];
const EGG_RECEIVED_DIALOG_INDEX = 2;
const BEHIND_TREE_DIALOG = [
  '* Well, there is a man here.',
  '* He offers you something.',
  '* You received an Egg.',
  '* He asks you to hire the developer of this portfolio if you have any projects...',
  '* Any project that\'s very...',
  '* very...',
  '* interesting...',
  '* He waves goodbye.',
];
const MAN_GONE_DIALOG = ['* A lonely tree stands here.'];
const SEAL_DIALOG = ['* do u haf projects 4 me...', '* ples projects'];
const INTERACT_KEYS = new Set(['KeyZ', 'Enter', 'NumpadEnter']);
const SKIP_KEYS = new Set(['KeyX', 'ShiftLeft', 'ShiftRight']);
const DIRECTIONS = {
  ArrowUp: [0, -1, 'up'],
  KeyW: [0, -1, 'up'],
  ArrowDown: [0, 1, 'down'],
  KeyS: [0, 1, 'down'],
  ArrowLeft: [-1, 0, 'left'],
  KeyA: [-1, 0, 'left'],
  ArrowRight: [1, 0, 'right'],
  KeyD: [1, 0, 'right'],
};

function canStand(x, y, hasEgg = false) {
  const inCorridor = x >= 323 && x <= 477 && y >= 398 && y <= 590;
  const inLowerStep = x >= 270 && x <= 530 && y >= 350 && y <= 405;
  const inMainRoom = x >= 217 && x <= 583 && y >= 192 && y <= 350;
  const inUpperStep = x >= 270 && x <= 530 && y >= 145 && y <= 192;
  const treeTrunk = x >= 330 && x <= 470 && y >= 135 && y <= 292;
  const sealBody = hasEgg
    && Math.abs(x - SEAL_POSITION.x) <= 28
    && Math.abs(y - SEAL_POSITION.y) <= 24;
  return (inCorridor || inLowerStep || inMainRoom || inUpperStep) && !treeTrunk && !sealBody;
}

function getTreeDialog(x, y, manHasLeft) {
  if (x < 285 || x > 515 || y < 145 || y > 395) return null;
  if (manHasLeft) return MAN_GONE_DIALOG;
  if (y >= TREE_DEPTH_Y && y <= 395) return FRONT_TREE_DIALOG;
  if (y >= 145 && y < TREE_DEPTH_Y) return BEHIND_TREE_DIALOG;
  return null;
}

function getSealDialog(x, y, hasEgg) {
  if (!hasEgg) return null;
  return Math.hypot(x - SEAL_POSITION.x, y - SEAL_POSITION.y) <= 82
    ? SEAL_DIALOG
    : null;
}

function hasStoredEgg() {
  if (typeof document === 'undefined') return false;
  return document.cookie
    .split(';')
    .some((cookie) => cookie.trim() === `${EGG_COOKIE_NAME}=1`);
}

function storeEgg() {
  document.cookie = `${EGG_COOKIE_NAME}=1; Max-Age=${EGG_COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function EggRoom() {
  const navigate = useNavigate();
  const [position, setPosition] = useState(START);
  const [facing, setFacing] = useState('up');
  const [walkFrame, setWalkFrame] = useState(1);
  const [moving, setMoving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLines, setDialogLines] = useState([]);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [hasEgg] = useState(hasStoredEgg);
  const keys = useRef(new Set());
  const touchDirection = useRef(null);
  const positionRef = useRef(START);
  const dialogOpenRef = useRef(false);
  const dialogLinesRef = useRef([]);
  const dialogIndexRef = useRef(0);
  const displayedTextRef = useRef('');
  const hasEggRef = useRef(hasEgg);
  const manHasLeftRef = useRef(hasEgg);
  const audioRef = useRef(null);
  const itemAudioRef = useRef(null);
  const textAudioDataRef = useRef(null);
  const textAudioContextRef = useRef(null);
  const textAudioBufferRef = useRef(null);
  const textAudioDecodePromiseRef = useRef(null);
  const textAudioGainRef = useRef(null);
  const textAudioSourceRef = useRef(null);
  const textAudioLoopRef = useRef({ start: 0, end: 0 });
  const textAudioSuspendTimerRef = useRef(null);
  const textSoundActiveRef = useRef(false);

  const clearTextAudioSuspendTimer = () => {
    if (textAudioSuspendTimerRef.current === null) return;
    window.clearTimeout(textAudioSuspendTimerRef.current);
    textAudioSuspendTimerRef.current = null;
  };

  const suspendTextAudioContext = () => {
    clearTextAudioSuspendTimer();
    const context = textAudioContextRef.current;
    if (context?.state === 'running') context.suspend().catch(() => {});
  };

  const scheduleTextAudioSuspend = () => {
    clearTextAudioSuspendTimer();
    textAudioSuspendTimerRef.current = window.setTimeout(() => {
      textAudioSuspendTimerRef.current = null;
      if (!textSoundActiveRef.current && !textAudioSourceRef.current) suspendTextAudioContext();
    }, 750);
  };

  const stopTextSound = (scheduleSuspend = true) => {
    const source = textAudioSourceRef.current;
    if (source) {
      textAudioSourceRef.current = null;
      source.onended = null;
      try {
        source.stop();
      } catch {
        // The source may already have stopped.
      }
      source.disconnect();
    }
    if (scheduleSuspend) scheduleTextAudioSuspend();
  };

  const startTextSound = () => {
    if (!textSoundActiveRef.current) return;
    clearTextAudioSuspendTimer();
    const context = textAudioContextRef.current;
    const buffer = textAudioBufferRef.current;
    const gain = textAudioGainRef.current;
    if (!context || !buffer || !gain || textAudioSourceRef.current) return;

    const beginPlayback = () => {
      if (
        !textSoundActiveRef.current
        || textAudioContextRef.current !== context
        || textAudioSourceRef.current
      ) return;
      const source = context.createBufferSource();
      const loop = textAudioLoopRef.current;
      source.buffer = buffer;
      source.loop = true;
      source.loopStart = loop.start;
      source.loopEnd = loop.end;
      source.connect(gain);
      source.onended = () => {
        if (textAudioSourceRef.current === source) textAudioSourceRef.current = null;
      };
      textAudioSourceRef.current = source;
      source.start(0, loop.start);
    };

    if (context.state === 'running') {
      beginPlayback();
      return;
    }
    if (context.state === 'suspended' || context.state === 'interrupted') {
      context.resume().then(beginPlayback).catch(() => {});
    }
  };

  const decodeTextAudio = (context) => {
    if (
      !textAudioDataRef.current
      || textAudioBufferRef.current
      || textAudioDecodePromiseRef.current
    ) return;

    const decodePromise = context.decodeAudioData(textAudioDataRef.current.slice(0))
      .then((buffer) => {
        if (textAudioContextRef.current !== context) return;
        const threshold = 0.0005;
        const channels = Array.from(
          { length: buffer.numberOfChannels },
          (_, channel) => buffer.getChannelData(channel),
        );
        let firstAudibleSample = 0;
        let lastAudibleSample = buffer.length - 1;
        let foundFirst = false;

        for (let sample = 0; sample < buffer.length && !foundFirst; sample += 1) {
          if (channels.some((channel) => Math.abs(channel[sample]) >= threshold)) {
            firstAudibleSample = sample;
            foundFirst = true;
          }
        }

        let foundLast = false;
        for (let sample = buffer.length - 1; sample >= firstAudibleSample && !foundLast; sample -= 1) {
          if (channels.some((channel) => Math.abs(channel[sample]) >= threshold)) {
            lastAudibleSample = sample;
            foundLast = true;
          }
        }

        const padding = Math.round(buffer.sampleRate * 0.002);
        textAudioLoopRef.current = {
          start: Math.max(0, firstAudibleSample - padding) / buffer.sampleRate,
          end: Math.min(buffer.length, lastAudibleSample + padding + 1) / buffer.sampleRate,
        };
        textAudioBufferRef.current = buffer;
        if (textSoundActiveRef.current) startTextSound();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (textAudioDecodePromiseRef.current === decodePromise) {
          textAudioDecodePromiseRef.current = null;
        }
      });
    textAudioDecodePromiseRef.current = decodePromise;
  };

  const unlockTextAudio = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    clearTextAudioSuspendTimer();
    let context = textAudioContextRef.current;
    if (!context || context.state === 'closed') {
      context = new AudioContextClass();
      const gain = context.createGain();
      gain.gain.value = 1.2;
      gain.connect(context.destination);
      textAudioContextRef.current = context;
      textAudioGainRef.current = gain;
      textAudioBufferRef.current = null;
      textAudioDecodePromiseRef.current = null;
    }

    // Starting a silent buffer within the gesture reliably unlocks Web Audio on iOS Safari.
    const silentSource = context.createBufferSource();
    silentSource.buffer = context.createBuffer(1, 1, 22050);
    silentSource.connect(context.destination);
    silentSource.start(0);
    decodeTextAudio(context);

    const afterResume = () => {
      if (textSoundActiveRef.current) startTextSound();
      else scheduleTextAudioSuspend();
    };
    if (context.state === 'running') afterResume();
    else context.resume().then(afterResume).catch(() => {});
  };

  const startMusic = () => {
    audioRef.current?.play().catch(() => {});
    unlockTextAudio();
  };

  const skipDialogText = () => {
    if (!dialogOpenRef.current) return;
    const currentLine = dialogLinesRef.current[dialogIndexRef.current] ?? '';
    displayedTextRef.current = currentLine;
    setDisplayedText(currentLine);
  };

  const interact = () => {
    startMusic();
    if (dialogOpenRef.current) {
      const lines = dialogLinesRef.current;
      const index = dialogIndexRef.current;
      const currentLine = lines[index] ?? '';
      if (displayedTextRef.current.length < currentLine.length) {
        displayedTextRef.current = currentLine;
        setDisplayedText(currentLine);
        return;
      }
      if (index < lines.length - 1) {
        const nextIndex = index + 1;
        if (lines === BEHIND_TREE_DIALOG && nextIndex === EGG_RECEIVED_DIALOG_INDEX) {
          storeEgg();
          const itemAudio = itemAudioRef.current;
          if (itemAudio) {
            itemAudio.currentTime = 0;
            itemAudio.play().catch(() => {});
          }
        }
        dialogIndexRef.current = nextIndex;
        displayedTextRef.current = '';
        setDialogIndex(nextIndex);
        setDisplayedText('');
        return;
      }
      if (lines === BEHIND_TREE_DIALOG) manHasLeftRef.current = true;
      dialogOpenRef.current = false;
      setDialogOpen(false);
      return;
    }
    const { x, y } = positionRef.current;
    const lines = getSealDialog(x, y, hasEggRef.current)
      ?? getTreeDialog(x, y, manHasLeftRef.current);
    if (lines) {
      keys.current.clear();
      dialogOpenRef.current = true;
      dialogLinesRef.current = lines;
      dialogIndexRef.current = 0;
      displayedTextRef.current = '';
      setDialogLines(lines);
      setDialogIndex(0);
      setDisplayedText('');
      setDialogOpen(true);
    }
  };

  const currentDialogText = dialogLines[dialogIndex] ?? '';
  const sealIsSpeaking = dialogOpen
    && dialogLines === SEAL_DIALOG
    && displayedText.length < currentDialogText.length
    && !/[,.]$/.test(displayedText);
  const sealSprite = sealIsSpeaking && Math.floor(displayedText.length / 2) % 2 === 1
    ? '/assets/egg-room/seal2.png'
    : '/assets/egg-room/seal1.png';

  useEffect(() => {
    if (!dialogOpen || displayedText.length >= currentDialogText.length) return undefined;
    const pauseAfterPeriod = displayedText.endsWith('.');
    const pauseAfterComma = displayedText.endsWith(',');
    const timeout = window.setTimeout(() => {
      const nextText = currentDialogText.slice(0, displayedText.length + 1);
      displayedTextRef.current = nextText;
      setDisplayedText(nextText);
    }, pauseAfterPeriod ? 480 : pauseAfterComma ? 240 : 42);
    return () => window.clearTimeout(timeout);
  }, [currentDialogText, dialogOpen, displayedText]);

  useEffect(() => {
    const isTyping = dialogOpen && displayedText.length < currentDialogText.length;
    const isPunctuationPause = /[,.]$/.test(displayedText);
    const shouldPlayTextSound = isTyping && !isPunctuationPause;
    textSoundActiveRef.current = shouldPlayTextSound;
    if (shouldPlayTextSound) {
      startTextSound();
      return;
    }
    stopTextSound();
  }, [currentDialogText, dialogOpen, displayedText]);

  useEffect(() => {
    const musicAudio = audioRef.current;
    if (musicAudio) musicAudio.volume = 0.6;
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/assets/egg-room/test.wav', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load text sound: ${response.status}`);
        return response.arrayBuffer();
      })
      .then((audioData) => {
        textAudioDataRef.current = audioData;
        const context = textAudioContextRef.current;
        if (context && context.state !== 'closed') decodeTextAudio(context);
      })
      .catch((error) => {
        if (!controller.signal.aborted) console.error(error);
      });

    return () => {
      controller.abort();
      clearTextAudioSuspendTimer();
      stopTextSound(false);
      const context = textAudioContextRef.current;
      textAudioDataRef.current = null;
      textAudioBufferRef.current = null;
      textAudioDecodePromiseRef.current = null;
      textAudioGainRef.current = null;
      textAudioContextRef.current = null;
      if (context && context.state !== 'closed') context.close().catch(() => {});
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const context = textAudioContextRef.current;
      if (!context) return;
      if (document.visibilityState === 'hidden') {
        clearTextAudioSuspendTimer();
        stopTextSound(false);
        if (context.state === 'running') context.suspend().catch(() => {});
        return;
      }
      if (textSoundActiveRef.current) startTextSound();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    document.body.classList.add('egg-room-body');
    return () => document.body.classList.remove('egg-room-body');
  }, []);

  useEffect(() => {
    const keyDown = (event) => {
      if (SKIP_KEYS.has(event.code) && dialogOpenRef.current) {
        event.preventDefault();
        skipDialogText();
        return;
      }
      if (INTERACT_KEYS.has(event.code)) {
        event.preventDefault();
        if (!event.repeat) interact();
        return;
      }
      if (!DIRECTIONS[event.code]) return;
      event.preventDefault();
      startMusic();
      if (dialogOpenRef.current) return;
      keys.current.add(event.code);
    };
    const keyUp = (event) => {
      if (!DIRECTIONS[event.code]) return;
      keys.current.delete(event.code);
    };
    const clearKeys = () => keys.current.clear();
    window.addEventListener('keydown', keyDown, { passive: false });
    window.addEventListener('keyup', keyUp);
    window.addEventListener('blur', clearKeys);
    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      window.removeEventListener('blur', clearKeys);
    };
  }, []);

  useEffect(() => {
    let frame;
    let previous = performance.now();
    const tick = (now) => {
      const held = [...keys.current].map((key) => DIRECTIONS[key]).filter(Boolean);
      if (touchDirection.current && !dialogOpenRef.current) held.push(touchDirection.current);
      let dx = held.reduce((sum, direction) => sum + direction[0], 0);
      let dy = held.reduce((sum, direction) => sum + direction[1], 0);
      const isMoving = dx !== 0 || dy !== 0;
      setMoving(isMoving);
      setWalkFrame(isMoving ? (Math.floor(now / 120) % 4) + 1 : 1);

      if (isMoving) {
        const last = held[held.length - 1];
        setFacing(last[2]);
        const length = Math.hypot(dx, dy);
        dx /= length;
        dy /= length;
        if (dy > 0 && positionRef.current.y >= EXIT_Y) {
          keys.current.clear();
          touchDirection.current = null;
          navigate('/');
          return;
        }
        const distance = Math.min(now - previous, 32) * 0.19;
        setPosition((current) => {
          let x = current.x;
          let y = current.y;
          if (canStand(x + dx * distance, y, hasEggRef.current)) x += dx * distance;
          if (canStand(x, y + dy * distance, hasEggRef.current)) y += dy * distance;
          const next = { x, y };
          positionRef.current = next;
          return next;
        });
      }
      previous = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [navigate]);

  const startTouch = (direction) => (event) => {
    event.preventDefault();
    startMusic();
    if (dialogOpenRef.current) return;
    touchDirection.current = direction;
  };
  const stopTouch = (event) => {
    event.preventDefault();
    touchDirection.current = null;
    if (event.type === 'pointerup') startMusic();
  };

  return (
    <main className="egg-page" aria-label="The Egg Room">
      <audio ref={audioRef} src="/assets/egg-room/egg.mp3" loop preload="auto" />
      <audio ref={itemAudioRef} src="/assets/egg-room/snd_item.wav" preload="auto" />
      <div className="egg-world-wrap">
        <div className="egg-world" style={{ '--world-width': WORLD.width, '--world-height': WORLD.height }}>
          <div className="egg-floor" />
          <img className="egg-tree" src="/assets/egg-room/tree.gif" alt="A strange red tree" draggable="false" />
          {hasEgg && (
            <img
              className="egg-seal"
              src={sealSprite}
              alt="A small seal"
              draggable="false"
              style={{
                left: `${(SEAL_POSITION.x / WORLD.width) * 100}%`,
                top: `${(SEAL_POSITION.y / WORLD.height) * 100}%`,
              }}
            />
          )}
          <div
            className={`egg-player ${moving ? 'is-moving' : ''} ${position.y < TREE_DEPTH_Y ? 'is-behind-tree' : ''} ${hasEgg && position.y >= TREE_DEPTH_Y && position.y < SEAL_POSITION.y ? 'is-behind-seal' : ''}`}
            style={{ left: `${(position.x / WORLD.width) * 100}%`, top: `${(position.y / WORLD.height) * 100}%` }}
          >
            <img src={`/assets/egg-room/kris-walk/${facing}-${walkFrame}.png`} alt="Kris" draggable="false" />
          </div>
        </div>
      </div>

      {dialogOpen && (
        <button className="egg-dialog" type="button" onClick={interact} aria-label="Continue dialogue">
          <img src="/assets/egg-room/dialog-box.png" alt="" />
          <span>{displayedText}</span>
        </button>
      )}

      <p className="egg-hint">arrows / wasd · z / enter: interact · x / shift: skip</p>
      <div className="egg-controls" aria-label="Movement controls">
        <button onPointerDown={startTouch(DIRECTIONS.ArrowUp)} onPointerUp={stopTouch} onPointerCancel={stopTouch} aria-label="Move up">▲</button>
        <button onPointerDown={startTouch(DIRECTIONS.ArrowLeft)} onPointerUp={stopTouch} onPointerCancel={stopTouch} aria-label="Move left">◀</button>
        <button onPointerDown={startTouch(DIRECTIONS.ArrowDown)} onPointerUp={stopTouch} onPointerCancel={stopTouch} aria-label="Move down">▼</button>
        <button onPointerDown={startTouch(DIRECTIONS.ArrowRight)} onPointerUp={stopTouch} onPointerCancel={stopTouch} aria-label="Move right">▶</button>
      </div>
      <div className="egg-actions" aria-label="Action controls">
        <button onClick={() => { startMusic(); skipDialogText(); }} aria-label="Finish dialogue text">X</button>
        <button onClick={interact} aria-label="Interact">Z</button>
      </div>
    </main>
  );
}
