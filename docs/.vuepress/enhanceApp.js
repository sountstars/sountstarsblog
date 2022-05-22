export default () => {
  /* 添加水印 */
  let app = document.getElementById("app");
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://cdn.jsdelivr.net/gh/sountstars/watermark@master/dist/run.js";
  app.appendChild(script);
  setTimeout(() => {
    (() => {
      window.canvansWatermark('aurora bolg',null, {left: '10px'});
    })();
  }, 1000);
};
