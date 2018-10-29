var treeData = [
    {
        "_id": "5bc323c13147d81e5f27ac55",
        "Title": "ut",
        "Tag": "Hollymead",
        "Timestamp": 31427449,
        "Orientation": "left"
    },
    {
        "_id": "5bc323c19a051c233da35c22",
        "Title": "ad",
        "Tag": "Chesapeake",
        "Timestamp": 20560505,
        "Orientation": "left"
    },
    {
        "_id": "5bc323c1d294bb424c0e9c90",
        "Title": "ea",
        "Tag": "Groton",
        "Timestamp": 23182856,
        "Orientation": "left"
    },
    {
        "_id": "5bc323c19bcfbe8fcccc5ecf",
        "Title": "labore",
        "Tag": "Bonanza",
        "Timestamp": 30346617,
        "Orientation": "right"
    },
    {
        "_id": "5bc323c15a37baadab42a04c",
        "Title": "ipsum",
        "Tag": "Blende",
        "Timestamp": 27761723,
        "Orientation": "right"
    },
    {
        "_id": "5bc32c595d904f1d41d5f229",
        "Title": "excepteur",
        "Tag": "Idledale",
        "Timestamp": 22689530,
        "Orientation": "right"
    },
    {
        "_id": "5bc32c598d20eda7bc5e00c9",
        "Title": "occaecat",
        "Tag": "Odessa",
        "Timestamp": 22954219,
        "Orientation": "left"
    },
    {
        "_id": "5bc32c59efdfb6300f7b5ea1",
        "Title": "mollit",
        "Tag": "Healy",
        "Timestamp": 29194637,
        "Orientation": "right"
    },
    {
        "_id": "5bc32c592fa347cbcec2aa8f",
        "Title": "velit",
        "Tag": "Haena",
        "Timestamp": 25105010,
        "Orientation": "right"
    },
    {
        "_id": "5bc32c59df42ae1798c88ee9",
        "Title": "aute",
        "Tag": "Harviell",
        "Timestamp": 30226291,
        "Orientation": "right"
    },
    {
        "_id": "5bc32c59a10f3116f19212ec",
        "Title": "veniam",
        "Tag": "Glenbrook",
        "Timestamp": 26389302,
        "Orientation": "left"
    },
    {
        "_id": "5bc32c59b1141f1d5a1dda5f",
        "Title": "anim",
        "Tag": "Jugtown",
        "Timestamp": 24878001,
        "Orientation": "left"
    },
    {
        "_id": "5bc32c5918b5557d8ffbfbea",
        "Title": "aliqua",
        "Tag": "Byrnedale",
        "Timestamp": 28320189,
        "Orientation": "left"
    },
    {
        "_id": "5bc32c59319746912dfc8c71",
        "Title": "fugiat",
        "Tag": "Weedville",
        "Timestamp": 22940718,
        "Orientation": "left"
    },
    {
        "_id": "5bc32c599f700b1851f1bb40",
        "Title": "aliqua",
        "Tag": "Herlong",
        "Timestamp": 25700363,
        "Orientation": "left"
    },
    {
        "_id": "5bc32c59eeca67ed3cfee361",
        "Title": "culpa",
        "Tag": "Glidden",
        "Timestamp": 27313644,
        "Orientation": "left"
    },
    {
        "_id": "5bc32c59da3ac9978789daf3",
        "Title": "pariatur",
        "Tag": "Loma",
        "Timestamp": 28968155,
        "Orientation": "right"
    },
    {
        "_id": "5bc32c591312f7397a0583bd",
        "Title": "minim",
        "Tag": "Osmond",
        "Timestamp": 25371265,
        "Orientation": "left"
    },
    {
        "_id": "5bc32c597ed5db75e27aba4a",
        "Title": "veniam",
        "Tag": "Ahwahnee",
        "Timestamp": 20167479,
        "Orientation": "right"
    },
    {
        "_id": "5bc32c59b96953dbd7f129a2",
        "Title": "pariatur",
        "Tag": "Drytown",
        "Timestamp": 25770099,
        "Orientation": "left"
    }
];
var maxTimeStamp = treeData.reduce((max, p) => p.Timestamp > max ? p.Timestamp : max, treeData[0].Timestamp);
var minTimeStamp = treeData.reduce((min, p) => p.Timestamp < min ? p.Timestamp : min, treeData[0].Timestamp);


BABYLON.GUI.AdvancedDynamicTexture.prototype.getControlByName = function (name) {
    var foundControl = null;
    if (name) {
        this.executeOnAllControls(function (control) {
            if (control.name && control.name === name) {
                foundControl = control;
            }
        }, this._rootContainer);
    }
    return foundControl;
};

//Generate green color intensity based on timestamp
function getColorForLeaf(x) {
    var r = 64 * (x / maxTimeStamp);
    var g = 255 * (x / maxTimeStamp);
    var b = 64 * (x / maxTimeStamp);
    return new BABYLON.Color3(r / 255, g / 255, b / 255);
}

