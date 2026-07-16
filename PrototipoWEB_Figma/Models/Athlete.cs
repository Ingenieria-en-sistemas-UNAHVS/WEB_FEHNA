namespace FEHNA.Models;

public class Athlete
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Discipline { get; set; } = string.Empty;
    public string Specialty { get; set; } = string.Empty;
    public int Records { get; set; }
    public int Medals { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string Highlight { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
}
