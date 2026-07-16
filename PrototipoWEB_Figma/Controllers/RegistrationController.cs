using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FEHNA.Data;
using FEHNA.Models;

namespace FEHNA.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegistrationController : ControllerBase
{
    private readonly FehnaDbContext _db;
    public RegistrationController(FehnaDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] Registration item)
    {
        item.CreatedAt = DateTime.UtcNow;
        _db.Registrations.Add(item);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Solicitud recibida exitosamente." });
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Registrations.OrderByDescending(r => r.CreatedAt).ToListAsync());
}
