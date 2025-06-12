// Start scene dat is de begin scherm
class startScene extends Phaser.Scene {
  constructor() {
    super('startScene');
  }
 
  preload() {
    this.load.audio('startSound', 'assets/opening-sound.mp3');
    this.load.audio('backgroundMusic', 'assets/background-music.mp3'); // Achtergrondmuziek
    this.load.image('background', 'assets/Backround-startscreen.png');
    this.load.image('soundOn', 'assets/sound-on.png');    // Geluid aan icoon
    this.load.image('soundOff', 'assets/sound-off.png');  // Geluid uit icoon
  }
 
  create() {
    // Startgeluid
    this.startSound = this.sound.add('startSound', { volume: 0.2 });
    this.startSound.play();
 
    // Achtergrondafbeelding
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
 
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2 - 100;
 
    // Titeltekst
    const titleContainer = this.add.container(centerX, centerY);
 
    const runText = this.add.text(0, 0, 'RUN4', {
      fontSize: '112px',
      fontFamily: 'Griffy',
      color: '#8B0000'
    });
 
    const yourText = this.add.text(runText.width, 0, 'YOUR', {
      fontSize: '112px',
      fontFamily: 'Griffy',
      color: '#00008B'
    });
 
    const lifeText = this.add.text(runText.width + yourText.width, 0, 'LIFE!!', {
      fontSize: '112px',
      fontFamily: 'Griffy',
      color: '#006400'
    });
 
    [runText, yourText, lifeText].forEach(text => {
      text.setShadow(2, 2, '#000000', 4, false, true);
    });
 
    titleContainer.add([runText, yourText, lifeText]);
    titleContainer.setSize(runText.width + yourText.width + lifeText.width, runText.height);
    titleContainer.setPosition(centerX - titleContainer.width / 2, centerY);
 
    this.tweens.add({
      targets: titleContainer,
      y: centerY - 60,
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
 
    // Start knop
    const startText = this.add.text(centerX, centerY + 200, 'Start', {
      fontSize: '70px',
      color: '#ffffff',
      fontFamily: 'Irish Grover'
    }).setOrigin(0.5).setInteractive();
 
    // Rules knop
    const rulesText = this.add.text(centerX, centerY + 300, 'Rules', {
      fontSize: '70px',
      color: '#ffffff',
      fontFamily: 'Irish Grover'
    }).setOrigin(0.5).setInteractive();
 
    startText.on('pointerover', () => {
      startText.setStyle({ fill: '#ff0000' });
      runText.setColor('#FF4C4C');
      yourText.setColor('#4C4CFF');
      lifeText.setColor('#33CC33');
    });
 
    startText.on('pointerout', () => {
      startText.setStyle({ fill: '#ffffff' });
      runText.setColor('#8B0000');
      yourText.setColor('#00008B');
      lifeText.setColor('#006400');
    });
 
    startText.on('pointerdown', () => {
      if (this.startSound && this.startSound.isPlaying) {
        this.startSound.stop();
      }
      this.scene.start('chooseYourCharacter');
    });
 
    rulesText.on('pointerover', () => {
      rulesText.setStyle({ fill: '#ff0000' });
      runText.setColor('#FF4C4C');
      yourText.setColor('#4C4CFF');
      lifeText.setColor('#33CC33');
    });
 
    rulesText.on('pointerout', () => {
      rulesText.setStyle({ fill: '#ffffff' });
      runText.setColor('#8B0000');
      yourText.setColor('#00008B');
      lifeText.setColor('#006400');
    });
 
    rulesText.on('pointerdown', () => {
      if (this.startSound && this.startSound.isPlaying) {
        this.startSound.stop();
      }
      this.scene.start('rulesScene');
    });
 
    this.events.on('shutdown', () => {
      if (this.startSound && this.startSound.isPlaying) {
        this.startSound.stop();
      }
    });
 
    // Achtergrondmuziek (loop)
    this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.5 });
    this.music.play();
 
    // Geluid icoon rechtsonder, klikbaar om geluid aan/uit te zetten
    this.soundIcon = this.add.image(this.cameras.main.width - 40, this.cameras.main.height - 40, 'soundOn')
      .setScale(5)
      .setInteractive();
 
    this.soundOn = true;
 
    this.soundIcon.on('pointerdown', () => {
      if (this.soundOn) {
        this.music.pause();
        this.soundIcon.setTexture('soundOff');
        this.soundOn = false;
      } else {
        this.music.resume();
        this.soundIcon.setTexture('soundOn');
        this.soundOn = true;
      }
    });
  }
}
 
 
//Rules scene
class rulesScene extends Phaser.Scene {
  constructor() {
    super('rulesScene');
  }
 
