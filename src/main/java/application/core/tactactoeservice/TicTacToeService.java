package application.core.tactactoeservice;

public interface TicTacToeService {

    /**
     * Given an String formatted as a matrix simulating our board, return the state of the game.
     *
     * @param boardState String formatted as a matrix.
     * @return A String that can either be 1, 2 o 3.
     */
    String validateMove(String boardState);

    /**
     * Get the timestamp from the server.
     *
     * @return Time as String.
     */
    String getTimeStamp();

    /**
     * Get the current 10 best scores.
     *
     * @return 10 best high scores.
     */
    String getHighScores();

    /**
     * Save a new high score.
     *
     * @param highScore High score to be saved.
     * @return 10 best high scores.
     */
    String saveHighScore(String highScore);
}
