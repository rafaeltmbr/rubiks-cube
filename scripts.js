window.addEventListener('load', () => {
  const piecesMatrix = new PiecesMatrix('.rubiks-cube');

  implementRubiksCubePiecesMovement({ piecesMatrix });
  implementRubiksCubeSideRotation({ piecesMatrix });
  implementRubiksCubeTopRotation({ piecesMatrix });
});

function implementRubiksCubePiecesMovement({ piecesMatrix }) {
  const sideAxisAngles = {
    top: { y: [25, 205], x: [155, 335] },
    front: { y: [25, 205], x: [90, 270] },
    right: { y: [335, 155], x: [90, 270] },
  };

  function allowCubeMovement(startEvent) {
    const isTouch = startEvent.touches;
    const { pageX: startX, pageY: startY } = isTouch ? startEvent.touches[0] : startEvent;
    const piece = startEvent.target;
    const location = piecesMatrix.findPieceLocation({ piece });
    let axis = '';
    let rotated = false;
    const angleInterval = 30;
    const minOffset = 16;
    const lastPageCoordinates = { x: startX, y: startY };

    function handleCubeMovement(moveEvent) {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const { pageX, pageY } = isTouch ? moveEvent.touches[0] : moveEvent;
      const offset = { x: pageX - startX, y: pageY - startY };
      lastPageCoordinates.x = pageX;
      lastPageCoordinates.y = pageY;

      movePiece({ offset });
    }

    function movePiece({ offset }) {
      if (!axis && isAtLeastAbs({ values: [offset.x, offset.y], minimum: minOffset })) {
        const angle = getAngle({ offset });
        const axisAngles = sideAxisAngles[location.side];
        if (isAngleAroundBases({ bases: axisAngles.x, angle, offset: angleInterval })) axis = 'x';
        else if (isAngleAroundBases({ bases: axisAngles.y, angle, offset: angleInterval }))
          axis = 'y';
      }

      if (axis && !rotated) {
        const angle = axis === 'x' ? (offset.y >= 0 ? -90 : 90) : offset.x >= 0 ? 90 : -90;
        piecesMatrix.rotatePiece({ piece, axis, angle });
        rotated = true;
        endCubeMovement();
      }
    }

    function endCubeMovement() {
      window.removeEventListener(isTouch ? 'touchmove' : 'mousemove', handleCubeMovement);
      window.removeEventListener(isTouch ? 'touchend' : 'mouseup', endCubeMovement);
    }

    window.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleCubeMovement, {
      passive: false,
    });
    window.addEventListener(isTouch ? 'touchend' : 'mouseup', endCubeMovement, {
      passive: false,
    });
  }

  piecesMatrix.pieces.forEach((piece) => piece.addEventListener('mousedown', allowCubeMovement));
  piecesMatrix.pieces.forEach((piece) => piece.addEventListener('touchstart', allowCubeMovement));
}

function implementRubiksCubeSideRotation({ piecesMatrix }) {
  const rotateRight = document.querySelector('.main-container .controls .rotate-right');
  const rotateLeft = document.querySelector('.main-container .controls .rotate-left');

  function rotateRightHandler() {
    piecesMatrix._matrix.front.forEach((row) => {
      const piece = row[0];
      piecesMatrix.rotatePiece({ piece: piece[0], axis: 'y', angle: 90 });
    });
  }

  function rotateLeftHandler() {
    piecesMatrix._matrix.front.forEach((row) => {
      const piece = row[0];
      piecesMatrix.rotatePiece({ piece: piece[0], axis: 'y', angle: -90 });
    });
  }

  rotateRight.addEventListener('click', rotateRightHandler);
  rotateLeft.addEventListener('click', rotateLeftHandler);
}

function implementRubiksCubeTopRotation({ piecesMatrix }) {
  const rotateTopToLeft = document.querySelector('.main-container .controls .rotate-top-to-left');
  const rotateTopToRight = document.querySelector('.main-container .controls .rotate-top-to-right');
  const rotateRightToTop = document.querySelector('.main-container .controls .rotate-right-to-top');
  const rotateLeftToTop = document.querySelector('.main-container .controls .rotate-left-to-top');

  function rotateTopToLeftHandler() {
    const pieces = piecesMatrix._matrix.front[0];
    pieces.forEach((piece) => {
      piecesMatrix.rotatePiece({ piece: piece[0], axis: 'x', angle: -90 });
    });
  }

  function rotateTopToRightHandler() {
    const pieces = piecesMatrix._matrix.right[0];
    pieces.forEach((piece) => {
      piecesMatrix.rotatePiece({ piece: piece[0], axis: 'x', angle: -90 });
    });
  }

  function rotateRightToTopHandler() {
    const pieces = piecesMatrix._matrix.right[0];
    pieces.forEach((piece) => {
      piecesMatrix.rotatePiece({ piece: piece[0], axis: 'x', angle: 90 });
    });
  }

  function rotateLeftToTopHandler() {
    const pieces = piecesMatrix._matrix.front[0];
    pieces.forEach((piece) => {
      piecesMatrix.rotatePiece({ piece: piece[0], axis: 'x', angle: 90 });
    });
  }

  rotateTopToLeft.addEventListener('click', rotateTopToLeftHandler);
  rotateTopToRight.addEventListener('click', rotateTopToRightHandler);
  rotateRightToTop.addEventListener('click', rotateRightToTopHandler);
  rotateLeftToTop.addEventListener('click', rotateLeftToTopHandler);
}

function getAngle({ offset }) {
  const angle = (Math.atan(offset.y / offset.x) * 180) / Math.PI;

  if (offset.x >= 0 && offset.y >= 0) return angle;
  if (offset.x < 0 && offset.y >= 0) return 180 + angle;
  if (offset.x < 0 && offset.y < 0) return 180 + angle;
  return 360 + angle;
}

function normalizeAngle(angle) {
  const ang = angle % 360;
  return ang < 0 ? 360 + ang : ang;
}

function isAngleAroundBases({ bases, offset, angle }) {
  const normAngle = normalizeAngle(angle);

  return bases.find((base) => {
    const min = base - offset;
    const max = base + offset;
    return normAngle >= min && normAngle <= max;
  });
}

function isAtLeastAbs({ values, minimum }) {
  return values.find((v) => Math.abs(v) >= minimum);
}
