// see also: https://docs.highfidelity.com/api-reference/picks

/* globals Picks, PickType, Settings, Controller, Script, Entities */
var id = Picks.createPick(PickType.Ray, {
    joint: 'Mouse',
    filter: Picks.PICK_ENTITIES | Picks.PICK_OVERLAYS | Picks.PICK_AVATARS | Picks.PICK_HUD | Picks.PICK_INCLUDE_NONCOLLIDABLE, // | Picks.PICK_COARSE,                                               
    enabled: true,
});

print('raypick..js', id);
Settings.setValue('raypick.js', id);
// Picks.setPrecisionPicking(id, false);                                                                                                                                                          

function onMousePressEvent(event) {
    if (!event.isRightButton) return;
    var result = Picks.getPrevPickResult(id);
    if (result.intersects) {
        print('under mouse', Entities.getNestableType(result.objectID), result.objectID, result.extraInfo.subMeshName);
    }
}

Controller.mousePressEvent.connect(onMousePressEvent);

Script.scriptEnding.connect(function() {
    Controller.mousePressEvent.disconnect(onMousePressEvent);
    Picks.removePick(id);
});