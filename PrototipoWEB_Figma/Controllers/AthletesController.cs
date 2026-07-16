using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FEHNA.Data;
using FEHNA.Models;

namespace FEHNA.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AthletesController : ControllerBase
{
    private readonly FehnaDbContext _db;
    public AthletesController(FehnaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? discipline)
    {
        var query = _db.Athletes.AsQueryable();
        if (!string.IsNullOrEmpty(discipline) && discipline != "Todos")
            query = query.Where(a => a.Discipline == discipline);

        return Ok(await query.OrderBy(a => a.Name).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var item = await _db.Athletes.FindAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Athlete item)
    {
        _db.Athletes.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Athlete item)
    {
        var existing = await _db.Athletes.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = item.Name;
        existing.Discipline = item.Discipline;
        existing.Specialty = item.Specialty;
        existing.Records = item.Records;
        existing.Medals = item.Medals;
        existing.ImageUrl = item.ImageUrl;
        existing.Highlight = item.Highlight;
        existing.Country = item.Country;

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Athletes.FindAsync(id);
        if (item == null) return NotFound();

        _db.Athletes.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
