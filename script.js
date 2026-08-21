(function() {
      // ----- configuration -----
      const padConfig = [
        { key: 'Q', label: 'Heater 1', src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-1.mp3' },
        { key: 'W', label: 'Heater 2', src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-2.mp3' },
        { key: 'E', label: 'Heater 3', src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-3.mp3' },
        { key: 'A', label: 'Heater 4', src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-4_1.mp3' },
        { key: 'S', label: 'Clap', src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3' },
        { key: 'D', label: 'Open-HH', src: 'https://cdn.freecodecamp.org/curriculum/drum/Dsc_Oh.mp3' },
        { key: 'Z', label: 'Kick-n-Hat', src: 'https://cdn.freecodecamp.org/curriculum/drum/Kick_n_Hat.mp3' },
        { key: 'X', label: 'Kick', src: 'https://cdn.freecodecamp.org/curriculum/drum/RP4_KICK_1.mp3' },
        { key: 'C', label: 'Closed-HH', src: 'https://cdn.freecodecamp.org/curriculum/drum/Cev_H2.mp3' }
      ];

      // ----- get container -----
      const drumMachine = document.getElementById('drum-machine');
      const padBank = document.getElementById('pad-bank');
      const displayEl = document.getElementById('display');

      // ----- build pads -----
      padConfig.forEach((cfg) => {
        const pad = document.createElement('div');
        pad.className = 'drum-pad';
        pad.id = `pad-${cfg.key}`;   // unique id describing the clip
        pad.setAttribute('data-key', cfg.key);
        pad.setAttribute('data-label', cfg.label);

        // inner text = trigger key
        pad.innerHTML = `
          <span>${cfg.key}</span>
          <span class="key-label">${cfg.label}</span>
          <audio class="clip" id="${cfg.key}" src="${cfg.src}"></audio>
        `;

        // click event: play audio, update display
        pad.addEventListener('click', function(e) {
          const audio = this.querySelector('audio');
          if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
          }
          const label = this.getAttribute('data-label') || cfg.label;
          displayEl.textContent = label;
          // visual feedback
          this.classList.add('active-pad');
          setTimeout(() => this.classList.remove('active-pad'), 120);
        });

        padBank.appendChild(pad);
      });

      // ----- keyboard support -----
      function handleKeyDown(e) {
        const key = e.key.toUpperCase();
        // find pad with that key
        const pad = padBank.querySelector(`.drum-pad[data-key="${key}"]`);
        if (!pad) return;

        // trigger audio
        const audio = pad.querySelector('audio');
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        }
        // update display
        const label = pad.getAttribute('data-label') || key;
        displayEl.textContent = label;
        // visual effect
        pad.classList.add('active-pad');
        setTimeout(() => pad.classList.remove('active-pad'), 120);
        e.preventDefault();
      }

      document.addEventListener('keydown', handleKeyDown);

      // optional: if any audio fails (autoplay policy) –
      // also ensure display shows something on load
      displayEl.textContent = '🎵 ready';

      // extra: set initial display after a tiny delay, but keep 'ready'
      // also handle edge: if click on audio element itself (but we use pad click)

      // fix: if someone clicks audio child (should not happen) but we prevent
      document.querySelectorAll('.drum-pad audio').forEach(audio => {
        audio.addEventListener('click', (e) => e.stopPropagation());
      });

      // Add small hint: if user clicks on display itself, no effect.
      console.log('Drum Machine ready — press Q,W,E,A,S,D,Z,X,C or click pads.');
    })();