module Logic.Loop {
  import screen = Gfx.Screen;

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    screen.render();
  }

  export function start() {
    gameLoop();
  }

}