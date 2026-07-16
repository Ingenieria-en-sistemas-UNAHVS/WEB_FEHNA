namespace FEHNA.Models;

public class TimeRecord
{
    public int Id { get; set; }
    public int Position { get; set; }
    public string AthleteName { get; set; } = string.Empty;
    public string Club { get; set; } = string.Empty;
    public string Departamento { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string Prueba { get; set; } = string.Empty;
    public string Tiempo { get; set; } = string.Empty;
    public DateTime Fecha { get; set; }
    public string Lugar { get; set; } = string.Empty;
    public bool Record { get; set; }
}
