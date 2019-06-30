package application.soapconfig;

import application.core.wsdl.*;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

public class TicTacToeClient extends WebServiceGatewaySupport {

    /**
     * Make a SOAP request to validate a move.
     *
     * @param boardState String formatted as an array simulating the board state.
     * @return The response from our server.
     */
    public ValidateMoveReturn getValidateMoveReturn(String boardState) {

        ValidateMove request = new ValidateMove();
        request.setBoardState(boardState);

        return (ValidateMoveReturn) getWebServiceTemplate().
                marshalSendAndReceive("http://titanic.ecci.ucr.ac.cr/~ea82019/TicTacToe/", request);

    }

    /**
     * Make a SOAP request to get the high scores.
     *
     * @return The response from our server.
     */
    public GetHighScoreReturn getHighScoreReturn() {
        GetHighScore request = new GetHighScore();
        return (GetHighScoreReturn) getWebServiceTemplate().
                marshalSendAndReceive("http://titanic.ecci.ucr.ac.cr/~ea82019/TicTacToe/", request);

    }

    /**
     * Make a SOAP request to get the timestamp from the server.
     *
     * @return The response from our server.
     */
    public GetTimeStampReturn getTimeStampReturn() {
        GetTimeStamp request = new GetTimeStamp();
        return (GetTimeStampReturn) getWebServiceTemplate().
                marshalSendAndReceive("http://titanic.ecci.ucr.ac.cr/~ea82019/TicTacToe/", request);

    }

    /**
     * Make a SOAP request to validate a move.
     *
     * @param highScore String formatted as an array simulating the board state.
     * @return The response from our server.
     */
    public SaveHighScoreReturn saveHighScoreReturn(String highScore) {
        SaveHighScore request = new SaveHighScore();
        request.setHighscore(highScore);
        return (SaveHighScoreReturn) getWebServiceTemplate().
                marshalSendAndReceive("http://titanic.ecci.ucr.ac.cr/~ea82019/TicTacToe/", request);

    }

}
