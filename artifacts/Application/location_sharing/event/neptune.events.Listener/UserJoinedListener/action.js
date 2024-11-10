if (!Mapping.myGenerator || data.userId === Mapping.myUserId) return;

console.log("Received userLogged from:", data.userId);

const currentUsers = Array.from(Mapping.socketUsers).map((item) => item[0]);

if (!currentUsers.includes(data.userId) && !Mapping.isUserConnected) {
    sap.m.MessageToast.show(`User ${data.userId} has connected.`);
};

const currentPosition = Mapping.myGenerator.getNextCoordinate();
triggerSendUserDataTrigger({
    userId: Mapping.myUserId,
    position: currentPosition,
});
