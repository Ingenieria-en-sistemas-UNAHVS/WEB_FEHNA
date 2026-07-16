using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FEHNA.Data;
using FEHNA.Models;

namespace FEHNA.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SponsorsController : ControllerBase
{
    private readonly FehnaDbContext _db;
    public SponsorsController(FehnaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? tier)
    {
        var query = _db.Sponsors.AsQueryable();
        if (!string.IsNullOrEmpty(tier))
            query = query.Where(s => s.Tier == tier);

        return Ok(await query.OrderBy(s => s.Id).ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Sponsor item)
    {
        _db.Sponsors.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Sponsor item)
    {
        var existing = await _db.Sponsors.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = item.Name;
        existing.Tier = item.Tier;
        existing.LogoUrl = item.LogoUrl;
        existing.Url = item.Url;

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Sponsors.FindAsync(id);
        if (item == null) return NotFound();

        _db.Sponsors.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
