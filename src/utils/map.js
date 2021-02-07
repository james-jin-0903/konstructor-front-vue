export default function() {
  const map = document.getElementById('map');
  if (map) {
    initMap();

    const pageContent = document.querySelector('.pageContent');
    const page = document.querySelector('.page');
    const option = document.querySelector('.pageSettings__selectMap');

    option.addEventListener('click', function(e) {
      const select = e.currentTarget.closest('.select');
      const input = select.querySelector('.select__input');
      const val = input.value;
      if (val === 'Карта') {
        map.classList.add('map_open');
        pageContent.classList.add('pageContent_hide');
        page.classList.remove('page');
      } else {
        map.classList.remove('map_open');
        pageContent.classList.remove('pageContent_hide');
        page.classList.add('page');
      }
    });
  }
}

function initMap() {
  let uluru = { lat: 50.44557, lng: 30.521424 };
  try {
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru
    });
    let marker = new google.maps.Marker({ position: uluru, map: map });
  } catch (e) {
  }
}
