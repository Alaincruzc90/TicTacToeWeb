package application.controllers;

import application.core.tactactoeservice.TicTacToeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @Autowired
    TicTacToeService ticTacToeService;

    @RequestMapping("/")
    public String getIndex(Model model) {
        return "index";
    }

}
