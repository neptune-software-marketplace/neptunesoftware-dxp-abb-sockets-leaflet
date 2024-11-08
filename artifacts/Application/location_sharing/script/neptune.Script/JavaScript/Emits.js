function triggerUserJoinedTrigger(data) {
    if (!Mapping.myGenerator) return;
    console.log("Broadcasting userJoined event:", data);

    Mapping.socketUsers.set(data.userId, true);
    Title.setText(`Number of users: ${Mapping.socketUsers.size}`);

    // sap.m.MessageToast.show(`User ${data.userId} has connected.`);
    socket.emit("trigger", {
        event: "userJoined",
        data,
    });
}

function triggerSendUserDataTrigger(data) {
    if (!Mapping.myGenerator) return;
    console.log("Broadcasting sendUserData event:", data);
    socket.emit("trigger", {
        event: "sendUserData",
        data,
    });
}

function triggerUpdateLocationTrigger(data) {
    if (!Mapping.myGenerator) return;
    socket.emit("trigger", {
        event: "updateLocation",
        data,
    });
}

function triggerUserLeftTrigger(data) {
    if (!Mapping.myGenerator) return;
    console.log("Broadcasting userLeft event:", data);
    socket.emit("trigger", {
        event: "userLeft",
        data,
    });
}
