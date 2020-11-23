var matrixMovementMap = {
  front: {
    x: { increase: { next: 'top' }, decrease: { next: 'bottom' } },
    y: { increase: { next: 'right' }, decrease: { next: 'left' } },
    z: {
      increase: { swapAxis: true, reverseColumn: true },
      decrease: { swapAxis: true, reverseRow: true },
    },
  },
  right: {
    x: {
      increase: { next: 'top', swapAxis: true, reverseRow: true },
      decrease: { next: 'bottom', swapAxis: true, reverseColumn: true },
    },
    y: { increase: { next: 'back' }, decrease: { next: 'front' } },
    z: {
      increase: { swapAxis: true, reverseColumn: true },
      decrease: { swapAxis: true, reverseRow: true },
    },
  },
  left: {
    x: {
      increase: { next: 'top', swapAxis: true, reverseColumn: true },
      decrease: { next: 'bottom', swapAxis: true, reverseRow: true },
    },
    y: { increase: { next: 'front' }, decrease: { next: 'back' } },
    z: {
      increase: { swapAxis: true, reverseColumn: true },
      decrease: { swapAxis: true, reverseRow: true },
    },
  },
  back: {
    x: {
      increase: { next: 'top', reverseColumn: true, reverseRow: true },
      decrease: { next: 'bottom', reverseColumn: true, reverseRow: true },
    },
    y: { increase: { next: 'left' }, decrease: { next: 'right' } },
    z: {
      increase: { swapAxis: true, reverseColumn: true },
      decrease: { swapAxis: true, reverseRow: true },
    },
  },
  top: {
    x: {
      increase: { next: 'back', reverseColumn: true, reverseRow: true },
      decrease: { next: 'front' },
    },
    y: {
      increase: { next: 'right', swapAxis: true, reverseColumn: true },
      decrease: { next: 'left', swapAxis: true, reverseRow: true },
    },
    z: {
      increase: { swapAxis: true, reverseColumn: true },
      decrease: { swapAxis: true, reverseRow: true },
    },
  },
  bottom: {
    x: {
      increase: { next: 'front' },
      decrease: { next: 'back', reverseRow: true, reverseColumn: true },
    },
    y: {
      increase: { next: 'right', swapAxis: true, reverseRow: true },
      decrease: { next: 'left', swapAxis: true, reverseColumn: true },
    },
    z: {
      increase: { swapAxis: true, reverseColumn: true },
      decrease: { swapAxis: true, reverseRow: true },
    },
  },
};
