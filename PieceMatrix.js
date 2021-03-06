class PiecesMatrix {
  pieces = [];
  _sides = ['front', 'right', 'left', 'back', 'top', 'bottom'];
  _matrix = {};
  _initialRotationMap = {
    front: '--rotation: ',
    right: '--rotation: rotateY(90deg) ',
    left: '--rotation: rotateY(270deg) ',
    back: '--rotation: rotateY(180deg) ',
    top: '--rotation: rotateX(90deg) ',
    bottom: '--rotation: rotateX(270deg) ',
  };

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
          lastRotation: this._initialRotationMap[side],
          baseSide: side,
          baseAxis: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
        };
      }
    });
  }

  rotatePiece({ piece, axis, angle }) {
    const location = this.findPieceLocation({ piece });

    const maps = rotationMap[location.side][axis][axis === 'x' ? location.column : location.row];

    maps.forEach((m) => {
      m.rows.forEach((row) => {
        m.columns.forEach((column) => {
          const piece = this._matrix[m.side][row][column].shift();
          const direction = angle * (m.reverse ? -1 : 1) >= 0 ? 'increase' : 'decrease';
          const move = matrixMovementMap[m.side][m.axis][direction];
          const nextSide = move.next || m.side;
          const nextAngle = m.reverse ? -parseInt(angle) : angle;

          const { r, c } = this._adjustPiecePosition({ move, column, row });
          this._matrix[nextSide][r][c].push(piece);

          this._rotate({ piece, axis: m.axis, angle: nextAngle });
          this._adjustBaseAxis({ piece, move });
        });
      });
    });
  }

  _rotate({ piece, axis, angle }) {
    const { baseAxis } = piece._piecesMatrix;

    const newAxis = baseAxis[axis].axis;
    const newAngle = baseAxis[axis].reverse ? -angle : angle;

    piece._piecesMatrix.lastRotation += `rotate${newAxis.toUpperCase()}(${newAngle}deg) `;
    piece.style = `${piece._piecesMatrix.lastRotation};`;
  }

  findPieceLocation({ piece }) {
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

  rotateRandomPiece() {
    const sides = ['front', 'right', 'top'];
    const side = sides[Math.floor(Math.random() * sides.length)];
    const row = Math.floor(Math.random() * 3);
    const column = Math.floor(Math.random() * 3);

    const piece = this._matrix[side][row][column][0];
    const axis = Math.random() >= 0.5 ? 'x' : 'y';
    const angle = Math.random() >= 0.5 ? 90 : -90;

    this.rotatePiece({ piece, axis, angle });
  }

  _adjustPiecePosition({ move, column, row }) {
    let r = move.swapAxis ? column : row;
    let c = move.swapAxis ? row : column;
    r = move.reverseRow ? 2 - r : r;
    c = move.reverseColumn ? 2 - c : c;

    return { r, c };
  }

  _adjustBaseAxis({ piece, move }) {
    const { baseAxis } = piece._piecesMatrix;

    if (move.swapAxis) {
      let temp = baseAxis.x;
      baseAxis.x = baseAxis.y;
      baseAxis.y = temp;
    }

    baseAxis.x.reverse = move.reverseColumn ? !baseAxis.x.reverse : baseAxis.x.reverse;
    baseAxis.y.reverse = move.reverseRow ? !baseAxis.y.reverse : baseAxis.y.reverse;
  }
}
