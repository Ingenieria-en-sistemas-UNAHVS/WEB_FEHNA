namespace FEHNA.Models;

public class EventItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string DateDisplay { get; set; } = string.Empty;
    public string Month { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Discipline { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
}
