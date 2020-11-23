// side.axis.position
var rotationMap = {
  front: {
    x: {
      0: [
        { side: 'front', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: false },
        { side: 'left', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: true },
        { side: 'back', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: true },
        { side: 'top', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: false },
        { side: 'bottom', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: false },
      ],
      1: [
        { side: 'front', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: false },
        { side: 'back', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: true },
        { side: 'top', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: false },
        { side: 'bottom', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: false },
      ],
      2: [
        { side: 'front', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: false },
        { side: 'right', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: false },
        { side: 'back', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: true },
        { side: 'top', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: false },
        { side: 'bottom', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: false },
      ],
    },
    y: {
      0: [
        { side: 'front', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'top', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: true },
      ],
      1: [
        { side: 'front', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
      ],
      2: [
        { side: 'front', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'bottom', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: false },
      ],
    },
  },
  right: {
    x: {
      0: [
        { side: 'front', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: true },
        { side: 'right', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: false },
        { side: 'left', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: true },
        { side: 'top', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: true },
        { side: 'bottom', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
      ],
      1: [
        { side: 'right', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: false },
        { side: 'left', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: true },
        { side: 'top', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: true },
        { side: 'bottom', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
      ],
      2: [
        { side: 'right', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: false },
        { side: 'left', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: true },
        { side: 'back', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: false },
        { side: 'top', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: true },
        { side: 'bottom', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
      ],
    },
    y: {
      0: [
        { side: 'front', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'top', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: true },
      ],
      1: [
        { side: 'front', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
      ],
      2: [
        { side: 'front', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'bottom', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: false },
      ],
    },
  },
  left: {
    x: {
      0: [
        { side: 'right', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: true },
        { side: 'left', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: false },
        { side: 'back', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: true },
        { side: 'top', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'bottom', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: true },
      ],
      1: [
        { side: 'right', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: true },
        { side: 'left', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: false },
        { side: 'top', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'bottom', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: true },
      ],
      2: [
        { side: 'front', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: false },
        { side: 'right', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: true },
        { side: 'left', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: false },
        { side: 'top', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'bottom', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: true },
      ],
    },
    y: {
      0: [
        { side: 'front', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'top', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: true },
      ],
      1: [
        { side: 'front', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
      ],
      2: [
        { side: 'front', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'bottom', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: false },
      ],
    },
  },
  back: {
    x: {
      0: [
        { side: 'front', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: true },
        { side: 'right', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: true },
        { side: 'back', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: false },
        { side: 'top', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: true },
        { side: 'bottom', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: true },
      ],
      1: [
        { side: 'front', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: true },
        { side: 'back', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: false },
        { side: 'top', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: true },
        { side: 'bottom', rows: [0, 1, 2], columns: [1], axis: 'x', reverse: true },
      ],
      2: [
        { side: 'front', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: true },
        { side: 'left', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: false },
        { side: 'back', rows: [0, 1, 2], columns: [2], axis: 'x', reverse: false },
        { side: 'top', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: true },
        { side: 'bottom', rows: [0, 1, 2], columns: [0], axis: 'x', reverse: true },
      ],
    },
    y: {
      0: [
        { side: 'front', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [0], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'top', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: true },
      ],
      1: [
        { side: 'front', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [1], columns: [0, 1, 2], axis: 'y', reverse: false },
      ],
      2: [
        { side: 'front', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'right', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'left', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'back', rows: [2], columns: [0, 1, 2], axis: 'y', reverse: false },
        { side: 'bottom', rows: [0, 1, 2], columns: [0, 1, 2], axis: 'z', reverse: false },
      ],
    },
  },
};