  preload() {
    this.load.image('background', 'assets/Backround-startscreen.png');
  }
 
  create() {
    // Achtergrond
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
 
    const centerX = this.cameras.main.width / 2;
 
    // Titel
    this.add.text(centerX, 80, 'Spelregels', {
      fontSize: '64px',
      color: '#ffffff',
      fontFamily: 'Irish Grover'
    }).setOrigin(0.5);
 
    // Regels tekst
    const rulesText =
      '1. Kies een personage en geef je held(in) een naam.\n' +
      '2. Je bestuurt je personage met de pijltjestoetsen op je toetsenbord.\n' +
      '3. Er zijn 3 levels: Bos, Water en Vuur.\n' +
      '4. Als je goed raadt, verdien je een punt\n' +
      '5. In elk level moet je 3 sleutels verzamelen om naar het volgende level te gaan.\n' +
      '6. Let goed op de obstakels en vijanden, want je moet ze vermijden om geen leven te verliezen.\n' +
      '7. Je hebt 3 levens.Als je al je levens kwijt bent, moet je opnieuw beginnen.';
 
 
    this.add.text(centerX, 200, rulesText, {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Irish Grover',
      align: 'center',
      wordWrap: { width: 1200 }
    }).setOrigin(0.5, 0);
 
    // Terugknop
    const backButton = this.add.text(centerX, 550, 'Terug', {
      fontSize: '48px',
      color: '#ffffff',
      fontFamily: 'Irish Grover',
      backgroundColor: '#00000088',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5).setInteractive();
 
    backButton.on('pointerover', () => {
      backButton.setStyle({ backgroundColor: '#ffffff33' });
    });
 
    backButton.on('pointerout', () => {
      backButton.setStyle({ backgroundColor: '#00000088' });
    });
 
    backButton.on('pointerdown', () => {
      this.scene.start('startScene');
    });
  }
}
 
 
// Scene waar je character kiest
class chooseYourCharacter extends Phaser.Scene {
  constructor() {
    super('chooseYourCharacter');
  }
  // Dit load the characters
  preload() {
    this.load.image('boy', 'assets/.png');
    this.load.image('girl', 'assets/.png');
    this.load.image('castle', 'assets/chooseYourCharacter.png');
  }
 
  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
 
    // Voeg castle background toe
    this.add.image(0, 0, 'castle').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
 
    // Tekst choose your character
    this.add.text(centerX, 100, 'Choose your character', {
      fontSize: '70px',
      fill: '#ffffff',
      fontFamily: 'Irish Grover'
    }).setOrigin(0.5);
 
    // Laat de man zien
    const boy = this.add.image(centerX - 200, centerY - -50, 'boy')
      .setInteractive()
      .setScale(6.5);
    boy.on('pointerdown', () => {
      this.startGame('boy');
    });
 
    // Laat de vrouw zien
    const girl = this.add.image(centerX + 200, centerY - -50, 'girl')
      .setInteractive()
      .setScale(6.5);
    girl.on('pointerdown', () => {
      this.startGame('girl');
    });
  }
 
  startGame(character) {
    this.scene.start('chooseYourName', { character });
  }
}
 
class chooseYourName extends Phaser.Scene {
  constructor() {
    super('chooseYourName');
  }
 
  init(data) {
    this.selectedCharacter = data.character;
  }
 
