package application.controllers;

import application.core.tactactoeservice.TicTacToeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TicTacToeController {

    @Autowired
    TicTacToeService ticTacToeService;

    @PostMapping("validate-move")
    public String getNextMove(String boardState) {
        return this.ticTacToeService.validateMove(boardState);
    }

    @GetMapping("get-time")
    public String getTime() {
        return this.ticTacToeService.getTimeStamp();
    }

    @GetMapping("get-highscore")
    public String getHighScore() {
        return this.ticTacToeService.getHighScores();
    }

    @GetMapping("save-highscore")
    public String saveHighScore(String highscore) {
        return this.ticTacToeService.saveHighScore(highscore);
    }

}
