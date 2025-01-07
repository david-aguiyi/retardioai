// (() => {
//   const video = document.getElementById("input");
//   const canvas = document.getElementById("prerender");
//   const output = document.getElementById("output");
//   const ctx = canvas.getContext("2d", { willReadFrequently: true });
//   const charsFixed = [
//     "_",
//     ".",
//     ",",
//     "-",
//     "=",
//     "+",
//     ":",
//     ";",
//     "c",
//     "b",
//     "a",
//     "!",
//     "?",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     ["9", "8"],
//     ["✚", "✚", "✚", "✚", "✚", "⚛︎"],
//     ["☺︎", "☹︎"],
//     "☀︎",
//     ["@", "#"],
//     ["X", "Y", "Z"],
//     "'"
//   ];
//   let chars = [...charsFixed];
//   let charsLength = chars.length;
//   const MAX_COLOR_INDEX = 700;

//   const updateCanvas = () => {
//     const w = canvas.width;
//     const h = canvas.height;
//     ctx.drawImage(video, 0, 0, w, h);
//     const data = ctx.getImageData(0, 0, w, h).data;
//     let outputText = "";
//     for (let y = 0; y < h; y++) {
//       let row = "";
//       for (let x = 0; x < w; x++) {
//         const index = (x + y * w) * 4;
//         const [r, g, b] = data.slice(index, index + 3);
//         const c = (r + g + b) / 3;
//         const charIndex = Math.floor(
//           (charsLength * ((c * 100) / MAX_COLOR_INDEX)) / 100
//         );
//         const result = chars[charIndex];
//         const char = Array.isArray(result)
//           ? result[Math.floor(Math.random() * result.length) + 0]
//           : result;

//         row += `<span style="color: rgb(${r}, ${g}, ${b});">${
//           char ?? "&nbsp;"
//         }</span>`;
//       }
//       outputText += `<div>${row}</div>`;
//     }
//     output.innerHTML = outputText;
//     output.style.setProperty(
//       "--color",
//       `rgb(${data[0]}, ${data[1]}, ${data[2]})`
//     );

//     setTimeout(() => requestAnimationFrame(updateCanvas), 0);
//   };

//   requestAnimationFrame(() => {
//     video.play();
//     updateCanvas();
//   });
// })();