  create() {
    const { width, height } = this.cameras.main;
 
    // Gebruik afbeelding als achtergrond
    // this.add.image(0, 0, 'castleInterior').setOrigin(0, 0).setDisplaySize(width, height);
 
    const centerX = width / 2;
    const centerY = height / 2;
 
    this.add.text(centerX, 100, 'Enter your name:', {
      fontSize: '48px',
      fill: '#ffffff',
      fontFamily: 'Irish Grover'
    }).setOrigin(0.5);
 
    // HTML input veld
    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.placeholder = 'Your name here';
    this.nameInput.style.position = 'absolute';
    this.nameInput.style.top = (this.game.canvas.offsetTop + centerY) + 'px';
    this.nameInput.style.left = (this.game.canvas.offsetLeft + centerX - 150) + 'px';
    this.nameInput.style.width = '300px';
    this.nameInput.style.fontSize = '24px';
    this.nameInput.style.padding = '10px';
    this.nameInput.style.border = '2px solid white';
    this.nameInput.style.borderRadius = '8px';
    this.nameInput.style.background = '#11111188'; // doorzichtig donker
 
    document.body.appendChild(this.nameInput);
    this.nameInput.focus();
 
    // Start-knop
    const submitButton = this.add.text(centerX, centerY + 125, 'Start Game', {
      fontSize: '40px',
      fill: '#ffffff',
      fontFamily: 'Irish Grover',
      backgroundColor: '#000000aa',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5).setInteractive();
 
    submitButton.on('pointerover', () => {
      submitButton.setStyle({ backgroundColor: '#ffffff33' });
    });
 
    submitButton.on('pointerout', () => {
      submitButton.setStyle({ backgroundColor: '#000000aa' });
    });
 
    submitButton.on('pointerdown', () => {
      const playerName = this.nameInput.value.trim();
      if (playerName.length > 0) {
        this.nameInput.remove();
        this.scene.start('theForest', {
          character: this.selectedCharacter,
          playerName
        });
      } else {
        alert('Please enter a name!');
      }
    });
  }
 
  shutdown() {
    if (this.nameInput) {
      this.nameInput.remove();
    }
  }
}
 






// elif
// belangrijk start
var chosenCharacter;
var platforms;
var cursors;
var bananaForest;
var platformForest;

class theForest extends Phaser.Scene {
  constructor() {
    super('theForest');
  }

  preload() {
    this.load.image('heart', 'assets/heart.png');
    this.load.image('Background_forest', 'assets/Background_forest.png');
    this.load.image('platform_forest', 'assets/platform_forest.png');
    this.load.image('falling_monkey', 'asset/falling_monkey.png');
    this.load.image('catch_banana', 'asset/catch_banana.png', { frameWidth: 32, frameHeight: 48 });
  }

  init(data) {
    this.selectedCharacter = data.character;
    this.playerName = data.playerName || 'No name';
    this.lives = 3;
  }

  create() {
    // Add background, ensuring it fills the whole screen
 const bg = this.add.image(0, 0, 'Background_forest').setOrigin(0, 0);
        const scaleX = this.cameras.main.width / bg.width;
        const scaleY = this.cameras.main.height / bg.height;
        bg.setScale(scaleX, scaleY);

        // Platform instellen zodat het de volledige breedte gebruikt
        const platform = this.add.image(0, 353, 'platform_forest').setOrigin(0, 0);
        const scalePlatformX = this.cameras.main.width / platform.width;
        platform.setScale(scalePlatformX, 1);

    // Display the chosen character
    this.add.text(100, 50, `Character: ${this.selectedCharacter}`, {
      fontSize: '32px',
      fill: '#fff'
    });

    // Display player name
    this.playerNameText = this.add.text(100, 100, `Player name: ${this.playerName}`, {
      fontSize: '28px',
      fill: '#0f0'
    });

    // Lives system
    this.lives = 3;
    this.hearts = [];
    const startX = 100 + this.playerNameText.width + 20;
    const startY = 100 + this.playerNameText.height / 2;

    for (let i = 0; i < this.lives; i++) {
      let heart = this.add.image(startX + i * 40, startY, 'heart').setScale(0.025).setOrigin(0, 0.5);
      this.hearts.push(heart);
    }

    // Enable collisions
    this.physics.add.collider(chosenCharacter, platform_forest);
  }

