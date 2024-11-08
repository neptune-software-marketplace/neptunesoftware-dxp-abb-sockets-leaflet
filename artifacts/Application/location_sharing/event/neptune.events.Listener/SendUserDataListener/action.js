if (!Mapping.myGenerator || !data.userId || data.userId === Mapping.myUserId) return;

console.log("Received sendUserData from:", data.userId);

Mapping.socketUsers.set(data.userId, true);
Title.setText(`Number of users: ${Mapping.socketUsers.size}`);

if (!Mapping.userMarkers.has(data.userId)) {
    const newMarker = L.marker([data.position.latitude, data.position.longitude]).addTo(
        Mapping.map
    ).bindPopup(`User: ${data.userId}`);
    Mapping.userMarkers.set(data.userId, newMarker);
}

const marker = Mapping.userMarkers.get(data.userId);
marker.setLatLng([data.position.latitude, data.position.longitude]);
