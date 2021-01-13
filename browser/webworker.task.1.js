importScripts(
  "/webworker.library.1.js",
);

var i = 0;
function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout(timedCount, 1000);
}
timedCount();

onmessage = function (e) {
  console.log("worker", e.data);
};
