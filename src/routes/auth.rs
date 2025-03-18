use actix_web::{web, HttpResponse, Responder};
use actix_session::Session;
use std::collections::HashMap;

/// Redirects the user to the CAS login page.
/// In a real implementation, the URL should point to your CAS server.
pub async fn cas_login(_session: Session) -> impl Responder {
    // Simulate redirection to CAS server
    let cas_login_url = "https://cas.example.com/login?service=http://localhost:8080/auth/callback";
    HttpResponse::Found()
        .append_header(("Location", cas_login_url))
        .finish()
}

/// Handles the callback from the CAS server.
/// Expects a `ticket` query parameter which in a real implementation will be validated.
pub async fn cas_callback(session: Session, query: web::Query<HashMap<String, String>>) -> impl Responder {
    if let Some(ticket) = query.get("ticket") {
        // Here you would send a request to the CAS server to validate the ticket.
        // If successful, retrieve user information.
        // For this example, we simulate a successful validation.
        session.insert("user", "cas_user").unwrap();
        HttpResponse::Ok().body(format!("CAS login successful! Ticket: {}", ticket))
    } else {
        HttpResponse::BadRequest().body("Missing ticket")
    }
}
