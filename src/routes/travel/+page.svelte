<script lang="ts">
    import { PUBLIC_MAPS_API_KEY } from '$env/static/public';
    // AIzaSyB6fVnvwUCD6VhnheY7a5C_8Yp6G3PzkNo (doesnt work)
    // AIzaSyAGxxOyVM7lusToG_aYP4KYolhjldob7Bg
    // import * as google from 'google';
    import { onMount } from 'svelte';

    let waypoints = ['27 duke of york street, markham, ontario', 'university of waterloo'];
    let totalDistance = 0;

    onMount(() => {
        initMap();
    });

    async function initMap(): Promise<void> {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
                zoom: 7,
                center: { lat: 0, lng: 0 },
            }
        );


        directionsRenderer.setMap(map);

        const onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsRenderer, waypoints);

            const directions = directionsRenderer.getDirections();

            if (directions) {
                totalDistance = computeTotalDistance(directions);
            }
        };

        onChangeHandler();

        // textfield on change
    }

    function calculateAndDisplayRoute(
        service: google.maps.DirectionsService,
        display: google.maps.DirectionsRenderer,
        wp: any[] = []
    ) {
        let wayp: google.maps.DirectionsWaypoint[] = [];
        for (let w of wp) {
            if (w !== wp[0] && w !== wp[wp.length - 1]) {
                wayp.push({
                    location: w,
                    stopover: true,
                });
            }
        }
        if (wp.length > 1) {
            service
                .route({
                    origin: wp[0],
                    destination: wp[wp.length - 1],
                    waypoints: wayp,
                    travelMode: google.maps.TravelMode.DRIVING,
                })
                .then((result: google.maps.DirectionsResult) => {
                    display.setDirections(result);
                    totalDistance = computeTotalDistance(result)
                })
                .catch((e) => {
                    calculateAndDisplayRoute(service, display, wp);
                });
        }
    }

    function computeTotalDistance(result: google.maps.DirectionsResult): number {
        let total = 0;
        const myroute = result.routes[0];

        if (!myroute) {
            return;
        }

        for (let i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i]!.distance!.value;
        }

        total = total / 1000;
        return total;
    }
</script>
<style>
    #map {
        height: calc(100vh - 4rem);
        width: 50vw;
        position: fixed !important;
        left: 50vw;
        top: 4rem;

        border-left: 0.5rem solid black;
    }

    .distance {
        position: fixed;
        bottom: 1rem;
        left: calc(50vw + 1rem);

        background-color: rgba(255, 255, 255, 0.5);
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
</style>
<main>
    <div id="map"></div>
    <h3 class="distance">{Math.round(totalDistance)} km | </h3>
</main>