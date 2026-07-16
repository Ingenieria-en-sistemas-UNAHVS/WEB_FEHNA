using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FEHNA.Data;
using FEHNA.Models;

namespace FEHNA.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly FehnaDbContext _db;
    public ContactController(FehnaDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactMessage item)
    {
        item.CreatedAt = DateTime.UtcNow;
        _db.ContactMessages.Add(item);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Mensaje enviado exitosamente." });
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.ContactMessages.OrderByDescending(c => c.CreatedAt).ToListAsync());
}
