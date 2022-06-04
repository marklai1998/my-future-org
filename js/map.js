
        google.maps.event.addDomListener(window, 'load', init);
        var map, markersArray = [];

        function bindInfoWindow(marker, map, location) {
            google.maps.event.addListener(marker, 'click', function () {
                function close(location) {
                    location.ib.close();
                    location.infoWindowVisible = false;
                    location.ib = null;
                }

                if (location.infoWindowVisible === true) {
                    close(location);
                } else {
                    markersArray.forEach(function (loc, index) {
                        if (loc.ib && loc.ib !== null) {
                            close(loc);
                        }
                    });

                    var boxText = document.createElement('div');
                    boxText.style.cssText = 'background: #fff;';
                    boxText.classList.add('md-whiteframe-2dp');

                    function buildPieces(location, el, part, icon) {
                        if (location[part] === '') {
                            return '';
                        } else if (location.iw[part]) {
                            switch (el) {
                                case 'photo':
                                    if (location.photo) {
                                        return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
                                    } else {
                                        return '';
                                    }
                                    break;
                                case 'iw-toolbar':
                                    return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
                                    break;
                                case 'div':
                                    switch (part) {
                                        case 'email':
                                            return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                                            break;
                                        case 'web':
                                            return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                                            break;
                                        case 'desc':
                                            return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                                            break;
                                        default:
                                            return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                                            break;
                                    }
                                    break;
                                case 'open_hours':
                                    var items = '';
                                    if (location.open_hours.length > 0) {
                                        for (var i = 0; i < location.open_hours.length; ++i) {
                                            if (i !== 0) {
                                                items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours + '</strong></li>';
                                            }
                                            var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours + '</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                                        }
                                        return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
                                    } else {
                                        return '';
                                    }
                                    break;
                            }
                        } else {
                            return '';
                        }
                    }

                    boxText.innerHTML =
                        buildPieces(location, 'photo', 'photo', '') +
                        buildPieces(location, 'iw-toolbar', 'title', '') +
                        buildPieces(location, 'div', 'address', 'location_on') +
                        buildPieces(location, 'div', 'web', 'public') +
                        buildPieces(location, 'div', 'email', 'email') +
                        buildPieces(location, 'div', 'tel', 'phone') +
                        buildPieces(location, 'div', 'int_tel', 'phone') +
                        buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
                        buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

                    var myOptions = {
                        alignBottom: true,
                        content: boxText,
                        disableAutoPan: true,
                        maxWidth: 0,
                        pixelOffset: new google.maps.Size(-140, -40),
                        zIndex: null,
                        closeBoxMargin: '0px 0px 0px 0px',
                        infoBoxClearance: new google.maps.Size(1, 1),
                        isHidden: false,
                        pane: 'floatPane',
                        enableEventPropagation: false
                    };

                    location.ib = new InfoBox(myOptions);
                    location.ib.open(map, marker);
                    location.infoWindowVisible = true;
                }
            });
        }

        function init() {
            var mapOptions = {
                center: new google.maps.LatLng(22.497531138088956, 114.1325272581787),
                zoom: 14,
                gestureHandling: 'auto',
                fullscreenControl: false,
                zoomControl: true,
                disableDoubleClickZoom: true,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                },
                scaleControl: true,
                scrollwheel: true,
                streetViewControl: true,
                draggable: true,
                clickableIcons: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#444444"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.school",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#34aedf"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    }
                ]
            };
            var mapElement = document.getElementById('map');
            var map = new google.maps.Map(mapElement, mapOptions);
            var locations = [
                {
                    "title": "Caritas Fanling Chan Chun Ha Secondary School",
                    "address": "28 San Wan Rd, Fanling",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.4914153,
                    "lng": 114.14254189999997,
                    "vicinity": "28 San Wan Rd, Fanling",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "CCC Kei San Secondary School",
                    "address": "8 Wu Tip Shan Rd, Fanling",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.49038699999999,
                    "lng": 114.13506299999995,
                    "vicinity": "8 Wu Tip Shan Rd, Fanling",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Christian Alliance S W Chan Memorial College",
                    "address": "12 Fai Ming Rd, Fanling",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.481433,
                    "lng": 114.13786600000003,
                    "vicinity": "12 Fai Ming Rd, Fanling",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "De La Salle Secondary School, N.T.",
                    "address": "Kam Tsin Village",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.501201,
                    "lng": 114.11079399999994,
                    "vicinity": "Kam Tsin Village",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Elegantia College (Sponsored By Education Convergence)",
                    "address": "8 Ching Shing Rd",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.493103,
                    "lng": 114.12430999999992,
                    "vicinity": "8 Ching Shing Rd",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Fanling Government Secondary School",
                    "address": "27 Yat Ming Rd",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.4862704,
                    "lng": 114.14444320000007,
                    "vicinity": "27 Yat Ming Rd",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Fanling Kau Yan College",
                    "address": "3 Yan Shing Ln",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.488178,
                    "lng": 114.13854000000003,
                    "vicinity": "3 Yan Shing Ln",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Fanling Lutheran Secondary School",
                    "address": "270 Jockey Club Rd, Fanling Wai",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.497864,
                    "lng": 114.13728400000002,
                    "vicinity": "270 Jockey Club Rd, Fanling Wai",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Fanling Rhenish Church Secondary School",
                    "address": "1 Luen Yick St",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.497016,
                    "lng": 114.14218400000004,
                    "vicinity": "1 Luen Yick St",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Fung Kai Liu Man Shek Tong Secondary School",
                    "address": "Sheung Shui, 6 Fung Nam Rd",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.5080883,
                    "lng": 114.12702809999996,
                    "vicinity": "Sheung Shui, 6 Fung Nam Rd",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Fung Kai No.1 Secondary School",
                    "address": "17 Jockey Club Rd",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.5112982,
                    "lng": 114.1268751,
                    "vicinity": "17 Jockey Club Rd",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "HHCKLA Buddhist Ma Kam Chan Memorial English Secondary School",
                    "address": "9 Luen Yick St",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.498016,
                    "lng": 114.14143999999999,
                    "vicinity": "9 Luen Yick St",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Hong Kong Taoist Association Tang Hin Memorial Secondary School",
                    "address": "Choi Yuen Estate Choi Ping House, 8 Choi Yuen Rd",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.499271,
                    "lng": 114.12921400000005,
                    "vicinity": "Choi Yuen Estate Choi Ping House, 8 Choi Yuen Rd",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "PLK Ma Kam Ming College",
                    "address": "38 Wah Ming Rd",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.481939,
                    "lng": 114.14126199999998,
                    "vicinity": "38 Wah Ming Rd",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Sheung Shui Government Secondary School",
                    "address": "21 Pak Wo Rd",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.4964992,
                    "lng": 114.12916480000001,
                    "vicinity": "21 Pak Wo Rd",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "SKH Chan Young Secondary School",
                    "address": "6 Chi Cheong Rd",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.500925,
                    "lng": 114.13300500000003,
                    "vicinity": "6 Chi Cheong Rd",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "St Francis Of Assisi's College",
                    "address": "1 Yan Shing Ln",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.4877,
                    "lng": 114.13845000000003,
                    "vicinity": "1 Yan Shing Ln",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "Tin Ka Ping Secondary School",
                    "address": "1 Wai Hon Rd",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.494265,
                    "lng": 114.131216,
                    "vicinity": "1 Wai Hon Rd",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "TWGHs Kap Yan Directors' College",
                    "address": "Choi Yuen Estate",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.4987003,
                    "lng": 114.12960290000001,
                    "vicinity": "Choi Yuen Estate",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }, {
                    "title": "TWGHs Li Ka Shing College",
                    "address": "Cheung Wah Estate",
                    "desc": "",
                    "tel": "",
                    "int_tel": "",
                    "email": "",
                    "web": "",
                    "web_formatted": "",
                    "open": "",
                    "time": "",
                    "lat": 22.4922683,
                    "lng": 114.14300550000007,
                    "vicinity": "Cheung Wah Estate",
                    "open_hours": "",
                    "marker": {
                        "url": "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png",
                        "scaledSize": {"width": 25, "height": 42, "j": "px", "f": "px"},
                        "origin": {"x": 0, "y": 0},
                        "anchor": {"x": 12, "y": 42}
                    },
                    "iw": {
                        "address": true,
                        "desc": true,
                        "email": true,
                        "enable": true,
                        "int_tel": true,
                        "open": true,
                        "open_hours": true,
                        "photo": true,
                        "tel": true,
                        "title": true,
                        "web": true
                    }
                }
            ];
            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    icon: locations[i].marker,
                    position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                    map: map,
                    title: locations[i].title,
                    address: locations[i].address,
                    desc: locations[i].desc,
                    tel: locations[i].tel,
                    int_tel: locations[i].int_tel,
                    vicinity: locations[i].vicinity,
                    open: locations[i].open,
                    open_hours: locations[i].open_hours,
                    photo: locations[i].photo,
                    time: locations[i].time,
                    email: locations[i].email,
                    web: locations[i].web,
                    iw: locations[i].iw
                });
                markersArray.push(marker);

                if (locations[i].iw.enable === true) {
                    bindInfoWindow(marker, map, locations[i]);
                }
            }
        }
