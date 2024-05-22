package org.dre.controller;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.dre.model.AvisAchat;
import org.dre.model.AvisCdg;
import org.dre.model.Decision;
import org.dre.model.Demande;
import org.dre.repository.AvisAchatRepository;
import org.dre.service.AvisAchatService;
import org.dre.service.DecisionService;
import org.dre.service.DemandeService;

import java.util.List;

@Path("/achat")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated

public class AchatCnt {
    @Inject
    AvisAchatRepository avisAchatRepository;

    @Inject
    AvisAchatService avisAchatService;
    @Inject
    DemandeService demandeService;

    @Inject
    DecisionService decisionService;

    //COMMENTAIRE ACHAT
    @POST
    @RolesAllowed("ACH")
    @Path("/avisAchat/create")
    public Response createCommentaireAchat(AvisAchat avisAchat) {

        avisAchatService.create(avisAchat);
        return Response.status(Response.Status.CREATED).entity(avisAchat).build();
    }
    

    @PUT
    @Path("/validateDmd/{id}")
    @RolesAllowed({"ACH"})
    public Response validateDemande(@PathParam("id") Long id) {

        //find by id demande
        Demande d = demandeService.getDemandeById(id);

        d.setValidationAchat(true);
        demandeService.updateDemande(d);

        return Response.ok(d).build();
    }

    //get all avis achat
    @GET
    @Path("/avisaAchat/get")
    @RolesAllowed({"ACH","CDG","PRS"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAvisAchat() {
        // Récupérer les données depuis PostgreSQL
        List<AvisAchat> avisAchat = avisAchatService.getAll();
        return Response.ok(avisAchat).build();
    }

    //get avis achat by id
    @GET
    @Path("avisAchat/{id}")
    @RolesAllowed({"ACH","CDG","PRS"})

    public AvisAchat getAvisAchatById(@PathParam("id") Long id) {
        return avisAchatRepository.findById(id);
    }

    //get avis achat by id demande
    @GET
    @Path("avisAchatByIdDemande/{id}")
    @RolesAllowed({"ACH","CDG","PRS"})

    public AvisAchat getAvisAchatByIdDemande(@PathParam("id") Long id) {
        return avisAchatService.getAvisAchatByIdDemande(id);
    }

    //UPDATE AVISACHAT
    @PUT
    @Path("avisAchat/{id}")
    @RolesAllowed({"ACH","CDG","PRS"})
    public Response updateAvisAchat(@PathParam("id") Long id, AvisAchat avisAchat) {
        avisAchat.setId(id); // Assure que l'ID de l'utilisateur est correctement défini
        avisAchatService.updateAvisAchat(avisAchat);
        return Response.ok(avisAchat).build();
    }

    @POST
    @Path("decision/create")
    @RolesAllowed({"ACH","CDG","PRS"})

    public Response decider(Decision decision) {
        decisionService.create(decision);
        return Response.status(Response.Status.CREATED).entity(decision).build();
    }

    @GET
    @Path("decision/{id}")
    @RolesAllowed({"ACH","CDG","PRS"})

    public Decision getDecisionByIdDemande(@PathParam("id") Long id) {
        return decisionService.getByIdDemande(id);
    }

    @GET
    @Path("/decision/get")
    @RolesAllowed({"ACH","CDG","PRS"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllDecision() {
        // Récupérer les données depuis PostgreSQL
        List<Decision> decision = decisionService.getAll();
        return Response.ok(decision).build();
    }
    //UPDATE AVISACHAT
    @PUT
    @Path("decision/{id}")
    @RolesAllowed({"ACH","CDG","PRS"})
    public Response updateAvisAchat(@PathParam("id") Long id, Decision Decision) {
        Decision.setId(id); // Assure que l'ID de l'utilisateur est correctement défini
      //  DecisionService.updateDecision(Decision);
        return Response.ok(Decision).build();
    }


}
