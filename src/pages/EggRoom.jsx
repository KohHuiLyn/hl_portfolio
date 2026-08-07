import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/eggRoom.css';

const WORLD = { width: 800, height: 600 };
const START = { x: 400, y: 555 };
const EXIT_Y = 570;
const TREE_DEPTH_Y = 292;
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
const MAN_GONE_DIALOG = ['* Was there once a man?'];
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

function canStand(x, y) {
  const inCorridor = x >= 323 && x <= 477 && y >= 398 && y <= 590;
  const inLowerStep = x >= 270 && x <= 530 && y >= 350 && y <= 405;
  const inMainRoom = x >= 217 && x <= 583 && y >= 192 && y <= 350;
  const inUpperStep = x >= 270 && x <= 530 && y >= 145 && y <= 192;
  const treeTrunk = x >= 330 && x <= 470 && y >= 135 && y <= 292;
  return (inCorridor || inLowerStep || inMainRoom || inUpperStep) && !treeTrunk;
}

function getTreeDialog(x, y, manHasLeft) {
  if (x < 285 || x > 515 || y < 145 || y > 395) return null;
  if (manHasLeft) return MAN_GONE_DIALOG;
  if (y >= TREE_DEPTH_Y && y <= 395) return FRONT_TREE_DIALOG;
  if (y >= 145 && y < TREE_DEPTH_Y) return BEHIND_TREE_DIALOG;
  return null;
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
  const keys = useRef(new Set());
  const touchDirection = useRef(null);
  const positionRef = useRef(START);
  const dialogOpenRef = useRef(false);
  const dialogLinesRef = useRef([]);
  const dialogIndexRef = useRef(0);
  const displayedTextRef = useRef('');
  const manHasLeftRef = useRef(false);
  const audioRef = useRef(null);
  const textAudioRef = useRef(null);
  const itemAudioRef = useRef(null);
  const textSoundActiveRef = useRef(false);

  const startMusic = () => {
    audioRef.current?.play().catch(() => {});
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
    const lines = getTreeDialog(x, y, manHasLeftRef.current);
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
    const textAudio = textAudioRef.current;
    if (!textAudio) return;
    const isTyping = dialogOpen && displayedText.length < currentDialogText.length;
    const isPunctuationPause = /[,.]$/.test(displayedText);
    const shouldPlayTextSound = isTyping && !isPunctuationPause;
    textSoundActiveRef.current = shouldPlayTextSound;
    if (shouldPlayTextSound) {
      textAudio.play().catch(() => {});
      return;
    }
    textAudio.pause();
    textAudio.currentTime = 0;
  }, [currentDialogText, dialogOpen, displayedText]);

  useEffect(() => {
    const musicAudio = audioRef.current;
    const textAudio = textAudioRef.current;
    if (!textAudio) return undefined;
    if (musicAudio) musicAudio.volume = 0.8;
    textAudio.volume = 0.6;
    const keepLooping = window.setInterval(() => {
      if (!textSoundActiveRef.current || !textAudio.paused) return;
      textAudio.currentTime = 0;
      textAudio.play().catch(() => {});
    }, 50);
    return () => window.clearInterval(keepLooping);
  }, []);

  useEffect(() => {
    document.body.classList.add('egg-room-body');
    return () => document.body.classList.remove('egg-room-body');
  }, []);

  useEffect(() => {
    const keyDown = (event) => {
      if (event.code === 'KeyX' && dialogOpenRef.current) {
        event.preventDefault();
        skipDialogText();
        return;
      }
      if (event.code === 'KeyZ') {
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
          if (canStand(x + dx * distance, y)) x += dx * distance;
          if (canStand(x, y + dy * distance)) y += dy * distance;
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
  };

  return (
    <main className="egg-page" aria-label="The Egg Room">
      <audio ref={audioRef} src="/assets/egg-room/egg.mp3" loop preload="auto" />
      <audio ref={textAudioRef} src="/assets/egg-room/test.mp3" loop preload="auto" />
      <audio ref={itemAudioRef} src="/assets/egg-room/snd_item.wav" preload="auto" />
      <div className="egg-world-wrap">
        <div className="egg-world" style={{ '--world-width': WORLD.width, '--world-height': WORLD.height }}>
          <div className="egg-floor" />
          <img className="egg-tree" src="/assets/egg-room/tree.gif" alt="A strange red tree" draggable="false" />
          <div
            className={`egg-player ${moving ? 'is-moving' : ''} ${position.y < TREE_DEPTH_Y ? 'is-behind-tree' : ''}`}
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

      <p className="egg-hint">arrow keys / wasd&nbsp;&nbsp;·&nbsp;&nbsp;z: interact</p>
      <div className="egg-controls" aria-label="Movement controls">
        <button onPointerDown={startTouch(DIRECTIONS.ArrowUp)} onPointerUp={stopTouch} onPointerCancel={stopTouch} aria-label="Move up">▲</button>
        <button onPointerDown={startTouch(DIRECTIONS.ArrowLeft)} onPointerUp={stopTouch} onPointerCancel={stopTouch} aria-label="Move left">◀</button>
        <button onPointerDown={startTouch(DIRECTIONS.ArrowDown)} onPointerUp={stopTouch} onPointerCancel={stopTouch} aria-label="Move down">▼</button>
        <button onPointerDown={startTouch(DIRECTIONS.ArrowRight)} onPointerUp={stopTouch} onPointerCancel={stopTouch} aria-label="Move right">▶</button>
      </div>
      <div className="egg-actions" aria-label="Action controls">
        <button onPointerDown={(event) => { event.preventDefault(); skipDialogText(); }} aria-label="Finish dialogue text">X</button>
        <button onPointerDown={(event) => { event.preventDefault(); interact(); }} aria-label="Interact">Z</button>
      </div>
    </main>
  );
}
