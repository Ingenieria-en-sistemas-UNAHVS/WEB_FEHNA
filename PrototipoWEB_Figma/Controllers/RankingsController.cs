using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FEHNA.Data;
using FEHNA.Models;

namespace FEHNA.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RankingsController : ControllerBase
{
    private readonly FehnaDbContext _db;
    public RankingsController(FehnaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? prueba,
        [FromQuery] string? categoria,
        [FromQuery] string? search)
    {
        var query = _db.TimeRecords.AsQueryable();

        if (!string.IsNullOrEmpty(prueba) && prueba != "Todas")
            query = query.Where(t => t.Prueba == prueba);

        if (!string.IsNullOrEmpty(categoria) && categoria != "Todas")
            query = query.Where(t => t.Categoria == categoria);

        if (!string.IsNullOrEmpty(search))
        {
            var s = search.ToLower();
            query = query.Where(t =>
                t.AthleteName.ToLower().Contains(s) ||
                t.Club.ToLower().Contains(s) ||
                t.Departamento.ToLower().Contains(s));
        }

        return Ok(await query.OrderBy(t => t.Position).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var item = await _db.TimeRecords.FindAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TimeRecord item)
    {
        _db.TimeRecords.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TimeRecord item)
    {
        var existing = await _db.TimeRecords.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Position = item.Position;
        existing.AthleteName = item.AthleteName;
        existing.Club = item.Club;
        existing.Departamento = item.Departamento;
        existing.Categoria = item.Categoria;
        existing.Prueba = item.Prueba;
        existing.Tiempo = item.Tiempo;
        existing.Fecha = item.Fecha;
        existing.Lugar = item.Lugar;
        existing.Record = item.Record;

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.TimeRecords.FindAsync(id);
        if (item == null) return NotFound();

        _db.TimeRecords.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
