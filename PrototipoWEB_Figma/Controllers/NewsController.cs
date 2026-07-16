using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FEHNA.Data;
using FEHNA.Models;

namespace FEHNA.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsController : ControllerBase
{
    private readonly FehnaDbContext _db;
    public NewsController(FehnaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.News.OrderByDescending(n => n.Date).ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var item = await _db.News.FindAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] NewsItem item)
    {
        _db.News.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] NewsItem item)
    {
        var existing = await _db.News.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Title = item.Title;
        existing.Excerpt = item.Excerpt;
        existing.Category = item.Category;
        existing.Date = item.Date;
        existing.ImageUrl = item.ImageUrl;
        existing.Featured = item.Featured;

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.News.FindAsync(id);
        if (item == null) return NotFound();

        _db.News.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
