using Microsoft.AspNetCore.Mvc;

namespace WEB_FEHNA.Server.Controllers;

// Minimal example controller, kept only to prove the API pipeline works end to end.
// Replace/extend with real controllers (NewsController, AthletesController, EventsController, etc.)
// once the backend API is developed, or point the Angular services to an external API instead.
[ApiController]
[Route("api/[controller]")]
public class PingController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { status = "ok", service = "WEB_FEHNA.Server" });
    }
}