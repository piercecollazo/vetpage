function deferVideo() {

    //defer html5 video loading
  $("video source").each(function() {
    var sourceFile = $(this).attr("data-src");
    $(this).attr("src", sourceFile);
    var video = this.parentElement;
    video.load();
    // uncomment if video is not autoplay
    // video.play();
  });

//   Looping through videos
  let videoArray = ["/videos/stock4.mp4", "/videos/stock1.mp4", "/videos/stock2.mp4", "/videos/stock3.mp4"]
}
window.onload = deferVideo;