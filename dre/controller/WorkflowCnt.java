package org.dre.controller;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
@Path("/workflow")
public class WorkflowCnt {
    @Inject
    ProcessEngine processEngine;
    @Inject
    public RuntimeService runtimeService;

    @POST
    @Path("/start")
    @Produces(MediaType.APPLICATION_JSON)
    public String startWorkflow() {
        try {
            ProcessInstance processInstance = processEngine.getRuntimeService()
                    .startProcessInstanceByKey("SimpleWorkflow");
            return "Workflow démarré avec l'ID : " + processInstance.getId();
        } catch (Exception e) {
            return "Erreur lors du démarrage du workflow : " + e.getMessage();
        }
    }

    @GET
    @Path("/start-process")
    @Produces(MediaType.TEXT_PLAIN)
    public String startProcessInstance() {
        String processInstanceId = runtimeService.startProcessInstanceByKey("process").getId();
        return "Process instance with id " + processInstanceId + " started!";
    }

}
