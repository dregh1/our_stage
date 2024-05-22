package org.dre.controller;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.dre.model.*;
import org.dre.repository.AvisCdgRepository;
import org.dre.service.AvisCdgService;
import org.dre.service.DetailDemandeService;
import org.dre.service.SessionCdService;

import java.util.List;

@Path("/cdg")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated

public class CdgCnt {

    @Inject
    AvisCdgService avisCdgService;
    @Inject
    AvisCdgRepository avisCdgRepository;

    @Inject
    SessionCdService sessionCdService;
    @Inject
    DetailDemandeService detailDemandeService;

    //CREATION DE SESSION
    @POST
    @Path("/session/create")
    public Response createSessionCd(SessionCd sessionCd) {

        String dateString  = sessionCd.getDateDebut().toString();
        String [] parts = dateString.split(" ");
        String formatDate =  parts[0];
        String [] date = formatDate.split("-");
        String ref = "CD-"+date[2]+date[1]+date[0] ;
        sessionCd.setRef(ref);
        sessionCdService.createSessionCd(sessionCd);
        return Response.status(Response.Status.CREATED).entity(sessionCd).build();
    }
    @GET
    @Path("/avisCdg/get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAvisCdg() {
        // Récupérer les données depuis PostgreSQL
        List<AvisCdg> avisCdg = avisCdgService.getAll();
        return Response.ok(avisCdg).build();
    }

    @GET
    @Path("avisCdg/{id}")
    public AvisCdg getAvisCdgById(@PathParam("id") Long id) {
        return avisCdgRepository.findById(id);
    }

    @GET
    @Path("avisCdgByIdDemande/{id}")
    public AvisCdg getAvisCdgByIdDemande(@PathParam("id") Long id) {
        return avisCdgService.getAvisCdgByIdDemande(id);
    }





    //creation validation,ajout commentaire, ajout montantbudgetmensuel | montantengage
    @POST
    @Path("/avisCdg/create")
    public Response createAvisCdg(AvisCdg avisCdg) {
        avisCdgService.create(avisCdg);
        return Response.status(Response.Status.CREATED).entity(avisCdg).build();
    }

    //UPDATE AVISCDG
    @PUT
    @Path("avisCdg/{id}")
    public Response updateAvisCdg(@PathParam("id") Long id, AvisCdg avisCdg) {
        avisCdg.setId(id); // Assure que l'ID de l'utilisateur est correctement défini
        avisCdgService.updateAvisCdg(avisCdg);
        return Response.ok(avisCdg).build();
    }
//GET ALL DETAILDEMANDE
    @GET
    @Path("/detailDemande/get")
    @RolesAllowed({"PRS","CDG","ACH"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllDetailDemande() {
        List<DetailDemande> detailDemande = detailDemandeService.getAll ();
        return Response.ok(detailDemande).build();
    }

    @GET
    @Path("/brouillon/s")
    @RolesAllowed({"PRS","ACH","CDG"})
//    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllActive_dmd(
            @QueryParam("idDirection")@DefaultValue("") String  idDirection,
            @QueryParam("idSession")@DefaultValue("") String  idSession
    ) {
        // Récupérer les données depuis PostgreSQL
        List<Brouillon> brouillon = detailDemandeService.getBrouillon( idDirection ,  idSession) ;
        return Response.ok(brouillon).build();
    }

    //cloture session
    @POST
    @Path("/session/cloture")
    public Response clotureSessionCd(SessionCd sessionCd) {

        String dateString  = sessionCd.getDateDebut().toString();
        String [] parts = dateString.split(" ");
        String formatDate =  parts[0];
        String [] date = formatDate.split("-");
        String ref = "CD-"+date[2]+date[1]+date[0] ;
        sessionCd.setRef(ref);
        sessionCdService.createSessionCd(sessionCd);
        return Response.status(Response.Status.CREATED).entity(sessionCd).build();
    }


}
