/// <reference path="babylon.js"/>
"use strict";

var canvas;
var engine;
var scene;

var minIntensity = 0.5;
var cubeSize = 0.1;

var currentSlide = 150;

var modelData = [];

document.addEventListener("DOMContentLoaded", startBabylonJS, false);

function startBabylonJS() {
    if (BABYLON.Engine.isSupported()) {
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);

        scene = new BABYLON.Scene(engine);

        var cam = new BABYLON.FreeCamera("freecam", new BABYLON.Vector3(0, 0, -10), scene);
        // var cam = new BABYLON.ArcRotateCamera("arcCam", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
        cam.attachControl(canvas);
        // cam.checkCollisions = true;
        // cam.applyGravity = true;

        // var mySimpleMesh = new BABYLON.Mesh("myMesh", scene);
        // var myPlane = CreatePlane(2);
        // myPlane.applyToMesh(mySimpleMesh);

        // var plane = BABYLON.Mesh.CreatePlane("myPlane", 2, scene)

        // var testcube = BABYLON.Mesh.CreateBox("myCube", 1, scene);
        // testcube.position.y += 0;
        // testcube.position.x += 0;
        //testcube.checkCollisions = true;

        // var light = new BABYLON.PointLight("pLight", new BABYLON.Vector3(0, 0, 0), scene);
        // light.diffuse = BABYLON.Color3.Green();

        // var hemi = new BABYLON.HemisphericLight("hLight", BABYLON.Vector3.Zero(), scene);
        // var ground = BABYLON.Mesh.CreateGround("floor", 24, 24, 24, scene);
        // ground.checkCollisions = true;

        // var mySimpleMeshTest = new BABYLON.Mesh("testMesh", scene);

        getModelFromJSON("water.json");




        // Once the scene is loaded just registrer a render loop to render it
        // engine.runRenderLoop(function () {
        //     // engine.clear(new BABYLON.Color3(0.2, 0.2, 0.3), true);
        //     // cube.rotation.x += 0.01;
        //     // cube.rotation.y += 0.01;
        //     scene.render();
        // });
    };
}

function makeSlide(slide, pos) {
    for (let y = 0; y < slide.length; y++) {
        for (let x = 0; x < slide[y].length; x++) {
            if (slide[y][x] > minIntensity) {
                var cube = BABYLON.Mesh.CreateBox("myCube", cubeSize, scene);
                cube.position.y += (y - Math.floor(slide.length)/2) * cubeSize;
                cube.position.x += (x - Math.floor(slide[y].length)/2) * cubeSize;
                cube.position.z += pos;
            }
        }
    }
}

function makeFullModel(model){
    for(let z = 0; z < model.length; z++){
        makeSlide(model[z], z);
        console.log("Created slide nr: " + z);
    }
}

function CreateTest() {
    var vertexModelData = new BABYLON.VertexData();

    var mmPositions = [-5, 2, -3, -7, -2, -3, -3, -2, -3, 5, 2, 3, 7, -2, 3, 3, -2, 3];
    var mmIndices = [0, 1, 2, 3, 4, 5];
    var mmNormals = [];

    BABYLON.VertexData.ComputeNormals(mmPositions, mmIndices, mmNormals);

    vertexModelData.indices = mmIndices;
    vertexModelData.positions = mmPositions;
    vertexModelData.normals = mmNormals;
    // vertexModelData.normals =
    //     [
    //         0, 0, 1,
    //         0, 0, 1,
    //         0, 0, 1,
    //         0, 0, -1,
    //         0, 0, -1,
    //         0, 0, -1
    //     ];
    // vertexModelData.uvs = mUvs;

    console.log(vertexModelData)
    // vertexModelData.applyToMesh(mesh);
    return vertexModelData;
}

function CreatePlane(size) {
    var indices = [];
    var positions = [];
    var normals = [];
    var uvs = [];

    size = size || 1;

    // Vertices

    var halfSize = size / 2.0;
    positions.push(-halfSize, -halfSize, 0);
    normals.push(0, 0, -1.0);
    uvs.push(0.0, 0.0);

    positions.push(halfSize, -halfSize, 0);
    normals.push(0, 0, -1.0);
    uvs.push(1.0, 0.0);

    positions.push(halfSize, halfSize, 0);
    normals.push(0, 0, -1.0);
    uvs.push(1.0, 1.0);

    positions.push(-halfSize, halfSize, 0);
    normals.push(0, 0, -1.0);
    uvs.push(0.0, 1.0);

    // Indices
    indices.push(0);
    indices.push(1);
    indices.push(2);

    indices.push(0);
    indices.push(2);
    indices.push(3);

    // Result
    var vertexData = new BABYLON.VertexData();

    vertexData.indices = indices;
    vertexData.positions = positions;
    vertexData.normals = normals;
    vertexData.uvs = uvs;

    console.log(vertexData)
    return vertexData;
}

function getModelFromJSON(path) {
    var request = new XMLHttpRequest();
    console.log("Fetching JSON");
    request.open("GET", path);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            modelData = JSON.parse(this.responseText);
            // console.log(modelData[currentSlide]);

            makeFullModel(modelData);

            // makeSlide(modelData[currentSlide]);
            engine.runRenderLoop(function () {
                scene.render();
            });
        }
    }
}