//TODO: Create title ang tags for leaf meshes
var createLabel = function (mesh) {
    var label = new BABYLON.GUI.Rectangle("Title:" + mesh.title + "\n Tag : " + mesh.tag);
    label.name = "InfoLabel";
    label.background = "black"
    label.height = "50px";
    label.alpha = 0.5;
    label.width = "200px";
    label.cornerRadius = 20;
    label.thickness = 1;
    label.linkOffsetY = 30;
    advancedTexture.addControl(label);
    label.linkWithMesh(mesh);

    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "Title: " + mesh.title + "\n Tag : " + mesh.tag;// mesh.name;
    text1.color = "white";
    label.addControl(text1);

    BABYLON.Tags.AddTagsTo(label, "label" + mesh["leafindex"]);
    BABYLON.Tags.AddTagsTo(label, "labelObject");

}

var onPointerDown = function (evt) {

    // check if we are under a mesh
    var pickInfo = scene.pick(scene.pointerX, scene.pointerY)//, function (mesh) { return mesh !== ground; });
    currentMesh = pickInfo.pickedMesh;
    if (currentMesh != null && currentMesh._tags) {
        var leafObject;
        if (currentMesh._tags["leafObject"])
            leafObject = currentMesh
        if (currentMesh._tags["stemObject"])
            leafObject = scene.getMeshesByTags(currentMesh["leaftag"])[0];

        if (leafObject) {

            //unset previously selected unit
            var lastSelectedUnit = scene.getMeshesByTags("selectedUnit");
            if (lastSelectedUnit.length > 0) {
                lastSelectedUnit = lastSelectedUnit[0];
                BABYLON.Tags.RemoveTagsFrom(lastSelectedUnit, "selectedUnit");
                lastSelectedUnit.material.diffuseColor = getColorForLeaf(lastSelectedUnit["timestamp"]);

                var lastLabel = advancedTexture.getControlByName("InfoLabel");
                lastLabel.dispose();
            }

            //set current unit selected
            BABYLON.Tags.AddTagsTo(leafObject, "selectedUnit");
            leafObject.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
            createLabel(leafObject)
        }
    }
};

var canvas = document.getElementById("renderCanvas");
var camera;
var advancedTexture;

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, 3 * Math.PI / 8, 30, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.position = new BABYLON.Vector3(6, 5, 51);

    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    //Material for stem 
    var WoodMaterial = new BABYLON.StandardMaterial(name, scene);
    var woodTexture = new BABYLON.WoodProceduralTexture(name + "text", 1024, scene);
    woodTexture.ampScale = 50.0;
    WoodMaterial.diffuseTexture = woodTexture;

    // GUI
    advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //Generate stem and leaf data from treeData array
    for (var i = 0; i < treeData.length; i++) {
        var currentNodeData = treeData[i];
        var stem = "trunktemplate"
        var stem = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameter: 1, height: 1 }, scene);;// BABYLON.Mesh.CreateCylinder(name + "trunk", 7, 2, 2, 12, 1, scene);
        stem.position.y = 0.5 + i;
        stem.material = WoodMaterial;
        BABYLON.Tags.AddTagsTo(stem, "stem" + i);

        //Leaf Material
        var LeafMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

        //Leaf Object
        var leaf = BABYLON.MeshBuilder.CreateDisc("leaf" + i, { radius: 1 / 2, tessellation: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
        var leafXPos = leaf.position.x;
        leaf.position.x = currentNodeData.Orientation == "right" ? leafXPos + 1.5 : leafXPos - 1.5;
        leaf.position.y = 1 + i;
        leaf.scaling.x = 2;
        leaf.material = LeafMaterial;
        leaf.material.diffuseColor = getColorForLeaf(currentNodeData.Timestamp);
        BABYLON.Tags.AddTagsTo(leaf, "leaf_" + i);
        BABYLON.Tags.AddTagsTo(leaf, "leafObject");

        leaf['title'] = currentNodeData.Title;
        leaf['tag'] = currentNodeData.Tag;
        leaf['leafindex'] = i;
        leaf['timestamp'] = currentNodeData.Timestamp;

        BABYLON.Tags.AddTagsTo(stem, "stemObject");
        stem['leaftag'] = "leaf_" + i;
        stem['leafindex'] = i;

        //createLabel(leaf);
    }



    var ground = BABYLON.MeshBuilder.CreateGround("gd", { width: 100, height: 50, subdivsions: 4 }, scene);
    var groundMaterial = new BABYLON.StandardMaterial(name + "bawl", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(192 / 255, 194 / 255, 193 / 255);
    ground.material = groundMaterial;

    return scene;
}

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

canvas.addEventListener("pointerdown", onPointerDown, false);

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});



//var TreeEngine = {
//    var 
//}

//function LeafObject(title, tag, timestamp, orientation) {
//    this.Title = title;
//    this.Tag = tag;
//    this.Timestamp = timestamp;
//    this.Orientation = orientation;
//}

//var StemObject = {

//}