  loseLife() {
    if (this.lives > 0) {
      this.lives--;
      const heartToRemove = this.hearts.pop();
      if (heartToRemove) heartToRemove.destroy();

      if (this.lives === 0) {
        this.gameOver();
      }
    }
  }

  gameOver() {
    this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Lose your life', {
      fontSize: '64px',
      color: '#ff0000',
      fontFamily: 'Arial',
    }).setOrigin(0.5);
  }
}

// belangrijk end
 
//ESLAM
class theSea extends Phaser.Scene {
  constructor() {
    super('theSea');
  }
 
  init(data) {
    this.selectedCharacter = data.character;
  }
 
  preload() {
    this.load.image('boy', 'assets/manSprite.png');   // Zorg dat deze klopt
    this.load.image('girl', 'assets/woman.png');      // Zorg dat deze klopt
  }
 
  create() {
    this.add.text(100, 50, `You chose: ${this.selectedCharacter}`, {
      fontSize: '32px',
      fill: '#f00000'
    });
 
    // Toon gekozen character
    this.add.image(200, 200, this.selectedCharacter).setScale(0.5);
  }
}
 
 
//AMINA
class theFire extends Phaser.Scene {
  //
}
 
// Game Configuratie
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#ffffff',
 
  scene: [startScene, rulesScene, chooseYourCharacter, chooseYourName, theForest, theSea, theFire,]
};
 
const game = new Phaser.Game(config);
 
//  class startScene extends Phaser.Scene {
//   constructor() {
//     super('startScene');
//   }

//   preload() {
//     this.load.audio('startSound', 'assets/opening-sound.mp3');
//     this.load.audio('backgroundMusic', 'assets/background-music.mp3'); // Achtergrondmuziek
//     this.load.image('background', 'assets/Backround-startscreen.png');
//     this.load.image('soundOn', 'assets/sound-on.png');

//   }

//   create() {

//     console.log(this.textures.exists('soundOn'));

//     // Startgeluid
//     this.startSound = this.sound.add('startSound', { volume: 0.2 });
//     this.startSound.play();

//     // // Achtergrondafbeelding
//     this.add.image(0, 0, 'background')
//       .setOrigin(0, 0)
//       .setDisplaySize(this.cameras.main.width, this.cameras.main.height);


//     const centerX = this.cameras.main.width / 2;
//     const centerY = this.cameras.main.height / 2 - 100;

//     // Titeltekst
//     const titleContainer = this.add.container(centerX, centerY);

//     const runText = this.add.text(0, 0, 'RUN4', {
//       fontSize: '112px',
//       fontFamily: 'Griffy',
//       color: '#8B0000'
//     });

//     const yourText = this.add.text(runText.width, 0, 'YOUR', {
//       fontSize: '112px',
//       fontFamily: 'Griffy',
//       color: '#00008B'
//     });

//     const lifeText = this.add.text(runText.width + yourText.width, 0, 'LIFE!!', {
//       fontSize: '112px',
//       fontFamily: 'Griffy',
//       color: '#006400'
//     });

//     [runText, yourText, lifeText].forEach(text => {
//       text.setShadow(2, 2, '#000000', 4, false, true);
//     });

//     titleContainer.add([runText, yourText, lifeText]);
//     titleContainer.setSize(runText.width + yourText.width + lifeText.width, runText.height);
//     titleContainer.setPosition(centerX - titleContainer.width / 2, centerY);

//     this.tweens.add({
//       targets: titleContainer,
//       y: centerY - 60,
//       duration: 1100,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     // Start knop
//     const startText = this.add.text(centerX, centerY + 200, 'Start', {
//       fontSize: '70px',
//       color: '#ffffff',
//       fontFamily: 'Irish Grover'
//     }).setOrigin(0.5).setInteractive();

