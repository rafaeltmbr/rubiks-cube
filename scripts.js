window.addEventListener("load", implementControlCubeMovement);

function implementControlCubeMovement() {
  const controlCube = document.querySelector(".control-cube");
  const rubiksCube = document.querySelector(".rubiks-cube");
  const lastOffset = { x: -45, y: 45 };
  const offset = {};

  function allowCubeMovement(startEvent) {
    const isTouch = startEvent.touches;
    const { pageX, pageY } = isTouch ? startEvent.touches[0] : startEvent;
    const last = { x: pageX, y: pageY };
    offset.y = lastOffset.y;
    offset.x = lastOffset.x;

    function handleCubeMovement(moveEvent) {
      const { pageX: pX, pageY: pY } = isTouch
        ? moveEvent.touches[0]
        : moveEvent;
      offset.x += pX - last.x;
      offset.y += pY - last.y;
      offset.x = offset.x % 360;
      offset.y = offset.y >= 45 ? 45 : offset.y <= -45 ? -45 : offset.y;
      last.y = pY;
      last.x = pX;
      controlCube.style = `--crx: ${-offset.y}deg; --cry: ${offset.x}deg;`;
      rubiksCube.style = `--crx: ${-offset.y}deg; --cry: ${offset.x}deg;`;
    }

    function endCubeMovement() {
      window.removeEventListener(
        isTouch ? "touchmove" : "mousemove",
        handleCubeMovement
      );
      window.removeEventListener(
        isTouch ? "touchend" : "mouseup",
        endCubeMovement
      );
      lastOffset.x = offset.x;
      lastOffset.y = offset.y;
    }

    window.addEventListener(
      isTouch ? "touchmove" : "mousemove",
      handleCubeMovement
    );
    window.addEventListener(isTouch ? "touchend" : "mouseup", endCubeMovement);
  }

  controlCube.addEventListener("mousedown", allowCubeMovement);
  controlCube.addEventListener("touchstart", allowCubeMovement);
}
