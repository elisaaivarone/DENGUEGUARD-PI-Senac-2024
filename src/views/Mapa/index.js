
let map;

const center = { lat: -23.55, lng: -46.63 };

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -23.6, lng: -46.7 },
    zoom: 15,
    mapTypeId: 'roadmap'
  });
}

initMap();
