document.addEventListener("DOMContentLoaded", function () {

    // Variable that will tell if we can keep playing.
    let disabled = false;
    // Initial time stamp.
    let initTime;

    // Get the current time.
    function getTimeStamp(time) {

        // Since everything is alright, now we can fetch needed form.
        // We must also make sure to add a timeout to our fetch.
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 120000);

        // Set up our URL.
        let currentURL = getRootURL();
        if (currentURL.charAt(currentURL.length - 1) === "/") currentURL = currentURL.substr(0, currentURL.length - 1);
        const requestURL = currentURL + "/get-time";
        const fetchPromise = fetch(requestURL, {
            signal: signal,
            method: 'GET'
        });

        // Make the request.
        fetchPromise.then(handleErrorsJson)
            .then(function (data) {
                console.log(data);
                time = data;
            })
            .catch(function (error) {
                if (error.name === 'AbortError') {
                    alert("No se pudo comunicar con el servidor, vuelva a intentar.");
                } else {
                    alert("Error: " + error.message + ". Intente de nuevo o comuniquese con administración.");
                }
            })
            .finally(function () {
                // Final details.
                clearTimeout(timeoutId);
            });
    }

    getTimeStamp(initTime);

    // Add events to all tiles.
    document.querySelectorAll('.tile').forEach( function(tile) {
        tile.addEventListener('click', tileClicked);
    });

    // Restart game.
    document.getElementById('restart').addEventListener('click', restartGame);

    // Event that occurs when we click on a tile.
    function tileClicked() {

        // Get the reference to the tile.
        const tile = this;

        // Do nothing, since we can't click on a tile that has already been played.
        if(tile.classList.contains('no-click')) return;
        if(disabled) return;
        disabled = true;

        // Fetch the tile's content.
        const label = tile.querySelector('label');
        const input = tile.querySelector('input');
        const xPos = input.getAttribute('x');
        const yPos = input.getAttribute('y');

        // Add the needed classes to show the result of the move.
        tile.classList.add('no-click');
        label.classList.add('player1');
        input.value = "1";

        // Since everything is alright, now we can fetch needed form.
        // We must also make sure to add a timeout to our fetch.
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 120000);

        // Set up our URL.
        let currentURL = getRootURL();
        if (currentURL.charAt(currentURL.length - 1) === "/") currentURL = currentURL.substr(0, currentURL.length - 1);
        const requestURL = currentURL + "/validate-move";

        // Set up our promise and data.
        const data = new FormData();
        const result = getBoardState();
        data.append('boardState', result);
        const fetchPromise = fetch(requestURL, {
            signal: signal,
            method: 'POST',
            body: data,
        });

        // Make the request.
        fetchPromise.then(handleErrorsJson)
            .then(function (data) {

                // Now that we got the data, we need to get the computer's move and
                // and the state of the game.
                const separatedData = data.split(",");
                const separatedMove = separatedData[1].split(':');
                const state = separatedData[0];
                const xPos = separatedMove[0];
                const yPos = separatedMove[1];

                // Fetch the tile by it's id.
                const tile = document.getElementById(xPos + yPos);

                // Check the state of the game.
                switch (state) {
                    case "1": // Player wins.
                        setTimeout(function() {
                            showEndContainer("¡El jugador gano!");
                        }, 200);
                        break;
                    case "2": // Computer wins.
                        computerMove(tile);
                        setTimeout(function() {
                            showEndContainer("¡Ohhh la computadora gano!");
                        }, 200);
                        break;
                    case "3": // It's a tie.
                        setTimeout(function() {
                            showEndContainer("Pues, empataron.");
                        }, 200);
                        break;
                    default: // Allow the game to continue.
                        computerMove(tile);
                        disabled = false;
                        break;
                }

            })
            .catch(function (error) {
                if (error.name === 'AbortError') {
                    alert("No se pudo comunicar con el servidor, vuelva a intentar.");
                } else {
                    alert("Error: " + error.message + ". Intente de nuevo o comuniquese con administración.");
                }
            })
            .finally(function () {
                // Final details.
                clearTimeout(timeoutId);
            });

    }

    // Get the current board state and transform it into String.
    function getBoardState() {

        // Get all the tiles.
        const tiles = document.querySelectorAll('.tile');
        // Variable where we will save our result.
        let result = "";

        // Get each tile and transform it into an entry.
        tiles.forEach( tile => {
            const input = tile.querySelector('input');
            const xPos = input.getAttribute('x');
            const yPos = input.getAttribute('y');
            const value = input.value;
            result += xPos + ":" + yPos + "=" + value + ",";
        });

        // Remove the last ",".
        result.substr(0, result.length - 1);
        return result;

    }

    // Show the ending result of the game.
    function showEndContainer(text) {
        const endContainer = document.getElementById('end-container');
        const title = endContainer.querySelector('h3');
        title.innerHTML = text;
        endContainer.style.display = "block";
    }

    // Show the result of the computer move.
    function computerMove(tile) {

        // Fetch the tile's content.
        const label = tile.querySelector('label');
        const input = tile.querySelector('input');

        // Add the needed classes to show the result of the move.
        tile.classList.add('no-click');
        label.classList.add('player2');
        input.value = "2";

    }

    // Restart the game.
    function restartGame() {

        // Get all the tiles.
        const tiles = document.querySelectorAll('.tile');

        // Get each tile and reset their values and classes.
        tiles.forEach( tile => {
            const input = tile.querySelector('input');
            const label = tile.querySelector('label');
            tile.classList.remove('no-click');
            label.classList.remove('player2', 'player1');
            input.value = "0";
            const endContainer = document.getElementById('end-container');
            endContainer.style.display = "none";
        });
        disabled = false;
    }

});