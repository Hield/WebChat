/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.models;

/**
 *
 * @author hieu
 */
public class Response {
    
    private StringBuilder response;
    
    public Response() {
        this.response = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?><response>");
    }
    
    public Response success() {
        response.append("<result>success</result>");
        return this;
    }
    
    public Response failure() {
        response.append("<result>failure</result>");
        return this;
    }
    
    public Response message(String message) {
        response.append("<message>").append(message).append("</message>");
        return this;
    }
    
    public Response tag(String tag, Object value) {
        response.append("<").append(tag).append(">").append(value).
                append("</").append(tag).append(">");
        return this;
    }

    @Override
    public String toString() {
        response.append("</response>");
        return response.toString();
    }
}