//     // Rules knop
//     const rulesText = this.add.text(centerX, centerY + 300, 'Rules', {
//       fontSize: '70px',
//       color: '#ffffff',
//       fontFamily: 'Irish Grover'
//     }).setOrigin(0.5).setInteractive();

//     startText.on('pointerover', () => {
//       startText.setStyle({ fill: '#ff0000' });
//       runText.setColor('#FF4C4C');
//       yourText.setColor('#4C4CFF');
//       lifeText.setColor('#33CC33');
//     });

//     startText.on('pointerout', () => {
//       startText.setStyle({ fill: '#ffffff' });
//       runText.setColor('#8B0000');
//       yourText.setColor('#00008B');
//       lifeText.setColor('#006400');
//     });

//     startText.on('pointerdown', () => {
//       if (this.startSound && this.startSound.isPlaying) {
//         this.startSound.stop();
//       }
//       this.scene.start('chooseYourCharacter');
//     });

//     rulesText.on('pointerover', () => {
//       rulesText.setStyle({ fill: '#ff0000' });
//       runText.setColor('#FF4C4C');
//       yourText.setColor('#4C4CFF');
//       lifeText.setColor('#33CC33');
//     });

//     rulesText.on('pointerout', () => {
//       rulesText.setStyle({ fill: '#ffffff' });
//       runText.setColor('#8B0000');
//       yourText.setColor('#00008B');
//       lifeText.setColor('#006400');
//     });

//     rulesText.on('pointerdown', () => {
//       if (this.startSound && this.startSound.isPlaying) {
//         this.startSound.stop();
//       }
//       this.scene.start('rulesScene');
//     });

//     this.events.on('shutdown', () => {
//       if (this.startSound && this.startSound.isPlaying) {
//         this.startSound.stop();
//       }
//     });

//     // Achtergrondmuziek (loop)
//     this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.5 });
//     this.music.play();

//     // Sound-on icoon rechtsboven
//     const soundIcon = this.add.image(780, 20, 'soundOn')
//       .setOrigin(1, 0)
//       .setScale(0.3)
//       .setScrollFactor(0);




//   }
// }



// //Rules scene
// class rulesScene extends Phaser.Scene {
//   constructor() {
//     super('rulesScene');
//   }

//   preload() {
//     this.load.image('background', 'assets/Backround-startscreen.png');
//   }

//   create() {
//     // Achtergrond
//     this.add.image(0, 0, 'background')
//       .setOrigin(0, 0)
//       .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

//     const centerX = this.cameras.main.width / 2;

//     // Titel
//     this.add.text(centerX, 80, 'Spelregels', {
//       fontSize: '64px',
//       color: '#ffffff',
//       fontFamily: 'Irish Grover'
//     }).setOrigin(0.5);

//     // Regels tekst
//     const rulesText =
//       '1. Kies een personage en geef je held(in) een naam.\n' +
//       '2. Je bestuurt je personage met de pijltjestoetsen op je toetsenbord.\n' +
//       '3. Er zijn 3 levels: Bos, Water en Vuur.\n' +
//       '4. Als je goed raadt, verdien je een punt\n' +
//       '5. In elk level moet je 3 sleutels verzamelen om naar het volgende level te gaan.\n' +
//       '6. Let goed op de obstakels en vijanden, want je moet ze vermijden om geen leven te verliezen.\n' +
//       '7. Je hebt 3 levens.Als je al je levens kwijt bent, moet je opnieuw beginnen.';


//     this.add.text(centerX, 200, rulesText, {
//       fontSize: '28px',
//       color: '#ffffff',
//       fontFamily: 'Irish Grover',
//       align: 'center',
//       wordWrap: { width: 1200 }
//     }).setOrigin(0.5, 0);

//     // Terugknop
//     const backButton = this.add.text(centerX, 550, 'Terug', {
//       fontSize: '48px',
//       color: '#ffffff',
//       fontFamily: 'Irish Grover',
//       backgroundColor: '#00000088',
//       padding: { x: 30, y: 15 }
//     }).setOrigin(0.5).setInteractive();

