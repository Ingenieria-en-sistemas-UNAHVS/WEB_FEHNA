namespace FEHNA.Models;

public class Registration
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Club { get; set; }
    public string Disciplina { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string? Mensaje { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
