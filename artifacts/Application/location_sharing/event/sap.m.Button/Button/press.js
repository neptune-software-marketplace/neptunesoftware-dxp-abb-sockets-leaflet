if (!Mapping.redisConnected) {
    sap.m.MessageToast.show("Redis not running or cannot establish connection to websocket.");
    return;
}

Input.setValueState("None");
const user = Input.getValue();

if (typeof user === "undefined" || user === null || user === "") {
    Input.setValueState("Error");
    sap.m.MessageToast.show("Provide a name");
    return;
}

const area = Select.getSelectedKey();
const points = locationData.find((item) => item.name === area).payload;
points.userId = user;
Mapping.initializeUser(user, points);
