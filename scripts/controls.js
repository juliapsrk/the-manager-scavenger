// enableControls() {
//     window.addEventListener('keydown', (event) => {
//       if (this.running) {
//         // stops page from scrolling:
//         const code = event.code;
//         switch (code) {
//           case 'ArrowUp':
//             if (this.player.y < 10) {
//               return 0;
//             } else {
//               this.player.y -= 10;
//             }
//             event.preventDefault();
//             break;
//           case 'ArrowDown':
//             if (this.player.y > 440) {
//               return 0;
//             } else {
//               this.player.y += 10;
//             }
//             event.preventDefault();
//             break;
//           case 'ArrowLeft':
//             if (this.player.x < -5) {
//               return 0;
//             } else {
//               this.player.x -= 10;
//             }
//             event.preventDefault();
//             break;
//           case 'ArrowRight':
//             if (this.player.x > 640) {
//               return 0;
//             } else {
//               this.player.x += 10;
//             }
//             event.preventDefault();
//             break;
//         }
//       }
//     });
//   }

//   // add eventListener just for Space keydown event
//   // enableShootControls() {
//   //   window.addEventListener('keydown', (event) => {
//   //     if (this.running) {
//   //       const shoot = event.shoot;

//   // event = keyup or keydown
//   enableShootControls() {
//     window.addEventListener('keydown', (event) => {
//       if (event.code === 'Space') {
//         console.log('Space pressed');
//         if (this.strikeCount > 0) {
//           event.preventDefault();
//           this.fireStrike();
//           this.strikeCount -= 1;
//         }
//       }
//     });
//   }
