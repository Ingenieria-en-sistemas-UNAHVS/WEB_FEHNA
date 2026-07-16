namespace FEHNA.Models;

public class Sponsor
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Tier { get; set; } = string.Empty;
    public string? LogoUrl { get; set; }
    public string? Url { get; set; }
}
