/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.resources;

import com.webchat.data.PatientData;
import com.webchat.models.Patient;
import java.util.Collection;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author hieu
 */
@Path("patients")
public class PatientResource {
    
    private PatientData patientData;
    
    public PatientResource() {
        this.patientData = PatientData.getInstance();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Collection<Patient> getPatients() {
        return patientData.getPatients();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public String addPatient(Patient patient) {
        patientData.addPatient(patient);
        return null;
    }
    
    @Path("{patientId}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Patient getPatient(@PathParam("patientId") int patientId) {
        return patientData.getPatient(patientId);
    }
}
