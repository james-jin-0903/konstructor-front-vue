export default function slideToggle(elem, time, hg, dsp, orient) {
  elem.style.display = dsp ? dsp : 'block';
  if (orient === 'h' || !orient) {
    const originHeight = hg ? hg : elem.scrollHeight + 'px';
    if (elem.style.height === '') {
      elem.style.height = '0px';
    }

    setTimeout(function() {
      elem.style.transition = 'height ' + time;
      const height = elem.style.height;
      if (parseInt(height, 10) === 0) {
        elem.style.height = originHeight;
      } else {
        elem.style.height = '0px';
        setTimeout(() => {
          elem.style.display = 'none';
        }, parseFloat(time) * 1000);
      }
    }, 0.001);
  } else if (orient === 'w') {
    const originWidth = hg ? hg : elem.scrollWidth + 'px';
    if (elem.style.width === '') {
      elem.style.width = '0px';
      elem.style.opacity = 0;
    }

    setTimeout(function() {
      elem.style.transition = time;
      const width = elem.style.width;
      if (parseInt(width, 10) === 0) {
        elem.style.width = originWidth;
        elem.style.opacity = 1;
      } else {
        elem.style.width = '0px';
        elem.style.opacity = 0;
        setTimeout(() => {
          elem.style.display = 'none';
        }, parseFloat(time) * 1000);
      }
    }, 0.001);
  }
}
