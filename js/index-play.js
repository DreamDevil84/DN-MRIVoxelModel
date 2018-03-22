//  // ##########################################
//  // Step 0 - Get Dom Objects
//  // ##########################################
//  var canvas = document.getElementById("renderCanvas");
//     canvas.width = canvas.clientWidth;
//     canvas.height = canvas.clientHeight;

//  // ##########################################
//  // Step 1 - Init WebGL
//  // ##########################################

//  var gl = canvas.getContext("experimental-webgl");

//  // ##########################################
//  // Step 2 - Render
//  // ##########################################
// function renderLoop(){
//     gl.clearColor(1.0, 0, 0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

//     // Register for next frame
//     requestAnimationFrame(renderLoop);
// }


//  // ##########################################
//  // Step 6 - Mesh's buffers
//  // ##########################################

//  var triangleVertexPositionBuffer = gl.createBuffer();
//  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
//  var vertices = [
//      0.0, 1.0, 0.0,
//      -1.0, -1.0, 0.0,
//     1.0, -1.0, 0.0
//  ]
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


//  // ##########################################
//  // Final Step - Let's go!
//  // ##########################################
//  requestAnimationFrame(renderLoop);