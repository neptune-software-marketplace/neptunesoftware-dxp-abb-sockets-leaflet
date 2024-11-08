if (!Mapping.myGenerator || !data.userId || data.userId === Mapping.myUserId) return;

console.log("Received position update from:", data.userId);

if (!Mapping.userMarkers.has(data.userId)) {
    const newMarker = L.marker([data.position.latitude, data.position.longitude]).addTo(
        Mapping.map
    ).bindPopup(`User: ${data.userId}`);
    Mapping.userMarkers.set(data.userId, newMarker);
    Mapping.requestExistingUsers();
}

const marker = Mapping.userMarkers.get(data.userId);
marker.setLatLng([data.position.latitude, data.position.longitude]);