//     backButton.on('pointerover', () => {
//       backButton.setStyle({ backgroundColor: '#ffffff33' });
//     });

//     backButton.on('pointerout', () => {
//       backButton.setStyle({ backgroundColor: '#00000088' });
//     });

//     backButton.on('pointerdown', () => {
//       this.scene.start('startScene');
//     });
//   }
// }


// // Scene waar je character kiest
// class chooseYourCharacter extends Phaser.Scene {
//   constructor() {
//     super('chooseYourCharacter');
//   }
//   // Dit load the characters
//   preload() {
//     this.load.image('boy', 'assets/.png');
//     this.load.image('girl', 'assets/.png');
//     this.load.image('castle', 'assets/chooseYourCharacter.png');
//   }

//   create() {
//     const centerX = this.cameras.main.width / 2;
//     const centerY = this.cameras.main.height / 2;

//     // Voeg castle background toe
//     this.add.image(0, 0, 'castle').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

//     // Tekst choose your character
//     this.add.text(centerX, 100, 'Choose your character', {
//       fontSize: '70px',
//       fill: '#ffffff',
//       fontFamily: 'Irish Grover'
//     }).setOrigin(0.5);

//     // Laat de man zien
//     const boy = this.add.image(centerX - 200, centerY - -50, 'boy')
//       .setInteractive()
//       .setScale(6.5);
//     boy.on('pointerdown', () => {
//       this.startGame('boy');
//     });

//     // Laat de vrouw zien
//     const girl = this.add.image(centerX + 200, centerY - -50, 'girl')
//       .setInteractive()
//       .setScale(6.5);
//     girl.on('pointerdown', () => {
//       this.startGame('girl');
//     });
//   }

//   startGame(character) {
//     this.scene.start('chooseYourName', { character });
//   }

  





// }






// class chooseYourName extends Phaser.Scene {
//   constructor() {
//     super('chooseYourName');
//   }

//   init(data) {
//     this.selectedCharacter = data.character;
//   }

//   create() {
//     const { width, height } = this.cameras.main;

//     // Gebruik afbeelding als achtergrond
//     // this.add.image(0, 0, 'castleInterior').setOrigin(0, 0).setDisplaySize(width, height);

//     const centerX = width / 2;
//     const centerY = height / 2;

//     this.add.text(centerX, 100, 'Enter your name:', {
//       fontSize: '48px',
//       fill: '#ffffff',
//       fontFamily: 'Irish Grover'
//     }).setOrigin(0.5);

//     // HTML input veld
//     this.nameInput = document.createElement('input');
//     this.nameInput.type = 'text';
//     this.nameInput.placeholder = 'Your name here';
//     this.nameInput.style.position = 'absolute';
//     this.nameInput.style.top = (this.game.canvas.offsetTop + centerY) + 'px';
//     this.nameInput.style.left = (this.game.canvas.offsetLeft + centerX - 150) + 'px';
//     this.nameInput.style.width = '300px';
//     this.nameInput.style.fontSize = '24px';
//     this.nameInput.style.padding = '10px';
//     this.nameInput.style.border = '2px solid white';
//     this.nameInput.style.borderRadius = '8px';
//     this.nameInput.style.background = '#11111188'; // doorzichtig donker

//     document.body.appendChild(this.nameInput);
//     this.nameInput.focus();

//     // Start-knop
//     const submitButton = this.add.text(centerX, centerY + 125, 'Start Game', {
//       fontSize: '40px',
//       fill: '#ffffff',
//       fontFamily: 'Irish Grover',
//       backgroundColor: '#000000aa',
//       padding: { x: 30, y: 15 }
//     }).setOrigin(0.5).setInteractive();

//     submitButton.on('pointerover', () => {
//       submitButton.setStyle({ backgroundColor: '#ffffff33' });
//     });

//     submitButton.on('pointerout', () => {
//       submitButton.setStyle({ backgroundColor: '#000000aa' });
//     });

