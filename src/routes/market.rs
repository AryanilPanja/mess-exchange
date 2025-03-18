use actix_web::{web, HttpResponse, Responder};
use actix_session::Session;
use std::collections::HashMap;

/// Checks if the user is logged in by looking for the "user" key in the session.
fn is_authenticated(session: &Session) -> bool {
    session.get::<String>("user").unwrap_or(None).is_some()
}

/// Handler for the buy page.
/// Returns a simulated list of available meal offers.
pub async fn buy_page(session: Session) -> impl Responder {
    if !is_authenticated(&session) {
         return HttpResponse::Unauthorized().body("Unauthorized: Please log in.");
    }
    HttpResponse::Ok().json(vec!["Meal 1 at Mess A", "Meal 2 at Mess B"])
}

/// Handler for the sell page.
pub async fn sell_page(session: Session) -> impl Responder {
    if !is_authenticated(&session) {
         return HttpResponse::Unauthorized().body("Unauthorized: Please log in.");
    }
    HttpResponse::Ok().body("Seller page: Post your meals and set your prices.")
}

/// Handler for the swap page.
pub async fn swap_page(session: Session) -> impl Responder {
    if !is_authenticated(&session) {
         return HttpResponse::Unauthorized().body("Unauthorized: Please log in.");
    }
    HttpResponse::Ok().body("Swap page: Create and accept swap deals.")
}

/// Handler for marking a transaction as complete.
pub async fn complete_transaction(session: Session, query: web::Query<HashMap<String, String>>) -> impl Responder {
    if !is_authenticated(&session) {
         return HttpResponse::Unauthorized().body("Unauthorized: Please log in.");
    }
    let transaction_id = query.get("id").cloned().unwrap_or_else(|| "unknown".to_string());
    HttpResponse::Ok().body(format!("Transaction {} marked as complete", transaction_id))
}
