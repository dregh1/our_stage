package org.dre.service;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.dre.model.MyMail;

import java.util.List;

@ApplicationScoped
public class EmailService {
    @Inject
    Mailer mailer;
//    @Inject
//
//    MailerClient mailerClient;
//
//    public void sendEmail(String to, String subject, String body) {
//        try {
//            MimeMessage message = new MimeMessage(mailerClient);
//            message.setFrom(new InternetAddress("your-outlook-email@domain.com"));
//            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
//            message.setSubject(subject);
//            message.setText(body);
//            mailerClient.send(message);
//        } catch (MessagingException e) {
//            throw new RuntimeException("Failed to send email", e);
//        }
//    }

    // notification Session Ouverte
    public void notifOuvertureSession( List<MyMail> listEmail  ) {

        System.out.println("I send mail");

        for (MyMail  m : listEmail){
            Mail mail = Mail.withText(m.getEmail(), "Session Ouverte", "Hey "+m.getUsername()+",\nUne session CD a été ouverte!");

            mailer.send(mail);

        }

        System.out.println("I sent mail")   ;


    }

    // notification Validation Prescripteur
    public void notifValidationPrescripteur( List<MyMail> listEmail  ) {

        System.out.println("I send mail");

            for (MyMail  m : listEmail){
                Mail mail = Mail.withText(m.getEmail(), "Demande validée", "Hey "+m.getUsername()+",\nUne demande a été validée!");

                mailer.send(mail);
            }

        System.out.println("I sent mail")   ;

    }
}