//     submitButton.on('pointerdown', () => {
//       const playerName = this.nameInput.value.trim();
//       if (playerName.length > 0) {
//         this.nameInput.remove();
//         this.scene.start('theFire', {
//           character: this.selectedCharacter,
//           playerName
//         });
//       } else {
//         alert('Please enter a name!');
//       }
//     });
//   }

//   shutdown() {
//     if (this.nameInput) {
//       this.nameInput.remove();
//     }
//   }
// }


// // // Algemene variabelen voor de speler, platformen, invoer en score
// // var player;
// // var platforms;
// // var cursors;
// // //var apples;
// // //var score = 0;
// // //var scoreText;



// // // elif
// // // belangrijk start
// // class theForest extends Phaser.Scene {
// //   constructor() {
// //     super('theForest');
// //   }

// //   preload() {
// //     this.load.image('heart', 'assets/heart.png');  // pas pad aan als nodig
// //     this.load.image('Background_forest', 'assets/Background_forest.png');
// //   }

// //   init(data) {
// //     this.selectedCharacter = data.character;
// //     this.playerName = data.playerName || 'No name';
// //     this.lives = 3;  // start met 3 levens
// //   }

// //   create() {
// //     // Toon de gekozen character
// //     this.add.image(0, 0, 'Background_forest').setOrigin(0, 0);

// //     const bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Background_forest');
// //     bg.setOrigin(0.5, 0.5);

// //     // Schaal zo dat de hele afbeelding op het scherm past zonder vervorming
// //     const scaleX = this.cameras.main.width / bg.width;
// //     const scaleY = this.cameras.main.height / bg.height;
// //     const scale = Math.min(scaleX, scaleY);
// //     bg.setScale(scale);


// //     this.add.text(100, 50, `Character: ${this.selectedCharacter}`, {
// //       fontSize: '32px',
// //       fill: '#fff'
// //     });

// //     // Toon de playernaam en sla het tekstobject op om de breedte te gebruiken
// //     this.playerNameText = this.add.text(100, 50, `Player name: ${this.playerName}`, {
// //       fontSize: '28px',
// //       fill: '#0f0'
// //     });

// //     // Zet aantal levens
// //     this.lives = 3;

// //     // Start X is iets rechts van de playerName tekst, met marge 20px
// //     const startX = 100 + this.playerNameText.width + 20;

// //     // Start Y is gecentreerd op de playerName tekst
// //     const startY = 50 + this.playerNameText.height / 2;

// //     // Voeg de hartjes toe
// //     this.hearts = [];
// //     for (let i = 0; i < this.lives; i++) {
// //       let heart = this.add.image(startX + i * 40, startY, 'heart').setScale(0.025).setOrigin(0, 0.5);
// //       this.hearts.push(heart);
// //     }
// //   }


// //   loseLife() {
// //     if (this.lives > 0) {
// //       this.lives--;
// //       const heartToRemove = this.hearts.pop();
// //       if (heartToRemove) heartToRemove.destroy();

// //       if (this.lives === 0) {
// //         this.gameOver();
// //       }
// //     }
// //   }

// //   gameOver() {
// //     this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Lose your life', {
// //       fontSize: '64px',
// //       color: '#ff0000',
// //       fontFamily: 'Arial',
// //     }).setOrigin(0.5);

// //   }
// // }
// // // belangrijk end

// // //ESLAM
// // class theSea extends Phaser.Scene {
// //   constructor() {
// //     super('theSea');
// //   }

// //   init(data) {
// //     this.selectedCharacter = data.character;
// //   }

// //   preload() {
// //     this.load.image('boy', 'assets/manSprite.png');   // Zorg dat deze klopt
// //     this.load.image('girl', 'assets/woman.png');      // Zorg dat deze klopt
// //   }

// //   create() {
// //     this.add.text(100, 50, `You chose: ${this.selectedCharacter}`, {
// //       fontSize: '32px',
// //       fill: '#f00000'
// //     });

