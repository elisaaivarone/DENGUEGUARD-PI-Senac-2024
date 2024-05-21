let map;

function initMap() {
    const mapOptions = {
        zoom: 12,
        center: { lat: -23.550520, lng: -46.633308 },
        mapTypeId: 'roadmap'
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    document.getElementById('cidade').addEventListener('change', updateMap);
    document.getElementById('select-region').addEventListener('change', updateMap);
}

function updateMap() {
    const cidade = document.getElementById('cidade').value;
    const zona = document.getElementById('select-region').value;

    let centerCoords;
    switch (cidade) {
        case 'sao-paulo':
            centerCoords = { lat: -23.550520, lng: -46.633308 }; 
            break;
       
        default:
            centerCoords = { lat: -23.550520, lng: -46.633308 };
    }

    switch (zona) {
        case 'centerZone':
            centerCoords = { lat: -23.550520, lng: -46.633308 }; // Coordenadas do centro de São Paulo
            break;
        case 'eastZone':
            centerCoords = { lat: -23.550520, lng: -46.533308 }; // Coordenadas da Zona Leste
            break;
        case 'westZone':
            centerCoords = { lat: -23.550520, lng: -46.733308 }; // Coordenadas da Zona Oeste
            break;
        case 'southZone':
            centerCoords = { lat: -23.650520, lng: -46.633308 }; // Coordenadas da Zona Sul
            break;
        case 'northZone':
            centerCoords = { lat: -23.450520, lng: -46.633308 }; // Coordenadas da Zona Norte
            break;
       
        default:
            centerCoords = { lat: -23.550520, lng: -46.633308 };
    }

    map.setCenter(centerCoords);
}

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
}

loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAH4u65Yc82f4fm4w0HGI-_S54I9HqYHMA&callback=initMap');