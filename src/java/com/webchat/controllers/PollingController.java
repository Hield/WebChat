/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.controllers;

import com.webchat.data.SessionData;
import com.webchat.models.EventEntry;
import com.webchat.models.Session;
import com.webchat.models.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author hieu
 */
@WebServlet(name = "PollingController", urlPatterns = {"/polling"})
public class PollingController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String sessionId = request.getHeader("sessionId");
        Session session = SessionData.getInstance().getSession(sessionId);
        if (session != null) {
            User user = session.getUser();

            int i = 0;
            while (i * 50 < 30000 && user.getEventEntries().size() == 0) {
                try {
                    Thread.sleep(50);
                    i++;
                    System.out.println(i);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }           
            StringBuilder result = new StringBuilder();
            result.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            result.append("<response>");
            result.append("<result>").append("success").append("</result>");
            for (EventEntry entry : user.getEventEntries()) {
                result.append("<timeStamp>").append(entry.getTimeStamp()).append("</timeStamp>");
            }
            user.getEventEntries().clear();
            result.append("</response>");
            out.write(result.toString());
        } else {
            StringBuilder result = new StringBuilder();
            result.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            result.append("<response>");
            result.append("<result>").append("failure").append("</result>");
            result.append("<message>").append("sessionTimeout").append("</message>");
            result.append("</response>");
            out.write(result.toString());
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}
