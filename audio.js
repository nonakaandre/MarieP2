class AudioManager {
    constructor() {
        this.music = new Audio('assets/audio/absolutesound-background-music-background-565107.mp3');
        this.music.loop = true;
        this.music.volume = 0.4;
         // Armezena a opção de mutar o jogo, caso seja o primeiro acesso vai ser 'null' e a musica tocará normalmente.
        this.muted = localStorage.getItem('muted') === 'true';  
        this.music.muted = this.muted;
    }  
    
    play() {
        this.music.play().then(() => {
            console.log('Música de fundo iniciada');
        }).catch((error) => {
            console.error('Erro ao iniciar a música de fundo:', error);
        });
        
    }

    
    
}
