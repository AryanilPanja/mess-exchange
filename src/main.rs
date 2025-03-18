mod routes;

use actix_web::{web, App, HttpServer};
use actix_session::{SessionMiddleware};
use actix_session::storage::CookieSessionStore;
use actix_web::cookie::Key;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Generate a secret key to sign the session cookies.
    let secret_key = Key::generate();

    println!("Starting server on http://127.0.0.1:8080");

    HttpServer::new(move || {
         App::new()
            .wrap(SessionMiddleware::new(
                CookieSessionStore::default(),
                secret_key.clone(),
            ))
            // Home page
            .service(web::resource("/").route(web::get().to(|| async { "Welcome to CAS Market App!" })))
            // CAS Authentication routes
            .service(
                web::scope("/auth")
                    .route("/login", web::get().to(routes::auth::cas_login))
                    .route("/callback", web::get().to(routes::auth::cas_callback))
            )
            // Market (buy, sell, swap, complete) routes
            .service(
                web::scope("/market")
                    .route("/buy", web::get().to(routes::market::buy_page))
                    .route("/sell", web::get().to(routes::market::sell_page))
                    .route("/swap", web::get().to(routes::market::swap_page))
                    .route("/complete", web::get().to(routes::market::complete_transaction))
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
