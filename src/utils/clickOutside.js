export default function(element, action) {
  document.addEventListener('click', function(e) {
    let target;
    if (typeof element === 'string') {
      target = document.querySelector(element);
    } else {
      target = element;
    }
    if (target && !target.contains(e.target)) {
      action(e);
    }
  });
}
