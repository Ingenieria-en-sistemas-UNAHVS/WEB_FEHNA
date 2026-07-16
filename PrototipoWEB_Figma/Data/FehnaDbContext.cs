using Microsoft.EntityFrameworkCore;
using FEHNA.Models;

namespace FEHNA.Data;

public class FehnaDbContext : DbContext
{
    public FehnaDbContext(DbContextOptions<FehnaDbContext> options) : base(options) { }

    public DbSet<NewsItem> News => Set<NewsItem>();
    public DbSet<EventItem> Events => Set<EventItem>();
    public DbSet<Athlete> Athletes => Set<Athlete>();
    public DbSet<TimeRecord> TimeRecords => Set<TimeRecord>();
    public DbSet<GalleryItem> Gallery => Set<GalleryItem>();
    public DbSet<Sponsor> Sponsors => Set<Sponsor>();
    public DbSet<Registration> Registrations => Set<Registration>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<NewsItem>().HasIndex(n => n.Date);
        modelBuilder.Entity<EventItem>().HasIndex(e => e.Discipline);
        modelBuilder.Entity<Athlete>().HasIndex(a => a.Discipline);
        modelBuilder.Entity<TimeRecord>().HasIndex(t => t.Prueba);
        modelBuilder.Entity<TimeRecord>().HasIndex(t => t.Categoria);
        modelBuilder.Entity<Sponsor>().HasIndex(s => s.Tier);
    }
}
