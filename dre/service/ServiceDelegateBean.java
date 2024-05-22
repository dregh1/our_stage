package org.dre.service;

import jakarta.enterprise.context.Dependent;
import jakarta.inject.Named;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.jboss.logging.Logger;

@Named
@Dependent
public class ServiceDelegateBean implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        Logger.getLogger(this.getClass())
                .infov("\n\nService Task called. Hurray!!");
    }

}
