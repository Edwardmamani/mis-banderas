import { vertexShader, fragmentShader } from './shaders.js';
import { CANVAS_CONFIG } from './canvasConfig.js';

let offscreenCanvas = null;
let sharedGL = null;
let sharedProgram = null;

export function initSharedWebGL() {
    if (sharedGL) return { gl: sharedGL, program: sharedProgram };

    offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = CANVAS_CONFIG.gallery.width;
    offscreenCanvas.height = CANVAS_CONFIG.gallery.height;

    sharedGL = offscreenCanvas.getContext('webgl', {
        preserveDrawingBuffer: true,
        antialias: true
    });

    if (!sharedGL) {
        console.error('WebGL no disponible');
        return null;
    }

    sharedProgram = sharedGL.createProgram();

    // Compilar y verificar vertex shader
    const vShader = sharedGL.createShader(sharedGL.VERTEX_SHADER);
    sharedGL.shaderSource(vShader, vertexShader);
    sharedGL.compileShader(vShader);
    if (!sharedGL.getShaderParameter(vShader, sharedGL.COMPILE_STATUS)) {
        console.error('Vertex shader compile error:', sharedGL.getShaderInfoLog(vShader));
        sharedGL.deleteShader(vShader);
        return null;
    }

    // Compilar y verificar fragment shader
    const fShader = sharedGL.createShader(sharedGL.FRAGMENT_SHADER);
    sharedGL.shaderSource(fShader, fragmentShader);
    sharedGL.compileShader(fShader);
    if (!sharedGL.getShaderParameter(fShader, sharedGL.COMPILE_STATUS)) {
        console.error('Fragment shader compile error:', sharedGL.getShaderInfoLog(fShader));
        sharedGL.deleteShader(fShader);
        sharedGL.deleteShader(vShader);
        return null;
    }

    // Adjuntar y enlazar programa
    sharedGL.attachShader(sharedProgram, vShader);
    sharedGL.attachShader(sharedProgram, fShader);
    sharedGL.linkProgram(sharedProgram);
    if (!sharedGL.getProgramParameter(sharedProgram, sharedGL.LINK_STATUS)) {
        console.error('Program link error:', sharedGL.getProgramInfoLog(sharedProgram));
        sharedGL.deleteProgram(sharedProgram);
        sharedGL.deleteShader(vShader);
        sharedGL.deleteShader(fShader);
        sharedProgram = null;
        return null;
    }

    return { gl: sharedGL, program: sharedProgram };
}

export function drawFlagToCanvas(targetCanvas, width, flagData) {
    const context = initSharedWebGL();
    if (!context) return;

    const { gl, program } = context;

    if (offscreenCanvas.width !== targetCanvas.width ||
        offscreenCanvas.height !== targetCanvas.height) {
        offscreenCanvas.width = targetCanvas.width;
        offscreenCanvas.height = targetCanvas.height;
    }

    const height = width * 0.625;
    const x = (offscreenCanvas.width - width) / 2;
    const y = (offscreenCanvas.height - height) / 2;
    const { positions, colors } = flagData(x, y, width, height);

    gl.useProgram(program);
    gl.viewport(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Configurar atributos de posición y color
    ['a_position', 'a_color'].forEach((attr, i) => {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const data = i ? colors : positions;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

        const location = gl.getAttribLocation(program, attr);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, i ? 3 : 2, gl.FLOAT, false, 0, 0);
    });

    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    gl.uniform2f(resolutionLoc, offscreenCanvas.width, offscreenCanvas.height);
    // Configurar scissor para limitar el área de dibujo
    const scissorX = Math.floor(x);
    const scissorY = Math.floor(offscreenCanvas.height - (y + height));
    const scissorW = Math.floor(width);
    const scissorH = Math.floor(height);
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(scissorX, scissorY, scissorW, scissorH);
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2);
    gl.disable(gl.SCISSOR_TEST);
    gl.flush();

    // Copiar resultado al canvas target
    const ctx2d = targetCanvas.getContext('2d');
    ctx2d.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
    ctx2d.drawImage(offscreenCanvas, 0, 0);

    // Overlay opcional (detalles complejos o imágenes)
    if (typeof flagData.overlay === 'function') {
        try {
            flagData.overlay(ctx2d, x, y, width, height);
        } catch (e) {
            console.warn('Overlay draw failed:', e);
        }
    }

    return { x, y, width, height };
}
