window.addEventListener('load', () => {
  implementControlCubeMovement();
  implementRubiksCubePiecesMovement();
});

function implementControlCubeMovement() {
  const controlCube = document.querySelector('.control-cube');
  const rubiksCube = document.querySelector('.rubiks-cube');
  const maxXAngle = 20;
  const lastOffset = { x: -45, y: maxXAngle };
  const offset = {};

  function allowCubeMovement(startEvent) {
    const isTouch = startEvent.touches;
    const { pageX, pageY } = isTouch ? startEvent.touches[0] : startEvent;
    const last = { x: pageX, y: pageY };
    offset.y = lastOffset.y;
    offset.x = lastOffset.x;

    function handleCubeMovement(moveEvent) {
      const { pageX: pX, pageY: pY } = isTouch ? moveEvent.touches[0] : moveEvent;
      offset.x += pX - last.x;
      offset.y += pY - last.y;
      offset.x = offset.x % 360;
      offset.y = offset.y >= maxXAngle ? maxXAngle : offset.y <= -maxXAngle ? -maxXAngle : offset.y;
      last.y = pY;
      last.x = pX;
      controlCube.style = `--crx: ${-offset.y}deg; --cry: ${offset.x}deg;`;
      rubiksCube.style = `--crx: ${-offset.y}deg; --cry: ${offset.x}deg;`;
    }

    function endCubeMovement() {
      window.removeEventListener(isTouch ? 'touchmove' : 'mousemove', handleCubeMovement);
      window.removeEventListener(isTouch ? 'touchend' : 'mouseup', endCubeMovement);
      lastOffset.x = offset.x;
      lastOffset.y = offset.y;
    }

    window.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleCubeMovement);
    window.addEventListener(isTouch ? 'touchend' : 'mouseup', endCubeMovement);
  }

  controlCube.addEventListener('mousedown', allowCubeMovement);
  controlCube.addEventListener('touchstart', allowCubeMovement);
}

function implementRubiksCubePiecesMovement() {
  const piecesMatrix = new PiecesMatrix('.rubiks-cube');

  function allowCubeMovement(startEvent) {
    const isTouch = startEvent.touches;
    const { pageX: startX, pageY: startY } = isTouch ? startEvent.touches[0] : startEvent;
    const offset = { x: 0, y: 0 };
    const piece = startEvent.target;
    let axis = '';
    let rotated = false;
    const minOffsetDiff = 10;

    function handleCubeMovement(moveEvent) {
      moveEvent.preventDefault();
      const { pageX, pageY } = isTouch ? moveEvent.touches[0] : moveEvent;
      offset.x = pageX - startX;
      offset.y = pageY - startY;

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

    window.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleCubeMovement);
    window.addEventListener(isTouch ? 'touchend' : 'mouseup', endCubeMovement);
  }

  piecesMatrix.pieces.forEach((piece) => piece.addEventListener('mousedown', allowCubeMovement));
  piecesMatrix.pieces.forEach((piece) => piece.addEventListener('touchstart', allowCubeMovement));
}

class PiecesMatrix {
  pieces = [];
  _sides = ['front', 'right', 'left', 'back', 'top', 'bottom'];
  _matrix = {};

  constructor(rubiksCubeCSSSelector) {
    this._cube = document.querySelector(rubiksCubeCSSSelector);
    if (!this._cube) throw new Error('Rubik Cube not found');

    this._fillPiecesMatrix(rubiksCubeCSSSelector);
  }

  _fillPiecesMatrix(rubiksCubeCSSSelector) {
    this._sides.forEach((side) => {
      const pieces = document.querySelectorAll(`${rubiksCubeCSSSelector} .${side} > *`);
      this._matrix[side] = [[], [], []];
      for (let i = 0; i < pieces.length; i += 1) {
        const piece = pieces[i];
        const row = Math.floor(i / 3);
        this._matrix[side][row].push([piece]);
        this.pieces.push(piece);
        piece._piecesMatrix = {
          lastRotation: '--rotation: ',
          baseSide: side,
        };
      }
    });
  }

  rotatePiece({ piece, axis, angle }) {
    const location = this._findPieceLocation(piece);
    if (location.side === 'top' || location.side === 'bottom') return;

    const maps = rotationMap[location.side][axis][axis === 'x' ? location.column : location.row];

    maps.forEach((m) => {
      m.rows.forEach((row) => {
        m.columns.forEach((column) => {
          const piece = this._matrix[m.side][row][column].shift();
          const direction = angle * (m.reverse ? -1 : 1) >= 0 ? 'increase' : 'decrease';
          const move = matrixMovementMap[m.side][m.axis][direction];
          const nextSide = move.next || m.side;
          const nextAngle = m.reverse ? -parseInt(angle) : angle;

          let r = move.swapAxis ? column : row;
          let c = move.swapAxis ? row : column;
          r = move.reverseRow ? 2 - r : r;
          c = move.reverseColumn ? 2 - c : c;
          const sideMap = { front: 'F', right: 'R', left: 'L', back: 'BK', top: 'T', bottom: 'BT' };
          const matrixPosition = `--position: "${sideMap[nextSide]}${r}${c}"`;
          this._matrix[nextSide][r][c].push(piece);

          const adj = this._adjustCoordinates({
            piece,
            side: nextSide,
            axis: m.axis,
            angle: nextAngle,
          });

          this._rotate({
            piece,
            axis: adj.axis,
            angle: adj.angle,
            append: matrixPosition,
          });
        });
      });
    });
  }

  _rotate({ piece, axis, angle, append = '' }) {
    piece._piecesMatrix.lastRotation += `rotate${axis.toUpperCase()}(${angle}deg) `;
    piece.style = `${piece._piecesMatrix.lastRotation}; ${append}`;
  }

  _findPieceLocation(piece) {
    for (let s = 0; s < this._sides.length; s += 1) {
      const side = this._sides[s];
      for (let row = 0; row < 3; row += 1) {
        const columns = this._matrix[side][row];
        for (let column = 0; column < 3; column += 1) {
          if (piece === columns[column][0]) return { side, row, column };
        }
      }
    }
  }

  _adjustCoordinates({ piece, side, axis, angle }) {
    const currentSide = piece._piecesMatrix.currentSide || piece._piecesMatrix.baseSide;
    piece._piecesMatrix.currentSide = side;
    const translation = baseTranslationMap[piece._piecesMatrix.baseSide][currentSide][axis];

    return {
      axis: translation.axis,
      angle: translation.reverse ? -angle : angle,
    };
  }
}
