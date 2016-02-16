/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.data;

import com.webchat.models.Patient;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author hieu
 */
public class PatientData {
    
    private static PatientData instance = new PatientData();
    private Map<Integer, Patient> patients;
    private int serial;
    
    private PatientData() {
        this.patients = new HashMap<>();
        this.serial = 0;
        addPatient(new Patient("Lieu", "Vu"));
        addPatient(new Patient("Nam", "Nguyen"));
    }
    
    public static PatientData getInstance() {
        return instance;
    }
    
    public Collection<Patient> getPatients() {
        return patients.values();
    }
    
    public void addPatient(Patient patient) {
        patient.setId(serial);
        patients.put(serial, patient);
        serial++;
    }
    
    public Patient getPatient(int patientId) {
        return patients.get(patientId);
    }
}
