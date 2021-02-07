export default function slideDown(elem, time, dsp) {
  elem.style.display = dsp ? dsp : 'block';
  if (elem.style.height === '') {
    elem.style.height = elem.scrollHeight + 'px';
  }

  setTimeout(function() {
    elem.style.transition = 'height ' + time;
    elem.style.height = '0px';
    setTimeout(() => {
      elem.style.display = 'none';
    }, parseFloat(time) * 1000);
  }, 0.001);
}
