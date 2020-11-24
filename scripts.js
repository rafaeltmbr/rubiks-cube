window.addEventListener('load', () => {
  implementRubiksCubePiecesMovement();
});

function implementRubiksCubePiecesMovement() {
  const rubiksCube = document.querySelector('.rubiks-cube');
  const piecesMatrix = new PiecesMatrix('.rubiks-cube');

  const maxXAngle = 20;
  const cubeMoveTimeout = 500;
  const lastCubePosition = { x: -45, y: maxXAngle };
  const currentCubePosition = {
    x: lastCubePosition.x,
    y: lastCubePosition.y,
  };

  function allowCubeMovement(startEvent) {
    let allowCubeMove = false;

    const cubeMovetimeoutDescriptor = setTimeout(() => {
      allowCubeMove = true;
      rubiksCube.setAttribute('data-highlight', 'true');
    }, cubeMoveTimeout);

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
      const diff = { x: pageX - lastPageCoordinates.x, y: pageY - lastPageCoordinates.y };
      lastPageCoordinates.x = pageX;
      lastPageCoordinates.y = pageY;

      if (allowCubeMove) moveCube({ diff });
      else movePiece({ offset });
    }

    function moveCube({ diff }) {
      currentCubePosition.x = (diff.x + currentCubePosition.x) % 360;
      currentCubePosition.y = (diff.y + currentCubePosition.y) % 360;

      if (Math.abs(currentCubePosition.y) > maxXAngle) {
        currentCubePosition.y = currentCubePosition.y < 0 ? -maxXAngle : maxXAngle;
      }

      rubiksCube.style = `--crx: ${-currentCubePosition.y}deg; --cry: ${currentCubePosition.x}deg;`;
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
      clearTimeout(cubeMovetimeoutDescriptor);
      lastCubePosition.x = currentCubePosition.x;
      lastCubePosition.y = currentCubePosition.y;
      rubiksCube.setAttribute('data-highlight', 'false');

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
