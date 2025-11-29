// Configuração do efeito Matrix
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/`~Çüéâêîôûãõáéíóúàèìòùäëïöüÿñç´`^¨';
const matrix = document.getElementById('matrix');
const width = window.innerWidth;
const height = window.innerHeight;
const fontSize = 18;
const columns = Math.floor(width / fontSize);
const drops = [];

// Configuração inicial das gotas
for (let i = 0; i < columns; i++) {
    drops[i] = {
        y: Math.floor(Math.random() * -1000),
        speed: 2 + Math.random() * 3, // Velocidade mais lenta
        chars: []
    };
    
    // Inicializa os caracteres para cada gota
    const length = 5 + Math.floor(Math.random() * 10);
    for (let j = 0; j < length; j++) {
        drops[i].chars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
    }
}

// Função para desenhar o efeito Matrix
function drawMatrix() {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    matrix.appendChild(ctx.canvas);
    
    // Configuração do estilo
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00ff00';
    ctx.font = `${fontSize}px monospace`;
    
    // Desenha as gotas
    for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Atualiza a posição da gota
        drop.y += drop.speed * 0.2; // Reduz a velocidade
        
        // Desenha cada caractere da gota
        for (let j = 0; j < drop.chars.length; j++) {
            // Muda aleatoriamente os caracteres
            if (Math.random() > 0.95) {
                drop.chars[j] = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            }
            
            // Ajusta a opacidade baseado na posição na coluna
            const opacity = j / drop.chars.length;
            ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
            
            // Desenha o caractere
            ctx.fillText(
                drop.chars[j],
                i * fontSize,
                (drop.y - j * fontSize) % (height + fontSize * drop.chars.length)
            );
        }
        
        // Reinicia a gota no topo quando atinge o fundo
        if (drop.y > height + drop.chars.length * fontSize) {
            drop.y = -drop.chars.length * fontSize;
            drop.speed = 2 + Math.random() * 3; // Nova velocidade aleatória
        }
    }
    
    // Remove o canvas antigo e adiciona o novo
    if (matrix.children.length > 1) {
        matrix.removeChild(matrix.children[0]);
    }
    
    requestAnimationFrame(drawMatrix);
}

// Inicia o efeito Matrix
drawMatrix();

// Efeito de néon nas bordas
function randomNeonEffect() {
    const cards = document.querySelectorAll('.game-card');
    const greenShades = ['#00cc00', '#00dd00', '#00ee00', '#00ff00', '#00aa00', '#00bb00', '#009900'];
    
    cards.forEach(card => {
        const border = card.querySelector('.neon-border');
        const baseColor = greenShades[Math.floor(Math.random() * greenShades.length)];
        
        // Cria camadas para o efeito de néon
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            span.className = 'neon-layer';
            const opacity = 0.05 + (i * 0.05); // Opacidade inicial baixa
            const blur = 2 + (i * 2); // Blur inicial menor
            
            span.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 12px;
                border: 1px solid ${baseColor};
                opacity: ${opacity};
                filter: blur(${blur}px);
                box-shadow: 0 0 ${3 + (i * 2)}px ${baseColor};
                transition: all 0.3s ease-in-out;
                pointer-events: none;
            `;
            border.appendChild(span);
        }
        
        // Efeito hover
        card.addEventListener('mouseenter', () => {
            const layers = border.querySelectorAll('.neon-layer');
            layers.forEach((layer, index) => {
                const newOpacity = 0.2 + (index * 0.15); // Aumenta a opacidade no hover
                const newBlur = 3 + (index * 4); // Aumenta o blur no hover
                layer.style.opacity = newOpacity;
                layer.style.filter = `blur(${newBlur}px)`;
                layer.style.boxShadow = `0 0 ${10 + (index * 5)}px ${baseColor}`;
            });
        });
        
        // Volta ao estado normal ao sair do hover
        card.addEventListener('mouseleave', () => {
            const layers = border.querySelectorAll('.neon-layer');
            layers.forEach((layer, index) => {
                const originalOpacity = 0.05 + (index * 0.05);
                const originalBlur = 2 + (index * 2);
                layer.style.opacity = originalOpacity;
                layer.style.filter = `blur(${originalBlur}px)`;
                layer.style.boxShadow = `0 0 ${3 + (index * 2)}px ${baseColor}`;
            });
        });
        
        // Adiciona um evento de movimento do mouse para o efeito de seguir
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Atualiza a posição do efeito de néon
            border.style.setProperty('--x', `${x}px`);
            border.style.setProperty('--y', `${y}px`);
        });
    });
}

// Inicia o efeito de néon aleatório
randomNeonEffect();

// Efeito de digitação no título
function typeWriter() {
    const title = document.querySelector('header h1');
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            title.style.borderRight = 'none';
        }
    }
    
    title.style.borderRight = '0.15em solid #00ff00';
    type();
}

// Inicia o efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
    
    // Adiciona classe de animação para o container principal
    document.querySelector('.container').style.animation = 'fadeIn 1.5s ease-in-out';
    
    // Adiciona animação de flutuação para os cards
    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Adiciona estilos dinâmicos
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .game-card {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Atualiza o efeito Matrix ao redimensionar a janela
window.addEventListener('resize', () => {
    // Remove o canvas atual
    while (matrix.firstChild) {
        matrix.removeChild(matrix.firstChild);
    }
    
    // Redimensiona e reinicia o efeito Matrix
    const newWidth = window.innerWidth;
    const newColumns = Math.floor(newWidth / fontSize);
    
    // Ajusta o array de gotas para o novo número de colunas
    if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
        }
    } else if (newColumns < drops.length) {
        drops.length = newColumns;
    }
    
    // Redesenha o efeito Matrix
    drawMatrix();
});
