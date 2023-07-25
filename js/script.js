//variables

const instrumentAudioMap = {
    'instrument1': 'audio1',
    'instrument2': 'audio2',
    'instrument3': 'audio3',
    'instrument4': 'audio4',
  };
  
  
  // Variable to store the currently playing audio elements
  let currentAudioElements = [];
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }
  
  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedPiece = document.getElementById(data);
  
    // Make sure the draggedPiece exists
    if (draggedPiece) {
      event.target.appendChild(draggedPiece);
  
      // Play the audio linked to the dropped instrument
      const audioId = instrumentAudioMap[draggedPiece.id];
      if (audioId) {
        const audioElement = document.getElementById(audioId);
        if (audioElement) {
          currentAudioElements.push(audioElement);
          audioElement.addEventListener('ended', handleAudioEnded);
          audioElement.play();
          console.log(`Audio ${audioId} started playing.`);
        }
      }
    }
  }
  
  // Function to handle the 'ended' event of audio elements
  function handleAudioEnded(event) {
    const audioElement = event.target;
    audioElement.currentTime = 0;
    audioElement.play();
  }
  
  // Function to reset the drag and drop functionality and stop audio playback
  function reset() {
    const dropArea = document.querySelector('.drop-area');
    const piecesArea = document.querySelector('.pieces-area');
  
    // Move all pieces back to the pieces-area
    const pieces = dropArea.querySelectorAll('.piece');
    pieces.forEach((piece) => {
      piecesArea.appendChild(piece);
    });
  
    // Stop all playing audio
    currentAudioElements.forEach((audio) => {
      audio.removeEventListener('ended', handleAudioEnded);
      audio.pause();
      audio.currentTime = 0;
    });
  
    // Clear the currentAudioElements array
    currentAudioElements = [];
  
    console.log('Reset event triggered.');
  }
  
  // Function to add event listeners to the image elements in pieces-area
  function addEventListeners() {
    const imageElements = document.querySelectorAll('.piece svg');
    imageElements.forEach((svg) => {
      svg.addEventListener('dragstart', drag);
    });
  
    console.log('Event listeners added to SVG elements.');
  }
  
  // Adding event listeners for reset button and image elements in pieces-area
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.reset-button').addEventListener('click', reset);
    addEventListeners();
  
    console.log('DOM Content Loaded.');
  });
  
  
  
  // animation of icons begines here 
  
  //variables
    // Add event listeners to the drums and crash cymbal
    const drum1 = document.getElementById('drum_x5F_1');
    const drum2 = document.getElementById('drum_x5F_2');
    const crash1 = document.getElementById('crash_x5F_cymbal_x5F_1');
    const crash2 = document.getElementById('crash_x5F_cymbal_x5F_2');
    
  //functions  
  
  // Function to make the black keys bounce
  function bounceBlackKeys() {
      const blackKeys = document.querySelectorAll('#key1, #key3, #key5, #key7, #key9');
    
      blackKeys.forEach((key, index) => {
        setTimeout(() => {
          key.style.transform = 'translateY(-20px)';
          setTimeout(() => {
            key.style.transform = 'translateY(0)';
          }, 200);
        }, 200 * index);
      });
    }
    
    // Function to start the animation loop
    function startAnimationLoop() {
      setInterval(() => {
        bounceBlackKeys(); // Call the function to make black keys bounce
      }, 1200); // Change the interval value (in milliseconds) to adjust the loop speed
    }
  
    // Function to play the drum animation
  function playDrum() {
      drum1.style.animation = 'none';
      drum2.style.animation = 'none';
      void drum1.offsetWidth; // Trigger reflow to reset animation
      void drum2.offsetWidth; // Trigger reflow to reset animation
      drum1.style.animation = 'drumAnimation 0.1s linear infinite';
      drum2.style.animation = 'drumAnimation 0.1s linear infinite';
    }
    
    // Function to play the crash cymbal animation
    function playCrash() {
      crash1.style.animation = 'none';
      crash2.style.animation = 'none';
      void crash1.offsetWidth; // Trigger reflow to reset animation
      void crash2.offsetWidth; // Trigger reflow to reset animation
      crash1.style.animation = 'crashAnimation 0.1s linear infinite';
      crash2.style.animation = 'crashAnimation 0.1s linear infinite';
    }
    
  // Event Listeners
    // Call the startAnimationLoop function when the document is ready
    document.addEventListener('DOMContentLoaded', startAnimationLoop);
    drum1.addEventListener('click', playDrum);
    drum2.addEventListener('click', playDrum);
    crash1.addEventListener('click', playCrash);
    crash2.addEventListener('click', playCrash);
  
  
  
  