export default () => {
  /* 添加水印 */
  //   let app = document.getElementById("app");
  //   let script = document.createElement("script");
  //   script.type = "text/javascript";
  //   console.log(" water-mark");
  //   script.src =
  //     "https://cdn.jsdelivr.net/gh/sountstars/watermark@master/dist/run.js";
  //   app.appendChild(script);
  //   setTimeout(() => {
  //     (() => {
  //       let waterMark = window?.canvansWatermark || function () {};
  //       delete window.waterMark;
  //       waterMark("aurora bolg", null, { left: "10px" });
  //     })();
  //   }, 1000);

  let app = document.getElementById("app");
  let script = document.createElement("script");
  if (app && script) {
    script.type = "text/javascript";
    script.src =
      "https://cdn.jsdelivr.net/gh/hzfvictory/cdn@master/water-mark/index.js";
    app.appendChild(script);

    setTimeout(() => {
      (() => {
        let waterMarkTemp = window.waterMark || function () {};
        delete window.waterMark;
        console.log(" water-mark");
        waterMarkTemp("aurora's blog", null, "app", { left: "10px" });
      })();
    }, 5000);
  }
};
