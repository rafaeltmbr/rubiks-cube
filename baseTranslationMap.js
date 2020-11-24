// base.side.axis >> { axis, reverse }
var baseTranslationMap = {
  front: {
    front: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    right: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    left: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    back: { x: { axis: 'x', reverse: true }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
    top: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    bottom: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
  },
  right: {
    front: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    right: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    left: { x: { axis: 'x', reverse: true }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
    back: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    top: { x: { axis: 'y' }, y: { axis: 'x', reverse: true }, z: { axis: 'z' } },
    bottom: { x: { axis: 'y', reverse: true }, y: { axis: 'x' }, z: { axis: 'z' } },
  },
  left: {
    front: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    right: { x: { axis: 'x', reverse: true }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
    left: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    back: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    top: { x: { axis: 'y', reverse: true }, y: { axis: 'x' }, z: { axis: 'z' } },
    bottom: { x: { axis: 'y' }, y: { axis: 'x', reverse: true }, z: { axis: 'z' } },
  },
  back: {
    front: { x: { axis: 'x', reverse: true }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
    right: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    left: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    back: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    top: { x: { axis: 'x', reverse: true }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
    bottom: { x: { axis: 'x', reverse: true }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
  },
  top: {
    front: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    right: { x: { axis: 'y', reverse: true }, y: { axis: 'x' }, z: { axis: 'z' } },
    left: { x: { axis: 'y' }, y: { axis: 'x', reverse: true }, z: { axis: 'z' } },
    back: { x: { axis: 'x', reverse: true }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
    top: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    bottom: { x: { axis: 'x', reverse: true }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
  },
  bottom: {
    front: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
    right: { x: { axis: 'y' }, y: { axis: 'x', reverse: true }, z: { axis: 'z' } },
    left: { x: { axis: 'y', reverse: true }, y: { axis: 'x' }, z: { axis: 'z' } },
    back: { x: { axis: 'x', reverse: true }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
    top: { x: { axis: 'x' }, y: { axis: 'y', reverse: true }, z: { axis: 'z' } },
    bottom: { x: { axis: 'x' }, y: { axis: 'y' }, z: { axis: 'z' } },
  },
};