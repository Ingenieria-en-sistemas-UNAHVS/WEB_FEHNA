using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FEHNA.Data;
using FEHNA.Models;

namespace FEHNA.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GalleryController : ControllerBase
{
    private readonly FehnaDbContext _db;
    public GalleryController(FehnaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Gallery.OrderBy(g => g.Id).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] GalleryItem item)
    {
        _db.Gallery.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { }, item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Gallery.FindAsync(id);
        if (item == null) return NotFound();

        _db.Gallery.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
