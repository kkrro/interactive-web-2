/* clock.js - show the current date and time on the home page */
$(function () {
  function showTime() {
    var now = new Date();
    var date = now.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    var time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    $('#today').text(date + ' | ' + time);
  }
  showTime();
  setInterval(showTime, 60000);
});
