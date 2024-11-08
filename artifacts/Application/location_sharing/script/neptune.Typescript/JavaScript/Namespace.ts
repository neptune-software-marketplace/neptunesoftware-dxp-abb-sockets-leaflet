namespace Mapping {
    export let map: any;
    export const userMarkers = new Map();
    export const socketUsers = new Map();
    export let myGenerator = null;
    export let myUserId = null;
    export let redisConnected = true;

    function renderMap() {
        HTMLObject.setVisible(true);

        App.to(mapPage);

        //@ts-ignore
        map = L.map("map").setView([59.928778, 10.769944], 15);

        //@ts-ignore
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
    }

    function animateMarker() {
        if (!myGenerator) return;
        const coord = myGenerator.getNextCoordinate();

        //@ts-ignore
        triggerUpdateLocationTrigger({
            userId: myUserId,
            position: {
                latitude: coord.latitude,
                longitude: coord.longitude,
            },
        });
        setTimeout(animateMarker, 1000);
    }

    export function initializeUser(userId: string, constructorData: any) {
        if (!redisConnected) {
            sap.m.MessageToast.show("Redis not running or cannot establish connection to websocket.");
            return;
        }
        
        if (socketUsers.has(userId)) {
            sap.m.MessageToast.show("User already exists.");
            return;
        }

        if (myGenerator) {
            sap.m.MessageToast.show("Can only load one user per session.");
            return;
        };

        //@ts-ignore
        socketUsers.set(userId);
        Title.setText(`Number of users: ${socketUsers.size}`);

        
        renderMap();

        myUserId = userId;

        //@ts-ignore
        myGenerator = new PerimeterGenerator({
            ...constructorData,
            userId: userId,
        });

        requestExistingUsers();
        animateMarker();
    }

    export function requestExistingUsers() {
        //@ts-ignore
        triggerUserJoinedTrigger({
            userId: myUserId,
            constructorData: {
                startX: myGenerator.START_X,
                endX: myGenerator.END_X,
                slope: myGenerator.SLOPE,
                intercept: myGenerator.INTERCEPT,
            },
        });
    }

    window.addEventListener("beforeunload", function () {
        if (myUserId) {
            //@ts-ignore
            triggerUserLeftTrigger({
                userId: myUserId,
            });
        }
    });

    (window as any).initializeUser = initializeUser;
}
