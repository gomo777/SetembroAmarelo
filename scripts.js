document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const introSection = document.getElementById('introSection');
    const gameContainer = document.getElementById('gameContainer');
    const createItemButton = document.getElementById('createItem');
    const textInput = document.getElementById('textInput');
    const dragItemsContainer = document.getElementById('dragItemsContainer');
    const dropZones = document.querySelectorAll('.drop-zone');
    const finishButton = document.getElementById('finishButton');

    // Mostrar o jogo e esconder a introdução
    startButton.addEventListener('click', () => {
        introSection.style.display = 'none';
        gameContainer.style.display = 'flex';
    });

    // Criar item arrastável
    createItemButton.addEventListener('click', () => {
        const text = textInput.value;
        if (text.trim() === '') return; // Verifica se o texto não está vazio

        // Cria o item que será arrastado
        const dragItem = document.createElement('div');
        dragItem.classList.add('drag-item');
        dragItem.setAttribute('draggable', 'true');
        dragItem.textContent = text;

        // Adiciona os eventos de arrastar
        dragItem.addEventListener('dragstart', () => {
            dragItem.classList.add('dragging');
        });

        dragItem.addEventListener('dragend', () => {
            dragItem.classList.remove('dragging');
        });

        // Adiciona o item no container de itens arrastáveis
        dragItemsContainer.appendChild(dragItem);
        textInput.value = ''; // Limpa o campo de texto
    });

    // Adiciona os eventos de arrastar e soltar nas zonas de drop
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessário para permitir o drop
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', () => {
            const draggingItem = document.querySelector('.drag-item.dragging');
            if (draggingItem) {
                zone.querySelector('p').textContent = draggingItem.textContent; // Adiciona o texto na área de drop
                draggingItem.remove(); // Remove o item arrastado da lista
            }
            zone.classList.remove('drag-over');
        });
    });

  
    // Função para redirecionar para outra página ao clicar em "Finalizar"
    finishButton.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });
});