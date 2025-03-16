let amigos = [];
const emojis = ['🎉', '🎈', '🎁', '🎀', '💫', '✨', '🌟', '🔥', '💥', '🌈', '🦄', '🎊'];
const amigoEmojis = new Map();

function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();

    if (nombre === "") {
        alert('Por favor, ingresa un nombre. 🙏');
        return;
    }

    amigos.push(nombre);
    if (!amigoEmojis.has(nombre)) {
        const emoji = emojis[amigos.length % emojis.length];
        amigoEmojis.set(nombre, emoji);
    }

    inputAmigo.value = "";
    mostrarListaAmigos();
}

function mostrarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.classList.add('fade-in');
        li.textContent = `${amigoEmojis.get(amigo)} ${amigo}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '❌';
        botonEliminar.classList.add('delete-btn');
        botonEliminar.onclick = () => eliminarAmigo(index);
        li.appendChild(botonEliminar);
        listaAmigos.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigoEmojis.delete(amigos[index]);
    amigos.splice(index, 1);
    mostrarListaAmigos();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Se necesitan al menos 2 amigos para realizar el sorteo. 🧑‍🤝‍🧑');
        return;
    }

    let amigosSorteo = [...amigos];
    let resultado = {};

    amigos.forEach(amigo => {
        let posiblesAmigos = amigosSorteo.filter(a => a !== amigo);

        if (posiblesAmigos.length === 0) {
            alert('No se pudo realizar el sorteo sin que alguien se autoasigne. 🔄 Intenta nuevamente.');
            return;
        }

        const elegido = posiblesAmigos[Math.floor(Math.random() * posiblesAmigos.length)];
        resultado[amigo] = elegido;
        amigosSorteo = amigosSorteo.filter(a => a !== elegido);
    });

    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    const listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = "";

    for (const [amigo, asignado] of Object.entries(resultado)) {
        const li = document.createElement('li');
        li.classList.add('fade-in');
        li.innerHTML = `<strong>${amigoEmojis.get(amigo)} ${amigo}</strong> → <span class="asignado">${amigoEmojis.get(asignado)} ${asignado}</span>`;
        listaResultado.appendChild(li);
    }

    listaResultado.style.backgroundColor = "#f0f8ff";
    listaResultado.style.padding = "10px";
    listaResultado.style.borderRadius = "8px";
}
