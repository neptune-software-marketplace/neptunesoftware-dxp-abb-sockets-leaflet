if (!Mapping.myGenerator || !data.userId || data.userId === Mapping.myUserId) return;

console.log("User disconnected:", data.userId);
sap.m.MessageToast.show(`User ${data.userId} has disconnected.`);

if (Mapping.userMarkers.has(data.userId)) {
    const marker = Mapping.userMarkers.get(data.userId);
    marker.remove();
    Mapping.userMarkers.delete(data.userId);
}

if (Mapping.socketUsers.has(data.userId)) {
    Mapping.socketUsers.delete(data.userId);
    Title.setText(`Number of users: ${Mapping.socketUsers.size}`);
}