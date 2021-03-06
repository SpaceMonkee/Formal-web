var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

var container = document.getElementById('world');
document.body.appendChild( container );
var renderer = new THREE.WebGLRenderer({ alpha: true });
var w = container.offsetWidth;
var h = container.offsetHeight;
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

// Adding light

scene.add(new THREE.AmbientLight(0x333333));
var light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(5,3,5);
scene.add(light);

// creating sphere

var geometry = new THREE.SphereGeometry(3, 64, 64);
var material = new THREE.MeshPhongMaterial({
    map : THREE.ImageUtils.loadTexture('img/earthmap8k.jpg'),
    bumpMap : THREE.ImageUtils.loadTexture('img/earthbump8k.jpg'),
    bumpScale : 0.05,
    specularMap : THREE.ImageUtils.loadTexture('img/earthspec8k.png'),
    specular : new THREE.Color('grey'),
});
var earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

var cloudMesh = new THREE.Mesh(
    new THREE.SphereGeometry(3.01, 50, 50),
    new THREE.MeshPhongMaterial({
        map : THREE.ImageUtils.loadTexture('img/earthcloud8k-1.png'),
        transparent : true,
    })
);
scene.add(cloudMesh);

// Earth Markers

function Marker() {
    THREE.Object3D.call(this);

    var radius = 0.005;
    var sphereRadius = 0.02;
    var height = 0.05;

    var material = new THREE.MeshPhongMaterial({ color: 0xbab68f });

    var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
    cone.position.y = height * 0.5;
    cone.rotation.x = Math.PI;

    var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
    sphere.position.y = height * 0.95 + sphereRadius;

    this.add(cone, sphere);
}

Marker.prototype = Object.create(THREE.Object3D.prototype);

// Camera settings and animation

camera.position.z = 10;
var render = function () {
    requestAnimationFrame(render);

    earthMesh.rotation.y += 0.0025;
    cloudMesh.rotation.y += 0.0050;

    renderer.render(scene, camera);
};

render();