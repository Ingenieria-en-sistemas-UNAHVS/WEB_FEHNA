using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FEHNA.Data;
using FEHNA.Models;

namespace FEHNA.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly FehnaDbContext _db;
    public EventsController(FehnaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? discipline)
    {
        var query = _db.Events.AsQueryable();
        if (!string.IsNullOrEmpty(discipline) && discipline != "Todos")
            query = query.Where(e => e.Discipline == discipline);

        return Ok(await query.OrderBy(e => e.Id).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var item = await _db.Events.FindAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EventItem item)
    {
        _db.Events.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] EventItem item)
    {
        var existing = await _db.Events.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Title = item.Title;
        existing.DateDisplay = item.DateDisplay;
        existing.Month = item.Month;
        existing.Location = item.Location;
        existing.Discipline = item.Discipline;
        existing.Type = item.Type;
        existing.Level = item.Level;

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Events.FindAsync(id);
        if (item == null) return NotFound();

        _db.Events.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
