package application.core.tactactoeservice.implementation;

import application.core.tactactoeservice.TicTacToeService;
import application.core.wsdl.GetHighScoreReturn;
import application.core.wsdl.GetTimeStampReturn;
import application.core.wsdl.SaveHighScoreReturn;
import application.core.wsdl.ValidateMoveReturn;
import application.soapconfig.TicTacToeClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicTacToeServiceImplementation implements TicTacToeService {

    @Autowired
    TicTacToeClient ticTacToeClient;

    /**
     * {@inheritDoc}
     */
    @Override
    public String validateMove(String boardState) {
        ValidateMoveReturn response = ticTacToeClient.getValidateMoveReturn(boardState);
        return response.getValidateMoveResult();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getTimeStamp() {
        GetTimeStampReturn response = ticTacToeClient.getTimeStampReturn();
        return response.getGetTimeStampResult();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getHighScores() {
        GetHighScoreReturn response = ticTacToeClient.getHighScoreReturn();
        return response.getGetHighScoreResult();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String saveHighScore(String highScore) {
        SaveHighScoreReturn response = ticTacToeClient.saveHighScoreReturn(highScore);
        return response.getSaveHighScoreResult();
    }
}