// //     // Toon gekozen character
// //     this.add.image(200, 200, this.selectedCharacter).setScale(0.5);
// //   }
// // }


// //AMINA
// class theFire extends Phaser.Scene {
//   constructor() {
//     super('theFire');
//   }

//   preload() {
//     // Assets laden
//     this.load.image('fireBackground', 'assets/fire-level-background.png'); // typo in jouw pad aangepast
//     this.load.spritesheet('player', 'assets/boy.png', {
//       frameWidth: 50,
//       frameHeight: 50
//     });
//     this.load.image('enemy', 'assets/fire-enemy.png');
//     this.load.image('key', 'assets/fire-key.png');
//   }

//   create() {
//     // Achtergrond
//     this.add.image(0, 0, 'fireBackground')
//       .setOrigin(0, 0)
//       .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

//     // Animaties speler maken
//     this.anims.create({
//       key: 'walkRight',
//       frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
//       frameRate: 10,
//       repeat: -1
//     });
//     this.anims.create({
//       key: 'walkLeft',
//       frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
//       frameRate: 10,
//       repeat: -1
//     });

//     // Speler toevoegen (physics sprite)
//     this.player = this.physics.add.sprite(100, 100, 'player').setScale(1.5);
//     this.player.setCollideWorldBounds(true);

//     // Sleutels
//     this.keysCollected = 0;
//     this.totalKeys = 3;

//     this.keysGroup = this.physics.add.group();
//     for (let i = 0; i < this.totalKeys; i++) {
//       const key = this.keysGroup.create(
//         Phaser.Math.Between(100, 700),
//         Phaser.Math.Between(100, 500),
//         'key'
//       );
//       key.setScale(0.5);
//     }

//     // Vijand toevoegen
//     this.enemy = this.physics.add.sprite(400, 300, 'enemy')
//       .setScale(1.5)
//       .setVelocity(100, 100)
//       .setBounce(1)
//       .setCollideWorldBounds(true);

//     // Botsingen
//     this.physics.add.overlap(this.player, this.keysGroup, this.collectKey, null, this);
//     this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this);

//     // Besturing
//     this.cursors = this.input.keyboard.createCursorKeys();

//     // Sleutel-teller
//     this.keyText = this.add.text(16, 16, 'Keys: 0/3', {
//       fontSize: '32px',
//       fill: '#ffffff',
//       fontFamily: 'Irish Grover'
//     });
//   }

//   update() {
//     this.player.setVelocity(0);

//     if (this.cursors.left.isDown) {
//       this.player.setVelocityX(-200);
//       this.player.play('walkLeft', true);
//       this.player.setFlipX(false);
//     } else if (this.cursors.right.isDown) {
//       this.player.setVelocityX(200);
//       this.player.play('walkRight', true);
//       this.player.setFlipX(false);
//     } else {
//       this.player.anims.stop();
//       this.player.setFrame(0); // Stilstaan frame (pas aan indien nodig)
//     }

//     if (this.cursors.up.isDown) {
//       this.player.setVelocityY(-200);
//     } else if (this.cursors.down.isDown) {
//       this.player.setVelocityY(200);
//     }
//   }

//   collectKey(player, key) {
//     key.destroy();
//     this.keysCollected++;
//     this.keyText.setText(`Keys: ${this.keysCollected}/3`);

//     if (this.keysCollected >= this.totalKeys) {
//       this.scene.start('winScene'); // Win-scene moet bestaan
//     }
//   }

//   hitEnemy() {
//     this.scene.start('gameOver'); // Game over scene moet bestaan
//   }
// }

// // Game configuratie blijft hetzelfde:
// const config = {
//   type: Phaser.AUTO,
//   width: window.innerWidth,
//   height: window.innerHeight,
//   backgroundColor: '#ffffff',
//   physics: {
//     default: 'arcade',
//     arcade: { gravity: { y: 0 } }
//   },
//   scene: [startScene, rulesScene, chooseYourCharacter, chooseYourName, theFire]
// };

// const game = new Phaser.Game(config);