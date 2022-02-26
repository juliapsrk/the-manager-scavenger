// const backgroundUrls = [];
// for (let i = 1; i <= 3; i++) {
//   backgroundUrls.push(`./images/cyberpunk-street/layer-${i}.png`);
// }
// const backgroundLayers = backgroundUrls.map((url) => {
//   const image = new Image();
//   image.src = url;
//   return image;
// });
// class Background {
//   constructor(game) {
//     this.game = game;
//     this.speed = 0;
//   }
//   paint() {
//     const context = this.game.context;
//     const $canvas = context.canvas;
//     const width = $canvas.width;
//     const height = $canvas.height;
//     let distance = this.speed++;
//     for (let i = 0; i < backgroundLayers.length; i++) {
//       const layer = backgroundLayers[i];
//       const outset = ((distance * i) / 3) % width;
//       context.drawImage(layer, -outset, 0, width, height);
//       context.drawImage(layer, -outset + width, 0, width, height);
//     }
//   }
// }
