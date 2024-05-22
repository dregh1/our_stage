package org.dre.controller;

//import io.quarkus.mailer.Mail;

//import io.quarkus.mailer.Mailer;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.quarkus.security.Authenticated;
import io.smallrye.common.annotation.Blocking;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.dre.model.*;
import org.dre.model.Periode;
import org.dre.service.*;

import java.util.List;
import java.util.Objects;

@Path("/teste")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class TesteCnt {

    @Inject
    Mailer mailer;

    @Inject  TitreDemandeService titredemandeService;
    @Inject
    PeriodeService periodeService;
    @Inject
    DirectionService directionService;
    @Inject
    AvisCdgService avisCdgService;

    @Inject
    AvisAchatService avisAchatService;
    @Inject
    ValidationService validationService;
    @Inject
    DetailDemandeService detailDemandeService;

    @Inject
    SessionCdService sessionCdService;
    @Inject
    FournisseurService fournisseurService;

    @Inject
    DemandeService demandeService;

    @Inject
    ActiveService activeService;


//    TEST CRUD
    @GET
    @Path("/periode/get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllperiode() {
        // Récupérer les données depuis PostgreSQL
        List<Periode> sessionCds = periodeService.getAll ();
        return Response.ok(sessionCds).build();
    }

    @GET
    @Path("/demande/get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAlldemande() {
        // Récupérer les données depuis PostgreSQL
        List<Demande> demande = demandeService.getAll ();
        return Response.ok(demande).build();
    }

    @GET
    @Path("/fournisseur/get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllFournisseur() {
        // Récupérer les données depuis PostgreSQL
        List<Fournisseur> rubriques = fournisseurService.getAll ();
        return Response.ok(rubriques).build();
    }




    @POST
    @Path("/post/create")
    public Response createSessionCd(Periode sessionDd) {



        periodeService.create(sessionDd);
        return Response.status(Response.Status.CREATED).entity(sessionDd).build();
    }

    @POST
    @Path("demande/create")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createDemande(Demande demande) {
        demandeService.create(demande);
        return Response.status(Response.Status.CREATED).entity(demande).build();
    }

    //get id direction by name of direction
    @GET
    @Path("/getIdDir")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIdDirByName(@QueryParam("nom") String nomDir) {

        Long idDir = null;
        Direction d= null;
        if(nomDir!= null)
        {
            d = directionService.getIdDirByName(nomDir);
        }



        return Response.ok(d).build();
    }
    //get direction tout
    @GET
    @Path("/getDirection")
    @RolesAllowed({"PRS","ACH","CDG"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDirrection() {
        List<Direction> session = directionService.getAll ();
        return Response.ok(session).build();
    }

    @POST
    @Path("/getIdDir")
    public Response createUser(String nomDir) {
        Long idDir ;

        if(nomDir!= null)
        {
            idDir = directionService.getIdDirByName(nomDir).getId();
        }else idDir= null;

        return Response.ok(idDir).build();
    }
//GET ALL SESSION
    @GET
    @Path("/session/get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllSession() {
        // Récupérer les données depuis PostgreSQL
        List<SessionCd> session = sessionCdService.getAll ();
        return Response.ok(session).build();
    }

//GET ALL DETAILDEMANDE
    @GET
    @Path("/detailDemande/get")
    @RolesAllowed({"PRS","CDG","ACH"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllDetailDemande() {
        // Récupérer les données depuis PostgreSQL
        List<DetailDemande> detailDemande = detailDemandeService.getAll();
        return Response.ok(detailDemande).build();
    }
    @GET
    @Path("/detailDemande/{id}")
    @RolesAllowed({"PRS","CDG","ACH"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDetailDemande(@PathParam( "id") Long id) {
        // Récupérer les données depuis PostgreSQL
        DetailDemande detailDemande = detailDemandeService.getDetailDemandeById(id);
        return Response.ok(detailDemande).build();
    }
    @GET
    @Path("/validation/get")
    @RolesAllowed({"PRS","CDG","ACH"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllValidation() {
        // Récupérer les données depuis PostgreSQL
        List<Validation> validation = validationService.getAll();
        return Response.ok(validation).build();
    }
    @GET
    @Path("/validation/{id}")
    @RolesAllowed({"PRS","CDG","ACH"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getValidationById(@PathParam( "id") Long id) {
        // Récupérer les données depuis PostgreSQL
        Validation validation = validationService.getById(id);
        return Response.ok(validation).build();
    }

    //GET ALL CONSULTATION
    @GET
    @Path("/detailDemande/search")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"PRS","CDG","ACH"})
    public Response getDetails(
            @QueryParam("idDirection") @DefaultValue("")String idDirection,
            @QueryParam("statut")@DefaultValue("") String  statut,
            @QueryParam("motif")@DefaultValue("") String  motif,
            @QueryParam("dateDebut")@DefaultValue("") String  dateDebut,
            @QueryParam("dateFin")@DefaultValue("") String  dateFin,
            @QueryParam("session")@DefaultValue("") String  session,
            @QueryParam("idFournisseur")@DefaultValue("") String  idFournisseur,
            @QueryParam("validAchat")@DefaultValue("") String  validAchat,
            @QueryParam("validCdg")@DefaultValue("") String  validCdg

    )  {

        // Récupérer les données depuis PostgreSQL
        List<DetailDemande> detailDemandes  = detailDemandeService.chercher (idDirection,motif,session,idFournisseur,dateDebut,dateFin,statut,validAchat,validCdg);
        return Response.ok(detailDemandes).build();

    }

//    @GET
//    @Path("/detailDemande/get")
//    @Produces(MediaType.APPLICATION_JSON)
//    @RolesAllowed({"PRS","CDG","ACH"})
//    public Response getDetailFiltrer(
//            @QueryParam("idDirection") @DefaultValue("")String idDirection,
//            @QueryParam("sessionCd")@DefaultValue("") String  sessionCd
//    )  {
//
//        // Récupérer les données depuis PostgreSQL
//        List<DetailDemande> detailDemandes  = detailDemandeService.chercher (idDirection,motif,session,idFournisseur,dateDebut,dateFin,statut);
//        return Response.ok(detailDemandes).build();
//
//    }



    @POST
    @Path("/send")
    public Response sendNotification() {

        Mail mail = Mail.withText("charle_andre_as@outlook.com", "Notification Subject", "Hey, This is the body of the notification.");

        mailer.send(mail);

        return Response.ok().build();

    }

    @POST
    @Path("/sessionOuverte")
    @RolesAllowed({"PRS","CDG","ACH"})
    public Response emailSessionOuverte( List<MyMail> listEmail  ) {

        System.out.println("I send mail");

        for (MyMail  m : listEmail){
            Mail mail = Mail.withText(m.getEmail(), "Session Ouverte", "Hey "+m.getUsername()+",\nUne session CD a été ouverte!");

            mailer.send(mail);

        }

        System.out.println("I sent mail")   ;

        return Response.ok().build();

    }
//GET SESSION ACTIVE

    // @GET

    // @Path("/session/getByDir/{idDirection}")

    // @Produces(MediaType.APPLICATION_JSON)

    // public Response getSessionActive(@PathParam("idDirection") Integer idDirection) {

    //     // Récupérer les données depuis PostgreSQL

    //     SessionCd session = sessionCdService.getSessionActive(idDirection);

    //     return Response.ok(session).build();

    // }
    @GET
    @Path("/session/active")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"PRS","CDG","ACH"})
    public Response getSessionActive(
            @QueryParam("dir") @DefaultValue("")String idDirection
    )
    {
        SessionCd session ;

        if(!Objects.equals(idDirection, ""))
        {
            System.out.println("iciiiiiiiiiiii "+ idDirection);
            // Récupérer les données depuis PostgreSQL
            session = sessionCdService.getActiveSession(Integer.valueOf(idDirection));
            return Response.ok(session).build();
        }else
            return null;
    }

    @PUT
    @Path("session/{id}")
    @RolesAllowed({"PRS","CDG","ACH"})
    public Response updateSession(@PathParam("id") Long id, SessionCd session) {
        session.setId(id); // Assure que l'ID de l'utilisateur est correctement défini
        sessionCdService.updateSessionCd(session);
        return Response.ok(session).build();
    }
    //GET SESSION ACTIVE
    @GET
    @Path("/checkSession/{idDirection}")
    @RolesAllowed({"PRS","CDG","ACH"})
    @Produces(MediaType.APPLICATION_JSON)
    public boolean checkSession(@PathParam("idDirection") Integer idDirection) {
        // Récupérer les données depuis PostgreSQL
        return  sessionCdService.checkSession(idDirection);
    }


    // LIST DEMANDE ACTIVE
    @GET
    @Path("/active/s")
    @RolesAllowed({"PRS","ACH","CDG"})
//    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllActive_dmd(
            @QueryParam("idDirection")@DefaultValue("") String  idDirection,
            @QueryParam("idSession")@DefaultValue("") String  idSession
         ) {

        List<Active> active_dmds = detailDemandeService.getActive( idDirection ,  idSession) ;
        return Response.ok(active_dmds).build();
    }

    // get titre by idDirection, idSession
    @GET
    @Path("/titre/get")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTitreBySession(
            @QueryParam("idSession")@DefaultValue("") String idSession,
            @QueryParam("idDirection")@DefaultValue("") String idDirection
    ) {
        // Récupérer les données depuis PostgreSQL

        List<TitreDepense> titre_dmds = titredemandeService.getTitres (idDirection,idSession);
        return Response.ok(titre_dmds).build();
    }
    //verifier existance coms cdg
    @GET
    @PermitAll
    @Path("checkAvisCdgByIdDemande/{idDemande}")
    public boolean checkAvisCdgByIdDemande(@PathParam("idDemande") Long idDemande) {
        return avisCdgService.checkAvisCdgByIdDemande(idDemande);
    }

    @GET
    @PermitAll               /*check avis achat*/
    @Path("/checkAvisAchatByIdDemande/{idDemande}")
    public boolean checkAvisAchatByIdDemande(@PathParam("idDemande") Long idDemande) {
        return avisAchatService.checkAvisAchatByIdDemande(idDemande);
    }

    @GET
    @PermitAll               /*get validation*/
    @Path("/getValidation")
    public Response getValidation(
            @QueryParam("montantMga")@DefaultValue("") String montantMga,
            @QueryParam("idDirection")@DefaultValue("") String idDirection


    ) {
        List <Active> listeValidation = detailDemandeService.getValidation(idDirection,montantMga);
        return Response.ok(listeValidation).build();
    }

    //valider demande
    //refuser demande

}


