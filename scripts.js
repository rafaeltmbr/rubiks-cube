window.addEventListener('load', () => {
  const piecesMatrix = new PiecesMatrix('.rubiks-cube');

  implementRubiksCubePiecesMovement({ piecesMatrix });
  implementRubiksCubeSideRotation({ piecesMatrix });
  implementRubiksCubeTopRotation({ piecesMatrix });
});

function implementRubiksCubePiecesMovement({ piecesMatrix }) {
  function allowCubeMovement(startEvent) {
    const isTouch = startEvent.touches;
    const { pageX: startX, pageY: startY } = isTouch ? startEvent.touches[0] : startEvent;
    const piece = startEvent.target;
    let axis = '';
    let rotated = false;
    const minOffsetDiff = 10;
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
      if (!axis) {
        const offsetDiff = Math.abs(Math.abs(offset.x) - Math.abs(offset.y));
        if (offsetDiff >= minOffsetDiff) {
          axis = Math.abs(offset.x) > Math.abs(offset.y) ? 'y' : 'x';
        }
      }

      if (axis && !rotated) {
        const angle = axis === 'x' ? (offset.y >= 0 ? -90 : 90) : offset.x >= 0 ? 90 : -90;
        piecesMatrix.rotatePiece({ piece, axis, angle });
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

  rotateRight.addEventListener('mousedown', rotateRightHandler);
  rotateLeft.addEventListener('mousedown', rotateLeftHandler);
  rotateRight.addEventListener('touchstart', rotateRightHandler);
  rotateLeft.addEventListener('touchstart', rotateLeftHandler);
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

  rotateTopToLeft.addEventListener('mousedown', rotateTopToLeftHandler);
  rotateTopToRight.addEventListener('mousedown', rotateTopToRightHandler);
  rotateRightToTop.addEventListener('mousedown', rotateRightToTopHandler);
  rotateLeftToTop.addEventListener('mousedown', rotateLeftToTopHandler);
  rotateTopToLeft.addEventListener('touchstart', rotateTopToLeftHandler);
  rotateTopToRight.addEventListener('touchstart', rotateTopToRightHandler);
  rotateRightToTop.addEventListener('touchstart', rotateRightToTopHandler);
  rotateLeftToTop.addEventListener('touchstart', rotateLeftToTopHandler);
}
