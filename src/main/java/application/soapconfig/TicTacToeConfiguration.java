package application.soapconfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

@Configuration
public class TicTacToeConfiguration {

    @Bean
    public Jaxb2Marshaller marshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("application.core.wsdl");
        return marshaller;
    }

    @Bean
    public TicTacToeClient helloWorldClient(Jaxb2Marshaller marshaller) {
        TicTacToeClient client = new TicTacToeClient();
        client.setDefaultUri("http://titanic.ecci.ucr.ac.cr/~ea82019/TicTacToe/");
        client.setMarshaller(marshaller);
        client.setUnmarshaller(marshaller);
        return client;
    }
}
