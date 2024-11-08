if (!Mapping.myGenerator || data.userId === Mapping.myUserId) return;

sap.m.MessageToast.show(`User ${data.userId} has connected.`);
console.log("Received userLogged from:", data.userId);

const currentPosition = Mapping.myGenerator.getNextCoordinate();
triggerSendUserDataTrigger({
    userId: Mapping.myUserId,
    position: currentPosition,
});